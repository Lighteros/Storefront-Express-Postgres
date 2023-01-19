import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getOneProduct } from './product.controller';
import authenticationMiddleware from '../../middleware/auth';

const productRoute = express.Router();

productRoute.post('/', authenticationMiddleware, createProduct);
productRoute.get('/', getAllProducts);
productRoute.get('/:productId', getOneProduct);
productRoute.delete('/:productId', authenticationMiddleware, deleteProduct);

export default productRoute;
