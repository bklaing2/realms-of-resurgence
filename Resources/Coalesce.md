---
type: "[[Neomantic Spells|spell]]"
name:
description: Gather Mantic energy into a growing explosive charge
attributes:
  - "[[Finesse]]"
  - "[[Intelligence]]"
  - "[[Mantic]]"
mantic charge minimum: 3
quick action: true
reaction: false
requires focus: true
components:
casting time: quick action
target:
  - surface
  - self
range: 30ft
duration: focus up to 5 rounds
area of effect: 15ft radius
damage:
tags:
  - needs/components
  - needs/antimantic-inverse
  - needs/radiation-fail-outcome
---
# Description

As a quick action, begin gathering [[Mantic]] energy around a single point near yourself.
Each round you maintain focus on this spell increases its damage by 1d6, up to a maximum of 5 rounds.

While charging the spell, you may use an action on your turn to either:
- Hurl the [[Mantic]] energy to a point within 30 feet
- Detonate it immediately, centered on yourself.

When released, the energy explodes, dealing [[Mantic Damage]] + (1d6 × the number of rounds charged) damage.

If the spell reaches 5 rounds of charge, it automatically detonates at the end of the fifth round, centered on you.


# Antimantic Inverse #todo

As a bonus action, begin gathering [[Mantic]] energy around a single point near yourself. Use an action to either throw it within a range of 30ft or explode it centered on yourself. Each turn you spend your bonus action focusing on gathering Neomancy increases the healing done by the spell by 1D6 up to a max of 5D6. The spell must be used on the turn it reaches max charge.

# Radiation Fail Outcome #todo
