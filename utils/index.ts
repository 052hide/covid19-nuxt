import dayjs from '~/plugins/dayjs'

export const getNow = (format: string = 'YYYY MMM DD') => {
  return dayjs().format(format)
}
