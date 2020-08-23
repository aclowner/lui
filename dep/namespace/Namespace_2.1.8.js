/**
 * @name Namespace.js
 * @author 天国V5
 * @description 这是一个用于WEB前端代码组织以及动态加载js的框架
 * 详细信息请戳这里https://github.com/fenices/Namespace
 * @email fenices@qq.com
 *
 * 2.0.2
 * 简化相对目录保存实现过程
 * 增加Load("Components/Button")方法
 *
 * 2.0.3
 * 新增Component("Components/Button")方法引用vue组件
 * 原Load("xxx/xxx.json")方法用于文件加载
 *
 * 2.0.4
 * 增加组件局部CSS功能
 *
 * 2.0.5
 * 修改组件文件后缀com为dom
 *
 * 2.0.6
 * 增加dom组件注释标签<comment>注释</comment>
 * 通过并将comment属性增加到组件静态属性通过Component.comment获取注释
 *
 * 2.0.8
 * 增加$Overload方法
 * 该方法可以实现对象的方法重载
 * 嵌入对象/方法前缀改为$Method进行访问
 *
 * 2.0.9
 * 增加Import, Component批量导入
 * 增加less库支持, <style lang="less">less code</style>
 *
 * 2.1.0
 * 修改dom组件解析，不再dom文件中添加this.template = $template写法，在组件加载阶段会自动添加
 * Vue.Component("name", new Dom());也在加载阶段自动添加，组件名默认转为UIMenuBar:ui-menu-bar格式
 * dom文件中只需要定义构造函数即可
 * Load方法增加第二个参数可以传递context上下文对象
 * context对象可在json内通过$variable名称进行访问
 *
 * 2.1.1
 * 增加Import和Component加载错误源信息
 *
 * 2.1.2
 * 精简NS对象创建过程，将NS改为密封对象
 *
 * 2.1.3
 * 集成CssAST.js解析树，通过[attrubite]选择器和标签属性，实现CSS模块化
 * 修复组件内嵌套template标签内的dom元素没有加上[attrubite]的问题
 *
 * 2.1.4
 * 实现CSS选择器增加属性内部实现，不再依赖CssAST.js解析树
 * 修改CSS注释导致selector处理错误造成class丢失的问题
 *
 * 2.1.5
 * 为默认插件增加_(this)方法，通过NS.WeakMap统一管理实例私有成员
 * _(this).member 访问私有成员
 *
 * 2.1.6
 * 增加$ID方法返回8位简化id
 *
 * 2.1.7
 * 增加NS.Compile，可以通过浏览器将Import、Component、Load方法加载的资源进行合并，
 * 并通过Compile方法将合并后的文件下载到本地保存，再通过缓存进行加载 ，
 * 增加NS.Convert.StringToBytes和NS.Convert.BytesToString方法
 *
 * 2.1.8
 * 修复css选择器增加组件时@keyframes错误
 */

