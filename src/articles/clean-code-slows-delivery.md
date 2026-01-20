---
layout: base.njk
title: Clean code slows delivery
description: Clean Code Slows Delivery” Is a Lie We Tell Ourselves to Justify Sloppy Engineering.
tags: post
date: 2026-01-20
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium">
        Clean code is not a justification for sloppy engineering • 5 min read
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

# “Clean Code Slows Delivery” Is a Lie We Tell Ourselves to Justify Sloppy Engineering

Every few months, the same argument resurfaces, usually framed as a bold, pragmatic hot take:

> “Clean code is a luxury.”  
> “We need to move fast; we can clean it up later.”  
> “Delivery velocity matters more than elegance.”

It sounds practical.
It sounds business-oriented.
It even sounds experienced.
It isn’t.

This belief survives not because it’s correct, but because the damage it causes is **delayed**,
distributed, and rarely traced back to the original decision. By the time the consequences are
apparent, the people who made the call have often moved on.

As engineers and architects, we owe ourselves and our teams a more honest conversation.

## Let’s Be Precise About What We’re Arguing Against

Before defending clean code, we need to eliminate the strawman.
If by _clean code_ you mean:

* Gold-plated abstractions
* Over-engineering for imaginary futures
* Applying patterns because a book said so
* Indirection without pressure

Then yes, **that slows teams down**.
But that isn’t clean code.
That’s **cargo-cult engineering**: copying the _shape_ of good design without understanding its
purpose. No serious architect is advocating for that.

Real clean code is not about aesthetics or ego.
It is about **risk management**.

## Clean Code Is About One Thing: Reducing the Cost of Change

Here is the uncomfortable truth many people avoid stating explicitly:

**Delivery velocity is not about how fast you can add new code.**
**It is about how fast you can safely change existing behavior.**

Most systems don’t fail because they couldn’t ship version 1 quickly enough.
They fail because version 17 became terrifying to touch.

Clean code optimizes for:
* **Local reasoning:** understanding behavior without loading the entire system into your head
* **Predictable behavior:** fewer surprises when you change something
* **Controlled blast radius:** changes stay where they belong
* **Change isolation:** volatility doesn’t leak everywhere

In other words, **clean code keeps options open**.

This idea is not new. It has been repeatedly articulated by people who have built and maintained
real systems for decades, such as **Martin Fowler**, who visualized the trade-off clearly in what he
called the **Design Stamina Hypothesis**.

<img src="/images/website/articles/design-stamina-hypothesis.png" alt="Design Stamina Hypothesis" />
*Reference: https://martinfowler.com/bliki/DesignStaminaHypothesis.html*

Two curves tell the whole story:
* The _“quick and dirty”_ curve rises sharply at the beginning
* The _disciplined design_ curve starts slower

Then, usually **weeks, not years, into a project**, the curves cross.
After that point, the “fast” team isn’t fast anymore. They are stuck.

## “We’ll Clean It Up Later” Is a Professional Myth

In more than a decade of working on production systems, startups, scale-ups, and large enterprises,
I have never seen this plan succeed.
Not once.
Why?
Because “later” competes with:
* Roadmaps
* Deadlines
* OKRs
* Revenue pressure
* Team churn

And “later” always loses.

Technical debt is not paid down in a vacuum. It accrues **interest**, and that interest is paid
immediately, often in ways teams misdiagnose:

* Pull requests slow to a crawl
* Code reviews become defensive instead of collaborative
* Regression testing expands from minutes to days
* Onboarding stretches from weeks to months
* Engineers quietly avoid entire areas of the codebase

This is how **fear-driven development** emerges:

> “Don’t touch that module.”
> “Only Alex understands this part.”
> “It works, leave it alone.”

At that point, delivery velocity is already gone.
You just haven’t updated the dashboard yet.

## Local Speed vs. System Speed
This is where most debates go wrong.

