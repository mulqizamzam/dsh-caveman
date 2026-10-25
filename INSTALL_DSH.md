# Install and use DSH Caveman

Target: **DeepSeek Harness `0.2.1-rc.2`**.

## Prerequisites

- DSH `0.2.1-rc.2`, with a base-backed profile such as `web`.
- Node.js `^22.19.0` or `>=24.0.0`, matching the DSH target's manifest.
- Git access to this public repository.

Check the current DSH runtime:

```bash
node --version
dsh --version
```

## Install

```bash
dsh plugin --profile web add https://github.com/mulqizamzam/dsh-caveman
```

### Update an existing installation

If `dsh-caveman` is already installed, adding the repository again may leave the lockfile-pinned Git revision unchanged. Update the installed dependency explicitly, then restart the profile:

```bash
dsh plugin --profile web update dsh-caveman
```

The current bundle release is `0.2.1-rc.4`; each embedded skill declares `source: 'runtime'`, and the plugin declares `export const inject = ['skills']`. To verify the installed source, check `node_modules/dsh-caveman/index.js` contains that declaration near the top. If it does not, the profile is still using an older checkout.

The package declares `dsh.bundle.patch`; DSH's profile plugin manager installs the Git-hosted bundle and inserts its plugin row. Review the source and compatibility shown by DSH before confirming. If your build uses the Plugins UI, use its install/add-bundle flow with the same repository URL.

## Try a skill

In a DSH session:

```text
/caveman Explain this stack trace without omitting caveats.
/caveman-review Review the current diff for correctness and security.
/investigate-first Diagnose why the test intermittently fails. Do not edit yet.
/verify-and-stop Check the acceptance criteria and report proof.
```

Invocation by `/name` depends on the selected profile's skill consumer. If direct invocation is unavailable, ask the model to load the named skill from its DSH skill catalog.

## Configuration and environment

This bundle requires no additional API key, environment variable, provider, cloud service, or telemetry setting. DSH still needs its normal model credentials. Do not commit provider credentials here.

The only patch added is:

```yaml
- insert:
    - id: dsh-caveman
      name: 'dsh-caveman'
      disabled: false
```

The plugin registers virtual skills with `ctx.skills.register()`. It depends on the registry package already provided by a base-backed DSH profile. It does not change model routing, tool permissions, shell policy, credentials, persistence, or telemetry.

## Disable, remove, and update

Use the installed version's `dsh plugin --help` or DSH Plugins UI to disable, remove, or update the bundle. DSH distinguishes disabling a bundle from removing its installed package. Restart or open a fresh session when prompted, then verify a skill invocation.

A tagged source install can be used only after a release tag exists. For example, append `#v0.2.1-rc.2` once that tag is actually published and verified.

## Troubleshooting

- **`dsh` not found:** install or activate DSH using its official installation method, reopen the shell, and verify `dsh --version`.
- **Compatibility refused:** use DSH `0.2.1-rc.2`; check `engines.dsh` in `package.json`. DSH v0.2.1-alpha.3 and later treats `engines.dsh` as decisive when present.
- **No skill catalog:** use a base-backed profile mounting `@deepseek-ai/dsh-skill`, `@deepseek-ai/dsh-skill-filesystem`, and `@deepseek-ai/dsh-tool-skill`. Check whether the `dsh-caveman` row is enabled and whether profile composition reported a load error.
- **Plugin load error:** confirm `index.js`, `cordis.patch.yml`, package name, and `ctx.skills` service resolution. Review the DSH plugin-manager error before retrying; do not weaken the target version constraint.
- **No `/name` command:** invocation depends on the profile's Skill consumer. Load the named skill from the catalog instead.
- **Expecting token savings/proxy:** this skills-first port does not transform model requests or provide the upstream Caveman runtime. No numeric savings are promised.
