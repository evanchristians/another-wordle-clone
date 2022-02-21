<script setup lang="ts">
import "./index.css";

import { onMounted, Ref, ref, watchEffect } from "@vue/runtime-core";
import { Score, Word } from "./types/word.types";
import { MAX_GUESSES } from "./constants/numbers";
import * as K from "./utils/keyboard";
import * as W from "./utils/word";

console.log(W.getScore("index".split(""), "drier"));

const scores: Ref<Score[]> = ref([]);
const guesses: Ref<Word[]> = ref(new Array(MAX_GUESSES).fill(W.createGuess()));
const currentGuessIndex: Ref<number> = ref(0);
const currentGuess: Ref<Word> = ref(guesses.value[currentGuessIndex.value]);

// TODO: Make eloquent
onMounted(() => {
  window.addEventListener("keydown", (evt) => {
    if (K.isEnter(evt)) {
      if (W.canSubmit(currentGuess.value)) {
        currentGuess
        return currentGuessIndex.value++;
      }
    }
    currentGuess.value = K.input(evt, currentGuess.value);
  });
});

watchEffect(() => {
  guesses.value[currentGuessIndex.value] = currentGuess.value;
});
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center w-full py-10 px-4 bg-slate-900 gap-4"
  >
    <div
      class="flex gap-2 max-w-board text-slate-300"
      v-for="(guess, key) in guesses"
      :key="key"
    >
      <div
        v-for="(c, i) in guess"
        :key="i"
        class="grid place-items-center text-6xl border-4 border-slate-700 w-80 max-w-full aspect-square uppercase"
      >
        {{ c }}
      </div>
    </div>
  </main>
</template>
