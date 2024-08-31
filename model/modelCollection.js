
const { sequelize, testConnection } = require('../DBServices/database')
const {DataTypes} = require('sequelize')

const clinic = sequelize.define('clinic', {
  // Define your table's columns here
  idClinique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field:"id_clinique"
  },
  nom: {
    type: DataTypes.STRING,
      allowNull: true,
      field:"nom"
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idCompteBanquaire: {
      type: DataTypes.STRING,
      field:"id_compte_banquaire"
  },
  about: {
    type: DataTypes.STRING,
    allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
      },
}, {
    // Define any additional options here
    tableName: 'clinique', // Optional: Define the table name explicitly
    timestamps: false
});
const account = sequelize.define('account', {
    // Define your table's columns here
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:"user_id"
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true,
        field:"user_name"
    },
    userType: {
        type: DataTypes.ENUM,
        values: ['clinic', 'user'],
        field:"user_type"
    },
    dateAjout: {
        type: DataTypes.DATE,
        allowNull: true,
        field:"date_ajout"
    },
}, {
    // Define any additional options here
    tableName: 'account', // Optional: Define the table name explicitly
    timestamps: false
});

const client = sequelize.define('client', {
    // Define your table's columns here
    idClient: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field:"id_client"
    },
    nom: {
      type: DataTypes.STRING,
        allowNull: true,
        field:"nom"
    },
    prenom: {
      type: DataTypes.STRING,
        allowNull: true,
      field:"prenom"
    },
    dateNaissance: {
        type: DataTypes.DATE,
        field:"date_naissance"
    },
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id"
        },
  }, {
      // Define any additional options here
      tableName: 'client', // Optional: Define the table name explicitly
      timestamps: false
  });

module.exports = {
    clinic,
    account,
    client
}