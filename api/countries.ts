import axios from 'axios'
import { covid19ApiUri } from '~/consts'
import { Country } from '~/types/country'

export const getCountries = async (): Promise<Country[]> => {
  const res = await axios.get(`${covid19ApiUri}/countries`)
  let countries: Country[] = []
  if (res && res.data) {
    countries = res.data
  }
  return countries
}
