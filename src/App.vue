<script setup lang="ts">
import "./index.css";

import { onMounted, Ref, ref } from "@vue/runtime-core";
import { Word } from "./types/word.types";
import * as K from "./utils/keyboard";
import * as W from "./utils/word";

console.log(W.getScore("index", "drier"));

const currentGuess: Ref<Word> = ref(W.createGuess());

onMounted(() => {
  window.addEventListener("keydown", (evt) => {
    currentGuess.value = K.input(evt, currentGuess.value);
  });
});
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center w-full px-4 bg-slate-900"
  >
    <div class="flex gap-2 max-w-board text-slate-300">
      <div
        v-for="(c, i) in currentGuess"
        :key="i"
        class="grid place-items-center text-6xl border-4 border-slate-700 w-80 max-w-full aspect-square uppercase"
      >
        {{ c }}
      </div>
    </div>
  </main>
</template>
