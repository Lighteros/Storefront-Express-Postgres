"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../models/Order"));
const orderModel = new Order_1.default();
describe('OrderModel', () => {
    it('should have create order method', () => {
        expect(orderModel.create).toBeDefined();
    });
    it('should have index method', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('should have getOneOrder method', () => {
        expect(orderModel.show).toBeDefined();
    });
    it('should have delete order method', () => {
        expect(orderModel.delete).toBeDefined();
    });
});
