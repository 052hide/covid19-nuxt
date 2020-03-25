<template>
  <div class="page-top"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { GetSummary } from '~/api/summary'

@Component
export default class index extends Vue {
  async mounted() {
    const summary = await GetSummary()
    console.log(summary)
  }
}
</script>
