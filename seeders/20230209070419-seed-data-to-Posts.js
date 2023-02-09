'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8")).map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(posts);
    return queryInterface.bulkInsert("Posts", posts, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
