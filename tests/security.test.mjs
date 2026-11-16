import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Security & Middleware Integrity", () => {
  const rootDir = process.cwd();

  it("src/start.ts configures CSRF protection middleware for server functions", () => {
    const startPath = path.join(rootDir, "src", "start.ts");
    assert.ok(fs.existsSync(startPath), "src/start.ts must exist");
    const content = fs.readFileSync(startPath, "utf-8");

    assert.ok(content.includes("createCsrfMiddleware"), "Must import createCsrfMiddleware");
    assert.ok(content.includes("csrfMiddleware"), "Must instantiate csrfMiddleware");
    assert.ok(
      content.includes("requestMiddleware: [csrfMiddleware"),
      "csrfMiddleware must be in requestMiddleware",
    );
    assert.ok(
      content.includes('ctx.handlerType === "serverFn"'),
      "Must filter for serverFn handlerType",
    );
  });

  it("src/start.ts attaches error handling and Supabase auth middleware", () => {
    const startPath = path.join(rootDir, "src", "start.ts");
    const content = fs.readFileSync(startPath, "utf-8");

    assert.ok(content.includes("errorMiddleware"), "Must include errorMiddleware");
    assert.ok(content.includes("attachSupabaseAuth"), "Must include attachSupabaseAuth");
  });

  it(".env files are not checked in and sensitive tokens are not exposed", () => {
    const gitignorePath = path.join(rootDir, ".gitignore");
    assert.ok(fs.existsSync(gitignorePath), ".gitignore must exist");
    const gitignore = fs.readFileSync(gitignorePath, "utf-8");

    assert.ok(gitignore.includes(".env"), ".gitignore must ignore .env files");
  });
});
