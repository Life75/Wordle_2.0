<template>
  <div id="home" class="flex-col p-2">
    <p class="text-4xl font-serif">Wordle</p>
    <Transition name="bounce">
    <WordleViewer :mainWord="currentWord" @reset="resetEvent" v-if="showAnimation" />
  </Transition>
    <!--Make a pop in/out animtation for when the reset event is triggered-->
    <!--Need celebration animation as well for the wordle too-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import WordleViewer from "./WordleViewer.vue";
import WordParser from "../service/WordParser.service";

export default defineComponent({
  name: "Home",
  components: { WordleViewer },
  setup() {
    let currentWord = ref("");
    var wordParser = new WordParser();
    let showAnimation = ref(true);

    
  
    currentWord.value = wordParser.pullMainWord();
    
    console.log(currentWord.value)

    
    function resetEvent() {
      showAnimation.value = false;

      currentWord.value = wordParser.pullMainWord();
      
      const timeOut = setTimeout(() => {
        showAnimation.value = true;
      }, 1000)
      timeOut;

      console.log(currentWord.value)
    }

    return {
      currentWord,
      resetEvent,
      showAnimation,
    };
  },
});
</script>

<style>
  .bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
