---
parent: "[[Mantic Manipulation]]"
type: moc
name: Neomantic Spells
aliases:
tags:
---
[[Mage|Mages]] are those of Sai Yoxis that innately have the most control over Neomancy. They are able to cast spells by using their own body as a conduit.

> [!important]- Neomantic Spells
>
> ```dataview
> TABLE WITHOUT ID choice(tier = 0, "*Cantrips*", "*Tier " + tier + " Spells*") as "***Tier***", link(rows.file.path, rows.name) AS "**Name**", rows.description AS "**Description**"
> FROM [[]]
> WHERE type = "spell"
> GROUP BY tier
> ```

# Cantrips

In order to cast a cantrip you must expend any components the cantrip requires. When leveling up you may exchange one cantrip for any other.

# Spells

You must know a spell in order to cast it. In order to cast a spell you must expend a spell slot and any components the spell requires. When leveling up you may exchange one spell for any other of the same tier.

Some spells require focus to maintain. This means that if you do not spend your bonus action on your turn focusing on the spell, the spell comes to an end.
