---
layout: post.njk
title: Read the verbs in the job ad
description: Job ads list engineering practices as the new hire's responsibility. Whether the role is worth taking depends on whether you'll be allowed to spend delivery time on them.
tags: post
date: 2026-12-10
language: english
# DRAFT GUARD: remove the two lines below (and set the real date) when publishing
permalink: false
eleventyExcludeFromCollections: true
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>Software engineering & culture • 10 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

Here's a job description you've read some version of.

> *Senior Java developer. You'll champion clean code and solid design, help the team raise its
> testing standards, take part in code reviews, and mentor less experienced colleagues.*

Nothing in it is unusual, and nothing in it is necessarily false. But read the verbs again.
Champion. Raise. Mentor. None of them describes something the team already does. Every one
describes something you're expected to bring.

That's easy to miss when you're skimming ads, and it's the most useful information in the whole
document. A job ad that makes engineering practices the new hire's responsibility is describing a
gap. Whether the role is worth taking depends on one question the ad almost never answers: will you
be allowed to spend delivery time closing it?

## Two kinds of sentences

Job descriptions mix two kinds of sentences, and they look almost identical.

The first kind describes how the team works today:

* Every merge request is reviewed by at least one other engineer before it lands.
* The build runs unit and integration tests, and a red build blocks the release.
* New joiners pair with a senior engineer for their first month.

The second kind describes what the new hire will do:

* You'll promote code review best practices.
* You'll help raise the team's testing standards.
* You'll act as a technical reference for junior developers.

The first kind is a claim you can check. The second is a wish, and usually a wish for exactly the
things the first kind would describe. A team that reviews every merge request doesn't need someone
to promote code review. It needs someone to review code.

None of this requires anyone to be lying. Job ads are often assembled from templates, written by
people a long way from the codebase, and they tend to describe the team the hiring manager is
trying to build. That's aspiration written in the present tense. In
[an earlier article](/articles/broken-window-effect-in-software-teams/) I wrote about the difference
between the standards a team writes down and the standards its code actually shows. A job ad is the
written standard, aimed at candidates.

The mismatch on its own is not the problem. Plenty of good roles exist precisely because a team
knows it's behind and wants to catch up. The problem is that the ad is silent about the one thing
that decides whether catching up is possible.

## The loop

I've spent a good part of my career on legacy Java systems, in different organizations and
different domains. They weren't easy projects, and for a long time I blamed the code: the enormous
classes, the duplicated logic, the business rules buried in places nobody thought to look.

Looking back, the code was a symptom. The same three conditions showed up every time:

1. **There were no meaningful automated tests.**
2. **Nobody owned the technical debt.** Everyone could see it. Nobody was allowed to decide to pay
   it down.
3. **Delivery always came first.** The next fix, the next release, the next urgent request.

These aren't three independent problems. They feed each other.

Delivery comes first, so there's never time to write tests. Without tests, every change is a risk.
Because every change is a risk, nobody touches the structure, and the debt grows. Because nobody
owns the debt, nobody can trade a week of delivery for a week of repayment. Delivery gets slower,
which means more pressure, which means delivery comes first even harder.

What makes the loop so stable is that everyone inside it behaves rationally. Here's what that looks
like in code.

### Copy and paste is the safe choice

Imagine a discount calculation in an order service. In its first year it's one reasonable method:

```java
public BigDecimal calculateDiscount(Order order) {
    // 40 lines of rules
}
```

A few years and many urgent requests later:

```java
public BigDecimal calculateDiscount(Order order, boolean promo, boolean legacyRounding) {
    // 300 lines, a dozen nested conditions on the two flags
}

public BigDecimal calculateDiscountForWholesale(Order order) {
    // copied from calculateDiscount in 2021, one threshold changed,
    // three bug fixes applied here and not there
}

public BigDecimal calculateDiscountForWholesaleV2(Order order, boolean promo) {
    // ...
}
```

Nobody set out to write this. Each step was the sensible choice for the person making it. The
method had dozens of callers, no tests, and a deadline attached. Changing it in place meant risking
a regression in code paths you couldn't see and couldn't verify. Adding a flag, or copying the
method and changing the copy, kept the damage inside your own ticket.

Multiply that by every developer and every deadline, and you get classes that run to five figures of
lines. Class size by itself proves very little. What hurts is what comes with it here: no seams to
test through, no way to review a change meaningfully, merge conflicts on every release, and
knowledge concentrated in the one or two people who remember why the third variant exists.

### Manual verification can't keep up

Without automated tests, verification is manual. Someone runs through a list of scenarios before
each release.

That list grows with every feature and every fixed bug. The time before each release doesn't. So
with every release, the share of the system that actually gets checked shrinks. Nobody decides to
test less. It just happens, quietly, until a regression in something "nobody touched" reaches
production and the team responds by adding more process around the release.

Manual release mechanics make it worse. When a hotfix lands on a release branch and has to be
cherry-picked back by hand, sooner or later one is missed, and a bug the team already fixed comes
back two releases later. That's debt too, just not the kind that shows up in a static analysis
report.

## The missing lever

Now go back to the job ad.

Clean code, testing, code review: these are the outputs of a team that is *not* stuck in the loop.
The ad asks the new hire to produce those outputs. What it doesn't say is whether the hire gets the
one input that would let them: **the authority to spend delivery time on tests and debt.**

That's the whole lever. Everything else follows from it.

