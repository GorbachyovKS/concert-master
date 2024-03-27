import { Ref, computed } from "@vue/reactivity"
import { ref } from "vue"

 export const usePagination = (totalCount: Ref<number>) => {
    const page = ref<number>(1)
    const maxCountPage = ref<number>(10)
    const totalPages = computed(() => {
        return Math.ceil(totalCount.value / maxCountPage.value)
    })
    
    const setPage = (newPage: number) => page.value = newPage


    return {
        page,
        totalPages,
        setPage,
        maxCountPage
    }
 }