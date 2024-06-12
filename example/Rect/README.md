## Rect Component 矩形组件


### Origin Type 原生型（使用小写字符串XML标签可直接使用）

---

### How To Use 如何使用

``` html
    <!-- 绘制一个以[125, 125]方位为左上角点绘制宽度为100、高度为100、带有40单位的四个弧度角的矩形图案 -->
    <rect isolated fill beginPath fillStyle='rgba(255, 0, 0, 1)' x={125} y={125} w={100} h={100} radius={40}/>
```

---

### Component Property

- **x**
  - **number**
  - **矩形左上角x轴坐标位置**

- **y**
  - **number**
  - **矩形左上角y轴坐标位置**

- **w**
  - **number**
  - **矩形宽度**

- **h**
  - **number**
  - **矩形高度**

- **radius**
  - **number | array**
  - **矩形四角弧度 传入数字时同时设置四个角 传入数组时依次设置四个角**

