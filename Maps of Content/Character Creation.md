---
id: Character Creation
aliases: []
tags: []
name: Character Creation
parent: "[[Handbook]]"
type: moc
---

# Choose a Race

```dataview
TABLE
FROM [[]]
WHERE type = "race"
SORT file.name
```

# Choose a Class

```dataviewjs
const CLASSES = ["Brawler", "Fighter", "Hunter", "Engineer", "Druid", "Scribe", "Mage"]

// Helpers
const REGEX = new RegExp(`(${CLASSES.join("|")})`)
function getClassIndex(c) {
  if (!c.id) return CLASSES.length
  const match = c.id.match(REGEX)
  return match ? CLASSES.indexOf(match[1]) : CLASSES.length
}

const linked = "[[]]"
const isClass = p => p.type === "class"
const byClass = (a, b) => getClassIndex(a) - getClassIndex(b)
const toRow = c => [c.file.link, `*${c.description}*`]


const classes = dv
  .pages(linked)
  .where(isClass)
  .sort(byClass)
  .map(toRow)

dv.table(null, classes)
```

![[Sai Yoxis.base#Classes]]
# Choose a Subclass

Every class has a variation found on each planet in the [[Sai Yoxis System]].

```dataviewjs
const CLASSES = ["Brawler", "Fighter", "Hunter", "Engineer", "Druid", "Scribe", "Mage"]
const PREFIXES = ["Neo", "Duo", "Ether", "Furo"]

function getIndex(s, arr, regex) {
  if (!s) return arr.length
  const match = s.match(regex)
  return match ? arr.indexOf(match[1]) : arr.length
}

// Class helpers
const getClassIndex = c => getIndex(c.id, CLASSES, new RegExp(`(${CLASSES.join("|")})`))
const linked = "[[]]"
const isClass = p => p.type === "class"
const byClass = (a, b) => getClassIndex(a) - getClassIndex(b)

// Subclass helpers
const getPrefixIndex = sc => getIndex(sc.id, PREFIXES, new RegExp(`^(${PREFIXES.join("|")})`))
const bySubclass = (a, b) => getPrefixIndex(a) - getPrefixIndex(b)
const toNameLink = sc => dv.fileLink(sc.file.path, false, sc.name)


const rows = []
const classes = dv.pages(linked).where(isClass).sort(byClass)

for (let c of classes) {
  const linkedToClass = c.file.link.text
  const isSubclass = p => p.type === "subclass" && p.parent.path === c.file.path

  const subclasses = dv.pages(linkedToClass).where(isSubclass).sort(bySubclass).map(toNameLink)
  rows.push([`*${c.name}*`, ...subclasses])
}

const HEADER = ["***Class***", "**Sai Yoxis I**", "**Sai Yoxis II**", "**Sai Yoxis III**", "**Sai Yoxis IV**"]
dv.table(HEADER, rows)
```


# Attributes

Characters in this system have 5 attributes - 2 physical, 2 mental, and 1 mantic.

| *Attribute*                              | *Examples*                                  |
| :--------------------------------------- | ------------------------------------------- |
| **Fortitude**                            | *Strength,*                                 |
| **Finesse**                              | *Sneaking, lockpicking*                     |
| **Intelligence** (*"Book Smarts")*       | *History, perception*                       |
| **E.Q.** *("Street Smarts")* #needs/name | *Charisma, wisdom*                          |
| **Mantic**                               | *Spellcasting, resisting mantic influences* |

## Roll for Base Attribute Value

Take 2d4, assign one to be positive and the to be negative. Roll and add these 6 times, then drop the lowest. Assign the remaining values to attributes of your choice.

## Add Bonuses from your Race/Background

Some races/backgrounds give bonus to Physical or Mental attributes. These can be distributed between the attributes in the specified category, up to a maximum of 3 for any attribute.

# General Level Unlocks

Every adventurer starts at level 0 - essentially a normal person. The first class ability isn't unlocked until level 1. As the adventure progresses, each character follows the same general outline when levelling up as described in the table below.

> [!info]- Level Unlock Table
>
> | Level | Abilities                                              |
> | ----- | ------------------------------------------------------ |
> | 0     |                                                        |
> | 1     | First class ability                                    |
> | 2     | Choose between race's roleplay and exploration ability |
> | 3     | First subclass ability                                 |
> | 4     | Race roleplay/exploration ability they didn't choose   |
> | 5     | Upgrade passive ability                                |
> | 6     | Second class ability                                   |
> | 7     |                                                        |
> | 8     |                                                        |
> | 9     | Second subclass ability                                |
> | 10    |                                                        |
