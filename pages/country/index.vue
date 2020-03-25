<template>
  <div v-if="isLoading" class="loading">
    <p><img src="~/assets/imgs/loading.svg" /></p>
  </div>
  <div v-else class="page-country">
    <section class="top">
      <h1 class="top__label">Country:</h1>
      <atom-select
        v-model="country"
        theme="secondary"
        size="full"
        :items="countryOptions"
        :selected="country"
        class="top__select"
        @input="setCountry()"
      />
    </section>
    <div class="main">
      <covid-chart-count-by-country :country-slug="country" :show-days="90" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { CountyOption } from '~/types/country'
import { CountriesStore, CountDayOneByCountryStore } from '~/store'
import { AtomSelect } from '~/components/atoms/AtomSelect'
import { CovidChartCountByCountry } from '~/components/organisms/CovidChart'

@Component({
  middleware: ['fetchCountries'],
  components: {
    AtomSelect,
    CovidChartCountByCountry
  }
})
export default class index extends Vue {
  isLoading: boolean = true
  country: string = ''

  get countryOptions(): CountyOption[] {
    return CountriesStore.getCountryOptions
  }

  async mounted() {
    if (process.browser) {
      this.country = localStorage.getItem('country') || ''
    }
    if (!this.country) {
      this.country = 'china'
    }

    await CountDayOneByCountryStore.fetchCountDayOneByCountry([this.country])
    this.isLoading = false
  }

  setCountry() {
    if (process.browser) {
      localStorage.setItem('country', this.country)
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

.country {
  &__top {
    @apply flex-row justify-between items-center mx-2;
  }
  &__title {
    @apply m-0 text-lg font-bold;
  }
  &__date {
    @apply text-sm mb-2;
  }
  &__select {
    @apply mx-2 my-4 w-full;
  }
}

.title {
  &__wrapper {
    @apply flex justify-between items-center;
    width: 100%;
  }
}
</style>
