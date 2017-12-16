/**
 * @name RandomName
 * @version 2.0.4
 * @license BSD-2-Clause
 * @see {@link https://github.com/Netrvin/RandomName}
 */

//可修改参数
var chooseDelay = 100; //特效：名字闪动时间间隔（单位：ms）
var chooseTimes = 20; //特效：名字闪动次数
var allowSave = true; //特性：是否允许将预点名单存储在浏览器中

var namenow = null;
var listcount = list.length;
var namelist_md5 = md5(JSON.stringify(list));
console.log('Name List MD5: ' + namelist_md5);

//生成名单HTML
for (var i = 0; i < listcount; i++) {
    $('#namelist').append('<div class="name alert-info" id="name-' + i.toString() + '">' + list[i] + '</div>');
}

//初始化名单
if (allowSave) {
    checkList();
} else {
    initPrelist();
}

//加载名单
function loadList() {
    checkList();
    try {
        return JSON.parse(base64.decode(localStorage['prelist_' + namelist_md5]));
    } catch (err) {
        initPrelist();
        return JSON.parse(base64.decode(localStorage['prelist_' + namelist_md5]));
    }
}

//保存名单
function saveList(arr) {
    str = base64.encode(JSON.stringify(arr));
    localStorage['listmd5_' + namelist_md5] = md5(str);
    localStorage['prelist_' + namelist_md5] = str;
}

//检查名单
function checkList() {
    if ((localStorage['prelist_' + namelist_md5] == undefined) || (localStorage['prelist_' + namelist_md5] == null)) {
        initPrelist();
    } else {
        if (md5(localStorage['prelist_' + namelist_md5]) != localStorage['listmd5_' + namelist_md5]) {
            initPrelist();
        } else {}
    }
}

//生成待点名单
function initPrelist() {
    var prelist = new Array();
    for (var i = 0; i < listcount; i++) {
        prelist[i] = i;
    }
    saveList(shuffle(prelist));
}

//名单乱序
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

//随机闪动名字并修改/还原Class
function chooseName(times) {
    var prelist = loadList();
    var nameid = Math.floor(Math.random() * listcount);
    while (nameid == namenow) {
        nameid = Math.floor(Math.random() * listcount);
    }
    if (times == 0) {
        if (prelist.length == 0) {
            initPrelist();
            prelist = loadList();
        }
        nameid = prelist.shift();
        saveList(prelist);
    }
    if (namenow != null) {
        $('#name-' + namenow.toString()).removeClass('alert-warning');
        $('#name-' + namenow.toString()).addClass('alert-info');
    }
    namenow = nameid;
    $('#name-' + namenow.toString()).removeClass('alert-info');
    $('#name-' + namenow.toString()).addClass('alert-warning');
}

//开始随机
function startRandom() {
    $('#progressbar').width('0%');
    $('#div-start').slideUp(400,
        function() {
            $('#div-running').slideDown(400);
        });
    run(chooseTimes);
}

//点名
function run(times) {
    chooseName(times);
    times--;
    $('#progressbar').width((((chooseTimes - times) / chooseTimes) * 100).toString() + '%');
    if (times >= 0) {
        setTimeout(function() {
                run(times);
            },
            chooseDelay);
    } else {
        setTimeout(function() {
                $('#div-running').slideUp(400,
                    function() {
                        afterChoose();
                        $('#div-start').slideDown(400);
                    });
            },
            0);
    }
}

//点名完毕
function afterChoose() {
    $('#NameResultSpan').text(($('#name-' + namenow.toString()).text()));
    $('#Result').modal();
}

//更换页面
var currentid = '#page-random';
var pageturning = false;

function changePage(id) {
    if ((id != currentid) && (pageturning == false)) {
        pageturning = true;
        $(currentid).slideUp(400,
            function() {
                $(currentid + '-nav').removeClass('active');
                $(id + '-nav').addClass('active');
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
    var name = $('#editnamelist').val().split('\n');
    var output = 'var list=new Array("' + name[0] + '"';
    for (var i = 1; i < name.length; i++) {
        if (name[i] != '') {
            output += ',"' + name[i] + '"';
        }
    }
    output += ');';
    output = escape(output);
    output = 'eval(unescape("' + output + '"));';
    $('#editnamelist').val(output);
}

//保存名单JS
function saveListJS() {
    var aTag = document.createElement('a');
    var blob = new Blob([$('#editnamelist').val()], { type: 'text/javascript' });
    aTag.download = 'list.js';
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
    aTag.remove();
}