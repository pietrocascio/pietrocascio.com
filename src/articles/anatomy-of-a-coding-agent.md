---
layout: post.njk
title: "Anatomy of a coding agent: the loop around the model"
description: "The model chooses what an agent does next. The harness and the environment decide what it can see, what it can do, how it learns it was wrong, and when it stops."
tags: [post, ai-agents]
date: 2026-10-19
language: english
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium flex flex-wrap items-center gap-2">
        <span>AI-assisted programming • 8 min read</span>
        <span class="text-gray-300">•</span>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider {% if language == 'italian' %}bg-emerald-50 text-emerald-700 border border-emerald-100{% else %}bg-purple-50 text-purple-700 border border-purple-100{% endif %}">
            {{ language }}
        </span>
        {% topicBadges tags %}
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

You ask a coding agent to fix a bug. It reads a few files, finds what looks like the problem,
changes some code, runs the tests, and tells you the issue is fixed.

It isn't. The tests pass, but the behaviour is still wrong. Or the agent changed something
unrelated. Or it stopped before checking the one case that mattered.

The natural reaction is to blame the model: it misunderstood the task, it isn't capable enough, it
made a bad call. Any of those might be true. But there's a more useful question to ask first:
**what information did the agent have, what could it actually do, and what evidence did it use to
decide it was finished?**

[Last week](/articles/engineering-ai-agents-not-models/) I said I'd argue that most of the
behaviour you see comes from the harness and the environment, not the model. Writing this article,
I've ended up with a more careful version of that claim, because the strong version is more than I
can show without comparative evidence. Here it is:

> The model influences which action the agent chooses. The harness and the environment decide which
> actions are possible, what information is available, how outcomes are observed, and when the work
> stops.

The rest of this article is the anatomy behind that sentence.

## The model doesn't run anything

A language model, on its own, doesn't browse your repository, run Maven, or edit Java files. It
takes input and produces output. When that output says "run this command" or "open this file",
something else has to do it.

That something is the **harness**: the software that connects the model to tools, assembles what
the model sees, executes the actions it requests, enforces limits, and decides when the run is
over. Claude Code, Codex and Copilot's agent mode are all, among other things, harnesses.

