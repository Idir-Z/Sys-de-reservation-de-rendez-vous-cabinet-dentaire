
const { clinic ,account} = require('../model/modelCollection');
const { validateInt } = require('./validators')
const {sequelize} = require('../DBServices/database')
exports.getClinics = async (req, res) => {


    const clinics = await clinic.findAll({ 
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        offset: req.query.pageNumber,
        limit: req.query.pageSize
      });
    res.send(clinics)
    
};

exports.saveClinic = async (req, res) => {
    let result;
    const { password, mail, user_name, nom, address, id_compte_banquaire, about } = req.body;
  let t;
  t = await sequelize.transaction();
  
    try {
      const newUser = await account.create({
        password: password,
        mail: mail,
        userName: user_name,
        userType: 'clinic'
      }, { transaction: t });

      // throw new Error();
  
      const uId = newUser.userId;
      // Create a new clinic
      const newClinic = await clinic.create({
        nom: nom,
        address: address,
        idCompteBanquaire: id_compte_banquaire,
        about: about,
        userId: uId
      }, { transaction: t });
      await t.commit();
  
      result = { success: true, message: "Clinic account created succefully with id = "+ newClinic.idClinique };
    } catch (error) {
      if (t && t.finished !== 'rollback') await t.rollback(); // Ensure transaction is not already rolled back
      result = { success: false, message: "Error occurred during Clinic account creation" };
    } finally {
      // Send response
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    }
  };
  

exports.getClinicById = async (req, res) => {
  const clinicId = req.params.id;
  let clinics = null
  try{
  clinics = await clinic.findByPk(clinicId);
    res.send(clinics)
  }
  catch (error) {
    console.log(error)
    res.status(500).send('error getting clinic')
  }
}

exports.deleteClinicById = async (req, res) => {
  let result;
  const id = req.params.id;
  try {
    const cl = await clinic.findByPk(id, {
      attributes: ['userId'] // Specify the attribute(s) to include in the result
    });
    const userid = cl.userId;
      await account.destroy({
        where: {
          userId: userid,
        },
      });
        result =  { success: true , message: "clinic deleted succesfully" };
      
    
  } catch (error) {
    result = {success:false, message:"failed to delete"}
  }
  res.send(result)
}
exports.updateClinicById = async (req, res) => {
  let result = {success : false, message : 'internal error in clinic update'};
  const id = req.params.id;
  const { nom, address, id_compte_banquaire, about, mail, password, user_name } = req.body;
  const clinicData = { nom, address, id_compte_banquaire, about }
  const accountData = {mail,password,user_name}
  let t;
  try {
    t = sequelize.transaction()
    const linkedAccount = await clinic.findByPk(id, { attributes: ['userId'], })
    const accountId = linkedAccount.userId
    
    await clinic.update(clinicData, {
      where: {idClinique: id}
    }, { transaction: t })

    await account.update(accountData, {
      where: {userId: accountId}
    }, { transaction: t })
    result = {success: true,message:'succefully updated clinic'}

  } catch (error) {
    console.log(error)
    result = {success: false, message:'error updating clinic'}
  }
  res.send(result)
}