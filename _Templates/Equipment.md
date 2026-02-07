---
name: <%* const equipment = await tp.user.property(tp).equipment() %><% equipment.name %>
aliases:
description:
parent: "[[Resources/Equipment|Equipment]]"
type: item
item type: equipment
equipment type: <% equipment.type %>
equippable slots:
tags:
price: <% equipment.price %>
weight: <% equipment.weight %>
size: <% equipment.size %>
consumable: false
tier:
---
# Description #todo