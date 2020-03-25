import { CountriesStore } from '~/store'

const fetchCountries = async () => {
  await CountriesStore.fetchCountries()
}

export default fetchCountries
