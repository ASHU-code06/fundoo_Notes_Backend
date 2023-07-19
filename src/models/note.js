'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  note.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      createdBy:DataTypes.INTEGER,
      isTrash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Set a default value for isTrash because without default value it was coming undefined
      },
      isArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Set a default value for isArchive because without default value it was coming undefined
      },
    },
    {
      sequelize,
      modelName: 'note'
    }
  );
  return note;
};