Teams optimize for **local speed**:
* How fast _will this_ ticket get closed
* How fast _does this_ feature ship?
* How good _this_ sprint report looks

But software delivery is not a task list.
It’s a **system**.

System speed depends on:
* How many people can safely change the code in parallel
* How confidently can the system evolve
* How predictable releases are
* How often does production surprise you

Messy code doesn’t just add technical complexity; it also creates **coordination overhead**.

Every unclear boundary becomes a meeting.
Every hidden coupling becomes a Slack thread.
Every implicit assumption becomes tribal knowledge.
Clean code reduces the **social cost** of software.

That’s why senior engineers feel the pain first, because they’re the ones paged at 2 a.m.,
onboarding new hires, and explaining why a “small change” took three weeks.

## The Data Already Settled This Debate

If this were just an opinion, it would be one thing.
But it isn’t.
Years of research into software delivery performance, most notably the DORA studies, show the same
pattern consistently:

High-performing teams have:
* Higher deployment frequency
* Lower change failure rates
* Faster recovery times

They do **not** trade quality for speed.

They invest in:
* Testability
* Readability
* Modularity
* Clear ownership

Messy code does not make you a startup hero.
It makes you a long-term liability.

## Discipline Is Not Dogmatism
There _is_ a legitimate criticism buried inside anti–clean code rhetoric, and it’s worth addressing
honestly.

Some teams absolutely over-engineer.
Some architects absolutely over-abstract.
Some codebases are strangled by premature generalization.
But that is not an argument against clean code.
It’s an argument against **poor judgment**.

Real clean code is pragmatic. It asks one question relentlessly:

**What is the simplest structure that keeps this change cheap?**
Not:
* “How do we future-proof this?”
* “How do we make this enterprise-grade?”
* “Which pattern fits here?”

Just:
* _What reduces risk right now, given what we actually know?_
That question requires experience, not dogma.

## Architecture Is Not About Control, It’s About Optionality
One of the most misunderstood responsibilities of senior engineers and architects is this:
**Your job is not to predict the future.**
**Your job is to make the future cheaper.**

Clean code supports this by:
* Making behavior explicit
* Isolating volatility
* Protecting invariants
* Allowing systems to evolve without fear

When people say “clean code slows us down,” what they often mean is:
_“I don’t want to pay the upfront cost of thinking.”_
But thinking is not optional.
You either do it **before** the system calcifies, or you do it **during** an outage with executives
watching.

## The Rewrite Is the Final Bill
There is a predictable endpoint to every “move fast, clean later” story.
It’s called **the rewrite**.
Rewrites are rarely acts of innovation.
They are admissions of accumulated failure, failure to manage complexity incrementally, failure to
invest in sustainability, failure to respect the economics of software.

And rewrites are always more expensive than continuous care.

## The Real Trade-Off (Finally Stated Correctly)
So no, this debate is not:
Clean Code **vs.** Velocity
It is:
**Local Speed Today** **vs.** **System Speed Tomorrow**

Experienced engineers know which compounds.

## A Question for Senior Engineers
Be honest with yourself, not LinkedIn.
When was the last time:
* Skipping quality
* Ignoring design
* “Just getting it done.”

Actually resulted in a system you were proud to maintain a year later?
If the answer is _never_, then the debate is already over.

## Final Thought
Clean code is not about being precious.
It is about being **professional**.
And professionalism in software is measured by how well your systems withstand the passage of time.

---

Pietro Cascio is a Senior Software Engineer and Pluralsight Author. He writes about the intersection
of Java Architecture and Engineering Culture.

<div class="mt-16 pt-8 border-t border-gray-100"> 
    <a href="https://www.linkedin.com/posts/pietrocascio_softwarearchitecture-technicaldebt-cleancode-activity-7417475717489152000-52OO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAASw7M8BkQrh780Iah0oN8WL-jrJDWofFzw" target="_blank" class="font-bold text-sm hover:underline"> Discuss this on LinkedIn &rarr; </a>
</div>