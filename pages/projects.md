---
layout: page-fullwidth
title: "Projects"
permalink: "/projects/"
---

<div class="row t30">
{% assign projects = site.categories.projects %}
{% if projects %}
  {% for post in projects %}
  <div class="medium-6 columns b30">
    <div class="panel radius">
      <h3><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
      {% if post.subheadline %}<p class="subheadline">{{ post.subheadline }}</p>{% endif %}
      <p>{{ post.teaser }}</p>
      <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}" class="button small radius">Read More &rsaquo;</a>
    </div>
  </div>
  {% endfor %}
{% else %}
  <div class="small-12 columns">
    <p>Projects coming soon. Check back later!</p>
  </div>
{% endif %}
</div>
