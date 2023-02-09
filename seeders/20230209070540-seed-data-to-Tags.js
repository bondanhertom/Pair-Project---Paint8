'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const tags = JSON.parse(fs.readFileSync("./data/tags.json", "utf-8")).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(tags);
    return queryInterface.bulkInsert("Tags", tags, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tags", null, {});
  }
};
