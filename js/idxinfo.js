// JavaScript Document
var Platform ="idx"; //idx 官网 tm 天猫 peek匹克
var Template ="idx"; //dm : 外部模板 idx :idx版本

var APPKEY = "CXBBYDA1HM1";

var IDX_INFO = {
	//产品XML
	productConfigXml:"http://static.idx.com.cn/flash/xml/shoe/{pId}.xml",
	//产品模型资源
	productModelXml:"http://static.idx.com.cn/flash/images/{pId}/{pId}_{lId}_{oId}_{mId}_{sId}.png",
	productModelXml_Type4:"http://static.idx.com.cn/flash/images/{pId}/{pId}_{lId}_{oId}_{mId}_{cId}_{sId}.png",
	productModelXml_ImageSetting:"http://static.idx.com.cn/flash/images/{pId}/{pId}_MASK_{position}.png",
	//图片
	imgUrl:"http://static.idx.com.cn/flash/images/",
	
	
	//获取作品信息
	workIdUrl:"http://api.app.idx.com.cn/Apiflash/GetWorkData?id={workId}&type=1&userid={userid}&r={uuid}",
	workIdUrl_dm:"http://www.idx.com.cn/FlashApi/GetDesignWorkinfo?designcode={designcode}",
	
	//传送预览图
	upProductPreImageUrl: "http://api.app.idx.com.cn/Apiflash/SubmitImage2?id={uuid}",
	upProductShotImageUrl: "http://api.app.idx.com.cn/Apiflash/SubmitImage2?counter={counter}&id={uuid}",
	//传送预览图
	upProductPreImageUrl_dm: "http://dmflash.idx.com.cn/Flash/SubmitRefImage?id={uuid}",
	upProductShotImageUrl_dm: "http://dmflash.idx.com.cn/Flash/SubmitImage?counter={counter}&id={uuid}",
	
	//上传用户图片
	uploadImageUrl :  "http://api.app.idx.com.cn/Apiflash/UploadImage?userid={userid}&clienttype=1&imgtypeid=114&ispublic=true&imgextension={imgextension}&imgname={imgname}",
	//上传用户图片
	uploadImageUrl_dm : "http://dmflash.idx.com.cn/Flash/SubmitUserImage?imgType={imgType}&counter={counter}&id={id}&sizeTotal={sizeTotal}&sizeCellTotal={sizeCellTotal}&sizeID={sizeID}&sizeCounter={sizeCounter}",
	
	//保存
	upDataUrl: "http://api.app.idx.com.cn/Apiflash/SubmitData?id={uuid}&imgType=&sizeID=&sizeCounter=",
	//保存
	upDataUrl_dm: "http://dmflash.idx.com.cn/Flash/SubmitData?id={uuid}&userid={user_id}",
	
	//加入购物车
	addToShopCartUrl: "http://api.app.idx.com.cn/ApiShopCart/AddToShopCart?userid={user_id}",
	// 取得鞋尺码接口
	getSize: "http://api.app.idx.com.cn/ApiProduct/GetSize?ProductCode={productCode}&callback=load", 
	
	//获取用户图片
	getUserImageList:"http://api.app.idx.com.cn/apiflash/GetUserImageList?userId={userId}&page_size={page_size}&page={page}",
	//获取材质图片列表
	getMaterialList:"http://api.app.idx.com.cn/apiflash/GetMaterialList?page_size={page_size}&page={page}",
	//获取产品信息
	getAppFlashInfo:"http://api.app.idx.com.cn/apiproduct/GetAppFlashInfo?productCode={productCode}",
	//获取产品名称
	getProductName:"http://api.app.idx.com.cn/apiproduct/GetProductName?productCode={productCode}&workid={workid}"

};


var CategoryType =
{
	/**鞋子*/
	SHOE: "2",
	/**牛仔裤*/
	JEANS: "4",
	/**手机壳*/
	PHONE_SHELL: "8",
	/**卫衣*/
	SWEATER:"16",
	/**3C*/
	THREE_C:"32",
	/**男装*/
	MEN_SWEAR: "10212",
	/**衬衫*/
	SHIRT: "10213",
	/**抱枕*/
	PILLOW:"10217",
	/**毛巾*/
	TOWELS: "10218",
	/**帽子*/
	HAT:"10219",
	/**箱包*/
	BOX: "10229",
	/**拉杆箱*/
	BAG:"10231",
	/**运动水杯*/
	CUP:"10242"
};

var DataSenderAction = 
{
	/**添加购物车*/
	ADD_TO_CART:"ADD_TO_CART",
	/**保存作品到后台*/
	SAVE_TO_LIBRARY:"SAVE_TO_LIBRARY",
	/**保存作品到缓存*/
	SAVE_TO_CACHE: "SAVE_TO_CACHE",
	/**重新生成裁切片*/
	UPDATE_TO_IMAGES: "UPDATE_TO_IMAGES"
};

var ScribleInfo = {
    idea: '',
    name: ''
};
