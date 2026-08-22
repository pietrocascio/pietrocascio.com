# Rotten Codebases as Work Environments: What Research Says About Technical Debt, Developer Behavior, and Junior Engineers

## Executive finding

Your core observation has substantially more empirical support than the usual “broken windows” metaphor suggests.

The strongest direct study I found deliberately gave professional developers either a relatively clean system or the same system seeded with technical debt, then measured what they added. Developers working in the high-debt version were estimated to be **102% more likely to duplicate existing logic, 458% more likely to introduce non-descriptive variable names, and to introduce 117% more SonarQube issues**. Because the researchers manipulated the initial technical-debt level, they argue that the difference can be interpreted causally rather than as a mere correlation. citeturn15view1turn15view2

The qualitative part is strikingly close to the behavior you described. Participants explicitly reported adapting their new code to the conventions already present, sometimes choosing a worse naming scheme in order to remain consistent. Others said the poor code discouraged them enough that they lowered their effort and concentrated on getting the tests to pass. The researchers concluded that mimicry was likely an important mechanism, although not the only one, because existing debt also increased *different* kinds of debt from those already present. citeturn15view3

A separate large-scale study subsequently analyzed more than **2.2 million commits across 122 long-lived open-source projects**. It found that existing code quality predicted aspects of subsequent code quality and that developers adapted some coding behaviors to the quality and style of the files they were changing. The authors describe the evidence as **qualified support** for a software-engineering version of broken-windows theory. citeturn16view0

The broader consequences are also measurable. Industrial studies report that developers attribute roughly **23% of their working time to dealing with technical debt**; low-quality code in 39 proprietary production systems was associated with **15 times as many defects and 124% longer issue-resolution time** than high-quality code; and developers with weak ownership of low-quality files required **45% more time for small changes and 93% more for large changes**. citeturn14view0turn20view1turn19search0

There is also evidence for a human cost. Mixed-method research associates technical debt with lack of progress, wasted time, and reduced developer morale, while experimental work has found that some forms of technical debt produce measurable negative affect and apprehension. citeturn14view1turn13search11

There is, however, one important correction to make before turning your experience into an article thesis:

> **The evidence supports “bad code encourages more bad code” much more strongly than it supports “junior developers are uniquely susceptible to bad code.”**

The broken-windows experiment contained many relatively inexperienced developers, and the estimated duplication effect was actually **113% for developers with no professional experience versus 102% for a modeled developer with ten years of experience**. But the study was too small to test whether experience *moderates* the broken-windows effect. The authors explicitly warn against drawing that conclusion. citeturn15view0turn15view1turn15view3

A defensible version of your thesis is therefore:

> **A codebase is not merely an artifact developers maintain. It is part of their work environment. Existing code communicates local norms about what quality is expected. When those norms are poor, developers are measurably more likely to reproduce or add technical debt; the resulting debt increases cognitive and maintenance effort, reduces productivity and morale, and particularly burdens developers who have little ownership or project-specific knowledge. Junior developers are therefore highly exposed to the effect, even though current evidence does not establish that they are intrinsically more susceptible than senior developers.**

That formulation is considerably stronger scientifically than simply saying “juniors copy bad code.”

## What the broken-windows evidence actually shows

### The controlled experiment is unusually direct

William Levén, Hampus Broman, Terese Besker, and Richard Torkar designed *The Broken Windows Theory Applies to Technical Debt* specifically to answer whether **pre-existing technical debt causes developers to introduce additional technical debt**. Participants extended small existing systems; depending on the experimental condition, those systems contained high or low levels of deliberately introduced debt. The researchers combined quantitative analysis with follow-up interviews. citeturn14view3

There were **29 participants and 51 submitted solutions**. Six participants had no or very little professional programming experience, and another eleven had fewer than five years of experience, making the sample unusually useful for thinking about early-career developers. Participants nevertheless spanned a variety of software sectors. citeturn15view0

The headline results are unusually large:

| Outcome | Estimated effect of high-debt codebase | Interpretation |
|---|---:|---|
| Logic duplication | **+102% likelihood** | Developers were much more likely to duplicate existing logic rather than reuse it cleanly. |
| Logic duplication, no professional experience | **+113% likelihood** | The estimated effect persisted for participants at the lowest experience level. |
| Non-descriptive variable naming | **+458% likelihood** | Bad surrounding code strongly influenced naming behavior. |
| New SonarQube issues | **+117%** | Existing debt produced additional quality problems beyond duplication/naming. |

