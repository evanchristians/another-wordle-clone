import {Word, Score} from "../types/word.types";

/**
 * get score for guess | 1: correct character, 2: correct character and position: 0: invalid guess
 *
 * @param   {string}  guess
 * @param   {string}  word
 *
 * @return  {number[]} returns an array of score per character
 */
export const getScore = (guess: string, word: string): Score => {
  const hash = new Map();

  for (const [i, c] of word.split("").entries()) {
    hash.set(i, c);
    hash.set(c, true);
  }

  return guess
    .split("")
    .map((c, i) => (hash.get(i) == c ? 2 : hash.has(c) ? 1 : 0));
};

export const createGuess = (): Word => {
  return new Array(5).map(_ => null);
};

export const insert = (char: string, word: Word): Word =>
  word.map((c, i) => (word.findIndex(el => el == null) == i ? char : c));

export const backspace = (word: Word): Word =>
  word.map((c, i) => (word.findIndex(el => el == null) == i + 1 ? null : c));
