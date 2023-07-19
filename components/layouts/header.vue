<template>
  <header class="bg-slate-200 w-full md:h-screen md:w-16 dark:bg-space-cadet">
    <div class="flex justify-between md:flex-col md:h-full md:pb-5">
      <div
        class="bg-tropical-indigo py-3 px-5 flex items-center justify-center text-white rounded-tr-md rounded-br-md"
      >
        ⌘
      </div>
      <div class="flex items-center p-4 md:p-1 md:flex-col gap-4">
        <i
          role="button"
          :class="`${
            isDark ? 'i-ic-baseline-wb-sunny' : 'i-ic-baseline-dark-mode'
          }  text-ultra-violet text-lg`"
          @click="() => toggleDark()"
        ></i>
        <div
          class="h-full w-[1px] md:h-[1px] md:w-full content-[''] bg-slate-400 dark:bg-ultra-violet"
        ></div>
        <div class="w-7 h-7">
          <img
            class="rounded-full"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff5%2F8a%2Fac%2Ff58aacd2cddf1a32e2701ba767184f3c.jpg&f=1&nofb=1&ipt=2f3d55fa7efecf02d1b17ab3488b854c629cb1c738d4ee3da5298b5c5647f24f&ipo=images"
            alt="profile"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