The harness acts on an **environment**: the repository, the build, the tests that exist (or don't),
the dependencies, the configuration, the machine it runs on. The two are easy to blur, but they're
different engineering surfaces. You configure the harness. You *are* the environment, in the sense
that its quality is the sum of decisions your team has made for years.

At its simplest, the harness runs a loop:

1. Assemble the context for the model.
2. Ask the model what to do next.
3. If it asked for an action, check it's allowed, and execute it.
4. Feed the result back into the context.
5. Repeat until the task is done, or something says it must stop.

The model takes part in every turn of that loop. It doesn't own it.

<img src="/images/website/articles/agent-harness.svg" alt="Diagram of a coding agent loop with the harness in the middle. The model proposes the next action. The harness checks permissions and executes it against the environment: repository, build and tests. Results come back to the harness, which updates the context for the next decision. A finish request goes through completion checks before the result is returned; blocked actions and requests for help go to a human.">

## Six parts, one loop

The parts are the ones I listed last week: the model, context, tools, feedback, boundaries and
stopping conditions. What's worth looking at this time is what each one controls, and what an
engineer can change about it.

### Model: choosing the next action

The model is the decision-maker. Given the task, the context and the tools it's been offered, it
produces the next step: a question, an explanation, an edit, or a tool call. After reading a failing
test, it might decide to open the service implementation rather than change the test.

But it decides on what it's been shown. If the business rule that matters isn't in its context, it
can propose a perfectly reasonable fix that breaks that rule. That isn't necessarily a gap in its
Java knowledge. It's a decision made with incomplete information, which is a failure every engineer
has had on a Friday afternoon.

### Context: what the model knows right now

A coding agent doesn't know your repository. It knows what's in its context at the moment it
decides: the task, project instructions, the files it has opened, the conversation so far, tool
output, and summaries of earlier work. The harness decides what gets collected, kept, summarised or
dropped. The model can steer that by asking for more files or running searches, but only for things
it knows to look for.

That's the distinction that matters: **information that exists** versus **information available
when the decision is made**.

Picture a Spring Boot service that must reject a request under a particular business condition. The
rule is documented in another module. The agent has read the controller, the service and its unit
tests. It can produce a change consistent with everything it has seen and still be wrong.

The answer isn't automatically more instructions, and it certainly isn't loading the whole
repository. The engineering problem is making the relevant information discoverable, at the right
time, and distinguishable from the noise around it.

### Tools: what the agent can actually do

A model can propose running a command. Whether that command runs is up to the harness. Tools are the
interface between the model's intentions and the environment: reading files, searching, editing,
running a shell, inspecting the Git diff.

Like any interface, their design shows up in the behaviour of whoever calls them. An agent that can
only edit files can't run the test suite, so it has to reason its way to "this looks right". Give it
Maven and it can run the tests and read the failures. A tool call also isn't the same as a
successful action. Commands time out, dependencies are missing, arguments are wrong, output gets
truncated. What the model sees when that happens shapes its next move, so error output is part of
the tool's design, not an afterthought.

### Feedback: how the agent finds out it was wrong

After a change, the agent needs a way to judge the result: the compiler, unit and integration
tests, static analysis, command output. An agent that can observe the consequences of its actions
can revise its approach. This is where the loop earns its keep.

It's also where it's easiest to fool. **Feedback is not the same as correctness.** Say the agent
changes a method in that Spring Boot service, runs `mvn test`, and everything passes. What has it
learned? That the tests that ran, in that environment, passed. Not that the business requirement
holds, not that the relevant cases were covered, and not that nothing else changed. If the tests
encode the same wrong assumption as the code, they confirm the mistake instead of catching it.

None of that is new to anyone who has maintained a test suite. What's new is that the agent uses the
checks not only to grade its work but to decide what to do next. Weak feedback doesn't just let one
mistake through. It steers a whole sequence of decisions.

### Boundaries: what the agent may touch

Giving an agent unrestricted shell access widens what it can accomplish, and widens the range of
mistakes it can make by exactly the same amount. Permissions, sandboxes, working directories and
approval prompts aren't operational details. They decide how much damage a wrong decision can do
before someone notices.

Boundaries are also the first place where something is *enforced* rather than *requested*. "Don't
touch the migrations folder" in a project instruction file is a request. A permission rule that
blocks writes to it is a control. That difference is next week's subject, so I'll leave it there.

### Stopping conditions: why the loop ends

Every loop needs a way out, and the obvious one is the model deciding it's done. But the model
saying "done" doesn't make the work correct. A run can end because:

* the model believes the goal is met,
* a required completion check passed,
* it can't continue without information or approval,
* it hit a limit on time, turns, cost or tool calls,
* or an error stopped it.

Only some of those mean the task is complete. An agent that hits its turn limit after failing the
same test five times hasn't finished; it's been interrupted. One that reports success without
running the check the task needed has reached an unsupported conclusion. Whether your setup treats
those outcomes differently, and whether you can tell them apart from the final message, is a
stopping policy, and someone has to design it.

## It's the interaction that matters

Take two runs with the same model and the same task: fix a bug in a Java service.

In the first, the agent can read and edit source files, but the relevant test can't run in its
environment. It makes a plausible change, reviews its own diff, and reports success.

In the second, it can run that test. Its first change fails. The output exposes a condition it
missed, and it revises the implementation.

Same model, same request. The second run has a chance to detect and correct an error that the first
run cannot observe. This is an illustrative scenario, not a measured comparison, and it doesn't
prove the second setup always produces better code. What it shows is a mechanism: **changing the
feedback available to an agent can change its subsequent decisions without changing the model.**

The parts feed each other. A tool produces an observation; the observation becomes context; the
model chooses the next action from that context; the harness executes it inside its boundaries;
eventually a stopping condition ends the loop. It's a system, not six independent settings.

## The limit of this argument

None of this makes the model irrelevant. A well-engineered harness can't guarantee that a model
understands a requirement, picks the right action, or writes a correct implementation. Two models
with identical context and tools behave differently, and the same model behaves differently across
runs.

What the anatomy gives you is a better place to start when an agent keeps failing. Did it miss a
requirement because the information wasn't available? Did a tool return misleading output? Did the
tests fail to cover the problem? Did the agent declare success without enough evidence? Or did the
model make a poor decision despite having everything it needed?

Those are different failure modes, and they call for different fixes. Only the last one is solved by
a better model.

---

## From understanding the loop to controlling it

Once you see an agent as a loop, "is it good at Java?" turns into more precise questions. What
context does this decision need? Which tools should be available? Which checks would expose a wrong
assumption? What should stop an unsafe action? What evidence is enough to call it finished?

Some of those you can only *ask* the model to respect. Others you can *enforce* in the harness and
the environment. And some should stay with a human. Next week is about where that line falls.

As with every article in this series, the question underneath is the same:

**What engineering decision changes this agent's behaviour, and what evidence tells us whether it
helped?**

</div>
