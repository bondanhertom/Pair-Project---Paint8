'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const profiles = JSON.parse(fs.readFileSync("./data/profiles.json", "utf-8")).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(profiles);
    return queryInterface.bulkInsert("Profiles", profiles, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Profiles", null, {});
  }
};
