/**
 *1.更正了滚动条滚动问题
 *2.实现了使用Kendo UI 实现本地过滤功能
 *3.实现PageUp 和PageDown 切换页面功能
 *4.按ESC键关闭窗体，无返回值
 *5.loding 加载动画显示
 */
window.onload =function(){
	showdict();
};

function showdict() {
	//获取URL地址通过decodeURI方法并解析转义字符
	var url =decodeURI(window.document.URL);
	//切割返回数组
	var optionArr =url.split(/[?&]/);
	//分割回调函数
	var callbackUrl = optionArr[1].split("=");
	sj.dict.callbackFn =callbackUrl[1];
	//分割OptionJSON字符串
	var jsonStr =optionArr[2];
	var subIndex = jsonStr.indexOf("=");
	var optionTemp = jsonStr.substring(subIndex+1,jsonStr.length)
	console.log(jsonStr);
	//将字符串转换成JSON对象
	var temp = JSON.parse(optionTemp);
	/**
	 * 调用sj.dict.show函数
	 */
    sj.dict.show(temp);
}
sj = {};
sj.dict = {};
var ds = {};
var Columns = "";
var backdata = "";
/**
 * @description [通过传来的属性对象进行ajax请求]
 * @param {Object} option [解析成JSON对象动态调用，拼接成URL参数]
 * 执行sj.dict.show函数开始请求AJAX数据到本地
 * @example  
 * 定义var ={dict:{id:"A1001",name:"字典定义"},where:"code>3600"}
 * sj.dict.show(option)
 */
sj.dict.show = function (option) {
    sj.dict.option = option;
    $.ajax({
				url:"./../../SJSysDict.aspx?class=SysDictMgr&method=GetDictOption&param="+option.dict.id,
				dataType: "JSON",
				type: "GET",
				success: function (dataByName) {
					//返回请求数据,格式化JSON
					var text= eval(dataByName);
					/**
					 * 第一次请求数据
					 * 判断数据请求状态
					 * 如果请求text.msg_no为0就表示成功，
					 * 初次请求成功后，加载getJson函数，执行第二次请求
					 */
					//如果有text.msg_no这个属性
					if (text.msg_no) 
					{
						/**
						 * [msg_no 判断msg_no的值是否为00的状态为成功1的状态为失败]
						 * @type {number}
						 */
						if (text.msg_no==0) 
						{
                            //如果状态请求成功，开始加载loading 图标
                            $("#loading").html("<img src ='images/loading.gif'/>");
							Columns = text.Data[0].Columns;
							/**
							 * 第一次AJAX请求成功之后，getJson函数进行第二次函数请求
							 */
							getJson(option);

						}
						else
						{

							alert(text.msg_text);
						}
					}
					else
					{
						alert("错误消息:"+text);
					}
					
				},
				error: function (data) {
					alert("错误消息:" + data);
				}
			});
    	/**
    	 * [getJson 函数名]
    	 * @param  {Object} option [形参，解析地址栏转换成JSON对象后调用]
    	 * @example
    	 * var option = dict:{id:'A10001',name:'张三'}，where:code>3600}
    	 * 函数调用:getJson(option);
    	 * 对象使用:比如获取id,option.dict.id
    	 */
		function getJson(option)
		 {
		 
			var param= {};
			param.dict={};
			param.dict.id=option.dict.id;
			if(option.where)
			  param.where=option.where;
			$.ajax({
				url: 
				"./../../SJSysDict.aspx?class=SysDictMgr&method=GetDictData&param="+JSON.stringify(param),
				dataType: "JSON",
				type: "GET",
				success: function (data) {
					if (data.msg_no) 
					{
						if (data.msg_no==0) 
						{
							var dataCount = data.Data;
							filterData(dataCount,option);

						}
						else
						{
							alert("请求状态:"+data.msg_text);
						}
					}
					else
					{
						alert("错误消息:"+data)
					}
					
				},
				error: function (data) {
					alert("错误消息" + data);
				}
			});
		}
	}
/**
 * @description [filterType  Kendo UI实现本地数据过滤]
 * 作用:请求成功后执行该方法，请求标题上的数据
 * kendoUI实现本地过滤
 * 在AJax  请求数据之后data返回值先通过filterData过滤
 * 再将过滤后的View数据展示在界面上
 */
function filterData(data,filterOption)
{
    //开始计算时间
    var begindate = new Date();
    var min = begindate.getMinutes();
    var seconds = begindate.getSeconds();
    var mill = begindate.getMilliseconds(); 
    var millCount = (min*60*1000)+(seconds*1000)+mill;
    //开始过滤
	if(filterOption.filter)
	{
		var dataSource = new kendo.data.DataSource({
			data:data,
			filter: filterOption.filter
		});

		dataSource.fetch(function(){
		      var view = dataSource.view();
		  	  backdata = view;
		      trigger(filterOption);
	     });
	      //结束时间
	    var endDate = new Date();
	    var endmin = endDate.getMinutes();
	    var endseconds = endDate.getSeconds();
	    var endmill = endDate.getMilliseconds(); 
	    var endCount = (endmin*60*1000)+(endseconds*1000)+endmill;
	  $("#mess").html("本地过滤消耗时间:"+(endCount-millCount)+"毫秒");
	}
	else 
	{
	   backdata = data;
	   trigger(filterOption);	   
	}
}

