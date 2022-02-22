import {Word, Score} from "../types/word.types";
import words from "../constants/words.json";
import {GREEN, GREY, ORANGE} from "../constants/strings";

export const getScore = (guess: Word, answer: string): Score => {
  const hash = new Map();

  for (const [i, c] of answer.split("").entries()) {
    hash.set(i, c);
    hash.set(c, true);
  }

  return guess.map((c, i) => (hash.get(i) == c ? 2 : hash.has(c) ? 1 : 0));
};

export const canSubmit = (guess: Word): boolean =>
  guess.filter(g => g).length == 5 && words.includes(guess.join(""));

export const createGuess = (): Word => {
  return new Array(5).fill(null);
};

export const insert = (char: string, word: Word): Word =>
  word.map((c, i) => (word.findIndex(el => !el) == i ? char : c));

export const pop = (word: Word): Word =>
  word[word.length - 1] !== null
    ? [...word.slice(0, word.length - 1), null]
    : word.map((c, i) => (word.findIndex(el => !el) == i + 1 ? null : c));

export const getScoreColor = (score: Score, position: number): string =>
  score[position] == 2 ? GREEN : score[position] == 1 ? ORANGE : GREY;

export const getRandomWord = (words: string[]): string =>
  words[Math.floor(Math.random() * words.length)];
