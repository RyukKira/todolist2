const config = {
	environment: getConf("NODE_ENV", "dev"),
	mongoHost: getConf("MONGO_HOST", "localhost"),
	mongoPort: getConf("MONGO_PORT", "27017"),
	mongoUser: getConf("MONGO_USER", ""),
	mongoPassword: getConf("MONGO_PASSWORD", ""),
	mongoDatabase: getConf("MONGO_DATABASE", "todos"),
	HTTPPort: getConf("HTTP_PORT", 3000),
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