These figures are model estimates for the experimental systems, not universal industry constants. The 102%, 458%, and 117% headline figures are reported for simulations of a developer with ten years of professional experience; the no-experience duplication estimate was 113%. The relevant 95% credible intervals supported an effect of existing technical debt. citeturn15view1turn15view2

Professional experience, considered by itself, had little or no estimated effect on logic reuse or variable-name descriptiveness in those models. For general SonarQube issues, more experience appeared potentially beneficial, but the estimate remained uncertain. citeturn15view1

That is important for your article because it challenges a tempting explanation:

**This is not simply a story about incompetent juniors producing poor code.**

Experienced developers changed their behavior too when placed in a worse code environment. citeturn15view1

### Developers really do take cues from surrounding code

The interviews help explain the statistical results. Participants reported that when the existing naming convention was bad, adopting a better convention locally could itself make the codebase less internally consistent. Some therefore deliberately stayed aligned with the existing style. Others described effectively assuming that the previous developers had a reason for doing something a particular way and following the same path. citeturn15view3

That is almost exactly the mechanism behind your observation that developers “mimic what they find.”

Importantly, however, mimicry cannot explain everything. Developers exposed to one type of technical debt also introduced **different kinds of technical debt**. The researchers therefore argue that the bad environment appears to do more than supply examples to copy: it seems to influence the developer's broader standard of care. citeturn15view2turn15view3

A useful conceptual distinction for your article is:

**Copying mechanism**

```text
Bad existing pattern
        ↓
Developer needs a local example
        ↓
Developer copies/adapts it
        ↓
More instances of the same bad pattern
```

**Norm-setting mechanism**

```text
Generally neglected codebase
        ↓
"This appears to be the accepted standard here"
        ↓
Less incentive to invest in high-quality implementation
        ↓
New debt, including debt unlike what already existed
```

The experiment provides evidence for both, with stronger direct behavioral evidence that imitation is only part of the explanation. citeturn15view2turn15view3

### Poor code can also reduce the effort developers are willing to invest

Another mechanism is psychologically different from imitation.

Participants exposed to the worse system described discouragement and reduced enthusiasm. Some regarded extensive refactoring as pointless because the surrounding system was already in such poor condition. One participant reported essentially switching to a “make the tests pass and finish” mentality. citeturn15view2turn15view3

Interestingly, participants did **not** spend significantly more time on the high-debt tasks even though the code was harder to read. The authors suggest a plausible interpretation: instead of compensating for a worse environment with additional time, developers may sometimes compensate by lowering the quality of the solution. They explicitly present this as an interpretation rather than a proven mechanism. citeturn15view3

That leads to a more interesting version of broken windows than “people copy ugly code”:

> **Technical debt changes the local economics of craftsmanship. When developers perceive the surrounding system as neglected, the marginal value of doing one small piece exceptionally well may appear lower.**

The first causal link, existing technical debt leading to more newly introduced debt, is experimentally supported. The precise psychological explanation remains less certain. citeturn15view2turn15view3

### Large-scale repository evidence points in the same direction

Spinellis, Louridas, Kechagia, and Sharma approached the question very differently. Instead of manipulating tiny systems experimentally, they mined a large corpus of long-lived C and Java projects. Their dataset contained **2,233,372 commits**, hundreds of thousands of files, and more than two million analyzed file revisions across **122 projects**. citeturn16view0

They asked two questions:

1. Does future internal code quality relate to past internal quality?
2. Do developers behave differently when modifying files of different existing quality?

For the source files where autocorrelation could be calculated, the authors report substantial persistence of code-quality characteristics. More than **80% of files showed substantial short-term historical effects for the studied metrics**, while approximately **40% still showed significant autocorrelation across ten revision lags**. They also found that adherence to some coding practices was related to the appearance and quality of the existing file. citeturn16view0

This study is observational, so it cannot isolate causality in the same way as Levén et al. Many variables can simultaneously produce both historical and future quality: team ability, project practices, architecture, tooling, domain, and developer population. The authors explicitly acknowledge these possibilities. citeturn16view0

But the two studies complement one another unusually well:

