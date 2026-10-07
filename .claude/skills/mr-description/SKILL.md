---
name: mr-description
description: >-
  Drafts a merge request (MR) or pull request title and body in simple English
  from the current branch versus origin/main (Tabler Flags). Use when the
  user asks for an MR/PR description, GitLab merge request text, or a branch
  summary for reviewers.
---

# MR / PR description from branch

Produce a **short title** and a **markdown body**, each in its own fenced **`markdown`** block, ready to paste into GitLab (MR) or GitHub (PR). Ground everything in **actual git output** from this repo—not guesses.

## 1. Base branch (this repo)

**Default integration branch:** `main`. Compare against **`origin/main`**.

If `origin/main` is missing (offline clone, no remote), fall back to local `main`, then ask the user. Only use another base if the user says so explicitly.

**Comparison range:** use three-dot merge syntax so the description reflects *this branch's* commits and diff:

- Commits: `git log origin/main...HEAD --oneline`
- Diff: `git diff origin/main...HEAD`
- Overview: `git diff origin/main...HEAD --stat`

If the branch is not pushed yet: `git merge-base main HEAD` then `git diff <merge-base>...HEAD` (or same with `origin/main` when available).

## 2. Gather facts (run in parallel when independent)

From the repository root:

- `git status -sb`
- `git log origin/main...HEAD --oneline` (or `main...HEAD` if no remote tracking)
- `git diff origin/main...HEAD --stat`
- `git diff origin/main...HEAD` — if output is very large, rely on `--stat` plus targeted `git diff origin/main...HEAD -- <paths>` for the touched areas
- `git branch --show-current` — current branch name for the Vercel preview URL

Use this to infer **intent**, **user-visible behavior**, and **risk**—not only filenames.

**Existing PR content:** Before drafting, check whether a PR already exists for this branch (e.g. `gh pr view --json title,body,number,url` for the current branch, or a PR number/URL the user gave you). If one exists, read its current title and body first:

- Carry over any issue references it already contains — `Closes #N`, `Fixes #N`, `Resolves #N`, or a plain `#N` mention — into the new body. Put them in **Notes / rollout** (or, if the PR uses a dedicated `Issue`/`Closes` line, keep that same convention) so a regenerated description never silently drops the link to a tracked issue.
- Don't assume the diff alone tells you which issue this closes — the existing PR body is often the only place that link is recorded.
- If no PR exists yet, skip this step (there is nothing to carry over).

**Vercel preview URL:** only when the diff has **visual changes** a reviewer can check in the browser — new or changed flags in `src/**`, `import/**` sources that get generated into them, or the preview page itself (`preview/**`). Skip the preview URL for non-visual work (agent skills, CI, tooling, build scripts, README prose, lockfile, package config with no rendered effect).

When a preview URL is needed and the branch is pushed, Vercel deploys a preview of the **`preview/`** Astro app. The repo has **one** Vercel project:

| Diff touches | Project | Host |
| --- | --- | --- |
| `src/**`, `import/**`, `preview/**` | `tabler-flags` | `https://tabler-flags-git-{branch-slug}-tabler-io.vercel.app/` |

The preview app is a single page (`preview/src/pages/index.astro`) listing every flag in every variant, so the root URL is normally the right link — there are no deep paths to append.

Build `{branch-slug}` from the branch name (`git branch --show-current`): replace `/` with `-`, **remove dots entirely** (do not replace them with dashes), lowercase. Examples: `feature/add-revolut` → `feature-add-revolut`, `update-flags-1.2.0` → `update-flags-120`.

**Verify before pasting.** The slug rule is a convention, not a guarantee. Read the real url from the deployment, then `curl` each link you intend to put in the body:

```shell
gh api repos/tabler/tabler-flags/deployments --jq '[.[] | select(.environment | startswith("Preview"))][0].id'
gh api repos/tabler/tabler-flags/deployments/<id>/statuses --jq '.[0].environment_url'
curl -s -o /dev/null -w '%{http_code}\n' <link>
```

## 3. Title

- One line, **imperative mood**, **≤ 72 characters** when possible.
- Prefer **why** or **outcome** over a generic "Update components".
- Match existing team style if `git log origin/main..HEAD` shows a pattern (e.g. conventional prefixes).
- If the title names a **code-level identifier** (exported component, package name, prop, env var, exact symbol from the diff), wrap that token in **backticks** (grave accents), not quotes.

**Deliver the title to the user** inside a fenced **`markdown`** block with **only** the title line inside (no heading, no label). That matches the body block and makes one-click copy work in the UI.

Example (what you output):

```markdown
Add `Revolut` flag to all four flag packages
```

## 4. Body (markdown template)

Output the body in a **second** fenced **`markdown`** block after the title block. Use this structure inside that block. Omit **Notes / rollout** if nothing applies. Omit the **URL** line (or the whole **Preview** section) when there are no visual changes—do not link a Vercel preview in that case. Do **not** add a separate `## Test plan` section unless the user explicitly asks for one—use **Preview** (or a short "how to review" note under Summary) instead.

```markdown
## Summary

- …

## Preview

- **URL:** [preview link](https://tabler-flags-git-{branch-slug}-tabler-io.vercel.app/)
- **How to test:** … (concrete steps tied to the diff—which flag to look for, which variant, which framework package to import)

## Notes / rollout

- … (breaking changes, new packages, version bumps—only if supported by the diff)
```

**Summary bullets:** 1–4 bullets tying changes to product/engineering impact.

**Preview:** Include a Vercel **URL** only when the change is visual and the branch is pushed (or note that preview is unavailable until push). If there are no visual changes, omit the preview link entirely—do not add a generic preview URL. When a URL is included, use the Vercel format from §2. **How to test** should be actionable: which flag or component changed, which variant, and what the reviewer should expect to see. For non-visual PRs, say how to review the diff instead (e.g. which files to read, or `pnpm build` / `pnpm test`).

**Notes:** New packages, peer-dependency or engine changes, backwards compatibility—only when evidenced in the diff or commit messages. Also include any issue reference carried over from an existing PR (see §2), e.g. `Closes #123`.

## 5. Language (simple English)

Write the **title** and **full MR body** in **simple English**, even if the user asked in another language.

- Short sentences. Common words. One idea per sentence when possible.
- No buzzwords or filler. Use technical terms only when they appear in the code or are needed to name a behavior.
- Bullets should be easy to scan; avoid nested lists unless necessary.

## 6. After output

Offer to open/create the MR if the user uses **GitLab** (project MCP or UI) or **GitHub** (`gh pr create`), without running destructive git commands unless they ask.
