<template>
  <!-- The founder's portrait: profile.photo when set, else a designed silhouette. -->
  <div class="fa" :style="{ width: size + 'px', height: size + 'px' }">
    <img v-if="profile.photo" :src="profile.photo" :alt="profile.name" />
    <svg v-else viewBox="0 0 120 120" role="img" :aria-label="profile.name">
      <defs>
        <radialGradient :id="id + 'bg'" cx="35%" cy="25%" r="85%">
          <stop offset="0" stop-color="#2f2766" />
          <stop offset="0.6" stop-color="#16152b" />
          <stop offset="1" stop-color="#0c0c18" />
        </radialGradient>
        <linearGradient :id="id + 'fig'" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#a78bfa" />
          <stop offset="0.55" stop-color="#7c5cff" />
          <stop offset="1" stop-color="#22d3ee" />
        </linearGradient>
        <clipPath :id="id + 'clip'"><circle cx="60" cy="60" r="60" /></clipPath>
      </defs>
      <g :clip-path="`url(#${id}clip)`">
        <rect width="120" height="120" :fill="`url(#${id}bg)`" />
        <!-- shoulders and neck as one shape, then the head -->
        <path d="M8 124c0-27 21-44 44-46v-8h16v8c23 2 44 19 44 46z" :fill="`url(#${id}fig)`" />
        <circle cx="60" cy="47" r="24" :fill="`url(#${id}fig)`" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { profile } from "../data";

defineProps({ size: { type: Number, default: 128 } });
// unique ids so several avatars on one page don't share gradients
const id = "fa" + Math.random().toString(36).slice(2, 8);
</script>

<style scoped>
.fa { position: relative; border-radius: 50%; overflow: hidden; flex: none; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); }
.fa svg, .fa img { display: block; width: 100%; height: 100%; object-fit: cover; }
</style>
