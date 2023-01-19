import Order from '../../models/Order';

const orderModel = new Order();

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
