//The build will inline common dependencies into this file.

requirejs.config({
  baseUrl: 'assets/js',
  paths: {
    jquery: 'vendor/jquery/jquery',
    modernizr: 'vendor/modernizr/modernizr',
    'owl.carousel': 'vendor/owl.carousel/dist/owl.carousel',
    requirejs: 'vendor/requirejs/require',
    selectivizr: 'vendor/selectivizr/selectivizr'
  },
  shim: {
    modernizr: {
      exports: 'Modernizr'
    }
  },
  packages: [

  ]
});
