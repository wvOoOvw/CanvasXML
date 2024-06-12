(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasXML"] = factory();
	else
		root["CanvasXML"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  yX: () => (/* reexport */ CanvasXML_Position),
  q_: () => (/* reexport */ CanvasXML_React),
  "default": () => (/* binding */ package_0)
});

// UNUSED EXPORTS: ReactDom, ReactDomComponent, ReactPlugin

;// CONCATENATED MODULE: ./package/CanvasXML.Position.js
const l = position => position.x;
const r = position => position.x + position.w;
const t = position => position.y;
const b = position => position.y + position.h;
const wireframe = position => Object({
  ...position,
  l: l(position),
  r: r(position),
  t: t(position),
  b: b(position)
});
const cx = position => position.x + position.w / 2;
const cy = position => position.y + position.h / 2;
const ltx = position => position.x;
const lty = position => position.y;
const lbx = position => position.x;
const lby = position => position.y + position.h;
const rtx = position => position.x + position.w;
const rty = position => position.y;
const rbx = position => position.x + position.w;
const rby = position => position.y + position.h;
const point = position => Object({
  ...position,
  cx: cx(position),
  cy: cy(position),
  ltx: ltx(position),
  lty: lty(position),
  lbx: lbx(position),
  lby: lby(position),
  rtx: rtx(position),
  rty: rty(position),
  rbx: rbx(position),
  rby: rby(position)
});
const vmin = position => Math.min(position.w, position.h) * 0.01;
const vmax = position => Math.max(position.w, position.h) * 0.01;
const vw = position => position.w * 0.01;
const vh = position => position.h * 0.01;
const viewport = position => Object({
  ...position,
  vmin: vmin(position),
  vmax: vmax(position),
  vw: vw(position),
  vh: vh(position)
});
const fromcenter = position => Object({
  ...position,
  x: position.cx - position.w / 2,
  y: position.cy - position.h / 2
});
const coordinate = position => Object({
  x: position.x,
  y: position.y,
  w: position.w,
  h: position.h,
  ...wireframe(position),
  ...point(position),
  ...viewport(position)
});
const coordinatefromcenter = position => coordinate(fromcenter(position));
const add = positions => positions.reduce((t, i) => Object({
  x: t.x + (i.x || 0),
  y: t.y + (i.y || 0),
  w: t.w + (i.w || 0),
  h: t.h + (i.h || 0)
}), {
  x: 0,
  y: 0,
  w: 0,
  h: 0
});
const box = positions => {
  const point = positions.reduce((t, i) => {
    return {
      boxt: t.boxt ? Math.min(t.boxt, i.y) : i.y,
      boxb: t.boxb ? Math.min(t.boxb, i.y + i.h) : i.y + i.h,
      boxl: t.boxl ? Math.min(t.boxl, i.x) : i.x,
      boxr: t.boxr ? Math.min(t.boxr, i.x + i.w) : i.x + i.w
    };
  }, {
    boxt: undefined,
    boxb: undefined,
    boxl: undefined,
    boxr: undefined
  });
  return {
    x: point.boxl,
    y: point.boxt,
    w: point.boxr - point.boxl,
    h: point.boxb - point.boxt
  };
};
const wmin = positions => positions.reduce((t, i) => i.w ? Math.min(i.w, t) : t, 0);
const wmax = positions => positions.reduce((t, i) => i.w ? Math.max(i.w, t) : t, 0);
const hmin = positions => positions.reduce((t, i) => i.h ? Math.min(i.h, t) : t, 0);
const hmax = positions => positions.reduce((t, i) => i.h ? Math.max(i.h, t) : t, 0);
const pointcover = (position, point) => point.x >= position.x && point.x <= position.x + position.w && point.y >= position.y && point.y <= position.y + position.h;
const Position = {
  l,
  r,
  t,
  b,
  wireframe,
  cx,
  cy,
  ltx,
  lty,
  lbx,
  lby,
  rtx,
  rty,
  rbx,
  rby,
  point,
  vmin,
  vmax,
  vw,
  vh,
  viewport,
  fromcenter,
  coordinate,
  coordinatefromcenter,
  add,
  box,
  wmin,
  wmax,
  hmin,
  hmax,
  pointcover
};
/* harmony default export */ const CanvasXML_Position = (Position);
;// CONCATENATED MODULE: ./package/CanvasXML.React.js
var contextQueue = [];
var contextQueueRecordCount = [];
var renderFrameTimeDiff = 0;
var renderFrameTimeDiffMax = 0;
var renderQueueRoot = {
  alternate: 'root',
  children: []
};
var renderQueueInRender = false;
var renderQueueShouldRender = false;
var renderQueueCallback = [];
var renderQueueNode = undefined;
var renderQueueNodeChildrenIndex = 0;
var renderQueueHooks = [];
var renderQueueHook = undefined;
var renderNode = renderQueueRoot;
var renderListener = [];
const destory = node => {
  node.hooks.filter(i => i.type === useEffect && i.effectPrevious && typeof i.effectPrevious === 'function').forEach(i => renderQueueCallback.push(() => i.effectPrevious()));
  node.hooks.filter(i => i.type === useEffectImmediate && i.effectPrevious && typeof i.effectPrevious === 'function').forEach(i => i.effectPrevious());
  node.children.forEach(i => destory(i));
};
const componentRunBefore = node => {
  renderNode = node;
  renderQueueNode.children[renderQueueNodeChildrenIndex] = node;
  renderQueueNode = node;
  renderQueueNodeChildrenIndex = 0;
  contextQueueRecordCount.push(0);
  renderQueueHooks.push({
    hooks: node.hooks,
    index: 0
  });
  renderQueueHook = renderQueueHooks[renderQueueHooks.length - 1];
};
const componentRunAfter = node => {
  renderNode = node;
  node.children.filter((i, index) => index > renderQueueNodeChildrenIndex || index === renderQueueNodeChildrenIndex).forEach(i => destory(i));
  node.children = node.children.filter((i, index) => index < renderQueueNodeChildrenIndex);
  renderQueueNode = node.parent;
  renderQueueNodeChildrenIndex = renderQueueNode.children.findIndex(i => i === node) + 1;
  contextQueue = contextQueue.filter((i, index) => index < contextQueue.length - contextQueueRecordCount[contextQueueRecordCount.length - 1]);
  contextQueueRecordCount = contextQueueRecordCount.filter((i, index) => index < contextQueueRecordCount.length - 1);
  renderQueueHooks = renderQueueHooks.filter((i, index) => index < renderQueueHooks.length - 1);
  renderQueueHook = renderQueueHooks[renderQueueHooks.length - 1];
  node.hooks.filter(i => i.type === useEffectLoopEnd && i.effect && typeof i.effect === 'function').forEach(i => i.effect());
};
const compoment = (alternate, props, callback) => {
  var node;
  var key = Object(props).key;
  var ref = Object(props).ref;
  var equalIndex = renderQueueNode.children.findIndex(i => i.key !== undefined && i.key === key && i.alternate === alternate);
  if (equalIndex !== -1) {
    renderQueueNode.children.splice(renderQueueNodeChildrenIndex, 0, renderQueueNode.children.splice(equalIndex, 1)[0]);
  }
  if (node === undefined && renderQueueNode.children[renderQueueNodeChildrenIndex] && renderQueueNode.children[renderQueueNodeChildrenIndex].alternate === alternate && renderQueueNode.children[renderQueueNodeChildrenIndex].key === key) {
    node = renderQueueNode.children[renderQueueNodeChildrenIndex];
  }
  if (node === undefined) {
    node = {
      key: key,
      alternate: alternate,
      children: [],
      hooks: [],
      props: props
    };
  }
  if (node !== renderQueueNode.children[renderQueueNodeChildrenIndex] && renderQueueNode.children[renderQueueNodeChildrenIndex]) {
    destory(renderQueueNode.children[renderQueueNodeChildrenIndex]);
  }
  node.parent = renderQueueNode;
  componentRunBefore(node);
  callback(node.alternate(props));
  componentRunAfter(node);
  if (typeof ref === 'function') ref(node);
};
const createElement = (alternate, props, ...children) => {
  return {
    alternate,
    props,
    children
  };
};
const Fragment = props => {
  return props.children;
};
const mount = (listener, frameTimeDiffMax) => {
  renderListener.push(listener);
  renderFrameTimeDiffMax = frameTimeDiffMax;
  return CanvasXML_React_React;
};
const render = () => {
  renderQueueInRender = true;
  renderFrameTimeDiff = performance.now();
  renderQueueNode = renderQueueRoot;
  renderQueueNodeChildrenIndex = 0;
  renderListener.forEach(i => i());
  while (renderQueueCallback.length !== 0) renderQueueCallback.shift()();
  const renderRequestAnimationFrame = () => {
    requestAnimationFrame(() => {
      const now = performance.now();
      if (now - renderFrameTimeDiff < renderFrameTimeDiffMax) renderRequestAnimationFrame();
      if (now - renderFrameTimeDiff > renderFrameTimeDiffMax || now - renderFrameTimeDiff === renderFrameTimeDiffMax) renderQueueInRender = false;
      if (now - renderFrameTimeDiff > renderFrameTimeDiffMax || now - renderFrameTimeDiff === renderFrameTimeDiffMax) render();
    });
  };
  if (renderQueueShouldRender) renderRequestAnimationFrame();
  if (renderQueueShouldRender === false) renderQueueInRender = false;
  renderQueueShouldRender = false;
};
const hook = callback => {
  return (...props) => {
    try {
      if (renderQueueHook.hooks[renderQueueHook.index] !== undefined && renderQueueHook.hooks[renderQueueHook.index].type !== callback) {
        throw Error(callback);
      }
      return callback(...props);
    } finally {
      renderQueueHook.hooks[renderQueueHook.index].type = callback;
      renderQueueHook.index = renderQueueHook.index + 1;
    }
  };
};
const contextProvider = value => {
  contextQueue.push(value);
  contextQueueRecordCount[contextQueueRecordCount.length - 1] = contextQueueRecordCount[contextQueueRecordCount.length - 1] + 1;
};
const contextProviderExtend = value => {
  contextQueue.push({
    ...contextQueue[contextQueue.length - 1],
    ...value
  });
  contextQueueRecordCount[contextQueueRecordCount.length - 1] = contextQueueRecordCount[contextQueueRecordCount.length - 1] + 1;
};
const shouldRender = () => {
  if (renderQueueInRender === true) renderQueueShouldRender = true;
  if (renderQueueInRender === false) requestAnimationFrame(render);
};
const useContext = () => {
  return contextQueue[contextQueue.length - 1];
};
const useState = state => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    state: state
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  const setState = state => {
    if (typeof state === 'function') hook.state = state(hook.state);
    if (typeof state !== 'function') hook.state = state;
    if (renderQueueInRender === true) renderQueueShouldRender = true;
    if (renderQueueInRender === false) requestAnimationFrame(render);
  };
  return [hook.state, setState];
};
const useRef = current => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    current: current
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  return hook;
};
const useEffect = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueCallback.push(() => hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined);
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueCallback.push(() => hook.effectPrevious = effect());
  hook.dependence = dependence;
};
const useEffectImmediate = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effectPrevious = effect();
  hook.dependence = dependence;
};
const useEffectLoopEnd = (effect, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    effect: effect
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.effect = effect;
  hook.dependence = dependence;
};
const useMemo = (memo, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    memo: memo
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.memo = memo();
  hook.dependence = dependence;
  return hook.memo;
};
const useCallback = (callback, dependence) => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    callback: callback
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) hook.callback = callback;
  hook.dependence = dependence;
  return hook.callback;
};
const CanvasXML_React_React = {
  renderNode: () => renderNode,
  mount,
  render,
  compoment,
  createElement,
  Fragment,
  contextProvider,
  contextProviderExtend,
  shouldRender,
  useContext,
  useState,
  useRef,
  useEffect,
  useEffectLoopEnd,
  useEffectImmediate,
  useMemo,
  useCallback
};
Object.keys(CanvasXML_React_React).filter(i => [useState, useRef, useEffect, useEffectLoopEnd, useEffectImmediate, useMemo, useCallback].includes(CanvasXML_React_React[i])).forEach(i => CanvasXML_React_React[i] = hook(CanvasXML_React_React[i]));
/* harmony default export */ const CanvasXML_React = (CanvasXML_React_React);
;// CONCATENATED MODULE: ./package/CanvasXML.React.Plugin.js

