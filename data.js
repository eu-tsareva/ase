'use strict';

var fs = require('fs'),
    path = require('path'),
    pagesFile = './pagesData.json',
    navFile = './navData.json';

function getTitle(filePath) {
  const pageName = path.basename(filePath, '.html'),
        data = readFile(pagesFile).pages;
  return getData(pageName, data).title;
}

function getBreadCrumbs(filePath) {
  const pageName = path.basename(filePath, '.html'),
        data = readFile(pagesFile).pages,
        breadcrumbs = [];

  var recursive = function(name) {
    var temp = getData(name, data),
        parent = temp.parent;
    breadcrumbs.push({
      title: temp.title,
      name: temp.name
    });
    return (parent == 'none') ? breadcrumbs : recursive(parent);
  };
  return recursive(pageName);
}

function getPrev(filePath) {
  const pageName = path.basename(filePath, '.html'),
        pages = readFile(pagesFile).pages,
        page = getData(pageName, pages),
        prev = page.prev;

  if (prev != 'none') {
    const nav = readFile(navFile).pages;
    return getData(prev, nav);
  }
  else {
    return 'none';
  }
}

function getNext(filePath) {
  const pageName = path.basename(filePath, '.html'),
        pages = readFile(pagesFile).pages,
        page = getData(pageName, pages),
        next = page.next;

  if (next != 'none') {
    const nav = readFile(navFile).pages;
    return getData(next, nav);
  }
  else {
    return 'none';
  }
}

function readFile(fileName) {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

function getData(name, data) {
  return data.find(function(item, index, array) { return item.name == name; });
}

module.exports.breadcrumbs = getBreadCrumbs;
module.exports.title = getTitle;
module.exports.prev = getPrev;
module.exports.next = getNext;
//
// function getParent(alias_to_seek) {
// 	var parent;
// 	let config = getPagesConfig();
// 	config = config.pages;
//
// 	for (var page in config) {
// 		if (config[page].alias == alias_to_seek)
// 			if (config[page].parent) {
// 				parent = config[page].parent;
// 			}
// 	}
// 	return parent;
// }
//
// function getBreadCrumbs(alias_to_seek) {
// 	var breadcrumbs = Array();
// 	breadcrumbs[0] = alias_to_seek;
//
// 	while (breadcrumbs[breadcrumbs.length - 1] != 'main') {
// 		breadcrumbs.push(getParent(breadcrumbs[breadcrumbs.length - 1]));
// 	}
// 	return breadcrumbs;
// }
//
// function getTitle(alias, lang) {
//
// 	let config = getPagesConfig();
// 	let index = getPageIndexByAlias(alias, config);
// 	let titlelang = 'title_' + lang;
// 	return config.pages[index][titlelang];
// }
//
// function getPagesConfig() {
// 	let config = JSON.parse(fs.readFileSync('src/data/config.json', 'utf8'));
// 	return config;
// }
//
// function getPageIndexByAlias(search_alias, list) {
// 	for (var i = 0; i <= list.pages.length; i++) {
// 		if (list.pages[i].alias == search_alias) {
// 			return i;
// 		}
// 	}
// }
