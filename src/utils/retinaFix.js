let ua = window.navigator.userAgent;

let isIOS = /\bi(phone|pad|pod)/i.test(ua);
let devicePixelRatio = +window.devicePixelRatio || 1;
let meta = document.querySelector && document.querySelector('[name="viewport"]');

if(isIOS){
    if(devicePixelRatio >= 2){
        document.documentElement.style.fontSize = '100px';
        meta.content = "width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0";
    }
}
