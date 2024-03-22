'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Event = require('./event')
const Stage = require('./stage')

module.exports = (sequelize, DataTypes) => {
  class Stage_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stage_Event.init({
    stage_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Stage,
        key: 'stage_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    stage_name: {
      type: DataTypes.STRING
    },
    event_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'event_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Stage_Event',
  });
  return Stage_Event;
};