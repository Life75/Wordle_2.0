<template>
    <div id="word">
        <ul  class="" v-for="(letter, index) in word" :key="index">
            <li class="">
                <Letter :letter="letter" @update="userEntry(index, $event)"/>
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
        console.log(props.word)
        var wordleViewerRef = ref(props.wordleViewer)

        return {
            wordleViewerRef
        }
    },
    methods: {
        userEntry(index: number, emitData: string) {
            console.log(index),
            console.log(emitData)
            //add word to entry 
           //console.log(this.wordleViewerRef?.userEntry.at(index))
          

        }
    }
})

</script>

<style lang="postcss">
    
</style>