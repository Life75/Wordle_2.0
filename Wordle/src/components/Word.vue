<template>
  <div id="word">
    <ul class="" v-for="(letter, index) in word" :key="index">
      <li class=" w-12 h-16 items-center flex align-middle justify-center mr-3  border-2 border-black border-slate-600 shadow-md">
        <Letter
          :word="word"
          :index="index"
          :letter="letter"
          @update="userEntry(index, $event)"
          :wordleViewer="wordleViewerRef"
          :letterFocus="letterFocus"
          @input="next($event, index)"
          @clear-contents-last-input="clearSpecificInput"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import Letter from "./Letter.vue";
import IWordleViewer from "../Interfaces/IWordleViewer";
import ILetterFocus from "../Interfaces/ILetterFocus";

import { ref } from "vue";
export default defineComponent({
  name: "Word",
  components: { Letter },
  props: {
    word: { type: String },
    wordleViewer: { type: Object as PropType<IWordleViewer> },
  },
  setup(props) {
    var wordleViewerRef = ref(props.wordleViewer);
    var letterFocus = ref<ILetterFocus[]>([{ isFocus: true }]); //first value is true, rest should be false
    console.log(props.word)
    //check how many letters are within the prop, init, and set a focusRef value of false

    function focusLogic() {
      if (props.word)
        for (var i = 1; i < props.word.length; i++) {
          letterFocus.value.push({ isFocus: false });
        }
    }

    focusLogic();
    return {
      wordleViewerRef,
      letterFocus,
    };
  },
  methods: {
    userEntry(index: number, emitData: string) {
      //add word to entry
      //console.log(this.wordleViewerRef?.userEntry.at(index))
      if (this.wordleViewerRef)
        this.wordleViewerRef.userEntry[index] = emitData;
    },
    focusNextInput(currentIndex: number) {
      if (currentIndex !== undefined) {
        this.letterFocus[currentIndex].isFocus = false;
        console.log("current ind" + currentIndex);
        console.log(this.letterFocus[currentIndex].isFocus);

        if (this.word)
          if (currentIndex < this.word?.length - 1) {
            this.letterFocus[currentIndex + 1].isFocus = true;

            console.log("next" + currentIndex + 1);
            console.log(this.letterFocus[currentIndex + 1].isFocus);
          }
      }
    },
    next(event: any, index: number) {
      console.log(index);

      const input = this.$refs;
      //console.log(`input-${index + 1}`)
      //input[`input-${index + 1}`]
      /* this.$nextTick(() => {
                console.log(input[`input-${index}`][0])
      })*/
    },

    clearSpecificInput(index: number) {
      if (this.wordleViewerRef) this.wordleViewerRef.clearContents = true;
    },
  },
});
</script>

<style lang="postcss">
</style>