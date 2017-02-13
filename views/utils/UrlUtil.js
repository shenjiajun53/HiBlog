/**
 * Created by shenjj on 2017/2/13.
 */
export default class UrlUtil {
    constructor() {

    }

    json2Url(rawUrl, json) {
        let href = Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');
        return rawUrl + "?" + href;
    }

    url2Json(url) {
        let hash;
        let myJson = {};
        let hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (let i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
        }
        return myJson;
    }
}