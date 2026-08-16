---
layout: post.njk
title: Clean code and the cost of change
description: The real trade-off in software delivery is not quality versus velocity, but the cost of improving structure now versus working with it later.
tags: post
date: 2026-01-20
language: english
linkedin_url: "https://www.linkedin.com/feed/update/urn:li:activity:7419340309161050112/"
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>Software architecture & economics • 6 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

Every few months, some version of the same argument resurfaces:

* Clean code is a luxury.
* We need to move fast; we can clean it up later.
* Delivery velocity matters more than elegance.

There is a legitimate concern behind this argument. Teams can spend too much time polishing code
that does not need polishing. Architects can introduce abstractions for problems that do not exist
yet. Engineers can apply patterns because they have learned the patterns rather than because the
system needs them.

I've seen that slow teams down.

But none of those things is what I mean by clean code. Gold-plated abstractions, premature
generalization, unnecessary indirection, and designing for imaginary futures are forms of
over-engineering. They increase the cost of change rather than reducing it.

The more useful question is what happens to delivery speed when the software has to change again.

## Delivery speed is the cost of changing a system

We often measure development speed locally: how quickly a ticket gets closed, how soon a feature
reaches production, whether the team completes its sprint commitments.

Those measures matter, but they capture only part of what makes a team fast.

Most production software spends far more of its life being changed than being created. Features
evolve. Requirements change. Bugs appear. Integrations get replaced. Regulations change. What seemed
like a stable assumption turns out not to be one.

In that environment, delivery velocity depends on how quickly engineers can understand existing
behavior and change it without introducing unexpected consequences.

This is where clean code has economic value. A well-organized system makes it possible to reason
about behavior locally. It gives changes a reasonably predictable blast radius. Volatile parts of
the system are isolated rather than allowed to leak across unrelated components.

The point isn't to chase elegance for its own sake. It's to make the next change less painful and
less risky.

Martin Fowler describes a related idea in the Design Stamina Hypothesis. The basic argument is that
minimal attention to design can produce faster progress initially, while considered design requires
some investment. As the system grows, however, poor internal structure increasingly makes new work
harder.

<img src="/images/website/articles/design-stamina-hypothesis.png" alt="Design Stamina Hypothesis" />  

