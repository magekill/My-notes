## 1、模版语法

### 插值

#### {{ }} 双大括号文本插值 
```
<span>Message: {{ msg }}</span>
```

#### *v-once* 一次性插值 
```
<span v-once>This will never change: {{ msg }}</span>
```

#### *v-html* 插入html 
```
<div v-html="rawHtml"></div>
```

#### *v-bind* 绑定属性值
```
<div v-bind:id="dynamicId"></div>
```

#### 模板中可以绑定单个javascript表达式
```
{{ ok ? 'YES' : 'NO' }}
<div v-bind:id="'list-' + id"></div>
```

#### {{ }} 中可以使用过滤器，为绑定值添加限定条件
```
{{ message | capitalize }}

new Vue({
    // ...
    filters: {
        capitalize: function (value) { // value是绑定值message
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
})
```
过滤器串联
```
{{ message | filterA | filterB }}
```
过滤器是 JavaScript 函数，因此可以接受参数：
```
{{ message | filterA('arg1', arg2) }}
```
这里，字符串 'arg1' 将传给过滤器作为第二个参数， arg2 表达式的值将被求值然后传给过滤器作为第三个参数。

### 修饰符

饰符是以半角句号 `.` 指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`
```
<form v-on:submit.prevent="onSubmit"></form>
```

## 2、计算属性

### computed

```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```
reversedMessage会根据message的值经过计算获取

添加setter
```
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```


### Methods

```
<p>Reversed message: "{{ reverseMessage() }}"</p>


// in component
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
methods里包含的实际上都是方法。

methods每次调用都会重新运行函数进行计算，而computed则会优先使用缓存。

### Watch

watch用来监听数据的变化，一旦监听到数据的变化就会运行其函数

```
<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
监听firstName和lastName值，一旦其发生变化，就会运行函数重置fullName值。

## 3、class和style绑定

### 绑定HTML Class

```
// 普通字符串
<div v-bind:class="active"></div>

// 对象语法
<div v-bind:class="{ 'active': isActive }"></div>
// active的存在取决于isActive是否为true
//普通class属性可以与对象语法共存
<div class="static"
     v-bind:class="{ 'active': isActive, 'text-danger': hasError }">
</div>

// 数组语法
<div v-bind:class="[activeClass, errorClass]">
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
// 数组的各项的值就是class的值
```

### 绑定内联样式

```
// 内联样式绑定与class绑定类似
// 对象语法
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>

// 数组语法
<div v-bind:style="[baseStyles, overridingStyles]">
// 数组各项都是样式对象
```

## 4、条件渲染

### v-if
```
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>

data: {
    ok: true
}
```
当v-if值为true时，它所绑定的组件将被渲染，否则就渲染v-else绑定的组件

### template v-if
```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
template标签把多个标签包含在一起统一渲染，由v-if统一控制

### v-show
v-show表现跟v-if基本相似,但是不支持v-template语法

v-if在切换的时候渲染需要的组件，而v-show是在一开始就把所有组件都渲染出来，然后把不需要的隐藏起来，需要的时候再展现出来

## 5、列表渲染

### v-for

基本用法
```
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>

var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      {message: 'foo' },
      {message: 'Bar' }
    ]
  }
})
```
利用item in items语法遍历数组items，生成一个列表，item是数组元素的别名

```
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
v-for的第二参数是个可选参数，返回当前项的索引

### template v-for
```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```
用来渲染多个元素块

### 对象迭代
```
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>

new Vue({
  el: '#repeat-object',
  data: {
    object: {
      FirstName: 'John',
      LastName: 'Doe',
      Age: 30
    }
  }
})
```
对象迭代的value是object的值

```
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```
对象迭代的第二个参数是object的键值，第三个参数是索引

### 整数迭代

```
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```
表示重复渲染n次

### Key

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```
key用来为每个重复项添加唯一key属性，用来跟踪识别每个节点。

## 5、事件处理器

### v-on

```
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>

var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      alert(event.target.tagName)
    }
  }
})
// 也可以用 JavaScript 直接调用方法
example2.greet() // -> 'Hello Vue.js!'
```
使用v-on可以绑定方法，也可以使用内联方法，在方法中带入参数

### 事件修饰符

```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```
事件修饰符用来完成一些常用操作

### 按键修饰符

```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```
使用修饰符，确定具体的按键
```
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```
除了使用数字还可以使用按键别名

全部按键别名
* enter
* tab
* delete (捕获 “删除” 和 “退格” 键)
* esc
* space
* up
* down
* left
* right

可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
```
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

## 6、表单控件绑定

### v-model

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

new vue({
  el: '...',
  data: {
    message: ''
  }
})
```
v-model的值是绑定表单填写的内容。

