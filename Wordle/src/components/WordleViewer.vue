<template>
    <div id="wordle-viewer" class="content-center justify-center">
        <Word :word="$props.mainWord" class="flex m-3"/>
        <Word :word="$props.mainWord" class="flex m-3"/>
        <Word :word="$props.mainWord" class="flex m-3"/>
        <Word :word="$props.mainWord" class="flex m-3"/>
        <Word :word="$props.mainWord" class="flex m-3"/>
        <el-button type="" class="bg-black"> Enter </el-button>
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