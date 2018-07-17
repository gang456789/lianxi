(function () {
    var result, height = $("body").height(),
        width = $("body").width();
    var diviceCategory, diviceName;
    // $("#devicename").on('input', function (e) {
    //     diviceName = $("#systemorder").val();
    //     console.log(diviceName)
    // });
    $("#devicename").change(function () {
        diviceName = $("#devicename").val();
        console.log(diviceName)
    });
    document.getElementById('deviceselect').onchange = function () {
        diviceCategory = this.value;
        console.log(this.attr("data-SystemDicID");)
        // console.log(this.value);
    }
    var param = {
        "ListCode": "L001",
        "PageNo": "1",
        "PageSize": "2000",
        "Filter": [],
        "Order": [{
                "OrdKey": "status",
                "OrdVal": "DESC"
            },
            {
                "OrdKey": "Machine_Type",
                "OrdVal": "DESC"
            }
        ]
    };
    devRequest(param);
    var paramcode = [{
        "Type": "2",
        "DicCode": "SYS0003"
    }];
    request({
        cmd: "C0005",
        param: paramcode,
        success: function (result) {
            code(result);
        }
    });

    function code(result) {
        for (var k = 0; k < result.Result[0].DicItem.length; k++) {
            $("#deviceselect").append($('<option data-SystemDicID=' + result.Result[0].DicItem[k].DicVal2 + '>' + result.Result[0].DicItem[k].DicVal1 + '</option>'));
        }
    }

    function dataTransf(data) {
        var clom = data.Result.Data.Columns,
            carr = [];
        var rwos = data.Result.Data.Rwos,
            rarr = [];
        var colModel = [];

        for (var i = 0; i < clom.length; i++) {
            carr[i] = clom[i].ColumnName;
            colModel[i] = {
                name: carr[i],
                width: 160,
                sorttype: 'text',
                formatter: function typeformatter(cellvalue, options, rowObject) {
                    var link = cellvalue;
                    if (options.colModel.name == '设备名称') {
                        var id = rowObject.Machine_ID;
                        link = '<a href="../edit/edit.html?id=' + id + '&diviceCategory=' + diviceCategory + '&diviceName=' + diviceName + '" class="td-hover">' + cellvalue + '</a>';
                    }
                    return link;
                }
            };
        }
        colModel[0].hidden = true;

        for (var k = 0; k < rwos.length; k++) {
            rarr[k] = {};
            for (var j = 0; j < rwos[k].length; j++) {
                rarr[k][carr[j]] = rwos[k][j];
            }
        }
        return {
            clom: carr,
            rows: rarr,
            colModel: colModel
        };
    }
    // 请求数据列表
    function devRequest(params) {
        // $('.loading').show();
        request({
            cmd: "C0029",
            param: params,
            success: function (result) {
                if (result.Result.Data.Rwos.length == 0) {
                    $('.jqGrid_wrapper').html('');
                    $(".jqGrid_wrapper").append($('<div class="nodata">没有查到数据</div>'));
                } else {
                    result = dataTransf(result);
                    devRender(result);
                }
            }
        });
    }
    // 渲染列表
    function devRender(result) {
        $('.jqGrid_wrapper').html('');
        for (var i = 1; i < result.colModel.length; i++) {
            result.colModel[i].sorttype = 'text';
        }
        $('<table>', {
            id: 'table_list_2',
            class: 'table table-stripe'
        }).appendTo($('.jqGrid_wrapper')).jqGrid({
            data: result.rows,
            datatype: "local",
            width: width - 50,
            rowNum: 100,
            height: height - 200,
            colNames: result.clom,
            colModel: result.colModel,
            viewrecords: true
        });
        // Add selection
        $("#table_list_2").setSelection(4, true);
        // Setup buttons
        $("#table_list_2").jqGrid('navGrid', '#pager_list_2', {
            edit: true,
            add: true,
            del: true,
            search: true
        }, {
            height: 200,
            reloadAfterSubmit: true
        });
        // Add responsive to jqGrid
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            $('#table_list_2').setGridWidth(width);
        });
        $(".jqGrid_wrapper").find("td[title='停用']").parent().addClass('tr-gray');
        $(".jqGrid_wrapper").find("td[aria-describedby='table_list_2_设备名称']").attr('id', 'deviceName');
    }
    $("#reserveBtn").click(function () {
        devSearch();
    });

    // 条件搜索
    function devSearch() {
        var param;
        var devicename = $("#devicename").val();
        var deviceselectcode = $("#deviceselect  option:selected").attr("data-SystemDicID");
        diviceCategory = deviceselectcode;
        diviceName = devicename;
        console.log(diviceCategory, diviceName);
        if (deviceselectcode == '0000') {
            param = {
                "ListCode": "L001",
                "PageNo": "1",
                "PageSize": "2000",
                "Filter": [{
                    "FilKey": "Machine_Name",
                    "FilVal": devicename,
                    "FilRelExp": "like"
                }],
                "Order": [{
                        "OrdKey": "status",
                        "OrdVal": "DESC"
                    },
                    {
                        "OrdKey": "Machine_Type",
                        "OrdVal": "DESC"
                    }
                ]
            };
        } else {
            param = {
                "ListCode": "L001",
                "PageNo": "1",
                "PageSize": "2000",
                "Filter": [{
                        "FilKey": "[Machine_Type]",
                        "FilVal": deviceselectcode,
                        "FilRelExp": "="
                    },
                    {
                        "FilKey": "Machine_Name",
                        "FilVal": devicename,
                        "FilRelExp": "like"
                    }
                ],
                "Order": [{
                        "OrdKey": "status",
                        "OrdVal": "DESC"
                    },
                    {
                        "OrdKey": "Machine_Type",
                        "OrdVal": "DESC"
                    }
                ]
            };
        }
        devRequest(param);

    }
})();