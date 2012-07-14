;var Tipped = { version: '2.5.5' };

Tipped.Skins = {
  // base skin, don't modify! (create custom skins in a seperate file)
  'base': {
    afterUpdate: false,
    ajax: {
      cache: true,
      type: 'get'
    },
    background: {
      color: '#f2f2f2',
      opacity: 1
    },
    border: {
      size: 1,
      color: '#000',
      opacity: 1
    },
    closeButtonSkin: 'default',
    containment: {
      selector: 'viewport'
    },
    fadeIn: 180,
    fadeOut: 220,
    showDelay: 75,
    hideDelay: 25,
    radius: {
      size: 3,
      position: 'background'
    },
    hideAfter: false,
    hideOn: {
      element: 'self',
      event: 'mouseleave'
    },
    hideOthers: false,
    hook: 'topleft',
    inline: false,
    offset: {
      x: 0, y: 0,
      mouse: { x: -12, y: -12 } // only defined in the base class
    },
    onHide: false,
    onShow: false,
    shadow: {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .15
    },
    showOn: 'mousemove',
    spinner: true,
    stem: {
      height: 6,
      width: 11,
      offset: { x: 5, y: 5 },
      spacing: 2
    },
    target: 'self'
  },
  
  // Every other skin inherits from this one
  'reset': {
    ajax: false,
    closeButton: false,
    hideOn: [{
      element: 'self',
      event: 'mouseleave'
    }, {
      element: 'tooltip',
      event: 'mouseleave'
    }],
    hook: 'topmiddle',
    stem: true
  },

  // Custom skins start here
  'black': {
     background: { color: '#232323', opacity: .9 },
     border: { size: 1, color: "#232323" },
     spinner: { color: '#fff' }
  },

  'cloud': {
    border: {
      size: 1,
      color: [
        { position: 0, color: '#bec6d5'},
        { position: 1, color: '#b1c2e3' }
      ]
    },
    closeButtonSkin: 'light',
    background: {
      color: [
        { position: 0, color: '#f6fbfd'},
        { position: 0.1, color: '#fff' },
        { position: .48, color: '#fff'},
        { position: .5, color: '#fefffe'},
        { position: .52, color: '#f7fbf9'},
        { position: .8, color: '#edeff0' },
        { position: 1, color: '#e2edf4' }
      ]
    },
    shadow: { opacity: .1 }
  },

  'dark': {
    border: { size: 1, color: '#1f1f1f', opacity: .95 },
    background: {
      color: [
        { position: .0, color: '#686766' },
        { position: .48, color: '#3a3939' },
        { position: .52, color: '#2e2d2d' },
        { position: .54, color: '#2c2b2b' },
        { position: 0.95, color: '#222' },
        { position: 1, color: '#202020' }
      ],
      opacity: .9
    },
    radius: { size: 4 },
    shadow: { offset: { x: 0, y: 1 } },
    spinner: { color: '#ffffff' }
  },

  'facebook': {
    background: { color: '#282828' },
    border: 0,
    fadeIn: 0,
    fadeOut: 0,
    radius: 0,
    stem: {
      width: 7,
      height: 4,
      offset: { x: 6, y: 6 }
    },
    shadow: false
  },

  'lavender': {
    background: {
      color: [
        { position: .0, color: '#b2b6c5' },
        { position: .5, color: '#9da2b4' },
        { position: 1, color: '#7f85a0' }
      ]
    },
    border: {
      color: [
        { position: 0, color: '#a2a9be' },
        { position: 1, color: '#6b7290' }
      ],
      size: 1
    },
    radius: 1,
    shadow: { opacity: .1 }
  },

  'light': {
    border: { size: 0, color: '#afafaf' },
    background: {
      color: [
        { position: 0, color: '#fefefe' },
        { position: 1, color: '#f7f7f7' }
      ]
    },
    closeButtonSkin: 'light',
    radius: 1,
    stem: {
      height: 7,
      width: 13,
      offset: { x: 7, y: 7 }
    },
    shadow: { opacity: .32, blur: 2 }
  },

  'lime': {
    border: {
      size: 1,
      color: [
        { position: 0,   color: '#5a785f' },
        { position: .05, color: '#0c7908' },
        { position: 1, color: '#587d3c' }
      ]
    },
    background: {
      color: [
        { position: 0,   color: '#a5e07f' },
        { position: .02, color: '#cef8be' },
        { position: .09, color: '#7bc83f' },
        { position: .35, color: '#77d228' },
        { position: .65, color: '#85d219' },
        { position: .8,  color: '#abe041' },
        { position: 1,   color: '#c4f087' }
      ]
    }
  },

  'liquid' : {
    border: {
      size: 1,
      color: [
        { position: 0, color: '#454545' },
        { position: 1, color: '#101010' }
      ]
    },
    background: {
      color: [
        { position: 0, color: '#515562'},
        { position: .3, color: '#252e43'},
        { position: .48, color: '#111c34'},
        { position: .52, color: '#161e32'},
        { position: .54, color: '#0c162e'},
        { position: 1, color: '#010c28'}
      ],
      opacity: .8
    },
    radius: { size: 4 },
    shadow: { offset: { x: 0, y: 1 } },
    spinner: { color: '#ffffff' }
  },

  'blue': {
    border: {
      color: [
        { position: 0, color: '#113d71'},
        { position: 1, color: '#1e5290' }
      ]
    },
    background: {
      color: [
        { position: 0, color: '#3a7ab8'},
        { position: .48, color: '#346daa'},
        { position: .52, color: '#326aa6'},
        { position: 1, color: '#2d609b' }
      ]
    },
    spinner: { color: '#f2f6f9' },
    shadow: { opacity: .2 }
  },

  'salmon' : {
    background: {
      color: [
        { position: 0, color: '#fbd0b7' },
        { position: .5, color: '#fab993' },
        { position: 1, color: '#f8b38b' }
      ]
    },
    border: {
      color: [
        { position: 0, color: '#eda67b' },
        { position: 1, color: '#df946f' }
      ],
      size: 1
    },
    radius: 1,
    shadow: { opacity: .1 }
  },

  'yellow': {
    border: { size: 1, color: '#f7c735' },
    background: '#ffffaa',
    radius: 1,
    shadow: { opacity: .1 }
  }
};

Tipped.Skins.CloseButtons = {
  'base': {
    diameter: 17,
    border: 2,
    x: { diameter: 10, size: 2, opacity: 1 },
    states: {
      'default': {
        background: {
          color: [
            { position: 0, color: '#1a1a1a' },
            { position: 0.46, color: '#171717' },
            { position: 0.53, color: '#121212' },
            { position: 0.54, color: '#101010' },
            { position: 1, color: '#000' }
          ],
          opacity: 1
        },
        x: { color: '#fafafa', opacity: 1 },
        border: { color: '#fff', opacity: 1 }
      },
      'hover': {
        background: {
          color: '#333',
          opacity: 1
        },
        x: { color: '#e6e6e6', opacity: 1 },
        border: { color: '#fff', opacity: 1 }
      }
    },
    shadow: {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .3
    }
  },

  'reset': {},

  'default': {},

  'light': {
    diameter: 17,
    border: 2,
    x: { diameter: 10, size: 2, opacity: 1 },
    states: {
      'default': {
        background: {
          color: [
            { position: 0, color: '#797979' },
            { position: 0.48, color: '#717171' },
            { position: 0.52, color: '#666' },
            { position: 1, color: '#666' }
          ],
          opacity: 1
        },
        x: { color: '#fff', opacity: .95 },
        border: { color: '#676767', opacity: 1 }
      },
      'hover': {
        background: {
          color: [
            { position: 0, color: '#868686' },
            { position: 0.48, color: '#7f7f7f' },
            { position: 0.52, color: '#757575' },
            { position: 1, color: '#757575' }
          ],
          opacity: 1
        },
        x: { color: '#fff', opacity: 1 },
        border: { color: '#767676', opacity: 1 }
      }
    }
  }
};



