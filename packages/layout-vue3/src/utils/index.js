export const clapTree = (menuList, mapKey = 'id') => {
  const resMap = new Map()
  const recursion = (menuList, parent) => {
    for (const node of menuList) {
      const tempKey = node[mapKey]
      if (tempKey) {
        resMap.set(
          tempKey,
          Object.assign(node, { pid: parent ? parent.id : undefined })
        )
      }
      recursion(node.children, node)
    }
  }
  recursion(menuList, undefined)
  return resMap
}
export const computedRootNode = (curId, menuMap) => {
  let topLevelId = ''
  const recursion = (id) => {
    const { pid } = menuMap.get(id)
    if (pid) {
      const { id } = menuMap.get(pid)
      recursion(id)
    } else {
      topLevelId = id
    }
  }
  recursion(curId)
  return menuMap.get(topLevelId)
}
