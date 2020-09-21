/*
 * @name Tween.js
 * @version 1.0.0
 * @author 天国V5
 * @email fenices@qq.com
 * @date 2020-09-02 11:11
 * @description 数值过渡组件
 */

const Signal = signals.Signal;

function Tween(val, options = {}) {
    //初始化字段
    _(this, {
        //名称
        name: "",
        //当前值
        value: Object.assign({}, val),
        //获取有效字段名
        fields: FindNumFields(val),
        //帧率
        fps: Math.max(1, ~~(options.fps || 60)),
        //是否增量修改
        addition: options.addition || false,
        //播放速度
        speed: options.speed == null ? 1 : options.speed,
        //默认Easing方法
        easing: ParseEasing(options.easing),
        //自动开始 是否自动开始
        autoStart: options.autoStart == null || options.autoStart,
        //重复次数 <0:无限循环 >=0:播放指定次数，-1到正整数
        repeat: Math.max(~~(options.repeat || 0), -1),
        //是否往复运动yoyo=-1开启往复运动
        yoyo: options.yoyo != null && options.yoyo ? -1 : 1,
        //初始值
        startValue: val
    });
    _(this, {
        //是否播放中
        isPlaying: _(this).autoStart,
        //关键帧key排序列表，第一个元素为key0
        sortFrames: [0],
        //普通帧计数器, 关键帧计数
        frame: 0,
        keyFrame: 0,
        //是否开始
        isStart: false,
        //每帧更新时间，每帧当前时间，单位：毫秒
        updateTime: 1000 / _(this).fps,
        frameTime: 9999,
        //已播放帧数
        playedFrames: 0,
        //关键帧序列
        frameSets: new Map([[0, new KeyFrame(_(this).addition ? ZeroValue(_(this).fields) : val)]])
    });
}

//Tween实例属性方法
Object.defineProperties(Tween.prototype, {
    //事件
    onStart: {value: new Signal()},//刚启动时触发一次
    onPlay: {value: new Signal()},//播放时触发
    onPause: {value: new Signal()},//暂停时触发
    onStop: {value: new Signal()},//停止时触发
    onPlaying: {value: new Signal()},//播放时触发
    onRepeat: {value: new Signal()},//重复播放时触发
    onEnded: {value: new Signal()},//完成时触发一次
    onDestroy: {value: new Signal()},//销毁时触发
    //properties
    name: {value: "", writable: true},
    value: {get() {return _(this).value;}},
    fps: {get() {return _(this).fps;}},
    isPlaying: {get() {return _(this).isPlaying;}},
    frame: {get() {return _(this).frame;}},
    keyFrame: {get() {return _(this).keyFrame;}},
    startValue: {
        get() {
            return _(this).startValue;
        },
        set(v) {
            if (!_(this).addition) {
                _(this).frameSets.get(0).value = Object.assign({}, v);
            }
            _(this).startValue = v;
        }
    },
    yoyo: {
        get() {
            return _(this).yoyo < 0;
        },
        set(v) {
            _(this).yoyo = v != null && v ? -1 : 1;
        }
    },
    //重复次数 -1：无限循环
    repeat: {
        get() {
            return _(this).repeat;
        },
        set(v) {
            _(this).repeat = Math.max(~~(v || 0), -1);
        }
    }
});

