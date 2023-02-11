import { Logger } from '@nestjs/common';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import mime from 'mime';
import multer from 'multer';
import mv from 'mv';
import { resolve } from 'path';
import sharp from 'sharp';
import { UploadFileModel } from '~shared/models/upload-file.model';
import { random } from './util.helper';

export function multerFileFilterRegExp(pattern) {
    return (req: Request, file: UploadFileModel, cb: { (arg0: any, arg1: boolean): void; (arg0: any, arg1: boolean): void }) => {
        if (file.mimetype.match(new RegExp(pattern)) !== null) {
            cb(null, true);
        } else {
            Logger.log(file);
            req['file_upload_errors'] = `Filetype not allowed ${file.mimetype}. File support: ${pattern}`;
            Logger.error(`Filetype not allowed ${file.mimetype} . File support: ${pattern}`, 'multerFileFilterRegExp');
            cb(null, false);
        }
    };
}

export function multerFilenameWithExtension(req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
        const hash = err ? undefined : raw.toString('hex');
        const ext = mime.getExtension(file.mimetype);
        cb(err, hash + '.' + ext);
    });
}

export function makeStoreUploadPath(folder?: string) {
    const basePath = resolve(`./media`);
    const path = basePath + makeUploadPath(folder);
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    return path;
}

export function makeUploadPath(folder?: string) {
    const subFolder = `${folder ? '/' + folder : ''}/${dayjs().format('YYYY/MM/DD')}/`;
    return subFolder;
}

export function makeStoreTmpUploadPath(folder?: string) {
    const basePath = resolve(`./tmp`);
    const subFolder = makeUploadPath(folder);
    const path = basePath + subFolder;
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
    return path;
}

export function getSaveUploadPath(destination: string, filename: string, subFolder: string) {
    const basePath = resolve(`./media`);
    const tmpPath = resolve(`./tmp`);
    const savePath = destination
        .replace(basePath, '')
        .replace(tmpPath, 'tmp/')
        .replace('/' + subFolder + '/', '');
    return savePath + filename;
}

export async function moveUploadFile(file: UploadFileModel, destination: string) {
    try {
        const newFile = { ...file };
        newFile.destination = destination;
        newFile.path = destination + file.filename;
        // renameSync(file.path, newFile.path);
        await mvFileOrDirectory(file.path, newFile.path);
        return newFile;
    } catch (error) {
        Logger.error(error.message, 'Upload.helper.moveImageUploadFile');
        return null;
    }
}

export async function mvFileOrDirectory(source, dest, options = {}) {
    return new Promise((res, rej) => {
        mv(source, dest, options, (err) => {
            if (err) {
                rej(err);
            }
            res(true);
        });
    });
}

export async function moveImageUploadFile(file: UploadFileModel, destination: string) {
    try {
        const newImageFile = { ...file };
        const objImg = sharp(file.path).rotate();
        await objImg.toFile(destination + file.filename);
        newImageFile.destination = destination;
        newImageFile.path = destination + file.filename;
        newImageFile.info = await objImg.metadata();
        const saveThumbnail = await objImg.resize(300).toFile(destination + 'thumb_' + file.filename);
        if (saveThumbnail) {
            newImageFile.thumbnail = destination + 'thumb_' + file.filename;
        }
        return newImageFile;
    } catch (error) {
        Logger.error(error.message, 'Upload.helper.moveImageUploadFile');
        return file;
    }
}

export function multerFileUpload(options: { fileFilter?: string; limits?: any; tmpPath?: string }): any {
    const multerInstance = multer({
        fileFilter: multerFileFilterRegExp(options.fileFilter),
        limits: options.limits,
        storage: multer.diskStorage({
            destination: (req: Request, file: UploadFileModel, cb: (n: any, filename: string) => any) => {
                cb(null, makeStoreTmpUploadPath(options.tmpPath));
            },
            filename: (req: Request, file: UploadFileModel, cb: (n: any, filename: string) => any) => {
                const filename = random(12) + '_' + (file.originalname as string).replace(' ', '_').replace(/[^.\w]/gi, '');
                cb(null, filename);
            },
        }),
    });
    return multerInstance;
}
