import dayjs from '~/plugins/dayjs'

export const getNow = (format: string = 'YYYY MMM DD') => {
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