Object.assign(Tween.prototype, {
    /**
     * 按帧设置关键帧
     * @param val 值
     * @param frame 帧
     * @param easing 过渡函数
     * @returns {KeyFrame}
     * @constructor
     */
    SetKey(val, frame, easing) {
        //按照fps将时刻转为对应的帧，0是起始帧，添加的帧必须大于1
        let frameNum   = Math.max(1, ~~(frame || 1));
        //如果frames没有该帧
        let sortFrames = _(this).sortFrames;
        let frameSets  = _(this).frameSets;
        let fs         = frameSets.get(frameNum);
        if (fs == null) {
            //将该帧添加到帧序列末尾，并获取上一帧在序列中的索引
            let lastKey   = sortFrames.lastIndex;
            let lastFrame = sortFrames.last;
            sortFrames.push(frameNum);
            //如果该帧小于最后一帧则重新排序帧序列，并获取排序后该帧的上一帧索引
            if (frameNum < lastFrame) {
                sortFrames.sort((a, b) => a - b);
                lastKey = sortFrames.lastIndexOf(frameNum) - 1;
            }
            //将该帧没有的属性和上一帧合并为完整的新值
            val = Object.assign({}, frameSets.get(sortFrames[lastKey]).value, val);
        } else {
            val = Object.assign(fs.value, val);
        }
        //更新帧序列
        easing       = easing == null ? _(this).easing : ParseEasing(easing);
        let keyFrame = new KeyFrame(val, frameNum, easing);
        frameSets.set(frameNum, keyFrame);
        return keyFrame;
    },
    SetKeys(keys) {
        let frames = [];
        for (let i = 0; i < keys.length; i++) {
            frames.push(this.SetKey(...keys[i]));
        }
        return frames;
    },
    /**
     * 按时间(秒)设置关键帧
     * @param val 值
     * @param time 时间
     * @param easing 过渡函数
     * @returns {*|Tween}
     * @constructor
     */
    SetTimeKey(val, time, easing) {
        let frame = Math.max(0, time) * this.fps;
        return this.SetKey(val, frame, easing);
    },
    SetTimeKeys(keys) {
        let frames = [];
        for (let i = 0; i < keys.length; i++) {
            frames.push(this.SetTimeKey(...keys[i]));
        }
        return frames;
    },
    GetKey(frame) {
        if (frame === 0) {return;}
        return _(this).frameSets.get(frame);
    },
    GetTimeKey(time) {
        let frame = Math.max(0, time) * this.fps;
        if (frame === 0) {return;}
        return this.GetKey(frame);
    },
    DeleteKey(frame) {
        if (frame === 0) {return;}
        _(this).frameSets.remove(frame);
        _(this).sortFrames.remove(frame);
    },
    Play() {
        if (this.isPlaying) {return;}
        _(this).isPlaying = true;
        this.onPlay.dispatch(this);
    },
    Pause() {
        if (!this.isPlaying) {return;}
        _(this).isPlaying = false;
        this.onPause.dispatch(this);
    },
    Stop() {
        _(this).isPlaying    = false;
        _(this).frame        = 0;
        _(this).keyFrame     = 0;
        _(this).playedFrames = 0;
        _(this).frameTime    = 0;
        this.onStop.dispatch(this);
    },
    Destroy() {
        _(this).isPlaying = false;
        _(this).value     = null;
        _(this).fields    = null;
        _(this).frameSets.clear();
        _(this).sortFrames.length = 0;
        this.onStart.dispose();
        this.onPlay.dispose();
        this.onPause.dispose();
        this.onStop.dispose();
        this.onPlaying.dispose();
        this.onRepeat.dispose();
        this.onEnded.dispose();
        this.onDestroy.dispatch();
        this.onDestroy.dispose();
    },
    Update(dt) {
        //是否允许播放
        if (!this.isPlaying || this.speed === 0) {return;}

        //累计时间超过更新时间则更新该帧
        // if (_(this).frameTime < _(this).updateTime) {
        //     _(this).frameTime += dt;
        //     return;
        // }
        // _(this).frameTime = 0;

        //触发开始时间
        if (!_(this).isStart) {
            _(this).isStart = true;
            this.onStart.dispatch(this);
        }

        let {fields, value, addition, frameSets, sortFrames, speed, repeat, yoyo, frame, keyFrame} = _(this);

        if (frame === 0 && keyFrame === 0 && speed < 0) {
            frame    = sortFrames.last;
            keyFrame = sortFrames.lastIndex;
        } else if (frame === sortFrames.last && keyFrame === sortFrames.lastIndex && speed > 0) {
            frame    = 0;
            keyFrame = 0;
        }

        let direction = Math.sign(speed);

        let fKey = sortFrames[keyFrame];
        let tKey = sortFrames[keyFrame + direction];

        let from   = frameSets.get(fKey);
        let to     = frameSets.get(tKey);
        let easing = direction > 0 ? to.easing : from.easing;
        let k      = (frame - from.frame) / (to.frame - from.frame);
        SetValue(fields, value, from.value, to.value, easing(k));

        //增量修改
        if (addition) {
            let va = _(this).startValue;
            ComputeValue(fields, value, va, value, (a, b) => a + b);
        }

        this.onPlaying.dispatch(this);

        //如果k=1则移动到下一个关键帧
        frame += speed;
        keyFrame += ~~k * direction;

        frame    = Math.clamp(frame, 0, sortFrames.last);
        keyFrame = Math.clamp(keyFrame, 0, sortFrames.lastIndex);

        if ((frame === 0 && keyFrame === 0) || (frame === sortFrames.last && keyFrame === sortFrames.lastIndex)) {
            speed *= yoyo;
        }
        if (repeat >= 0) {
            _(this).playedFrames++;
            if (_(this).playedFrames / (sortFrames.last + 1) >= (repeat + 1)) {
                this.Stop();
            }
        }
        _(this).speed    = speed;
        _(this).frame    = frame;
        _(this).keyFrame = keyFrame;
    }
});

//关键帧定义
function KeyFrame(val, frame, easing) {
    this.value  = val;
    this.frame  = frame || 0;
    this.easing = easing || Tween.Easing.Linear;
}

//zero value
function ZeroValue(fields) {
    let v = {};
    for (let i = 0; i < fields.length; i++) {
        let m = fields[i];
        v[m]  = 0;
    }
    return v;
}

function ComputeValue(fields, v, va, vb, fn) {
    for (let i = 0; i < fields.length; i++) {
        let m = fields[i];
        v[m]  = fn(va[m], vb[m]);
    }
    return va;
}

