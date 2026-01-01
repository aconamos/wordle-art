<script setup lang="ts">
import { ref, type Ref } from 'vue'

type Square = {
  id: number
  filled: boolean
}

const squares: Ref<Square[]> = ref([])

function clearSquares() {
  for (const square of squares.value) {
    square.filled = false
  }
}

for (let i = 0; i < 30; i++) {
  squares.value.push({ id: i, filled: i % 3 == 0 })
}
</script>

<template>
  <div id="board-box">
    <div v-for="square in squares" class="square" :key="square.id" :class="square.filled ? 'filled-square' : ''"
      @click.prevent="square.filled = !square.filled"></div>
  </div>

  <button class="green" @click="clearSquares">Clear</button>
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
