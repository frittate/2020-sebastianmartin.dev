<template>
  <div>
    <div class="bg-white text-black lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <article id="content" class="w-full overflow-x-hidden lg:max-w-2xl mx-auto">
        <nuxt-link to="/projekte" class="text-xs text-black px-2">
          &larr; zurück zu allen Projekten
        </nuxt-link>
        <header>
          <div class="px-2 pt-5 pb-2">
            <p v-for="tech in project.technologies" :key="tech.id" class="inline-flex bg-web text-white text-xs px-2 text-center py-2 mr-3">
              #{{ tech.technology_entry }}
            </p>
          </div>
          <h1 class="text-4xl mb-4 uppercase px-2">
            {{ $prismic.asText(project.project_title) }}
          </h1>
          <div class="mb-8 px-2">
            <time :datetime="meta.date" class="text-gray-600 text-base">
              {{ formatDate (meta.date) }}
            </time>
            <a v-show="project.project_link.link_type === 'url'" :href="project.project_link.url" target="_blank" rel="noopener noreferrer" class="text-base text-web">
              &#8608; dieses Projekt öffnen
            </a>
          </div>
          <div v-if="Object.keys(project.project_image.card).length" class="mb-16 border border-gray-600">
            <img :src="project.project_image.url" alt="">
          </div>
        </header>
        <main>
          <prismic-rich-text class="textslice" :field="project.project_content" />
        </main>
        <button class="text-base text-black mt-16 px-2" @click.prevent="scrollToTop">
          &uarr; scroll to top
        </button>
      </article>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from '~/utils/textTools'

export default {
  components: {
    // SlicesBlock
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      // Query to get project content
      const project = (await $prismic.api.getByUID('project', params.uid, { lang: 'de-DE' }))
      // Returns data to be used in template
      return {
        project: project.data,
        slices: project.data.project_content,
        meta: {
          date: project.last_publication_date,
          language: project.lang,
          uid: project.uid
        }
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    formatDate (date) {
      return dateFormatter(date)
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  head () {
    return {
      title: `${this.project.project_title} - Sebastian Martin Webdevelopment | Projekte`
    }
  }
}
</script>

<style>
 #content figure {
   @apply border border-gray-600;
 }
</style>
