<template>
  <div id="home" class="flex-col p-2">
    <p>Wordle</p>  
    <WordleViewer :mainWord="currentWord" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import WordleViewer from "./WordleViewer.vue";
import WordParser from '../service/WordParser.service'

export default defineComponent({
  name: "Home",
  components: { WordleViewer },
  setup() {
    let currentWord: string
    var wordParser = new WordParser()
    currentWord = wordParser.pullMainWord()
    

    return {
      currentWord
    }
    
  }
});
</script>

<style></style>
