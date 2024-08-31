const express = require('express');
const router = express.Router();
const clinicController = require('../control/clinicControl');

// Route to get all clinics with pagination
router.get('/clinics', clinicController.getClinics);
router.post('/clinics', clinicController.saveClinic);
router.get('/clinics/:id', clinicController.getClinicById);
router.delete('/clinics/:id', clinicController.deleteClinicById);
router.patch('/clinics/:id', clinicController.updateClinicById)
module.exports = router;
