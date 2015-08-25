/**
 * Updated by crivas on 08/25/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: PathManager
 */

'use strict';

var jsonfile = require('jsonfile'),
  fs = require('fs'),
  through = require('through2'),
  gutil = require('gulp-util'),
  _ = require('underscore-node');

/**
 * utility for get the js, scss, and views paths
 */
var PathManager = function (jsonFile) {

  var self = this;

  self.packages = jsonfile.readFileSync(jsonFile);

  /**
   * loops through all packages and maps to self.packages
   */
  self.patternSearch = function () {

    self.mapPackages = _.map(self.packages.components, function (moduleObj, key) {

      if (moduleObj) {
        return {
          js: 'app/js/' + key + '/**/*.js',
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
   * returns array of js paths
   */
  self.getJSPaths = function () {

    return _.map(self.mapPackages, function (mapObj) {

      return mapObj.js;

    });

  };

  /**
   * returns array of templates
   */
  self.getTemplatePath = function () {

    return ['app/js/cache/**/*.js'];

  };

  /**
   * returns array of top level scss paths
   */
  self.getSCSSPaths = function () {

    return _.map(self.mapPackages, function (mapObj) {

      return mapObj.scss;

    });

  };

  /**
   * returns array of brands scss paths
   */
  self.getSCSSBrandPaths = function () {

    return _.map(self.mapPackages, function (mapObj) {

      return mapObj.scssBrand;

    });

  };

  /**
   * returns array of views paths
   */
  self.getViewsPaths = function () {

    return _.map(self.mapPackages, function (mapObj) {

      return mapObj.views;

    });

  };

  self.patternSearch();

  return self;

};

module.exports = PathManager;
