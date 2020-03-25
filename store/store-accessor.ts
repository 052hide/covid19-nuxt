import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Countries from './countries'
import Summary from './summary'
import CountDayOneByCountry from './countDayOneByCountry'

let CountriesStore: Countries // eslint-disable-line
let SummaryStore: Summary // eslint-disable-line
let CountDayOneByCountryStore: CountDayOneByCountry // eslint-disable-line

const initialiseStores = (store: Store<any>): void => {
  CountriesStore = getModule(Countries, store)
  SummaryStore = getModule(Summary, store)
  CountDayOneByCountryStore = getModule(CountDayOneByCountry, store)
}

export {
  initialiseStores,
  CountriesStore,
  SummaryStore,
  CountDayOneByCountryStore
}