| Study | Strength | Weakness |
|---|---|---|
| Levén et al. | Controlled manipulation supports causality | 29 developers, artificial systems and short tasks |
| Spinellis et al. | 122 real projects and millions of revisions | Observational, therefore confounding remains possible |

Together they provide much better support than either would alone. The controlled experiment shows that bad existing code *can cause* developers to introduce more debt; the large repository study shows that analogous patterns are visible in real, long-running software projects. citeturn15view2turn16view0

That is probably the strongest empirical foundation for the central argument of your article.

## How an unhealthy codebase affects the people working in it

The propagation of bad practices is only one part of the story. A technically unhealthy environment also imposes costs on time, predictability, cognition, and morale.

### Technical debt consumes a substantial part of development time

Besker, Martini, and Bosch performed a longitudinal industrial study and subsequent replication/extension examining developers' daily interaction with technical debt. The replication study included **43 developers**, supplemented by **16 interviews** and an independent validation dataset. Developers reported wasting, on average, **23% of their working time because of technical debt**. They also frequently reported that existing technical debt forced them to introduce additional debt. citeturn14view0

The 23% should not be translated into “every company loses exactly one day per week.” It is self-reported developer time in the studied populations, and “technical debt” spans multiple kinds of problems. But as an estimate of the magnitude developers themselves experience, it is substantial. citeturn14view0

The study reported that additional testing was the most common extra activity created by technical debt. In other words, poor internal quality does not merely make the actual coding operation slower. It creates **secondary work** required to safely understand, compensate for, and verify changes. citeturn14view0

That is a useful framing:

> Technical debt does not only slow down the code you are writing. It increases the amount of work required *around* the code you are writing.

### Industrial repository data associate poor code with dramatically worse outcomes

Tornhill and Borg's *Code Red* study examined **39 proprietary production codebases** and connected source-code maintainability measures to defect and issue data. Its most frequently cited findings are that low-quality code contained **15 times more defects** than high-quality code and that issue resolution in low-quality code took **124% longer on average**. The study also reported considerably greater variation in resolution time, meaning poor code reduced predictability as well as average speed. citeturn20view0turn20view1

A later analysis combined this dataset with another proprietary dataset, producing **79 industrial projects and 46,211 source files**. The extended analysis again found higher maintainability associated with fewer defects and faster development, while also showing that relationships were nonlinear rather than a simple constant “quality premium.” citeturn20view1

That later paper is particularly relevant to the broken-windows argument because the authors observed an initially counterintuitive pattern at the extreme low end of quality: work on truly abysmal files was not always the slowest. They raise broken-windows behavior as one possible explanation, namely that developers may apply quick, substandard fixes to code already perceived as beyond saving. The authors correctly present this as a hypothesis rather than causal proof. citeturn20view1

There is an important methodological caveat. These studies use CodeScene's **Code Health** measurement and proprietary customer datasets. The associations are substantial, but the measurements should not be treated as universal laws of all possible definitions of code quality. The authors of the extended study explicitly describe the repository analysis as observational and acknowledge unresolved confounders. citeturn20view1

For an article, therefore:

**Strong claim:** “In one dataset of 39 proprietary production systems, low-quality code was associated with 15× more defects and 124% longer issue-resolution time.” citeturn20view1

**Too strong:** “Bad code universally causes developers to be 124% slower.”

### Google found evidence that perceived code quality precedes productivity

A particularly useful independent industrial result comes from Google.

Cheng and colleagues examined **39 potential productivity factors** using panel data from Google developers. Factors included code quality, technical debt, infrastructure, team communication, organizational processes, and priorities. Their first analysis identified several factors linked to perceived developer productivity. They then used a lagged panel analysis to investigate temporal direction. citeturn20view2

Their key result was that improvements in **perceived code quality tended to precede increases in developer productivity, whereas increased productivity did not similarly precede perceived code-quality improvements**. The authors present this as strong evidence that code quality affects individual developer productivity. citeturn20view2

This matters because it moves the discussion beyond static-analysis metrics.

A developer's perception of the code environment itself appears consequential. citeturn20view2

That reinforces a broader point for your article:

> **Developer experience is partly a property of the codebase.**

Build tooling, management, meetings, and team culture matter, but the source code developers spend hours navigating is itself part of the environment determining how effectively they can work. Google's analysis directly places code quality and technical debt alongside organizational and infrastructural factors affecting productivity. citeturn20view2

