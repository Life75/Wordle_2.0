<template>
  <div>
    <div id="letter">
      <div class="flex">
        <div class="flex">
          <div :class="classDiv">
            <div id="header" class="flex items-center">
              <div class="text-xl border-orange-400 focus:border-cyan-300">
                <input
                  :class="classInput"
                  cursor
                  maxlength="1"
                  v-model="letter"
                  :disabled="isDisabledCheck()"
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
import {
  defineComponent,
  watch,
  defineEmits,
  PropType,
} from "@vue/runtime-core";
import { ref } from "vue";
import IWordleViewer from "../Interfaces/IWordleViewer";

export default defineComponent({
  name: "Letter",
  props: {
    word: { type: String },
    letter: { type: String },
    wordleViewer: { type: Object as PropType<IWordleViewer> },
    index: { type: Number },
  },
  emits: ["update"],
  setup(prop, { emit }) {
    var letter = ref();
    var wordleViewerRef = ref(prop.wordleViewer);
    var classInput = ref("ml-1 mb-2 border-none outline-none border-2 w-4");
    var classDiv = ref(
      "max-w-sm bg-white border-2 border-gray-300 p-2  tracking-wide shadow-lg"
    );

    function dynamicInput() {
      if (wordleViewerRef.value)
        if (wordleViewerRef?.value.isCompleted) {
          //check for stuff
          if (prop.word && prop.index !== undefined) {
            if (prop.word[prop.index] == letter.value) {
              classInput.value += ` bg-lime-400`;
              classDiv.value += ` bg-lime-400`;
            } else {
              if (letter)
                if (prop.word.includes(letter.value)) {
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

    watch(
      wordleViewerRef,
      (wordleUpdate) => {
        if (wordleUpdate?.isCompleted) {
          dynamicInput()
        }
      },
      { deep: true }
    );

    watch(letter, (newLetter) => {
      return emit("update", newLetter);
    });
    return {
      wordleViewerRef,
      letter,
      classInput,
      classDiv,
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
  },
});
</script>

<style lang="postcss"></style>
