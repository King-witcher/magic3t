'use strict'

const { Model, DataTypes } = require('sequelize')

module.exports = sequelize => {
    class User extends Model {
        static autoSync = true

        static associate(models) {
            User.hasMany(models.Token)
        }
    }
    
    User.init({
        username: DataTypes.STRING(16),
        nickname: DataTypes.STRING(16),
        email: DataTypes.STRING(320),
        checkedEmail: DataTypes.BOOLEAN,
        passwordDigest: DataTypes.STRING(64)
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
    })
}