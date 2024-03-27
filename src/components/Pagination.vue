<template>
    <div class="pagination">
        <div class="arrow-left" :class="{'arrow_active': page === 1}" @click="() => page !== 1 ? $emit('callback', page - 1) : null">
            <img src="@/assets/img/arrow-left.png" alt="arrow-left">
        </div>
        <div v-if="page > 3" @click="$emit('callback', 1)">1</div>
        <div v-if="page > 3" @click="$emit('callback', page - 3)">...</div>

        <div :class="{'active': page === i}" v-for="i in totalPages" :key="i" @click="$emit('callback', i)" v-show="page + 3 > i && page - 3 < i">{{ i }}</div>

        <div v-if="totalPages > page + 3" @click="$emit('callback', page + 3)">...</div>
        <div v-if="totalPages > page + 3" @click="$emit('callback', totalPages)">{{ totalPages }}</div>
        <div class="arrow-right" :class="{'arrow_active': page === totalPages}" @click="() => page !== totalPages ? $emit('callback', page + 1) : null">
            <img src="@/assets/img/arrow-right.png" alt="arrow-right" >
        </div>
    </div>
</template>


<script setup lang="ts">
interface Props {
    page: number,
    totalPages: number,
    maxCountPage: number
} 

import { toRefs } from 'vue';

const props = defineProps<Props>()

const {page, totalPages, maxCountPage} = toRefs(props)
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #FCFCFF;
  border: 1px solid #E6EAF5;
  cursor: pointer;
}

.pagination > .active,
.pagination > .arrow_active {
  background: #F3F5F9;
}

 


</style>