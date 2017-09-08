var listcount = list.length;
var chooseDelay = 200; //名字抽取时间间隔（单位：ms）
var chooseTimes = 28; //名字抽取次数
var prelist=new Array();
//生成名单
for (var i = 0; i <= listcount - 1; i++) {
    $("#namelist").append('<div class="name alert-info" id="name-' + i.toString() + '">' + list[i] + '</div>');
}
initPrelist();//初始化名单顺序

function initPrelist() {
	for (var i = 0; i <= listcount - 1; i++) {
        prelist[i]=i;
    }
	prelist=shuffle(shuffle(prelist));
}

//初始化当前名字
var namenow = null;

//名单乱序算法
function shuffle(a) {
    var len = a.length;
    for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = a[index];
        a[index] = a[len - i - 1];
        a[len - i - 1] = temp;
    }
	return a;
}

//随机选择名字并修改/还原Class
function chooseName(times) {
    var nameid = Math.floor(Math.random() * listcount);
    while (nameid == namenow) {
        nameid = Math.floor(Math.random() * listcount);
    }
	if (times==0) {
		if (prelist.length==0) {
			initPrelist();
		}
		nameid=prelist.shift();
		
	}
    if (namenow != null) {
        $("#name-" + namenow.toString()).removeClass("alert-warning");
        $("#name-" + namenow.toString()).addClass("alert-info");
    }
    namenow = nameid;
    $("#name-" + namenow.toString()).removeClass("alert-info");
    $("#name-" + namenow.toString()).addClass("alert-warning");
}

//开始随机
function startRandom() {
    $("#progressbar").width("0%");
    $("#div-start").slideUp(400,
    function() {
        $("#div-running").slideDown(400);
    });
    run(chooseTimes);
}

//点名
function run(times) {
    chooseName(times);
    times--;
    $("#progressbar").width((((chooseTimes - times) / chooseTimes) * 100).toString() + "%");
    if (times >= 0) {
        setTimeout(function() {
            run(times);
        },
        chooseDelay);
    } else {
        setTimeout(function() {
            $("#div-running").slideUp(400,
            function() {
                afterChoose();
                $("#div-start").slideDown(400);
            });
        },
        0);
    }
}

//点名完毕
function afterChoose() {
    $("#NameResultSpan").text(($("#name-" + namenow.toString()).text()));
    $("#Result").modal();
}

//更换页面
var currentid = "#page-random";
var pageturning = false;
function changePage(id) {
    if ((id != currentid) && (pageturning == false)) {
        pageturning = true;
        $(currentid).slideUp(400,
        function() {
            $(currentid + "-nav").removeClass("active");
            $(id + "-nav").addClass("active");
            $(id).slideDown(400,
            function() {
                currentid = id;
                pageturning = false;
            });
        });
    }
}

//生成名单JS
function spawnListJS() {
    var name = $("#editnamelist").val().split("\n");
    var output = 'var list=new Array("' + name[0] + '"';
    for (var i = 1; i < name.length; i++) {
        if (name[i] != '') {
            output += ',"' + name[i] + '"';
        }
    }
    output += ');';
    output = escape(output);
    output = 'eval(unescape("' + output + '"));';
    $("#editnamelist").val(output);
}