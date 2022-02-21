import {ENTER} from "./../constants/strings";
import {BACKSPACE} from "../constants/strings";
import {Word} from "../types/word.types";
import * as W from "./word";

export const isAlphabetic = ({key, code}: KeyboardEvent): boolean =>
  code.includes("Key") && !!key.match(/^[A-Za-z]+$/);

export const isBackspace = (input: KeyboardEvent): Boolean =>
  input.code === BACKSPACE;

export const isEnter = (input: KeyboardEvent): Boolean => input.code === ENTER;

export const getKey = (input: KeyboardEvent): string =>
  isAlphabetic(input) ? input.key : "";

export const input = (input: KeyboardEvent, currentGuess: Word): Word =>
  isAlphabetic(input)
    ? W.insert(getKey(input), currentGuess)
    : isBackspace(input)
    ? W.pop(currentGuess)
    : currentGuess;
