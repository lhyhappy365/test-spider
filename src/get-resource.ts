/**
 * 获取接口资源
 * @file get-resource
 * @author lhy
 */
import cheerio from 'cheerio';
import { readFileSync, open } from 'fs';
import { wirteResource } from './util';
import { fetchData } from './fetch-data';
import {
    reportErrorLog,
    reportInfoLog
} from './log/log';

const EXISTENCE = './data/existence.data';

/**
 * 获取到新增的资源
 * @param {string} url 请求数据的接口链接
 * @return {string} result 新增的资源
 */
export async function getDiffResource(url: string) {
    try {
        const type = parseUrl(url);
        const data = await fetchData(url);
        if (!data) {
            reportInfoLog(`${type}: 没有获取到资源`);
            return;
        }
        const currentResource = getCurrentResource(data, type);
        const existResource = getExistResource();
        if (currentResource.length === existResource.length) {
            reportInfoLog(`${type}: 资源无新增`);
            return;
        }
        const newExistResource = currentResource.join('\n');
        wirteResource(newExistResource, EXISTENCE);
        let result = '';
        for (let i = 0; i < currentResource.length; i++) {
            result += existResource.indexOf(currentResource[i]) < 0
                ? currentResource[i] + '\n'
                : '';
        }
        return result;
    } catch (error) {
        reportErrorLog(error);
    }
}

/**
 * 解析请求链接
 * @param {string} url 请求数据接口链接 
 * @return {string} type url请求返回的数据格式
 *         {string} html 返回html格式
 *         {string} json 返回json格式
 *         {string} list 返回字符串格式
 */
export function parseUrl(url: string): string {
    if (!url) {
        reportInfoLog('url参数为空');
        return;
    }
    const arr = url.split('/');
    const last = arr.pop();
    if (!last) {
        return 'html';
    }
    return last;
}

/**
 * 获取当前的资源
 * @param {Object} data 获取的资源数据
 * @param {string} type 获取的资源数据类型
 * @return {Array} result
 */
export function getCurrentResource(data: string, type: string): string[] {
    switch (type) {
        case 'html':
            return parseHtmlData(data);
        case 'json':
            return parseJsonData(data);
        case 'list':
            return parseTextData(data);
        default:
            reportInfoLog('不支持的数据格式');
            return [];
    }
}

/**
 * 解析html格式的数据
 * @param {string} data 获取的资源数据
 * @return {Array} result 返回处理以后的数据
 */
export function parseHtmlData(data:string): string[] {
    if (!data) {
        reportInfoLog('获取不到数据');
        return [];
    }
    const $ = cheerio.load(data);
    const itemList = $('.item-id');
    const result = [];
    itemList.each(function (index, item) {
        result.push($(item).text());
    });
    return result;
}

/**
 * 解析json格式的数据
 * @param {string} data 获取的资源数据
 * @return {Array[string]} result 返回处理以后的数据
 */
export function parseJsonData(data: string): string[] {
    if (!data) {
        reportInfoLog('获取不到数据');
        return [];
    }
    const parseData = JSON.parse(data);
    const result = [];
    for (const item of parseData) {
        item && result.push(item);
    }
    return result;
}

/**
 * 解析text格式的数据
 * @param {string} data 获取的资源数据
 * @return {Array[string]} result 返回处理以后的数据
 */
export function parseTextData(data: string): string[] {
    if (!data.trim()) {
        reportInfoLog('获取不到数据');
        return [];
    }
    const parseData = data.trim().split('\n');
    const result = [];
    for (const item of parseData) {
        item && result.push(item);
    }
    return result;
}

/**
 * 获取已经存在的资源
 * @return {Array}
 */
export function getExistResource(): string[] {
    const existResource = readFileSync(EXISTENCE);
    const existResourceArr: string[] = existResource.toString().split('\n');
    return existResourceArr;
}
