#!/usr/bin/env node
/**
 * Ozeonix Infinity — Read-Only Agent Skills Upstream Checker
 *
 * Scans all vendored skills under `.agents/skills/` for `.upstream-lock.json`,
 * and checks whether the upstream Git repositories have new commits beyond the pinned commits.
 *
 * Strictly read-only: does not clone, download, fetch, pull, or modify any files.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const SKILLS_DIR = resolve(ROOT_DIR, ".agents/skills");

const HEX_OBJECT_ID_REGEX = /^[0-9a-fA-F]{40,64}$/;

function fail(message, exitCode = 1) {
  console.error(`[check-skill-updates] ERROR: ${message}`);
  process.exit(exitCode);
}

function findLockFiles() {
  if (!existsSync(SKILLS_DIR)) {
    fail(`Skills directory not found at ${SKILLS_DIR}.`);
  }

  const lockFiles = [];
  const entries = readdirSync(SKILLS_DIR);
  for (const entry of entries) {
    const fullPath = join(SKILLS_DIR, entry);
    if (statSync(fullPath).isDirectory()) {
      const lockPath = join(fullPath, ".upstream-lock.json");
      if (existsSync(lockPath)) {
        lockFiles.push({ skillName: entry, lockPath });
      }
    }
  }

  if (lockFiles.length === 0) {
    fail(`No .upstream-lock.json files found under ${SKILLS_DIR}.`);
  }

  return lockFiles;
}

function loadLockMetadata(lockPath) {
  let lockData;
  try {
    const raw = readFileSync(lockPath, "utf8");
    lockData = JSON.parse(raw);
  } catch (err) {
    fail(`Failed to parse ${lockPath}: ${err.message}`);
  }

  const { repository, branch, commit } = lockData;

  if (!repository || typeof repository !== "string" || !repository.startsWith("http")) {
    fail(`Invalid or missing 'repository' URL in lock file at ${lockPath}.`);
  }
  if (!branch || typeof branch !== "string") {
    fail(`Invalid or missing 'branch' in lock file at ${lockPath}.`);
  }
  if (!commit || typeof commit !== "string" || !HEX_OBJECT_ID_REGEX.test(commit)) {
    fail(`Invalid or non-hexadecimal 'commit' SHA in lock file at ${lockPath}: "${commit}".`);
  }

  return { repository, branch, commit: commit.toLowerCase() };
}

function queryUpstreamCommit(repository, branch) {
  const ref = `refs/heads/${branch}`;
  try {
    const stdout = execFileSync("git", ["ls-remote", repository, ref], {
      encoding: "utf8",
      timeout: 15000,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const lines = stdout.trim().split("\n");
    for (const line of lines) {
      const [sha, remoteRef] = line.trim().split(/\s+/);
      if (remoteRef === ref && HEX_OBJECT_ID_REGEX.test(sha)) {
        return sha.toLowerCase();
      }
    }

    fail(`Could not locate ref '${ref}' in git ls-remote output for ${repository}.`);
  } catch (err) {
    if (err.code === "ETIMEDOUT") {
      fail(`Network timeout (15s) while querying upstream remote ${repository}.`);
    } else if (err.code === "ENOENT") {
      fail(`'git' executable is not available in the system PATH.`);
    }
    const stderr = err.stderr ? err.stderr.trim() : err.message;
    fail(`Git ls-remote failed: ${stderr}`);
  }
}

function main() {
  console.log("=== Ozeonix Infinity: Agent Skills Upstream Checker ===");

  const lockFiles = findLockFiles();
  const repoMap = new Map();

  for (const { skillName, lockPath } of lockFiles) {
    const metadata = loadLockMetadata(lockPath);
    const key = `${metadata.repository}#${metadata.branch}`;
    if (!repoMap.has(key)) {
      repoMap.set(key, { ...metadata, skills: [] });
    }
    repoMap.get(key).skills.push(skillName);
  }

  let totalUpdates = 0;

  for (const [, item] of repoMap.entries()) {
    const { repository, branch, commit: installedCommit, skills } = item;
    console.log(`\nRepository:       ${repository}`);
    console.log(`Tracked branch:   ${branch}`);
    console.log(`Covered skills:   ${skills.join(", ")}`);
    console.log(`Installed commit: ${installedCommit}`);
    console.log("Querying upstream via git ls-remote (read-only)...");

    const upstreamCommit = queryUpstreamCommit(repository, branch);
    console.log(`Upstream commit:  ${upstreamCommit}`);
    console.log("--------------------------------------------------------");

    if (installedCommit === upstreamCommit) {
      console.log("STATUS: UP TO DATE");
      console.log("The vendored skill suite matches the latest upstream commit.");
    } else {
      totalUpdates++;
      console.log("STATUS: UPDATE AVAILABLE");
      console.log(`A new upstream commit exists on branch '${branch}'.`);
      console.log(
        `Compare diff: ${repository.replace(/\.git$/, "")}/compare/${installedCommit}...${upstreamCommit}`,
      );
      console.log("NOTE: Upstream updates must be manually reviewed and tested.");
      console.log(
        "Under no circumstances should external skill files overwrite local brand tokens.",
      );
    }
  }

  console.log("\n========================================================");
  if (totalUpdates === 0) {
    console.log("All vendored agent skill suites are up to date.");
  } else {
    console.log(
      `${totalUpdates} upstream skill suite(s) have updates available for manual review.`,
    );
  }
}

main();
