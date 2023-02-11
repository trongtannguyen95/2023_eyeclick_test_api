export interface UploadFileModel {
    fieldname?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    destination?: string;
    filename?: string;
    path?: string;
    size?: number;
    buffer?: Buffer;
    info?: any;
    thumbnail?: any;
}
