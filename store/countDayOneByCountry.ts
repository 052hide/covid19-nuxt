import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import dayjs from '~/plugins/dayjs'
import { CountDay, CountDayOneByCountry } from '~/types/countDayOneByCountry'
import { ByCountryTotal as ByCountryTotalApi } from '~/api'

@Module({
  name: 'countDayOneByCountry',
  namespaced: true,
  stateFactory: true
})
export default class CountDayOneByCountriesModule extends VuexModule {
  private lastFetchDate: number = 0
  private countDayOneByCountries: CountDayOneByCountry = {}

  // @ts-ignore
  @MutationAction({
    mutate: ['countDayOneByCountries', 'lastFetchDate'],
    rawError: true
  })
  public async fetchCountDayOneByCountry(countrySlug: string) {
    const confirmedCases = await ByCountryTotalApi.getByCountryTotal(
      countrySlug,
      'confirmed'
    )
    const recoveredCases = await ByCountryTotalApi.getByCountryTotal(
      countrySlug,
      'recovered'
    )
    const deathsCases = await ByCountryTotalApi.getByCountryTotal(
      countrySlug,
      'deaths'
    )
    const days: CountDayOneByCountry['days'] = []
    confirmedCases.forEach((confirmedCase) => {
      const date = confirmedCase.Date
      const confirmed = confirmedCase.Cases
      let recovered = 0
      recoveredCases.some((recoveredCase, index) => {
        if (recoveredCase.Date === date) {
          recovered = recoveredCase.Cases
          recoveredCases.splice(index, 1)
          return true
        }
      })
      let deaths = 0
      deathsCases.some((deathsCase, index) => {
        if (deathsCase.Date === date) {
          deaths = deathsCase.Cases
          deathsCases.splice(index, 1)
          return true
        }
      })
      const day: CountDay = {
        date,
        case: {
          confirmed,
          recovered,
          deaths
        }
      }
      days.push(day)
    })
    const lastFetchDate = dayjs().unix()
    const countDayOneByCountries = this.getCountDayOneByCountries || {}
    countDayOneByCountries[countrySlug] = days

    return {
      countDayOneByCountries,
      lastFetchDate
    }
  }

  public get getCountDayOneByCountries() {
    return this.countDayOneByCountries
  }

  public get getLastFetchDate() {
    return this.lastFetchDate
  }
}
