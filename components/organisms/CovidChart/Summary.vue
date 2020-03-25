<template>
  <div class="covid-chart-summary" :style="styleVariables">
    <chart-bar
      v-if="showChart"
      :chart-data="chartData"
      :options="chartOption"
      :styles="chartStyles"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'
import { Summary } from '~/types/summary'
import { ChartBar } from '~/components/molecules/Chart'

@Component({
  components: {
    ChartBar
  }
})
export default class index extends Vue {
  @Prop() summary!: Summary
  @Prop({ default: 300 }) showCount!: number

  showChart = true

  @Watch('chartSizeClass')
  watchChartSizeClass() {
    this.showChart = false
    this.$nextTick(() => {
      this.showChart = true
    })
  }

  get styleVariables() {
    return {
      '--chart-width': `${this.showCount}rem`
    }
  }

  get chartData(): ChartData {
    const labels = this.summary.Countries.slice(0, this.showCount).map(
      (item) => item.Country
    )
    const totalRecovered = {
      label: 'Recovered',
      backgroundColor: 'rgba(163, 211, 161, 0.7)',
      hoverBackgroundColor: 'rgba(163, 211, 161, 1)',
      data: this.summary.Countries.slice(0, this.showCount).map((item) =>
        Number(item.TotalRecovered)
      )
    }
    const totalDeaths = {
      label: 'Deaths',
      backgroundColor: 'rgba(153, 153, 153, 0.7)',
      hoverBackgroundColor: 'rgba(153, 153, 153, 1)',
      data: this.summary.Countries.slice(0, this.showCount).map((item) =>
        Number(item.TotalDeaths)
      )
    }
    const other = {
      label: 'Confirmed',
      backgroundColor: 'rgba(239, 101, 65, 0.7)',
      hoverBackgroundColor: 'rgba(239, 101, 65, 1)',
      data: this.summary.Countries.slice(0, this.showCount).map(
        (item) =>
          Number(item.TotalConfirmed) -
          Number(item.TotalRecovered) -
          Number(item.TotalDeaths)
      )
    }
    return {
      labels,
      datasets: [totalRecovered, totalDeaths, other]
    }
  }

  chartOption: ChartOptions = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            autoSkip: false
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'index',
      custom(tooltip: any) {
        if (!tooltip) return
        tooltip.displayColors = false
      },
      callbacks: {
        // @ts-ignore
        label(tooltipItems: any, data: any) {
          if (!(tooltipItems && data)) return
          if (tooltipItems.datasetIndex > 0) return
          const totalRecovered: number[] = data.datasets[0].data
          const totalDeaths: number[] = data.datasets[1].data
          const other: number[] = data.datasets[2].data
          const labelTexts = [
            `Total: ${totalRecovered[tooltipItems.index] +
              totalDeaths[tooltipItems.index] +
              other[tooltipItems.index]}`,
            `Deaths: ${totalDeaths[tooltipItems.index]} (${Math.round(
              (totalDeaths[tooltipItems.index] /
                (totalRecovered[tooltipItems.index] +
                  totalDeaths[tooltipItems.index] +
                  other[tooltipItems.index])) *
                100 *
                10
            ) / 10}%)`,
            `Recovered: ${totalRecovered[tooltipItems.index]} (${Math.round(
              (totalRecovered[tooltipItems.index] /
                (totalRecovered[tooltipItems.index] +
                  totalDeaths[tooltipItems.index] +
                  other[tooltipItems.index])) *
                100 *
                10
            ) / 10}%)`
          ]
          return labelTexts
        }
      }
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
