import dayjs from '~/plugins/dayjs'
import { CountyOption } from '~/types/country'

export const getNowUnixtime = (): number => {
  return dayjs().unix()
}

export const getNow = (format: string = 'YYYY MMM DD'): string => {
  return dayjs().format(format)
}

export const getThinnedArray = <T>(
  array: T[],
  divideBy: number,
  withFirst: boolean,
  widthEnd: boolean
): T[] => {
  const res = []
  if (array && array.length > 0) {
    if (withFirst) {
      res.push(array[0])
    }
    for (let i = 1; i < array.length; i++) {
      if (i % divideBy === 0) {
        res.push(array[i])
      } else if (i === array.length - 1 && widthEnd) {
        res.push(array[i])
      }
    }
  }
  return res
}

export const getCountryLabel = (
  countries: CountyOption[],
  slug: string
): string => {
  let res = slug
  countries.some((country) => {
    if (slug === country.value) {
      res = country.label
      return true
    }
  })
  return res
}
