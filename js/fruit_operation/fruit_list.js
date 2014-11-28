var get_fruit = function(){
	$("#get_fruit").bind("click", function(){
		$.getJSON("http://127.0.0.1:8001/get_fruit", function(data){
			var buyer = "";
			var fruits = JSON.parse(data);
			for (var i = 0; i < fruits.length; i++) {
				buyer += "<div>";
				buyer += fruits[i].buyer_name;
				buyer += "--";
				buyer += fruits[i].buyer_id;
				buyer += "--";
				buyer += fruits[i].buyer_cellphone;
				buyer += "--";
				buyer += fruits[i].buyer_phone;
				buyer += "</div>";
				buyer += "<div>";
				buyer += ConvertJsonToTable(fruits[i].fruits, 'fruit_table', 'table table-striped', 'download');
				buyer += "</div>";
			};

			$("#content").html(buyer);
		});
	});
}

window.onload = function(){
	get_fruit();
}