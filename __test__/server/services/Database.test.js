const MySQL = require('mysql2/promise');
const { getListPhonebook, addPhonebook, editPhonebook, deletePhonebook } = require('../../../server/services/Database');

jest.mock('mysql2/promise', () => {
  const queryMock = jest.fn();
  const releaseMock = jest.fn();
  return {
    createPool: () => ({
      getConnection: () => ({
        query: queryMock,
        release: releaseMock
      })
    })
  };
});

describe('Phonebook CRUD operations', () => {
  let queryMock;
  let releaseMock;

  beforeEach(() => {
    queryMock = MySQL.createPool().getConnection().query;
    releaseMock = MySQL.createPool().getConnection().release;
    jest.clearAllMocks();
  });

  describe('getListPhonebook', () => {
    it('should return phonebook list', async () => {
      const mockQuery = [
        { id: 1, name: 'Nabhan XL', number: '+62818666040' },
        { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getListPhonebook();
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getListPhonebook()).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('addPhonebook', () => {
    it('should successfully add phonebook entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      await addPhonebook('Nabhan TSEL', '+6281229743370');
      expect(queryMock).toHaveBeenCalled();
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(addPhonebook('Nabhan TSEL', '+6281229743370')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('editPhonebook', () => {
    it('should return true when editing phonebook entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await editPhonebook(1, 'Nabhan TSEL', '+6281229743370');
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(editPhonebook(1, 'Nabhan TSEL', '+6281229743370')).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('deletePhonebook', () => {
    it('should return true when deleting phonebook entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await deletePhonebook(1);
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(deletePhonebook(1)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });
});
