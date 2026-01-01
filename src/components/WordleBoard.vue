<script setup lang="ts">
import { ref, type Ref } from 'vue'

type Square = {
  id: number
  filled: boolean
}

const squares: Ref<Square[]> = ref([])

for (let i = 0; i < 30; i++) {
  squares.value.push({ id: i, filled: i % 3 == 0 })
}
</script>

<template>
  <div id="board-box">
    <div v-for="square in squares" class="square" :key="square.id" :class="square.filled ? 'filled-square' : ''"
      @click.prevent="square.filled = !square.filled"></div>
  </div>
</template>

<style lang="scss" scoped>
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
}

.filled-square {
  background-color: var(--green-highlight);
}
</style>
