$.validator.addMethod("phone", function(value, element, param){
    //方法中又有三个参数:value:被验证的值， element:当前验证的dom对象，param:参数(多个即是数组)
    //alert(value + "," + $(element).val() + "," + param[0] + "," + param[1]);
    return new RegExp(/^1[3458]\d{9}$/).test(value);

}, "手机号码不正确");