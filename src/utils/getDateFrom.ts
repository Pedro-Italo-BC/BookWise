import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
export function getDateFrom(date: string | Date) {
  dayjs.extend(relativeTime)
  dayjs.locale('pt-br')
  const newDate = dayjs(date).from(new Date())
  return newDate
}
