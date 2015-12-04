define([
    //'modernizr',
    'jquery',
    'app/models/aboutModel',
],

function ($, model) {
    'use strict';

    if ($('html.lt-ie9').size()) {
        require(['selectivizr', 'ieCallback']);
    }

    $(function() {
        // Set the title for our module with the data
        // from our model
        $('h1').html(model.getTitle());

        // Set the width of our progress bar with
        // data from our model.
        var percent = model.getPercentComplete();
        $('.progress-bar')
        .css({ 'width': percent })
        .attr('aria-valuenow', percent.substr(0, percent.length - 1));       

    });
});
