import { Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { getSaveUploadPath, makeStoreUploadPath, moveUploadFile, multerFileUpload } from '~/helpers/upload.helper';
import { ResponseBody } from '../../base/models/response-body.model';
import { UploadFileModel } from '../../shared/models/upload-file.model';
import { AuthGuard } from '../../users/guards/auth.guard';

@Controller('uploads')
@ApiTags('systems - upload resource')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UploadsController {
    uploadImageMulter: any;
    uploadFileMulter: any;
    constructor() {
        this.uploadImageMulter = multerFileUpload({
            fileFilter: 'image/*',
            limits: {
                fieldSize: process.env.MAX_IMAGE_UPLOAD_FILE_SIZE,
            },
            tmpPath: 'images',
        }).single('file');

        this.uploadFileMulter = multerFileUpload({
            fileFilter: 'image/*|application/vnd.*|application/ms*|application/pdf|video/*',
            limits: {
                fieldSize: process.env.MAX_UPLOAD_FILE_SIZE,
            },
            tmpPath: 'files',
        }).single('file');
    }

    @Post('upload-image')
    @ApiOperation({ summary: 'upload photo' })
    @ApiConsumes('multipart/form-data')
    async uploadImage(@Req() req: Request, @Res() res: Response) {
        this.uploadImageMulter(req, res, async (err) => {
            const response: ResponseBody = {
                statusCode: HttpStatus.OK,
                data: null,
                message: null,
                error: null,
            };
            if (err) {
                response.error = err.message || err.text;
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
            const file: UploadFileModel = req.file;
            if (file && file.destination && file.filename && !req['file_upload_errors']) {
                const fileSave = await moveUploadFile(file, makeStoreUploadPath('images'));
                if (fileSave) {
                    const savePath = getSaveUploadPath(fileSave.destination, fileSave.filename, '/');
                    response.data = {
                        url: process.env.STATIC_URL + '/media' + savePath,
                        originalname: file.originalname,
                        filename: file.filename,
                        size: file.size,
                        mimetype: file.mimetype,
                    };
                    return res.status(HttpStatus.OK).json(response);
                } else {
                    response.error = 'can not save file';
                    return res.status(HttpStatus.BAD_REQUEST).json(response);
                }
            } else {
                response.error = req['file_upload_errors'] || 'empty file upload';
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        });
    }
    @Post('upload-file')
    @ApiOperation({ summary: 'upload file' })
    @ApiConsumes('multipart/form-data')
    async uploadFile(@Req() req: Request, @Res() res: Response) {
        this.uploadFileMulter(req, res, async (err) => {
            const response: ResponseBody = {
                statusCode: HttpStatus.OK,
                data: null,
                message: null,
                error: null,
            };
            if (err) {
                response.error = err.message || err.text;
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
            const file: UploadFileModel = req.file;
            if (file && file.destination && file.filename && !req['file_upload_errors']) {
                const fileSave = await moveUploadFile(file, makeStoreUploadPath('files'));
                if (fileSave) {
                    const savePath = getSaveUploadPath(fileSave.destination, fileSave.filename, '/');
                    response.data = {
                        url: process.env.STATIC_URL + '/media' + savePath,
                        originalname: file.originalname,
                        filename: file.filename,
                        size: file.size,
                        mimetype: file.mimetype,
                    };
                    return res.status(HttpStatus.OK).json(response);
                } else {
                    response.error = 'can not save file';
                    return res.status(HttpStatus.BAD_REQUEST).json(response);
                }
            } else {
                response.error = req['file_upload_errors'] || 'empty file upload';
                return res.status(HttpStatus.BAD_REQUEST).json(response);
            }
        });
    }
}
