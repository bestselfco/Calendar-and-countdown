/*!
 * Tipped - The jQuery Tooltip - v3.2.0
 * (c) 2010-2013 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/tipped
 *
 * License: http://projects.nickstakenburg.com/tipped/license
 */
;var Tipped = { version: '3.2.0' };

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

!
function (a) {
	function c(a, b) {
		var c = [a, b];
		return c.left = a,
		c.top = b,
		c
	}
	function f(a) {
		window.console && console[console.warn ? "warn": "log"](a)
	}
	function j(a) {
		this.element = a
	}
	function k(a) {
		var b = {};
		for (var c in a) b[c] = a[c] + "px";
		return b
	}
	function l(a, b) {
		return Math.sqrt(a * a + b * b)
	}
	function m(a) {
		return 180 * a / Math.PI
	}
	function n(a) {
		return a * Math.PI / 180
	}
	function o(a) {
		return 1 / Math.cos(a)
	}
	function v(b) {
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
	}
	function x(b, c) {
		this.element = b,
		this.element && c && (this.options = a.extend({
			blur: 3,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		arguments[2] || {}), this._globalAlpha = this.options.globalAlpha, this._cache = {},
		this.uid = a(b).data("tipped-uid"), w.add(this), this.build())
	}
	function z(b) {
		this.element = b,
		this.element && (this.options = a.extend({
			blur: 5,
			offset: {
				x: 0,
				y: 0
			},
			color: "#000",
			opacity: .5,
			globalAlpha: 1
		},
		arguments[1] || {}), this._globalAlpha = this.options.globalAlpha, this.uid = a(b).data("tipped-uid"), y.add(this), this.build())
	}
	function A(b, c) {
		for (var d in c) c[d] && c[d].constructor && c[d].constructor === Object ? (b[d] = a.extend({},
		b[d]) || {},
		A(b[d], c[d])) : b[d] = c[d];
		return b
	}
	function C(b, c) {
		if (this.element = b, this.element) {
			var e = a(b).data("tipped-uid");
			e && B.remove(b),
			e = h(),
			a(b).data("tipped-uid", e),
			this.uid = e;
			var f;
			"object" != a.type(c) || d.isElement(c) ? f = arguments[2] || {}: (f = c, c = null),
			this.options = B.createOptions(f);
			var g = b.getAttribute("title");
			if (!c) {
				var i = b.getAttribute("data-tipped");
				i ? c = i: g && (c = g)
			}
			g && (a(b).data("tipped_restore_title", g), b.setAttribute("title", "")),
			this.content = c,
			this.zIndex = this.options.zIndex || +B.options.startingZIndex,
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
			var j = this.options.target;
			this.target = "mouse" == j ? "mouse": "self" != j && j ? d.isElement(j) ? j: j && document.getElementById(j) || this.element: this.element,
			this._preBuild(),
			B.add(this)
		}
	}
	var b = Array.prototype.slice,
	d = {
		wrap: function (c, d) {
			var e = c;
			return function () {
				var c = [a.proxy(e, this)].concat(b.call(arguments));
				return d.apply(this, c)
			}
		},
		isElement: function (a) {
			return a && 1 == a.nodeType
		},
		delay: function (a, c) {
			var d = b.call(arguments, 2);
			return setTimeout(function () {
				return a.apply(a, d)
			},
			c)
		},
		defer: function (a) {
			return d.delay.apply(this, [a, 1].concat(b.call(arguments, 1)))
		},
		pointer: function (a) {
			return {
				x: a.pageX,
				y: a.pageY
			}
		},
		element: {
			cumulativeScrollOffset: function (a) {
				var b = 0,
				d = 0;
				do b += a.scrollTop || 0,
				d += a.scrollLeft || 0,
				a = a.parentNode;
				while (a);
				return c(d, b)
			},
			cumulativeOffset: function (b) {
				var e = a(b).offset(),
				f = d.element.cumulativeScrollOffset(b),
				g = {
					top: a(window).scrollTop(),
					left: a(window).scrollLeft()
				};
				return e.left += f.left - g.left,
				e.top += f.top - g.top,
				c(e.left, e.top)
			},
			isAttached: function () {
				function a(a) {
					for (var b = a; b && b.parentNode;) b = b.parentNode;
					return b
				}
				return function (b) {
					var c = a(b);
					return ! (!c || !c.body)
				}
			} ()
		}
	},
	e = function (a) {
		function b(b) {
			var c = new RegExp(b + "([\\d.]+)").exec(a);
			return c ? parseFloat(c[1]) : !0
		}
		return {
			IE: !(!window.attachEvent || -1 !== a.indexOf("Opera")) && b("MSIE "),
			Opera: a.indexOf("Opera") > -1 && ( !! window.opera && opera.version && parseFloat(opera.version()) || 7.55),
			WebKit: a.indexOf("AppleWebKit/") > -1 && b("AppleWebKit/"),
			Gecko: a.indexOf("Gecko") > -1 && -1 === a.indexOf("KHTML") && b("rv:"),
			MobileSafari: !!a.match(/Apple.*Mobile.*Safari/),
			Chrome: a.indexOf("Chrome") > -1 && b("Chrome/")
		}
	} (navigator.userAgent),
	g = {
		scripts: {
			jQuery: {
				required: "1.4.4",
				available: window.jQuery && jQuery.fn.jquery
			}
		},
		check: function () {
			function b(b) {
				for (var c = b.match(a), d = c && c[1] && c[1].split(".") || [], e = 0, f = 0, g = d.length; g > f; f++) e += parseInt(d[f] * Math.pow(10, 6 - 2 * f));
				return c && c[3] ? e - 1 : e
			}
			var a = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
			return function (a) {
				this.scripts[a].checked || (this.scripts[a].checked = !0, (!this.scripts[a].available || b(this.scripts[a].available) < b(this.scripts[a].required) && !this.scripts[a].notified) && (this.scripts[a].notified = !0, f("Tipped requires " + a + " >= " + this.scripts[a].required)))
			}
		} ()
	},
	h = function () {
		var a = 0,
		b = "_t_uid_";
		return function (c) {
			for (c = c || b, a++; document.getElementById(c + a);) a++;
			return c + a
		}
	} (),
	i = function () {
		var b = [];
		return {
			get: function (c) {
				for (var d = null, e = 0; e < b.length; e++) b[e] && b[e].url == c.url && b[e].type.toUpperCase() == c.type.toUpperCase() && a.param(b[e].data || {}) == a.param(c.data || {}) && (d = b[e].responseText);
				return d
			},
			set: function (c, d) {
				this.remove(c.url),
				b.push(a.extend({},
				c, {
					responseText: d
				}))
			},
			remove: function (a) {
				for (var c = 0; c < b.length; c++) b[c] && b[c].url == a && delete b[c]
			},
			clear: function () {
				b = []
			}
		}
	} ();
	a.extend(Tipped, function () {
		return {
			support: {
				canvas: function () {
					var a = document.createElement("canvas");
					return ! (!a.getContext || !a.getContext("2d"))
				} (),
				touch: function () {
					try {
						return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
					} catch(a) {
						return ! 1
					}
				} (),
				cssTransitions: function () {
					var b = ["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"],
					c = !!window.TransitionEvent;
					return a.each(b, function (a, b) {
						try {
							document.createEvent(b),
							c = !0
						} catch(d) {}
					}),
					c
				} ()
			},
			init: function () { (this.support.canvas || e.IE) && (g.check("jQuery"), B.UpdateQueue.container && (B.UpdateQueue.container.remove(), B.UpdateQueue.container = null), a(document).ready(function () {
					B.removeAll(),
					B.startDelegating()
				}))
			},
			create: function (a, b, c) {
				return j.create(a, b, c),
				this.get(a)
			},
			get: function (a) {
				return new j(a)
			},
			findElement: function (a) {
				return B.findElement(a)
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
				return B.hideAll(),
				this
			},
			setDefaultSkin: function (a) {
				return B.setDefaultSkin(a),
				this
			},
			setStartingZIndex: function (a) {
				return B.setStartingZIndex(a),
				this
			},
			visible: function (b) {
				if (d.isElement(b)) return B.isVisibleByElement(b);
				if ("undefined" != a.type(b)) {
					var c = a(b),
					e = 0;
					return a.each(c, function (a, b) {
						B.isVisibleByElement(b) && e++
					}),
					e
				}
				return B.getVisible().length
			},
			clearAjaxCache: function () {
				return B.clearAjaxCache(),
				this
			}
		}
	} ()),
	a.extend(j, {
		create: function (b, c) {
			if (b) {
				var e = arguments[2] || {},
				f = [];
				return B.removeDetached(),
				d.isElement(b) ? f.push(new C(b, c, e)) : a(b).each(function (a, b) {
					f.push(new C(b, c, e))
				}),
				f
			}
		}
	}),
	a.extend(j.prototype, {
		items: function () {
			return B.Position.mouseBuffer = {
				x: 0,
				y: 0
			},
			B.get(this.element)
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
			return B.remove(this.element),
			this
		}
	});
	var p = {
		viewport: function () {
			var b;
			return b = e.MobileSafari ? {
				width: window.innerWidth,
				height: window.innerHeight
			}: {
				height: a(window).height(),
				width: a(window).width()
			}
		}
	},
	q = {
		devicePixelRatio: Math.ceil(Math.min(window.devicePixelRatio ? parseFloat(window.devicePixelRatio) || 1 : 1, 2)),
		init: function () {
			function a(a) {
				var b = a.getContext("2d");
				b.scale(q.devicePixelRatio, q.devicePixelRatio)
			}
			return window.G_vmlCanvasManager && !Tipped.support.canvas && e.IE ?
			function (b) {
				G_vmlCanvasManager.initElement(b),
				a(b)
			}: function (b) {
				a(b)
			}
		} (),
		resize: function (b, c) {
			a(b).attr({
				width: c.width * this.devicePixelRatio,
				height: c.height * this.devicePixelRatio
			}).css(k(c))
		},
		drawRoundedRectangle: function (b) {
			var c = a.extend({
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				radius: 0
			},
			arguments[1] || {}),
			d = c,
			e = d.left,
			f = d.top,
			g = d.width,
			h = d.height,
			i = d.radius;
			return i ? (b.beginPath(), b.moveTo(e + i, f), b.arc(e + g - i, f + i, i, n( - 90), n(0), !1), b.arc(e + g - i, f + h - i, i, n(0), n(90), !1), b.arc(e + i, f + h - i, i, n(90), n(180), !1), b.arc(e + i, f + i, i, n( - 180), n( - 90), !1), b.closePath(), b.fill(), void 0) : (b.fillRect(e, f, g, h), void 0)
		},
		drawPixelArray: function (b, c) {
			for (var d = a.extend({
				x: 0,
				y: 0,
				color: "#000"
			},
			arguments[2] || {}), e = 0, f = c.length; f > e; e++) for (var g = 0, h = c[e].length; h > g; g++) {
				var i = parseInt(c[e].charAt(g)) * (1 / 9);
				b.fillStyle = t.hex2fill(d.color, i),
				i && b.fillRect(d.x + g, d.y + e, 1, 1)
			}
		},
		createFillStyle: function (b, c) {
			var d;
			if ("string" == a.type(c)) d = t.hex2fill(c);
			else if ("string" == a.type(c.color)) d = t.hex2fill(c.color, "number" == a.type(c.opacity) ? c.opacity: 1);
			else if (a.isArray(c.color)) {
				var e = a.extend({
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 0
				},
				arguments[2] || {});
				d = q.Gradient.addColorStops(b.createLinearGradient(e.x1, e.y1, e.x2, e.y2), c.color, c.opacity)
			}
			return d
		}
	};
	q.Gradient = {
		addColorStops: function (b, c) {
			for (var d = "number" == a.type(arguments[2]) ? arguments[2] : 1, e = 0, f = c.length; f > e; e++) {
				var g = c[e];
				("undefined" == a.type(g.opacity) || "number" != a.type(g.opacity)) && (g.opacity = 1),
				b.addColorStop(g.position, t.hex2fill(g.color, g.opacity * d))
			}
			return b
		}
	};
	var r = {
		positions: ["topleft", "topmiddle", "topright", "righttop", "rightmiddle", "rightbottom", "bottomright", "bottommiddle", "bottomleft", "leftbottom", "leftmiddle", "lefttop"],
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
			var b = null,
			c = a.toLowerCase().match(this.regex.side);
			return c && c[1] && (b = c[1]),
			b
		},
		split: function (a) {
			return a.toLowerCase().match(this.regex.toOrientation)
		}
	},
	s = {
		getDimensions: function (a) {
			var b = a.options.stem;
			return {
				width: b.width,
				height: b.height
			}
		},
		getBorderDimensions: function (b, c) {
			var d = a.extend({
				math: "ceil"
			},
			arguments[2] || {}),
			e = b.options.stem,
			f = e.width,
			g = e.height,
			h = this.getCenterBorderDimensions(f, g, c);
			return d.math && (h.width = Math[d.math](h.width), h.height = Math[d.math](h.height)),
			{
				width: h.width,
				height: h.height
			}
		},
		getCenterBorderDimensions: function (a, b, c) {
			var d = m(Math.atan(.5 * (b / a))),
			e = 180 - d,
			f = Math.cos(n(e - 90)) * c,
			g = a + 2 * f,
			h = g * b / a;
			return {
				width: g,
				height: h
			}
		},
		getLayout: function (a, b) {
			var c = this.getBorderDimensions(a, b),
			d = this.getDimensions(a),
			f = (r.isCenter(a._hookPosition), Math.ceil(c.height + b));
			return a.options.stem.offset || 0,
			a.options.radius && a.options.radius.size || 0,
			{
				box: {
					dimensions: {
						width: Math.ceil(c.width),
						height: Math.ceil(f)
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
			var f = b.options,
			g = {
				top: 0,
				left: 0
			},
			h = {
				top: 0,
				left: 0
			},
			i = a.extend({},
			c),
			j = b.border,
			k = k || this.getLayout(b, b.border),
			l = k.box.dimensions;
			d && (l.height = d, j = 0);
			var m = r.split(b._hookPosition),
			n = r.getOrientation(b._hookPosition);
			if (b.options.stem) {
				var o = r.getSide(b._hookPosition);
				if ("top" == o ? g.top = l.height - j: "left" == o && (g.left = l.height - j), "horizontal" == n) {
					switch (m[2]) {
					case "middle":
					case "center":
						h.left = .5 * i.width;
						break;
					case "right":
						h.left = i.width
					}
					"bottom" == m[1] && (h.top = i.height - j + l.height)
				} else {
					switch (m[2]) {
					case "middle":
					case "center":
						h.top = .5 * i.height;
						break;
					case "bottom":
						h.top = i.height
					}
					"right" == m[1] && (h.left = i.width - j + l.height)
				}
				i[r.toDimension(o)] += l.height - j
			} else if ("horizontal" == n) {
				switch (m[2]) {
				case "middle":
				case "center":
					h.left = .5 * i.width;
					break;
				case "right":
					h.left = i.width
				}
				"bottom" == m[1] && (h.top = i.height)
			} else {
				switch (m[2]) {
				case "middle":
				case "center":
					h.top = .5 * i.height;
					break;
				case "bottom":
					h.top = i.height
				}
				"right" == m[1] && (h.left = i.width)
			}
			var p = f.radius && f.radius.size || 0,
			q = f.border && f.border.size || 0;
			if (b.options.stem) {
				var t = p && "background" == f.radius.position ? p: 0,
				u = p && "border" == f.radius.position ? p: p + q,
				v = q + t + .5 * k.stem.dimensions.width - .5 * k.border.dimensions.width,
				w = u > v ? u - v: 0,
				x = Math.ceil(q + t + .5 * k.stem.dimensions.width + w);
				if ("horizontal" == n) switch (m[2]) {
				case "left":
					h.left += x;
					break;
				case "right":
					h.left -= x
				} else switch (m[2]) {
				case "top":
					h.top += x;
					break;
				case "bottom":
					h.top -= x
				}
			}
			var y;
			if (f.stem && (y = f.stem.offset)) {
				var z = s.nullifyCornerOffset(y, b._stemPosition, c, k.border.dimensions, q, p);
				if (y = z.offset, z.correction, "horizontal" == n) switch (m[2]) {
				case "left":
					h.left += y.x;
					break;
				case "right":
					h.left -= y.x
				} else switch (m[2]) {
				case "top":
					h.top += y.y;
					break;
				case "bottom":
					h.top -= y.y
				}
			}
			var B;
			if (f.stem && (B = f.stem.spacing)) if ("horizontal" == n) switch (m[1]) {
			case "top":
				h.top -= B;
				break;
			case "bottom":
				h.top += B
			} else switch (m[1]) {
			case "left":
				h.left -= B;
				break;
			case "right":
				h.left += B
			}
			return {
				dimensions: i,
				position: {
					top: 0,
					left: 0
				},
				background: {
					position: g,
					dimensions: c
				},
				stem: {
					dimensions: l
				},
				anchor: h
			}
		},
		nullifyCornerOffset: function (b, c, d, e, f, g) {
			var h = r.getOrientation(c),
			i = a.extend({},
			b),
			j = {
				x: 0,
				y: 0
			},
			k = 0;
			return "horizontal" == h && (k = d.width - e.width - 2 * f - 2 * g) < 2 * b.x && (j.x = i.x, /(right)$/.test(c) && (j.x *= -1), i.x = 0),
			"vertical" == h && (k = d.height - e.height - 2 * f - 2 * g) < 2 * b.y && (j.y = i.y, /(bottom)$/.test(c) && (j.y *= -1), i.y = 0),
			{
				offset: i,
				correction: j
			}
		}
	},
	t = function () {
		function d(a) {
			var b = a;
			return b.red = a[0],
			b.green = a[1],
			b.blue = a[2],
			b
		}
		function e(a) {
			return parseInt(a, 16)
		}
		function f(a) {
			var b = new Array(3);
			if (0 == a.indexOf("#") && (a = a.substring(1)), a = a.toLowerCase(), "" != a.replace(c, "")) return null;
			3 == a.length ? (b[0] = a.charAt(0) + a.charAt(0), b[1] = a.charAt(1) + a.charAt(1), b[2] = a.charAt(2) + a.charAt(2)) : (b[0] = a.substring(0, 2), b[1] = a.substring(2, 4), b[2] = a.substring(4));
			for (var f = 0; f < b.length; f++) b[f] = e(b[f]);
			return d(b)
		}
		function g(a, b) {
			var c = f(a);
			return c[3] = b,
			c.opacity = b,
			c
		}
		function h(b, c) {
			return "undefined" == a.type(c) && (c = 1),
			"rgba(" + g(b, c).join() + ")"
		}
		function i(a) {
			return "#" + (j(a)[2] > 50 ? "000": "fff")
		}
		function j(a) {
			return k(f(a))
		}
		function k(a) {
			var f, g, h, a = d(a),
			b = a.red,
			c = a.green,
			e = a.blue,
			i = b > c ? b: c;
			e > i && (i = e);
			var j = c > b ? b: c;
			if (j > e && (j = e), h = i / 255, g = 0 != i ? (i - j) / i: 0, 0 == g) f = 0;
			else {
				var k = (i - b) / (i - j),
				l = (i - c) / (i - j),
				m = (i - e) / (i - j);
				f = b == i ? m - l: c == i ? 2 + k - m: 4 + l - k,
				f /= 6,
				0 > f && (f += 1)
			}
			f = Math.round(360 * f),
			g = Math.round(100 * g),
			h = Math.round(100 * h);
			var n = [];
			return n[0] = f,
			n[1] = g,
			n[2] = h,
			n.hue = f,
			n.saturation = g,
			n.brightness = h,
			n
		}
		var b = "0123456789abcdef",
		c = new RegExp("[" + b + "]", "g");
		return {
			hex2rgb: f,
			hex2fill: h,
			getSaturatedBW: i
		}
	} (),
	u = {
		skins: {},
		get: function (b) {
			if (!b) return null;
			var c = null,
			d = a(b).data("tipped-uid");
			return d && (c = this.skins[d]),
			c
		},
		add: function (a) {
			this.skins[a.uid] = a
		},
		remove: function (a) {
			var b = this.get(a);
			b && (delete this.skins[b.uid], b.remove())
		}
	};
	a.extend(v.prototype, function () {
		function b() {
			this._cache.hook = {};
			var b = this._hookPosition;
			a.each(r.positions, a.proxy(function (b, c) {
				var d, e = this._cache.hook[c] = {};
				this._hookPosition = c;
				var f = this.getOrderLayout();
				d = f,
				e.anchor = d.anchor;
				var g = d.bubble.dimensions,
				h = {
					top: d.bubble.position.top,
					left: d.bubble.position.left
				};
				if (e.bubble = {
					dimensions: g,
					position: h
				},
				e.tooltip = {
					dimensions: d.skin.dimensions
				},
				this.shadow) {
					var i = this.shadow.getOrderLayout(),
					j = i.skin.position,
					k = e.bubble.position;
					a.extend(!0, e, {
						anchor: i.anchor,
						bubble: {
							position: {
								top: k.top + j.top,
								left: k.left + j.left
							}
						},
						tooltip: {
							dimensions: i.tooltip.dimensions
						}
					})
				}
			},
			this)),
			this._hookPosition = b
		}
		function c() {
			this.cleanup(),
			this.options.shadow && (w.remove(this.element), this.options.closeButton && this.options.closeButton.shadow && y.remove(this.element)),
			this.iframeShim && (this.iframeShim.remove(), this.iframeShim = null),
			this.container && (a(this.container).remove(), this.container = null)
		}
		function d() {
			this.bubble && (this.closeButton && (a(this.closeButton).remove(), this.closeButton = null, this.defaultCloseButton = null, this.hoverCloseButton = null), a(this.bubble).remove(), this.stem = null, this.background = null, this.bubble = null, this._cache = {})
		}
		function f() {
			var a = this.getTooltip();
			this.contentDimensions = a._cache.contentDimensions;
			var b = a.options;
			this.radius = b.radius && b.radius.size || 0,
			this.border = b.border && b.border.size || 0,
			this.padding = b.padding;
			var c = Math.min(this.contentDimensions.height, this.contentDimensions.width);
			this.radius > c / 2 && (this.radius = Math.floor(c / 2)),
			"border" == this.options.radius.position && this.radius > this.border && (this.border = this.radius),
			this._cache = {
				options: {
					radius: this.radius,
					border: this.border,
					padding: this.padding
				}
			}
		}
		function g() {
			this.cleanup(),
			window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document);
			var b = this.getTooltip(),
			c = this.options;
			this.bubble = a("<div>").addClass("t_Bubble")[0],
			a(b.skinElement).append(this.bubble),
			this.prepare(),
			this.drawBubble(b),
			c.closeButton && (this.drawCloseButton(b), c.closeButton.shadow && (this.closeButtonShadow ? (this.closeButtonShadow.options = c.closeButton.shadow, this.closeButtonShadow.build()) : this.closeButtonShadow = new z(this.element, a.extend({
				globalAlpha: this._globalAlpha
			},
			c.closeButton.shadow)))),
			e.IE && e.IE < 7 && a(b.container).prepend(this.iframeShim = a("<iframe>").addClass("t_iframeShim").attr({
				frameBorder: 0,
				src: "javascript:'';"
			})),
			this.order(),
			c.shadow && (this.shadow ? (this.shadow.options = c.shadow, this.shadow.build()) : this.shadow = new x(this.element, this, a.extend({
				globalAlpha: this._globalAlpha
			},
			c.shadow))),
			this.createHookCache()
		}
		function h() {
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
				var h = B.UpdateQueue.getMeasureElementDimensions(d);
				b.options.maxWidth && "number" == a.type(b.options.maxWidth) && h.width > b.options.maxWidth && (a(d).css({
					width: b.options.maxWidth + "px"
				}), h = B.UpdateQueue.getMeasureElementDimensions(d)),
				b.getState("visible") || a(b.container).hide(),
				b._cache.contentDimensions = h,
				c.css({
					left: f + "px",
					top: e + "px",
					width: g + "px"
				}),
				this.build()
			}
		}
		function i(a, b, c) {
			var d = !1;
			this.setHookPosition(a) && (d = !0),
			this.setStemCorrection(b) && (d = !0),
			c && this.setAdjustment(c) && (d = !0),
			d && this.build()
		}
		function j(a) {
			var b = !1;
			return (this._adjustment.left != a.left || this._adjustment.top != a.top) && (b = !0, this._adjustment = a),
			b
		}
		function l(a) {
			var b = !1;
			return (this._stemCorrection.x != a.x || this._stemCorrection.y != a.y) && (b = !0, this._stemCorrection = a),
			b
		}
		function m(a) {
			var c = !1;
			return this._hookPosition != a && (c = !0, this._hookPosition = a),
			c
		}
		function o() {
			return B.get(this.element)[0]
		}
		function p() {
			return s.getLayout(this, this.border)
		}
		function u() {
			var b = this.getTooltip().options.closeButton,
			c = b.diameter + 2 * b.border;
			a(this.defaultCloseButton).css({
				left: -1 * c + "px"
			}),
			a(this.hoverCloseButton).css({
				left: 0
			})
		}
		function v() {
			var b = this.getTooltip().options.closeButton,
			c = b.diameter + 2 * b.border;
			a(this.defaultCloseButton).css({
				left: 0
			}),
			a(this.hoverCloseButton).css({
				left: c + "px"
			})
		}
		function A(b) {
			var c = b.options.closeButton,
			d = {
				width: c.diameter + 2 * c.border,
				height: c.diameter + 2 * c.border
			};
			a(b.container).append(a(this.closeButton = document.createElement("div")).addClass("t_Close").css(k(d)).append(a(this.closeButtonShift = document.createElement("div")).addClass("t_CloseButtonShift").css(k(d)))),
			this.drawCloseButtonState(b, "default"),
			this.drawCloseButtonState(b, "hover"),
			Tipped.support.touch || e.Chrome || a(this.closeButton).bind("mouseenter", a.proxy(this.closeButtonMouseover, this)).bind("mouseleave", a.proxy(this.closeButtonMouseout, this))
		}
		function C(b, c) {
			var d = b.options.closeButton,
			e = d.diameter,
			f = d.border || 0,
			g = d.x.diameter,
			h = d.x.size,
			j = (d.x.lineCap, d.states[c || "default"]),
			l = {
				width: e + 2 * f,
				height: e + 2 * f
			};
			g >= e && (g = e - 2);
			var m;
			a(this.closeButtonShift).append(a(this[c + "CloseButton"] = document.createElement("div")).addClass("t_CloseState").css(a.extend(k(l), {
				left: ("hover" == c ? l.width: 0) + "px"
			}))),
			a(document.body).append(a(m = document.createElement("canvas"))),
			q.resize(m, l),
			q.init(m);
			var o = m.getContext("2d");
			o.globalAlpha = this._globalAlpha,
			a(this[c + "CloseButton"]).append(m),
			o.translate(l.width / 2, l.height / 2),
			o.fillStyle = q.createFillStyle(o, j.background, {
				x1: 0,
				y1: 0 - e / 2,
				x2: 0,
				y2: 0 + e / 2
			}),
			o.beginPath(),
			o.arc(0, 0, e / 2, 0, 2 * Math.PI, !0),
			o.closePath(),
			o.fill(),
			f && (o.fillStyle = q.createFillStyle(o, j.border, {
				x1: 0,
				y1: 0 - e / 2 - f,
				x2: 0,
				y2: 0 + e / 2 + f
			}), o.beginPath(), o.arc(0, 0, e / 2, Math.PI, 0, !1), o.lineTo((e + f) / 2, 0), o.arc(0, 0, e / 2 + f, 0, Math.PI, !0), o.arc(0, 0, e / 2 + f, Math.PI, 0, !0), o.lineTo(e / 2, 0), o.arc(0, 0, e / 2, 0, Math.PI, !1), o.closePath(), o.fill());
			var p = g / 2,
			r = h / 2;
			if (r > p) {
				var s = r;
				r = p,
				p = s
			}
			o.fillStyle = t.hex2fill(j.x.color || j.x, j.x.opacity || 1),
			o.rotate(n(45)),
			o.beginPath(),
			o.moveTo(0, 0),
			o.lineTo(0, p);
			for (var u = 0; 4 > u; u++) o.lineTo(0, p),
			o.lineTo(r, p),
			o.lineTo(r, p - (p - r)),
			o.lineTo(p, r),
			o.lineTo(p, 0),
			o.rotate(n(90));
			o.closePath(),
			o.fill()
		}
		function D(b) {
			var l, m, o, p, q, c = a.extend({
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
			d = c.layout,
			e = c.stemLayout,
			f = c.cornerOffset,
			g = c.border,
			h = c.radius,
			i = c.hookPosition,
			j = d.background.position,
			k = d.background.dimensions,
			t = {
				x: Math.abs(this._stemCorrection.x),
				y: Math.abs(this._stemCorrection.y)
			},
			u = {
				x: 0,
				y: 0
			},
			v = {
				x: 0,
				y: 0
			};
			if (e) {
				l = e.stem.dimensions,
				m = e.box.position,
				o = e.box.dimensions,
				p = o.width - l.width;
				var w = c.borderRadius,
				x = g + h + .5 * l.width - .5 * e.border.dimensions.width;
				q = Math.ceil(w > x ? w - x: 0);
				var y = s.nullifyCornerOffset(f, i, k, e.border.dimensions, g, h);
				f = y.offset,
				v = y.correction,
				u = {
					x: Math.max(k.width - 2 * Math.max(q, f.x || 0) - e.border.dimensions.width - (2 * h || 0), 0),
					y: Math.max(k.height - 2 * Math.max(q, f.y || 0) - e.border.dimensions.height - (2 * h || 0), 0)
				},
				r.isCenter(i) && (u.x *= .5, u.y *= .5),
				t.x = Math.min(t.x, u.x),
				t.y = Math.min(t.y, u.y),
				r.isCenter(i) && (this._stemCorrection.x < 0 && t.x > 0 && (t.x *= -1), this._stemCorrection.y < 0 && t.y > 0 && (t.y *= -1)),
				this._adjustment && this._adjustment.sides && a.each(this._adjustment.sides, function (b, c) {
					a.each("top right bottom left".split(" "), function (a, b) {
						c == b && new RegExp("(" + b + ")$").test(i) && (t[/^(left|right)$/.test(b) ? "x": "y"] = 0)
					})
				})
			}
			var z, A;
			if (h ? (z = j.left + g + h, A = j.top + g) : (z = j.left + g, A = j.top + g), f && f.x && /^(topleft|lefttop)$/.test(i) && (z += f.x), c.beginPath && b.beginPath(), b.moveTo(z, A), c.stem) switch (i) {
			case "topleft":
				z = j.left + g,
				h && (z += h),
				z += Math.max(q, f.x || 0),
				z += t.x,
				b.lineTo(z, A),
				A -= l.height,
				z += .5 * l.width,
				b.lineTo(z, A),
				A += l.height,
				z += .5 * l.width,
				b.lineTo(z, A);
				break;
			case "topmiddle":
			case "topcenter":
				z = j.left + .5 * k.width - .5 * l.width,
				z += t.x,
				b.lineTo(z, A),
				A -= l.height,
				z += .5 * l.width,
				b.lineTo(z, A),
				A += l.height,
				z += .5 * l.width,
				b.lineTo(z, A),
				z = j.left + .5 * k.width - .5 * o.width,
				b.lineTo(z, A);
				break;
			case "topright":
				z = j.left + k.width - g - l.width,
				h && (z -= h),
				z -= Math.max(q, f.x || 0),
				z -= t.x,
				b.lineTo(z, A),
				A -= l.height,
				z += .5 * l.width,
				b.lineTo(z, A),
				A += l.height,
				z += .5 * l.width,
				b.lineTo(z, A)
			}
			if (h ? h && (b.arc(j.left + k.width - g - h, j.top + g + h, h, n( - 90), n(0), !1), z = j.left + k.width - g, A = j.top + g + h) : (z = j.left + k.width - g, A = j.top + g, b.lineTo(z, A)), c.stem) switch (i) {
			case "righttop":
				A = j.top + g,
				h && (A += h),
				A += Math.max(q, f.y || 0),
				A += t.y,
				b.lineTo(z, A),
				z += l.height,
				A += .5 * l.width,
				b.lineTo(z, A),
				z -= l.height,
				A += .5 * l.width,
				b.lineTo(z, A);
				break;
			case "rightmiddle":
			case "rightcenter":
				A = j.top + .5 * k.height - .5 * l.width,
				A += t.y,
				b.lineTo(z, A),
				z += l.height,
				A += .5 * l.width,
				b.lineTo(z, A),
				z -= l.height,
				A += .5 * l.width,
				b.lineTo(z, A);
				break;
			case "rightbottom":
				A = j.top + k.height - g,
				h && (A -= h),
				A -= l.width,
				A -= Math.max(q, f.y || 0),
				A -= t.y,
				b.lineTo(z, A),
				z += l.height,
				A += .5 * l.width,
				b.lineTo(z, A),
				z -= l.height,
				A += .5 * l.width,
				b.lineTo(z, A)
			}
			if (h ? h && (b.arc(j.left + k.width - g - h, j.top + k.height - g - h, h, n(0), n(90), !1), z = j.left + k.width - g - h, A = j.top + k.height - g) : (z = j.left + k.width - g, A = j.top + k.height - g, b.lineTo(z, A)), c.stem) switch (i) {
			case "bottomright":
				z = j.left + k.width - g,
				h && (z -= h),
				z -= Math.max(q, f.x || 0),
				z -= t.x,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A += l.height,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A -= l.height,
				b.lineTo(z, A);
				break;
			case "bottommiddle":
			case "bottomcenter":
				z = j.left + .5 * k.width + .5 * l.width,
				z += t.x,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A += l.height,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A -= l.height,
				b.lineTo(z, A);
				break;
			case "bottomleft":
				z = j.left + g + l.width,
				h && (z += h),
				z += Math.max(q, f.x || 0),
				z += t.x,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A += l.height,
				b.lineTo(z, A),
				z -= .5 * l.width,
				A -= l.height,
				b.lineTo(z, A)
			}
			if (h ? h && (b.arc(j.left + g + h, j.top + k.height - g - h, h, n(90), n(180), !1), z = j.left + g, A = j.top + k.height - g - h) : (z = j.left + g, A = j.top + k.height - g, b.lineTo(z, A)), c.stem) switch (i) {
			case "leftbottom":
				A = j.top + k.height - g,
				h && (A -= h),
				A -= Math.max(q, f.y || 0),
				A -= t.y,
				b.lineTo(z, A),
				z -= l.height,
				A -= .5 * l.width,
				b.lineTo(z, A),
				z += l.height,
				A -= .5 * l.width,
				b.lineTo(z, A);
				break;
			case "leftmiddle":
			case "leftcenter":
				A = j.top + .5 * k.height + .5 * l.width,
				A += t.y,
				b.lineTo(z, A),
				z -= l.height,
				A -= .5 * l.width,
				b.lineTo(z, A),
				z += l.height,
				A -= .5 * l.width,
				b.lineTo(z, A);
				break;
			case "lefttop":
				A = j.top + g + l.width,
				h && (A += h),
				A += Math.max(q, f.y || 0),
				A += t.y,
				b.lineTo(z, A),
				z -= l.height,
				A -= .5 * l.width,
				b.lineTo(z, A),
				z += l.height,
				A -= .5 * l.width,
				b.lineTo(z, A)
			}
			return h ? h && (b.arc(j.left + g + h, j.top + g + h, h, n( - 180), n( - 90), !1), z = j.left + g + h, A = j.top + g, z += 1, b.lineTo(z, A)) : (z = j.left + g, A = j.top + g, b.lineTo(z, A)),
			c.closePath && b.closePath(),
			{
				x: z,
				y: A,
				stem: t,
				corner: v,
				cornerOffset: f
			}
		}
		function E(b) {
			var o, p, q, r, s, t, c = a.extend({
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
			d = c.layout,
			e = c.stemLayout,
			g = (c.stemOffset, c.cornerOffset),
			h = c.border,
			i = c.radius && c.radius.size || 0,
			j = c.backgroundRadius,
			k = c.hookPosition,
			l = d.background.position,
			m = d.background.dimensions,
			u = c.corrections && c.corrections.stem || {
				x: 0,
				y: 0
			};
			if (e) {
				o = e.stem.dimensions,
				p = e.box.position,
				q = e.box.dimensions,
				r = e.border.dimensions,
				s = q.width - o.width;
				var v = h + j + .5 * o.width - .5 * r.width;
				t = Math.ceil(i > v ? i - v: 0)
			}
			var w = l.left + h + j,
			x = l.top + h;
			j && (w += 1),
			a.extend({},
			{
				x: w,
				y: x
			}),
			c.beginPath && b.beginPath();
			var z = a.extend({},
			{
				x: w,
				y: x
			});
			if (x -= h, b.lineTo(w, x), i ? i && (b.arc(l.left + i, l.top + i, i, n( - 90), n( - 180), !0), w = l.left, x = l.top + i) : (w = l.left, x = l.top, b.lineTo(w, x)), c.stem) switch (k) {
			case "lefttop":
				x = l.top + h,
				j && (x += j),
				x -= .5 * r.width,
				x += .5 * o.width,
				x += Math.max(t, g.y || 0),
				x += u.y,
				b.lineTo(w, x),
				w -= r.height,
				x += .5 * r.width,
				b.lineTo(w, x),
				w += r.height,
				x += .5 * r.width,
				b.lineTo(w, x);
				break;
			case "leftmiddle":
			case "leftcenter":
				x = l.top + .5 * m.height - .5 * r.width,
				x += u.y,
				b.lineTo(w, x),
				w -= r.height,
				x += .5 * r.width,
				b.lineTo(w, x),
				w += r.height,
				x += .5 * r.width,
				b.lineTo(w, x);
				break;
			case "leftbottom":
				x = l.top + m.height - h - r.width,
				j && (x -= j),
				x += .5 * r.width,
				x -= .5 * o.width,
				x -= Math.max(t, g.y || 0),
				x -= u.y,
				b.lineTo(w, x),
				w -= r.height,
				x += .5 * r.width,
				b.lineTo(w, x),
				w += r.height,
				x += .5 * r.width,
				b.lineTo(w, x)
			}
			if (i ? i && (b.arc(l.left + i, l.top + m.height - i, i, n( - 180), n( - 270), !0), w = l.left + i, x = l.top + m.height) : (w = l.left, x = l.top + m.height, b.lineTo(w, x)), c.stem) switch (k) {
			case "bottomleft":
				w = l.left + h,
				j && (w += j),
				w -= .5 * r.width,
				w += .5 * o.width,
				w += Math.max(t, g.x || 0),
				w += u.x,
				b.lineTo(w, x),
				x += r.height,
				w += .5 * r.width,
				b.lineTo(w, x),
				x -= r.height,
				w += .5 * r.width,
				b.lineTo(w, x);
				break;
			case "bottommiddle":
			case "bottomcenter":
				w = l.left + .5 * m.width - .5 * r.width,
				w += u.x,
				b.lineTo(w, x),
				x += r.height,
				w += .5 * r.width,
				b.lineTo(w, x),
				x -= r.height,
				w += .5 * r.width,
				b.lineTo(w, x),
				w = l.left + .5 * m.width + r.width,
				b.lineTo(w, x);
				break;
			case "bottomright":
				w = l.left + m.width - h - r.width,
				j && (w -= j),
				w += .5 * r.width,
				w -= .5 * o.width,
				w -= Math.max(t, g.x || 0),
				w -= u.x,
				b.lineTo(w, x),
				x += r.height,
				w += .5 * r.width,
				b.lineTo(w, x),
				x -= r.height,
				w += .5 * r.width,
				b.lineTo(w, x)
			}
			if (i ? i && (b.arc(l.left + m.width - i, l.top + m.height - i, i, n(90), n(0), !0), w = l.left + m.width, x = l.top + m.width + i) : (w = l.left + m.width, x = l.top + m.height, b.lineTo(w, x)), c.stem) switch (k) {
			case "rightbottom":
				x = l.top + m.height - h,
				x += .5 * r.width,
				x -= .5 * o.width,
				j && (x -= j),
				x -= Math.max(t, g.y || 0),
				x -= u.y,
				b.lineTo(w, x),
				w += r.height,
				x -= .5 * r.width,
				b.lineTo(w, x),
				w -= r.height,
				x -= .5 * r.width,
				b.lineTo(w, x);
				break;
			case "rightmiddle":
			case "rightcenter":
				x = l.top + .5 * m.height + .5 * r.width,
				x += u.y,
				b.lineTo(w, x),
				w += r.height,
				x -= .5 * r.width,
				b.lineTo(w, x),
				w -= r.height,
				x -= .5 * r.width,
				b.lineTo(w, x);
				break;
			case "righttop":
				x = l.top + h,
				j && (x += j),
				x += r.width,
				x -= .5 * r.width - .5 * o.width,
				x += Math.max(t, g.y || 0),
				x += u.y,
				b.lineTo(w, x),
				w += r.height,
				x -= .5 * r.width,
				b.lineTo(w, x),
				w -= r.height,
				x -= .5 * r.width,
				b.lineTo(w, x)
			}
			if (i ? i && (b.arc(l.left + m.width - i, l.top + i, i, n(0), n( - 90), !0), w = l.left + m.width - i, x = l.top) : (w = l.left + m.width, x = l.top, b.lineTo(w, x)), c.stem) switch (k) {
			case "topright":
				w = l.left + m.width - h,
				w += .5 * r.width - .5 * o.width,
				j && (w -= j),
				w -= Math.max(t, g.x || 0),
				w -= u.x,
				b.lineTo(w, x),
				x -= r.height,
				w -= .5 * r.width,
				b.lineTo(w, x),
				x += r.height,
				w -= .5 * r.width,
				b.lineTo(w, x);
				break;
			case "topmiddle":
			case "topcenter":
				w = l.left + .5 * m.width + .5 * r.width,
				w += u.x,
				b.lineTo(w, x),
				x -= r.height,
				w -= .5 * r.width,
				b.lineTo(w, x),
				x += r.height,
				w -= .5 * r.width,
				b.lineTo(w, x),
				w = l.left + .5 * m.width - r.width,
				b.lineTo(w, x),
				b.lineTo(w, x);
				break;
			case "topleft":
				w = l.left + h + r.width,
				w -= .5 * r.width,
				w += .5 * o.width,
				j && (w += j),
				w += Math.max(t, g.x || 0),
				w += u.x,
				b.lineTo(w, x),
				x -= r.height,
				w -= .5 * r.width,
				b.lineTo(w, x),
				x += r.height,
				w -= .5 * r.width,
				b.lineTo(w, x)
			}
			b.lineTo(z.x, z.y - h),
			b.lineTo(z.x, z.y),
			c.closePath && b.closePath()
		}
		function F(b) {
			var c = this.getOrderLayout(),
			d = this.options.stem && this.getStemLayout(),
			e = this._hookPosition && this._hookPosition.toLowerCase(),
			f = this.radius,
			h = this.border,
			i = this.padding,
			k = ({
				width: 2 * h + 2 * i + this.contentDimensions.width,
				height: 2 * h + 2 * i + this.contentDimensions.height
			},
			b.options.stem && b.options.stem.offset || {
				x: 0,
				y: 0
			}),
			l = 0,
			m = 0;
			f && (l = "background" == this.options.radius.position ? f: 0, m = "border" == this.options.radius.position ? f: l + h),
			a(document.body).append(this.bubbleCanvas = document.createElement("canvas")),
			q.resize(this.bubbleCanvas, c.bubble.dimensions),
			q.init(this.bubbleCanvas);
			var n = this.bubbleCanvas.getContext("2d");
			n.globalAlpha = this._globalAlpha,
			a(this.bubble).append(this.bubbleCanvas),
			n.fillStyle = q.createFillStyle(n, this.options.background, {
				x1: 0,
				y1: c.background.position.top + h,
				x2: 0,
				y2: c.background.position.top + c.background.dimensions.height - h
			}),
			n.lineWidth = 0;
			var o;
			if (o = this._drawBackgroundPath(n, {
				beginPath: !0,
				closePath: !0,
				border: h,
				radius: l,
				borderRadius: m,
				layout: c,
				stemLayout: d,
				stem: this.options.stem,
				hookPosition: e,
				cornerOffset: k
			}), n.fill(), h) {
				var p = q.createFillStyle(n, this.options.border, {
					x1: 0,
					y1: c.background.position.top,
					x2: 0,
					y2: c.background.position.top + c.background.dimensions.height
				});
				n.fillStyle = p,
				o = this._drawBackgroundPath(n, {
					beginPath: !0,
					closePath: !1,
					border: h,
					radius: l,
					borderRadius: m,
					layout: c,
					stemLayout: d,
					stem: this.options.stem,
					hookPosition: e,
					cornerOffset: k
				}),
				this._drawBorderPath(n, {
					beginPath: !1,
					closePath: !0,
					border: h,
					backgroundRadius: l,
					radius: {
						size: m,
						position: this.options.radius.position
					},
					layout: c,
					stemLayout: d,
					stem: this.options.stem,
					hookPosition: e,
					cornerOffset: o.cornerOffset,
					corrections: o
				}),
				n.fill()
			}
			this._corrections = o
		}
		function G() {
			var i, a = this.getTooltip(),
			b = this.contentDimensions,
			c = a.options,
			d = this.radius,
			f = this.border,
			g = this.padding,
			h = {
				width: 2 * f + 2 * g + b.width,
				height: 2 * f + 2 * g + b.height
			};
			if (this.options.stem) {
				var j = this.getStemLayout();
				i = j.box.dimensions
			}
			var k = s.getBubbleLayout(this, h),
			l = k.dimensions,
			m = k.position,
			h = k.background.dimensions,
			o = k.background.position;
			k.stem.dimensions;
			var r, t, u, q = {
				top: 0,
				left: 0
			},
			v = {
				width: l.width,
				height: l.height
			};
			if (c.closeButton) {
				var w = d;
				"background" == c.radius.position && (w += f);
				var x = w - Math.sin(n(45)) * w,
				y = "right";
				this._hookPosition.toLowerCase().match(/^(topright|righttop)$/) && (y = "left");
				var z = c.closeButton.diameter + 2 * c.closeButton.border,
				r = {
					width: z,
					height: z
				};
				if (q.left = o.left - z / 2 + ("left" == y ? x: h.width - x), q.top = o.top - z / 2 + x, "left" == y) {
					if (q.left < 0) {
						var A = Math.abs(q.left);
						v.width += A,
						m.left += A,
						q.left = 0
					}
				} else {
					var B = q.left + z - v.width;
					B > 0 && (v.width += B)
				}
				if (q.top < 0) {
					var C = Math.abs(q.top);
					v.height += C,
					m.top += C,
					q.top = 0
				}
				if (this.options.closeButton.shadow) {
					var D = this.options.closeButton.shadow,
					E = D.blur,
					F = D.offset;
					if (t = {
						width: r.width + 2 * E,
						height: r.height + 2 * E
					},
					u = {
						top: q.top - E + F.y,
						left: q.left - E + F.x
					},
					"left" == y) {
						if (u.left < 0) {
							var A = Math.abs(u.left);
							v.width += A,
							m.left += A,
							q.left += A,
							u.left = 0
						}
					} else {
						var B = u.left + t.width - v.width;
						B > 0 && (v.width += B)
					}
					if (u.top < 0) {
						var C = Math.abs(u.top);
						v.height += C,
						m.top += C,
						q.top += C,
						u.top = 0
					}
				}
			}
			var G = k.anchor;
			G.top += m.top,
			G.left += m.left;
			var H = {
				left: Math.ceil(m.left + o.left + this.border + this.options.padding),
				top: Math.ceil(m.top + o.top + this.border + this.options.padding)
			},
			I = {
				tooltip: {
					dimensions: {
						width: Math.ceil(v.width),
						height: Math.ceil(v.height)
					}
				},
				skin: {
					dimensions: {
						width: Math.ceil(v.width),
						height: Math.ceil(v.height)
					}
				},
				bubble: {
					dimensions: l,
					position: {
						top: Math.round(m.top),
						left: Math.round(m.left)
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
					top: Math.round(G.top),
					left: Math.round(G.left)
				},
				content: {
					position: H
				}
			};
			return this.options.closeButton && (I.closeButton = {
				dimensions: {
					width: Math.ceil(r.width),
					height: Math.ceil(r.height)
				},
				position: {
					top: Math.round(q.top),
					left: Math.round(q.left)
				}
			},
			this.options.closeButton.shadow && (I.closeButtonShadow = {
				dimensions: {
					width: Math.ceil(t.width),
					height: Math.ceil(t.height)
				},
				position: {
					top: Math.round(u.top),
					left: Math.round(u.left)
				}
			})),
			I
		}
		function H() {
			var b = this.getOrderLayout(),
			c = this.getTooltip();
			a(c.container).css(k(b.tooltip.dimensions)),
			a(c.skinElement).css(k(b.skin.dimensions)),
			this.iframeShim && this.iframeShim.css(k(b.tooltip.dimensions)),
			a(this.bubble).css(a.extend(k(b.bubble.dimensions), k(b.bubble.position))),
			this.closeButton && (a(this.closeButton).css(k(b.closeButton.position)), b.closeButtonShadow && a(this.closeButtonShadow.container).css(k(b.closeButtonShadow.position))),
			a(c.contentElement).css(k(b.content.position))
		}
		function I(a) {
			this._globalAlpha = a || 0,
			this.shadow && (this.shadow._globalAlpha = this._globalAlpha)
		}
		function J(a) {
			this.setGlobalAlpha(a),
			this.build()
		}
		return {
			prepare: f,
			createHookCache: b,
			build: g,
			remove: c,
			cleanup: d,
			getTooltip: o,
			refresh: h,
			setHookPositionAndStemCorrection: i,
			setAdjustment: j,
			setStemCorrection: l,
			setHookPosition: m,
			drawCloseButton: A,
			drawCloseButtonState: C,
			drawBubble: F,
			_drawBackgroundPath: D,
			_drawBorderPath: E,
			closeButtonMouseover: u,
			closeButtonMouseout: v,
			getStemLayout: p,
			getOrderLayout: G,
			order: H,
			setGlobalAlpha: I,
			setOpacity: J
		}
	} ());
	var w = {
		shadows: {},
		get: function (b) {
			if (!b) return null;
			var c = null,
			d = a(b).data("tipped-uid");
			return d && (c = this.shadows[d]),
			c
		},
		add: function (a) {
			this.shadows[a.uid] = a
		},
		remove: function (a) {
			var b = this.get(a);
			b && (delete this.shadows[b.uid], b.remove())
		},
		transition: function (a) {
			return Math.PI / 2 - Math.pow(a, Math.cos(a) * Math.PI)
		}
	};
	w.Stem = {
		getBorderDimensions: function (a, b) {
			var c = u.get(a.element),
			d = c.getStemLayout().border.dimensions,
			e = this.getCenterBorderDimensions(d.width, d.height, b, {
				math: !1
			});
			return {
				width: e.width,
				height: e.height
			}
		},
		getCenterBorderDimensions2: function (a, b, c) {
			var d = .5 * a,
			e = m(Math.acos(d / l(d, b))),
			f = 180 - e - 90,
			g = o(n(f)) * c,
			h = 2 * (d + g),
			i = h / a * b;
			return {
				width: h,
				height: i
			}
		},
		getCenterBorderDimensions: function (a, b, c) {
			var d = m(Math.atan(.5 * (b / a))),
			e = 180 - d,
			f = Math.cos(n(e - 90)) * c,
			g = a + 2 * f,
			h = g * b / a;
			return {
				width: g,
				height: h
			}
		},
		getLayout: function (b) {
			var c = u.get(b.element),
			d = b.options.blur,
			e = r.isCorner(c._hookPosition),
			g = (r.getOrientation(c._hookPosition), w.Stem.getBorderDimensions(b, d)),
			h = {
				box: {
					dimensions: {
						width: Math.ceil(g.width),
						height: Math.ceil(g.height)
					},
					position: {
						top: 0,
						left: 0
					}
				}
			};
			if (d) {
				h.blurs = [];
				for (var i = 0; d >= i; i++) {
					var j = w.Stem.getBorderDimensions(b, i, {
						math: !1
					}),
					k = {
						position: {
							top: h.box.dimensions.height - j.height,
							left: e ? d - i: (h.box.dimensions.width - j.width) / 2
						},
						dimensions: j
					};
					h.blurs.push(k)
				}
			} else h.blurs = [a.extend({},
			h.box)];
			return h
		},
		rotate: function (a, b, c) {
			s.rotate(a, b.getSkin(), c)
		}
	},
	a.extend(x.prototype, function () {
		function b() {
			return B.get(this.element)[0]
		}
		function c() {
			return u.get(this.element)
		}
		function d() {
			this.cleanup()
		}
		function e() {
			this.container && (a(this.container).remove(), this.stem = null, this.background = null, this.bubble = null, this.container = null, this._cache = {})
		}
		function f() {}
		function g() {
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
		}
		function h() {
			return this.options.opacity / (this.options.blur + 1)
		}
		function i() {
			var b = this.getSkin(),
			c = b.getOrderLayout(),
			d = this.getTooltip(),
			e = this.getOrderLayout(),
			f = this.options.blur,
			g = w.Stem.getLayout(this),
			h = b._hookPosition,
			i = r.getSide(h),
			j = {
				top: f,
				left: f
			};
			if (d.options.stem) {
				var l = g.blurs[g.blurs.length - 1];
				"left" == i && (j.left += Math.ceil(l.dimensions.height)),
				"top" == i && (j.top += Math.ceil(l.dimensions.height))
			}
			var m = b._cache.options,
			n = m.radius,
			o = m.border;
			"background" == d.options.radius.position && n && (n += o);
			var p = e.bubble.dimensions;
			a(this.container).append(a(this.bubble = document.createElement("div")).addClass("t_ShadowBubble").css(k(p))).css(k(p)),
			a(document.body).append(a(this.bubbleCanvas = document.createElement("canvas"))),
			q.resize(this.bubbleCanvas, e.bubble.dimensions),
			q.init(this.bubbleCanvas);
			var s = this.bubbleCanvas.getContext("2d");
			s.globalAlpha = this._globalAlpha,
			a(this.bubble).append(this.bubbleCanvas);
			for (var u = f + 1, v = 0; f >= v; v++) s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u)),
			q.drawRoundedRectangle(s, {
				width: c.background.dimensions.width + 2 * v,
				height: c.background.dimensions.height + 2 * v,
				top: j.top - v,
				left: j.left - v,
				radius: n + v
			});
			if (b.options.stem) {
				var x = {
					x: j.left,
					y: j.top
				},
				y = g.blurs[0].dimensions,
				z = b.options.stem,
				A = o;
				A += .5 * z.width;
				var B = b.options.radius && "background" == b.options.radius.position ? b.options.radius.size || 0 : 0;
				B && (A += B);
				var C = o + B + .5 * z.width - .5 * y.width,
				D = Math.ceil(n > C ? n - C: 0),
				E = b._corrections && b._corrections.stem || {
					x: 0,
					y: 0
				},
				F = b._corrections && b._corrections.corner || {
					x: 0,
					y: 0
				};
				if (A += Math.max(D, b.options.stem.offset && b.options.stem.offset[i && /^(left|right)$/.test(i) ? "y": "x"] || 0), "top" == i || "bottom" == i) {
					switch (h) {
					case "topleft":
					case "bottomleft":
						x.x += A + E.x - F.x;
						break;
					case "topmiddle":
					case "topcenter":
					case "bottommiddle":
					case "bottomcenter":
						x.x += .5 * c.background.dimensions.width + E.x;
						break;
					case "topright":
					case "bottomright":
						x.x += c.background.dimensions.width - (A - E.x + F.x)
					}
					"bottom" == i && (x.y += c.background.dimensions.height);
					for (var v = 0, G = g.blurs.length; G > v; v++) {
						s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u));
						var f = g.blurs[v];
						s.beginPath(),
						"top" == i ? (s.moveTo(x.x, x.y - v), s.lineTo(x.x - .5 * f.dimensions.width, x.y - v), s.lineTo(x.x, x.y - v - f.dimensions.height), s.lineTo(x.x + .5 * f.dimensions.width, x.y - v)) : (s.moveTo(x.x, x.y + v), s.lineTo(x.x - .5 * f.dimensions.width, x.y + v), s.lineTo(x.x, x.y + v + f.dimensions.height), s.lineTo(x.x + .5 * f.dimensions.width, x.y + v)),
						s.closePath(),
						s.fill()
					}
				} else {
					switch (h) {
					case "lefttop":
					case "righttop":
						x.y += A + E.y - F.y;
						break;
					case "leftmiddle":
					case "leftcenter":
					case "rightmiddle":
					case "rightcenter":
						x.y += .5 * c.background.dimensions.height + E.y;
						break;
					case "leftbottom":
					case "rightbottom":
						x.y += c.background.dimensions.height - (A - E.y + F.y)
					}
					"right" == i && (x.x += c.background.dimensions.width);
					for (var v = 0, G = g.blurs.length; G > v; v++) {
						s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u));
						var f = g.blurs[v];
						s.beginPath(),
						"left" == i ? (s.moveTo(x.x - v, x.y), s.lineTo(x.x - v, x.y - .5 * f.dimensions.width), s.lineTo(x.x - v - f.dimensions.height, x.y), s.lineTo(x.x - v, x.y + .5 * f.dimensions.width)) : (s.moveTo(x.x + v, x.y), s.lineTo(x.x + v, x.y - .5 * f.dimensions.width), s.lineTo(x.x + v + f.dimensions.height, x.y), s.lineTo(x.x + v, x.y + .5 * f.dimensions.width)),
						s.closePath(),
						s.fill()
					}
				}
			}
		}
		function j() {
			var b = this.getSkin();
			b.contentDimensions,
			b.radius;
			var e = b.getOrderLayout(),
			g = (this.getTooltip(), this.options.blur),
			h = a.extend({},
			e.background.dimensions);
			h.width += 2 * g,
			h.height += 2 * g;
			var i, k;
			if (b.options.stem) {
				var l = w.Stem.getLayout(this);
				i = l.box.dimensions,
				k = i.height
			}
			var m = s.getBubbleLayout(b, h, k),
			n = m.dimensions,
			o = m.position,
			h = m.background.dimensions,
			p = m.background.position,
			r = e.bubble.position,
			t = e.background.position,
			u = {
				top: r.top + t.top - (p.top + g) + this.options.offset.y,
				left: r.left + t.left - (p.left + g) + this.options.offset.x
			},
			v = e.anchor,
			x = e.skin.dimensions,
			y = {
				top: 0,
				left: 0
			};
			if (u.top < 0) {
				var z = Math.abs(u.top);
				y.top += z,
				u.top = 0,
				v.top += z
			}
			if (u.left < 0) {
				var A = Math.abs(u.left);
				y.left += A,
				u.left = 0,
				v.left += A
			}
			var B = {
				height: Math.max(n.height + u.top, x.height + y.top),
				width: Math.max(n.width + u.left, x.width + y.left)
			},
			C = {
				left: Math.ceil(y.left + e.bubble.position.left + e.background.position.left + b.border + b.padding),
				top: Math.ceil(y.top + e.bubble.position.top + e.background.position.top + b.border + b.padding)
			},
			D = {
				tooltip: {
					dimensions: B
				},
				skin: {
					dimensions: x,
					position: y
				},
				container: {
					dimensions: n,
					position: u
				},
				bubble: {
					dimensions: n,
					position: {
						top: Math.round(o.top),
						left: Math.round(o.left)
					}
				},
				background: {
					dimensions: {
						width: Math.ceil(h.width),
						height: Math.ceil(h.height)
					},
					position: {
						top: Math.round(p.top),
						left: Math.round(p.left)
					}
				},
				anchor: v,
				content: {
					position: C
				}
			};
			return D
		}
		function l() {
			var b = this.getOrderLayout(),
			c = this.getSkin(),
			d = this.getTooltip();
			if (a(d.container).css(k(b.tooltip.dimensions)), a(d.skinElement).css(a.extend(k(b.skin.position), k(b.skin.dimensions))), c.iframeShim && c.iframeShim.css(k(b.tooltip.dimensions)), d.options.closeButton) {
				var e = c.getOrderLayout(),
				f = b.skin.position,
				g = e.closeButton.position;
				if (a(c.closeButton).css(k({
					top: f.top + g.top,
					left: f.left + g.left
				})), d.options.closeButton.shadow) {
					var h = e.closeButtonShadow.position;
					a(c.closeButtonShadow.container).css(k({
						top: f.top + h.top,
						left: f.left + h.left
					}))
				}
			}
			a(this.container).css(a.extend(k(b.container.dimensions), k(b.container.position))),
			a(this.bubble).css(k(b.bubble.dimensions)),
			a(d.contentElement).css(k(b.content.position))
		}
		return {
			prepare: f,
			remove: d,
			cleanup: e,
			build: g,
			getTooltip: b,
			getSkin: c,
			getOrderLayout: j,
			getBlurOpacity: h,
			drawBackground: i,
			order: l
		}
	} ());
	var y = {
		shadows: {},
		get: function (b) {
			if (!b) return null;
			var c = a(b).data("tipped-uid");
			return c ? this.shadows[c] : null
		},
		add: function (a) {
			this.shadows[a.uid] = a
		},
		remove: function (a) {
			var b = this.get(a);
			b && (delete this.shadows[b.uid], b.remove())
		}
	};
	a.extend(z.prototype, function () {
		function b() {
			return B.get(this.element)[0]
		}
		function c() {
			return u.get(this.element)
		}
		function d() {
			return this.options.opacity / (this.options.blur + 1)
		}
		function e() {
			this.cleanup()
		}
		function f() {
			this.container && (a(this.container).remove(), this.container = null)
		}
		function g() {
			this.cleanup();
			var c = (this.getTooltip(), this.getSkin()),
			d = c.getOrderLayout().closeButton.dimensions,
			e = a.extend({},
			d),
			f = this.options.blur;
			e.width += 2 * f,
			e.height += 2 * f,
			a(c.closeButton).before(a(this.container = document.createElement("div")).addClass("t_CloseButtonShadow")),
			a(document.body).append(a(this.closeButtonCanvas = document.createElement("canvas"))),
			q.resize(this.closeButtonCanvas, e),
			q.init(this.closeButtonCanvas);
			var g = this.closeButtonCanvas.getContext("2d");
			g.globalAlpha = this._globalAlpha,
			a(this.container).append(this.closeButtonCanvas);
			for (var h = e.width / 2, i = e.height / 2, j = d.height / 2, k = f + 1, l = 0; f >= l; l++) g.fillStyle = t.hex2fill(this.options.color, w.transition(l * (1 / k)) * (this.options.opacity / k)),
			g.beginPath(),
			g.arc(h, i, j + l, n(0), n(360), !0),
			g.closePath(),
			g.fill()
		}
		return {
			build: g,
			remove: e,
			cleanup: f,
			getTooltip: b,
			getSkin: c,
			getBlurOpacity: d
		}
	} ());
	var B = {
		tooltips: {},
		options: {
			defaultSkin: "dark",
			startingZIndex: 999999
		},
		stopDelegating: function () {
			var b = ["click"];
			Tipped.support.touch && (b.push("touchstart"), this._void && a(document.body).unbind("click", this._void), this._void = null),
			a.each(b, function (b, c) {
				a(document.documentElement).undelegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", c)
			}),
			this._onWindowResizeHandler && (a(window).unbind("resize", this._onWindowResizeHandler), this._onWindowResizeHandler = null),
			a(document).unbind("mousemove", B.Position._mouseBufferHandler)
		},
		startDelegating: function () {
			function b() {
				this.stopDelegating();
				var b = ["click"];
				Tipped.support.touch && (b.push("touchstart"), this._void = function () {
					return void 0
				},
				a(document.body).bind("click", this._void)),
				a.each(b, function (b, c) {
					a(document.documentElement).delegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", c, function (b) {
						b.preventDefault(),
						b.stopPropagation(),
						B.getByTooltipElement(a(b.target).closest(".t_Tooltip")[0]).hide()
					})
				}),
				this._onWindowResizeHandler = a.proxy(this.onWindowResize, this),
				a(window).bind("resize", this._onWindowResizeHandler),
				a(document).bind("mousemove", B.Position._mouseBufferHandler)
			}
			return b
		} (),
		onWindowResize: function () {
			this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null),
			this._resizeTimer = d.delay(a.proxy(function () {
				var b = this.getVisible();
				a.each(b, function (a, b) {
					b.position()
				})
			},
			this), 200)
		},
		_getTooltip: function (b) {
			var d, c = a(b).data("tipped-uid");
			if (!c) {
				var e = this.getByTooltipElement(a(b).closest(".t_Tooltip")[0]);
				e && e.element && (c = a(e.element).data("tipped-uid"))
			}
			return c && (d = this.tooltips[c]) ? d: void 0
		},
		findElement: function (a) {
			var b;
			return d.isElement(a) && (b = this._getTooltip(a)),
			b && b.element
		},
		get: function (b) {
			var c = [];
			if (d.isElement(b)) {
				var e = this._getTooltip(b);
				e && (c = [e])
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
			if (d.isElement(b)) {
				var c = b,
				e = this.get(c)[0];
				e && e.show()
			} else a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.show()
			},
			this))
		},
		hide: function (b) {
			if (d.isElement(b)) {
				var c = this.get(b)[0];
				c && c.hide()
			} else a(b).each(a.proxy(function (a, b) {
				var c = this.get(b)[0];
				c && c.hide()
			},
			this))
		},
		toggle: function (b) {
			if (d.isElement(b)) {
				var c = b,
				e = this.get(c)[0];
				e && e.toggle()
			} else a(b).each(a.proxy(function (a, b) {
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
			if (d.isElement(b)) {
				var c = b,
				e = this.get(c)[0];
				e && e.refresh()
			} else a(b).each(a.proxy(function (a, b) {
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
		isVisibleByElement: function (b) {
			var c = !1;
			return d.isElement(b) && a.each(this.getVisible() || [], function (a, d) {
				return d.element == b ? (c = !0, !1) : void 0
			}),
			c
		},
		getHighestTooltip: function () {
			var c, b = 0;
			return a.each(this.tooltips, function (a, d) {
				d.zIndex > b && (b = d.zIndex, c = d)
			}),
			c
		},
		resetZ: function () {
			this.getVisible().length <= 1 && a.each(this.tooltips, function (b, c) {
				c.getState("build") && !c.options.zIndex && a(c.container).css({
					zIndex: c.zIndex = +B.options.startingZIndex
				})
			})
		},
		add: function (a) {
			this.tooltips[a.uid] = a
		},
		_remove: function (b) {
			var c = this._getTooltip(b);
			if (c) {
				var d = a(c.element).data("tipped-uid");
				delete this.tooltips[d],
				c.hide(),
				c.remove()
			}
		},
		remove: function (b) {
			d.isElement(b) ? this._remove(b) : a(b).each(a.proxy(function (a, b) {
				this._remove(b)
			},
			this))
		},
		removeDetached: function () {
			a.each(this.tooltips, a.proxy(function (a, b) {
				b.element && !d.element.isAttached(b.element) && this._remove(b.element)
			},
			this))
		},
		removeAll: function () {
			a.each(this.tooltips, a.proxy(function (a, b) {
				b.element && this._remove(b.element)
			},
			this)),
			this.tooltips = {}
		},
		setDefaultSkin: function (a) {
			this.options.defaultSkin = a || "dark"
		},
		setStartingZIndex: function (a) {
			this.options.startingZIndex = a || 0
		},
		clearAjaxCache: function () {
			a.each(this.tooltips, a.proxy(function (a, b) {
				b._cache && b._cache.xhr && (b._cache.xhr.abort(), b._cache.xhr = null),
				b.setState("updated", !1)
			},
			this)),
			i.clear()
		},
		createOptions: function () {
			function f(d) {
				var e;
				return e = "string" == a.type(d) ? {
					element: c.hideOn && c.hideOn.element || b.hideOn.element,
					event: d
				}: A(a.extend({},
				b.hideOn), d)
			}
			function g(f) {
				return b = Tipped.Skins.base,
				c = A(a.extend({},
				b), Tipped.Skins.reset),
				d = Tipped.Skins.CloseButtons.base,
				e = A(a.extend({},
				d), Tipped.Skins.CloseButtons.reset),
				g = h,
				h(f)
			}
			function h(g) {
				g.skin = g.skin && Tipped.Skins[g.skin] ? g.skin: Tipped.Skins[B.options.defaultSkin] ? B.options.defaultSkin: "dark";
				var h = g.skin ? a.extend({},
				Tipped.Skins[g.skin] || Tipped.Skins[B.options.defaultSkin]) : {},
				i = A(a.extend({},
				c), h),
				j = A(a.extend({},
				i), g);
				if (j.ajax) {
					var k = c.ajax || {},
					l = b.ajax;
					"boolean" == a.type(j.ajax) && (j.ajax = {
						cache: k.cache || l.cache,
						type: k.type || l.type
					}),
					j.ajax = A(a.extend({},
					l), j.ajax)
				}
				if (j.background && "string" == a.type(j.background) && (j.background = {
					color: j.background,
					opacity: 1
				}), j.border) {
					var m, n = c.border || {},
					o = b.border;
					m = "number" == a.type(j.border) ? {
						size: j.border,
						color: n.color || o.color,
						opacity: n.opacity || o.opacity
					}: A(a.extend({},
					o), j.border),
					j.border = 0 === m.size ? !1 : m
				}
				if (j.radius) {
					var p;
					p = "number" == a.type(j.radius) ? {
						size: j.radius,
						position: c.radius && c.radius.position || b.radius.position
					}: A(a.extend({},
					b.radius), j.radius),
					j.radius = 0 === p.size ? !1 : p
				}
				var q, s = s = j.hook && j.hook.target || "string" == a.type(j.hook) && j.hook || c.hook && c.hook.target || "string" == a.type(c.hook) && c.hook || b.hook && b.hook.target || b.hook,
				t = j.hook && j.hook.tooltip || c.hook && c.hook.tooltip || b.hook && b.hook.tooltip || B.Position.getInversedPosition(s);
				if (j.hook ? "string" == a.type(j.hook) ? q = {
					target: j.hook,
					tooltip: B.Position.getTooltipPositionFromTarget(j.hook)
				}: (q = {
					tooltip: t,
					target: s
				},
				j.hook.tooltip && (q.tooltip = j.hook.tooltip), j.hook.target && (q.target = j.hook.target)) : q = {
					tooltip: t,
					target: s
				},
				"mouse" == j.target) {
					var u = r.getOrientation(q.target);
					q.target = "horizontal" == u ? q.target.replace(/(left|right)/, "middle") : q.target.replace(/(top|bottom)/, "middle")
				}
				j.hook = q;
				var v;
				if ("mouse" == j.target ? (v = a.extend({},
				b.offset), a.extend(v, Tipped.Skins.reset.offset || {}), g.skin && a.extend(v, (Tipped.Skins[g.skin] || Tipped.Skins[B.options.defaultSkin]).offset || {}), v = B.Position.adjustOffsetBasedOnHooks(b.offset, b.hook, q.target, !0), g.offset && (v = a.extend(v, g.offset || {})), j.fadeOut = 0) : v = {
					x: j.offset.x,
					y: j.offset.y
				},
				j.offset = v, j.closeButton && j.closeButtonSkin) {
					var w = a.extend({},
					Tipped.Skins.CloseButtons[j.closeButtonSkin]),
					x = A(a.extend({},
					e), w);
					if (x.states && a.each(["default", "hover"], function (b, c) {
						var f = x.states[c],
						g = e.states && e.states[c];
						if (f.background) {
							var h = g && g.background;
							if ("number" == a.type(f.background)) f.background = {
								color: h && h.color || d.states[c].background.color,
								opacity: f.background
							};
							else if ("string" == a.type(f.background)) {
								var i = h && "number" == a.type(h.opacity) && h.opacity || d.states[c].background.opacity;
								f.background = {
									color: f.background,
									opacity: i
								}
							} else f.background = A(a.extend({},
							d.states[c].background), f.background)
						}
						if (f.border) {
							var j = g && g.border;
							f.border = "number" == a.type(f.border) ? {
								color: j && j.color || d.states[c].border.color,
								opacity: f.border
							}: A(a.extend({},
							d.states[c].border), f.border)
						}
					}), x.shadow) {
						var z = e.shadow && e.shadow.constructor && e.shadow.constructor == Object ? e.shadow: d.shadow;
						x.shadow.constructor && x.shadow.constructor == Object && (z = A(z, x.shadow)),
						x.shadow = z
					}
					j.closeButton = x
				}
				if (j.shadow) {
					var C;
					C = "boolean" == a.type(j.shadow) ? c.shadow && "boolean" == a.type(c.shadow) ? b.shadow: c.shadow ? c.shadow: b.shadow: A(a.extend({},
					b.shadow), j.shadow || {}),
					"number" == a.type(C.offset) && (C.offset = {
						x: C.offset,
						y: C.offset
					}),
					j.shadow = C
				}
				if (j.stem) {
					var D = {};
					D = "boolean" == a.type(j.stem) ? A({},
					b.stem) : A(A({},
					b.stem), a.extend({},
					j.stem)),
					"number" == a.type(D.offset) && (D.offset = {
						x: D.offset,
						y: D.offset
					}),
					j.stem = D
				}
				if (j.containment && ("string" == a.type(j.containment) ? j.containment = {
					selector: j.containment,
					flip: !0
				}: "boolean" == a.type(j.containment) && (j.containment = j.containment ? {
					selector: "viewport",
					flip: !0
				}: !1)), j.hideOn && "click-outside" == j.hideOn && (j.hideOnClickOutside = !0, j.hideOn = !1), j.hideOn) if (a.isArray(j.hideOn)) {
					var E = [];
					a.each(j.hideOn, function (a, b) {
						E.push(f(b))
					}),
					j.hideOn = E
				} else j.hideOn = [f(j.hideOn)];
				return j.showOn && "string" == a.type(j.showOn) && (j.showOn = ["" + j.showOn]),
				j.padding = 0,
				j.spinner && (window.Spinners || (j.spinner = !1)),
				j
			}
			var b, c, d, e;
			return g
		} ()
	};
	B.Position = function () {
		function c(c) {
			var d = r.split(c),
			e = d[1],
			f = d[2],
			g = r.getOrientation(c),
			h = a.extend({
				horizontal: !0,
				vertical: !0
			},
			arguments[1] || {});
			return "horizontal" == g ? (h.vertical && (e = b[e]), h.horizontal && (f = b[f])) : (h.vertical && (f = b[f]), h.horizontal && (e = b[e])),
			e + f
		}
		function f(a) {
			var d = r.split(a);
			return c(d[1] + b[d[2]])
		}
		function h(b, c) {
			a(b.container).css({
				top: c.top + "px",
				left: c.left + "px"
			})
		}
		function j(a, b, d, e) {
			var g = y(a, b, d, e),
			h = d && "string" == typeof d.type ? d.type: "";
			if (/move$/.test(h), 1 === g.contained.overlap) return l(a, g),
			g;
			var m = b,
			n = e,
			o = {
				horizontal: !g.contained.horizontal,
				vertical: !g.contained.vertical
			},
			p = {
				horizontal: !1,
				vertical: !1
			},
			q = r.getOrientation(b);
			return ((p.vertical = "horizontal" == q && o.vertical) || (p.horizontal = "vertical" == q && o.horizontal)) && (m = c(b, p), n = c(e, p), g = y(a, m, d, n), 1 === g.contained.overlap) ? (l(a, g), g) : (g = k(g, a), l(a, g), g)
		}
		function k(a, b) {
			var c = z(b),
			d = c.dimensions,
			e = c.position,
			f = u.get(b.element)._cache.hook[a.hook.tooltip].tooltip.dimensions,
			g = a.position,
			h = {
				top: 0,
				left: 0,
				sides: []
			};
			return e.left > g.left && (h.left = e.left - g.left, h.sides.push("left"), a.position.left = e.left),
			e.top > g.top && (h.top = g.top - e.top, h.sides.push("top"), a.position.top = e.top),
			e.left + d.width < g.left + f.width && (h.left = e.left + d.width - (g.left + f.width), h.sides.push("right"), a.position.left = e.left + d.width - f.width),
			e.top + d.height < g.top + f.height && (h.top = e.top + d.height - (g.top + f.height), h.sides.push("bottom"), a.position.top = e.top + d.height - f.height),
			a.adjustment = h,
			a
		}
		function l(a, b) {
			a.setHookPositionAndStemCorrection(b.hook.tooltip, b.contained.correction, b.adjustment),
			h(a, b.position)
		}
		function m(a) {
			return a && (/^mouse|click|touch$/.test("string" == typeof a.type && a.type || "") || a.pageX >= 0)
		}
		function n(a, b, c) {
			return a >= b && c >= a
		}
		function o(a, b, c, d) {
			var e = n(a, c, d),
			f = n(b, c, d);
			if (e && f) return b - a;
			if (e && !f) return d - a;
			if (!e && f) return b - c;
			var g = n(c, a, b),
			h = n(d, a, b);
			return g && h ? d - c: g && !h ? b - c: !g && h ? d - a: 0
		}
		function q(a, b) {
			return o(a.position.left, a.position.left + a.dimensions.width, b.position.left, b.position.left + b.dimensions.width) * o(a.position.top, a.position.top + a.dimensions.height, b.position.top, b.position.top + b.dimensions.height)
		}
		function s(a, b) {
			var c = a.dimensions.width * a.dimensions.height;
			return c ? q(a, b) / c: 0
		}
		function t(a, b) {
			var c = r.split(b),
			d = r.getOrientation(b),
			e = {
				left: 0,
				top: 0
			};
			if ("horizontal" == d) {
				switch (c[2]) {
				case "middle":
				case "center":
					e.left = .5 * a.width;
					break;
				case "right":
					e.left = a.width
				}
				"bottom" == c[1] && (e.top = a.height)
			} else {
				switch (c[2]) {
				case "middle":
				case "center":
					e.top = .5 * a.height;
					break;
				case "bottom":
					e.top = a.height
				}
				"right" == c[1] && (e.left = a.width)
			}
			return e
		}
		function v(b) {
			var c = d.element.cumulativeOffset(b),
			e = d.element.cumulativeScrollOffset(b),
			f = {
				top: a(window).scrollTop(),
				left: a(window).scrollLeft()
			};
			return c.left += -1 * (e.left - f.left),
			c.top += -1 * (e.top - f.top),
			c
		}
		function y(b, e, f, g) {
			var h, i, j, k = u.get(b.element),
			l = k.options,
			n = l.offset,
			o = m(f);
			if (o || !f) {
				if (j = {
					width: 24,
					height: 24
				},
				o) {
					var p = d.pointer(f);
					h = {
						top: p.y - .5 * j.height + 6,
						left: p.x - .5 * j.width + 6
					}
				} else {
					var q = b._cache.event;
					h = {
						top: (q ? q.y: 0) - .5 * j.height + 6,
						left: (q ? q.x: 0) - .5 * j.width + 6
					}
				}
				b._cache.event = {
					x: h.left,
					y: h.top
				}
			} else h = v(f),
			j = {
				width: a(f).outerWidth(),
				height: a(f).outerHeight()
			};
			if (l.stem && "mouse" != l.target) {
				var y = r.split(g),
				A = r.split(e),
				C = r.getOrientation(g),
				D = k._cache.options,
				E = k.getStemLayout().border.dimensions,
				F = D.radius,
				G = D.border,
				H = F && "background" == l.radius.position ? F: 0,
				I = F && "border" == l.radius.position ? F: F + G,
				J = G + H + .5 * l.stem.width - .5 * E.width,
				K = I > J ? I - J: 0;
				sideOffset = Math.ceil(G + H + .5 * l.stem.width + K + l.stem.offset["horizontal" == C ? "x": "y"]),
				"horizontal" == C && "left" == y[2] && "left" == A[2] || "right" == y[2] && "right" == A[2] ? (j.width -= 2 * sideOffset, h.left += sideOffset) : ("vertical" == C && "top" == y[2] && "top" == A[2] || "bottom" == y[2] && "bottom" == A[2]) && (j.height -= 2 * sideOffset, h.top += sideOffset)
			}
			i = a.extend({},
			h);
			var L = o ? c(l.hook.tooltip) : l.hook.target,
			M = t(j, L),
			N = t(j, g);
			({
				top: h.top + M.top + n.y,
				left: h.left + M.left + n.x
			}),
			h = {
				left: h.left + N.left,
				top: h.top + N.top
			};
			var P = a.extend({},
			n);
			P = x(P, L, g, "mouse" == k.options.target),
			h.top += P.y,
			h.left += P.x;
			var k = u.get(b.element),
			Q = k._cache.hook,
			R = a.extend({},
			Q[e]),
			S = {
				x: 0,
				y: 0
			},
			y = r.split(g);
			if ("middle" != y[2]) {
				var C = C = r.getOrientation(g),
				T = B.Position.getInversedPosition(g, "vertical" == C ? {
					horizontal: !0,
					vertical: !1
				}: {
					horizontal: !1,
					vertical: !0
				});
				e == T && (S.y = k._corrections.corner.y, S.x = k._corrections.corner.x)
			}
			var U = {
				top: h.top - R.anchor.top - S.y,
				left: h.left - R.anchor.left - S.x
			};
			R.tooltip.position = U;
			var V = {
				horizontal: !0,
				vertical: !0
			},
			W = {
				x: 0,
				y: 0
			};
			if (b.options.containment) {
				var X = z(b),
				Y = b.options.shadow ? w.get(b.element) : k,
				Z = Y.getOrderLayout().tooltip.dimensions;
				V.overlap = s({
					dimensions: Z,
					position: U
				},
				X),
				V.overlap < 1 && ((U.left < X.position.left || U.left + Z.width > X.position.left + X.dimensions.width) && (V.horizontal = !1, W.x = U.left < X.position.left ? U.left - X.position.left: U.left + Z.width - (X.position.left + X.dimensions.width)), (U.top < X.position.top || U.top + Z.height > X.position.top + X.dimensions.height) && (V.vertical = !1, W.y = U.top < X.position.top ? U.top - X.position.top: U.top + Z.height - (X.position.top + X.dimensions.height)))
			} else V.overlap = 1;
			V.correction = W;
			var $ = Q[e].bubble,
			_ = s({
				dimensions: j,
				position: i
			},
			{
				dimensions: $.dimensions,
				position: {
					top: U.top + $.position.top,
					left: U.left + $.position.left
				}
			});
			return {
				position: U,
				overlap: {
					target: _
				},
				contained: V,
				hook: {
					tooltip: e,
					target: g
				}
			}
		}
		function z(b) {
			var c = {
				top: a(window).scrollTop(),
				left: a(window).scrollLeft()
			},
			e = b.options,
			f = e.target;
			("mouse" == f || "self" == f) && (f = b.element);
			var g = a(f).closest(e.containment.selector).first()[0];
			if (!g || "viewport" == e.containment.selector) return {
				dimensions: p.viewport(),
				position: c
			};
			var h = d.element.cumulativeOffset(g),
			i = d.element.cumulativeScrollOffset(g);
			return h.left += -1 * (i.left - c.left),
			h.top += -1 * (i.top - c.top),
			{
				dimensions: {
					width: a(g).innerWidth(),
					height: a(g).innerHeight()
				},
				position: h
			}
		}
		var b = {
			left: "right",
			right: "left",
			top: "bottom",
			bottom: "top",
			middle: "middle",
			center: "center"
		};
		e.IE && e.IE < 9 || e.Gecko && e.Gecko < 2 || e.WebKit && e.WebKit < 530;
		var x = function () {
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
			return function (c, d, e, f) {
				var g = a[b[d]],
				h = a[b[e]],
				i = [Math.floor(.5 * Math.abs(g[0] - h[0])) ? -1 : 1, Math.floor(.5 * Math.abs(g[1] - h[1])) ? -1 : 1];
				return r.isCenter(d) || !r.isCenter(e) || f || ("horizontal" == r.getOrientation(e) ? i[0] = 0 : i[1] = 0),
				{
					x: i[0] * c.x,
					y: i[1] * c.y
				}
			}
		} ();
		return {
			get: y,
			set: j,
			getInversedPosition: c,
			getTooltipPositionFromTarget: f,
			getAbsoluteOffset: v,
			adjustOffsetBasedOnHooks: x,
			isPointerEvent: m
		}
	} (),
	B.Position.mouseBuffer = {
		x: 0,
		y: 0
	},
	B.Position._mouseBufferHandler = function (a) {
		B.Position.mouseBuffer = {
			x: a.pageX,
			y: a.pageY
		}
	},
	B.UpdateQueue = function () {
		function b() {
			a(document.body).append(a(document.createElement("div")).addClass("t_UpdateQueue").append(a(document.createElement("div")).addClass("t_Tooltip").append(a(this.container = document.createElement("div")).addClass("t_Content"))))
		}
		function c(b) {
			return {
				width: a(b).innerWidth(),
				height: a(b).innerHeight()
			}
		}
		function e(b) {
			var d = c(b),
			e = b.parentNode;
			return e && a(e).css({
				width: d.width + "px"
			}) && c(b).height > d.height && d.width++,
			a(e).css({
				width: "100%"
			}),
			d
		}
		function f(b, c, e) { (!this.container || this.container && !d.element.isAttached(this.container)) && this.build();
			var f = b.options,
			g = a.extend({
				spinner: !1
			},
			arguments[3] || {}); ! f.inline && !d.isElement(c) || a(c).data("isSpinner") || (f.inline && "string" == a.type(c) && (b.inlineContent = a("#" + c)[0], c = b.inlineContent), !b.inlineMarker && c && d.element.isAttached(c) && (a(b.inlineContent).data("tipped_restore_inline_display", a(b.inlineContent).css("display")), b.inlineMarker = document.createElement("div"), a(b.inlineContent).before(a(b.inlineMarker).hide())));
			var h = document.createElement("div");
			a(this.container).append(a(h).addClass("t_ContentContainer t_clearfix").append(c)),
			d.isElement(c) && a(c).show(),
			f.skin && a(h).addClass("t_Content_" + b.options.skin);
			var i = a(h).find("img[src]").filter(function () {
				return ! (a(this).attr("height") && a(this).attr("width"))
			});
			if (i.length > 0 && !b.getState("preloading_images")) {
				b.setState("preloading_images", !0),
				f.spinner && (g.spinner || b.spinner || (b.spinner = b.insertSpinner(f.spinner)), b.getState("visible") && (b.position(), a(b.container).show()), b.spinner.play());
				var j = 0,
				k = Math.max(8e3, 750 * (i.length || 0));
				b.clearTimer("preloading_images"),
				b.setTimer("preloading_images", a.proxy(function () {
					i.each(function () {
						this.onload = function () {}
					}),
					j >= i.length || (this._updateTooltip(b, h), e && e())
				},
				this), k),
				a.each(i, a.proxy(function (c, d) {
					var f = new Image;
					f.onload = a.proxy(function () {
						f.onload = function () {};
						var c = f.width,
						g = f.height,
						k = a(d).attr("width"),
						l = a(d).attr("height");
						k && l || (!k && l ? (c = Math.round(l * c / g), g = l) : !l && k && (g = Math.round(k * g / c), c = k), a(d).attr({
							width: c,
							height: g
						}), j++),
						j == i.length && (b.clearTimer("preloading_images"), b.spinner && (b.spinner.remove(), b.spinner = null), b.getState("visible") && a(b.container).hide(), this._updateTooltip(b, h), e && e())
					},
					this),
					f.src = d.src
				},
				this))
			} else this._updateTooltip(b, h),
			e && e()
		}
		function g(b, c) {
			var d = e(c),
			f = {
				width: d.width - (parseInt(a(c).css("padding-left")) || 0) - (parseInt(a(c).css("padding-right")) || 0),
				height: d.height - (parseInt(a(c).css("padding-top")) || 0) - (parseInt(a(c).css("padding-bottom")) || 0)
			};
			b.options.maxWidth && "number" == a.type(b.options.maxWidth) && f.width > b.options.maxWidth && (a(c).css({
				width: b.options.maxWidth + "px"
			}), d = e(c)),
			b._cache.contentDimensions = d,
			a(b.contentElement).html(c)
		}
		return {
			build: b,
			update: f,
			_updateTooltip: g,
			getMeasureElementDimensions: e
		}
	} (),
	a.extend(C.prototype, function () {
		function b(a, b, c) {
			this._cache.timers[a] = d.delay(b, c)
		}
		function c(a) {
			return this._cache.timers[a]
		}
		function e(a) {
			this._cache.timers[a] && (window.clearTimeout(this._cache.timers[a]), delete this._cache.timers[a])
		}
		function f() {
			a.each(this._cache.timers, function (a, b) {
				window.clearTimeout(b)
			}),
			this._cache.timers = []
		}
		function g(b, c, d, e) {
			c = c;
			var f = a.proxy(d, e || this);
			this._cache.events.push({
				element: b,
				eventName: c,
				handler: f
			}),
			a(b).bind(c, f)
		}
		function h() {
			a.each(this._cache.events, function (b, c) {
				a(c.element).unbind(c.eventName, c.handler)
			})
		}
		function j(a, b) {
			this._cache.states[a] = b
		}
		function l(a) {
			return this._cache.states[a]
		}
		function m() {
			this.setEvent(this.element, "mouseenter", this.setActive),
			this.setEvent(this.element, "mouseleave", a.proxy(function (a) {
				this.setIdle(a)
			},
			this)),
			this.options.showOn && a.each(this.options.showOn, a.proxy(function (b, c) {
				var d = !1;
				"click" == c && (this.options.hideOn && a.each(this.options.hideOn, function (a, b) {
					return "self" == b.element && "click" == b.event ? (d = !0, !1) : void 0
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
			this)) : this.options.showDelay && this.options.showOn && !a.inArray("click", this.options.showOn) > -1 && this.setEvent(this.element, "mouseleave", a.proxy(function () {
				this.clearTimer("show")
			},
			this));
			var b = !1; ! this.options.fixed && this.options.showOn && ((b = a.inArray("mousemove", this.options.showOn) > -1) || a.inArray("touchmove", this.options.showOn) > -1) && "mouse" == this.target && this.setEvent(this.element, b ? "mousemove": "touchmove", function (a) {
				this.getState("skinned") && this.position(a)
			})
		}
		function n() {
			this.setEvent(this.container, Tipped.support.touch ? "touchmove": "mouseenter", this.setActive),
			this.setEvent(this.container, "mouseleave", this.setIdle),
			this.setEvent(this.container, Tipped.support.touch ? "touchmove": "mouseenter", a.proxy(function () {
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
		}
		function o(a, b, c) {
			var d = u.get(this.element);
			d && d.setHookPositionAndStemCorrection(a, b, c)
		}
		function p(a) {
			var b = u.get(this.element);
			b && b.setHookPosition(a)
		}
		function q() {
			this.setHookPosition(this.options.hook.tooltip)
		}
		function r() {
			a(this.container = document.createElement("div")).addClass("t_Tooltip"),
			this.createPreBuildObservers()
		}
		function s() {
			this.build();
			var a = u.get(this.element);
			a ? a.build() : (new v(this.element), this.setState("skinned", !0))
		}
		function t() {
			this.getState("build") || (a(document.body).append(a(this.container).css({
				left: "-10000px",
				top: "-10000px",
				zIndex: this.zIndex
			}).append(a(this.skinElement = document.createElement("div")).addClass("t_Skin")).append(a(this.contentElement = document.createElement("div")).addClass("t_Content"))), a(this.container).addClass("t_Tooltip_" + this.options.skin), this.options.hideOnClickOutside && (a(this.element).addClass("t_hideOnClickOutside"), this.setEvent(document.documentElement, "click", a.proxy(function (b) {
				if (this.visible()) {
					var c = a(b.target).closest(".t_Tooltip, .t_hideOnClickOutside")[0];
					(!c || c && c != this.container && c != this.element) && this.hide()
				}
			},
			this))), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_hidden")), this.createPostBuildObservers(), this.setState("build", !0), B.add(this))
		}
		function w() {
			var c;
			this.content,
			this.inlineMarker && this.inlineContent && ((c = a(this.inlineContent).data("tipped_restore_inline_display")) && a(this.inlineContent).css({
				display: c
			}), a(this.inlineMarker).before(this.inlineContent).remove(), this.inlineMarker = null)
		}
		function x() {
			d.defer(a.proxy(function () {
				this.clearEvents()
			},
			this)),
			this.clearTimers(),
			this._restoreInlineContent(),
			d.defer(a.proxy(function () {
				a(this.container).find("img[src]").unbind("load")
			},
			this)),
			u.remove(this.element),
			this.getState("build") && this.container && (a(this.container).remove(), this.container = null);
			var c, b = "tipped_restore_title";
			(c = a(this.element).data(b)) && a(this.element).attr("title", c).removeData("tipped_restore_title"),
			a(this.element).removeData("tipped-uid")
		}
		function y(b) {
			var c = a.extend({
				afterUpdate: this.options.afterUpdate,
				spinner: !1
			},
			arguments[1] || {});
			this.build(),
			this.getState("visible") && a(this.container).hide(),
			B.UpdateQueue.update(this, b, a.proxy(function () {
				var b = this.getState("visible");
				b || this.setState("visible", !0),
				this._buildSkin(),
				b || this.setState("visible", !1),
				this.getState("visible") && (a(this.container).hide(), this.position(), this.raise(), a(this.container).show()),
				this.setState("updated", !0),
				c.afterUpdate && c.afterUpdate(this.contentElement.firstChild, this.element),
				c.callback && c.callback()
			},
			this), {
				spinner: c.spinner
			})
		}
		function z(b) {
			var c, d = {
				url: this.content,
				type: this.options.ajax.type,
				data: this.options.ajax.data || {},
				dataType: this.options.ajax.dataType || "html"
			};
			if (! (this.getState("xhr") || this.options.ajax.cache && this.getState("updated"))) {
				if (this.options.ajax.cache && (c = i.get(d))) return this.afterAjaxUpdate(c, {
					callback: a.proxy(function () {
						this.getState("visible") && this.options.onShow && this.options.onShow(this.contentElement.firstChild, this.element)
					},
					this)
				}),
				void 0;
				this.setState("xhr", !0),
				this.options.spinner && (this.spinner ? this.spinner.play() : (this.spinner = this.insertSpinner(this.options.spinner), this.setState("updated", !1)), this.position(b)),
				this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null),
				this._cache.xhr = a.ajax(a.extend({},
				d, {
					success: a.proxy(function (b, c, e) {
						0 !== e.status && (i.set(d, e.responseText), this.afterAjaxUpdate(e.responseText, {
							callback: a.proxy(function () {
								this.setState("xhr", !1),
								this.getState("visible") && this.options.onShow && this.options.onShow(this.contentElement.firstChild, this.element),
								this.spinner && (this.spinner.remove(), this.spinner = null)
							},
							this)
						}))
					},
					this)
				}))
			}
		}
		function A(b) {
			var c = a.extend({
				spinner: this.options.spinner && this.spinner
			},
			arguments[1] || {});
			this.update(b, c)
		}
		function C() {
			var b = document.createElement("div");
			a(b).data("isSpinner", !0);
			var c = Spinners.create(b, a.extend({},
			arguments[0] || {})),
			d = Spinners.getDimensions(b);
			return a(b).css(k(d)),
			this.update(b, {
				afterUpdate: !1,
				callback: function () {
					c.play()
				}
			}),
			c
		}
		function E() {
			if (this.getState("build") && !this.options.zIndex) {
				var b = B.getHighestTooltip();
				b && b != this && this.zIndex <= b.zIndex && a(this.container).css({
					zIndex: this.zIndex = b.zIndex + 1
				})
			}
		}
		function F() {
			var a = u.get(this.element);
			a && (a.refresh(), this.visible() && this.position())
		}
		function G(a) {
			if (Tipped.support.cssTransitions) {
				a = a || 0;
				var b = this.container.style;
				b.MozTransitionDuration = a + "ms",
				b.webkitTransitionDuration = a + "ms",
				b.OTransitionDuration = a + "ms",
				b.transitionDuration = a + "ms"
			}
		}
		function H(b) {
			this.clearTimer("hide"),
			this.clearTimer("fadeTransition"),
			this.getState("visible") || this.getTimer("show") || this.setTimer("show", a.proxy(function () {
				this.clearTimer("show"),
				this.show(b)
			},
			this), this.options.showDelay || 1)
		}
		function I(b) {
			if (this.clearTimer("hide"), this.clearTimer("fadeTransition"), !this.visible()) {
				if ("function" == a.type(this.content) || "function" == a.type(this._cache.contentFunction)) {
					"function" != a.type(this._cache.contentFunction) && (this._cache.contentFunction = this.content);
					var c = this._cache.contentFunction(this.element) || !1;
					if (c != this._cache.fnCallContent && (this._cache.fnCallContent = c, this.setState("updated", !1), this._restoreInlineContent()), this.content = c, !c) return
				}
				this.options.hideOthers && B.hideAll(),
				this.setState("visible", !0),
				this.options.ajax ? this.ajaxUpdate(b) : this.getState("updated") || this.update(this.content),
				this.getState("skinned") && this.position(b),
				this.raise(),
				this.options.hideAfter && d.defer(a.proxy(function () {
					this.setActive()
				},
				this)),
				"function" == a.type(this.options.onShow) && (!this.options.ajax || this.options.ajax && this.options.ajax.cache && this.getState("updated")) && this.options.onShow(this.contentElement.firstChild, this.element),
				Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_visible").removeClass("t_hidden")),
				a(this.container).show()
			}
		}
		function J() {
			this.clearTimer("show"),
			this.getState("visible") && (this.setState("visible", !1), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) ? (this.setFadeDuration(this.options.fadeOut), a(this.container).removeClass("t_visible").addClass("t_hidden"), this.setTimer("fadeTransition", a.proxy(this._hide, this), this.options.fadeOut)) : this._hide(), this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null, this.setState("xhr", !1)))
		}
		function K() {
			this.getState("build") && (a(this.container).css({
				left: "-10000px",
				top: "-10000px"
			}), B.resetZ(), "function" != a.type(this.options.onHide) || this.spinner || this.options.onHide(this.contentElement.firstChild, this.element))
		}
		function L() {
			this.clearTimer("show"),
			!this.getTimer("hide") && this.getState("visible") && this.setTimer("hide", a.proxy(function () {
				this.clearTimer("hide"),
				this.clearTimer("fadeTransition"),
				this.hide()
			},
			this), this.options.hideDelay || 1)
		}
		function M(a) {
			this[this.visible() ? "hide": "show"](a)
		}
		function N() {
			return this.getState("visible")
		}
		function O() {
			this.setState("active", !0),
			this.getState("visible") && this.raise(),
			this.options.hideAfter && this.clearTimer("idle")
		}
		function P() {
			this.setState("active", !1),
			this.options.hideAfter && this.setTimer("idle", a.proxy(function () {
				this.clearTimer("idle"),
				this.getState("active") || this.hide()
			},
			this), this.options.hideAfter)
		}
		var D = function (b) {
			if (this.visible()) {
				var c;
				if ("mouse" == this.options.target) {
					var e = B.Position.isPointerEvent(b),
					f = B.Position.mouseBuffer;
					if (e) f.x || f.y ? (this._cache.event = {
						x: f.x,
						y: f.y
					},
					c = null) : c = b;
					else {
						if (f.x || f.y) this._cache.event = {
							x: f.x,
							y: f.y
						};
						else if (!this._cache.event) {
							var g = B.Position.getAbsoluteOffset(this.element);
							this._cache.event = {
								x: g.left,
								y: g.top
							}
						}
						c = null
					}
				} else c = this.target;
				if (B.Position.set(this, this.options.hook.tooltip, c, this.options.hook.target), b && B.Position.isPointerEvent(b)) {
					var h = {
						width: a(this.container).outerWidth(),
						height: a(this.container).outerHeight()
					},
					i = d.pointer(b),
					g = d.element.cumulativeOffset(this.container);
					i.x >= g.left && i.x <= g.left + h.width && i.y >= g.top && i.y <= g.top + h.height && d.defer(a.proxy(function () {
						this.clearTimer("hide")
					},
					this))
				}
			}
		};
		return {
			build: t,
			_preBuild: r,
			_buildSkin: s,
			createPreBuildObservers: m,
			createPostBuildObservers: n,
			show: I,
			hide: J,
			_hide: K,
			toggle: M,
			visible: N,
			showDelayed: H,
			hideDelayed: L,
			setFadeDuration: G,
			setState: j,
			getState: l,
			setActive: O,
			setIdle: P,
			getTimer: c,
			setTimer: b,
			clearTimer: e,
			clearTimers: f,
			setEvent: g,
			clearEvents: h,
			setHookPositionAndStemCorrection: o,
			setHookPosition: p,
			resetHookPosition: q,
			refresh: F,
			update: y,
			ajaxUpdate: z,
			afterAjaxUpdate: A,
			insertSpinner: C,
			position: D,
			raise: E,
			_restoreInlineContent: w,
			remove: x
		}
	} ()),
	Tipped.init()
} (jQuery);