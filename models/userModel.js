'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = async sequelize => {
    class User extends Model {
        static autoSync = true

        static associate(models) {
            User.hasMany(models.Token)
        }
    }
    
    User.init({
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(16),
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
        },
        checkedEmail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        passwordDigest: DataTypes.STRING(64)
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
    })
}