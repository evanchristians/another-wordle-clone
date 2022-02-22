<script setup lang="ts">
import "./index.css";

import { onMounted, Ref, ref, watchEffect } from "@vue/runtime-core";
import { Score, Word } from "./types/word.types";
import answers from "./constants/answers.json";
import { MAX_GUESSES } from "./constants/numbers";
import * as K from "./utils/keyboard";
import * as W from "./utils/word";

const answer = W.getRandomWord(answers);

const complete: Ref<boolean> = ref(false);

const scores: Ref<Score[]> = ref([]);
const guesses: Ref<Word[]> = ref(new Array(MAX_GUESSES).fill(W.createGuess()));
const currentGuessIndex: Ref<number> = ref(0);
const currentGuess: Ref<Word> = ref(guesses.value[currentGuessIndex.value]);

// TODO: Make eloquent
onMounted(() => {
  window.addEventListener("keydown", (evt) => {
    if (complete.value) return;

    if (K.isEnter(evt)) {
      if (W.canSubmit(currentGuess.value)) {
        scores.value = [...scores.value, W.getScore(currentGuess.value, answer)];
        currentGuess.value = W.createGuess();
        return currentGuessIndex.value++;
      }
    }
    currentGuess.value = K.input(evt, currentGuess.value);
  });
});

watchEffect(() => {
  complete.value = !!scores.value.find(
    (score) => score.reduce((acc, curr) => acc + curr) == 10
  );
});

watchEffect(() => {
  guesses.value[currentGuessIndex.value] = currentGuess.value;
});
</script>

<template>
  <main>
    <div
      class="flex gap-1 max-w-board text-slate-300"
      v-for="(guess, row) in guesses"
      :key="row"
    >
      <div
        v-for="(char, col) in guess"
        :key="col"
        :class="`char ${
          row == currentGuessIndex && currentGuess[col]
            ? 'border-slate-500'
            : 'border-slate-700'
        }  ${scores[row] && W.getScoreColor(scores[row], col)}`"
      >
        {{ char }}
      </div>
    </div>
  </main>
</template>
