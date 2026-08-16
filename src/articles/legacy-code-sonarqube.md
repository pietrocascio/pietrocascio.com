---
layout: post.njk
title: How a six-month-old system becomes legacy code
description: How brand-new systems quietly become difficult to maintain, and what senior engineers can do to change the trajectory.
tags: post
date: 2026-01-15
language: english
linkedin_url: "https://www.linkedin.com/posts/pietrocascio_softwarearchitecture-technicaldebt-cleancode-activity-7417475717489152000-52OO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAASw7M8BkQrh780Iah0oN8WL-jrJDWofFzw"
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>"Greenfield" project assessment • 6 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

*How brand-new systems quietly become difficult to maintain, and what senior engineers can do to
change the trajectory.*

The system was only six months old when I was asked to take a look at it.

It was a greenfield microservices project: new stack, new team, the kind of environment that should,
at least in theory, be free from the baggage we usually associate with legacy systems.

One of the first things I did was run SonarQube. No meaningful quality gates were in place, so
static analysis seemed like a reasonable way to get an initial sense of what was happening.

The results were not encouraging:

* 🔴 **612 reliability issues**
* 🔴 **More than 4,000 maintainability issues**
* 🔴 **0.0% code coverage**
* 🔴 **33 security hotspots**
* 🔴 **7.5% code duplication**

<img src="/images/website/articles/sonar-qube-hell.png" alt="SonarQube analysis results" />

Those numbers were signals, not a diagnosis. Static analysis cannot tell you whether a system is
well designed, and a coverage percentage cannot tell you whether tests are useful.

But for a codebase that was only six months old, the results gave us plenty of reasons to look more
closely.

Once I did, the reasons behind those numbers were not difficult to find.

Automated testing had simply never become part of the team’s normal way of working. Features were
tested manually before release, but there was almost no automated safety net protecting existing
behavior.

The duplication was also easy to explain. A problem would be solved in one place, then solved again
elsewhere by copying the implementation rather than stopping to identify the right abstraction. Each
individual shortcut saved time. After six months, those shortcuts had accumulated into a visible
structural problem.

Some security hotspots came from dependencies that had not been kept current. Others were smaller
issues that nobody had found urgent enough to address.

No single catastrophic architectural decision caused this.

That was the interesting part.

The system had reached this point through ordinary development, just without enough feedback to show
the team where all those local decisions were leading.

What worried me was not that a young project had technical debt. Every real project does. It was the
trajectory.

Problems were accumulating quickly, and very little was preventing today’s exception from becoming
tomorrow’s normal way of working.

That experience changed how I think about the word *legacy*.

We usually use it as a synonym for old software. But age is only part of the story. A system can
start to acquire the characteristics of legacy code surprisingly quickly when decisions accumulate
without feedback.

## How greenfield systems accumulate debt so quickly

Nobody starts a greenfield project intending to create a difficult codebase.

The process is usually far less dramatic.

A deadline approaches, so tests for one feature are deferred. Two services need similar behavior,
and duplication is temporarily easier than deciding where that behavior belongs. A static-analysis
warning is not relevant to the current release, so it is ignored. Then another release arrives with
another deadline.

Each decision can look reasonable in isolation.

The problem is what happens when exceptions accumulate without anything forcing the team to revisit
them.

“We’ll fix it later” assumes there will eventually be a *later* with spare capacity. In practice,
cleanup competes with roadmap commitments, production issues, new requirements, customer requests,
and whatever became urgent after the shortcut.

Working code, however awkward, is rarely the loudest problem in the room.

This is why the first few months of a system matter so much. Early decisions establish what the team
considers normal.

* If merging without tests is always accepted, the next engineer has little reason to believe tests
  are expected.
* If duplication is repeatedly waved through during review, the next copy-and-paste implementation
  does not look unusual.
* If reliability and security findings can remain unresolved indefinitely without clear ownership,
  the dashboard eventually becomes background noise.

Nobody has to decide that quality does not matter.

The system simply drifts that way, one local decision at a time.

Senior engineers have influence over this process, but they are not the only factor. Delivery
pressure, staffing, management incentives, ownership, and deadlines all shape engineering decisions.

A senior engineer's job is not to make those pressures disappear.

It is to make the consequences of the trade-offs visible.

## Guardrails change the default

Architecture is often discussed in terms of service boundaries, technology choices, deployment
models, and diagrams.

Those things matter, but they don't fully describe how a system evolves after the design meeting
ends.

A useful architecture also establishes constraints:

* What happens when someone introduces a dependency in the wrong direction?
* What happens when a critical security issue appears?
* Can code with known reliability problems be merged?
* Does a new service need tests before it reaches production?
* Who owns an exception when the team deliberately accepts one?

If the system has no answer to those questions, individual engineers have to decide every time.

That is where guardrails help.

Static analysis, CI checks, dependency rules, automated testing, security scanning, and ownership
policies can turn architectural intentions into feedback that appears as work happens.

Instead of discovering six months later that thousands of findings have accumulated, the team sees
problems when they are introduced and can decide whether to fix them or consciously accept the
trade-off.

The distinction matters.

A quality gate should not mean that every warning blocks delivery.

Poorly designed gates can absolutely slow teams down. Arbitrary coverage targets can encourage
low-value tests. Noisy static-analysis rules can teach engineers to ignore the tool. A build that
fails on findings nobody considers relevant quickly becomes something people work around.

The goal is not maximum enforcement. The goal is **useful feedback**.

A good guardrail makes an engineering decision explicit:

