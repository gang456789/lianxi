$(function () {
    var cmd = {"Token":"fe58b838-f029-40e6-9b21-d3b1f074c4862257","UserID":"6","UserName":"Administrator","RealName":"超级管理员","Cmd":"C0005","Param":[{"Type":"2","DicCode":"null"},{"Type":"2","DicCode":"DIC0001"},{"Type":"2","DicCode":"SYS0001"},{"Type":"2","DicCode":"MedicalGroup"}]};
    var num = 1;
    // dropload
    var dropload = $('.khfxWarp').dropload({
        scrollArea: window,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData: '<div class="dropload-noData">已无数据</div>'
        },
        loadDownFn: function (me) {
            num++;
            if (num > 5) {
                me.lock();
                me.noData();  
                return false;
            }
            console.log(num);
            $.ajax({
                url: "http://47.94.238.41:8077/InterfaceCmd.aspx?cache="+Math.random(),
                type: 'POST',
                data: JSON.stringify(cmd),
                timeout: 30000,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    var sss = ddd(data.Result[1].DicItem)
                    // $('.khfxWarp').append(sss);
                    setTimeout(function(){
                        $('.khfxWarp').append(sss);
                        me.resetload();
                    },1000);
                },
                error: function (xhr, textStatus) {
                    console.log(xhr)
                },
                complete: function (data) {
                    console.log(data)
                }
            });
            // me.resetload();
        }
    });

    function ddd(data){
        var result = "";
        $.each(data,function(index,val){
            result  += ''
                    +'<div class="content">'
                    + val.DicVal1
                    + '</div>'
            // result  += '<div class="content">' + val.DicVal1 + '</div>'
        })
        return result;
    }
});