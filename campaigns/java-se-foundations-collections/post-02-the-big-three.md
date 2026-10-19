# Post 2 — The Big Three: List, Set, Map (Module 2)

- **Status:** Published on LinkedIn 2026-10-14
- **Course:** [Java SE Foundations: Collections](http://www.pluralsight.com/courses/java-se-foundations-collections)
- **Module covered:** 2 — The Big Three - List, Set, Map
- **Format:** LinkedIn text post, per `resources/Author LinkedIn Social Sharing One-Sheeter.pdf`
- **Note:** No campaign meta-commentary — pure teaser, per the "post 1 only" rule.

## Post body

I added a duplicate package ID to a Set. It let it in anyway.

Not a Java bug. A missing equals() and hashCode().

This is the kind of failure that doesn't show up in code review — the Set looks correct, the types
check out, the tests probably even pass. It just quietly corrupts data the moment two "equal"
objects don't agree on what equal means.

Module 2 of my course with @Pluralsight walks through this exact failure inside Flux: package IDs
that should be unique, tracked in a HashSet, until one slips through and the warehouse system starts
double-counting inventory.

Same story with Lists and Maps. Not "here's the syntax" — here's the moment each one breaks when you
reach for it out of habit instead of intent:

→ List, when order and duplicates both matter (scan history)
→ Set, when uniqueness is the actual requirement, not a convention
→ Map, when you need lookup by identity — and when a plain record beats a Map you don't actually
need

The bug always shows up before the fix does. That's deliberate.

Have you ever shipped a Set that had a duplicate hiding in plain sight?

#Pluralsight #Java #DataStructures #TechSkills #ContinuousLearning

## First comment (post immediately after publishing)

🎥 Java SE Foundations:
Collections → http://www.pluralsight.com/courses/java-se-foundations-collections