* Critical security findings may block a build.
* New code may be expected not to increase duplication.
* A dependency rule may prevent application logic from depending directly on infrastructure code.
* Some warnings may simply remain visible so the team can watch their trend.

The exact rules will differ between systems. What matters is that the architecture still has a way
to influence the code after the diagram is finished.

## Tests make assumptions executable

The 0% coverage number in that project was a useful warning sign, but coverage needs careful
interpretation.

High coverage does not prove that a system is well tested. You can execute almost every line and
still miss the behaviors that matter.

When they are useful, automated tests provide something more important: **an executable description
of the behavior the team wants to preserve**.

* A **unit test** can protect a business rule while its implementation changes.
* An **integration test** can verify assumptions at a component boundary.
* A **contract test** can make expectations between independently deployed services explicit.

Different tests protect different things.

Without that safety net, engineers recover those assumptions manually. They read more code,
reproduce scenarios, ask around for somebody who remembers how the feature behaves, and expand
regression testing because nobody is completely confident about what a change might affect.

You see this in ordinary bug fixing.

A defect gets reported, fixed, tested, and closed. Then it is reopened because the fix broke
something elsewhere, or because changing that behavior exposed another downstream dependency nobody
realized was involved.

That does not automatically mean the code is poorly designed. Real systems have real dependencies,
and some defects are difficult to isolate.

But when the pattern becomes routine, engineers can no longer confidently reason about the impact of
a local change.

Tests are not the only mechanism that protects boundaries. APIs, schemas, dependency rules, access
controls, and deployment boundaries all matter.

But tests are one way architectural assumptions stop being documentation and become something the
team can check every day.

## Microservices amplify weak engineering defaults

The fact that this system used microservices made the situation more interesting.

Microservices are often adopted partly to increase autonomy. Services can evolve independently,
reflect business boundaries, and in some organizations be deployed on different schedules.

But more autonomy makes a small number of shared engineering constraints more important, not less.

In a monolith, inconsistent practices at least live inside one repository and one deployment
boundary.

In a microservices environment, inconsistency can spread across dozens of repositories and teams:

* One service has solid automated tests while another has almost none.
* One team treats security findings seriously while another ignores them.
* Similar business logic is implemented repeatedly because every service is considered independent.

At the same time, those services may not be nearly as independent as the architecture diagram
suggests.

They can become tightly coupled through synchronous calls, shared databases, event schemas,
duplicated business rules, or assumptions about deployment order.

You can end up with all the operational complexity of microservices without much of the independence
they were supposed to provide.

That is why service boundaries alone don't keep a system maintainable. You can have a beautiful
architecture diagram and still end up with services nobody feels safe changing.

## Early speed can hide the trajectory

Young systems are forgiving.

There is less code to understand. Fewer customers depend on existing behavior. The engineers who
built the first version are still around and remember why they made the decisions.

That can create a misleading sense of velocity.

As the product grows, the conditions change.

More behavior must remain stable. Teams change. Integrations accumulate. Customers begin relying on
edge cases nobody originally considered important.

At that point, internal structure starts showing up in everyday delivery work.

A change with an uncertain blast radius requires more investigation. A poorly isolated service
requires broader regression testing. A component understood by only one engineer becomes a
scheduling constraint. Releases become more cautious because the team has learned that apparently
local changes sometimes have unexpected consequences.

The project has not suddenly become slow.

The cost was accumulating all along. The system was simply young enough to hide it.

That is why early velocity does not tell you everything about the health of a greenfield project.

A more useful question is whether each month of development is making the next month easier or
harder.

## What senior engineers should establish early

Senior engineers cannot eliminate technical debt, and they should not try.

Sometimes debt is the right business decision. A real deadline may justify an implementation
everyone knows will eventually need revisiting.

The important thing is knowing the difference between a conscious trade-off and an accidental
default.

There are a few practices I would want in place early:

### 1. Introduce feedback early

Static analysis, security scanning, dependency checks, and basic CI rules are easier to establish
while the codebase is small.

The first rules do not need to be aggressive. They need to make the direction of travel visible.

### 2. Protect important behavior

Do not chase coverage percentages for their own sake.

Identify the business rules, integrations, and boundaries where an unnoticed regression would be
expensive, and protect those areas with useful automated tests.

### 3. Raise standards as the system matures

A prototype and a production system do not need identical constraints.

Start with rules the team can realistically follow, then tighten them as the cost of failure and
change increases.

### 4. Make debt visible and owned

A deliberately accepted shortcut is different from a forgotten one.

Record important exceptions, make ownership clear, and keep the accumulated cost visible enough that
remediation can eventually compete with feature work.

### 5. Treat recurring exceptions as architectural information

If engineers constantly need to bypass the same rule, the rule may be wrong.

If the same kind of coupling, duplication, or defect keeps appearing, the design may be telling you
something.

Guardrails should inform senior engineers, not replace their judgment.

## Legacy is a trajectory, not an age

I would never use a SonarQube dashboard to declare a system “legacy,” and I would not treat coverage
or maintainability findings as a scorecard for architectural quality.

What that six-month audit showed me was something more useful.

A new codebase does not stay healthy simply because it started with a clean slate.

From the first release, it starts accumulating decisions: what gets tested, what gets ignored, which
dependencies are acceptable, which exceptions become normal, and which problems somebody is expected
to own.

Senior engineers shape that trajectory by putting feedback mechanisms and constraints in place that
make those decisions visible.

The goal is not to prevent every shortcut. It is to know when you are taking one, and to understand
what you are trading for it.

> **Legacy is not just about age. It is the result of decisions accumulating faster than the system
can correct them.**

Sometimes, six months is enough.

</div>