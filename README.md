## CanvasXML


**CanvasXML can make the develop of canvas quickly and easyily, it use the React grammar to devleop component and manager component state**

**CanvasXML可以使canvas的开发快速方便，它使用React语法来开发组件和管理组件状态**

**For example, use below code, it will render a rect on the page**

**例如，使用以下代码，它将在页面上呈现一个矩形**

``` html
  <rect isolated fill fillStyle='rgba(200, 145, 25, 1)' x={125} y={125} w={100} h={100} />
```

---

### CanvasXML技术特点与解决痛点

- **使用React原生特性与语法，使用JSX标签写法定义布局与视图**

- **使用层级方位定义视图位置，更利于开发包裹类组件**

- **解决canvas开发状态管理困难: 使用Hooks函数定义组件状态**

- **解决canvas开发状态定义组件繁琐: 使用Function函数定义可复用组件**

- **解决canvas视图定位难以追踪: 使用类CSS的扩展样式属性Location定义标签方位**

---

### Github: https://github.com/wvOoOvw/20240601x001

**Github will keep the lastest update of project**

**Github 会保持最新的项目更新状态**

---

### NPM: https://www.npmjs.com/package/canvasxml

- **NPM Install 安装**
  - **create a webpack project, or you can download this project for use the webpack config and script config**
  - **创建一个wepack项目，或者你可以下载本仓库并使用本仓库的webpack配置以及script配置**

  - **run script 执行命令: npm i canvasxml**

  - **notice: webpack need add the config "babel-loader @babel/preset-react"**
  - **注意: webpack需要添加配置项"babel-loader @babel/preset-react"**

---

### Component Demo Examples 组件演示案例

- **Arc 圆形组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Arc)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Arc)

- **Clip 截屏渲染组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Clip)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Clip)

- **CoordinateHelper 坐标系组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/CoordinateHelper)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/CoordinateHelper)

- **Image 图片组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Image)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Image)

- **Layout 布局组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Layout)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Layout)

- **Rect 矩形组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Rect)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Rect)

- **Text 文本组件**
  - [**Preview Page 查看预览**](https://wvooovw.github.io/20240601x001/exampled/Text)
  - [**Doc 查看文档**](https://github.com/wvOoOvw/20240601x001/tree/master/example/Text)

---

### How To Run 如何运行项目

- **run script (optional) 执行命令（可选）: nvm install 16.14.0 && nvm use 16.14.0**

- **run script 执行命令: npm install**

- **run script 执行命令: npm run start path=CoordinateHelper**
  - **You could check the example dir and change the path value with the inner dir name**
  - **你可以查看example目录并使用目录下文件夹名称修改path值**

---

### TODO 代办事项

- [ ] **index.d.ts: 增加package包语法提示**

- [x] **react support function component: 支持function组件语法**

- [x] **react hooks useState: 支持function组件hook useState**

- [x] **react hooks useRef: 支持function组件hook useRef**

- [x] **react hooks useEffect: 支持function组件hook useEffect**

- [x] **react hooks useMemo: 支持function组件hook useMemo**

- [x] **react hooks useCallback: 支持function组件hook useCallback**

- [x] **react hooks useEffectImmediateLoopEnd: 支持function组件hook useEffectImmediateLoopEnd**

- [x] **react hooks useEffectImmediate: 支持function组件hook useEffectImmediate**

- [x] **react batch update: 更新多个状态时保持单次渲染**

- [x] **react time limit update: 更新多次时保持最低更新时间间隔**

- [ ] **react support class component: 支持class组件语法**

- [ ] **react memo update: 更新memo的节点时复用上次节点，不再重新执行组件函数**

- [ ] **react lazy component: 支持懒加载式组件**

- [ ] **react-dom tree diff: 标签树目前全量渲染，需改为树形对比**

- [ ] **react-dom component supply: 开发更多的原生标签**

- [ ] **react status listen: react更新状态时需增加监听器，用于开发的追踪**

- [ ] **threejs: 增加threejs的组件**

- [ ] **vue: 增加vue渲染器以及vue组件**

- [ ] **react babel loader: 抽离babel到本地，并做定制化修改**

- [ ] **chunk package: 分离package为React、ReactDOM、Location等等子库**

- [ ] **low code: 增加低代码搭建系统**

- [ ] **game energin: 增加游戏引擎系统**