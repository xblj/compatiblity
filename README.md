# css兼容性
1. h5标签兼容
  1. 使用document.createElement()创建元素，然后设置样式;
  2. 引入成熟的库;
2. 元素浮动之后,能设置宽度的话就给元素加宽度.如果需要宽度是内容撑开,就给它里边的块元素加上浮动;（浮动元素内有块级元素会出现把浮动元素给撑大）-ie6下，为块级元素设置高度后触发;
	1. 给里面的块级元素加宽度；
	2. 为里面的块级元素添加浮动
3. 第一块元素浮动,第二块元素加margin值等于第一块元素,在IE6下会有间隙问题;	
	1. 第二块元素也采用浮动
4. IE6下子元素超出父级宽高，会把父级的宽高撑开
	1. 不能这么写
5. p/td/h不包含快级元素
6. margin兼容性问题
	+ margin-top传递
		1. 父级加边框 -ie6不能解决
		2. 父级overflow：hide -ie6不能解决
		3. 触发BFC和haslayout（ie6：zoom：1）
	+ 上下margin重叠
		1. 设置单边margin	
7. ie6不支持display:inline-block;
	1. hack处理:*display：inline;zoom:1;
8. IE6 最小高度19px;
	1. overflow:hiden;
9. IE6/7 双边距
	+ 触发条件：元素浮动后再设置margin-left后会出现双倍margin-left
		1. *display：inline
10. li里元素都浮动 li 在IE6/7  下方会产生4px间隙问题
	1. 为li添加	*vertical-align: top;
11. 浮动元素之间有注释和内联元素并且宽度相差3px，导致多复制一个文字问题
	1. 避免上述两个条件
12. IE6/7 父级元素的overflow:hidden 是包不住子级的relative
	1. 为父级添加：*position：relative;
13. IE6下绝对定位元素父级宽高是奇数,绝对定位元素的right和bottom值会有1px的偏差
 1. 避免父级宽高是奇数
14. IE6下绝对定位元素和浮动元素并列并浮动元素占据了全部宽度绝对定位元素消失
 1. 不处于同级：嵌套一层
15. IE6 下input的空隙
 1. 给input 加：*float：left
16. IE6 下 输入类型表单控件有背景时，输入内容过多会使图片跑出去（输入的值会将背景顶出输入框：加上fixed）
	1. background-image：fixed;
17. ie6不支持png24
 1. _background-image:none;
 _filter :progid:DXImageTransform.Microsoft.AlphaImageLoader(src="XX.png", sizingMethod="crop");
 2. JS插件(问题:不能处理body之上png24)
	DD_belatedPNG.fix('xxx');
18. hack，注意书写顺序
	1. \9 所有的IE10及之前 -写在样式的最后面
	2.	+/*IE7及ie7以下的ie浏览器认识	
	3. _IE6及ie6的ie浏览器认识

# js兼容
1. 事件对象	
	+ 火狐的事件对象是在事件触发时传入事件处理函数中
		1. var ev=ev||window.event
	+ event.x与event.y问题
	> IE下，even对象有x、y属性，但是没有pageX、pageY属性；Firefox下，even对象有pageX、pageY属性，但是没有x、y属性。 
		解决方法：
		```
		var myX = ev.x ? ev.x : ev.pageX; 
		var myY = ev.y ? ev.y:ev.pageY;
		```
2. event.srcElement问题 
	+ IE下，even对象有srcElement属性，但是没有target属性；
	+ Firefox下，event对象有target属性，但是没有srcElement属性。 
	+ 兼容
	```
	srcObj = ev.srcElement ? ev.srcElement : ev.target; 
	``` 
3. children/childNodes
	+ children:只获取元素节点
		* 全浏览器兼容
	+ childNodes：会获取文本节点和元素节点
		* IE6/7/8:第一个文本节点不会获取（length=2）
		* IE9以上/DOM：获取节点个数三个（length=3）
	+ 解决方案一：都用children，但是这个好像不是w3c的标准，不过所有浏览器都兼容
	+ 解决方案二：
		```
		function getChildElem(elem){
			var eles=[];
			var allElem=elem.childNodes;
			for(var i=0,len=allElem.lenght;i<len;i++){
				if(allElem[i].nodeType===1){
					eles.push(allElem[i]);
				}
			}
			return eles;
		}

		```
4. 获取非行间样式：currentStyle/getComputedStyle
	+ currentStyle: IE专属对象,全版本支持。  注意是对象，不是方法，调用时使用.或者[]而不是();
	+ getComputedStyle:方法，返回样式列表。ie9及以上/DOM支持 window.getComputedStyle('elem','伪类')/window.defaultView.getComputedStyle('elem','伪类')；
	+  兼容：
		```
			function getStyle(elem,style){
				var getComputedStyle=window.getComputedStyle||window.defaultView.getComputedStyle;
				return ele.currentStyle?ele.currentStyle[style]:ele.getComputedStyle(ele,null)[style];
			}
		```
5. 字符串索引：字符串类似数组，可以使用下标进行访问，但是IE6/7不支持
	+ 兼容 使用charAt(i);
6.  firstChild/firstElementChild、lastChild/lastElementChild、nextSibling/nextElementSibling、previousSibling/previousElementSibling;
	+ IE6/7/8:使用没有Element的获取元素节点
	+ IE9以上/DOM使用没有Element或获取文本节点。如果获取元素节点使用带有Element的属性
	+ 兼容：
	```
		function getFirstChild(elem){
			return elem.firstElementChild?elem.firstElementChild:elem.firstChild;
		}

	```
7. 绑定事件函数addEventListener/attachEvent
	+ attachEvent：IE6/7/8支持

	```
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
	```
8. 滚动条距离scrollTop
	+ IE/Chrome： document.body.scrollTop
	+  FF: document.documentElement.scrollTop
	+ 兼容
	```
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop
	```