### Poor code has measurable cognitive consequences

Fakhoury and colleagues experimentally investigated poor lexical quality and code readability using physiological measures of cognitive load. Their findings indicate that poor-quality terminology and linguistic anti-patterns impair program comprehension and increase the effort developers need to maintain code. citeturn18search1turn18search3

This is valuable because “clean code is easier to read” is often treated as taste. Experimental comprehension research shows that at least some seemingly superficial characteristics, particularly identifier and lexical quality, affect the cognitive work required from the reader. citeturn18search3

That connects neatly with the broken-windows experiment, where poor naming was both:

1. something developers found more difficult and frustrating to understand, and
2. something they became dramatically more likely to reproduce. citeturn15view1turn15view2

The resulting loop is potentially self-reinforcing:

```text
Poor naming / structure
        ↓
Greater comprehension effort
        ↓
Lower productivity and more friction
        ↓
Pressure to make the smallest/fastest change
        ↓
Existing local conventions are reused
        ↓
More poor naming / structural debt
```

Research establishes several of those individual relationships, although no single longitudinal study has yet demonstrated the entire feedback loop end-to-end. citeturn14view0turn15view3turn18search3

### Technical debt affects morale, not just throughput

Besker, Ghanbari, Martini, and Bosch specifically studied technical debt and developer morale. Their mixed-method design included **15 professional interviews, survey data, and 473 observations from 43 developers** reporting wasted development time. citeturn14view1

They found that technical debt was associated with lack of progress and wasted time, which in turn negatively affected morale. Conversely, actively managing technical debt was associated with improved morale and productivity. citeturn14view1

A separate psycho-empirical experiment by Olsson and colleagues involved **40 participants from 12 companies**, yielding approximately **200 repeated observations**. The researchers found evidence that particular design smells can produce negative affect; interview data additionally described apprehension or anxiety around highly indebted areas of code. citeturn13search11

This is worth emphasizing because developers often describe a bad codebase using emotional language, such as “I hate touching that module,” “that area scares everyone,” or “don't open that file unless you have to.” The research suggests such reactions should not automatically be dismissed as complaining. Technical properties can influence the developer's emotional experience of the work. citeturn14view1turn13search11

The evidence does **not** justify saying that bad codebases directly cause clinical burnout. The available studies support effects on morale, displeasure, apprehension, perceived progress, and productivity; the causal chain all the way to burnout is much less well established. citeturn14view1turn13search11

## What the evidence really says about junior developers

This is the area where your article can become more credible by being slightly more conservative than the intuitive argument.

### Junior developers are clearly exposed to the phenomenon

The broken-windows experiment was not a senior-only sample. Of its 29 participants, **six had no or very little professional experience and eleven more had under five years**. High existing technical debt strongly affected the sample as a whole. citeturn15view0

For logic duplication, the modeled effect was:

- **113% more likely** in the high-debt system for someone with no professional experience.
- **102% more likely** for someone with ten years of professional experience. citeturn15view1

The professional-experience coefficient itself was close to zero for both code reuse and naming quality, suggesting that merely having more years of professional experience did not make developers immune to these behaviors. citeturn15view1

That result arguably makes your broader thesis stronger:

> Rotten environments do not only corrupt juniors. They influence developers in general.

### But the study did not prove juniors are more susceptible

The 113-versus-102 comparison looks tempting, but it should **not** be presented as evidence that juniors suffer an 11-percentage-point stronger broken-windows effect.

The authors deliberately did not model an interaction between professional experience and technical-debt condition because their sample was too small. They explicitly state that although more experienced developers introduced somewhat less debt overall, they did **not investigate whether experience changes susceptibility to the broken-windows effect**. citeturn15view1turn15view3

Their wording is unusually clear: answering whether experienced developers are less affected would require interaction effects that the sample could not reliably support. citeturn15view3

So this sentence would overstate the research:

> “Studies show junior developers copy bad code more readily than senior developers.”

A defensible replacement is:

> “Controlled evidence shows developers, including inexperienced ones, reproduce and extend the technical debt they encounter. Whether juniors are *more susceptible* to this effect than seniors has not yet been established.” citeturn15view0turn15view1turn15view3

### Early-career developers face an additional comprehension problem

