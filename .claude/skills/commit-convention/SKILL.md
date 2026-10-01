---
name: commit-convention
description: >
  Use this skill when the user asks to write a commit message, stage and commit
  changes, summarize a diff into a commit, prepare a PR description, or review
  whether a commit message conforms to this template's commitlint config.
  Triggers on: "write commit", "commit this", "commit message", "commit
  changes", "prepare PR", "PR description", "write PR", "commit convention",
  "conventional commit".
version: 1.0.0
argument-hint: '[--override-length]'
allowed-tools: [Read, Bash, Glob, Grep]
---

# Conventional Commits & PR Guidelines

This skill guides you to write git commits and PR descriptions that follow **Conventional Commits v1.0.0** (https://www.conventionalcommits.org/) and **Angular's commit guidelines** (https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines), adapted with this project's own scope convention (see Scope & Submodules below).

## Quick Rules

| Rule             | Value                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Format           | `type(scope): subject`                                                                                                 |
| Case             | All lowercase                                                                                                          |
| Tense            | Imperative, present ("add" not "added")                                                                                |
| Scope            | The top-level module/feature — see "Scope & Submodules" below                                                          |
| First-line limit | **72 characters** (GitHub truncates beyond this on PR pages)                                                           |
| Trailing period  | No                                                                                                                     |
| Body             | **Rare.** Only when the subject can't convey a non-obvious change. Every body line ≤100 chars (commitlint hard limit). |
| Footer           | Optional; `BREAKING CHANGE:` for breaking changes, `#issue` for issue references                                       |

---

## Commit Granularity

One commit = one logical change. Stage the **minimal set of related files**, not the whole working tree.

- When the working tree mixes concerns, split into **multiple focused commits** — each with its own `git add` + `git commit` pair.
- Do **not** bundle unrelated files just because they are dirty.
- A good commit can be described in a single subject line without "and".

---

## Commit Ordering & Dependencies

When emitting a **sequence** of commits, order them so dependencies come first.

**Rule:** a commit may only reference a method, class, or file that either (a) already exists in prior history, or (b) is introduced in that same commit. No forward references.

**Example of the failure mode:**

```
# Wrong — service references repo method added in the NEXT commit
feat(pricing): add pricing service   ← references applyLotPricing()
feat(pricing): add pricing repository  ← applyLotPricing() defined here
```

**Corrected order:**

```
# Correct — repository exists before the service that uses it
feat(pricing): add pricing repository  ← applyLotPricing() defined here
feat(pricing): add pricing service     ← calls applyLotPricing()
```

---

## Valid Commit Types

| Type       | When to Use                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `feat`     | New capability, visible to users/consumers                                                       |
| `fix`      | Bug fix                                                                                          |
| `refactor` | Internal restructure, no behavior change                                                         |
| `chore`    | Repo housekeeping — not a build/dependency/CI change (editor config, .gitignore, misc scripts)   |
| `docs`     | Documentation only                                                                               |
| `test`     | Test additions or modifications only                                                             |
| `perf`     | Performance improvement                                                                          |
| `ci`       | CI/CD pipeline configuration                                                                     |
| `build`    | Build system changes, or dependency additions/updates (`npm install`, `package.json`, lockfiles) |
| `revert`   | Reverts a prior commit                                                                           |
| `style`    | Formatting/whitespace only — zero logic change                                                   |

---

## Subject Line (first line)

**Format:** `type(scope): description`

**Rules:**

- **Type**: One from the table above, all lowercase.
- **Scope**: Optional. Noun describing the section of the codebase. Examples: `auth`, `database`, `exportation`, `pricing`. Lowercase, no hyphens between words (compound scopes are rare).
- **Colon & space**: Always required after `type(scope)`.
- **Description**: Imperative mood (think "if applied, this commit will..."). No capital letter at the start. No period at the end.

**Examples:**

✅ `feat(exportation): add pricing repository`

✅ `fix(auth): resolve token expiration edge case`

✅ `docs: update contributing guide`

✅ `test(database): add migration validation tests`

❌ `feat(exportation): Added pricing repository` — capitalized, wrong tense

❌ `feat(exportation): add pricing repository.` — period at end

❌ `feature(exportation): add pricing repository` — wrong type

---

## Scope & Submodules

**Scope is the top-level module** the change lives in — `auth`, `users`,
`roles`, or an infra scope like `db`, `deps`, `seeds`, `env`, `jest`, `ai`,
`ci`. Kebab-case for multi-word scopes (`voucher-events`, `sales-orders`).

If the change is inside a **sub-resource** (a nested module in backend, or a
nested feature/page in frontend — see the `architecture` skill for your
stack), the scope stays the parent/domain, and the submodule name goes in
the subject text instead of a compound scope:

✅ `feat(exportation): add products controller and wire module`

✅ `fix(exportation): order service pass supplier name instead of cnpj`

❌ `feat(exportation-products): add controller` — don't compound the scope with the submodule

This keeps scopes stable and greppable (`git log --grep='^feat(exportation)'`
finds every change to the domain) while the subject still tells you exactly
which submodule changed.

---

## The 72-Character Guard

GitHub's PR view truncates commit subjects longer than 72 characters. If your subject exceeds this:

1. Show a warning with the full length.
2. Suggest 1–3 shortened alternatives, each ≤ 72 chars.
3. Do **not** emit the git commands.
4. To override and use the original subject anyway, invoke `/commit-convention --override-length`.

**Count everything**: `type(scope): description` — all characters, including the colon and space.

**Commit body**: separately, commitlint enforces a **100-char hard limit on every individual body line** (`body-max-line-length`, inherited from `@commitlint/config-conventional`, `error` severity — the commit-msg hook rejects the commit outright if violated, no override exists). See Body below.

---

## Body (rare — default is no body)

The default is **subject only**. Add a body only when **both** conditions hold:

1. The subject line alone can't describe the change precisely.
2. The change is non-obvious or must be documented for future readers.

Obvious changes (add a field, wire a module, rename a method) get **no body**.

Separated from the subject by a **single blank line**.

**Purpose:** Explain WHY the change exists, not WHAT was changed (the diff shows that).

**Style:**

- Imperative mood, same as subject.
- Every line ≤100 chars — commitlint hard limit, no override (see The 72-Character Guard above). Split long sentences across multiple `-m` flags rather than one long line.
- Focus on motivation and contrast with prior behavior.

**Example (a case that genuinely warrants a body):**

```
feat(pricing): compute cost-price USD from snapshot

capture cost_price_brl and purchase_fx_rate at pricing write time.
net_weight is read live from export_products_data so weight review
updates propagate into pricing calculations.

this freezes the cost basis against purchase-time values — both
fields are immutable once the product is purchased.
```

---

## Footer (optional)

Separated from the body by a **single blank line**.

**Tokens:**

- **`BREAKING CHANGE:`** Denotes a breaking change. Include a description of what breaks and what users should do.
- **`#123`** or **`Closes #123`** for issue references.
- **`Co-Authored-By: Name <email>`** for multiple contributors.
- **Other metadata**: `Reviewed-by:`, `Refs:` — free-form key-value pairs.

**Example:**

```
fix(auth): remove deprecated password grant

BREAKING CHANGE: Password grant is no longer supported. Use OAuth
Bearer token instead. Migrate by updating client credentials in
your .env file.

Closes #456
Co-Authored-By: Alice <alice@example.com>
```

---

## Breaking Changes (Alternative Notation)

Conventional Commits v1.0.0 also allows an exclamation mark (`!`) between the scope and colon to signal a breaking change:

```
feat(pricing)!: rename cost_price to unit_cost

This changes the public API of ExportProductPricingModel.
```

Both notations are valid. The `!` form is shorter for simple breaking changes; the footer form is better for detailed explanations.

---

## PR Description Format

See `references/pr-format.md` for the full template. Quick structure:

**Lead paragraph** (one sentence): What the PR does and what it builds on.

**Included changes** (grouped by concern — concerns depend on the stack, see
`references/pr-format.md` for the backend and frontend lists):

- Backend example: `db migrations`, `exceptions`, `DTOs` (request /
  response), `repository`, `service`, `controller`, `module wiring`.
- Frontend example: `types`, `API`, `hooks`, `components`, `Main.jsx` wiring.

Each item: `` `identifier` — description ``.

**Test plan** (checkbox list):

- `[ ] npx tsc --noEmit` — no TypeScript errors
- `[ ] npm run test:integration -- <module>` (backend) or the project's
  frontend test command — automated tests pass
- `[ ] Manual verification: [step-by-step instructions]`

**Output:** emit the PR description inside a fenced markdown code block so the raw markdown is copy-pasteable directly into GitHub's PR description field.

---

## Output Format (for Claude)

When instructed to write a commit, Claude outputs **text only** — never executes git commands. Always use the raw form below — **never** use `cat <<'EOF'` heredocs.

**Subject only (the default — most commits):**

```
git add <file1> <file2>
git commit -S -m "type(scope): subject"
```

**With body (rare — only when both body conditions above are met):**

```
git add <file1> <file2>
git commit -S -m "type(scope): subject" -m "body paragraph"
```

Chain multiple `-m` flags for multiple body paragraphs — each becomes a separate paragraph in the commit message. The subject is **always all lowercase**.

Copy-paste these lines directly into your terminal.

---

## Workflow: Writing a Commit

1. **Read the code/diff** to understand what changed and WHY.
2. **Pick a type** from the valid types table.
3. **Pick the scope** — the top-level module; put any submodule name in the subject text (see Scope & Submodules).
4. **Compose the subject** in imperative mood, <= 72 chars total.
5. **If flagged for length**, either shorten the subject or pass `--override-length`.
6. **Write the body** (optional) to explain motivation, wrapping every line to <= 100 chars.
7. **Add footer tokens** for breaking changes or issue references.
8. **Copy and paste** the `git add` and `git commit` commands.

---

## Workflow: Writing a PR Description

1. Summarize the PR in one sentence: "This PR adds [feature] building on top of [prior PR]."
2. List all changes grouped by concern (db, service, controller, etc.).
3. Add a test plan checklist.
4. Use the template in `references/pr-format.md` for full structure.

---

## Common Mistakes

| ❌ Wrong                                                | ✅ Right                                                                  |
| ------------------------------------------------------- | --------------------------------------------------------------------------- |
| `feat(auth): Add user login`                            | `feat(auth): add user login` — all lowercase                              |
| Body on every commit                                    | Body only on non-obvious changes — most commits are subject-only          |
| One long unbroken body sentence past 100 chars          | Split across multiple `-m` flags so each line stays <= 100 chars          |
| One commit with 12 files from 4 concerns                | Multiple focused commits, one per concern                                 |
| `git commit -S -m "$(cat <<'EOF' ..."`                  | `git commit -S -m "type(scope): subject"` — raw form only                 |
| Service commit before repository commit                 | Repository commit first — dependencies before consumers                   |
| Compound scope for a submodule (`exportation-products`) | Scope stays the domain (`exportation`); name the submodule in the subject |
| Requiring `#issue` in every subject                     | Issue refs are an optional footer token — see Footer above                |

---

## Key References

- [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Why 72 characters?](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) — GitHub + email clients wrap here
