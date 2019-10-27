let browserProtocol = window.location.protocol;
let browserHost = window.location.host.split(':')[0];
// let baseURL_dynamic = browserProtocol + "//" + browserHost + ':8080/SiChuanMarket_SSM';
let baseURL_dynamic = browserProtocol + "//" + browserHost + ':8081/SiChuanMarket_SSM';
console.log(baseURL_dynamic);
