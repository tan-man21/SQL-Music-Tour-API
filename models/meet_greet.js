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
    static associate({ Band, Event }) {
      // define association here
      Meet_Greet.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'bands'
      })

      Meet_Greet.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'events'
      })
    }
  }
  Meet_Greet.init({
    meet_greet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    meet_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    event_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Event,
        key: 'event_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    band_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Band,
        key: 'band_id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
  });
  return Meet_Greet;
};