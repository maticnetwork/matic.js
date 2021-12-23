var mdHelper = require('./md_helper')
var { readdirSync, writeFileSync, readFileSync, statSync, ensureDirSync, existsSync } = require('fs-extra')
var { getVueComponent } = require('./vue_helper')
const path = require('path')

let workingDir = process.cwd()
workingDir = workingDir.replace(/[\\$'"]/g, "\\$&");
const contentDir = path.join(workingDir, 'content')
const srcDir = path.join(workingDir, 'src')
const pagesDir = path.join(srcDir, 'pages')
const layoutDir = path.join(workingDir, 'layouts')
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v1/tutorial', 'code/pages/v1/tutorial', 'tutorial.v1');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v1/example', 'code/pages/v1/example', 'example.v1');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v2/tutorial', 'code/pages/v2/tutorial', 'tutorial.v2');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v2/example', 'code/pages/v2/example', 'example.v2');
// mdHelper.convertMdToVueAndSaveInFolder(path.join(contentDir, 'tutorial'), path.join(pagesDir, 'tutorial'), path.join(layoutDir, 'tutorial.vue'));
// mdHelper.convertMdToVueAndSaveInFolder('../docs/example', 'code/pages/example', 'example');

function processFolderContent(dirLocation, parentFolder = '') {
  let dirCont = readdirSync(dirLocation)
  // console.log("dirContent", dirCont);
  dirCont.forEach(location => {
    const fullPath = path.join(dirLocation, location)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      processFolderContent(fullPath, path.join(parentFolder, location))
    } else if (location.match(/.md/i)) {
      const fileName = path.basename(location, '.md')
      let splittedParentPath = parentFolder.split('/')
      while (splittedParentPath.length > 0) {
        const layoutFullPath = path.join(layoutDir, splittedParentPath.join('/') + '.vue')
        // console.log("layoutFullPath", layoutFullPath);
        if (existsSync(layoutFullPath)) {
          mdHelper.convertMdToVueAndSaveInFolder(fullPath, path.join(pagesDir, parentFolder), layoutFullPath)
          splittedParentPath = []
        } else {
          splittedParentPath.pop()
        }
      }
    } else if (location.match(/.vue/i)) {
      const htmlData = readFileSync(fullPath, {
        encoding: 'utf-8',
      })
      ensureDirSync(pagesDir)
      writeFileSync(path.join(pagesDir, location), htmlData, {
        encoding: 'utf8',
      })
    }
  })
}

processFolderContent(contentDir)
