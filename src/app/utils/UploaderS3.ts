/* eslint-disable @typescript-eslint/no-explicit-any */

import multer from 'multer';
import multerS3 from 'multer-s3';
import { Request } from 'express';
import config from '../config';
import { S3Client } from "@aws-sdk/client-s3"


const s3 = new S3Client({
    region: config.s3.region as string,
    credentials: {
        accessKeyId: config.s3.accessKeyId as string,
        secretAccessKey: config.s3.secretAccessKey as string
    }
})


const s3Upload = (fieldName: string, isMultiple: boolean = false) => {
    const storage = multerS3({
        s3: s3 as any,
        bucket: config.s3.bucket as string,
        contentType: multerS3.AUTO_CONTENT_TYPE, 
        metadata: (req: Request, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: Request, file, cb) => {
            const fileName = `${Date.now().toString()}_${file.originalname}`;
            cb(null, fileName);
        },
    });

    return multer({
        storage,
        limits: { fileSize: 500 * 1024 * 1024 }, 
    }).fields(
        isMultiple
            ? [
                { name: `${fieldName}`, maxCount: 10 }, 
                { name: 'image', maxCount: 10 }, 
                { name: 'video', maxCount: 10 }, 
            ]
            : [{ name: `${fieldName}`, maxCount: 1 }] 
    );
};


export default s3Upload;
