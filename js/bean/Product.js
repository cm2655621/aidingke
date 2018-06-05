function Product()
{
	"use strict";
	this.workId = "";
	this.productId = "";
	this.layerList = new Array(0);
	this.CategoryType ="";
	
	this.say = function()
	{
		alert(this.productId);
	};
}
