## CanvasXML

**CanvasXML 可以使用标签渲染出图形 同时支持React、Vue语法开发 更快、更简单、更智能的去开发**

**For example, use below code, it will render a rect on the page**

**例如，使用以下代码，它将在页面上呈现一个矩形**

```html
  <rect beginPath fill fillStyle='rgba(200, 145, 25, 1)' x={125} y={125} w={100} h={100} />
```

---

### CanvasXML的支持

|   **canvas2D**   | **canvasWebGL** | **canvasThreeJS** |
| :---------------: | :---------------: | :---------------: |
| **Tag Grammar** |     Developing    |        Developing       |
| **React Grammar** |     Done    |        Developing       |
|  **Vue Grammar**  |      Developing       |        Developing       |

---

### Github: [**https://github.com/wvOoOvw/20240601x001**](https://github.com/wvOoOvw/20240601x001)

**Github will keep the lastest update of project**

**Github 会保持最新的项目更新状态**

---

### NPM: [**https://www.npmjs.com/package/canvasxml**](https://www.npmjs.com/package/canvasxml)

- **NPM Install 安装**
  - **create a webpack project, or you can download this project for use the webpack config and script config**
  - **创建一个wepack项目，或者你可以下载本仓库并使用本仓库的webpack配置以及script配置**
  - **run script 执行命令: npm i canvasxml**
  - **notice: webpack need add the config "babel-loader @babel/preset-react"**
  - **注意: webpack需要添加配置项"babel-loader @babel/preset-react"**

---

### React Component Demo Examples 组件演示案例

- **Arc 圆形组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Arc)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Arc)
- **Clip 截屏渲染组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Clip)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Clip)
- **CoordinateHelper 坐标系组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_CoordinateHelper)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_CoordinateHelper)
- **Image 图片组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Image)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Image)
- **Layout 布局组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Layout)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Layout)
- **Rect 矩形组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Rect)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Rect)
- **Text 文本组件**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Demo_Text)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Demo_Text)

---

### React Application Demo Examples 实践演示案例

- **Application_TouchMusic 案例**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Application_TouchMusic)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Application_TouchMusic)
- **Application_TouchMusic 案例**

  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Application_TouchMusic)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Application_TouchMusic)

---

### How To Run 如何运行项目

- **run script (optional) 执行命令（可选）: nvm install 16.14.0 && nvm use 16.14.0**
- **run script 执行命令: npm install**
- **run script 执行命令: npm run start path=CoordinateHelper**

  - **You could check the example dir and change the path value with the inner dir name**
  - **你可以查看example目录并使用目录下文件夹名称修改path值**

---

### Supported 目前已支持的

- [ ] **index.d.ts: 增加package包语法提示**
- [X] **react support function component: 支持function组件语法**
- [X] **react hooks useState: 支持function组件hook useState**
- [X] **react hooks useRef: 支持function组件hook useRef**
- [X] **react hooks useEffect: 支持function组件hook useEffect**
- [X] **react hooks useMemo: 支持function组件hook useMemo**
- [X] **react hooks useCallback: 支持function组件hook useCallback**
- [X] **react hooks useEffectImmediateLoopEnd: 支持function组件hook useEffectImmediateLoopEnd**
- [X] **react hooks useEffectImmediate: 支持function组件hook useEffectImmediate**
- [X] **react batch update: 更新多个状态时保持单次渲染**
- [X] **react time limit update: 更新多次时保持最低更新时间间隔**
- [ ] **react support class component: 支持class组件语法**
- [X] **react memo update: 更新memo的节点时复用上次节点，不再重新执行组件函数**
- [ ] **react lazy component: 支持懒加载式组件**
- [ ] **react-dom tree diff: 标签树目前全量渲染，需改为树形对比**
- [ ] **react-dom component supply: 开发更多的原生标签**
- [ ] **react status listen: react更新状态时需增加监听器，用于开发的追踪**
- [ ] **threejs: 增加threejs的组件**
- [ ] **vue: 增加vue渲染器以及vue组件**
- [ ] **react babel loader: 抽离babel到本地，并做定制化修改**
- [ ] **chunk package: 分离package为React、ReactDOM、Location等等子库**
- [ ] **visible build app: 增加可视化搭建系统**
