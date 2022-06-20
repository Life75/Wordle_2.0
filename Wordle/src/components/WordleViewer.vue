<template>
    <div id="wordle-viewer" class="content-center justify-center">
        <ul v-for="(wordle, index) in wordleViewer" :key="index">
            <Word v-if="index == 0" :word="$props.mainWord" class="wordle"/> <!--Display the first wordle, when the others are completed then display the next-->
            <Word v-if="wordleViewer.at(index-1)?.isCompleted" :word="$props.mainWord" class="wordle"/>
        </ul>
        
        
    </div>
        <button class="bg-slate-500 justify-center hover:bg-slate-600 text-slate-100 font-bold py-2 px-4 border border-slate-400 rounded">
         Enter 
        </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import Word from "./Word.vue";


export default defineComponent({
    name: 'WordleViewer',
    components: { Word },
    props: {mainWord: {type: String}},
    setup() {
        const lengthOfWordle = 5
        interface WordleViewer {
            isCompleted: boolean | false
        }
        
        //putting these values in to check on if completed 
        var wordleViewer = ref<WordleViewer[]>([])
        for (var i=0; i < lengthOfWordle; i++) {
            wordleViewer.value.push({ isCompleted: false })
        }

        
        

        return {
            wordleViewer
        }
    }
})
</script>

<style>
.wordle {
    @apply flex gap-2 m-3
}

</style>