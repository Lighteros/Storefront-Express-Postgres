import { User, AUTH } from '../../models/User';

const user = new User();

describe('User Model', () => {
  it('should have an register method', () => {
    expect(user.register).toBeDefined();
  });

  it('should have an login method', () => {
    expect(user.login).toBeDefined();
  });

  it('should have an get all user method', () => {
    expect(user.getUsers).toBeDefined();
  });

  it('should have an get one user method', () => {
    expect(user.getUser).toBeDefined();
  });

  it('should have an delete user method', () => {
    expect(user.deleteUser).toBeDefined();
  });

  it('should have an update user method', () => {
    expect(user.updateUser).toBeDefined();
  });
});

describe('User Model functionalities', () => {
  const user_test: AUTH = {
    username: 'tolulop',
    firstname: 'kola',
    lastname: 'kola',
    password: 'test',
  };
  it('should create a new user', async () => {
    const newUser = await user.register(user_test);
    const id = newUser.id as unknown as number;
    if (newUser) {
      expect(newUser.firstname).toBe(user_test.firstname);
      expect(newUser.lastname).toBe(user_test.lastname);
      expect(newUser.username).toBe(user_test.username);
    }

    user.deleteUser(id);
  });

  it('should be able to login', async () => {
    const newUser = await user.register(user_test);
    const loggedInUser = await user.login(newUser.username as unknown as string);
    expect(loggedInUser.firstname).toBe(user_test.firstname);
    expect(loggedInUser.lastname).toBe(user_test.lastname);
    expect(loggedInUser.username).toBe(user_test.username);
    await user.deleteUser(newUser.id as unknown as number);
  });

  it('should be able to get all users', async () => {
    const newUser = await user.register(user_test);
    const id = newUser.id as unknown as number;
    const users = await user.getUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(user).toBeTruthy();
    await user.deleteUser(id);
  });

  it('should update a user', async () => {
    const newUser: AUTH = await user.register(user_test);
    const id = newUser.id as unknown as number;
    const { firstname, lastname } = await user.updateUser('tolu', 'jide', id);
    expect(firstname).toBe('tolu');
    expect(lastname).toBe('jide');
    await user.deleteUser(id);
  });

  it('should delete a new user', async () => {
    const newUser = await user.register(user_test);
    const deleteUser = await user.deleteUser(newUser.id as unknown as number);
    expect(deleteUser).toBeUndefined();
  });
});
