/*
 * @name Namespace.js
 * @author 天国V5
 * @description 这是一个用于WEB前端代码组织以及动态加载js的框架
 * 详细信息请戳这里https://github.com/fenices/Namespace
 * @email fenices@qq.com
 *
 * ---------------------------------更新日志-------------------------------------
 * 3.0.7
 * 去掉Namespace中使用的模板字符串语法以兼容IE浏览器
 *
 * 3.0.6
 * 优化内置私有变量函数_(this)，性能提高25-30%
 *
 * 3.0.5
 * 增加普通dom组件解析用于非Vue环境，自定义组件
 * 组件默认增加document实例属性用于访问模板对象跟节点
 *
 * 3.0.4
 * 修改pkg文件编码解码方法
 *
 * 3.0.3
 * 增加NS.AssetsMap(filter="", save=false)查看所有已加载的本地域内文件
 * filter为空则显示所有文件，否则只显示filter指定类型的文件，filter="js|json|vue";
 * save可选择是否保存为json文件，默认为false
 *
 * NS.ListBin方法更名为NS.ShowPackage
 *
 * NS.Compile方法更名为NS.Package
 * 并修改NS.Package(assetsMap)方法参数
 * 去掉原有的filter参数，通过config.assetsMap列表控制打包内容
 *
 * 3.0.2
 * 增加ListBin方法查看bin文件目录，Compile增加编译过滤，可以单独打包script或component文件
 * 文件路径增加@关键字，可通过@关键字跳过当前域，加载指定域内的文件
 * NS.Import("Script/main") 从本地域内加载文件
 * NS.Import("@www.abc.com/main") 从www.abc.com域内加载文件
 * @关键字可用于Import Components Load等方法
 *
 * 3.0.1
 * 增加css文件批量导入，通过config.styles进行设置，修复less @import方法重复导入文件的错误
 *
 * 3.0.0
 * 重写Namespace实现过程，将个功能进行合理划分，完善Compile编译方法，组件默认后缀名为"vue"
 * 增加批量导入非NS规范类的js文件
 *
 * --------------------------------NS.API目录------------------------------------
 * Namespace设置
 * config={
 *  scripts:["a.js", "b.js"],  //路径相对于index.html页面
 *  styles:["a.css", "b.css"], //批量导入css
 *  comType:"dom",             //自定义组件扩展名
 *  assetsMap:"assets.json", //对指定的assetsMap文件进行打包
 *  packages:["xxx.pkg"],             //加载编译文件时需要设置该字段
 *  start:"Main",              //启动类
 * }
 *
 * Import(path|[path1, path2])
 * 导入一个或多个符合NS规范的类文件，路径相对于当前文件所在路径
 * 返回值：
 * 单文件 let Class=Import("path/Class")
 * 多文件 let {ClassA, ClassB}=Import(["path/ClassA", "path/ClassB")
 *
 * Component(com|[comA, comB])
 * 导入一个或多个符合NS规范的组件文件，路径相对于当前文件所在路径，组件名自动转为kebab-case格式
 * Vue使用一般不需要获取返回值，直接调用即可
 * 返回值:
 * 单文件 let Com=Component("path/Com")
 * 多文件 let {ComA, ComB}=Component(["path/ComA", "path/ComB")
 *
 * Load(file.ext|[file1.ext, file2.ext], param)
 * 导入一个或多个资源文件，目前支持json、text、xml类型导入
 * 导入单个json文件时可以传入param对象，并在json文件内通过"$$.名称"进行访问，实现同态json模板
 *
 * Package(assetsMap)
 * 根据assetsMap设置对资源进行打包，若assetsMap为空则打包所有资源
 * 该功能依赖pako.js进行压缩和解压缩
 *
 * Inject({})
 * 注入对象到Import类或Component组件进行调用，默认内嵌"_"方法实现类实例的私有字段访问控制
 * 如：
 * function ClassA()
 * {
 *      _(this, {
 *          privateField:5
 *      });
 * }
 *
 * ViewPackage(name="")
 * 查看指定bin文件内包含的文件，name为空则显示所有bin文件内所包含的文件
 *
 */

