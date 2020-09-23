module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("book", {
    //user is table name
    date: {
      //what type of column is this? you want a string. email is the name of the column
      //type: DataTypes.DATE??
      type: DataTypes.STRING,
      allowNull: false, //won't allow null
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.INTEGER,
    },
    booklist: {
      type: DataTypes.INTEGER,
    },
  });
  return Book; //returning what we created
};
