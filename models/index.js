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

sequelize.authenticate().then(() => console.log("Banco de dados autenticado com sucesso."))

// Separa os arquivos de model
let modelFileNames = fs.readdirSync(__dirname).filter(file => { 
    return (file.match(/\w+Model.js$/)) 
})

// Inicializa cada um
modelFileNames.forEach(file => {
    require('./' + file)(sequelize)
})

// Cria as associações e altera as tabelas de cada model
for (let model in sequelize.models) {
    let modelClass = sequelize.models[model]
    if (modelClass.associate)
        modelClass.associate(sequelize.models)
    if (modelClass.autoSync)
        modelClass.sync({ alter: true })
}

module.exports = sequelize.models;