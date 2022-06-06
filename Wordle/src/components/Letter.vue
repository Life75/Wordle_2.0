<template>
  <div>
    <div id="letter">
      <div class="flex">
        <div class="flex">
          <!-- Start of component -->
          <div :class="classDiv">
            <div id="header" class="flex items-center">
              <div
                class="text-xl border-orange-400 focus:border-cyan-300"
>
                <input
                  :class="classInput"
                  cursor
                  maxlength="1"
                  v-model="letter"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- End of component -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Letter',
    setup(props) {
        var letter
        return {
            letter,
            classInput: 'ml-1 mb-2 border-none outline-none border-2 w-4',
            classDiv: 'max-w-sm bg-white border-2 border-gray-300 p-2 rounded-md tracking-wide shadow-lg'
        }
    }
})
</script>

<style>

</style>