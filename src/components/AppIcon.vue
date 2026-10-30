<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'github'"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></template>
    <template v-else-if="name === 'instagram'"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></template>
    <template v-else-if="name === 'linkedin'"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" /></template>
    <template v-else-if="name === 'whatsapp'"><path d="M3 21l1.65-3.8A9 9 0 1 1 7.6 20L3 21" /><path d="M9.2 8.6c.2 2.9 2.4 5.2 5.3 5.6l.9-1.1 1.8.9-.5 1.6c-3.7.3-8-3.9-7.7-7.6L10.6 7.4l.8 1.8z" /></template>
    <template v-else-if="name === 'arrow'"><path d="M5 12h14M13 6l6 6-6 6" /></template>
    <template v-else-if="name === 'external'"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></template>
    <template v-else-if="name === 'code'"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></template>
    <template v-else-if="name === 'devices'"><rect x="2" y="4" width="14" height="10" rx="1.5" /><path d="M5 18h8" /><rect x="17" y="8" width="5" height="11" rx="1.2" /></template>
    <template v-else-if="name === 'server'"><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></template>
    <template v-else-if="name === 'rocket'"><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z" /><path d="M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z" /><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" /></template>
    <template v-else-if="name === 'spark'"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></template>
    <template v-else-if="name === 'wallet'"><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M21 12h-5a2 2 0 0 0 0 4h5v-4z" /></template>
    <template v-else-if="name === 'puzzle'"><path d="M10 3h4v3a2 2 0 1 0 4 0V3h3v7h-3a2 2 0 1 0 0 4h3v7h-7v-3a2 2 0 1 0-4 0v3H3v-7h3a2 2 0 1 0 0-4H3V3h7z" /></template>
    <template v-else-if="name === 'clock'"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></template>
    <template v-else-if="name === 'bolt'"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></template>
    <template v-else-if="name === 'chat'"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></template>
    <template v-else-if="name === 'globe'"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></template>
    <template v-else-if="name === 'check'"><path d="M5 12.5l4.5 4.5L19 7.5" /></template>
    <template v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></template>
    <template v-else-if="name === 'quote'"><path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" /></template>
    <template v-else-if="name === 'menu'"><path d="M4 7h16M4 12h16M4 17h16" /></template>
    <template v-else-if="name === 'close'"><path d="M6 6l12 12M18 6L6 18" /></template>
    <template v-else-if="name === 'send'"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></template>
    <template v-else-if="name === 'up'"><path d="M12 19V5M6 11l6-6 6 6" /></template>
    <!-- skills: simple letter badges drawn in the brand colour by the parent -->
    <template v-else><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" stroke="none" font-family="JetBrains Mono, monospace">{{ label }}</text></template>
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
});

const LABELS = { html: "</>", css: "{ }", js: "JS", node: "N", express: "ex", mongo: "db", python: "py", git: "git" };
const label = computed(() => LABELS[props.name] || props.name.slice(0, 2).toUpperCase());
</script>
