//提交按钮变灰
function setDisable(obj){
    $('#registerForm .button-green').addClass('disable').find('input').get(0).disabled = true;
    $(obj).data('disable',true);
}
 $("#register_deal").click(function(){
    if($(this).attr("checked")===undefined){
        $('#registerForm .button-green').addClass('disable').find('input').get(0).disabled = true;
        clearTips($(this).parent().parent().find('.tips'),'fail','需要阅读并同意磨房注册协议');
        setDisable($(this));
    }else{ 
        $('#registerForm .button-green').removeClass('disable').find('input').get(0).disabled = false;
        var tip=$(this).parent().parent().find('.tips');
        tip.find(".center").html("");
        tip.removeClass('fail').removeClass('ok').addClass("ok");
    }
 });
//提交按钮变亮
function setAble(obj){
    $(obj).data('disable',false);

    var flag = false;
    var $username = $('#registerForm').find('input[name="username"]');
    var $email = $('#registerForm').find('input[name="email"]');
    var $password = $('#registerForm').find('input[name="password"]');
    if($username.data('disable')||$email.data('disable')||$password.data('disable')){
        flag = true;
    }
    if(!flag) $('#registerForm .button-green').removeClass('disable').find('input').get(0).disabled = false;
}
function clearTips(obj,str,msgs){
    $(obj).removeClass('fail').removeClass('ok').removeClass('loading');
    if(str) $(obj).addClass(str);
    $(obj).find('.center').html(msgs);
    return $(obj);
}
//在线检验用户名
var timtout_username;
$('#registerForm input[name="username"]').keyup(function(e){

    if(e.keyCode==9) return;

    clearTimeout(timtout_username);
    //不能输入空格
    this.value = this.value.replace(' ','');

    var user_name = $.trim(this.value);
    var that = this;

    $(that).data('istimeout',false);
    timtout_username = setTimeout(function(){
        if($(that).data('istimeout')) return;

        if($.trim(user_name) == ''){
            clearTips($(that).parent().nextAll('.tips'),'fail','用户名不能为空');
            setDisable(that);
        }
        else if (!new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-])*$").test(user_name)){
            clearTips($(that).parent().nextAll('.tips'),'fail','只允许中英文,数字,中划线-,下划线_');

            setDisable(that);
        }
        else if($.trim(user_name).length<2){
            clearTips($(that).parent().nextAll('.tips'),'fail','请输入2-14字');
            setDisable(that);
        }
        else if($.trim(user_name).length>14){
            clearTips($(that).parent().nextAll('.tips'),'fail','请输入2-14字');
            setDisable(that);
        }
        else{

            clearTips($(that).parent().nextAll('.tips'), '', '');
            /*后台API有风险，前台关闭唯一性验证
             var req = {};
             req.user_name = user_name;
            clearTips($(that).parent().nextAll('.tips'),'loading','在线验证中...');
            $.get('/api/user/checkUserNameExists', req, function(data){
                $(that).data('istimeout',true);
                if(parseInt(data.error)==0){
                    //不存在
                    clearTips($(that).parent().nextAll('.tips'),'ok','');
                    setAble(that);
                }
                else{
                    //已经存在
                    clearTips($(that).parent().nextAll('.tips'),'fail',data.msgs);
                    setDisable(that);
                }
            }, 'json');
            */
        }
    },800);

}).blur(function(){
    var user_name = $.trim(this.value);
    var that = this;

    if($(that).data('istimeout')) return;

    $(that).data('istimeout',true);
    if($.trim(user_name) == ''){
        clearTips($(that).parent().nextAll('.tips'),'fail','用户名不能为空');
        setDisable(that);
    }
    else if (!new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-])*$").test(user_name)){
        clearTips($(that).parent().nextAll('.tips'),'fail','只允许中英文,数字,中划线-,下划线_');
        setDisable(that);
    }
    else if($.trim(user_name).length<2){
        clearTips($(that).parent().nextAll('.tips'),'fail','请输入2-14个字符');
        setDisable(that);
    }
    else if($.trim(user_name).length>14){
        clearTips($(that).parent().nextAll('.tips'),'fail','请输入2-14个字符');
        setDisable(that);
    }
    else{

        clearTips($(that).parent().nextAll('.tips'), '', '');
        setAble(that);
        /*后台API有风险，前台关闭唯一性验证
         var req = {};
         req.user_name = user_name;
        clearTips($(that).parent().nextAll('.tips'),'loading','在线验证中...');
        $.get('/api/user/checkUserNameExists', req, function(data){
            if(parseInt(data.error)==0){
                //不存在
                clearTips($(that).parent().nextAll('.tips'),'ok','');
                setAble(that);
            }
            else{
                //已经存在
                clearTips($(that).parent().nextAll('.tips'),'fail',data.msgs);
                setDisable(that);
            }
        }, 'json');
        */
    }
});
//在线检验邮箱
function checkEmail(email){
    //var reg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    var reg =/^[A-Za-z0-9]+([\w-\w_\w]*[.]?[\w-\w_\w]*[A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+(?!ru$|pl$)[A-Za-z0-9]{2,5}$/;
    return reg.test(email);
}
var timtout_email;
$('#registerForm input[name="email"]').keyup(function(e){
    
    if(e.keyCode==9) return;

    clearTimeout(timtout_email);
    var email = this.value;
    var that = this;

    $(that).data('istimeout',false);
    timtout_email = setTimeout(function(){
        if($(that).data('istimeout')) return;

        if($.trim(email) == ''){
            clearTips($(that).parent().nextAll('.tips'),'fail','邮箱不能为空');
            setDisable(that);
            return;
        }

        //检查是否符合邮箱格式
        if(!checkEmail(email)){
            clearTips($(that).parent().nextAll('.tips'),'fail','请输入正确的邮箱地址');
            setDisable(that);
        } 
        else{

            clearTips($(that).parent().nextAll('.tips'), '', '');
            setAble(that);
            /*后台API有风险，前台关闭唯一性验证
             var req = {};
             req.email = email;
            clearTips($(that).parent().nextAll('.tips'),'loading','在线验证中...');
            $.get('/api/user/checkEmailExists', req, function(data){
                $(that).data('istimeout',true);

                if(parseInt(data.error)==0){
                    //不存在
                    clearTips($(that).parent().nextAll('.tips'),'ok','');
                    setAble(that);
                }
                else{
                    //已经存在
                    clearTips($(that).parent().nextAll('.tips'),'fail',data.msgs);
                    setDisable(that);
                }
            }, 'json');
            */
        }
    },800);

}).blur(function(){
    var email = this.value;
    var that = this;

    if($(that).data('istimeout')) return;

    $(that).data('istimeout',true);
    if($.trim(email) == ''){
        clearTips($(that).parent().nextAll('.tips'),'fail','邮箱不能为空');
        setDisable(that);
        return;
    }

    //检查是否符合邮箱格式
    if(!checkEmail(email)){
        clearTips($(that).parent().nextAll('.tips'),'fail','请输入正确的邮箱地址');
        setDisable(that);
    }else{

        clearTips($(that).parent().nextAll('.tips'), '', '');
        setAble(that);
        /*后台API有风险，前台关闭唯一性验证
         var req = {};
         req.email = email;
        clearTips($(that).parent().nextAll('.tips'),'loading','在线验证中...');
        $.get('/api/user/checkEmailExists', req, function(data){
            if(parseInt(data.error)==0){
                //不存在
                clearTips($(that).parent().nextAll('.tips'),'ok','');
                setAble(that);
            }
            else{
                //已经存在
                clearTips($(that).parent().nextAll('.tips'),'fail',data.msgs);
                setDisable(that);
            }
        }, 'json');
        */
    }
});
//密码强度检测
function checkPwd(obj)
{
    var v = obj.value;
    var n = /[a-z]/.test(v) +       // 小写字母
            /[A-Z]/.test(v) +       // 大写字母
            /\d/.test(v) +          // 数字
            /[^0-9a-z]/i.test(v) +  // 符号
            /[^0-9a-z]/i.test(v) +  // 符号
            (v.length>= 6) +       // 长度级别 1
            (v.length>= 8) +       // 长度级别 2
            (v.length>= 10);       // 长度级别 3
    return n;
}
//检查密码
var timeout_password;
$('#registerForm input[name="password"]').keyup(function(e){

    if(e.keyCode==9) return;

    clearTimeout(timeout_password);
    var password = this.value;
    var that = this;

    $(that).data('istimeout',false);
    timeout_password = setTimeout(function(){
        if($(that).data('istimeout')) return;

        if($.trim(password) == ''){
            clearTips($(that).parent().nextAll('.tips'),'fail','密码不能为空');
            setDisable(that);
        }
        else if(that.value.length<6){
            clearTips($(that).parent().nextAll('.tips'),'fail','密码的长度至少是6位');
            setDisable(that);
        }
        else if(checkPwd(that)<4){
            clearTips($(that).parent().nextAll('.tips'),'ok','密码过于简单,建议修改');
            setAble(that);
        }
        else{
            clearTips($(that).parent().nextAll('.tips'),'ok','');
            setAble(that);
        }

        $(that).data('istimeout',true);
    },500);
}).blur(function(){
    var password = this.value;
    var that = this;

    if($(that).data('istimeout')) return;

    $(that).data('istimeout',true);
    if($.trim(password) == ''){
        clearTips($(that).parent().nextAll('.tips'),'fail','密码不能为空');
        setDisable(that);
    }
    else if(that.value.length<6){
        clearTips($(that).parent().nextAll('.tips'),'fail','密码的长度至少是6位');
        setDisable(that);
    }
    else{
        clearTips($(that).parent().nextAll('.tips'),'ok','');
        setAble(that);
    }
});

