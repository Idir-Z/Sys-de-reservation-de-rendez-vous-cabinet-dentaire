const express = require('express');
const router = express.Router();
const clientController = require('../control/clientControl');

// Route to get all clients with pagination
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.saveClient);
router.get('/clients/:id', clientController.getClientById);
router.delete('/clients/:id', clientController.deleteClientById);
router.patch('/clients/:id', clientController.updateClientById)
module.exports = router;
