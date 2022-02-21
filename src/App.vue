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
    console.log(K.isAlphabetic(evt));
    console.log(evt);
  });
});
</script>

<template>
  <div class="grid grid-cols-5">
    <div v-for="i in 5" :key="i" class="border border-black w-4 h-4"></div>
  </div>
</template>
