# AI-assisted programming series

- **Started:** 2026-10-12
- **Cadence:** weekly, Monday LinkedIn post + blog article on pietrocascio.com
- **Duration:** open-ended. Continues after the Java + AI-assisted programming Pluralsight course
  launches; the goal is long-term authority on the topic, not a launch campaign.
- **LinkedIn format:** essay format from `CLAUDE.md` (hook before the fold, link in the body),
  not the Pluralsight course-promo format.

## Niche

The **engineering of AI coding agents**: how agents work and how engineers design, constrain,
verify, and work with them.

- **In:** the agent loop, context, tool design, verification and feedback, permissions and
  boundaries, stopping conditions, failure modes, multi-agent setups, codebase design that helps
  agents, the Java/statically typed angle.
- **Out:** AI news, model rankings and benchmarks, prompt listicles, "AI will replace developers",
  AI ethics in general.

## The lens

Every article answers one question:

> What engineering decision changes this agent's behaviour, and what evidence tells us whether it
> helped?

## Rules

- **No course content.** Every example is a purpose-built scenario created for the post, run with a
  real agent, and captured (session transcript + screenshots). Say in the article that the scenario
  was constructed.
- **Report at the scale observed.** "In these runs…", never "agents always…". One trace illustrates
  a mechanism; it does not prove a general claim.
- **Every post is an argument** a senior engineer could disagree with, not a topic or a listicle.
- **Date tool-specific claims.** Agent products change fast; check product behaviour, file
  conventions and protocol details before publishing.
- Sentence case for titles and headings.
- **Hashtags:** every LinkedIn post ends with the core set `#SoftwareEngineering #AIAgents
  #AIAssistedProgramming`, plus 1–2 post-specific tags (e.g. `#Java`, `#SoftwareTesting`), 5 at most.

## Arc

Three context posts first (concepts, diagrams, no recorded runs), then purpose-built scenarios.

| # | Monday | Working title | Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 2026-10-12 | Why I'm writing about the engineering of AI agents, not the models | Context: series opener and stance | ✅ Ready |
| 2 | 2026-10-19 | Anatomy of a coding agent: the loop around the model | Context: anatomy of the loop (diagram as LinkedIn image) | 🚀 Published |
| 3 | 2026-10-26 | What you tell an agent, what you enforce, and what you keep for yourself | Context: instructions vs. enforced controls vs. human judgment | 📝 Outlined |
| 4 | 2026-11-02 | Your AI coding agent is a feedback loop you have to engineer | First scenario: "rounding conflict" | 💡 Seed |

Rename the matching "AI-assisted programming post (topic TBD)" Google Calendar slot once a post is
locked.

### Post 1: series opener

Stance and lens. The industry conversation is about which model is best; most of what engineers
control is everything around the model. Sets out what the series covers and what it won't, how it
will be written (constructed scenarios, real runs, honest scale, Java lens), and the question every
article answers. LinkedIn: `engineering-ai-agents-not-models.md`. Blog: `src/articles/engineering-ai-agents-not-models.md`.
Diagram: `src/images/website/articles/ai-agent-loop.svg` (Excalidraw scene embedded; first source
`diagrams/agent-loop.excalidraw`).

### Post 2: anatomy

Model, context, tools, feedback, boundaries and stopping conditions as one loop. Argument, narrowed
on 2026-10-17 from "most behaviour is set by the harness" (more than we can show without
comparative evidence): *the model influences which action the agent chooses; the harness and the
environment decide which actions are possible, what information is available, how outcomes are
observed, and when the work stops.* The article says openly that this is narrower than post 1
promised. Introduces **harness** and **environment** as separate terms (the harness orchestrates;
the environment is the repo, build, tests, config), which later posts reuse. Illustration is a
labelled hypothetical (same model, test runnable vs. not), no recorded run. A new diagram, harness
as the hub between model and environment, replaces the code example.
LinkedIn: `anatomy-of-a-coding-agent.md`. Blog: `src/articles/anatomy-of-a-coding-agent.md`.
Diagram: `src/images/website/articles/agent-harness.svg` (Excalidraw scene embedded; source
`diagrams/agent-harness.excalidraw`).

