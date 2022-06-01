

// create an object counting the quantity of each (sectionName+" "+sectionName) in orderList
const loopOrders = (orderList) => {
  if (orderList) {
    console.log(orderList)
    const orderListCount = {}
    orderList?.forEach((order) => {
      order?.orderList?.forEach((item) => {
        const key = `${item.sectionName} ${item.variantName}`
        if (orderListCount[key]) {
          orderListCount[key] += item.quantity
        } else {
          orderListCount[key] = item.quantity
        }
      })
    })
    return orderListCount
  }

  return {}
}

export default loopOrders