//按照插值设置每个字段值
function SetValue(fields, v, f, t, k) {
    for (let i = 0; i < fields.length; i++) {
        let m = fields[i];
        v[m]  = k == null ? t[m] : Math.lerp(f[m], t[m], k);
    }
}

//获取所有数值字段
function FindNumFields(v) {
    let fields = [];
    for (let m in v) {
        if (v[m].constructor === Number) {
            fields.push(m);
        }
    }
    return fields;
}

function ParseEasing(s) {
    if (s == null) {return Tween.Easing.Linear;}
    if (s.constructor === String) {
        return Tween.Easing[s];
    } else if (s.constructor === Function) {
        return s;
    } else {
        return Tween.Easing.Linear;
    }
}

//全局管理Tween实例
let allTweens = [];
let isPlaying = true;
let lastTime  = 0;
let anim      = null;

Object.defineProperties(Tween, {
    isPlaying: {get() {return isPlaying;}}
});

Object.assign(Tween, {
    Add(target, options) {
        if (target == null) {return;}
        Tween.PlayAll();
        let t = new Tween(target, options);
        allTweens.push(t);
        return t;
    },
    Remove(o) {
        if (target == null) {return;}
        allTweens.splice(allTweens.indexOf(o), 1);
        if (allTweens.length === 0) {
            Tween.StopAll();
        }
    },
    RemoveAll() {
        allTweens.length = 0;
        Tween.StopAll();
    },
    PlayAll() {
        isPlaying = true;
        if (anim != null) {return;}
        lastTime = performance.now();
        anim     = requestAnimationFrame(EnterFrame);
    },
    StopAll() {
        isPlaying = false;
        if (anim == null) {return;}
        anim = cancelAnimationFrame(anim);
    }
});

function EnterFrame() {
    let time = performance.now();
    for (let i = 0; i < allTweens.length; i++) {
        allTweens[i].Update(time - lastTime);
    }
    lastTime = time;
    if (isPlaying) {
        anim = requestAnimationFrame(EnterFrame);
    }
}

//过渡函数
Tween.Easing = function () {};

Object.defineProperties(Tween.Easing, {
    Linear: {
        value(k) {
            return k;
        }
    },
    //Quadratic: 二次方增长
    QuadIn: {
        value(k) {
            return k * k;
        }
    },
    QuadOut: {
        value(k) {
            return k * (2 - k);
        }
    },
    QuadInOut: {
        value(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }
            return -0.5 * (--k * (k - 2) - 1);
        }
    },
    //Cubic: 三次方增长
    CubIn: {
        value(k) {
            return k * k * k;
        }
    },
    CubOut: {
        value(k) {
            return --k * k * k + 1;
        }
    },
    CubInOut: {
        value(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k + 2);
        }
    },
    //Quartic: 四次方增长
    QuarIn: {
        value(k) {
            return k * k * k * k;
        }
    },
    QuarOut: {
        value(k) {
            return 1 - (--k * k * k * k);
        }
    },
    QuarInOut: {
        value(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }
            return -0.5 * ((k -= 2) * k * k * k - 2);
        }
    },
    //Quintic: 五次方增长
    QuinIn: {
        value(k) {
            return k * k * k * k * k;
        }
    },
    QuinOut: {
        value(k) {
            return --k * k * k * k * k + 1;
        }
    },
    QuinInOut: {
        value(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
    },
    //Sinusoidal: 正弦曲线增长
    SinIn: {
        value(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        }
    },
    SinOut: {
        value(k) {
            return Math.sin(k * Math.PI / 2);
        }
    },
    SinInOut: {
        value(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }
    },
    //Exponential: 指数级增长
    ExpIn: {
        value(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        }
    },
    ExpOut: {
        value(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        }
    },
    ExpInOut: {
        value(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        }
    },
    //Circle: 圆弧形增长
    CirIn: {
        value(k) {
            return 1 - Math.sqrt(1 - k * k);
        }
    },
    CirOut: {
        value(k) {
            return Math.sqrt(1 - (--k * k));
        }
    },
    CirInOut: {
        value(k) {
            if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
    },
    //Elastic: 从缓慢到剧烈
    ElaIn: {
        value(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        }
    },
    ElaOut: {
        value(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        }
    },
    ElaInOut: {
        value(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            k *= 2;
            if (k < 1) {
                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        }
    },
    //Back: 先后再前
    BackIn: {
        value(k) {
            let s = 1.70158;
            return k * k * ((s + 1) * k - s);
        }
    },
    BackOut: {
        value(k) {
            let s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        }
    },
    BackInOut: {
        value(k) {
            let s = 1.70158 * 1.525;
            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
    },
    //Bounce: 弹跳
    BounIn: {
        value(k) {
            return 1 - Tween.Easing.BounOut(1 - k);
        }
    },
    BounOut: {
        value(k) {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        }
    },
    BounInOut: {
        value(k) {
            if (k < 0.5) {
                return Tween.Easing.BounIn(k * 2) * 0.5;
            }
            return Tween.Easing.BounOut(k * 2 - 1) * 0.5 + 0.5;
        }
    }
});