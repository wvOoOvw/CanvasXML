## Rect Component 矩形组件

### Type: Origin Component 原生型组件

### How to use 如何使用

``` html
    <!-- 绘制一个以[125, 125]方位为左上角点绘制宽度为100、高度为100、带有40单位的四个弧度角的矩形图案 -->
    <rect save fill fillStyle='rgba(255, 0, 0, 1)' x={125} y={125} w={100} h={100} radius={40}/>
```

### Component Property

- **save**
  - **boolean**
  - **开启后：组件自存储一份画布样式状态，通常用于样式隔离**

- **fill**
  - **boolean**
  - **开启后：使用填充模式绘制**

- **fill**
  - **boolean**
  - **开启后：使用填充模式绘制**

- **fillStyle**
  - **string**
  - **设置填充模式的颜色**

- **x**
  - **number**
  - **矩形左上角x轴坐标位置**

- **y**
  - **number**
  - **矩形左上角y轴坐标位置**