A study by Esposito, Janes, Kilamo, and Lenarduzzi recruited **216 early-career developers with one to four years of professional experience** and had them inspect twelve Java classes of varying complexity. Complexity measures were negatively associated with perceived understandability, although the commonly used metrics were only modest predictors overall. citeturn17search3turn17search7

The authors' practical conclusion was that early-career developers should not simply be left alone with code-review responsibilities because limited experience affects their ability to evaluate unfamiliar code. citeturn17search7

That does not demonstrate imitation. It supports a different part of your argument:

**Junior developers have less experience with which to independently judge the patterns they encounter.**

Combining that result with the broken-windows experiment supports a plausible, but partly inferential, model:

```text
Junior/new developer enters project
            ↓
Limited project-specific context
            ↓
Existing code becomes an important source
of "how things are done here"
            ↓
Existing code contains poor practices
            ↓
Poor practices function as descriptive norms
            ↓
Developer has a measurable tendency
to perpetuate technical debt
```

The final step is experimentally supported. The proposition that junior developers depend *more* strongly on those descriptive norms than seniors remains a hypothesis requiring stronger comparative research. citeturn15view3turn17search7

### Newcomers and weak owners suffer disproportionately in low-quality code

The strongest industrial finding relevant to juniors may actually come from **code ownership**, not seniority.

Borg, Tornhill, and Mones mined **40 proprietary software repositories** and examined how file ownership and developer project experience related to issue-resolution time. They distinguished developers with high ownership of a file from “marginal” owners who had relatively little historical involvement with it. citeturn19search0

In low-quality source code:

- marginal owners needed **45% more time for small changes**;
- marginal owners needed **93% more time for large changes**. citeturn19search0

The researchers also observed that much of the modification of low-quality source code was performed by developers with low ownership and concluded that newly onboarded developers are particularly disadvantaged when entering technically indebted areas. citeturn19search0

This is highly relevant to your intended argument because **junior status and marginal ownership often overlap in practice, but they are not identical concepts**.

A senior engineer joining a new product can also be a marginal owner. A junior who has worked exclusively on one subsystem for two years may have substantial ownership of it.

So a more precise concept than “junior vulnerability” may be:

> **Low contextual capital.**

Developers are especially exposed when they have limited historical knowledge of why the code looks the way it does, limited ownership of the affected component, and limited authority or confidence to deviate from existing conventions.

That interpretation is an inference from the ownership, broken-windows, and early-career studies rather than a construct directly tested under that name. citeturn19search0turn15view3turn17search7

For your article, that may actually be the more interesting insight.

## Ownership, code review, and engineering culture

The research suggests that a codebase communicates two kinds of standards at once.

There are **explicit standards**: documentation, style guides, architecture rules, pull-request requirements, tests, linters, static analysis, and review policies.

Then there are **observed standards**: what developers actually find when they open the repository.

Spinellis and colleagues frame this distinction in terms of injunctive and descriptive norms. A company can explicitly say “we write maintainable code,” while a developer sees 400-line methods, duplicated logic, misleading names, disabled tests, and abandoned TODOs. The repository communicates a different norm from the handbook. citeturn16view0

That gives you a powerful article thesis:

> **The codebase is the company's most frequently consulted engineering policy document, whether management intends it to be or not.**

That exact sentence is an interpretation, but the underlying empirical argument is well supported: developers adapt behavior to existing code, and the researchers explicitly conceptualize existing code as a descriptive norm signalling what a project's community accepts. citeturn16view0turn15view3

### Weak ownership magnifies the cost of bad code

Code ownership also changes the economics of technical debt.

In high-quality code, someone with limited historical ownership can often infer intent from structure, naming, modularity, and tests. In low-quality code, much more of the system's meaning resides in knowledge possessed by people rather than in the code itself. The Borg et al. results show the observable consequence: marginal owners are significantly slower precisely when quality is poor. citeturn19search0

This produces another possible feedback loop:

```text
Low code quality
      ↓
Understanding requires tribal knowledge
      ↓
Marginal/new developers work more slowly
      ↓
They prefer smaller, localized changes
      ↓
Underlying structure is left untouched
      ↓
Knowledge remains concentrated
      ↓
Low ownership + low quality persist
```

The 45% and 93% productivity penalties support the central ownership-quality interaction. The complete loop above is a synthesis rather than a single experimentally demonstrated model. citeturn19search0

