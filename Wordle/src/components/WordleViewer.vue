<template>
<div>
  <div id="wordle-viewer" class="content-center justify-center">
    <Word
      :word="$props.mainWord"
      :wordleViewer="wordleViewer.at(0)"
      @keyup.enter="checkInput"
      class="wordle"
    />
    <ul
      v-for="(wordle, index) in wordleViewer"
      :key="index"
      @keyup.enter="checkInput"
    >
      <!--Display the first wordle, when the others are completed then display the next-->
      <Word
        v-if="wordleViewer.at(index - 1)?.isCompleted && index !== 0"
        :word="$props.mainWord"
        :wordleViewer="wordleViewer.at(index)"
        class="wordle"
      />
    </ul>
    <div class="text-center p-2"> 
      <p class="text-lg" v-if="wordleViewer.at(lengthOfWordle - 1 )?.isCompleted">{{$props.mainWord}}</p>
    </div>
  </div>
  <button
    class="bg-slate-500 justify-center hover:bg-slate-600 text-slate-100 font-bold py-2 px-4 border border-slate-400 rounded"
    @click="checkInput"
  >
    Enter
  </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import Word from "./Word.vue";
import WordleViewer from "../Interfaces/IWordleViewer";
import WordParser from "../service/WordParser.service";

export default defineComponent({
  name: "WordleViewer",
  components: { Word },
  props: { mainWord: { type: String } },
  setup() {
    const lengthOfWordle = 5;

    //putting these values in to check on if completed
    var wordleViewer = ref<WordleViewer[]>([]);
    var userEntry = [];

    for (var i = 0; i < lengthOfWordle; i++) {
      userEntry.push("");
    }
    for (var i = 0; i < lengthOfWordle; i++) {
      wordleViewer.value.push({
        userEntry: userEntry,
        isCompleted: false,
        clearContents: false,
        focusElement: 0
      });
    }

    return {
      wordleViewer,
      lengthOfWordle,
    };
  },
  methods: {
    checkInput() {
      const index = this.wordleViewer.findIndex((element) => {
        if (!element.isCompleted) return element;
      });

      if (index < this.lengthOfWordle) {
        if (this.checkForCompletion(this.wordleViewer[index])) {
          this.wordleViewer[index].isCompleted = true;
        } else {
          //clear contents for user
          this.wordleViewer[index].clearContents = true;
          //first input in focus 
          this.wordleViewer[index].focusElement = 0
          
        }
      }
    },
    checkForCompletion(value: WordleViewer) {
      //see if all values have a letter AND check if its a real word, if not clear values
      var wordParser = new WordParser();
      var word = "";

      value.userEntry.forEach((element: string) => {
        word += element;
      });

      return (
        this.doAllInputsHaveValues(value) && wordParser.doesWordExist(word)
      );
    },
    doAllInputsHaveValues(value: WordleViewer) {
      for (var i = 0; i < value.userEntry.length; i++) {
        if (value.userEntry[i] == "") {
          return false;
        }
      }
      return true;
    },
  },
});
</script>

<style>
.wordle {
  @apply flex gap-2 m-3 ;
}
</style>
