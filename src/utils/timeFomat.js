import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

register('ko', koLocale)

function parseTime(date) {
  return format(date, 'ko')
}

// const dateIndex = 1

function convertTimeFormat(dateTime) {
  const dateFormat = dayjs.utc(dateTime.substring(0, 23)).format()

  // const dateTimeParts = dateTime.split(/[- : T .]/).slice(0, -1)
  // dateTimeParts[dateIndex]--
  // return parseTime(new Date(...dateTimeParts))
  return parseTime(new Date(dateFormat))
}

export default convertTimeFormat;
