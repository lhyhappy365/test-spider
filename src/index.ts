/**
 * @file index.ts 入口文件
 * @author lhy
 */
import { init } from './init';

const url = 'http://bjyz-crowdtest-main-database-mysql-03.epc.baidu.com:8787/';

/**
 * 初始化
 * @param {Object} url 请求的数据接口链接
 */
init({
    url: url
});
