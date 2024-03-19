'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Event = require('./event')
const Band = require('./band')

module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Meet_Greet.init({
    meet_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    event: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    band: {
      type: DataTypes.INTEGER,
      reference: {
        model: Band,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
  });
  return Meet_Greet;
};