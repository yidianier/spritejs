(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{537:function(n,o,r){"use strict";r.r(o),o.default="const animatorjs = 'https://s2.ssl.qhres.com/!87edaa34/animator-0.3.1.min.js';\n\nfunction loadScript(url) {\n  const script = document.createElement('script');\n  script.type = 'text/javascript';\n  script.src = url;\n  document.body.appendChild(script);\n\n  return new Promise((resolve) => {\n    script.onload = () => {\n      resolve();\n    };\n  });\n}\n\nfunction sleep(ms) {\n  return new Promise((resolve) => {\n    setTimeout(resolve, ms);\n  });\n}\n\n(async function () {\n  await loadScript(animatorjs);\n\n  const paper = new spritejs.Scene('#paper', {\n      resolution: [1600, 1200],\n      stickMode: 'width',\n    }),\n    Path = spritejs.Path;\n\n  async function ray() {\n    const s = new Path();\n\n    const pos = [200 + 1200 * Math.random(), 200 + 800 * Math.random()];\n    const rotate = 360 * Math.random();\n    const controller = Math.random() * 340 + 10;\n\n    const color = [127 + 128 * Math.random(), 255 * Math.random(), 128 * Math.random()].map(Math.round);\n\n    s.attr({\n      anchor: [0, 0],\n      pos,\n      rotate,\n      lineWidth: 6,\n      lineCap: 'round',\n      d: `M10,80 q${controller},-80 350,0`,\n      linearGradients: {\n        strokeColor: {\n          vector: [10, 30, 180, 90],\n          colors: [{\n            offset: 0,\n            color: `rgba(${color[0]},${color[1]},${color[2]},0)`,\n          }, {\n            offset: 1,\n            color: `rgba(${color[0]},${color[1]},${color[2]},0)`,\n          }],\n        },\n      },\n    });\n\n    paper.layer().append(s);\n\n\n    const a1 = new Animator(3000, (p) => {\n      let q = 0;\n\n      if(p > 0.618) {\n        q = 1 - (1 - p) / 0.382;\n      }\n\n      p = Math.min(p / 0.7, 1);\n\n      const colors = [\n        {offset: 0, color: `rgba(${color[0]},${color[1]},${color[2]},0)`},\n        {offset: q, color: `rgba(${color[0]},${color[1]},${color[2]},0)`},\n        {offset: p, color: `rgba(${color[0]},${color[1]},${color[2]},1)`},\n        {offset: Math.min(p + 0.06, 1), color: `rgba(${color[0]},${color[1]},${color[2]},0)`},\n      ];\n\n      const linearGradients = s.attr('linearGradients');\n      linearGradients.strokeColor.colors = colors;\n\n      const len = s.getPathLength();\n      const [x, y] = s.getPointAtLength(p * len);\n\n      linearGradients.strokeColor.vector = [10, 30, x + 5, y];\n\n      s.attr({linearGradients});\n    });\n\n    await a1.animate();\n    paper.layer().remove(s);\n  }\n\n  do {\n    ray();\n    const delay = Math.random() * 500 + 200;\n    await sleep(delay); // eslint-disable-line no-await-in-loop\n  } while(1);\n}());\n"}}]);