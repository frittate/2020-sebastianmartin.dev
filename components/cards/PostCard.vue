<template>
  <div class="card border flex flex-col flex-1 border-web min-h-card w-full lg:w-56">
    <!--  <p class="py-2 text-xs flex justify-center items-center">
      #{{ entry.data.category.uid }}
    </p>-->
    <div v-if="image" class="h-32 overflow-hidden mb-3">
      <img :src="image.url" alt="" srcset="">
    </div>
    <div class="content flex flex-col flex-grow">
      <h2 class="text-lg mb-5">
        {{ entry.data.project_title[0].text }}
      </h2>
      <p class="pl-2 text-xs">
        <span v-for="tech in entry.data.technologies" :key="tech.id" class="cursor-pointer hover:text-web" @click="sendFilter(tech.technology_entry)">
          #{{ tech.technology_entry }}
        </span>
      </p>
    </div>
    <nuxt-link :to="link" class="py-2 text-xs flex justify-center items-center bg-white text-black">
      Ansehen
    </nuxt-link>
  </div>
</template>

<script>

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      category: 'travel'
    }
  },
  computed: {
    link () {
      return `/projekte/${this.entry.uid}`
    },
    image () {
      if (Object.keys(this.entry.data.project_image.card).length !== 0) {
        return {
          url: this.entry.data.project_image.card.url,
          width: this.entry.data.project_image.card.dimensions.width,
          height: this.entry.data.project_image.card.dimensions.height
        }
      }
      return false
    }
  },
  methods: {
    sendFilter (tag) {
      this.$emit('sendFilter', tag)
    }
  }
}
/* {
  "id":"XoGd2hAAAB8Ai4ZW",
  "uid":"css",
  "type":"project",
  "href":"https://sebastianmartin-dev.cdn.prismic.io/api/v2/documents/search?ref=XoGl5hAAACIAi6qk&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22XoGd2hAAAB8Ai4ZW%22%29+%5D%5D",
  "tags":[],
  "first_publication_date":"2020-03-30T07:21:02+0000",
  "last_publication_date":"2020-03-30T07:21:02+0000",
  "slugs":["luisa-goellner-portfolio-seite"],
  "linked_documents":[],
  "lang":"de-de",
  "alternate_languages":[],
  "data":
    {"project_title": [
      {"type":"heading1","text":"Luisa Goellner Portfolio-Seite","spans":[]}],
    "project_link":{"link_type":"Any"},
    "technologies":[
      {"technology_entry":"HTML"},
      {"technology_entry":"CSS"},
      {"technology_entry":"VueJS"},
      {"technology_entry":"Gridsome"}],
    "project_content":
    [{"type":"paragraph","text":"Ich erzähle auch noch was über das Projekt","spans":[]}]}} */
</script>
