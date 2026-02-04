---
type: "[[Class|class]]"
subclass of: <%* const baseClass = (await tp.system.suggester(item => item.basename, tp.user.util(tp).getFilesByProperties(p => p.type === "[[Class|class]]" && !p["subclass of"]))).basename %><% `"[[${baseClass}]]"` %>
subclass number: <%* const subclassNumber = await tp.system.suggester(item => item, ["I", "II", "III", "IV"]) %><% `"[[Sai Yoxis ${subclassNumber}|${subclassNumber}]]"` %>
description:
passive abilities:
abilities:
  - "[[<% baseClass %> <% subclassNumber %> - Ability 1]]"
  - "[[<% baseClass %> <% subclassNumber %> - Ability 2]]"
tags:
  - needs/name
---
![[Self Referential.base#Subclass]]