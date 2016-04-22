/**
 * Created by yangyuming on 16/4/21.
 */



$(document).ready(function () {

$("#app").hide();
    //$.get("/loggedin/", function (data) {
    //    if (data["loggedin"] == "true") {
    //        $("#index").hide();
    //        $("#app").show();
    //    }
    //    else {
    //        $("#index").show();
    //        $("#app").hide();
    //    }
    //})


    $.ajaxSetup({
            async: false,
            data: {
                csrfmiddlewaretoken: '{{ csrf_token }}'
            },
        }
    )

    //注册和登陆页切换动画
    $('.message a').click(function () {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        $('#username_register').val("");
        $('#password_register').val("");
        $('#email_register').val("");
    });

    //用户名检查
    $('#username_login').blur(function () {

        $.post("/check_username/", $("#form_login").serialize(), function (data) {
            if (data["pass"] == "false") {
                $("#username_login").attr({
                    "value": "",
                    "placeholder": "用户名不存在"

                });
                $('#username_login').focus();
            }
        })
    })

    $("#form_login").submit(function () {

        $.post("/check_passwd/", $("#form_login").serialize(), function (data, status) {
            if (data["pass"] == "false") {
                $("#password_login").attr({
                    "value": "",
                    "placeholder": "密码错误"
                });
                $('#password_login').focus();
            }
            else {
                $.post("/login/", $("#form_login").serialize(), function (data, status) {
                    if (data["login"] == "true") {
                        $("#index").hide();
                        $("#app").show();
                        //$.get("/logout/", function (data, status) {
                        //})
                    }
                })
            }
        })
        return false;

    })


    //注册用户名检查
    $('#username_register').blur(function () {
        var user = $(this).val();

        if (user == "") {
            $(this).attr({
                "value": "",
                "placeholder": "用户名不能为空"
            });
            $('#username_register').focus();
        }

        if (user.length < 4 || user.length > 20) {
            $(this).attr({
                "value": "",
                "placeholder": "长度不符合要求，必须为4-20位"
            });
            $('#username_register').focus();
        }

        $.post("/check_username/", $("#form_register").serialize(), function (data) {
            if (data["pass"] == "true") {
                $("#username_register").attr({
                    "value": "",
                    "placeholder": "该用户名已存在"
                });
                $('#username_register').focus();
            }
        })
    })

    //密码检查
    $('#password_register').blur(function () {
        var pwd = $(this).val();

        if (pwd == "") {
            $(this).attr({
                "value": "",
                "placeholder": "密码不能为空"
            });
            $('#password_register').focus();
        }

        var pattern = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*$/;
        if (!pattern.test(pwd)) {
            $(this).attr({
                "value": "",
                "placeholder": "只能由字母或数字组成"
            });
            $('#password_register').focus();
        }

        if (pwd.length < 4 || pwd.length > 12) {
            $(this).attr({
                "value": "",
                "placeholder": "长度不符合要求，必须为4-12位"
            });
            $('#password_register').focus();
        }
    })

    //email检查
    $('#email_register').blur(function () {
        var email = $(this).val();
        var pattern = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z]+\.)+[a-zA-Z]{2,3}$/;
        if (!pattern.test(email)) {
            $(this).attr({
                "value": "",
                "placeholder": "email格式不正确"
            });
            $('#email_register').focus();
        }
    })

    $("#form_register").submit(function () {
        $.post("/register/", $("#form_register").serialize(), function (data, status) {
            if (data["register"] == "true") {
                $("#index").hide();
                $("#app").show();
            }
        })
        return false;
    })
})
