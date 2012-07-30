/*!
 * Tipped - The jQuery Tooltip - v2.5.6
 * (c) 2010-2012 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/tipped
 *
 * License: http://projects.nickstakenburg.com/tipped/license
 
 Unpacked with
 http://www.strictly-software.com/unpack-javascript.aspx
 
 */
;var Tipped = { version: '2.5.6' };

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




(function (e) {
	function n(e, t) {
		var n = [e, t];
		return n.left = e,
		n.top = t,
		n
	}
	function r(e) {
		this.element = e
	}
	function i(e) {
		var t = {},
		n;
		for (n in e) t[n] = e[n] + "px";
		return t
	}
	function s(e) {
		return 180 * e / Math.PI
	}
	function o(e) {
		return e * Math.PI / 180
	}
	function u(t) {
		if (t) {
			this.element = t,
			A.remove(t);
			var n = this.getTooltip();
			this.options = e.extend({},
			n.options),
			this._globalAlpha = 1,
			this._cache = {},
			this.uid = e(t).data("tipped-uid"),
			A.add(this),
			this._hookPosition = this.options.hook.tooltip,
			this._stemPosition = this.options.stem && this._hookPosition,
			this.build()
		}
	}
	function a(t, n, r) { (this.element = t) && n && (this.options = e.extend({
			blur: 3,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		r || {}), this._globalAlpha = this.options.globalAlpha, this._cache = {},
		this.uid = e(t).data("tipped-uid"), O.add(this), this.build())
	}
	function f(t, n) {
		if (this.element = t) this.options = e.extend({
			blur: 5,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		n || {}),
		this._globalAlpha = this.options.globalAlpha,
		this.uid = e(t).data("tipped-uid"),
		M.add(this),
		this.build()
	}
	function l(t, n) {
		for (var r in n) n[r] && n[r].constructor && n[r].constructor === Object ? (t[r] = e.extend({},
		t[r]) || {},
		l(t[r], n[r])) : t[r] = n[r];
		return t
	}
	function c(t, n, r) {
		if (this.element = t) {
			var i = e(t).data("tipped-uid");
			i && I.remove(t),
			i = b(),
			e(t).data("tipped-uid", i),
			this.uid = i,
			"object" == e.type(n) && !p.isElement(n) ? (r = n, n = null) : r = r || {},
			this.options = I.createOptions(r),
			r = t.getAttribute("title"),
			n || ((i = t.getAttribute("data-tipped")) ? n = i: r && (n = r)),
			r && (e(t).data("tipped_restore_title", r), t.setAttribute("title", "")),
			this.content = n,
			this.zIndex = this.options.zIndex || +I.options.startingZIndex,
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
			t = this.options.target,
			this.target = "mouse" == t ? "mouse": "self" == t || !t ? this.element: t && document.getElementById(t) || this.element,
			this._preBuild(),
			I.add(this)
		}
	}
	var t, h = Array.prototype.slice,
	p = {
		wrap: function (t, n) {
			return function () {
				var r = [e.proxy(t, this)].concat(h.call(arguments));
				return n.apply(this, r)
			}
		},
		isElement: function (e) {
			return e && 1 == e.nodeType
		},
		delay: function (e, t) {
			var n = h.call(arguments, 2);
			return setTimeout(function () {
				return e.apply(e, n)
			},
			t)
		},
		defer: function (e) {
			return p.delay.apply(this, [e, 1].concat(h.call(arguments, 1)))
		},
		pointer: function (e) {
			return {
				x: e.pageX,
				y: e.pageY
			}
		},
		element: {
			cumulativeScrollOffset: function (e) {
				var t = 0,
				r = 0;
				do t += e.scrollTop || 0,
				r += e.scrollLeft || 0,
				e = e.parentNode;
				while (e);
				return n(r, t)
			},
			cumulativeOffset: function (t) {
				var r = e(t).offset(),
				t = p.element.cumulativeScrollOffset(t),
				i = e(window).scrollTop(),
				s = e(window).scrollLeft();
				return r.left += t.left - s,
				r.top += t.top - i,
				n(r.left, r.top)
			},
			isAttached: function (e) {
				for (; e && e.parentNode;) e = e.parentNode;
				return !! e && !!e.body
			}
		}
	},
	d = navigator.userAgent,
	v = function (e) {
		return (e = RegExp(e + "([\\d.]+)").exec(d)) ? parseFloat(e[1]) : !0
	};
	t = !!window.attachEvent && -1 === d.indexOf("Opera") && v("MSIE "),
	-1 < d.indexOf("Opera") && window.opera && opera.version && parseFloat(opera.version()),
	-1 < d.indexOf("AppleWebKit/") && v("AppleWebKit/"),
	-1 < d.indexOf("Gecko") && -1 === d.indexOf("KHTML") && v("rv:"),
	d.match(/Apple.*Mobile.*Safari/),
	-1 < d.indexOf("Chrome") && v("Chrome/");
	var m = function (e) {
		for (var t = (e = e.match(g)) && e[1] && e[1].split(".") || [], n = 0, r = 0, i = t.length; r < i; r++) n += parseInt(t[r] * Math.pow(10, 6 - 2 * r));
		return e && e[3] ? n - 1 : n
	},
	g = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/,
	y = {
		scripts: {
			jQuery: {
				required: "1.4.4",
				available: window.jQuery && jQuery.fn.jquery
			}
		},
		check: function (e) { ! this.scripts[e].checked && (this.scripts[e].checked = !0, !this.scripts[e].available || m(this.scripts[e].available) < m(this.scripts[e].required) && !this.scripts[e].notified) && ((this.scripts[e].notified = !0, e = "Tipped requires " + e + " >= " + this.scripts[e].required, window.console) ? console[console.warn ? "warn": "log"](e) : alert(e))
		}
	},
	b,
	w = 0;
	b = function (e) {
		e = e || "_t_uid_";
		for (w++; document.getElementById(e + w);) w++;
		return e + w
	},
	e.extend(Tipped, {
		support: {
			canvas: function () {
				var e = document.createElement("canvas");
				return !! e.getContext && !!e.getContext("2d")
			} (),
			touch: function () {
				try {
					return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
				} catch(e) {
					return ! 1
				}
			} (),
			cssTransitions: function () {
				var t = !1;
				return e.each(["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"], function (e, n) {
					try {
						document.createEvent(n),
						t = !0
					} catch(r) {}
				}),
				t
			} ()
		},
		init: function () {
			if (!this.support.canvas && !window.G_vmlCanvasManager) {
				if (!t) return;
				alert("Tipped requires ExplorerCanvas (excanvas.js)")
			}
			y.check("jQuery"),
			e(document).ready(function () {
				I.startDelegating()
			})
		},
		create: function (e, t, n) {
			return r.create(e, t, n),
			this.get(e)
		},
		get: function (e) {
			return new r(e)
		},
		findElement: function (e) {
			return I.findElement(e)
		},
		show: function (e) {
			return this.get(e).show(),
			this
		},
		hide: function (e) {
			return this.get(e).hide(),
			this
		},
		toggle: function (e) {
			return this.get(e).toggle(),
			this
		},
		refresh: function (e) {
			return this.get(e).refresh(),
			this
		},
		remove: function (e) {
			return this.get(e).remove(),
			this
		},
		hideAll: function () {
			return I.hideAll(),
			this
		},
		setDefaultSkin: function (e) {
			return I.setDefaultSkin(e),
			this
		},
		setStartingZIndex: function (e) {
			return I.setStartingZIndex(e),
			this
		},
		visible: function (t) {
			if (p.isElement(t)) return I.isVisibleByElement(t);
			if ("undefined" != e.type(t)) {
				var t = e(t),
				n = 0;
				return e.each(t, function (e, t) {
					I.isVisibleByElement(t) && n++
				}),
				n
			}
			return I.getVisible().length
		}
	}),
	e.extend(r, {
		create: function (t, n, r) {
			if (t) {
				var i = r || {},
				s = [];
				return I.removeDetached(),
				p.isElement(t) ? s.push(new c(t, n, i)) : e(t).each(function (e, t) {
					s.push(new c(t, n, i))
				}),
				s
			}
		}
	}),
	e.extend(r.prototype, {
		items: function () {
			return I.Position.mouseBuffer = {
				x: 0,
				y: 0
			},
			I.get(this.element)
		},
		show: function () {
			return e.each(this.items(), function (e, t) {
				t.show()
			}),
			this
		},
		hide: function () {
			return e.each(this.items(), function (e, t) {
				t.hide()
			}),
			this
		},
		toggle: function () {
			return e.each(this.items(), function (e, t) {
				t.toggle()
			}),
			this
		},
		refresh: function () {
			return e.each(this.items(), function (e, t) {
				t.refresh()
			}),
			this
		},
		remove: function () {
			return I.remove(this.element),
			this
		}
	}),
	v = window.G_vmlCanvasManager && !Tipped.support.canvas && t ?
	function (e) {
		G_vmlCanvasManager.initElement(e)
	}: function () {};
	var E = {
		init: v,
		drawRoundedRectangle: function (t, n) {
			var r = e.extend({
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				radius: 0
			},
			n || {}),
			i = r.left,
			s = r.top,
			u = r.width,
			a = r.height;
			(r = r.radius) ? (t.beginPath(), t.moveTo(i + r, s), t.arc(i + u - r, s + r, r, o( - 90), o(0), !1), t.arc(i + u - r, s + a - r, r, o(0), o(90), !1), t.arc(i + r, s + a - r, r, o(90), o(180), !1), t.arc(i + r, s + r, r, o( - 180), o( - 90), !1), t.closePath(), t.fill()) : t.fillRect(i, s, u, a)
		},
		drawPixelArray: function (t, n, r) {
			for (var r = e.extend({
				x: 0,
				y: 0,
				color: "#000"
			},
			r || {}), i = 0, s = n.length; i < s; i++) for (var o = 0, u = n[i].length; o < u; o++) {
				var a = parseInt(n[i].charAt(o)) * (1 / 9);
				t.fillStyle = N.hex2fill(r.color, a),
				a && t.fillRect(r.x + o, r.y + i, 1, 1)
			}
		},
		createFillStyle: function (t, n, r) {
			var i;
			return "string" == e.type(n) ? i = N.hex2fill(n) : "string" == e.type(n.color) ? i = N.hex2fill(n.color, "number" == e.type(n.opacity) ? n.opacity: 1) : e.isArray(n.color) && (r = e.extend({
				x1: 0,
				y1: 0,
				x2: 0,
				y2: 0
			},
			r || {}), i = E.Gradient.addColorStops(t.createLinearGradient(r.x1, r.y1, r.x2, r.y2), n.color, n.opacity)),
			i
		},
		Gradient: {
			addColorStops: function (t, n, r) {
				for (var r = "number" == e.type(r) ? r: 1, i = 0, s = n.length; i < s; i++) {
					var o = n[i];
					if ("undefined" == e.type(o.opacity) || "number" != e.type(o.opacity)) o.opacity = 1;
					t.addColorStop(o.position, N.hex2fill(o.color, o.opacity * r))
				}
				return t
			}
		}
	},
	S = {
		top: "height",
		left: "width",
		bottom: "height",
		right: "width"
	},
	x = {
		positions: "topleft topmiddle topright righttop rightmiddle rightbottom bottomright bottommiddle bottomleft leftbottom leftmiddle lefttop".split(" "),
		regex: {
			toOrientation: /^(top|left|bottom|right)(top|left|bottom|right|middle|center)$/,
			horizontal: /^(top|bottom)/,
			isCenter: /(middle|center)/,
			side: /^(top|bottom|left|right)/
		},
		toDimension: function (e) {
			return S[e]
		},
		isCenter: function (e) {
			return !! e.toLowerCase().match(this.regex.isCenter)
		},
		isCorner: function (e) {
			return ! this.isCenter(e)
		},
		getOrientation: function (e) {
			return e.toLowerCase().match(this.regex.horizontal) ? "horizontal": "vertical"
		},
		getSide: function (e) {
			var t = null;
			return (e = e.toLowerCase().match(this.regex.side)) && e[1] && (t = e[1]),
			t
		},
		split: function (e) {
			return e.toLowerCase().match(this.regex.toOrientation)
		}
	},
	T = {
		getDimensions: function (e) {
			return e = e.options.stem,
			{
				width: e.width,
				height: e.height
			}
		},
		getBorderDimensions: function (t, n, r) {
			return r = e.extend({
				math: "ceil"
			},
			r || {}),
			t = t.options.stem,
			n = this.getCenterBorderDimensions(t.width, t.height, n),
			r.math && (n.width = Math[r.math](n.width), n.height = Math[r.math](n.height)),
			{
				width: n.width,
				height: n.height
			}
		},
		getCenterBorderDimensions: function (e, t, n) {
			var r = 180 - s(Math.atan(.5 * (t / e))),
			n = Math.cos(o(r - 90)) * n,
			n = e + 2 * n;
			return {
				width: n,
				height: n * t / e
			}
		},
		getLayout: function (e, t) {
			var n = this.getBorderDimensions(e, t),
			r = this.getDimensions(e);
			x.isCenter(e._hookPosition);
			var i = Math.ceil(n.height + t);
			return {
				box: {
					dimensions: {
						width: Math.ceil(n.width),
						height: Math.ceil(i)
					}
				},
				border: {
					dimensions: n
				},
				stem: {
					dimensions: {
						width: r.width,
						height: r.height
					}
				}
			}
		},
		getBubbleLayout: function (t, n, r) {
			var i = t.options,
			s = {
				top: 0,
				left: 0
			},
			o = {
				top: 0,
				left: 0
			},
			u = e.extend({},
			n),
			a = t.border,
			f = f || this.getLayout(t, t.border),
			l = f.box.dimensions;
			r && (l.height = r, a = 0);
			if (t.options.stem) {
				var c = x.getSide(t._hookPosition);
				"top" == c ? s.top = l.height - a: "left" == c && (s.left = l.height - a);
				var r = x.split(t._hookPosition),
				h = x.getOrientation(t._hookPosition);
				if ("horizontal" == h) {
					switch (r[2]) {
					case "middle":
					case "center":
						o.left = .5 * u.width;
						break;
					case "right":
						o.left = u.width
					}
					"bottom" == r[1] && (o.top = u.height - a + l.height)
				} else {
					switch (r[2]) {
					case "middle":
					case "center":
						o.top = .5 * u.height;
						break;
					case "bottom":
						o.top = u.height
					}
					"right" == r[1] && (o.left = u.width - a + l.height)
				}
				u[x.toDimension(c)] += l.height - a
			} else if (r = x.split(t._hookPosition), h = x.getOrientation(t._hookPosition), "horizontal" == h) {
				switch (r[2]) {
				case "middle":
				case "center":
					o.left = .5 * u.width;
					break;
				case "right":
					o.left = u.width
				}
				"bottom" == r[1] && (o.top = u.height)
			} else {
				switch (r[2]) {
				case "middle":
				case "center":
					o.top = .5 * u.height;
					break;
				case "bottom":
					o.top = u.height
				}
				"right" == r[1] && (o.left = u.width)
			}
			c = i.radius && i.radius.size || 0,
			a = i.border && i.border.size || 0;
			if (t.options.stem) {
				var p = i.stem && i.stem.offset || {
					x: 0,
					y: 0
				},
				t = c && "background" == i.radius.position ? c: 0,
				c = c && "border" == i.radius.position ? c: c + a,
				d = a + t + .5 * f.stem.dimensions.width - .5 * f.border.dimensions.width,
				f = Math.ceil(a + t + .5 * f.stem.dimensions.width + (c > d ? c - d: 0));
				if ("horizontal" == h) switch (r[2]) {
				case "left":
					o.left += f;
					break;
				case "right":
					o.left -= f
				} else switch (r[2]) {
				case "top":
					o.top += f;
					break;
				case "bottom":
					o.top -= f
				}
			}
			if (i.stem && (p = i.stem.offset)) if ("horizontal" == h) switch (r[2]) {
			case "left":
				o.left += p.x;
				break;
			case "right":
				o.left -= p.x
			} else switch (r[2]) {
			case "top":
				o.top += p.y;
				break;
			case "bottom":
				o.top -= p.y
			}
			var v;
			if (i.stem && (v = i.stem.spacing)) if ("horizontal" == h) switch (r[1]) {
			case "top":
				o.top -= v;
				break;
			case "bottom":
				o.top += v
			} else switch (r[1]) {
			case "left":
				o.left -= v;
				break;
			case "right":
				o.left += v
			}
			return {
				dimensions: u,
				position: {
					top: 0,
					left: 0
				},
				background: {
					position: s,
					dimensions: n
				},
				stem: {
					dimensions: l
				},
				anchor: o
			}
		}
	},
	N,
	C = function (e) {
		return e.red = e[0],
		e.green = e[1],
		e.blue = e[2],
		e
	},
	k = function (e) {
		var t = Array(3);
		0 == e.indexOf("#") && (e = e.substring(1)),
		e = e.toLowerCase();
		if ("" != e.replace(L, "")) return null;
		3 == e.length ? (t[0] = e.charAt(0) + e.charAt(0), t[1] = e.charAt(1) + e.charAt(1), t[2] = e.charAt(2) + e.charAt(2)) : (t[0] = e.substring(0, 2), t[1] = e.substring(2, 4), t[2] = e.substring(4));
		for (e = 0; e < t.length; e++) t[e] = parseInt(t[e], 16);
		return C(t)
	},
	L = RegExp("[0123456789abcdef]", "g");
	N = {
		hex2rgb: k,
		hex2fill: function (t, n) {
			"undefined" == e.type(n) && (n = 1);
			var r = n,
			i = k(t);
			return i[3] = r,
			i.opacity = r,
			"rgba(" + i.join() + ")"
		},
		getSaturatedBW: function (e) {
			var e = k(e),
			e = C(e),
			t = e.red,
			n = e.green,
			r = e.blue,
			i,
			s = t > n ? t: n;
			r > s && (s = r);
			var o = t < n ? t: n;
			r < o && (o = r),
			i = s / 255,
			e = 0 != s ? (s - o) / s: 0;
			if (0 == e) t = 0;
			else {
				var u = (s - t) / (s - o),
				a = (s - n) / (s - o),
				r = (s - r) / (s - o),
				t = (t == s ? r - a: n == s ? 2 + u - r: 4 + a - u) / 6;
				0 > t && (t += 1)
			}
			return t = Math.round(360 * t),
			e = Math.round(100 * e),
			i = Math.round(100 * i),
			n = [],
			n[0] = t,
			n[1] = e,
			n[2] = i,
			n.hue = t,
			n.saturation = e,
			n.brightness = i,
			"#" + (50 < n[2] ? "000": "fff")
		}
	};
	var A = {
		skins: {},
		get: function (t) {
			if (!t) return null;
			var n = null;
			return (t = e(t).data("tipped-uid")) && (n = this.skins[t]),
			n
		},
		add: function (e) {
			this.skins[e.uid] = e
		},
		remove: function (e) {
			if (e = this.get(e)) delete this.skins[e.uid],
			e.remove()
		}
	};
	e.extend(u.prototype, {
		prepare: function () {
			var e = this.getTooltip();
			this.contentDimensions = e._cache.contentDimensions,
			e = e.options,
			this.radius = e.radius && e.radius.size || 0,
			this.border = e.border && e.border.size || 0,
			this.padding = e.padding,
			e = Math.min(this.contentDimensions.height, this.contentDimensions.width),
			this.radius > e / 2 && (this.radius = Math.floor(e / 2)),
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
			var t = this._hookPosition;
			e.each(x.positions, e.proxy(function (t, n) {
				var r, i = this._cache.hook[n] = {};
				this._hookPosition = n,
				r = this.getOrderLayout(),
				i.anchor = r.anchor,
				i.bubble = {
					dimensions: r.bubble.dimensions,
					position: {
						top: r.bubble.position.top,
						left: r.bubble.position.left
					}
				},
				i.tooltip = {
					dimensions: r.skin.dimensions
				};
				if (this.shadow) {
					r = this.shadow.getOrderLayout();
					var s = r.skin.position,
					o = i.bubble.position;
					e.extend(!0, i, {
						anchor: r.anchor,
						bubble: {
							position: {
								top: o.top + s.top,
								left: o.left + s.left
							}
						},
						tooltip: {
							dimensions: r.tooltip.dimensions
						}
					})
				}
			},
			this)),
			this._hookPosition = t
		},
		build: function () {
			this.cleanup(),
			window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document);
			var n = this.getTooltip(),
			r = this.options;
			this.bubble = e("<div>").addClass("t_Bubble")[0],
			e(n.skinElement).append(this.bubble),
			this.prepare(),
			this.drawBubble(n),
			r.closeButton && (this.drawCloseButton(n), r.closeButton.shadow && (this.closeButtonShadow ? (this.closeButtonShadow.options = r.closeButton.shadow, this.closeButtonShadow.build()) : this.closeButtonShadow = new f(this.element, e.extend({
				globalAlpha: this._globalAlpha
			},
			r.closeButton.shadow)))),
			t && 7 > t && e(n.container).prepend(this.iframeShim = e("<iframe>").addClass("t_iframeShim").attr({
				frameBorder: 0,
				src: "javascript:'';"
			})),
			this.order(),
			r.shadow && (this.shadow ? (this.shadow.options = r.shadow, this.shadow.build()) : this.shadow = new a(this.element, this, e.extend({
				globalAlpha: this._globalAlpha
			},
			r.shadow))),
			this.createHookCache()
		},
		remove: function () {
			this.cleanup(),
			this.options.shadow && (O.remove(this.element), this.options.closeButton && this.options.closeButton.shadow && M.remove(this.element)),
			this.iframeShim && (this.iframeShim.remove(), this.iframeShim = null),
			this.container && (e(this.container).remove(), this.container = null)
		},
		cleanup: function () {
			this.bubble && (this.closeButton && (e(this.closeButton).remove(), this.hoverCloseButton = this.defaultCloseButton = this.closeButton = null), e(this.bubble).remove(), this.bubble = this.background = this.stem = null, this._cache = {})
		},
		getTooltip: function () {
			return I.get(this.element)[0]
		},
		refresh: function () {
			var t = this.getTooltip(),
			n = e(t.container),
			r = e(t.container).find(".t_ContentContainer").first()[0];
			if (r) {
				e(r).css({
					width: "auto",
					height: "auto"
				});
				var i = parseInt(n.css("top")),
				s = parseInt(n.css("left")),
				o = parseInt(n.css("width"));
				n.css({
					left: "-25000px",
					top: "-25000px",
					width: "15000px",
					height: "auto"
				}),
				t.getState("visible") || e(t.container).show();
				var u = I.UpdateQueue.getMeasureElementDimensions(r);
				t.options.maxWidth && "number" == e.type(t.options.maxWidth) && u.width > t.options.maxWidth && (e(r).css({
					width: t.options.maxWidth + "px"
				}), u = I.UpdateQueue.getMeasureElementDimensions(r)),
				t.getState("visible") || e(t.container).hide(),
				t._cache.contentDimensions = u,
				n.css({
					left: s + "px",
					top: i + "px",
					width: o + "px"
				}),
				this.build()
			}
		},
		setHookPosition: function (e) {
			this._hookPosition != e && (this._hookPosition = e, this.build())
		},
		drawCloseButton: function (t) {
			var n = t.options.closeButton,
			n = {
				width: n.diameter + 2 * n.border,
				height: n.diameter + 2 * n.border
			};
			e(t.container).append(e(this.closeButton = document.createElement("div")).addClass("t_Close").css(i(n)).append(e(this.closeButtonShift = document.createElement("div")).addClass("t_CloseButtonShift").css(i(n)))),
			this.drawCloseButtonState(t, "default"),
			this.drawCloseButtonState(t, "hover"),
			Tipped.support.touch || e(this.closeButton).bind("mouseenter", e.proxy(this.closeButtonMouseover, this)).bind("mouseleave", e.proxy(this.closeButtonMouseout, this))
		},
		drawCloseButtonState: function (t, n) {
			var r = t.options.closeButton,
			s = r.diameter,
			u = r.border || 0,
			a = r.x.diameter,
			f = r.x.size,
			l = r.states[n || "default"],
			c = {
				width: s + 2 * u,
				height: s + 2 * u
			};
			a >= s && (a = s - 2);
			var h;
			e(this.closeButtonShift).append(e(this[n + "CloseButton"] = document.createElement("div")).addClass("t_CloseState").css(e.extend(i(c), {
				left: ("hover" == n ? c.width: 0) + "px"
			}))),
			e(document.body).append(e(h = document.createElement("canvas")).attr(c)),
			E.init(h),
			r = h.getContext("2d"),
			r.globalAlpha = this._globalAlpha,
			e(this[n + "CloseButton"]).append(h),
			r.translate(c.width / 2, c.height / 2),
			r.fillStyle = E.createFillStyle(r, l.background, {
				x1: 0,
				y1: 0 - s / 2,
				x2: 0,
				y2: 0 + s / 2
			}),
			r.beginPath(),
			r.arc(0, 0, s / 2, 0, 2 * Math.PI, !0),
			r.closePath(),
			r.fill(),
			u && (r.fillStyle = E.createFillStyle(r, l.border, {
				x1: 0,
				y1: 0 - s / 2 - u,
				x2: 0,
				y2: 0 + s / 2 + u
			}), r.beginPath(), r.arc(0, 0, s / 2, Math.PI, 0, !1), r.lineTo((s + u) / 2, 0), r.arc(0, 0, s / 2 + u, 0, Math.PI, !0), r.arc(0, 0, s / 2 + u, Math.PI, 0, !0), r.lineTo(s / 2, 0), r.arc(0, 0, s / 2, 0, Math.PI, !1), r.closePath(), r.fill()),
			s = a / 2,
			f /= 2,
			f > s && (u = f, f = s, s = u),
			r.fillStyle = N.hex2fill(l.x.color || l.x, l.x.opacity || 1),
			r.rotate(o(45)),
			r.beginPath(),
			r.moveTo(0, 0),
			r.lineTo(0, s);
			for (l = 0; 4 > l; l++) r.lineTo(0, s),
			r.lineTo(f, s),
			r.lineTo(f, s - (s - f)),
			r.lineTo(s, f),
			r.lineTo(s, 0),
			r.rotate(o(90));
			r.closePath(),
			r.fill()
		},
		drawBubble: function (t) {
			var n = this.getOrderLayout(),
			r = this.options.stem && this.getStemLayout(),
			i = this._hookPosition && this._hookPosition.toLowerCase(),
			s = this.radius,
			o = this.border,
			t = t.options.stem && t.options.stem.offset || {
				x: 0,
				y: 0
			},
			u = 0,
			a = 0;
			s && (u = "background" == this.options.radius.position ? s: 0, a = "border" == this.options.radius.position ? s: u + o),
			e(document.body).append(this.bubbleCanvas = document.createElement("canvas")),
			e(this.bubbleCanvas).attr(n.bubble.dimensions),
			E.init(this.bubbleCanvas),
			s = this.bubbleCanvas.getContext("2d"),
			s.globalAlpha = this._globalAlpha,
			e(this.bubble).append(this.bubbleCanvas),
			s.fillStyle = E.createFillStyle(s, this.options.background, {
				x1: 0,
				y1: n.background.position.top + o,
				x2: 0,
				y2: n.background.position.top + n.background.dimensions.height - o
			}),
			s.lineWidth = 0,
			this._drawBackgroundPath(s, {
				beginPath: !0,
				closePath: !0,
				border: o,
				radius: u,
				borderRadius: a,
				layout: n,
				stemLayout: r,
				stem: this.options.stem,
				hookPosition: i,
				cornerOffset: t
			}),
			s.fill();
			if (o) {
				var f = E.createFillStyle(s, this.options.border, {
					x1: 0,
					y1: n.background.position.top,
					x2: 0,
					y2: n.background.position.top + n.background.dimensions.height
				});
				s.fillStyle = f,
				this._drawBackgroundPath(s, {
					beginPath: !0,
					closePath: !1,
					border: o,
					radius: u,
					borderRadius: a,
					layout: n,
					stemLayout: r,
					stem: this.options.stem,
					hookPosition: i,
					cornerOffset: t
				}),
				this._drawBorderPath(s, {
					beginPath: !1,
					closePath: !0,
					border: o,
					backgroundRadius: u,
					radius: {
						size: a,
						position: this.options.radius.position
					},
					layout: n,
					stemLayout: r,
					stem: this.options.stem,
					hookPosition: i,
					cornerOffset: t
				}),
				s.fill()
			}
		},
		_drawBackgroundPath: function (t, n) {
			var r = e.extend({
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
			n || {}),
			i = r.layout,
			s = r.stemLayout,
			u = r.cornerOffset,
			a = r.border,
			f = r.radius,
			l = r.hookPosition,
			c = i.background.position,
			i = i.background.dimensions,
			h,
			p,
			d;
			s && (h = s.stem.dimensions, p = s.box.dimensions, d = r.borderRadius, s = a + f + .5 * h.width - .5 * s.border.dimensions.width, d = Math.ceil(d > s ? d - s: 0));
			var v, s = f ? c.left + a + f: c.left + a;
			v = c.top + a,
			u && u.x && /^(topleft|lefttop)$/.test(l) && (s += u.x),
			r.beginPath && t.beginPath(),
			t.moveTo(s, v);
			if (r.stem) switch (l) {
			case "topleft":
				s = c.left + a,
				f && (s += f),
				s += Math.max(d, u.x || 0),
				t.lineTo(s, v),
				v -= h.height,
				s += .5 * h.width,
				t.lineTo(s, v),
				v += h.height,
				s += .5 * h.width,
				t.lineTo(s, v);
				break;
			case "topmiddle":
			case "topcenter":
				s = c.left + .5 * i.width - .5 * h.width,
				t.lineTo(s, v),
				v -= h.height,
				s += .5 * h.width,
				t.lineTo(s, v),
				v += h.height,
				s += .5 * h.width,
				t.lineTo(s, v),
				s = c.left + .5 * i.width - .5 * p.width,
				t.lineTo(s, v);
				break;
			case "topright":
				s = c.left + i.width - a - h.width,
				f && (s -= f),
				s -= Math.max(d, u.x || 0),
				t.lineTo(s, v),
				v -= h.height,
				s += .5 * h.width,
				t.lineTo(s, v),
				v += h.height,
				s += .5 * h.width,
				t.lineTo(s, v)
			}
			f ? f && (t.arc(c.left + i.width - a - f, c.top + a + f, f, o( - 90), o(0), !1), s = c.left + i.width - a, v = c.top + a + f) : (s = c.left + i.width - a, v = c.top + a, t.lineTo(s, v));
			if (r.stem) switch (l) {
			case "righttop":
				v = c.top + a,
				f && (v += f),
				v += Math.max(d, u.y || 0),
				t.lineTo(s, v),
				s += h.height,
				v += .5 * h.width,
				t.lineTo(s, v),
				s -= h.height,
				v += .5 * h.width,
				t.lineTo(s, v);
				break;
			case "rightmiddle":
			case "rightcenter":
				v = c.top + .5 * i.height - .5 * h.width,
				t.lineTo(s, v),
				s += h.height,
				v += .5 * h.width,
				t.lineTo(s, v),
				s -= h.height,
				v += .5 * h.width,
				t.lineTo(s, v);
				break;
			case "rightbottom":
				v = c.top + i.height - a,
				f && (v -= f),
				v -= h.width,
				v -= Math.max(d, u.y || 0),
				t.lineTo(s, v),
				s += h.height,
				v += .5 * h.width,
				t.lineTo(s, v),
				s -= h.height,
				v += .5 * h.width,
				t.lineTo(s, v)
			}
			f ? f && (t.arc(c.left + i.width - a - f, c.top + i.height - a - f, f, o(0), o(90), !1), s = c.left + i.width - a - f, v = c.top + i.height - a) : (s = c.left + i.width - a, v = c.top + i.height - a, t.lineTo(s, v));
			if (r.stem) switch (l) {
			case "bottomright":
				s = c.left + i.width - a,
				f && (s -= f),
				s -= Math.max(d, u.x || 0),
				t.lineTo(s, v),
				s -= .5 * h.width,
				v += h.height,
				t.lineTo(s, v),
				s -= .5 * h.width,
				v -= h.height,
				t.lineTo(s, v);
				break;
			case "bottommiddle":
			case "bottomcenter":
				s = c.left + .5 * i.width + .5 * h.width,
				t.lineTo(s, v),
				s -= .5 * h.width,
				v += h.height,
				t.lineTo(s, v),
				s -= .5 * h.width,
				v -= h.height,
				t.lineTo(s, v);
				break;
			case "bottomleft":
				s = c.left + a + h.width,
				f && (s += f),
				s += Math.max(d, u.x || 0),
				t.lineTo(s, v),
				s -= .5 * h.width,
				v += h.height,
				t.lineTo(s, v),
				s -= .5 * h.width,
				v -= h.height,
				t.lineTo(s, v)
			}
			f ? f && (t.arc(c.left + a + f, c.top + i.height - a - f, f, o(90), o(180), !1), s = c.left + a, v = c.top + i.height - a - f) : (s = c.left + a, v = c.top + i.height - a, t.lineTo(s, v));
			if (r.stem) switch (l) {
			case "leftbottom":
				v = c.top + i.height - a,
				f && (v -= f),
				v -= Math.max(d, u.y || 0),
				t.lineTo(s, v),
				s -= h.height,
				v -= .5 * h.width,
				t.lineTo(s, v),
				s += h.height,
				v -= .5 * h.width,
				t.lineTo(s, v);
				break;
			case "leftmiddle":
			case "leftcenter":
				v = c.top + .5 * i.height + .5 * h.width,
				t.lineTo(s, v),
				s -= h.height,
				v -= .5 * h.width,
				t.lineTo(s, v),
				s += h.height,
				v -= .5 * h.width,
				t.lineTo(s, v);
				break;
			case "lefttop":
				v = c.top + a + h.width,
				f && (v += f),
				v += Math.max(d, u.y || 0),
				t.lineTo(s, v),
				s -= h.height,
				v -= .5 * h.width,
				t.lineTo(s, v),
				s += h.height,
				v -= .5 * h.width,
				t.lineTo(s, v)
			}
			return f ? f && (t.arc(c.left + a + f, c.top + a + f, f, o( - 180), o( - 90), !1), s = c.left + a + f, v = c.top + a, s += 1, t.lineTo(s, v)) : (s = c.left + a, v = c.top + a, t.lineTo(s, v)),
			r.closePath && t.closePath(),
			{
				x: s,
				y: v
			}
		},
		_drawBorderPath: function (t, n) {
			var r = e.extend({
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
			n || {}),
			i = r.layout,
			s = r.stemLayout,
			u = r.cornerOffset,
			a = r.border,
			f = r.radius && r.radius.size || 0,
			l = r.backgroundRadius,
			c = r.hookPosition,
			h = i.background.position,
			i = i.background.dimensions,
			p,
			d,
			v;
			s && (p = s.stem.dimensions, d = s.border.dimensions, v = a + l + .5 * p.width - .5 * d.width, v = Math.ceil(f > v ? f - v: 0));
			var s = h.left + a + l,
			m = h.top + a;
			l && (s += 1),
			e.extend({},
			{
				x: s,
				y: m
			}),
			r.beginPath && t.beginPath();
			var g = e.extend({},
			{
				x: s,
				y: m
			}),
			m = m - a;
			t.lineTo(s, m),
			f ? f && (t.arc(h.left + f, h.top + f, f, o( - 90), o( - 180), !0), s = h.left, m = h.top + f) : (s = h.left, m = h.top, t.lineTo(s, m));
			if (r.stem) switch (c) {
			case "lefttop":
				m = h.top + a,
				l && (m += l),
				m -= .5 * d.width,
				m += .5 * p.width,
				m += Math.max(v, u.y || 0),
				t.lineTo(s, m),
				s -= d.height,
				m += .5 * d.width,
				t.lineTo(s, m),
				s += d.height,
				m += .5 * d.width,
				t.lineTo(s, m);
				break;
			case "leftmiddle":
			case "leftcenter":
				m = h.top + .5 * i.height - .5 * d.width,
				t.lineTo(s, m),
				s -= d.height,
				m += .5 * d.width,
				t.lineTo(s, m),
				s += d.height,
				m += .5 * d.width,
				t.lineTo(s, m);
				break;
			case "leftbottom":
				m = h.top + i.height - a - d.width,
				l && (m -= l),
				m += .5 * d.width,
				m -= .5 * p.width,
				m -= Math.max(v, u.y || 0),
				t.lineTo(s, m),
				s -= d.height,
				m += .5 * d.width,
				t.lineTo(s, m),
				s += d.height,
				m += .5 * d.width,
				t.lineTo(s, m)
			}
			f ? f && (t.arc(h.left + f, h.top + i.height - f, f, o( - 180), o( - 270), !0), s = h.left + f, m = h.top + i.height) : (s = h.left, m = h.top + i.height, t.lineTo(s, m));
			if (r.stem) switch (c) {
			case "bottomleft":
				s = h.left + a,
				l && (s += l),
				s -= .5 * d.width,
				s += .5 * p.width,
				s += Math.max(v, u.x || 0),
				t.lineTo(s, m),
				m += d.height,
				s += .5 * d.width,
				t.lineTo(s, m),
				m -= d.height,
				s += .5 * d.width,
				t.lineTo(s, m);
				break;
			case "bottommiddle":
			case "bottomcenter":
				s = h.left + .5 * i.width - .5 * d.width,
				t.lineTo(s, m),
				m += d.height,
				s += .5 * d.width,
				t.lineTo(s, m),
				m -= d.height,
				s += .5 * d.width,
				t.lineTo(s, m),
				s = h.left + .5 * i.width + d.width,
				t.lineTo(s, m);
				break;
			case "bottomright":
				s = h.left + i.width - a - d.width,
				l && (s -= l),
				s += .5 * d.width,
				s -= .5 * p.width,
				s -= Math.max(v, u.x || 0),
				t.lineTo(s, m),
				m += d.height,
				s += .5 * d.width,
				t.lineTo(s, m),
				m -= d.height,
				s += .5 * d.width,
				t.lineTo(s, m)
			}
			f ? f && (t.arc(h.left + i.width - f, h.top + i.height - f, f, o(90), o(0), !0), s = h.left + i.width, m = h.top + i.width + f) : (s = h.left + i.width, m = h.top + i.height, t.lineTo(s, m));
			if (r.stem) switch (c) {
			case "rightbottom":
				m = h.top + i.height - a,
				m += .5 * d.width,
				m -= .5 * p.width,
				l && (m -= l),
				m -= Math.max(v, u.y || 0),
				t.lineTo(s, m),
				s += d.height,
				m -= .5 * d.width,
				t.lineTo(s, m),
				s -= d.height,
				m -= .5 * d.width,
				t.lineTo(s, m);
				break;
			case "rightmiddle":
			case "rightcenter":
				m = h.top + .5 * i.height + .5 * d.width,
				t.lineTo(s, m),
				s += d.height,
				m -= .5 * d.width,
				t.lineTo(s, m),
				s -= d.height,
				m -= .5 * d.width,
				t.lineTo(s, m);
				break;
			case "righttop":
				m = h.top + a,
				l && (m += l),
				m += d.width,
				m -= .5 * d.width - .5 * p.width,
				m += Math.max(v, u.y || 0),
				t.lineTo(s, m),
				s += d.height,
				m -= .5 * d.width,
				t.lineTo(s, m),
				s -= d.height,
				m -= .5 * d.width,
				t.lineTo(s, m)
			}
			f ? f && (t.arc(h.left + i.width - f, h.top + f, f, o(0), o( - 90), !0), m = h.top) : (s = h.left + i.width, m = h.top, t.lineTo(s, m));
			if (r.stem) switch (c) {
			case "topright":
				s = h.left + i.width - a,
				s += .5 * d.width - .5 * p.width,
				l && (s -= l),
				s -= Math.max(v, u.x || 0),
				t.lineTo(s, m),
				m -= d.height,
				s -= .5 * d.width,
				t.lineTo(s, m),
				m += d.height,
				s -= .5 * d.width,
				t.lineTo(s, m);
				break;
			case "topmiddle":
			case "topcenter":
				s = h.left + .5 * i.width + .5 * d.width,
				t.lineTo(s, m),
				m -= d.height,
				s -= .5 * d.width,
				t.lineTo(s, m),
				m += d.height,
				s -= .5 * d.width,
				t.lineTo(s, m),
				s = h.left + .5 * i.width - d.width,
				t.lineTo(s, m),
				t.lineTo(s, m);
				break;
			case "topleft":
				s = h.left + a + d.width,
				s -= .5 * d.width,
				s += .5 * p.width,
				l && (s += l),
				s += Math.max(v, u.x || 0),
				t.lineTo(s, m),
				m -= d.height,
				s -= .5 * d.width,
				t.lineTo(s, m),
				m += d.height,
				s -= .5 * d.width,
				t.lineTo(s, m)
			}
			t.lineTo(g.x, g.y - a),
			t.lineTo(g.x, g.y),
			r.closePath && t.closePath()
		},
		closeButtonMouseover: function () {
			var t = this.getTooltip().options.closeButton,
			t = t.diameter + 2 * t.border;
			e(this.defaultCloseButton).css({
				left: -1 * t + "px"
			}),
			e(this.hoverCloseButton).css({
				left: 0
			})
		},
		closeButtonMouseout: function () {
			var t = this.getTooltip().options.closeButton,
			t = t.diameter + 2 * t.border;
			e(this.defaultCloseButton).css({
				left: 0
			}),
			e(this.hoverCloseButton).css({
				left: t + "px"
			})
		},
		getStemLayout: function () {
			return T.getLayout(this, this.border)
		},
		getOrderLayout: function () {
			var e, t, n, r, i, s, u = this.getTooltip(),
			a = this.contentDimensions,
			f = u.options,
			l = this.radius,
			c = this.border,
			u = this.padding,
			a = {
				width: 2 * c + 2 * u + a.width,
				height: 2 * c + 2 * u + a.height
			};
			this.options.stem && this.getStemLayout();
			var h = T.getBubbleLayout(this, a),
			u = h.dimensions,
			p = h.position,
			a = h.background.dimensions,
			d = h.background.position,
			v = 0,
			m = 0,
			g = u.width,
			y = u.height;
			return f.closeButton && (i = l, "background" == f.radius.position && (i += c), v = i - Math.sin(o(45)) * i, c = "right", this._hookPosition.toLowerCase().match(/^(topright|righttop)$/) && (c = "left"), s = i = f = f.closeButton.diameter + 2 * f.closeButton.border, m = d.left - f / 2 + ("left" == c ? v: a.width - v), v = d.top - f / 2 + v, "left" == c ? 0 > m && (f = Math.abs(m), g += f, p.left += f, m = 0) : (f = m + f - g, 0 < f && (g += f)), 0 > v && (f = Math.abs(v), y += f, p.top += f, v = 0), this.options.closeButton.shadow) && (e = this.options.closeButton.shadow, t = e.blur, f = e.offset, n = i + 2 * t, r = s + 2 * t, e = v - t + f.y, t = m - t + f.x, "left" == c ? 0 > t && (f = Math.abs(t), g += f, p.left += f, m += f, t = 0) : (f = t + n - g, 0 < f && (g += f)), 0 > e) && (f = Math.abs(e), y += f, p.top += f, v += f, e = 0),
			h = h.anchor,
			h.top += p.top,
			h.left += p.left,
			c = {
				left: Math.ceil(p.left + d.left + this.border + this.options.padding),
				top: Math.ceil(p.top + d.top + this.border + this.options.padding)
			},
			a = {
				tooltip: {
					dimensions: {
						width: Math.ceil(g),
						height: Math.ceil(y)
					}
				},
				skin: {
					dimensions: {
						width: Math.ceil(g),
						height: Math.ceil(y)
					}
				},
				bubble: {
					dimensions: u,
					position: {
						top: Math.round(p.top),
						left: Math.round(p.left)
					}
				},
				background: {
					dimensions: {
						width: Math.ceil(a.width),
						height: Math.ceil(a.height)
					},
					position: {
						top: Math.round(d.top),
						left: Math.round(d.left)
					}
				},
				anchor: {
					top: Math.round(h.top),
					left: Math.round(h.left)
				},
				content: {
					position: c
				}
			},
			this.options.closeButton && (a.closeButton = {
				dimensions: {
					width: Math.ceil(i),
					height: Math.ceil(s)
				},
				position: {
					top: Math.round(v),
					left: Math.round(m)
				}
			},
			this.options.closeButton.shadow && (a.closeButtonShadow = {
				dimensions: {
					width: Math.ceil(n),
					height: Math.ceil(r)
				},
				position: {
					top: Math.round(e),
					left: Math.round(t)
				}
			})),
			a
		},
		order: function () {
			var t = this.getOrderLayout(),
			n = this.getTooltip();
			e(n.container).css(i(t.tooltip.dimensions)),
			e(n.skinElement).css(i(t.skin.dimensions)),
			this.iframeShim && this.iframeShim.css(i(t.tooltip.dimensions)),
			e(this.bubble).css(e.extend(i(t.bubble.dimensions), i(t.bubble.position))),
			this.closeButton && (e(this.closeButton).css(i(t.closeButton.position)), t.closeButtonShadow && e(this.closeButtonShadow.container).css(i(t.closeButtonShadow.position))),
			e(n.contentElement).css(i(t.content.position))
		},
		setGlobalAlpha: function (e) {
			this._globalAlpha = e || 0,
			this.shadow && (this.shadow._globalAlpha = this._globalAlpha)
		},
		setOpacity: function (e) {
			this.setGlobalAlpha(e),
			this.build()
		}
	});
	var O = {
		shadows: {},
		get: function (t) {
			if (!t) return null;
			var n = null;
			return (t = e(t).data("tipped-uid")) && (n = this.shadows[t]),
			n
		},
		add: function (e) {
			this.shadows[e.uid] = e
		},
		remove: function (e) {
			if (e = this.get(e)) delete this.shadows[e.uid],
			e.remove()
		},
		transition: function (e) {
			return Math.PI / 2 - Math.pow(e, Math.cos(e) * Math.PI)
		},
		Stem: {
			getBorderDimensions: function (e, t) {
				var n = A.get(e.element).getStemLayout().border.dimensions,
				n = this.getCenterBorderDimensions(n.width, n.height, t, {
					math: !1
				});
				return {
					width: n.width,
					height: n.height
				}
			},
			getCenterBorderDimensions2: function (e, t, n) {
				var r = .5 * e,
				i = 180 - s(Math.acos(r / Math.sqrt(r * r + t * t))) - 90,
				i = o(i),
				n = 1 / Math.cos(i) * n,
				r = 2 * (r + n);
				return {
					width: r,
					height: r / e * t
				}
			},
			getCenterBorderDimensions: function (e, t, n) {
				var r = 180 - s(Math.atan(.5 * (t / e))),
				n = Math.cos(o(r - 90)) * n,
				n = e + 2 * n;
				return {
					width: n,
					height: n * t / e
				}
			},
			getLayout: function (t) {
				var n = A.get(t.element),
				r = t.options.blur,
				i = x.isCorner(n._hookPosition);
				x.getOrientation(n._hookPosition),
				n = O.Stem.getBorderDimensions(t, r),
				n = {
					box: {
						dimensions: {
							width: Math.ceil(n.width),
							height: Math.ceil(n.height)
						},
						position: {
							top: 0,
							left: 0
						}
					}
				};
				if (r) {
					n.blurs = [];
					for (var s = 0; s <= r; s++) {
						var o = O.Stem.getBorderDimensions(t, s, {
							math: !1
						});
						n.blurs.push({
							position: {
								top: n.box.dimensions.height - o.height,
								left: i ? r - s: (n.box.dimensions.width - o.width) / 2
							},
							dimensions: o
						})
					}
				} else n.blurs = [e.extend({},
				n.box)];
				return n
			},
			rotate: function (e, t, n) {
				T.rotate(e, t.getSkin(), n)
			}
		}
	};
	e.extend(a.prototype, {
		prepare: function () {},
		remove: function () {
			this.cleanup()
		},
		cleanup: function () {
			this.container && (e(this.container).remove(), this.container = this.bubble = this.background = this.stem = null, this._cache = {})
		},
		build: function () {
			this.cleanup(),
			this.prepare();
			var t = this.getTooltip(),
			n = this.getSkin();
			this.container = e("<div>").addClass("t_Shadow")[0],
			e(t.container).prepend(this.container),
			n.iframeShim && e(t.container).prepend(n.iframeShim),
			n.getOrderLayout(),
			e(this.container).css({
				top: 0,
				left: 0
			}),
			this.drawBackground(),
			this.order()
		},
		getTooltip: function () {
			return I.get(this.element)[0]
		},
		getSkin: function () {
			return A.get(this.element)
		},
		getOrderLayout: function () {
			var t = this.getSkin(),
			n = t.getOrderLayout();
			this.getTooltip();
			var r = this.options.blur,
			i = e.extend({},
			n.background.dimensions);
			i.width += 2 * r,
			i.height += 2 * r;
			var s;
			t.options.stem && (s = O.Stem.getLayout(this).box.dimensions, s = s.height);
			var o = T.getBubbleLayout(t, i, s);
			s = o.dimensions;
			var u = o.position,
			i = o.background.dimensions,
			o = o.background.position,
			a = n.bubble.position,
			f = n.background.position,
			r = {
				top: a.top + f.top - (o.top + r) + this.options.offset.y,
				left: a.left + f.left - (o.left + r) + this.options.offset.x
			},
			a = n.anchor,
			f = n.skin.dimensions,
			l = {
				top: 0,
				left: 0
			};
			if (0 > r.top) {
				var c = Math.abs(r.top);
				l.top += c,
				r.top = 0,
				a.top += c
			}
			return 0 > r.left && (c = Math.abs(r.left), l.left += c, r.left = 0, a.left += c),
			c = {
				height: Math.max(s.height + r.top, f.height + l.top),
				width: Math.max(s.width + r.left, f.width + l.left)
			},
			t = {
				left: Math.ceil(l.left + n.bubble.position.left + n.background.position.left + t.border + t.padding),
				top: Math.ceil(l.top + n.bubble.position.top + n.background.position.top + t.border + t.padding)
			},
			{
				tooltip: {
					dimensions: c
				},
				skin: {
					dimensions: f,
					position: l
				},
				container: {
					dimensions: s,
					position: r
				},
				bubble: {
					dimensions: s,
					position: {
						top: Math.round(u.top),
						left: Math.round(u.left)
					}
				},
				background: {
					dimensions: {
						width: Math.ceil(i.width),
						height: Math.ceil(i.height)
					},
					position: {
						top: Math.round(o.top),
						left: Math.round(o.left)
					}
				},
				anchor: a,
				content: {
					position: t
				}
			}
		},
		getBlurOpacity: function () {
			return this.options.opacity / (this.options.blur + 1)
		},
		drawBackground: function () {
			var t = this.getSkin(),
			n = t.getOrderLayout(),
			r = this.getTooltip(),
			s = this.getOrderLayout(),
			o = this.options.blur,
			u = O.Stem.getLayout(this),
			a = t._hookPosition,
			f = x.getSide(a),
			l = o,
			c = o;
			if (r.options.stem) {
				var h = u.blurs[u.blurs.length - 1];
				"left" == f && (c += Math.ceil(h.dimensions.height)),
				"top" == f && (l += Math.ceil(h.dimensions.height))
			}
			var p = t._cache.options,
			h = p.radius,
			p = p.border;
			"background" == r.options.radius.position && h && (h += p),
			r = s.bubble.dimensions,
			e(this.container).append(e(this.bubble = document.createElement("div")).addClass("t_ShadowBubble").css(i(r))).css(i(r)),
			e(document.body).append(e(this.bubbleCanvas = document.createElement("canvas")).attr(s.bubble.dimensions)),
			E.init(this.bubbleCanvas),
			s = this.bubbleCanvas.getContext("2d"),
			s.globalAlpha = this._globalAlpha,
			e(this.bubble).append(this.bubbleCanvas);
			for (var r = o + 1, d = 0; d <= o; d++) s.fillStyle = N.hex2fill(this.options.color, O.transition(d * (1 / r)) * (this.options.opacity / r)),
			E.drawRoundedRectangle(s, {
				width: n.background.dimensions.width + 2 * d,
				height: n.background.dimensions.height + 2 * d,
				top: l - d,
				left: c - d,
				radius: h + d
			});
			if (t.options.stem) {
				var d = u.blurs[0].dimensions,
				v = t.options.stem,
				o = p + .5 * v.width,
				m = t.options.radius && "background" == t.options.radius.position ? t.options.radius.size || 0 : 0;
				m && (o += m),
				p = p + m + .5 * v.width - .5 * d.width,
				h = Math.ceil(h > p ? h - p: 0),
				o += Math.max(h, t.options.stem.offset && t.options.stem.offset[f && /^(left|right)$/.test(f) ? "y": "x"] || 0);
				if ("top" == f || "bottom" == f) {
					switch (a) {
					case "topleft":
					case "bottomleft":
						c += o;
						break;
					case "topmiddle":
					case "topcenter":
					case "bottommiddle":
					case "bottomcenter":
						c += .5 * n.background.dimensions.width;
						break;
					case "topright":
					case "bottomright":
						c += n.background.dimensions.width - o
					}
					"bottom" == f && (l += n.background.dimensions.height),
					d = 0;
					for (t = u.blurs.length; d < t; d++) s.fillStyle = N.hex2fill(this.options.color, O.transition(d * (1 / r)) * (this.options.opacity / r)),
					o = u.blurs[d],
					s.beginPath(),
					"top" == f ? (s.moveTo(c, l - d), s.lineTo(c - .5 * o.dimensions.width, l - d), s.lineTo(c, l - d - o.dimensions.height), s.lineTo(c + .5 * o.dimensions.width, l - d)) : (s.moveTo(c, l + d), s.lineTo(c - .5 * o.dimensions.width, l + d), s.lineTo(c, l + d + o.dimensions.height), s.lineTo(c + .5 * o.dimensions.width, l + d)),
					s.closePath(),
					s.fill()
				} else {
					switch (a) {
					case "lefttop":
					case "righttop":
						l += o;
						break;
					case "leftmiddle":
					case "leftcenter":
					case "rightmiddle":
					case "rightcenter":
						l += .5 * n.background.dimensions.height;
						break;
					case "leftbottom":
					case "rightbottom":
						l += n.background.dimensions.height - o
					}
					"right" == f && (c += n.background.dimensions.width),
					d = 0;
					for (t = u.blurs.length; d < t; d++) s.fillStyle = N.hex2fill(this.options.color, O.transition(d * (1 / r)) * (this.options.opacity / r)),
					o = u.blurs[d],
					s.beginPath(),
					"left" == f ? (s.moveTo(c - d, l), s.lineTo(c - d, l - .5 * o.dimensions.width), s.lineTo(c - d - o.dimensions.height, l), s.lineTo(c - d, l + .5 * o.dimensions.width)) : (s.moveTo(c + d, l), s.lineTo(c + d, l - .5 * o.dimensions.width), s.lineTo(c + d + o.dimensions.height, l), s.lineTo(c + d, l + .5 * o.dimensions.width)),
					s.closePath(),
					s.fill()
				}
			}
		},
		order: function () {
			var t = this.getOrderLayout(),
			n = this.getSkin(),
			r = this.getTooltip();
			e(r.container).css(i(t.tooltip.dimensions)),
			e(r.skinElement).css(e.extend(i(t.skin.position), i(t.skin.dimensions))),
			n.iframeShim && n.iframeShim.css(i(t.tooltip.dimensions));
			if (r.options.closeButton) {
				var s = n.getOrderLayout(),
				o = t.skin.position,
				u = s.closeButton.position;
				e(n.closeButton).css(i({
					top: o.top + u.top,
					left: o.left + u.left
				})),
				r.options.closeButton.shadow && (s = s.closeButtonShadow.position, e(n.closeButtonShadow.container).css(i({
					top: o.top + s.top,
					left: o.left + s.left
				})))
			}
			e(this.container).css(e.extend(i(t.container.dimensions), i(t.container.position))),
			e(this.bubble).css(i(t.bubble.dimensions)),
			e(r.contentElement).css(i(t.content.position))
		}
	});
	var M = {
		shadows: {},
		get: function (t) {
			return t ? (t = e(t).data("tipped-uid")) ? this.shadows[t] : null: null
		},
		add: function (e) {
			this.shadows[e.uid] = e
		},
		remove: function (e) {
			if (e = this.get(e)) delete this.shadows[e.uid],
			e.remove()
		}
	};
	e.extend(f.prototype, {
		build: function () {
			this.cleanup(),
			this.getTooltip();
			var t = this.getSkin(),
			n = t.getOrderLayout().closeButton.dimensions,
			r = e.extend({},
			n),
			i = this.options.blur;
			r.width += 2 * i,
			r.height += 2 * i,
			e(t.closeButton).before(e(this.container = document.createElement("div")).addClass("t_CloseButtonShadow")),
			e(document.body).append(e(this.closeButtonCanvas = document.createElement("canvas")).attr(r)),
			E.init(this.closeButtonCanvas),
			t = this.closeButtonCanvas.getContext("2d"),
			t.globalAlpha = this._globalAlpha,
			e(this.container).append(this.closeButtonCanvas);
			for (var s = r.width / 2, r = r.height / 2, n = n.height / 2, u = i + 1, a = 0; a <= i; a++) t.fillStyle = N.hex2fill(this.options.color, O.transition(a * (1 / u)) * (this.options.opacity / u)),
			t.beginPath(),
			t.arc(s, r, n + a, o(0), o(360), !0),
			t.closePath(),
			t.fill()
		},
		remove: function () {
			this.cleanup()
		},
		cleanup: function () {
			this.container && (e(this.container).remove(), this.container = null)
		},
		getTooltip: function () {
			return I.get(this.element)[0]
		},
		getSkin: function () {
			return A.get(this.element)
		},
		getBlurOpacity: function () {
			return this.options.opacity / (this.options.blur + 1)
		}
	});
	var _ = function (t) {
		return "string" == e.type(t) ? {
			element: B.hideOn && B.hideOn.element || H.hideOn.element,
			event: t
		}: l(e.extend({},
		H.hideOn), t)
	},
	D = function (t) {
		return H = Tipped.Skins.base,
		B = l(e.extend({},
		H), Tipped.Skins.reset),
		j = Tipped.Skins.CloseButtons.base,
		F = l(e.extend({},
		j), Tipped.Skins.CloseButtons.reset),
		D = P,
		P(t)
	},
	P = function (t) {
		t.skin = t.skin || (Tipped.Skins[I.options.defaultSkin] ? I.options.defaultSkin: "black");
		var n = t.skin ? e.extend({},
		Tipped.Skins[t.skin] || Tipped.Skins[I.options.defaultSkin]) : {},
		n = l(e.extend({},
		B), n),
		n = l(e.extend({},
		n), t);
		if (n.ajax) {
			var r = B.ajax || {},
			i = H.ajax;
			"boolean" == e.type(n.ajax) && (n.ajax = {
				cache: r.cache || i.cache,
				type: r.type || i.type
			}),
			n.ajax = l(e.extend({},
			i), n.ajax)
		}
		n.background && "string" == e.type(n.background) && (n.background = {
			color: n.background,
			opacity: 1
		}),
		n.border && (r = B.border || {},
		i = H.border, r = "number" == e.type(n.border) ? {
			size: n.border,
			color: r.color || i.color,
			opacity: r.opacity || i.opacity
		}: l(e.extend({},
		i), n.border), n.border = 0 === r.size ? !1 : r),
		n.radius && (r = "number" == e.type(n.radius) ? {
			size: n.radius,
			position: B.radius && B.radius.position || H.radius.position
		}: l(e.extend({},
		H.radius), n.radius), n.radius = 0 === r.size ? !1 : r),
		r = r = n.hook && n.hook.target || "string" == e.type(n.hook) && n.hook || B.hook && B.hook.target || "string" == e.type(B.hook) && B.hook || H.hook && H.hook.target || H.hook,
		i = n.hook && n.hook.tooltip || B.hook && B.hook.tooltip || H.hook && H.hook.tooltip || I.Position.getInversedPosition(r);
		if (n.hook) {
			if ("string" == e.type(n.hook)) r = {
				target: n.hook,
				tooltip: I.Position.getTooltipPositionFromTarget(n.hook)
			};
			else if (r = {
				tooltip: i,
				target: r
			},
			n.hook.tooltip && (r.tooltip = n.hook.tooltip), n.hook.target) r.target = n.hook.target
		} else r = {
			tooltip: i,
			target: r
		};
		n.hook = r,
		"mouse" == n.target ? (i = e.extend({},
		H.offset.mouse), e.extend(i, Tipped.Skins.reset.offset || {}), t.skin && e.extend(i, (Tipped.Skins[t.skin] || Tipped.Skins[I.options.defaultSkin]).offset || {}), i = I.Position.adjustOffsetBasedOnHooks(H.offset.mouse, H.hook, r.target), t.offset && (i = e.extend(i, t.offset || {})), n.fadeOut = 0) : i = {
			x: n.offset.x,
			y: n.offset.y
		},
		n.offset = i;
		if (n.closeButton && n.closeButtonSkin) {
			var t = e.extend({},
			Tipped.Skins.CloseButtons[n.closeButtonSkin]),
			s = l(e.extend({},
			F), t);
			s.states && e.each(["default", "hover"], function (t, n) {
				var r = s.states[n],
				i = F.states && F.states[n];
				if (r.background) {
					var o = i && i.background;
					e.type(r.background) == "number" ? r.background = {
						color: o && o.color || j.states[n].background.color,
						opacity: r.background
					}: e.type(r.background) == "string" ? (o = o && e.type(o.opacity) == "number" && o.opacity || j.states[n].background.opacity, r.background = {
						color: r.background,
						opacity: o
					}) : r.background = l(e.extend({},
					j.states[n].background), r.background)
				}
				r.border && (i = i && i.border, r.border = e.type(r.border) == "number" ? {
					color: i && i.color || j.states[n].border.color,
					opacity: r.border
				}: l(e.extend({},
				j.states[n].border), r.border))
			}),
			s.shadow && (t = F.shadow && F.shadow.constructor && F.shadow.constructor == Object ? F.shadow: j.shadow, s.shadow.constructor && s.shadow.constructor == Object && (t = l(t, s.shadow)), s.shadow = t),
			n.closeButton = s
		}
		n.shadow && (t = "boolean" == e.type(n.shadow) ? B.shadow && "boolean" == e.type(B.shadow) ? H.shadow: B.shadow ? B.shadow: H.shadow: l(e.extend({},
		H.shadow), n.shadow || {}), "number" == e.type(t.offset) && (t.offset = {
			x: t.offset,
			y: t.offset
		}), n.shadow = t),
		n.stem && (t = {},
		t = "boolean" == e.type(n.stem) ? l({},
		H.stem) : l(l({},
		H.stem), e.extend({},
		n.stem)), "number" == e.type(t.offset) && (t.offset = {
			x: t.offset,
			y: t.offset
		}), n.stem = t),
		n.containment && ("string" == e.type(n.containment) ? n.containment = {
			selector: n.containment,
			flip: !0
		}: "boolean" == e.type(n.containment) && (n.containment = n.containment ? {
			selector: "viewport",
			flip: !0
		}: !1)),
		n.hideOn && "click-outside" == n.hideOn && (n.hideOnClickOutside = !0, n.hideOn = !1);
		if (n.hideOn) if (e.isArray(n.hideOn)) {
			var o = [];
			e.each(n.hideOn, function (e, t) {
				o.push(_(t))
			}),
			n.hideOn = o
		} else n.hideOn = [_(n.hideOn)];
		return n.showOn && "string" == e.type(n.showOn) && (n.showOn = ["" + n.showOn]),
		n.padding = 0,
		n.spinner && !window.Spinners && (n.spinner = !1),
		n
	},
	H,
	B,
	j,
	F,
	I = {
		tooltips: {},
		options: {
			defaultSkin: "black",
			startingZIndex: 999999
		},
		startDelegating: function () {
			var t = ["click"];
			Tipped.support.touch && (t.push("touchstart"), e(document.body).bind("click", function () {})),
			e.each(t, function (t, n) {
				e(document.documentElement).delegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", n, function (t) {
					t.preventDefault(),
					t.stopPropagation(),
					I.getByTooltipElement(e(t.target).closest(".t_Tooltip")[0]).hide()
				})
			}),
			e(window).bind("resize", e.proxy(this.onWindowResize, this))
		},
		onWindowResize: function () {
			this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null),
			this._resizeTimer = p.delay(e.proxy(function () {
				var t = this.getVisible();
				e.each(t, function (e, t) {
					t.position()
				})
			},
			this), 200)
		},
		_getTooltip: function (t) {
			var n = e(t).data("tipped-uid"),
			r;
			n || (t = this.getByTooltipElement(e(t).closest(".t_Tooltip")[0])) && t.element && (n = e(t.element).data("tipped-uid"));
			if (n && (r = this.tooltips[n])) return r
		},
		findElement: function (e) {
			var t;
			return p.isElement(e) && (t = this._getTooltip(e)),
			t && t.element
		},
		get: function (t) {
			var n = [];
			if (p.isElement(t)) {
				var r = this._getTooltip(t);
				r && (n = [r])
			} else e.each(this.tooltips, function (r, i) {
				i.element && e(i.element).is(t) && n.push(i)
			});
			return n
		},
		getByTooltipElement: function (t) {
			if (!t) return null;
			var n = null;
			return e.each(this.tooltips, function (e, r) {
				r.getState("build") && r.container === t && (n = r)
			}),
			n
		},
		getBySelector: function (t) {
			var n = [];
			return e.each(this.tooltips, function (r, i) {
				i.element && e(i.element).is(t) && n.push(i)
			}),
			n
		},
		show: function (t) {
			p.isElement(t) ? (t = this.get(t)[0]) && t.show() : e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.show()
			},
			this))
		},
		hide: function (t) {
			p.isElement(t) ? (t = this.get(t)[0]) && t.hide() : e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.hide()
			},
			this))
		},
		toggle: function (t) {
			p.isElement(t) ? (t = this.get(t)[0]) && t.toggle() : e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.toggle()
			},
			this))
		},
		hideAll: function () {
			e.each(this.getVisible(), function (e, t) {
				t.hide()
			})
		},
		refresh: function (t) {
			p.isElement(t) ? (t = this.get(t)[0]) && t.refresh() : e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.refresh()
			},
			this))
		},
		getVisible: function () {
			var t = [];
			return e.each(this.tooltips, function (e, n) {
				n.visible() && t.push(n)
			}),
			t
		},
		isVisibleByElement: function (t) {
			var n = !1;
			return p.isElement(t) && e.each(this.getVisible() || [], function (e, r) {
				if (r.element == t) return n = !0,
				!1
			}),
			n
		},
		getHighestTooltip: function () {
			var t = 0,
			n;
			return e.each(this.tooltips, function (e, r) {
				r.zIndex > t && (t = r.zIndex, n = r)
			}),
			n
		},
		resetZ: function () {
			1 >= this.getVisible().length && e.each(this.tooltips, function (t, n) {
				n.getState("build") && !n.options.zIndex && e(n.container).css({
					zIndex: n.zIndex = +I.options.startingZIndex
				})
			})
		},
		add: function (e) {
			this.tooltips[e.uid] = e
		},
		_remove: function (t) {
			if (t = this._getTooltip(t)) {
				var n = e(t.element).data("tipped-uid");
				delete this.tooltips[n],
				t.hide(),
				t.remove()
			}
		},
		remove: function (t) {
			p.isElement(t) ? this._remove(t) : e(t).each(e.proxy(function (e, t) {
				this._remove(t)
			},
			this))
		},
		removeDetached: function () {
			e.each(this.tooltips, e.proxy(function (e, t) {
				t.element && !p.element.isAttached(t.element) && this._remove(t.element)
			},
			this))
		},
		setDefaultSkin: function (e) {
			this.options.defaultSkin = e || "black"
		},
		setStartingZIndex: function (e) {
			this.options.startingZIndex = e || 0
		},
		createOptions: D
	},
	q = function (t, n) {
		var r = x.split(t),
		i = r[1],
		r = r[2],
		s = x.getOrientation(t),
		o = e.extend({
			horizontal: !0,
			vertical: !0
		},
		n || {});
		return "horizontal" == s ? (o.vertical && (i = K[i]), o.horizontal && (r = K[r])) : (o.vertical && (r = K[r]), o.horizontal && (i = K[i])),
		i + r
	},
	R = function (t, n) {
		if (t.options.containment) {
			var r = n,
			i = J(t),
			s = i.dimensions,
			i = i.position,
			o = A.get(t.element)._cache.hook[r.hook.tooltip].tooltip.dimensions,
			u = r.position;
			i.left > u.left && (r.position.left = i.left),
			i.top > u.top && (r.position.top = i.top),
			i.left + s.width < u.left + o.width && (r.position.left = i.left + s.width - o.width),
			i.top + s.height < u.top + o.height && (r.position.top = i.top + s.height - o.height),
			n = r
		}
		t.setHookPosition(n.hook.tooltip),
		r = n.position,
		e(t.container).css({
			top: r.top + "px",
			left: r.left + "px"
		})
	},
	U = function (e) {
		return e && (/^mouse|click|touch$/.test("string" == typeof e.type && e.type || "") || 0 <= e.pageX)
	},
	z = function (e, t, n, r) {
		var i = e >= n && e <= r,
		s = t >= n && t <= r;
		return i && s ? t - e: i && !s ? r - e: !i && s ? t - n: (i = n >= e && n <= t, s = r >= e && r <= t, i && s ? r - n: i && !s ? t - n: !i && s ? r - e: 0)
	},
	W = function (e, t) {
		var n = e.dimensions.width * e.dimensions.height;
		return n ? z(e.position.left, e.position.left + e.dimensions.width, t.position.left, t.position.left + t.dimensions.width) * z(e.position.top, e.position.top + e.dimensions.height, t.position.top, t.position.top + t.dimensions.height) / n: 0
	},
	X = function (e, t) {
		var n = x.split(t),
		r = {
			left: 0,
			top: 0
		};
		if ("horizontal" == x.getOrientation(t)) {
			switch (n[2]) {
			case "middle":
			case "center":
				r.left = .5 * e.width;
				break;
			case "right":
				r.left = e.width
			}
			"bottom" == n[1] && (r.top = e.height)
		} else {
			switch (n[2]) {
			case "middle":
			case "center":
				r.top = .5 * e.height;
				break;
			case "bottom":
				r.top = e.height
			}
			"right" == n[1] && (r.left = e.width)
		}
		return r
	},
	V = function (t) {
		var n = p.element.cumulativeOffset(t),
		t = p.element.cumulativeScrollOffset(t),
		r = e(window).scrollTop(),
		i = e(window).scrollLeft();
		return n.left += -1 * (t.left - i),
		n.top += -1 * (t.top - r),
		n
	},
	$ = function (t, n, r, i) {
		var s, o, u = A.get(t.element),
		a = u.options,
		f = a.offset,
		l = U(r);
		l || !r ? (o = {
			width: 1,
			height: 1
		},
		l ? (s = p.pointer(r), s = {
			top: s.y,
			left: s.x
		}) : (s = t._cache.event, s = {
			top: s ? s.y: 0,
			left: s ? s.x: 0
		}), t._cache.event = {
			x: s.left,
			y: s.top
		}) : (s = V(r), o = {
			width: e(r).outerWidth(),
			height: e(r).outerHeight()
		});
		if (a.stem && "mouse" != a.target) {
			var r = x.split(i),
			c = x.split(n),
			h = x.getOrientation(i),
			d = u._cache.options,
			u = u.getStemLayout().border.dimensions,
			v = d.radius,
			d = d.border,
			m = v && "background" == a.radius.position ? v: 0,
			v = v && "border" == a.radius.position ? v: v + d,
			u = d + m + .5 * a.stem.width - .5 * u.width;
			sideOffset = Math.ceil(d + m + .5 * a.stem.width + (v > u ? v - u: 0) + a.stem.offset["horizontal" == h ? "x": "y"]);
			if ("horizontal" == h && "left" == r[2] && "left" == c[2] || "right" == r[2] && "right" == c[2]) o.width -= 2 * sideOffset,
			s.left += sideOffset;
			else if ("vertical" == h && "top" == r[2] && "top" == c[2] || "bottom" == r[2] && "bottom" == c[2]) o.height -= 2 * sideOffset,
			s.top += sideOffset
		}
		r = e.extend({},
		s),
		a = l ? q(a.hook.tooltip) : a.hook.target,
		X(o, a),
		l = X(o, i),
		s = {
			left: s.left + l.left,
			top: s.top + l.top
		},
		f = e.extend({},
		f),
		f = Q(f, a, i),
		s.top += f.y,
		s.left += f.x,
		u = A.get(t.element),
		f = u._cache.hook,
		a = e.extend({},
		f[n]),
		s = {
			top: s.top - a.anchor.top,
			left: s.left - a.anchor.left
		},
		a.tooltip.position = s,
		a = {
			horizontal: !0,
			vertical: !0
		};
		if (t.options.containment) {
			if (l = J(t), t = (t.options.shadow ? O.get(t.element) : u).getOrderLayout().tooltip.dimensions, a.overlap = W({
				dimensions: t,
				position: s
			},
			l), 1 > a.overlap) {
				if (s.left < l.position.left || s.left + t.width > l.position.left + l.dimensions.width) a.horizontal = !1;
				if (s.top < l.position.top || s.top + t.height > l.position.top + l.dimensions.height) a.vertical = !1
			}
		} else a.overlap = 1;
		return t = f[n].bubble,
		o = W({
			dimensions: o,
			position: r
		},
		{
			dimensions: t.dimensions,
			position: {
				top: s.top + t.position.top,
				left: s.left + t.position.left
			}
		}),
		{
			position: s,
			overlap: {
				target: o
			},
			contained: a,
			hook: {
				tooltip: n,
				target: i
			}
		}
	},
	J = function (t) {
		var n = {
			top: e(window).scrollTop(),
			left: e(window).scrollLeft()
		},
		r = t.options,
		i = r.target;
		if ("mouse" == i || "self" == i) i = t.element;
		return t = e(i).closest(r.containment.selector).first()[0],
		!t || "viewport" == r.containment.selector ? {
			dimensions: {
				width: e(window).width(),
				height: e(window).height()
			},
			position: n
		}: (r = p.element.cumulativeOffset(t), i = p.element.cumulativeScrollOffset(t), r.left += -1 * (i.left - n.left), r.top += -1 * (i.top - n.top), {
			dimensions: {
				width: e(t).innerWidth(),
				height: e(t).innerHeight()
			},
			position: r
		})
	},
	K = {
		left: "right",
		right: "left",
		top: "bottom",
		bottom: "top",
		middle: "middle",
		center: "center"
	},
	Q,
	G = [[ - 1, -1], [0, -1], [1, -1], [ - 1, 0], [0, 0], [1, 0], [ - 1, 1], [0, 1], [1, 1]],
	Y = {
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
	Q = function (e, t, n) {
		var r = G[Y[t]],
		i = G[Y[n]],
		r = [Math.floor(.5 * Math.abs(r[0] - i[0])) ? -1 : 1, Math.floor(.5 * Math.abs(r[1] - i[1])) ? -1 : 1];
		return ! x.isCenter(t) && x.isCenter(n) && ("horizontal" == x.getOrientation(n) ? r[0] = 0 : r[1] = 0),
		{
			x: r[0] * e.x,
			y: r[1] * e.y
		}
	},
	I.Position = {
		get: $,
		set: function (e, t, n, r) {
			var i = $(e, t, n, r);
			/move$/.test(n && "string" == typeof n.type ? n.type: "");
			if (1 === i.contained.overlap) R(e, i);
			else {
				var s = t,
				o = r,
				o = {
					horizontal: !i.contained.horizontal,
					vertical: !i.contained.vertical
				};
				if (!x.isCenter(t)) return s = q(t, o),
				o = q(r, o),
				i = $(e, s, n, o),
				R(e, i),
				i;
				if ("horizontal" == x.getOrientation(t) && o.vertical || "vertical" == x.getOrientation(t) && o.horizontal) if (s = q(t, o), o = q(r, o), i = $(e, s, n, o), 1 === i.contained.overlap) return R(e, i),
				i;
				t = [],
				r = x.positions,
				s = 0;
				for (o = r.length; s < o; s++) for (var u = r[s], a = 0, f = x.positions.length; a < f; a++) t.push($(e, x.positions[a], n, u));
				for (var n = i, l = A.get(e.element)._cache.hook, s = l[n.hook.tooltip], r = 0, c = n.position.left + s.anchor.left, h = n.position.top + s.anchor.top, p = 0, d = 1, v = {
					dimensions: s.tooltip.dimensions,
					position: n.position
				},
				m = 0, s = 1, u = o = 0, a = t.length; u < a; u++) {
					f = t[u],
					f.score = {},
					f.score.containment = f.contained.overlap;
					var g = l[f.hook.tooltip].anchor,
					g = Math.sqrt(Math.pow(Math.abs(f.position.left + g.left - c), 2) + Math.pow(Math.abs(f.position.top + g.top - h), 2)),
					r = Math.max(r, g);
					f.score.distance = g,
					g = f.overlap.target,
					d = Math.min(d, g),
					p = Math.max(p, g),
					f.score.targetOverlap = g,
					g = W(v, {
						dimensions: l[f.hook.tooltip].tooltip.dimensions,
						position: f.position
					}),
					s = Math.min(s, g),
					m = Math.max(m, g),
					f.score.tooltipOverlap = g,
					g = "horizontal" == x.getOrientation(n.hook.target) ? "top": "left",
					g = Math.abs(n.position[g] - f.position[g]),
					o = Math.max(o, g),
					f.score.orientationOffset = g
				}
				for (var l = 0, y, p = Math.max(n.overlap.target - d, p - n.overlap.target), d = m - s, u = 0, a = t.length; u < a; u++) f = t[u],
				m = 51 * f.score.containment,
				m += 18 * (1 - f.score.distance / r) || 9,
				c = Math.abs(n.overlap.target - f.score.targetOverlap) || 0,
				m += 4 * (1 - (c / p || 1)),
				m += 11 * ((f.score.tooltipOverlap - s) / d || 0),
				m += x.isCenter(f.hook.tooltip) ? 0 : 25 * (1 - f.score.orientationOffset / (o || 1)),
				l = Math.max(l, m),
				m == l && (y = u);
				R(e, t[y])
			}
			return i
		},
		getInversedPosition: q,
		getTooltipPositionFromTarget: function (e) {
			return e = x.split(e),
			q(e[1] + K[e[2]])
		},
		getAbsoluteOffset: V,
		adjustOffsetBasedOnHooks: Q,
		isPointerEvent: U
	},
	I.Position.mouseBuffer = {
		x: 0,
		y: 0
	},
	e(document).ready(function () {
		var t = I.Position;
		e(document).bind("mousemove", function (e) {
			t.mouseBuffer = {
				x: e.pageX,
				y: e.pageY
			}
		})
	});
	var Z = function (t) {
		return {
			width: e(t).innerWidth(),
			height: e(t).innerHeight()
		}
	},
	et = function (t) {
		var n = Z(t),
		r = t.parentNode;
		return r && e(r).css({
			width: n.width + "px"
		}) && Z(t).height > n.height && n.width++,
		e(r).css({
			width: "100%"
		}),
		n
	};
	I.UpdateQueue = {
		build: function () {
			e(document.body).append(e(document.createElement("div")).addClass("t_UpdateQueue").append(e(document.createElement("div")).addClass("t_Tooltip").append(e(this.container = document.createElement("div")).addClass("t_Content"))))
		},
		update: function (t, n, r, i) {
			this.container || this.build();
			var s = t.options,
			i = e.extend({
				spinner: !1
			},
			i || {});
			(s.inline || p.isElement(n)) && !e(n).data("isSpinner") && (s.inline && "string" == e.type(n) && (t.inlineContent = e("#" + n)[0], n = t.inlineContent), !t.inlineMarker && n && p.element.isAttached(n)) && (e(t.inlineContent).data("tipped_restore_inline_display", e(t.inlineContent).css("display")), t.inlineMarker = document.createElement("div"), e(t.inlineContent).before(e(t.inlineMarker).hide()));
			var o = document.createElement("div");
			e(this.container).append(e(o).addClass("t_ContentContainer t_clearfix").append(n)),
			p.isElement(n) && e(n).show(),
			s.skin && e(o).addClass("t_Content_" + t.options.skin);
			var u = e(o).find("img[src]").filter(function () {
				return ! e(this).attr("height") || !e(this).attr("width")
			});
			if (0 < u.length && !t.getState("preloading_images")) {
				t.setState("preloading_images", !0),
				s.spinner && (!i.spinner && !t.spinner && (t.spinner = t.insertSpinner(s.spinner)), t.getState("visible") && (t.position(), e(t.container).show()), t.spinner.play());
				var a = 0,
				n = Math.max(8e3, 750 * (u.length || 0));
				t.clearTimer("preloading_images"),
				t.setTimer("preloading_images", e.proxy(function () {
					u.each(function () {
						this.onload = function () {}
					}),
					a >= u.length || (this._updateTooltip(t, o), r && r())
				},
				this), n),
				e.each(u, e.proxy(function (n, i) {
					var s = new Image;
					s.onload = e.proxy(function () {
						s.onload = function () {};
						var n = s.width,
						f = s.height,
						l = e(i).attr("width"),
						c = e(i).attr("height");
						if (!l || !c) ! l && c ? (n = Math.round(c * n / f), f = c) : !c && l && (f = Math.round(l * f / n), n = l),
						e(i).attr({
							width: n,
							height: f
						}),
						a++;
						a == u.length && (t.clearTimer("preloading_images"), t.spinner && (t.spinner.remove(), t.spinner = null), t.getState("visible") && e(t.container).hide(), this._updateTooltip(t, o), r && r())
					},
					this),
					s.src = i.src
				},
				this))
			} else this._updateTooltip(t, o),
			r && r()
		},
		_updateTooltip: function (t, n) {
			var r = et(n),
			i = r.width - (parseInt(e(n).css("padding-left")) || 0) - (parseInt(e(n).css("padding-right")) || 0);
			parseInt(e(n).css("padding-top")),
			parseInt(e(n).css("padding-bottom")),
			t.options.maxWidth && "number" == e.type(t.options.maxWidth) && i > t.options.maxWidth && (e(n).css({
				width: t.options.maxWidth + "px"
			}), r = et(n)),
			t._cache.contentDimensions = r,
			e(t.contentElement).html(n)
		},
		getMeasureElementDimensions: et
	},
	e.extend(c.prototype, {
		build: function () {
			this.getState("build") || (e(document.body).append(e(this.container).css({
				left: "-10000px",
				top: "-10000px",
				zIndex: this.zIndex
			}).append(e(this.skinElement = document.createElement("div")).addClass("t_Skin")).append(e(this.contentElement = document.createElement("div")).addClass("t_Content"))), e(this.container).addClass("t_Tooltip_" + this.options.skin), this.options.hideOnClickOutside && (e(this.element).addClass("t_hideOnClickOutside"), this.setEvent(document.documentElement, "click", e.proxy(function (t) {
				this.visible() && (t = e(t.target).closest(".t_Tooltip, .t_hideOnClickOutside")[0], (!t || t && t != this.container && t != this.element) && this.hide())
			},
			this))), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), e(this.container).addClass("t_hidden")), this.createPostBuildObservers(), this.setState("build", !0), I.add(this))
		},
		_preBuild: function () {
			e(this.container = document.createElement("div")).addClass("t_Tooltip"),
			this.createPreBuildObservers()
		},
		_buildSkin: function () {
			this.build();
			var e = A.get(this.element);
			e ? e.build() : (new u(this.element), this.setState("skinned", !0))
		},
		createPreBuildObservers: function () {
			this.setEvent(this.element, "mouseenter", this.setActive),
			this.setEvent(this.element, "mouseleave", e.proxy(function (e) {
				this.setIdle(e)
			},
			this)),
			this.options.showOn && e.each(this.options.showOn, e.proxy(function (t, n) {
				var r = !1;
				"click" == n && (this.options.hideOn && e.each(this.options.hideOn, function (e, t) {
					if ("self" == t.element && "click" == t.event) return r = !0,
					!1
				}), this.setState("toggles", r)),
				this.setEvent(this.element, n, "click" == n ? r ? this.toggle: this.show: e.proxy(function () {
					this.showDelayed()
				},
				this))
			},
			this)),
			this.options.hideOn ? e.each(this.options.hideOn, e.proxy(function (t, n) {
				var r;
				switch (n.element) {
				case "self":
					if (this.getState("toggles") && "click" == n.event) return;
					r = this.element;
					break;
				case "target":
					r = this.target
				}
				r && this.setEvent(r, n.event, "click" == n.event ? this.hide: e.proxy(function () {
					this.hideDelayed()
				},
				this))
			},
			this)) : this.options.showDelay && this.options.showOn && -1 < !e.inArray("click", this.options.showOn) && this.setEvent(this.element, "mouseleave", e.proxy(function () {
				this.clearTimer("show")
			},
			this));
			var t = !1; ! this.options.fixed && this.options.showOn && ((t = -1 < e.inArray("mousemove", this.options.showOn)) || -1 < e.inArray("touchmove", this.options.showOn)) && "mouse" == this.target && this.setEvent(this.element, t ? "mousemove": "touchmove", function (e) {
				this.getState("skinned") && this.position(e)
			})
		},
		createPostBuildObservers: function () {
			this.setEvent(this.container, "mouseenter", this.setActive),
			this.setEvent(this.container, "mouseleave", this.setIdle),
			this.setEvent(this.container, "mouseenter", e.proxy(function () {
				this.getTimer("fadeTransition") || this.show()
			},
			this)),
			this.options.hideOn && e.each(this.options.hideOn, e.proxy(function (t, n) {
				var r;
				switch (n.element) {
				case "tooltip":
					r = this.container
				}
				r && this.setEvent(r, n.event, n.event.match(/^(click|mousemove|mouseenter)$/) ? this.hide: e.proxy(function () {
					this.hideDelayed()
				},
				this))
			},
			this))
		},
		show: function (t) {
			this.clearTimer("hide"),
			this.clearTimer("fadeTransition");
			if (!this.visible()) {
				if ("function" == e.type(this.content) || "function" == e.type(this._cache.contentFunction)) {
					"function" != e.type(this._cache.contentFunction) && (this._cache.contentFunction = this.content);
					var n = this._cache.contentFunction(this.element) || !1;
					n != this._cache.fnCallContent && (this._cache.fnCallContent = n, this.setState("updated", !1), this._restoreInlineContent()),
					this.content = n;
					if (!n) return
				}
				this.options.hideOthers && I.hideAll(),
				this.setState("visible", !0),
				this.options.ajax ? this.ajaxUpdate(t) : this.getState("updated") || this.update(this.content),
				this.getState("skinned") && this.position(t),
				this.raise(),
				this.options.hideAfter && p.defer(e.proxy(function () {
					this.setActive()
				},
				this)),
				"function" == e.type(this.options.onShow) && (!this.options.ajax || this.options.ajax && this.options.ajax.cache && this.getState("updated")) && this.options.onShow(this.contentElement.firstChild, this.element),
				Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), e(this.container).addClass("t_visible").removeClass("t_hidden")),
				e(this.container).show()
			}
		},
		hide: function () {
			this.clearTimer("show"),
			this.getState("visible") && (this.setState("visible", !1), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) ? (this.setFadeDuration(this.options.fadeOut), e(this.container).removeClass("t_visible").addClass("t_hidden"), this.setTimer("fadeTransition", e.proxy(this._hide, this), this.options.fadeOut)) : this._hide(), this._cache.xhr) && (this._cache.xhr.abort(), this._cache.xhr = null, this.setState("xhr", !1))
		},
		_hide: function () {
			this.getState("build") && (e(this.container).css({
				left: "-10000px",
				top: "-10000px"
			}), I.resetZ(), this.resetHookPosition(), "function" == e.type(this.options.onHide) && !this.spinner) && this.options.onHide(this.contentElement.firstChild, this.element)
		},
		toggle: function (e) {
			this[this.visible() ? "hide": "show"](e)
		},
		visible: function () {
			return this.getState("visible")
		},
		showDelayed: function (t) {
			this.clearTimer("hide"),
			this.clearTimer("fadeTransition"),
			!this.getState("visible") && !this.getTimer("show") && this.setTimer("show", e.proxy(function () {
				this.clearTimer("show"),
				this.show(t)
			},
			this), this.options.showDelay || 1)
		},
		hideDelayed: function () {
			this.clearTimer("show"),
			!this.getTimer("hide") && this.getState("visible") && this.setTimer("hide", e.proxy(function () {
				this.clearTimer("hide"),
				this.clearTimer("fadeTransition"),
				this.hide()
			},
			this), this.options.hideDelay || 1)
		},
		setFadeDuration: function (e) {
			if (Tipped.support.cssTransitions) {
				var e = e || 0,
				t = this.container.style;
				t.MozTransitionDuration = e + "ms",
				t.webkitTransitionDuration = e + "ms",
				t.OTransitionDuration = e + "ms",
				t.transitionDuration = e + "ms"
			}
		},
		setState: function (e, t) {
			this._cache.states[e] = t
		},
		getState: function (e) {
			return this._cache.states[e]
		},
		setActive: function () {
			this.setState("active", !0),
			this.getState("visible") && this.raise(),
			this.options.hideAfter && this.clearTimer("idle")
		},
		setIdle: function () {
			this.setState("active", !1),
			this.options.hideAfter && this.setTimer("idle", e.proxy(function () {
				this.clearTimer("idle"),
				this.getState("active") || this.hide()
			},
			this), this.options.hideAfter)
		},
		getTimer: function (e) {
			return this._cache.timers[e]
		},
		setTimer: function (e, t, n) {
			this._cache.timers[e] = p.delay(t, n)
		},
		clearTimer: function (e) {
			this._cache.timers[e] && (window.clearTimeout(this._cache.timers[e]), delete this._cache.timers[e])
		},
		clearTimers: function () {
			e.each(this._cache.timers, function (e, t) {
				window.clearTimeout(t)
			}),
			this._cache.timers = []
		},
		setEvent: function (t, n, r, i) {
			r = e.proxy(r, i || this),
			this._cache.events.push({
				element: t,
				eventName: n,
				handler: r
			}),
			e(t).bind(n, r)
		},
		clearEvents: function () {
			e.each(this._cache.events, function (t, n) {
				e(n.element).unbind(n.eventName, n.handler)
			})
		},
		setHookPosition: function (e) {
			var t = A.get(this.element);
			t && t.setHookPosition(e)
		},
		resetHookPosition: function () {
			this.setHookPosition(this.options.hook.tooltip)
		},
		refresh: function () {
			var e = A.get(this.element);
			e && (e.refresh(), this.visible() && this.position())
		},
		update: function (t, n) {
			var r = e.extend({
				afterUpdate: this.options.afterUpdate,
				spinner: !1
			},
			n || {});
			this.build(),
			this.getState("visible") && e(this.container).hide(),
			I.UpdateQueue.update(this, t, e.proxy(function () {
				var t = this.getState("visible");
				t || this.setState("visible", !0),
				this._buildSkin(),
				t || this.setState("visible", !1),
				this.getState("visible") && (e(this.container).hide(), this.position(), this.raise(), e(this.container).show()),
				this.setState("updated", !0),
				r.afterUpdate && r.afterUpdate(this.contentElement.firstChild, this.element),
				r.callback && r.callback()
			},
			this), {
				spinner: r.spinner
			})
		},
		ajaxUpdate: function (t) {
			this.getState("xhr") || this.options.ajax.cache && this.getState("updated") || (this.setState("xhr", !0), this.options.spinner && (this.spinner ? this.spinner.play() : (this.spinner = this.insertSpinner(this.options.spinner), this.setState("updated", !1)), this.position(t)), this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null), this._cache.xhr = e.ajax({
				url: this.content,
				type: this.options.ajax.type,
				data: this.options.ajax.data || {},
				dataType: this.options.ajax.dataType || "html",
				success: e.proxy(function (t, n, r) {
					r.status !== 0 && this.update(r.responseText, {
						spinner: this.options.spinner && this.spinner,
						callback: e.proxy(function () {
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
		insertSpinner: function (t) {
			var n = document.createElement("div");
			e(n).data("isSpinner", !0);
			var r = Spinners.create(n, e.extend({},
			t || {})),
			t = Spinners.getDimensions(n);
			return e(n).css(i(t)),
			this.update(n, {
				afterUpdate: !1,
				callback: function () {
					r.play()
				}
			}),
			r
		},
		position: function (t) {
			if (this.visible()) {
				var n;
				if ("mouse" == this.options.target) {
					n = I.Position.isPointerEvent(t);
					var r = I.Position.mouseBuffer;
					n ? r.x || r.y ? (this._cache.event = {
						x: r.x,
						y: r.y
					},
					n = null) : n = t: (r.x || r.y ? this._cache.event = {
						x: r.x,
						y: r.y
					}: this._cache.event || (n = I.Position.getAbsoluteOffset(this.element), this._cache.event = {
						x: n.left,
						y: n.top
					}), n = null)
				} else n = this.target;
				I.Position.set(this, this.options.hook.tooltip, n, this.options.hook.target);
				if (t && I.Position.isPointerEvent(t)) {
					var r = e(this.container).outerWidth(),
					i = e(this.container).outerHeight(),
					t = p.pointer(t);
					n = p.element.cumulativeOffset(this.container),
					t.x >= n.left && t.x <= n.left + r && t.y >= n.top && t.y <= n.top + i && p.defer(e.proxy(function () {
						this.clearTimer("hide")
					},
					this))
				}
			}
		},
		raise: function () {
			if (this.getState("build") && !this.options.zIndex) {
				var t = I.getHighestTooltip();
				t && t != this && this.zIndex <= t.zIndex && e(this.container).css({
					zIndex: this.zIndex = t.zIndex + 1
				})
			}
		},
		_restoreInlineContent: function () {
			var t;
			this.inlineMarker && this.inlineContent && ((t = e(this.inlineContent).data("tipped_restore_inline_display")) && e(this.inlineContent).css({
				display: t
			}), e(this.inlineMarker).before(this.inlineContent).remove(), this.inlineMarker = null)
		},
		remove: function () {
			p.defer(e.proxy(function () {
				this.clearEvents()
			},
			this)),
			this.clearTimers(),
			this._restoreInlineContent(),
			p.defer(e.proxy(function () {
				e(this.container).find("img[src]").unbind("load")
			},
			this)),
			A.remove(this.element),
			this.getState("build") && this.container && (e(this.container).remove(), this.container = null);
			var t;
			(t = e(this.element).data("tipped_restore_title")) && e(this.element).attr("title", t).removeData("tipped_restore_title"),
			e(this.element).removeData("tipped-uid")
		}
	}),
	Tipped.init()
})(jQuery)