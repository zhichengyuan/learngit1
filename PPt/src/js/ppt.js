/*
* @Author: Marte
* @Date:   2017-12-31 10:19:05
* @Last Modified by:   Marte
* @Last Modified time: 2018-02-14 20:16:04
*/

'use strict';
var ppt = {
    $wrapper : $('.wrapper'),
    $slider : $('.slider'),
    len : $('.slider').length,
    nowIndex : 0,
    lastIndex:undefined,
    flag:true,
    slider_timer:undefined,
    init: function () {
        if(this.len > 1) {
            this.createDom(this.len);
             this.bindEvent();
            this.slider_auto();
       }
    },
    createDom: function (len) {
        var strLi = '';
        var strBtn = '';
        for (var i = 0; i < len; i++) {
            if(i == 0) {
                strLi += '<li class="active"></li>';
            }else {
                strLi += '<li></li>';
            }
        }
        strLi = '<div class="slider-order"><ul>' + strLi + '</ul></div>';

        strBtn = '<div class="slider-btn">\
            <span class="left-btn"></span>\
            <span class="right-btn"></span>\
        </div>';
        this.$wrapper.append(strLi).append(strBtn);
    },
    bindEvent: function () {
        var _this = this;
        $('.left-btn').add($('.right-btn')).add($('.slider-order li')).on('click', function () {
            if($(this).attr('class') == 'left-btn') {
                _this.totalFun('left');
                console.log(888);
            }else if($(this).attr('class') == 'right-btn') {
                _this.totalFun('right');
            }else {
                var value = $(this).index();
                _this.totalFun(value);
            }
            console.log(_this.nowIndex)

        })
        this.$slider.on('go',function () {
            $(this).fadeOut(300)
                .find($('p')).animate({fontSize: '16px'}).end()
                .find($('image')).animate({
                    width: '0%'
                });
        })

        this.$slider.on('come',function() {
            $(this).delay(300).fadeIn(300)
                .find($('p')).delay().animate({
                    fontSize : '20px'
                }).end()
                .find($('.image')).delay(300).animate({
                    width: '40%'
                },function () {
                    _this.flag = true;
                })
        })

    },
    getIndex: function (direction) {
        this.lastIndex = this.nowIndex;
        if(direction == "left" || direction == "right") {
            if(direction == "left") {
                this.nowIndex = this.nowIndex == 0 ? this.len-1: this.nowIndex-1;
            }else {
                this.nowIndex = this.nowIndex == this.len-1 ? 0 :this.nowIndex+1;
            }
        }else {
            this.nowIndex = direction;
        }
    },
    changeOrder: function(index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    totalFun: function (direction) {
        if(this.flag) {
            this.getIndex(direction);
            if(this.nowIndex != this.lastIndex) {
                this.flag = false;
                this.changeOrder(this.nowIndex);
                this.$slider.eq(this.lastIndex).trigger('go');
                this.$slider.eq(this.nowIndex).trigger('come');
                clearTimeout(this.slider_timer);
                this.slider_auto();
            }
        }
    },
    slider_auto:function () {
        var _this=this;
        this.slider_timer = setTimeout(function(){
            _this.totalFun('right');

        },3000)
    }
}
ppt.init();