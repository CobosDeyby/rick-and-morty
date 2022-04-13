<template>
    <section>
        <div class="characters">
            <div class="characters__item" v-for="character in characters" :key="character.id">
                <CardCharacter :character="character" />
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, computed } from 'vue'
import {useStore} from 'vuex'
import CardCharacter from '@/components/CardCharacter'

export default {
    components: {
        CardCharacter
    },
    setup(){
        const store = useStore()
        const page = computed(()=>{
            return store.state.page
        })
        const characters = computed(()=>{
            return store.state.charactersFilter
        })

        onMounted(()=>{
            store.dispatch('getCharacters', page.value)
        })
        
        return {
            characters
        }
    }
}
</script>
<style lang="scss">
.characters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin: 3rem 0;
}
</style>