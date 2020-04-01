<template>
  <nuxt-link
    :to="link"
    class="text-3xl lg:text-lg text-white font-bold opacity-50 lg:mr-6 lg:last:ml-auto"
  >
    {{ route.name }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    route: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    link () {
      if (this.route.url !== '/') {
        return `/${this.route.url}/`
      }
      return '/'
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  opacity: 1;
}
</style>
