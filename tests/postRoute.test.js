const request = require('supertest');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config/.env'});
const {disconnect, connect} = require('../db/connect');
const {app} = require('../app');

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('POST /posts', () => {
  const tokenSecret = process.env.TOKEN_SECRET;
  const authToken = jwt.sign({ user: 'jestertester' }, tokenSecret, { expiresIn: '1h' });

  it('should return status code 201 if post was successfully created', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', `authToken=${authToken}`)
      .send({ body: 'New test post' });
    expect(response.status).toBe(201);
  });

  it('should return status code 400 if invalid payload', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Cookie', `authToken=${authToken}`)
      .send({ notBody: 'New test post' });
    expect(response.status).toBe(400);
  });

  it('should return status code 401 if not authenticated', async () => {
    const response = await request(app)
      .post('/posts')
      .send({ body: 'New test post' });
    expect(response.status).toBe(401);
  });
});

describe('DELETE /posts', () => {
  it('should return status 401 if there is no ID', async () => {
    const response = await request(app).delete('/posts').send({id: ''});
    expect(response.status).toBe(401);
  });

  it('should return "No Active LoginToken"', async () => {
    const response = await request(app).delete('/posts').send({id: '6433c1c8487'});
    expect(response.body.message).toBe('No Active LoginToken');
  });
});

describe('GET /posts/all/user', () => {
  it('should 401 and "No Active LoginToken" if try to get all user posts while not logged in', async () => {
    const response = await request(app).get('/posts/all/user');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('No Active LoginToken');
  });
});

describe('PATCH /posts/like', () => {
  it('', async () => {
    const response = await request(app).patch('/posts/like').send({
      id: '6437bda4ec2183e3a3b897af',
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('No Active LoginToken');
  });
});
