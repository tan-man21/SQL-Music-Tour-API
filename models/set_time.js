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
    static associate({ Band, Event, Stage }) {
      // define association here
      Set_Time.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band'
      })

      Set_Time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })

      Set_Time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      })
    }
  }
  Set_Time.init({
    set_time_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'event_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    stage_id: DataTypes.INTEGER,
    band_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Band,
        key: 'band_id',
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