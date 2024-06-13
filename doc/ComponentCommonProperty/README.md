## Component Common Property 组件通用属性

#### Special Property 特殊属性

- **isolated**
  - **boolean**
  - **默认不开启**
  - **开启后：组件自存储一份画布图形/样式状态进而不会影响到子组件**

- **beginPath**
  - **boolean**
  - **默认不开启**
  - **开启后：组件绘制前清空先前绘制的几何路径**

#### Canvas Property 画布属性

**Below Propertys are same as canvas property**
**下面的属性与canvas属性相同**

- **globalAlpha**
  - **boolean**
  - **默认不开启**
  - **开启后：组件绘制前清空先前绘制的几何路径**

- **fill**
  - **boolean**
  - **默认不开启**
  - **开启后：使用填充模式绘制**

- **fillStyle**
  - **string**
  - **设置填充绘制的颜色**

- **stroke**
  - **boolean**
  - **默认不开启**
  - **开启后：使用线条模式绘制/在闭合图形下会描边绘制**

- **strokeStyle**
  - **string**
  - **设置线条绘制的颜色**

- **font**
  - **string**
  - **设置文字的样式**

#### Event Property 事件属性

- **onClick**
  - **function**
  - **设置点击事件**

- **onTouchStart**
  - **function**
  - **设置触控开始事件**

- **onTouchMove**
  - **function**
  - **设置触控移动事件**

- **onTouchEnd**
  - **function**
  - **设置触控结束事件**

- **onMouseUp**
  - **function**
  - **设置鼠标点击开始事件**

- **onMouseMove**
  - **function**
  - **设置鼠标移动事件**

- **onMouseUp**
  - **function**
  - **设置鼠标点击结束事件**

- **onDrag**
  - **function**
  - **设置拖动事件/此事件为复合事件 包含多种操作回调与属性**

- **onDragEnable**
  - **boolean**
  - **默认不开启**
  - **开启后：onDrag事件生效**
