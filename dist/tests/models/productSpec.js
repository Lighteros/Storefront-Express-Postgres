"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = require("../../models/Products");
const productModel = new Products_1.Product();
describe('Product Model', () => {
    it('should have create Product model', async () => {
        expect(productModel.create).toBeDefined();
    });
    it('should have index model', async () => {
        expect(productModel.index).toBeDefined();
    });
    it('should have show model', async () => {
        expect(productModel.show).toBeDefined();
    });
    it('should have show category model', async () => {
        expect(productModel.showCategory).toBeDefined();
    });
    it('should have delete Product model', async () => {
        expect(productModel.delete).toBeDefined();
    });
});
