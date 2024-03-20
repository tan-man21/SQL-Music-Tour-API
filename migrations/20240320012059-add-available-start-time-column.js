'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Bands', 'available_start_time', {
      type: Sequelize.DataTypes.DATE
    }),
    queryInterface.addColumn('Bands', 'end_time', {
      type: Sequelize.DataTypes.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Bands', 'available_start_time', {
      type: Sequelize.DataTypes.DATE
    }),
    queryInterface.removeColumn('Bands', 'end_time', {
      type: Sequelize.DataTypes.DATE
    })
  }
};
