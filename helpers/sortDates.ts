const sortDates = (dates: string[]) => {
  const result = dates.sort(function(a, b){
    var aa = a.split('/').reverse().join(),
        bb = b.split('/').reverse().join();
    return aa < bb ? -1 : (aa > bb ? 1 : 0);
  });
  return result
}

export default sortDates
