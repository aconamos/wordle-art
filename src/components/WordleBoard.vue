<script setup lang="ts">
import { getPatternMask, product } from '@/lib/computation'
import { ref, type Ref } from 'vue'
import wordsRaw from '@/data/allowed_words.txt?raw'

const words = wordsRaw.split('\n').map((w) => w.trim())

const { targetWord } = defineProps<{
  targetWord: string
}>()

const model = defineModel<string[][]>({ default: [[], [], [], [], [], []] })

type Square = {
  id: number
  filled: boolean
}

const squares: Ref<Square[]> = ref([])

const permutations = product(
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
).map((arr) => arr.join(''))

const wordsWithMasks = words.map((word) => [getPatternMask(word, targetWord), word])

const bdot: {
  [key: string]: string[]
} = {}

for (const permutation of permutations) {
  // This cast is safe because we already filter away all undefineds as permutation is
  // never undefined
  const entries = wordsWithMasks.filter((w) => w[0] === permutation).map((w) => w[1]) as string[]

  bdot[permutation] = entries
}

function updateSquare(id: number) {
  squares.value[id]!.filled = !squares.value[id]?.filled

  updateModel()
}

function updateModel() {
  model.value = getPatternsFromSquares().map((pattern) => bdot[pattern] ?? [])
}

function clearSquares() {
  for (const square of squares.value) {
    square.filled = false
  }
}

function getPatternsFromSquares(): string[] {
  const ret = []

  for (let i = 0; i < 6; i++) {
    let pattern = ''

    for (let j = 0; j < 5; j++) {
      if (squares.value[i * 5 + j]?.filled) {
        pattern += 'x'
      } else {
        pattern += '.'
      }
    }

    ret.push(pattern)
  }

  return ret
}

for (let i = 0; i < 30; i++) {
  squares.value.push({ id: i, filled: i % 3 == 0 })
}

updateModel()
</script>

<template>
  <div>
    <div id="board-box">
      <div v-for="square in squares" class="square" :key="square.id" :class="square.filled ? 'filled-square' : ''"
        @click.prevent="() => updateSquare(square.id)"></div>
    </div>

    <button class="green" @click="clearSquares">Clear</button>
  </div>
</template>

<style lang="css" scoped>
#board-box {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: auto auto auto auto auto auto;
}

.square {
  border: 1px solid var(--color-border);
  min-width: 64px;
  min-height: 64px;
  margin: 4px;
  transition: 0.08s ease-out;
}

.filled-square {
  background-color: var(--green-highlight);
}

button {
  margin: 4px;
  padding: 4px 11px;
  background-color: var(--green-lowlight);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: large;
}

button:hover {
  color: white;
  cursor: pointer;
  background-color: var(--green-highlight);
  transition: 0.1s ease-out;
}
</style>