This also explains why “collective ownership” by itself is not necessarily enough.

Allowing everyone to modify everything does not automatically give everyone the **knowledge** required to modify everything well. The industrial study found substantial numbers of marginal owners despite collective-ownership ideals, and those marginal owners were especially hampered in low-quality files. citeturn19search0

### Code review can act as a competing source of norms

The most obvious countermeasure to descriptive norms in the existing code is another human communicating a stronger norm during review.

A large study of code-smell discussions in OpenStack and Qt examined **25,415 code-review comments** and identified **1,539 smell-related reviews**. Reviewers generally provided constructive refactoring recommendations; developers usually acted on those recommendations, and when detected smells were fixed, this commonly happened within less than a week. citeturn18academia41

This does not mean code review reliably finds all technical debt. In fact, the same study concluded that code smells were not commonly identified during review. But when reviewers *did* explicitly identify them, developer responses indicate that contextual human feedback can successfully override the poor examples already present in the repository. citeturn18academia41

This suggests a useful model for onboarding juniors:

```text
Existing code says:
"This is normal."
           ↓
Junior writes similar code
           ↓
Review either says:
"Correct, this is our standard."

          or

"This is legacy code.
Do not reproduce this pattern."
```

Without that second signal, the developer has little reason to know which parts of the repository represent current engineering intent and which parts are merely historical residue. The need for guidance is consistent with the early-career code-understandability research and the evidence that existing code itself influences subsequent implementation choices. citeturn17search7turn15view3

### The real issue is inconsistency between stated and demonstrated standards

A team can therefore have immaculate documentation and still teach poor engineering practices if examples in production code contradict it.

Conversely, maintaining clean high-churn areas can have benefits beyond the local code being easier to modify. The large-scale broken-windows study concludes that maintaining basic code hygiene may improve subsequent additions because today's code becomes tomorrow's behavioral context. citeturn16view0

The 2024 maintainability study reaches a similar practical recommendation through a different dataset: organizations should especially prevent new smells in **high-churn files**, because these are the files where quality problems repeatedly intersect future development work. citeturn20view1

This distinction is valuable for prioritizing technical-debt work. A terrible file nobody changes may be economically less urgent than a merely mediocre file touched twenty times per month. citeturn20view1

For juniors, the implication is stronger still: the frequently touched code they encounter becomes part of their informal training environment.

## Claims and numbers you can safely use in an article

The most useful results can be organized by how strongly the research supports the claim.

| Article-ready statement | Evidence strength | Source |
|---|---|---|
| **Developers introduced more technical debt when extending an already debt-heavy system.** | Strong, controlled experiment | Levén et al. citeturn15view2 |
| **Developers were estimated to be 102% more likely to duplicate logic in the high-debt experimental system.** | Strong within experimental context | Levén et al. citeturn15view1turn15view2 |
| **The corresponding duplication estimate for developers with no professional experience was 113%.** | Strong estimate, but does not establish a junior-vs-senior interaction | Levén et al. citeturn15view1 |
| **Developers were estimated to be 458% more likely to introduce a non-descriptive variable name in the high-debt condition.** | Strong within experimental context | Levén et al. citeturn15view1turn15view2 |
| **They introduced 117% more SonarQube issues in the high-debt experimental systems.** | Strong within experimental context | Levén et al. citeturn15view2 |
| **Some developers knowingly conformed to poor existing conventions to preserve consistency.** | Qualitative evidence explaining experiment | Levén et al. citeturn15view3 |
| **Bad code also encouraged debt unlike the debt already present, so simple copy-and-paste cannot explain the entire effect.** | Controlled + qualitative evidence | Levén et al. citeturn15view2turn15view3 |
| **A study of more than 2.2 million commits across 122 projects found that aspects of existing quality are related to subsequent developer behavior and code quality.** | Very large observational study | Spinellis et al. citeturn16view0 |
| **Developers reported spending about 23% of their working time dealing with technical debt.** | Longitudinal self-report + replication | Besker et al. citeturn14view0 |
| **In 39 proprietary systems, low-quality code was associated with 15× more defects.** | Large industrial observational data | Tornhill & Borg citeturn20view1 |
| **Issue resolution in that low-quality code took 124% longer on average.** | Large industrial observational data | Tornhill & Borg citeturn20view1 |
| **Marginal code owners needed 45% more time for small changes in low-quality code.** | Industrial observational study | Borg et al. citeturn19search0 |
| **For large changes, marginal owners needed 93% more time.** | Industrial observational study | Borg et al. citeturn19search0 |
| **At Google, increases in perceived code quality tended to precede increases in perceived developer productivity rather than the reverse.** | Industrial longitudinal/panel analysis | Cheng et al. citeturn20view2 |
| **Technical debt is associated with wasted effort, reduced progress, and lower developer morale.** | Mixed-method industrial research | Besker et al. citeturn14view1 |
| **Poor lexical quality can increase developers' cognitive load and impair comprehension.** | Controlled comprehension research | Fakhoury et al. citeturn18search3 |
| **216 developers with one to four years' experience showed that complexity relates negatively to perceived code understandability.** | Early-career empirical study | Esposito et al. citeturn17search3turn17search7 |

