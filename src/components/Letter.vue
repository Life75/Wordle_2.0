<template>
  <input
    class="static"
    :class="{correctStyle: correct, closeStyle: closeToAnswer, wrongStyle: wrong  }"
    cursor
    maxlength="1"
    v-model="userLetter"
    :disabled="isDisabledCheck()"
    @input="goNextInput()"
    :name="`${index}`"
    :ref="`input`"
    @keyup.delete="goBackToLastInput()"
  />
</template>

<script lang="ts">
import { defineComponent, watch, PropType, onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import ILetterFocus from "../Interfaces/ILetterFocus";
import IWordleViewer from "../Interfaces/IWordleViewer";

export default defineComponent({
  name: "Letter",
  props: {
    word: { type: String },
    letter: { type: String },
    wordleViewer: { type: Object as PropType<IWordleViewer> },
    index: { type: Number },
    letterFocus: { type: Object as PropType<ILetterFocus[]> },
  },
  emits: ["update", "go-to-next-input", "clear-contents-last-input"],
  setup(prop, { emit }) {
    const correct = ref(false)
    const closeToAnswer = ref(false)
    const wrong = ref(false)
    

    const input = ref(null);
    var userLetter = ref();
    var wordleViewerRef = ref(prop.wordleViewer);
    var letterFocusRef = ref(prop.letterFocus);
    var classInput = ref(
      "outline-none font-semibold border-2 uppercase caret-transparent text-4xl w-full h-full text-center "
    );
    var classDiv = ref("max-w-sm bg-white p-2 tracking-wide shadow-lg ");

    function dynamicInput() {
      if (wordleViewerRef.value)
        if (wordleViewerRef?.value.isCompleted) {
          //check for stuff
        
          if (prop.word && prop.index !== undefined) {
            if (prop.word[prop.index] === userLetter.value) {
              //console.log('hey')
              correct.value = true 

              classInput.value += ` bg-lime-400`;
              //correct.value = true 
            } else {
               closeToAnswer.value = true 
                if (prop.word.includes(userLetter.value)) {
                  //console.log('heyz')
                  classInput.value += ` bg-yellow-300`;
                  closeToAnswer.value = true 
                } 
                else if (!prop.word.includes(userLetter.value)) {
                  //onsole.log('heyzz')
                  classInput.value += ` bg-red-400`;
                  wrong.value = true 
                }
            }
          }
        }
    }
    function clearContents() {
      userLetter.value = "";
    
      if (prop.word)
        if (prop.index == prop.word?.length - 1) {
          if (wordleViewerRef.value)
            wordleViewerRef.value.clearContents = false;
        }
    }

    onMounted(() => {
      if (wordleViewerRef.value)
        if (wordleViewerRef.value.focusElement == prop.index) {
          focusElement();
        }
    });
    watch(
      wordleViewerRef,
      (wordleUpdate) => {
        if (wordleUpdate?.isCompleted) {
          dynamicInput();
        }
        if (wordleUpdate?.clearContents) {
          clearContents();
          //clear styles as well for reset 
          correct.value = false;
          closeToAnswer.value = false;
          wrong.value = false;
          //TODO work on fixing quirks of the reset 
        }
        if (wordleUpdate?.focusElement !== undefined) {
          if (prop.index == wordleUpdate.focusElement) {
            wordleUpdate.focusElement = undefined
            focusElement();
            
          }
        }



        
      },
      { deep: true }
    );

    watch(userLetter, (newLetter) => {
      return emit("update", newLetter);
    });

    function isDisabledCheck() {
      if (wordleViewerRef.value) {
        return wordleViewerRef.value.isCompleted;
      }
      return false;
    }
    function goNextInput() {
      //will need to emit for word to go to the next letter and

      emit("go-to-next-input", prop.index);
      if (wordleViewerRef.value) {
        if (prop.index !== undefined) {
          wordleViewerRef.value.focusElement = prop.index + 1;
        }
      }
    }

    function focusElement() {
      input.value!.focus();
    }

    return {
      correct, 
      closeToAnswer,
      wrong,

      input,
      focus,
      goNextInput,
      isDisabledCheck,
      wordleViewerRef,
      userLetter,
      classInput,
      classDiv,
      letterFocusRef,
      disabledInput: "", //for disabled input status
    };
  },
  methods: {

    goBackToLastInput() {
      console.log("delete");

      if (this.wordleViewerRef && this.wordleViewerRef.focusElement != 0) {
        this.wordleViewerRef.clearContents = true
        this.wordleViewerRef.focusElement = 0;
        
      }
    },
  },
});
</script>

<style lang="postcss">
.input {
  @apply text-lg;
}

.static {
  @apply outline-none font-semibold border-2 uppercase caret-transparent text-4xl w-full h-full text-center 
}

.correctStyle { 
  @apply bg-lime-400
}

.closeStyle {
  @apply bg-yellow-300
}

.wrongStyle {
  @apply bg-red-400
}




</style>
