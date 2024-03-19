'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Event = require('./event')
const Stage = require('./stage')

module.exports = (sequelize, DataTypes) => {
  class Stage_Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stage_Events.init({
    stage: {
      type: DataTypes.INTEGER,
      reference: {
        model: Stage,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    event: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Stage_Events',
  });
  return Stage_Events;
};