Several attractive statements should **not** be presented as established findings.

“Junior developers are more susceptible to broken windows than seniors” remains unproven. Levén et al. explicitly did not test the necessary experience-by-treatment interaction. citeturn15view3

“Technical debt causes burnout” is also too strong. Research supports poorer morale, negative affect, apprehension, wasted time, and reduced productivity, but does not establish the full causal pathway to clinical burnout. citeturn14view1turn13search11

“Any code smell makes developers slower” would likewise overgeneralize. Different smells and quality measures have different effects, and some controlled maintenance research has found size or other structural characteristics more important than individual smells for particular tasks. citeturn20view1

“Collective ownership prevents technical debt” is unsupported. Developers with marginal ownership remain common even in environments aiming for broad ownership, and low-quality code particularly penalizes those marginal owners. citeturn19search0

The evidence instead supports a more nuanced causal story:

> **The technical environment shapes behavior. Existing code supplies examples, constraints, and descriptive norms. Poor examples increase the probability of further technical debt; debt makes comprehension and change more expensive; low-quality code especially penalizes developers without deep ownership; and the resulting friction can lower productivity and morale.**

The links in that chain are supported by multiple independent empirical methods, although the complete feedback loop has not yet been tested longitudinally as one unified causal model. citeturn15view2turn16view0turn14view0turn19search0turn14view1

A strong framing for the article would therefore be:

> **“Your codebase is part of your work environment.”**

An organization that would never knowingly give employees broken laptops, unreliable development infrastructure, or unusable documentation may nevertheless ask them to spend most of their working day inside a codebase that continuously adds cognitive friction. The research indicates that this is not merely an aesthetic concern: code quality is associated with developer productivity, maintenance time, predictability, morale, and the quality of subsequent code. citeturn20view2turn14view0turn14view1turn20view1turn15view2

An even sharper framing, particularly around onboarding, is:

> **“Every legacy codebase is also a training dataset for the developers who join it.”**

That sentence is a synthesis rather than a finding from a single paper. But it follows naturally from evidence that developers modify their behavior according to existing code, that poor conventions are deliberately reproduced for consistency, that newcomers or marginal owners are disproportionately slowed by low-quality code, and that early-career developers require additional support when evaluating unfamiliar code. citeturn15view3turn19search0turn17search7

For consultancy companies, this may be particularly relevant whenever engineers rotate between client systems and therefore repeatedly become marginal owners. For product companies, the same mechanism can arise through team transfers, rapid hiring, or weak subsystem ownership. The studies reviewed here include proprietary industrial projects, Google, and open-source systems, but do **not** establish a robust consultancy-versus-product-company difference; that comparison should therefore remain an application of the evidence rather than a claimed research result. citeturn19search0turn20view2turn16view0

## Primary sources worth citing

**Levén, William; Broman, Hampus; Besker, Terese; Torkar, Richard. _The Broken Windows Theory Applies to Technical Debt._** This is the most important paper for your article because it directly manipulates existing technical debt and measures whether developers create additional debt. It supplies the 102% duplication, 458% naming, and 117% SonarQube figures, as well as the qualitative evidence about following surrounding code conventions. citeturn14view3turn15view2

**Spinellis, Diomidis; Louridas, Panos; Kechagia, Maria; Sharma, Tushar. _Broken Windows: Exploring the Applicability of a Controversial Theory on Code Quality._ ICSME, 2024.** A valuable complement to the experiment because it examines more than two million revisions across 122 long-lived real projects and finds qualified support for historical code quality influencing subsequent behavior. citeturn16view0

