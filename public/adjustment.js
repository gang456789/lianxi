

(function ($) {
    //这里拓展的是实例方法
    $.fn.extend({
        "bold": function () {
            ///<summary>
            /// 加粗字体
            ///</summary>
            return this.css({ fontWeight: "bold" });
        },
        "setColor": function () {
            ///<summary>
            /// 加粗字体
            ///</summary>
            return this.css({ color: "#ccc" });
        },
        "mix": function (aa,bb,cc) {
            ///<summary>
            /// 加粗字体
            ///</summary>
            return this.css({ 
                fontWeight: aa,
                color: cc,
                fontSize:bb
            });
        }
    });
    //这里拓展的是工具方法
    $.extend({
        "minValue": function (a, b) {
            ///<summary>
            /// 比较两个值，返回最小值
            ///</summary>
            return a < b ? a : b;
        },
        "maxValue": function (a, b) {
            ///<summary>
            /// 比较两个值，返回最大值
            ///</summary>
            return a > b ? a : b;
        },
        "dateformat": function (format, timeDate) {
            //yyyy-MM-dd hh:mm:ss
            var date = new Date(timeDate);
            var o = {   
                "M+" : date.getMonth()+1,                 //月份   
                "d+" : date.getDate(),                    //日   
                "h+" : date.getHours(),                   //小时   
                "m+" : date.getMinutes(),                 //分   
                "s+" : date.getSeconds(),                 //秒   
                "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                "S"  : date.getMilliseconds()             //毫秒   
            };   
            if(/(y+)/.test(format)){
                format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            } 
            for(var k in o)   
                if(new RegExp("("+ k +")").test(format))   
            format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
            return format; 
        }
    });
})(jQuery);