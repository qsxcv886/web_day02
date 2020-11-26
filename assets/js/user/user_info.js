$(function () {
  //自定义验证规则
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度为1~6位之间";
      }
    },
  });
  //用户渲染
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res, message);
        }

        form.val("formUserInfo", res.data);
      },
    });
  }
  //重置表单的数据
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });

  //监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        window.parent.getUserInfo();
      },
    });
  });
});