(function (a) {
	function b(a, b) {
		var c = [a, b];
		return c.left = a,
		c.top = b,
		c
	}
	function c(a) {
		this.element = a
	}
	function d(a) {
		var b = {},
		c;
		for (c in a) b[c] = a[c] + "px";
		return b
	}
	function e(a) {
		return 180 * a / Math.PI
	}
	function f(a) {
		return a * Math.PI / 180
	}
	function g(b) {
		if (b) {
			this.element = b,
			u.remove(b);
			var c = this.getTooltip();
			this.options = a.extend({},
			c.options),
			this._globalAlpha = 1,
			this._cache = {},
			this.uid = a(b).data("tipped-uid"),
			u.add(this),
			this._hookPosition = this.options.hook.tooltip,
			this._stemPosition = this.options.stem && this._hookPosition,
			this.build()
		}
	}
	function h(b, c, d) { (this.element = b) && c && (this.options = a.extend({
			blur: 3,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		d || {}), this._globalAlpha = this.options.globalAlpha, this._cache = {},
		this.uid = a(b).data("tipped-uid"), v.add(this), this.build())
	}
	function i(b, c) {
		if (this.element = b) this.options = a.extend({
			blur: 5,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		c || {}),
		this._globalAlpha = this.options.globalAlpha,
		this.uid = a(b).data("tipped-uid"),
		w.add(this),
		this.build()
	}
	function j(b, c) {
		for (var d in c) c[d] && c[d].constructor && c[d].constructor === Object ? (b[d] = a.extend({},
		b[d]) || {},
		j(b[d], c[d])) : b[d] = c[d];
		return b
	}
	function k(b, c, d) {
		if (this.element = b) {
			var e = a(b).data("tipped-uid");
			e && x.remove(b),
			e = p(),
			a(b).data("tipped-uid", e),
			this.uid = e,
			"object" == a.type(c) && !m.isElement(c) ? (d = c, c = null) : d = d || {},
			this.options = x.createOptions(d),
			d = b.getAttribute("title"),
			c || ((e = b.getAttribute("data-tipped")) ? c = e: d && (c = d)),
			d && (a(b).data("tipped_restore_title", d), b.setAttribute("title", "")),
			this.content = c,
			this.zIndex = this.options.zIndex || +x.options.startingZIndex,
			this._cache = {
				contentDimensions: {
					width: 1,
					height: 1
				},
				events: [],
				timers: [],
				states: {
					active: !1,
					xhr: !1,
					visible: !1,
					updated: !1,
					build: !1,
					skinned: !1,
					toggles: !1,
					preloading_images: !1
				},
				fnCallContent: ""
			},
			b = this.options.target,
			this.target = "mouse" == b ? "mouse": "self" == b || !b ? this.element: b && document.getElementById(b) || this.element,
			this._preBuild(),
			x.add(this)
		}
	}
	var l = Array.prototype.slice,
	m = {
		wrap: function (b, c) {
			return function () {
				var d = [a.proxy(b, this)].concat(l.call(arguments));
				return c.apply(this, d)
			}
		},
		"break": {},
		_each: function (a, b) {
			for (var c = 0, d = a.length; c < d; c++) b(a[c])
		},
		each: function (a, b, c) {
			var d = 0;
			try {
				this._each(a, function (a) {
					b.call(c, a, d++)
				})
			} catch(e) {
				if (e != m["break"]) throw e
			}
		},
		any: function (a, b, c) {
			var d = !1;
			return m.each(a || [], function (a, e) {
				if (d |= b.call(c, a, e)) return m["break"]
			}),
			!!d
		},
		member: function (a, b) {
			var c = !1;
			return m.any(a || [], function (a) {
				if (c = a === b) return ! 0
			}),
			c
		},
		select: function (a, b, c) {
			var d = [];
			return m.each(a || [], function (a, e) {
				b.call(c, a, e) && (d[d.length] = a)
			}),
			d
		},
		without: function (a) {
			var b = l.call(arguments, 1);
			return m.select(a, function (a) {
				return ! m.member(b, a)
			})
		},
		isElement: function (a) {
			return a && 1 == a.nodeType
		},
		delay: function (a, b) {
			var c = l.call(arguments, 2);
			return setTimeout(function () {
				return a.apply(a, c)
			},
			b)
		},
		defer: function (a) {
			return m.delay.apply(this, [a, 1].concat(l.call(arguments, 1)))
		},
		pointer: function (a) {
			return {
				x: a.pageX,
				y: a.pageY
			}
		},
		findElement: function (b, c) {
			var d = b.target;
			return c ? a(d).closest(c)[0] : d
		},
		element: {
			cumulativeScrollOffset: function (a) {
				var c = 0,
				d = 0;
				do c += a.scrollTop || 0,
				d += a.scrollLeft || 0,
				a = a.parentNode;
				while (a);
				return b(d, c)
			},
			cumulativeOffset: function (c) {
				var d = a(c).offset(),
				c = m.element.cumulativeScrollOffset(c),
				e = a(window).scrollTop(),
				f = a(window).scrollLeft();
				return d.left += c.left - f,
				d.top += c.top - e,
				b(d.left, d.top)
			},
			isAttached: function () {
				return function (a) {
					for (; a && a.parentNode;) a = a.parentNode;
					return !! a && !!a.body
				}
			} ()
		}
	},
	n = function (a) {
		function b(b) {
			return (b = RegExp(b + "([\\d.]+)").exec(a)) ? parseFloat(b[1]) : !0
		}
		return {
			IE: !!window.attachEvent && -1 === a.indexOf("Opera") && b("MSIE "),
			Opera: -1 < a.indexOf("Opera") && ( !! window.opera && opera.version && parseFloat(opera.version()) || 7.55),
			WebKit: -1 < a.indexOf("AppleWebKit/") && b("AppleWebKit/"),
			Gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML") && b("rv:"),
			MobileSafari: !!a.match(/Apple.*Mobile.*Safari/),
			Chrome: -1 < a.indexOf("Chrome") && b("Chrome/")
		}
	} (navigator.userAgent),
	o = {
		scripts: {
			Spinners: {
				required: "3.0.0",
				available: window.Spinners && (Spinners.version || Spinners.Version)
			},
			jQuery: {
				required: "1.4.4",
				available: window.jQuery && jQuery.fn.jquery
			}
		},
		check: function () {
			function a(a) {
				for (var c = (a = a.match(b)) && a[1] && a[1].split(".") || [], d = 0, e = 0, f = c.length; e < f; e++) d += parseInt(c[e] * Math.pow(10, 6 - 2 * e));
				return a && a[3] ? d - 1 : d
			}
			var b = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
			return function (b) { ! this.scripts[b].checked && (this.scripts[b].checked = !0, !this.scripts[b].available || a(this.scripts[b].available) < a(this.scripts[b].required) && !this.scripts[b].notified) && ((this.scripts[b].notified = !0, b = "Tipped requires " + b + " >= " + this.scripts[b].required, window.console) ? console[console.warn ? "warn": "log"](b) : alert(b))
			}
		} ()
	},
	p = function () {
		var a = 0;
		return function (b) {
			b = b || "_t_uid_";
			for (a++; document.getElementById(b + a);) a++;
			return b + a
		}
	} ();
	a.extend(Tipped, function () {
		var b = function () {
			var a = document.createElement("canvas");
			return !! a.getContext && !!a.getContext("2d")
		} (),
		d;
		try {
			d = !!document.createEvent("TouchEvent")
		} catch(e) {
			d = !1
		}
		return {
			support: {
				canvas: b,
				touch: d,
				cssTransitions: function () {
					var b = !1;
					return a.each(["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"], function (a, c) {
						try {
							document.createEvent(c),
							b = !0
						} catch(d) {}
					}),
					b
				} ()
			},
			init: function () {
				if (!this.support.canvas && !window.G_vmlCanvasManager) {
					if (!n.IE) return;
					alert("Tipped requires ExplorerCanvas (excanvas.js)")
				}
				o.check("jQuery"),
				a(document).ready(function () {
					x.startDelegating()
				})
			},
			create: function (a, b, d) {
				return c.create(a, b, d),
				this.get(a)
			},
			get: function (a) {
				return new c(a)
			},
			findElement: function (a) {
				return x.findElement(a)
			},
			show: function (a) {
				return this.get(a).show(),
				this
			},
			hide: function (a) {
				return this.get(a).hide(),
				this
			},
			toggle: function (a) {
				return this.get(a).toggle(),
				this
			},
			refresh: function (a) {
				return this.get(a).refresh(),
				this
			},
			remove: function (a) {
				return this.get(a).remove(),
				this
			},
			hideAll: function () {
				return x.hideAll(),
				this
			},
			setDefaultSkin: function (a) {
				return x.setDefaultSkin(a),
				this
			},
			setStartingZIndex: function (a) {
				return x.setStartingZIndex(a),
				this
			},
			visible: function (b) {
				if (m.isElement(b)) return x.isVisibleByElement(b);
				if ("undefined" != a.type(b)) {
					var b = a(b),
					c = 0;
					return a.each(b, function (a, b) {
						x.isVisibleByElement(b) && c++
					}),
					c
				}
				return x.getVisible().length
			}
		}
	} ()),
	a.extend(c, {
		create: function (b, c, d) {
			if (b) {
				var e = d || {},
				f = [];
				return x.removeDetached(),
				m.isElement(b) ? f.push(new k(b, c, e)) : a(b).each(function (a, b) {
					f.push(new k(b, c, e))
				}),
				f
			}
		}
	}),
	a.extend(c.prototype, {
		items: function () {
			return x.Position.mouseBuffer = {
				x: 0,
				y: 0
			},
			x.get(this.element)
		},
		show: function () {
			return a.each(this.items(), function (a, b) {
				b.show()
			}),
			this
		},
		hide: function () {
			return a.each(this.items(), function (a, b) {
				b.hide()
			}),
			this
		},
		toggle: function () {
			return a.each(this.items(), function (a, b) {
				b.toggle()
			}),
			this
		},
		refresh: function () {
			return a.each(this.items(), function (a, b) {
				b.refresh()
			}),
			this
		},
		remove: function () {
			return x.remove(this.element),
			this
		}
	});
	var q = {
		init: function () {
			return window.G_vmlCanvasManager && !Tipped.support.canvas && n.IE ?
			function (a) {
				G_vmlCanvasManager.initElement(a)
			}: function () {}
		} (),
		drawRoundedRectangle: function (b, c) {
			var d = a.extend({
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				radius: 0
			},
			c || {}),
			e = d.left,
			g = d.top,
			h = d.width,
			i = d.height;
			(d = d.radius) ? (b.beginPath(), b.moveTo(e + d, g), b.arc(e + h - d, g + d, d, f( - 90), f(0), !1), b.arc(e + h - d, g + i - d, d, f(0), f(90), !1), b.arc(e + d, g + i - d, d, f(90), f(180), !1), b.arc(e + d, g + d, d, f( - 180), f( - 90), !1), b.closePath(), b.fill()) : b.fillRect(e, g, h, i)
		},
		drawPixelArray: function (b, c, d) {
			for (var d = a.extend({
				x: 0,
				y: 0,
				color: "#000"
			},
			d || {}), e = 0, f = c.length; e < f; e++) for (var g = 0, h = c[e].length; g < h; g++) {
				var i = parseInt(c[e].charAt(g)) * (1 / 9);
				b.fillStyle = t.hex2fill(d.color, i),
				i && b.fillRect(d.x + g, d.y + e, 1, 1)
			}
		},
		createFillStyle: function (b, c, d) {
			var e;
			return "string" == a.type(c) ? e = t.hex2fill(c) : "string" == a.type(c.color) ? e = t.hex2fill(c.color, "number" == a.type(c.opacity) ? c.opacity: 1) : a.isArray(c.color) && (d = a.extend({
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0
			},
			d || {}), e = q.Gradient.addColorStops(b.createLinearGradient(d.x1, d.y1, d.x2, d.y2), c.color, c.opacity)),
			e
		},
		Gradient: {
			addColorStops: function (b, c, d) {
				for (var d = "number" == a.type(d) ? d: 1, e = 0, f = c.length; e < f; e++) {
					var g = c[e];
					if ("undefined" == a.type(g.opacity) || "number" != a.type(g.opacity)) g.opacity = 1;
					b.addColorStop(g.position, t.hex2fill(g.color, g.opacity * d))
				}
				return b
			}
		}
	},
	r = {
		positions: "topleft topmiddle topright righttop rightmiddle rightbottom bottomright bottommiddle bottomleft leftbottom leftmiddle lefttop".split(" "),
		regex: {
			toOrientation: /^(top|left|bottom|right)(top|left|bottom|right|middle|center)$/,
			horizontal: /^(top|bottom)/,
			isCenter: /(middle|center)/,
			side: /^(top|bottom|left|right)/
		},
		toDimension: function () {
			var a = {
				top: "height",
				left: "width",
				bottom: "height",
				right: "width"
			};
			return function (b) {
				return a[b]
			}
		} (),
		isCenter: function (a) {
			return !! a.toLowerCase().match(this.regex.isCenter)
		},
		isCorner: function (a) {
			return ! this.isCenter(a)
		},
		getOrientation: function (a) {
			return a.toLowerCase().match(this.regex.horizontal) ? "horizontal": "vertical"
		},
		getSide: function (a) {
			var b = null;
			return (a = a.toLowerCase().match(this.regex.side)) && a[1] && (b = a[1]),
			b
		},
		split: function (a) {
			return a.toLowerCase().match(this.regex.toOrientation)
		}
	},
	s = {
		getDimensions: function (a) {
			return a = a.options.stem,
			{
				width: a.width,
				height: a.height
			}
		},
		getBorderDimensions: function (b, c, d) {
			return d = a.extend({
				math: "ceil"
			},
			d || {}),
			b = b.options.stem,
			c = this.getCenterBorderDimensions(b.width, b.height, c),
			d.math && (c.width = Math[d.math](c.width), c.height = Math[d.math](c.height)),
			{
				width: c.width,
				height: c.height
			}
		},
		getCenterBorderDimensions: function (a, b, c) {
			var d = 180 - e(Math.atan(.5 * (b / a))),
			c = Math.cos(f(d - 90)) * c,
			c = a + 2 * c;
			return {
				width: c,
				height: c * b / a
			}
		},
		getLayout: function (a, b) {
			var c = this.getBorderDimensions(a, b),
			d = this.getDimensions(a);
			r.isCenter(a._hookPosition);
			var e = Math.ceil(c.height + b);
			return {
				box: {
					dimensions: {
						width: Math.ceil(c.width),
						height: Math.ceil(e)
					}
				},
				border: {
					dimensions: c
				},
				stem: {
					dimensions: {
						width: d.width,
						height: d.height
					}
				}
			}
		},
		getBubbleLayout: function (b, c, d) {
			var e = {
				top: 0,
				left: 0
			},
			f = {
				top: 0,
				left: 0
			},
			g = a.extend({},
			c),
			h = b.border,
			i = i || this.getLayout(b, b.border),
			j = i.box.dimensions;
			d && (j.height = d, h = 0);
			if (b.options.stem) {
				var k = r.getSide(b._hookPosition);
				"top" == k ? e.top = j.height - h: "left" == k && (e.left = j.height - h);
				var d = r.split(b._hookPosition),
				l = r.getOrientation(b._hookPosition);
				if ("horizontal" == l) {
					switch (d[2]) {
					case "middle":
					case "center":
						f.left = .5 * g.width;
						break;
					case "right":
						f.left = g.width
					}
					"bottom" == d[1] && (f.top = g.height - h + j.height)
				} else {
					switch (d[2]) {
					case "middle":
					case "center":
						f.top = .5 * g.height;
						break;
					case "bottom":
						f.top = g.height
					}
					"right" == d[1] && (f.left = g.width - h + j.height)
				}
				g[r.toDimension(k)] += j.height - h
			} else if (d = r.split(b._hookPosition), l = r.getOrientation(b._hookPosition), "horizontal" == l) {
				switch (d[2]) {
				case "middle":
				case "center":
					f.left = .5 * g.width;
					break;
				case "right":
					f.left = g.width
				}
				"bottom" == d[1] && (f.top = g.height)
			} else {
				switch (d[2]) {
				case "middle":
				case "center":
					f.top = .5 * g.height;
					break;
				case "bottom":
					f.top = g.height
				}
				"right" == d[1] && (f.left = g.width)
			}
			var m = b.options.radius && b.options.radius.size || 0,
			h = b.options.border && b.options.border.size || 0;
			if (b.options.stem) {
				var n = b.options.stem && b.options.stem.offset || {
					x: 0,
					y: 0
				},
				k = m && "background" == b.options.radius.position ? m: 0,
				m = m && "border" == b.options.radius.position ? m: m + h,
				o = h + k + .5 * i.stem.dimensions.width - .5 * i.border.dimensions.width,
				i = Math.ceil(h + k + .5 * i.stem.dimensions.width + (m > o ? m - o: 0));
				if ("horizontal" == l) switch (d[2]) {
				case "left":
					f.left += i;
					break;
				case "right":
					f.left -= i
				} else switch (d[2]) {
				case "top":
					f.top += i;
					break;
				case "bottom":
					f.top -= i
				}
			}
			if (b.options.stem && (n = b.options.stem.offset)) if ("horizontal" == l) switch (d[2]) {
			case "left":
				f.left += n.x;
				break;
			case "right":
				f.left -= n.x
			} else switch (d[2]) {
			case "top":
				f.top += n.y;
				break;
			case "bottom":
				f.top -= n.y
			}
			var p;
			if (b.options.stem && (p = b.options.stem.spacing)) if ("horizontal" == l) switch (d[1]) {
			case "top":
				f.top -= p;
				break;
			case "bottom":
				f.top += p
			} else switch (d[1]) {
			case "left":
				f.left -= p;
				break;
			case "right":
				f.left += p
			}
			return {
				dimensions: g,
				position: {
					top: 0,
					left: 0
				},
				background: {
					position: e,
					dimensions: c
				},
				stem: {
					dimensions: j
				},
				anchor: f
			}
		}
	},
	t = function () {
		function b(a) {
			return a.red = a[0],
			a.green = a[1],
			a.blue = a[2],
			a
		}
		function c(a) {
			var c = Array(3);
			0 == a.indexOf("#") && (a = a.substring(1)),
			a = a.toLowerCase();
			if ("" != a.replace(d, "")) return null;
			3 == a.length ? (c[0] = a.charAt(0) + a.charAt(0), c[1] = a.charAt(1) + a.charAt(1), c[2] = a.charAt(2) + a.charAt(2)) : (c[0] = a.substring(0, 2), c[1] = a.substring(2, 4), c[2] = a.substring(4));
			for (a = 0; a < c.length; a++) c[a] = parseInt(c[a], 16);
			return b(c)
		}
		var d = RegExp("[0123456789abcdef]", "g");
		return {
			hex2rgb: c,
			hex2fill: function (b, d) {
				"undefined" == a.type(d) && (d = 1);
				var e = d,
				f = c(b);
				return f[3] = e,
				f.opacity = e,
				"rgba(" + f.join() + ")"
			},
			getSaturatedBW: function (a) {
				var a = c(a),
				a = b(a),
				d = a.red,
				e = a.green,
				f = a.blue,
				g,
				h = d > e ? d: e;
				f > h && (h = f);
				var i = d < e ? d: e;
				f < i && (i = f),
				g = h / 255,
				a = 0 != h ? (h - i) / h: 0;
				if (0 == a) d = 0;
				else {
					var j = (h - d) / (h - i),
					k = (h - e) / (h - i),
					f = (h - f) / (h - i),
					d = (d == h ? f - k: e == h ? 2 + j - f: 4 + k - j) / 6;
					0 > d && (d += 1)
				}
				return d = Math.round(360 * d),
				a = Math.round(100 * a),
				g = Math.round(100 * g),
				e = [],
				e[0] = d,
				e[1] = a,
				e[2] = g,
				e.hue = d,
				e.saturation = a,
				e.brightness = g,
				"#" + (50 < e[2] ? "000": "fff")
			}
		}
	} (),
	u = {
		skins: {},
		get: function (b) {
			if (!b) return null;
			var c = null;
			return (b = a(b).data("tipped-uid")) && (c = this.skins[b]),
			c
		},
		add: function (a) {
			this.skins[a.uid] = a
		},
		remove: function (a) {
			if (a = this.get(a)) delete this.skins[a.uid],
			a.remove()
		}
	};
	a.extend(g.prototype, function () {
		return {
			prepare: function () {
				var a = this.getTooltip();
				this.contentDimensions = a._cache.contentDimensions,
				a = a.options,
				this.radius = a.radius && a.radius.size || 0,
				this.border = a.border && a.border.size || 0,
				this.padding = a.padding,
				a = Math.min(this.contentDimensions.height, this.contentDimensions.width),
				this.radius > a / 2 && (this.radius = Math.floor(a / 2)),
				"border" == this.options.radius.position && this.radius > this.border && (this.border = this.radius),
				this._cache = {
					options: {
						radius: this.radius,
						border: this.border,
						padding: this.padding
					}
				}
			},
			createHookCache: function () {
				this._cache.hook = {};
				var b = this._hookPosition;
				a.each(r.positions, a.proxy(function (a, b) {
					var c;
					this._cache.hook[b] = {},
					this._hookPosition = b,
					c = this.getOrderLayout(),
					this._cache.hook[b].anchor = c.anchor,
					this._cache.hook[b].bubble = {
						dimensions: c.bubble.dimensions,
						position: {
							top: c.bubble.position.top,
							left: c.bubble.position.left
						}
					},
					this._cache.hook[b].tooltip = {
						dimensions: c.skin.dimensions
					},
					this.shadow && (c = this.shadow.getOrderLayout(), this._cache.hook[b].anchor = c.anchor, this._cache.hook[b].bubble.position.top += c.skin.position.top, this._cache.hook[b].bubble.position.left += c.skin.position.left, this._cache.hook[b].tooltip.dimensions = c.tooltip.dimensions)
				},
				this)),
				this._hookPosition = b
			},
			build: function () {
				this.cleanup(),
				window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document);
				var b = this.getTooltip(),
				c = this.options;
				this.bubble = a("<div>").addClass("t_Bubble")[0],
				a(b.skinElement).append(this.bubble),
				this.prepare(),
				this.drawBubble(b),
				c.closeButton && (this.drawCloseButton(b), c.closeButton.shadow && (this.closeButtonShadow ? (this.closeButtonShadow.options = c.closeButton.shadow, this.closeButtonShadow.build()) : this.closeButtonShadow = new i(this.element, a.extend({
					globalAlpha: this._globalAlpha
				},
				c.closeButton.shadow)))),
				n.IE && 7 > n.IE && a(b.container).prepend(this.iframeShim = a("<iframe>").addClass("t_iframeShim").attr({
					frameBorder: 0,
					src: "javascript:'';"
				})),
				this.order(),
				c.shadow && (this.shadow ? (this.shadow.options = c.shadow, this.shadow.build()) : this.shadow = new h(this.element, this, a.extend({
					globalAlpha: this._globalAlpha
				},
				c.shadow))),
				this.createHookCache()
			},
			remove: function () {
				this.cleanup(),
				this.options.shadow && (v.remove(this.element), this.options.closeButton && this.options.closeButton.shadow && w.remove(this.element)),
				this.iframeShim && (this.iframeShim.remove(), this.iframeShim = null),
				this.container && (a(this.container).remove(), this.container = null)
			},
			cleanup: function () {
				this.bubble && (this.closeButton && (a(this.closeButton).remove(), this.hoverCloseButton = this.defaultCloseButton = this.closeButton = null), a(this.bubble).remove(), this.bubble = this.background = this.stem = null, this._cache = {})
			},
			getTooltip: function () {
				return x.get(this.element)[0]
			},
			refresh: function () {
				var b = this.getTooltip(),
				c = a(b.container),
				d = a(b.container).find(".t_ContentContainer").first()[0];
				if (d) {
					a(d).css({
						width: "auto",
						height: "auto"
					});
					var e = parseInt(c.css("top")),
					f = parseInt(c.css("left")),
					g = parseInt(c.css("width"));
					c.css({
						left: "-25000px",
						top: "-25000px",
						width: "15000px",
						height: "auto"
					}),
					b.getState("visible") || a(b.container).show();
					var h = x.UpdateQueue.getMeasureElementDimensions(d);
					b.options.maxWidth && "number" == a.type(b.options.maxWidth) && h.width > b.options.maxWidth && (a(d).css({
						width: b.options.maxWidth + "px"
					}), h = x.UpdateQueue.getMeasureElementDimensions(d)),
					b.getState("visible") || a(b.container).hide(),
					b._cache.contentDimensions = h,
					c.css({
						left: f + "px",
						top: e + "px",
						width: g + "px"
					}),
					this.build()
				}
			},
			setHookPosition: function (a) {
				this._hookPosition != a && (this._hookPosition = a, this.build())
			},
			drawCloseButton: function (b) {
				var c = b.options.closeButton,
				c = {
					width: c.diameter + 2 * c.border,
					height: c.diameter + 2 * c.border
				};
				a(b.container).append(a(this.closeButton = document.createElement("div")).attr({
					"class": "t_Close"
				}).css(d(c)).append(a(this.closeButtonShift = document.createElement("div")).attr({
					"class": "t_CloseButtonShift"
				}).css(d(c)))),
				this.drawCloseButtonState(b, "default"),
				this.drawCloseButtonState(b, "hover"),
				a(this.closeButton).bind("mouseenter", a.proxy(this.closeButtonMouseover, this)).bind("mouseleave", a.proxy(this.closeButtonMouseout, this))
			},
			drawCloseButtonState: function (b, c) {
				var e = b.options.closeButton,
				g = e.diameter,
				h = e.border || 0,
				i = e.x.diameter,
				j = e.x.size,
				k = e.states[c || "default"],
				l = {
					width: g + 2 * h,
					height: g + 2 * h
				};
				i >= g && (i = g - 2);
				var m;
				a(this.closeButtonShift).append(a(this[c + "CloseButton"] = document.createElement("div")).attr({
					"class": "t_CloseState"
				}).css(a.extend(d(l), {
					left: ("hover" == c ? l.width: 0) + "px"
				}))),
				a(document.body).append(a(m = document.createElement("canvas")).attr(l)),
				q.init(m),
				e = m.getContext("2d"),
				e.globalAlpha = this._globalAlpha,
				a(this[c + "CloseButton"]).append(m),
				e.translate(l.width / 2, l.height / 2),
				e.fillStyle = q.createFillStyle(e, k.background, {
					x1: 0,
					y1: 0 - g / 2,
					x2: 0,
					y2: 0 + g / 2
				}),
				e.beginPath(),
				e.arc(0, 0, g / 2, 0, 2 * Math.PI, !0),
				e.closePath(),
				e.fill(),
				h && (e.fillStyle = q.createFillStyle(e, k.border, {
					x1: 0,
					y1: 0 - g / 2 - h,
					x2: 0,
					y2: 0 + g / 2 + h
				}), e.beginPath(), e.arc(0, 0, g / 2, Math.PI, 0, !1), e.lineTo((g + h) / 2, 0), e.arc(0, 0, g / 2 + h, 0, Math.PI, !0), e.arc(0, 0, g / 2 + h, Math.PI, 0, !0), e.lineTo(g / 2, 0), e.arc(0, 0, g / 2, 0, Math.PI, !1), e.closePath(), e.fill()),
				g = i / 2,
				j /= 2,
				j > g && (h = j, j = g, g = h),
				e.fillStyle = t.hex2fill(k.x.color || k.x, k.x.opacity || 1),
				e.rotate(f(45)),
				e.beginPath(),
				e.moveTo(0, 0),
				e.lineTo(0, g);
				for (k = 0; 4 > k; k++) e.lineTo(0, g),
				e.lineTo(j, g),
				e.lineTo(j, g - (g - j)),
				e.lineTo(g, j),
				e.lineTo(g, 0),
				e.rotate(f(90));
				e.closePath(),
				e.fill()
			},
			drawBubble: function (b) {
				var c = this.getOrderLayout(),
				d = this.options.stem && this.getStemLayout(),
				e = this._hookPosition && this._hookPosition.toLowerCase(),
				f = this.radius,
				g = this.border,
				b = b.options.stem && b.options.stem.offset || {
					x: 0,
					y: 0
				},
				h = 0,
				i = 0;
				f && (h = "background" == this.options.radius.position ? f: 0, i = "border" == this.options.radius.position ? f: h + g),
				a(document.body).append(this.bubbleCanvas = document.createElement("canvas")),
				a(this.bubbleCanvas).attr(c.bubble.dimensions),
				q.init(this.bubbleCanvas),
				f = this.bubbleCanvas.getContext("2d"),
				f.globalAlpha = this._globalAlpha,
				a(this.bubble).append(this.bubbleCanvas),
				f.fillStyle = q.createFillStyle(f, this.options.background, {
					x1: 0,
					y1: c.background.position.top + g,
					x2: 0,
					y2: c.background.position.top + c.background.dimensions.height - g
				}),
				f.lineWidth = 0,
				this._drawBackgroundPath(f, {
					beginPath: !0,
					closePath: !0,
					border: g,
					radius: h,
					borderRadius: i,
					layout: c,
					stemLayout: d,
					stem: this.options.stem,
					hookPosition: e,
					cornerOffset: b
				}),
				f.fill();
				if (g) {
					var j = q.createFillStyle(f, this.options.border, {
						x1: 0,
						y1: c.background.position.top,
						x2: 0,
						y2: c.background.position.top + c.background.dimensions.height
					});
					f.fillStyle = j,
					this._drawBackgroundPath(f, {
						beginPath: !0,
						closePath: !1,
						border: g,
						radius: h,
						borderRadius: i,
						layout: c,
						stemLayout: d,
						stem: this.options.stem,
						hookPosition: e,
						cornerOffset: b
					}),
					this._drawBorderPath(f, {
						beginPath: !1,
						closePath: !0,
						border: g,
						backgroundRadius: h,
						radius: {
							size: i,
							position: this.options.radius.position
						},
						layout: c,
						stemLayout: d,
						stem: this.options.stem,
						hookPosition: e,
						cornerOffset: b
					}),
					f.fill()
				}
			},
			_drawBackgroundPath: function (b, c) {
				var d = a.extend({
					stem: !1,
					hookPosition: null,
					beginPath: !1,
					closePath: !1,
					layout: null,
					stemLayout: null,
					radius: 0,
					border: 0,
					borderRadius: 0,
					cornerOffset: {
						x: 0,
						y: 0
					}
				},
				c || {}),
				e = d.layout,
				g = d.stemLayout,
				h = d.cornerOffset,
				i = d.border,
				j = d.radius,
				k = d.hookPosition,
				l = e.background.position,
				e = e.background.dimensions,
				m,
				n,
				o;
				g && (m = g.stem.dimensions, n = g.box.dimensions, o = d.borderRadius, g = i + j + .5 * m.width - .5 * g.border.dimensions.width, o = Math.ceil(o > g ? o - g: 0));
				var p, g = j ? l.left + i + j: l.left + i;
				p = l.top + i,
				h && h.x && /^(topleft|lefttop)$/.test(k) && (g += h.x),
				d.beginPath && b.beginPath(),
				b.moveTo(g, p);
				if (d.stem) switch (k) {
				case "topleft":
					g = l.left + i,
					j && (g += j),
					g += Math.max(o, h.x || 0),
					b.lineTo(g, p),
					p -= m.height,
					g += .5 * m.width,
					b.lineTo(g, p),
					p += m.height,
					g += .5 * m.width,
					b.lineTo(g, p);
					break;
				case "topmiddle":
				case "topcenter":
					g = l.left + .5 * e.width - .5 * m.width,
					b.lineTo(g, p),
					p -= m.height,
					g += .5 * m.width,
					b.lineTo(g, p),
					p += m.height,
					g += .5 * m.width,
					b.lineTo(g, p),
					g = l.left + .5 * e.width - .5 * n.width,
					b.lineTo(g, p);
					break;
				case "topright":
					g = l.left + e.width - i - m.width,
					j && (g -= j),
					g -= Math.max(o, h.x || 0),
					b.lineTo(g, p),
					p -= m.height,
					g += .5 * m.width,
					b.lineTo(g, p),
					p += m.height,
					g += .5 * m.width,
					b.lineTo(g, p)
				}
				j ? j && (b.arc(l.left + e.width - i - j, l.top + i + j, j, f( - 90), f(0), !1), g = l.left + e.width - i, p = l.top + i + j) : (g = l.left + e.width - i, p = l.top + i, b.lineTo(g, p));
				if (d.stem) switch (k) {
				case "righttop":
					p = l.top + i,
					j && (p += j),
					p += Math.max(o, h.y || 0),
					b.lineTo(g, p),
					g += m.height,
					p += .5 * m.width,
					b.lineTo(g, p),
					g -= m.height,
					p += .5 * m.width,
					b.lineTo(g, p);
					break;
				case "rightmiddle":
				case "rightcenter":
					p = l.top + .5 * e.height - .5 * m.width,
					b.lineTo(g, p),
					g += m.height,
					p += .5 * m.width,
					b.lineTo(g, p),
					g -= m.height,
					p += .5 * m.width,
					b.lineTo(g, p);
					break;
				case "rightbottom":
					p = l.top + e.height - i,
					j && (p -= j),
					p -= m.width,
					p -= Math.max(o, h.y || 0),
					b.lineTo(g, p),
					g += m.height,
					p += .5 * m.width,
					b.lineTo(g, p),
					g -= m.height,
					p += .5 * m.width,
					b.lineTo(g, p)
				}
				j ? j && (b.arc(l.left + e.width - i - j, l.top + e.height - i - j, j, f(0), f(90), !1), g = l.left + e.width - i - j, p = l.top + e.height - i) : (g = l.left + e.width - i, p = l.top + e.height - i, b.lineTo(g, p));
				if (d.stem) switch (k) {
				case "bottomright":
					g = l.left + e.width - i,
					j && (g -= j),
					g -= Math.max(o, h.x || 0),
					b.lineTo(g, p),
					g -= .5 * m.width,
					p += m.height,
					b.lineTo(g, p),
					g -= .5 * m.width,
					p -= m.height,
					b.lineTo(g, p);
					break;
				case "bottommiddle":
				case "bottomcenter":
					g = l.left + .5 * e.width + .5 * m.width,
					b.lineTo(g, p),
					g -= .5 * m.width,
					p += m.height,
					b.lineTo(g, p),
					g -= .5 * m.width,
					p -= m.height,
					b.lineTo(g, p);
					break;
				case "bottomleft":
					g = l.left + i + m.width,
					j && (g += j),
					g += Math.max(o, h.x || 0),
					b.lineTo(g, p),
					g -= .5 * m.width,
					p += m.height,
					b.lineTo(g, p),
					g -= .5 * m.width,
					p -= m.height,
					b.lineTo(g, p)
				}
				j ? j && (b.arc(l.left + i + j, l.top + e.height - i - j, j, f(90), f(180), !1), g = l.left + i, p = l.top + e.height - i - j) : (g = l.left + i, p = l.top + e.height - i, b.lineTo(g, p));
				if (d.stem) switch (k) {
				case "leftbottom":
					p = l.top + e.height - i,
					j && (p -= j),
					p -= Math.max(o, h.y || 0),
					b.lineTo(g, p),
					g -= m.height,
					p -= .5 * m.width,
					b.lineTo(g, p),
					g += m.height,
					p -= .5 * m.width,
					b.lineTo(g, p);
					break;
				case "leftmiddle":
				case "leftcenter":
					p = l.top + .5 * e.height + .5 * m.width,
					b.lineTo(g, p),
					g -= m.height,
					p -= .5 * m.width,
					b.lineTo(g, p),
					g += m.height,
					p -= .5 * m.width,
					b.lineTo(g, p);
					break;
				case "lefttop":
					p = l.top + i + m.width,
					j && (p += j),
					p += Math.max(o, h.y || 0),
					b.lineTo(g, p),
					g -= m.height,
					p -= .5 * m.width,
					b.lineTo(g, p),
					g += m.height,
					p -= .5 * m.width,
					b.lineTo(g, p)
				}
				return j ? j && (b.arc(l.left + i + j, l.top + i + j, j, f( - 180), f( - 90), !1), g = l.left + i + j, p = l.top + i, g += 1, b.lineTo(g, p)) : (g = l.left + i, p = l.top + i, b.lineTo(g, p)),
				d.closePath && b.closePath(),
				{
					x: g,
					y: p
				}
			},
			_drawBorderPath: function (b, c) {
				var d = a.extend({
					stem: !1,
					hookPosition: null,
					beginPath: !1,
					closePath: !1,
					layout: null,
					stemLayout: null,
					radius: 0,
					border: 0,
					stemOffset: 0,
					cornerOffset: {
						x: 0,
						y: 0
					}
				},
				c || {}),
				e = d.layout,
				g = d.stemLayout,
				h = d.cornerOffset,
				i = d.border,
				j = d.radius && d.radius.size || 0,
				k = d.backgroundRadius,
				l = d.hookPosition,
				m = e.background.position,
				e = e.background.dimensions,
				n,
				o,
				p;
				g && (n = g.stem.dimensions, o = g.border.dimensions, p = i + k + .5 * n.width - .5 * o.width, p = Math.ceil(j > p ? j - p: 0));
				var g = m.left + i + k,
				q = m.top + i;
				k && (g += 1),
				a.extend({},
				{
					x: g,
					y: q
				}),
				d.beginPath && b.beginPath();
				var r = a.extend({},
				{
					x: g,
					y: q
				}),
				q = q - i;
				b.lineTo(g, q),
				j ? j && (b.arc(m.left + j, m.top + j, j, f( - 90), f( - 180), !0), g = m.left, q = m.top + j) : (g = m.left, q = m.top, b.lineTo(g, q));
				if (d.stem) switch (l) {
				case "lefttop":
					q = m.top + i,
					k && (q += k),
					q -= .5 * o.width,
					q += .5 * n.width,
					q += Math.max(p, h.y || 0),
					b.lineTo(g, q),
					g -= o.height,
					q += .5 * o.width,
					b.lineTo(g, q),
					g += o.height,
					q += .5 * o.width,
					b.lineTo(g, q);
					break;
				case "leftmiddle":
				case "leftcenter":
					q = m.top + .5 * e.height - .5 * o.width,
					b.lineTo(g, q),
					g -= o.height,
					q += .5 * o.width,
					b.lineTo(g, q),
					g += o.height,
					q += .5 * o.width,
					b.lineTo(g, q);
					break;
				case "leftbottom":
					q = m.top + e.height - i - o.width,
					k && (q -= k),
					q += .5 * o.width,
					q -= .5 * n.width,
					q -= Math.max(p, h.y || 0),
					b.lineTo(g, q),
					g -= o.height,
					q += .5 * o.width,
					b.lineTo(g, q),
					g += o.height,
					q += .5 * o.width,
					b.lineTo(g, q)
				}
				j ? j && (b.arc(m.left + j, m.top + e.height - j, j, f( - 180), f( - 270), !0), g = m.left + j, q = m.top + e.height) : (g = m.left, q = m.top + e.height, b.lineTo(g, q));
				if (d.stem) switch (l) {
				case "bottomleft":
					g = m.left + i,
					k && (g += k),
					g -= .5 * o.width,
					g += .5 * n.width,
					g += Math.max(p, h.x || 0),
					b.lineTo(g, q),
					q += o.height,
					g += .5 * o.width,
					b.lineTo(g, q),
					q -= o.height,
					g += .5 * o.width,
					b.lineTo(g, q);
					break;
				case "bottommiddle":
				case "bottomcenter":
					g = m.left + .5 * e.width - .5 * o.width,
					b.lineTo(g, q),
					q += o.height,
					g += .5 * o.width,
					b.lineTo(g, q),
					q -= o.height,
					g += .5 * o.width,
					b.lineTo(g, q),
					g = m.left + .5 * e.width + o.width,
					b.lineTo(g, q);
					break;
				case "bottomright":
					g = m.left + e.width - i - o.width,
					k && (g -= k),
					g += .5 * o.width,
					g -= .5 * n.width,
					g -= Math.max(p, h.x || 0),
					b.lineTo(g, q),
					q += o.height,
					g += .5 * o.width,
					b.lineTo(g, q),
					q -= o.height,
					g += .5 * o.width,
					b.lineTo(g, q)
				}
				j ? j && (b.arc(m.left + e.width - j, m.top + e.height - j, j, f(90), f(0), !0), g = m.left + e.width, q = m.top + e.width + j) : (g = m.left + e.width, q = m.top + e.height, b.lineTo(g, q));
				if (d.stem) switch (l) {
				case "rightbottom":
					q = m.top + e.height - i,
					q += .5 * o.width,
					q -= .5 * n.width,
					k && (q -= k),
					q -= Math.max(p, h.y || 0),
					b.lineTo(g, q),
					g += o.height,
					q -= .5 * o.width,
					b.lineTo(g, q),
					g -= o.height,
					q -= .5 * o.width,
					b.lineTo(g, q);
					break;
				case "rightmiddle":
				case "rightcenter":
					q = m.top + .5 * e.height + .5 * o.width,
					b.lineTo(g, q),
					g += o.height,
					q -= .5 * o.width,
					b.lineTo(g, q),
					g -= o.height,
					q -= .5 * o.width,
					b.lineTo(g, q);
					break;
				case "righttop":
					q = m.top + i,
					k && (q += k),
					q += o.width,
					q -= .5 * o.width - .5 * n.width,
					q += Math.max(p, h.y || 0),
					b.lineTo(g, q),
					g += o.height,
					q -= .5 * o.width,
					b.lineTo(g, q),
					g -= o.height,
					q -= .5 * o.width,
					b.lineTo(g, q)
				}
				j ? j && (b.arc(m.left + e.width - j, m.top + j, j, f(0), f( - 90), !0), q = m.top) : (g = m.left + e.width, q = m.top, b.lineTo(g, q));
				if (d.stem) switch (l) {
				case "topright":
					g = m.left + e.width - i,
					g += .5 * o.width - .5 * n.width,
					k && (g -= k),
					g -= Math.max(p, h.x || 0),
					b.lineTo(g, q),
					q -= o.height,
					g -= .5 * o.width,
					b.lineTo(g, q),
					q += o.height,
					g -= .5 * o.width,
					b.lineTo(g, q);
					break;
				case "topmiddle":
				case "topcenter":
					g = m.left + .5 * e.width + .5 * o.width,
					b.lineTo(g, q),
					q -= o.height,
					g -= .5 * o.width,
					b.lineTo(g, q),
					q += o.height,
					g -= .5 * o.width,
					b.lineTo(g, q),
					g = m.left + .5 * e.width - o.width,
					b.lineTo(g, q),
					b.lineTo(g, q);
					break;
				case "topleft":
					g = m.left + i + o.width,
					g -= .5 * o.width,
					g += .5 * n.width,
					k && (g += k),
					g += Math.max(p, h.x || 0),
					b.lineTo(g, q),
					q -= o.height,
					g -= .5 * o.width,
					b.lineTo(g, q),
					q += o.height,
					g -= .5 * o.width,
					b.lineTo(g, q)
				}
				b.lineTo(r.x, r.y - i),
				b.lineTo(r.x, r.y),
				d.closePath && b.closePath()
			},
			closeButtonMouseover: function () {
				var b = this.getTooltip().options.closeButton,
				b = b.diameter + 2 * b.border;
				a(this.defaultCloseButton).css({
					left: -1 * b + "px"
				}),
				a(this.hoverCloseButton).css({
					left: 0
				})
			},
			closeButtonMouseout: function () {
				var b = this.getTooltip().options.closeButton,
				b = b.diameter + 2 * b.border;
				a(this.defaultCloseButton).css({
					left: 0
				}),
				a(this.hoverCloseButton).css({
					left: b + "px"
				})
			},
			getStemLayout: function () {
				return s.getLayout(this, this.border)
			},
			getOrderLayout: function () {
				var a, b, c, d, e, g, h = this.contentDimensions,
				i = this.getTooltip().options,
				j = this.radius,
				k = this.border,
				l = this.padding,
				h = {
					width: 2 * k + 2 * l + h.width,
					height: 2 * k + 2 * l + h.height
				};
				this.options.stem && this.getStemLayout();
				var m = s.getBubbleLayout(this, h),
				l = m.dimensions,
				n = m.position,
				h = m.background.dimensions,
				o = m.background.position,
				p = 0,
				q = 0,
				r = l.width,
				t = l.height;
				return i.closeButton && (e = j, "background" == i.radius.position && (e += k), p = e - Math.sin(f(45)) * e, k = "right", this._hookPosition.toLowerCase().match(/^(topright|righttop)$/) && (k = "left"), g = e = i = i.closeButton.diameter + 2 * i.closeButton.border, q = o.left - i / 2 + ("left" == k ? p: h.width - p), p = o.top - i / 2 + p, "left" == k ? 0 > q && (i = Math.abs(q), r += i, n.left += i, q = 0) : (i = q + i - r, 0 < i && (r += i)), 0 > p && (i = Math.abs(p), t += i, n.top += i, p = 0), this.options.closeButton.shadow) && (a = this.options.closeButton.shadow, b = a.blur, i = a.offset, c = e + 2 * b, d = g + 2 * b, a = p - b + i.y, b = q - b + i.x, "left" == k ? 0 > b && (i = Math.abs(b), r += i, n.left += i, q += i, b = 0) : (i = b + c - r, 0 < i && (r += i)), 0 > a) && (i = Math.abs(a), t += i, n.top += i, p += i, a = 0),
				m = m.anchor,
				m.top += n.top,
				m.left += n.left,
				k = {
					left: Math.ceil(n.left + o.left + this.border + this.options.padding),
					top: Math.ceil(n.top + o.top + this.border + this.options.padding)
				},
				h = {
					tooltip: {
						dimensions: {
							width: Math.ceil(r),
							height: Math.ceil(t)
						}
					},
					skin: {
						dimensions: {
							width: Math.ceil(r),
							height: Math.ceil(t)
						}
					},
					bubble: {
						dimensions: l,
						position: {
							top: Math.round(n.top),
							left: Math.round(n.left)
						}
					},
					background: {
						dimensions: {
							width: Math.ceil(h.width),
							height: Math.ceil(h.height)
						},
						position: {
							top: Math.round(o.top),
							left: Math.round(o.left)
						}
					},
					anchor: {
						top: Math.round(m.top),
						left: Math.round(m.left)
					},
					content: {
						position: k
					}
				},
				this.options.closeButton && (h.closeButton = {
					dimensions: {
						width: Math.ceil(e),
						height: Math.ceil(g)
					},
					position: {
						top: Math.round(p),
						left: Math.round(q)
					}
				},
				this.options.closeButton.shadow && (h.closeButtonShadow = {
					dimensions: {
						width: Math.ceil(c),
						height: Math.ceil(d)
					},
					position: {
						top: Math.round(a),
						left: Math.round(b)
					}
				})),
				h
			},
			order: function () {
				var b = this.getOrderLayout(),
				c = this.getTooltip();
				a(c.container).css(d(b.tooltip.dimensions)),
				a(c.skinElement).css(d(b.skin.dimensions)),
				this.iframeShim && this.iframeShim.css(d(b.tooltip.dimensions)),
				a(this.bubble).css(a.extend(d(b.bubble.dimensions), d(b.bubble.position))),
				this.closeButton && (a(this.closeButton).css(d(b.closeButton.position)), b.closeButtonShadow && a(this.closeButtonShadow.container).css(d(b.closeButtonShadow.position))),
				a(c.contentElement).css(d(b.content.position))
			},
			setGlobalAlpha: function (a) {
				this._globalAlpha = a || 0,
				this.shadow && (this.shadow._globalAlpha = this._globalAlpha)
			},
			setOpacity: function (a) {
				this.setGlobalAlpha(a),
				this.build()
			}
		}
	} ());
	var v = {
		shadows: {},
		get: function (b) {
			if (!b) return null;
			var c = null;
			return (b = a(b).data("tipped-uid")) && (c = this.shadows[b]),
			c
		},
		add: function (a) {
			this.shadows[a.uid] = a
		},
		remove: function (a) {
			if (a = this.get(a)) delete this.shadows[a.uid],
			a.remove()
		},
		transition: function (a) {
			return Math.PI / 2 - Math.pow(a, Math.cos(a) * Math.PI)
		},
		Stem: {
			getBorderDimensions: function (a, b) {
				var c = u.get(a.element).getStemLayout().border.dimensions,
				c = this.getCenterBorderDimensions(c.width, c.height, b, {
					math: !1
				});
				return {
					width: c.width,
					height: c.height
				}
			},
			getCenterBorderDimensions2: function (a, b, c) {
				var d = .5 * a,
				g = 180 - e(Math.acos(d / Math.sqrt(d * d + b * b))) - 90,
				g = f(g),
				c = 1 / Math.cos(g) * c,
				d = 2 * (d + c);
				return {
					width: d,
					height: d / a * b
				}
			},
			getCenterBorderDimensions: function (a, b, c) {
				var d = 180 - e(Math.atan(.5 * (b / a))),
				c = Math.cos(f(d - 90)) * c,
				c = a + 2 * c;
				return {
					width: c,
					height: c * b / a
				}
			},
			getLayout: function (b) {
				var c = u.get(b.element),
				d = b.options.blur,
				e = r.isCorner(c._hookPosition);
				r.getOrientation(c._hookPosition),
				c = v.Stem.getBorderDimensions(b, d),
				c = {
					box: {
						dimensions: {
							width: Math.ceil(c.width),
							height: Math.ceil(c.height)
						},
						position: {
							top: 0,
							left: 0
						}
					}
				};
				if (d) {
					c.blurs = [];
					for (var f = 0; f <= d; f++) {
						var g = v.Stem.getBorderDimensions(b, f, {
							math: !1
						});
						c.blurs.push({
							position: {
								top: c.box.dimensions.height - g.height,
								left: e ? d - f: (c.box.dimensions.width - g.width) / 2
							},
							dimensions: g
						})
					}
				} else c.blurs = [a.extend({},
				c.box)];
				return c
			},
			rotate: function (a, b, c) {
				s.rotate(a, b.getSkin(), c)
			}
		}
	};
	a.extend(h.prototype, function () {
		return {
			prepare: function () {},
			remove: function () {
				this.cleanup()
			},
			cleanup: function () {
				this.container && (a(this.container).remove(), this.container = this.bubble = this.background = this.stem = null, this._cache = {})
			},
			build: function () {
				this.cleanup(),
				this.prepare();
				var b = this.getTooltip(),
				c = this.getSkin();
				this.container = a("<div>").addClass("t_Shadow")[0],
				a(b.container).prepend(this.container),
				c.iframeShim && a(b.container).prepend(c.iframeShim),
				c.getOrderLayout(),
				a(this.container).css({
					top: 0,
					left: 0
				}),
				this.drawBackground(),
				this.order()
			},
			getTooltip: function () {
				return x.get(this.element)[0]
			},
			getSkin: function () {
				return u.get(this.element)
			},
			getOrderLayout: function () {
				var b = this.getSkin(),
				c = b.getOrderLayout();
				this.getTooltip();
				var d = this.options.blur,
				e = a.extend({},
				c.background.dimensions);
				e.width += 2 * d,
				e.height += 2 * d;
				var f;
				b.options.stem && (f = v.Stem.getLayout(this).box.dimensions, f = f.height);
				var g = s.getBubbleLayout(b, e, f);
				f = g.dimensions;
				var h = g.position,
				e = g.background.dimensions,
				g = g.background.position,
				i = c.bubble.position,
				j = c.background.position,
				d = {
					top: i.top + j.top - (g.top + d) + this.options.offset.y,
					left: i.left + j.left - (g.left + d) + this.options.offset.x
				},
				i = c.anchor,
				j = c.skin.dimensions,
				k = {
					top: 0,
					left: 0
				};
				if (0 > d.top) {
					var l = Math.abs(d.top);
					k.top += l,
					d.top = 0,
					i.top += l
				}
				return 0 > d.left && (l = Math.abs(d.left), k.left += l, d.left = 0, i.left += l),
				l = {
					height: Math.max(f.height + d.top, j.height + k.top),
					width: Math.max(f.width + d.left, j.width + k.left)
				},
				b = {
					left: Math.ceil(k.left + c.bubble.position.left + c.background.position.left + b.border + b.padding),
					top: Math.ceil(k.top + c.bubble.position.top + c.background.position.top + b.border + b.padding)
				},
				{
					tooltip: {
						dimensions: l
					},
					skin: {
						dimensions: j,
						position: k
					},
					container: {
						dimensions: f,
						position: d
					},
					bubble: {
						dimensions: f,
						position: {
							top: Math.round(h.top),
							left: Math.round(h.left)
						}
					},
					background: {
						dimensions: {
							width: Math.ceil(e.width),
							height: Math.ceil(e.height)
						},
						position: {
							top: Math.round(g.top),
							left: Math.round(g.left)
						}
					},
					anchor: i,
					content: {
						position: b
					}
				}
			},
			getBlurOpacity: function () {
				return this.options.opacity / (this.options.blur + 1)
			},
			drawBackground: function () {
				var b = this.getSkin(),
				c = b.getOrderLayout(),
				e = this.getTooltip(),
				f = this.getOrderLayout(),
				g = this.options.blur,
				h = v.Stem.getLayout(this),
				i = b._hookPosition,
				j = r.getSide(i),
				k = g,
				l = g;
				if (e.options.stem) {
					var m = h.blurs[h.blurs.length - 1];
					"left" == j && (l += Math.ceil(m.dimensions.height)),
					"top" == j && (k += Math.ceil(m.dimensions.height))
				}
				var n = b._cache.options,
				m = n.radius,
				n = n.border;
				"background" == e.options.radius.position && m && (m += n),
				a(this.container).append(a(this.bubble = document.createElement("div")).attr({
					"class": "t_ShadowBubble"
				}).css(d(f.bubble.dimensions))).css(d(f.bubble.dimensions)),
				a(document.body).append(a(this.bubbleCanvas = document.createElement("canvas")).attr(f.bubble.dimensions)),
				q.init(this.bubbleCanvas),
				e = this.bubbleCanvas.getContext("2d"),
				e.globalAlpha = this._globalAlpha,
				a(this.bubble).append(this.bubbleCanvas);
				for (var f = g + 1, o = 0; o <= g; o++) e.fillStyle = t.hex2fill(this.options.color, v.transition(o * (1 / f)) * (this.options.opacity / f)),
				q.drawRoundedRectangle(e, {
					width: c.background.dimensions.width + 2 * o,
					height: c.background.dimensions.height + 2 * o,
					top: k - o,
					left: l - o,
					radius: m + o
				});
				if (b.options.stem) {
					var o = h.blurs[0].dimensions,
					p = b.options.stem,
					g = n + .5 * p.width,
					s = b.options.radius && "background" == b.options.radius.position ? b.options.radius.size || 0 : 0;
					s && (g += s),
					n = n + s + .5 * p.width - .5 * o.width,
					m = Math.ceil(m > n ? m - n: 0),
					g += Math.max(m, b.options.stem.offset && b.options.stem.offset[j && /^(left|right)$/.test(j) ? "y": "x"] || 0);
					if ("top" == j || "bottom" == j) {
						switch (i) {
						case "topleft":
						case "bottomleft":
							l += g;
							break;
						case "topmiddle":
						case "topcenter":
						case "bottommiddle":
						case "bottomcenter":
							l += .5 * c.background.dimensions.width;
							break;
						case "topright":
						case "bottomright":
							l += c.background.dimensions.width - g
						}
						"bottom" == j && (k += c.background.dimensions.height),
						o = 0;
						for (b = h.blurs.length; o < b; o++) e.fillStyle = t.hex2fill(this.options.color, v.transition(o * (1 / f)) * (this.options.opacity / f)),
						g = h.blurs[o],
						e.beginPath(),
						"top" == j ? (e.moveTo(l, k - o), e.lineTo(l - .5 * g.dimensions.width, k - o), e.lineTo(l, k - o - g.dimensions.height), e.lineTo(l + .5 * g.dimensions.width, k - o)) : (e.moveTo(l, k + o), e.lineTo(l - .5 * g.dimensions.width, k + o), e.lineTo(l, k + o + g.dimensions.height), e.lineTo(l + .5 * g.dimensions.width, k + o)),
						e.closePath(),
						e.fill()
					} else {
						switch (i) {
						case "lefttop":
						case "righttop":
							k += g;
							break;
						case "leftmiddle":
						case "leftcenter":
						case "rightmiddle":
						case "rightcenter":
							k += .5 * c.background.dimensions.height;
							break;
						case "leftbottom":
						case "rightbottom":
							k += c.background.dimensions.height - g
						}
						"right" == j && (l += c.background.dimensions.width),
						o = 0;
						for (b = h.blurs.length; o < b; o++) e.fillStyle = t.hex2fill(this.options.color, v.transition(o * (1 / f)) * (this.options.opacity / f)),
						g = h.blurs[o],
						e.beginPath(),
						"left" == j ? (e.moveTo(l - o, k), e.lineTo(l - o, k - .5 * g.dimensions.width), e.lineTo(l - o - g.dimensions.height, k), e.lineTo(l - o, k + .5 * g.dimensions.width)) : (e.moveTo(l + o, k), e.lineTo(l + o, k - .5 * g.dimensions.width), e.lineTo(l + o + g.dimensions.height, k), e.lineTo(l + o, k + .5 * g.dimensions.width)),
						e.closePath(),
						e.fill()
					}
				}
			},
			order: function () {
				var b = this.getOrderLayout(),
				c = this.getSkin(),
				e = this.getTooltip();
				a(e.container).css(d(b.tooltip.dimensions)),
				a(e.skinElement).css(a.extend(d(b.skin.position), d(b.skin.dimensions))),
				c.iframeShim && c.iframeShim.css(d(b.tooltip.dimensions));
				if (e.options.closeButton) {
					var f = c.getOrderLayout(),
					g = b.skin.position,
					h = f.closeButton.position;
					a(c.closeButton).css(d({
						top: g.top + h.top,
						left: g.left + h.left
					})),
					e.options.closeButton.shadow && (f = f.closeButtonShadow.position, a(c.closeButtonShadow.container).css(d({
						top: g.top + f.top,
						left: g.left + f.left
					})))
				}
				a(this.container).css(a.extend(d(b.container.dimensions), d(b.container.position))),
				a(this.bubble).css(d(b.bubble.dimensions)),
				a(e.contentElement).css(d(b.content.position))
			}
		}
	} ());
	var w = {
		shadows: {},
		get: function (b) {
			return b ? (b = a(b).data("tipped-uid")) ? this.shadows[b] : null: null
		},
		add: function (a) {
			this.shadows[a.uid] = a
		},
		remove: function (a) {
			if (a = this.get(a)) delete this.shadows[a.uid],
			a.remove()
		}
	};
	a.extend(i.prototype, function () {
		return {
			build: function () {
				this.cleanup(),
				this.getTooltip();
				var b = this.getSkin(),
				c = b.getOrderLayout().closeButton.dimensions,
				d = a.extend({},
				c),
				e = this.options.blur;
				d.width += 2 * e,
				d.height += 2 * e,
				a(b.closeButton).before(a(this.container = document.createElement("div")).attr({
					"class": "t_CloseButtonShadow"
				})),
				a(document.body).append(a(this.closeButtonCanvas = document.createElement("canvas")).attr(d)),
				q.init(this.closeButtonCanvas),
				b = this.closeButtonCanvas.getContext("2d"),
				b.globalAlpha = this._globalAlpha,
				a(this.container).append(this.closeButtonCanvas);
				for (var g = d.width / 2, d = d.height / 2, c = c.height / 2, h = e + 1, i = 0; i <= e; i++) b.fillStyle = t.hex2fill(this.options.color, v.transition(i * (1 / h)) * (this.options.opacity / h)),
				b.beginPath(),
				b.arc(g, d, c + i, f(0), f(360), !0),
				b.closePath(),
				b.fill()
			},
			remove: function () {
				this.cleanup()
			},
			cleanup: function () {
				this.container && (a(this.container).remove(), this.container = null)
			},
			getTooltip: function () {
				return x.get(this.element)[0]
			},
			getSkin: function () {
				return u.get(this.element)
			},
			getBlurOpacity: function () {
				return this.options.opacity / (this.options.blur + 1)
			}
		}
	} ());
	var x = {
		tooltips: {},
		options: {
			defaultSkin: "black",
			startingZIndex: 999999
		},
		startDelegating: function () {
			return function () {
				var b = ["click"];
				Tipped.support.touch && (b.push("touchstart"), a(document.body).bind("click", function () {})),
				a.each(b, function (b, c) {
					a(document.documentElement).bind(c, function (b) {
						var c = m.findElement(b, ".t_Tooltip .t_Close, .t_Tooltip .close-tooltip");
						c && (b.preventDefault(), b.stopPropagation(), x.getByTooltipElement(a(c).closest(".t_Tooltip")[0]).hide())
					})
				}),
				a(window).bind("resize", a.proxy(this.onWindowResize, this))
			}
		} (),
		onWindowResize: function () {
			this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null),
			window.setTimeout(a.proxy(function () {
				var b = this.getVisible();
				a.each(b, function (a, b) {
					b.position()
				})
			},
			this), 200)
		},
		_getTooltip: function (b) {
			var c = a(b).data("tipped-uid"),
			d;
			c || (b = this.getByTooltipElement(a(b).closest(".t_Tooltip")[0])) && b.element && (c = a(b.element).data("tipped-uid"));
			if (c && (d = this.tooltips[c])) return d
		},
		findElement: function (a) {
			var b;
			return m.isElement(a) && (b = this._getTooltip(a)),
			b && b.element
		},
		get: function (b) {
			var c = [];
			if (m.isElement(b)) {
				var d = this._getTooltip(b);
				d && (c = [d])
			} else a.each(this.tooltips, function (d, e) {
				e.element && a(e.element).is(b) && c.push(e)
			});
			return c
		},
		getByTooltipElement: function (b) {
			if (!b) return null;
			var c = null;
			return a.each(this.tooltips, function (a, d) {
				d.getState("build") && d.container === b && (c = d)
			}),
			c
		},
		getBySelector: function (b) {
			var c = [];
			return a.each(this.tooltips, function (d, e) {
				e.element && a(e.element).is(b) && c.push(e)
			}),
			c
		},
		show: function (b) {
			m.isElement(b) ? (b = this.get(b)[0]) && b.show() : a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.show()
			},
			this))
		},
		hide: function (b) {
			m.isElement(b) ? (b = this.get(b)[0]) && b.hide() : a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.hide()
			},
			this))
		},
		toggle: function (b) {
			m.isElement(b) ? (b = this.get(b)[0]) && b.toggle() : a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.toggle()
			},
			this))
		},
		hideAll: function () {
			a.each(this.getVisible(), function (a, b) {
				b.hide()
			})
		},
		refresh: function (b) {
			m.isElement(b) ? (b = this.get(b)[0]) && b.refresh() : a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.refresh()
			},
			this))
		},
		getVisible: function () {
			var b = [];
			return a.each(this.tooltips, function (a, c) {
				c.visible() && b.push(c)
			}),
			b
		},
		isVisibleByElement: function (a) {
			return m.isElement(a) ? m.any(this.getVisible() || [], function (b) {
				return b.element == a
			}) : !1
		},
		visible: function () {
			return m.select(this.tooltips, function (a) {
				return a.visible()
			})
		},
		getHighestTooltip: function () {
			var b = 0,
			c;
			return a.each(this.tooltips, function (a, d) {
				d.zIndex > b && (b = d.zIndex, c = d)
			}),
			c
		},
		resetZ: function () {
			1 >= this.getVisible().length && a.each(this.tooltips, function (b, c) {
				c.getState("build") && !c.options.zIndex && a(c.container).css({
					zIndex: c.zIndex = +x.options.startingZIndex
				})
			})
		},
		add: function (a) {
			this.tooltips[a.uid] = a
		},
		_remove: function (b) {
			if (b = this._getTooltip(b)) delete this.tooltips[a(b.element).data("tipped-uid")],
			b.hide(),
			b.remove()
		},
		remove: function (b) {
			m.isElement(b) ? this._remove(b) : a(b).each(a.proxy(function (a, b) {
				this._remove(b)
			},
			this))
		},
		removeDetached: function () {
			a.each(this.tooltips, a.proxy(function (a, b) {
				b.element && !m.element.isAttached(b.element) && this._remove(b.element)
			},
			this))
		},
		setDefaultSkin: function (a) {
			this.options.defaultSkin = a || "black"
		},
		setStartingZIndex: function (a) {
			this.options.startingZIndex = a || 0
		},
		createOptions: function () {
			function b(b) {
				return "string" == a.type(b) ? {
					element: f.hideOn && f.hideOn.element || e.hideOn.element,
					event: b
				}: j(a.extend({},
				e.hideOn), b)
			}
			function c(b) {
				return e = Tipped.Skins.base,
				f = j(a.extend({},
				e), Tipped.Skins.reset),
				g = Tipped.Skins.CloseButtons.base,
				h = j(a.extend({},
				g), Tipped.Skins.CloseButtons.reset),
				c = d,
				d(b)
			}
			function d(c) {
				c.skin = c.skin || (Tipped.Skins[x.options.defaultSkin] ? x.options.defaultSkin: "black");
				var d = c.skin ? a.extend({},
				Tipped.Skins[c.skin] || Tipped.Skins[x.options.defaultSkin]) : {},
				d = j(a.extend({},
				f), d),
				d = j(a.extend({},
				d), c);
				d.ajax && ("boolean" == a.type(d.ajax) && (d.ajax = {
					cache: f.ajax && f.ajax.cache || e.ajax.cache,
					type: f.ajax && f.ajax.type || e.ajax.type
				}), d.ajax = j(a.extend({},
				e.ajax), d.ajax)),
				d.background && "string" == a.type(d.background) && (d.background = {
					color: d.background,
					opacity: 1
				});
				if (d.border) {
					var i;
					i = "number" == a.type(d.border) ? {
						size: d.border,
						color: f.border && f.border.color || e.border.color,
						opacity: f.border && f.border.opacity || e.border.opacity
					}: j(a.extend({},
					e.border), d.border),
					d.border = 0 === i.size ? !1 : i
				}
				d.radius && (i = "number" == a.type(d.radius) ? {
					size: d.radius,
					position: f.radius && f.radius.position || e.radius.position
				}: j(a.extend({},
				e.radius), d.radius), d.radius = 0 === i.size ? !1 : i),
				i = i = d.hook && d.hook.target || "string" == a.type(d.hook) && d.hook || f.hook && f.hook.target || "string" == a.type(f.hook) && f.hook || e.hook && e.hook.target || e.hook;
				var k = d.hook && d.hook.tooltip || f.hook && f.hook.tooltip || e.hook && e.hook.tooltip || x.Position.getInversedPosition(i);
				if (d.hook) {
					if ("string" == a.type(d.hook)) i = {
						target: d.hook,
						tooltip: x.Position.getTooltipPositionFromTarget(d.hook)
					};
					else if (i = {
						tooltip: k,
						target: i
					},
					d.hook.tooltip && (i.tooltip = d.hook.tooltip), d.hook.target) i.target = d.hook.target
				} else i = {
					tooltip: k,
					target: i
				};
				d.hook = i,
				"mouse" == d.target ? (k = a.extend({},
				e.offset.mouse), a.extend(k, Tipped.Skins.reset.offset || {}), c.skin && a.extend(k, (Tipped.Skins[c.skin] || Tipped.Skins[x.options.defaultSkin]).offset || {}), k = x.Position.adjustOffsetBasedOnHooks(e.offset.mouse, e.hook, i.target), c.offset && (k = a.extend(k, c.offset || {})), d.fadeOut = 0) : k = {
					x: d.offset.x,
					y: d.offset.y
				},
				d.offset = k;
				if (d.closeButton && d.closeButtonSkin) {
					var c = a.extend({},
					Tipped.Skins.CloseButtons[d.closeButtonSkin]),
					l = j(a.extend({},
					h), c);
					l.states && a.each(["default", "hover"], function (b, c) {
						var d = l.states[c],
						e = h.states && h.states[c];
						if (d.background) {
							var f = e && e.background;
							a.type(d.background) == "number" ? d.background = {
								color: f && f.color || g.states[c].background.color,
								opacity: d.background
							}: a.type(d.background) == "string" ? (f = f && a.type(f.opacity) == "number" && f.opacity || g.states[c].background.opacity, d.background = {
								color: d.background,
								opacity: f
							}) : d.background = j(a.extend({},
							g.states[c].background), d.background)
						}
						d.border && (e = e && e.border, d.border = a.type(d.border) == "number" ? {
							color: e && e.color || g.states[c].border.color,
							opacity: d.border
						}: j(a.extend({},
						g.states[c].border), d.border))
					}),
					l.shadow && (c = h.shadow && h.shadow.constructor && h.shadow.constructor == Object ? h.shadow: g.shadow, l.shadow.constructor && l.shadow.constructor == Object && (c = j(c, l.shadow)), l.shadow = c),
					d.closeButton = l
				}
				d.shadow && (c = "boolean" == a.type(d.shadow) ? f.shadow && "boolean" == a.type(f.shadow) ? e.shadow: f.shadow ? f.shadow: e.shadow: j(a.extend({},
				e.shadow), d.shadow || {}), "number" == a.type(c.offset) && (c.offset = {
					x: c.offset,
					y: c.offset
				}), d.shadow = c),
				d.stem && (c = {},
				c = "boolean" == a.type(d.stem) ? j({},
				e.stem) : j(j({},
				e.stem), a.extend({},
				d.stem)), "number" == a.type(c.offset) && (c.offset = {
					x: c.offset,
					y: c.offset
				}), d.stem = c),
				d.containment && ("string" == a.type(d.containment) ? d.containment = {
					selector: d.containment,
					flip: !0
				}: "boolean" == a.type(d.containment) && (d.containment = d.containment ? {
					selector: "viewport",
					flip: !0
				}: !1)),
				d.hideOn && "click-outside" == d.hideOn && (d.hideOnClickOutside = !0, d.hideOn = !1);
				if (d.hideOn) if (a.isArray(d.hideOn)) {
					var m = [];
					a.each(d.hideOn, function (a, c) {
						m.push(b(c))
					}),
					d.hideOn = m
				} else d.hideOn = [b(d.hideOn)];
				return d.showOn && "string" == a.type(d.showOn) && (d.showOn = ["" + d.showOn]),
				d.padding = 0,
				d.spinner && !window.Spinners && (d.spinner = !1),
				d
			}
			var e, f, g, h;
			return c
		} ()
	};
	x.Position = function () {
		function b(b, c) {
			var d = r.split(b),
			e = d[1],
			d = d[2],
			f = r.getOrientation(b),
			g = a.extend({
				horizontal: !0,
				vertical: !0
			},
			c || {});
			return "horizontal" == f ? (g.vertical && (e = k[e]), g.horizontal && (d = k[d])) : (g.vertical && (d = k[d]), g.horizontal && (e = k[e])),
			e + d
		}
		function c(b, c) {
			if (b.options.containment) {
				var d = c,
				e = j(b),
				f = e.dimensions,
				e = e.position,
				g = u.get(b.element)._cache.hook[d.hook.tooltip].tooltip.dimensions,
				h = d.position;
				e.left > h.left && (d.position.left = e.left),
				e.top > h.top && (d.position.top = e.top),
				e.left + f.width < h.left + g.width && (d.position.left = e.left + f.width - g.width),
				e.top + f.height < h.top + g.height && (d.position.top = e.top + f.height - g.height),
				c = d
			}
			b.setHookPosition(c.hook.tooltip),
			d = c.position,
			a(b.container).css({
				top: d.top + "px",
				left: d.left + "px"
			})
		}
		function d(a) {
			return a && (/^mouse|click|touch$/.test("string" == typeof a.type && a.type || "") || 0 <= a.pageX)
		}
		function e(a, b, c, d) {
			var e = a >= c && a <= d,
			f = b >= c && b <= d;
			return e && f ? b - a: e && !f ? d - a: !e && f ? b - c: (e = c >= a && c <= b, f = d >= a && d <= b, e && f ? d - c: e && !f ? b - c: !e && f ? d - a: 0)
		}
		function f(a, b) {
			var c = a.dimensions.width * a.dimensions.height;
			return c ? e(a.position.left, a.position.left + a.dimensions.width, b.position.left, b.position.left + b.dimensions.width) * e(a.position.top, a.position.top + a.dimensions.height, b.position.top, b.position.top + b.dimensions.height) / c: 0
		}
		function g(a, b) {
			var c = r.split(b),
			d = {
				left: 0,
				top: 0
			};
			if ("horizontal" == r.getOrientation(b)) {
				switch (c[2]) {
				case "middle":
				case "center":
					d.left = .5 * a.width;
					break;
				case "right":
					d.left = a.width
				}
				"bottom" == c[1] && (d.top = a.height)
			} else {
				switch (c[2]) {
				case "middle":
				case "center":
					d.top = .5 * a.height;
					break;
				case "bottom":
					d.top = a.height
				}
				"right" == c[1] && (d.left = a.width)
			}
			return d
		}
		function h(b) {
			var c = m.element.cumulativeOffset(b),
			b = m.element.cumulativeScrollOffset(b),
			d = a(window).scrollTop(),
			e = a(window).scrollLeft();
			return c.left += -1 * (b.left - e),
			c.top += -1 * (b.top - d),
			c
		}
		function i(c, e, i, k) {
			var n, o, p = u.get(c.element),
			q = p.options.offset,
			s = d(i);
			s || !i ? (o = {
				width: 1,
				height: 1
			},
			s ? (n = m.pointer(i), n = {
				top: n.y,
				left: n.x
			}) : (n = c._cache.event, n = {
				top: n ? n.y: 0,
				left: n ? n.x: 0
			}), c._cache.event = {
				x: n.left,
				y: n.top
			}) : (n = h(i), o = {
				width: a(i).outerWidth(),
				height: a(i).outerHeight()
			});
			if (p.options.stem && "mouse" != p.options.target) {
				var i = r.split(k),
				t = r.split(e),
				w = r.getOrientation(k),
				x = p._cache.options,
				y = p.getStemLayout().border.dimensions,
				A = x.radius,
				x = x.border,
				B = A && "background" == p.options.radius.position ? A: 0,
				A = A && "border" == p.options.radius.position ? A: A + x,
				y = x + B + .5 * p.options.stem.width - .5 * y.width,
				y = Math.ceil(x + B + .5 * p.options.stem.width + (A > y ? A - y: 0) + p.options.stem.offset["horizontal" == w ? "x": "y"]);
				if ("horizontal" == w && "left" == i[2] && "left" == t[2] || "right" == i[2] && "right" == t[2]) o.width -= 2 * y,
				n.left += y;
				else if ("vertical" == w && "top" == i[2] && "top" == t[2] || "bottom" == i[2] && "bottom" == t[2]) o.height -= 2 * y,
				n.top += y
			}
			i = a.extend({},
			n),
			p = s ? b(p.options.hook.tooltip) : p.options.hook.target,
			g(o, p),
			s = g(o, k),
			n = {
				left: n.left + s.left,
				top: n.top + s.top
			},
			q = a.extend({},
			q),
			q = l(q, p, k),
			n.top += q.y,
			n.left += q.x,
			p = u.get(c.element),
			q = p._cache.hook,
			s = a.extend({},
			q[e]),
			n = {
				top: n.top - s.anchor.top,
				left: n.left - s.anchor.left
			},
			s.tooltip.position = n,
			s = {
				horizontal: !0,
				vertical: !0
			};
			if (c.options.containment) {
				if (t = j(c), c = (c.options.shadow ? v.get(c.element) : p).getOrderLayout().tooltip.dimensions, s.overlap = f({
					dimensions: c,
					position: n
				},
				t), 1 > s.overlap) {
					if (n.left < t.position.left || n.left + c.width > t.position.left + t.dimensions.width) s.horizontal = !1;
					if (n.top < t.position.top || n.top + c.height > t.position.top + t.dimensions.height) s.vertical = !1
				}
			} else s.overlap = 1;
			return c = q[e].bubble,
			o = f({
				dimensions: o,
				position: i
			},
			{
				dimensions: c.dimensions,
				position: {
					top: n.top + c.position.top,
					left: n.left + c.position.left
				}
			}),
			{
				position: n,
				overlap: {
					target: o
				},
				contained: s,
				hook: {
					tooltip: e,
					target: k
				}
			}
		}
		function j(b) {
			var c = {
				top: a(window).scrollTop(),
				left: a(window).scrollLeft()
			},
			d = b.options.target;
			if ("mouse" == d || "self" == d) d = b.element;
			d = a(d).closest(b.options.containment.selector).first()[0];
			if (!d || "viewport" == b.options.containment.selector) return {
				dimensions: {
					width: a(window).width(),
					height: a(window).height()
				},
				position: c
			};
			var b = m.element.cumulativeOffset(d),
			e = m.element.cumulativeScrollOffset(d);
			return b.left += -1 * (e.left - c.left),
			b.top += -1 * (e.top - c.top),
			{
				dimensions: {
					width: a(d).innerWidth(),
					height: a(d).innerHeight()
				},
				position: b
			}
		}
		var k = {
			left: "right",
			right: "left",
			top: "bottom",
			bottom: "top",
			middle: "middle",
			center: "center"
		},
		l = function () {
			var a = [[ - 1, -1], [0, -1], [1, -1], [ - 1, 0], [0, 0], [1, 0], [ - 1, 1], [0, 1], [1, 1]],
			b = {
				lefttop: 0,
				topleft: 0,
				topmiddle: 1,
				topcenter: 1,
				topright: 2,
				righttop: 2,
				rightmiddle: 5,
				rightcenter: 5,
				rightbottom: 8,
				bottomright: 8,
				bottommiddle: 7,
				bottomcenter: 7,
				bottomleft: 6,
				leftbottom: 6,
				leftmiddle: 3,
				leftcenter: 3
			};
			return function (c, d, e) {
				var f = a[b[d]],
				g = a[b[e]],
				f = [Math.floor(.5 * Math.abs(f[0] - g[0])) ? -1 : 1, Math.floor(.5 * Math.abs(f[1] - g[1])) ? -1 : 1];
				return ! r.isCenter(d) && r.isCenter(e) && ("horizontal" == r.getOrientation(e) ? f[0] = 0 : f[1] = 0),
				{
					x: f[0] * c.x,
					y: f[1] * c.y
				}
			}
		} ();
		return {
			get: i,
			set: function (a, d, e, g) {
				var h = i(a, d, e, g);
				/move$/.test(e && "string" == typeof e.type ? e.type: "");
				if (1 === h.contained.overlap) c(a, h);
				else {
					var j = d,
					k = g,
					k = {
						horizontal: !h.contained.horizontal,
						vertical: !h.contained.vertical
					};
					if (!r.isCenter(d)) return j = b(d, k),
					k = b(g, k),
					h = i(a, j, e, k),
					c(a, h),
					h;
					if ("horizontal" == r.getOrientation(d) && k.vertical || "vertical" == r.getOrientation(d) && k.horizontal) if (j = b(d, k), k = b(g, k), h = i(a, j, e, k), 1 === h.contained.overlap) return c(a, h),
					h;
					d = [],
					g = r.positions,
					j = 0;
					for (k = g.length; j < k; j++) for (var l = g[j], m = 0, n = r.positions.length; m < n; m++) d.push(i(a, r.positions[m], e, l));
					for (var e = h, o = u.get(a.element)._cache.hook, j = o[e.hook.tooltip], g = 0, p = e.position.left + j.anchor.left, q = e.position.top + j.anchor.top, s = 0, t = 1, v = {
						dimensions: j.tooltip.dimensions,
						position: e.position
					},
					w = 0, j = 1, l = k = 0, m = d.length; l < m; l++) {
						n = d[l],
						n.score = {},
						n.score.containment = n.contained.overlap;
						var x = o[n.hook.tooltip].anchor,
						x = Math.sqrt(Math.pow(Math.abs(n.position.left + x.left - p), 2) + Math.pow(Math.abs(n.position.top + x.top - q), 2)),
						g = Math.max(g, x);
						n.score.distance = x,
						x = n.overlap.target,
						t = Math.min(t, x),
						s = Math.max(s, x),
						n.score.targetOverlap = x,
						x = f(v, {
							dimensions: o[n.hook.tooltip].tooltip.dimensions,
							position: n.position
						}),
						j = Math.min(j, x),
						w = Math.max(w, x),
						n.score.tooltipOverlap = x,
						x = "horizontal" == r.getOrientation(e.hook.target) ? "top": "left",
						x = Math.abs(e.position[x] - n.position[x]),
						k = Math.max(k, x),
						n.score.orientationOffset = x
					}
					for (var o = 0, y, s = Math.max(e.overlap.target - t, s - e.overlap.target), t = w - j, l = 0, m = d.length; l < m; l++) n = d[l],
					w = 51 * n.score.containment,
					w += 18 * (1 - n.score.distance / g) || 9,
					p = Math.abs(e.overlap.target - n.score.targetOverlap) || 0,
					w += 4 * (1 - (p / s || 1)),
					w += 11 * ((n.score.tooltipOverlap - j) / t || 0),
					w += r.isCenter(n.hook.tooltip) ? 0 : 25 * (1 - n.score.orientationOffset / (k || 1)),
					o = Math.max(o, w),
					w == o && (y = l);
					c(a, d[y])
				}
				return h
			},
			getInversedPosition: b,
			getTooltipPositionFromTarget: function (a) {
				return a = r.split(a),
				b(a[1] + k[a[2]])
			},
			getAbsoluteOffset: h,
			adjustOffsetBasedOnHooks: l,
			isPointerEvent: d
		}
	} (),
	x.Position.mouseBuffer = {
		x: 0,
		y: 0
	},
	a(document).ready(function () {
		a(document).bind("mousemove", function (a) {
			x.Position.mouseBuffer = m.pointer(a)
		})
	}),
	x.UpdateQueue = function () {
		function b(b) {
			return {
				width: a(b).innerWidth(),
				height: a(b).innerHeight()
			}
		}
		function c(c) {
			var d = b(c),
			e = c.parentNode;
			return e && a(e).css({
				width: d.width + "px"
			}) && b(c).height > d.height && d.width++,
			a(e).css({
				width: "100%"
			}),
			d
		}
		return {
			build: function () {
				a(document.body).append(a(document.createElement("div")).attr({
					"class": "t_UpdateQueue"
				}).append(a(document.createElement("div")).attr({
					"class": "t_Tooltip"
				}).append(a(this.container = document.createElement("div")).attr({
					"class": "t_Content"
				}))))
			},
			update: function (b, c, d, e) {
				this.container || this.build(),
				e = a.extend({
					spinner: !1
				},
				e || {}),
				(b.options.inline || m.isElement(c)) && !a(c).data("isSpinner") && (b.options.inline && "string" == a.type(c) && (b.inlineContent = a("#" + c)[0], c = b.inlineContent), !b.inlineMarker && c && m.element.isAttached(c)) && (a(b.inlineContent).data("tipped_restore_inline_display", a(b.inlineContent).css("display")), b.inlineMarker = document.createElement("div"), a(b.inlineContent).before(a(b.inlineMarker).hide()));
				var f = document.createElement("div");
				a(this.container).append(a(f).attr({
					"class": "t_ContentContainer t_clearfix"
				}).append(c)),
				m.isElement(c) && a(c).show(),
				b.options.skin && a(f).addClass("t_Content_" + b.options.skin);
				var g = a(f).find("img[src]").filter(function () {
					return ! a(this).attr("height") || !a(this).attr("width")
				});
				if (0 < g.length && !b.getState("preloading_images")) {
					b.setState("preloading_images", !0),
					b.options.spinner && (!e.spinner && !b.spinner && (b.spinner = b.insertSpinner(b.options.spinner)), b.getState("visible") && (b.position(), a(b.container).show()), b.spinner.play());
					var h = 0,
					c = Math.max(8e3, 750 * (g.length || 0));
					b.clearTimer("preloading_images"),
					b.setTimer("preloading_images", a.proxy(function () {
						g.each(function () {
							this.onload = function () {}
						}),
						h >= g.length || (this._updateTooltip(b, f), d && d())
					},
					this), c),
					a.each(g, a.proxy(function (c, e) {
						var i = new Image;
						i.onload = a.proxy(function () {
							i.onload = function () {};
							var c = i.width,
							j = i.height,
							k = a(e).attr("width"),
							l = a(e).attr("height");
							if (!k || !l) ! k && l ? (c = Math.round(l * c / j), j = l) : !l && k && (j = Math.round(k * j / c), c = k),
							a(e).attr({
								width: c,
								height: j
							}),
							h++;
							h == g.length && (b.clearTimer("preloading_images"), b.spinner && (b.spinner.remove(), b.spinner = null), b.getState("visible") && a(b.container).hide(), this._updateTooltip(b, f), d && d())
						},
						this),
						i.src = e.src
					},
					this))
				} else this._updateTooltip(b, f),
				d && d()
			},
			_updateTooltip: function (b, d) {
				var e = c(d),
				f = e.width - (parseInt(a(d).css("padding-left")) || 0) - (parseInt(a(d).css("padding-right")) || 0);
				parseInt(a(d).css("padding-top")),
				parseInt(a(d).css("padding-bottom")),
				b.options.maxWidth && "number" == a.type(b.options.maxWidth) && f > b.options.maxWidth && (a(d).css({
					width: b.options.maxWidth + "px"
				}), e = c(d)),
				b._cache.contentDimensions = e,
				a(b.contentElement).html(d)
			},
			getMeasureElementDimensions: c
		}
	} (),
	a.extend(k.prototype, function () {
		return {
			build: function () {
				this.getState("build") || (a(document.body).append(a(this.container).css({
					left: "-10000px",
					top: "-10000px",
					zIndex: this.zIndex
				}).append(a(this.skinElement = document.createElement("div")).attr({
					"class": "t_Skin"
				})).append(a(this.contentElement = document.createElement("div")).attr({
					"class": "t_Content"
				}))), a(this.container).addClass("t_Tooltip_" + this.options.skin), this.options.hideOnClickOutside && (a(this.element).addClass("t_hideOnClickOutside"), this.setEvent(document.documentElement, "click", a.proxy(function (a) {
					this.visible() && (a = m.findElement(a, ".t_Tooltip, .t_hideOnClickOutside"), (!a || a && a != this.container && a != this.element) && this.hide())
				},
				this))), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_hidden")), this.createPostBuildObservers(), this.setState("build", !0), x.add(this))
			},
			_preBuild: function () {
				a(this.container = document.createElement("div")).attr({
					"class": "t_Tooltip"
				}),
				this.createPreBuildObservers()
			},
			_buildSkin: function () {
				this.build();
				var a = u.get(this.element);
				a ? a.build() : (new g(this.element), this.setState("skinned", !0))
			},
			createPreBuildObservers: function () {
				this.setEvent(this.element, "mouseenter", this.setActive),
				this.setEvent(this.element, "mouseleave", a.proxy(function (a) {
					this.setIdle(a)
				},
				this)),
				this.options.showOn && a.each(this.options.showOn, a.proxy(function (b, c) {
					var d = !1;
					"click" == c && (d = this.options.hideOn && m.any(this.options.hideOn, function (a) {
						return "self" == a.element && "click" == a.event
					}), this.setState("toggles", d)),
					this.setEvent(this.element, c, "click" == c ? d ? this.toggle: this.show: a.proxy(function () {
						this.showDelayed()
					},
					this))
				},
				this)),
				this.options.hideOn ? a.each(this.options.hideOn, a.proxy(function (b, c) {
					var d;
					switch (c.element) {
					case "self":
						if (this.getState("toggles") && "click" == c.event) return;
						d = this.element;
						break;
					case "target":
						d = this.target
					}
					d && this.setEvent(d, c.event, "click" == c.event ? this.hide: a.proxy(function () {
						this.hideDelayed()
					},
					this))
				},
				this)) : this.options.showDelay && this.options.showOn && -1 < !a.inArray("click", this.options.showOn) && this.setEvent(this.element, "mouseleave", a.proxy(function () {
					this.clearTimer("show")
				},
				this));
				var b = !1; ! this.options.fixed && this.options.showOn && ((b = -1 < a.inArray("mousemove", this.options.showOn)) || -1 < a.inArray("touchmove", this.options.showOn)) && "mouse" == this.target && this.setEvent(this.element, b ? "mousemove": "touchmove", function (a) {
					this.getState("skinned") && this.position(a)
				})
			},
			createPostBuildObservers: function () {
				this.setEvent(this.container, "mouseenter", this.setActive),
				this.setEvent(this.container, "mouseleave", this.setIdle),
				this.setEvent(this.container, "mouseenter", a.proxy(function () {
					this.getTimer("fadeTransition") || this.show()
				},
				this)),
				this.options.hideOn && a.each(this.options.hideOn, a.proxy(function (b, c) {
					var d;
					switch (c.element) {
					case "tooltip":
						d = this.container
					}
					d && this.setEvent(d, c.event, c.event.match(/^(click|mousemove|mouseenter)$/) ? this.hide: a.proxy(function () {
						this.hideDelayed()
					},
					this))
				},
				this))
			},
			show: function (b) {
				this.clearTimer("hide"),
				this.clearTimer("fadeTransition");
				if (!this.visible()) {
					if ("function" == a.type(this.content) || "function" == a.type(this._cache.contentFunction)) {
						"function" != a.type(this._cache.contentFunction) && (this._cache.contentFunction = this.content);
						var c = this._cache.contentFunction(this.element) || !1;
						c != this._cache.fnCallContent && (this._cache.fnCallContent = c, this.setState("updated", !1), this._restoreInlineContent()),
						this.content = c;
						if (!c) return
					}
					this.options.hideOthers && x.hideAll(),
					this.setState("visible", !0),
					this.options.ajax ? this.ajaxUpdate(b) : this.getState("updated") || this.update(this.content),
					this.getState("skinned") && this.position(b),
					this.raise(),
					this.options.hideAfter && m.defer(a.proxy(function () {
						this.setActive()
					},
					this)),
					"function" == a.type(this.options.onShow) && (!this.options.ajax || this.options.ajax && this.options.ajax.cache && this.getState("updated")) && this.options.onShow(this.contentElement.firstChild, this.element),
					Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_visible").removeClass("t_hidden")),
					a(this.container).show()
				}
			},
			hide: function () {
				this.clearTimer("show"),
				this.getState("visible") && (this.setState("visible", !1), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) ? (this.setFadeDuration(this.options.fadeOut), a(this.container).removeClass("t_visible").addClass("t_hidden"), this.setTimer("fadeTransition", a.proxy(this._hide, this), this.options.fadeOut)) : this._hide(), this._cache.xhr) && (this._cache.xhr.abort(), this._cache.xhr = null, this.setState("xhr", !1))
			},
			_hide: function () {
				this.getState("build") && (a(this.container).css({
					left: "-10000px",
					top: "-10000px"
				}), x.resetZ(), this.resetHookPosition(), "function" == a.type(this.options.onHide) && !this.spinner) && this.options.onHide(this.contentElement.firstChild, this.element)
			},
			toggle: function (a) {
				this[this.visible() ? "hide": "show"](a)
			},
			visible: function () {
				return this.getState("visible")
			},
			showDelayed: function (b) {
				this.clearTimer("hide"),
				this.clearTimer("fadeTransition"),
				!this.getState("visible") && !this.getTimer("show") && this.setTimer("show", a.proxy(function () {
					this.clearTimer("show"),
					this.show(b)
				},
				this), this.options.showDelay || 1)
			},
			hideDelayed: function () {
				this.clearTimer("show"),
				!this.getTimer("hide") && this.getState("visible") && this.setTimer("hide", a.proxy(function () {
					this.clearTimer("hide"),
					this.clearTimer("fadeTransition"),
					this.hide()
				},
				this), this.options.hideDelay || 1)
			},
			setFadeDuration: function (a) {
				if (Tipped.support.cssTransitions) {
					var a = a || 0,
					b = this.container.style;
					b.MozTransitionDuration = a + "ms",
					b.webkitTransitionDuration = a + "ms",
					b.OTransitionDuration = a + "ms",
					b.transitionDuration = a + "ms"
				}
			},
			setState: function (a, b) {
				this._cache.states[a] = b
			},
			getState: function (a) {
				return this._cache.states[a]
			},
			setActive: function () {
				this.setState("active", !0),
				this.getState("visible") && this.raise(),
				this.options.hideAfter && this.clearTimer("idle")
			},
			setIdle: function () {
				this.setState("active", !1),
				this.options.hideAfter && this.setTimer("idle", a.proxy(function () {
					this.clearTimer("idle"),
					this.getState("active") || this.hide()
				},
				this), this.options.hideAfter)
			},
			getTimer: function (a) {
				return this._cache.timers[a]
			},
			setTimer: function (a, b, c) {
				this._cache.timers[a] = m.delay(b, c)
			},
			clearTimer: function (a) {
				this._cache.timers[a] && (window.clearTimeout(this._cache.timers[a]), delete this._cache.timers[a])
			},
			clearTimers: function () {
				a.each(this._cache.timers, function (a, b) {
					window.clearTimeout(b)
				}),
				this._cache.timers = []
			},
			setEvent: function (b, c, d, e) {
				d = a.proxy(d, e || this),
				this._cache.events.push({
					element: b,
					eventName: c,
					handler: d
				}),
				a(b).bind(c, d)
			},
			clearEvents: function () {
				a.each(this._cache.events, function (b, c) {
					a(c.element).unbind(c.eventName, c.handler)
				})
			},
			setHookPosition: function (a) {
				var b = u.get(this.element);
				b && b.setHookPosition(a)
			},
			resetHookPosition: function () {
				this.setHookPosition(this.options.hook.tooltip)
			},
			refresh: function () {
				var a = u.get(this.element);
				a && (a.refresh(), this.visible() && this.position())
			},
			update: function (b, c) {
				var d = a.extend({
					afterUpdate: this.options.afterUpdate,
					spinner: !1
				},
				c || {});
				this.build(),
				this.getState("visible") && a(this.container).hide(),
				x.UpdateQueue.update(this, b, a.proxy(function () {
					var b = this.getState("visible");
					b || this.setState("visible", !0),
					this._buildSkin(),
					b || this.setState("visible", !1),
					this.getState("visible") && (a(this.container).hide(), this.position(), this.raise(), a(this.container).show()),
					this.setState("updated", !0),
					d.afterUpdate && d.afterUpdate(this.contentElement.firstChild, this.element),
					d.callback && d.callback()
				},
				this), {
					spinner: d.spinner
				})
			},
			ajaxUpdate: function (b) {
				this.getState("xhr") || this.options.ajax.cache && this.getState("updated") || (this.setState("xhr", !0), this.options.spinner && (this.spinner ? this.spinner.play() : (this.spinner = this.insertSpinner(this.options.spinner), this.setState("updated", !1)), this.position(b)), this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null), this._cache.xhr = a.ajax({
					url: this.content,
					type: this.options.ajax.type,
					data: this.options.ajax.data || {},
					dataType: this.options.ajax.dataType || "html",
					success: a.proxy(function (b, c, d) {
						d.status !== 0 && this.update(d.responseText, {
							spinner: this.options.spinner && this.spinner,
							callback: a.proxy(function () {
								this.setState("xhr", !1),
								this.getState("visible") && this.options.onShow && this.options.onShow(this.contentElement.firstChild, this.element),
								this.spinner && (this.spinner.remove(), this.spinner = null)
							},
							this)
						})
					},
					this)
				}))
			},
			insertSpinner: function (b) {
				var c = document.createElement("div");
				a(c).data("isSpinner", !0);
				var e = Spinners.create(c, a.extend({},
				b || {})),
				b = Spinners.getDimensions(c);
				return a(c).css(d(b)),
				this.update(c, {
					afterUpdate: !1,
					callback: function () {
						e.play()
					}
				}),
				e
			},
			position: function (b) {
				if (this.visible()) {
					var c;
					if ("mouse" == this.options.target) {
						c = x.Position.isPointerEvent(b);
						var d = x.Position.mouseBuffer;
						c ? d.x || d.y ? (this._cache.event = {
							x: d.x,
							y: d.y
						},
						c = null) : c = b: (d.x || d.y ? this._cache.event = {
							x: d.x,
							y: d.y
						}: this._cache.event || (c = x.Position.getAbsoluteOffset(this.element), this._cache.event = {
							x: c.left,
							y: c.top
						}), c = null)
					} else c = this.target;
					x.Position.set(this, this.options.hook.tooltip, c, this.options.hook.target);
					if (b && x.Position.isPointerEvent(b)) {
						var d = a(this.container).outerWidth(),
						e = a(this.container).outerHeight(),
						b = m.pointer(b);
						c = m.element.cumulativeOffset(this.container),
						b.x >= c.left && b.x <= c.left + d && b.y >= c.top && b.y <= c.top + e && m.defer(a.proxy(function () {
							this.clearTimer("hide")
						},
						this))
					}
				}
			},
			raise: function () {
				if (this.getState("build") && !this.options.zIndex) {
					var b = x.getHighestTooltip();
					b && b != this && this.zIndex <= b.zIndex && a(this.container).css({
						zIndex: this.zIndex = b.zIndex + 1
					})
				}
			},
			_restoreInlineContent: function () {
				var b;
				this.inlineMarker && this.inlineContent && ((b = a(this.inlineContent).data("tipped_restore_inline_display")) && a(this.inlineContent).css({
					display: b
				}), a(this.inlineMarker).before(this.inlineContent).remove(), this.inlineMarker = null)
			},
			remove: function () {
				window.setTimeout(a.proxy(function () {
					this.clearEvents()
				},
				this), 1),
				this.clearTimers(),
				this._restoreInlineContent(),
				window.setTimeout(a.proxy(function () {
					a(this.container).find("img[src]").unbind("load")
				},
				this), 1),
				u.remove(this.element),
				this.getState("build") && this.container && (a(this.container).remove(), this.container = null);
				var b = a(this.element).data("tipped_restore_title");
				b && (a(this.element).attr("title", b), a(this.element).data("tipped_restore_title", null)),
				a(this.element).removeData("tipped-uid")
			}
		}
	} ()),
	Tipped.init()
})(jQuery)