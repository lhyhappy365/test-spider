import {
    getDiffResource,
    parseUrl,
    getCurrentResource,
    parseHtmlData,
    parseJsonData,
    parseTextData
} from '../src/get-resource';

describe('get-resource test', () => {
    it('parseUrl test', () => {
        const url1 = 'http://bjyz-crowdtest-main-database-mysql-03.epc.baidu.com:8787/json'
        const result1 = 'json';
        expect(parseUrl(url1)).toEqual(result1);
    
        const url2 = 'http://bjyz-crowdtest-main-database-mysql-03.epc.baidu.com:8787/list'
        const result2 = 'list';
        expect(parseUrl(url2)).toEqual(result2);
   
        const url3 = 'http://bjyz-crowdtest-main-database-mysql-03.epc.baidu.com:8787/'
        const result3 = 'html';
        expect(parseUrl(url3)).toEqual(result3);
    });

    it('getCurrentResource test', () => {
        const data = 'm91781946464\nm91781946465\n';
        const type = 'list';
        const result = ['m91781946464', 'm91781946465'];
        expect(getCurrentResource(data, type)).toEqual(result);
    });

    it('parseHtmlData test', () => {
        const data = `<!doctype html>
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <div class="item-id">m91781946464</div>
        <div class="item-id">m91781946465</div>
        </body>
        </html>`;
        const result = ['m91781946464', 'm91781946465'];
        expect(parseHtmlData(data)).toEqual(result);
    });
    it('parseJsonData test', () => {
        const data = '["m91781946464", "m91781946465"]';
        const result = ['m91781946464', 'm91781946465'];
        expect(parseJsonData(data)).toEqual(result);
    });
    it('parseTextData test', () => {
        const data = 'm91781946464\nm91781946465\n';;
        const result = ['m91781946464', 'm91781946465'];
        expect(parseTextData(data)).toEqual(result);
    });
})
