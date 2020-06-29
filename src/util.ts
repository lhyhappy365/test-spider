/**
 * 通用函数
 * @file util
 * @author lhy
 */
import { writeFile } from 'fs';
import { 
    reportErrorLog
} from './log/log';
/**
 * 将数据写入文件中
 * @param {string} result
 */
export function wirteResource(result: string, file: string) {
    result && writeFile(file, result, function (err) {
        if (err) {
            reportErrorLog(err);
        }
    });
}
