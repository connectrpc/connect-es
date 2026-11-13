## Behavior

- For code changes, make the MINIMAL change that satisfies the request. If you believe an optimization, refactor, or abstraction is warranted, make the minimal change first, then offer to make the larger change when you're done.
- Never state an unverified result or mechanism in the declarative voice. Tag it inline: "unverified", "hypothesis".

## Code

Rules for any code written.

- Every exported symbol gets a doc comment: functions, methods, types, struct fields, consts, vars, packages.
- Avoid magic numbers and strings by extracting recurring or meaningful values into named constants or enums. Derive the constant when reasonable.

## Unit Tests

- Write the smallest test that would fail if the behavior broke. One test per behavior; merge tests that share setup and differ only in assertions.
- Prefer tests that don't rely on real elapsed time (await the actual event, or use mock timers). Use your discretion here - some tests may be significantly less readable without wall clock time.

## TypeScript guidelines

- For libraries, bundle size is extremely important, so treat added code as a cost the change must earn.
- For `node:test`:
  - use `assert.strictEqual(x, y)` / `assert.deepStrictEqual(x, y)` for equality checks.
  - use `assert.notStrictEqual(x, y)` / `assert.notDeepStrictEqual(x, y)` for inequality checks, unless type narrowing is required, in which case use `assert.ok(x !== y)`, e.g. `x !== undefined`, `x !== null`, narrowing a union.
  - use `assert.ok()` for booleans.
  - Use the test framework's built-ins (timeouts, `t.signal`, `t.after`, fixtures) before writing helpers.
