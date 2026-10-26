---
layout: post.njk
title: "The wrong rule in the wrong place"
description: "Instructions, enforcement and judgment for coding agents: why each rule needs a place that can actually hold it."
tags: post
date: 2026-10-27
language: english
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>AI-assisted programming • 7 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

Picture a Spring Boot service that manages its schema with Flyway. Two teams adopt the same coding
agent and worry about the same thing: the agent editing a migration that has already run.

The first team writes "Don't modify existing migrations" in the project instruction file. Weeks
later, a reviewer spots that the agent rewrote `V3__add_invoice_status.sql` to fix a column type.
The instruction was there. The agent read it. It still made the edit.

The second team learns from that and blocks all writes to the migrations folder. Nothing gets
edited any more. Then a feature needs a new column, and the agent can't create `V7` either.

The scenario is constructed, not recorded, but both failures will be familiar to anyone who has
configured an agent. [Last week](/articles/anatomy-of-a-coding-agent/) I said that "don't touch the
migrations folder" in an instruction file is a request, while a permission rule that blocks the
write is a control. This week is about what follows from that. My argument:

> The mistake isn't writing too few instructions or enforcing too few rules. It's putting the wrong
> rule in the wrong place.

## Three mechanisms, three different jobs

It's tempting to rank the options: instructions are weak, enforcement is strong, a human is the
final word. That ranking is what produced both failures above. The mechanisms don't sit on one
scale. They do different jobs.

**An instruction steers.** It tells the agent what you expect, so it tries the right thing first
and wastes fewer turns finding out what you'd reject. That's real value. An agent that knows the
migrations are off-limits will usually go and write a new one, which is what you wanted.

**Enforcement guarantees, within its perimeter.** A permission rule, a hook or a CI check holds
whether or not the model was paying attention. But it only covers the operations it intercepts and
the conditions it can check.

**A human decides.** Some questions aren't checks at all. Whether a schema change is acceptable, or
whether a destructive migration is worth the risk, needs someone with the context and the
authority to say yes.

## An instruction is not a guarantee

The two teams both thought about the *risk*: migrations getting damaged. That's too coarse to
place a rule. What you can place is a specific **property** you want to hold, and each one needs an
identifiable owner.

In the Flyway service, the risk area breaks down like this:

| Property or decision | Owner | Role |
| :--- | :--- | :--- |
| Applied migrations don't change | Flyway's validation, plus a CI check | Guarantee, within what they check |
| The agent doesn't try to edit them | Instruction in the project file | Steering, fewer wasted loops |
| A change needs a new migration, and that's acceptable | A person | Authority |

The first row hides a detail worth knowing. Flyway already records a checksum for every migration
it applies, and by default it validates them before migrating. Edit an applied file and the next
`migrate` against that database fails. But it only checks against databases that have run the
migration. A fresh local database won't complain. That's why the CI check matters, and why it needs
a trustworthy reference: a protected baseline of which migrations count as immutable, not just
"whatever is on the main branch today".

So the rule is:

> Every guarantee needs an identifiable owner: a mechanism, or a person when no mechanism can check
> it reliably. An instruction can't be that owner.

Several layers can support the same property. That's ordinary defence in depth. The mistake is
asking one of them to carry a responsibility it can't hold. The first team asked an instruction to
be a guarantee.

## When enforcement is the wrong answer

The second team made the opposite mistake, and it's the one people are less willing to hear: more
enforcement isn't automatically better.

Their deny rule wasn't wrong because it was strict. It was wrong because it protected a badly drawn
boundary. "Nothing in this folder may be written" isn't the property they cared about. "Files that
have been applied may not change" is. The first boundary is easy to express and blocks legitimate
work. The second is the actual requirement.

A rigid control on the wrong boundary has a cost the first team never paid: it blocks correct work,
and an agent that still has a task to finish may look for another route to it, such as the shell.
You've replaced a rule it might ignore with a wall it might walk around.

## Deciding where a rule goes

Here is the decision as I'd draw it. Three questions, in this order:

<img src="/images/website/articles/rule-placement.svg" alt="Decision flow for placing a rule for a coding agent. First question: does it require human judgment or authority? If yes, human authority. If no: would a violation be unacceptable? If no, an instruction. If yes: can a machine reliably check it? If yes, technical enforcement. If no, human review.">

Authority comes first on purpose. Some things a machine can check still need a person to own the
decision: approving a destructive migration is verifiable in the narrow sense and still not
something to delegate.

The last branch matters as much as the first. When a violation would be unacceptable but no
machine can check it reliably, the answer isn't an instruction with stronger wording. It's a
person **reviewing** the result. Authority and review are different jobs: one decides what's
allowed, the other checks what a machine can't.

The diagram identifies primary responsibility, not every supporting control. A human decision can
still be backed by a check that blocks execution until approval exists.

## "Human approval doesn't scale"

The strongest objection lands on that human column. Put an approval prompt in front of every
action, and by the twentieth one you're clicking yes without reading. Approval fatigue turns
oversight into a ritual.

That's true, and it's an argument for this approach, not against it. If every action needs a human,
the boundary is in the wrong place. Automate what can be verified. Pre-authorise what can be safely
bounded, like creating new migration files or running the test suite. Keep human judgment for the
decisions that actually need it, presented with enough context to judge.

Human authority also doesn't have to happen mid-run. A team policy that says "destructive schema
changes need two reviewers before merge" is a human decision, made once, in advance.

## What this looks like in Claude Code (October 2026)

Tool behaviour changes fast, so treat this as a dated example and check the
[official documentation](https://code.claude.com/docs/en/permissions) before copying it.

**Instruction.** `CLAUDE.md` is loaded as context. The documentation is explicit: Claude "treats
them as context, not enforced configuration".

**The over-broad boundary.** A deny rule in `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": ["Edit(/src/main/resources/db/migration/**)"]
  }
}
```

`Edit` rules apply to every built-in tool that edits files, including creating them, so this also
blocks the new `V7`. (A separate `Write(...)` rule isn't needed, and isn't matched.)

**A narrower boundary.** Instead of the deny rule, a `PreToolUse` hook matching `Edit|Write` receives
the target path before the call runs. A short script blocks the call if the file is under the
migrations folder *and already exists*. New migrations go through; existing ones don't.

**The perimeter.** A `PreToolUse` hook scoped to Edit and Write does not cover changes made through
Bash. You can add one for Bash, but parsing shell commands is best-effort. That's why the Flyway
validation and the CI check stay: they own the guarantee; the hook just stops the agent wasting a
run.

## The limit of this argument

Cost of failure, verifiability and authority are criteria, not a formula. Teams will disagree on
what counts as unacceptable, and a check that's reliable in one codebase is flaky in another.

What the criteria give you is a better question than "how do I make the agent obey?". Next week's
scenario uses an instruction on purpose: "don't modify existing tests". It stays an instruction
because a test can be genuinely wrong, and deciding when it is takes judgment. An instruction can be
the right choice precisely because a rule has legitimate exceptions. It just shouldn't be mistaken
for a guarantee.

As with every article in this series, the question underneath is the same:

**What engineering decision changes this agent's behaviour, and what evidence tells us whether it
helped?**

</div>
