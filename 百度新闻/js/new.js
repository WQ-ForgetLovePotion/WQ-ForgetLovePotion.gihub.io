var liEle = document.getElementsByClassName("wraper")[0].getElementsByTagName("li");
var box = document.getElementsByClassName("wraper")[0].getElementsByClassName("box")[0];
var distance = 0;
var num = 0;
for (var i = 0; i < liEle.length; i++) {
	liEle[i].index = i;
	liEle[i].onmouseenter = function() {
		distance = 0;
		num = this.index;
		console.log(num);
		for (var i = 0; i < num; i++) {
			distance += liEle[i].clientWidth;
			box.style.transition = "1s";
			box.style.left = distance + "px";
			if (this.index == 6) {
				box.style.width = "62px";
			} else {
				box.style.width = "48px";
			}
		}
	}
	liEle[i].onmouseleave = function() {
		box.style.left = "0px";
		box.style.width = "48px";

	}
}
