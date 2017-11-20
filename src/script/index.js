function Exhibition() {};
Exhibition.prototype = {
    load:function() {
        var self = this;
        this.isSkip = false;
        this.timers = [];
        self.conf();
        // 播放音乐
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'src/audio/bgmusic.mp3');

        audioElement.addEventListener('ended', function () {
            this.play();
        }, false);

        $('.music').click(function () {
            var temp = $(this).attr("data-status");
            if (temp == "true") {
                $(this).attr("data-status", false);
                $(".music").removeClass("musicPlay");
                audioElement.pause();
            } else {
                $(this).attr("data-status", true);
                $(".music").addClass("musicPlay");
                audioElement.play();
            }

        });

        // 自动播放
        (function autoPlayAudio1() {
            wx.config({
                debug: false,
                appId: '',
                timestamp: 1,
                nonceStr: '',
                signature: '',
                jsApiList: []
            });
            wx.ready(function () {
                audioElement.play();
                $('.music').addClass("musicPlay");
            });
        })();
        // 分享
        var urlData = {
            url:window.location.href.split("#")[0]
        }
        $.ajax({
            url:"/api/getsign",
            type:"post",
            data:JSON.stringify(urlData),
            contentType: 'application/json; charset=utf-8',
            dataType:"json",
            success:function(resp){
                self.weixin = resp.sign;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx61d314684b578ded', // 必填，公众号的唯一标识
                    timestamp: self.weixin.timestamp, // 必填，生成签名的时间戳
                    nonceStr: self.weixin.nonceStr, // 必填，生成签名的随机串
                    signature: self.weixin.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function(){
                    var title = "蜷川实花展 2017上海站";
                    var imgStr = "http://"+window.location.host + "/src/image/loading/share1.jpg";
                    console.log(imgStr);
                    wx.onMenuShareTimeline({
                        title: title, 
                        link: window.location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgStr, // 分享图标
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: title, 
                        desc: "魔都最美展",
                        link: window.location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgStr, // 分享图标
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    
                });
                wx.error(function(res){
                    
                });
            },
            error:function(){
            }
        })
    },
    conf:function(){
        var self = this;
        $('.wp-inner').fullpage({
            page: '.page',
            start: 0,
            duration: 500,
            drag: false,
            loop: false,
            dir: 'v',
            init : {
                page1: true,
                page2: false,
                page3: false,
                page4: false,
                page5: false,
                page6: true
            },
            change: function (e) {
                if(e.cur == 0){
                    var that = this;
                    this.init.page1 = false;
                    $("#page1Time").html("");
                    document.getElementById("loading").style.display = "none"; 
                    setTimeout(function () {
                        $("#ownerFirstName").show().addClass("fadeInLeft animated");
                        $("#ownerLastName").show().addClass("fadeInRight animated");
                        $("#ownerExhibition").show().addClass("fadeInLeft animated");
                    }, 1000);
                    setTimeout(function () {
                        $("#quan").show().addClass("fadeInDown animated");
                    }, 1500);
                    setTimeout(function () {
                        $("#chuan").show().addClass("fadeInDown animated");
                    }, 2000);
                    setTimeout(function () {
                        $("#shi").show().addClass("fadeInDown animated");
                    }, 2500);
                    setTimeout(function () {
                        $("#hua").show().addClass("fadeInDown animated");
                    }, 3000);
                    setTimeout(function () {
                        $("#zhan").show().addClass("fadeInDown animated");

                    }, 3500);
                    setTimeout(function () {
                        var data = [
                            {
                                selector: $("#page1Time"),
                                para: ["2017/11/11-2018/1/10", "上海法拉耶艺术设计中心"]
                            },
                        ];
                        self.typewriter(data, function () {
                            $("#gotopage1").removeClass("hidden").click(function (event) {
                                $.fn.fullpage.moveTo(1,true);
                                // event.stopPropagation();
                            });

                            that.init.page2 = true;
                            
                        },166);
                    }, 4000);
                }else if(e.cur == 1){
                    var that = this;
                    this.init.page2 = false;
                    setTimeout(function () {
                        $(".img2007").show().addClass("fadeInLeft animated");
                    }, 500);
                    setTimeout(function () {
                        $(".img2012").show().addClass("fadeInLeft animated");
                    }, 1000);
                    setTimeout(function () {
                        $(".img2014").show().addClass("fadeInLeft animated");
                    }, 1500);
                    setTimeout(function () {
                        $(".img2016").show().addClass("fadeInLeft animated");
                        $("#gotopage2").show().click(function () {
                            $.fn.fullpage.moveTo(2,true);
                        });
                        that.init.page3 = true;
                    }, 2000);

                }else if(e.cur == 2){
                    var that = this;
                    that.init.page4 = false;
                    that.init.page3 = false;
                    $("#yes").unbind().click(function(){
                        self.isSkip = false;
                        that.init.page4 = true;
                        $.fn.fullpage.moveTo(3, true);
                    });
                    $("#skip").unbind().click(function () {
                        self.isSkip = true;
                        that.init.page4 = true;
                        $.fn.fullpage.moveTo(4);
                    });
                    $("#page3Line1").html("");
                    var data = [
                        {
                            selector: $("#page3Line1"),
                            para: ["花朵,金鱼,明星肖像......", "1000幅极致美学艺术作品", "首次最大规模齐聚大陆"]
                        }
                    ];
                    self.typewriter(data,function(){
                        setTimeout(function () {
                            $("#leftImg").show().addClass("zoomIn animated");
                        }, 500);
                        setTimeout(function () {
                            $("#bottomImg").show().addClass("zoomIn animated");
                            $(".streamer").css({
                                "right":"200px",
                                "opacity":0.3
                            });
                            that.init.page3 = true;
                        }, 700);
                        
                    },166);

                }else if(e.cur == 3){
                    var that = this;
                    this.init.page5 = true;
                    var index = 1;
                    var name = [
                        "earthly flowers，heavenly colors",
                        "After noir",
                        "FASHION EXCLUSIVE",
                        "followers",
                        "FLOWER ADDICT",
                        "IN MY ROOM",
                        "movies",
                        "liquid dreams",
                        "PLANT A TREE",
                        "Self-image",
                    ];
                    $("#showName").html(name[index - 1]);
                    $(".show").css("display","none").eq(index-1).css("display","block");
                    $(".workContainer").css({
                        "background-image":"url('src/image/exhibition/"+index+".jpg')",
                        "background-position": "center",
                        "background-repeat": "no-repeat",
                        "background-size": "cover"
                    });
                    $(".leftArrow,.rightArrow").click(function () {
                        if($(this).attr("data-type") == "left"){
                            var breforIndex = index;
                            var afterIndex = --index;
                            if(afterIndex <= 0){
                                index = 10;
                                afterIndex =10;
                            }
                            $(".show").css("display", "none").eq(afterIndex - 1).css("display", "block");
                            $(".show").removeClass("fadeIn fadeOut animated");
                            $(".img" + breforIndex).addClass("fadeOut animated");
                            $(".img" + afterIndex).addClass("fadeIn animated"); 
                            $(".workContainer").css({
                                "background-image": "url('src/image/exhibition/" + index + ".jpg')",
                                "background-position": "center",
                                "background-repeat": "no-repeat",
                                "background-size": "cover"
                            });
                            $("#showName").html(name[index - 1]);
                        }else{
                            var breforIndex = index;
                            var afterIndex = ++index;
                            if (afterIndex >= 11) {
                                index = 1;
                                afterIndex = 1;
                            }
                            $(".show").css("display", "none").eq(afterIndex - 1).css("display", "block");
                            $(".show").removeClass("fadeIn fadeOut animated");
                            $(".img" + breforIndex).addClass("fadeOut animated");
                            $(".img" + afterIndex).addClass("fadeIn animated"); 
                            $(".workContainer").css({
                                "background-image": "url('src/image/exhibition/" + index + ".jpg')",
                                "background-position": "center",
                                "background-repeat": "no-repeat",
                                "background-size": "cover",
                                "filter":"blur(5px)"
                            });
                            $("#showName").html(name[index - 1]);
                        }
                    });
                    var el = document.getElementsByClassName("show");
                    for(var i = 0; i < el.length; i ++){
                        el[i].addEventListener('swipeleft', function (e) {
                            var breforIndex = index;
                            var afterIndex = --index;
                            if (afterIndex <= 0) {
                                index = 10;
                                afterIndex = 10;
                            }
                            $(".show").css("display", "none").eq(afterIndex - 1).css("display", "block");
                            $(".show").removeClass("fadeIn fadeOut animated");
                            $(".img" + breforIndex).addClass("fadeOut animated");
                            $(".img" + afterIndex).addClass("fadeIn animated");
                            $(".workContainer").css({
                                "background-image": "url('src/image/exhibition/" + index + ".jpg')",
                                "background-position": "center",
                                "background-repeat": "no-repeat",
                                "background-size": "cover"
                            });
                            $("#showName").html(name[index - 1]);
                        });

                        el[i].addEventListener('swiperight', function (e) {
                            var breforIndex = index;
                            var afterIndex = ++index;
                            if (afterIndex >= 11) {
                                index = 1;
                                afterIndex = 1;
                            }
                            $(".show").css("display", "none").eq(afterIndex - 1).css("display", "block");
                            $(".show").removeClass("fadeIn fadeOut animated");
                            $(".img" + breforIndex).addClass("fadeOut animated");
                            $(".img" + afterIndex).addClass("fadeIn animated");
                            $(".workContainer").css({
                                "background-image": "url('src/image/exhibition/" + index + ".jpg')",
                                "background-position": "center",
                                "background-repeat": "no-repeat",
                                "background-size": "cover",
                                "filter": "blur(5px)"
                            });
                            $("#showName").html(name[index - 1]);
                        });

                        new Touch(el[i]);
                    }
                    $("#gotopage4").show().click(function () {
                        $.fn.fullpage.moveTo(4,true);
                    });
                    
                }else if(e.cur == 4){
                    var that = this;
                    this.init.page5 = true;
                    var data = [
                        {
                            selector: $("#textArea"),
                            para: ["“和光妙契”作为天辰时代旗下系列展览品牌,","旨在推出国际化的艺术跨界展览,","激荡出巧合妙契的新艺术浪潮。","美之千万，汇于神采；","敛其锋芒，味其神妙，",
                            "这便是「和光妙契」所传达的主题内涵。"]
                        }
                    ];

                    $("#textArea").html("");
                    self.typewriter(data, function () {
                        setTimeout(function () {
                            $("#center").show().addClass("fadeIn animated");
                        }, 500);
                        setTimeout(function () {
                            $("#hglogo").show().addClass("fadeIn animated");
                            $("#gotopage5").show().click(function () {
                                $.fn.fullpage.moveTo(6, true);
                            });
                            that.init.page5 = true;
                        }, 1000);
                        
                    },80);
                    
                }else if(e.cur == 5){
                    var that = this;
                    this.init.page6 = false;
                    $("#title").html("");

                    var timer = null,count = 0;
                    $("#companyContainer img").remove();
                    timer = setInterval(function(){
                        $("#companyContainer").append("<img src='src/image/third/" + count + ".png'>");
                        count++;
                        if(count == 11){
                            clearInterval(timer);
                            setTimeout(function () {
                                $(".rect").eq(0).css("display", "inline-block").addClass("zoomIn animated");
                                $(".rect").eq(1).css("display", "inline-block").addClass("zoomIn animated");
                            }, 500);
                            setTimeout(function () {
                                $("#slogan").show().addClass("zoomIn animated");
                            }, 1000);
                            setTimeout(function () {
                                $(".word1").show().addClass("fadeInLeft animated");
                            }, 1500);
                            setTimeout(function () {
                                $(".word2").show().addClass("fadeInRight animated");
                                
                                that.init.page6 = true;
                            }, 2000);
                        }
                    },166);
                    
                }
            },
            beforeChange: function (e) {
                var self = this;
                if(e.cur == -1){
                    return self.init.page1;
                } else if(e.cur == 0){
                    return self.init.page2;
                } else if (e.cur == 1) {
                    return self.init.page3;
                } else if (e.cur == 2 && e.next == 1) {
                    return self.init.page3;
                } else if (e.cur == 2 && e.next == 3) {
                    return self.init.page4;
                } else if (e.cur == 3) {
                    return self.init.page5;
                } else if (e.cur == 4) {
                    return self.init.page6;
                }
            },
            afterChange: function (e) {
                
                // console.log('afterChange', e.next, e.cur);
            }
        });
    },
    typewriter:function(obj,callback,speed){
        for(var i = 0; i < this.timers.length;i ++){
            clearInterval(this.timers[i]);
        }
        var self = this;

        var animate = [];
        var total = {
            num:0
        };
        for(var i = 0; i < obj.length; i ++){
            
            var data = {
                chars : [],
                timer : null,
                temp : 0
            };
            for(j in obj[i].para){
                data.chars.push("<br>");
                data.chars = data.chars.concat(obj[i].para[j].split(""));
            }
            data.chars.shift();
            animate.push(data);
                
            animate[i].timer = setInterval(self.typewriterAnimate(obj, animate[i], total, i, callback), speed);
            self.timers.push(animate[i].timer);   
        }         
    },
    typewriterAnimate:function(obj,self,total,index,cb){
        return function () {
            var that = this;
            obj[index].selector.html(obj[index].selector.html() + self.chars[self.temp]);
            self.temp++;
            if (self.temp == self.chars.length) {
                clearInterval(self.timer);
                total.num = total.num+1;
                if(total.num >= obj.length){
                    cb();
                }
            }
        }
    }
};
var loading = {
    config: null,
    index: 0,
    image: [],
    load: function () {
        for (var i = 0; i < this.config.length; i++) {
            var t = this.config[i].type;
            var s = this.config[i].src;
            if (t === 'image') {
                this.loadImage(s);
            } else if (t === 'audio') {
                this.loadAudio(s);
            }
        }
    },
    loadImage: function (src) {
        loading.image[this.index] = document.createElement('img');
        loading.image[this.index].src = src;
        // console.log('unload:' + new Date().getTime());
        loading.image[this.index].onload = function () {
            // console.log('loaded:' + new Date().getTime());
            ++loading.index;
            loading.refresh();
        };
    },
    loadAudio: function (src) {
        var audio = new Audio();
        audio.src = src;
        audio.preload = true;
        audio.load();
        ++loading.index;
        loading.refresh();
    },
    refresh: function () {
        var p = Math.ceil(this.index / this.config.length * 100);
        if (this.index !== this.config.length) {
            // document.getElementById('prograss').style.width = p + 2 + '%';
        } else {
            var exhibition = new Exhibition();
            exhibition.load();  
        }
    },
    finish: function () {

    }
};
loading.config = [
    { type: 'audio', src: 'src/audio/bgmusic.mp3' },
    { type: 'image', src: 'src/image/info/infobg.jpg' },
    { type: 'image', src: 'src/image/cover/coverbg.jpg' },
    { type: 'image', src: 'src/image/info/panel.png' },
    { type: 'image', src: 'src/image/second/bg.jpg' },
    { type: 'image', src: 'src/image/second/rightImg.png' },
    { type: 'image', src: 'src/image/third/bg.jpg' },
    { type: 'image', src: 'src/image/exhibition/bg.jpg' },
    { type: 'image', src: 'src/image/exhibition/namebg.png' },
    { type: 'image', src: 'src/image/backCover/bg.jpg' },
    { type: 'image', src: 'src/image/cover/icon.png' },
    { type: 'image', src: 'src/image/cover/shanghai.png' },
    { type: 'image', src: 'src/image/backCover/bg.jpg' },
    { type: 'image', src: 'src/image/backCover/center.png' },
    { type: 'image', src: 'src/image/backCover/word.png' },
    { type: 'image', src: 'src/image/backCover/word1.png' },
    { type: 'image', src: 'src/image/backCover/word2.png' },
    { type: 'image', src: 'src/image/info/left.png' },
    { type: 'image', src: 'src/image/info/2007.png' },
    { type: 'image', src: 'src/image/info/2012.png' },
    { type: 'image', src: 'src/image/info/2014.png' },
    { type: 'image', src: 'src/image/info/2016.png' },
    { type: 'image', src: 'src/image/second/word.png' },
    { type: 'image', src: 'src/image/second/bottomImg.png' },
    { type: 'image', src: 'src/image/third/headTitle.png' },
    { type: 'image', src: 'src/image/third/slogan.png' },
    { type: 'image', src: 'src/image/third/left1.png' },
    { type: 'image', src: 'src/image/third/MT.png' },
    { type: 'image', src: 'src/image/third/word1.png' },
    { type: 'image', src: 'src/image/third/left2.png' },
    { type: 'image', src: 'src/image/third/TCT.png' },
    { type: 'image', src: 'src/image/third/word2.png' },
    { type: 'image', src: 'src/image/exhibition/m.png' },
    { type: 'image', src: 'src/image/exhibition/leftBorder.png' },
    { type: 'image', src: 'src/image/exhibition/rightBorder.png' },
    { type: 'image', src: 'src/image/exhibition/leftWord.png' },
    { type: 'image', src: 'src/image/exhibition/1.jpg' },
    { type: 'image', src: 'src/image/exhibition/2.jpg' },
    { type: 'image', src: 'src/image/exhibition/3.jpg' },
    { type: 'image', src: 'src/image/exhibition/4.jpg' },
    { type: 'image', src: 'src/image/exhibition/5.jpg' },
    { type: 'image', src: 'src/image/exhibition/6.jpg' },
    { type: 'image', src: 'src/image/exhibition/7.jpg' },
    { type: 'image', src: 'src/image/exhibition/8.jpg' },
    { type: 'image', src: 'src/image/third/0.png' },
    { type: 'image', src: 'src/image/third/1.png' },
    { type: 'image', src: 'src/image/third/2.png' },
    { type: 'image', src: 'src/image/third/3.png' },
    { type: 'image', src: 'src/image/third/4.png' },
    { type: 'image', src: 'src/image/third/5.png' },
    { type: 'image', src: 'src/image/third/6.png' },
    { type: 'image', src: 'src/image/third/7.png' },
    { type: 'image', src: 'src/image/third/8.png' },
    { type: 'image', src: 'src/image/third/9.png' },
    { type: 'image', src: 'src/image/third/10.png' },

];
document.addEventListener('DOMContentLoaded', function () {
    if (!window.globalState) {
        $("#loading").removeClass("hidden");
        loading.load();
    } else {
        $("#loading").remove();
        $("#pageContain").show();
        var jimu = new Jimu();
        jimu.load();
    }
}, false);