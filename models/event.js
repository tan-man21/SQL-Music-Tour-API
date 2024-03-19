'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Stage = require('./stage')
const Band = require('./band')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    stage: {
      type: DataTypes.INTEGER,
      reference: {
        model: Stage,

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
    modelName: 'Event',
  });
  return Event;
};