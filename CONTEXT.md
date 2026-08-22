# Personal Engineering Blog Context

The editorial and domain context for Pietro Cascio's engineering blog and publications on software architecture, technical debt, and team dynamics.

## Language

**Broken window effect in code**:
The empirical phenomenon where pre-existing technical debt, code smells, or neglected defects in a codebase signal that quality standards do not apply, causally driving developers to introduce more defects, poor naming, and duplicate logic.
_Avoid_: bad coding habit, sloppy programming.

**Descriptive norm**:
The implicit standard of code quality communicated directly by what existing code in the repository actually looks like, which developers predominantly conform to.
_Avoid_: informal style, unspoken rule.

**Injunctive norm**:
The formal, written coding standards, style guides, or wiki policies dictating how developers ought to write software.
_Avoid_: theoretical best practice, company policy.

**Unsupervised mentorship (codebase as mentor)**:
The process whereby junior or newcomer developers acquire domain mental models and implementation idioms by reading and mimicking surrounding code in the absence of active guidance.
_Avoid_: cargo-culting, copy-paste programming.

**Diffuse non-ownership**:
A dysfunctional team state where code is nominally owned by everyone, but in practice no designated owner protects its architectural boundaries or reviews incoming changes.
_Avoid_: collective ownership without tests, unowned code.
