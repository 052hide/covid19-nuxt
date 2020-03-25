import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { uniq } from 'lodash'
import dayjs from '~/plugins/dayjs'
import { CountDay, CountDayOneByCountry } from '~/types/countDayOneByCountry'
import { baseCountry } from '~/consts'
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
  public async fetchCountDayOneByCountry(countrySlugs: string[]) {
    const countries = uniq(countrySlugs.concat(baseCountry))
    const countDayOneByCountries = this.getCountDayOneByCountries || {}
    await Promise.all(
      countries.map(async (slug) => {
        const confirmedCases = await ByCountryTotalApi.getByCountryTotal(
          slug,
          'confirmed'
        )
        const recoveredCases = await ByCountryTotalApi.getByCountryTotal(
          slug,
          'recovered'
        )
        const deathsCases = await ByCountryTotalApi.getByCountryTotal(
          slug,
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
        countDayOneByCountries[slug] = days
      })
    )

    const lastFetchDate = dayjs().unix()

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
