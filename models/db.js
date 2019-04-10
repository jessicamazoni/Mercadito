//Conexão com o banco

const Sequelize = require("sequelize")

const sequelize = new Sequelize('crud','root','',{
	host: "localhost",
	dialect: "mysql",
	define:{
		timestamps: false
	}
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}

