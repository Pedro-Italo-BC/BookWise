import dayjs from 'dayjs'

export function getYearOfDate(date: string | Date) {
  return dayjs(date).get('year')
}
