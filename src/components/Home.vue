<template>
  <div id="home" class="flex-col p-2">
    <p class="text-4xl font-serif">Wordle</p>  
    <WordleViewer :mainWord="currentWord" @reset="resetEvent"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import WordleViewer from "./WordleViewer.vue";
import WordParser from '../service/WordParser.service'

export default defineComponent({
  name: "Home",
  components: { WordleViewer },
  setup() {
    let currentWord = ref('')
    var wordParser = new WordParser()
    currentWord.value = wordParser.pullMainWord()
    

    function resetEvent() {
      currentWord.value = wordParser.pullMainWord()
      console.log(currentWord)
    }

    return {
      currentWord,
      resetEvent
    }
    
  },

});
</script>

<style>


</style>
