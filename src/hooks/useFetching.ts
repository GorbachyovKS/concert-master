import { API } from "@/helpers/const"
import axios from "axios"
import { Ref, ref } from "vue"
interface Card {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}


export const useFetching = () => {
    const totalCount = ref<number>(0)
    const data = ref<Card[]>([])
    const error = ref<Error | null>(null)
    const isLoading = ref<boolean>(false)

    const fetching = async (search: Ref<string>, page: Ref<number>) => {
        try {
            data.value = []
            isLoading.value = true
            error.value = null
            const response = await axios.get(API, {
            params: {
                s: search.value,
                page: page.value
            }
            })
            if (response.data.Response === 'True') {
                totalCount.value = Number(response.data.totalResults ?? 0) 
                data.value = response.data.Search ?? []
            }
            else {
                error.value = response.data.Error
                totalCount.value = 0
            }
            
        } catch (e) {
            error.value = new Error('Ошибка при получении данных')
        } finally {
            isLoading.value = false
        }
    }

    return {
        fetching,
        isLoading,
        data,
        totalCount,
        error
    }
}