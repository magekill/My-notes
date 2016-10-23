<h1>canvas的基本用法</h1>
<p>canvas是用来绘制图形和动画的API。</p>
<hr class = "solid">
<h2>1、获取canvas对象</h2>
<p>使用canvas首先要建立一个canvas元素</p>
<pre>
    &lt;canvas id = "canvas"  width = "200"  height = "200"&gt;
        width是画布的宽度，height是画布的高度，单位是px。
        标签中间的文字可以在浏览器不支持canvas时显示出来。
    &lt;/canvas&gt;

    获取canvas对象：var canvas = document.getElementById('canvas');
                   var ctx = canvas.getContext('2d');

    获取画布高度和宽度：ctx.
</pre>
<p>所有图像都将在canvas限定的范围内。</p>
<hr class = 'dotted'>
<h2>2、绘图方法</h2>
<p>canvas画布提供了一个用来作图的平面空间，该空间的每个点都有自己的坐标，x表示横坐标，y表示竖坐标。原点(0, 0)位于图像左上角，x轴的正向是原点向右，y轴的正向是原点向下。</p>
<pre>
    ctx.beginPath(); // 开始绘制路径
    当使用fill或stroke命令是，会使其以上所有的路径重绘或填充，而beginPath可以阻止fill和stroke命令重绘其以上的路径。
    // 绘制线条
    ctx.closePath; // 将路径从终点连接起点
    ctx.moveTo(x, y); // 设置路径的起点
    ctx.lineTo(x, y); // 设置路径的终点
    ctx.arc(x, y, radius, starAngle, endAngle, anticlockwise); // 绘制圆弧路径(x,y是圆心坐标，radius是半径，starAngle,endAngle是圆弧的开始和结束位置，单位是弧度，anticlockwise为false时表示顺时针，true时为逆时针，默认为false)
    ctx.quadraticCurveTo(cp1x, cp1y, x, y) // 绘制贝塞尔曲线，cp1x,cp1y为控制点，x,y为结束点。
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) // 绘制二次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

    ctx.fill() // 填充所绘制的图形
    ctx.stroke() // 绘制路径
    ctx.clip() // 根据路径形状裁切
    // 绘制矩形
    ctx.strokeRect(x, y, width, height); // 绘制矩形路径
    ctx.fillRect(x, y, width, height); // 绘制填充矩形
    clearRect(x, y, width, height); // 清除矩形区域
    ctx.rect(x, y, width, height); // 绘制矩形路径，当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置会默认坐标。
    // 路径样式
    ctx.lineWidth = number; // 设置路径宽度
    ctx.lineCap = type; // 设置线条末端样式 butt:默认，round:圆头，square:方头
    ctx.lineJoin = type; // 设置线条交汇处样式 round:圆滑处理，bevel:倒角处理，miter:默认
    ctx.miterLimit = value; // 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
    // 虚线
    ctx.getLineDash(); // 返回一个包含当前虚线样式，长度为非负偶数的数组。
    ctx.setLineDash(segments); // 设置当前虚线样式。接受一个数组，来指定线段与间隙的交替。
    ctx.lineDashOffset = value; // 设置虚线样式的起始偏移量。
    // 线条的颜色设置和路径的填充颜色设置和透明度设置
    ctx.strokeStyle = color; // 设置路径颜色,当使用rgba的色彩格式，可以设置透明度
    ctx.fillStyle = color; // 设置图形的填充颜色，当使用rgba的色彩格式，可以设置透明度
    ctx.globalAlpha = 0-1; // 设置图形透明度，值在0到1之间
    // 渐变
    ctx.createLinearGradient(x1, y1, x2, y2); // 接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
    ctx.createRadialGradient(x1, y1, r1, x2, y2, r2); //接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
    ctx.gradient.addColorStop(position, color); // 接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
    ctx.createPattern(image, type) // 该方法接受两个参数,实现图片的循环。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。
    以上值都会赋给fillStyle或strokeStyle,以实现样式效果。
    // 阴影
    ctx.shadowOffsetX = float  // shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
    ctx.shadowOffsetY = float // shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
    ctx.shadowBlur = float // shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
    ctx.shadowColor = color // shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
    // 绘制文本
    ctx.fillText(text, x, y [, maxWidth]); // 在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
    ctx.strokeText(text, x, y [, maxWidth]); // 在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.
    ctx.font = value // 当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
    ctx.textAlign = value // 文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
    ctx.textBaseline = value // 基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
    ctx.direction = value // 文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
    ctx.measureText() // 将返回一个 TextMetrics对象的宽度、所在像素，这些体现文本特性的属性。
    // 操作图片
    ctx.drawImage(image, x, y) // 其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
    ctx.drawImage(image, x, y, width, height) // 这个方法多了2个参数：width 和 height，这两个参数用来控制 当像canvas画入时应该缩放的大小
    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) // 第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。
    // 保存与回档
    ctx.save();
    ctx.restore();
       save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
       Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：
       1、当前应用的变形（即移动，旋转和缩放，见下）
          strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
       2、当前的裁切路径（clipping path）
       你可以调用任意多次 save 方法。
       每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。
    // 变形
    ctx.translate(x, y); // translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量。
    ctx.rotate(angle); // 这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法。
    ctx.scale(x, y); // scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
    ctx.transform(m11, m12, m21, m22, dx, dy); // 变形矩阵，所有变形方法都是通过改变其参数实现。
    以上变形效果都是在现有基础上变形，而不是在初始值基础上变形。
    // 图形组合与覆盖
    ctx.globalCompositeOperation = type;
    type类型：
        1.source-over // 这是默认设置，新图形会覆盖在原有内容之上。
        2.destination-over // 会在原有内容之下绘制新图形。
        3.source-in // 新图形会仅仅出现与原有内容重叠的部分。其它区域都变成透明的。
        4.destination-in // 原有内容中与新图形重叠的部分会被保留，其它区域都变成透明的。
        5.source-out // 结果是只有新图形中与原有内容不重叠的部分会被绘制出来。
        6.destination-out // 原有内容中与新图形不重叠的部分会被保留。
        7.source-atop // 新图形中与原有内容重叠的部分会被绘制，并覆盖于原有内容之上。
        8.destination-atop // 原有内容中与新内容重叠的部分会被保留，并会在原有内容之下绘制新图形。
        9.lighter // 两图形中重叠部分作加色处理。
        10.darker // 两图形中重叠的部分作减色处理。
        11.xor // 重叠的部分会变成透明。
        12.copy // 只有新图形会被保留，其它都被清除掉。
