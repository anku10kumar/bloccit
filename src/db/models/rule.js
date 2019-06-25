/*'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule',
  {
    title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false
            },
            topicId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

  },

 {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic, {
       foreignKey: "topicId",
       onDelete: "CASCADE",
     });
  };
  return Rule;
};
*/