* 单行文本(text)绑定的是填入文本
* 多行文本(textarea)绑定的是填入文本
* 单个勾选框(checkbox绑定的是布尔值(选中为true，未选中为false)
* 多个勾选框(checkbox)把value值绑定到同一个数组(message值必须是一个数组)
* 单选按钮(radio)绑定value值
* 单选列表(select)绑定该选项的值
* 多选列表(select)把多个选项值绑定到同一个数组

### 修饰符
```
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >
```
* .lazy       输入数据将通过change事件更新
* .number     自动将用户输入值转换为Number型
* .trim       自动过滤用户输入的首尾空格

## 7、组件

### 创建和使用组件
```
<div id="example">
  <my-component></my-component>
</div>

// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 创建根实例
new Vue({
  el: '#example'
})
```
上面实例创建并使用了一个全局注册组件

### 局部注册

```
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```
### data必须是函数

```
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一个函数，因此 Vue 不会警告，
  // 但是我们为每一个组件返回了同一个对象引用
  data: function () {
    return {
      counter: 0
    }
  }
})
```
### Props

向组件内部传入数据需要使用props

```
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```
然后可以传入数据

`<child message="hello!"></child>`

props的值可以输数组，也可以是对象，是对象时就可以传入验证要求

```
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
传入数据时，如果验证不通过会发出警报

type 可以是下面原生构造器：

* String
* Number
* Boolean
* Function
* Object
* Array

### 自定义事件

* 使用 $on(eventName) 监听事件
* 使用 $emit(eventName) 触发事件  

```
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:incre="incrementTotal"></button-counter>
  <button-counter v-on:incre="incrementTotal"></button-counter>
</div>
// 使用v-on监听自定义事件incre

Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('incre') // 使用$emit触发incre事件
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

使用修饰符.native可以在组件上监听原生事件

`<my-component v-on:click.native="doTheThing"></my-component>`

### Slots分发内容

假定 my-component 组件有下面模板：
```
<div>
  <h2>I'm the child title</h2>
  <slot>
    如果没有分发内容则显示我。
  </slot>
</div>
```
副组件模板：
```
<div>
  <h1>I'm the parent title</h1>
  <my-component>
    <p>This is some original content</p>
    <p>This is some more original content</p>
  </my-component>
</div>
```
渲染结果：
```
<div>
  <h1>I'm the parent title</h1>
  <div>
    <h2>I'm the child title</h2>
    <p>This is some original content</p>
    <p>This is some more original content</p>
  </div>
</div>
```
组件内的内容自动分发到solt标签里了

具名solt

组件中可以设置多个solt,使用name属性确定具体分配

假定我们有一个 app-layout 组件，它的模板为：
```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
父组件模版：
```
<app-layout>
  <h1 slot="header">Here might be a page title</h1>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <p slot="footer">Here's some contact info</p>
</app-layout>
```
渲染结果为：
```
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```
### 动态组件

多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 is 特性：
```
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})

<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```

keep-alive可以使切换出去的组件保留在内存中,避免重新渲染
```
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```

### 子组件索引

如果想在js中直接访问组件，可以使用ref为组件添加一个索引ID
```
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>

var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```
当 ref 和 v-for 一起使用时， ref 是一个数组或对象，包含相应的子组件。

ref只是一种应急方案，应该尽量避免使用

## 8、过渡效果

Vue在插入、更新或移除DOM时，提供了不同的方式应用过渡效果。

### 但元素/组件的过渡

Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡

* 条件渲染 （使用 v-if）
* 条件展示 （使用 v-show）
* 动态组件
* 组件根节点
```
// HTML
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>

// js
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})

// css
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
```
### 过渡的-css-类名

1. v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。

2. v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。

3. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。

4. v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。

![过渡图示](images/transition.png)

### css过渡

```
// HTML
<div id="example-1">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>

// js
new Vue({
  el: '#example-1',
  data: {
    show: true
  }
})

// css
// css过渡属性
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}

// animation帧动画
@keyframes slide-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes slide-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
slide-fade-enter-active {
  animation: slide-fade-in .5s;
}
slide-fade-leave-active {
  animation: slide-fade-out .5s;
}
```

1. 把需要过渡的元素放在transition标签里（transition标签不会被渲染），并添加name名称。
2. 把name名称作为前缀，作为各个过渡阶段的类名。
3. 过渡阶段也可以使用css过渡属性也可以使用animation属性(帧动画)。

### 自定义过渡类名

过渡的类名不仅仅限定于v-enter,v-enter-active,v-leave,v-leave-active几种，过渡类名是可以自定义的

通过以下特性来自定义过渡类名：

* enter-class
* enter-active-class
* leave-class
* leave-active-class
```
 <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
```
上面v-enter-active替换为了animated tada，v-leave-active替换为了animated bounceOutRight

vue可以自动监听识别使用的是transition过渡还是animation过渡，如果只想使用某一种过渡，可以使用type属性设定

`<transition type="animation"></transition>`

### JavaScript钩子

除了使用css动画，也可以直接使用js动画
```
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

// js
methods: {
  // --------
  // 进入中
  // --------
  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // --------
  // 离开时
  // --------
  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```
注意：

1. 当只用 JavaScript 过渡的时候， 在 enter 和 leave 中，回调函数 done 是必须的 。 否则，它们会被同步调用，过渡会立即完成。
2. 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

### 初始渲染的过渡

可以通过 appear 特性设置节点的在初始渲染的过渡
```
<transition appear>
  <!-- ... -->
</transition>
```

### 多个元素过渡

多个元素过渡需要为每个元素设置不同的key属性
```
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```
### 过渡模式

Vue 提供了 过渡模式

* in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
* out-in: 当前元素先进行过渡，完成之后新元素过渡进入。
```
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```

### 列表过渡

* 同时渲染整个列表需要受用<transition-group>组件在。
* 不同于 <transition>， 它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 特性更换为其他元素。
* 元素 一定需要 指定唯一的 key 特性值。
```
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>

new Vue({
  el: '#list-demo',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  }
})

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
```
添加元素时或移除元素时，周围元素过渡不够平滑，解决这个问题需要使用v-move属性。
```
// css
.list-move {
  transition: all 1s;
}
```