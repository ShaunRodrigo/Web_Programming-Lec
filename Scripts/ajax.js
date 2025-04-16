const code = "ETUAF5pip311"; 
const url = "http://gamf.nhely.hu/ajax2/";

async function read() {
  document.getElementById("code").innerHTML = "code=" + code;

  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;

  let str = "<h1></h1>";
  str += "<p>Number of records: " + data.rowCount + "</p>";
  str += "<p>Last max " + data.maxNum + " records:</p>";
  str += "<table><tr><th>id</th><th>name</th><th>height</th><th>weight</th><th>code</th></tr>";

  for (let i = 0; i < list.length; i++) {
    str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].height + "</td><td>" + list[i].weight + "</td><td>" + list[i].code + "</td></tr>";
  }

  str += "</table>";

  let heights = list.map(item => Number(item.height));
  let sum = heights.reduce((a, b) => a + b, 0);
  let avg = (sum / heights.length).toFixed(2);
  let max = Math.max(...heights);

  str += "<p><strong>Sum of Heights:</strong> " + sum + "</p>";
  str += "<p><strong>Average Height:</strong> " + avg + "</p>";
  str += "<p><strong>Max Height:</strong> " + max + "</p>";

  document.getElementById("readDiv").innerHTML = str;
}

async function create() {
  let name = document.getElementById("name1").value;
  let height = document.getElementById("height1").value;
  let weight = document.getElementById("weight1").value;

  if (name.length > 0 && name.length <= 30 &&
      height.length > 0 && height.length <= 30 &&
      weight.length > 0 && weight.length <= 30) {

    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=create&name=" + name + "&height=" + height + "&weight=" + weight
    });

    let data = await response.text();
    let str = (data > 0) ? "Create successful!" : "Create NOT successful!";
    document.getElementById("createResult").innerHTML = str;

    document.getElementById("name1").value = "";
    document.getElementById("height1").value = "";
    document.getElementById("weight1").value = "";
    read();
  } else {
    document.getElementById("createResult").innerHTML = "Validation error!!";
  }
}


async function getDataForId() {
  let response = await fetch(url, {
    method: 'post',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id == document.getElementById("idUpd").value) {
      document.getElementById("name2").value = list[i].name;
      document.getElementById("height2").value = list[i].height;
      document.getElementById("weight2").value = list[i].weight;
    }
  }
}


async function update() {
  let id = document.getElementById("idUpd").value;
  let name = document.getElementById("name2").value;
  let height = document.getElementById("height2").value;
  let weight = document.getElementById("weight2").value;

  if (id.length > 0 && id.length <= 30 &&
      name.length > 0 && name.length <= 30 &&
      height.length > 0 && height.length <= 30 &&
      weight.length > 0 && weight.length <= 30) {

    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=update&id=" + id + "&name=" + name + "&height=" + height + "&weight=" + weight
    });

    let data = await response.text();
    let str = (data > 0) ? "Update successful!" : "Update NOT successful!";
    document.getElementById("updateResult").innerHTML = str;

    document.getElementById("idUpd").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("height2").value = "";
    document.getElementById("weight2").value = "";
    read();
  } else {
    document.getElementById("updateResult").innerHTML = "Validation error!!";
  }
}


async function deleteF() {
  let id = document.getElementById("idDel").value;

  if (id.length > 0 && id.length <= 30) {
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code=" + code + "&op=delete&id=" + id
    });

    let data = await response.text();
    let str = (data > 0) ? "Delete successful!" : "Delete NOT successful!";
    document.getElementById("deleteResult").innerHTML = str;

    document.getElementById("idDel").value = "";
    read();
  } else {
    document.getElementById("deleteResult").innerHTML = "Validation error!!";
  }
}


window.onload = function () {
  read();
};