var $sidebar = $('#sidebar'),
    $content = $('#content');

(function(){
    var $show = $('#nav').find('.show');
    $show.click(function(){
        // 划出目录jquery写法
        // $sidebar.css('box-shadow','5px 0 5px rgba(0,0,0,.3)').stop().animate({
        //     left : '0'
        // });
        // $content.css({
        //     'background-color' : 'rgba(0,0,0,.3)'
        // }).stop().animate({
        //     left: '60%'
        // },function(){
        //    var $this = $(this),
        //        $conLeft = parseInt($this.css('left'));
        //    if($conLeft > 0){
        //         $this.one('click',function(){
        //             $sidebar.css('box-shadow','none').stop().animate({
        //                 left: '-60%'
        //             });
        //             $this.css({
        //                 'background-color' : '#fff'
        //             }).stop().animate({
        //                 left: '0' 
        //             });
        //         });
        //     }
        // });
        // 划出目录css3写法
        $sidebar.css({
            'box-shadow' : '5px 0 5px rgba(0,0,0,.3)',
            'left' : '0'
        });
        $content.css({
            'background-color' : 'rgba(0,0,0,.3)',
            'left' : '60%'
        }).one('click',function(){
            $sidebar.css({
                'box-shadow' : 'none',
                'left' : '-60%'
            });
            $(this).css({
                'background-color' : '#fff',
                'left' : '0'
            })
        });
    });
})();


// 翻页
(function(){
    var $prev = $('#other').find('.prev'),
        $next = $('#other').find('.next'),
        indexLen = $('#index>li').length;
    $prev.click(function(){
        var href = window.location.href,
            result = /\/(\w+)\.html/.exec(href)
            file = result ? result[1] : null;
        if(file === 'index' || file === null){
            alert('这已经是第一页了');
        }else if(file === 'note1'){
            window.location.href = '../index.html';
        }else{
            var reg = /\d+/.exec(file)[0];
            window.location.href = 'note' + (reg-1) + '.html';
        }
    });
    $next.click(function(){
        var href = window.location.href,
             file = /\/(\w+)\.html/.exec(href)[1];
        if(file === 'index'){
            window.location.href = 'notes/note1.html';
        }else if(file === 'note'+indexLen){
            alert('已经是最后一页了');
        }else{
            var reg = /\d+/.exec(file)[0];
            window.location.href = 'note' + (++reg) + '.html';
        }
    });
})();

// 回到顶部
(function(){
    var backTop = $('#other').find('.top');
    backTop.click(function(){
        $content.scrollTop(0);
        setTimeout(function(){
            $content.stop(true,true).animate({
                'padding-top': '+=30'
            },300,function(){
                $content.stop(true,true).animate({
                    'padding-top': '-=30'
                },300);
            });
        },0);
    });
})();





