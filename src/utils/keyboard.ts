import {Ref} from "@vue/runtime-core";
import {BACKSPACE} from "../constants/strings";
import {Word} from "../types/word.types";
import * as W from "./word";

export const isAlphabetic = ({key, code}: KeyboardEvent): boolean =>
  code.includes("Key") && !!key.match(/^[A-Za-z]+$/);

export const isBackspace = (input: KeyboardEvent): Boolean =>
  input.code === BACKSPACE;

export const getKey = (input: KeyboardEvent): string =>
  isAlphabetic(input) ? input.key : "";

export const input = (input: KeyboardEvent, currentGuess: Ref<Word>) =>
  isAlphabetic(input)
    ? getKey(input) && W.insert(getKey(input), currentGuess.value)
    : isBackspace(input) && W.backspace(currentGuess.value);
