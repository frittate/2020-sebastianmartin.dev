<template>
  <header>
    <button v-show="!expanded" class="lg:hidden z-10 fixed w-screen bg-web text-center text-3xl text-white font-bold" @click.prevent="toggleMenu">
      Menu
    </button>
    <nav class="fixed lg:absolute w-screen bg-web lg:bg-transparent lg:w-full top-0 left-0 p-8 lg:p-0 items-center lg:pl-6 h-screen lg:h-12 z-50 flex flex-col lg:flex-row justify-around lg:justify-start z-20" :class="showMenu">
      <menu-item v-for="route in routes" :key="route.id" :route="route" />
      <button class="lg:hidden text-3xl text-white font-bold px-10" @click.prevent="toggleMenu">
        &times;
      </button>
    </nav>
  </header>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
  },
  data () {
    return {
      routes: [
        {
          id: 0,
          url: '/',
          name: 'Home :: Leistungen'
        },
        {
          id: 2,
          url: 'projekte',
          name: 'Projekte :: Portfolio'
        },
        {
          id: 4,
          url: 'about',
          name: 'Kontakt :: Über mich'
        }
      ],
      expanded: false
    }
  },
  computed: {
    showMenu () {
      if (this.expanded) {
        return ['visible']
      }
      return ['invisible lg:visible']
    }
  },
  watch: {
    $route () {
      this.expanded = false
    }
  },
  methods: {
    toggleMenu () {
      this.expanded = !this.expanded
      document.body.classList.toggle('prevent-scroll')
    }
  }
}
</script>
