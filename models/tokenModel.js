'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = sequelize => {
    class Token extends Model {
        static autoSync = true

        static associate(models) {
            Token.belongsTo(models.User, { 
                onDelete: 'cascade',
                foreignKey: { allowNull: false },
            })
        }
    }
    
    Token.init({
        token: DataTypes.STRING(64)
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
    })
}