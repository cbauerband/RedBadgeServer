module.exports = (sequelize, DataTypes) => {
    const BookList = sequelize.define("booklist", {
        listname: {
            type:DataTypes.STRING,
            allowNull: false,
            
        },

        listdescription: {
            type: DataTypes.STRING,
            allownull: false,
            
        },

        owner: {
            type: DataTypes.INTEGER
        }

    });

    return BookList;
}