<template>
	    <header>
		<div class="header-logo">
			<img src="@/assets/img/logo.svg" alt="logo">
		</div>
		<div class="header-search">
			<div class="search">
			<input type="text" :value="search" @input="(event: Event) => $emit('update', (event.target as HTMLInputElement).value)" placeholder="Batman">
			<div>
				<img src="@/assets/img/search.png" alt="search">
			</div>
			</div>
		</div>
		<div class="header-profile">
			<div class="user"> 
			<div class="user__img">
				<img src="@/assets/img/user.png" alt="default-user">
			</div>
			<div class="user__name">Your Name</div>
			</div>
		</div>
		</header>
</template>

<script setup lang="ts">
import { toRefs } from "vue"

interface Props {
	search: string
}

const props = defineProps<Props>()

const {search} = toRefs(props)
</script>

<style scoped>
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

@media screen and (max-width: 600px) {
  
  .search {
    margin: 0;
  }

  header {
    height: 60px;
    position: sticky;
    top: 0;
    background: white;
    padding: 5px 12px;
    align-items: center;
	z-index: 100;
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

  .header-logo {
    height: unset;
    width: unset;
    display: flex;
    align-items: center;
  }
}
</style>