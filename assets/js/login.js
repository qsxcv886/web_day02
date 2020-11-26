$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从Layui中获取DOM对象
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,16}$/, "密码必须6-16位,且不能输入空格"],
    // 校验两次密码是否一致
    repwd: function (value) {
      var pwd = $(".reg-box input[name=password]").val();
      if (pwd !== value) {
        return "密码不一致";
      }
    },
  });
  //  监听注册表单提交
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        // 切换到登录界面
        $("#link_login").click();
        // 重置from表单
        $("#form_reg")[0].reset();
      },
    });
  });

  //监听登录的提交事件
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        //存储token
        localStorage.setItem("token", res.token);
        //跳转页面
        location.href = "/index.html";
      },
    });
  });
});
