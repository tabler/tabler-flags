# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish the `@tabler/flags*` packages.

All packages share one version. A changeset on any of them bumps all of them.

## Add a changeset

After a change that should go to npm:

```bash
pnpm changeset
```

Commit the new file in `.changeset/` with your code.

Use `pnpm changeset --empty` for a change that should not publish (docs, CI, build tools).

## Release

1. Merge the PR into `main`.
2. CI opens a **Version packages** PR. It bumps versions and updates changelogs.
3. Merge that PR. CI publishes to npm with Trusted Publishers (OIDC) and creates a GitHub release.
