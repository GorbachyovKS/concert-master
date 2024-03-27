<template>
    <div class="cards">
        <Card v-for="(card, index) in cards" :key="index" :card="card"/>
      </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Card from './Card.vue';

interface Card {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

interface Props {
    cards: Card[]
}

const props = defineProps<Props>()

const {cards} = toRefs(props)

</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 53px;
  column-gap: 56px;
}

@media screen and (max-width: 1100px) {
    .cards {
        grid-template-columns: repeat(3, 1fr);
        row-gap: 33px;
        column-gap: 46px;
    }
}

@media screen and (max-width: 600px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
        row-gap: 20px;
        column-gap: 20px;
    }
}


</style>