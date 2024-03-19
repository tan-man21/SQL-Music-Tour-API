'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Event = require('./event')
const Band = require('./band')

module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Set_Time.init({
    event: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    stage: DataTypes.INTEGER,
    band: {
      type: DataTypes.INTEGER,
      reference: {
        model: Band,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Set_Time',
  });
  return Set_Time;
};