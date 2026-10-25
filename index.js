/** Portable DSH skill bundle. No proxy, network calls, telemetry, or model mutation. */
export const name = 'dsh-caveman'

/** Cordis services required by apply(). */
export const inject = ['skills']

const entry = (name, description, lines) => ({ name, description, source: 'runtime', content: lines.join('\n') })

export const skills = [
  entry('caveman', 'Use concise, answer-first communication without losing technical facts, qualifications, or negations.', [
    '# Caveman', 'Write concise, clear prose. Remove ceremony, not meaning.',
    'Lead with the answer. Remove filler, repeated summaries, empty hedges, and closers when they add no information.',
    'Preserve all material facts, caveats, conditions, uncertainty, counterarguments, and negations such as not, never, no, only, and except.',
    'Keep code, commands, paths, URLs, identifiers, numbers, units, API names, and quoted errors exact. Do not rewrite user prompts unless asked.',
    'Use the user’s language. Never invent abbreviations or imitate broken grammar.',
    'Use full sentences for security warnings, irreversible actions, complex sequences, ambiguity, and questions.',
    'For files, commits, reviews, and other persisted work, prefer professional clarity over compressed style.',
    'If shorter wording is not equally clear, keep the original. This instruction does not create persistent host state.'
  ]),
  entry('ultracave', 'Use maximum concise style only when fragments stay clear and exact.', [
    '# Ultracave', 'Use the fewest words that remain exact and unambiguous. State each fact once.',
    'Drop redundant articles and connectives only when sentence order remains clear.',
    'Preserve facts, conditions, uncertainty, exceptions, negations, numbers, units, code, paths, commands, and error strings.',
    'Use full prose for safety, irreversible actions, multi-step instructions, uncertainty, and questions.',
    'Do not claim token or cost savings without a measured baseline and comparable measurement. Restore full sentences whenever a fragment admits two readings.'
  ]),
  entry('megacave', 'Use Classical Chinese 文言文 when explicitly requested; preserve technical payloads and negations.', [
    '# Megacave — 文言文', '以文言答。唯贅言可去，技術之實皆存。',
    'Use readable Classical Chinese, not modern Chinese decorated with particles.',
    'Keep code, commands, paths, URLs, API names, identifiers, and errors verbatim in their original script.',
    'Preserve negation (不、非、勿、未、毋), numbers, units, conditions, exceptions, and uncertainty.',
    'If 文言 makes instructions ambiguous, use clear 白話 or the user’s language for that passage.',
    'Never claim token savings without a measured, comparable evaluation.'
  ]),
  entry('caveman-review', 'Review diffs for actionable correctness and security issues grounded in actual code.', [
    '# Engineering review', 'Review the actual diff and relevant surrounding code. Do not claim tests ran without execution evidence.',
    'For each finding, give the exact file and line read, concrete defect, triggering condition, impact, and narrow fix.',
    'Prioritize security, data loss, incorrect behavior, crashes, concurrency, compatibility, and error handling before style.',
    'Avoid unsupported hypotheticals and summaries of behavior without a defect. Separate questions and low-priority nits.',
    'If no issue is evidenced, say so. Report tests as passed, failed, not run, or unavailable accurately.',
    'Use full rationale for security findings and architectural trade-offs.'
  ]),
  entry('caveman-commit', 'Draft a concise Conventional Commit message; do not perform Git operations.', [
    '# Conventional Commit writer', 'Write a commit message only. Do not stage, commit, amend, or claim a commit occurred.',
    'Subject format: type(optional-scope): imperative summary. Use feat, fix, refactor, perf, docs, test, chore, build, ci, style, or revert.',
    'Prefer 50 characters; maximum 72. No trailing period. Describe intent, not a list of files.',
    'Add a body for non-obvious rationale, breaking changes, security fixes, migrations, or linked issues.',
    'Never invent issue numbers, authorship, or test results. Follow repository conventions.'
  ]),
  entry('investigate-first', 'Diagnose ambiguous or intermittent failures before editing; rank hypotheses by evidence.', [
    '# Investigate first', 'Separate observed symptoms from inferred causes.',
    'Trace inputs, state transitions, ownership boundaries, logs, and failure output. Search relevant implementation and tests.',
    'Rank hypotheses by evidence and cheap falsification. Reproduce the failure when economical.',
    'Do not edit until one credible mechanism explains the evidence unless asked only for a proposal.',
    'Stop when evidence identifies the cause or a concrete blocker. Report uncertainty and do not claim unrun checks.'
  ]),
  entry('lean-build', 'Implement bounded features with explicit acceptance criteria and focused regression proof.', [
    '# Lean build', 'Inspect repository instructions, architecture, related behavior, and tests before editing.',
    'Define observable acceptance criteria and non-goals. Do not infer unstated requirements.',
    'Reuse existing ownership boundaries and seams. Refactor only when correctness or maintenance requires it.',
    'Add dependencies, abstractions, modes, configuration, and polish only when acceptance needs them.',
    'Preserve public interfaces, workflows, user changes, and safety checks. Keep intermediate states testable.',
    'Run focused proof and nearby regression checks. Stop when acceptance passes; report material omissions.'
  ]),
  entry('migration', 'Plan reversible API, schema, protocol, configuration, or dependency migrations.', [
    '# Safe migration', 'Map current readers, writers, data shapes, compatibility window, and ownership first.',
    'Define forward and rollback paths. Preserve data and request explicit authorization for destructive operations.',
    'Where versions overlap, keep old and new paths compatible. Prefer expand, migrate, verify, then contract.',
    'Make retries idempotent and partial failures observable. Test required transition stages and rollback when feasible.',
    'Do not perform final destructive contraction implicitly. State risk and what evidence authorizes the next phase.'
  ]),
  entry('safe-refactor', 'Restructure code while preserving behavior, interfaces, ordering, and failure semantics.', [
    '# Safe refactor', 'Define the behavior-preservation boundary and run baseline verification before structural edits.',
    'Keep feature changes separate where practical. Move one ownership boundary at a time.',
    'Preserve interfaces, errors, ordering, concurrency, persistence, compatibility, user changes, and existing comments.',
    'Avoid new dependencies or configuration unless correctness requires them. Keep intermediate changes buildable.',
    'Run the same proof after the change plus focused regression tests. Stop when behavior and requested structure match.'
  ]),
  entry('surgical-patch', 'Fix a focused bug at the narrowest responsible layer and add regression proof.', [
    '# Surgical patch', 'Reproduce the failure or capture the strongest available evidence before editing.',
    'Trace the symptom to the mechanism. Change the narrowest responsible layer.',
    'Preserve unrelated behavior, user changes, interfaces, and comments. Add a regression test for the trigger where practical.',
    'Run focused regression proof and the nearest affected test/build gate. Do not weaken tests to get a pass.',
    'Stop when fixed and proven. Report wider checks not run.'
  ]),
  entry('verify-and-stop', 'Validate finished work against acceptance criteria without expanding scope or overstating evidence.', [
    '# Verify and stop', 'Translate acceptance criteria into the smallest sufficient proof set.',
    'Reuse only results that match the current repository state. Run focused checks before wider gates.',
    'Distinguish PASS, FAIL, BLOCKED, and NOT RUN, with exact commands and reasons.',
    'Inspect manifests, generated artifacts, dependency declarations, package shape, and secrets boundaries when in scope.',
    'Do not edit product code unless fixes are authorized. Stop once proof is complete and report unresolved risk.'
  ]),
  entry('caveman-help', 'List available DSH Caveman skills and clarify what this bundle does and does not provide.', [
    '# DSH Caveman help', 'This bundle contributes instructions, not a proxy or CLI. Use the DSH skill catalog or explicit invocation if enabled.',
    'Response modes: caveman, ultracave, megacave. Engineering: caveman-review, caveman-commit, investigate-first, lean-build, migration, safe-refactor, surgical-patch, verify-and-stop.',
    'Skill installation grants no filesystem, shell, repository, network, cloud, or deployment permissions.',
    'No numeric token-savings percentage is promised. This package does not install the upstream Caveman runtime.'
  ])
]

export function apply(ctx) {
  if (!ctx?.skills || typeof ctx.skills.register !== 'function') {
    throw new Error('dsh-caveman requires the DSH Skill Registry (ctx.skills); enable a base-backed profile first')
  }
  for (const skill of skills) ctx.skills.register({ ...skill })
}
