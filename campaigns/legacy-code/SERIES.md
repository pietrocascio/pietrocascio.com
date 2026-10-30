# Afraid to change: a series on legacy code

- **Planned:** 2026-10-30 (grilling session). First post Friday 2026-11-13.
- **Cadence:** every other Friday, blog article on pietrocascio.com + LinkedIn post. Occasional
  LinkedIn-only quick posts are fine. Nov 13, Nov 27, Dec 11, then a holiday pause; resume in
  January. Consider weekly once the Collections campaign frees up Wednesdays (after Nov 11).
- **Duration:** open-ended.
- **LinkedIn format:** essay format from `CLAUDE.md` (hook before the fold, link in the body).

## Positioning

Supports a tech lead / staff engineer profile in established companies, where legacy code is the
real terrain. Legacy is the setting Piero knows how to operate in, not his whole identity. Leaves
room to converge with the AI series later (agents on legacy code as the hard case).

## Thesis and definition

- **Thesis:** legacy code is what success leaves behind. It can't be eradicated; the skill is living
  with it and steering it.
- **Recurring thread:** legacy is made, not inherited. The habits that create it are happening on
  today's teams.
- **Working definition:** legacy code is *code the team is afraid to change*. Covers untested code,
  old technology and lost knowledge, and puts people at the centre.

## Rules

- **Firsthand, anonymised.** Real episodes framed as "a codebase I worked on"; remove or change
  industry, product and names. Composites are labelled as composites. Never invent episodes.
- **Lived material:** a strangler migration that worked; adding tests to untested code; a "do not
  touch" module and its absent owner; business pressure ("no time to refactor"); taking over after
  the authors left; database coupling. **Not lived:** a failed rewrite, a big Java/framework
  upgrade. Don't frame those as firsthand.
- **Blame the system, not people.** Nobody in these stories is incompetent; the incentives make the
  bad choice rational. Keep human beats (lost battles), avoid bitterness and "the business" as a
  villain.
- **Don't retell Feathers.** *Working Effectively with Legacy Code* is the reference; the edge is
  firsthand patterns and why they happen, not technique summaries.
- Sentence case for titles and headings.
- **Hashtags:** core set `#SoftwareEngineering #LegacyCode #Refactoring`, plus 1–2 post-specific
  tags (e.g. `#Java`, `#TechnicalDebt`), 5 at most.
- **Site topic:** add `legacy-code` to `src/_data/topics.json` in the same commit as the opener
  article (an empty topic would publish a blank page). Suggested entry: name "Legacy code",
  description along the lines of "Living with code the team is afraid to change: why it happens,
  and how to steer it."

## Related published articles

Already on the site (both tagged `code-quality`), and close to this series' thesis:

- [How a six-month-old system becomes legacy code](../../src/articles/legacy-code-sonarqube.md)
  (2026-01-15): greenfield systems drift into legacy; closes on "legacy is a trajectory, not an
  age". Overlaps with the "legacy is made" thread and with post 2.
- [The broken window effect in software teams](../../src/articles/broken-window-effect-in-software-teams.md)
  (2026-08-22): bad code trains developers to mimic it. Overlaps with the copy-paste loop in post 1.

The series must build on these, not restate them: link them where they fit, and keep each post's
angle distinct (post 1 is about *fear* and an old module nobody owns; those two are about drift in
new code and contagion). **Open:** whether to retag them `legacy-code` when the topic is added
(it would leave `code-quality` with one article).

## Arc

Diagnosis first (why legacy happens), remedy second, the success story last as the payoff.

| # | Friday | Working title | Material | Status |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 2026-11-13 | Legacy code is what success leaves behind | Billing engine scene; fear → copy-paste loop | 💡 Locked, not drafted |
| 2 | 2026-11-27 | "No time to refactor": how legacy gets made | Business pressure | 💡 Seed |
| 3 | 2026-12-11 | What I would have done with the billing engine | Sequel to #1: the plan never run (characterisation tests, mapping the coupling) | 💡 Seed |
| 4 | January | Adding tests to code that has none | First lever | 💡 Seed |
| 5 | — | The database as the hidden coupling | Database coupling | 💡 Seed |
| 6 | — | The strangler migration that worked | What made it work | 💡 Seed |

