<template>
  <div class="bg-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
    <div>
      <h1 class="text-4xl pb-10 uppercase">
        {{ $prismic.asText(content.title_main) }}
      </h1>

      <div class="flex flex-col">
        <div class="text-lg">
          <prismic-rich-text class="textslice" :field="content.content_main" />
        </div>
      </div>

      <div class="flex flex-col">
        <div v-for="service in content.services" :key="service.id" class="border border-gray-600 mb-6 pt-3">
          <h3> {{ $prismic.asText(service.service_title) }} </h3>
          <div>
            <prismic-rich-text class="textslice" :field="service.service_content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import Logo from '~/components/Logo.vue'
import { dateFormatter } from '~/utils/textTools'
/* import CategoryTag from '~/components/global/CategoryTag'
import ReadOnButton from '~/components/global/ReadOnButton'
import PostCardGrid from '~/components/cards/PostCardGrid' */

export default {
  name: 'Index',
  components: {
    // Logo
    /*  CategoryTag,
    ReadOnButton,
    PostCardGrid */
  },
  async asyncData ({ $prismic, error }) {
    try {
      // Query to get the home page content
      const staticContent = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'home'))
      return {
        staticContent
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    content () {
      return this.staticContent.results[0].data
    }
  },
  methods: {
    formatDate (date) {
      return dateFormatter(date)
    }
  },
  head () {
    return {
      title: 'Sebastian Martin -- Webdevelopment | Webdesign | IT Consulting'
    }
  }
}
</script>
