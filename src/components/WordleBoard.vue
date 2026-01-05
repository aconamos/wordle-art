<script setup lang="ts">
import { getPatternMask, product } from '@/lib/computation'
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import wordsRaw from '@/data/allowed_words.txt?raw'

const words = wordsRaw.split('\n').map((w) => w.trim())

const { targetWord } = defineProps<{
  targetWord: string
}>()

const model = defineModel<string[][]>({ default: [[], [], [], [], [], []] })

type Square = {
  id: number
  state: "." | "x" | "y"
}

const squares: Ref<Square[]> = ref([])

const permutations = product(
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
  ['x', '.', 'y'],
).map((arr) => arr.join(''))

const wordsWithMasks = computed(() => {
  return words.map((word) => [getPatternMask(word, targetWord), word])
})

const bdot: ComputedRef<{
  [key: string]: string[]
}> = computed(() => {
  return {}
})

watch(wordsWithMasks, () => {
  for (const permutation of permutations) {
    // This cast is safe because we already filter away all undefineds as permutation is
    // never undefined
    const entries = wordsWithMasks.value
      .filter((w) => w[0] === permutation)
      .map((w) => w[1]) as string[]

    bdot.value[permutation] = entries
  }
  updateModel()
})

function updateSquare(id: number) {
  switch (squares.value[id]!.state) {
    case ".":
      squares.value[id]!.state = "x"
      break
    case "x":
      squares.value[id]!.state = "y"
      break
    case "y":
      squares.value[id]!.state = "."
      break
  }

  updateModel()
}

function updateModel() {
  const toSet = getPatternsFromSquares().map((pattern) => {
    return bdot.value[pattern] ?? []
  })

  model.value = toSet
}

function clearSquares() {
  for (const square of squares.value) {
    square.state = "."
  }
}

function getPatternsFromSquares(): string[] {
  const ret = []

  for (let i = 0; i < 6; i++) {
    let pattern = ''

    for (let j = 0; j < 5; j++) {
      pattern += squares.value[i * 5 + j]!.state
    }

    ret.push(pattern)
  }

  return ret
}

function getSquareClass(state: "x" | "y" | "."): string {
  switch (state) {
    case ".":
      return ""
    case "x":
      return "green-square"
    case "y":
      return "yellow-square"
  }
}

for (let i = 0; i < 30; i++) {
  squares.value.push({ id: i, state: i % 3 == 0 ? "x" : "." })
}

updateModel()
</script>

<template>
  <div>
    <div id="board-box">
      <div v-for="square in squares" class="square" :key="square.id" :class="getSquareClass(square.state)"
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

.green-square {
  background-color: var(--green-highlight);
}

.yellow-square {
  background-color: var(--yellow-highlight);
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