Seeds it plants for later posts: error output as part of a tool's design (backlog: tool errors),
passing tests that confirm a wrong assumption (backlog: passing tests), stop reasons that look the
same from the final message (backlog: definition of failure).

### Post 3: what you tell, enforce, keep

Engineering decisions sort into three places: instructions (the agent may not follow them),
enforced controls (permissions, tests, sandboxes, hooks), and decisions that require a human.
Turns the series from understanding agents to engineering them.

### Post 4: first scenario, "rounding conflict"

A small Maven billing module where invoices (`HALF_UP`, per spec) and a tax report (`HALF_EVEN`,
per tax rules) share one `Money.round()` helper. Bug report: "Invoice totals are off by a cent."

- **Run 1**, loose prompt: "Fix the bug and make the build pass." Expected (not guaranteed):
  oscillation between the two rules, or a weakened test and a success claim.
- **Run 2**, engineered loop: same bug, plus "Don't modify existing tests. If two requirements
  conflict, stop and report the conflict instead of choosing."

Thesis: a loop can stay active without making progress; engineers must design how progress becomes
observable. Scenario repo to live outside this repo (proposed:
`C:\dev\consulbit\internal-projects\agent-scenarios\rounding-conflict`). Piero runs it himself in a
fresh Claude Code session; the JSONL transcript under `~/.claude/projects/` is the raw trace.

## Backlog

From the 2026-10-12 ideation session. Each still needs a purpose-built scenario.

| Working title | Thesis | Tier |
| :--- | :--- | :--- |
| More context can make a coding agent less useful | Stale or conflicting context can make a larger input worse than a smaller, well-selected one | Essay |
| Your AGENTS.md needs an expiry policy | Project instructions need ownership and revision rules, or stale guidance keeps steering the agent | Quick insight |
| Tool errors are part of your agent's programming interface | Error responses shape recovery behaviour and deserve the same design attention as results | Essay |
| Passing tests can reinforce an agent's mistaken interpretation | Tests written from the same misread requirement confirm consistency, not correctness | Essay |
| The compiler is a useful critic with a narrow remit | Static typing gives agents concrete feedback, but compiling leaves most enterprise Java failures untouched | Essay |
| A coding agent needs a definition of failure before it starts | Explicit escalation conditions stop repeated local repairs from hiding an unresolved assumption | Quick insight |
| A smaller diff can still be harder to verify | Reviewability depends on behavioural scope and evidence, not line count | Quick insight |
| Read-only access can be the right first step for a coding agent | Separating diagnosis from mutation exposes weak assumptions before edits muddy the failure | Essay |
| Rollback should influence how much autonomy you grant | Autonomy is justified by changes being isolated, observable and recoverable, not easy to execute | Essay |
| Two coding agents can share one mistaken assumption | A reviewer agent is not independent verification if it shares the same interpretation and evidence | Essay |
| Subagents need separable work before they need specialised roles | Multi-agent pays off with clear ownership and little shared state; coordination can erase the gain | Deep dive |
| MCP standardises connection, not the quality of a tool | The protocol leaves tool semantics, permissions, results and recovery as engineering work | Quick insight |
| Your AI coding agent needs the engineering culture your job ad promised | Faster change generation exposes the cost of weak tests, boundaries, specs and review | Essay |
| Faster patches do not necessarily mean faster delivery | Measure accepted outcomes and total effort, not patch-generation time | Essay |

### Open issues

- The culture piece links back to "Read the verbs in the job ad" (dated 2026-12-10). Publish that
  article first or drop the backlink.
- Strip tracking parameters (`utm_source=...`, `_bhlid=...`) from any source link cited from the
  ideation output.
