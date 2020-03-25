import { SummaryStore } from '~/store'

const fetchSummary = async () => {
  await SummaryStore.fetchSummary()
}

export default fetchSummary
