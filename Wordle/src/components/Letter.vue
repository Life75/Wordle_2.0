<template>
  <input
                  class=" mb-2 border-none outline-none border-2 w-4 caret-transparent text-lg" 
                  cursor
                  maxlength="1"
                  v-model="userLetter"
                  :disabled="isDisabledCheck()"
                  @input="goNextInput()"
                  :name="`${index}`"
                  :ref="`input`"
  />
</template>

<script lang="ts">
import { defineComponent, watch, PropType, onMounted } from "@vue/runtime-core";
import { propsToAttrMap } from "@vue/shared";
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
  emits: ["update", "go-to-next-input"],
  setup(prop, { emit }) {
    const vFocus = {
      mounted: (el) => el.focus()
    }
    const input = ref(null)
    var userLetter = ref();
    var wordleViewerRef = ref(prop.wordleViewer);
    var letterFocusRef = ref(prop.letterFocus);
    var classInput = ref(
      "ml-1 mb-2 border-none outline-none border-2 w-4 caret-transparent text-lg"
    );
    var classDiv = ref("max-w-sm bg-white p-2 tracking-wide shadow-lg ");

    function dynamicInput() {
      if (wordleViewerRef.value)
        if (wordleViewerRef?.value.isCompleted) {
          //check for stuff
          if (prop.word && prop.index !== undefined) {
            if (prop.word[prop.index] == userLetter.value) {
              classInput.value += ` bg-lime-400`;
              classDiv.value += ` bg-lime-400`;
            } else {
              if (userLetter)
                if (prop.word.includes(userLetter.value)) {
                  classInput.value += ` bg-yellow-300`;
                  classDiv.value += ` bg-yellow-300`;
                } else {
                  classInput.value += ` bg-red-300`;
                  classDiv.value += ` bg-red-300`;
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
  if(wordleViewerRef.value)
  if(wordleViewerRef.value.focusElement == prop.index) {
    focusElement()
  }
})
    watch(
      wordleViewerRef,
      (wordleUpdate) => {
        if (wordleUpdate?.isCompleted) {
          dynamicInput();
        }
        if (wordleUpdate?.clearContents) {
          clearContents();
        }
        if(wordleUpdate?.focusElement !== undefined) {
          if(prop.index == wordleUpdate.focusElement)

          { 
            focusElement()

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
        if(wordleViewerRef.value){
        if(prop.index !== undefined){
        wordleViewerRef.value.focusElement = prop.index + 1
        
        }

      }
      }


    function focusElement() {
      input.value!.focus()
    }

    return {
      input,
      vFocus,
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


    focusNow() {
      console.log('amongus')
    //if (this.letterFocusRef) {
    // console.log('s')
    //  if (this.index != undefined)
    //   {
    //     console.log('focusing ' + this.index)
    //     this.$nextTick()
    //     return this.letterFocusRef[this.index].isFocus}
    //}
    //return false;
      
    },
  },

});
</script>

<style>
.input {
  @apply text-lg
}
</style>
