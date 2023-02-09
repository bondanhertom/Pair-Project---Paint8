'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const postTags = JSON.parse(fs.readFileSync("./data/postTags.json", "utf-8")).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(postTags);
    return queryInterface.bulkInsert("PostTags", postTags, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("PostTags", null, {});
  }
};
