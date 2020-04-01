<template>
  <div class="bg-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
    <div>
      <h1 class="text-4xl pb-10 uppercase">
        {{ $prismic.asText(content.title) }}
      </h1>
      <div class="grid gap-0 grid-flow-row grid-cols-1 grid-rows-1 flex-grow border border-gray-600">
        <div class="col-start-1 col-end-3 row-start-3 p-5">
          <post-card-grid :entries="projects" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import PostCardGrid from '~/components/cards/PostCardGrid'
export default {
  components: {
    PostCardGrid
  },
  async asyncData ({ $prismic, error }) {
    try {
      const projectEntries = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'project')
      )
      const staticContent = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'projects'))
      return {
        staticContent,
        projectEntries
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    content () {
      return this.staticContent.results[0].data
    },
    projects () {
      return this.projectEntries.results
    }
  },
  head () {
    return {
      title: 'Projekte - Sebastian Martin - Webdevelopment | Webdesign | IT Consulting'
    }
  }
}
</script>
