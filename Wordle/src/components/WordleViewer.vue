<template>
    <div id="wordle-viewer">
        <Word :word="$props.mainWord" class="flex m-3"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Word from "./Word.vue";


export default defineComponent({
    name: 'WordleViewer',
    components: { Word },
    props: {mainWord: {type: String}}
})
</script>

<style>

</style>