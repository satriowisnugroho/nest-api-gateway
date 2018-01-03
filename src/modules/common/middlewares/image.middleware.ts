import * as multer from 'multer';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

const upload = multer();

@Middleware()
export class ImageMiddleware implements NestMiddleware {
  resolve() {
    return (req, res: Response, next: NextFunction) => {
      const cpUpload = upload.fields([
        { name: 'id_image' },
        { name: 'store_image' },
        { name: 'selfie_image' },
      ]);

      cpUpload(req, res, () => {
        try {
          req.body = {
            ...req.body,
            id_image: req.files.id_image[0].buffer.toString('base64'),
            store_image: req.files.store_image[0].buffer.toString('base64'),
            selfie_image: req.files.selfie_image[0].buffer.toString('base64'),
          };
          next();
        } catch (e) {
          next();
        }
      });
    };
  }
}