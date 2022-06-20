<template>
    <div id="word">
        <ul  class="" v-for="(letter, index) in word" :key="index">
            <li class="">
                <Letter :letter="letter"/>
            </li>
        </ul>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Letter from "./Letter.vue";

export default defineComponent({
    name: "Word",
    components: { Letter },
    props: {word: {type: String} },
    setup(props) {
        console.log(props.word)
    }
})

</script>

<style lang="postcss">
    
</style>