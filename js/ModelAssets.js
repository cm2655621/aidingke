// JavaScript Document

//获取XML中定义的type3关联object
function getLinkObject(product,object)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		if(layerTmp.layerId === object.editLayerId)
		{
			for(var j =0; j < layerTmp.productPicList.length; j++)
			{
				var objectTmp= layerTmp.productPicList[j];
				if(objectTmp.type === "3")
				{
					if(objectTmp.editLayerId === object.editLayerId)
					{
						return objectTmp;
					}
				}

			}
		}
	}
}


//设置相关联的type3部件涂鸦
function setLinkObjectType3(product,object,picId,imgSrc,isSetDefauleValue)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		
		for(var j =0; j < layerTmp.productPicList.length; j++)
		{
			var objectTmp= layerTmp.productPicList[j];
			if(objectTmp.type === "3")
			{
				if(objectTmp.editLayerId === object.editLayerId)
				{
					objectTmp.parm ="1";
					objectTmp.picId = picId;
					objectTmp.isSetDefauleValue = isSetDefauleValue;
					objectTmp.tatooImgSrc =imgSrc;
				}
			}
		}
	}
}

	
//获取XML中定义的type3关联的clone object
function getLinkCloneObject(product,object)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		if(layerTmp.layerId === object.sourceLayerId)
		{
			for(var j =0; j < layerTmp.productPicList.length; j++)
			{
				var objectTmp= layerTmp.productPicList[j];
				if(objectTmp.type === "3")
				{
					if(objectTmp.objectId === object.sourceObjId)
					{
						return objectTmp;
					}
				}
			}
		}
	}
}

//重置isdone
function reSetIsDone(product)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		
		for(var j =0; j < layerTmp.productPicList.length; j++)
		{
			var objectTmp= layerTmp.productPicList[j];
			objectTmp.isDone = false;	
		}
	}
}

//查看该layer下的所有isDone
function selectIsDone(product,layerid)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		if(layerTmp.layerId === layerid)
		{
			for(var j =0; j < layerTmp.productPicList.length; j++)
			{
				var objectTmp= layerTmp.productPicList[j];
				if(!objectTmp.isDone)
				{
					return false;
				}
			}	
		}
	}
	return true;
}

//查看是否为空闲状态
function selectIsIdle(product)
{
	"use strict";
	if(product !== null && product !== undefined)
	{
		for(var i = 0 ; i < product.layerList.length ; i++)
		{
			var layerTmp = product.layerList[i];
			
			for(var j =0; j < layerTmp.productPicList.length; j++)
			{
				var objectTmp= layerTmp.productPicList[j];
				if(objectTmp.isLoading)
				{
					return false;
				}
			}	
		}	
	}
	
	return true;
}




//设置签名
function mySetSign(product,fontMaterialsArr,pureColorArr,position,value,color,fontType)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		
		for(var j =0; j < layerTmp.productPicList.length; j++)
		{
			var objectTmp= layerTmp.productPicList[j];
			
			if(objectTmp.type === "2")
			{
				if(objectTmp.position === position)
				{
					var k=0;
					var colorStr="180,155,87"; //默认值
					objectTmp.fontColorId = color;
					//通过colorid 查找颜色
					for(k=0;k<pureColorArr.length;k++)
					{
						var pureColorTmp = pureColorArr[k];
						if(pureColorTmp.colorId === color)
						{
							colorStr = pureColorTmp.value;
							break;
						}
					}
					var colorArr = colorStr.split(",");
					var r = parseInt(colorArr[0]);
					var g = parseInt(colorArr[1]);
					var b = parseInt(colorArr[2]);
					
					objectTmp.fontColor="#"+r.toString(16)+g.toString(16)+b.toString(16); //签名的颜色
					
					//通过fontType id 查找对应的字体Material
					for(k=0;k<fontMaterialsArr.length;k++)
					{
						var fontMaterialsTmp = fontMaterialsArr[k];
						if(fontMaterialsTmp.id === fontType)
						{
							objectTmp.fontType=fontMaterialsTmp.id; //签名的字体
							objectTmp.fontSize=fontMaterialsTmp.size; //签名的大小
							break;
						}
					}
					
					objectTmp.fontValue=value; //签名的内容
					
					
					break;
				}
			}
		}
		
	}
}

//获取imageSettingTmp
function getImageSettingTmp(imageSettingArr,layerId)
{
	"use strict";
	for(var k=0;k<imageSettingArr.length;k++)
	{
		var imageSettingTmp = imageSettingArr[k];
		if(imageSettingTmp.id === layerId)
		{
			return imageSettingTmp;
		}
	}
}

//通过setid 找到对应的角度id
function getLayerIdBySetId(colorSetArr,setId)
{
	"use strict";
	for(var k=0;k<colorSetArr.length;k++)
	{
		var colorSetTmp = colorSetArr[k];
		if(colorSetTmp.setId === setId)
		{
			return colorSetTmp.layerID;
		}
	}
}

//查看是否是单签名
function isSingleSign(colorSetArr)
{
	"use strict";
	var count = 0;
	for(var i = 0;i < colorSetArr.length;i++)
	{
		var colorSetTmp = colorSetArr[i];
		if(colorSetTmp.setId === "S013" || colorSetTmp.setId === "S014")
		{
			count++;
		}

	}
	if(count === 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//通过layerid 查找该layer下可以编辑涂鸦的object
function findObject3ByLayerId(product,layerId)
{
	"use strict";
	for(var i = 0 ; i < product.layerList.length ; i++)
	{
		var layerTmp = product.layerList[i];
		if(layerTmp.layerId === layerId)
		{
			for(var j =0; j < layerTmp.productPicList.length; j++)
			{
				var objectTmp= layerTmp.productPicList[j];
				if(objectTmp.type === "3")
				{
					if(objectTmp.editLayerId === objectTmp.layerId && objectTmp.layerId === layerId)
					{
						return objectTmp;
					}
				}

			}
		}
	}
}

