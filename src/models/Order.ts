/* eslint-disable no-useless-catch */
import Client from '../database';

export interface OrderInterface {
  products: OrderProduct[];
  userId: number;
  status: boolean;
}

export interface OrderExtend extends OrderInterface {
  id: number;
}

export interface OrderProduct {
  productId: number;
  quantity: number;
}

class Order {
  async create(order: OrderInterface): Promise<OrderExtend> {
    const { products, userId, status } = order;

    try {
      const orderSql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`;
      const connection = await Client.connect();
      const data = await connection.query(orderSql, [userId, status]);

      // const orderProducts = data.rows[0];
      const orderProdSql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
      const orderProducts = [];

      for (const product of products) {
        const { productId, quantity } = product;
        const { rows } = await connection.query(orderProdSql, [data.rows[0].id, productId, quantity]);
        orderProducts.push(rows[0]);
      }
      connection.release();
      return { ...data.rows[0], orderProducts: orderProducts };
    } catch (error) {
      throw error;
    }
  }

  async index(): Promise<OrderExtend[]> {
    try {
      const sql = 'SELECT * FROM orders';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql);
      const orderProductsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';
      const orders = [];
      for (const order of rows) {
        const { rows: orderProductRows } = await connection.query(orderProductsSql, [order.id]);
        orders.push({
          ...order,
          products: orderProductRows,
        });
      }
      connection.release();
      return orders;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async show(orderId: number): Promise<OrderExtend> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=$1';
      const connection = await Client.connect();

      const { rows } = await connection.query(sql, [orderId]);
      return rows[0];
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }

  async delete(orderId: number): Promise<OrderExtend> {
    try {
      const connection = await Client.connect();
      const orderProductsSql = 'DELETE FROM order_products WHERE order_id = ($1)';
      await connection.query(orderProductsSql, [orderId]);
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const { rows } = await connection.query(sql, [orderId]);
      const order = rows[0];
      connection.release();
      return order;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  }
}

export default Order;
