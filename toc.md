---
layout: home
---
<script setup>
import toc from './toc.json'
</script>

# Inhaltsverzeichnis

<ul>
  <li v-for="route in toc" :key="route.path">
    <a :href="`/${route.path.replace(/\.md$/, '')}`">{{ route.title }}</a>
  </li>
</ul>
