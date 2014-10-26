/*! fitimage - v1.0.0 - 2014-10-26
* https://github.com/nmietkiewicz/fitimage
* Copyright (c) 2014 Nadia Mietkiewicz; Licensed MIT */
'use strict';

(function($) {
    $.fn.fitimage = function() {
        return this.each(function(i) {

            var size = $(this).attr('fitimage')
            if (size) {
                size = size.split(',');
                if(size.length!=2) {
                 console.error('set correct fit size (fitimage="[width],[height]") or leave empty to fit parent container');
             }

                $(this).wrap("<div class='fitimage-container' style=' width: " + size[0] + "px ; height: " + size[1] + "px;'></div>");                
            } else {
                $(this).parent().addClass('fitimage-container');
            }




            var original = {
                width: $(this).width(),
                height: $(this).height()
            };

            var container = $(this).parent();
            container.width = container.width();
            container.height = container.height();




            var log = ('fiting ' + original.width + 'x' + original.height + 'px in ' + container.width + 'x' + container.height + 'px');


            var calculated = {
                width: container.height / original.height * original.width / container.width * 100,
                height: 100
            };
            if (calculated.width < 100) {
                calculated.width = 100;
                calculated.height = original.height / container.height * container.width / original.width * 100;
                log += (' (width: 100%, height: ' + calculated.height.toFixed(0) + '% cropped)');
            } else {
                log += (' (width: ' + calculated.width.toFixed(0) + '% cropped, height: 100%)')
            }
            //console.log(log);

            $(container).css({
                'overflow': 'hidden',
                'position': 'relative'
            })
            $(this).css({
                'position': 'absolute',
                'width': calculated.width + "%",
                'height': calculated.height + "%",
                // 'top': (100 - calculated.height) / 2 + "%",
                'top': 0,
                'left': (100 - calculated.width) / 2 + "%"
            })
        });
    };

    // TODO: recalculate on resize;

}(jQuery));



if(typeof angular!='undefined')
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
