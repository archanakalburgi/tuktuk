---
layout: page
title: projects
permalink: /projects/
description: Things I've built — code I'm willing to point at.
---

A handful of things I've built or am still tinkering with. The featured three also show
up on the homepage; the rest live here.

<div class="project-grid">
{%- for proj in site.data.projects -%}
  <a class="project-card" href="{{ proj.url }}"{% unless proj.url contains site.url %} target="_blank" rel="noopener"{% endunless %}>
    <div class="project-card__name">{{ proj.name }}</div>
    <p class="project-card__blurb">{{ proj.blurb }}</p>
    <div class="tags">
      {%- for t in proj.tags -%}<span class="tag">{{ t }}</span>{%- endfor -%}
    </div>
    <span class="project-card__cta">view →</span>
  </a>
{%- endfor -%}
</div>
