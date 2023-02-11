import crypto from 'crypto';
import dayjs from 'dayjs';
import glob from 'glob';
import { UAParser } from 'ua-parser-js';

export function random(length: number, chars?: string) {
    chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
    const rnd = crypto.randomBytes(length);
    const value = new Array(length);
    const len = Math.min(256, chars.length);
    const d = 256 / len;

    for (let i = 0; i < length; i++) {
        value[i] = chars[Math.floor(rnd[i] / d)];
    }
    return value.join('');
}

export function privatePhone(phone: string, n = 3) {
    const rest = phone.length - n;
    return phone.slice(0, Math.ceil(rest / 2) + 1) + 'x'.repeat(n) + phone.slice(-Math.floor(rest / 2) + 1);
}

export function genSha256(hashString: string) {
    return crypto.createHash('sha256').update(hashString).digest('hex');
}

export function parseUserAgent(userAgent: string) {
    return new UAParser(userAgent).getResult();
}

export function convertStringToDate(dateString: string, dateFortmat: string, type?: string): Date {
    let date = null;
    switch (type) {
        case 'start_date':
            date = dayjs(dateString, dateFortmat).startOf('day').toDate();
            break;
        case 'end_date':
            date = dayjs(dateString, dateFortmat).endOf('day').toDate();
            break;
        default:
            date = dayjs(dateString, dateFortmat).toDate();
            break;
    }
    return date;
}

export function convertDateToVnDateSting(date: Date) {
    const baseDate = dayjs(date);
    const dayOfWeek = baseDate.day() === 0 ? 'chủ nhật' : `thứ ${baseDate.day() + 1}`;
    const day = baseDate.format('DD');
    const year = baseDate.format('YYYY');
    const month = baseDate.format('M');
    const hour = baseDate.format('HH');
    const min = baseDate.format('mm');
    return `${dayOfWeek} ngày ${day} tháng ${month} năm ${year}, vào lúc ${hour} giờ ${min} phút `;
}

export function macroReplace(textReplace: string, paramsValue: any) {
    return textReplace.replace(/\[(.*?)\]/g, (m, $1) => {
        if (paramsValue[$1]) {
            return paramsValue[$1];
        }
        return m;
    });
}

export function scanFiles(willCard: string, options) {
    return new Promise((res, rej) => {
        glob(willCard, options, (err, matchers: string[]) => {
            if (err) {
                rej(err);
            }
            res(matchers);
        });
    });
}

export function parseStringToJson(jsonString: string) {
    try {
        const parseResult = JSON.parse(jsonString);
        return parseResult;
    } catch (error) {
        return false;
    }
}

export function isVietnamesePhone(phoneNumber: string): boolean {
    return /(((\+|)84)|0)([35789])(\d{8})\b/.test(phoneNumber);
}
