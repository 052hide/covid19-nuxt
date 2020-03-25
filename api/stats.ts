import axios from 'axios'
import { covid19ApiUri } from '~/consts'
import { Stats } from '~/types/stats'

export const getStats = async (): Promise<Stats | null> => {
  const res = await axios.get(`${covid19ApiUri}/stats`)
  let stats: Stats | null = null
  if (res && res.data) {
    if (typeof res.data === 'string') {
      const strSummary = res.data
      stats = JSON.parse(strSummary.replace(/\\/g, ''))
    } else {
      stats = res.data
    }
  }
  return stats
}
