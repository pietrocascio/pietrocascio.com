# Post 1: series opener

- **Status:** Drafted, ready for review
- **Publish:** Monday 2026-10-12, LinkedIn + blog
- **Article:** `src/articles/engineering-ai-agents-not-models.md` → https://pietrocascio.com/articles/engineering-ai-agents-not-models/
- **Format:** essay LinkedIn format from `CLAUDE.md`: hook before the fold, short paragraphs, link
  at the end
- **Image:** `diagrams/agent-loop.excalidraw`. Polish it in Excalidraw, exported
  to `src/images/website/articles/ai-agent-loop.svg` (scene embedded, so it reopens in Excalidraw)
  for the article, plus a PNG for LinkedIn. It can be reused and extended for post 2.

## Post body

When an AI coding agent gets something wrong in your codebase, switching models is rarely the fix.

What you can change is everything around the model.

Most of the conversation about AI coding tools is about which model is best. Fair question. But day
to day, the model is fixed for weeks at a time.

What isn't fixed:

→ What the agent can see
→ What it's allowed to do
→ How it finds out whether its work is correct
→ When it decides it's finished, or should stop and ask

Each of those is an engineering decision. Most of them, you're already making: the project
instructions you write, the tests you have (or don't), the permissions you grant, the shape of the
code you hand it.

That's why I don't think working with agents is mainly a prompting problem. It's the same discipline
we've always practised (interface design, fast feedback, limiting blast radius, telling activity
from progress), applied to a new kind of collaborator.

So I'm starting a weekly series on the engineering of AI coding agents. No model rankings, no magic
prompts. Small scenarios built for the post, real agent runs, honest about what one run can and
can't prove. Mostly Java.

Every article will come back to one question:

What engineering decision changes this agent's behaviour, and what evidence tells us whether it
helped?

First article, on why I'm taking this angle: https://pietrocascio.com/articles/engineering-ai-agents-not-models/

Next week: why the model is the smallest part of your coding agent.

## Notes

- Hook (first two lines): ~150 characters, states the problem before the "See more" fold.
- Body length: ~1,400 characters, inside the 1,300–2,000 target.
- No course mention by design; the series is not course promo.