_Reference: [Martin Fowler Article](https://martinfowler.com/bliki/DesignStaminaHypothesis.html)_

The important part of that model is not the exact point at which two hypothetical curves cross.
There is no universal timetable. The useful observation is that development speed is affected by the
accumulated structure of the system.

A shortcut can absolutely make today's change go faster, but it often means the next few changes
will cost more.

## Why shortcuts become slower over time

"We'll clean it up later" assumes that there will be a convenient point in the future when the team
has both the motivation and capacity to revisit code that is currently working.

In my experience, that capacity is difficult to find. Cleanup competes with roadmap commitments,
deadlines, revenue pressure, operational work, and whatever has become urgent since the initial
decision.

I ran into this on a project where we needed to integrate with an SMS gateway. We were under
delivery pressure, so we coupled the implementation directly to that provider rather than taking the
time to put a proper abstraction around it.

That decision did make the initial integration faster. The cost became visible later, when we needed
to switch providers. What should have been largely an integration change reached further into the
code because assumptions about the original provider had become part of the implementation. We ended
up spending considerably more time on the migration than we would have if we had isolated that
dependency in the first place.

The point is not that we should have designed a generic messaging framework able to support every
provider we could imagine. That would have been another form of over-engineering. We already knew
that the SMS gateway was an external dependency. Creating a boundary around it would have contained
something that was outside our control and therefore capable of changing.

The thing about shortcuts is that they don't just disappear. They become part of the environment
every future change has to deal with.

Hidden coupling means an engineer has to investigate more of the system before making a change. Weak
boundaries mean a modification in one place can affect behavior somewhere unexpected. Tests become
broader because nobody is quite sure what is isolated. Reviews become slower because reviewers need
extra context before they can be confident about the change.

Eventually, knowledge about risky parts of the system can become concentrated in a few people.
That's when familiar warnings start appearing: "Don't touch that module," "only Alex understands
this," or "it works, leave it alone."

By then, technical debt is no longer an abstract future liability. The team is already paying for it
through additional investigation, coordination, testing, and caution.

## Code quality also affects coordination

The cost of poor structure doesn't just show up in the code.

The same problem appears at a smaller scale in ordinary bug fixing. A bug is reported, fixed,
tested, and closed. Then it is reopened because the fix broke something elsewhere, or because
changing that behavior exposed another downstream problem nobody realized was connected.

That is not always evidence of poor code. Software has legitimate dependencies, and some defects are
genuinely difficult to isolate. But when this pattern becomes routine, it often signals that
engineers are unable to confidently reason about the impact of a local change. Fixing one behavior
requires understanding an increasingly large part of the system.

The resulting cost goes beyond the code. A change with an uncertain blast radius requires more
regression testing, more review context, and often more people involved in deciding whether it is
safe to release.

Software development is also a coordination problem. Engineers need to determine who owns a change,
which components it affects, who has enough information to review it, what needs to be tested, and
who needs to be involved if something goes wrong.

Unclear software boundaries make those questions harder to answer.

A hidden dependency may require a conversation with another team. An implicit assumption may require
finding the person who originally implemented the feature. A component with poorly understood
behavior may require additional reviewers or a larger regression test.

Over time, technical mess turns into managerial mess.

That's part of why these effects are so easy to underestimate. The extra cost doesn't show up as a
line item called "bad code." It shows up as longer pull requests, more time spent figuring things
out, extra meetings, Slack threads, slower onboarding, cautious releases, and everyone relying on a
few engineers who know where the bodies are buried.

## Quality and delivery performance are not opposites

The assumption behind much of the "clean code slows us down" argument is that teams have to choose
between moving quickly and engineering carefully.

Research into software delivery performance gives us good reason to question that framing.

The DORA research has repeatedly examined the capabilities associated with software delivery
performance and has shown that speed and stability do not have to be opposing outcomes.
High-performing software organizations can deliver frequently while also maintaining solid
operational performance.

That does not prove that a particular definition of "clean code" causes better delivery performance,
and it would be too strong to use DORA to settle that debate directly. But it does undermine the
wider assumption that quality must be sacrificed to achieve speed.

Practices such as testability, modularity, manageable dependencies, and clear ownership matter
because they reduce the uncertainty involved in changing a system. They make smaller, safer changes
possible.

Of course, the opposite extreme isn't great either. I've seen teams hurt their own delivery by
spending too much time building abstractions for problems that might never show up, or chasing
architectural purity at the expense of getting things done.

The relevant question is therefore not whether more design is always better. It is whether the
structure we are adding reduces the expected cost and risk of changes we have reasonable grounds to
anticipate.

Sometimes the right answer really is a simple, straightforward implementation with almost no
abstraction. Other times, spending an extra hour to separate two responsibilities saves you days of
work down the line. Telling the difference is where experience and judgment come in.

## Architecture should preserve options

Senior engineers and architects are sometimes expected to anticipate what a system will need years
from now. That expectation encourages exactly the kind of speculative design that gives "clean code"
a bad reputation.

The goal isn't to predict the future.

A more practical responsibility is to avoid making likely future changes unnecessarily expensive.
That means paying attention to where volatility exists, making important behavior explicit,
protecting genuine invariants, and creating boundaries where evidence shows they are useful.

This is optionality in a practical sense. The system does not need to support every imaginable
future. It needs to avoid unnecessarily locking the team into today's assumptions.

This has an upfront cost. Thinking about boundaries takes time. Writing useful tests takes time.
Refactoring an awkward implementation before building more behavior on top of it takes time.

Pretending there isn't a cost only weakens the argument for good engineering. The real question is
whether those costs are lower than what you'll pay if you keep working around bad structure.

That calculation won't always say "add more design," and it shouldn't. Engineering is always a
trade-off.

## When "later" becomes a rewrite

One possible consequence of letting structural problems accumulate is that incremental change
eventually becomes so difficult that a rewrite starts to look attractive.

Not every rewrite is evidence of engineering failure. Technology becomes obsolete. Product
requirements change radically. A system can outgrow assumptions that were entirely reasonable when
it was built.

But sometimes rewrites happen for a much less interesting reason: the old system has simply become
so hard to understand and change that starting over looks easier than trying to keep it going.

Those situations are expensive because a rewrite doesn't magically remove all the business
requirements, edge cases, integrations, operational quirks, and previous decisions buried in the old
system. The team has to dig up or recreate a lot of that knowledge while still keeping the current
product running.

Continuous maintenance does not guarantee that a rewrite will never be necessary. It does reduce the
chance that accumulated, unmanaged complexity becomes the reason for one.

## The trade-off is larger than today's ticket

The clean-code debate gets a lot less interesting when it's reduced to "quality versus velocity."
Nobody reasonable wants perfect code at any cost, and nobody responsible wants to ship as fast as
possible without caring what it does to the system.

The practical trade-off is between the cost of improving structure now and the expected cost of
working with that structure later.

That means some shortcuts are reasonable. A prototype may not need the boundaries of a long-lived
production service. A feature whose future is genuinely uncertain may not justify an elaborate
abstraction. A deadline can make accepting technical debt the rational business decision.

But technical debt is a trade, not free speed. The team gets something now and agrees to pay for it
later through extra work, extra risk, or deliberate remediation.

Good engineering is not about making every piece of code pristine. It is about keeping the software
economical to change for as long as the business needs to change it.

</div>