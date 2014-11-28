var frt_access = require('./fruit_access.js');

var fruit = {"buyer_id": "2","buyer_name": "1","buyer_cellphone": "3","buyer_phone": "4"};

frt_access.get_fruit(function(rt_result){
	console.log(rt_result);
});
