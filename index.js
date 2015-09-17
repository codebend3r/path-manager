/**
 * Updated by crivas on 09/17/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: path-manager
 */

'use strict';

var jsonfile = require('jsonfile'),
  fs = require('fs'),
  flatten = require('array-flatten'),
  unique = require('array-unique'),
  _ = require('underscore-node');

/**
 * utility for get the js, scss, and views paths
 */
var PathManager = function (configJson) {

  var self = this;

  if (_.isUndefined(configJson)) {
    throw new Error('did not specify a config json file as he first parameter');
  } else {
    if (typeof configJson === 'string') {
      this.packages = jsonfile.readFileSync(configJson);
    } else if (typeof configJson === 'object') {
      this.packages = configJson;
    }
  }

  this.createMap(this.packages);

  return self;

};

/**
 * loops through all packages and maps to self.packages
 */
PathManager.prototype.createMap = function (configJson) {

  var self = this;

  configJson = typeof configJson !== 'undefined' && configJson || self.packages.components || [];

  self.mapPackages = _.map(configJson.components, function (moduleObj, key) {

    if (moduleObj) {
      return {
        js: 'app/js/' + key + '/**/*.js',
        vendorJs: moduleObj.otherJsFiles,
        jsFolder: 'app/js/' + key + '/**/*.js',
        scss: 'app/scss/' + key + '/**/*.scss',
        scssBrand: 'app/scss/brand/' + self.packages.selectedBrand.toLowerCase() + '/' + key + '/**/*.scss',
        views: 'app/views/' + key + '/**/*.html'
      };
    }

  });

  return self.mapPackages;

};

/**
 * returns array of top level scss paths
 */
PathManager.prototype.getSCSSPaths = function () {

  var scssPaths = _.chain(this.mapPackages)
    .flatten(true)
    .filter(function (mapObj) {
      return !_.isUndefined(mapObj.scss) && mapObj.scss !== '';
    })
    .map(function (mapObj) {
      return mapObj.scss;
    })
    .value();

    return unique(scssPaths);

};

/**
 * returns array vendor paths
 */
PathManager.prototype.getVendorPaths = function () {

  var vendorJsArray = _.chain(this.mapPackages)
    .flatten(true)
    .filter(function (mapObj) {
      return !_.isUndefined(mapObj.vendorJs) && mapObj.vendorJs !== '';
    })
    .map(function (mapObj) {
      return mapObj.vendorJs;
    })
    .value();

  return unique(vendorJsArray);

};

/**
 * returns array of brands scss paths
 */
PathManager.prototype.getSCSSBrandPaths = function () {

  var scssPaths = _.chain(this.mapPackages)
    .flatten(true)
    .filter(function (mapObj) {
      return !_.isUndefined(mapObj.scssBrand) && mapObj.scssBrand !== '';
    })
    .map(function (mapObj) {
      return mapObj.scssBrand;
    })
    .value();

    return unique(scssPaths);

};

/**
 * returns array of views paths
 */
PathManager.prototype.getViewsPaths = function () {

  var viewsPath = _.chain(this.mapPackages)
    .flatten(true)
    .filter(function (mapObj) {
      return !_.isUndefined(mapObj.views) && mapObj.views !== '';
    })
    .map(function (mapObj) {
      return mapObj.views;
    })
    .value();

    return unique(viewsPath);

};

/**
 * returns array of js paths
 */
PathManager.prototype.getJSPaths = function () {

  var jsPaths = _.chain(this.mapPackages)
    .flatten(true)
    .filter(function (mapObj) {
      return !_.isUndefined(mapObj.js) && mapObj.js !== '';
    })
    .map(function (mapObj) {
      return mapObj.js;
    })
    .value();

    return unique(jsPaths);

};

/**
 * returns array of templates
 */
PathManager.prototype.getTemplatePath = function () {
  return ['app/js/cache/**/*.js'];
};

module.exports = PathManager;
