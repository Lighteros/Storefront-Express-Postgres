import Client from '../database';
import { BadRequest, CustomError } from '../middleware/globalErrorHandler';

export interface PRODUCT {
  name: string;
  price: string;
  category: string;
  id?: number;
}

export class Product {
  async create(product: PRODUCT): Promise<PRODUCT> {
    try {
      const { name, price, category } = product;
      const sql = 'INSERT INTO products (name,price,category) VALUES($1, $2, $3) RETURNING *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [name, price, category]);
      connection.release();
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequest(error.message);
      }
      throw new CustomError('something went wrong');
    }
  }
  async index(): Promise<PRODUCT[]> {
    try {
      const sql = 'SELECT * FROM products';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(error.message);
      }
      throw new CustomError('something went wrong');
    }
  }

  async show(id: number): Promise<PRODUCT> {
    try {
      const sql = 'SELECT * FROM products WHERE id = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw new CustomError(`Product with id '${id}' cannot be fetched from database: ${error}`);
    }
  }

  async showCategory(category: string): Promise<Promise<PRODUCT[]>> {
    try {
      const sql = 'SELECT * FROM products WHERE category = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [category]);
      connection.release();
      return rows;
    } catch (error) {
      throw new CustomError(`Database error: ${error}`);
    }
  }

  async delete(id: number): Promise<PRODUCT> {
    try {
      const sql = 'DELETE FROM products WHERE id = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw new CustomError(`Database error: ${error}`);
    }
  }
}
