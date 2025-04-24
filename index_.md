---
layout: default
title: Home
---

{% for post in site.posts %}
  <div class="post-preview">
    <h2 class="post-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-description">{{ post.description }}</p>
    {% if post.image %}
      <img class="post-image" src="{{ post.image | relative_url }}" alt="{{ post.title }}">
    {% endif %}
  </div>
{% endfor %}

