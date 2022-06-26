<template>
    <div id="word">
        <ul  class="" v-for="(letter, index) in word" :key="index">
            <li class="">
                <Letter :letter="letter" @update="userEntry(index, $event)" :wordleViewer="wordleViewerRef" />
              
            </li>
        </ul>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import Letter from "./Letter.vue";
import IWordleViewer from "../Interfaces/IWordleViewer"
import { ref } from "vue";
export default defineComponent({
    name: "Word",
    components: { Letter },
    props: {word: {type: String}, wordleViewer: {type: Object as PropType<IWordleViewer>} },
    emits: ['update-wordle-viewer'],
    setup(props) {
        var wordleViewerRef = ref(props.wordleViewer)
        console.log(wordleViewerRef.value)
        return {
            wordleViewerRef
        }
    },
    methods: {
        userEntry(index: number, emitData: string) {
            //add word to entry 
           //console.log(this.wordleViewerRef?.userEntry.at(index))
            if(this.wordleViewerRef)
            this.wordleViewerRef.userEntry[index] = emitData
        }
    }
})

</script>

<style lang="postcss">
    
</style>