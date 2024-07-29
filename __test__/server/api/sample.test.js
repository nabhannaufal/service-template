// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const sample = require('../../../server/api/sample');
const Database = require('../../../server/services/Database');

let server;
describe('Sample API', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/sample', sample);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API V1 Query Database', () => {
    describe('GET /v1/phonebook', () => {
      it('should return 200 and phonebook list, when get list phonebook', async () => {
        const mockPhonebookList = [
          { id: 1, name: 'Nabhan XL', number: '+62818666040' },
          { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
        ];
        jest.spyOn(Database, 'getListPhonebook').mockResolvedValue(mockPhonebookList);

        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'getListPhonebook').mockResolvedValue([]);
        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'getListPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v1/phonebook', () => {
      it('should return 200 and success message, when add phonebook', async () => {
        jest.spyOn(Database, 'addPhonebook').mockResolvedValue('success');
        const response = await Request(server).post('/api/sample/v1/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'addPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/sample/v1/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/phonebook/:id', () => {
      it('should return 200 and success message, when edit phonebook', async () => {
        jest.spyOn(Database, 'editPhonebook').mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          msisdn: '0818666040'
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'editPhonebook').mockResolvedValue(false);
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'editPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/phonebook/:id', () => {
      it('should return 200 and success message, when delete phonebook', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockResolvedValue(false);
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(500);
      });
    });
  });
});
