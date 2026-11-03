import assert from "node:assert/strict";
import test from "node:test";
import { answer } from "../dist/app.js";

test("policy uses the active source when an archived source appears first", () => {
  const documents = [
    { id: "warranty-old", revision: "1", topic: "warranty", state: "archived", text: "Warranty lasts 90 days." },
    { id: "warranty-current", revision: "2", topic: "warranty", state: "active", text: "Warranty lasts 30 days." }
  ];
  const result = answer({ kind: "policy", topic: "warranty" }, {
    documents,
    lookup: () => { throw new Error("Account lookup must not run"); },
    model: source => `Policy: ${source.text}`
  });

  assert.equal(result.status, "ok");
  assert.equal(result.text, "Policy: Warranty lasts 30 days.");
  assert.deepEqual(result.citations, ["warranty-current"]);
});
