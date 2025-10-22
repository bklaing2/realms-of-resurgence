--
name: <%* const armor = await tp.user.property(tp).armor() %><% armor.name %>
aliases:
description:
parent: "[[Maps of Content/Armor|Armor]]"
type: item
item type: equipment
equipment type: armor
equippable slots:
  - armor
armor type: <% armor.type %>
armor class: <% armor.class %>
damage mitigation: <% armor.mitigation %>
damage threshold: <% armor.damage_threshold %>
damage slots: <% armor.damage_slots %>
tags:
price: <% armor.price %>
weight: <% armor.weight %>
size: <% armor.size %>
consumable: false
tier:
---
# Description #todo