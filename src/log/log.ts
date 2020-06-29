/**
 * 日志模块
 * @file log
 * @author lhy
 */
import { appendFile } from 'fs';
const LOGERRORFILE = './log/logError.txt';
const LOGINFOFILE = './log/logInfo.txt';

/**
 * 记录错误日志
 * @param {Object} error 错误信息
 */
export function reportErrorLog(error: Error) {
    const logMessage = new Date() + '\n'
    + 'Error: ' + JSON.stringify(error) + '\n';
    appendFile(LOGERRORFILE, logMessage, function (err) {
        if (err) {
            throw err;
        }
    });
}

/**
 * 记录日志
 * @param {string} info 日志信息
 */
export function reportInfoLog(info: string) {
    const logMessage = new Date() + '\n'
    + 'Info: ' + JSON.stringify(info) + '\n';
    appendFile(LOGINFOFILE, logMessage, function (err) {
        if (err) {
            throw err;
        }
    });
}
