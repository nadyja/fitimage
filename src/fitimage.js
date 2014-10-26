/*
 * fitimage
 *
 *
 * Copyright (c) 2014 Nadia Mietkiewicz
 * Licensed under the MIT license.
 */
'use strict';

(function($) {
    $.fn.fitimage = function() {
        return this.each(function(i) {

            var nw, nh,
                w = $(this).width(),
                h = $(this).height(),
                cw, ch;

            var size = $(this).attr('fitimage')

            if (size) {
                // user set size - wrap in container
                size = size.split(',');
                cw = size[0];
                ch = size[1];
                $(this).wrap("<div class='fitimage-container'></div>");
                var container = $(this).parent();
                $(container).css({
                    'height': ch + "px",
                    'width': cw + "px"
                });
            } else {
                // fit to default container
                var container = $(this).parent();
                container.addClass('fitimage-container');
                cw = container.width();
                ch = container.height();
            }


            var log = ('fiting ' + w + 'x' + h + 'px in ' + cw + 'x' + ch + 'px');
            nw = ch / h * w / cw * 100;
            nh = 100;

            if (nw < 100) {
                nh = h * cw / w;
                nw = 100;
                log += (' (width: 100%, height: ' + nh + '% cropped)');

            } else {
                log += (' (width: ' + nw + '% cropped, height: 100%)')
            }
            console.log(log);
            //nw=nw/cw*100;

            $(container).css({
                'overflow': 'hidden',
                'position': 'relative'
            })
            $(this).css({
                'position': 'absolute',
                'width': nw + "%",
                'height': nh + "%",
                'top': (100 - nh) / 2 + "%",
                'left': (100 - nw) / 2 + "%"
            })
        });
    };

}(jQuery));




angular.module('fitimage', [])
    .directive('fitimage', function($timeout) {
        return {
            restrict: 'A',
            transclude: true,
            link: function(scope, element, attrs, ctrls) {
                element.on('load', function() {
                    $(element).fitimage();
                });
            }
        };
    });
