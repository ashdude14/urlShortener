// Message Digest 4 Steps
// 1. Append Padding List
// 2. Append 64 bit Representation
// 3. Initialize MD Buffer -buffer size 32
// Process Each Block
// eg. let's take message= 1000 bits
// 512*2= 1024, 512*3= 1536, 512*4=2048, so on..
// 1536- 64= 1472=> 1000(mesaage) + 472
// 1472+ 64 = 1536(exaclt multiple of 512)
// MD of 1536 creation => bloock-1(512), block-2(512), block-3(512),

const md5 = (str) => {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }

    var s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];
    var K = [];
    for (var i = 0; i < 64; ++i) {
        K.push(Math.floor(Math.abs(Math.sin(i + 1)) * Math.pow(2, 32)));
    }

    var a = 0x67452301;
    var b = 0xefcdab89;
    var c = 0x98badcfe;
    var d = 0x10325476;

  
    for (var i = 0; i < bytes.length; i += 64) {
        var AA = a;
        var BB = b;
        var CC = c;
        var DD = d;

        for (var j = 0; j < 64; ++j) {
            var F, g;
            if (j < 16) {
                F = (b & c) | ((~b) & d);
                g = j;
            } else if (j < 32) {
                F = (d & b) | ((~d) & c);
                g = (5 * j + 1) % 16;
            } else if (j < 48) {
                F = b ^ c ^ d;
                g = (3 * j + 5) % 16;
            } else {
                F = c ^ (b | (~d));
                g = (7 * j) % 16;
            }
            var temp = d;
            d = c;
            c = b;
            b = b + leftRotate((a + F + K[j] + bytes[i + g]), s[j]);
            a = temp;
        }

        a += AA;
        b += BB;
        c += CC;
        d += DD;
    }

  
    function toHex(n) {
        var hexChars = "0123456789abcdef";
        var result = "";
        for (var i = 0; i < 4; ++i) {
            result += hexChars.charAt((n >> (i * 8 + 4)) & 0xF) +
                hexChars.charAt((n >> (i * 8)) & 0xF);
        }
        return result;
    }

    return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}


function leftRotate(x, c) {
    return (x << c) | (x >>> (32 - c));

}
console.log(md5("AShish"))