/**
 * @file 初始化
 * @author lhy
 */
import { wirteResource } from './util';
import { getDiffResource } from "./get-resource";
import {
    reportErrorLog,
    reportInfoLog
} from './log/log';
// 输出文件
const OUTPUTFILE = './data/output.data';

export interface ProcessOptions {
    url: string;
}

/**
 * 初始化
 * @param {ProcessOptions} options 参数
 * @param {string} options.url 请求数据的接口
 */
export async function init(options?: ProcessOptions) {
    try {
        let url = '';
        if (!options.url) {
            reportInfoLog('url参数错误');
            return;
        }
        url = options.url;
        const result = await getDiffResource(url);
        wirteResource(result, OUTPUTFILE);
        reportInfoLog('有新增资源');
    } catch (error) {
        reportErrorLog(error);
    }
}
