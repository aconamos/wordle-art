<script setup lang="ts">
import { ref, type Ref } from 'vue'
import AnswerDisplay from './components/AnswerDisplay.vue'
import WordleBoard from './components/WordleBoard.vue'

const answersList: Ref<string[][]> = ref([])
</script>

<template>
  <header>Wordle Art</header>

  <main>
    <div id="big-container">
      <WordleBoard target-word="among" v-model="answersList" />
      <div class="v-divider" />
      <AnswerDisplay :answers-list="answersList" />
    </div>
  </main>
</template>

<style scoped>
#big-container {
  display: flex;
}

.v-divider {
  padding: 6px 0;
  min-height: 100%;
  width: 1px;
  margin: 0 16px;
  background-color: var(--color-border);
}
</style>
