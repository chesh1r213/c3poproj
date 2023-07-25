/*function changeColor(o){
    if (o.classList.contains("pick-field")) {
        o.classList.remove("pick-field")
    }
    else {
        o.classList.add("pick-field")
    }
};*/
async function dbf(o){
    if (o.value != null) {
        if(event.key === 'Enter') {
            a = await getData(o.value,'/rig/items/')
            if (a == null) {
                o.classList.add("notvalid")
                o.value = "Not found"
            }
            else {
                o.classList.remove("notvalid")
                o.value = null
                document.getElementById("select-id").value = a["ID"];
                document.getElementById("select-direct").value = a["economic effect"];
                document.getElementById("select-coverage").value = a["coverage"];
                document.getElementById("select-hurt").value = a["pain customer"];
                document.getElementById("select-coef").value = a["it coefficient"];
                document.getElementById("select-prior").value = a["management priority"];
                document.getElementById("select-official").value = a["project priority"];
                document.getElementById("select-time").value = parseFloat(a["completed time"]);
                document.getElementById("select-familiarity").value = a["familiarity"];
            }
        }
    }
}

async function validateInpitID(e) {
    e.value = e.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
};
async function isInternal(q){
    var req = await getData(q,'/rig/getTitle/')
    if (req["Status"] == "OK") {
        if ((req["Area"]).match("^(?!(Tele2\\\\IT Service))")) {return false}
    }
};
function onBG(e){e.style.backgroundColor="rgba(0, 150, 136,0.4)"}
function offBG(e){e.style.backgroundColor="transparent"}
async function start() {
    const Dates = await fetch("/rig/Queue")
    let DateArr = await Dates.json()
    someArr = []
    DateArr.forEach(element => someArr.push(element))
    return someArr
}
function changeNumeric(k = 1){
	[].forEach.call(document.getElementsByClassName("numeration"), e => {
		e.childNodes[0].textContent = k++
	})
}
function GetRow(Result) {
    var tBody  = document.getElementById('ResultTable');
    var items = tBody.children;
    items = [...items];
    items = items.reverse();
    for (let item of items) {
        if (Result <= item.children[3].childNodes[0].defaultValue) {
            return item
    	}
    }
}
function startnextIteraion(Input,CountIter){
    [i,j] = Input.split('.')
    if (i[0] == 0) {i=i[1]}
    if (j[0] == 0) {j=j[1]}
    if (parseInt(i) <= new Date().getDate() && parseInt(j) <= new Date().getMonth()+1) {k=new Date().getFullYear()}
    else {k=new Date().getFullYear()-1}
    result = new Date(j+"."+i+"."+k)
    result.setDate(result.getDate() + (CountIter*14))
    return result
}
function checkLength (str){
    str = str.toString()
    if (str.length == 1) {str = "0" + str}
    return str
}
function IterString(Date) {
    i = checkLength(Date.getDate())
    j = checkLength(Date.getMonth()+1)
    return i+"."+j
}
function getPlaneDate(t,s,idx) {
    i=1
    idx=idx*1.3
    a=Math.ceil(s/t)
    while(idx>=a){i+=1;idx=idx-a}
    return i
}
function averageValue(DataArr,CountIter) {
    i = 0
    DataArr.forEach(dd => {
        for ([key, value] of Object.entries(dd)) {
            i+= parseInt(value)
        }
    })
    queuePosition = Math.ceil(i/CountIter)
    return queuePosition
}
async function addRow(Link,Result,id) {
    var tBody  = document.getElementById('ResultTable');
    var newRow = tBody.insertRow();
    newRow.id = 'CreatedRow';
    newRow.classList.add("numeration");
    if (Link != undefined) {
        var newCell = tBody.insertBefore(newRow,Link.nextSibling)
    }
    else {
        tBody.childNodes[0].after(newRow)
        var newCell = tBody.childNodes[1]
    }
    var number = document.createTextNode('');
    var newText = document.createElement('a')
    newText.text = id;
    newText.href = 'https://tfs.tele2.ru/tfs/Main/Tele2/_workitems/edit/'+id
    var newTextt = document.createTextNode((await getData(id,'/rig/getTitle/'))["Title"]);
    var newTexttt = document.createElement("input");
    newTexttt.type = "button";
    newTexttt.className = "size-button";
    newTexttt.textContent = id;
    newTexttt.setAttribute("onclick", "showCurrentSettings(this)");
    newTexttt.value = Result;
    zColumn = newCell.insertCell()
    fColumn = newCell.insertCell()
    sColumn = newCell.insertCell()
    tColumn = newCell.insertCell()
    zColumn.appendChild(document.createTextNode(''));
    fColumn.appendChild(newText);
    sColumn.appendChild(newTextt);
    tColumn.appendChild(newTexttt);
}
function createDiv() {
    var vis = document.getElementsByClassName('tfsreport')[0];
    graph = document.createElement('div');
    graph.className = 'graph';
    graph.style.height = "30vh";
    graph.id = 'graph';
    vis.appendChild(graph);
}
async function validate(o) {
    var req = await isInternal(o.value)
    if (req == false) {
        o.value = "Area not allowed"
    }
    if (o.value == "" || isNaN(o.value) || o.value == "Area not allowed") {
        o.classList.add("notvalid")
    }
    else {
        o.classList.remove("notvalid")
    }
}
function NotEmpty(o){
    if (o.value == "" || isNaN(o.value)) {
        o.classList.add("notvalid")
    }
    else {
        o.classList.remove("notvalid")
    }
}
async function showCurrentSettings(e){
    [].forEach.call(document.getElementsByClassName("validate"),u=>{u.style.backgroundColor = null})
    a = await getData(e.parentElement.parentElement.childNodes[3].textContent,'/rig/items/')
    document.getElementById("select-id").value = a["ID"];
    document.getElementById("select-direct").value = a["economic effect"];
    document.getElementById("select-coverage").value = a["coverage"];
    document.getElementById("select-hurt").value = a["pain customer"];
    document.getElementById("select-coef").value = a["it coefficient"];
    document.getElementById("select-prior").value = a["management priority"];
    document.getElementById("select-official").value = a["project priority"];
    document.getElementById("select-time").value = parseFloat(a["completed time"]);
    document.getElementById("select-familiarity").value = a["familiarity"];
}
async function getData(e,p){
    try {
        var r =  await fetch(p+e, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        var j = await r.json()
        return j
    }
    catch {return null}
}
function updateCalc(id,ee,c,pc,itc,mp,pp,ct,f){
    document.getElementById("select-id").value = id;
    document.getElementById("select-direct").value = ee;
    document.getElementById("select-coverage").value = c;
    document.getElementById("select-hurt").value = pc;
    document.getElementById("select-coef").value = itc;
    document.getElementById("select-prior").value = mp;
    document.getElementById("select-official").value = pp;
    document.getElementById("select-time").value = ct;
    document.getElementById("select-familiarity").value = f;
}
function removeOldGraph(){
    if (document.getElementById("graph") != null) document.getElementById("graph").remove();
}
function drawChart(legend) {
    var data = google.visualization.arrayToDataTable(ResultArr);

    var options = {
        pointSize: 5,
        title: 'Скорость выполнения требований',
        curveType: 'function',
        legend: { position: 'none' },
        vAxis: {
            scaleType: 'log'
        },
    };
    var chart = new google.visualization.LineChart(document.getElementById('graph'));
    chart.draw(data, options);
}
function sendToDatabase (id,json) {
    fetch('/rig/items/'+id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
}
function DeleteRow () {
    try {
        (document.getElementById('CreatedRow')).classList.add("new-td");
        return;
    }
    catch {
        return;
    }
}
async function createGraph(){
    var id = parseInt((document.getElementById('select-id')).value)
    var dir = parseInt((document.getElementById('select-direct')).value)
    var cov = parseInt((document.getElementById('select-coverage')).value)
    var hurt = parseInt((document.getElementById('select-hurt')).value)
    var coef = parseInt((document.getElementById('select-coef')).value)
    var prior = parseInt((document.getElementById('select-prior')).value)
    var offi = parseInt((document.getElementById('select-official')).value)
    var time = parseFloat((document.getElementById('select-time')).value)
    var fami = parseInt((document.getElementById('select-familiarity')).value)
    Result = Math.ceil(((dir*cov*(hurt+coef)*prior*(5-offi))/(time+fami))*10)
    if (isNaN(Result) || isNaN(id)) {
        [].forEach.call(document.getElementsByClassName("validate"), function (e) {
            if (e.value == "" || isNaN(e.value)) {
                e.style.backgroundColor = "rgba(255,0,0,0.3)"
            }
        });
        return
    }
    sendToDatabase(id,{"ID":id,"ee":dir,"c":cov,"pc":hurt,"itc":coef,"mp":prior,"pp":offi,"ct":time,"f":fami,"Size":Result})
    Datajson = await start()
    ResultArr = [
        [
            'Date',
            'Количество',
            {"type": "string","role": "style"},
            "Взятие в работу требования",
            {"type": "string", "role": "tooltip"}
        ]
    ]
    Datajson.forEach(el => {
        for ([key, value] of Object.entries(el)) {
            ResultArr.push([key, value,null,null,null]);
        }
    })
    Link = GetRow(Result);
    changeNumeric()
    if (Link == undefined) {
        Index = 1
    }
    else {
        Index = Link.rowIndex
    }
    await cTable()
    document.getElementById("ResultTable").children[Index].scrollIntoViewIfNeeded()
    temporarilyCC(Index)
    avg = averageValue(Datajson,ResultArr.length)
    sum = Number(0);
    Datajson.forEach(el => {
        for ([key, value] of Object.entries(el)) {
            sum += value
        }
    });
    pDate = getPlaneDate(Datajson.length,sum,Index)
    newIter =  IterString(startnextIteraion(ResultArr[ResultArr.length-1][0],pDate))
    ResultArr.push([newIter,null,'point { size: 5; fill-color: #c91010; }',avg,"Взятие в работу требования"])
    removeOldGraph()
    createDiv()
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}
async function cTable(){
	var m = (document.getElementById('ResultTable'));
	var i = 1
	async function nr(j){
		var c = m.insertRow()
        c.classList.add("numeration","new-td");
		c.setAttribute("onclick", "changeColor(this)");
		var d = document.createElement('a')
		d.text = j["ID"];
		d.href = 'https://tfs.tele2.ru/tfs/Main/Tele2/_workitems/edit/'+j["ID"];
		var t = document.createTextNode(j["Title"]);
		var s = document.createElement("input");
		var y = document.createTextNode(j["Iter"]);
		s.type = "button";
		s.className = "size-button";
		s.textContent = j["ID"];
		s.setAttribute("onclick", "showCurrentSettings(this)");
		s.value = j["Size"];
		zColumn = c.insertCell().appendChild(document.createTextNode(i++));
		fColumn = c.insertCell().appendChild(d);
		sColumn = c.insertCell().appendChild(t);
		tColumn = c.insertCell().appendChild(s);
		tColumn = c.insertCell().appendChild(y);
	};
	var r = (await getData("","/rig/charge"));
	[].forEach.call(r, e=> nr(e));
	$(".table-fields").remove();
	$(".new-td").addClass("table-fields");
	$(".new-td").removeClass("new-td");
    DeleteRow()
}
async function getStat(){
    Datajson = await start();
    slt = [];
    [].forEach.call(document.getElementsByClassName("pick-field"), e => {
        slt.push([e.childNodes[1].textContent,e.childNodes[3].textContent])
    })
    sum = Number(0);
    Datajson.forEach(el => {
        for ([key, value] of Object.entries(el)) {
            sum += value
        }
    });
    [].forEach.call(slt,u=>{
        z = getPlaneDate(Datajson.length,sum,u[0])
        u.push(IterString(startnextIteraion(Object.keys(Datajson.at(-1))[0],z)))
    });
    ResultArr = [
        [
            'Date',
            {label: 'Return', type: 'number'},
            {label: 'Return1', type: 'number'},
            {"type": "string", "role": "tooltip"},
            {label: 'Return2', type: 'number'},
            {label: 'Return3', type: 'number'},
            {label: 'Return4', type: 'number'}
        ]
    ]
    Datajson.forEach(el => {
        for ([key, value] of Object.entries(el)) {
            ResultArr.push([key, value,null,null,null,null,null]);
        }
    })
    ResultArr.push(["12.06",null,"2","123\r\nqwe","3","4",null])
    ResultArr.push(["14.06",null,null,null,null,null,"2"])
    ResultArr.push(["22.06",null,"1",null,"2","3",null])
    removeOldGraph()
    createDiv()
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
};
function HaveValue(id){
    var val;
    [].forEach.call(document.getElementsByClassName("table-fields"), v => {
		if (v.children[1].textContent === id.toString()) {val = true}
	})
	return val
}
function temporarilyCC(idx){
    var el = document.getElementById("ResultTable").children[(idx-1)]
    el.style.backgroundColor = "rgba(100,100,100,0.7)";
    setTimeout(function () { el.style.backgroundColor = "" }, 3000);
};