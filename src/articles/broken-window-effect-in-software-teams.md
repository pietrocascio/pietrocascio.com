---
layout: post.njk
title: "The broken window effect in software teams: why bad code is contagious"
description: "How rotten codebases and diffuse ownership act as an unsupervised mentor, training developers to mimic anti-patterns and spreading technical debt."
tags: post
date: 2026-08-22
language: english
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>Software engineering & culture • 7 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

A while ago, I was reviewing a pull request submitted by a junior software engineer on a consulting
project.

The ticket was straightforward: integrate a third-party billing notification into our existing
payment workflow. When I looked at the implementation, everything seemed to work on the happy path.
But when an external call failed, the code wrapped the failure in a generic `catch (Exception e)`
block, swallowed the exception, logged a single vague line, and returned a silent `null`.

There was no retry mechanism, no fallback, and no error propagation. If the upstream provider timed
out or returned a 500 status, the system would quietly record the operation as successful and
continue.

When I asked the engineer about the reasoning during our review, their response was simple:

*"I looked at the other three payment services in the module, and they all do it this way. The
requirements didn't specify what to do on failure, so I assumed this was our standard error-handling
pattern."*

They weren't wrong. I checked the surrounding codebase. Three adjacent services were doing the exact
same thing: swallowing errors, ignoring edge cases, and blindly assuming that external dependencies
would always succeed.

The engineer hadn't made a careless mistake. They had behaved rationally. They joined a new
codebase, looked for examples of how the team wrote code, found a prevailing pattern, and mirrored
it.

The real problem wasn't inexperience. The problem was that the codebase had acted as their primary
mentor—and it had taught them the wrong lesson.

## From metaphor to science: the broken window effect in code

The idea that visible disorder encourages further neglect is not new. In 1982, social scientists
James Q. Wilson and George L. Kelling published their famous "Broken Windows" thesis in criminology.
They argued that an unrepaired broken window in a building signals that nobody is in charge, rapidly
inviting more vandalism, litter, and decay.

In 1999, Andrew Hunt and David Thomas brought that concept into software development in *The
Pragmatic Programmer*:

> *"Don't leave 'broken windows' (bad designs, wrong decisions, or poor code) unrepaired. Fix each
one as soon as it is discovered."*

For decades, the "broken window theory" in software was treated as an intuitive piece of engineering
wisdom. We all knew that messy code tends to get messier, but we treated it primarily as a metaphor.

Recently, however, empirical software engineering research has tested this dynamic under controlled
conditions.

