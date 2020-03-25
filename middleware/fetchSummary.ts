import { getNowUnixtime } from '~/utils'
import { SummaryStore } from '~/store'

const fetchSummary = async () => {
  const durationSec = 600 // 10 min
  if (SummaryStore.getLastFetchDate < getNowUnixtime() - durationSec) {
    await SummaryStore.fetchSummary()
  }
}

export default fetchSummary
