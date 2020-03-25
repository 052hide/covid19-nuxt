<template>
  <div v-if="isLoading" class="loading">
    <p><img src="~/assets/imgs/loading.svg" /></p>
  </div>
  <div v-else class="deaths-page">
    <section>
      <div class="deaths__top">
        <h1 class="deaths__title">Deaths</h1>
      </div>
      <div class="deaths__main">
        <covid-chart-count-by-countries
          :country-slugs="showCountries"
          status="deaths"
          :show-days="90"
        />
      </div>
      <div class="deaths__bottom">
        <div
          v-for="(country, index) in countries"
          :key="index"
          class="deaths__checkboxes"
        >
          <input
            v-model="showCountries"
            type="checkbox"
            :value="country.Slug"
          />
          <label>: {{ country.Country }}</label>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { uniq } from 'lodash'
import dayjs from '~/plugins/dayjs'
import { Country } from '~/types/country'
import { CountriesStore, CountDayOneByCountryStore } from '~/store'
import { AtomSelect } from '~/components/atoms/AtomSelect'
import { CovidChartCountByCountries } from '~/components/organisms/CovidChart'

@Component({
  middleware: ['fetchCountries', 'fetchCountDaysBaseCountry'],
  components: {
    AtomSelect,
    CovidChartCountByCountries
  }
})
export default class index extends Vue {
  isLoading: boolean = true
  showCountries: string[] = []

  get countries(): Country[] {
    return CountriesStore.getCountries
  }

  async mounted() {
    let countries: string[] = ['us']
    if (process.browser) {
      const lsCounties = localStorage.getItem('countries')
      if (lsCounties) {
        countries = lsCounties.split(',')
      }
    }
    this.showCountries = uniq(countries)
    await CountDayOneByCountryStore.fetchCountDayOneByCountry(
      this.showCountries
    )
    this.isLoading = false
  }

  async fetchDaysCountCountries() {
    let isFetch = false
    if (CountDayOneByCountryStore.getLastFetchDate < dayjs().unix() - 600) {
      isFetch = true
    } else {
      this.showCountries.some((country) => {
        if (!CountDayOneByCountryStore.getCountDayOneByCountries[country]) {
          isFetch = true
          return true
        }
      })
    }
    if (isFetch) {
      await CountDayOneByCountryStore.fetchCountDayOneByCountry(
        this.showCountries
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  @apply flex justify-center items-center w-full;
  height: calc(100vh - 100px);
  p {
    @apply block w-full;
    max-width: 320px;
  }
}
.deaths {
  &__top {
    @apply flex justify-between items-end mx-2 my-4;
  }
  &__title {
    @apply m-0 text-lg font-bold;
  }
  &__date {
    @apply text-sm;
  }
  &__bottom {
    @apply overflow-y-auto mx-4 mt-8;
    height: calc(100vh - 120px);
    @screen md {
      max-height: 600px;
    }
  }
  &__checkboxes {
    @apply flex justify-start items-center;
    input {
      @apply block;
    }
    label {
      @apply block;
    }
  }
}
</style>
