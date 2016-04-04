'use strict';
var console = console || {log:function(){}};

_.mixin({
    getDistanceFromLatLon: function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = _.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = _.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(_.deg2rad(lat1)) * Math.cos(_.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return c;
    }
});

_.mixin({
    getDistanceFromLatLonInKm: function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var c = _.getDistanceFromLatLon(lat1, lon1, lat2, lon2);
        var d = R * c; // Distance in km
        return d;
    }
});

_.mixin({
    getPointOnCircle: function(angle, radius, centerX, centerY) {
        var angle = _.deg2rad(angle);
        return {
            x: radius*Math.cos(angle) + centerX,
            y: radius*Math.sin(angle) + centerY
        }
    }
});

_.mixin({
    deg2rad: function(deg) {
        return deg * (Math.PI/180)
    }
});

_.mixin({trim: function(input) {
    if ( !input )
        return '';
    if ( _.isString(input) )
        return input.replace(/^\s+|\s+$/g, ''); 
    else if ( _.isArray(input) )
        return _.map(input, function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        });
    return '';
}});

_.mixin({toTitleCase: function(str) {
    if ( !str )
        return '';
    return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}});

_.mixin({pushAt: function(source, index, values) {
    if (typeof values !== "array")
        values = [values];
    var args = [index, 0].concat(values);
    return Array.prototype.splice.apply(source, args);
}});

_.mixin({fileExtension: function(str, keepDot) {
    if ( !str )
        return '';
    var split = str.split('.');
    if ( split.length < 2 )
        return '';
    return (keepDot ? '.':'') + split.pop();
}});

_.mixin({unserialize: function(params) {
    var digitTest = /^\d+$/,
        keyBreaker = /([^\[\]]+)|(\[\])/g,
        plus = /\+/g,
        paramTest = /([^?#]*)(#.*)?$/;

    if (! params || ! paramTest.test(params) )
        return {};
    
    var data = {},
        pairs = params.split('&'),
        lastPart,
        current;

    for ( var i=0; i < pairs.length; i++ ) {
        current = data;
        var pair = pairs[i].split('=');

        if(pair.length != 2)
            pair = [pair[0], pair.slice(1).join("=")]

        var key = decodeURIComponent(pair[0].replace(plus, " ")), 
            value = decodeURIComponent(pair[1].replace(plus, " ")),
            parts = key.match(keyBreaker);

        for ( var j = 0; j < parts.length - 1; j++ ) {
            var part = parts[j];
            if (!current[part] )
                current[part] = digitTest.test(parts[j+1]) || parts[j+1] == "[]" ? [] : {}
            current = current[part];
        };
        lastPart = parts[parts.length - 1];
        if ( lastPart == "[]" )
            current.push(value)
        else
            current[lastPart] = value;
    };
    return data;
}});

_.mixin({parseQueryString: function(queryString) {
    var params = {};

    if (queryString) {
        _.each(
            _.map(decodeURI(queryString).split(/&/g),function(el,i){
                var aux = el.split('='), o = {};
                if(aux.length >= 1){
                    var val = undefined;
                    if(aux.length == 2)
                        val = aux[1];
                    o[aux[0]] = val;
                }
                return o;
            }),
            function(o){
                _.extend(params,o);
            }
        );
    };

    return params;
}});


_.mixin({filename: function(path) {
    return _.urlObject({url:path}).filename;
}});

_.mixin({urlObject: function(options) {
    var url_search_arr,
        option_key,
        i,
        urlObj,
        get_param,
        key,
        val,
        url_query,
        url_get_params = {},
        a = document.createElement('a'),
        default_options = {
            'url': window.location.href,
            'unescape': true,
            'convert_num': true
        };
 
    if (typeof options !== "object") {
        options = default_options;
    } else {
        for (option_key in default_options) {
            if (default_options.hasOwnProperty(option_key)) {
                if (options[option_key] === undefined) {
                    options[option_key] = default_options[option_key];
                }
            }
        }
    }
 
    a.href = options.url;
    url_query = a.search.substring(1);
    url_search_arr = url_query.split('&');
 
    if (url_search_arr[0].length > 1) {
        for (i = 0; i < url_search_arr.length; i += 1) {
            get_param = url_search_arr[i].split("=");
 
            if (options.unescape) {
                key = decodeURI(get_param[0]);
                val = decodeURI(get_param[1]);
            } else {
                key = get_param[0];
                val = get_param[1];
            }
 
            if (options.convert_num) {
                if (val.match(/^\d+$/)) {
                    val = parseInt(val, 10);
                } else if (val.match(/^\d+\.\d+$/)) {
                    val = parseFloat(val);
                }
            }
 
            if (url_get_params[key] === undefined) {
                url_get_params[key] = val;
            } else if (typeof url_get_params[key] === "string") {
                url_get_params[key] = [url_get_params[key], val];
            } else {
                url_get_params[key].push(val);
            }
 
            get_param = [];
        }
    }

    urlObj = {
        protocol: a.protocol,
        hostname: a.hostname,
        host: a.host,
        port: a.port,
        hash: a.hash.substr(1),
        pathname: a.pathname,
        filename: a.pathname.split('/').pop(),
        search: a.search,
        parameters: url_get_params
    };
 
    return urlObj;
}});

