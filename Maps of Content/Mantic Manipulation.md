---
id: Mantic Manipulation
aliases: []
tags: []
type: moc
---

Every creature throughout the planets of [[Sai Yoxis System|Sai Yoxis]] are imbued with [[Neomancy]], some more than others. This manifests itself in various ways, from simply making a creature more hardy, to giving them fantastical power.
Some have learned how to manipulate Neomancy and bend it to their will with greater control than others. There are two main methods to do this: by [[#Runic Circles|inscribing Runes]] or [[#Neomantic Spells|casting Spells]].

# Runic Circles

Long ago, [[Scribe|Scribes]] discovered a way to influence Neomancy. By inscribing very precise patterns onto a surface and directing Mantic energy into it, various magical effects can be produced depending on the design of the runes and components used.

> [!note]- Runic Circles
>
> ```dataview
> TABLE WITHOUT ID "*Tier " + tier + " Runes*" as "***Tier***", link(rows.file.path, rows.name) AS "**Name**", rows.description AS "**Description**"
> FROM [[]]
> WHERE type = "rune"
> GROUP BY tier
> ```

## Inscription

You must know a rune in order to inscribe it. In order to inscribe a rune you must expend any components the rune requires. Runes can be inscribed on any surface on which the design can be carved.

Tier 1 runes take 1 action to 1 minute to inscribe
Tier 2 runes take 10 minutes or less to inscribe
Tier 3 runes take greater than 10 minutes to inscribe

## Activation

Simply inscribing a rune does not produce its effect. You must then funnel Mantic energy into the rune to activate it. You can have a number of active runes equal to half your Scribe level rounded down, minimum of one.

### Third Party Activation

Additionally, runes can be activated by other sources of Neomancy. For example, a [[Mage]] can expend a spell slot to activate a rune, or a [[Fighter]] can hit it with a [[Fighter#Mantic Charges|Mantic Charge]]

# Neomantic Spells

[[Mage|Mages]] are those of Sai Yoxis that innately have the most control over Neomancy. They are able to cast spells by using their own body as a conduit.

> [!important]- Neomantic Spells
>
> ```dataview
> TABLE WITHOUT ID choice(tier = 0, "*Cantrips*", "*Tier " + tier + " Spells*") as "***Tier***", link(rows.file.path, rows.name) AS "**Name**", rows.description AS "**Description**"
> FROM [[]]
> WHERE type = "spell"
> GROUP BY tier
> ```

## Cantrips

In order to cast a cantrip you must expend any components the cantrip requires. When leveling up you may exchange one cantrip for any other.

## Spells

You must know a spell in order to cast it. In order to cast a spell you must expend a spell slot and any components the spell requires. When leveling up you may exchange one spell for any other of the same tier.

Some spells require focus to maintain. This means that if you do not spend your bonus action on your turn focusing on the spell, the spell comes to an end.

