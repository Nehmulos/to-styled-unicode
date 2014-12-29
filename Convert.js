var Convert = (function() {

    function convert(format, str) {
        return str.split("").map(function(c) {
            var code = c.charCodeAt(0);
            var big = String.fromCharCode(format.big[0], format.big[1] - 65 + code);
            var small = String.fromCharCode(format.small[0], format.small[1] - 97 + code);
            if (code >= 65 && code <= 90) {
                return big;
            } else if (code >= 97 && code <= 122) {
                return small;
            }
            return c;
        }).join("");
    }

    function partial(fn, args) {
        return function() {
            var mergedArgs = args.concat(Array.prototype.slice.apply(arguments));
            return fn.apply(this, mergedArgs);
        }
    }

    var formats = [
        {
            format: {
                big: [0xD835, 0xDD6C],
                small: [0xD835, 0xDD86]
            },
            key: "fraktur"
        },
        {
            format: {
                big: [0xD835, 0xDCD0],
                small: [0xD835, 0xDCEA]
            },
            key: "small Script"
        },
        {
            format: {
                big: [0x0000, 0xFF21],
                small: [0x0000, 0xFF41],
            },
            key: "Full width"
        },
        {
            format: {
                big: [0xD835, 0xDE70],
                small: [0xD835, 0xDE8A]
            },
            key: "Monospace"
        },
        {
            format: {
                big: [0xD835, 0xDC00],
                small: [0xD835, 0xDC1A]
            },
            key: "bold"
        }
    ];

    var fromatsWithFn = formats.map(function(obj) {
        obj.fn = partial(convert, [obj.format]);
        return obj;
    });

    return {
        formats: fromatsWithFn
    }
})();
