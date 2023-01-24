/* eslint-disable no-useless-catch */
import Client from '../database';
import bcrypt from 'bcryptjs';
import { BadRequest, CustomError } from '../middleware/globalErrorHandler';

export interface AUTH {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  id?: number;
}

export class User {
  async register(user: AUTH): Promise<AUTH> {
    try {
      const { username, firstname, lastname, password } = user;
      const userExistsSql = `SELECT username FROM users WHERE username = $1`;
      const sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES($1, $2, $3, $4) RETURNING *';
      const connection = await Client.connect();
      console.log("=============================")
      const data = await connection.query(userExistsSql, [username]);
      if (data.rows.length >= 1) {
        throw new BadRequest(`Username is in use`);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const { rows } = await connection.query(sql, [username, firstname, lastname, hashedPassword]);
      connection.release();
      return rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequest(error.message);
      }
      throw new CustomError('something went wrong', 500);
    }
  }

  async login(username: string): Promise<AUTH> {
    try {
      const sql = 'SELECT * FROM users WHERE username=($1)';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [username]);
      connection.release();
      return rows[0];
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new CustomError(error.message);
      } else {
        throw new CustomError('Something went wrong');
      }
    }
  }

  async getUsers(): Promise<AUTH[]> {
    try {
      const sql = 'SELECT * FROM users';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql);
      connection.release();
      return rows;
    } catch (error: unknown) {
      throw error;
    }
  }

  async getUser(id: number): Promise<AUTH> {
    try {
      const sql = 'SELECT * FROM users WHERE id = ($1)';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error: unknown) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<AUTH> {
    try {
      const sql = 'DELETE FROM users WHERE id = $1';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async updateUser(firstname: string, lastname: string, id: number): Promise<AUTH> {
    try {
      const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING  *';
      const connection = await Client.connect();
      const { rows } = await connection.query(sql, [firstname, lastname, id]);
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}
