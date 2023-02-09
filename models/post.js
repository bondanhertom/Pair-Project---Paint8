'use strict';
const generateRelativeTime = require("../helper");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsToMany(models.Tag, {
        through: models.PostTag
      });
    }

    get time() {
      return generateRelativeTime(this.createdAt);
    }

  }

  Post.init({
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  Post.beforeCreate((post, option) => {
    post.likes = 0;
    post.dislikes = 0;
  });
  return Post;
};