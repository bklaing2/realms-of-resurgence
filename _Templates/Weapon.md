---
name: <%* const weapon = await tp.user.property(tp).weapon() %><% weapon.name %>
aliases:
description:
parent: "[[Maps of Content/Weapons|Weapons]]"
type: item
item type: equipment
equipment type: weapon
equippable slots:
  - primary hand
weapon type: <% weapon.type %>
hit ability:
damage ability:
range: <% weapon.range %>
attack: <% weapon.attack %>
damage: <% weapon.damage %>
tags:
price: <% weapon.price %>
weight: <% weapon.weight %>
size: <% weapon.size %>
consumable: false
tier:
---
# Description #todo