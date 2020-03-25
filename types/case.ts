import { Status } from './common'

export type Case = {
  Country: string
  Province: string
  Lat: number
  Lon: number
  Date: string
  Cases: number
  Status: Status
}
