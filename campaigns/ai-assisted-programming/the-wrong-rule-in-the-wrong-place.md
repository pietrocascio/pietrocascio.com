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

Blocking the entire folder does, but it also stops your agent from creating the next migration.

Both come from the same worry and fail in opposite directions.

The CLAUDE.md line treats an instruction as a guarantee. An instruction steers the agent and saves
it wasted turns, but it doesn't hold when the model decides otherwise.

The folder block draws the boundary in the wrong place. What you want to protect is "migrations
that have already run don't change", and the block enforces "nothing in this folder changes"
instead. That version is easier to enforce, and it stops legitimate work.

Both mistakes give a rule the wrong job, and adding more rules to your coding agent fixes neither.
Before I place a rule now, I ask three questions:

1. Does it need human judgment or authority? A person decides.
2. Would a violation be acceptable? An instruction is enough.
3. Can a machine reliably check it? Enforce it. If not, a person reviews the result.

A fair objection is that human approval doesn't scale. It doesn't, and if every action needs
approval, the boundary is in the wrong place. Automate what can be verified, pre-authorise what can
be safely bounded, and keep human judgment for the decisions that actually need it.

The article walks through a constructed Flyway example, the decision diagram, and what this looks
like in Claude Code today:
https://pietrocascio.com/articles/the-wrong-rule-in-the-wrong-place/

#SoftwareEngineering #AIAgents #AIAssistedProgramming #Java

## Notes

- Hook (first two lines): ~170 characters, inside the 150–200 window; body ~1,480 characters; both
  directions of the thesis
  land before the "See more" fold. Wording ("does — but it also stops…") is Piero's correction from
  the grilling: the folder block does protect, it just protects too much.
- One idea in the body: responsibility per rule, not number of rules. The diagram goes in as the
  image; the arrows only paraphrase it.
- No "next week" teaser: post 4 needs a recorded run that doesn't exist yet, so don't promise a
  date.
  The article's closing already sets up the "don't modify existing tests" instruction.
- No backticks (LinkedIn shows them literally); remove hard line wraps before pasting.
- No course mention by design; the series is not course promo.
