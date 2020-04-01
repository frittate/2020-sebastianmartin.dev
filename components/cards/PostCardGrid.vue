<template>
  <div>
    <div class="mb-5">
      <p class="inline-flex text-base text-gray-500">
        filter:
      </p>
      <div v-for="tag in allTags" :key="tag.id" class="inline-flex mr-3" :class="activeFilterClass(tag)">
        <button class="p-3 text-base" @click.prevent="toggleFilter(tag)">
          #{{ tag }}
        </button>
      </div>
    </div>
    <div v-if="entries.length">
      <transition-group name="projects-grid" tag="div" class="grid grid-cols-postCardGrid gap-10 justify-center">
        <post-card v-for="entry in filtered" :key="entry.uid" :entry="entry" @sendFilter="setFilter" />
      </transition-group>
    </div>
    <div v-else>
      <p class="text-base text-white">
        Hm, seems like there is nothing here at the moment!
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import PostCard from './PostCard'
export default {
  components: {
    PostCard
  },
  props: {
    entries: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      filter: ''
    }
  },
  computed: {
    filtered () {
      if (this.filter !== '') {
        return this.entries.filter((entry) => {
          const entryTags = []
          entry.data.technologies.forEach((tech) => {
            entryTags.push(tech.technology_entry)
          })
          return entryTags.includes(this.filter)
        })
      }
      return this.entries
    },
    allTags () {
      const tags = []
      this.entries.forEach((el) => {
        el.data.technologies.forEach((tech) => {
          tags.push(tech.technology_entry)
        })
      })
      return [...new Set(tags)]
    }
  },
  methods: {
    setFilter (value) {
      this.filter = value
    },
    toggleFilter (value) {
      if (this.filter === value) {
        this.filter = ''
      } else {
        this.filter = value
      }
    },
    activeFilterClass (tag) {
      if (tag === this.filter) {
        return ['bg-white', 'text-web']
      }
      return ['bg-black', 'text-white']
    }
  }
}
</script>

<style>
.card {
  transition: all 1s;
}

.projects-grid-enter, .projects-grid-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.projects-grid-leave-active {
  position: absolute;
}
</style>
