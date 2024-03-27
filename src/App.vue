<template>
  <div class="app">
    <header>
      <div class="header-logo">
        <img src="./assets/img/logo.svg" alt="logo">
      </div>
      <div class="header-search">
        <div class="search">
          <input type="text" v-model="search" placeholder="Batman">
          <div>
            <img src="./assets/img/search.png" alt="search">
          </div>
        </div>
      </div>
      <div class="header-profile">
        <div class="user"> 
          <div class="user__img">
            <img src="./assets/img/user.png" alt="default-user">
          </div>
          <div class="user__name">Your Name</div>
        </div>
      </div>
    </header>
    <section>
      <div class="result-searching">
        <div class="result-searching__text">You searched for: <span>{{ search }}</span></div>
        <div class="result-searching__count">{{ totalCount }} results</div>
      </div>
    </section>
    <main>
      <Cards v-if="!isLoading" :cards="data"/>
      <Loader v-else/>
      <span class="ErrorMes" v-if="!search">Starts searching...</span>
      <span class="ErrorMes" v-if="search && !data.length">{{ error }}</span>
      <Pagination :page="page" :totalPages="totalPages" :maxCountPage="maxCountPage" @callback="setPage"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Pagination from './components/Pagination.vue';
import Cards from './components/Cards.vue';
import Loader from './components/Loader.vue';
import { useFetching } from './hooks/useFetching';
import { usePagination } from './hooks/usePagination';

const search = ref<string>('')
const {fetching, totalCount, isLoading, data, error} = useFetching()
const {page, totalPages, setPage, maxCountPage} = usePagination(totalCount)

const debounce = (func:any, ms: number) => {
  let timeout: any;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(arguments), ms);
  };
}

watch(search, debounce(() => {
  setPage(1)
  search.value = search.value.trim()
  fetching(search, page)
}, 500))


watch(page, () => {
  fetching(search, page)
})


onMounted(() => {
  fetching(search, page)
})


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
 
header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 38px;
}

.header-logo {
  height: 53px ;
  width: 208px;
  cursor: pointer;
}

.header-logo img {
  width: 100%;
  height: auto;
}
.header-profile {
  cursor: pointer;
}
.search {
  max-width: 280px;
  width: 100%;
  height: 40px;
  background: #FCFCFF;
  border: 1px solid #E6EAF5;
  border-radius: 5px;
  color: #929BBC;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 7px;
}

.search > input {
  padding: 10px 15px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;

}

.search> div {
  padding: 12px;
}

.user { 
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 9px
}
.user__img {
  width: 25px;
  height: 25px;
}

.user__img img { 
  width: 100%;
  height: auto;
}

.user__name {
  min-width: fit-content;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

section {
  margin-bottom: 55px;
  padding-left: 12px;
} 

.result-searching {
  display: flex;
  gap: 17px;
}
.result-searching__text {
  font-size: 22px;
  font-weight: 400;
  line-height: 30.8px;
}

.result-searching__text  > span:last-child {
  text-decoration: underline;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.result-searching__count {
  margin-top: 3px;
  padding: 5px 15px;
  background: #6627FF;
  color: white;
  border-radius: 5px;
  align-self: flex-start;
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
}

main {
  padding-left: 12px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 84px;
  align-items: center;

}

.ErrorMes {
  font-size: 21px;
  font-weight: bold;
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

  .result-searching {
   flex-wrap: wrap;
   gap: 5px;
  }
  
  .search {
    margin: 0;
  }

  header {
    height: 60px;
    position: sticky;
    top: 0;
    background: white;
    padding: 5px 12px;
    align-items: ce;
  }

  .header-profile {
    display: flex;
  }

  .header-search {
    display: flex;
    align-items: center;
  }

  .user {
    margin: 0;
    width: 30px;
    display: flex;
    justify-content: flex-end;
  }
  .user__name {
    display: none;
  }

  main {
    padding: 20px 12px;
  }

  .result-searching__count {
    margin-top: unset;
  }

  .result-searching__text {
    font-size: 16px;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-logo {
    height: unset;
    width: unset;
    display: flex;
    align-items: center;
  }
}



</style>