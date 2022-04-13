<template>
   <nav class="pagination" role="navigation" aria-label="Pagination">

     <a class="pagination-previous" @click="previous(currentPage)">Anterior</a>

     <ul class="pagination-list">
       <li>
         <a class="pagination-link is-current">{{ currentPage }} de {{ pages.pages }}</a>
       </li>
     </ul>
      <a class="pagination-next" @click="next(currentPage)"> Siguiente </a>
   </nav>
</template>

<script>
import { onMounted, computed } from 'vue'
import {useStore} from 'vuex'

export default {
    setup() {
        const store = useStore()

        const pages = computed(()=>{
            return store.state.pages
        })
        
        const currentPage = computed(()=>{
            return store.state.page
        })

        const next = ((currentPage) => {
            store.dispatch('SetPage', currentPage+1)
        })

        const previous = ((currentPage) => {
            store.dispatch('SetPage', currentPage-1)
        })
        console.log(currentPage.value)
        return {
            pages,
            currentPage,
            next,
            previous
        }
    }
}
</script>

<style>

</style>