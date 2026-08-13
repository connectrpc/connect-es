# Releasing

## Prerequisites

- See the setup and tools required in CONTRIBUTING.md
- Make sure that the repository is in a good state, without PRs close to merge
  that would ideally be part of the release.

## Steps

1. Choose a new version (e.g. 1.2.3), making sure to follow semver. Note that all
   packages in this repository use the same version number.
2. Run `npm run setversion 1.2.3` and open a PR with the changes.

- Note: If releasing for a hotfix of a major version that is behind the current
  main branch, base the PR on an appropriate branch (e.g. release/v1.x).

3. Use the release notes as the PR description. See the section below for details.
4. Make sure CI passed on your PR and ask a maintainer for review.
5. After approval, merge your PR.
6. Create a GitHub release for the new version, with a tag `v1.2.3` on the merge
   commit, using the same release notes.
7. The tag triggers the publish workflow, which publishes to npm. Monitor the run
   and make sure it succeeds.

## Release notes

- We generate release notes with the GitHub feature, see
  https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes
- Only changes that impact users should be listed. No need to list things like
  doc changes (unless it’s something major), dependency version bumps, or similar.
  Remove them from the generated release notes.
- If the release introduces a major new feature or change, add a section at the
  top that explains it for users. A good example is https://github.com/connectrpc/connect-es/releases/tag/v0.10.0
  It lists a major new feature and a major change with dedicated sections, and
  moves the changelist with PR links to a separate "Enhancement" section below.
- If the release includes a very long list of changes, consider breaking the
  changelist up with the sections "Enhancements", "Bugfixes", "Breaking changes".
  A good example is https://github.com/connectrpc/connect-es/releases/tag/v0.9.0
- If the release includes changes specific to a npm package, group and explain
  the changelist in according separate sections. A good example is https://github.com/connectrpc/connect-es/releases/tag/v0.8.0
  Note that we are not using full package names with scope - a more user-friendly
  name like "Connect for Node.js" or "Connect for Fastify" is preferable.
