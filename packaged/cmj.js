/******/ (() => { // webpackBootstrap
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Canvas2d: () => (/* reexport */ CanvasXML_Canvas2d),
  React: () => (/* reexport */ CanvasXML_React),
  ReactCanvas2d: () => (/* reexport */ CanvasXML_ReactCanvas2d),
  "default": () => (/* binding */ package_0)
});

;// CONCATENATED MODULE: ./package/CanvasXML.React.js
var rootElement = undefined;
var renderFrameTimeLast = 0;
var renderFrameTimeDiffMax = 0;
var renderQueueInRender = false;
var renderQueueShouldRender = false;
var renderQueueNode = undefined;
var renderQueueHook = undefined;
var renderQueueHookCallback = [];
var renderListener = [];
var updateQueueNode = [];
var updateQueueNodeFilter = [];
var updateQueueNodeRoot = [];
var updateAnimationFrame = undefined;
const destory = node => {
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffect) renderQueueHookCallback.push(() => i.effectPrevious());
  });
  node.hooks.forEach(i => {
    if (typeof i.effectPrevious === 'function' && i.type === useEffectImmediate) i.effectPrevious();
  });
  node.children.forEach(i => destory(i));
};
const createElement = (tag, props, ...children) => {
  return {
    tag,
    key: Object(props).key,
    props: props || Object(),
    children,
    xml: true
  };
};
const createNode = element => {
  var node = {
    element: element,
    key: undefined,
    type: undefined,
    children: [],
    hooks: [],
    memo: undefined,
    update: undefined,
    create: undefined,
    parent: undefined
  };
  if (Boolean(element) !== true || typeof element !== 'object') {
    node.type = 0;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'function' && element.xml === true) {
    node.type = 1;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && typeof element.tag === 'string') {
    node.type = 2;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && Array.isArray(element) === true) {
    node.type = 3;
    node.key = element.key;
  }
  if (Boolean(element) === true && typeof element === 'object' && element.tag === Fragment) {
    node.type = 4;
    node.key = element.key;
  }
  return node;
};
const renderNode = node => {
  renderQueueHook = {
    hooks: node.hooks,
    index: 0,
    node: node
  };
  var childrenIteration = [];
  var childrenRest = [];
  var childrenDestory = [];
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 1) {
    childrenIteration = new Array(node.element.tag({
      ...node.element.props,
      children: node.element.children,
      parent: node.parent
    }));
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 2) {
    childrenIteration = node.element.children;
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 3) {
    childrenIteration = node.element;
  }
  if ((node.memo !== true || updateQueueNodeFilter.includes(node) === true) && node.type === 4) {
    childrenIteration = node.element.tag({
      children: node.element.children
    });
  }
  if (node.memo === true && updateQueueNodeFilter.includes(node) !== true) {
    childrenIteration = node.children.map(i => i.element);
  }
  childrenDestory = node.children;
  childrenIteration.forEach((i, index) => {
    var equalIndex = node.children.findIndex(n => n.key !== undefined && n.key === i.key && n.element.tag === i.tag);
    if (equalIndex !== -1) node.children.splice(index, 0, node.children.splice(equalIndex, 1)[0]);
    var inode;
    const memo = Boolean(node.children[index] && node.children[index].element === i);
    if (memo === true) inode = node.children[index];
    if (memo !== true) inode = createNode(i);
    inode.memo = memo;
    const update = !memo && Boolean(node.children[index] && node.children[index].type === inode.type && node.children[index].key === inode.key && node.children[index].element.tag === inode.element.tag);
    if (update === true) {
      inode.hooks = node.children[index].hooks;
      inode.children = node.children[index].children;
    }
    inode.update = update;
    inode.create = memo === false && update === false;
    inode.parent = node;
    if (memo === true || update === true) childrenDestory = childrenDestory.filter(i => i !== node.children[index]);
    childrenRest.push(renderNode(inode));
  });
  node.children = childrenRest;
  childrenDestory.forEach(i => destory(i));
  node.hooks.forEach(i => {
    if (typeof i.effect === 'function' && i.type === useEffectImmediateLoopEnd) i.effect();
  });
  renderQueueHook = undefined;
  return node;
};
const Fragment = props => {
  return props.children;
};
const mount = (rootElement_0, renderFrameTimeDiffMax_0, renderListener_0) => {
  rootElement = rootElement_0;
  renderFrameTimeDiffMax = renderFrameTimeDiffMax_0;
  renderListener = renderListener_0;
  return React;
};
const render = () => {
  updateQueueNode = [];
  updateQueueNodeFilter = [];
  updateQueueNodeRoot = [];
  if (updateAnimationFrame) updateAnimationFrame = cancelAnimationFrame(updateAnimationFrame);
  if (renderQueueNode) destory(renderQueueNode);
  renderQueueNode = createNode(rootElement);
  renderQueueInRender = true;
  renderNode(renderQueueNode);
  renderListener(renderQueueNode);
  while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()();
  renderQueueInRender = false;
  var keepRender = renderQueueShouldRender;
  renderQueueShouldRender = false;
  if (keepRender) update();
};
const update = () => {
  if (updateAnimationFrame === undefined) {
    const now = performance.now();
    if (now - renderFrameTimeLast < renderFrameTimeDiffMax) {
      updateAnimationFrame = requestAnimationFrame(() => {
        updateAnimationFrame = undefined;
        update();
      });
    }
    if (now - renderFrameTimeLast > renderFrameTimeDiffMax || now - renderFrameTimeLast === renderFrameTimeDiffMax) {
      updateAnimationFrame = requestAnimationFrame(() => {
        updateAnimationFrame = undefined;
        renderFrameTimeLast = now;
        console.log('React.update.time.now', now);
        updateQueueNodeFilter = Array.from(new Set(updateQueueNode));
        updateQueueNodeRoot = updateQueueNodeFilter.filter(i => {
          var isRoot = true;
          while (isRoot === true && i.parent) {
            i = i.parent;
            isRoot = updateQueueNodeFilter.every(n => n !== i);
          }
          return isRoot;
        });
        updateQueueNode = [];
        renderQueueInRender = true;
        updateQueueNodeRoot.forEach(i => renderNode(i));
        renderListener(renderQueueNode);
        while (renderQueueHookCallback.length !== 0) renderQueueHookCallback.shift()();
        renderQueueInRender = false;
        updateQueueNodeFilter = [];
        updateQueueNodeRoot = [];
        var keepRender = renderQueueShouldRender;
        renderQueueShouldRender = false;
        if (keepRender) update();
      });
    }
  }
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
const shouldRender = queueNode => {
  updateQueueNode = [...updateQueueNode, queueNode];
  if (renderQueueInRender === true) renderQueueShouldRender = true;
  if (renderQueueInRender !== true) update();
};
const createContext = value => {
  const context = {
    value: value
  };
  return {
    context,
    Consumer: props => {
      return props.children(context.value);
    },
    Provider: props => {
      if (props.value !== undefined) context.value = props.value;
      return props.children;
    }
  };
};
const useContext = contextInstance => {
  return contextInstance.context.value;
};
const useShouldRender = () => {
  const queueNode = renderQueueHook.node;
  return () => shouldRender(queueNode);
};
const useState = state => {
  var hook;
  if (hook === undefined) hook = renderQueueHook.hooks[renderQueueHook.index];
  if (hook === undefined) hook = {
    state: state
  };
  renderQueueHook.hooks[renderQueueHook.index] = hook;
  const queueNode = renderQueueHook.node;
  const setState = state => {
    const _ = hook.state;
    if (typeof state === 'function') hook.state = state(hook.state);
    if (typeof state !== 'function') hook.state = state;
    if (hook.state !== _) shouldRender(queueNode);
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
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = hook.effectPrevious && typeof hook.effectPrevious === 'function' ? hook.effectPrevious() : undefined);
  if (hook.dependence === undefined || hook.dependence.some((i, index) => i !== dependence[index])) renderQueueHookCallback.push(() => hook.effectPrevious = effect());
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
const useEffectImmediateLoopEnd = (effect, dependence) => {
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
const React = {
  renderQueueNode: () => renderQueueNode,
  mount,
  render,
  renderNode,
  createElement,
  Fragment,
  shouldRender,
  createContext,
  useContext,
  useShouldRender,
  useState,
  useRef,
  useEffect,
  useEffectImmediateLoopEnd,
  useEffectImmediate,
  useMemo,
  useCallback
};
Object.keys(React).filter(i => [useState, useRef, useEffect, useEffectImmediateLoopEnd, useEffectImmediate, useMemo, useCallback].includes(React[i])).forEach(i => React[i] = hook(React[i]));
/* harmony default export */ const CanvasXML_React = (React);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Arc.js

const App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Arc = (App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Clip.js

const CanvasXML_Canvas2d_Tag_Component_Clip_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().clip();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Clip = (CanvasXML_Canvas2d_Tag_Component_Clip_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Fill.js

const CanvasXML_Canvas2d_Tag_Component_Fill_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().fill();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Fill = (CanvasXML_Canvas2d_Tag_Component_Fill_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Image.js

const caculateImageParams = (location, image, size, position) => {
  var {
    x,
    y,
    w,
    h
  } = location;
  if (image.width === 0 || image.height === 0) return;
  var sx = 0;
  var sy = 0;
  var sw = image.width;
  var sh = image.height;
  if (size === 'auto-max' && position === 'center') {
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
  }
  if (size === 'auto-min' && position === 'center') {
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
  }
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
const CanvasXML_Canvas2d_Tag_Component_Image_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    const params = caculateImageParams({
      x: dom.props.x,
      y: dom.props.y,
      w: dom.props.w,
      h: dom.props.h
    }, dom.props.image, dom.props.size, dom.props.position);
    if (params !== undefined) {
      CanvasXML_Canvas2d.context().drawImage(dom.props.image, params.sx, params.sy, params.sw, params.sh, params.x, params.y, params.w, params.h);
    }
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Image = (CanvasXML_Canvas2d_Tag_Component_Image_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Layout.js

const horizontalForward = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalReverse = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + layoutPosition.w - i.w - x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalCenter = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / 2 + x;
    x = x + i.w + gap;
  });
  return unitPositons;
};
const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length - 1) * index + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0;
  var w = CanvasXML_Canvas2d.Location.add(unitPositons).w;
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x;
    x = x + i.w;
  });
  return unitPositons;
};
const horizontalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x;
  });
  return unitPositons;
};
const horizontalAlignReverse = (layoutPosition, unitPositons) => {
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
const horizontalFlex = (layoutPosition, unitPositons, gap) => {
  const tw = unitPositons.reduce((t, i) => t + i.w, 0) + gap * (unitPositons.length - 1);
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0);
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0);
  if (tw > layoutPosition.w && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.w = i.w - (tw - layoutPosition.w) * (i.shrink / tshrink);
    });
  }
  if (tw < layoutPosition.w) {
    unitPositons.forEach(i => {
      if (i.grow) i.w = i.w - (tw - layoutPosition.w) * (i.grow / tgrow);
    });
  }
  return unitPositons;
};
const horizontalAccommodate = (layoutPosition, unitPositons, gap) => {
  var x = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) result.push(i);
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) x = x + i.w + gap;
    if (x + i.w + gap > layoutPosition.w) accommodated = true;
  });
  return {
    result: result,
    rest: unitPositons.filter((i, index) => index > result.length - 1)
  };
};
const verticalForward = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalReverse = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + layoutPosition.h - i.h - y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalCenter = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h + (unitPositons.length - 1) * gap;
  unitPositons.forEach(i => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / 2 + y;
    y = y + i.h + gap;
  });
  return unitPositons;
};
const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length - 1) * index + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0;
  var h = CanvasXML_Canvas2d.Location.add(unitPositons).h;
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y;
    y = y + i.h;
  });
  return unitPositons;
};
const verticalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y;
  });
  return unitPositons;
};
const verticalAlignReverse = (layoutPosition, unitPositons) => {
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
const verticalFlex = (layoutPosition, unitPositons, gap) => {
  const th = unitPositons.reduce((t, i) => t + i.h, 0) + gap * (unitPositons.length - 1);
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0);
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0);
  if (th > layoutPosition.h && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.h = i.h - (th - layoutPosition.h) * (i.shrink / tshrink);
    });
  }
  if (th < layoutPosition.h) {
    unitPositons.forEach(i => {
      if (i.grow) i.h = i.h - (th - layoutPosition.h) * (i.grow / tgrow);
    });
  }
  return unitPositons;
};
const verticalAccommodate = (layoutPosition, unitPositons, gap) => {
  var y = 0;
  var accommodated = false;
  var result = [];
  unitPositons.forEach(i => {
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) result.push(i);
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) y = y + i.h + gap;
    if (y + i.h + gap > layoutPosition.h) accommodated = true;
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
  horizontalAlignForward: horizontalAlignForward,
  horizontalAlignReverse: horizontalAlignReverse,
  horizontalAlignCenter: horizontalAlignCenter,
  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,
  verticalAlignForward: verticalAlignForward,
  verticalAlignReverse: verticalAlignReverse,
  verticalAlignCenter: verticalAlignCenter
};
const wrapHorizontal = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest, gap);
    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]];
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0);
    }
    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result];
      accommodateRest = accommodate.rest;
    }
  }
  layoutOuter(layoutPosition, accommodateResult.map(i => Object({
    y: layoutPosition.y,
    h: CanvasXML_Canvas2d.Location.hmax(i)
  })), gap).forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y));
  accommodateResult.forEach(i => layoutInner({
    x: layoutPosition.x,
    y: i.y,
    w: layoutPosition.w
  }, i, gap));
  return unitPositons;
};
const wrapVertical = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = [];
  var accommodateRest = unitPositons;
  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest, gap);
    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]];
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0);
    }
    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result];
      accommodateRest = accommodate.rest;
    }
  }
  layoutOuter(layoutPosition, accommodateResult.map(i => Object({
    x: layoutPosition.x,
    w: CanvasXML_Canvas2d.Location.wmax(i)
  })), gap).forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x));
  accommodateResult.forEach(i => layoutInner({
    y: layoutPosition.y,
    h: layoutPosition.h
  }, i), gap);
  return unitPositons;
};
const CanvasXML_Canvas2d_Tag_Component_Layout_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
    if (Boolean(dom.props.container) === true && dom.children.length > 0) {
      const gap = dom.props.gap || 0;
      const childrenDom = dom.children.filter(i => i.element.tag === 'layout' && Boolean(i.props.item) === true);
      childrenDom.forEach(i => CanvasXML_Canvas2d.Tag.relocation({
        ...i,
        children: []
      }));
      const childrenProps = childrenDom.map(i => i.props);
      const indexHorizontal = Object.keys(dom.props).findIndex(i => {
        return ['horizontalForward', 'horizontalReverse', 'horizontalCenter', 'horizontalAround', 'horizontalAround', 'horizontalBetween'].includes(i);
      });
      const indexVertical = Object.keys(dom.props).findIndex(i => {
        return ['verticalForward', 'verticalReverse', 'verticalCenter', 'verticalAround', 'verticalAround', 'verticalBetween'].includes(i);
      });
      const indexHorizontalAlign = Object.keys(dom.props).findIndex(i => {
        return ['horizontalAlignForward', 'horizontalAlignReverse', 'horizontalAlignCenter'].includes(i);
      });
      const indexVerticalAlign = Object.keys(dom.props).findIndex(i => {
        return ['verticalAlignForward', 'verticalAlignReverse', 'verticalAlignCenter'].includes(i);
      });
      if (Boolean(dom.props.wrap) === true && indexHorizontal > -1 && indexVertical > -1 && indexHorizontal < indexVertical) {
        wrapHorizontal({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, maps[Object.keys(dom.props)[indexHorizontal]], maps[Object.keys(dom.props)[indexVertical]], gap);
      }
      if (Boolean(dom.props.wrap) === true && indexVertical > -1 && indexVertical > -1 && indexVertical < indexHorizontal) {
        wrapVertical({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, maps[Object.keys(dom.props)[indexVertical]], maps[Object.keys(dom.props)[indexHorizontal]], gap);
      }
      if (Boolean(dom.props.wrap) === false) {
        if (indexHorizontal > -1) horizontalFlex({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
        if (indexVertical > -1) verticalFlex({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
        if (indexHorizontal > -1) maps[Object.keys(dom.props)[indexHorizontal]]({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
        if (indexVertical > -1) maps[Object.keys(dom.props)[indexVertical]]({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
        if (indexHorizontalAlign > -1) maps[Object.keys(dom.props)[indexHorizontalAlign]]({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
        if (indexVerticalAlign > -1) maps[Object.keys(dom.props)[indexVerticalAlign]]({
          x: dom.props.x,
          y: dom.props.y,
          w: dom.props.w,
          h: dom.props.h
        }, childrenProps, gap);
      }
    }
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Layout = (CanvasXML_Canvas2d_Tag_Component_Layout_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Line.js

const CanvasXML_Canvas2d_Tag_Component_Line_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    if (dom.props.path) {
      dom.props.path.forEach((i, index) => {
        if (index === 0) CanvasXML_Canvas2d.context().moveTo(i.x, i.y);
        if (index === 0) CanvasXML_Canvas2d.context().lineTo(i.x, i.y);
        if (index !== 0) CanvasXML_Canvas2d.context().lineTo(i.x, i.y);
      });
    }
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Line = (CanvasXML_Canvas2d_Tag_Component_Line_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Rect.js

const CanvasXML_Canvas2d_Tag_Component_Rect_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    var radius = new Array(4).fill(0);
    if (dom.props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = dom.props.radius;
    if (dom.props.radius && typeof radius === 'number') radius = new Array(4).fill(dom.props.radius);
    CanvasXML_Canvas2d.context().moveTo(dom.props.x, dom.props.y + radius[0]);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2]);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2]);
    CanvasXML_Canvas2d.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h);
    CanvasXML_Canvas2d.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3]);
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Rect = (CanvasXML_Canvas2d_Tag_Component_Rect_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Stroke.js

const CanvasXML_Canvas2d_Tag_Component_Stroke_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    CanvasXML_Canvas2d.context().stroke();
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Stroke = (CanvasXML_Canvas2d_Tag_Component_Stroke_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.Component.Text.js

const caculateLine = (text, font, w, split = '') => {
  CanvasXML_Canvas2d.context().save();
  CanvasXML_Canvas2d.context().font = font;
  const px = Number(CanvasXML_Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''));
  var caculateText = '';
  var caculateTextLine = [];
  text = text.split(split).map((i, index) => index ? [split, i] : [i]).flat();
  text.forEach((i, index) => {
    const tw = CanvasXML_Canvas2d.context().measureText(caculateText + i).width;
    if (tw > w && caculateText !== '') caculateTextLine.push(caculateText);
    if (tw > w && caculateText !== '') caculateText = i;
    if (tw > w && caculateText === '') caculateTextLine.push(i);
    if (tw < w) caculateText = caculateText + i;
  });
  if (caculateText) caculateTextLine.push(caculateText);
  caculateTextLine = caculateTextLine.map(i => {
    return {
      text: i.trim(),
      w: CanvasXML_Canvas2d.context().measureText(i.trim()).width,
      h: px,
      font: CanvasXML_Canvas2d.context().font
    };
  });
  CanvasXML_Canvas2d.context().restore();
  return caculateTextLine;
};
const caculateLineLocation = (line, lineHeight, gap) => {
  const w = Math.max(...line.map(i => i.w));
  const h = line.reduce((t, n, index) => t + n.h * lineHeight + (index ? gap : 0), 0);
  return {
    w,
    h
  };
};
const CanvasXML_Canvas2d_Tag_Component_Text_App = {
  locationMount: dom => {
    CanvasXML_Canvas2d.Tag.locationMount(dom);
  },
  locationUnmount: dom => {
    CanvasXML_Canvas2d.Tag.locationUnmount(dom);
  },
  renderMount: dom => {
    CanvasXML_Canvas2d.Tag.renderMount_0(dom);
    const lineHeight = dom.props.lineHeight || 1;
    const gap = dom.props.gap || 0;
    if (Boolean(dom.props.wrap) === true) {
      const px = Number(CanvasXML_Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''));
      const line = dom.props.line ? dom.props.line : caculateLine(dom.props.text, dom.props.font, dom.props.w, dom.props.split);
      line.forEach((i, index) => {
        var x = dom.props.x;
        var y = dom.props.y;
        var h = px * lineHeight;
        y = y - px * 0.18 - (h - px) * 0.5;
        y = y + (index + 1) * h + index * gap;
        if (dom.props.align === 'left') x = x;
        if (dom.props.align === 'center') x = x + (dom.props.w - i.w) / 2;
        if (dom.props.align === 'right') x = x + (dom.props.w - i.w);
        if (Boolean(dom.props.fillText) === true) CanvasXML_Canvas2d.context().fillText(i.text, x, y);
        if (Boolean(dom.props.strokeText) === true) CanvasXML_Canvas2d.context().strokeText(i.text, x, y);
      });
    }
    if (Boolean(dom.props.wrap) !== true) {
      const px = Number(CanvasXML_Canvas2d.context().font.match(/\d+px/)[0].replace('px', ''));
      var w = CanvasXML_Canvas2d.context().measureText(dom.props.text).width;
      var h = px * lineHeight;
      var x = dom.props.x;
      var y = dom.props.y;
      y = y - px * 0.18 - (h - px) * 0.5;
      y = y + h;
      if (dom.props.align === 'left') x = x;
      if (dom.props.align === 'center') x = x + (dom.props.w - w) / 2;
      if (dom.props.align === 'right') x = x + (dom.props.w - w);
      if (Boolean(dom.props.fillText) === true) CanvasXML_Canvas2d.context().fillText(dom.props.text, x, y);
      if (Boolean(dom.props.strokeText) === true) CanvasXML_Canvas2d.context().strokeText(dom.props.text, x, y);
    }
    CanvasXML_Canvas2d.Tag.renderMount_1(dom);
  },
  renderUnmount: dom => {
    CanvasXML_Canvas2d.Tag.renderUnmount(dom);
  }
};
CanvasXML_Canvas2d_Tag_Component_Text_App.caculateLine = caculateLine;
CanvasXML_Canvas2d_Tag_Component_Text_App.caculateLineLocation = caculateLineLocation;
/* harmony default export */ const CanvasXML_Canvas2d_Tag_Component_Text = (CanvasXML_Canvas2d_Tag_Component_Text_App);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Tag.js










const locationMount = dom => {
  const unit = (value, property) => {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'function') {
      return value(dom.parent.props);
    }
    if (typeof value === 'undefined') {
      return dom.parent.props[property];
    }
    if (typeof value === 'string') {
      if (value === 'extend' && (property === 'x' || property === 'y' || property === 'w' || property === 'h')) {
        return dom.parent.props[property];
      }
      if (value.match(/^fit-content\(.+\)$/) && (property === 'w' || property === 'h')) {
        return unit(value.replace(/^fit-content\(/, '').replace(/\)$/, ''), property);
      }
      if (value.match(/^min\(.+\)$/)) {
        const splits = value.replace(/^min\(/, '').replace(/\)$/, '').split(/\s?,\s?/);
        splits.forEach((i, index) => {
          splits[index] = unit(i, property);
        });
        return Math.min(...splits);
      }
      if (value.match(/^max\(.+\)$/)) {
        const splits = value.replace(/^max\(/, '').replace(/\)$/, '').split(/(\s+)?,(\s+)?/);
        splits.forEach((i, index) => {
          splits[index] = unit(i, property);
        });
        return Math.max(...splits);
      }
      if (value.match(/^calc\(.+\)$/)) {
        const splits = value.replace(/^calc\(/, '').replace(/\)$/, '').split(' ');
        splits.forEach((i, index) => {
          if (i !== '+' && i !== '-' && i !== '*' && i !== '/') splits[index] = unit(i, property);
        });
        return new Function('return ' + splits.join(' '))();
      }
      if (value.match(/^.+%$/)) {
        if (property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100;
        if (property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100;
      }
      if (value.match(/^.+vmin$/)) {
        return dom.parent.props.vmin * Number(value.replace(/vmin/, ''));
      }
      if (value.match(/^.+vmax$/)) {
        return dom.parent.props.vmax * Number(value.replace(/vmax/, ''));
      }
      if (value.match(/^.+vw$/)) {
        return dom.parent.props.vw * Number(value.replace(/vw/, ''));
      }
      if (value.match(/^.+vh$/)) {
        return dom.parent.props.vh * Number(value.replace(/vh/, ''));
      }
      if (value.match(/^.+px$/)) {
        return Number(value.replace(/px/, ''));
      }
      if (value.match(/^\d+$/)) {
        return Number(value);
      }
    }
  };
  const parse = () => {
    if (dom.props && dom.parent && (typeof dom.props.x === 'string' || typeof dom.props.x === 'number' || typeof dom.props.x === 'function' || typeof dom.props.x === 'undefined')) {
      const n = unit(dom.props.x, 'x');
      if (isNaN(n) === false) dom.props.x = n;
    }
    if (dom.props && dom.parent && (typeof dom.props.y === 'string' || typeof dom.props.y === 'number' || typeof dom.props.y === 'function' || typeof dom.props.y === 'undefined')) {
      const n = unit(dom.props.y, 'y');
      if (isNaN(n) === false) dom.props.y = n;
    }
    if (dom.props && dom.parent && (typeof dom.props.w === 'string' || typeof dom.props.w === 'number' || typeof dom.props.w === 'function' || typeof dom.props.w === 'undefined')) {
      const n = unit(dom.props.w, 'w');
      if (isNaN(n) === false) dom.props.w = n;
    }
    if (dom.props && dom.parent && (typeof dom.props.h === 'string' || typeof dom.props.h === 'number' || typeof dom.props.h === 'function' || typeof dom.props.h === 'undefined')) {
      const n = unit(dom.props.h, 'h');
      if (isNaN(n) === false) dom.props.h = n;
    }
    if (dom.props && dom.parent && (typeof dom.props.l === 'string' || typeof dom.props.l === 'number') && dom.props.x === undefined) {
      const n = unit(dom.props.l, 'l');
      if (isNaN(n) === false) dom.props.x = dom.parent.props.x + n;
    }
    if (dom.props && dom.parent && (typeof dom.props.r === 'string' || typeof dom.props.r === 'number') && dom.props.x === undefined) {
      const n = unit(dom.props.r, 'r');
      if (isNaN(n) === false) dom.props.x = dom.parent.props.x + dom.parent.props.w - n;
    }
    if (dom.props && dom.parent && (typeof dom.props.t === 'string' || typeof dom.props.t === 'number') && dom.props.y === undefined) {
      const n = unit(dom.props.t, 't');
      if (isNaN(n) === false) dom.props.y = dom.parent.props.y + n;
    }
    if (dom.props && dom.parent && (typeof dom.props.b === 'string' || typeof dom.props.b === 'number') && dom.props.y === undefined) {
      const n = unit(dom.props.b, 'b');
      if (isNaN(n) === false) dom.props.y = dom.parent.props.y + dom.parent.props.h - n;
    }
  };
  parse();
  Object.assign(dom.props, CanvasXML_Canvas2d.Location.coordinate(dom.props));
};
const locationUnmount = dom => {
  if (typeof dom.element.props.w === 'string' && dom.element.props.w.match(/^fit-content\(.+\)$/)) {
    const w = CanvasXML_Canvas2d.Location.box(dom.children.map(i => i.props)).w;
    if (isNaN(w) === false) dom.props.w = w;
  }
  if (typeof dom.element.props.h === 'string' && dom.element.props.h.match(/^fit-content\(.+\)$/)) {
    const h = CanvasXML_Canvas2d.Location.box(dom.children.map(i => i.props)).h;
    if (isNaN(h) === false) dom.props.h = h;
  }
  Object.assign(dom.props, CanvasXML_Canvas2d.Location.coordinate(dom.props));
};
const renderMount_0 = dom => {
  CanvasXML_Canvas2d.context().save();
  if (dom.props.globalAlpha !== undefined) CanvasXML_Canvas2d.context().globalAlpha = dom.props.globalAlpha;
  if (dom.props.font !== undefined) CanvasXML_Canvas2d.context().font = dom.props.font;
  if (dom.props.fillStyle !== undefined) CanvasXML_Canvas2d.context().fillStyle = dom.props.fillStyle;
  if (dom.props.strokeStyle !== undefined) CanvasXML_Canvas2d.context().strokeStyle = dom.props.strokeStyle;
  if (dom.props.lineWidth !== undefined) CanvasXML_Canvas2d.context().lineWidth = dom.props.lineWidth;
  if (Boolean(dom.props.beginPath) === true) CanvasXML_Canvas2d.context().beginPath();
};
const renderMount_1 = dom => {
  if (Boolean(dom.props.clip) === true) CanvasXML_Canvas2d.context().clip();
  if (Boolean(dom.props.fill) === true) CanvasXML_Canvas2d.context().fill();
  if (Boolean(dom.props.stroke) === true) CanvasXML_Canvas2d.context().stroke();
  if (Boolean(dom.props.isolated) === true) CanvasXML_Canvas2d.context().restore();
};
const renderUnmount = dom => {
  if (Boolean(dom.props.isolated) !== true) CanvasXML_Canvas2d.context().restore();
  if (dom.props.onClick) CanvasXML_Canvas2d.Event.addEventListener('click', e => dom.props.onClick({
    ...e,
    dom
  }));
  if (dom.props.onTouchStart) CanvasXML_Canvas2d.Event.addEventListener('touchstart', e => dom.props.onTouchStart({
    ...e,
    dom
  }));
  if (dom.props.onTouchMove) CanvasXML_Canvas2d.Event.addEventListener('touchmove', e => dom.props.onTouchMove({
    ...e,
    dom
  }));
  if (dom.props.onTouchEnd) CanvasXML_Canvas2d.Event.addEventListener('touchend', e => dom.props.onTouchEnd({
    ...e,
    dom
  }));
  if (dom.props.onMouseDown) CanvasXML_Canvas2d.Event.addEventListener('mousedown', e => dom.props.onMouseDown({
    ...e,
    dom
  }));
  if (dom.props.onMouseMove) CanvasXML_Canvas2d.Event.addEventListener('mousemove', e => dom.props.onMouseMove({
    ...e,
    dom
  }));
  if (dom.props.onMouseUp) CanvasXML_Canvas2d.Event.addEventListener('mouseup', e => dom.props.onMouseUp({
    ...e,
    dom
  }));
};
const relocation = dom => {
  if (CanvasXML_Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    CanvasXML_Canvas2d.Tag.pick(dom.element.tag).locationMount(dom);
    if (typeof dom.props.onLocationMount === 'function') dom.props.onLocationMount(dom);
  }
  if (dom.children) {
    dom.children.forEach(i => relocation(i));
  }
  if (CanvasXML_Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    CanvasXML_Canvas2d.Tag.pick(dom.element.tag).locationUnmount(dom);
    if (typeof dom.props.onLocationUnmount === 'function') dom.props.onLocationUnmount(dom);
  }
};
const rerender = dom => {
  if (CanvasXML_Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    CanvasXML_Canvas2d.Tag.pick(dom.element.tag).renderMount(dom);
    if (typeof dom.props.onRenderMount === 'function') dom.props.onRenderMount(dom);
  }
  if (dom.children) {
    dom.children.toSorted((a, b) => (a.props.zIndex || 0) - (b.props.zIndex || 0)).forEach(i => rerender(i));
  }
  if (CanvasXML_Canvas2d.Tag.pick(dom.element.tag) !== undefined) {
    CanvasXML_Canvas2d.Tag.pick(dom.element.tag).renderUnmount(dom);
    if (typeof dom.props.onRenderUnmount === 'function') dom.props.onRenderUnmount(dom);
  }
};
const pick = tag => {
  if (tag === 'arc') return CanvasXML_Canvas2d_Tag_Component_Arc;
  if (tag === 'clip') return CanvasXML_Canvas2d_Tag_Component_Clip;
  if (tag === 'fill') return CanvasXML_Canvas2d_Tag_Component_Fill;
  if (tag === 'image') return CanvasXML_Canvas2d_Tag_Component_Image;
  if (tag === 'layout') return CanvasXML_Canvas2d_Tag_Component_Layout;
  if (tag === 'line') return CanvasXML_Canvas2d_Tag_Component_Line;
  if (tag === 'rect') return CanvasXML_Canvas2d_Tag_Component_Rect;
  if (tag === 'stroke') return CanvasXML_Canvas2d_Tag_Component_Stroke;
  if (tag === 'text') return CanvasXML_Canvas2d_Tag_Component_Text;
};
const Canvas2dTag = {
  pick,
  relocation,
  rerender,
  locationMount,
  locationUnmount,
  renderMount_0,
  renderMount_1,
  renderUnmount,
  Arc: CanvasXML_Canvas2d_Tag_Component_Arc,
  Clip: CanvasXML_Canvas2d_Tag_Component_Clip,
  Fill: CanvasXML_Canvas2d_Tag_Component_Fill,
  Image: CanvasXML_Canvas2d_Tag_Component_Image,
  Layout: CanvasXML_Canvas2d_Tag_Component_Layout,
  Rect: CanvasXML_Canvas2d_Tag_Component_Rect,
  Stroke: CanvasXML_Canvas2d_Tag_Component_Stroke,
  Text: CanvasXML_Canvas2d_Tag_Component_Text
};
/* harmony default export */ const CanvasXML_Canvas2d_Tag = (Canvas2dTag);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Event.js

var CanvasXML_Canvas2d_Event_event = [];
var eventWithCanvas = [];
const addEventListener = (type, callback) => {
  if (callback) CanvasXML_Canvas2d_Event_event = [...CanvasXML_Canvas2d_Event_event, {
    type,
    callback
  }];
};
const removeEventListener = (type, callback) => {
  if (callback) CanvasXML_Canvas2d_Event_event = CanvasXML_Canvas2d_Event_event.filter(i => i.type !== type || i.callback !== callback);
};
const clearEventListener = () => {
  CanvasXML_Canvas2d_Event_event = [];
};
const execute = (e, type) => {
  const exe = CanvasXML_Canvas2d_Event_event.filter(i => i.type === type).sort((a, b) => {
    const a_ = a.option === undefined || a.option.priority === undefined ? 0 : a.option.priority;
    const b_ = b.option === undefined || b.option.priority === undefined ? 0 : b.option.priority;
    return b_ - a_;
  });
  var stopPropagation = false;
  exe.forEach(i => {
    var x;
    var y;
    var device;
    if (window.ontouchstart === undefined) x = e.pageX * CanvasXML_Canvas2d.dpr();
    if (window.ontouchstart === undefined) y = e.pageY * CanvasXML_Canvas2d.dpr();
    if (window.ontouchstart !== undefined) x = e.pageX ? [e.pageX * CanvasXML_Canvas2d.dpr()] : [...e.changedTouches].map(i => i * CanvasXML_Canvas2d.dpr());
    if (window.ontouchstart !== undefined) y = e.pageY ? [e.pageY * CanvasXML_Canvas2d.dpr()] : [...e.changedTouches].map(i => i * CanvasXML_Canvas2d.dpr());
    if (window.ontouchstart === undefined) device = 'mouse';
    if (window.ontouchstart !== undefined) device = 'touch';
    const re = {
      native: e,
      x: x,
      y: y,
      device: device,
      stopPropagation: () => stopPropagation = true
    };
    if (stopPropagation === false) i.callback(re);
  });
};
const addEventListenerWithCanvas = canvas => {
  const add = type => {
    const event = e => execute(e, type);
    canvas.addEventListener(type, event, {
      passive: true
    });
    eventWithCanvas.push({
      type,
      event
    });
  };
  new Array('click').forEach(add);
  if (window.ontouchstart !== undefined) {
    new Array('touchstart', 'touchmove', 'touchend').forEach(add);
  }
  if (window.ontouchstart === undefined) {
    new Array('mousedown', 'mousemove', 'mouseup').forEach(add);
  }
};
const removeEventListenerWithCanvas = canvas => {
  eventWithCanvas.forEach(i => canvas.removeEventListener(i.type, i.event));
  eventWithCanvas = [];
};
const Canvas2dEvent = {
  addEventListener,
  removeEventListener,
  clearEventListener,
  addEventListenerWithCanvas,
  removeEventListenerWithCanvas
};
/* harmony default export */ const CanvasXML_Canvas2d_Event = (Canvas2dEvent);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.Location.js
const nan = n => isNaN(n) ? NaN : n;
const x = location => nan(location.x);
const y = location => nan(location.y);
const w = location => nan(location.w);
const h = location => nan(location.h);
const locational = location => Object({
  ...location,
  x: x(location),
  y: y(location),
  w: w(location),
  h: h(location)
});
const l = location => nan(location.x);
const r = location => nan(location.x + location.w);
const t = location => nan(location.y);
const b = location => nan(location.y + location.h);
const wireframe = location => Object({
  ...location,
  l: l(location),
  r: r(location),
  t: t(location),
  b: b(location)
});
const cx = location => nan(location.x + location.w / 2);
const cy = location => nan(location.y + location.h / 2);
const rcx = location => nan(location.x - location.w / 2);
const rcy = location => nan(location.y - location.h / 2);
const ltx = location => nan(location.x);
const lty = location => nan(location.y);
const lbx = location => nan(location.x);
const lby = location => nan(location.y + location.h);
const rtx = location => nan(location.x + location.w);
const rty = location => nan(location.y);
const rbx = location => nan(location.x + location.w);
const rby = location => nan(location.y + location.h);
const point = location => Object({
  ...location,
  cx: cx(location),
  cy: cy(location),
  rcx: rcx(location),
  rcy: rcy(location),
  ltx: ltx(location),
  lty: lty(location),
  lbx: lbx(location),
  lby: lby(location),
  rtx: rtx(location),
  rty: rty(location),
  rbx: rbx(location),
  rby: rby(location)
});
const vmin = location => nan(Math.min(location.w, location.h) * 0.01);
const vmax = location => nan(Math.max(location.w, location.h) * 0.01);
const vw = location => nan(location.w * 0.01);
const vh = location => nan(location.h * 0.01);
const viewport = location => Object({
  ...location,
  vmin: vmin(location),
  vmax: vmax(location),
  vw: vw(location),
  vh: vh(location)
});
const coordinate = location => Object({
  ...locational(location),
  ...wireframe(location),
  ...point(location),
  ...viewport(location)
});
const validate = positions => {
  const result = positions.reduce((t, i) => {
    return t && typeof i.x === 'number' && typeof i.y === 'number' && typeof i.w === 'number' && typeof i.h === 'number';
  }, true);
  return result;
};
const add = positions => {
  const sum = positions.reduce((t, i) => {
    return {
      x: t.x !== undefined ? t.x + i.x : i.x,
      y: t.y !== undefined ? t.y + i.y : i.y,
      w: t.w !== undefined ? t.w + i.w : i.w,
      h: t.h !== undefined ? t.h + i.h : i.h
    };
  }, {
    x: undefined,
    y: undefined,
    w: undefined,
    h: undefined
  });
  return sum;
};
const box = positions => {
  const point = positions.reduce((t, i) => {
    return {
      boxt: t.boxt !== undefined ? isNaN(i.y) ? t.boxt : Math.min(t.boxt, i.y) : isNaN(i.y) ? t.boxt : i.y,
      boxb: t.boxb !== undefined ? isNaN(i.y + i.h) ? t.boxb : Math.max(t.boxb, i.y + i.h) : isNaN(i.y + i.h) ? t.boxt : i.y + i.h,
      boxl: t.boxl !== undefined ? isNaN(i.x) ? t.boxl : Math.min(t.boxl, i.x) : isNaN(i.x) ? t.boxt : i.x,
      boxr: t.boxr !== undefined ? isNaN(i.x + i.w) ? t.boxr : Math.max(t.boxr, i.x + i.w) : isNaN(i.x + i.w) ? t.boxt : i.x + i.w
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
const pointcover = (location, point) => point.x >= location.x && point.x <= location.x + location.w && point.y >= location.y && point.y <= location.y + location.h;
const Canvas2dLocation = {
  x,
  y,
  w,
  h,
  locational,
  l,
  r,
  t,
  b,
  wireframe,
  cx,
  cy,
  rcx,
  rcy,
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
  coordinate,
  validate,
  add,
  box,
  wmin,
  wmax,
  hmin,
  hmax,
  pointcover
};
/* harmony default export */ const CanvasXML_Canvas2d_Location = (Canvas2dLocation);
;// CONCATENATED MODULE: ./package/CanvasXML.Canvas2d.js



var canvas;
var context;
var dpr;
const CanvasXML_Canvas2d_mount = (canvas_0, context_0, dpr_0) => {
  canvas = canvas_0;
  context = context_0;
  dpr = dpr_0;
  CanvasXML_Canvas2d_Event.removeEventListenerWithCanvas(canvas);
  CanvasXML_Canvas2d_Event.addEventListenerWithCanvas(canvas);
};
const CanvasXML_Canvas2d_render = dom => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  CanvasXML_Canvas2d_Event.clearEventListener();
  CanvasXML_Canvas2d_Tag.relocation(dom);
  CanvasXML_Canvas2d_Tag.rerender(dom);
};
const Export = {
  dpr: () => dpr,
  canvas: () => canvas,
  context: () => context,
  mount: CanvasXML_Canvas2d_mount,
  render: CanvasXML_Canvas2d_render,
  Tag: CanvasXML_Canvas2d_Tag,
  Event: CanvasXML_Canvas2d_Event,
  Location: CanvasXML_Canvas2d_Location
};
/* harmony default export */ const CanvasXML_Canvas2d = (Export);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.CoordinateHelper.js

const CanvasXML_ReactCanvas2d_Component_CoordinateHelper_App = props => {
  const [repeatX, setRepeatX] = CanvasXML_React.useState();
  const [repeatY, setRepeatY] = CanvasXML_React.useState();
  const caculateRepeat = dom => {
    setRepeatX(Math.ceil(dom.props.w / props.gap / 2));
    setRepeatY(Math.ceil(dom.props.h / props.gap / 2));
  };
  return /*#__PURE__*/CanvasXML_React.createElement("layout", {
    x: "extend",
    y: "extend",
    w: "extend",
    h: "extend",
    onRenderUnmount: dom => caculateRepeat(dom)
  }, repeatX !== undefined && repeatY !== undefined ? /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    fill: true,
    y: "extend",
    h: "extend",
    w: "0.1vmax",
    x: "calc(extend + 50vw)",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
    beginPath: true,
    fill: true,
    x: "extend",
    w: "extend",
    h: "0.1vmax",
    y: "calc(extend + 50vh)",
    globalAlpha: 0.5,
    fillStyle: props.color
  }), new Array(repeatX).fill().map((i, index) => {
    return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      y: "extend",
      h: "extend",
      w: "0.1vmax",
      x: `calc(extend + 50vw + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      y: "extend",
      h: "extend",
      w: "0.1vmax",
      x: `calc(extend + 50vw - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  }), new Array(repeatY).fill().map((i, index) => {
    return /*#__PURE__*/CanvasXML_React.createElement(CanvasXML_React.Fragment, null, /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      x: "extend",
      w: "extend",
      h: "0.1vmax",
      y: `calc(extend + 50vh + ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }), /*#__PURE__*/CanvasXML_React.createElement("rect", {
      beginPath: true,
      fill: true,
      x: "extend",
      w: "extend",
      h: "0.1vmax",
      y: `calc(extend + 50vh - ${props.gap * (index + 1)})`,
      globalAlpha: 0.25,
      fillStyle: props.color
    }));
  })) : null);
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_CoordinateHelper = (CanvasXML_ReactCanvas2d_Component_CoordinateHelper_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.TextCaculateLine.js


const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLine = CanvasXML_Canvas2d.Tag.Text.caculateLine;
const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLineLocation = CanvasXML_Canvas2d.Tag.Text.caculateLineLocation;
const CanvasXML_ReactCanvas2d_Component_TextCaculateLine_App = props => {
  const line = CanvasXML_React.useMemo(() => {
    return CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLine(props.text, props.font, props.w, props.split).map(i => Object({
      ...props,
      ...i
    }));
  }, [props.w, props.text, props.font, props.split]);
  const location = CanvasXML_React.useMemo(() => {
    var w;
    var h;
    if (props.lineHeight !== undefined && props.gap !== undefined) {
      const location = CanvasXML_ReactCanvas2d_Component_TextCaculateLine_caculateLineLocation(line, props.lineHeight, props.gap);
      w = location.w;
      h = location.h;
    }
    return {
      w: w,
      h: h
    };
  }, [line, props.lineHeight, props.gap]);
  return props.children.map(i => i(line, location));
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component_TextCaculateLine = (CanvasXML_ReactCanvas2d_Component_TextCaculateLine_App);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Component.js


const ReactCanvas2dComponent = {
  CoordinateHelper: CanvasXML_ReactCanvas2d_Component_CoordinateHelper,
  TextCaculateLine: CanvasXML_ReactCanvas2d_Component_TextCaculateLine
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Component = (ReactCanvas2dComponent);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Utils.js
const flatDom = dom => {
  return [dom, ...dom.children.map(i => flatDom(i)).flat()];
};
const getDomById = (dom, id) => {
  return dom.props.id === id ? dom : dom.children.reduce((t, i) => t || getDomById(i, id), null);
};
const ReactCanvas2dUtils = {
  flatDom,
  getDomById
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Utils = (ReactCanvas2dUtils);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.Plugin.js



const useAnimationCount = props => {
  const [animationCount, setAnimationCount] = CanvasXML_React.useState(props.defaultCount);
  const [animationDelay, setAnimationDelay] = CanvasXML_React.useState(props.defaultDelay);
  const [animationFlow, setAnimationFlow] = CanvasXML_React.useState(props.defaultFlow);
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
    animationCount: props.postprocess ? props.postprocess(animationCount) : animationCount,
    setAnimationCount,
    animationDelay,
    setAnimationDelay,
    animationFlow,
    setAnimationFlow
  };
};
const useTransitionCount = props => {
  const [transitionCount, setTransitionCount] = CanvasXML_React.useState(props.defaultCount);
  CanvasXML_React.useEffect(() => {
    var next = transitionCount;
    if (props.play === true && transitionCount !== props.destination && transitionCount > props.destination) next = next - props.rate;
    if (props.play === true && transitionCount !== props.destination && transitionCount < props.destination) next = next + props.rate;
    if (props.play === true && transitionCount > props.destination && next < props.destination) next = props.destination;
    if (props.play === true && transitionCount < props.destination && next > props.destination) next = props.destination;
    setTransitionCount(next);
  });
  return {
    transitionCount: props.postprocess ? props.postprocess(transitionCount) : transitionCount,
    setTransitionCount
  };
};
const useImage = props => {
  const image = CanvasXML_React.useMemo(() => new Image(), []);
  CanvasXML_React.useEffectImmediate(() => image.src = props.src, [props.src]);
  CanvasXML_React.useEffectImmediate(() => image.onload = () => props.onload ? props.onload() : undefined, [props.src]);
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
const useLocationPropertyRef = props => {
  const ref = CanvasXML_React.useRef();
  const refLocation = CanvasXML_React.useRef(props.default);
  CanvasXML_React.useEffectImmediate(() => {
    if (ref.current) {
      const key = Object.keys(refLocation.current);
      if (key.some(i => refLocation.current[i] !== ref.current.props[i])) {
        refLocation.current = key.reduce((t, i) => Object({
          ...t,
          [i]: ref.current.props[i]
        }), Object);
      }
    }
  });
  return {
    ref,
    location: refLocation.current
  };
};
const useLocationProperty = props => {
  const ref = CanvasXML_React.useRef();
  const [location, setLocation] = CanvasXML_React.useState(props.default);
  CanvasXML_React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location);
      if (key.some(i => location[i] !== ref.current.props[i])) {
        setLocation(key.reduce((t, i) => Object({
          ...t,
          [i]: ref.current.props[i]
        }), Object));
      }
    }
  });
  return {
    ref,
    location,
    setLocation
  };
};
const useLocationBox = props => {
  const ref = CanvasXML_React.useRef();
  const [location, setLocation] = CanvasXML_React.useState(props.default);
  CanvasXML_React.useEffect(() => {
    if (ref.current) {
      const key = Object.keys(location);
      const box = CanvasXML_Canvas2d.Location.box(CanvasXML_ReactCanvas2d_Utils.flatDom(ref.current).filter(i => i !== ref.current).map(i => i.props));
      if (key.some(i => location[i] !== box[i])) {
        setLocation(key.reduce((t, i) => Object({
          ...t,
          [i]: box[i]
        }), Object));
      }
    }
  });
  return {
    ref,
    location,
    setLocation
  };
};
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
const ReactCanvas2dPlugin = {
  useAnimationCount,
  useTransitionCount,
  useImage,
  useResourceReload,
  useLocationPropertyRef,
  useLocationProperty,
  useLocationBox,
  useDragControlMouse,
  useDragControlTouch
};
/* harmony default export */ const CanvasXML_ReactCanvas2d_Plugin = (ReactCanvas2dPlugin);
;// CONCATENATED MODULE: ./package/CanvasXML.ReactCanvas2d.js





var CanvasXML_ReactCanvas2d_canvas;
var CanvasXML_ReactCanvas2d_context;
var CanvasXML_ReactCanvas2d_dpr;
var CanvasXML_ReactCanvas2d_renderFrameTimeDiffMax;
const resizeObserver = () => {
  const flex = () => {
    CanvasXML_ReactCanvas2d_canvas.width = CanvasXML_ReactCanvas2d_canvas.offsetWidth * CanvasXML_ReactCanvas2d_dpr;
    CanvasXML_ReactCanvas2d_canvas.height = CanvasXML_ReactCanvas2d_canvas.offsetHeight * CanvasXML_ReactCanvas2d_dpr;
    CanvasXML_ReactCanvas2d_canvas.coordinate = CanvasXML_Canvas2d.Location.coordinate({
      x: 0,
      y: 0,
      w: CanvasXML_ReactCanvas2d_canvas.width,
      h: CanvasXML_ReactCanvas2d_canvas.height
    });
  };
  flex();
  const resizeObserver = new window.ResizeObserver(() => {
    if (CanvasXML_ReactCanvas2d_canvas.width !== CanvasXML_ReactCanvas2d_canvas.offsetWidth * CanvasXML_ReactCanvas2d_dpr || CanvasXML_ReactCanvas2d_canvas.height !== CanvasXML_ReactCanvas2d_canvas.offsetHeight * CanvasXML_ReactCanvas2d_dpr) {
      flex();
      CanvasXML_React.shouldRender(CanvasXML_React.renderQueueNode());
    }
  });
  resizeObserver.observe(CanvasXML_ReactCanvas2d_canvas);
};
const createDom = node => {
  return {
    ...node,
    props: {
      ...node.element.props
    }
  };
};
const renderDom = dom => {
  while (dom.children.some(i => i.type !== 2)) {
    dom.children = dom.children.map(i => i.type !== 2 ? i.children : i).flat();
  }
  dom.children = dom.children.map(i => renderDom({
    ...createDom(i),
    parent: dom
  }));
  dom.getDomById = id => CanvasXML_ReactCanvas2d_Utils.getDomById(dom, id);
  return dom;
};
const renderCanvas = node => {
  const dom = createDom({
    element: {
      props: CanvasXML_ReactCanvas2d_canvas.coordinate
    },
    children: [node]
  });
  const domCanvas2d = renderDom(dom);
  CanvasXML_Canvas2d.render(domCanvas2d);
};
const CanvasXML_ReactCanvas2d_mount = (element, canvas_0, option) => {
  CanvasXML_ReactCanvas2d_canvas = canvas_0;
  CanvasXML_ReactCanvas2d_context = CanvasXML_ReactCanvas2d_canvas.getContext('2d');
  CanvasXML_ReactCanvas2d_dpr = option && option.dpr || 2;
  CanvasXML_ReactCanvas2d_renderFrameTimeDiffMax = option && option.renderFrameTimeDiffMax || 12;
  resizeObserver();
  CanvasXML_Canvas2d.mount(CanvasXML_ReactCanvas2d_canvas, CanvasXML_ReactCanvas2d_context, CanvasXML_ReactCanvas2d_dpr);
  CanvasXML_React.mount(element, CanvasXML_ReactCanvas2d_renderFrameTimeDiffMax, renderCanvas);
  return {
    render: CanvasXML_React.render
  };
};
const ReactCanvas2d = {
  mount: CanvasXML_ReactCanvas2d_mount,
  Component: CanvasXML_ReactCanvas2d_Component,
  Plugin: CanvasXML_ReactCanvas2d_Plugin,
  Utils: CanvasXML_ReactCanvas2d_Utils
};
/* harmony default export */ const CanvasXML_ReactCanvas2d = (ReactCanvas2d);
;// CONCATENATED MODULE: ./package/index.js



/* harmony default export */ const package_0 = ({
  React: CanvasXML_React,
  Canvas2d: CanvasXML_Canvas2d,
  ReactCanvas2d: CanvasXML_ReactCanvas2d
});

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;