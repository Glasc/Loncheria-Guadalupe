const stringToDate = (date: string) => {
  let year = date.substring(4, 8)
  let month = date.substring(2, 4)
  let day = date.substring(0, 2)
  return `${day}/${month}/${year}`
}
export default stringToDate
