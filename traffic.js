const input = {
  url: "https://www.nenode.best/downloadConfig/NodeList.aspx?urk=0922afc1-71c9-40c6-ab31-d730eac8730a", //填订阅链接
  header: {"User-Agent": "Quantumult/625 CFNetwork/1107.1 Darwin/19.0.0"},
  body: {
  }
};

function traffic(response){
  var headers = response.headers;
  var data = headers["subscription-userinfo"];
  data = data.split(";");
  var upload = data[0].split("=");
  var download = data[1].split("=");
  var total = data[2].split("=");
  upload = parseInt(upload[1], 10);
  download = parseInt(download[1], 10);
  total = parseInt(total[1], 10);
  var usage = Number(upload) + Number(download);
  usage = Number((usage / 1024 / 1024 / 1024).toFixed(2)) + "GB";
  var preimum = 0; //preimum用户改成1
  total = Number((total / 1024 / 1024 / 1024 + preimum *400).toFixed(0)) + "GB";
  return [usage, total];
};

$httpClient.get(input, function(error, response, data){
  if (error){
    $notification.post("error!");
    $done();                   
  }
  else {
    var a = traffic(response);
    $notification.post("流量信息", "Nexitally", "总流量: " + a[1] + ", 已使用: " + a[0]);
    $done();
  }
}
)
