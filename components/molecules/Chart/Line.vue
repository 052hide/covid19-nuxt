<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import Chart from 'chart.js'
import { Line, mixins as VueChartMixins } from 'vue-chartjs'

const reactiveProp = VueChartMixins.reactiveProp

@Component
export default class index extends mixins(Line, reactiveProp) {
  // @ts-ignore
  @Prop() chartData: Chart.ChartData
  // @ts-ignore
  @Prop() options: Chart.ChartOptions
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
