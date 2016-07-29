var env = module.exports = {};

env.mailgunPearlsAPI = function() {
    return process.env.mailgunPearlsAPI;
};

env.mailgunPearlsDomain = function() {
    return process.env.mailgunPearlsDomain;
};

env.himo = function() {
    return process.env.toAddress;
}

env.password = function(){
    return process.env.vendorPW;
}

module.exports
