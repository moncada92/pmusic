<template lang="pug">
  #app
    img(src='https://moncada92.github.io/pmusic/dist/logo.png')
    h1 PlatziMusic
    select(v-model="selectedCountry")
      option(v-for="country in countries" v-bind:value="country.value") {{ country.name }}
    spinner(v-show="loading")
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid")

</template>

<script>

import Artist from './components/Artist.vue'
import Spinner from './components/spinner.vue'
import getArtists from './api'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [
        { name: 'Argentina', value: 'Argentina' },
        { name: 'Colombia', value: 'Colombia' },
        { name: 'España', value: 'Spain' }

      ],
      selectedCountry: 'Colombia',
      loading: true
    }
  },
  components: {
    Artist: Artist,
    Spinner: Spinner
  },
  methods: {
    refreshArtist(){
      //con este self aremos referencia de nuestro this a nuestra data accediendo al artists
      const self = this
      this.loading= true
      this.artists = []
      getArtists(this.selectedCountry)
        .then(function (artists) {
          self.artists = artists
          self.loading = false
        }) 
    }
  },
  //es lo mismo que mounted: function
  mounted() {
    this.refreshArtist()
  },
  watch: {
    selectedCountry() {
      this.refreshArtist()
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