function filterType() {
    //加载下拉框文本
	var conWidth = 0;
    var optionText = "";
    //var items = sj.dict.Items;
    for (var i = 0; i < Columns.length; i++) {
        if (Columns[i].filter != "0") {
            optionText += "<option" + " " + "value=" + Columns[i].field + ">" + Columns[i].title + "</option>";
        }
    }
    $(".selected:eq(0)").html(optionText);
    var title = "";
    var titleName = "";
    for (var i = 0 ; i < Columns.length; i++) {
        titleName += "<div class='titlename' style='width:"+Columns[i].width+"'"+">" + Columns[i].title + "</div>";
    	var wid = (Columns[i].width).replace(/[^0-9]/ig,"");
		var  w = parseInt(wid);
		conWidth+=w;
	}
    title = "<div class='title'>" + titleName + "</div>";
	$("#title").html(title);
    //光标定位到输入框
	$("#sj_dict").width(conWidth+58);
	$("#sj_dict").css("margin","0 auto");
	$("#title").width(conWidth+58);
	$("#list").width(conWidth+58);
    $("#serch").focus();
}

/**
 * @description [findRows  显示过滤后的数据行  数组类型]
 */
var findRows = [];
var findJson = [];
var pageSize = 0;
var initPageNum = 1;
var pageN =0;

/**
 * [Serch 执行搜索功能]
 * @param {Object} option [请求对象属性]
 */
function Serch(option) {
    //获取搜索框的值
    var select = document.getElementById("select").value;
	if(option!=undefined && option.serVal)
	{
		document.getElementById("serch").value =option.serVal;
	}
    var rows = "";
    //清空数组
    while (findRows.length > 0) {
        findRows.shift();
    }
    while (findJson.length > 0) {
        findJson.shift();
    }
    var headline = "";
	var serchValue = document.getElementById("serch").value;
	 var reg = /^[A-Za-z]+$/;
    if (reg.test(serchValue)) {
        var serchValue = serchValue.toUpperCase();
    }
    for (var i = 0; i < backdata.length; i++) {
        var thisdata = backdata[i];
        if (thisdata[select].indexOf(serchValue) >= 0) {
            findJson.push(backdata[i]);
            var row = "";
            var title = "";
            for (var j = 0 ; j < Columns.length; j++) {
                var key = Columns[j].field;
				var w = Columns[j].width;
                row += "<div class='col' style='width:"+w+"'"+">"+ thisdata[key]+"</div>";
            }
            findRows.push("<div class='row'>" + row + "</div>");
        }
    }
    pageSize = 38;
    //首次加载页面的时候
    var thisPage = findRows.slice(0, pageSize);
    $("#list").html(thisPage);
    $("#pageTool").html("");
    //每次过滤页面加载完成初始化页码为1;
    initPageNum = 1;
    //每次过滤页面加载完成行索引恢复初始值;
    keyDownIndex = -1;
    $('#pageTool').Paging({
        pagesize: pageSize, count: findRows.length, callback: function (page, size, count) {
            initPageNum = page;
            var start = parseInt(page - 1) * pageSize;
            var end = page * pageSize;
            $("#list").html(findRows.slice(start, end));
            //页面加载完毕，行索引从零开始
            keyDownIndex = -1;
            RowIndex(PageRows, findJson);
        }
    });
    RowIndex(PageRows, findJson);
}

//键盘事件
/**
 * @description   onkeydown 键盘监听，操作方向键，以及回车选中，PageUp,PageDown翻页操作
 * @param {event} [event] [JS事件]
 */
window.onkeydown = function SelectKeyDown(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 38) {
        e.preventDefault();
        if (keyDownIndex > 0) 
        {
            PageRows[keyDownIndex].style.backgroundColor = "#FFFFFF";
            keyDownIndex--;
            PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";  
           dictScroll(keyDownIndex);
        }
    }
    if (e && e.keyCode == 40) {
        e.preventDefault();
        if (keyDownIndex < PageRows.length - 1) {
            if (keyDownIndex == -1) {
                keyDownIndex++;
                PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";

            }
            else {
            	    dictScroll(keyDownIndex);
	                PageRows[keyDownIndex].style.backgroundColor = "#FFFFFF";
	                keyDownIndex++;
	                PageRows[keyDownIndex].style.backgroundColor = "#c6dbdd";
            }
        }
    }

    if (e && e.keyCode == 13) {
        RowIndex(PageRows, findJson);
        PageRows[keyDownIndex].style.backgroundColor = "#1E90FF";
       if(window.openerWindow[sj.dict.callbackFn]){
			window.openerWindow[sj.dict.callbackFn].call(window,selectdata);
		}
		window.currentWindow.close();
    }

    if (e && e.keyCode == 32) 
    {
    	e.preventDefault();
    	RowIndex(PageRows, findJson);
        PageRows[keyDownIndex].style.backgroundColor = "#1E90FF";
        if(window.openerWindow[sj.dict.callbackFn]){
			window.openerWindow[sj.dict.callbackFn].call(window,selectdata);
		}
		window.currentWindow.close();
    }
    //如果按了ESC按键直接关闭窗口，无返回值
    if (e&&e.keyCode==27)  
    {
    	window.currentWindow.close();
    } 
}

