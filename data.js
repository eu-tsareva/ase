'use strict';

var fs = require('fs'),
    path = require('path'),
    dataFile = './config.json';

function getTitle(filePath) {
  const name = path.basename(filePath, '.html');
  const data = getConfigData().pages;
  return getPageData(name, data).title;
}

function getBreadCrumbs(filePath) {
  const name = path.basename(filePath, '.html');
  const data = getConfigData().pages;

  var breadcrumbs = [name],
      temp = getPageData(name, data),
      parent = temp.parent;

	while (parent != 'none') {
		breadcrumbs.push(parent);
    temp = getPageData(parent, data);
    parent = temp.parent;
    // console.log(temp, parent);
	}
	return breadcrumbs;
}

function getConfigData() {
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function getPageData(name, pages) {
  return pages.find(function(page, index, array) { return page.name == name; });
}

module.exports.breadcrumbs = getBreadCrumbs;
module.exports.title = getTitle;
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
