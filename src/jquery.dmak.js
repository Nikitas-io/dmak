/** 
 * Draw Me a Kanji - version: 0.1
 * Plugin jQuery
 *
 * https://github.com/mbilbille/drawmeakanji
 * https://github.com/mbilbille
 *
 * Licensed under the MIT license.
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "drawMeAKanji";

    // The actual plugin constructor
    function Plugin ( element, text, options ) {
        this.element = element;
        this.text = text;
        this.options = $.extend( {}, options, {'element' : $(element).attr('id')} );
        this._name = pluginName;
        this.dmak = null;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.dmak = new dmak(this.text, this.options);
        },
        reset: function() {
            this.dmak.erase();
        },
        pause: function() {
            console.log("pause");
            this.dmak.pause();
        },
        play: function() {
            console.log("render");
            this.dmak.render();
        },
        rewind: function (x) {
            console.log("rewind");
            this.dmak.eraseLastStrokes(x);
        },
        forward: function (x) {
            console.log("forward");
            this.dmak.renderNextStrokes(x);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( text, options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, text, options ) );
            }
            else if ($.isFunction(Plugin.prototype[text])) {
                $.data(this, 'plugin_' + pluginName)[text](options);
            }
        });
    };

})( jQuery, window, document );
