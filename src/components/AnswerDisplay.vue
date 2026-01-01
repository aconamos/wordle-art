<script setup lang="ts">
defineProps<{
  answersList: string[][]
}>()
</script>

<template>
  <div id="answers-thing">
    <div v-for="(answers, idx) in answersList" :key="idx" class="answers-row">
      <span v-for="(answer, jdx) in answers" :key="jdx" class="answer">
        {{ answer }}
      </span>
    </div>
  </div>
</template>

<style lang="css" scoped>
#answers-thing {
  display: grid;
  grid-template-rows: 72px 72px 72px 72px 72px 72px;
}

.answers-row {
  border: 1px solid var(--color-border);
  min-height: 64px;
  max-height: 64px;
  max-width: 360px;
  min-width: 360px;
  overflow: scroll;
  justify-items: baseline;
  margin: 4px;
  padding: 1rem;
}

.answer {
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--green-lowlight);
  padding: 4px 8px;
  margin-right: 6px;
}
</style>
