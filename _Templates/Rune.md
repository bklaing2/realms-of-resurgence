---
type: rune
name: <%* const props = tp.user.property(tp) %><% await props.name(true) %>
aliases:
description:
tags:
tier: <% await props.tier(false) %>
inscription time: <% await props.casting_time() %>
target: <% await props.target() %>
range: <% await props.range() %>
duration: <% await props.duration() %>
components:
---