const path = require('path');

const express = require('express');
const app = express();
const compression = require('compression');
const minify = require('express-minify');

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
const pretty = require('pretty');

const Blurry = require(path.join(__dirname, '../index.js'));
const blurry = new Blurry({
  'file': path.join(__dirname, 'static/img/teapott-preview.jpg'),
  'width': 1140,
  'height': 640,
});
app.use(compression());
app.use(minify(
    {
      cache: false,
      uglifyJsModule: null,
      errorHandler: null,
      cssMatch: /css/,
    }
  )
);
app.use(
  '/static',
  express.static(path.join(__dirname, 'static'))
);
app.use(
  '/static/js/lazysizes',
  express.static(path.join(__dirname, '../node_modules/lazysizes'))
);
app.use(
  '/static/js/picturefill',
  express.static(path.join(__dirname, '../node_modules/picturefill'))
);
app.get('/', function(req, res) {
  /* eslint-disable max-len */
  res.send(
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<meta name="Description" content="#blurry &mdash; A node module to generate reliable image load effects.">' +
      '<title>#blurry &mdash; A node module to generate reliable image load effects.</title>' +
      '<link rel="stylesheet" href="static/css/style.css">' +
    '</head>' +
    '<body>' +
      '<main>' +
        '<header>' +
          '<h1>blurry</h1>' +
          '<h2>A node module to generate reliable image load effects.</h2>' +
          '<p>Generate Base64 inline Images. Prepared for lazyloading. Based on configurable SVG Templates. Compatible with Internet Explorer 11 and up.</p>' +
          '<p>A Solution with a very small footprint to get your DOM interactive blurry and fast.</p>' +
          '<pre class="inline">' +
            '<code class="console">' +
              '# install' + "\n" + // eslint-disable-line quotes
              'npm install --save-dev js.node.blurry' +
            '</code>' +
          '</pre>' +
          '<pre class="inline">' +
            '<code class="javascript">' +
              '// usage' + "\n" + // eslint-disable-line quotes
              entities.encode(pretty("const Blurry = require('blurry');")) + "\n" + // eslint-disable-line quotes
              entities.encode(pretty("const blurry = new Blurry({'file': path.join(__dirname, 'static/img/teapott-preview.jpg'), 'width': 1140, 'height': 640});")) + "\n" + // eslint-disable-line quotes
              entities.encode(pretty("<img alt=\"\" src=\"' + blurry.getUrl() + '\">")) + "\n" + // eslint-disable-line quotes
            '</code>' +
          '</pre>' +
        '</header>' +
        '<article>' +
          '<h2>Base64 inline Image</h2>' +
          '<figure>' +
            '<img alt="base64 blured svg/jpeg preview image" src="' + blurry.getUrl() + '" />' +
            '<figcaption>' +
              'Original Preview Image 114x64px resized to 1140x640px within the SVG. ' +
              'The SVG <code>feGaussianBlur</code> filter produce a blurry effect.<br />' +
              'In this solution the SVG below is encoded into base64 and directly writen to <code>img src</code> with <code>blurry.getUrl()</code>.' +
            '</figcaption>' +
            '<pre>' +
              '<code class="html">' +
                entities.encode(pretty(blurry.getSvg())) +
              '</code>' +
            '</pre>' +
          '</figure>' +
          '<h2>Picture Element with blurry and lazyload</h2>' +
          '<figure>' +
            '<picture>' +
              '<source data-srcset="static/img/teapott-ld.webp 1x, static/img/teapott-ld_x2.webp 2x" media="(min-width: 1200px)" type="image/webp">' +
              '<source data-srcset="static/img/teapott-md.webp 1x, static/img/teapott-md_x2.webp 2x" media="(min-width: 992px) and (max-width: 1199px)" type="image/webp">' +
              '<source data-srcset="static/img/teapott-t.webp 1x, static/img/teapott-t_x2.webp 2x" media="(min-width: 768px) and (max-width: 991px)" type="image/webp">' +
              '<source data-srcset="static/img/teapott-m.webp 1x, static/img/teapott-m_x2.webp 2x" media="(max-width: 767px)" type="image/webp">' +
              '<source data-srcset="static/img/teapott-ld.jpg 1x, static/img/teapott-ld_x2.jpg 2x" media="(min-width: 1200px)" type="image/jpeg">' +
              '<source data-srcset="static/img/teapott-md.jpg 1x, static/img/teapott-md_x2.jpg 2x" media="(min-width: 992px) and (max-width: 1199px)" type="image/jpeg">' +
              '<source data-srcset="static/img/teapott-t.jpg 1x, static/img/teapott-t_x2.jpg 2x" media="(min-width: 768px) and (max-width: 991px)" type="image/jpeg">' +
              '<source data-srcset="static/img/teapott-m.jpg 1x, static/img/teapott-m_x2.jpg 2x" media="(max-width: 767px)" type="image/jpeg">' +
              '<img class="lazyload" alt="webp/jpeg picture element with four breakpoints and base64 blured svg/jpeg preview image" src="' + blurry.getUrl() + '">' +
            '</picture>' +
            '<figcaption>' +
              'Blured Preview Image 114x64px in lazyload picture container is displayed until <code>source srcset</code> image has been loaded by the browser.' +
            '</figcaption>' +
            '<pre>' +
              '<code class="html">' +
                entities.encode(pretty('<picture><source data-srcset="static/img/teapott-ld.webp 1x, static/img/teapott-ld_x2.webp 2x" media="(min-width: 1200px)" type="image/webp"><source data-srcset="static/img/teapott-md.webp 1x, static/img/teapott-md_x2.webp 2x" media="(min-width: 992px) and (max-width: 1199px)" type="image/webp"><source data-srcset="static/img/teapott-t.webp 1x, static/img/teapott-t_x2.webp 2x" media="(min-width: 768px) and (max-width: 991px)" type="image/webp"><source data-srcset="static/img/teapott-m.webp 1x, static/img/teapott-m_x2.webp 2x" media="(max-width: 767px)" type="image/webp"><source data-srcset="static/img/teapott-ld.jpg 1x, static/img/teapott-ld_x2.jpg 2x" media="(min-width: 1200px)" type="image/jpeg"><source data-srcset="static/img/teapott-md.jpg 1x, static/img/teapott-md_x2.jpg 2x" media="(min-width: 992px) and (max-width: 1199px)" type="image/jpeg"><source data-srcset="static/img/teapott-t.jpg 1x, static/img/teapott-t_x2.jpg 2x" media="(min-width: 768px) and (max-width: 991px)" type="image/jpeg"><source data-srcset="static/img/teapott-m.jpg 1x, static/img/teapott-m_x2.jpg 2x" media="(max-width: 767px)" type="image/jpeg"><img class="lazyload" alt="webp/jpeg picture element with four breakpoints and base64 blured svg/jpeg preview image" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSAiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjExNDBweCIgaGVpZ2h0PSI2NDBweCIgdmlld0JveD0iMSAxIDExNDAgNjQwIj48aW1hZ2UgZmlsdGVyPSJ1cmwoI2JsdXJXaXRjaFByb2plY3QpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bGluazpocmVmPSJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80QUFRU2taSlJnQUJBUUFBQVFBQkFBRC80UUFZUlhocFpnQUFTVWtxQUFnQUFBQUFBQUFBQUFBQUFQL3NBQkZFZFdOcmVRQUJBQVFBQUFCa0FBRC80UU5wYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THdBOFAzaHdZV05yWlhRZ1ltVm5hVzQ5SXUrN3Z5SWdhV1E5SWxjMVRUQk5jRU5sYUdsSWVuSmxVM3BPVkdONmEyTTVaQ0kvUGlBOGVEcDRiWEJ0WlhSaElIaHRiRzV6T25nOUltRmtiMkpsT201ek9tMWxkR0V2SWlCNE9uaHRjSFJyUFNKQlpHOWlaU0JZVFZBZ1EyOXlaU0ExTGpZdFl6RXpPQ0EzT1M0eE5UazRNalFzSURJd01UWXZNRGt2TVRRdE1ERTZNRGs2TURFZ0lDQWdJQ0FnSUNJK0lEeHlaR1k2VWtSR0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SStJRHh5WkdZNlJHVnpZM0pwY0hScGIyNGdjbVJtT21GaWIzVjBQU0lpSUhodGJHNXpPbmh0Y0UxTlBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZiVzB2SWlCNGJXeHVjenB6ZEZKbFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMM05VZVhCbEwxSmxjMjkxY21ObFVtVm1JeUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiWEJOVFRwUGNtbG5hVzVoYkVSdlkzVnRaVzUwU1VROUlqZzBPRUZHT0RFMU5VTTFNVVF6UlRrMU9FSXhNREEzTWtFMFF6ZEdPVVpDSWlCNGJYQk5UVHBFYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2taQk5UTXdPVGMzTlVORFFqRXhSVGc0T0VWQlJrWTJNREk1TWpRNE16RkZJaUI0YlhCTlRUcEpibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPa1pCTlRNd09UYzJOVU5EUWpFeFJUZzRPRVZCUmtZMk1ESTVNalE0TXpGRklpQjRiWEE2UTNKbFlYUnZjbFJ2YjJ3OUlrRmtiMkpsSUZCb2IzUnZjMmh2Y0NCRFF5QXlNREUzSUNoTllXTnBiblJ2YzJncElqNGdQSGh0Y0UxTk9rUmxjbWwyWldSR2NtOXRJSE4wVW1WbU9tbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZOVFZpWTJRMVlXTXRZalUwTWkwME9HRmhMVGt6TmprdE56SmhNbVEyTnpZMk4ySmhJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0k0TkRoQlJqZ3hOVFZETlRGRU0wVTVOVGhDTVRBd056SkJORU0zUmpsR1FpSXZQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9Qdi90QUVoUWFHOTBiM05vYjNBZ015NHdBRGhDU1UwRUJBQUFBQUFBRHh3QldnQURHeVZISEFJQUFBSUFBZ0E0UWtsTkJDVUFBQUFBQUJEODRSK0p5TGZKZUM4MFlqUUhXSGZyLzlzQWhBQUlCZ1lIQmdVSUJ3Y0hDUWtJQ2d3VURRd0xDd3daRWhNUEZCMGFIeDRkR2h3Y0lDUXVKeUFpTENNY0hDZzNLU3d3TVRRME5COG5PVDA0TWp3dU16UXlBUWtKQ1F3TERCZ05EUmd5SVJ3aE1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakwvd2dBUkNBQkFBSElEQVNJQUFoRUJBeEVCLzhRQUhBQUFBUVFEQVFBQUFBQUFBQUFBQUFBQUFBRUNCQVVEQndnRy85b0FDQUVCQUFBQUFOank1c3lYRTVWZTRGSG02N0NaT3NKSEwxZTVvSmtkdHV4bDJGakw1cXFuQ0N2ejdEdFpzNnloODhLOEJ6OG5yN0NiWTU5VjBHUlJVSDVhVGQvaTZXSkhlT0VSVmZCNmI1blpJY0NBcWlld2s2OXlQVVJRVUUvL3hBQVpBUUVBQXdFQkFBQUFBQUFBQUFBQUFBQUFBUUlGQkFQLzJnQUlBUUlRQUFBQXJGOWlSaXJhOGs0bnIxOUlaZWphUkgvL3hBQVpBUUFDQXdFQUFBQUFBQUFBQUFBQUFBQUFBUUlFQlFQLzJnQUlBUU1RQUFBQWlTeW9ndGhHWEVTMnVkU3VnV3JSNUFJLy84UUFOUkFBQVFNQ0F3UUlBd2tCQUFBQUFBQUFBUUFDQXdRUkJRWWhFakZCVVJBVElDSlNZWEhCQjRHUk1ESkNZb0tTb2JMaDhQL2FBQWdCQVFBQlB3Q09RRm9CMFBBcUtTNTVPQ2lrL3dCQ2lrSXNMK2hUSFhXTjBETVR3YXNvbmk3WjRYeC9VTHEzTWNXUEZuTk5qNmhCcTJWc0JBQUs2dWh6c3JsUVRIWUZ6dE00SGtvcGJBYlIwNE9VVXgyZ0NiTzRIbW9wUWZUaU9TZ2s1b3U3aFdZcWNVbVpzVGc0TXFwTGZXNkc1WDdGMDFXQ3A1ckh1blpQRnAzRlJUWDBhUFZwVVVndHhMZjVhb1pkUnJyd2R6VUV2eTlrK1VOaUt6WE8ycHpaaWtyTnhxWEFJSHNBTGNVSEVia0hHdzdwVkxVQWdDKzBQQ2Q0VU00SUd1MEIrNEtLYmM2LzZoN3FLZTJtbXZEZ1ZUejdpU3N6Wmdqd1RBcW1yY1J0dGJhTnZONTNCT2U2U1J6M203aWJrOHloMDJDc2dBbURvd3F2cGNScDJ0RGd5VUN3TjA2cGtwSkF5ZHAvSysrLzBLZ3hDK3UxOHh2VU5jeTI4ZXlseHFubzRIelRUTll4Z3U1empvQjdyTk9aNXN3MW9EZHBsSERwRXcvMkszb2RGMWNJK1N2eFRYYWkxN0t3OFN3L0dvS1NSc2paSldPSGtzak1qenBnNzNQaWVZR25aTDVHYkljZkpaMHFuNVN6SE5oRlBJYWt4dGE4dThJY0xnRlI1cnJuRDdsajZxc3hDcnhGd05US1hOR3JXRFJvUWFySUJYN0lLMjMvQVBGWmF5bzdNR01SVU1EWHVGd1pYK0ZxQm9NaFpLbXFuTURZYVNIUmcvRzdjMXZ6S3I2MnB4WEVhbXZySDlaVVZFaGxrZDVsTWJaQWFLMzJIcDBmRDNFNm5MMGJaR1FROVU4M2NaRzkrUmZGTE9vekhMU1lYUWg3YVNuSFdWSG5NbXhua2cyM1J4SzRJZGtub3N2L3hBQWRFUUFCQkFNQkFRQUFBQUFBQUFBQUFBQUNBQUVnSVFNUk1SQVMvOW9BQ0FFQ0FRRS9BUEJUYzNNYnBEVGFrT0lpNHNPSDR0NUFER1ZNbWFmL3hBQWRFUUFDQVFVQkFRQUFBQUFBQUFBQUFBQUJBZ0FERVJJZ0lSQXgvOW9BQ0FFREFRRS9BUExSdUhjbTBicDFJak9GK3lyV3k0Tm5iRWRNWnQvLzJRPT0iLz48IS0tIFRoZSBjYWtlIGlzIGEgbGllIC0tPjxmaWx0ZXIgaWQ9ImJsdXJXaXRjaFByb2plY3QiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIgZWRnZU1vZGU9ImR1cGxpY2F0ZSIgLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjEgMSIgLz48L2ZlQ29tcG9uZW50VHJhbnNmZXI+PC9maWx0ZXI+PC9zdmc+"></picture>')) +
              '</code>' +
            '</pre>' +
          '</figure>' +
          '<h2>Picture Element with blurry and lazyload VS. without lazyload</h2>' +
          '<div class="blurry--vs">' +
            '<img class="lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="static/img/blurry.picture.gif" alt="Picture Element with blurry and lazyload" />' +
            '<img class="lazyload" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="static/img/blurry.picture.off.gif" alt="Picture Element with blurry and without lazyload" />' +
          '</div>' +
          '<h2>Usage</h2>' +
          '<figure>' +
            '<pre>' +
              '<code class="javascript">' +
                '// Render Blurry as base64 image src' + "\n" + // eslint-disable-line quotes
                entities.encode(pretty("const Blurry = require('blurry')")) + "\n" + // eslint-disable-line quotes
                entities.encode(pretty("const blurry = new Blurry({'file': path.join(__dirname, 'static/img/teapott-preview.jpg'), 'width': 1140, 'height': 640});")) + "\n" + // eslint-disable-line quotes
                entities.encode(pretty("<img alt=\"\" src=\"' + blurry.getUrl() + '\">")) + // eslint-disable-line quotes
              '</code>' +
            '</pre>' +
            '<pre>' +
              '<code class="javascript">' +
                '// Construct Blurry with custom template' + "\n" + // eslint-disable-line quotes
                entities.encode(pretty("const blurry = new Blurry({'file': path.join(__dirname, 'static/img/teapott-preview.jpg'), 'width': 1140, 'height': 640, 'template': 'blurry.tmpl'});")) + "\n" + // eslint-disable-line quotes
              '</code>' +
            '</pre>' +
            '<pre>' +
              '<code class="html">' +
                entities.encode(pretty('<!-- Blurry default template -->')) + "\n" + // eslint-disable-line quotes
                entities.encode(pretty('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" width="{{width}}px" height="{{height}}px" viewBox="1 1 {{width}} {{height}}">' +
                  '<image filter="url(#blurWitchProject)" width="100%" height="100%" xlink:href="{{base64FileUrl}}"/>' +
                  '<filter id="blurWitchProject" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">' +
                      '<feGaussianBlur stdDeviation="20" edgeMode="duplicate" />' +
                      '<feComponentTransfer>' +
                        '<feFuncA type="discrete" tableValues="1 1" />' +
                      '</feComponentTransfer>' +
                  '</filter>' +
                '</svg>')) +
              '</code>' +
            '</pre>' +
            '<figcaption>' +
              '<a href="https://github.com/aFarkas/lazysizes" title="lazysizes">Lazysizes</a> is needed to enable lazyloading. Lazysizes switch also the blurry base64 SVG image to a image defined in <code>srcset</code> within this solution.<br/>IE 11 needs <a href="https://github.com/scottjehl/picturefill" title="Picturefill()">picturefill</a> to enable picture element support.' +
            '</figcaption>' +
          '</figure>' +
        '</article>' +
        '<footer>' +
          '<ul>' +
            '<li><a title="Github" href="https://github.com/exiguus/js.node.blurry">git</a></li>' +
            '<li><a title="NPM JS" href="https://www.npmjs.com/package/js.node.blurry">npm</a></li>' +
            '<li><a title="JSDOC" href="https://exiguus.github.io/js.node.blurry/jsdoc/index.html">docs</a></li>' +
            '<li><a title="Coverage lcov-report" href="https://exiguus.github.io/js.node.blurry/coverage/index.html">coverage</a></li>' +
            '<li><a title="License MIT" href="https://github.com/exiguus/js.node.blurry/blob/master/LICENSE">license</a></li>' +
          '</ul>' +
          '<p><a href="https://github.com/exiguus/js.node.blurry" title="#blurry &mdash; A node module to generate reliable image load effects.">#blurry</a> ' + (new Date()).getFullYear() + '</p>' +
        '</footer>' +
      '</main>' +
      '<script src="static/js/lazysizes/lazysizes.min.js" async></script>' +
      '<script src="static/js/picturefill/dist/picturefill.min.js" async></script>' +
      '<script async>' +
        'var link = document.createElement( \'link\' );' +
        'link.href = \'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css\';' +
        'link.rel = \'stylesheet\';' +
        'document.getElementsByTagName( \'head\' )[0].appendChild( link );' +
      '</script>' +
      '<script async>' +
        'var WebFontConfig = {' +
          'google: {' +
            'families: [\'Shadows Into Light\', \'Roboto:300\']' +
          '},' +
          'timeout: 3000' +
        '};' +
        '(function(d) {' +
          'var wf = d.createElement(\'script\'), s = d.scripts[0];' +
          'wf.src = \'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js\';' +
          'wf.async = \'true\';' +
          's.parentNode.insertBefore(wf, s);' +
        '})(document);' +
      '</script>' +
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>' +
      '<script>hljs.initHighlightingOnLoad();</script>' +
    '</body>' +
  '</html>'
  );
  /* eslint-diable */
});

app.listen(3333, function() {
  console.log( // eslint-disable-line no-console
    'Example app listening on port 3333!'
  );
});
