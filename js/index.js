var slideShow = {
    nowIndex : 0,
    lastIndex: '',
    $listImg: $('.listimg'),
    $imgli : $('.listimg li'),
    imgNum: $('.listimg li').length-1,
    imgWidth: $('li img').width(),
    timer: undefined,
    flag:true,
    init: function(){
        this.autoFunc();
        this.bindEvent();
    },
    autoFunc: function(){
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function(){
            // _this.fadeFunc('right');
            _this.swipeFunc('right');
        },3000);
    },
    bindEvent: function(){
        var _this = this;
        $('.leftBtn').add($('.rightBtn')).add($('.cirbox li')).on('click',function(){
            if($(this).attr('class') == 'leftBtn'){
                // _this.fadeFunc('left');  //切换淡入淡出效果
                _this.swipeFunc('left');  //切换左右滑动效果
            }else if($(this).attr('class') == 'rightBtn'){
                // _this.fadeFunc('right');
                _this.swipeFunc('right');
            }else{
                var index = $(this).index();
                _this.swipeFunc(index);
            }
        })
        //鼠标移到图片上停止自动轮播，移开图片或者移到左右按钮继续轮播
        this.$listImg.on('mouseenter',function(){
            clearTimeout(_this.timer);
        }).on('mouseleave',function(){
            _this.autoFunc();
        })
        //鼠标移入轮播区显示左右按钮，移出隐藏按钮
        $('.wrapper').on('mouseenter',function(){
            $('button').css({display: 'inline-block'});
        }).on('mouseleave',function(){
            $('button').css({display: 'none'});
        })
        //淡入淡出效果
        this.$imgli.on('go',function(){
            $(this).fadeOut(300);
        })
        this.$imgli.on('come',function(){
            $(this).delay(300).fadeIn(300);
        })
    },
    //左右滑动效果
    //注意点：flag=true，写在animate外面会与animate同时执行，要写在animate里面，代表animate执行完再执行里面的函数，
    //否则当鼠标点击过快时，animate没执行完，flag已转换为true，进行下一此执行，会有偏移。
    show: function(direction){ 
        var _this = this;
        
            this.lastIndex = this.nowIndex;
            // console.log(this.nowIndex);
            if(direction == 'left'){
                if(this.nowIndex == 0 ){
                    this.nowIndex = this.imgNum-1;
                    this.$listImg.css({left:- this.imgNum * this.imgWidth +'px'});
                    this.$listImg.animate({left:this.$listImg.position().left + this.imgWidth + 'px'},function(){
                        //注意：这里的this是ul，而flag定义到全局，所以this要注意是全局的_this
                        _this.flag = true;
                    });
                }else{
                    this.nowIndex = this.nowIndex-1;
                    this.$listImg.animate({left:this.$listImg.position().left + this.imgWidth + 'px'},function(){
                        _this.flag = true;
                    });
                }
            }
            else if(direction == 'right'){
                if(this.nowIndex == 4){
                    this.nowIndex = 0;
                    this.$listImg.animate({left:this.$listImg.position().left - this.imgWidth + 'px'},function(){
                        $(this).css({left:'0'});
                        _this.flag = true;
                    });
                }else{
                    this.nowIndex = this.nowIndex+1;
                    this.$listImg.animate({left:this.$listImg.position().left - this.imgWidth + 'px'},function(){
                        _this.flag = true;
                    });
                }
            }else{
                this.nowIndex = direction;
                var n = Math.abs(this.nowIndex-this.lastIndex);
                if(this.lastIndex > this.nowIndex){
                    this.$listImg.animate({left:this.$listImg.position().left + n * this.imgWidth },function(){
                        _this.flag = true;
                    });
                }else if(this.lastIndex <= this.nowIndex){
                    this.$listImg.animate({left:this.$listImg.position().left - n * this.imgWidth },function(){
                        _this.flag = true;
                    });
                }
                //不写这句，不然点击两次相同圆点会左右偏移
                // else{
                //     this.$listImg.animate({left:this.$listImg.position().left},500)
                // }                  
            }
            
               
            
    },
    //获取索引，在淡入淡出时引用，左右滑动无需引用（在show函数中已获取索引）
    getIndex:function(index){
        this.lastIndex = this.nowIndex;
        if(index == 'left'){
            this.nowIndex = this.nowIndex == 0? this.imgNum-1:this.nowIndex-1;
        }
        else if(index == 'right'){
            this.nowIndex = this.nowIndex == this.imgNum-1? 0:this.nowIndex+1;
        }
        else{
            this.nowIndex = index;
        }        
    },
    //小圆点颜色改变函数
    cirChangeActive: function(index){
        $('.active').removeClass('active');
        $('.cirbox li').eq(index).addClass('active');
    },
    //淡入淡出函数
    fadeFunc: function(direction){   
        this.getIndex(direction);
        this.$imgli.eq(this.lastIndex).trigger('go');
        this.$imgli.eq(this.nowIndex).trigger('come');
        this.cirChangeActive(this.nowIndex);
        clearTimeout(this.timer);
        this.autoFunc('right');
    },
    //左右滑动函数
    swipeFunc:function(direction){
        if(this.flag){
            this.flag = false;
            this.show(direction);
            this.cirChangeActive(this.nowIndex);
            clearTimeout(this.timer);
            this.autoFunc('right');
        }
        
    }
}
slideShow.init();