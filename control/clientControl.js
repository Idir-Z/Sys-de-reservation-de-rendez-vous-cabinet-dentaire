
const { client ,account} = require('../model/modelCollection');
const { validateInt } = require('./validators')
const {sequelize} = require('../DBServices/database')
exports.getClients = async (req, res) => {
    const clients = await client.findAll({ 
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        offset: req.query.pageNumber,
        limit: req.query.pageSize
      });
    res.send(clients)
    
};

exports.saveClient = async (req, res) => {
    let result;
    const { password, mail, user_name, nom, date_naissance, prenom } = req.body;
    let t;
    t = await sequelize.transaction();
  if (account.findOne({ where: { mail: mail } })) {
      result = {success : false, message:'account already exists with this email'}
  } else {
    
    try {
      const newUser = await account.create({
        password: password,
        mail: mail,
        userName: user_name,
        userType: 'client'
      }, { transaction: t });

      // throw new Error();
  
      const uId = newUser.userId;
      // Create a new client
      const newclient = await client.create({
        nom: nom,
        prenom: prenom,
        dateNaissance: date_naissance,
        userId: uId
      }, { transaction: t });
      await t.commit();
  
      result = { success: true, message: "client account created succefully with id = "+ newclient.idClient };
    } catch (error) {
      if (t && t.finished !== 'rollback') await t.rollback(); // Ensure transaction is not already rolled back
      result = { success: false, message: "Error occurred during client account creation" };
    } }
      // Send response
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    
    
    
  };
  

exports.getClientById = async (req, res) => {
  const clientId = req.params.id;
  let clients = null
  try{
  clients = await client.findByPk(clientId);
    res.send(clients)
  }
  catch (error) {
    console.log(error)
    res.status(500).send('error getting client')
  }
}

exports.deleteClientById = async (req, res) => {
  let result;
  const id = req.params.id;
  try {
    const cl = await client.findByPk(id, {
      attributes: ['userId'] // Specify the attribute(s) to include in the result
    });
    const userid = cl.userId;
      await account.destroy({
        where: {
          userId: userid,
        },
      });
        result =  { success: true , message: "client deleted succesfully" };
      
    
  } catch (error) {
    result = {success:false, message:"failed to delete"}
  }
  res.send(result)
}
exports.updateClientById = async (req, res) => {
  let result = {success : false, message : 'internal error in client update'};
  const id = req.params.id;
  const { nom, address, id_compte_banquaire, about, mail, password, user_name } = req.body;
  const clientData = { nom, address, id_compte_banquaire, about }
  const accountData = {mail,password,user_name}
  let t;
  try {
    t = sequelize.transaction()
    const linkedAccount = await client.findByPk(id, { attributes: ['userId'], })
    const accountId = linkedAccount.userId
    
    await client.update(clientData, {
      where: {idClinique: id}
    }, { transaction: t })

    await account.update(accountData, {
      where: {userId: accountId}
    }, { transaction: t })
    result = {success: true,message:'succefully updated client'}

  } catch (error) {
    console.log(error)
    result = {success: false, message:'error updating client'}
  }
  res.send(result)
}