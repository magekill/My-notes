<h1>jsonp的实现原理</h1>
<p>jsonp是ajax实现跨域的一种方式。</p>
<p>由于javaScript的同源策略，导致域名，端口，协议只要有其中之一不相同的话就不能互相访问，所以通过ajax访问一个域名、端口、协议不同的服务器是行不通的，然而跨域访问有时又不可避免，于是就有了jsonp这个方法</p>
<hr class="solid">
<h2>实现原理</h2>
<p>javaScript的同源策略，虽然可以防止不同源的脚本访问服务器，但是却无法阻止脚本的引用。</p>
<pre>
    &lt;script src = "http://www.baidu.com"&gt;&lt;/script&gt;
</pre>
<p>通过以上代码，就相当于给http://www.baidu.com这个网址发送了GET请求。转换为同源的写法就相当于以下代码：</p>
<pre>
    xml.open('GET', 'http://www.baidu.com');
    xml.send(null);
</pre>
<p>因此我们就可以用在body里插入script标签的方式代替XMLHttpRequest对象发送GET请求。</p> 
<pre>
    &lt;script src = http://localhost:8080/test/test.js?name=wu&age=20&gt;&lt;/script&gt;
</pre>
<p>以上代码向网址http://localhost:8080/test/test.js发送了一个get请求，服务经过处理后返回{name:'wu',age:20},但是浏览器会立马报错，因为javaScript并不能理解这种语法，因此我们为其添加一个参数：</p>
<pre>
    &lt;script src="http://localhost:8080/test/test.js?name=wu&age=20&callback=foo"&gt;&lt;/script&gt;
</pre>
<p>并改造一下服务端，使其返回形式变为callback({name:'wu',age:20})，传回客户端就变成调用callback函数的形式。
然后我们再在脚本里写一个callback函数供其调用，这个函数处理返回数据，从而达到原有目的。</p>
<p>以下是代码示例：</p>
<pre>
    // Chrome下测试，未做兼容。
    // 创建并插入script标签
    function createScript(src){
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.src = src;
        document.body.appendChild(script);
    }
    // 调用createScript函数，通常由事件驱动
    createScript('http://localhost:8080/test/test.js?name=wu&age=20&callback=foo');
    // 调用完成后删除script元素上的所有属性和创建的标签，回收垃圾
    setTimeout(function(){
        for(var attr in script){
            delete script.attr;
        }
        script.parentNode.removeChild(script);
    },0);
    // 所调用的处理函数
    foo(data){
        // 处理代码
    }
</pre>
<p>由于script标签只能发送get请求，所以jsonp也只能用于get请求，不能用于post请求。</p>
