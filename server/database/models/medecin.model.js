const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@localhost/medical");

const Medecin = sequelize.define("medecin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: DataTypes.STRING,
  email: DataTypes.STRING,
  motdepasse: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
  },
});

module.exports = Medecin;