(function (version = "3.0.7") {
    //工具
    function Utils() {}

    Object.defineProperties(Utils, {
        styles: {
            value: {
                "welcome": "color:#626262;font-size:16px;font-family:微软雅黑;font-weight:bold",
                "class": "color:white;background:#28a6d5",
                "script": "color:white;background:#20b990",
                "css": "color:white;background:#9e3670",
                "component": "color:white;background:#3cae3f",
                "resource": "color:white;background:#b770ab",
                "cache": "color:white;background:#929292",
                "error": "color:white;background:#d52828",
                "start": "font-size:12px;font-weight:bold",
                "default": "color:black"
            }
        }
    });

    Object.assign(Utils, {
        ID() {
            return "xxxxxxxx".replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0;
                let v = c === "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        ToKebabCase(name) {
            return name.replace(/[A-Z][A-Z][a-z]|[a-z][A-Z]/g, function (x) {
                return x[0] + "-" + x.slice(1);
            }).toLowerCase();
        },
        Request(src) {
            let ajax = new XMLHttpRequest();
            ajax.open("GET", src, false);
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status !== 200) {
                        Utils.Log("error", ajax.statusText);
                    }
                }
            };
            ajax.send(null);
            return ajax.responseText || "";
        },
        GetType(src) {
            let a = src.split("/");
            let b = a[a.length - 1].toLocaleString();
            let i = b.lastIndexOf(".") + 1;
            return i === 0 ? "" : b.substring(i);
        },
        GetAssetsName(path) {
            return path.replace(/^.*\//, "").replace(/\..*/, "");
        },
        AddType(path, type) {
            if (path.constructor === Array) {
                return path.map(p => p + "." + type);
            }
            let ext = Utils.GetType(path);
            return path + (ext === "" ? "." + type : "");
        },
        StringToBytes(text) {
            const code = encodeURIComponent(text || "");
            let s      = [];
            for (let i = 0; i < code.length; i++) {
                const c = code.charAt(i);
                if (c === "%") {
                    const hex    = code.charAt(i + 1) + code.charAt(i + 2);
                    const hexVal = parseInt(hex, 16);
                    s.push(hexVal);
                    i += 2;
                } else {
                    s.push(c.charCodeAt(0));
                }
            }
            return new Uint8Array(s);
        },
        BytesToString(bytes) {
            let bin = [];
            bytes.forEach(b => {bin.push(("0" + b.toString(16)).slice(-2));});
            let source = "%" + bin.join("").match(/.{2}/g).join("%");
            return decodeURIComponent(source);
        },
        Save(filename, content, type = "text/plain") {
            let a      = document.createElement("a");
            let blob   = new Blob([content], {type});
            a.download = filename;
            a.href     = URL.createObjectURL(blob);
            a.click();
            URL.revokeObjectURL(a.href);
        },
        //Debug
        Log(type, content) {
            console.log("%c " + content, Utils.styles[type] || style.default);
        }
    });

    //插件管理
    function PluginsManager() {
        this.plugins = {
            _: (() => {
                let privates = new WeakMap();
                let lastThat = null;
                let last     = null;
                return (that, m = null) => {
                    if (lastThat === that) {
                        return m == null ? last : Object.assign(last, m);
                    }

                    lastThat = that;
                    last     = privates.get(that);
                    if (last == null) {
                        last = {};
                        privates.set(that, last);
                    }
                    return m == null ? last : Object.assign(last, m);
                };
            })()
        };
    }

    Object.defineProperties(PluginsManager, {
        instance: {get() {return PluginsManager._instance || (PluginsManager._instance = new PluginsManager());}}
    });
    Object.assign(PluginsManager.prototype, {
        Inject(obj) {
            Object.assign(this.plugins, obj);
        },
        Parse() {
            let fields = Object.keys(this.plugins).join(",");
            return "const {" + fields + "} = plugins;";
        }
    });

    //资源处理器
    function AssetsProcessor() {
        this.styleTag = document.createElement("style");
        document.head.append(this.styleTag);
    }

    Object.defineProperties(AssetsProcessor, {
        instance: {get() {return AssetsProcessor._instance || (AssetsProcessor._instance = new AssetsProcessor());}}
    });
    Object.assign(AssetsProcessor.prototype, {
        Process(asset, param) {
            switch (asset.type) {
                case "js":
                    return this.CreateClass(asset, asset.content);
                case "vue":
                case "dom":
                    return this.CreateComponent(asset);
                case "json":
                    return this.CreateJSON(asset, param);
                case "xml":
                    return this.CreateXML(asset);
                default:
                    return asset.content;
            }
        },
        CreateClass(asset, script = "") {
            let code = [
                asset.srcMap,
                PluginsManager.instance.Parse(),
                "$$SetCacheObject(\"" + asset.src + "\", " + asset.name + ");",
                script,
                "return " + asset.name + ";"
            ];
            if (asset.type === "js") {
                Utils.Log("class", "脚本：" + asset.src);
            }
            return new Function("plugins", code.join("\n"))(PluginsManager.instance.plugins);
        },
        CreateComponent(asset) {
            let doc      = new DOMParser().parseFromString(asset.content, "text/html");
            let style    = doc.querySelector("style");
            let template = doc.querySelector("template");
            let script   = doc.querySelector("script").textContent;

            this.CompileCSS(template, style);

            let classObj = this.CreateClass(asset, script);
            Object.defineProperties(classObj.prototype, {
                document: {
                    get() {
                        if (this._dom_ == null) {
                            this._dom_ = template.content.children[0].cloneNode(true);
                        }
                        return this._dom_;
                    }
                }
            });

            let com = this.CreateVueComponent(classObj, template);
            Utils.Log("component", "组件：" + asset.src + " [" + window.vue ? com.extendOptions.name : com.name + "]");
            return com;
        },
        CreateVueComponent(VueClass, template) {
            if (window.Vue == null) {
                return VueClass;
            }
            let com      = new VueClass();
            com.name     = com.name || Utils.ToKebabCase(VueClass.name);
            com.template = template;
            return window.Vue.component(com.name, com);
        },
        AddTagId(node, id) {
            if (node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    if (node.children[i].constructor === HTMLTemplateElement) {
                        this.AddTagId(node.children[i].content, id);
                    }
                    node.children[i].setAttribute(id, "");
                    this.AddTagId(node.children[i], id);
                }
            } else {
                node.setAttribute(id, "");
            }
        },
        CompileCSS(template, style) {
            let id   = "c" + Utils.ID();
            let css  = style ? style.textContent : "";
            let lang = style.lang;

            this.AddTagId(template.content, id);

            if (lang === "less") {
                if (window.less == null) {return Utils.Log("error", "less对象为空");}
                less.render(css, (e, o) => {
                    if (e) {
                        Utils.Log("error", e);
                        return;
                    }
                    // this.styleTag.innerText += CssAST.AddId(o.css, id);
                    this.styleTag.innerText += this.AddSelectorId(o.css, "[" + id + "]");
                });
            } else {
                // this.styleTag.innerText += CssAST.AddId(css, id);
                this.styleTag.innerText += this.AddSelectorId(css, "[" + id + "]");
            }
        },
        AddSelectorId(css, att) {
            let jump = false;//跳过@keyframes
            //1. 按"}"分离每一组选择器和属性
            let ary = css.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").split("}");
            for (let i = 0; i < ary.length; i++) {
                //2. 将ary1中的元素按"{"分组：分离属性和选择器，并替换原对象
                let ary1              = ary[i].split("{");
                ary[i]                = ary1;
                //3. 将0元素选择器部分按";"分组：分离@语句和选择器
                let ary2              = ary1[0].split(";");
                ary1[0]               = ary2;
                //4. 为多个选择器增加属性
                ary2[ary2.length - 1] = ary2[ary2.length - 1].split(",").map(c => {
                    let word = c.trim();
                    if (c !== "" && !jump) {
                        jump = (/@keyframes/gm).test(c);
                        if (!jump) {
                            let index = word.indexOf(":");
                            if (index < 0) {
                                return word ? word + att : "";
                            } else {
                                return word.slice(0, index) + att + word.slice(index);
                            }
                        }
                    }
                    jump = word === "" ? false : jump;
                    return c;
                }).join(",");
                //5. 按";"合并@语句和选择器
                ary1[0]               = ary2.join(";");
                //6. 按"{"合并语句、选择器和属性
                ary[i]                = ary1.join("{");
            }
            //7. 按"}"合并多个属性分组
            return ary.join("}").replace(/\n/g, "").replace(/\s+/gm, " ");
        },
        CreateJSON(asset, injection) {
            Utils.Log("resource", "资源：" + asset.src);
            return new Function("$$", "return " + asset.content + ";")(injection);
        },
        CreateXML(asset) {
            return new DOMParser().parseFromString(asset.content, "text/xml");
        }
    });

    //资源管理
    function AssetsManager() {
        this.host          = location.host; // 根目路径
        this.config        = null; //设置
        this.domain        = location.pathname.replace(/[^/]*$/g, "");
        this.pathList      = [location.pathname]; //路径记录
        this.packagesFiles = new Map(); //编译文件
        this.cachedAssets  = new Map(); //缓存文件
        this.cachedObjects = new Map(); //缓存对象
        this.tag           = document.currentScript;
        PluginsManager.instance.Inject({
            $$SetCacheObject(src, obj) {AssetsManager.instance.SetCacheObject(src, obj);}
        });
    }

    Object.defineProperties(AssetsManager, {
        instance: {get() {return AssetsManager._instance || (AssetsManager._instance = new AssetsManager());}}
    });
    Object.defineProperties(AssetsManager.prototype, {
        assetsMap: {get() {return this.config.assetsMap || "";}},
        packages: {get() {return this.config.packages;}},
        scripts: {get() {return this.config.scripts || [];}},
        styles: {get() {return this.config.styles || [];}},
        start: {get() {return this.config.start || null;}},
        parent: {get() {return this.pathList[this.pathList.length - 1].replace(/[^\/]+$/, "");}},
        comType: {get() {return this.config.comType || "vue";}}
    });

    Object.assign(AssetsManager.prototype, {
        LoadConfig() {
            this.config = new Function(this.tag.text + ";\nreturn config;")() || {};
        },
        LoadPackages(Loaded) {
            if (this.packages == null || this.packages.length === 0) {
                return Loaded();
            }
            if (window.pako == null) {
                Utils.Log("error", "pako对象为空");
                return Loaded();
            }
            let count = 0;
            this.packages.forEach(p => {
                let a      = p.indexOf("@");
                let path   = a > 0 ? p.substring(0, a) : p;
                let domain = a > 0 ? p.substring(a + 1) + "/" : this.domain;
                let ajax   = new XMLHttpRequest();
                ajax.addEventListener("readystatechange", () => {
                    if (ajax.readyState === 4) {
                        if (ajax.status === 200) {
                            let pkg     = pako.inflate(ajax.response);
                            let scripts = Utils.BytesToString(pkg).split("#=>");
                            scripts.forEach(s => {
                                if (s === "") {return;}
                                let index = s.indexOf("\n");
                                let k     = s.substring(0, index++);
                                let v     = s.substring(index);
                                this.packagesFiles.set(domain + k, v);
                            });
                        }
                        count++;
                        if (count === this.packages.length) {
                            Loaded();
                        }
                    }
                });
                ajax.open("GET", this.ParsePath(path));
                ajax.responseType = 'arraybuffer';
                ajax.send();
            });
        },
        SetCacheObject(src, obj) {
            this.cachedObjects.set(src, obj);
        },
        ParsePath(path) {
            let src   = (/@/g).test(path) ? path.substring(1) : this.parent + path;
            let filed = src.split("/");
            for (let i = 0; i < filed.length; i++) {
                if (filed[i] === "..") {
                    filed.splice(i - 1, 2);
                    i -= 2;
                }
            }
            return filed.join("/");
        },
        Load(path, param = null, cache = true) {
            if (path == null) {
                return Utils.Log("error", "路径为空");
            }
            if (path.constructor === Array) {
                let objs = {};
                path.forEach(p => {
                    objs[Utils.GetAssetsName(p)] = this.Load(p, param, cache);
                });
                return objs;
            }
            let src = this.ParsePath(path);
            let obj = this.cachedObjects.get(src);
            if (obj == null) {
                let asset  = this.DownloadAsset(src, cache);
                asset.type = Utils.GetType(path);
                this.pathList.push(src);
                obj = AssetsProcessor.instance.Process(asset, param);
                this.cachedObjects.set(src, obj);
                this.pathList.pop();
            }
            return obj;
        },
        RequireJS(Loaded) {
            if (this.scripts.length === 0) {return Loaded();}
            let index   = 0;
            let scripts = this.scripts;
            !function Loop() {
                let script = document.createElement("script");
                script.src = scripts[index];
                AssetsManager.instance.tag.parentNode.insertBefore(script, AssetsManager.instance.tag);
                script.onload = () => {
                    Utils.Log("script", "引用：" + scripts[index]);
                    index++;
                    AssetsManager.instance.tag.parentNode.removeChild(script);
                    if (index < scripts.length) {
                        Loop(index);
                    } else {
                        Loaded();
                    }
                };
            }(index);
        },
        RequireCSS(Loaded) {
            if (this.styles.length === 0) {return Loaded();}
            let index  = -1;
            let styles = this.styles;

            !function Loop() {
                index++;
                if (index >= styles.length) {return Loaded();}
                let link  = document.createElement("link");
                link.rel  = "stylesheet";
                link.href = styles[index];
                AssetsManager.instance.tag.parentNode.insertBefore(link, AssetsManager.instance.tag);
                link.onload = () => {
                    Utils.Log("css", "引用：" + styles[index]);
                    Loop(index);
                };
            }(index);
        },
        DownloadAsset(src, cache) {
            if (this.cachedAssets.has(src)) {
                Utils.Log("script", "重用：" + src);
                return this.cachedAssets.get(src);
            }
            let asset = {
                name: Utils.GetAssetsName(src),
                src: src,
                srcMap: "//# sourceURL=http://" + this.host + src,
                content: this.packagesFiles.get(src) || Utils.Request(src)
            };
            if (cache) {this.cachedAssets.set(src, asset);}
            return asset;
        },
        AssetsMap(filter = "", save = false) {
            let types     = filter.toLowerCase().split("|");
            let rex2      = new RegExp("^" + this.domain);
            let assetsMap = Array.from(this.cachedAssets.keys()).filter(src => {
                return (filter === "" || types.includes(Utils.GetType(src))) && rex2.test(src);
            });
            if (save) {
                Utils.Save("AssetsMap.json", JSON.stringify(assetsMap));
            }
            return assetsMap;
        },
        Package(map) {
            if (window.pako == null) {return Utils.Log("error", "pako对象为空，无法完成编译");}
            let rex2   = new RegExp("^" + this.domain);
            map        = map == null && this.assetsMap.length > 0 ? this.Load(this.assetsMap, null, false) : map;
            map        = map == null ? this.AssetsMap() : map.filter(src => rex2.test(src));
            let index  = this.domain.length;
            let source = "";
            map.forEach(src => {
                let asset = this.cachedAssets.get(src);
                console.log(src);
                if (asset == null) {return;}
                source += "#=>" + src.substring(index) + "\n" + asset.content + "\n";
            });
            let pkg = Utils.StringToBytes(source);
            let zip = pako.deflate(pkg);
            Utils.Save("Merged.pkg", zip, "application/octet-stream");
        },
        ShowPackage() {
            return Array.from(this.packagesFiles.keys());
        },
        Start() {
            if (this.start == null) {
                return Utils.Log("error", "config.start错误");
            }
            let Main = this.Load(this.start + ".js");
            console.timeEnd("加载完成");
            console.groupEnd();
            new Main();
        },
        Init() {
            console.group("加载脚本");
            console.time("加载完成");
            this.LoadConfig();
            this.RequireCSS(() => {
                this.RequireJS(() => {
                    this.LoadPackages(() => {
                        this.Start();
                    });
                });
            });
        }
    });

    //导出类
    function Namespace(ver) {
        if (!!window.NS) {
            return Utils.Log("error", "NS对象已定义");
        }
        window.NS   = this;
        window.less = {
            isFileProtocol: true,
            fileAsync: false
        };
        Utils.Log("welcome", "欢迎使用由天国V5发布的Namespace工具，版本：" + ver);
        AssetsManager.instance.Init();
    }

    Object.assign(Namespace.prototype, {
        Import(path) {
            return AssetsManager.instance.Load(Utils.AddType(path, "js"));
        },
        Component(path) {
            let comType = AssetsManager.instance.comType;
            return AssetsManager.instance.Load(Utils.AddType(path, comType));
        },
        Load(path, param = null) {
            return AssetsManager.instance.Load(path, param);
        },
        Package(assetsMap) {
            return AssetsManager.instance.Package(assetsMap);
        },
        Inject(obj) {
            PluginsManager.instance.Inject(obj);
        },
        ShowPackage() {
            return AssetsManager.instance.ShowPackage();
        },
        AssetsMap(filter, save) {
            return AssetsManager.instance.AssetsMap(filter, save);
        }
    });
    new Namespace(version);
})();