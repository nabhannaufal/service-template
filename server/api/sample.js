const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const SampleHelper = require('../helpers/SampleHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const getListPhonebook = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.getAllList();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const addPhonebook = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.addPhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Add Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editPhonebook = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.editPhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Edit Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deletePhonebook = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.deletePhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Delete Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

// sample CRUD with sql
router.get('/v1/phonebook', CommonHelper.preHandler, getListPhonebook);
router.post('/v1/phonebook', CommonHelper.preHandler, addPhonebook);
router.put('/v1/phonebook/:id', CommonHelper.preHandler, editPhonebook);
router.delete('/v1/phonebook/:id', CommonHelper.preHandler, deletePhonebook);

module.exports = router;
