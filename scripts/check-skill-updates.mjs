#!/usr/bin/env node
/**
 * Ozeonix Infinity — Read-Only UI/UX Pro Max Upstream Checker
 *
 * Checks whether the upstream Git repository has new commits beyond the pinned
 * commit recorded in `.agents/skills/ui-ux-pro-max/.upstream-lock.json`.
 *
 * Strictly read-only: does not clone, download, fetch, pull, or modify any files.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, "..");
const LOCK_FILE_PATH = resolve(ROOT_DIR, ".agents/skills/ui-ux-pro-max/.upstream-lock.json");

const HEX_OBJECT_ID_REGEX = /^[0-9a-fA-F]{40,64}$/;

function fail(message, exitCode = 1) {
  console.error(`[check-skill-updates] ERROR: ${message}`);
  process.exit(exitCode);
}

function loadLockMetadata() {
  if (!existsSync(LOCK_FILE_PATH)) {
    fail(`Lock file not found at ${LOCK_FILE_PATH}. Ensure the skill has been properly installed.`);
  }

  let lockData;
  try {
    const raw = readFileSync(LOCK_FILE_PATH, "utf8");
    lockData = JSON.parse(raw);
  } catch (err) {
    fail(`Failed to parse ${LOCK_FILE_PATH}: ${err.message}`);
  }

  const { repository, branch, commit } = lockData;

  if (!repository || typeof repository !== "string" || !repository.startsWith("http")) {
    fail(`Invalid or missing 'repository' URL in lock file.`);
  }
  if (!branch || typeof branch !== "string") {
    fail(`Invalid or missing 'branch' in lock file.`);
  }
  if (!commit || typeof commit !== "string" || !HEX_OBJECT_ID_REGEX.test(commit)) {
    fail(`Invalid or non-hexadecimal 'commit' SHA in lock file: "${commit}".`);
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
  console.log("=== Ozeonix Infinity: UI/UX Pro Max Upstream Checker ===");
  console.log("Reading lockfile: .agents/skills/ui-ux-pro-max/.upstream-lock.json");

  const { repository, branch, commit: installedCommit } = loadLockMetadata();

  console.log(`Repository:       ${repository}`);
  console.log(`Tracked branch:   ${branch}`);
  console.log(`Installed commit: ${installedCommit}`);
  console.log("Querying upstream via git ls-remote (read-only)...");

  const upstreamCommit = queryUpstreamCommit(repository, branch);

  console.log(`Upstream commit:  ${upstreamCommit}`);
  console.log("--------------------------------------------------------");

  if (installedCommit === upstreamCommit) {
    console.log("STATUS: UP TO DATE");
    console.log("The vendored UI/UX Pro Max skill matches the latest upstream commit.");
  } else {
    console.log("STATUS: UPDATE AVAILABLE");
    console.log(`A new upstream commit exists on branch '${branch}'.`);
    console.log(
      `Compare diff: ${repository.replace(/\.git$/, "")}/compare/${installedCommit}...${upstreamCommit}`,
    );
    console.log("NOTE: Upstream updates must be manually reviewed and tested.");
    console.log("Under no circumstances should external skill files overwrite local brand tokens.");
  }
}

main();
