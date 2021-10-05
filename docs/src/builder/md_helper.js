var showdown = require('showdown'),
  fse = require('fs-extra'),
  converter = new showdown.Converter(),
  fm = require('front-matter')
const path = require('path')

function getAllFilesFromFolder(folderName) {
  return fse.readdirSync(folderName)
}
exports.convertMdToVueAndSaveInFolder = function(srcFilePath, targetfolderToSave, layout) {
  // console.log(...arguments);
  var content = fse.readFileSync(srcFilePath, {
    encoding: 'utf8',
  })
  var fmData = fm(content)
  var html = converter.makeHtml(fmData.body)
  var fileName = path.basename(srcFilePath, '.md')
  var targetfilePath = path.join(targetfolderToSave, fileName + '.vue')
  fse.ensureDirSync(targetfolderToSave)
  //recreate file if exist otherwise create
  fse.closeSync(fse.openSync(targetfilePath, 'w'))
  const meta = fmData.attributes
  var vueComp = `<template><Layout title='${meta.Title}' description='${meta.Description}' keywords='${meta.Keywords}' contentSrc='${srcFilePath}'>${html}</Layout></template>
        <script>import Layout from '${layout}'
        export default {
            components:{Layout}
        };
        </script>
        `
  // console.log(vueComp);
  fse.writeFileSync(targetfilePath, vueComp, {
    encoding: 'utf8',
  })
  return true
}

function addMetaTags(layout, metaTags) {
  var addTag = function(stringConst, tagName) {
    // var stringConst = 'title=';
    // console.log('layout', layout);
    if (metaTags[tagName] != null) {
      var index = layout.indexOf(stringConst)
      index = index + stringConst.length
      var firstString = layout.substring(0, index + 1)
      var lastString = layout.substring(index + 1)
      var firstString = layout.substring(0, index + 1)
      return firstString + metaTags[tagName] + lastString
    }
    return layout
  }

  layout = addTag('title=', 'Title')
  layout = addTag('keywords=', 'Keywords')
  layout = addTag('description=', 'Description')
  return layout
}
