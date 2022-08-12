<template>
  <div>
    <div id="wordle-viewer" class="content-center justify-center">
      <Word v-if="reset"
        :word="$props.mainWord"
        :wordleViewer="wordleViewer.at(0)"
        @keyup.enter="checkInput"
        :class="wordleViewer[0].shakeAction ? wordle_shake : `wordle`"
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
          :class="wordleViewer[index].shakeAction ? wordle_shake : `wordle`"
        />
      </ul>
      <div class="text-center p-2">
        <button v-if="wordleViewer.at(lengthOfWordle - 1)?.isCompleted || celebrate" class="bg-slate-500 font-serif justify-center hover:bg-slate-600 text-slate-100 font-bold py-2 px-4 mb-2 border border-slate-400 rounded"
          @click="resetGame">Try again</button>
        <button v-else
          class="bg-slate-500 font-serif justify-center hover:bg-slate-600 text-slate-100 font-bold py-2 px-4 mb-2 border border-slate-400 rounded"
          @click="checkInput"
        >
          Enter
        </button>
        <div v-if="wordleViewer.at(lengthOfWordle - 1)?.isCompleted">
          <p class="py-4 text-4xl font-serif">
            {{ $props.mainWord }}
          </p>

        </div>
        <p v-if="celebrate">celebrate animation</p>
      </div>
    </div>
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
    let reset = ref(true)

    //putting these values in to check on if completed
    var wordleViewer = ref<WordleViewer[]>([]);
    var userEntry = [];
    var celebrate = ref(false);
    for (var i = 0; i < lengthOfWordle; i++) {
      userEntry.push("");
    }
    for (var i = 0; i < lengthOfWordle; i++) {
      wordleViewer.value.push({
        userEntry: userEntry,
        isCompleted: false,
        clearContents: false,
        focusElement: 0,
        shakeAction: false,
      });
    }

    return {
      reset,
      wordleViewer,
      lengthOfWordle,
      celebrate,
      wordle_shake: "flex gap-2 m-3 shake",
    };
  },
  methods: {
    checkInput() {
      const index = this.wordleViewer.findIndex((element) => {
        if (!element.isCompleted) return element;
      });

      if (index < this.lengthOfWordle) {
        if (this.checkForCompletion(this.wordleViewer[index])) {
          //is the mainWord?

          if (this.isWinCondi(this.wordleViewer[index])) {
            //cut off the array to stop printing

            this.wordleViewer.length = index + 1; //TODO fix problem
            this.celebrate = true;
            //dont print out next and set out celebration
          }
          console.log(index)
          this.wordleViewer[index].isCompleted = true;
        } else {
          //clear contents for user
          this.wordleViewer[index].clearContents = true;

          //shake to show invalidaity in word choice
          this.wordleViewer[index].shakeAction = true;
          this.wordleShakeAnimation(index);
          //this.wordleViewer[index].shakeAction = false;
          //first input in focus

          this.wordleViewer[index].focusElement = 0;
        }
      }
    },
    isWinCondi(value: WordleViewer) {
      return this.mainWord == this.getUserEntryWord(value);
    },
    getUserEntryWord(value: WordleViewer) {
      var word = "";

      value.userEntry.forEach((element: string) => {
        word += element;
      });

      return word;
    },
    checkForCompletion(value: WordleViewer) {
      //see if all values have a letter AND check if its a real word, if not clear values
      var wordParser = new WordParser();
      var word = "";

      word = this.getUserEntryWord(value);

      return (
        this.doAllInputsHaveValues(value) && wordParser.doesWordExist(word)
      );
    },
    resetWordle() {

   let userEntry: string[] = []
   for (var i = 0; i < this.lengthOfWordle; i++) {
     userEntry.push("");
   }

   // console.log(this.wordleViewer.length = this.lengthOfWordle)
    this.wordleViewer.forEach((element, index) => {

        element.userEntry = userEntry;
        element.isCompleted = false;
        element.focusElement = undefined;
        element.clearContents = true;
        element.shakeAction = false;
        if(index === 0) {
          element.focusElement = 0
        }
    })

    console.log(this.wordleViewer[0].focusElement)
    this.reset = false;
    this.reset = true
    this.celebrate = false

    },
    doAllInputsHaveValues(value: WordleViewer) {
      for (var i = 0; i < value.userEntry.length; i++) {
        if (value.userEntry[i] == "") {
          return false;
        }
      }
      return true;
    },
    resetGame() {
      this.$emit("reset", true);
      //clear wordle contents 
      this.resetWordle()
      //console.log(this.mainWord);
    },

    wordleShakeAnimation(index: number) {
      if (this.wordleViewer.at(index)?.shakeAction) {
        setTimeout(() => {
          this.wordleViewer[index].shakeAction = false;
        }, 1500);
      }
    },
  },
});
</script>

<style>
.wordle {
  @apply flex gap-2 m-3;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
