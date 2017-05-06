var addEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, fn) {
			//处理传入的是元素集合
			if (el.length) {
				for (var i = 0; i < el.length; i++) {
					addEvent(el[i], type, fn);
				}
			} else {
				el.addEventListener(type, fn, false);
			}
		};
	} else {
		return function (el, type, fn) {
			if (el.length) {
				for (var i = 0; i < el.length; i++) {
					addEvent(el[i], type, fn);
				}
			} else {
				el.attachEvent('on' + type, function () {
					//attachEvent处理函数的内部this默认是指向windowj需要修复this指向当前触发的元素，并将时间对象event作为事件处理函数的第一个参数参数传入
					return fn.call(el, window.event);
				});
			}
		};
	}
})();
// 获取子元素节点
function getChildElem(elem) {
	var eles = [];
	var allElem = elem.childNodes;
	for (var i = 0, len = allElem.lenght; i < len; i++) {
		if (allElem[i].nodeType === 1) {
			eles.push(allElem[i]);
		}
	}
	return eles;
}
// 获取非行间样式
function getStyle(elem, style) {
	var getComputedStyle = window.getComputedStyle || window.defaultView.getComputedStyle;
	return ele.currentStyle ? ele.currentStyle[style] : ele.getComputedStyle(ele, null)[style];
}
// 获取第一个子元素，其他lastChild/lastElementChild、nextSibling/nextElementSibling、previousSibling/previousElementSibling使用类似方法
function getFirstChild(elem) {
	return elem.firstElementChild ? elem.firstElementChild : elem.firstChild;
}
// 获取滚动条高度
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop