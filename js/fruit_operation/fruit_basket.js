var increase_weight = function(fruit_id){
	console.log(fruit_id);
	for (var i = 0; i < ltlist.size(); i++) {
		if(ltlist.get(i).id==fruit_id){
			ltlist.get(i).pack = parseInt(ltlist.get(i).pack)+1;
		}		
	};

	flush(ltlist);
}

var decrease_weight = function(fruit_id){
	console.log(fruit_id);
	for (var i = 0; i < ltlist.size(); i++) {
		if(ltlist.get(i).id==fruit_id){
			if(ltlist.get(i).pack > 0){
				ltlist.get(i).pack = parseInt(ltlist.get(i).pack)-1;	
			}
		}		
	};

	flush(ltlist);
}

var remove_item = function(fruit_id){
	console.log(fruit_id);
	for (var i = 0; i < ltlist.size(); i++) {
		if(ltlist.get(i).id==fruit_id){
			ltlist.removeIndex(i);
		}		
	};

	flush(ltlist);
}

var flush = function(fruit_items){
	var total_price = 0;
	var items_in_basket = "";
	for (var i = 0; i < fruit_items.size(); i++) {
		var fruit_item = fruit_items.get(i);
		items_in_basket += "<div id='"+fruit_item.id+"'>"
		+"<img src='"+fruit_item.img+"' class='thumbnails'> "
		+fruit_item.category+" "
		+fruit_item.name+" "		                      
		+fruit_item.price+"元/KG "
		+"<button onclick=decrease_weight('"+fruit_item.id+"')>-</button>"
		+fruit_item.pack
		+"KG <button onclick=increase_weight('"+fruit_item.id+"')>+</button>"
		+"<button onclick=remove_item('"+fruit_item.id+"')>删除</button>"
		+"</div>";
		total_price = parseFloat(total_price) + parseFloat((fruit_item.pack*fruit_item.price).toFixed(2));		
	};
	$("#fruit_order").html(items_in_basket);
	$("#total_price").html(total_price);
}

var add_into_fruit_basket = function(){
	$(".add_into_basket").bind("click", function(){
		var id = this.getAttribute("id");
		var category = this.getAttribute("category");	
		var name = this.getAttribute("name");
		var img = this.getAttribute("img");
		var pack = this.getAttribute("pack");
		var price = this.getAttribute("price");

		var fruit = new Object();
		fruit.id = id;
		fruit.category = category;
		fruit.name = name;
		fruit.img = img;
		fruit.pack = pack;
		fruit.price = price;
		fruit.total_price = total_price;

		var has = false;
		if(ltlist.size()>0){
			for (var i = 0; i < ltlist.size(); i++) {
				if(ltlist.get(i).id==fruit.id){
					ltlist.get(i).pack = parseInt(ltlist.get(i).pack)+1;
					has = true;
				}					
			};
		}
		if(!has){
			ltlist.add(fruit);
		}

		flush(ltlist);
	});
}

var save_order = function(buyer_info){
	var fruits = '[';
	for (var i = 0; i < ltlist.size()-1; i++) {
		var fruit_inf = ltlist.get(i);
		var fruit_jso = '{"fruit_id":"'+fruit_inf.id
		                  +'","fruit_category":"'+fruit_inf.category
		                  +'","fruit_name":"'+fruit_inf.name
		                  +'","fruit_img":"'+fruit_inf.img
                          +'","fruit_pack":"'+fruit_inf.pack
                          +'","fruit_price":"'+fruit_inf.price
                          +'"},';
        fruits += fruit_jso;
	};
    var fruit_info = ltlist.get(ltlist.size()-1);
	var fruit_json = '{"fruit_id":"'+fruit_info.id
	              +'","fruit_category":"'+fruit_info.category
                  +'","fruit_name":"'+fruit_info.name
                  +'","fruit_img":"'+fruit_info.img
                  +'","fruit_pack":"'+fruit_info.pack
                  +'","fruit_price":"'+fruit_info.price
                  +'"}';
    fruits += fruit_json;
    fruits += ']';

	var order_json = '{"buyer_id":"'+buyer_info.buyer_id
	                  +'","buyer_name":"'+buyer_info.buyer_name
                      +'","buyer_cellphone":"'+buyer_info.buyer_cellphone
                      +'","buyer_phone":"'+buyer_info.buyer_phone
                      +'","fruits":'+fruits
                      +'}';

	console.log(order_json);

	$.post("http://127.0.0.1:8001/add_fruit", {"order":order_json});
}

var submit_order = function(){
	$("#submit_order").bind("click", function(){
		var buyer_info = new Object();
		buyer_info.buyer_name = $("#buyer_name").val();
		buyer_info.buyer_id = $("#buyer_id").val();
		buyer_info.buyer_cellphone = $("#buyer_cellphone").val();
		buyer_info.buyer_phone = $("#buyer_phone").val();
		save_order(buyer_info);

		alert("提交成功！");
		ltlist.removeAll();
		flush(ltlist);
	});
}

window.onload = function(){
	add_into_fruit_basket();
	submit_order();
}