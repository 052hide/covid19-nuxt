<template>
  <div class="covid-chart-count-by-countries">
    <chart-line
      :chart-data="countDayOneByCountry"
      :options="chartOption"
      :styles="chartStyles"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js'
import dayjs from '~/plugins/dayjs'
import { CountDay } from '~/types/countDayOneByCountry'
import { chartColors } from '~/consts'
import { getThinnedArray, getCountryLabel } from '~/utils'
import { CountriesStore, CountDayOneByCountryStore } from '~/store'

import { ChartLine } from '~/components/molecules/Chart'

@Component({
  components: {
    ChartLine
  }
})
export default class index extends Vue {
  @Prop({ default: () => [] }) countrySlugs!: string[]
  @Prop({ default: 'confirmed' }) status!: 'confirmed' | 'recovered' | 'deaths'
  @Prop({ default: 60 }) showDays!: number
  @Watch('countrySlugs')
  async watchCountDays() {
    if (process.browser) {
      localStorage.setItem('countries', this.countrySlugs.join(','))
    }
    await this.getChartData()
  }

  countDayOneByCountry: ChartData = {}

  async mounted() {
    await this.getChartData()
  }

  async getChartData(): Promise<void> {
    await this.getCountDays()
    await CountDayOneByCountryStore.fetchCountDayOneByCountry(
      this.countrySlugs.concat('us')
    )

    const baseCountryData = getThinnedArray(
      CountDayOneByCountryStore.getCountDayOneByCountries.us,
      5,
      true,
      true
    )

    const labels: string[] = []
    baseCountryData.forEach((item) => {
      labels.push(dayjs(item.date).format('YYYY MMM DD'))
    })

    const datasets: ChartDataSets[] = []

    this.countrySlugs.forEach((slug, i) => {
      const days = JSON.parse(
        JSON.stringify(CountDayOneByCountryStore.getCountDayOneByCountries)
      )[slug] as CountDay[]
      const data: number[] = []
      labels.forEach((label) => {
        days.some((day, j) => {
          if (
            label ===
            dayjs(day.date)
              .locale('en')
              .format('YYYY MMM DD')
          ) {
            data.push(day.case[this.status])
            days.splice(j, 1)
            return true
          }
        })
      })
      datasets.push({
        label: getCountryLabel(CountriesStore.getCountryOptions, slug),
        backgroundColor: chartColors.bg[i % chartColors.bg.length],
        borderColor: chartColors.border[i % chartColors.border.length],
        fill: false,
        data
      })
    })

    this.countDayOneByCountry = {
      labels,
      datasets
    }
  }

  async getCountDays() {
    let isFetch = false
    this.countrySlugs.some((slug) => {
      if (!CountDayOneByCountryStore.getCountDayOneByCountries[slug]) {
        isFetch = true
        return true
      }
    })
    if (isFetch) {
      await CountDayOneByCountryStore.fetchCountDayOneByCountry(
        this.countrySlugs.concat(['us'])
      )
    }
  }

  chartOption: ChartOptions = {
    maintainAspectRatio: false,
    tooltips: {
      intersect: false,
      mode: 'index'
    }
  }

  chartStyles = {
    height: '100%',
    width: '100%'
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';

.loading {
  @apply flex justify-center items-center w-full;
  height: calc(100vh - 8rem);
  @screen md {
    max-height: 600px;
  }
  p {
    @apply block w-full;
    max-width: 320px;
  }
}
</style>