</pre>
<hr class = 'dotted'>
<h2>3、动画</h2>
<p>canvas里每一帧动画都需要删除上一帧然后绘制下一帧，从而达到动画的效果</p>
<p>一般使用setInterval()和setTimeout()来实现。</p>
<p>window.requestAnimationFrame(callback)也能用来实现动画帧的实现，它会在系统准备好重绘后才进行重绘，一般每秒运行60次，会根据性能进行调节。</p>
<pre>
    动画示例：简易时钟
     var clock = document.getElementById('clock');
        function clockRun(){
            var ctx = clock.getContext('2d');
            ctx.save();
            var clockWidth = clock.width;
            var clockHeight = clock.height;
            ctx.clearRect(0, 0, clockWidth, clockHeight);
            ctx.translate(clockWidth/2, clockHeight/2);
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = clockWidth/20;
            ctx.beginPath();
            ctx.arc(0, 0, clockWidth/2-clockWidth/40, 0, 2*Math.PI);
            ctx.stroke();
            // minuteMark
            ctx.strokeStyle = '#000';
            ctx.lineCap = 'round';
            ctx.lineWidth = clockWidth/80;
            ctx.save();
            ctx.beginPath();
            for(var i=0; i<12; i++){
                ctx.rotate(Math.PI/6);
                ctx.moveTo(0, -(clockWidth/2-3*clockWidth/40));
                ctx.lineTo(0, -(clockWidth/2-4*clockWidth/40));
            }
            ctx.stroke();
            ctx.restore();
            // secondMark
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = clockWidth/160;
            for(var i=0; i<60; i++){
                if(i/5 !== 0){
                ctx.rotate(Math.PI/30);
                ctx.moveTo(0, -(clockWidth/2-3*clockWidth/40));
                ctx.lineTo(0, -(clockWidth/2-3.5*clockWidth/40)); 
                }
            }
            ctx.stroke(); 
            ctx.restore();

            var now = new Date();
            var sec = now.getSeconds();
            var min = now.getMinutes();
            var hr = now.getHours();
            hr = hr>=12 ? hr-12 : hr;
            // hours
            ctx.save();
            ctx.rotate(hr*Math.PI/6 + min*Math.PI/360 + sec*Math.PI/21600);
            ctx.lineWidth = clockWidth/40;
            ctx.beginPath();
            ctx.moveTo(0, 15*clockWidth/400);
            ctx.lineTo(0, -80*clockWidth/400);
            ctx.stroke();
            ctx.restore();
            // minutes
            ctx.save();
            ctx.rotate(min*Math.PI/30 + sec*Math.PI/1800);
            ctx.lineWidth = clockWidth/50;
            ctx.beginPath();
            ctx.moveTo(0, 20*clockWidth/400);
            ctx.lineTo(0, -120*clockWidth/400);
            ctx.stroke();
            ctx.restore();
            // seconds
            ctx.save();
            ctx.rotate(sec*Math.PI/30);
            ctx.lineWidth = clockWidth/100;
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(0, 30*clockWidth/400);
            ctx.lineTo(0, -120*clockWidth/400);
            ctx.arc(0, -130*clockWidth/400, 10*clockWidth/400, Math.PI/2, 5*Math.PI/2, false);
            ctx.moveTo(0, -140*clockWidth/400);
            ctx.lineTo(0, -160*clockWidth/400);
            ctx.stroke();
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(0, 0, 5*clockWidth/400, 0, 2*Math.PI);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(0, 0, 1*clockWidth/400, 0, 2*Math.PI);
            ctx.fill();
            ctx.restore();
            // 绘制数字
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.font = 30*clockWidth/400+'px serif';
            ctx.beginPath();
            ctx.fillText('12', -15*clockWidth/400 , -130*clockWidth/400);
            ctx.fillText('3', 130*clockWidth/400, 10*clockWidth/400);
            ctx.fillText('6', -8*clockWidth/400, 150*clockWidth/400);
            ctx.fillText('9', -150*clockWidth/400, 10*clockWidth/400);
            ctx.restore();

            ctx.restore();
            window.requestAnimationFrame(clockRun);
        }
        // setInterval(clockRun, 1000);
        window.requestAnimationFrame(clockRun);
</pre>
<hr class = 'dotted'>
<h2>4、像素操作</h2>
<p>getImageData方法获取的是用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。</p>
<pre>
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
</pre>
<p>imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因此该数组的长度等于 图像的像素宽度 x 图像的像素高度 x 4，每个值的范围是0–255。这个数组不仅可读，而且可写，因此通过操作这个数组的值，就可以达到操作图像的目的。</p>
<p>putImageData方法将数组内容重新绘制在Canvas上。</p>
<pre>
    context.putImageData(imageData, 0, 0);
</pre>
<p>使用toDataURL方法，可以将Canvas数据重新转化成一般的图像文件形式。</p>
<pre>
    function convertCanvasToImage(canvas) {
        var image = new Image();
        image.src = canvas.toDataURL('image/png');
        return image;
    }
    上面的代码将Canvas数据，转化成PNG data URI。
</pre>


    

