const Sequelize = require('sequelize')
const fs = require('fs')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
})

// Separa os arquivos de model
let modelFileNames = fs.readdirSync(__dirname).filter(file => { 
    return (file.match(/\w+Model.js$/)) 
})

// Inicializa cada um
modelFileNames.forEach(file => {
    console.log('Require', file)
    require('./' + file)(sequelize)
})

// Cria as associações e altera as tabelas de cada model
for (let model in sequelize.models) {
    console.log('Associate', model)
    let modelClass = sequelize.models[model]
    if (modelClass.associate)
        modelClass.associate(sequelize.models)
    if (modelClass.autoSync)
        modelClass.sync({ alter: true })
}

console.log('Database OK')

module.exports = sequelize.models;