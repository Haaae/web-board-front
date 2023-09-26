import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

register('ko', koLocale)

function parseTime(date) {
  return format(date, 'ko')
}

function convertTimeFormat(dateTime) {
  const dateFormat = dayjs.utc(dateTime.substring(0, 23)).format()

  return parseTime(new Date(dateFormat))
}

export default convertTimeFormat;
