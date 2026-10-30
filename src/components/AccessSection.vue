<template>
  <section id="access" class="section">
    <div class="wrap">
      <div class="panel" v-reveal>
        <div class="aurora" aria-hidden="true"><span></span><span></span></div>

        <div class="copy">
          <span class="eyebrow">Early access</span>
          <h2 class="h2">Be one of the first businesses on <span class="grad-text">{{ brand.name }}.</span></h2>
          <p class="lead">Join the early access list, partner with us, or start a website project with Shivam today. Every message reaches the founder directly.</p>
          <ul class="perks">
            <li v-for="p in perks" :key="p"><span><AppIcon name="check" :size="13" /></span>{{ p }}</li>
          </ul>
        </div>

        <form class="form" @submit.prevent="send">
          <label class="field">
            <span>I'm interested in</span>
            <div class="pills">
              <button v-for="t in types" :key="t" type="button" class="pill" :class="{ 'is-on': form.type === t }" @click="form.type = t">{{ t }}</button>
            </div>
          </label>
          <div class="row">
            <label class="field">
              <span>Your name</span>
              <input v-model.trim="form.name" required autocomplete="name" placeholder="Your name" />
            </label>
            <label class="field">
              <span>Business</span>
              <input v-model.trim="form.business" placeholder="e.g. Sharma Bakery, Delhi" />
            </label>
          </div>
          <label class="field">
            <span>Message</span>
            <textarea v-model.trim="form.message" rows="3" placeholder="Tell us what you need…"></textarea>
          </label>
          <button type="submit" class="btn btn-primary send">Send to the founder <AppIcon name="send" :size="17" /></button>
          <small class="note"><AppIcon name="whatsapp" :size="14" /> Opens WhatsApp with your message, ready to send.</small>
        </form>
      </div>

      <!-- FAQ -->
      <div class="faq">
        <div class="faq-h">
          <span class="eyebrow" v-reveal>FAQ</span>
          <h2 class="h2" v-reveal="80">Questions, <span class="grad-text">answered.</span></h2>
        </div>
        <div class="faq-list">
          <div v-for="(f, i) in faqs" :key="f.q" class="qa" :class="{ open: openIdx === i }" v-reveal="i * 80">
            <button type="button" class="q" :aria-expanded="openIdx === i ? 'true' : 'false'" @click="openIdx = openIdx === i ? -1 : i">
              {{ f.q }}<span class="plus"><AppIcon name="plus" :size="18" /></span>
            </button>
            <div class="a"><div><p>{{ f.a }}</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import AppIcon from "./AppIcon.vue";
import { profile, brand, faqs } from "../data";

const perks = ["First look at the product", "Direct line to the founder", "Shape the roadmap with your feedback"];
const types = ["Early access", "A website project", "Partnership"];
const form = reactive({ type: "Early access", name: "", business: "", message: "" });
const openIdx = ref(0);

// No backend: build a WhatsApp message for the founder and open it.
function send() {
  const lines = [`Hi Shivam, I'm ${form.name}.`, `Interested in: ${form.type}`];
  if (form.business) lines.push(`Business: ${form.business}`);
  if (form.message) lines.push("", form.message);
  window.open("https://wa.me/" + profile.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
}
</script>

<style scoped>
.panel {
  position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;
  padding: 56px; border-radius: 32px; border: 1px solid rgba(124, 92, 255, 0.3); background: var(--bg-2);
  box-shadow: 0 0 120px -40px rgba(124, 92, 255, 0.6);
}
.aurora { position: absolute; inset: 0; pointer-events: none; }
.aurora span { position: absolute; width: 520px; height: 520px; border-radius: 50%; filter: blur(110px); opacity: 0.35; animation: drift 14s ease-in-out infinite; }
.aurora span:first-child { background: #7c5cff; top: -260px; left: -160px; }
.aurora span:last-child { background: #22d3ee; bottom: -280px; right: -160px; animation-delay: -7s; opacity: 0.25; }
@keyframes drift { 50% { transform: translate(60px, 40px) scale(1.1); } }
.copy, .form { position: relative; }

.perks { list-style: none; margin: 28px 0 0; padding: 0; display: grid; gap: 12px; }
.perks li { display: flex; align-items: center; gap: 12px; font-weight: 500; color: #dcdcef; }
.perks li span { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: rgba(34, 197, 94, 0.15); color: #4ade80; flex: none; }

.form { padding: 30px; border-radius: 22px; background: rgba(7, 7, 12, 0.7); border: 1px solid var(--line); backdrop-filter: blur(12px); }
.field { display: block; margin-top: 18px; }
.field:first-child { margin-top: 0; }
.field > span { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500; color: #c9c9dc; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
.row .field { margin-top: 0; }
input, textarea {
  width: 100%; padding: 13px 15px; border-radius: 12px; border: 1px solid var(--line-hi); background: rgba(255, 255, 255, 0.03);
  color: var(--text); font: 400 15px/1.5 var(--font); outline: none; resize: vertical; transition: border-color 0.25s, box-shadow 0.25s;
}
input::placeholder, textarea::placeholder { color: var(--dim); }
input:focus, textarea:focus { border-color: rgba(124, 92, 255, 0.7); box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.15); }
.pills { display: flex; flex-wrap: wrap; gap: 8px; }
.pill { padding: 9px 15px; border-radius: 999px; border: 1px solid var(--line-hi); background: transparent; color: var(--muted); font: 500 13.5px/1 var(--font); cursor: pointer; transition: all 0.25s; }
.pill:hover { color: var(--text); }
.pill.is-on { color: #fff; border-color: transparent; background: var(--grad); }
.send { width: 100%; justify-content: center; margin-top: 22px; }
.note { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 12px; font-size: 12.5px; color: var(--dim); }
.note svg { color: #4ade80; }

.faq { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 50px; margin-top: 120px; }
.faq-list { border-top: 1px solid var(--line); }
.qa { border-bottom: 1px solid var(--line); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 24px 0; border: 0; background: none; color: var(--text); text-align: left; font: 600 18px/1.35 var(--display); cursor: pointer; }
.plus { flex: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; border: 1px solid var(--line-hi); color: var(--muted); transition: transform 0.4s var(--ease), background 0.3s, color 0.3s; }
.qa.open .plus { transform: rotate(45deg); background: var(--grad); color: #fff; border-color: transparent; }
.a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s var(--ease); }
.a > div { overflow: hidden; }
.qa.open .a { grid-template-rows: 1fr; }
.a p { margin: 0 0 24px; max-width: 620px; color: var(--muted); font-size: 15.5px; }

@media (max-width: 980px) {
  .panel { grid-template-columns: 1fr; padding: 36px 22px; }
  .faq { grid-template-columns: 1fr; gap: 20px; margin-top: 90px; }
}
@media (max-width: 520px) {
  .row { grid-template-columns: 1fr; }
  .form { padding: 22px 16px; }
}
</style>
