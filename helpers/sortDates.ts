const sortDates = (dates: string[]) => {
  return dates.sort((a: string, b: string) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })
}

export default sortDates