var keyDownIndex = -1;
/**
 * @description   PageRows 选择当前页面Class为row的元素
 * @type {Array}
 */
var PageRows = document.getElementsByClassName("row");
var selectdata = {};
/**
 * [RowIndex 当前选中行的索引]
 * @param {Array} arr     [搜索前当前页面行集合]
 * @param {Array} dataArr [搜索过后的页面行集合]
 * 方法调用示例：RowIndex(PageRows,findJson);
 */
function RowIndex(Arr, dataArr) {
    $("#serch").focus(function () {
        //文本框获得焦点,将行索引设置为初始值
		if(keyDownIndex>=0 && keyDownIndex<Arr.length)
          Arr[keyDownIndex].style.backgroundColor = "#FFFFFF";
        keyDownIndex = -1;
    });
	for (var i = 0; i < Arr.length; i++) 
	{
		Arr[i].index = i;
		Arr[i].onclick = function () 
		{
			if (keyDownIndex == -1) 
			{
				keyDownIndex = 0;
			}
			Arr[keyDownIndex].style.backgroundColor = "#FFFFFF";
			keyDownIndex = this.index;
			Arr[keyDownIndex].style.backgroundColor = "#c6dbdd";
			var dataIndex = ((keyDownIndex + 1) + pageSize * initPageNum) - 1 - pageSize;
			selectdata = dataArr[dataIndex];
		}
		//双击事件
		Arr[i].ondblclick = function()
		{
			if (keyDownIndex == -1) 
			{
				keyDownIndex = 0;
			}
			keyDownIndex = this.index;
			var dataIndex = ((keyDownIndex + 1) + pageSize * initPageNum) - 1 - pageSize;
			selectdata = dataArr[dataIndex];
			if(window.openerWindow[sj.dict.callbackFn])
			{
					window.openerWindow[sj.dict.callbackFn].call(window,selectdata);
			}
			window.currentWindow.close();
		}
	}
}


/**
 * @description [btnBox 函数点击事件封装]
 */
function btnBox()
{
	//获取btn按钮ID
	/**
	 * @description[obj 	执行单击事件调用RowIndex函数]
	 * @type {type}
	 */
	 var obj = document.getElementById("btn1");
	 obj.onclick = function ()
	 {
		RowIndex(PageRows, findJson);
		//判断数据行是否选中，如果选中弹出函数
		if(keyDownIndex!=-1)
		{
			PageRows[keyDownIndex].style.backgroundColor = "#1E90FF";
			//UCML弹窗函数
			if(window.openerWindow[sj.dict.callbackFn]){
				window.openerWindow[sj.dict.callbackFn].call(window,selectdata);
			}
			//关闭窗体
			window.currentWindow.close();
		}
		else
		{
			alert("没有选中行");
			//window.currentWindow.close();
		}
	}
	//取消按钮
	document.getElementById("btn2").addEventListener("click",function(){
						window.currentWindow.close();
					},false);
	//刷新按钮
	var refresh = document.getElementById("refresh");
	refresh.addEventListener("click",function(){
		showdict();
		$("#serch").val("");
	},false);
}

//滚动条计算
function dictScroll(index)
{
	/**
	 * @description [parentBox 父容器变量名称]
	 * @description [scrollTop 容器滚动条距离容器顶部的距离]
	 * @description [lineHeight 获取当前行高度]
	 * @description [countHeight 整个容器计算后相对于滚动条向下滚动的最大数值]
	 * @description [minHeight 整个容器计算后相对于滚动条向下滚动的最小数值]
	 * @description [thisHeight 当前行距离浏览器顶部的距离]
	 * @description index 为当前选择的行索引 ，在键盘事件中进行传值调用
	 */
	var parentBox = document.getElementById("sj_dict").offsetHeight;
	var scrollTop = document.getElementById("list").scrollTop;
	var lineHeight = document.getElementsByClassName("row")[index].offsetHeight;
	var listHeight = document.getElementById("list").offsetHeight;
	var countHeight =parentBox-lineHeight;
	var minHeight = countHeight - listHeight;
	var thisHeight = document.getElementsByClassName("row")[index].offsetTop-scrollTop;
	//$("#scroll").html(thisHeight);
	if (thisHeight>=countHeight)
	{
	 	document.getElementById("list").scrollTop+=lineHeight;
	}
	if (thisHeight<=minHeight) 
	{
		document.getElementById("list").scrollTop-=lineHeight;
	}
}
/**
 * [trigger 执行函数]
 * @param  {Object} option [参数属性对象]
 */
function trigger(option)
{
	//头部过滤信息加载
	filterType();
	//页面数据以及过滤功能加载
	Serch(option);
	//按钮事件监听
	btnBox();
	//加载结束，取消loading图标
	$("#loading").html("");
}
