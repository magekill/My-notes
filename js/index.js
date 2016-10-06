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


// 翻页
// (function(){
//     var $prev = $('#other').find('.prev'),
//         $next = $('#other').find('.next'),
//         $index = $('#index>li'),
//         indexLen = $index.length,
//         count = 0;
//     $prev.click(function(){
            
//     });
//     $next.click(function(){   
//         if(file === 'index' || file === null){
//             window.location.href = 'notes/note1.html';
//         }else if(file === 'note'+indexLen){
//             alert('已经是最后一页了');
//         }else{
//             // var reg = /\d+/.exec(file)[0];
//             window.location.href = 'note' + (++reg[0]) + '.html';
//         }
//     });

//     if(file === 'index' || file === null){
//         $index.eq(0).find('a').css('color', 'blue');
//     }else{
//         $index.eq(reg[0]).find('a').css('color', 'blue');
//     };
// })();

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
                    ol += '<li>'+title[i]+'</li>';
                }
            });
            $('#index').html(ol);
            // turnPage(title);
        },
        error: function(err){
            console.log(err);
        }
    }).done(function(){
        console.log($('#index>li').length);
    });
}

getIndex();

function turnPage(title){
    var count = 1;
    var $prev = $('#other').find('.prev'),
        $next = $('#other').find('.next');
    $next.click(function(){
        var docs = title[count];
        var doc = Object.keys(docs)[0];
        gitCotent(doc);
    });
}


