

var laptopDao = require('../daos/laptopDao');
var mongodb = require('../daos/MongodDbUtil');
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

function updateLaptop(data, callback) {
    var query = {
        _id : mongodb.ObjectID(data._id)
    };
    var detailsToUpdate = {
        brandname : data.brandname,
        model: data.model,
        screensize: data.screensize,
        price: data.price,
        ram : data.ram,
        warrenty: data.warrenty,
        manufacturing_date: data.manufacturing_date,
        cpu : data.cpu,
        battery: data.battery,
        colours: data.colours
      
       
    };
    laptopDao.update(query, detailsToUpdate, callback);
}
function aggregate(callback) {
    let arr=[];
        arr.push({
            $group: {
                _id:{brandname:"$brandname",model:"$model"},
                count: { $sum: 1 }
            }
        })
    

    laptopDao.aggregate(arr, callback);
}
module.exports.getLaptopDetails = getLaptopDetails;
module.exports.addLaptop = addLaptop;
module.exports.deleteLaptop=deleteLaptop;
module.exports.updateLaptop=updateLaptop;
module.exports.aggregate=aggregate;