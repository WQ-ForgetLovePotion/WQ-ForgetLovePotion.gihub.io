var pic = document.getElementsByClassName("swiper-picture")[0].getElementsByTagName("img");
var right = document.getElementById("swiper-right");
var left = document.getElementById("swiper-left");
var pagination = document.getElementsByClassName("swiper-pagination")[0].getElementsByTagName("li");
var swiper = document.getElementsByClassName("swiper-picture")[0];
var num = 0;
var length = pic.length - 1;
var lastIndex = 0;
var stop;

function Change() {
	if (num <= length) {
		pic[num].style.opacity = "1";
	}
};
Change();
right.onclick = function() {
	num++;
	if (num > length) {
		for (var i = 1; i <= length; i++) {
			pic[i].style.opacity = "0";
		}
		num = 0;
	}
	Change();
	move();
	clearInterval(stop);
	setTimeout(begin, 500);
};
left.onclick = function() {
	zero();
	num--;
	if (num < 0) {
		num = length;
	}
	Change();
	move();
	clearInterval(stop);
	setTimeout(begin, 2000);
};

function move() {
	pagination[lastIndex].className = "";
	var index = num > length ? 0 : num;
	pagination[index].className = "pagination-selected";
	lastIndex = index;
};
for (var i = 0; i < pagination.length; i++) {
	pagination[i].index = i;
	pagination[i].onclick = function() {
		num = this.index;
		zero();
		Change();
		move();
		clearInterval(stop);
		setTimeout(begin, 2000);
	}
};

function zero() {
	for (var i = 0; i <= length; i++) {
		pic[i].style.opacity = 0;
	}
};

function begin() {
	clearInterval(stop);
	stop = setInterval(right.onclick, 2000);
};
begin();
swiper.onmouseenter = function() {
	clearInterval(stop);
};
swiper.onmouseleave = function() {
	begin();
};
