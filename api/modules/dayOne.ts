import axios from 'axios'
import { covid19ApiUri } from '~/consts'
import { Status } from '~/types/common'
import { Case } from '~/types/case'

export const getDayOne = async (
  country: string,
  status: Status
): Promise<Case[]> => {
  const res = await axios.get(
    `${covid19ApiUri}/dayone/country/${country}/status/${status}`
  )
  let cases: Case[] = []
  if (res && res.data) {
    cases = res.data
  }
  return cases
}
