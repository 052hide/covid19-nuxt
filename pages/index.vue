<template>
  <div v-if="isLoading" class="loading">
    <p><img src="~/assets/imgs/loading.svg" /></p>
  </div>
  <div v-else class="page-top">
    <section class="top">
      <h1 class="top__title">Today's Summary</h1>
      <p v-if="date" class="top__date">
        {{ date }}
      </p>
    </section>
    <section v-if="summary" class="main">
      <covid-chart-summary
        :summary="summary"
        :show-count="showCount"
        class="main__chart"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Summary } from 'types/summary'
import { getNow } from '~/utils'
import { SummaryStore } from '~/store'
import { CovidChartSummary } from '~/components/organisms/CovidChart'

@Component({
  middleware: ['fetchCountries', 'fetchSummary'],
  components: {
    CovidChartSummary
  }
})
export default class index extends Vue {
  readonly showCount = 50
  isLoading: boolean = true

  get date(): string {
    return getNow()
  }

  get summary(): Summary | null {
    return SummaryStore.getSummary
  }

  mounted() {
    this.init()
  }

  init() {
    this.isLoading = false
  }
}
</script>
