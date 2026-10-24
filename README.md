# DSH Caveman

**DeepSeek Harness skill bundle · `0.2.1-rc.2`**

A beginner-friendly, skills-first port of reusable Caveman response-style and engineering workflows for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). It contributes 12 DSH Skills for concise communication, evidence-led code review, commit-message drafting, debugging, bounded feature work, refactoring, migrations, focused fixes, and verification.

> **Scope:** this is a native DSH *bundle*, not the upstream Caveman CLI or proxy. It does not ship Caveman's Go engine, provider proxy, model routing, token-compression middleware, browser service, telemetry, Cloud features, or binary installers. Those require separate runtimes/integrations and are not emulated here.

## Included workflows

| Skill | Purpose |
|---|---|
| `caveman` | Concise, answer-first communication without losing technical meaning |
| `ultracave` | Stronger compression when clarity survives |
| `megacave` | Classical Chinese register when explicitly requested |
| `caveman-review` | Actionable review findings grounded in the diff |
| `caveman-commit` | Conventional Commit message drafting; no git mutation |
| `investigate-first` | Evidence-ranked diagnosis before edits |
| `lean-build` | Bounded features with acceptance criteria |
| `migration` | Reversible, compatibility-aware migrations |
| `safe-refactor` | Behavior-preserving restructuring |
| `surgical-patch` | Narrow bug fix with regression proof |
| `verify-and-stop` | Focused validation with honest status reporting |
| `caveman-help` | Reference for the installed skills |

Skills preserve code, commands, paths, identifiers, negations, numbers, caveats, and uncertainty. They do not claim tests were run or token savings occurred without evidence. They do not grant filesystem, shell, network, cloud, or deployment permissions.

## Prerequisites

- DeepSeek Harness **`0.2.1-rc.2`**.
- Node.js `^22.19.0` or `>=24.0.0` (the DSH target's declared range).
- A base-backed DSH profile with the Skill Registry. The examples use `web`.
- Git access to this public repository.

## Install into DSH

1. Check that DSH runs:

   ```bash
   dsh --version
   dsh --profile web "Say hello in one sentence."
   ```

2. Install the Git-hosted bundle into the `web` profile:

   ```bash
   dsh plugin --profile web add https://github.com/mulqizamzam/dsh-caveman
   ```

3. Restart the profile/session if DSH requests it. DSH's Skill Registry and skill consumer load the instructions. Invocation via `/name` depends on the selected profile's skill consumer.

4. Try these prompts in a DSH session:

   ```text
   /caveman Explain this error without omitting caveats.
   /caveman-review Review the current diff for correctness and security.
   /investigate-first Diagnose why the test intermittently fails. Do not edit yet.
   /verify-and-stop Check the acceptance criteria and report proof.
   ```

See [INSTALL_DSH.md](INSTALL_DSH.md) for configuration, upgrade/removal guidance, and troubleshooting.

## Configuration

No extra API keys, environment variables, providers, or external service are required by this bundle. DSH still needs its normal model setup. The bundle inserts one enabled row into a base-backed profile and does not alter existing tools, model selection, credentials, persistence, or permission policy:

```yaml
- insert:
    - id: dsh-caveman
      name: 'dsh-caveman'
      disabled: false
```

Its `package.json` declares `dsh.bundle.patch`, `engines.dsh`, and the matching DSH/Cordis peer dependencies.

## Develop and validate

Requires Node.js and Python 3:

```bash
npm test
python3 scripts/validate.py
python3 scripts/package.py /tmp/dsh-caveman.zip
```

Local tests validate skill registration and metadata; the validator checks package declarations and required files. A smoke test in an actual DSH `0.2.1-rc.2` runtime remains an additional integration check.

## Compatibility limits

- The response style is an instruction, not a persistent runtime toggle. Reinvoke it or store a suitable instruction through your normal DSH workspace/profile mechanism if needed.
- This package changes instructions, not model requests or provider routing. It makes no numeric token-savings claim.
- It does not install or configure upstream Caveman for other coding agents.

## Credits and license

Inspired by reusable response-style and engineering Skills in [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman). See [NOTICE](NOTICE) and [LICENSE](LICENSE). Independent port; not an official upstream Caveman or DeepSeek Harness release.
