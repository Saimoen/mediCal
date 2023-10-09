const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@localhost/medical");

const RendezVous = sequelize.define("rendezvous", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medecin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "medecin", // Remplacez "Medecin" par le nom de la table parente (modèle) à laquelle cette clé étrangère est liée
      key: "id", // Remplacez "id" par le nom de la colonne à laquelle cette clé étrangère est liée dans la table parente
    },
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_et_heure: DataTypes.DATE,
  motif: DataTypes.STRING,
  duree: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
  },
});

module.exports = RendezVous;