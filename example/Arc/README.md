## Arc Component 圆形组件


### Origin Type 原生型（使用小写字符串XML标签可直接使用）

---

### How To Use 如何使用

``` html
    <!-- 绘制一个以[125, 125]方位为圆心、40为半径、起始角度0deg、终点角度2PI、顺时针方向、颜色为红色的圆形图案 -->
    <arc save fill fillStyle='rgba(255, 0, 0, 1)' x={125} y={125} radius={40} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}/>
```

---

### Component Property

- **save**
  - **boolean**
  - **开启后：组件自存储一份画布样式状态，通常用于样式隔离**

- **fill**
  - **boolean**
  - **开启后：使用填充模式绘制**

- **fillStyle**
  - **string**
  - **设置填充模式的颜色**

- **x**
  - **number**
  - **圆心x轴坐标位置**

- **y**
  - **number**
  - **圆心y轴坐标位置**

