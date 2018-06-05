// JavaScript Document

function TransformDataValueToString(a,d,tx,ty)
{
	 "use strict";
	return "a="+a+"|b=0|c=0|d="+d+"|tx="+tx+"|ty="+ty+"|";
}

function stringToValue(str)
{
	"use strict";
	var a = 0.0;
	var d = 0.0;
	var tx = 0.0;
	var ty = 0.0;

	var strs= str.split("|"[0]);
	for(var i = 0 ; i < strs.length; i++)
	{
		var keyAndValues = strs[i].split("="[0]);
		switch (keyAndValues[0])
		{
			case "a":
				a =parseFloat(keyAndValues[1]);
			break;
			case "d":
				d = parseFloat(keyAndValues[1]);
			break;
			case "tx":
				tx = parseFloat(keyAndValues[1]);
			break;
			case "ty":
				ty = parseFloat(keyAndValues[1]);
			break;
			default:
			break;
		}
	}								
	return {'a':a,'d':d,'tx':tx,'ty':ty};
}

