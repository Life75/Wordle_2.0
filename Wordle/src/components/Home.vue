<template>
  <div id="home" class="flex-col p-2">
    <p>Wordle</p>  
    <WordleViewer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import WordleViewer from "./WordleViewer.vue";

export default defineComponent({
  name: "Home",
  components: { WordleViewer },
});
</script>

<style></style>
