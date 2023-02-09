'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'UserId', {});
  }
};