**AI crossover:** after legacy #4, published as an AI series post (Monday) that links back to it.
Tests are the bridge: without them, an agent's changes on legacy code can't be verified, and an agent
"isn't afraid to change" anything. Add it to `campaigns/ai-assisted-programming/SERIES.md` when
scheduled.

### Post 1: legacy code is what success leaves behind

- **Tier:** standard essay, 1,000–1,500 words. Write Nov 3–12, after AI series #4.
- **Opening scene (firsthand):** a billing calculation engine built years earlier, untouched apart
  from minor fixes. A legal requirement changed and it needed a change request. The chance to
  modernise it, but: no tests at all, logic tightly coupled to other modules, undocumented
  relationships, and very high business pressure because past small changes had caused incidents
  (money involved, so everyone panics). Its owner had left long before, with no handover. Everyone
  stayed away from it; whenever something had to be added, they copied and pasted a nearby piece
  that apparently worked, so the module grew into a monster.
- **Piero's position:** he wanted to improve it, but that needed deep understanding of the business
  logic and the coupling, plus a testing strategy, before any refactoring. The time was never
  given. Having fought and lost the same battle before, he didn't spend more energy on it, left
  shortly after, and expected the module to be worse two years later. Sympathy for the next
  developers.
- **Age and scale unknown:** Piero doesn't know how old the engine was or what volume it handled.
  Keep it vague ("years old", "the code that calculated what customers paid"); never invent figures.
- **Turn:** the module wasn't neglected by bad engineers; it was a success that the business came to
  depend on, and the fear itself produced it. Every copy-paste was the rational choice.
- **Edit and Pray irony (Feathers):** the business demanded absolute safety because money was
  involved, but by refusing time for tests it forced the least safe way of working, *Edit and Pray*
  instead of *Cover and Modify*. The fear produced the danger it wanted to avoid. One Feathers
  reference anchors this; don't stack more frameworks on top.
- **Empathy line:** whoever wrote the engine worked under deadlines and constraints nobody remembers.
  One sentence, in line with "blame the system".
- **Not in the opener:** the remedy (characterisation tests, sprout methods) is post 3; the
  value-and-risk argument is post 2. The opener diagnoses and promises the series will get there.
- **Close:** the definition, "code the team is afraid to change", and what the series will cover.
- **Ending tone:** honest that there was no fix; keep one human line about lost battles; land on
  the system, not on people.
- **Diagram (LinkedIn image):** a loop. Fear of the module → copy-paste instead of change → module
  grows bigger and more opaque → more fear. Echoes the AI series loop diagram, as the start of a
  shared visual language.

### Post 2: "No time to refactor"

- **Vocabulary gap:** engineers ask for time to clean up code and pay down debt; the business hears
  cost and risk with no new features. To a manager, refactoring a working billing system looks like
  taking all the risk for zero visible value. Argue that refactoring has to be pitched as risk
  management and defect prevention. Sources on this: Bernstein (*Beyond Legacy Code*), Birchall
  (*Re-Engineering Legacy Software*). Verify any attribution before citing.
- **Tone:** don't frame Piero's lost battles as failing to speak the right language, and don't make
  the business the villain.

### Post 3: what I would have done with the billing engine

- **The legacy code dilemma (Feathers):** to change code safely you need tests, but to add tests you
  have to change code. Explains why the plan starts with characterisation tests.
- **The plan:** characterisation tests that pin down current behaviour; sprout methods/classes so
  the legal change lands in new, tested code; build small islands of tested code around change
  points instead of asking for one big refactoring window. Map the coupling to other modules first.

### Notes from external research (NotebookLM, 2026-10-30)

A NotebookLM notebook fed with legacy code books (Feathers, Bernstein and others) reviewed post 1.
Kept: Edit and Pray irony, copy-paste as survival, empathy line (post 1); value and risk (post 2);
dilemma, characterisation tests, sprout methods (post 3). Rejected: a hook with invented figures
("10-year-old", "millions in transactions"); "burnout and departure" framing (Piero never said
burnout); stacking five authors in one post; the "Lava Flow" label for copy-paste (in *AntiPatterns*
it means dead, frozen code, a loose fit); its suggested structure, which drops the
"what success leaves behind" thesis and ends on advice.
