import { baseCountry } from '~/consts'
import { getNowUnixtime } from '~/utils'
import { CountDayOneByCountryStore } from '~/store'

const fetchCountDaysBaseCountry = async () => {
  const duration = 600 // 10 min
  if (
    CountDayOneByCountryStore.getLastFetchDate < getNowUnixtime() - duration ||
    !CountDayOneByCountryStore.getCountDayOneByCountries[baseCountry]
  ) {
    await CountDayOneByCountryStore.fetchCountDayOneByCountry([baseCountry])
  }
}

export default fetchCountDaysBaseCountry
