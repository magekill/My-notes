<h1>window对象的一些属性方法总结</h1>
<p>js里的window对象是顶层对象，该对象有很多属性很常用，但是很杂乱还容易混淆，所以我自己就给总结下。</p>
<hr class = "solid">
<h1>1. window对象的属性</h1>
<h2>1.1 window.window,  window.name</h2>
<p>window对象的window属性指向自身。</p>
<pre>
    window.window === this // true
</pre>
<p>window.name属性用于设置当前浏览器窗口的名字。</p>
<pre>
    window.name = "Hello,world"
</pre>
<p>只要是同一个窗口打开的网页都能读取该属性，不管这些网页是不是同源，通过该属性可以实现跨域访问。</p>
<p>该属性只能保存字符串，并且窗口关闭后该属性保存的值就会消失，有很大局限性，通常用来与iframe窗口通信。</p>
<hr class = "dotted">
<h2>1.2 window.location</h2>
<p>window.location返回一个location对象，用于获取窗口当前的URL信息。它等同于document.location对象。</p>
<pre>
    window.location === document.location // true
</pre>
<hr class = "dotted">
<h2>1.3 window.closed,window.opener</h2>
<p>window.closed属性返回一个布尔值，表示窗口是否关闭。</p>
<pre>
    window.closed // false
</pre>
<p>上面代码检查窗口是否关闭。这种检查没什么意义，因为只要能运行代码，这个窗口肯定没有关闭。这个属性一般用来检查使用脚本打开的窗口是否关闭。</p>
<p>window.opener属性返回代开当前窗口的父窗口。如果没有父窗口，则返回null。</p>
<pre>
    window.open().opener === window // true
</pre>
<p>通过opener属性，可以获得父窗口的全局变量和方法，比如window.opener.propertyName和window.opener.functionName()但是只限于两个窗口同源。</p>
<hr class = "dotted">
<h2>1.4 window.frames,window.length</h2>
<p>window.frames属性返回一个类似数组的对象，成员为页面内所有的框架窗口，包括frame元素和iframe元素。window.frames[0]表示窗口中的第一个框架窗口。</p>
<p>如果iframe元素设置了id或name属性，就可以用属性值引用这个iframe窗口。比如&lt;iframe name="myIFrame"&gt;就可以用frame['myIFrame']或者frames.myIFrame来引用。</p>
<p>frames属性实际上是window对象的别名。</p>
<pre>
    frames === window // true
</pre>
<p>window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。</p>
<pre>
    window.frames.length === window.length // true
</pre>
<p>window.frames.length与window.length应该是相等的。</p>
<hr class = "dotted">
<h2>1.5 window.screenX,window.screenY</h2>
<p>window.screenX和window.screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角（（(0, 0)）的水平距离和垂直距离。</p>
<hr class = "dotted">
<h2>1.6 window.innerHeight,window.innerWidth</h2>
<p>window.innerHeight和window.innerWidth属性，返回网页当前窗口可见部分的高度和宽度，即“视口”(viewport),单位像素。</p>
<p>当用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。</p>
<p>这两个属性值包括滚动条。</p>
<hr class = "dotted">
<h2>1.7 window.outerHeight,window.outerWidth</h2>
<p>window.outerHeight和window.outerWidth属性返回浏览器窗口高度和宽度，包括浏览器菜单和边框，单位为像素。</p>
<hr class = "dotted">
<h2>1.8 window.pageXOffset,window.pageYOffset</h2>
<p>window.pageXOffset属相返回页面的水平滚动距离，window.pageYOffset属性返回页面垂直滚动距离，单位都为像素。</p>
<p>例如用户将垂直滚动条向下拉动50像素，那么window.pageYOffset就是50。</p>
<hr class = "solid">
<h2>2. navigator对象</h2>
<p>window对象的navigator属性，指向一个包含浏览器信息的对象。</p>
<hr class = "dotted">
<h2>2.1 navigator.userAgent</h2>
<p>navigator.userAgent属性返回浏览器的User-Agent字符串，标示浏览器的厂商和版本信息</p>
<p>例如Chrome浏览器的userAgent：</p>
<pre>
    navigator.userAgent
    // "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
</pre>
<p>通过userAgent来识别浏览器是不准确的，不过倒是可以用老大致的识别手机浏览器，方法就是测试是否包含mobi字符。</p>
<pre>
    var ua = navigator.userAgent.toLowerCase();
    if(/mobi/i.test(ua)){
        // 手机浏览器
    }else{
        // 非手机浏览器
    }
</pre>
<p>如果要识别所有移动设备浏览器，可以测试更多特征字符串。</p>
<pre>
    /mobi|android|touch|mini/i.test(ua)
</pre>
<hr class = "dotted">
<h2>2.2. navigator.plugins</h2>
<p>navigator.plugins属性返回一个类似数组对象，成员是浏览器安装的插件，比如Flash、ActiceX等。</p>
<hr class = "dotted">
<h2>2.3 navigator.platform</h2>
<p>navigator.platform属性返回用户的操作系统信息。</p>
<pre>
    navigator.platform
    // "Win32"
</pre>
<hr class = "dotted">
<h2>2.4 navigator.onLine</h2>
<p>navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线。</p>
<pre>
    navigator.onLine // true
</pre>
<hr class = "dotted">
<h2>2.5 navigator.geolocation</h2>
<p>navigator.geolocation返回一个Geolocation对象，包含用户地理位置信息。</p>
<hr class = "solid">
<h2>3. window.screen对象</h2>
<p>window.screen对象包含了显示设备的信息。</p>
<p>screen.height和screen.width两个属性，一般用来了解设备的分辨率。</p>
<pre>
    // 显示设备的高度，单位为像素
    screen.height // 768
    screen.width // 1366
