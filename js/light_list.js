var list = new Array();

function light_list(){

}

var ltlist = new light_list();

/**
 * 添加
 * @param {Object} object
 */
ltlist.add = function(object) {
	list[list.length] = object;
}

/** 
 * 移除此列表中指定位置上的元素。 
 * @param index 指定位置 
 * @return 此位置的元素 
 */
ltlist.removeIndex = function(index) {
	var object = list[index];
	list.splice(index, 1);
	return object;
}

/** 
 * 移除此列表中指定元素。 
 * @param object 指定元素 
 * @return 此位置的元素 
 */
ltlist.remove = function(object) {
	var i = 0;
	for (; i < list.length; i++) {
		if (list[i] === object) {
			break;
		}
	}
	if (i >= list.length) {
		return null;
	} else {
		return removeIndex(i);
	}
}

/** 
 * 获得列表中指定元素。 
 * @param object 指定元素 
 * @return 此位置的元素 
 */
ltlist.get = function(index) {  
    return list[index];  
}  

/** 
 * 移除此列表中的所有元素。 
 */  
ltlist.removeAll = function() {  
    list.splice(0, list.length);  
}

/** 
 * 返回此列表中的元素数。 
 * @return 元素数量 
 */  
ltlist.size = function() {  
    return list.length;  
} 
   
  
/** 
 *  如果列表不包含元素，则返回 true。 
 * @return true or false 
 */  
ltlist.isEmpty = function() {  
    return list.length == 0;  
}