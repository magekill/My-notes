var $sidebar = $('#sidebar'),
    $content = $('#content');

(function(){
    var $show = $('#nav').find('.show');
    $show.click(function(){
        
        // 划出目录css3写法
        $sidebar.css({
            'box-shadow' : '5px 0 5px rgba(0,0,0,.3)',
            'left' : '0'
        });
        $content.css({
            'background-color' : 'rgba(0,0,0,.3)',
            'left' : '60%'
        }).one('touchstart',function(){
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
        $index = $('#index>li'),
        indexLen = $index.length;
    var href = window.location.href,
        result = /\/(\w+)\.html/.exec(href),
        file = result ? result[1] : null,
        reg = /\d+/.exec(file);
        $prev.click(function(){
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
        if(file === 'index' || file === null){
            window.location.href = 'notes/note1.html';
        }else if(file === 'note'+indexLen){
            alert('已经是最后一页了');
        }else{
            // var reg = /\d+/.exec(file)[0];
            window.location.href = 'note' + (++reg[0]) + '.html';
        }
    });

    if(file === 'index' || file === null){
        $index.eq(0).find('a').css('color', 'blue');
    }else{
        $index.eq(reg[0]).find('a').css('color', 'blue');
    };
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





