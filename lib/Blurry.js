/**
 * @fileOverview Blurry base64 image Url and SVG image generator.
 * @author Simon Gattner <npm@0x38.de>
 * @license MIT
 * @version 1.0.0
 */
const fs = require('fs');
const path = require('path');

module.exports = class Blurry {
  /**
   * @class Blurry
   * @classdesc Blurry base64 image Url and SVG image generator.
   * @param {object} options The blurify options.
   * @param {string} options.file The image file to blurify.
   * @param {string} options.type The image type to blurify.
   * @param {number} options.width The image width to blurify.
   * @param {number} options.height The image height to blurify.
   * @param {string} options.template The SVG Template file to use for blurify.
   */
  constructor(options) {
    this.options = options || {};
    this.file = this.options.file;
    this.type = this.options.type || 'jpeg';
    this.width = this.options.width || 1140;
    this.height = this.options.height || 640;
    this.base64File = this.makeBase64File();
    this.base64FileUrl = this.makeBase64FileUrl();
    this.template = this.makeTemplate();
    this.svg = this.makeBase64Svg();
    this.base64SvgUrl = this.makeBase64SvgUrl();
  }
  /**
   * Make blurry base64 File.
   * @function Blurry.makeBase64File
   * @return {string} The base64 File.
   */
  makeBase64File() {
    try {
      if (this.file !== undefined) {
        return fs.readFileSync(this.file, 'base64');
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Make blurry base64 File Url.
   * @function Blurry.makeBase64FileUrl
   * @return {string} The base64 File Url.
   */
  makeBase64FileUrl() {
    try {
      if (this.base64File !== undefined) {
        return 'data:image/' + this.type +
          ';base64,' + this.base64File;
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Make blurry Template.
   * @function Blurry.makeTemplate
   * @return {string} The Template.
   */
  makeTemplate() {
    try {
      if (this.options.template) {
        return fs.readFileSync(this.options.template);
      } else {
        return fs.readFileSync(path.join(__dirname, 'blurry.tmpl'));
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Make blurry base64 Svg.
   * @function Blurry.makeBase64Svg
   * @return {string} The base64 Svg.
   */
  makeBase64Svg() {
    try {
      if (this.template !== undefined && this.base64FileUrl !== undefined) {
        return this.template
          .toString()
          .replace('{{width}}', this.width)
          .replace('{{height}}', this.height)
          .replace('{{base64FileUrl}}', this.base64FileUrl);
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Make blurry base64 Svg Url.
   * @function Blurry.makeBase64SvgUrl
   * @return {string} The base64 Svg Url.
   */
  makeBase64SvgUrl() {
    try {
      if (this.svg !== undefined) {
        return 'data:image/svg+xml;base64,' +
          new Buffer(this.svg).toString('base64');
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Get blurry base64 SVG Url.
   * @function Blurry.getUrl
   * @return {string} The base64 SVG Url.
   */
  getUrl() {
    try {
      if (this.base64SvgUrl !== undefined) {
        return this.base64SvgUrl;
      }
    } catch (error) {
      return undefined;
    }
  }
  /**
   * Get blurry SVG Image.
   * @function Blurry.getSvg
   * @return {string} The SVG Image.
   */
  getSvg() {
    return this.svg;
  }
};