</pre>
<p>以上代码表示，设备的分辨率是1366x768</p>
<p>除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。</p>
<p>screen.availHeight和screen.availWidth属性返回屏幕可用的高度，单位为像素。他们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如说系统任务栏。</p>
<p>screen.colorDepth属性返回屏幕的颜色深度，一般为16（表示16-bit）或24。</p>
<hr class = "solid">
<h2>4. window对象的方法</h2>
<h2>4.1 window.moveTo(),window.moveBy()</h2>
<p>window.moveTo方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。</p>
<pre>
    window.moveTo(100,200)
</pre>
<p>上面代码将窗口移动到屏幕(100,200)的位置</p>
<p>window.moveBy方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。</p>
<pre>  
    window.moveBy(25,50)
</pre>
<p>上面代码将窗口向右移动25像素、向下移动50像素。</p>
<hr class = "dotted">
<h2>4.2 window.scrollTo(),window.scrollBy()</h2>
<p>window.scrollTo方法用于将网页的指定位置，滚动到浏览器左上角。它的参数是相对于整张网页的横坐标和纵坐标。它有一个别名window.scroll。</p>
<pre>
    window.scrollTo(0,1000);
</pre>
<p>window.scrollBy方法用于将网页移动指定距离，单位为像素。它接受两个参数：向右滚动的像素，向下滚动的像素。</p>
<pre>
    window.scrollBy(0, window.innerHeight)
</pre>
<p>上面代码用于将网页向下滚动一屏。</p>
<hr class = "dotted">
<h2>4.3 window.open(),window.close()</h2>
<p>window.open方法用于新建另一个浏览器窗口，并且返回该窗口对象。</p>
<pre>
    var popup = window.open('somefile.html');
</pre>
<p>上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的somefile.html。</p>
<p>open 方法一共可以接受四个参数</p>
<p>第一个参数：字符串，表示新窗口的网址。如果省略，默认网址就是about:blank。</p>
<p>第二个参数：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则跳到该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。</p>
<p>第三个参数：字符串，内容为逗号分隔的键值对，表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整UI的新窗口。</p>
<p>第四个参数：布尔值，表示第一个参数指定的网址，是否应该替换history对象之中的当前网址记录，默认值为false。显然，这个参数只有在第二个参数指向已经存在的窗口时，才有意义。</p>
<pre>
    var popup = window.open(
    'somepage.html',
    'DefinitionsWindows',
    'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
    );
</pre>
<p>上面代码表示，打开的新窗口高度和宽度都为200像素，没有地址栏和滚动条，但有状态栏，允许用户调整大小。</p>
<p>注意，如果在第三个参数中设置了一部分参数，其他没有被设置的yes/no参数都会被设成no，只有titlebar和关闭按钮除外（它们的值默认为yes）。</p>
<p>另外，open方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许open方法指向该窗口。</p>
<p>window.close方法用于关闭当前窗口，一般用来关闭window.open方法新建的窗口。</p>
<pre>
    popup.close()
</pre>
<p>该方法只对顶层窗口有效，iframe框架之中的窗口使用该方法无效。</p>
<hr class = "dotted">
<h2>4.4 window.getComputedStyle()</h2>
<p>getComputedStyle方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象。</p>
<hr class = "dotted">
<h2>4.5 window.focus</h2>
<p>focus方法会激活指定当前窗口，使其获得焦点。</p>
<pre>
    var popup = window.open('popup.html', 'Popup Window');

    if ((popup !== null) && !popup.closed) {
    popup.focus();
    }
</pre>
<p>上面代码先检查popup窗口是否依然存在，确认后激活该窗口。</p>
<p>当前窗口获得焦点时，会触发focus事件；当前窗口失去焦点时，会触发blur事件。</p>
<hr class = "dotted">
<h2>4.6 window.getSelection</h2>
<p>window.getSelection方法返回一个selection对象，表示用户想在选中的文本。</p>
<pre>
    var selObj = window.getSelection();
</pre>
<p>使用Selction对象的toString方法可以得到选中的文本。</p>
<pre>
    var selectedText = selObj.toString();
</pre>
<hr class = "solid">
<h2>5. URL的编码/解码方法</h2>
<p>网页URL的合法字符分成两类。</p>
<p>URL元字符：分号（;），逗号（’,’），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（\），圆括号（()`）</p>
<p>除了以上字符，其他字符出现在URL之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。</p>
<p>JavaScript提供四个URL的编码/解码方法。</p>
<pre>
    encodeURI()
    encodeURIComponent()
    decodeURI()
    decodeURIComponent()
</pre>
<p>encodeURI 方法的参数是一个字符串，代表整个URL。它会将元字符和语义字符之外的字符，都进行转义。</p>
<pre>
    encodeURI('http://www.example.com/q=春节')
    // "http://www.example.com/q=%E6%98%A5%E8%8A%82"
</pre>
<p>encodeURIComponent只转除了语义字符之外的字符，元字符也会被转义。因此，它的参数通常是URL的路径或参数值，而不是整个URL。</p>
<pre>
    encodeURIComponent('春节')
    // "%E6%98%A5%E8%8A%82"
    encodeURIComponent('http://www.example.com/q=春节')
    // "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
</pre>
<p>decodeURI用于还原转义后的URL。它是encodeURI方法的逆运算。</p>
<pre>
    decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
    // "http://www.example.com/q=春节"
</pre>
<p>decodeURIComponent用于还原转义后的URL片段。它是encodeURIComponent方法的逆运算。</p>
<pre>
    decodeURIComponent('%E6%98%A5%E8%8A%82')
    // "春节"
</pre>
