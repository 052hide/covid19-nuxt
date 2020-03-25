import { getNowUnixtime } from '~/utils'
import { CountriesStore } from '~/store'

const fetchCountries = async () => {
  const durationSec = 259200 // 3 days
  if (CountriesStore.getLastFetchDate < getNowUnixtime() - durationSec) {
    await CountriesStore.fetchCountries()
  }
}

export default fetchCountries
