import { Product } from '../../models/Products';

const productModel = new Product();

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
