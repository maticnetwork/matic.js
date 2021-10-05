function getContentFromXmlNode(src, tag, prevResult = []) {
  let startIndex = src.indexOf(`<${tag}`)
  if (startIndex < 0) {
    return prevResult
  }
  src = src.substring(startIndex)
  startIndex = src.indexOf('>')
  const endIndex = src.indexOf(`</${tag}>`)
  if (endIndex < 0) {
    return prevResult
  }
  const attrString = src.substring(tag.length + 1, startIndex)
  const attr = {}
  attrString
    .replace(/"|'/g, '')
    .split(' ')
    .filter(item => item.length > 0)
    .forEach(item => {
      if (item.length > 0) {
        const split = item.trim().split('=')
        attr[split[0]] = split[1]
      }
    })
  prevResult.push({
    content: src.substring(startIndex + 1, endIndex),
    attr: attr,
  })
  if (tag != 'style') {
    return prevResult
  } else {
    return getContentFromXmlNode(src.substring(endIndex + tag.length + 2), tag, prevResult)
  }
}

exports.getContentFromXmlNode = getContentFromXmlNode
exports.getVueComponent = function(html) {
  const style = ''
  return `<template>${html}</template>`
}
