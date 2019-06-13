
/* 缺点：定义了太多的全局变量！！！！，不能污染全局作用域 */

/* 解决方案：全局 变 局部---> (闭包) 

*/
(function(){
	//alert(100);
	//局部作用域

	var swiperContainer = document.getElementById("swiper-container");
			var container = document.getElementsByClassName("swiper-wrapper")[0];
			var left = document.getElementById("swiper-button-left");
			var right = document.getElementById("swiper-button-right");
			var swiperItems = document.getElementsByClassName("swiper-item");
			//分页器数组
			var paginations = document.getElementsByClassName("swiper-pagination")[0].getElementsByTagName("li");
			//记录图片的个数(不包含补的图 -1)
			var lenght = swiperItems.length - 1;
			//轮播图最大容器的宽度
			var width = swiperContainer.clientWidth;
			//记录图片左移
			var pn = 0;
			//保存上一次点击的位置
			var lastIndex = 0;
			var autoPlay;
			//初始化轮播图宽度
			function initSwiper() {
				//container 和图片张数保持一致
				container.style.width = swiperContainer.clientWidth * (lenght + 1) + "px";
				//循环设置每个item的宽度和最大的swiperContainer宽度一致
				for (var i = 0; i < swiperItems.length; i++) {
					swiperItems[i].style.width = swiperContainer.clientWidth + "px";
				}
			}
			initSwiper();
			right.onclick = function() {
				//总共四张图片,代表第四张图片出去了
				if (pn == lenght) {
					container.style.left = "0px";
					//记录袋了哪张图片
					pn = 0;
				}
				pn++;
				configMove();
				//切换分页器
				paginationSelected();
			}
			left.onclick = function() {
				//第一张
				if (pn == 0) {
					container.style.left = lenght * -width + "px";
					pn = lenght;
				}
				pn--;
				configMove();
				//切换分页器
				paginationSelected();
			}

			function configMove() {
				//让container动画
				//container.offsetLeft:左偏移大小
				var t = 0,
					b = container.offsetLeft,
					c = -width * pn - b,
					d = 100;
				Tween.move(container, "left", t, b, c, d);

			}
			//切换分页器的高亮状态
			function paginationSelected() {
				//id设置或修改方法
				//paginations[1].id = "id测试";
				//class属性要通过className来设置或者修改
				//上次点击的为位置
				paginations[lastIndex].className = "";
				//当前下标
				//特殊:最后一张是补得图
				var index = pn === lenght ? 0 : pn;
				paginations[index].className = "pagination-selected";
				//pn用完后就变成了上一次
				lastIndex = index;
			}
			//paginationSelected();
			//给每个按钮绑定点击事件
			for (var i = 0; i < paginations.length; i++) {
				paginations[i].index = i;
				paginations[i].onclick = function() {
					console.log("点击的是第" + this.index + "个");
					//特殊情况:最后一张补图,要没有动画切换到第一张
					if (pn == lenght) {
						container.style.left = "0";
					}
					pn = this.index;
					configMove();
					//切换分页器
					paginationSelected();
				};
			};
			//自动播放
			autoPlay = setInterval(right.onclick, 3000);
			//鼠标移入
			swiperContainer.onmouseenter = function() {
				clearInterval(autoPlay);
			}
			//鼠标移出
			swiperContainer.onmouseleave = function() {
				autoPlay = setInterval(right.onclick, 3000);
			}
			})()