//秘钥
const key="34a32c01-f408-4e78-a787-edb5e37a50b3";

function LuiSecret(){}

LuiSecret.Crypto = function(text) {
    let result = "";
    for (i = 0; i < text.length; i++) {             // 分解字符串为字符
        for (j = 0; j < key.length; j++) {
            var key_c = key.charCodeAt(j);              // 字符转为 Unicode 编码
            var text2 = text.charCodeAt(i) ^ key_c;   // ^运算
        }
        result += String.fromCharCode(text2);      //  Unicode 编码 转为字符拼接成字符串
    }
    return result;
}
