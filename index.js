/**
 * Updated by crivas on 09/02/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: PathManager
 */

'use strict';

var jsonfile = require('jsonfile'),
  fs = require('fs'),
  _ = require('underscore-node');

/**
 * utility for get the js, scss, and views paths
 */
var PathManager = function (uteJson) {

  var self = this;

  if (!_.isUndefined(uteJson)) {
    if (typeof uteJson === 'string') {
      this.packages = jsonfile.readFileSync(uteJson);
    } else if (typeof uteJson === 'object') {
      this.packages = uteJson;
    }
  }

  this.createMap(this.packages);

  return self;

};

/**
 * loops through all packages and maps to self.packages
 */
PathManager.prototype.createMap = function (utePackages) {

  var self = this;

  utePackages = typeof utePackages !== 'undefined' && utePackages || self.packages.components || [];

  self.mapPackages = _.map(utePackages.components, function (moduleObj, key) {

    if (moduleObj) {
      return {
        js: 'app/js/' + key + '/**/*.js',
        jsFolder: 'app/js/' + key,
        scss: 'app/scss/' + key + '/**/*.scss',
        scssBrand: 'app/scss/brand/' + self.packages.selectedBrand.toLowerCase() + '/' + key + '/**/*.scss',
        views: 'app/views/' + key + '/**/*.html'
      };
    } else {
      return {
        js: '!app/js/' + key + '/**/*.js',
        scss: '!app/scss/' + key + '/**/*.scss',
        scssBrand: '!app/scss/brand/' + self.packages.selectedBrand.toLowerCase() + '/' + key + '/**/*.scss',
        views: '!app/views/' + key + '/**/*.html'
      };
    }

  });

  return self.mapPackages;

};

/**
 * returns array of top level scss paths
 */
PathManager.prototype.getSCSSPaths = function () {

  return _.map(this.mapPackages, function (mapObj) {

    return mapObj.scss;

  });

};

/**
 * returns array of brands scss paths
 */
PathManager.prototype.getSCSSBrandPaths = function () {

  return _.map(this.mapPackages, function (mapObj) {

    return mapObj.scssBrand;

  });

};

/**
 * returns array of views paths
 */
PathManager.prototype.getViewsPaths = function () {

  return _.map(this.mapPackages, function (mapObj) {

    return mapObj.views;

  });

};

/**
 * returns array of js paths
 */
PathManager.prototype.getJSPaths = function () {

  return _.map(this.mapPackages, function (mapObj) {

    return mapObj.js;

  });

};

/**
 * returns array of templates
 */
PathManager.prototype.getTemplatePath = function () {

    return ['app/js/cache/**/*.js'];

  };

/**
 * returns an object of parsed items within a folder
 */
// PathManager.prototype.getJSSource = function () {
//
//   this.jsFolders = this.mapPackages
//     .filter(function (mapObj) {
//       return mapObj.jsFolder;
//     })
//     .map(function (mapObj) {
//       return includeFolder(mapObj.jsFolder);
//     });
//
//   return this.jsFolders;
//
// };

module.exports = PathManager;
