

var laptopDao = require('../daos/laptopDao');
function getLaptopDetails (callback) {
    laptopDao.getAll(callback);
}
function addLaptop(data, callback) {
    laptopDao.create(data, callback);
}
function deleteLaptop(data,callback)
{
    laptopDao.remove(data,callback)
}

module.exports.getLaptopDetails = getLaptopDetails;
module.exports.addLaptop = addLaptop;
module.exports.deleteLaptop=deleteLaptop;