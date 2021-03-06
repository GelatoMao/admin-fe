class MUtil {
  // 跳转登录
  doLogin() {
    window.location.href =
      "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }

  //获取url参数
  getUrlParam(name) {
    //xxx.com?param=123&param1=456
    let queryString = window.location.search.split("?")[1] || "",
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      result = queryString.match(reg);
    //result :['param=123','','123']
    return result ? decodeURIComponent(result[2]) : null;
  }

  //正确提示
  successTips(successMsg) {
    alert(successMsg || "操作成功");
  }

  //错误提示
  errorTips(errMsg) {
    alert(errMsg || "出现问题啦");
  }

  //存储
  setStorage(name, data) {
    const dataType = typeof data;
    //json对象
    if (dataType === "object") {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
      //基础类型
      window.localStorage.setItem(name, data);
    } else {
      //其他不支持的类型
      alert("该类型不能用于本地存储");
    }
  }

  //取出存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return "";
    }
  }

  //删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }

  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success: (res) => {
          // 数据请求成功
          if (0 === res.status) {
            typeof resolve === "function" && resolve(res.data, res.msg);
          } else if (10 === res.status) {
            // 没有登录状态，强制登录
            this.doLogin();
          } else {
            typeof reject === "function" && reject(res.msg || res.data);
          }
        },
        error: (err) => {
          typeof reject === "function" && reject(err.statusText);
        },
      });
    });
  }
}

export default MUtil;
