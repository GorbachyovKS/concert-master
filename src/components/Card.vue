<template>
    <div class="card">
        <div class="card-img">
            <img :src="card.Poster === 'N/A' ? require('@/assets/img/placeholder-img.png') : card.Poster" alt="placeholder ">
        </div>
        <div class="card-body">
        <div class="card-body__name">
            Name: {{ card.Title }}
        </div>
        <div class="card-body__year">
            Year: {{ card.Year }}
        </div>
        <div class="card-body__imdbID">
            imgdbID: {{ card.imdbID }}
        </div>
        <div class="card-body__type">
            Type: {{ card.Type }}
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import Cards from './Cards.vue';

interface Card {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

interface Props {
    card: Card
}

const props = defineProps<Props>()

const {card} = toRefs(props)

</script>

<style scoped>
.card {
  max-width: 245px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 23px;
  cursor: pointer;
}
.card-img {
  max-width: 245px;
  width: 100%;
  height: 270px;
  line-height: 0;
  border: 1px solid #6627FF;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
}

.card-img img{
  object-fit: cover;
  object-position: center;
  width: 100%;
}
.card-body {
  padding-left: 13px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.card-body__name,
.card-body__year,
.card-body__imdbID,
.card-body__type {
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
}

@media screen and (max-width: 600px) {
    .card {
        gap: 12px;
    }
    
  .card-img{
    height: 180px;
  }

  .card-body {
    padding: 0 5px;
  }

  .card-body__name,
.card-body__year,
.card-body__imdbID,
.card-body__type {
    font-size: 14px;
    line-height: 18px;
}
}

</style>