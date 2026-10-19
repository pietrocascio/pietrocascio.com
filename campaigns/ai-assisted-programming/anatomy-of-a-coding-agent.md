# Post 2: anatomy of a coding agent

- **Status:** Ready
- **Publish:** Monday 2026-10-19, LinkedIn + blog
- **Article:**
  `src/articles/anatomy-of-a-coding-agent.md` → https://pietrocascio.com/articles/anatomy-of-a-coding-agent/
- **Source:** first draft written with ChatGPT on 2026-10-17, then edited for voice, length and
  consistency with post 1 (see SERIES.md, Post 2).
- **Format:** essay LinkedIn format from `CLAUDE.md`: hook before the fold, short paragraphs, link
  at the end
- **Image:** new diagram, `diagrams/agent-harness.excalidraw`, exported to
  `src/images/website/articles/agent-harness.svg` (scene embedded) for the article plus
  `diagrams/agent-harness.png` for LinkedIn. It must show what post 1's diagram didn't: the **harness** sits
  between the model and the environment. Boxes:
    - Model → "next action?" with three exits: call a tool, finish, ask for help.
    - Tool call → harness (permission check, execute) → environment (repo, build, tests) → results →
      harness updates context → back to the model.
    - Finish → completion checks → accepted: return result / not accepted: back into context.
    - Blocked action or ask for help → human → resume.
      Make the harness visibly a container or hub, not just another step in the circle.

## Post body

Your coding agent says the bug is fixed. The tests pass. The behavior is still wrong.

Before blaming the model, ask what it could see.

A model doesn't run Maven or open files. It proposes the next action. Something else decides whether
that action is allowed, runs it, and decides what the model gets to see afterward.

That something is the harness. And it acts on an environment your team has been building for years:
the repo, the build, the tests that exist (or don't).

So when an agent gets it wrong, there are different places it can fail:

→ The rule it broke wasn't in its context  
→ A tool returned misleading or truncated output  
→ The tests encoded the same wrong assumption as the fix  
→ It declared success without running the check that mattered  
→ Or the model made a poor call with everything it needed  

Those are different failure modes, and they need different fixes. Only the last one is solved by a
better model.

My short version:

The model chooses which action to take. The harness and the environment decide which actions are
possible, what information is available, how results are observed, and when the work stops.

The article goes through each part of the loop (model, context, tools, feedback, boundaries,
stopping conditions) and what an engineer can change about each one:
https://pietrocascio.com/articles/anatomy-of-a-coding-agent/

Next week: what you can only ask an agent to do, what you can enforce, and what you should keep for
yourself.

#SoftwareEngineering #AIAgents #AIAssistedProgramming #AgenticAI #Java

## Notes

- Hook (first two lines): ~130 characters, states the problem before the "See more" fold.
- Body length: ~1,600 characters, inside the 1,300–2,000 target.
- Post 1 promised "why the model is the smallest part of your coding agent". The article
  acknowledges the change openly in its intro and states the narrower claim.
- No course mention by design; the series is not course promo.
