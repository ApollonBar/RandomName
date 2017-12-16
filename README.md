# RandomName

## 点名器

### 特性

* 自动生成待点名单，避免在名单点完一遍前重复点到同一人

* 将待点名单用localStorage存储在浏览器中，避免出现运气“过好”的情况（若不存储待点名单，则每次打开浏览器/刷新页面均会重新生成待点名单）

### 可修改参数（resource/js/main.js）

```
var chooseDelay = 100; //特效：名字闪动时间间隔（单位：ms）
var chooseTimes = 20; //特效：名字闪动次数
var allowSave = true; //特性：是否允许将待点名单存储在浏览器中
```

### 更新日志

`V2.0.4`：**新增特性**：“将待点名单用localStorage存储在浏览器中”

`V2.0.3`：**修改协议为BSD-2-Clause**

`V2.0.2`：**新增特性**：“自动生成待点名单”

`V2.0.1`：**修复Bug**：“名单列表未居中”

### 已知问题

* 名单修改过程较为复杂

* 参数修改过程较为复杂

### 在此特别感谢以下项目：

* [jQuery](https://jquery.org/)
* [Bootstrap](http://getbootstrap.com/)
* [JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)
* [base64](https://mths.be/base64)
