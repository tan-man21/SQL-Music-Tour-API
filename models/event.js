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
    static associate({ Stage, Stage_Event, Meet_Greet, Set_Time}) {
      // define association here
      Event.belongsToMany(Stage, {
        foreignKey: 'event_id',
        as: 'stages',
        through: Stage_Event
      })

      Event.hasMany(Meet_Greet, {
        foreignKey: 'event_id',
        as: 'meet_greets',
      })

      Event.hasMany(Set_Time, {
        foreignKey: 'event_id',
        as: 'set_times',
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};