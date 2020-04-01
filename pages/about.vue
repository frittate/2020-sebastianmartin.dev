<template>
  <div id="about" class="bg-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
    <div>
      <h1 class="text-4xl pb-10 uppercase">
        {{ $prismic.asText(doc.title) }}
      </h1>

      <div class="flex flex-col">
        <div class="text-lg">
          <prismic-rich-text class="textslice" :field="doc.content" />
        </div>
      </div>

      <div class="flex flex-col">
        <h3>Kontaktier mich per</h3>
        <div
          v-for="link in doc.links"
          :key="link.id"
          class="py-2 px-2 bg-white text-web text-base max-w-xs mb-4 hover:bg-light flex items-stretch"
        >
          <a
            v-if="link.link_href.link_type === 'Web'"
            :href="link.link_href.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-grow"
          >
            &rarr;&ensp;{{ link.link_name }}
          </a>

          <a
            v-else
            :mailto="link.link_href.url"
            class="flex-grow"
          >
            &rarr;&ensp;{{ link.link_name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'About',
  async asyncData ({ $prismic, error }) {
    try {
      const doc = (await $prismic.api.getSingle('about')).data
      return {
        doc
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head () {
    return {
      title: 'Über mich - Sebastian Martin - Webdevelopment | Webdesign | IT Consulting'
    }
  }
}
</script>

<style>
  #about img {
    @apply max-w-2xl mb-10;
  }
</style>