Breaking the loop doesn't take heroics. Michael Feathers described the technique years ago in
*Working Effectively with Legacy Code*: before changing legacy code, write characterization tests
that pin down what it currently does, whether or not that behaviour is correct.

```java
@Test
void wholesaleOrderAboveThresholdKeepsCurrentDiscount() {
    Order order = anOrder().wholesale().withTotal("1250.00").build();

    BigDecimal discount = service.calculateDiscountForWholesale(order);

    // Pins today's behaviour, right or wrong
    assertEquals(new BigDecimal("118.75"), discount);
}
```

A day or two of tests like this around one painful method makes a whole category of change safe.
Now you can extract the shared rules, delete a copy, and know within seconds if you broke something.
The [cost of change](/articles/clean-code-slows-delivery/) for that part of the system drops, and it
stays down.

But that day has to come from somewhere. Inside the loop, it comes from the next ticket, and the
next ticket is always urgent. If the senior engineer can't make that trade without asking
permission, and the answer is always "after this release," then "promote best practices" means
asking permission forever.

This is what seniority actually consists of. Not the practices listed in the job description, but
the decisions you're allowed to make. For an engineer hired to improve quality, those decisions are
concrete:

* **Can you block a merge?** If a deadline can override your review comment every time, it isn't a
  review.
* **Can you schedule debt work?** Not "raise it in the retro," but put it in the plan and have it
  survive the next urgent request.
* **Can you define "done"?** If "done" means "the customer stopped complaining," tests will always
  be optional.
* **Can you push back on scope?** If every request is accepted as-is, delivery will always come
  first.

A role with the title and the responsibility, but none of these powers, is a senior title on top of
junior authority.

The same applies to mentoring, which the ad also promised. Real mentoring leaves traces: review
comments that explain *why*, pairing sessions, juniors making design decisions and defending them.
When a senior engineer's job is to tell juniors *what* to do next, that's ticket assignment,
whatever the ad calls it. And inside the loop, there's rarely time for anything else.

## Why it costs more than a bad year

For the candidate, the obvious cost is frustration. The less obvious one is skills drift. You join
to practise testing, review, and design, and you spend two years on corrective maintenance under
pressure. Your CV still says what the ad said. The next interviewer will assume you've been
practising those things, and you'll know you haven't.

For the employer, the cost is quieter but real. They pay senior rates for ticket throughput. The
people best placed to break the loop are the ones who leave first, because they have options. And
each departure takes a share of the informal knowledge the system depends on, which makes the next
hire's first months slower and the loop tighter.

## Questions that need evidence

Most interview questions about engineering culture can't fail. "Do you do code reviews?" Yes. "Do
you write tests?" Yes. "Is there room to improve things?" Of course. These questions invite the
aspirational answer, because the aspirational answer is what the interviewer believes about their
team on a good day.

Better questions can only be answered with a specific example. Here's one for each point in the
loop, plus what to listen for.

### Delivery

**"When did the team last push a deadline back to protect quality? Who made that call?"**

* *Good:* a specific, recent example, a named role who decided, and an outcome.
* *Evasive:* "We always try to balance quality and delivery."
* *Alarming:* a laugh, or "that's not really how it works here."

### Tests

**"When did an automated test last catch a bug before it reached production?"**

* *Good:* a recent story, with some detail about which test and what it caught.
* *Evasive:* a coverage percentage. Coverage tells you tests exist, not that they protect anything.
* *Alarming:* "QA catches those," or a long pause.

### Debt

**"What's the last piece of technical debt you paid down? Who decided it was worth the time?"**

* *Good:* something concrete and finished, with a reason it was prioritized.
* *Evasive:* a list of debt they'd *like* to address.
* *Alarming:* "We have a refactoring planned," with no date and no owner.

### Authority

**"If I thought a merge request shouldn't go in, what would actually happen?"**

* *Good:* "It doesn't go in until we've talked it through and you're satisfied."
* *Evasive:* "We'd discuss it."
* *Alarming:* "Well, if it's urgent..."

### Mentoring

**"What did your most recent junior hire learn in their first three months, and from whom?"**

* *Good:* names, practices, a pairing or review routine.
* *Evasive:* "We have a good onboarding wiki."
* *Alarming:* "They picked it up on the job."

One evasive answer means little. Interviewers are often not the people closest to the code. A
pattern of evasive answers across the loop tells you most of what you need to know. If you can, ask
the same questions to an engineer on the team, not only to the hiring manager.

## The honest version

For the hiring managers reading this, here's the ad from the start of this article, rewritten
honestly:

> *Senior Java developer. Our core system is fifteen years old, has limited automated test
> coverage, and carries significant technical debt. We want to change that. You'll spend roughly
> 70% of your time on maintenance and delivery and 30% on improving testability and structure, with
> the authority to block merges and schedule refactoring work alongside the team lead.*

That ad will attract fewer candidates. It will attract the right ones: engineers who want to work on
a hard legacy system and have been waiting for someone to admit that's the job. And if you do write
"promote testing" in an ad, be ready for a good candidate to ask: with what time?

---

## Final thoughts

This isn't an argument against legacy systems, maintenance work, or teams that are behind. Most
working software is legacy, and someone has to keep it running.

A team stuck in the loop that gives someone the authority to break it is offering one of the most
interesting jobs in software. A team that only lists the way out in its job ad is offering something
else, whatever the ad says.

So read the verbs. Then ask who's allowed to spend the time.

</div>
