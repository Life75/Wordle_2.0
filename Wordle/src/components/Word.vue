<template>
    <div id="word">
        <Letter/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Letter from "./Letter.vue";

export default defineComponent({
    name: "Word",
    components: { Letter }
})

</script>

<style lang="postcss">
</style>