const useStateFlow = props => {
  const ref = CanvasXML_React.useRef([]);
  const getState = index => {
    return ref.current[index === undefined ? ref.current.length - 1 : index];
  };
  const useState = state => {
    CanvasXML_React.useEffectImmediate(() => ref.current = [...ref.current, state], [state]);
    CanvasXML_React.useEffectImmediate(() => () => ref.current = ref.current.filter(i => i !== state), [state]);
  };
  return {
    getState,
    useState
  };
};
const useAnimationCount = props => {
  const [animationCount, setAnimationCount] = CanvasXML_React.useState(props.count);
  const [animationDelay, setAnimationDelay] = CanvasXML_React.useState(props.delay);
  const [animationFlow, setAnimationFlow] = CanvasXML_React.useState(props.flow);
  CanvasXML_React.useEffect(() => {
    if (animationDelay !== 0) setAnimationDelay(animationDelay - 1);
  });
  CanvasXML_React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.min || animationCount < props.min)) setAnimationFlow(0);
    if (props.play === true && animationDelay === 0 && props.reverse === true && (animationCount === props.max || animationCount > props.max)) setAnimationFlow(1);
  });
  CanvasXML_React.useEffect(() => {
    if (props.play === true && animationDelay === 0 && animationFlow === 0 && animationCount < props.max) setAnimationCount(animationCount + props.rate);
    if (props.play === true && animationDelay === 0 && animationFlow === 1 && animationCount > props.min) setAnimationCount(animationCount - props.rate);
  });
  return {
    animationCount,
    setAnimationCount,
    animationDelay,
    setAnimationDelay,
    animationFlow,
    setAnimationFlow
  };
};
const useImage = props => {
  const image = CanvasXML_React.useMemo(() => new Image(), []);
  CanvasXML_React.useEffectImmediate(() => image.src = props.src, [props.src]);
  CanvasXML_React.useEffectImmediate(() => image.onload = () => props.onload ? props.onload() : undefined, [props.onload]);
  return {
    image
  };
};
const useResourceReload = props => {
  const [resourceCount, setResourceCount] = CanvasXML_React.useState(0);
  const [resourceLoading, setResourceLoading] = CanvasXML_React.useState(true);
  CanvasXML_React.useEffectImmediate(() => {
    setResourceCount(0);
    setResourceLoading(true);
    props.resource.forEach(i => fetch(i).then(() => setResourceCount(pre => pre + 1)));
  }, [...props.resource]);
  CanvasXML_React.useEffectImmediate(() => setResourceLoading(resourceCount < props.resource.length), [resourceCount]);
  return {
    resourceCount,
    resourceLoading
  };
};
const useScrollControl = props => {
  const enableScrollX = props.enableScrollX;
  const enableScrollY = props.enableScrollY;
  const maxScrollX = props.maxScrollX;
  const maxScrollY = props.maxScrollY;
  const position = props.position;
  const [scrollX, setScrollX] = React.useState(props.defaultScrollX);
  const [scrollY, setScrollY] = React.useState(props.defaultScrollY);
  const onScroll = (x, y) => {
    if (enableScrollX) {
      var rx = scrollX + x;
      if (rx > maxScrollX) rx = maxScrollX;
      if (rx < 0) rx = 0;
      setScrollX(rx);
    }
    if (enableScrollY) {
      var rx = scrollY + x;
      if (rx > maxScrollY) rx = maxScrollY;
      if (rx < 0) rx = 0;
      setScrollX(rx);
    }
  };
  const onChange = () => {
    if (params.status === 'afterMove') onScroll(params.changedX, params.changedY);
  };
  ReactPlugin.useDragControlMouse({
    onChange: React.useCallback(onChange, []),
    enable: true,
    useEventListener: props.useEventListener,
    mousedownOption: props.position,
    mousemoveOption: props.position,
    mouseupOption: props.position,
    mousedownOption: props.position
  });
  return {
    setScrollX,
    setScrollY
  };
};
const ReactPlugin = {
  useStateFlow,
  useAnimationCount,
  useImage,
  useResourceReload
};
/* harmony default export */ const CanvasXML_React_Plugin = (ReactPlugin);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Component.CoordinateHelper.js

