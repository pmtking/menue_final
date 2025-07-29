import express from 'express'
import AddProductController from './ProductController';
import upload from '../middlewares/upload';

const productRouter = express.Router()

productRouter.post('/add' ,upload.single("image") , AddProductController)

export default productRouter ;
