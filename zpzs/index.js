/*
* @Author: Marte
* @Date:   2018-02-05 20:21:04
* @Last Modified by:   Marte
* @Last Modified time: 2018-02-05 21:32:22
*/

'use strict';
function Index() {
    this.dom = {
        img: $('img'),
        btn: $('.btn')
    }
    //控制点击，防止重复点击在事件没有执行完再次触发
    this.flag = true;
    this.bindEvent();
}
Index.prototype.bindEvent = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    self.dom.btn.on('click', function () {
        if (!self.flag) {
            return;
        }
        var endNum = 0;//运动完成的图片数量
        self.flag = false;
        for (var i = 0; i < len; i++) {
            (function (i) {// 解决闭包
                //延迟随机时间
                setTimeout(function () {
                    self.monition(img[i], '1s', function () {
                        //第一次变化
                        $(this).css({
                            'transform': 'scale(0)'
                        })
                    }, function () {
                        //第二次变化
                        self.monition(this, '1s', function () {
                            $(this).css({
                                'transform': 'scale(1)',
                                'opacity': 0
                            })
                        }, function () {
                            endNum++;//变化完成数量
                            if (endNum == len) {
                                self.show();
                            }
                        })
                    })
                }, Math.random() * 1000);
            })(i)
        }
    })
};
//展示最后一次运动效果
Index.prototype.show = function () {
    var self = this;
    var img = self.dom.img;
    var len = img.length;
    var allEnd = 0;
    for (var i = 0; i < len; i++) {
        $(img[i]).css({
            'transition': '',
            'transform': 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)'
        });
        (function (i) {
            setTimeout(function () {
                self.monition(img[i], '2s', function () {
                    $(this).css({
                        'opacity': 1,
                        'transform': 'rotateY(-360deg) translateZ(0)',
                    })
                }, function () {
                    allEnd++;
                    if (allEnd == img.length) {
                        self.flag = true;
                    }
                })
            }, Math.random() * 1000);
        })(i)
    }
}
//封装一个运动函数
Index.prototype.monition = function (dom, time, doFun, callBack) {
    var self = this;
    $(dom).css({
        'transition': time
    })
    doFun.call(dom);
    var called = false;
    $(dom).on('transitionend', function () {
        if (!called) {
            callBack && callBack.call(dom);
            called = true;
        }
    })
}
new Index();