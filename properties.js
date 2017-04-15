'use strict';

var fs = require('fs'),
    path = require('path'),
    pagesFile = './data/pagesData.json';
    // navFile = './data/navData.json';

function Properties(filePath) {
  this.pageName = path.basename(filePath, '.html');
  this.pagesData = readFile(pagesFile).pages;
  // this.navData = readFile(navFile).pages;
  this.page = getData(this.pageName, this.pagesData);

  this.getTitle = function() {
    return this.page.title;
  }

  this.getBreadcrumbs = function() {
    var breadcrumbs = [];
    var self = this;

    var f = function(name) {
      var temp = getData(name, self.pagesData),
          parent = temp.parent;
      breadcrumbs.push({
        title: temp.title,
        name: temp.name
      });
      return (parent == 'none') ? breadcrumbs : f(parent);
    };
    return f(this.pageName);
  }

  this.getPrev = function() {
    var prev = this.page.prev;
    return (prev != 'none') ? getData(prev, this.navData) : 'none';
  }

  this.getNext = function() {
    var next = this.page.next;
    return (next != 'none') ? getData(next, this.navData) : 'none';
  }

  function readFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
  }

  function getData(name, data) {
    return data.find(function(item, index, array) { return item.name == name; });
  }
}

module.exports.properties = Properties;
