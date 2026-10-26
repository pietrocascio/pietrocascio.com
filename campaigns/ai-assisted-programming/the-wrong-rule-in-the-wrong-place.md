# Post 3: the wrong rule in the wrong place

- **Status:** Draft, written 2026-10-26, not yet reviewed by Piero
- **Publish:** Tuesday 2026-10-27, LinkedIn + blog
- **Article:**
  `src/articles/the-wrong-rule-in-the-wrong-place.md` → https://pietrocascio.com/articles/the-wrong-rule-in-the-wrong-place/
- **Source:** plan locked in a grilling session on 2026-10-26 (see SERIES.md, Post 3).
- **Format:** essay LinkedIn format from `CLAUDE.md`: hook before the fold, short paragraphs, link
  at the end
- **Image:** decision diagram, `diagrams/rule-placement.excalidraw`, exported to
  `src/images/website/articles/rule-placement.svg` (scene embedded) for the article plus
  `diagrams/rule-placement.png` for LinkedIn.

## Post body

Writing "don't touch the migrations" in CLAUDE.md doesn't protect them.

Blocking the entire folder does — but it also stops your agent from creating the next migration.

Same worry, opposite mistakes.

The first treats an instruction as a guarantee. An instruction steers the agent and saves it wasted
turns. It doesn't hold when the model decides otherwise.

The second draws the boundary in the wrong place. The property that matters isn't "nothing in this
folder changes". It's "migrations that have already run don't change". The first is easy to
enforce, and it blocks legitimate work.

The problem isn't how many rules you give your coding agent. It's which responsibility you assign
to each rule.

Three questions I now ask before placing one:

→ Does it need human judgment or authority? A person decides.  
→ Would a violation be acceptable? An instruction is enough.  
→ Can a machine reliably check it? Enforce it. If not, a person reviews the result.  

The obvious objection: human approval doesn't scale. Agreed. If every action needs approval, the
boundary is in the wrong place. Automate what can be verified, pre-authorise what can be safely
bounded, and keep human judgment for the decisions that actually need it.

The article walks through a constructed Flyway example, the decision diagram, and what this looks
like in Claude Code today:
https://pietrocascio.com/articles/the-wrong-rule-in-the-wrong-place/

#SoftwareEngineering #AIAgents #AIAssistedProgramming #Java

## Notes

- Hook (first two lines): ~170 characters, inside the 150–200 window; body ~1,480 characters; both directions of the thesis
  land before the "See more" fold. Wording ("does — but it also stops…") is Piero's correction from
  the grilling: the folder block does protect, it just protects too much.
- One idea in the body: responsibility per rule, not number of rules. The diagram goes in as the
  image; the arrows only paraphrase it.
- No "next week" teaser: post 4 needs a recorded run that doesn't exist yet, so don't promise a date.
  The article's closing already sets up the "don't modify existing tests" instruction.
- No backticks (LinkedIn shows them literally); remove hard line wraps before pasting.
- No course mention by design; the series is not course promo.