const App = props => {
  const coordinate = CanvasXML_Position.coordinate({
    x: props.x,
    y: props.y,
    w: props.w,
    h: props.h
  });
  return new Array(Math.ceil(coordinate.vmax * 100 / props.gap / 2)).fill().map((i, index) => {
    if (index === 0) {
      return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.x,
        y: coordinate.cy,
        w: coordinate.vmax * 100,
        h: coordinate.vmax * 0.1,
        globalAlpha: 0.5,
        fillStyle: props.color
      }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.cx,
        y: coordinate.y,
        w: coordinate.vmax * 0.1,
        h: coordinate.vmax * 100,
        globalAlpha: 0.5,
        fillStyle: props.color
      }));
    }
    if (index !== 0) {
      return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.x,
        y: coordinate.cy + props.gap * index,
        w: coordinate.vmax * 100,
        h: coordinate.vmax * 0.1,
        globalAlpha: 0.25,
        fillStyle: props.color
      }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.x,
        y: coordinate.cy - props.gap * index,
        w: coordinate.vmax * 100,
        h: coordinate.vmax * 0.1,
        globalAlpha: 0.25,
        fillStyle: props.color
      }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.cx + props.gap * index,
        y: coordinate.y,
        w: coordinate.vmax * 0.1,
        h: coordinate.vmax * 100,
        globalAlpha: 0.25,
        fillStyle: props.color
      }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
        isolated: true,
        beginPath: true,
        fill: true,
        x: coordinate.cx - props.gap * index,
        y: coordinate.y,
        w: coordinate.vmax * 0.1,
        h: coordinate.vmax * 100,
        globalAlpha: 0.25,
        fillStyle: props.color
      }));
    }
  });
};
/* harmony default export */ const CanvasXML_ReactDom_Component_CoordinateHelper = (App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Component.js

const ReactDomComponent = {
  CoordinateHelper: CanvasXML_ReactDom_Component_CoordinateHelper
};
/* harmony default export */ const CanvasXML_ReactDom_Component = (ReactDomComponent);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Event.js


var events = [];
const addEventListener = (type, callback) => {
  if (callback) events = [...events, {
    type,
    callback
  }];
};
const removeEventListener = (type, callback) => {
  if (callback) events = events.filter(i => i.type !== type || i.callback !== callback);
};
const useEventListener = (type, callback) => {
  CanvasXML_React.useEffectImmediate(() => {
    if (callback) addEventListener(type, callback);
  }, [type, callback]);
  CanvasXML_React.useEffectImmediate(() => {
    if (callback) return () => removeEventListener(type, callback);
  }, [type, callback]);
};
const clearEventListener = () => {
  events = [];
};
const execute = (e, type) => {
  const exe = events.filter(i => i.type === type).sort((a, b) => {
    const a_ = a.option === undefined || a.option.priority === undefined ? 0 : a.option.priority;
    const b_ = b.option === undefined || b.option.priority === undefined ? 0 : b.option.priority;
    return b_ - a_;
  });
  var stopPropagation = false;
  exe.forEach(i => {
    var x;
    var y;
    if (window.ontouchstart === undefined) x = e.pageX * CanvasXML_ReactDom.dpr();
    if (window.ontouchstart === undefined) y = e.pageY * CanvasXML_ReactDom.dpr();
    if (window.ontouchstart !== undefined) x = [...e.changedTouches].map(i => i * CanvasXML_ReactDom.dpr());
    if (window.ontouchstart !== undefined) y = [...e.changedTouches].map(i => i * CanvasXML_ReactDom.dpr());
    const re = {
      native: e,
      x: x,
      y: y,
      stopPropagation: () => stopPropagation = true
    };
    if (stopPropagation === false) i.callback(re);
  });
};
const addEventListenerWithCanvas = canvas => {
  new Array('click', 'touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup').forEach(type => {
    canvas.addEventListener(type, e => execute(e, type), {
      passive: true
    });
  });
};
const ReactDomEvent = {
  addEventListener,
  removeEventListener,
  clearEventListener,
  useEventListener,
  addEventListenerWithCanvas
};
/* harmony default export */ const CanvasXML_ReactDom_Event = (ReactDomEvent);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Event.Drag.js


const useDragControlMouse = props => {
  const positionOrigin = CanvasXML_React.useRef();
  const positionTarget = CanvasXML_React.useRef();
  const onChange = CanvasXML_React.useCallback(params => {
    if (props.onChange) props.onChange(params);
  }, [props.onChange]);
  const onStart = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    const x = e.x;
    const y = e.y;
    positionOrigin.current = {
      x,
      y
    };
    positionTarget.current = {
      x,
      y
    };
    const changedX = 0;
    const changedY = 0;
    const continuedX = 0;
    const continuedY = 0;
    onChange({
      type: 'mouse',
      status: 'afterStart',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onMove = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    positionTarget.current = {
      x,
      y
    };
    onChange({
      type: 'mouse',
      status: 'afterMove',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onEnd = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = x - positionTarget.current.x;
    const changedY = y - positionTarget.current.y;
    const continuedX = positionTarget.current.x - positionOrigin.current.x;
    const continuedY = positionTarget.current.y - positionOrigin.current.y;
    onChange({
      type: 'mouse',
      status: 'beforeEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
    positionOrigin.current = undefined;
    positionTarget.current = undefined;
    onChange({
      type: 'mouse',
      status: 'afterEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  return {
    onStart,
    onMove,
    onEnd
  };
};
const useDragControlTouch = props => {
  const positionOrigin = CanvasXML_React.useRef();
  const positionTarget = CanvasXML_React.useRef();
  const onChange = CanvasXML_React.useCallback(params => {
    if (props.onChange) props.onChange(params);
    if (props.onChangeMemo) props.onChangeMemo(params);
  }, [props.onChange]);
  const onStart = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    const x = e.x;
    const y = e.y;
    positionOrigin.current = {
      x,
      y
    };
    positionTarget.current = {
      x,
      y
    };
    const changedX = [];
    const changedY = [];
    const continuedX = [];
    const continuedY = [];
    x.forEach((x, index) => {
      changedX[index] = 0;
      continuedX[index] = 0;
    });
    y.forEach((y, index) => {
      changedY[index] = 0;
      continuedY[index] = 0;
    });
    onChange({
      type: 'touch',
      status: 'afterStart',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onMove = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = [];
    const changedY = [];
    const continuedX = [];
    const continuedY = [];
    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index];
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index];
    });
    y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index];
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index];
    });
    positionTarget.current = {
      x,
      y
    };
    onChange({
      type: 'touch',
      status: 'afterMove',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const onEnd = CanvasXML_React.useCallback(e => {
    if (props.enable === false) return;
    if (positionTarget.current === undefined) return;
    const x = e.x;
    const y = e.y;
    const changedX = [];
    const changedY = [];
    const continuedX = [];
    const continuedY = [];
    x.forEach((x, index) => {
      changedX[index] = x - positionTarget.current.x[index];
      continuedX[index] = positionTarget.current.x[index] - positionOrigin.current.x[index];
    });
    y.forEach((y, index) => {
      changedY[index] = y - positionTarget.current.y[index];
      continuedY[index] = positionTarget.current.y[index] - positionOrigin.current.y[index];
    });
    onChange({
      type: 'touch',
      status: 'beforeEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
    positionOrigin.current = undefined;
    positionTarget.current = undefined;
    onChange({
      type: 'touch',
      status: 'afterEnd',
      e,
      x,
      y,
      changedX,
      changedY,
      continuedX,
      continuedY
    });
  }, [props.enable, props.onChange]);
  const r = {
    onStart,
    onMove,
    onEnd
  };
  return r;
};
const useDragControl = (enable, onChange) => {
  if (window.ontouchstart === undefined) {
    var {
      onStart,
      onMove,
      onEnd
    } = useDragControlMouse({
      enable: enable,
      onChange: onChange
    });
    CanvasXML_ReactDom_Event.useEventListener('mousedown', onStart);
    CanvasXML_ReactDom_Event.useEventListener('mousemove', onMove);
    CanvasXML_ReactDom_Event.useEventListener('mouseup', onEnd);
  }
  if (window.ontouchstart !== undefined) {
    var {
      onStart,
      onMove,
      onEnd
    } = useDragControlTouch({
      enable: enable,
      onChange: onChange
    });
    CanvasXML_ReactDom_Event.useEventListener('touchstart', onStart);
    CanvasXML_ReactDom_Event.useEventListener('touchmove', onMove);
    CanvasXML_ReactDom_Event.useEventListener('touchend', onEnd);
  }
};
const ReactDomEventDrag = {
  useDragControl
};
/* harmony default export */ const CanvasXML_ReactDom_Event_Drag = (ReactDomEventDrag);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Arc.js



const CanvasXML_ReactDom_Tag_Component_Arc_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  CanvasXML_ReactDom.context().arc(props.x, props.y, props.radius, props.sAngle, props.eAngle, props.counterclockwise);
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Arc = (CanvasXML_ReactDom_Tag_Component_Arc_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Clip.js



const CanvasXML_ReactDom_Tag_Component_Clip_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  CanvasXML_ReactDom.context().clip();
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Clip = (CanvasXML_ReactDom_Tag_Component_Clip_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Image.js



const drawImage = (context, position, image) => {
  var {
    x,
    y,
    w,
    h
  } = position;
  if (image.width === 0 || image.height === 0) return;
  var sx = 0;
  var sy = 0;
  var sw = image.width;
  var sh = image.height;
  context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  return {
    sx,
    sy,
    sw,
    sh,
    x,
    y,
    w,
    h
  };
};
const drawImageClipMaxCenter = (context, position, image) => {
  var {
    x,
    y,
    w,
    h
  } = position;
  if (image.width === 0 || image.height === 0) return;
  var sx = 0;
  var sy = 0;
  var sw = image.width;
  var sh = image.height;
  const dw = w / sw;
  const dh = h / sh;
  if (dw > dh) {
    sy = sh - sh * dh / dw;
    sh = sh - (sh - sh * dh / dw);
  }
  if (dh > dw) {
    sx = sw - sw * dw / dh;
    sw = sw - (sw - sw * dw / dh);
  }
  context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  return {
    sx,
    sy,
    sw,
    sh,
    x,
    y,
    w,
    h
  };
};
const drawImageClipMinCenter = (context, position, image) => {
  var {
    x,
    y,
    w,
    h
  } = position;
  if (image.width === 0 || image.height === 0) return;
  var sx = 0;
  var sy = 0;
  var sw = image.width;
  var sh = image.height;
  const dw = w / sw;
  const dh = h / sh;
  if (dw > dh) {
    x = x + (w - w * dh / dw) / 2;
    w = w - (w - w * dh / dw);
  }
  if (dh > dw) {
    y = y + (h - h * dw / dh) / 2;
    h = h - (h - h * dw / dh);
  }
  context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  return {
    sx,
    sy,
    sw,
    sh,
    x,
    y,
    w,
    h
  };
};
const CanvasXML_ReactDom_Tag_Component_Image_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  var clipPosition;
  if (Boolean(props.image) === true) {
    if (Boolean(props.clipMaxCenter) === true) clipPosition = drawImageClipMaxCenter(CanvasXML_ReactDom.context(), {
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    }, props.image);
    if (Boolean(props.clipMinCenter) === true) clipPosition = drawImageClipMinCenter(CanvasXML_ReactDom.context(), {
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    }, props.image);
    if (Boolean(props.clipMaxCenter) !== true && Boolean(props.clipMinCenter) !== true) drawImage(CanvasXML_ReactDom.context(), {
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    }, props.image);
  }
  if (Boolean(clipPosition) === true && Boolean(props.onClipPosition) === true) props.onClipPosition(clipPosition);
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Image = (CanvasXML_ReactDom_Tag_Component_Image_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Layout.js




const horizontalForward = (layoutPosition, unitPositons) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalReverse = (layoutPosition, unitPositons) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + layoutPosition.w - i.w - x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalCenter = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Position.add(unitPositons).w;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / 2 + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Position.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length - 1) * index + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Position.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalAlignLeft = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x;
  });
  return unitPositons;
};
const horizontalAlignRight = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + layoutPosition.w;
  });
  return unitPositons;
};
const horizontalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - i.w) / 2;
  });
  return unitPositons;
};
const horizontalAccommodate = (layoutPosition, unitPositons) => {
  var x = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (x + i.w < layoutPosition.w || x + i.w === layoutPosition.w)) result.push(i);
    if (accommodated === false && (x + i.w < layoutPosition.w || x + i.w === layoutPosition.w)) x = x + i.w;
    if (x + i.w > layoutPosition.w) accommodated = true;
  });
  return {
    result: result,
    rest: unitPositons.filter((i, index) => index > result.length - 1)
  };
};
const verticalForward = (layoutPosition, unitPositons) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalReverse = (layoutPosition, unitPositons) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + layoutPosition.h - i.h - y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalCenter = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Position.add(unitPositons).h;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / 2 + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Position.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length - 1) * index + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Position.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalAlignTop = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y;
  });
  return unitPositons;
};
const verticalAlignBottom = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + layoutPosition.h;
  });
  return unitPositons;
};
const verticalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - i.h) / 2;
  });
  return unitPositons;
};
const verticalAccommodate = (layoutPosition, unitPositons) => {
  var y = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (y + i.h < layoutPosition.h || y + i.h === layoutPosition.h)) result.push(i);
    if (accommodated === false && (y + i.h < layoutPosition.h || y + i.h === layoutPosition.h)) y = y + i.h;
    if (y + i.y > layoutPosition.h) accommodated = true;
  });
  return {
    result: result,
    rest: unitPositons.filter((i, index) => index > result.length - 1)
  };
};
const maps = {
  horizontalForward: horizontalForward,
  horizontalReverse: horizontalReverse,
  horizontalCenter: horizontalCenter,
  horizontalAround: horizontalAround,
  horizontalBetween: horizontalBetween,
  horizontalAlignLeft: horizontalAlignLeft,
  horizontalAlignRight: horizontalAlignRight,
  horizontalAlignCenter: horizontalAlignCenter,
  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,
  verticalAlignTop: verticalAlignTop,
  verticalAlignBottom: verticalAlignBottom,
  verticalAlignCenter: verticalAlignCenter
};
const wrapHorizontal = (layoutPosition, unitPositons, layoutActionOuter, layoutAlignInner) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest);
    accommodateResult = [...accommodateResult, accommodate.result];
    accommodateRest = accommodate.rest;
  }
  layoutActionOuter(layoutPosition, accommodateResult.map(i => Object({
    y: layoutPosition.y,
    h: CanvasXML_Position.hmax(i)
  }))).forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y));
  accommodateResult.forEach(i => layoutAlignInner({
    x: layoutPosition.x,
    y: i.y,
    w: layoutPosition.w
  }, i));
  return unitPositons;
};
const wrapVertical = (layoutPosition, unitPositons, layoutActionOuter, layoutAlignInner) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest);
    accommodateResult = [...accommodateResult, accommodate.result];
    accommodateRest = accommodate.rest;
  }
  layoutActionOuter(layoutPosition, accommodateResult.map(i => Object({
    x: layoutPosition.x,
    w: CanvasXML_Position.wmax(i)
  }))).forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x));
  accommodateResult.forEach(i => layoutAlignInner({
    y: layoutPosition.y,
    h: layoutPosition.h
  }, i));
  return unitPositons;
};
const CanvasXML_ReactDom_Tag_Component_Layout_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  const layoutPropsHorizontalIndex = Object.keys(props).findIndex(i => i === 'horizontalForward' || i === 'horizontalReverse' || i === 'horizontalCenter' || i === 'horizontalAround' || i === 'horizontalAround' || i === 'horizontalBetween');
  const layoutPropsVerticalIndex = Object.keys(props).findIndex(i => i === 'verticalForward' || i === 'verticalReverse' || i === 'verticalCenter' || i === 'verticalAround' || i === 'verticalAround' || i === 'verticalBetween');
  const layoutChildrenProps = props.children.flat().filter(i => i.alternate === 'layout').map(i => i.props);
  if (Boolean(props.wrap) === true && layoutPropsVerticalIndex > -1 && layoutPropsVerticalIndex > -1 && layoutPropsVerticalIndex < layoutPropsHorizontalIndex) {
    wrapHorizontal({
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    }, layoutChildrenProps, maps[Object.keys(props)[layoutPropsVerticalIndex]], maps[Object.keys(props)[layoutPropsHorizontalIndex]]);
  }
  if (Boolean(props.wrap) === true && layoutPropsHorizontalIndex > -1 && layoutPropsVerticalIndex > -1 && layoutPropsHorizontalIndex < layoutPropsVerticalIndex) {
    wrapVertical({
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    }, layoutChildrenProps, maps[Object.keys(props)[layoutPropsHorizontalIndex]], maps[Object.keys(props)[layoutPropsVerticalIndex]]);
  }
  if (Boolean(props.wrap) === false) {
    Object.keys(props).forEach(i => {
      if (Boolean(props[i]) === true && maps[i]) maps[i]({
        x: props.x,
        y: props.y,
        w: props.w,
        h: props.h
      }, layoutChildrenProps);
    });
  }
  props.children.forEach((i, index) => {
    if (typeof i === 'function') props.children[index] = i({
      x: props.x,
      y: props.y,
      w: props.w,
      h: props.h
    });
  });
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Layout = (CanvasXML_ReactDom_Tag_Component_Layout_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Rect.js



const CanvasXML_ReactDom_Tag_Component_Rect_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  var radius = new Array(4).fill(0);
  if (props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = props.radius;
  if (props.radius && typeof radius === 'number') radius = new Array(4).fill(props.radius);
  CanvasXML_ReactDom.context().moveTo(props.x, props.y + radius[0]);
  CanvasXML_ReactDom.context().arcTo(props.x, props.y, props.x + radius[0], props.y, radius[0]);
  CanvasXML_ReactDom.context().lineTo(props.x + props.w - radius[1], props.y);
  CanvasXML_ReactDom.context().arcTo(props.x + props.w, props.y, props.x + props.w, props.y + radius[1], radius[1]);
  CanvasXML_ReactDom.context().lineTo(props.x + props.w, props.y + props.h - radius[2]);
  CanvasXML_ReactDom.context().arcTo(props.x + props.w, props.y + props.h, props.x + props.w - radius[2], props.y + props.h, radius[2]);
  CanvasXML_ReactDom.context().lineTo(props.x + radius[3], props.y + props.h);
  CanvasXML_ReactDom.context().arcTo(props.x, props.y + props.h, props.x, props.y + props.h - radius[3], radius[3]);
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Rect = (CanvasXML_ReactDom_Tag_Component_Rect_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.Component.Text.js



const caculateTextLine = (context, w, text) => {
  var caculateText = '';
  var caculateLine = [];
  text.split('').forEach(i => {
    const tw = context.measureText(caculateText + i).width;
    if (tw > w) caculateLine.push({
      text: caculateText,
      w: tw,
      h: Number(context.font.match(/\d+px/)[0].replace('px', ''))
    });
    if (tw > w) caculateText = '';
    caculateText = caculateText + i;
  });
  if (caculateText) caculateLine.push({
    text: caculateText,
    w: context.measureText(caculateText).width,
    h: Number(context.font.match(/\d+px/)[0].replace('px', ''))
  });
  return caculateLine;
};
const CanvasXML_ReactDom_Tag_Component_Text_App = props => {
  CanvasXML_ReactDom_Tag.preprocessing(props);
  const lines = caculateTextLine(CanvasXML_ReactDom.context(), props.w, props.text);
  lines.forEach((i, index) => {
    if (Boolean(props.fillText) === true) CanvasXML_ReactDom.context().fillText(i.text, props.x, props.y + i.h + index * i.h + index * (props.gap || 0));
    if (Boolean(props.strokeText) === true) CanvasXML_ReactDom.context().strokeText(i.text, props.x, props.y + i.h + index * i.h + index * (props.gap || 0));
  });
  CanvasXML_ReactDom_Tag.postprocessing(props);
  return props.children;
};
/* harmony default export */ const CanvasXML_ReactDom_Tag_Component_Text = (CanvasXML_ReactDom_Tag_Component_Text_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.Tag.js










const preprocessing = props => {
  CanvasXML_ReactDom.context().save();
  if (props.globalAlpha !== undefined) CanvasXML_ReactDom.context().globalAlpha = props.globalAlpha;
  if (props.font !== undefined) CanvasXML_ReactDom.context().font = props.font;
  if (props.fillStyle !== undefined) CanvasXML_ReactDom.context().fillStyle = props.fillStyle;
  if (props.strokeStyle !== undefined) CanvasXML_ReactDom.context().strokeStyle = props.strokeStyle;
  if (Boolean(props.beginPath) === true) CanvasXML_ReactDom.context().beginPath();
};
const postprocessing = props => {
  if (Boolean(props.fill) === true) CanvasXML_ReactDom.context().fill();
  if (Boolean(props.stroke) === true) CanvasXML_ReactDom.context().stroke();
  CanvasXML_ReactDom_Event.useEventListener('click', props.onClick);
  CanvasXML_ReactDom_Event.useEventListener('touchstart', props.onTouchStart);
  CanvasXML_ReactDom_Event.useEventListener('touchmove', props.onTouchMove);
  CanvasXML_ReactDom_Event.useEventListener('touchend', props.onTouchEnd);
  CanvasXML_ReactDom_Event.useEventListener('mousedown', props.onMouseUp);
  CanvasXML_ReactDom_Event.useEventListener('mousemove', props.onMouseMove);
  CanvasXML_ReactDom_Event.useEventListener('mouseup', props.onMouseUp);
  CanvasXML_ReactDom_Event_Drag.useDragControl(props.onDragEnable, props.onDrag);
  if (Boolean(props.isolated) === true) CanvasXML_ReactDom.context().restore();
  CanvasXML_React.useEffectLoopEnd(() => {
    if (Boolean(props.isolated) !== true) CanvasXML_ReactDom.context().restore();
  }, []);
};
const CanvasXML_ReactDom_Tag_render = alternate => {
  if (alternate === 'arc') return CanvasXML_ReactDom_Tag_Component_Arc;
  if (alternate === 'clip') return CanvasXML_ReactDom_Tag_Component_Clip;
  if (alternate === 'image') return CanvasXML_ReactDom_Tag_Component_Image;
  if (alternate === 'layout') return CanvasXML_ReactDom_Tag_Component_Layout;
  if (alternate === 'rect') return CanvasXML_ReactDom_Tag_Component_Rect;
  if (alternate === 'text') return CanvasXML_ReactDom_Tag_Component_Text;
};
const ReactDomComponentTag = {
  render: CanvasXML_ReactDom_Tag_render,
  preprocessing,
  postprocessing
};
/* harmony default export */ const CanvasXML_ReactDom_Tag = (ReactDomComponentTag);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactDom.js




var dpr;
var canvas;
var context;
const CanvasXML_ReactDom_mount = (component, option) => {
  const style = document.createElement('style');
  style.innerHTML = [`::-webkit-scrollbar { width: 0; height: 0; }`, `body { padding: 0; margin: 0; }`, `body, body * { overscroll-behavior: none; }`].join(' ');
  document.head.appendChild(style);
  window.addEventListener('wheel', e => e.preventDefault(), {
    passive: false
  });
  window.addEventListener('touchmove', e => e.preventDefault(), {
    passive: false
  });
  window.addEventListener('contextmenu', e => e.preventDefault(), {
    passive: false
  });
  dpr = 2;
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');
  const flex = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.coordinate = CanvasXML_Position.coordinate({
      x: 0,
      y: 0,
      w: canvas.width,
      h: canvas.height
    });
  };
  const resize = () => {
    flex();
    CanvasXML_React.shouldRender();
  };
  canvas.style.position = 'absolute';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.background = 'black';
  canvas.style.overflow = 'hidden';
  flex();
  window.addEventListener('resize', resize);
  document.body.appendChild(canvas);
  CanvasXML_ReactDom_Event.addEventListenerWithCanvas(canvas);
  const renderUpdate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderCompoment(component);
  };
  CanvasXML_React.mount(renderUpdate, option.frameTimeDiffMax);
  return {
    render: CanvasXML_React.render
  };
};
const renderCompoment = compoment => {
  if (!compoment || typeof compoment !== 'object') return;
  if (Array.isArray(compoment) === true) {
    compoment.forEach(i => renderCompoment(i));
  }
  if (Array.isArray(compoment) === false && typeof compoment.alternate === 'function') {
    CanvasXML_React.compoment(compoment.alternate, {
      ...compoment.props,
      children: compoment.children
    }, renderCompoment);
  }
  if (Array.isArray(compoment) === false && typeof compoment.alternate === 'string') {
    CanvasXML_React.compoment(CanvasXML_ReactDom_Tag.render(compoment.alternate), {
      ...compoment.props,
      children: compoment.children
    }, renderCompoment);
  }
};
const ReactDom = {
  dpr: () => dpr,
  canvas: () => canvas,
  context: () => context,
  mount: CanvasXML_ReactDom_mount
};
/* harmony default export */ const CanvasXML_ReactDom = (ReactDom);
;// CONCATENATED MODULE: ./package/index.js





/* harmony default export */ const package_0 = ({
  Position: CanvasXML_Position,
  React: CanvasXML_React,
  ReactDomComponent: CanvasXML_ReactDom_Component,
  ReactDom: CanvasXML_ReactDom,
  ReactPlugin: CanvasXML_React_Plugin
});

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});