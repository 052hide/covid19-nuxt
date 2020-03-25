import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import dayjs from '~/plugins/dayjs'
import { Country, CountyOption } from '~/types/country'
import { Countries as CountriesApi } from '~/api'

@Module({
  name: 'countries',
  namespaced: true,
  stateFactory: true
})
export default class CountriesModule extends VuexModule {
  private lastFetchDate: number = 0
  private countries: Country[] = []
  private countryOptions: CountyOption[] = []

  // @ts-ignore
  @MutationAction({
    mutate: ['countries', 'countryOptions', 'lastFetchDate'],
    rawError: true
  })
  public async fetchCountries() {
    const countries = await CountriesApi.getCountries()
    const countryOptions: CountyOption[] = []
    countries.forEach((country) => {
      countryOptions.push({
        value: country.Slug,
        label: country.Country
      })
    })
    const lastFetchDate = dayjs().unix()

    return {
      countries,
      countryOptions,
      lastFetchDate
    }
  }

  public get getCountries() {
    return this.countries
  }

  public get getCountryOptions() {
    return this.countryOptions
  }

  public get getLastFetchDate() {
    return this.lastFetchDate
  }
}
