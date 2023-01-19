CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username        VARCHAR(150) NOT NULL,
  firstname       VARCHAR(150) NOT NULL,
  lastname        VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  UNIQUE(username)
);

CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(250)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);

CREATE TABLE order_products (
  order_id INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity INTEGER NOT NULL
);