<template>
  <footer class="foot">
    <div class="wrap">
      <div class="big" aria-hidden="true">VISTAAR.AI</div>
      <div class="row">
        <div class="brand">
          <b>Vistaar<i>.ai</i></b>
          <span>Founded &amp; built by {{ profile.name }}</span>
        </div>
        <nav class="mini" aria-label="Footer">
          <a href="#product">Product</a><a href="#how">How it works</a><a href="#founder">Founder</a><a href="#builder">Builder</a><a href="#access">Early access</a>
        </nav>
        <div class="socials">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" :aria-label="s.name"><AppIcon :name="s.icon" :size="18" /></a>
        </div>
      </div>
      <div class="bottom">
        <span>© {{ year }} Vistaar.ai · {{ profile.name }}. Designed &amp; built by the founder.</span>
        <a href="#home" class="top">Back to top <AppIcon name="up" :size="16" /></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppIcon from "./AppIcon.vue";
import { profile, socials } from "../data";

const year = new Date().getFullYear();
</script>

<style scoped>
.foot { position: relative; padding: 40px 0 34px; border-top: 1px solid var(--line); overflow: hidden; }
.big {
  font: 700 clamp(48px, 13vw, 190px)/0.9 var(--display); letter-spacing: -0.05em; text-align: center; white-space: nowrap;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0)); -webkit-background-clip: text; background-clip: text; color: transparent;
  user-select: none; margin-bottom: 30px;
}
.row { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.brand b { display: block; font: 700 20px/1.2 var(--display); }
.brand span { font-size: 14px; color: var(--muted); }
.brand i { font-style: normal; color: var(--cyan); }
.mini { display: flex; flex-wrap: wrap; gap: 6px 22px; }
.mini a { font-size: 14px; color: var(--muted); transition: color 0.25s; }
.mini a:hover { color: var(--text); }
.socials { display: flex; gap: 8px; }
.socials a { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; border: 1px solid var(--line); color: var(--muted); transition: all 0.3s var(--ease); }
.socials a:hover { color: #fff; border-color: rgba(124, 92, 255, 0.6); transform: translateY(-3px); }
.bottom { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); font-size: 13.5px; color: var(--dim); }
.top { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); }
.top:hover { color: var(--text); }
</style>
