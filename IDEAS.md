# Content Ideas and Episode Backlog

A persistent storage and backlog for technical article concepts, production episodes, architectural debates, and consulting experiences for [pietrocascio.com](https://pietrocascio.com) and LinkedIn technical posts.

---

## Quick Reference Backlog

| Status | Working Title | Category / Target Tier | Date Added |
| :--- | :--- | :--- | :--- |
| 🚀 Published | [The broken window effect in software teams: why bad code is contagious](src/articles/broken-window-effect-in-software-teams.md) | Standard Essay (1,000–1,500w) | 2026-08-22 |
| 🚀 Published | [Clean code and the cost of change](src/articles/clean-code-slows-delivery.md) | Standard Essay (1,000–1,500w) | 2026-01-20 |
| 🚀 Published | [How a six-month-old system becomes legacy code](src/articles/legacy-code-sonarqube.md) | Standard Essay (1,000–1,500w) | 2026-01-15 |
| 🚀 Published | [Why I regret using Hibernate's EAGER fetching](src/articles/hibernate-regret.md) | Quick Code Fix (400–800w) | 2025-11-10 |
| 💡 Seed | *The mock-heavy test suite that test nothing* | Standard Essay (1,000–1,500w) | 2026-08-22 |
| 💡 Seed | *When microservices become a distributed monolith: the synchronous HTTP trap* | Deep Dive (3,000+w) | 2026-08-22 |

---

## Copy-Paste Idea Template

Whenever you encounter a compelling bug, PR debate, architectural dilemma, or consulting episode, copy and paste this template below the `---` divider in the **Active Ideas** section.

```markdown
### [Status: 💡 Seed / 🔍 Researching / 📝 Outlined / ✍️ Drafting / 🚀 Published]
#### Working title in sentence case

- **Category / Target Tier:** [Quick Code Fix (400–800w) | Standard Essay (1,000–1,500w) | Tutorial (1,500–2,500w) | Deep Dive (3,000+w)]
- **Date added:** YYYY-MM-DD
- **Target language:** English (or Italian)

#### 1. The spark / episode / incident
*What happened? (e.g., a specific code review conversation, production outage, consulting observation, team friction, or counterintuitive debugging discovery):*
- 

#### 2. The core technical dilemma / thesis
*What is the contrarian take, misconception, or architectural lesson? (State the thesis in 1–2 sentences):*
- 

#### 3. Key arguments & talking points
*What are the main sections or technical points to cover?*
- **Point 1:** 
- **Point 2:** 
- **Point 3:** 

#### 4. Data, studies, or code examples needed
*What references, benchmarks, empirical papers, or code snippets will back this up?*
- 

#### 5. LinkedIn hook concept (Under 200 characters)
*The bold opening line to place before the "See more..." fold:*
> 
```

---

## Active Ideas & Seeds

### 💡 Seed: The mock-heavy test suite that tests nothing
- **Category / Target Tier:** Standard Essay (1,000–1,500w)
- **Date added:** 2026-08-22
- **Target language:** English

#### 1. The spark / episode / incident
Joining a team with "90% code coverage" where every single refactoring broke dozens of unit tests, yet critical production regressions were slipping through regularly. Every unit test was mocking every collaborator down to the repository interface, verifying method call interactions (`verify(repo).findById(any())`) rather than observable behavior.

#### 2. The core technical dilemma / thesis
Over-mocking couples test suites to implementation details rather than business behavior, turning tests into brittle change-detectors that actively penalize clean refactoring while giving a false sense of security.

#### 3. Key arguments & talking points
- Verification of interactions vs. state/behavior verification (Martin Fowler's *Mocks Aren't Stubs*).
- How heavy mocking makes refactoring impossible without rewriting tests.
- Sociable unit tests vs. solitary unit tests.
- Practical guideline: when to use fakes/in-memory adapters instead of deep mocks.

#### 4. Data, studies, or code examples needed
- Code example: A trivial service test with 40 lines of mock setup testing a 3-line method.
- Reference: Martin Fowler (*Mocks Aren't Stubs*), Vladimir Khorikov (*Unit Testing: Principles, Practices, and Patterns*).

#### 5. LinkedIn hook concept (Under 200 characters)
> 90% test coverage means nothing if your tests break every time you rename a private helper method. Here is why mock-heavy test suites make refactoring dangerous:

---

### 💡 Seed: When microservices become a distributed monolith: the synchronous HTTP trap
- **Category / Target Tier:** Deep Dive (3,000+w)
- **Date added:** 2026-08-22
- **Target language:** English

#### 1. The spark / episode / incident
A client splitting a monolithic relational database into 12 microservices, but implementing features via cascading synchronous REST/HTTP calls (Service A calls B, which calls C, which calls D). A single slow query in Service D brought down the entire checkout flow across all 12 services.

#### 2. The core technical dilemma / thesis
Splitting deployment units without splitting data ownership and temporal coupling creates a distributed monolith: all the network latency, operational overhead, and failure cascade risks of distributed systems with none of the independent scalability.

#### 3. Key arguments & talking points
- Temporal coupling vs. spatial coupling.
- Blast radius and cascading failure modes in synchronous REST chains.
- Event-driven choreography vs. orchestrators.
- Pragmatic boundary lines: when a modular monolith is strictly superior to premature microservices.

#### 4. Data, studies, or code examples needed
- Architecture diagrams showing cascading latency ($t_1 + t_2 + t_3$) vs. eventual consistency.
- Reference: Sam Newman (*Monolith to Microservices*), Gregor Hohpe (*Enterprise Integration Patterns*).

#### 5. LinkedIn hook concept (Under 200 characters)
> If Service A cannot complete a request without synchronously calling Services B, C, and D over HTTP, you don’t have microservices. You have a distributed monolith with network latency.

---

[Status: 💡 Seed / 🔍 Researching / 📝 Outlined / ✍️ Drafting / 🚀 Published]: #
### [Status: 🔍 Researching]
#### What are Code Owners and how to use them

- **Category / Target Tier:** [Quick Code Fix (400–800w) | Standard Essay (1,000–1,500w) | Tutorial (1,500–2,500w) | Deep Dive (3,000+w)]
- **Date added:** YYYY-MM-DD
- **Target language:** English (or Italian)

*To research*: [GitHub Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

#### 1. The spark / episode / incident
*What happened? (e.g., a specific code review conversation, production outage, consulting observation, team friction, or counterintuitive debugging discovery):*
- 

#### 2. The core technical dilemma / thesis
*What is the contrarian take, misconception, or architectural lesson? (State the thesis in 1–2 sentences):*
- 

#### 3. Key arguments & talking points
*What are the main sections or technical points to cover?*
- **Point 1:**
- **Point 2:**
- **Point 3:**

#### 4. Data, studies, or code examples needed
*What references, benchmarks, empirical papers, or code snippets will back this up?*
- 

#### 5. LinkedIn hook concept (Under 200 characters)
*The bold opening line to place before the "See more..." fold:*