In a 2024 controlled experiment conducted at Chalmers University of Technology
([Levén et al., 2024](https://arxiv.org/abs/2209.01549)), researchers gave professional software
developers identical tasks on either a clean codebase or a codebase seeded with technical debt. They
then measured how developers wrote new code.

The results were striking:

* Developers working in the high-debt codebase were **102% more likely to duplicate existing logic**
  instead of reusing clean abstractions.
* They were **458% more likely to introduce non-descriptive, generic variable names**.
* They introduced **117% more static analysis code smells** into their new code.

Because the researchers controlled the starting state of the code, this was not just a correlation.
Working in a degraded codebase **causally caused** developers to produce worse code.

In post-experiment interviews, developers admitted that the ambient mess lowered their standards.
When the surrounding code was already chaotic, spending time designing clean abstractions felt
pointless. They simply adapted downward to match the room.

## The codebase is your team's loudest mentor

In behavioral psychology, researchers distinguish between two types of social norms:

1. **Injunctive norms:** What people *ought* to do (e.g., the coding standards written in your
   team's Confluence wiki).
2. **Descriptive norms:** What people *actually* do (the physical code committed to the repository).

Whenever there is a conflict between what the wiki says and what the codebase shows, **the codebase
always wins**.

This dynamic is especially acute for junior engineers and newcomers.

When experienced engineers approach a new problem, they rely on a vast mental library of
architectural schemas—pre-compiled mental models of design patterns, error boundaries, and edge
cases built over years of practice.

Junior developers do not have those schemas yet. When given a ticket with ambiguous edge cases—such
as what to do when a remote service fails—they survive through **pattern matching**:

1. They search the repository for a similar feature.
2. They inspect how existing classes solve the problem.
3. They copy the structure and adapt it to their requirements.

If the existing codebase assumes the happy path, swallows exceptions, or bypasses domain boundaries,
the junior developer does not see a "shortcut." They see a validated team standard. They reproduce
the anti-pattern, commit it, and spread the contagion further into the system.

## The illusion of collective ownership

This problem is magnified in teams that practice what is nominally called "collective code
ownership," but in practice operates as **diffuse non-ownership**.

The original Extreme Programming definition of collective ownership required tight pairing,
exhaustive automated test suites, and continuous refactoring. Without those strict engineering
guardrails, "everyone owns the code" quietly becomes "nobody is responsible for this module."

In 2011, Microsoft Research published a landmark empirical study titled *"Don't Touch My Code!
Examining the Effects of Ownership on Software Quality"*
([Bird et al., 2011](https://doi.org/10.1145/2025113.2025119)), analyzing Windows Vista and Windows
7.

The researchers discovered that:

* Components touched by many **minor contributors** (developers responsible for less than 5% of
  total commits) had significantly higher failure rates and post-release defects.
* Components with **high, focused ownership** (where a primary owner or dedicated core team
  made at least 75% of changes) had drastically lower defect densities.
* Ownership metrics were more accurate at predicting software bugs than traditional complexity
  metrics like code churn or file size.

When code has no clear owner, there is no one to protect its architectural boundaries. Junior
developers submit pull requests that get rubber-stamped by busy colleagues who lack context on the
module. Over time, the code drifts, consistency collapses, and the broken windows multiply.

## The cognitive and human toll

A decaying codebase is not just an abstract architectural issue; it is a direct driver of cognitive
fatigue, developer unhappiness, and burnout.

According to Cognitive Load Theory, human working memory can only process roughly four chunks of
novel information simultaneously. In software comprehension, cognitive effort is divided into:

* **Intrinsic load:** The mental effort required to solve the core business problem.
* **Extraneous load:** The mental energy wasted deciphering cryptic variable names, 800-line
  methods, hidden side effects, and missing tests.
* **Germane load:** The mental capacity dedicated to learning and building long-term architectural
  understanding.

When a codebase is full of broken windows, extraneous load consumes nearly all available working
memory. There is no mental bandwidth left for learning.

In empirical research on developer emotions
([Graziotin et al., 2017](https://doi.org/10.1109/MS.2017.4121208)), **bad code quality and
technical debt consistently rank among the top external causes of developer unhappiness**.

For junior developers, this creates a toxic feedback loop:

1. They struggle to navigate a convoluted, unowned codebase.
2. They assume their struggle is due to personal inadequacy rather than accidental complexity
   (imposter syndrome).
3. Under time pressure, they copy existing bad patterns to ship their tickets.
4. The codebase degrades further, and their enthusiasm deteriorates.

This has measurable economic consequences. In their global *Developer Coefficient* study, Stripe
found that software developers spend an average of **17.3 hours per week** on maintenance,
debugging, and dealing with technical debt—with **4.0 hours per week lost strictly to bad code**.
Globally, that represents billions of dollars in wasted engineering payroll and immense frustration
for engineering teams.

## Breaking the contagion: practical guardrails

If code quality is contagious, how do we reverse the trajectory? How do we build an environment
where junior engineers learn good habits by default?

Relying on good intentions or asking people to "be more careful" does not work. You need structural
guardrails:

### 1. Provide clear reference implementations (worked examples)

Recognize that developers will always look for existing code to copy. Instead of fighting this
instinct, provide dedicated "Golden Paths" or reference implementations within your repository.
Ensure that your core templates demonstrate robust error handling, domain isolation, and
comprehensive unit tests. When juniors look for examples, make sure the closest example is a good
one.

### 2. Establish explicit module ownership

Move away from diffuse non-ownership. Use `CODEOWNERS` files and clear team boundaries to ensure
that every service, library, and domain component has designated maintainers. Require that
contributions from non-owners or junior developers be reviewed by an engineer with deep context on
that module.

### 3. Enforce automated quality gates at the pull request

Break the broken window cycle at the pull request boundary. Adopt the "Clean as You Code"
philosophy: do not demand an overnight rewrite of a legacy module, but strictly enforce that no
*new* pull request introduces code smells, unhandled exceptions, or drops test coverage. When the
automated gate flags an issue, it relieves the reviewer from being the "bad guy" and establishes an
objective standard of care.

### 4. Normalize the "Boy Scout Rule"

Encourage engineers to leave every file they touch slightly cleaner than they found it. Renaming an
ambiguous variable, extracting a 20-line block into a well-named helper method, or adding a missing
edge-case test creates positive momentum. Over time, repairing broken windows signals to the entire
team that the standard of care has been restored.

---

## Final thoughts

Your codebase is never neutral. Every single day, it is actively communicating to your team what is
acceptable, what is expected, and what level of care is required.

If you leave broken windows in your software, you cannot be surprised when your
developers—especially the junior ones looking for direction—start breaking windows too.

If you want high-performing, confident engineers, you cannot just invest in training courses and
style guides. You have to give them a work environment where doing the right thing is easier than
copying a bad shortcut.

</div>
