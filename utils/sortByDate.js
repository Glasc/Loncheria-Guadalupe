import { format, compareDesc } from 'date-fns'

export const sortByDate = (array) => {
  if (!array) return
  const sorted = array.sort(function (a, b) {
    return b.dateFns - a.dateFns
  })
  return sorted
}

export default sortByDate
