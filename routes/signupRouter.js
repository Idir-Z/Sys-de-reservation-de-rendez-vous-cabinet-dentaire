const express = require('express');
const router = express.Router();
const clinicController = require('../control/clinicControl');
const clientController = require('../control/clientControl');

router.post('signup/client', clientController.saveClient);
router.post('signup/clinic', clinicController.saveClinic);

module.exports = router;