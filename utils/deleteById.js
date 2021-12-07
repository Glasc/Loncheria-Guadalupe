export const deleteById = (id, obj) => {
  const objCopy = { ...obj }
  delete objCopy.byId[id]
  objCopy.allIds = objCopy.allIds.filter(
    (currId) => currId.toString() !== id.toString()
  )
  return objCopy
}

export default deleteById
