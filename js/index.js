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
        }).one('touchend',function(){
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

// 获取内容
function getContent(docs){
    $.ajax({
        url: 'http://localhost',
        type: 'GET',
        data: {docs : docs},
        success: function(response){
            // 删除#load并清除定时器
            $('#load').remove();
            loading($('#load'));
            
            $content.html(response);
        },
        error: function(err){
            console.log(err);
        }
    })
}

getContent('home');

// 获取目录
function getIndex(){
    $.ajax({
        url: 'http://localhost',
        type: 'GET',
        data: {docs : 'index'},
        success: function(response){
            var ol = '';
            var title = JSON.parse(response).title;
            title.forEach(function(title){
                for(var i in title){
                    if(title.hasOwnProperty(i)){
                        ol += '<li>'+title[i]+'</li>';
                    }
                }
            });
            $('#index').html(ol);
            // 翻页
            turnPage(title);
        },
        error: function(err){
            console.log(err);
        }
    })
}

getIndex();

// 轮播翻页实现
function turnPage(title){
    var count = 0;
    var $prev = $('#other').find('.prev'),
        $next = $('#other').find('.next'),
        $index = $('#index>li');
    $next.click(function(event){
        count ++ ;
        if(count > $index.length-1){
            count = $index.length-1;
            alert('已经是最后一页了');
        }else{
            $content.html('<div id = load>正在加载...</div>');
            loading($('#load'));
            getContent(getTitle(count, title));
            indexTab(count,$index);
        }
    });
    $prev.click(function(){
        count -- ;
        if(count < 0){
            count = 0;
            alert('已经是第一页了');
        }else{
            $content.html('<div id = load>正在加载...</div>');
            loading($('#load'));
            getContent(getTitle(count, title));
            indexTab(count,$index);
        }
    });
    $index.each(function(index, $li){
        $(this).click(function(){
            $content.html('<div id = load>正在加载...</div>');
            loading($('#load'));
            count = index;
            getContent(getTitle(count, title));
            indexTab(count,$index);
        });
    });
    // 简易标题搜索
    $sidebar.find('.indexSearch').click(function(){
        var indexBox = $('.indexBox').val();
        if(indexBox){
            $index.css('color', '#267dc0');
            title.forEach(function(value,index){
                for(var i in value){
                    if(value.hasOwnProperty(i)){
                        if(i.indexOf(indexBox) !== -1 || value[i].indexOf(indexBox) !== -1){
                            $content.html('<div id = load>正在加载...</div>');
                            loading($('#load'));
                            count = index;
                            getContent(getTitle(count, title));
                            indexFull(count,$index);   
                        }
                    }
                }
            });
        }
    });
}

// 目录颜色控制
function indexTab(count,$index){
    // 先去色再着色
    $index.css('color', '#267dc0').eq(count).css('color', 'blue');
}
function indexFull(count,$index){
    // 不去色直接着色
    $index.eq(count).css('color', 'blue');
}

// 获取title.json里的目录名
function getTitle(count, title){
    var docs = title[count],
        doc = Object.keys(docs)[0];
    return doc;
}

// 等待动画
function loading(dom){
    var timmer = null;
    if(dom){
        var onOff = true;
        clearInterval(timmer);
        timmer = setInterval(function(){
            if(onOff){
                dom.fadeIn();
                onOff = !onOff;
            }else{
                dom.fadeOut();
                onOff = !onOff;
            }
        },1000);
    }else{
        clearInterval(timmer);
    }
}



