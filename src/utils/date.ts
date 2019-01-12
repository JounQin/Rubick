import { format } from 'date-fns'

const DATE_FORMATTER = 'YYYY-MM-DD'
const DATE_TIME_FORMATTER = `${DATE_FORMATTER} HH:mm:ss`

export const formatDate = (date: string, formatter?: boolean | string) =>
  format(
    date,
    typeof formatter === 'string'
      ? formatter
      : formatter
      ? DATE_FORMATTER
      : DATE_TIME_FORMATTER,
  )
