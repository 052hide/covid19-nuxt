import { Case } from './case'

export type CountDayCase = {
  confirmed: number
  recovered: number
  deaths: number
}

export type CountDay = {
  date: Case['Date']
  case: CountDayCase
}

export type CountDayOneByCountry = {
  [country: string]: CountDay[]
}
