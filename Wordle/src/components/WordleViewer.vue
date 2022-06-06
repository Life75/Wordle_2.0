<template>
    <div id="wordle-viewer">
        <Word class="flex m-3"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Word from "./Word.vue";


export default defineComponent({
    name: 'WordleViewer',
    components: { Word }
})
</script>

<style>

</style>