//检查两次输入的密码
$('#registerForm input[name="password_alt"]').blur(function(){
    return;
    var password = $('#registerForm input[name="password"]').val();
    var password_alt = $(this).val();
    if(password != password_alt){
        clearTips($(that).parent().nextAll('.tips'),'fail','您输入的两次密码不一样');
        setDisable(that);
    }
    else{
        clearTips($(that).parent().nextAll('.tips'),'ok','');
        setAble(that);
    }
});

//检验表单
$('#registerForm').submit(function(){
    var form_flag = false, msgs = '', focus = '';
    var $username = $(this).find('input[name="username"]');
    var $email = $(this).find('input[name="email"]');
    var $password = $(this).find('input[name="password"]');
    var register_deal = $("#register_deal");
    //var password_alt = $(this).find('input[name="password_alt"]').val();
    //检查用户名
    if($.trim($username.val()) == ''){
        form_flag = true;
        clearTips($username.parent().nextAll('.tips'),'fail','用户名不能为空');
        setDisable($username);
        msgs += '用户名不能为空\n';
        if(!focus) focus = $username;
    }
    //检查email
    if($.trim($email.val()) == ''){
        form_flag = true;
        clearTips($email.parent().nextAll('.tips'),'fail','邮箱不能为空');
        setDisable($email);
        msgs += '邮箱不能为空\n';
        if(!focus) focus = $email;
    }
    else{
        if(!checkEmail($email.val())){
            form_flag = true;
            clearTips($email.parent().nextAll('.tips'),'fail','请输入正确的邮箱地址');
            setDisable($email);
            msgs += '请输入正确的邮箱地址\n';
            if(!focus) focus = $email;
        } 
    }
    //检查密码
    if($.trim($password.val()) == ''){
        form_flag = true;
        clearTips($password.parent().nextAll('.tips'),'fail','密码不能为空');
        setDisable($password);
        msgs += '密码不能为空\n';
        if(!focus) focus = $password;
    }
    if(register_deal.attr("checked")===undefined){
        form_flag = true;
        clearTips(register_deal.parent().parent().find('.tips'),'fail','需要阅读并同意磨房注册协议');
        setDisable(register_deal);
        if(!focus) focus = register_deal;
    }

    if(form_flag){
        //alert(msgs);
        focus.focus();
        return false;
    }
    return true;
});