/*!
 * Tipped - The jQuery Tooltip - v3.1.3
 * (c) 2010-2012 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/tipped
 *
 * License: http://projects.nickstakenburg.com/tipped/license
 */
;var Tipped = { version: '3.1.3' };

Tipped.Skins = {
  // base skin, don't modify! (create custom skins in a separate file)
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
      size: 5,
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
    offset: { x: 0, y: 0 },
    onHide: false,
    onShow: false,
    shadow: {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .12
    },
    showOn: 'mousemove',
    spinner: true,
    stem: {
      height: 9,
      width: 18,
      offset: { x: 9, y: 9 },
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
  
  'dark': {
    background: { color: '#282828' },
    border: { color: '#9b9b9b', opacity: .4, size: 1 },
    shadow: { opacity: .02 },
    spinner: { color: '#fff' }
  },
  
  'light': {
    background: { color: '#fff' },
    border: { color: '#646464', opacity: .4, size: 1 },
    shadow: { opacity: .04 }
  },
  
  'gray': {
    background: {
      color: [
        { position: 0, color: '#8f8f8f'},
        { position: 1, color: '#808080' }
      ]
    },
    border: { color: '#131313', size: 1, opacity: .6 } 
  },
  
  'tiny': {
    background: { color: '#161616' },
    border: { color: '#969696', opacity: .35, size: 1 },
    fadeIn: 0,
    fadeOut: 0,
    radius: 4,
    stem: {
      width: 11,
      height: 6,
      offset: { x: 6, y: 6 }
    },
    shadow: false,
    spinner: { color: '#fff' }
  },

  'yellow': {
    background: '#ffffaa',
    border: { size: 1, color: '#6d5208', opacity: .4 }
  },
  
  'red': {
    background: {
      color: [
        { position: 0, color: '#e13c37'},
        { position: 1, color: '#e13c37' }
      ]
    },
    border: { size: 1, color: '#150201', opacity: .6 },
    spinner: { color: '#fff' }
  },
  
  'green': {
    background: {
      color: [
        { position: 0, color: '#4bb638'},
        { position: 1, color: '#4aab3a' }
      ]
    },
    border: { size: 1, color: '#122703', opacity: .6 },
    spinner: { color: '#fff' }
  },

  'blue': {
    background: {
      color: [
        { position: 0, color: '#4588c8'},
        { position: 1, color: '#3d7cb9' }
      ]
    },
    border: { color: '#020b17', opacity: .6 },
    spinner: { color: '#fff' }
  }
};


/* black and white are dark and light without radius */
(function($) {
  $.extend(Tipped.Skins, {
    black: $.extend(true, {}, Tipped.Skins.dark, { radius: 0 }),
    white: $.extend(true, {}, Tipped.Skins.light, { radius: 0 })
  });
})(jQuery);

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
      blur: 1,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .5
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
	function s(e) { ! window.console || console[console.warn ? "warn": "log"](e)
	}
	function a(e) {
		this.element = e
	}
	function f(e) {
		var t = {};
		for (var n in e) t[n] = e[n] + "px";
		return t
	}
	function l(e, t) {
		return Math.sqrt(e * e + t * t)
	}
	function c(e) {
		return e * 180 / Math.PI
	}
	function h(e) {
		return e * Math.PI / 180
	}
	function p(e) {
		return 1 / Math.cos(e)
	}
	function w(t) {
		if (!t) return;
		this.element = t,
		b.remove(t);
		var n = this.getTooltip();
		this.options = e.extend({},
		n.options),
		this._globalAlpha = 1,
		this._cache = {},
		this.uid = e(t).data("tipped-uid"),
		b.add(this),
		this._hookPosition = this.options.hook.tooltip,
		this._stemPosition = this.options.stem && this._hookPosition,
		this._stemCorrection = {
			x: 0,
			y: 0
		},
		this._adjustment = {
			top: 0,
			left: 0
		},
		this.build()
	}
	function S(t, n) {
		this.element = t;
		if (!this.element || !n) return;
		this.options = e.extend({
			blur: 3,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		arguments[2] || {}),
		this._globalAlpha = this.options.globalAlpha,
		this._cache = {},
		this.uid = e(t).data("tipped-uid"),
		E.add(this),
		this.build()
	}
	function T(t) {
		this.element = t;
		if (!this.element) return;
		this.options = e.extend({
			blur: 5,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		arguments[1] || {}),
		this._globalAlpha = this.options.globalAlpha,
		this.uid = e(t).data("tipped-uid"),
		x.add(this),
		this.build()
	}
	function N(t, n) {
		for (var r in n) n[r] && n[r].constructor && n[r].constructor === Object ? (t[r] = e.extend({},
		t[r]) || {},
		N(t[r], n[r])) : t[r] = n[r];
		return t
	}
	function k(t, n) {
		this.element = t;
		if (!this.element) return;
		var i = e(t).data("tipped-uid");
		i && C.remove(t),
		i = u(),
		e(t).data("tipped-uid", i),
		this.uid = i;
		var s;
		e.type(n) == "object" && !r.isElement(n) ? (s = n, n = null) : s = arguments[2] || {},
		this.options = C.createOptions(s);
		var o = t.getAttribute("title");
		if (!n) {
			var a = t.getAttribute("data-tipped");
			a ? n = a: o && (n = o)
		}
		o && (e(t).data("tipped_restore_title", o), t.setAttribute("title", "")),
		this.content = n,
		this.zIndex = this.options.zIndex || +C.options.startingZIndex,
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
		};
		var f = this.options.target;
		this.target = f == "mouse" ? "mouse": f == "self" || !f ? this.element: f && document.getElementById(f) || this.element,
		this._preBuild(),
		C.add(this)
	}
	var t = Array.prototype.slice,
	r = {
		wrap: function (n, r) {
			var i = n;
			return function () {
				var n = [e.proxy(i, this)].concat(t.call(arguments));
				return r.apply(this, n)
			}
		},
		isElement: function (e) {
			return e && e.nodeType == 1
		},
		delay: function (e, n) {
			var r = t.call(arguments, 2);
			return setTimeout(function () {
				return e.apply(e, r)
			},
			n)
		},
		defer: function (e) {
			return r.delay.apply(this, [e, 1].concat(t.call(arguments, 1)))
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
				var i = e(t).offset(),
				s = r.element.cumulativeScrollOffset(t),
				o = {
					top: e(window).scrollTop(),
					left: e(window).scrollLeft()
				};
				return i.left += s.left - o.left,
				i.top += s.top - o.top,
				n(i.left, i.top)
			},
			isAttached: function () {
				function e(e) {
					var t = e;
					while (t && t.parentNode) t = t.parentNode;
					return t
				}
				return function (t) {
					var n = e(t);
					return !! n && !!n.body
				}
			} ()
		}
	},
	i = function (e) {
		function t(t) {
			var n = (new RegExp(t + "([\\d.]+)")).exec(e);
			return n ? parseFloat(n[1]) : !0
		}
		return {
			IE: !!window.attachEvent && e.indexOf("Opera") === -1 && t("MSIE "),
			Opera: e.indexOf("Opera") > -1 && ( !! window.opera && opera.version && parseFloat(opera.version()) || 7.55),
			WebKit: e.indexOf("AppleWebKit/") > -1 && t("AppleWebKit/"),
			Gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") === -1 && t("rv:"),
			MobileSafari: !!e.match(/Apple.*Mobile.*Safari/),
			Chrome: e.indexOf("Chrome") > -1 && t("Chrome/")
		}
	} (navigator.userAgent),
	o = {
		scripts: {
			jQuery: {
				required: "1.4.4",
				available: window.jQuery && jQuery.fn.jquery
			}
		},
		check: function () {
			function t(t) {
				var n = t.match(e),
				r = n && n[1] && n[1].split(".") || [],
				i = 0;
				for (var s = 0, o = r.length; s < o; s++) i += parseInt(r[s] * Math.pow(10, 6 - s * 2));
				return n && n[3] ? i - 1 : i
			}
			var e = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
			return function (n) {
				if (this.scripts[n].checked) return;
				this.scripts[n].checked = !0;
				if (!this.scripts[n].available || t(this.scripts[n].available) < t(this.scripts[n].required) && !this.scripts[n].notified) this.scripts[n].notified = !0,
				s("Tipped requires " + n + " >= " + this.scripts[n].required)
			}
		} ()
	},
	u = function () {
		var e = 0,
		t = "_t_uid_";
		return function (n) {
			n = n || t,
			e++;
			while (document.getElementById(n + e)) e++;
			return n + e
		}
	} ();
	e.extend(Tipped, function () {
		return {
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
					var t = ["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"],
					n = !1;
					return e.each(t, function (e, t) {
						try {
							document.createEvent(t),
							n = !0
						} catch(r) {}
					}),
					n
				} ()
			},
			init: function () {
				if (!this.support.canvas && !i.IE) return;
				o.check("jQuery"),
				e(document).ready(function () {
					C.startDelegating()
				})
			},
			create: function (e, t, n) {
				return a.create(e, t, n),
				this.get(e)
			},
			get: function (e) {
				return new a(e)
			},
			findElement: function (e) {
				return C.findElement(e)
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
				return C.hideAll(),
				this
			},
			setDefaultSkin: function (e) {
				return C.setDefaultSkin(e),
				this
			},
			setStartingZIndex: function (e) {
				return C.setStartingZIndex(e),
				this
			},
			visible: function (t) {
				if (r.isElement(t)) return C.isVisibleByElement(t);
				if (e.type(t) != "undefined") {
					var n = e(t),
					i = 0;
					return e.each(n, function (e, t) {
						C.isVisibleByElement(t) && i++
					}),
					i
				}
				return C.getVisible().length
			}
		}
	} ()),
	e.extend(a, {
		create: function (t, n) {
			if (!t) return;
			var i = arguments[2] || {},
			s = [];
			return C.removeDetached(),
			r.isElement(t) ? s.push(new k(t, n, i)) : e(t).each(function (e, t) {
				s.push(new k(t, n, i))
			}),
			s
		}
	}),
	e.extend(a.prototype, {
		items: function () {
			return C.Position.mouseBuffer = {
				x: 0,
				y: 0
			},
			C.get(this.element)
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
			return C.remove(this.element),
			this
		}
	});
	var d = {
		viewport: function () {
			var t;
			return i.MobileSafari ? t = {
				width: window.innerWidth,
				height: window.innerHeight
			}: t = {
				height: e(window).height(),
				width: e(window).width()
			},
			t
		}
	},
	v = {
		devicePixelRatio: Math.ceil(Math.min(window.devicePixelRatio ? parseFloat(window.devicePixelRatio) || 1 : 1, 2)),
		init: function () {
			function e(e) {
				var t = e.getContext("2d");
				t.scale(v.devicePixelRatio, v.devicePixelRatio)
			}
			return window.G_vmlCanvasManager && !Tipped.support.canvas && i.IE ?
			function (t) {
				G_vmlCanvasManager.initElement(t),
				e(t)
			}: function (t) {
				e(t)
			}
		} (),
		resize: function (t, n) {
			e(t).attr({
				width: n.width * this.devicePixelRatio,
				height: n.height * this.devicePixelRatio
			}).css(f(n))
		},
		drawRoundedRectangle: function (t) {
			var n = e.extend({
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				radius: 0
			},
			arguments[1] || {}),
			r = n,
			i = r.left,
			s = r.top,
			o = r.width,
			u = r.height,
			a = r.radius;
			if (!a) {
				t.fillRect(i, s, o, u);
				return
			}
			t.beginPath(),
			t.moveTo(i + a, s),
			t.arc(i + o - a, s + a, a, h( - 90), h(0), !1),
			t.arc(i + o - a, s + u - a, a, h(0), h(90), !1),
			t.arc(i + a, s + u - a, a, h(90), h(180), !1),
			t.arc(i + a, s + a, a, h( - 180), h( - 90), !1),
			t.closePath(),
			t.fill()
		},
		drawPixelArray: function (t, n) {
			var r = e.extend({
				x: 0,
				y: 0,
				color: "#000"
			},
			arguments[2] || {});
			for (var i = 0, s = n.length; i < s; i++) for (var o = 0, u = n[i].length; o < u; o++) {
				var a = parseInt(n[i].charAt(o)) * (1 / 9);
				t.fillStyle = y.hex2fill(r.color, a),
				a && t.fillRect(r.x + o, r.y + i, 1, 1)
			}
		},
		createFillStyle: function (t, n) {
			var r;
			if (e.type(n) == "string") r = y.hex2fill(n);
			else if (e.type(n.color) == "string") r = y.hex2fill(n.color, e.type(n.opacity) == "number" ? n.opacity: 1);
			else if (e.isArray(n.color)) {
				var i = e.extend({
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 0
				},
				arguments[2] || {});
				r = v.Gradient.addColorStops(t.createLinearGradient(i.x1, i.y1, i.x2, i.y2), n.color, n.opacity)
			}
			return r
		}
	};
	v.Gradient = {
		addColorStops: function (t, n) {
			var r = e.type(arguments[2]) == "number" ? arguments[2] : 1;
			for (var i = 0, s = n.length; i < s; i++) {
				var o = n[i];
				if (e.type(o.opacity) == "undefined" || e.type(o.opacity) != "number") o.opacity = 1;
				t.addColorStop(o.position, y.hex2fill(o.color, o.opacity * r))
			}
			return t
		}
	};
	var m = {
		positions: ["topleft", "topmiddle", "topright", "righttop", "rightmiddle", "rightbottom", "bottomright", "bottommiddle", "bottomleft", "leftbottom", "leftmiddle", "lefttop"],
		regex: {
			toOrientation: /^(top|left|bottom|right)(top|left|bottom|right|middle|center)$/,
			horizontal: /^(top|bottom)/,
			isCenter: /(middle|center)/,
			side: /^(top|bottom|left|right)/
		},
		toDimension: function () {
			var e = {
				top: "height",
				left: "width",
				bottom: "height",
				right: "width"
			};
			return function (t) {
				return e[t]
			}
		} (),
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
			var t = null,
			n = e.toLowerCase().match(this.regex.side);
			return n && n[1] && (t = n[1]),
			t
		},
		split: function (e) {
			return e.toLowerCase().match(this.regex.toOrientation)
		}
	},
	g = {
		getDimensions: function (e) {
			var t = e.options.stem;
			return {
				width: t.width,
				height: t.height
			}
		},
		getBorderDimensions: function (t, n) {
			var r = e.extend({
				math: "ceil"
			},
			arguments[2] || {}),
			i = t.options.stem,
			s = i.width,
			o = i.height,
			u = this.getCenterBorderDimensions(s, o, n);
			return r.math && (u.width = Math[r.math](u.width), u.height = Math[r.math](u.height)),
			{
				width: u.width,
				height: u.height
			}
		},
		getCenterBorderDimensions: function (e, t, n) {
			var r = c(Math.atan(t / e * .5)),
			i = 180 - r,
			s = Math.cos(h(i - 90)) * n,
			o = e + s * 2,
			u = o * t / e;
			return {
				width: o,
				height: u
			}
		},
		getLayout: function (e, t) {
			var n = this.getBorderDimensions(e, t),
			r = this.getDimensions(e),
			i = m.isCenter(e._hookPosition),
			s = Math.ceil(n.height + t),
			o = e.options.stem.offset || 0,
			u = e.options.radius && e.options.radius.size || 0;
			return {
				box: {
					dimensions: {
						width: Math.ceil(n.width),
						height: Math.ceil(s)
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
			var i = {},
			s = t.options,
			o = {
				top: 0,
				left: 0
			},
			u = {
				top: 0,
				left: 0
			},
			a = e.extend({},
			n),
			f = t.border,
			l = l || this.getLayout(t, t.border),
			c = l.box.dimensions;
			r && (c.height = r, f = 0);
			var h = m.split(t._hookPosition),
			p = m.getOrientation(t._hookPosition);
			if (t.options.stem) {
				var d = m.getSide(t._hookPosition);
				d == "top" ? o.top = c.height - f: d == "left" && (o.left = c.height - f);
				if (p == "horizontal") {
					switch (h[2]) {
					case "middle":
					case "center":
						u.left = .5 * a.width;
						break;
					case "right":
						u.left = a.width
					}
					h[1] == "bottom" && (u.top = a.height - f + c.height)
				} else {
					switch (h[2]) {
					case "middle":
					case "center":
						u.top = .5 * a.height;
						break;
					case "bottom":
						u.top = a.height
					}
					h[1] == "right" && (u.left = a.width - f + c.height)
				}
				a[m.toDimension(d)] += c.height - f
			} else if (p == "horizontal") {
				switch (h[2]) {
				case "middle":
				case "center":
					u.left = .5 * a.width;
					break;
				case "right":
					u.left = a.width
				}
				h[1] == "bottom" && (u.top = a.height)
			} else {
				switch (h[2]) {
				case "middle":
				case "center":
					u.top = .5 * a.height;
					break;
				case "bottom":
					u.top = a.height
				}
				h[1] == "right" && (u.left = a.width)
			}
			var v = s.radius && s.radius.size || 0,
			y = s.border && s.border.size || 0;
			if (t.options.stem) {
				var b = v && s.radius.position == "background" ? v: 0,
				w = v && s.radius.position == "border" ? v: v + y,
				E = y + b + .5 * l.stem.dimensions.width - .5 * l.border.dimensions.width,
				S = w > E ? w - E: 0,
				x = Math.ceil(y + b + .5 * l.stem.dimensions.width + S);
				if (p == "horizontal") switch (h[2]) {
				case "left":
					u.left += x;
					break;
				case "right":
					u.left -= x
				} else switch (h[2]) {
				case "top":
					u.top += x;
					break;
				case "bottom":
					u.top -= x
				}
			}
			var T;
			if (s.stem && (T = s.stem.offset)) {
				var N = g.nullifyCornerOffset(T, t._stemPosition, n, l.border.dimensions, y, v);
				T = N.offset;
				var C = N.correction;
				if (p == "horizontal") switch (h[2]) {
				case "left":
					u.left += T.x;
					break;
				case "right":
					u.left -= T.x
				} else switch (h[2]) {
				case "top":
					u.top += T.y;
					break;
				case "bottom":
					u.top -= T.y
				}
			}
			var k;
			if (s.stem && (k = s.stem.spacing)) if (p == "horizontal") switch (h[1]) {
			case "top":
				u.top -= k;
				break;
			case "bottom":
				u.top += k
			} else switch (h[1]) {
			case "left":
				u.left -= k;
				break;
			case "right":
				u.left += k
			}
			return {
				dimensions: a,
				position: {
					top: 0,
					left: 0
				},
				background: {
					position: o,
					dimensions: n
				},
				stem: {
					dimensions: c
				},
				anchor: u
			}
		},
		nullifyCornerOffset: function (t, n, r, i, s, o) {
			var u = m.getOrientation(n),
			a = e.extend({},
			t),
			f = {
				x: 0,
				y: 0
			};
			return u == "horizontal" && r.width - i.width - 2 * s - 2 * o < 2 * t.x && (f.x = a.x, a.x = 0),
			u == "vertical" && r.height - i.height - 2 * s - 2 * o < 2 * t.y && (f.y = a.y, a.y = 0),
			{
				offset: a,
				correction: f
			}
		}
	},
	y = function () {
		function r(e) {
			var t = e;
			return t.red = e[0],
			t.green = e[1],
			t.blue = e[2],
			t
		}
		function i(e) {
			return parseInt(e, 16)
		}
		function s(e) {
			var t = new Array(3);
			e.indexOf("#") == 0 && (e = e.substring(1)),
			e = e.toLowerCase();
			if (e.replace(n, "") != "") return null;
			e.length == 3 ? (t[0] = e.charAt(0) + e.charAt(0), t[1] = e.charAt(1) + e.charAt(1), t[2] = e.charAt(2) + e.charAt(2)) : (t[0] = e.substring(0, 2), t[1] = e.substring(2, 4), t[2] = e.substring(4));
			for (var s = 0; s < t.length; s++) t[s] = i(t[s]);
			return r(t)
		}
		function o(e, t) {
			var n = s(e);
			return n[3] = t,
			n.opacity = t,
			n
		}
		function u(t, n) {
			return e.type(n) == "undefined" && (n = 1),
			"rgba(" + o(t, n).join() + ")"
		}
		function a(e) {
			return "#" + (f(e)[2] > 50 ? "000": "fff")
		}
		function f(e) {
			return l(s(e))
		}
		function l(e) {
			var e = r(e),
			t = e.red,
			n = e.green,
			i = e.blue,
			s,
			o,
			u,
			a = t > n ? t: n;
			i > a && (a = i);
			var f = t < n ? t: n;
			i < f && (f = i),
			u = a / 255,
			o = a != 0 ? (a - f) / a: 0;
			if (o == 0) s = 0;
			else {
				var l = (a - t) / (a - f),
				c = (a - n) / (a - f),
				h = (a - i) / (a - f);
				t == a ? s = h - c: n == a ? s = 2 + l - h: s = 4 + c - l,
				s /= 6,
				s < 0 && (s += 1)
			}
			s = Math.round(s * 360),
			o = Math.round(o * 100),
			u = Math.round(u * 100);
			var p = [];
			return p[0] = s,
			p[1] = o,
			p[2] = u,
			p.hue = s,
			p.saturation = o,
			p.brightness = u,
			p
		}
		var t = "0123456789abcdef",
		n = new RegExp("[" + t + "]", "g");
		return {
			hex2rgb: s,
			hex2fill: u,
			getSaturatedBW: a
		}
	} (),
	b = {
		skins: {},
		get: function (t) {
			if (!t) return null;
			var n = null,
			r = e(t).data("tipped-uid");
			return r && (n = this.skins[r]),
			n
		},
		add: function (e) {
			this.skins[e.uid] = e
		},
		remove: function (e) {
			var t = this.get(e);
			t && (delete this.skins[t.uid], t.remove())
		}
	};
	e.extend(w.prototype, function () {
		function t() {
			this._cache.hook = {};
			var t = this._hookPosition;
			e.each(m.positions, e.proxy(function (t, n) {
				var r, i = this._cache.hook[n] = {};
				this._hookPosition = n;
				var s = this.getOrderLayout();
				r = s,
				i.anchor = r.anchor;
				var o = r.bubble.dimensions,
				u = {
					top: r.bubble.position.top,
					left: r.bubble.position.left
				};
				i.bubble = {
					dimensions: o,
					position: u
				},
				i.tooltip = {
					dimensions: r.skin.dimensions
				};
				if (this.shadow) {
					var a = this.shadow.getOrderLayout(),
					f = a.skin.position,
					l = i.bubble.position;
					e.extend(!0, i, {
						anchor: a.anchor,
						bubble: {
							position: {
								top: l.top + f.top,
								left: l.left + f.left
							}
						},
						tooltip: {
							dimensions: a.tooltip.dimensions
						}
					})
				}
			},
			this)),
			this._hookPosition = t
		}
		function n() {
			this.cleanup(),
			this.options.shadow && (E.remove(this.element), this.options.closeButton && this.options.closeButton.shadow && x.remove(this.element)),
			this.iframeShim && (this.iframeShim.remove(), this.iframeShim = null),
			this.container && (e(this.container).remove(), this.container = null)
		}
		function r() {
			if (!this.bubble) return;
			this.closeButton && (e(this.closeButton).remove(), this.closeButton = null, this.defaultCloseButton = null, this.hoverCloseButton = null),
			e(this.bubble).remove(),
			this.stem = null,
			this.background = null,
			this.bubble = null,
			this._cache = {}
		}
		function s() {
			var e = this.getTooltip();
			this.contentDimensions = e._cache.contentDimensions;
			var t = e.options;
			this.radius = t.radius && t.radius.size || 0,
			this.border = t.border && t.border.size || 0,
			this.padding = t.padding;
			var n = Math.min(this.contentDimensions.height, this.contentDimensions.width);
			this.radius > n / 2 && (this.radius = Math.floor(n / 2)),
			this.options.radius.position == "border" && this.radius > this.border && (this.border = this.radius),
			this._cache = {
				options: {
					radius: this.radius,
					border: this.border,
					padding: this.padding
				}
			}
		}
		function o() {
			this.cleanup(),
			window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document);
			var t = this.getTooltip(),
			n = this.options;
			this.bubble = e("<div>").addClass("t_Bubble")[0],
			e(t.skinElement).append(this.bubble),
			this.prepare(),
			this.drawBubble(t),
			n.closeButton && (this.drawCloseButton(t), n.closeButton.shadow && (this.closeButtonShadow ? (this.closeButtonShadow.options = n.closeButton.shadow, this.closeButtonShadow.build()) : this.closeButtonShadow = new T(this.element, e.extend({
				globalAlpha: this._globalAlpha
			},
			n.closeButton.shadow)))),
			i.IE && i.IE < 7 && e(t.container).prepend(this.iframeShim = e("<iframe>").addClass("t_iframeShim").attr({
				frameBorder: 0,
				src: "javascript:'';"
			})),
			this.order(),
			n.shadow && (this.shadow ? (this.shadow.options = n.shadow, this.shadow.build()) : this.shadow = new S(this.element, this, e.extend({
				globalAlpha: this._globalAlpha
			},
			n.shadow))),
			this.createHookCache()
		}
		function u() {
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
				var u = C.UpdateQueue.getMeasureElementDimensions(r);
				t.options.maxWidth && e.type(t.options.maxWidth) == "number" && u.width > t.options.maxWidth && (e(r).css({
					width: t.options.maxWidth + "px"
				}), u = C.UpdateQueue.getMeasureElementDimensions(r)),
				t.getState("visible") || e(t.container).hide(),
				t._cache.contentDimensions = u,
				n.css({
					left: s + "px",
					top: i + "px",
					width: o + "px"
				}),
				this.build()
			}
		}
		function a(e, t, n) {
			var r = !1;
			this.setHookPosition(e) && (r = !0),
			this.setStemCorrection(t) && (r = !0),
			n && this.setAdjustment(n) && (r = !0),
			r && this.build()
		}
		function l(e) {
			var t = !1;
			if (this._adjustment.left != e.left || this._adjustment.top != e.top) t = !0,
			this._adjustment = e;
			return t
		}
		function c(e) {
			var t = !1;
			if (this._stemCorrection.x != e.x || this._stemCorrection.y != e.y) t = !0,
			this._stemCorrection = e;
			return t
		}
		function p(e, t) {
			var n = !1;
			return this._hookPosition != e && (n = !0, this._hookPosition = e),
			n
		}
		function d() {
			return C.get(this.element)[0]
		}
		function b() {
			return g.getLayout(this, this.border)
		}
		function w() {
			var t = this.getTooltip().options.closeButton,
			n = t.diameter + t.border * 2;
			e(this.defaultCloseButton).css({
				left: -1 * n + "px"
			}),
			e(this.hoverCloseButton).css({
				left: 0
			})
		}
		function N() {
			var t = this.getTooltip().options.closeButton,
			n = t.diameter + t.border * 2;
			e(this.defaultCloseButton).css({
				left: 0
			}),
			e(this.hoverCloseButton).css({
				left: n + "px"
			})
		}
		function k(t) {
			var n = t.options.closeButton,
			r = {
				width: n.diameter + 2 * n.border,
				height: n.diameter + 2 * n.border
			};
			e(t.container).append(e(this.closeButton = document.createElement("div")).addClass("t_Close").css(f(r)).append(e(this.closeButtonShift = document.createElement("div")).addClass("t_CloseButtonShift").css(f(r)))),
			this.drawCloseButtonState(t, "default"),
			this.drawCloseButtonState(t, "hover"),
			!Tipped.support.touch && !i.Chrome && e(this.closeButton).bind("mouseenter", e.proxy(this.closeButtonMouseover, this)).bind("mouseleave", e.proxy(this.closeButtonMouseout, this))
		}
		function L(t, n) {
			var r = t.options.closeButton,
			i = r.diameter,
			s = r.border || 0,
			o = r.x.diameter,
			u = r.x.size,
			a = r.x.lineCap,
			l = r.states[n || "default"],
			c = {
				width: i + 2 * s,
				height: i + 2 * s
			};
			o >= i && (o = i - 2);
			var p;
			e(this.closeButtonShift).append(e(this[n + "CloseButton"] = document.createElement("div")).addClass("t_CloseState").css(e.extend(f(c), {
				left: (n == "hover" ? c.width: 0) + "px"
			}))),
			e(document.body).append(e(p = document.createElement("canvas"))),
			v.resize(p, c),
			v.init(p);
			var d = p.getContext("2d");
			d.globalAlpha = this._globalAlpha,
			e(this[n + "CloseButton"]).append(p),
			d.translate(c.width / 2, c.height / 2),
			d.fillStyle = v.createFillStyle(d, l.background, {
				x1: 0,
				y1: 0 - i / 2,
				x2: 0,
				y2: 0 + i / 2
			}),
			d.beginPath(),
			d.arc(0, 0, i / 2, 0, Math.PI * 2, !0),
			d.closePath(),
			d.fill(),
			s && (d.fillStyle = v.createFillStyle(d, l.border, {
				x1: 0,
				y1: 0 - i / 2 - s,
				x2: 0,
				y2: 0 + i / 2 + s
			}), d.beginPath(), d.arc(0, 0, i / 2, Math.PI, 0, !1), d.lineTo((i + s) / 2, 0), d.arc(0, 0, i / 2 + s, 0, Math.PI, !0), d.arc(0, 0, i / 2 + s, Math.PI, 0, !0), d.lineTo(i / 2, 0), d.arc(0, 0, i / 2, 0, Math.PI, !1), d.closePath(), d.fill());
			var m = o / 2,
			g = u / 2;
			if (g > m) {
				var b = g;
				g = m,
				m = b
			}
			d.fillStyle = y.hex2fill(l.x.color || l.x, l.x.opacity || 1),
			d.rotate(h(45)),
			d.beginPath(),
			d.moveTo(0, 0),
			d.lineTo(0, m);
			for (var w = 0; w < 4; w++) d.lineTo(0, m),
			d.lineTo(g, m),
			d.lineTo(g, m - (m - g)),
			d.lineTo(m, g),
			d.lineTo(m, 0),
			d.rotate(h(90));
			d.closePath(),
			d.fill()
		}
		function A(t) {
			var n = e.extend({
				stem: !1,
				hookPosition: null,
				stemCorrection: null,
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
			arguments[1] || {}),
			r = n.layout,
			i = n.stemLayout,
			s = n.cornerOffset,
			o = n.border,
			u = n.radius,
			a = n.hookPosition,
			f = r.background.position,
			l = r.background.dimensions,
			c,
			p,
			d,
			v,
			y,
			b = {
				x: Math.abs(this._stemCorrection.x),
				y: Math.abs(this._stemCorrection.y)
			},
			w = {
				x: 0,
				y: 0
			},
			E = {
				x: 0,
				y: 0
			};
			if (i) {
				c = i.stem.dimensions,
				p = i.box.position,
				d = i.box.dimensions,
				v = d.width - c.width;
				var S = n.borderRadius,
				x = o + u + .5 * c.width - .5 * i.border.dimensions.width;
				y = Math.ceil(S > x ? S - x: 0);
				var T = g.nullifyCornerOffset(s, a, l, i.border.dimensions, o, u);
				s = T.offset,
				E = T.correction,
				w = {
					x: Math.max(l.width - Math.max(y, s.x || 0) * 2 - i.border.dimensions.width - (2 * u || 0), 0),
					y: Math.max(l.height - Math.max(y, s.y || 0) * 2 - i.border.dimensions.height - (2 * u || 0), 0)
				},
				m.isCenter(a) && (w.x *= .5, w.y *= .5),
				b.x = Math.min(b.x, w.x),
				b.y = Math.min(b.y, w.y),
				m.isCenter(a) && (this._stemCorrection.x < 0 && b.x > 0 && (b.x *= -1), this._stemCorrection.y < 0 && b.y > 0 && (b.y *= -1)),
				this._adjustment && this._adjustment.sides && e.each(this._adjustment.sides, function (t, n) {
					e.each("top right bottom left".split(" "), function (e, t) {
						n == t && (new RegExp("(" + t + ")$")).test(a) && (b[/^(left|right)$/.test(t) ? "x": "y"] = 0)
					})
				})
			}
			var N, C;
			u ? (N = f.left + o + u, C = f.top + o) : (N = f.left + o, C = f.top + o),
			s && s.x && /^(topleft|lefttop)$/.test(a) && (N += s.x),
			n.beginPath && t.beginPath(),
			t.moveTo(N, C);
			if (n.stem) switch (a) {
			case "topleft":
				N = f.left + o,
				u && (N += u),
				N += Math.max(y, s.x || 0),
				N += b.x,
				t.lineTo(N, C),
				C -= c.height,
				N += c.width * .5,
				t.lineTo(N, C),
				C += c.height,
				N += c.width * .5,
				t.lineTo(N, C);
				break;
			case "topmiddle":
			case "topcenter":
				N = f.left + l.width * .5 - c.width * .5,
				N += b.x,
				t.lineTo(N, C),
				C -= c.height,
				N += c.width * .5,
				t.lineTo(N, C),
				C += c.height,
				N += c.width * .5,
				t.lineTo(N, C),
				N = f.left + l.width * .5 - d.width * .5,
				t.lineTo(N, C);
				break;
			case "topright":
				N = f.left + l.width - o - c.width,
				u && (N -= u),
				N -= Math.max(y, s.x || 0),
				N -= b.x,
				t.lineTo(N, C),
				C -= c.height,
				N += c.width * .5,
				t.lineTo(N, C),
				C += c.height,
				N += c.width * .5,
				t.lineTo(N, C)
			}
			u ? u && (t.arc(f.left + l.width - o - u, f.top + o + u, u, h( - 90), h(0), !1), N = f.left + l.width - o, C = f.top + o + u) : (N = f.left + l.width - o, C = f.top + o, t.lineTo(N, C));
			if (n.stem) switch (a) {
			case "righttop":
				C = f.top + o,
				u && (C += u),
				C += Math.max(y, s.y || 0),
				C += b.y,
				t.lineTo(N, C),
				N += c.height,
				C += c.width * .5,
				t.lineTo(N, C),
				N -= c.height,
				C += c.width * .5,
				t.lineTo(N, C);
				break;
			case "rightmiddle":
			case "rightcenter":
				C = f.top + l.height * .5 - c.width * .5,
				C += b.y,
				t.lineTo(N, C),
				N += c.height,
				C += c.width * .5,
				t.lineTo(N, C),
				N -= c.height,
				C += c.width * .5,
				t.lineTo(N, C);
				break;
			case "rightbottom":
				C = f.top + l.height - o,
				u && (C -= u),
				C -= c.width,
				C -= Math.max(y, s.y || 0),
				C -= b.y,
				t.lineTo(N, C),
				N += c.height,
				C += c.width * .5,
				t.lineTo(N, C),
				N -= c.height,
				C += c.width * .5,
				t.lineTo(N, C)
			}
			u ? u && (t.arc(f.left + l.width - o - u, f.top + l.height - o - u, u, h(0), h(90), !1), N = f.left + l.width - o - u, C = f.top + l.height - o) : (N = f.left + l.width - o, C = f.top + l.height - o, t.lineTo(N, C));
			if (n.stem) switch (a) {
			case "bottomright":
				N = f.left + l.width - o,
				u && (N -= u),
				N -= Math.max(y, s.x || 0),
				N -= b.x,
				t.lineTo(N, C),
				N -= c.width * .5,
				C += c.height,
				t.lineTo(N, C),
				N -= c.width * .5,
				C -= c.height,
				t.lineTo(N, C);
				break;
			case "bottommiddle":
			case "bottomcenter":
				N = f.left + l.width * .5 + c.width * .5,
				N += b.x,
				t.lineTo(N, C),
				N -= c.width * .5,
				C += c.height,
				t.lineTo(N, C),
				N -= c.width * .5,
				C -= c.height,
				t.lineTo(N, C);
				break;
			case "bottomleft":
				N = f.left + o + c.width,
				u && (N += u),
				N += Math.max(y, s.x || 0),
				N += b.x,
				t.lineTo(N, C),
				N -= c.width * .5,
				C += c.height,
				t.lineTo(N, C),
				N -= c.width * .5,
				C -= c.height,
				t.lineTo(N, C)
			}
			u ? u && (t.arc(f.left + o + u, f.top + l.height - o - u, u, h(90), h(180), !1), N = f.left + o, C = f.top + l.height - o - u) : (N = f.left + o, C = f.top + l.height - o, t.lineTo(N, C));
			if (n.stem) switch (a) {
			case "leftbottom":
				C = f.top + l.height - o,
				u && (C -= u),
				C -= Math.max(y, s.y || 0),
				C -= b.y,
				t.lineTo(N, C),
				N -= c.height,
				C -= c.width * .5,
				t.lineTo(N, C),
				N += c.height,
				C -= c.width * .5,
				t.lineTo(N, C);
				break;
			case "leftmiddle":
			case "leftcenter":
				C = f.top + l.height * .5 + c.width * .5,
				C += b.y,
				t.lineTo(N, C),
				N -= c.height,
				C -= c.width * .5,
				t.lineTo(N, C),
				N += c.height,
				C -= c.width * .5,
				t.lineTo(N, C);
				break;
			case "lefttop":
				C = f.top + o + c.width,
				u && (C += u),
				C += Math.max(y, s.y || 0),
				C += b.y,
				t.lineTo(N, C),
				N -= c.height,
				C -= c.width * .5,
				t.lineTo(N, C),
				N += c.height,
				C -= c.width * .5,
				t.lineTo(N, C)
			}
			return u ? u && (t.arc(f.left + o + u, f.top + o + u, u, h( - 180), h( - 90), !1), N = f.left + o + u, C = f.top + o, N += 1, t.lineTo(N, C)) : (N = f.left + o, C = f.top + o, t.lineTo(N, C)),
			n.closePath && t.closePath(),
			{
				x: N,
				y: C,
				stem: b,
				corner: E,
				cornerOffset: s
			}
		}
		function O(t) {
			var n = e.extend({
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
				},
				corrections: null
			},
			arguments[1] || {}),
			r = n.layout,
			i = n.stemLayout,
			s = n.stemOffset,
			o = n.cornerOffset,
			u = n.border,
			a = n.radius && n.radius.size || 0,
			f = n.backgroundRadius,
			l = n.hookPosition,
			c = r.background.position,
			p = r.background.dimensions,
			d,
			v,
			m,
			g,
			y,
			b,
			w = n.corrections && n.corrections.stem || {
				x: 0,
				y: 0
			};
			if (i) {
				d = i.stem.dimensions,
				v = i.box.position,
				m = i.box.dimensions,
				g = i.border.dimensions,
				y = m.width - d.width;
				var E = u + f + .5 * d.width - .5 * g.width;
				b = Math.ceil(a > E ? a - E: 0)
			}
			var S = c.left + u + f,
			x = c.top + u;
			f && (S += 1);
			var T = e.extend({},
			{
				x: S,
				y: x
			});
			n.beginPath && t.beginPath();
			var N = e.extend({},
			{
				x: S,
				y: x
			});
			x -= u,
			t.lineTo(S, x),
			a ? a && (t.arc(c.left + a, c.top + a, a, h( - 90), h( - 180), !0), S = c.left, x = c.top + a) : (S = c.left, x = c.top, t.lineTo(S, x));
			if (n.stem) switch (l) {
			case "lefttop":
				x = c.top + u,
				f && (x += f),
				x -= g.width * .5,
				x += d.width * .5,
				x += Math.max(b, o.y || 0),
				x += w.y,
				t.lineTo(S, x),
				S -= g.height,
				x += g.width * .5,
				t.lineTo(S, x),
				S += g.height,
				x += g.width * .5,
				t.lineTo(S, x);
				break;
			case "leftmiddle":
			case "leftcenter":
				x = c.top + p.height * .5 - g.width * .5,
				x += w.y,
				t.lineTo(S, x),
				S -= g.height,
				x += g.width * .5,
				t.lineTo(S, x),
				S += g.height,
				x += g.width * .5,
				t.lineTo(S, x);
				break;
			case "leftbottom":
				x = c.top + p.height - u - g.width,
				f && (x -= f),
				x += g.width * .5,
				x -= d.width * .5,
				x -= Math.max(b, o.y || 0),
				x -= w.y,
				t.lineTo(S, x),
				S -= g.height,
				x += g.width * .5,
				t.lineTo(S, x),
				S += g.height,
				x += g.width * .5,
				t.lineTo(S, x)
			}
			a ? a && (t.arc(c.left + a, c.top + p.height - a, a, h( - 180), h( - 270), !0), S = c.left + a, x = c.top + p.height) : (S = c.left, x = c.top + p.height, t.lineTo(S, x));
			if (n.stem) switch (l) {
			case "bottomleft":
				S = c.left + u,
				f && (S += f),
				S -= g.width * .5,
				S += d.width * .5,
				S += Math.max(b, o.x || 0),
				S += w.x,
				t.lineTo(S, x),
				x += g.height,
				S += g.width * .5,
				t.lineTo(S, x),
				x -= g.height,
				S += g.width * .5,
				t.lineTo(S, x);
				break;
			case "bottommiddle":
			case "bottomcenter":
				S = c.left + p.width * .5 - g.width * .5,
				S += w.x,
				t.lineTo(S, x),
				x += g.height,
				S += g.width * .5,
				t.lineTo(S, x),
				x -= g.height,
				S += g.width * .5,
				t.lineTo(S, x),
				S = c.left + p.width * .5 + g.width,
				t.lineTo(S, x);
				break;
			case "bottomright":
				S = c.left + p.width - u - g.width,
				f && (S -= f),
				S += g.width * .5,
				S -= d.width * .5,
				S -= Math.max(b, o.x || 0),
				S -= w.x,
				t.lineTo(S, x),
				x += g.height,
				S += g.width * .5,
				t.lineTo(S, x),
				x -= g.height,
				S += g.width * .5,
				t.lineTo(S, x)
			}
			a ? a && (t.arc(c.left + p.width - a, c.top + p.height - a, a, h(90), h(0), !0), S = c.left + p.width, x = c.top + p.width + a) : (S = c.left + p.width, x = c.top + p.height, t.lineTo(S, x));
			if (n.stem) switch (l) {
			case "rightbottom":
				x = c.top + p.height - u,
				x += g.width * .5,
				x -= d.width * .5,
				f && (x -= f),
				x -= Math.max(b, o.y || 0),
				x -= w.y,
				t.lineTo(S, x),
				S += g.height,
				x -= g.width * .5,
				t.lineTo(S, x),
				S -= g.height,
				x -= g.width * .5,
				t.lineTo(S, x);
				break;
			case "rightmiddle":
			case "rightcenter":
				x = c.top + p.height * .5 + g.width * .5,
				x += w.y,
				t.lineTo(S, x),
				S += g.height,
				x -= g.width * .5,
				t.lineTo(S, x),
				S -= g.height,
				x -= g.width * .5,
				t.lineTo(S, x);
				break;
			case "righttop":
				x = c.top + u,
				f && (x += f),
				x += g.width,
				x -= g.width * .5 - d.width * .5,
				x += Math.max(b, o.y || 0),
				x += w.y,
				t.lineTo(S, x),
				S += g.height,
				x -= g.width * .5,
				t.lineTo(S, x),
				S -= g.height,
				x -= g.width * .5,
				t.lineTo(S, x)
			}
			a ? a && (t.arc(c.left + p.width - a, c.top + a, a, h(0), h( - 90), !0), S = c.left + p.width - a, x = c.top) : (S = c.left + p.width, x = c.top, t.lineTo(S, x));
			if (n.stem) switch (l) {
			case "topright":
				S = c.left + p.width - u,
				S += g.width * .5 - d.width * .5,
				f && (S -= f),
				S -= Math.max(b, o.x || 0),
				S -= w.x,
				t.lineTo(S, x),
				x -= g.height,
				S -= g.width * .5,
				t.lineTo(S, x),
				x += g.height,
				S -= g.width * .5,
				t.lineTo(S, x);
				break;
			case "topmiddle":
			case "topcenter":
				S = c.left + p.width * .5 + g.width * .5,
				S += w.x,
				t.lineTo(S, x),
				x -= g.height,
				S -= g.width * .5,
				t.lineTo(S, x),
				x += g.height,
				S -= g.width * .5,
				t.lineTo(S, x),
				S = c.left + p.width * .5 - g.width,
				t.lineTo(S, x),
				t.lineTo(S, x);
				break;
			case "topleft":
				S = c.left + u + g.width,
				S -= g.width * .5,
				S += d.width * .5,
				f && (S += f),
				S += Math.max(b, o.x || 0),
				S += w.x,
				t.lineTo(S, x),
				x -= g.height,
				S -= g.width * .5,
				t.lineTo(S, x),
				x += g.height,
				S -= g.width * .5,
				t.lineTo(S, x)
			}
			t.lineTo(N.x, N.y - u),
			t.lineTo(N.x, N.y),
			n.closePath && t.closePath()
		}
		function M(t) {
			var n = this.getOrderLayout(),
			r = this.options.stem && this.getStemLayout(),
			i = this._hookPosition && this._hookPosition.toLowerCase(),
			s = this.radius,
			o = s * 2,
			u = this.border,
			a = this.padding,
			f = {
				width: u * 2 + a * 2 + this.contentDimensions.width,
				height: u * 2 + a * 2 + this.contentDimensions.height
			},
			l = t.options.stem && t.options.stem.offset || {
				x: 0,
				y: 0
			},
			c = 0,
			h = 0;
			s && (c = this.options.radius.position == "background" ? s: 0, h = this.options.radius.position == "border" ? s: c + u),
			e(document.body).append(this.bubbleCanvas = document.createElement("canvas")),
			v.resize(this.bubbleCanvas, n.bubble.dimensions),
			v.init(this.bubbleCanvas);
			var p = this.bubbleCanvas.getContext("2d");
			p.globalAlpha = this._globalAlpha,
			e(this.bubble).append(this.bubbleCanvas),
			p.fillStyle = v.createFillStyle(p, this.options.background, {
				x1: 0,
				y1: n.background.position.top + u,
				x2: 0,
				y2: n.background.position.top + n.background.dimensions.height - u
			}),
			p.lineWidth = 0;
			var d;
			d = this._drawBackgroundPath(p, {
				beginPath: !0,
				closePath: !0,
				border: u,
				radius: c,
				borderRadius: h,
				layout: n,
				stemLayout: r,
				stem: this.options.stem,
				hookPosition: i,
				cornerOffset: l
			}),
			p.fill();
			if (u) {
				var m = v.createFillStyle(p, this.options.border, {
					x1: 0,
					y1: n.background.position.top,
					x2: 0,
					y2: n.background.position.top + n.background.dimensions.height
				});
				p.fillStyle = m,
				d = this._drawBackgroundPath(p, {
					beginPath: !0,
					closePath: !1,
					border: u,
					radius: c,
					borderRadius: h,
					layout: n,
					stemLayout: r,
					stem: this.options.stem,
					hookPosition: i,
					cornerOffset: l
				}),
				this._drawBorderPath(p, {
					beginPath: !1,
					closePath: !0,
					border: u,
					backgroundRadius: c,
					radius: {
						size: h,
						position: this.options.radius.position
					},
					layout: n,
					stemLayout: r,
					stem: this.options.stem,
					hookPosition: i,
					cornerOffset: d.cornerOffset,
					corrections: d
				}),
				p.fill()
			}
			this._corrections = d
		}
		function _() {
			var e = this.getTooltip(),
			t = this.contentDimensions,
			n = e.options,
			r = this.radius,
			i = r * 2,
			s = this.border,
			o = this.padding,
			u = {
				width: s * 2 + o * 2 + t.width,
				height: s * 2 + o * 2 + t.height
			},
			a;
			if (this.options.stem) {
				var f = this.getStemLayout();
				a = f.box.dimensions
			}
			var l = g.getBubbleLayout(this, u),
			c = l.dimensions,
			p = l.position,
			u = l.background.dimensions,
			d = l.background.position,
			v = l.stem.dimensions,
			m = {
				top: 0,
				left: 0
			},
			y,
			b,
			w,
			E = {
				width: c.width,
				height: c.height
			};
			if (n.closeButton) {
				var S = r;
				n.radius.position == "background" && (S += s);
				var x = S - Math.sin(h(45)) * S,
				T = "right";
				this._hookPosition.toLowerCase().match(/^(topright|righttop)$/) && (T = "left");
				var N = n.closeButton.diameter + 2 * n.closeButton.border,
				y = {
					width: N,
					height: N
				};
				m.left = d.left - N / 2 + (T == "left" ? x: u.width - x),
				m.top = d.top - N / 2 + x;
				if (T == "left") {
					if (m.left < 0) {
						var C = Math.abs(m.left);
						E.width += C,
						p.left += C,
						m.left = 0
					}
				} else {
					var k = m.left + N - E.width;
					k > 0 && (E.width += k)
				}
				if (m.top < 0) {
					var L = Math.abs(m.top);
					E.height += L,
					p.top += L,
					m.top = 0
				}
				if (this.options.closeButton.shadow) {
					var A = this.options.closeButton.shadow,
					O = A.blur,
					M = A.offset;
					b = {
						width: y.width + 2 * O,
						height: y.height + 2 * O
					},
					w = {
						top: m.top - O + M.y,
						left: m.left - O + M.x
					};
					if (T == "left") {
						if (w.left < 0) {
							var C = Math.abs(w.left);
							E.width += C,
							p.left += C,
							m.left += C,
							w.left = 0
						}
					} else {
						var k = w.left + b.width - E.width;
						k > 0 && (E.width += k)
					}
					if (w.top < 0) {
						var L = Math.abs(w.top);
						E.height += L,
						p.top += L,
						m.top += L,
						w.top = 0
					}
				}
			}
			var _ = l.anchor;
			_.top += p.top,
			_.left += p.left;
			var D = {
				left: Math.ceil(p.left + d.left + this.border + this.options.padding),
				top: Math.ceil(p.top + d.top + this.border + this.options.padding)
			},
			P = {
				tooltip: {
					dimensions: {
						width: Math.ceil(E.width),
						height: Math.ceil(E.height)
					}
				},
				skin: {
					dimensions: {
						width: Math.ceil(E.width),
						height: Math.ceil(E.height)
					}
				},
				bubble: {
					dimensions: c,
					position: {
						top: Math.round(p.top),
						left: Math.round(p.left)
					}
				},
				background: {
					dimensions: {
						width: Math.ceil(u.width),
						height: Math.ceil(u.height)
					},
					position: {
						top: Math.round(d.top),
						left: Math.round(d.left)
					}
				},
				anchor: {
					top: Math.round(_.top),
					left: Math.round(_.left)
				},
				content: {
					position: D
				}
			};
			return this.options.closeButton && (P.closeButton = {
				dimensions: {
					width: Math.ceil(y.width),
					height: Math.ceil(y.height)
				},
				position: {
					top: Math.round(m.top),
					left: Math.round(m.left)
				}
			},
			this.options.closeButton.shadow && (P.closeButtonShadow = {
				dimensions: {
					width: Math.ceil(b.width),
					height: Math.ceil(b.height)
				},
				position: {
					top: Math.round(w.top),
					left: Math.round(w.left)
				}
			})),
			P
		}
		function D() {
			var t = this.getOrderLayout(),
			n = this.getTooltip();
			e(n.container).css(f(t.tooltip.dimensions)),
			e(n.skinElement).css(f(t.skin.dimensions)),
			this.iframeShim && this.iframeShim.css(f(t.tooltip.dimensions)),
			e(this.bubble).css(e.extend(f(t.bubble.dimensions), f(t.bubble.position))),
			this.closeButton && (e(this.closeButton).css(f(t.closeButton.position)), t.closeButtonShadow && e(this.closeButtonShadow.container).css(f(t.closeButtonShadow.position))),
			e(n.contentElement).css(f(t.content.position))
		}
		function P(e) {
			this._globalAlpha = e || 0,
			this.shadow && (this.shadow._globalAlpha = this._globalAlpha)
		}
		function H(e) {
			this.setGlobalAlpha(e),
			this.build()
		}
		return {
			prepare: s,
			createHookCache: t,
			build: o,
			remove: n,
			cleanup: r,
			getTooltip: d,
			refresh: u,
			setHookPositionAndStemCorrection: a,
			setAdjustment: l,
			setStemCorrection: c,
			setHookPosition: p,
			drawCloseButton: k,
			drawCloseButtonState: L,
			drawBubble: M,
			_drawBackgroundPath: A,
			_drawBorderPath: O,
			closeButtonMouseover: w,
			closeButtonMouseout: N,
			getStemLayout: b,
			getOrderLayout: _,
			order: D,
			setGlobalAlpha: P,
			setOpacity: H
		}
	} ());
	var E = {
		shadows: {},
		get: function (t) {
			if (!t) return null;
			var n = null,
			r = e(t).data("tipped-uid");
			return r && (n = this.shadows[r]),
			n
		},
		add: function (e) {
			this.shadows[e.uid] = e
		},
		remove: function (e) {
			var t = this.get(e);
			t && (delete this.shadows[t.uid], t.remove())
		},
		transition: function (e) {
			return Math.PI / 2 - Math.pow(e, Math.cos(e) * Math.PI)
		}
	};
	E.Stem = {
		getBorderDimensions: function (e, t) {
			var n = b.get(e.element),
			r = n.getStemLayout().border.dimensions,
			i = this.getCenterBorderDimensions(r.width, r.height, t, {
				math: !1
			});
			return {
				width: i.width,
				height: i.height
			}
		},
		getCenterBorderDimensions2: function (e, t, n) {
			var r = e * .5,
			i = c(Math.acos(r / l(r, t))),
			s = 180 - i - 90,
			o = p(h(s)) * n,
			u = (r + o) * 2,
			a = u / e * t;
			return {
				width: u,
				height: a
			}
		},
		getCenterBorderDimensions: function (e, t, n) {
			var r = c(Math.atan(t / e * .5)),
			i = 180 - r,
			s = Math.cos(h(i - 90)) * n,
			o = e + s * 2,
			u = o * t / e;
			return {
				width: o,
				height: u
			}
		},
		getLayout: function (t) {
			var n = b.get(t.element),
			r = t.options.blur,
			i = m.isCorner(n._hookPosition),
			s = m.getOrientation(n._hookPosition),
			o = E.Stem.getBorderDimensions(t, r),
			u = {
				box: {
					dimensions: {
						width: Math.ceil(o.width),
						height: Math.ceil(o.height)
					},
					position: {
						top: 0,
						left: 0
					}
				}
			};
			if (r) {
				u.blurs = [];
				for (var a = 0; a <= r; a++) {
					var f = E.Stem.getBorderDimensions(t, a, {
						math: !1
					}),
					l = {
						position: {
							top: u.box.dimensions.height - f.height,
							left: i ? r - a: (u.box.dimensions.width - f.width) / 2
						},
						dimensions: f
					};
					u.blurs.push(l)
				}
			} else u.blurs = [e.extend({},
			u.box)];
			return u
		},
		rotate: function (e, t, n) {
			g.rotate(e, t.getSkin(), n)
		}
	},
	e.extend(S.prototype, function () {
		function t() {
			return C.get(this.element)[0]
		}
		function n() {
			return b.get(this.element)
		}
		function r() {
			this.cleanup()
		}
		function i() {
			if (!this.container) return;
			e(this.container).remove(),
			this.stem = null,
			this.background = null,
			this.bubble = null,
			this.container = null,
			this._cache = {}
		}
		function s() {}
		function o() {
			this.cleanup(),
			this.prepare();
			var t = this.getTooltip(),
			n = this.getSkin();
			this.container = e("<div>").addClass("t_Shadow")[0],
			e(t.container).prepend(this.container),
			n.iframeShim && e(t.container).prepend(n.iframeShim);
			var r = n.getOrderLayout();
			e(this.container).css({
				top: 0,
				left: 0
			}),
			this.drawBackground(),
			this.order()
		}
		function u() {
			return this.options.opacity / (this.options.blur + 1)
		}
		function a() {
			var t = this.getSkin(),
			n = t.getOrderLayout(),
			r = this.getTooltip(),
			i = this.getOrderLayout(),
			s = this.options.blur,
			o = E.Stem.getLayout(this),
			u = t._hookPosition,
			a = m.getSide(u),
			l = {
				top: s,
				left: s
			};
			if (r.options.stem) {
				var c = o.blurs[o.blurs.length - 1];
				a == "left" && (l.left += Math.ceil(c.dimensions.height)),
				a == "top" && (l.top += Math.ceil(c.dimensions.height))
			}
			var h = t._cache.options,
			p = h.radius,
			d = h.border;
			r.options.radius.position == "background" && p && (p += d);
			var g = i.bubble.dimensions;
			e(this.container).append(e(this.bubble = document.createElement("div")).addClass("t_ShadowBubble").css(f(g))).css(f(g)),
			e(document.body).append(e(this.bubbleCanvas = document.createElement("canvas"))),
			v.resize(this.bubbleCanvas, i.bubble.dimensions),
			v.init(this.bubbleCanvas);
			var b = this.bubbleCanvas.getContext("2d");
			b.globalAlpha = this._globalAlpha,
			e(this.bubble).append(this.bubbleCanvas);
			var w = s + 1;
			for (var S = 0; S <= s; S++) b.fillStyle = y.hex2fill(this.options.color, E.transition(S * (1 / w)) * (this.options.opacity / w)),
			v.drawRoundedRectangle(b, {
				width: n.background.dimensions.width + S * 2,
				height: n.background.dimensions.height + S * 2,
				top: l.top - S,
				left: l.left - S,
				radius: p + S
			});
			if (!t.options.stem) return;
			var x = {
				x: l.left,
				y: l.top
			},
			T = o.blurs[0].dimensions,
			N = t.options.stem,
			C = d;
			C += N.width * .5;
			var k = t.options.radius && t.options.radius.position == "background" ? t.options.radius.size || 0 : 0;
			k && (C += k);
			var L = d + k + .5 * N.width - .5 * T.width,
			A = Math.ceil(p > L ? p - L: 0),
			O = t._corrections && t._corrections.stem || {
				x: 0,
				y: 0
			},
			M = t._corrections && t._corrections.corner || {
				x: 0,
				y: 0
			};
			C += Math.max(A, t.options.stem.offset && t.options.stem.offset[a && /^(left|right)$/.test(a) ? "y": "x"] || 0);
			if (a == "top" || a == "bottom") {
				switch (u) {
				case "topleft":
				case "bottomleft":
					x.x += C + O.x - M.x;
					break;
				case "topmiddle":
				case "topcenter":
				case "bottommiddle":
				case "bottomcenter":
					x.x += n.background.dimensions.width * .5 + O.x;
					break;
				case "topright":
				case "bottomright":
					x.x += n.background.dimensions.width - C - O.x + M.x
				}
				a == "bottom" && (x.y += n.background.dimensions.height);
				for (var S = 0, _ = o.blurs.length; S < _; S++) {
					b.fillStyle = y.hex2fill(this.options.color, E.transition(S * (1 / w)) * (this.options.opacity / w));
					var s = o.blurs[S];
					b.beginPath(),
					a == "top" ? (b.moveTo(x.x, x.y - S), b.lineTo(x.x - s.dimensions.width * .5, x.y - S), b.lineTo(x.x, x.y - S - s.dimensions.height), b.lineTo(x.x + s.dimensions.width * .5, x.y - S)) : (b.moveTo(x.x, x.y + S), b.lineTo(x.x - s.dimensions.width * .5, x.y + S), b.lineTo(x.x, x.y + S + s.dimensions.height), b.lineTo(x.x + s.dimensions.width * .5, x.y + S)),
					b.closePath(),
					b.fill()
				}
			} else {
				switch (u) {
				case "lefttop":
				case "righttop":
					x.y += C + O.y - M.y;
					break;
				case "leftmiddle":
				case "leftcenter":
				case "rightmiddle":
				case "rightcenter":
					x.y += n.background.dimensions.height * .5 + O.y;
					break;
				case "leftbottom":
				case "rightbottom":
					x.y += n.background.dimensions.height - C - O.y + M.y
				}
				a == "right" && (x.x += n.background.dimensions.width);
				for (var S = 0, _ = o.blurs.length; S < _; S++) {
					b.fillStyle = y.hex2fill(this.options.color, E.transition(S * (1 / w)) * (this.options.opacity / w));
					var s = o.blurs[S];
					b.beginPath(),
					a == "left" ? (b.moveTo(x.x - S, x.y), b.lineTo(x.x - S, x.y - s.dimensions.width * .5), b.lineTo(x.x - S - s.dimensions.height, x.y), b.lineTo(x.x - S, x.y + s.dimensions.width * .5)) : (b.moveTo(x.x + S, x.y), b.lineTo(x.x + S, x.y - s.dimensions.width * .5), b.lineTo(x.x + S + s.dimensions.height, x.y), b.lineTo(x.x + S, x.y + s.dimensions.width * .5)),
					b.closePath(),
					b.fill()
				}
			}
		}
		function l() {
			var t = this.getSkin(),
			n = t.contentDimensions,
			r = t.radius,
			i = t.getOrderLayout(),
			s = this.getTooltip(),
			o = this.options.blur,
			u = e.extend({},
			i.background.dimensions);
			u.width += 2 * o,
			u.height += 2 * o;
			var a, f, l;
			if (t.options.stem) {
				var c = E.Stem.getLayout(this);
				a = c.box.dimensions,
				l = a.height
			}
			var h = g.getBubbleLayout(t, u, l),
			p = h.dimensions,
			d = h.position,
			u = h.background.dimensions,
			v = h.background.position,
			m = a,
			y = i.bubble.position,
			b = i.background.position,
			w = {
				top: y.top + b.top - (v.top + o) + this.options.offset.y,
				left: y.left + b.left - (v.left + o) + this.options.offset.x
			},
			S = i.anchor,
			x = i.skin.dimensions,
			T = {
				top: 0,
				left: 0
			};
			if (w.top < 0) {
				var N = Math.abs(w.top);
				T.top += N,
				w.top = 0,
				S.top += N
			}
			if (w.left < 0) {
				var C = Math.abs(w.left);
				T.left += C,
				w.left = 0,
				S.left += C
			}
			var k = {
				height: Math.max(p.height + w.top, x.height + T.top),
				width: Math.max(p.width + w.left, x.width + T.left)
			},
			L = {
				left: Math.ceil(T.left + i.bubble.position.left + i.background.position.left + t.border + t.padding),
				top: Math.ceil(T.top + i.bubble.position.top + i.background.position.top + t.border + t.padding)
			},
			A = {
				tooltip: {
					dimensions: k
				},
				skin: {
					dimensions: x,
					position: T
				},
				container: {
					dimensions: p,
					position: w
				},
				bubble: {
					dimensions: p,
					position: {
						top: Math.round(d.top),
						left: Math.round(d.left)
					}
				},
				background: {
					dimensions: {
						width: Math.ceil(u.width),
						height: Math.ceil(u.height)
					},
					position: {
						top: Math.round(v.top),
						left: Math.round(v.left)
					}
				},
				anchor: S,
				content: {
					position: L
				}
			};
			return A
		}
		function c() {
			var t = this.getOrderLayout(),
			n = this.getSkin(),
			r = this.getTooltip();
			e(r.container).css(f(t.tooltip.dimensions)),
			e(r.skinElement).css(e.extend(f(t.skin.position), f(t.skin.dimensions))),
			n.iframeShim && n.iframeShim.css(f(t.tooltip.dimensions));
			if (r.options.closeButton) {
				var i = n.getOrderLayout(),
				s = t.skin.position,
				o = i.closeButton.position;
				e(n.closeButton).css(f({
					top: s.top + o.top,
					left: s.left + o.left
				}));
				if (r.options.closeButton.shadow) {
					var u = i.closeButtonShadow.position;
					e(n.closeButtonShadow.container).css(f({
						top: s.top + u.top,
						left: s.left + u.left
					}))
				}
			}
			e(this.container).css(e.extend(f(t.container.dimensions), f(t.container.position))),
			e(this.bubble).css(f(t.bubble.dimensions)),
			e(r.contentElement).css(f(t.content.position))
		}
		return {
			prepare: s,
			remove: r,
			cleanup: i,
			build: o,
			getTooltip: t,
			getSkin: n,
			getOrderLayout: l,
			getBlurOpacity: u,
			drawBackground: a,
			order: c
		}
	} ());
	var x = {
		shadows: {},
		get: function (t) {
			if (!t) return null;
			var n = e(t).data("tipped-uid");
			return n ? this.shadows[n] : null
		},
		add: function (e) {
			this.shadows[e.uid] = e
		},
		remove: function (e) {
			var t = this.get(e);
			t && (delete this.shadows[t.uid], t.remove())
		}
	};
	e.extend(T.prototype, function () {
		function t() {
			return C.get(this.element)[0]
		}
		function n() {
			return b.get(this.element)
		}
		function r() {
			return this.options.opacity / (this.options.blur + 1)
		}
		function i() {
			this.cleanup()
		}
		function s() {
			if (!this.container) return;
			e(this.container).remove(),
			this.container = null
		}
		function o() {
			this.cleanup();
			var t = this.getTooltip(),
			n = this.getSkin(),
			r = n.getOrderLayout().closeButton.dimensions,
			i = e.extend({},
			r),
			s = this.options.blur;
			i.width += s * 2,
			i.height += s * 2,
			e(n.closeButton).before(e(this.container = document.createElement("div")).addClass("t_CloseButtonShadow")),
			e(document.body).append(e(this.closeButtonCanvas = document.createElement("canvas"))),
			v.resize(this.closeButtonCanvas, i),
			v.init(this.closeButtonCanvas);
			var o = this.closeButtonCanvas.getContext("2d");
			o.globalAlpha = this._globalAlpha,
			e(this.container).append(this.closeButtonCanvas);
			var u = i.width / 2,
			a = i.height / 2,
			f = r.height / 2,
			l = s + 1;
			for (var c = 0; c <= s; c++) o.fillStyle = y.hex2fill(this.options.color, E.transition(c * (1 / l)) * (this.options.opacity / l)),
			o.beginPath(),
			o.arc(u, a, f + c, h(0), h(360), !0),
			o.closePath(),
			o.fill()
		}
		return {
			build: o,
			remove: i,
			cleanup: s,
			getTooltip: t,
			getSkin: n,
			getBlurOpacity: r
		}
	} ());
	var C = {
		tooltips: {},
		options: {
			defaultSkin: "dark",
			startingZIndex: 999999
		},
		startDelegating: function () {
			function t() {
				var t = ["click"];
				Tipped.support.touch && (t.push("touchstart"), e(document.body).bind("click", function () {
					return void 0
				})),
				e.each(t, function (t, n) {
					e(document.documentElement).delegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", n, function (t) {
						t.preventDefault(),
						t.stopPropagation(),
						C.getByTooltipElement(e(t.target).closest(".t_Tooltip")[0]).hide()
					})
				}),
				e(window).bind("resize", e.proxy(this.onWindowResize, this))
			}
			return t
		} (),
		onWindowResize: function () {
			this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null),
			this._resizeTimer = r.delay(e.proxy(function () {
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
			if (!n) {
				var i = this.getByTooltipElement(e(t).closest(".t_Tooltip")[0]);
				i && i.element && (n = e(i.element).data("tipped-uid"))
			}
			if (n && (r = this.tooltips[n])) return r
		},
		findElement: function (e) {
			var t;
			return r.isElement(e) && (t = this._getTooltip(e)),
			t && t.element
		},
		get: function (t) {
			var n = [];
			if (r.isElement(t)) {
				var i = this._getTooltip(t);
				i && (n = [i])
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
			if (r.isElement(t)) {
				var n = t,
				i = this.get(n)[0];
				i && i.show()
			} else e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.show()
			},
			this))
		},
		hide: function (t) {
			if (r.isElement(t)) {
				var n = this.get(t)[0];
				n && n.hide()
			} else e(t).each(e.proxy(function (e, t) {
				var n = this.get(t)[0];
				n && n.hide()
			},
			this))
		},
		toggle: function (t) {
			if (r.isElement(t)) {
				var n = t,
				i = this.get(n)[0];
				i && i.toggle()
			} else e(t).each(e.proxy(function (e, t) {
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
			if (r.isElement(t)) {
				var n = t,
				i = this.get(n)[0];
				i && i.refresh()
			} else e(t).each(e.proxy(function (e, t) {
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
			return r.isElement(t) && e.each(this.getVisible() || [], function (e, r) {
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
			this.getVisible().length <= 1 && e.each(this.tooltips, function (t, n) {
				n.getState("build") && !n.options.zIndex && e(n.container).css({
					zIndex: n.zIndex = +C.options.startingZIndex
				})
			})
		},
		add: function (e) {
			this.tooltips[e.uid] = e
		},
		_remove: function (t) {
			var n = this._getTooltip(t);
			if (n) {
				var r = e(n.element).data("tipped-uid");
				delete this.tooltips[r],
				n.hide(),
				n.remove()
			}
		},
		remove: function (t) {
			r.isElement(t) ? this._remove(t) : e(t).each(e.proxy(function (e, t) {
				this._remove(t)
			},
			this))
		},
		removeDetached: function () {
			e.each(this.tooltips, e.proxy(function (e, t) {
				t.element && !r.element.isAttached(t.element) && this._remove(t.element)
			},
			this))
		},
		setDefaultSkin: function (e) {
			this.options.defaultSkin = e || "dark"
		},
		setStartingZIndex: function (e) {
			this.options.startingZIndex = e || 0
		},
		createOptions: function () {
			function s(r) {
				var i;
				return e.type(r) == "string" ? i = {
					element: n.hideOn && n.hideOn.element || t.hideOn.element,
					event: r
				}: i = N(e.extend({},
				t.hideOn), r),
				i
			}
			function o(s) {
				return t = Tipped.Skins.base,
				n = N(e.extend({},
				t), Tipped.Skins.reset),
				r = Tipped.Skins.CloseButtons.base,
				i = N(e.extend({},
				r), Tipped.Skins.CloseButtons.reset),
				o = u,
				u(s)
			}
			function u(o) {
				o.skin = o.skin && Tipped.Skins[o.skin] ? o.skin: Tipped.Skins[C.options.defaultSkin] ? C.options.defaultSkin: "dark";
				var u = o.skin ? e.extend({},
				Tipped.Skins[o.skin] || Tipped.Skins[C.options.defaultSkin]) : {},
				a = N(e.extend({},
				n), u),
				f = N(e.extend({},
				a), o);
				if (f.ajax) {
					var l = n.ajax || {},
					c = t.ajax;
					e.type(f.ajax) == "boolean" && (f.ajax = {
						cache: l.cache || c.cache,
						type: l.type || c.type
					}),
					f.ajax = N(e.extend({},
					c), f.ajax)
				}
				f.background && e.type(f.background) == "string" && (f.background = {
					color: f.background,
					opacity: 1
				});
				if (f.border) {
					var h, p = n.border || {},
					d = t.border;
					e.type(f.border) == "number" ? h = {
						size: f.border,
						color: p.color || d.color,
						opacity: p.opacity || d.opacity
					}: h = N(e.extend({},
					d), f.border),
					f.border = h.size === 0 ? !1 : h
				}
				if (f.radius) {
					var v;
					e.type(f.radius) == "number" ? v = {
						size: f.radius,
						position: n.radius && n.radius.position || t.radius.position
					}: v = N(e.extend({},
					t.radius), f.radius),
					f.radius = v.size === 0 ? !1 : v
				}
				var g, y = y = f.hook && f.hook.target || e.type(f.hook) == "string" && f.hook || n.hook && n.hook.target || e.type(n.hook) == "string" && n.hook || t.hook && t.hook.target || t.hook,
				b = f.hook && f.hook.tooltip || n.hook && n.hook.tooltip || t.hook && t.hook.tooltip || C.Position.getInversedPosition(y);
				f.hook ? e.type(f.hook) == "string" ? g = {
					target: f.hook,
					tooltip: C.Position.getTooltipPositionFromTarget(f.hook)
				}: (g = {
					tooltip: b,
					target: y
				},
				f.hook.tooltip && (g.tooltip = f.hook.tooltip), f.hook.target && (g.target = f.hook.target)) : g = {
					tooltip: b,
					target: y
				};
				if (f.target == "mouse") {
					var w = m.getOrientation(g.target);
					w == "horizontal" ? g.target = g.target.replace(/(left|right)/, "middle") : g.target = g.target.replace(/(top|bottom)/, "middle")
				}
				f.hook = g;
				var E;
				f.target == "mouse" ? (E = e.extend({},
				t.offset), e.extend(E, Tipped.Skins.reset.offset || {}), o.skin && e.extend(E, (Tipped.Skins[o.skin] || Tipped.Skins[C.options.defaultSkin]).offset || {}), E = C.Position.adjustOffsetBasedOnHooks(t.offset, t.hook, g.target, !0), o.offset && (E = e.extend(E, o.offset || {})), f.fadeOut = 0) : E = {
					x: f.offset.x,
					y: f.offset.y
				},
				f.offset = E;
				if (f.closeButton && f.closeButtonSkin) {
					var S = e.extend({},
					Tipped.Skins.CloseButtons[f.closeButtonSkin]),
					x = N(e.extend({},
					i), S);
					if (x.states) {
						var T = {};
						e.each(["default", "hover"], function (t, n) {
							var s = x.states[n],
							o = i.states && i.states[n];
							if (s.background) {
								var u = o && o.background;
								if (e.type(s.background) == "number") s.background = {
									color: u && u.color || r.states[n].background.color,
									opacity: s.background
								};
								else if (e.type(s.background) == "string") {
									var a = u && e.type(u.opacity) == "number" && u.opacity || r.states[n].background.opacity;
									s.background = {
										color: s.background,
										opacity: a
									}
								} else s.background = N(e.extend({},
								r.states[n].background), s.background)
							}
							if (s.border) {
								var f = o && o.border;
								e.type(s.border) == "number" ? s.border = {
									color: f && f.color || r.states[n].border.color,
									opacity: s.border
								}: s.border = N(e.extend({},
								r.states[n].border), s.border)
							}
						})
					}
					if (x.shadow) {
						var k = i.shadow && i.shadow.constructor && i.shadow.constructor == Object ? i.shadow: r.shadow;
						x.shadow.constructor && x.shadow.constructor == Object && (k = N(k, x.shadow)),
						x.shadow = k
					}
					f.closeButton = x
				}
				if (f.shadow) {
					var L;
					e.type(f.shadow) == "boolean" ? n.shadow && e.type(n.shadow) == "boolean" ? L = t.shadow: n.shadow ? L = n.shadow: L = t.shadow: L = N(e.extend({},
					t.shadow), f.shadow || {}),
					e.type(L.offset) == "number" && (L.offset = {
						x: L.offset,
						y: L.offset
					}),
					f.shadow = L
				}
				if (f.stem) {
					var A = {};
					e.type(f.stem) == "boolean" ? A = N({},
					t.stem) : A = N(N({},
					t.stem), e.extend({},
					f.stem)),
					e.type(A.offset) == "number" && (A.offset = {
						x: A.offset,
						y: A.offset
					}),
					f.stem = A
				}
				f.containment && (e.type(f.containment) == "string" ? f.containment = {
					selector: f.containment,
					flip: !0
				}: e.type(f.containment) == "boolean" && (f.containment = f.containment ? {
					selector: "viewport",
					flip: !0
				}: !1)),
				f.hideOn && f.hideOn == "click-outside" && (f.hideOnClickOutside = !0, f.hideOn = !1);
				if (f.hideOn) if (e.isArray(f.hideOn)) {
					var O = [];
					e.each(f.hideOn, function (e, t) {
						O.push(s(t))
					}),
					f.hideOn = O
				} else f.hideOn = [s(f.hideOn)];
				return f.showOn && e.type(f.showOn) == "string" && (f.showOn = ["" + f.showOn]),
				f.padding = 0,
				f.spinner && (window.Spinners || (f.spinner = !1)),
				f
			}
			var t, n, r, i;
			return o
		} ()
	};
	C.Position = function () {
		function n(n) {
			var r = m.split(n),
			i = r[1],
			s = r[2],
			o = m.getOrientation(n),
			u = e.extend({
				horizontal: !0,
				vertical: !0
			},
			arguments[1] || {});
			return o == "horizontal" ? (u.vertical && (i = t[i]), u.horizontal && (s = t[s])) : (u.vertical && (s = t[s]), u.horizontal && (i = t[i])),
			i + s
		}
		function s(e) {
			var r = m.split(e);
			return n(r[1] + t[r[2]])
		}
		function o(e, t, n, r) {
			return Math.sqrt(Math.pow(Math.abs(n - e), 2) + Math.pow(Math.abs(r - t), 2))
		}
		function u(t, n) {
			e(t.container).css({
				top: n.top + "px",
				left: n.left + "px"
			})
		}
		function f(e, t, r, i, s) {
			var o = T(e, t, r, i),
			u = r && typeof r.type == "string" ? r.type: "",
			a = /move$/.test(u),
			f = [];
			if (o.contained.overlap === 1) return c(e, o),
			o;
			var h = t,
			p = i,
			d = {
				horizontal: !o.contained.horizontal,
				vertical: !o.contained.vertical
			},
			v = {
				horizontal: !1,
				vertical: !1
			},
			g = m.getOrientation(t);
			if ((v.vertical = g == "horizontal" && d.vertical) || (v.horizontal = g == "vertical" && d.horizontal)) {
				h = n(t, v),
				p = n(i, v),
				o = T(e, h, r, p);
				if (o.contained.overlap === 1) return c(e, o),
				o
			}
			return o = l(o, e),
			c(e, o),
			o
		}
		function l(e, t) {
			var n = N(t),
			r = n.dimensions,
			i = n.position,
			s = b.get(t.element)._cache.hook[e.hook.tooltip].tooltip.dimensions,
			o = e.position,
			u = {
				top: 0,
				left: 0,
				sides: []
			};
			return i.left > o.left && (u.left = i.left - o.left, u.sides.push("left"), e.position.left = i.left),
			i.top > o.top && (u.top = o.top - i.top, u.sides.push("top"), e.position.top = i.top),
			i.left + r.width < o.left + s.width && (u.left = i.left + r.width - (o.left + s.width), u.sides.push("right"), e.position.left = i.left + r.width - s.width),
			i.top + r.height < o.top + s.height && (u.top = i.top + r.height - (o.top + s.height), u.sides.push("bottom"), e.position.top = i.top + r.height - s.height),
			e.adjustment = u,
			e
		}
		function c(e, t) {
			e.setHookPositionAndStemCorrection(t.hook.tooltip, t.contained.correction, t.adjustment),
			u(e, t.position)
		}
		function h(e) {
			return e && (/^mouse|click|touch$/.test(typeof e.type == "string" && e.type || "") || e.pageX >= 0)
		}
		function p(e, t, n) {
			return e >= t && e <= n
		}
		function v(e, t, n, r) {
			var i = p(e, n, r),
			s = p(t, n, r);
			if (i && s) return t - e;
			if (i && !s) return r - e;
			if (!i && s) return t - n;
			var o = p(n, e, t),
			u = p(r, e, t);
			return o && u ? r - n: o && !u ? t - n: !o && u ? r - e: 0
		}
		function g(e, t) {
			return v(e.position.left, e.position.left + e.dimensions.width, t.position.left, t.position.left + t.dimensions.width) * v(e.position.top, e.position.top + e.dimensions.height, t.position.top, t.position.top + t.dimensions.height)
		}
		function y(e, t) {
			var n = e.dimensions.width * e.dimensions.height;
			return n ? g(e, t) / n: 0
		}
		function w(e, t) {
			var n = m.split(t),
			r = m.getOrientation(t),
			i = {
				left: 0,
				top: 0
			};
			if (r == "horizontal") {
				switch (n[2]) {
				case "middle":
				case "center":
					i.left = .5 * e.width;
					break;
				case "right":
					i.left = e.width
				}
				n[1] == "bottom" && (i.top = e.height)
			} else {
				switch (n[2]) {
				case "middle":
				case "center":
					i.top = .5 * e.height;
					break;
				case "bottom":
					i.top = e.height
				}
				n[1] == "right" && (i.left = e.width)
			}
			return i
		}
		function S(t) {
			var n = r.element.cumulativeOffset(t),
			i = r.element.cumulativeScrollOffset(t),
			s = {
				top: e(window).scrollTop(),
				left: e(window).scrollLeft()
			};
			return n.left += -1 * (i.left - s.left),
			n.top += -1 * (i.top - s.top),
			n
		}
		function T(t, i, s, o) {
			var u, a, f, l = b.get(t.element),
			c = l.options,
			p = c.offset,
			d = h(s);
			if (d || !s) {
				f = {
					width: 24,
					height: 24
				};
				if (d) {
					var v = r.pointer(s);
					u = {
						top: v.y - .5 * f.height + 6,
						left: v.x - .5 * f.width + 6
					}
				} else {
					var g = t._cache.event;
					u = {
						top: (g ? g.y: 0) - .5 * f.height + 6,
						left: (g ? g.x: 0) - .5 * f.width + 6
					}
				}
				t._cache.event = {
					x: u.left,
					y: u.top
				}
			} else u = S(s),
			f = {
				width: e(s).outerWidth(),
				height: e(s).outerHeight()
			};
			if (c.stem && c.target != "mouse") {
				var T = m.split(o),
				C = m.split(i),
				k = m.getOrientation(o),
				L = l._cache.options,
				A = l.getStemLayout().border.dimensions,
				O = L.radius,
				M = L.border,
				_ = O && c.radius.position == "background" ? O: 0,
				P = O && c.radius.position == "border" ? O: O + M,
				H = M + _ + .5 * c.stem.width - .5 * A.width,
				j = P > H ? P - H: 0;
				sideOffset = Math.ceil(M + _ + .5 * c.stem.width + j + c.stem.offset[k == "horizontal" ? "x": "y"]);
				if (k == "horizontal" && T[2] == "left" && C[2] == "left" || T[2] == "right" && C[2] == "right") f.width -= sideOffset * 2,
				u.left += sideOffset;
				else if (k == "vertical" && T[2] == "top" && C[2] == "top" || T[2] == "bottom" && C[2] == "bottom") f.height -= sideOffset * 2,
				u.top += sideOffset
			}
			a = e.extend({},
			u);
			var F = d ? n(c.hook.tooltip) : c.hook.target,
			q = w(f, F),
			U = w(f, o),
			W = {
				top: u.top + q.top + p.y,
				left: u.left + q.left + p.x
			};
			u = {
				left: u.left + U.left,
				top: u.top + U.top
			};
			var X = e.extend({},
			p);
			X = x(X, F, o, l.options.target == "mouse"),
			u.top += X.y,
			u.left += X.x;
			var l = b.get(t.element),
			V = l._cache.hook,
			$ = e.extend({},
			V[i]),
			Q = {
				top: u.top - $.anchor.top,
				left: u.left - $.anchor.left
			};
			$.tooltip.position = Q;
			var G = {
				horizontal: !0,
				vertical: !0
			},
			Y = {
				x: 0,
				y: 0
			};
			if (t.options.containment) {
				var Z = N(t),
				et = t.options.shadow ? E.get(t.element) : l,
				tt = et.getOrderLayout().tooltip.dimensions;
				G.overlap = y({
					dimensions: tt,
					position: Q
				},
				Z);
				if (G.overlap < 1) {
					if (Q.left < Z.position.left || Q.left + tt.width > Z.position.left + Z.dimensions.width) G.horizontal = !1,
					Q.left < Z.position.left ? Y.x = Q.left - Z.position.left: Y.x = Q.left + tt.width - (Z.position.left + Z.dimensions.width);
					if (Q.top < Z.position.top || Q.top + tt.height > Z.position.top + Z.dimensions.height) G.vertical = !1,
					Q.top < Z.position.top ? Y.y = Q.top - Z.position.top: Y.y = Q.top + tt.height - (Z.position.top + Z.dimensions.height)
				}
			} else G.overlap = 1;
			G.correction = Y;
			var z = V[i].bubble,
			rt = y({
				dimensions: f,
				position: a
			},
			{
				dimensions: z.dimensions,
				position: {
					top: Q.top + z.position.top,
					left: Q.left + z.position.left
				}
			});
			return {
				position: Q,
				overlap: {
					target: rt
				},
				contained: G,
				hook: {
					tooltip: i,
					target: o
				}
			}
		}
		function N(t) {
			var n = {
				top: e(window).scrollTop(),
				left: e(window).scrollLeft()
			},
			i = t.options,
			s = i.target;
			if (s == "mouse" || s == "self") s = t.element;
			var o = e(s).closest(i.containment.selector).first()[0];
			if (!o || i.containment.selector == "viewport") return {
				dimensions: d.viewport(),
				position: n
			};
			var u = r.element.cumulativeOffset(o),
			a = r.element.cumulativeScrollOffset(o);
			return u.left += -1 * (a.left - n.left),
			u.top += -1 * (a.top - n.top),
			{
				dimensions: {
					width: e(o).innerWidth(),
					height: e(o).innerHeight()
				},
				position: u
			}
		}
		var t = {
			left: "right",
			right: "left",
			top: "bottom",
			bottom: "top",
			middle: "middle",
			center: "center"
		},
		a = i.IE && i.IE < 9 || i.Gecko && i.Gecko < 2 || i.WebKit && i.WebKit < 530,
		x = function () {
			var e = [[ - 1, -1], [0, -1], [1, -1], [ - 1, 0], [0, 0], [1, 0], [ - 1, 1], [0, 1], [1, 1]],
			t = {
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
			return function (n, r, i, s) {
				var o = e[t[r]],
				u = e[t[i]],
				a = [Math.floor(Math.abs(o[0] - u[0]) * .5) ? -1 : 1, Math.floor(Math.abs(o[1] - u[1]) * .5) ? -1 : 1];
				return ! m.isCenter(r) && m.isCenter(i) && !s && (m.getOrientation(i) == "horizontal" ? a[0] = 0 : a[1] = 0),
				{
					x: a[0] * n.x,
					y: a[1] * n.y
				}
			}
		} ();
		return {
			get: T,
			set: f,
			getInversedPosition: n,
			getTooltipPositionFromTarget: s,
			getAbsoluteOffset: S,
			adjustOffsetBasedOnHooks: x,
			isPointerEvent: h
		}
	} (),
	C.Position.mouseBuffer = {
		x: 0,
		y: 0
	},
	e(document).ready(function () {
		var t = C.Position;
		e(document).bind("mousemove", function (e) {
			t.mouseBuffer = {
				x: e.pageX,
				y: e.pageY
			}
		})
	}),
	C.UpdateQueue = function () {
		function t() {
			e(document.body).append(e(document.createElement("div")).addClass("t_UpdateQueue").append(e(document.createElement("div")).addClass("t_Tooltip").append(e(this.container = document.createElement("div")).addClass("t_Content"))))
		}
		function n(t) {
			return {
				width: e(t).innerWidth(),
				height: e(t).innerHeight()
			}
		}
		function i(t) {
			var r = n(t),
			i = t.parentNode;
			return i && e(i).css({
				width: r.width + "px"
			}) && n(t).height > r.height && r.width++,
			e(i).css({
				width: "100%"
			}),
			r
		}
		function s(t, n, i) {
			this.container || this.build();
			var s = t.options,
			o = e.extend({
				spinner: !1
			},
			arguments[3] || {});
			(s.inline || r.isElement(n)) && !e(n).data("isSpinner") && (s.inline && e.type(n) == "string" && (t.inlineContent = e("#" + n)[0], n = t.inlineContent), !t.inlineMarker && n && r.element.isAttached(n) && (e(t.inlineContent).data("tipped_restore_inline_display", e(t.inlineContent).css("display")), t.inlineMarker = document.createElement("div"), e(t.inlineContent).before(e(t.inlineMarker).hide())));
			var u = document.createElement("div");
			e(this.container).append(e(u).addClass("t_ContentContainer t_clearfix").append(n)),
			r.isElement(n) && e(n).show(),
			s.skin && e(u).addClass("t_Content_" + t.options.skin);
			var a = e(u).find("img[src]").filter(function () {
				return ! e(this).attr("height") || !e(this).attr("width")
			});
			if (a.length > 0 && !t.getState("preloading_images")) {
				t.setState("preloading_images", !0),
				s.spinner && (!o.spinner && !t.spinner && (t.spinner = t.insertSpinner(s.spinner)), t.getState("visible") && (t.position(), e(t.container).show()), t.spinner.play());
				var f = 0,
				l = Math.max(8e3, (a.length || 0) * 750);
				t.clearTimer("preloading_images"),
				t.setTimer("preloading_images", e.proxy(function () {
					a.each(function () {
						this.onload = function () {}
					});
					if (f >= a.length) return;
					this._updateTooltip(t, u),
					i && i()
				},
				this), l),
				e.each(a, e.proxy(function (n, r) {
					var s = new Image;
					s.onload = e.proxy(function () {
						s.onload = function () {};
						var n = s.width,
						o = s.height,
						l = e(r).attr("width"),
						c = e(r).attr("height");
						if (!l || !c) ! l && c ? (n = Math.round(c * n / o), o = c) : !c && l && (o = Math.round(l * o / n), n = l),
						e(r).attr({
							width: n,
							height: o
						}),
						f++;
						f == a.length && (t.clearTimer("preloading_images"), t.spinner && (t.spinner.remove(), t.spinner = null), t.getState("visible") && e(t.container).hide(), this._updateTooltip(t, u), i && i())
					},
					this),
					s.src = r.src
				},
				this))
			} else this._updateTooltip(t, u),
			i && i()
		}
		function o(t, n) {
			var r = i(n),
			s = {
				width: r.width - (parseInt(e(n).css("padding-left")) || 0) - (parseInt(e(n).css("padding-right")) || 0),
				height: r.height - (parseInt(e(n).css("padding-top")) || 0) - (parseInt(e(n).css("padding-bottom")) || 0)
			};
			t.options.maxWidth && e.type(t.options.maxWidth) == "number" && s.width > t.options.maxWidth && (e(n).css({
				width: t.options.maxWidth + "px"
			}), r = i(n)),
			t._cache.contentDimensions = r,
			e(t.contentElement).html(n)
		}
		return {
			build: t,
			update: s,
			_updateTooltip: o,
			getMeasureElementDimensions: i
		}
	} (),
	e.extend(k.prototype, function () {
		function t(e, t, n) {
			this._cache.timers[e] = r.delay(t, n)
		}
		function n(e) {
			return this._cache.timers[e]
		}
		function i(e) {
			this._cache.timers[e] && (window.clearTimeout(this._cache.timers[e]), delete this._cache.timers[e])
		}
		function s() {
			e.each(this._cache.timers, function (e, t) {
				window.clearTimeout(t)
			}),
			this._cache.timers = []
		}
		function o(t, n, r, i) {
			n = n;
			var s = e.proxy(r, i || this);
			this._cache.events.push({
				element: t,
				eventName: n,
				handler: s
			}),
			e(t).bind(n, s)
		}
		function u() {
			e.each(this._cache.events, function (t, n) {
				e(n.element).unbind(n.eventName, n.handler)
			})
		}
		function a(e, t) {
			this._cache.states[e] = t
		}
		function l(e) {
			return this._cache.states[e]
		}
		function c() {
			this.setEvent(this.element, "mouseenter", this.setActive),
			this.setEvent(this.element, "mouseleave", e.proxy(function (e) {
				this.setIdle(e)
			},
			this)),
			this.options.showOn && e.each(this.options.showOn, e.proxy(function (t, n) {
				var r = !1;
				n == "click" && (this.options.hideOn && e.each(this.options.hideOn, function (e, t) {
					if (t.element == "self" && t.event == "click") return r = !0,
					!1
				}), this.setState("toggles", r)),
				this.setEvent(this.element, n, n == "click" ? r ? this.toggle: this.show: e.proxy(function () {
					this.showDelayed()
				},
				this))
			},
			this)),
			this.options.hideOn ? e.each(this.options.hideOn, e.proxy(function (t, n) {
				var r;
				switch (n.element) {
				case "self":
					if (this.getState("toggles") && n.event == "click") return;
					r = this.element;
					break;
				case "target":
					r = this.target
				}
				if (!r) return;
				this.setEvent(r, n.event, n.event == "click" ? this.hide: e.proxy(function () {
					this.hideDelayed()
				},
				this))
			},
			this)) : this.options.showDelay && this.options.showOn && !e.inArray("click", this.options.showOn) > -1 && this.setEvent(this.element, "mouseleave", e.proxy(function () {
				this.clearTimer("show")
			},
			this));
			var t = !1; ! this.options.fixed && this.options.showOn && ((t = e.inArray("mousemove", this.options.showOn) > -1) || e.inArray("touchmove", this.options.showOn) > -1) && this.target == "mouse" && this.setEvent(this.element, t ? "mousemove": "touchmove", function (e) {
				if (!this.getState("skinned")) return;
				this.position(e)
			})
		}
		function h() {
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
				if (!r) return;
				this.setEvent(r, n.event, n.event.match(/^(click|mousemove|mouseenter)$/) ? this.hide: e.proxy(function () {
					this.hideDelayed()
				},
				this))
			},
			this))
		}
		function p(e, t, n) {
			var r = b.get(this.element);
			r && r.setHookPositionAndStemCorrection(e, t, n)
		}
		function d(e) {
			var t = b.get(this.element);
			t && t.setHookPosition(e)
		}
		function v() {
			this.setHookPosition(this.options.hook.tooltip)
		}
		function m() {
			e(this.container = document.createElement("div")).addClass("t_Tooltip"),
			this.createPreBuildObservers()
		}
		function g() {
			this.build();
			var e = b.get(this.element);
			e ? e.build() : (new w(this.element), this.setState("skinned", !0))
		}
		function y() {
			if (this.getState("build")) return;
			e(document.body).append(e(this.container).css({
				left: "-10000px",
				top: "-10000px",
				zIndex: this.zIndex
			}).append(e(this.skinElement = document.createElement("div")).addClass("t_Skin")).append(e(this.contentElement = document.createElement("div")).addClass("t_Content"))),
			e(this.container).addClass("t_Tooltip_" + this.options.skin),
			this.options.hideOnClickOutside && (e(this.element).addClass("t_hideOnClickOutside"), this.setEvent(document.documentElement, "click", e.proxy(function (t) {
				if (!this.visible()) return;
				var n = e(t.target).closest(".t_Tooltip, .t_hideOnClickOutside")[0];
				(!n || n && n != this.container && n != this.element) && this.hide()
			},
			this))),
			Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), e(this.container).addClass("t_hidden")),
			this.createPostBuildObservers(),
			this.setState("build", !0),
			C.add(this)
		}
		function E() {
			var t = this.content,
			n;
			this.inlineMarker && this.inlineContent && ((n = e(this.inlineContent).data("tipped_restore_inline_display")) && e(this.inlineContent).css({
				display: n
			}), e(this.inlineMarker).before(this.inlineContent).remove(), this.inlineMarker = null)
		}
		function S() {
			r.defer(e.proxy(function () {
				this.clearEvents()
			},
			this)),
			this.clearTimers(),
			this._restoreInlineContent(),
			r.defer(e.proxy(function () {
				e(this.container).find("img[src]").unbind("load")
			},
			this)),
			b.remove(this.element),
			this.getState("build") && this.container && (e(this.container).remove(), this.container = null);
			var t = "tipped_restore_title",
			n;
			(n = e(this.element).data(t)) && e(this.element).attr("title", n).removeData("tipped_restore_title"),
			e(this.element).removeData("tipped-uid")
		}
		function x(t) {
			var n = e.extend({
				afterUpdate: this.options.afterUpdate,
				spinner: !1
			},
			arguments[1] || {});
			this.build(),
			this.getState("visible") && e(this.container).hide(),
			C.UpdateQueue.update(this, t, e.proxy(function () {
				var t = this.getState("visible");
				t || this.setState("visible", !0),
				this._buildSkin(),
				t || this.setState("visible", !1),
				this.getState("visible") && (e(this.container).hide(), this.position(), this.raise(), e(this.container).show()),
				this.setState("updated", !0),
				n.afterUpdate && n.afterUpdate(this.contentElement.firstChild, this.element),
				n.callback && n.callback()
			},
			this), {
				spinner: n.spinner
			})
		}
		function T(t) {
			if (this.getState("xhr") || this.options.ajax.cache && this.getState("updated")) return;
			this.setState("xhr", !0),
			this.options.spinner && (this.spinner ? this.spinner.play() : (this.spinner = this.insertSpinner(this.options.spinner), this.setState("updated", !1)), this.position(t)),
			this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null),
			this._cache.xhr = e.ajax({
				url: this.content,
				type: this.options.ajax.type,
				data: this.options.ajax.data || {},
				dataType: this.options.ajax.dataType || "html",
				success: e.proxy(function (t, n, r) {
					if (r.status === 0) return;
					this.update(r.responseText, {
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
			})
		}
		function N() {
			var t = document.createElement("div");
			e(t).data("isSpinner", !0);
			var n = Spinners.create(t, e.extend({},
			arguments[0] || {})),
			r = Spinners.getDimensions(t);
			return e(t).css(f(r)),
			this.update(t, {
				afterUpdate: !1,
				callback: function () {
					n.play()
				}
			}),
			n
		}
		function L() {
			if (!this.getState("build") || this.options.zIndex) return;
			var t = C.getHighestTooltip();
			t && t != this && this.zIndex <= t.zIndex && e(this.container).css({
				zIndex: this.zIndex = t.zIndex + 1
			})
		}
		function A() {
			var e = b.get(this.element);
			e && (e.refresh(), this.visible() && this.position())
		}
		function O(e) {
			if (!Tipped.support.cssTransitions) return;
			e = e || 0;
			var t = this.container.style;
			t.MozTransitionDuration = e + "ms",
			t.webkitTransitionDuration = e + "ms",
			t.OTransitionDuration = e + "ms",
			t.transitionDuration = e + "ms"
		}
		function M(t) {
			this.clearTimer("hide"),
			this.clearTimer("fadeTransition");
			if (this.getState("visible") || this.getTimer("show")) return;
			this.setTimer("show", e.proxy(function () {
				this.clearTimer("show"),
				this.show(t)
			},
			this), this.options.showDelay || 1)
		}
		function _(t) {
			this.clearTimer("hide"),
			this.clearTimer("fadeTransition");
			if (this.visible()) return;
			if (e.type(this.content) == "function" || e.type(this._cache.contentFunction) == "function") {
				e.type(this._cache.contentFunction) != "function" && (this._cache.contentFunction = this.content);
				var n = this._cache.contentFunction(this.element) || !1;
				n != this._cache.fnCallContent && (this._cache.fnCallContent = n, this.setState("updated", !1), this._restoreInlineContent()),
				this.content = n;
				if (!n) return
			}
			this.options.hideOthers && C.hideAll(),
			this.setState("visible", !0),
			this.options.ajax ? this.ajaxUpdate(t) : this.getState("updated") || this.update(this.content),
			this.getState("skinned") && this.position(t),
			this.raise(),
			this.options.hideAfter && r.defer(e.proxy(function () {
				this.setActive()
			},
			this)),
			e.type(this.options.onShow) == "function" && (!this.options.ajax || this.options.ajax && this.options.ajax.cache && this.getState("updated")) && this.options.onShow(this.contentElement.firstChild, this.element),
			Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), e(this.container).addClass("t_visible").removeClass("t_hidden")),
			e(this.container).show()
		}
		function D() {
			this.clearTimer("show");
			if (!this.getState("visible")) return;
			this.setState("visible", !1),
			Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) ? (this.setFadeDuration(this.options.fadeOut), e(this.container).removeClass("t_visible").addClass("t_hidden"), this.setTimer("fadeTransition", e.proxy(this._hide, this), this.options.fadeOut)) : this._hide(),
			this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null, this.setState("xhr", !1))
		}
		function P() {
			if (!this.getState("build")) return;
			e(this.container).css({
				left: "-10000px",
				top: "-10000px"
			}),
			C.resetZ(),
			e.type(this.options.onHide) == "function" && !this.spinner && this.options.onHide(this.contentElement.firstChild, this.element)
		}
		function H() {
			this.clearTimer("show");
			if (this.getTimer("hide") || !this.getState("visible")) return;
			this.setTimer("hide", e.proxy(function () {
				this.clearTimer("hide"),
				this.clearTimer("fadeTransition"),
				this.hide()
			},
			this), this.options.hideDelay || 1)
		}
		function B(e) {
			this[this.visible() ? "hide": "show"](e)
		}
		function F() {
			return this.getState("visible")
		}
		function I() {
			this.setState("active", !0),
			this.getState("visible") && this.raise(),
			this.options.hideAfter && this.clearTimer("idle")
		}
		function q() {
			this.setState("active", !1),
			this.options.hideAfter && this.setTimer("idle", e.proxy(function () {
				this.clearTimer("idle"),
				this.getState("active") || this.hide()
			},
			this), this.options.hideAfter)
		}
		var k = function (t) {
			if (!this.visible()) return;
			var n;
			if (this.options.target == "mouse") {
				var i = C.Position.isPointerEvent(t),
				s = C.Position.mouseBuffer;
				if (!i) {
					if (s.x || s.y) this._cache.event = {
						x: s.x,
						y: s.y
					};
					else if (!this._cache.event) {
						var o = C.Position.getAbsoluteOffset(this.element);
						this._cache.event = {
							x: o.left,
							y: o.top
						}
					}
					n = null
				} else s.x || s.y ? (this._cache.event = {
					x: s.x,
					y: s.y
				},
				n = null) : n = t
			} else n = this.target;
			C.Position.set(this, this.options.hook.tooltip, n, this.options.hook.target);
			if (t && C.Position.isPointerEvent(t)) {
				var u = {
					width: e(this.container).outerWidth(),
					height: e(this.container).outerHeight()
				},
				a = r.pointer(t),
				o = r.element.cumulativeOffset(this.container);
				a.x >= o.left && a.x <= o.left + u.width && a.y >= o.top && a.y <= o.top + u.height && r.defer(e.proxy(function () {
					this.clearTimer("hide")
				},
				this))
			}
		};
		return {
			build: y,
			_preBuild: m,
			_buildSkin: g,
			createPreBuildObservers: c,
			createPostBuildObservers: h,
			show: _,
			hide: D,
			_hide: P,
			toggle: B,
			visible: F,
			showDelayed: M,
			hideDelayed: H,
			setFadeDuration: O,
			setState: a,
			getState: l,
			setActive: I,
			setIdle: q,
			getTimer: n,
			setTimer: t,
			clearTimer: i,
			clearTimers: s,
			setEvent: o,
			clearEvents: u,
			setHookPositionAndStemCorrection: p,
			setHookPosition: d,
			resetHookPosition: v,
			refresh: A,
			update: x,
			ajaxUpdate: T,
			insertSpinner: N,
			position: k,
			raise: L,
			_restoreInlineContent: E,
			remove: S
		}
	} ()),
	Tipped.init()
})(jQuery)