**Besker, Terese; Martini, Antonio; Bosch, Jan. _Software Developer Productivity Loss Due to Technical Debt: A Replication and Extension Study Examining Developers' Development Work._ Journal of Systems and Software, 2019. DOI 10.1016/j.jss.2019.06.004.** The best source for the widely cited **23% of developer time** estimate. citeturn14view0

**Besker, Terese; Ghanbari, Hadi; Martini, Antonio; Bosch, Jan. _The Influence of Technical Debt on Software Developer Morale._ Journal of Systems and Software, 2020. DOI 10.1016/j.jss.2020.110586.** Particularly useful when you want to establish that technical health affects the employee experience rather than just delivery metrics. citeturn14view1

**Olsson, Jesper; Risfelt, Erik; Besker, Terese; Martini, Antonio; Torkar, Richard. _Measuring Affective States from Technical Debt._ Empirical Software Engineering, 2021.** Adds experimental evidence concerning developers' emotional response to particular forms of technical debt. citeturn13search11

**Tornhill, Adam; Borg, Markus. _Code Red: The Business Impact of Code Quality — A Quantitative Study of 39 Proprietary Production Codebases._ International Conference on Technical Debt, 2022.** Source of the **15× defects** and **124% longer issue-resolution** results. These are excellent article numbers as long as they are attributed to the specific industrial dataset rather than generalized universally. citeturn20view0turn20view1

**Borg, Markus; Pruvost, Ilyana; Mones, Enys; Tornhill, Adam. _Increasing, not Diminishing: Investigating the Returns of Highly Maintainable Code._ International Conference on Technical Debt, 2024.** Extends the Code Red evidence to 79 proprietary projects and 46,211 source files and explicitly discusses the results through a broken-windows lens. citeturn20view1

**Borg, Markus; Tornhill, Adam; Mones, Enys. _U Owns the Code That Changes and How Marginal Owners Resolve Issues Slower in Low-Quality Source Code._ EASE, 2023. DOI 10.1145/3593434.3593480.** Probably the best evidence for the onboarding/ownership part of your argument. Its **45% and 93% slowdowns for marginal owners** are particularly useful when discussing new developers entering neglected systems. citeturn19search0turn20view1

**Cheng, Lan; Murphy-Hill, Emerson Rex; Canning, Mark; Jaspan, Ciera; Green, Collin; Dolan, Andrea; Zhang, Nan; Kammer, Elizabeth. _What Improves Developer Productivity at Google? Code Quality._ Foundations of Software Engineering, 2022.** Important independent evidence that perceived code quality precedes perceived individual developer productivity in longitudinal panel analysis. citeturn20view2

**Esposito, Matteo; Janes, Andrea; Kilamo, Terhi; Lenarduzzi, Valentina. _Early Career Developers' Perceptions of Code Understandability: A Study of Complexity Metrics._** A study of **216 developers with one to four years of professional experience**, useful for the junior-developer section without overstating what we know about broken-windows susceptibility. citeturn17search3turn17search7

**Fakhoury, Sarah; Ma, Yuzhan; Arnaoudova, Venera; Adesope, Olusola. _The Effect of Poor Source Code Lexicon and Readability on Developers' Cognitive Load._ ICPC, 2018. DOI 10.1145/3196321.3196347.** Useful for grounding the “bad code is an unhealthy cognitive environment” claim in experimental rather than anecdotal evidence. citeturn18search1turn18search3

**Han, Xiaofeng; Tahir, Amjed; Liang, Peng; Counsell, Steve; Blincoe, Kelly; Li, Bing; Luo, Yajing. _Code Smells Detection via Modern Code Review: A Study of the OpenStack and Qt Communities._** The study's analysis of **25,415 review comments** is useful evidence that review can function as a corrective quality signal, although reviews do not reliably catch every smell. citeturn18academia41

Taken together, these studies justify moving the conversation about technical debt away from “developers versus business” or “clean-code aesthetics.” The more empirically defensible interpretation is that **internal software quality is an environmental variable**. It affects what developers have to understand, how long changes take, how predictable those changes are, how developers feel about the work, and, critically, the standards they reproduce in the next generation of code. citeturn20view2turn14view0turn14view1turn15view2turn16view0