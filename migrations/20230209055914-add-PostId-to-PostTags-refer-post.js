'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PostTags', 'PostId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id"
      }
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.addColumn('PostTags', 'PostId', {});
  }
};
