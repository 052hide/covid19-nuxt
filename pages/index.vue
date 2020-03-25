<template>
  <div class="page-top"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import {
  Countries,
  DayOne,
  DayOneTotal,
  ByCountry,
  ByCountryTotal,
  Stats,
  Summary
} from '~/api'

@Component
export default class index extends Vue {
  async mounted() {
    const countries = await Countries.getCountries()
    const dayOne = await DayOne.getDayOne('us', 'confirmed')
    const dayOneTotal = await DayOneTotal.getDayOneTotal('us', 'confirmed')
    const byCountry = await ByCountry.getByCountry('us', 'confirmed')
    const byCountryTotal = await ByCountryTotal.getByCountryTotal(
      'us',
      'confirmed'
    )
    const stats = await Stats.getStats()
    const summary = await Summary.getSummary()

    console.log({
      countries,
      dayOne,
      dayOneTotal,
      byCountry,
      byCountryTotal,
      stats,
      summary
    })
  }
}
</script>
