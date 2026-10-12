---
layout: post.njk
title: "Why I'm writing about the engineering of AI agents, not the models"
description: "Most of the AI coding conversation is about which model is best. Most of what engineers control is everything around the model. An introduction to a series about that part."
tags: post
date: 2026-10-12
language: english
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>AI-assisted programming • 5 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

Almost every conversation I hear about AI coding tools comes back to the same question: *which
model should we use?*

It's a reasonable question. Models differ, and new ones arrive every few weeks with a new
leaderboard position and a new set of claims. But when an agent does something wrong in your
codebase, a different question matters more: *what do you change?*

Most of the time, the answer isn't the model. You can't retrain it, and switching to a newer one
rarely fixes the specific thing that went wrong. What you can change is everything around it: what
the agent can see, what it's allowed to do, how it finds out whether its work is correct, and when
it decides it's finished.

That part, everything around the model, is what this series is about.

## An agent is a loop, not a model

Strip away the marketing and a coding agent is a fairly simple thing: a model that calls tools in a
loop until it decides the goal has been reached. It reads some files, runs a command, looks at the
result, edits something, runs another command, and keeps going.

The model makes the decisions. Everything else in that loop is software and environment:

* **Context:** which files, instructions, and history the model sees when it makes each decision.
* **Tools:** what actions it can take, and what those actions return, including when they fail.
* **Feedback:** the compiler, the tests, the linter, anything that can tell it "this is wrong".
* **Boundaries:** what it's allowed to touch, and what needs a human's approval.
* **Stopping conditions:** what "done" means, and what should make it give up and ask.

<img src="/images/website/articles/ai-agent-loop.svg" alt="Diagram of a coding agent as a loop: context feeds the model, the model acts through tools, tools produce feedback such as tests and compiler output, and feedback updates the context. The loop runs inside a boundary of what the agent may touch, and stopping conditions lead out of it to done, or ask a human.">

Each of those is an engineering decision. Most of them are decisions you, the engineer, already make,
often without realising it. The project instructions you write, the tests you have (or don't have),
the permissions you grant, and the shape of the codebase you hand the agent all change what it does.

When people compare models, they're comparing one component of that system while holding everything
else vaguely constant. When you work with an agent every day, it's the other way round: the model is
fixed for weeks at a time, and everything else is yours to change.

## This is an engineering problem, not a prompting problem

There's a popular framing that treats working with agents as a matter of finding the right words.
Write a better prompt, get a better result.

Wording matters, but I think that framing undersells the problem and undersells engineers. The
questions that decide whether an agent is useful in a real codebase are ones our profession has been
answering for decades:

* How do you design an interface so that its caller can't easily misuse it?
* How do you get fast, trustworthy feedback on whether a change is correct?
* How do you limit the blast radius of a mistake?
* How do you tell the difference between activity and progress?

None of these are new. What's new is the collaborator. An agent is fast, tireless, and confident,
and it will happily keep working on the wrong problem for as long as nothing in its environment
tells it otherwise. That makes the old engineering disciplines more important, not less.

Senior engineers already have most of the skills this needs. They're just being asked to apply them
to a different kind of team member.

## What this series will cover

Every week, I'll take one part of that loop and look at a single engineering decision inside it.
Roughly in this order:

1. **The anatomy of an agent.** Next week: why the model is the smallest part of your coding agent,
   and why most of the behaviour you see comes from the harness and the environment around it.
2. **Where control actually lives.** What you can only *ask* an agent to do, what you can *enforce*,
   and what you should keep for yourself.
3. **Then, real runs.** Context that helps and context that hurts. Tool errors as an interface.
   Tests that confirm the agent's misunderstanding instead of catching it. What the Java compiler
   catches for an agent, and the much larger set of things it doesn't.

## What it won't cover

I won't be ranking models, reporting on launches, or sharing lists of magic prompts. I'm also not
interested in whether AI will replace developers. That debate generates a lot of heat and almost no
engineering decisions.

## How I'll write it

A few ground rules, so you know what you're reading:

* **Examples are built for the post.** When I show an agent run, it'll be a small scenario I set up
  specifically to examine one mechanism, and I'll say so. I'll show what actually happened, including
  when the agent did better than I expected.
* **Claims match the evidence.** One run can illustrate how something works. It can't prove that
  agents "always" do anything, and I won't pretend otherwise.
* **The examples lean towards Java.** That's where I spend my working life, and statically typed,
  enterprise codebases are an interesting place to study agents: the compiler gives them a lot of
  feedback, and a lot of what goes wrong is invisible to it.
* **Tool-specific details get dated.** Agent products change monthly. The principles shouldn't, but
  where I describe how a particular tool behaves, I'll say when.

Most runs will use Claude Code, because that's what I use daily, but the ideas aren't specific to it.

---

## The question behind every article

If there's one idea I want this series to keep coming back to, it's this:

**What engineering decision changes this agent's behaviour, and what evidence tells us whether it
helped?**

The models will keep getting better, and the leaderboards will keep changing. The loop around them,
and the engineering it takes to make that loop trustworthy, is the part that stays our job.

</div>
