<template>
  <div class="app">
    <Header :search="search" @update="setSearch" />
    <Main :search="search" />
  </div>
</template>

<script setup lang="ts">
import Main from '@/layouts/Main.vue'
import Header from '@/components/Header.vue'
import { ref } from 'vue'

const search = ref<string>('')

const setSearch = (newSearch: string) => {
  search.value = newSearch.trim()
}
</script>

<style>
@font-face {
  font-family: Gilroy;
  src: url(./assets/fonts/gilroy/Gilroy-Light.otf);
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
  color: black;
  border: none;
  background: none;
  font-family: Gilroy, sans-serif;
}

.app {
  max-width: 1512px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 179px 58px 176px;
}
 

@media screen and (max-width: 1100px) {
  .app {
    padding: 40px 40px 58px 40px;
  }
  
  main {
    padding-left: unset;
  }
}

@media screen and (max-width: 600px) {
  .app {
    padding: 0;
  }
}




</style>