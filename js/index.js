
var $show = $('#nav').find('.show'),
    $sidebar = $('#sidebar'),
    $content = $('#content');
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