(function () {
    const mVersion   = "2.1.8";
    const mLogStyles = {
        h1: `color:${"#626262"};font-size:16px;font-family:微软雅黑;font-weight:bold`,
        component: `color:white;background:${"#3cae3f"}`,
        script: `color:white;background:${"#28a6d5"}`,
        cache: `color:white;background:${"#929292"}`,
        err: `color:white;background:${"#d52828"}`,
        warn: `color:white;background:${"#FFD982"}`,
        start: `font-size:12px;font-weight:bold`
    };

    if (!!window.NS) {return console.error("%NS对象已定义", mLogStyles.err);}
    console.log(`%c欢迎使用由天国V5发布的Namespace工具，版本号${mVersion}`, mLogStyles.h1);

    let mClassName     = "";
    let mCachedObjects = new Map();
    let mCachedFiles   = new Map();
    let mHost          = window.location.host;
    let mRootFiles     = [window.location.pathname];
    let privates       = new WeakMap();
    let options        = {};

    //默认嵌入对象
    let defaultPlugins = {
        $CacheObject: CacheObject,
        $Overload: Overload,
        $ID: ComponentId,
        _(that, m = null) {
            let o = privates.get(that) || privates.set(that, {}).get(that);
            return m ? Object.assign(o, m) : o;
        }
    };

    window.NS = {
        /**
         * 用于导入其他类
         * @param file
         * @returns {any|void}
         */
        Import(file) {
            if (Object.is(file, undefined)) {
                return console.error("文件未定义", mLogStyles.err);
            }
            if (Object.is(file.constructor, Array)) {
                let objs = {};
                for (let f of file) {
                    mClassName       = f.replace(/.*\//, "");
                    objs[mClassName] = NS.Import(f);
                }
                return objs;
            }
            mClassName = file.replace(/.*\//, "");
            let src    = TrimPath(file, "js");
            if (mCachedObjects.has(src)) {
                return mCachedObjects.get(src);
            } else {
                mRootFiles.unshift(src);
                DownLoadScript(src);
            }
            return mCachedObjects.get(mRootFiles.shift());
        },
        /**
         * 用于导入其他类
         * @param dom
         * @param type
         * @returns {any|void}
         */
        Component(dom, type = "vue") {
            if (Object.is(dom, undefined)) {
                return console.error("组件未定义", mLogStyles.err);
            }
            if (Object.is(dom.constructor, Array)) {
                let objs = {};
                for (let d of dom) {
                    mClassName       = d.replace(/.*\//, "");
                    objs[mClassName] = NS.Component(d);
                }
                return objs;
            }
            mClassName = dom.replace(/.*\//, "");
            let src    = TrimPath(dom, type);
            if (mCachedObjects.has(src)) {
                return mCachedObjects.get(src);
            } else {
                mRootFiles.unshift(src);
                DownloadComponent(src);
            }
            return mCachedObjects.get(mRootFiles.shift());
        },
        /**
         * 加载资源
         * @param file
         * @param inject
         * @returns {string|Document}
         */
        Load(file, inject = undefined) {
            let type    = mClassName = file.replace(/.*\./, "").toLowerCase();
            let src     = TrimPath(file);
            let content = "";
            Request(src,
                responseText => {
                    content = responseText;
                },
                err => {
                    console.error(`%c 下载：${err}`, mLogStyles.err, src);
                }
            );
            switch (type) {
                case "xml":
                    return new DOMParser().parseFromString(content, "text/xml");
                case "json":
                    let cmd = "";
                    if (!Object.is(inject, undefined)) {
                        cmd = "const {";
                        Object.keys(inject).forEach(k => {
                            cmd += k + ":$" + k + ",";
                        });
                        cmd = cmd.slice(0, -1) + `} = inject;`;
                    }
                    return new Function("inject", `${cmd} return eval(${content});`)(inject);
                default:
                    return content;
            }
        },
        /**
         * 编译
         * @param filename
         * @param filters
         * @return {void}
         */
        Compile(filename = "Source_merged.bin", filters = []) {
            let source = "[";
            if (filters.length > 0) {
                for (let [k, v] of mCachedFiles) {
                    filters.forEach(type => {
                        if (v.type === type.toLowerCase()) {
                            source += `["${k}", \`${ConvertCacheFile(v.source)}\`],`;
                        }
                    });
                }
            } else {
                for (let [k, v] of mCachedFiles) {
                    source += `["${k}", \`${ConvertCacheFile(v.source)}\`],`;
                }
            }
            source += "]";
            let bin = NS.Convert.StringToBytes(source);
            let zip;
            if (pako) {
                zip = pako.deflate(bin);
            } else {
                console.error("%c 未发现pako对象", mLogStyles.err);
                return;
            }

            let a      = document.createElement("a");
            let blob   = new Blob([zip], {type: "application/octet-stream"});
            a.download = filename;
            a.href     = URL.createObjectURL(blob);
            a.click();
            URL.revokeObjectURL(blob);
        },
        Convert: {
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
                        // s.push(c.charCodeAt(0).toString(16));
                        s.push(c.charCodeAt(0));
                    }
                }
                // return s.join("");
                return new Uint8Array(s);
            },
            BytesToString(bytes) {
                let bin = [];
                bytes.forEach(b => {bin.push(("0" + b.toString(16)).slice(-2));});
                let source = "%" + bin.join("").match(/.{2}/g).join("%");
                return decodeURIComponent(source);
            }
        }
    };

    /**
     * 实现对象方法重载
     * @param target 目标对象
     * @param fn 方法
     */
    function Overload(target, fn) {
        let old         = target[fn.name]; //把前一次添加的方法存在一个临时变量old里面
        target[fn.name] = function () { // 重写了object[name]的方法
            //如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
                // 否则，判断old是否是函数，如果是，就调用old
            } else if (typeof old === "function") {
                return old.apply(this, arguments);
            }
        };
    }

    /**
     * 缓存已导入的类
     * @constructor
     * @param fn
     */
    let OnCached;

    function CacheObject(fn) {
        let src = mRootFiles[0];
        if (fn !== null) {
            //成功
            mCachedObjects.set(src, fn);
            if (Object.is(OnCached, undefined) || !Object.is(OnCached.constructor, Function)) {return;}
            OnCached(src, fn);
            OnCached = undefined;
        } else {
            //失败
            console.warn(`%c 导入：${src} `, mLogStyles.warn);
        }
    }

    //todo:缓存文件， 加密
    function CacheFiles(src, content, type) {
        if (mCachedFiles.has(src)) {return;}
        mCachedFiles.set(src, {type: type, source: content});
    }

    /**
     * @param mergedFile
     * @return {void}
     */
    function RestoreCachedFiles(srcPath, Next) {
        if (srcPath == null || srcPath.length === 0) {
            Next();
            return;
        }
        let src                 = TrimPath(srcPath);
        let ajax                = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    let bin      = pako.inflate(ajax.response);
                    let source   = NS.Convert.BytesToString(bin);
                    mCachedFiles = new Function(`return new Map(${source})`).call(this);
                }
                Next();
            }
        };
        ajax.open("GET", src);
        ajax.responseType = 'arraybuffer';
        ajax.send();
    }

    /**
     *
     * @param text
     * @param recover
     * @returns {string}
     */
    function ConvertCacheFile(text, recover = false) {
        let output;
        if (recover) {
            //回复
            output = text.replace(/\\`/g, "`").replace(/\\\$/g, "$");
        } else {
            //转义
            output = text.replace(/`/g, "\\`").replace(/\$/g, "\\$");
            output = output.replace(/\/\/# sourceURL.*\n/g, "");
        }
        return output;
    }

    /**
     * @param rootFile
     * @param subFile
     * @param type
     * @returns {string}
     * @constructor
     */
    function TrimPath(subFile, type = "") {
        type      = type === "" ? "" : "." + type;
        let src   = mRootFiles[0].replace(/[^\/]+$/, "") + subFile + type;
        let filed = src.split("/");
        for (let i = 0; i < filed.length; i++) {
            if (filed[i] === "..") {
                filed.splice(i - 1, 2);
                i -= 2;
            }
        }
        return filed.join("/");
    }

    /**
     * 下载组件文件
     * @param src
     * @constructor
     * @return {void}
     */
    function DownloadComponent(src) {
        Request(src,
            responseText => {
                CacheFiles(src, responseText, "component");
                let doc      = new DOMParser().parseFromString(responseText, "text/html");
                let temp     = doc.querySelector("template");
                let styleTag = doc.querySelector("style");

                OnCached = function (src, fn) {
                    let id  = `c${ComponentId()}`;
                    let Vue = window.Vue;
                    if (!Object.is(Vue, undefined)) {
                        let c  = new fn();
                        c.name = c.name || fn.name.replace(/[A-Z][A-Z][a-z]|[a-z][A-Z]/g, function (x) {
                            return x[0] + "-" + x.slice(1);
                        }).toLowerCase();

                        AddScope(temp.content, id);
                        c.template = temp;
                        mCachedObjects.set(src, Vue.component(c.name, c));
                        console.log(`%c 组件：${src} [${c.name}]`, mLogStyles.component);
                    }

                    let styleCode = styleTag ? styleTag.textContent : "";
                    if (Object.is(styleTag.lang, "less")) {
                        if (Object.is(less, undefined)) {return console.log("未找到less框架", mLogStyles.err);}
                        less.render(styleCode, (e, o) => {
                            // AppendStyle(o.css);
                            // AppendStyle(CssAST.AddId(o.css, id));
                            AppendStyle(AddSelectorPrefix(o.css, `[${id}]`));
                        });
                    } else {
                        // AppendStyle(styleCode);
                        // AppendStyle(CssAST.AddId(styleCode, id));
                        AppendStyle(AddSelectorPrefix(styleCode, `[${id}]`));
                    }
                };

                let script = doc.querySelector("script").textContent;
                ExecuteScript({
                    src: src,
                    code: script
                });
            },
            err => {
                console.error(`%c 下载失败：${err}\n 目标：${src}\n 来源：${mRootFiles[1]}\n`, mLogStyles.err, src);
            });
    }

    /**
     * 为CSS选择器增加唯一标识
     * @param css
     * @param att
     * @returns {string}
     * @constructor
     */
    function AddSelectorPrefix(css, att) {
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
            // ary2[ary2.length - 1] = ary2[ary2.length - 1].replace(/,/gm, `${att},`).trim();
            // ary2[ary2.length - 1] += ary2[ary2.length - 1] ? att : "";
            //5. 按";"合并@语句和选择器
            ary1[0] = ary2.join(";");
            //6. 按"{"合并语句、选择器和属性
            ary[i]  = ary1.join("{");
        }
        //7. 按"}"合并多个属性分组
        return ary.join("}").replace(/\n/g, "").replace(/\s+/gm, " ");
    }

    /**
     * 为组件元素增加唯一标识属性和CSS选择器标识对应
     * @param n
     * @param s
     * @return void
     */
    function AddScope(n, s) {
        if (n.children.length > 0) {
            for (let i = 0; i < n.children.length; i++) {
                if (n.children[i].constructor === HTMLTemplateElement) {
                    AddScope(n.children[i].content, s);
                }
                n.children[i].setAttribute(s, "");
                AddScope(n.children[i], s);
            }
        } else {
            n.setAttribute(s, "");
        }
    }

    let rStyle = document.createElement("style");
    document.head.append(rStyle);

    function AppendStyle(pStyleStr) {
        rStyle.innerText += pStyleStr;
    }

    /**
     * 执行脚本
     * @param options
     * @constructor
     * @return {void}
     */
    function ExecuteScript(options) {
        let mPlugins = MergePlugins(options.plugins);
        let srcURL   = `//# sourceURL=http://${mHost}${options.src}`;
        let cmd      = `
        ${mPlugins.text}
        $CacheObject(${mClassName});
        ${options.code}`;
        new Function("plugins", cmd).call(this, mPlugins.command);
    }

    /**
     * 合并插件对象
     * @param plugins
     * @returns {{text: *, command: *}}
     * @constructor
     */
    function MergePlugins(plugins) {
        let mergePlugins = Object.assign(defaultPlugins, plugins);
        let pluginsCMD   = "const {";
        Object.keys(mergePlugins).forEach(k => {
            pluginsCMD += `${k},`;
        });
        pluginsCMD = pluginsCMD.slice(0, -1) + "} = plugins;";
        return {text: pluginsCMD, command: mergePlugins};
    }

    /**
     * 下载script代码
     * @param src
     * @method
     */
    function DownLoadScript(src) {
        Request(src,
            responseText => {
                CacheFiles(src, responseText, "script");
                OnCached = function (src, fn) {
                    console.log(`%c 脚本：${src} [${fn.name}]`, mLogStyles.script);
                };
                ExecuteScript({src: src, code: responseText});
            },
            err => {
                console.error(`%c 下载失败：${err}\n 目标：${src}\n 来源：${mRootFiles[1]}\n`, mLogStyles.err, src);
            });
    }

    /**
     * 发送请求
     * @param src
     * @param suc
     * @param err
     * @constructor
     * @return {void}
     */
    function Request(src, suc, err) {
        if (mCachedFiles.has(src)) {
            suc(ConvertCacheFile(mCachedFiles.get(src), true));
            console.log("%c 缓存：" + src, mLogStyles.cache);
            return;
        }

        let ajax = new XMLHttpRequest();
        ajax.open("GET", src, false);

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    try {suc(ajax.responseText);} catch (e) {err(e);}
                } else {
                    err(ajax.statusText);
                }
            }
        };
        ajax.send(null);
    }

    /**
     * 创建组件ID
     * @returns {string}
     * @constructor
     */
    function ComponentId() {
        //GUID
        // return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        //     let r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        //     return v.toString(16);
        // });

        //Simple id
        return "xxxxxxxx".replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0;
            let v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    Object.seal(NS);
    window.Namespace = NS;

    /**
     *
     * @returns {Object}
     */
    function GetOptions() {
        let mScriptTags = document.querySelectorAll("script[start]");
        for (let i = 0; i < mScriptTags.length; i++) {
            //获取代码根目录路径
            let script = mScriptTags[i];
            if (script.src.search(/Namespace_/) < 0) {continue;}
            options.start = script.getAttribute("start");
            if (options.start.length === 0) {
                console.warn(`%c start参数错误 `, mLogStyles.err);
                console.dirxml(script);
                return;
            }
            let sourceField = script.getAttribute("source");
            RestoreCachedFiles(sourceField, () => {
                Start();
            });
        }
    }

    function Start() {
        let mStart = options.start;
        console.group("加载脚本");
        console.time("加载时间");

        let Start = NS.Import(mStart);
        console.timeEnd("加载时间");
        console.groupEnd();
        console.log(`%c开始运行 ${TrimPath(mStart, "js")}`, mLogStyles.start);
        new Start();
    }

    GetOptions();
})();