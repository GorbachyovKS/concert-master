<template>
	<div>
		<section>
			<div class="result-searching">
				<div class="result-searching__text">You searched for: <span>{{ resultSearching }}</span></div>
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
import { onMounted, watch, toRefs } from 'vue';
import Pagination from '@/components/Pagination.vue';
import Cards from '@/components/Cards.vue';
import Loader from '@/components/Loader.vue';
import { useFetching } from '@/hooks/useFetching';
import { usePagination } from '@/hooks/usePagination';

interface Props {
	search: string
}

const props = defineProps<Props>()

const {search} = toRefs(props)

const {fetching, totalCount, isLoading, data, error, resultSearching} = useFetching()
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
  fetching(search, page)
}, 500))


watch(page, () => {
  fetching(search, page)
})


onMounted(() => {
  fetching(search, page)
})
</script>

<style scoped>
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
  main {
    padding-left: unset;
  }
}

@media screen and (max-width: 600px) {
	main {
    padding: 20px 12px;
  }

  .result-searching {
   flex-wrap: wrap;
   gap: 5px;
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
}
</style>