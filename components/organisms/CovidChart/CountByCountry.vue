<template>
  <div class="covid-chart-count-by-country">
    <chart-line
      :chart-data="chartData"
      :options="chartOption"
      :styles="chartStyles"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { ChartData, ChartOptions, ChartDataSets } from 'chart.js'
import { CountDay } from '~/types/countDayOneByCountry'
import dayjs from '~/plugins/dayjs'
import { getThinnedArray } from '~/utils'
import { CountDayOneByCountryStore } from '~/store'
import { ChartLine } from '~/components/molecules/Chart'

@Component({
  components: {
    ChartLine
  }
})
export default class index extends Vue {
  @Prop() countrySlug!: string
  @Prop({ default: 60 }) showDays!: number
  @Watch('countrySlug')
  async watchCountDays() {
    this.getCountDays()
  }

  countDays: CountDay[] = []

  get chartData(): ChartData {
    const countDays = getThinnedArray(this.countDays, 5, true, true)

    const labels: string[] = []
    countDays.forEach((item) => {
      labels.push(dayjs(item.date).format('YYYY MMM DD'))
    })

    const confirmedData: number[] = []
    countDays.forEach((item) => {
      confirmedData.push(item.case.confirmed)
    })
    const confirmed: ChartDataSets = {
      label: 'Confirmed',
      backgroundColor: 'rgba(239, 101, 65, 0.7)',
      borderColor: 'rgba(239, 101, 65, 1)',
      fill: false,
      data: confirmedData
    }

    const recoveredData: number[] = []
    countDays.forEach((item) => {
      recoveredData.push(item.case.recovered)
    })
    const recovered: ChartDataSets = {
      label: 'Recovered',
      backgroundColor: 'rgba(163, 211, 161, 0.7)',
      borderColor: 'rgba(163, 211, 161, 1)',
      fill: false,
      data: recoveredData
    }

    const deathsData: number[] = []
    countDays.forEach((item) => {
      deathsData.push(item.case.deaths)
    })
    const deaths: ChartDataSets = {
      label: 'Deaths',
      backgroundColor: 'rgba(153, 153, 153, 0.7)',
      borderColor: 'rgba(153, 153, 153, 1)',
      fill: false,
      data: deathsData
    }
    return {
      labels,
      datasets: [recovered, deaths, confirmed]
    }
  }

  async mounted() {
    await this.getCountDays()
  }

  async getCountDays(): Promise<void> {
    if (
      !CountDayOneByCountryStore.getCountDayOneByCountries[this.countrySlug]
    ) {
      await CountDayOneByCountryStore.fetchCountDayOneByCountry(this.countrySlug)
    }
    this.countDays = CountDayOneByCountryStore.getCountDayOneByCountries[this.countrySlug]
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
</style>
