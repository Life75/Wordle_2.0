<template>
  <div>
    <div id="letter">
      <div class="flex">
        <div class="flex border-4 border-gray-400">
          <div :class="classDiv">
            <div id="header" class="flex items-center">
              <div class="text-xl border-orange-400 focus:border-cyan-300">
                <input
                  autofocus  
                  :class="classInput"
                  cursor
                  maxlength="1"
                  v-model="userLetter"
                  :disabled="isDisabledCheck()"
                  @input="goNextInput()"
                  :ref="`input-${index}`"
                  :name="`${index}`"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, PropType } from "@vue/runtime-core";
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
    var focus = ref()
    var userLetter = ref();
    var wordleViewerRef = ref(prop.wordleViewer);
    var letterFocusRef = ref(prop.letterFocus);
    var classInput = ref(
      "ml-1 mb-2 border-none outline-none border-2 w-4 caret-transparent "
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

    watch(
      wordleViewerRef,
      (wordleUpdate) => {
        if (wordleUpdate?.isCompleted) {
          dynamicInput();
        }
        if (wordleUpdate?.clearContents) {
          clearContents();
        }
      },
      { deep: true }
    );

    watch(userLetter, (newLetter) => {
      return emit("update", newLetter);
    });
    return {
      focus,
      wordleViewerRef,
      userLetter,
      classInput,
      classDiv,
      letterFocusRef,
      disabledInput: "", //for disabled input status
    };
  },
  methods: {
    isDisabledCheck() {
      if (this.wordleViewerRef) {
        return this.wordleViewerRef.isCompleted;
      }
      return false;
    },

    goNextInput() {
      //will need to emit for word to go to the next letter and

      this.$emit("go-to-next-input", this.index);

      //   const input = this.$refs[`input-1`]
      //             console.log(input)
      //           

    },

    focusNow() {
      console.log('amongus')
      this.focus = true 
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

<style lang="postcss"></style>
