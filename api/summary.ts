import axios from 'axios'
import { covid19ApiUri } from '~/consts'
import { Summary } from '~/types/summary'

export const GetSummary = async (): Promise<Summary | null> => {
  const res = await axios.get(`${covid19ApiUri}/summary`)
  let summary: Summary | null = null
  if (res && res.data) {
    if (typeof res.data === 'string') {
      const strSummary = res.data
      summary = JSON.parse(strSummary.replace(/\\/g, ''))
    } else {
      summary = res.data
    }
  }
  return summary
}
