function layoutSettings() {
	wW = window.innerWidth, wH = $(window).height(), iPhoneTransVal = -iPhone.height() - (wH - iPhone.height()) / 2, 740 >= wW ? slider || initSlider() : slider && (slider.destroy(), slider = null, $(".swiper-slide").width("")), mobile && (wW > 740 && !touchmoveDisabled ? tabletScroll.init() : tabletScroll.kill())
}

function initNavigation() {
	$("section").each(function(e) {
		sections[e] = new Section(e)
	}), getTransitionValues()
}

function Section(e) {
	var t = this;
	t.index = e, t.DOMel = $("section").eq(e), t.article = t.DOMel.find("article"), t.title = t.DOMel.find("h2"), t.paragraph = t.DOMel.find("p"), t.animate = function(e, i) {
		0 === currentSection ? $body.removeClass("started") : $body.addClass("started"), $body.attr("data-forward", e), $body.attr("data-current-section", currentSection), listItems.removeClass("current"), $(".nav-btn").prop("disabled", !1), 0 === currentSection && $(".nav-btn.up").prop("disabled", !0), currentSection === sections.length - 1 && $(".nav-btn.down").prop("disabled", !0);
		var n = e ? trValues[t.index].article.delay.forward : trValues[t.index].article.delay.backward;
		if (i) {
			var r = stripe._gsTransform ? stripe._gsTransform.rotation : 0;
			TweenMax.to(iPhone, trValues[t.index].iPhone.duration, trValues[t.index].iPhone.values), r / 180 % 2 !== 0 ? TweenMax.to(stripe, .5, {
				delay: .2,
				y: 0,
				scaleX: 1.3,
				force3D: !0,
				ease: Sine.easeIn,
				onComplete: function() {
					TweenMax.to(stripe, 0, trValues[t.index].stripe.values)
				}
			}) : TweenMax.to(stripe, .5, {
				delay: .2,
				y: -wH,
				scaleX: 1.3,
				force3D: !0,
				ease: Sine.easeIn,
				onComplete: function() {
					TweenMax.to(stripe, 0, trValues[t.index].stripe.values)
				}
			})
		} else TweenMax.to(stripe, trValues[t.index].stripe.duration, trValues[t.index].stripe.values), TweenMax.to(iPhone, trValues[t.index].iPhone.duration, trValues[t.index].iPhone.values);
		TweenMax.to(timelineCtn, .4, {
			delay: 0,
			scaleX: 0,
			force3D: !0,
			ease: Quad.easeInOut,
			onComplete: function() {
				timelineCtn.removeClass("glowing"), TweenMax.to(timelineCtn, 0, trValues[t.index].timelineCtn.values), TweenMax.to("#timeline-bar", 0, trValues[t.index].timeline.values), TweenMax.to(timelineCtn, .6, {
					scaleX: 1,
					force3D: !0,
					ease: Quad.easeOut,
					onComplete: function() {
						timelineCtn.addClass("glowing")
					}
				}), transitionTimer = setTimeout(function() {
					transitioning = !1
				}, 1500), t.index < sections.length - 1 && wW > 740 && ($(video).unbind("timeupdate"), setTimeout(function() {
					video.currentTime = trValues[t.index].video.start, video.play(), $(video).bind("timeupdate", function() {
						this.currentTime >= trValues[t.index].video.end && this.pause()
					})
				}, 500))
			}
		}), setTimeout(function() {
			listItems.eq(t.index).addClass("current"), $("#main-nav li").removeClass("current"), t.index > 0 && $("#main-nav li").eq(t.index - 1).addClass("current")
		}, n)
	}
}

function TabletScroll() {
	this.init = function() {
		touchmoveDisabled = !0, $(document).on("touchend", initiPadVideo), $(document).swipe({
			threshold: 100,
			allowPageScroll: "none",
			swipeUp: function() {
				!transitioning && currentSection < sections.length - 1 && (transitioning = !0, currentSection++, forward = !0, sections[currentSection].animate(forward))
			},
			swipeDown: function() {
				!transitioning && currentSection > 0 && (transitioning = !0, currentSection--, forward = !1, sections[currentSection].animate(forward))
			}
		})
	}, this.kill = function() {
		touchmoveDisabled = !1, $(document).swipe("destroy")
	}
}

function initiPadVideo() {
	video.play(), video.pause(), console.log("iPad video initiated."), $(document).off("touchend", initiPadVideo)
}

function getTransitionValues() {
	trValues[0] = {
		stripe: {
			duration: .5,
			values: {
				delay: 0,
				y: -30,
				rotationZ: 0,
				scaleX: 1,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		iPhone: {
			duration: .5,
			values: {
				delay: .7,
				y: 0,
				rotationZ: -15,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		article: {
			delay: {
				forward: 0,
				backward: 0
			}
		},
		timelineCtn: {
			duration: .5,
			values: {
				delay: 0,
				y: 0,
				opacity: 0,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: 0,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		video: {
			start: 0,
			end: 0
		}
	}, trValues[1] = {
		stripe: {
			duration: 1.3,
			values: {
				delay: .2,
				y: -wH / 2,
				rotationZ: 0,
				scaleX: 1.3,
				force3D: !0,
				ease: Expo.easeInOut
			}
		},
		iPhone: {
			duration: .8,
			values: {
				delay: .3,
				y: iPhoneTransVal,
				rotationZ: 0,
				force3D: !0,
				ease: Sine.easeInOut
			}
		},
		article: {
			delay: {
				forward: 600,
				backward: 600
			}
		},
		timelineCtn: {
			duration: .8,
			values: {
				delay: .2,
				y: 130,
				rotationZ: 0,
				opacity: 1,
				force3D: !0,
				ease: Quint.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: "25%",
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		video: {
			start: 2,
			end: 11
		}
	}, trValues[2] = {
		stripe: {
			duration: 1.3,
			values: {
				delay: 0,
				y: -wH / 2,
				rotationZ: 180,
				force3D: !0,
				ease: Expo.easeInOut
			}
		},
		iPhone: {
			duration: .8,
			values: {
				delay: .9,
				y: iPhoneTransVal,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		article: {
			delay: {
				forward: 600,
				backward: 600
			}
		},
		timelineCtn: {
			duration: .5,
			values: {
				delay: 0,
				y: -150,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: "50%",
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		video: {
			start: 11,
			end: 23
		}
	}, trValues[3] = {
		stripe: {
			duration: 1.3,
			values: {
				delay: 0,
				y: -wH / 2,
				rotationZ: 360,
				force3D: !0,
				ease: Expo.easeInOut
			}
		},
		iPhone: {
			duration: .8,
			values: {
				delay: .9,
				y: iPhoneTransVal,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		article: {
			delay: {
				forward: 600,
				backward: 600
			}
		},
		timelineCtn: {
			duration: .5,
			values: {
				delay: 0,
				y: 130,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: "75%",
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		video: {
			start: 23,
			end: 27.5
		}
	}, trValues[4] = {
		stripe: {
			duration: 1.3,
			values: {
				delay: 0,
				y: -wH / 2,
				rotationZ: 540,
				force3D: !0,
				ease: Expo.easeInOut
			}
		},
		iPhone: {
			duration: .7,
			values: {
				delay: 0,
				y: iPhoneTransVal,
				rotationZ: 0,
				force3D: !0,
				ease: Quad.easeOut
			}
		},
		article: {
			delay: {
				forward: 600,
				backward: 0
			}
		},
		timelineCtn: {
			duration: .5,
			values: {
				delay: 0,
				y: -150,
				opacity: 1,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: "100%",
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		video: {
			start: 27.5,
			end: video.duration
		}
	}, trValues[5] = {
		stripe: {
			duration: .5,
			values: {
				delay: .2,
				y: 0,
				rotationZ: 540,
				force3D: !0,
				ease: Sine.easeIn
			}
		},
		iPhone: {
			duration: .7,
			values: {
				delay: 0,
				y: 2 * -wH,
				rotationZ: 15,
				force3D: !0,
				ease: Sine.easeIn
			}
		},
		article: {
			delay: {
				forward: 0,
				backward: 0
			}
		},
		timelineCtn: {
			duration: .5,
			values: {
				delay: 0,
				y: 0,
				scaleX: 0,
				opacity: 0,
				force3D: !0,
				ease: Quad.easeInOut
			}
		},
		timeline: {
			duration: .5,
			values: {
				delay: 0,
				x: "100%",
				force3D: !0,
				ease: Quad.easeInOut
			}
		}
	}
}

function initSlider() {
	$("#sections-list section").eq(0).addClass("current"), $("#slider-nav li").eq(0).addClass("current"), slider = $(".swiper-container").swiper({
		direction: "horizontal",
		speed: 700,
		autoResize: !0,
		resistanceRatio: .7,
		longSwipesRatio: 0,
		spaceBetween: 0,
		onInit: function(e) {
			lastSwipeProgress = e.progress
		},
		onTransitionStart: function(e) {
			$body.removeClass("slide-change")
		},
		onProgress: function(e, t) {
			rotateSlide(e, t), $body.addClass("slide-change")
		},
		onSlideChangeEnd: function(e) {
			lastSwipeProgress = e.progress, $("#sections-list section").removeClass("current").eq(e.activeIndex).addClass("current"), $("#slider-nav li").removeClass("current").eq(e.activeIndex).addClass("current")
		}
	}), slidesNumber = $(".swiper-slide").length, $(document).on("click touchend", "#slider-nav a", function(e) {
		e.preventDefault()
	})
}

function rotateSlide(e, t) {
	var i, n = lastSwipeProgress - t,
		r = n * (slidesNumber - 1),
		s = $("#slider-images span").eq(e.activeIndex),
		a = $("#slider-images span").eq(0 > n ? e.activeIndex + 1 : e.activeIndex - 1),
		o = Math.min(90, 90 * r);
	r >= 0 ? i = Math.max(-90, -90 + 90 * r) : 0 > r && (i = Math.min(90, 90 - -90 * r)), s.css({
		transform: "rotate(" + o + "deg)"
	}), a.css({
		transform: "rotate(" + i + "deg)"
	}), lastViableProgress = t
}

function sendForm() {
	var e = $("#newsletter-form").attr("action"),
		t = {
			_token: $("#token").val(),
			email: $("#email").val()
		};
	$.ajax({
		url: e,
		data: t,
		dataType: "json",
		cache: !1,
		type: "POST",
		beforeSend: function() {
			submitBtn.attr("disabled", "disabled")
		},
		success: function(e) {
			"ok" === e.status ? ($("#email").blur(), $("#newsletter-form").addClass("success").removeClass("sendable"), setTimeout(function() {
				$("#newsletter-form").removeClass("success").addClass("sendable")
			}, 5e3)) : $("#error-tag").text(e.message).addClass("visible"), submitBtn.removeAttr("disabled").removeClass("sending")
		}
	})
}! function(e, t) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
		if (!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
	function i(e) {
		var t = e.length,
			i = J.type(e);
		return "function" === i || J.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === i || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
	}

	function n(e, t, i) {
		if (J.isFunction(t)) return J.grep(e, function(e, n) {
			return !!t.call(e, n, e) !== i
		});
		if (t.nodeType) return J.grep(e, function(e) {
			return e === t !== i
		});
		if ("string" == typeof t) {
			if (oe.test(t)) return J.filter(t, e, i);
			t = J.filter(t, e)
		}
		return J.grep(e, function(e) {
			return V.call(t, e) >= 0 !== i
		})
	}

	function r(e, t) {
		for (;
			(e = e[t]) && 1 !== e.nodeType;);
		return e
	}

	function s(e) {
		var t = fe[e] = {};
		return J.each(e.match(de) || [], function(e, i) {
			t[i] = !0
		}), t
	}

	function a() {
		Z.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), J.ready()
	}

	function o() {
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {}
			}
		}), this.expando = J.expando + Math.random()
	}

	function l(e, t, i) {
		var n;
		if (void 0 === i && 1 === e.nodeType)
			if (n = "data-" + t.replace(we, "-$1").toLowerCase(), i = e.getAttribute(n), "string" == typeof i) {
				try {
					i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : ye.test(i) ? J.parseJSON(i) : i
				} catch (r) {}
				_e.set(e, t, i)
			} else i = void 0;
		return i
	}

	function u() {
		return !0
	}

	function c() {
		return !1
	}

	function p() {
		try {
			return Z.activeElement
		} catch (e) {}
	}

	function h(e, t) {
		return J.nodeName(e, "table") && J.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}

	function d(e) {
		return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
	}

	function f(e) {
		var t = Ie.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function m(e, t) {
		for (var i = 0, n = e.length; n > i; i++) ve.set(e[i], "globalEval", !t || ve.get(t[i], "globalEval"))
	}

	function g(e, t) {
		var i, n, r, s, a, o, l, u;
		if (1 === t.nodeType) {
			if (ve.hasData(e) && (s = ve.access(e), a = ve.set(t, s), u = s.events)) {
				delete a.handle, a.events = {};
				for (r in u)
					for (i = 0, n = u[r].length; n > i; i++) J.event.add(t, r, u[r][i])
			}
			_e.hasData(e) && (o = _e.access(e), l = J.extend({}, o), _e.set(t, l))
		}
	}

	function v(e, t) {
		var i = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
		return void 0 === t || t && J.nodeName(e, t) ? J.merge([e], i) : i
	}

	function _(e, t) {
		var i = t.nodeName.toLowerCase();
		"input" === i && Se.test(e.type) ? t.checked = e.checked : ("input" === i || "textarea" === i) && (t.defaultValue = e.defaultValue)
	}

	function y(t, i) {
		var n, r = J(i.createElement(t)).appendTo(i.body),
			s = e.getDefaultComputedStyle && (n = e.getDefaultComputedStyle(r[0])) ? n.display : J.css(r[0], "display");
		return r.detach(), s
	}

	function w(e) {
		var t = Z,
			i = Be[e];
		return i || (i = y(e, t), "none" !== i && i || (je = (je || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = je[0].contentDocument, t.write(), t.close(), i = y(e, t), je.detach()), Be[e] = i), i
	}

	function x(e, t, i) {
		var n, r, s, a, o = e.style;
		return i = i || He(e), i && (a = i.getPropertyValue(t) || i[t]), i && ("" !== a || J.contains(e.ownerDocument, e) || (a = J.style(e, t)), qe.test(a) && Xe.test(t) && (n = o.width, r = o.minWidth, s = o.maxWidth, o.minWidth = o.maxWidth = o.width = a, a = i.width, o.width = n, o.minWidth = r, o.maxWidth = s)), void 0 !== a ? a + "" : a
	}

	function b(e, t) {
		return {
			get: function() {
				return e() ? void delete this.get : (this.get = t).apply(this, arguments)
			}
		}
	}

	function T(e, t) {
		if (t in e) return t;
		for (var i = t[0].toUpperCase() + t.slice(1), n = t, r = Ue.length; r--;)
			if (t = Ue[r] + i, t in e) return t;
		return n
	}

	function S(e, t, i) {
		var n = We.exec(t);
		return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : t
	}

	function C(e, t, i, n, r) {
		for (var s = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > s; s += 2) "margin" === i && (a += J.css(e, i + be[s], !0, r)), n ? ("content" === i && (a -= J.css(e, "padding" + be[s], !0, r)), "margin" !== i && (a -= J.css(e, "border" + be[s] + "Width", !0, r))) : (a += J.css(e, "padding" + be[s], !0, r), "padding" !== i && (a += J.css(e, "border" + be[s] + "Width", !0, r)));
		return a
	}

	function P(e, t, i) {
		var n = !0,
			r = "width" === t ? e.offsetWidth : e.offsetHeight,
			s = He(e),
			a = "border-box" === J.css(e, "boxSizing", !1, s);
		if (0 >= r || null == r) {
			if (r = x(e, t, s), (0 > r || null == r) && (r = e.style[t]), qe.test(r)) return r;
			n = a && (Q.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
		}
		return r + C(e, t, i || (a ? "border" : "content"), n, s) + "px"
	}

	function k(e, t) {
		for (var i, n, r, s = [], a = 0, o = e.length; o > a; a++) n = e[a], n.style && (s[a] = ve.get(n, "olddisplay"), i = n.style.display, t ? (s[a] || "none" !== i || (n.style.display = ""), "" === n.style.display && Te(n) && (s[a] = ve.access(n, "olddisplay", w(n.nodeName)))) : (r = Te(n), "none" === i && r || ve.set(n, "olddisplay", r ? i : J.css(n, "display"))));
		for (a = 0; o > a; a++) n = e[a], n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? s[a] || "" : "none"));
		return e
	}

	function D(e, t, i, n, r) {
		return new D.prototype.init(e, t, i, n, r)
	}

	function O() {
		return setTimeout(function() {
			Qe = void 0
		}), Qe = J.now()
	}

	function E(e, t) {
		var i, n = 0,
			r = {
				height: e
			};
		for (t = t ? 1 : 0; 4 > n; n += 2 - t) i = be[n], r["margin" + i] = r["padding" + i] = e;
		return t && (r.opacity = r.width = e), r
	}

	function M(e, t, i) {
		for (var n, r = (it[t] || []).concat(it["*"]), s = 0, a = r.length; a > s; s++)
			if (n = r[s].call(i, t, e)) return n
	}

	function A(e, t, i) {
		var n, r, s, a, o, l, u, c, p = this,
			h = {},
			d = e.style,
			f = e.nodeType && Te(e),
			m = ve.get(e, "fxshow");
		i.queue || (o = J._queueHooks(e, "fx"), null == o.unqueued && (o.unqueued = 0, l = o.empty.fire, o.empty.fire = function() {
			o.unqueued || l()
		}), o.unqueued++, p.always(function() {
			p.always(function() {
				o.unqueued--, J.queue(e, "fx").length || o.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], u = J.css(e, "display"), c = "none" === u ? ve.get(e, "olddisplay") || w(e.nodeName) : u, "inline" === c && "none" === J.css(e, "float") && (d.display = "inline-block")), i.overflow && (d.overflow = "hidden", p.always(function() {
			d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
		}));
		for (n in t)
			if (r = t[n], Ke.exec(r)) {
				if (delete t[n], s = s || "toggle" === r, r === (f ? "hide" : "show")) {
					if ("show" !== r || !m || void 0 === m[n]) continue;
					f = !0
				}
				h[n] = m && m[n] || J.style(e, n)
			} else u = void 0;
		if (J.isEmptyObject(h)) "inline" === ("none" === u ? w(e.nodeName) : u) && (d.display = u);
		else {
			m ? "hidden" in m && (f = m.hidden) : m = ve.access(e, "fxshow", {}), s && (m.hidden = !f), f ? J(e).show() : p.done(function() {
				J(e).hide()
			}), p.done(function() {
				var t;
				ve.remove(e, "fxshow");
				for (t in h) J.style(e, t, h[t])
			});
			for (n in h) a = M(f ? m[n] : 0, n, p), n in m || (m[n] = a.start, f && (a.end = a.start, a.start = "width" === n || "height" === n ? 1 : 0))
		}
	}

	function R(e, t) {
		var i, n, r, s, a;
		for (i in e)
			if (n = J.camelCase(i), r = t[n], s = e[i], J.isArray(s) && (r = s[1], s = e[i] = s[0]), i !== n && (e[n] = s, delete e[i]), a = J.cssHooks[n], a && "expand" in a) {
				s = a.expand(s), delete e[n];
				for (i in s) i in e || (e[i] = s[i], t[i] = r)
			} else t[n] = r
	}

	function N(e, t, i) {
		var n, r, s = 0,
			a = tt.length,
			o = J.Deferred().always(function() {
				delete l.elem
			}),
			l = function() {
				if (r) return !1;
				for (var t = Qe || O(), i = Math.max(0, u.startTime + u.duration - t), n = i / u.duration || 0, s = 1 - n, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(s);
				return o.notifyWith(e, [u, s, i]), 1 > s && l ? i : (o.resolveWith(e, [u]), !1)
			},
			u = o.promise({
				elem: e,
				props: J.extend({}, t),
				opts: J.extend(!0, {
					specialEasing: {}
				}, i),
				originalProperties: t,
				originalOptions: i,
				startTime: Qe || O(),
				duration: i.duration,
				tweens: [],
				createTween: function(t, i) {
					var n = J.Tween(e, u.opts, t, i, u.opts.specialEasing[t] || u.opts.easing);
					return u.tweens.push(n), n
				},
				stop: function(t) {
					var i = 0,
						n = t ? u.tweens.length : 0;
					if (r) return this;
					for (r = !0; n > i; i++) u.tweens[i].run(1);
					return t ? o.resolveWith(e, [u, t]) : o.rejectWith(e, [u, t]), this
				}
			}),
			c = u.props;
		for (R(c, u.opts.specialEasing); a > s; s++)
			if (n = tt[s].call(u, e, c, u.opts)) return n;
		return J.map(c, M, u), J.isFunction(u.opts.start) && u.opts.start.call(e, u), J.fx.timer(J.extend(l, {
			elem: e,
			anim: u,
			queue: u.opts.queue
		})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}

	function L(e) {
		return function(t, i) {
			"string" != typeof t && (i = t, t = "*");
			var n, r = 0,
				s = t.toLowerCase().match(de) || [];
			if (J.isFunction(i))
				for (; n = s[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (e[n] = e[n] || []).unshift(i)) : (e[n] = e[n] || []).push(i)
		}
	}

	function I(e, t, i, n) {
		function r(o) {
			var l;
			return s[o] = !0, J.each(e[o] || [], function(e, o) {
				var u = o(t, i, n);
				return "string" != typeof u || a || s[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
			}), l
		}
		var s = {},
			a = e === xt;
		return r(t.dataTypes[0]) || !s["*"] && r("*")
	}

	function z(e, t) {
		var i, n, r = J.ajaxSettings.flatOptions || {};
		for (i in t) void 0 !== t[i] && ((r[i] ? e : n || (n = {}))[i] = t[i]);
		return n && J.extend(!0, e, n), e
	}

	function F(e, t, i) {
		for (var n, r, s, a, o = e.contents, l = e.dataTypes;
			"*" === l[0];) l.shift(), void 0 === n && (n = e.mimeType || t.getResponseHeader("Content-Type"));
		if (n)
			for (r in o)
				if (o[r] && o[r].test(n)) {
					l.unshift(r);
					break
				}
		if (l[0] in i) s = l[0];
		else {
			for (r in i) {
				if (!l[0] || e.converters[r + " " + l[0]]) {
					s = r;
					break
				}
				a || (a = r)
			}
			s = s || a
		}
		return s ? (s !== l[0] && l.unshift(s), i[s]) : void 0
	}

	function j(e, t, i, n) {
		var r, s, a, o, l, u = {},
			c = e.dataTypes.slice();
		if (c[1])
			for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
		for (s = c.shift(); s;)
			if (e.responseFields[s] && (i[e.responseFields[s]] = t), !l && n && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = c.shift())
				if ("*" === s) s = l;
				else if ("*" !== l && l !== s) {
			if (a = u[l + " " + s] || u["* " + s], !a)
				for (r in u)
					if (o = r.split(" "), o[1] === s && (a = u[l + " " + o[0]] || u["* " + o[0]])) {
						a === !0 ? a = u[r] : u[r] !== !0 && (s = o[0], c.unshift(o[1]));
						break
					}
			if (a !== !0)
				if (a && e["throws"]) t = a(t);
				else try {
					t = a(t)
				} catch (p) {
					return {
						state: "parsererror",
						error: a ? p : "No conversion from " + l + " to " + s
					}
				}
		}
		return {
			state: "success",
			data: t
		}
	}

	function B(e, t, i, n) {
		var r;
		if (J.isArray(t)) J.each(t, function(t, r) {
			i || Ct.test(e) ? n(e, r) : B(e + "[" + ("object" == typeof r ? t : "") + "]", r, i, n)
		});
		else if (i || "object" !== J.type(t)) n(e, t);
		else
			for (r in t) B(e + "[" + r + "]", t[r], i, n)
	}

	function X(e) {
		return J.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
	}
	var q = [],
		H = q.slice,
		$ = q.concat,
		W = q.push,
		V = q.indexOf,
		Y = {},
		G = Y.toString,
		U = Y.hasOwnProperty,
		Q = {},
		Z = e.document,
		K = "2.1.1",
		J = function(e, t) {
			return new J.fn.init(e, t)
		},
		ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		te = /^-ms-/,
		ie = /-([\da-z])/gi,
		ne = function(e, t) {
			return t.toUpperCase()
		};
	J.fn = J.prototype = {
		jquery: K,
		constructor: J,
		selector: "",
		length: 0,
		toArray: function() {
			return H.call(this)
		},
		get: function(e) {
			return null != e ? 0 > e ? this[e + this.length] : this[e] : H.call(this)
		},
		pushStack: function(e) {
			var t = J.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return J.each(this, e, t)
		},
		map: function(e) {
			return this.pushStack(J.map(this, function(t, i) {
				return e.call(t, i, t)
			}))
		},
		slice: function() {
			return this.pushStack(H.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				i = +e + (0 > e ? t : 0);
			return this.pushStack(i >= 0 && t > i ? [this[i]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: W,
		sort: q.sort,
		splice: q.splice
	}, J.extend = J.fn.extend = function() {
		var e, t, i, n, r, s, a = arguments[0] || {},
			o = 1,
			l = arguments.length,
			u = !1;
		for ("boolean" == typeof a && (u = a, a = arguments[o] || {}, o++), "object" == typeof a || J.isFunction(a) || (a = {}), o === l && (a = this, o--); l > o; o++)
			if (null != (e = arguments[o]))
				for (t in e) i = a[t], n = e[t], a !== n && (u && n && (J.isPlainObject(n) || (r = J.isArray(n))) ? (r ? (r = !1, s = i && J.isArray(i) ? i : []) : s = i && J.isPlainObject(i) ? i : {}, a[t] = J.extend(u, s, n)) : void 0 !== n && (a[t] = n));
		return a
	}, J.extend({
		expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return "function" === J.type(e)
		},
		isArray: Array.isArray,
		isWindow: function(e) {
			return null != e && e === e.window
		},
		isNumeric: function(e) {
			return !J.isArray(e) && e - parseFloat(e) >= 0
		},
		isPlainObject: function(e) {
			return "object" !== J.type(e) || e.nodeType || J.isWindow(e) ? !1 : e.constructor && !U.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		type: function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[G.call(e)] || "object" : typeof e
		},
		globalEval: function(e) {
			var t, i = eval;
			e = J.trim(e), e && (1 === e.indexOf("use strict") ? (t = Z.createElement("script"), t.text = e, Z.head.appendChild(t).parentNode.removeChild(t)) : i(e))
		},
		camelCase: function(e) {
			return e.replace(te, "ms-").replace(ie, ne)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, n) {
			var r, s = 0,
				a = e.length,
				o = i(e);
			if (n) {
				if (o)
					for (; a > s && (r = t.apply(e[s], n), r !== !1); s++);
				else
					for (s in e)
						if (r = t.apply(e[s], n), r === !1) break
			} else if (o)
				for (; a > s && (r = t.call(e[s], s, e[s]), r !== !1); s++);
			else
				for (s in e)
					if (r = t.call(e[s], s, e[s]), r === !1) break;
			return e
		},
		trim: function(e) {
			return null == e ? "" : (e + "").replace(ee, "")
		},
		makeArray: function(e, t) {
			var n = t || [];
			return null != e && (i(Object(e)) ? J.merge(n, "string" == typeof e ? [e] : e) : W.call(n, e)), n
		},
		inArray: function(e, t, i) {
			return null == t ? -1 : V.call(t, e, i)
		},
		merge: function(e, t) {
			for (var i = +t.length, n = 0, r = e.length; i > n; n++) e[r++] = t[n];
			return e.length = r, e
		},
		grep: function(e, t, i) {
			for (var n, r = [], s = 0, a = e.length, o = !i; a > s; s++) n = !t(e[s], s), n !== o && r.push(e[s]);
			return r
		},
		map: function(e, t, n) {
			var r, s = 0,
				a = e.length,
				o = i(e),
				l = [];
			if (o)
				for (; a > s; s++) r = t(e[s], s, n), null != r && l.push(r);
			else
				for (s in e) r = t(e[s], s, n), null != r && l.push(r);
			return $.apply([], l)
		},
		guid: 1,
		proxy: function(e, t) {
			var i, n, r;
			return "string" == typeof t && (i = e[t], t = e, e = i), J.isFunction(e) ? (n = H.call(arguments, 2), r = function() {
				return e.apply(t || this, n.concat(H.call(arguments)))
			}, r.guid = e.guid = e.guid || J.guid++, r) : void 0
		},
		now: Date.now,
		support: Q
	}), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		Y["[object " + t + "]"] = t.toLowerCase()
	});
	var re = function(e) {
		function t(e, t, i, n) {
			var r, s, a, o, l, u, p, d, f, m;
			if ((t ? t.ownerDocument || t : B) !== A && M(t), t = t || A, i = i || [], !e || "string" != typeof e) return i;
			if (1 !== (o = t.nodeType) && 9 !== o) return [];
			if (N && !n) {
				if (r = _e.exec(e))
					if (a = r[1]) {
						if (9 === o) {
							if (s = t.getElementById(a), !s || !s.parentNode) return i;
							if (s.id === a) return i.push(s), i
						} else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && F(t, s) && s.id === a) return i.push(s), i
					} else {
						if (r[2]) return J.apply(i, t.getElementsByTagName(e)), i;
						if ((a = r[3]) && x.getElementsByClassName && t.getElementsByClassName) return J.apply(i, t.getElementsByClassName(a)), i
					}
				if (x.qsa && (!L || !L.test(e))) {
					if (d = p = j, f = t, m = 9 === o && e, 1 === o && "object" !== t.nodeName.toLowerCase()) {
						for (u = C(e), (p = t.getAttribute("id")) ? d = p.replace(we, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = u.length; l--;) u[l] = d + h(u[l]);
						f = ye.test(e) && c(t.parentNode) || t, m = u.join(",")
					}
					if (m) try {
						return J.apply(i, f.querySelectorAll(m)), i
					} catch (g) {} finally {
						p || t.removeAttribute("id")
					}
				}
			}
			return k(e.replace(le, "$1"), t, i, n)
		}

		function i() {
			function e(i, n) {
				return t.push(i + " ") > b.cacheLength && delete e[t.shift()], e[i + " "] = n
			}
			var t = [];
			return e
		}

		function n(e) {
			return e[j] = !0, e
		}

		function r(e) {
			var t = A.createElement("div");
			try {
				return !!e(t)
			} catch (i) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function s(e, t) {
			for (var i = e.split("|"), n = e.length; n--;) b.attrHandle[i[n]] = t
		}

		function a(e, t) {
			var i = t && e,
				n = i && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
			if (n) return n;
			if (i)
				for (; i = i.nextSibling;)
					if (i === t) return -1;
			return e ? 1 : -1
		}

		function o(e) {
			return function(t) {
				var i = t.nodeName.toLowerCase();
				return "input" === i && t.type === e
			}
		}

		function l(e) {
			return function(t) {
				var i = t.nodeName.toLowerCase();
				return ("input" === i || "button" === i) && t.type === e
			}
		}

		function u(e) {
			return n(function(t) {
				return t = +t, n(function(i, n) {
					for (var r, s = e([], i.length, t), a = s.length; a--;) i[r = s[a]] && (i[r] = !(n[r] = i[r]))
				})
			})
		}

		function c(e) {
			return e && typeof e.getElementsByTagName !== Y && e
		}

		function p() {}

		function h(e) {
			for (var t = 0, i = e.length, n = ""; i > t; t++) n += e[t].value;
			return n
		}

		function d(e, t, i) {
			var n = t.dir,
				r = i && "parentNode" === n,
				s = q++;
			return t.first ? function(t, i, s) {
				for (; t = t[n];)
					if (1 === t.nodeType || r) return e(t, i, s)
			} : function(t, i, a) {
				var o, l, u = [X, s];
				if (a) {
					for (; t = t[n];)
						if ((1 === t.nodeType || r) && e(t, i, a)) return !0
				} else
					for (; t = t[n];)
						if (1 === t.nodeType || r) {
							if (l = t[j] || (t[j] = {}), (o = l[n]) && o[0] === X && o[1] === s) return u[2] = o[2];
							if (l[n] = u, u[2] = e(t, i, a)) return !0
						}
			}
		}

		function f(e) {
			return e.length > 1 ? function(t, i, n) {
				for (var r = e.length; r--;)
					if (!e[r](t, i, n)) return !1;
				return !0
			} : e[0]
		}

		function m(e, i, n) {
			for (var r = 0, s = i.length; s > r; r++) t(e, i[r], n);
			return n
		}

		function g(e, t, i, n, r) {
			for (var s, a = [], o = 0, l = e.length, u = null != t; l > o; o++)(s = e[o]) && (!i || i(s, n, r)) && (a.push(s), u && t.push(o));
			return a
		}

		function v(e, t, i, r, s, a) {
			return r && !r[j] && (r = v(r)), s && !s[j] && (s = v(s, a)), n(function(n, a, o, l) {
				var u, c, p, h = [],
					d = [],
					f = a.length,
					v = n || m(t || "*", o.nodeType ? [o] : o, []),
					_ = !e || !n && t ? v : g(v, h, e, o, l),
					y = i ? s || (n ? e : f || r) ? [] : a : _;
				if (i && i(_, y, o, l), r)
					for (u = g(y, d), r(u, [], o, l), c = u.length; c--;)(p = u[c]) && (y[d[c]] = !(_[d[c]] = p));
				if (n) {
					if (s || e) {
						if (s) {
							for (u = [], c = y.length; c--;)(p = y[c]) && u.push(_[c] = p);
							s(null, y = [], u, l)
						}
						for (c = y.length; c--;)(p = y[c]) && (u = s ? te.call(n, p) : h[c]) > -1 && (n[u] = !(a[u] = p))
					}
				} else y = g(y === a ? y.splice(f, y.length) : y), s ? s(null, a, y, l) : J.apply(a, y)
			})
		}

		function _(e) {
			for (var t, i, n, r = e.length, s = b.relative[e[0].type], a = s || b.relative[" "], o = s ? 1 : 0, l = d(function(e) {
					return e === t
				}, a, !0), u = d(function(e) {
					return te.call(t, e) > -1
				}, a, !0), c = [function(e, i, n) {
					return !s && (n || i !== D) || ((t = i).nodeType ? l(e, i, n) : u(e, i, n))
				}]; r > o; o++)
				if (i = b.relative[e[o].type]) c = [d(f(c), i)];
				else {
					if (i = b.filter[e[o].type].apply(null, e[o].matches), i[j]) {
						for (n = ++o; r > n && !b.relative[e[n].type]; n++);
						return v(o > 1 && f(c), o > 1 && h(e.slice(0, o - 1).concat({
							value: " " === e[o - 2].type ? "*" : ""
						})).replace(le, "$1"), i, n > o && _(e.slice(o, n)), r > n && _(e = e.slice(n)), r > n && h(e))
					}
					c.push(i)
				}
			return f(c)
		}

		function y(e, i) {
			var r = i.length > 0,
				s = e.length > 0,
				a = function(n, a, o, l, u) {
					var c, p, h, d = 0,
						f = "0",
						m = n && [],
						v = [],
						_ = D,
						y = n || s && b.find.TAG("*", u),
						w = X += null == _ ? 1 : Math.random() || .1,
						x = y.length;
					for (u && (D = a !== A && a); f !== x && null != (c = y[f]); f++) {
						if (s && c) {
							for (p = 0; h = e[p++];)
								if (h(c, a, o)) {
									l.push(c);
									break
								}
							u && (X = w)
						}
						r && ((c = !h && c) && d--, n && m.push(c))
					}
					if (d += f, r && f !== d) {
						for (p = 0; h = i[p++];) h(m, v, a, o);
						if (n) {
							if (d > 0)
								for (; f--;) m[f] || v[f] || (v[f] = Z.call(l));
							v = g(v)
						}
						J.apply(l, v), u && !n && v.length > 0 && d + i.length > 1 && t.uniqueSort(l)
					}
					return u && (X = w, D = _), m
				};
			return r ? n(a) : a
		}
		var w, x, b, T, S, C, P, k, D, O, E, M, A, R, N, L, I, z, F, j = "sizzle" + -new Date,
			B = e.document,
			X = 0,
			q = 0,
			H = i(),
			$ = i(),
			W = i(),
			V = function(e, t) {
				return e === t && (E = !0), 0
			},
			Y = "undefined",
			G = 1 << 31,
			U = {}.hasOwnProperty,
			Q = [],
			Z = Q.pop,
			K = Q.push,
			J = Q.push,
			ee = Q.slice,
			te = Q.indexOf || function(e) {
				for (var t = 0, i = this.length; i > t; t++)
					if (this[t] === e) return t;
				return -1
			},
			ie = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			ne = "[\\x20\\t\\r\\n\\f]",
			re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			se = re.replace("w", "w#"),
			ae = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + se + "))|)" + ne + "*\\]",
			oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)",
			le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
			ue = new RegExp("^" + ne + "*," + ne + "*"),
			ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
			pe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
			he = new RegExp(oe),
			de = new RegExp("^" + se + "$"),
			fe = {
				ID: new RegExp("^#(" + re + ")"),
				CLASS: new RegExp("^\\.(" + re + ")"),
				TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + ae),
				PSEUDO: new RegExp("^" + oe),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + ie + ")$", "i"),
				needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
			},
			me = /^(?:input|select|textarea|button)$/i,
			ge = /^h\d$/i,
			ve = /^[^{]+\{\s*\[native \w/,
			_e = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			ye = /[+~]/,
			we = /'|\\/g,
			xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
			be = function(e, t, i) {
				var n = "0x" + t - 65536;
				return n !== n || i ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
			};
		try {
			J.apply(Q = ee.call(B.childNodes), B.childNodes), Q[B.childNodes.length].nodeType
		} catch (Te) {
			J = {
				apply: Q.length ? function(e, t) {
					K.apply(e, ee.call(t))
				} : function(e, t) {
					for (var i = e.length, n = 0; e[i++] = t[n++];);
					e.length = i - 1
				}
			}
		}
		x = t.support = {}, S = t.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, M = t.setDocument = function(e) {
			var t, i = e ? e.ownerDocument || e : B,
				n = i.defaultView;
			return i !== A && 9 === i.nodeType && i.documentElement ? (A = i, R = i.documentElement, N = !S(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
				M()
			}, !1) : n.attachEvent && n.attachEvent("onunload", function() {
				M()
			})), x.attributes = r(function(e) {
				return e.className = "i", !e.getAttribute("className")
			}), x.getElementsByTagName = r(function(e) {
				return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
			}), x.getElementsByClassName = ve.test(i.getElementsByClassName) && r(function(e) {
				return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
			}), x.getById = r(function(e) {
				return R.appendChild(e).id = j, !i.getElementsByName || !i.getElementsByName(j).length
			}), x.getById ? (b.find.ID = function(e, t) {
				if (typeof t.getElementById !== Y && N) {
					var i = t.getElementById(e);
					return i && i.parentNode ? [i] : []
				}
			}, b.filter.ID = function(e) {
				var t = e.replace(xe, be);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete b.find.ID, b.filter.ID = function(e) {
				var t = e.replace(xe, be);
				return function(e) {
					var i = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
					return i && i.value === t
				}
			}), b.find.TAG = x.getElementsByTagName ? function(e, t) {
				return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
			} : function(e, t) {
				var i, n = [],
					r = 0,
					s = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; i = s[r++];) 1 === i.nodeType && n.push(i);
					return n
				}
				return s
			}, b.find.CLASS = x.getElementsByClassName && function(e, t) {
				return typeof t.getElementsByClassName !== Y && N ? t.getElementsByClassName(e) : void 0
			}, I = [], L = [], (x.qsa = ve.test(i.querySelectorAll)) && (r(function(e) {
				e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + ie + ")"), e.querySelectorAll(":checked").length || L.push(":checked")
			}), r(function(e) {
				var t = i.createElement("input");
				t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
			})), (x.matchesSelector = ve.test(z = R.matches || R.webkitMatchesSelector || R.mozMatchesSelector || R.oMatchesSelector || R.msMatchesSelector)) && r(function(e) {
				x.disconnectedMatch = z.call(e, "div"), z.call(e, "[s!='']:x"), I.push("!=", oe)
			}), L = L.length && new RegExp(L.join("|")), I = I.length && new RegExp(I.join("|")), t = ve.test(R.compareDocumentPosition), F = t || ve.test(R.contains) ? function(e, t) {
				var i = 9 === e.nodeType ? e.documentElement : e,
					n = t && t.parentNode;
				return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
			} : function(e, t) {
				if (t)
					for (; t = t.parentNode;)
						if (t === e) return !0;
				return !1
			}, V = t ? function(e, t) {
				if (e === t) return E = !0, 0;
				var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
				return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === B && F(B, e) ? -1 : t === i || t.ownerDocument === B && F(B, t) ? 1 : O ? te.call(O, e) - te.call(O, t) : 0 : 4 & n ? -1 : 1)
			} : function(e, t) {
				if (e === t) return E = !0, 0;
				var n, r = 0,
					s = e.parentNode,
					o = t.parentNode,
					l = [e],
					u = [t];
				if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : O ? te.call(O, e) - te.call(O, t) : 0;
				if (s === o) return a(e, t);
				for (n = e; n = n.parentNode;) l.unshift(n);
				for (n = t; n = n.parentNode;) u.unshift(n);
				for (; l[r] === u[r];) r++;
				return r ? a(l[r], u[r]) : l[r] === B ? -1 : u[r] === B ? 1 : 0
			}, i) : A
		}, t.matches = function(e, i) {
			return t(e, null, null, i)
		}, t.matchesSelector = function(e, i) {
			if ((e.ownerDocument || e) !== A && M(e), i = i.replace(pe, "='$1']"), !(!x.matchesSelector || !N || I && I.test(i) || L && L.test(i))) try {
				var n = z.call(e, i);
				if (n || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
			} catch (r) {}
			return t(i, A, null, [e]).length > 0
		}, t.contains = function(e, t) {
			return (e.ownerDocument || e) !== A && M(e), F(e, t)
		}, t.attr = function(e, t) {
			(e.ownerDocument || e) !== A && M(e);
			var i = b.attrHandle[t.toLowerCase()],
				n = i && U.call(b.attrHandle, t.toLowerCase()) ? i(e, t, !N) : void 0;
			return void 0 !== n ? n : x.attributes || !N ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
		}, t.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, t.uniqueSort = function(e) {
			var t, i = [],
				n = 0,
				r = 0;
			if (E = !x.detectDuplicates, O = !x.sortStable && e.slice(0), e.sort(V), E) {
				for (; t = e[r++];) t === e[r] && (n = i.push(r));
				for (; n--;) e.splice(i[n], 1)
			}
			return O = null, e
		}, T = t.getText = function(e) {
			var t, i = "",
				n = 0,
				r = e.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) i += T(e)
				} else if (3 === r || 4 === r) return e.nodeValue;

			} else
				for (; t = e[n++];) i += T(t);
			return i
		}, b = t.selectors = {
			cacheLength: 50,
			createPseudo: n,
			match: fe,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(xe, be), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, be), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
				},
				PSEUDO: function(e) {
					var t, i = !e[6] && e[2];
					return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : i && he.test(i) && (t = C(i, !0)) && (t = i.indexOf(")", i.length - t) - i.length) && (e[0] = e[0].slice(0, t), e[2] = i.slice(0, t)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e.replace(xe, be).toLowerCase();
					return "*" === e ? function() {
						return !0
					} : function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(e) {
					var t = H[e + " "];
					return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && H(e, function(e) {
						return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, i, n) {
					return function(r) {
						var s = t.attr(r, e);
						return null == s ? "!=" === i : i ? (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s + " ").indexOf(n) > -1 : "|=" === i ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, i, n, r) {
					var s = "nth" !== e.slice(0, 3),
						a = "last" !== e.slice(-4),
						o = "of-type" === t;
					return 1 === n && 0 === r ? function(e) {
						return !!e.parentNode
					} : function(t, i, l) {
						var u, c, p, h, d, f, m = s !== a ? "nextSibling" : "previousSibling",
							g = t.parentNode,
							v = o && t.nodeName.toLowerCase(),
							_ = !l && !o;
						if (g) {
							if (s) {
								for (; m;) {
									for (p = t; p = p[m];)
										if (o ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
									f = m = "only" === e && !f && "nextSibling"
								}
								return !0
							}
							if (f = [a ? g.firstChild : g.lastChild], a && _) {
								for (c = g[j] || (g[j] = {}), u = c[e] || [], d = u[0] === X && u[1], h = u[0] === X && u[2], p = d && g.childNodes[d]; p = ++d && p && p[m] || (h = d = 0) || f.pop();)
									if (1 === p.nodeType && ++h && p === t) {
										c[e] = [X, d, h];
										break
									}
							} else if (_ && (u = (t[j] || (t[j] = {}))[e]) && u[0] === X) h = u[1];
							else
								for (;
									(p = ++d && p && p[m] || (h = d = 0) || f.pop()) && ((o ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++h || (_ && ((p[j] || (p[j] = {}))[e] = [X, h]), p !== t)););
							return h -= r, h === n || h % n === 0 && h / n >= 0
						}
					}
				},
				PSEUDO: function(e, i) {
					var r, s = b.pseudos[e] || b.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
					return s[j] ? s(i) : s.length > 1 ? (r = [e, e, "", i], b.setFilters.hasOwnProperty(e.toLowerCase()) ? n(function(e, t) {
						for (var n, r = s(e, i), a = r.length; a--;) n = te.call(e, r[a]), e[n] = !(t[n] = r[a])
					}) : function(e) {
						return s(e, 0, r)
					}) : s
				}
			},
			pseudos: {
				not: n(function(e) {
					var t = [],
						i = [],
						r = P(e.replace(le, "$1"));
					return r[j] ? n(function(e, t, i, n) {
						for (var s, a = r(e, null, n, []), o = e.length; o--;)(s = a[o]) && (e[o] = !(t[o] = s))
					}) : function(e, n, s) {
						return t[0] = e, r(t, null, s, i), !i.pop()
					}
				}),
				has: n(function(e) {
					return function(i) {
						return t(e, i).length > 0
					}
				}),
				contains: n(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
					}
				}),
				lang: n(function(e) {
					return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, be).toLowerCase(),
						function(t) {
							var i;
							do
								if (i = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === e || 0 === i.indexOf(e + "-");
							while ((t = t.parentNode) && 1 === t.nodeType);
							return !1
						}
				}),
				target: function(t) {
					var i = e.location && e.location.hash;
					return i && i.slice(1) === t.id
				},
				root: function(e) {
					return e === R
				},
				focus: function(e) {
					return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !!e.checked || "option" === t && !!e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling)
						if (e.nodeType < 6) return !1;
					return !0
				},
				parent: function(e) {
					return !b.pseudos.empty(e)
				},
				header: function(e) {
					return ge.test(e.nodeName)
				},
				input: function(e) {
					return me.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
				},
				first: u(function() {
					return [0]
				}),
				last: u(function(e, t) {
					return [t - 1]
				}),
				eq: u(function(e, t, i) {
					return [0 > i ? i + t : i]
				}),
				even: u(function(e, t) {
					for (var i = 0; t > i; i += 2) e.push(i);
					return e
				}),
				odd: u(function(e, t) {
					for (var i = 1; t > i; i += 2) e.push(i);
					return e
				}),
				lt: u(function(e, t, i) {
					for (var n = 0 > i ? i + t : i; --n >= 0;) e.push(n);
					return e
				}),
				gt: u(function(e, t, i) {
					for (var n = 0 > i ? i + t : i; ++n < t;) e.push(n);
					return e
				})
			}
		}, b.pseudos.nth = b.pseudos.eq;
		for (w in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) b.pseudos[w] = o(w);
		for (w in {
				submit: !0,
				reset: !0
			}) b.pseudos[w] = l(w);
		return p.prototype = b.filters = b.pseudos, b.setFilters = new p, C = t.tokenize = function(e, i) {
			var n, r, s, a, o, l, u, c = $[e + " "];
			if (c) return i ? 0 : c.slice(0);
			for (o = e, l = [], u = b.preFilter; o;) {
				(!n || (r = ue.exec(o))) && (r && (o = o.slice(r[0].length) || o), l.push(s = [])), n = !1, (r = ce.exec(o)) && (n = r.shift(), s.push({
					value: n,
					type: r[0].replace(le, " ")
				}), o = o.slice(n.length));
				for (a in b.filter) !(r = fe[a].exec(o)) || u[a] && !(r = u[a](r)) || (n = r.shift(), s.push({
					value: n,
					type: a,
					matches: r
				}), o = o.slice(n.length));
				if (!n) break
			}
			return i ? o.length : o ? t.error(e) : $(e, l).slice(0)
		}, P = t.compile = function(e, t) {
			var i, n = [],
				r = [],
				s = W[e + " "];
			if (!s) {
				for (t || (t = C(e)), i = t.length; i--;) s = _(t[i]), s[j] ? n.push(s) : r.push(s);
				s = W(e, y(r, n)), s.selector = e
			}
			return s
		}, k = t.select = function(e, t, i, n) {
			var r, s, a, o, l, u = "function" == typeof e && e,
				p = !n && C(e = u.selector || e);
			if (i = i || [], 1 === p.length) {
				if (s = p[0] = p[0].slice(0), s.length > 2 && "ID" === (a = s[0]).type && x.getById && 9 === t.nodeType && N && b.relative[s[1].type]) {
					if (t = (b.find.ID(a.matches[0].replace(xe, be), t) || [])[0], !t) return i;
					u && (t = t.parentNode), e = e.slice(s.shift().value.length)
				}
				for (r = fe.needsContext.test(e) ? 0 : s.length; r-- && (a = s[r], !b.relative[o = a.type]);)
					if ((l = b.find[o]) && (n = l(a.matches[0].replace(xe, be), ye.test(s[0].type) && c(t.parentNode) || t))) {
						if (s.splice(r, 1), e = n.length && h(s), !e) return J.apply(i, n), i;
						break
					}
			}
			return (u || P(e, p))(n, t, !N, i, ye.test(e) && c(t.parentNode) || t), i
		}, x.sortStable = j.split("").sort(V).join("") === j, x.detectDuplicates = !!E, M(), x.sortDetached = r(function(e) {
			return 1 & e.compareDocumentPosition(A.createElement("div"))
		}), r(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || s("type|href|height|width", function(e, t, i) {
			return i ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), x.attributes && r(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || s("value", function(e, t, i) {
			return i || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
		}), r(function(e) {
			return null == e.getAttribute("disabled")
		}) || s(ie, function(e, t, i) {
			var n;
			return i ? void 0 : e[t] === !0 ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
		}), t
	}(e);
	J.find = re, J.expr = re.selectors, J.expr[":"] = J.expr.pseudos, J.unique = re.uniqueSort, J.text = re.getText, J.isXMLDoc = re.isXML, J.contains = re.contains;
	var se = J.expr.match.needsContext,
		ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		oe = /^.[^:#\[\.,]*$/;
	J.filter = function(e, t, i) {
		var n = t[0];
		return i && (e = ":not(" + e + ")"), 1 === t.length && 1 === n.nodeType ? J.find.matchesSelector(n, e) ? [n] : [] : J.find.matches(e, J.grep(t, function(e) {
			return 1 === e.nodeType
		}))
	}, J.fn.extend({
		find: function(e) {
			var t, i = this.length,
				n = [],
				r = this;
			if ("string" != typeof e) return this.pushStack(J(e).filter(function() {
				for (t = 0; i > t; t++)
					if (J.contains(r[t], this)) return !0
			}));
			for (t = 0; i > t; t++) J.find(e, r[t], n);
			return n = this.pushStack(i > 1 ? J.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		filter: function(e) {
			return this.pushStack(n(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(n(this, e || [], !0))
		},
		is: function(e) {
			return !!n(this, "string" == typeof e && se.test(e) ? J(e) : e || [], !1).length
		}
	});
	var le, ue = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		ce = J.fn.init = function(e, t) {
			var i, n;
			if (!e) return this;
			if ("string" == typeof e) {
				if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ue.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || le).find(e) : this.constructor(t).find(e);
				if (i[1]) {
					if (t = t instanceof J ? t[0] : t, J.merge(this, J.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : Z, !0)), ae.test(i[1]) && J.isPlainObject(t))
						for (i in t) J.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
					return this
				}
				return n = Z.getElementById(i[2]), n && n.parentNode && (this.length = 1, this[0] = n), this.context = Z, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : J.isFunction(e) ? "undefined" != typeof le.ready ? le.ready(e) : e(J) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), J.makeArray(e, this))
		};
	ce.prototype = J.fn, le = J(Z);
	var pe = /^(?:parents|prev(?:Until|All))/,
		he = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	J.extend({
		dir: function(e, t, i) {
			for (var n = [], r = void 0 !== i;
				(e = e[t]) && 9 !== e.nodeType;)
				if (1 === e.nodeType) {
					if (r && J(e).is(i)) break;
					n.push(e)
				}
			return n
		},
		sibling: function(e, t) {
			for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
			return i
		}
	}), J.fn.extend({
		has: function(e) {
			var t = J(e, this),
				i = t.length;
			return this.filter(function() {
				for (var e = 0; i > e; e++)
					if (J.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			for (var i, n = 0, r = this.length, s = [], a = se.test(e) || "string" != typeof e ? J(e, t || this.context) : 0; r > n; n++)
				for (i = this[n]; i && i !== t; i = i.parentNode)
					if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && J.find.matchesSelector(i, e))) {
						s.push(i);
						break
					}
			return this.pushStack(s.length > 1 ? J.unique(s) : s)
		},
		index: function(e) {
			return e ? "string" == typeof e ? V.call(J(e), this[0]) : V.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(J.unique(J.merge(this.get(), J(e, t))))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), J.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return J.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, i) {
			return J.dir(e, "parentNode", i)
		},
		next: function(e) {
			return r(e, "nextSibling")
		},
		prev: function(e) {
			return r(e, "previousSibling")
		},
		nextAll: function(e) {
			return J.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return J.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, i) {
			return J.dir(e, "nextSibling", i)
		},
		prevUntil: function(e, t, i) {
			return J.dir(e, "previousSibling", i)
		},
		siblings: function(e) {
			return J.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return J.sibling(e.firstChild)
		},
		contents: function(e) {
			return e.contentDocument || J.merge([], e.childNodes)
		}
	}, function(e, t) {
		J.fn[e] = function(i, n) {
			var r = J.map(this, t, i);
			return "Until" !== e.slice(-5) && (n = i), n && "string" == typeof n && (r = J.filter(n, r)), this.length > 1 && (he[e] || J.unique(r), pe.test(e) && r.reverse()), this.pushStack(r)
		}
	});
	var de = /\S+/g,
		fe = {};
	J.Callbacks = function(e) {
		e = "string" == typeof e ? fe[e] || s(e) : J.extend({}, e);
		var t, i, n, r, a, o, l = [],
			u = !e.once && [],
			c = function(s) {
				for (t = e.memory && s, i = !0, o = r || 0, r = 0, a = l.length, n = !0; l && a > o; o++)
					if (l[o].apply(s[0], s[1]) === !1 && e.stopOnFalse) {
						t = !1;
						break
					}
				n = !1, l && (u ? u.length && c(u.shift()) : t ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if (l) {
						var i = l.length;
						! function s(t) {
							J.each(t, function(t, i) {
								var n = J.type(i);
								"function" === n ? e.unique && p.has(i) || l.push(i) : i && i.length && "string" !== n && s(i)
							})
						}(arguments), n ? a = l.length : t && (r = i, c(t))
					}
					return this
				},
				remove: function() {
					return l && J.each(arguments, function(e, t) {
						for (var i;
							(i = J.inArray(t, l, i)) > -1;) l.splice(i, 1), n && (a >= i && a--, o >= i && o--)
					}), this
				},
				has: function(e) {
					return e ? J.inArray(e, l) > -1 : !(!l || !l.length)
				},
				empty: function() {
					return l = [], a = 0, this
				},
				disable: function() {
					return l = u = t = void 0, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return u = void 0, t || p.disable(), this
				},
				locked: function() {
					return !u
				},
				fireWith: function(e, t) {
					return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!i
				}
			};
		return p
	}, J.extend({
		Deferred: function(e) {
			var t = [
					["resolve", "done", J.Callbacks("once memory"), "resolved"],
					["reject", "fail", J.Callbacks("once memory"), "rejected"],
					["notify", "progress", J.Callbacks("memory")]
				],
				i = "pending",
				n = {
					state: function() {
						return i
					},
					always: function() {
						return r.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return J.Deferred(function(i) {
							J.each(t, function(t, s) {
								var a = J.isFunction(e[t]) && e[t];
								r[s[1]](function() {
									var e = a && a.apply(this, arguments);
									e && J.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, a ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? J.extend(e, n) : n
					}
				},
				r = {};
			return n.pipe = n.then, J.each(t, function(e, s) {
				var a = s[2],
					o = s[3];
				n[s[1]] = a.add, o && a.add(function() {
					i = o
				}, t[1 ^ e][2].disable, t[2][2].lock), r[s[0]] = function() {
					return r[s[0] + "With"](this === r ? n : this, arguments), this
				}, r[s[0] + "With"] = a.fireWith
			}), n.promise(r), e && e.call(r, r), r
		},
		when: function(e) {
			var t, i, n, r = 0,
				s = H.call(arguments),
				a = s.length,
				o = 1 !== a || e && J.isFunction(e.promise) ? a : 0,
				l = 1 === o ? e : J.Deferred(),
				u = function(e, i, n) {
					return function(r) {
						i[e] = this, n[e] = arguments.length > 1 ? H.call(arguments) : r, n === t ? l.notifyWith(i, n) : --o || l.resolveWith(i, n)
					}
				};
			if (a > 1)
				for (t = new Array(a), i = new Array(a), n = new Array(a); a > r; r++) s[r] && J.isFunction(s[r].promise) ? s[r].promise().done(u(r, n, s)).fail(l.reject).progress(u(r, i, t)) : --o;
			return o || l.resolveWith(n, s), l.promise()
		}
	});
	var me;
	J.fn.ready = function(e) {
		return J.ready.promise().done(e), this
	}, J.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? J.readyWait++ : J.ready(!0)
		},
		ready: function(e) {
			(e === !0 ? --J.readyWait : J.isReady) || (J.isReady = !0, e !== !0 && --J.readyWait > 0 || (me.resolveWith(Z, [J]), J.fn.triggerHandler && (J(Z).triggerHandler("ready"), J(Z).off("ready"))))
		}
	}), J.ready.promise = function(t) {
		return me || (me = J.Deferred(), "complete" === Z.readyState ? setTimeout(J.ready) : (Z.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), me.promise(t)
	}, J.ready.promise();
	var ge = J.access = function(e, t, i, n, r, s, a) {
		var o = 0,
			l = e.length,
			u = null == i;
		if ("object" === J.type(i)) {
			r = !0;
			for (o in i) J.access(e, t, o, i[o], !0, s, a)
		} else if (void 0 !== n && (r = !0, J.isFunction(n) || (a = !0), u && (a ? (t.call(e, n), t = null) : (u = t, t = function(e, t, i) {
				return u.call(J(e), i)
			})), t))
			for (; l > o; o++) t(e[o], i, a ? n : n.call(e[o], o, t(e[o], i)));
		return r ? e : u ? t.call(e) : l ? t(e[0], i) : s
	};
	J.acceptData = function(e) {
		return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
	}, o.uid = 1, o.accepts = J.acceptData, o.prototype = {
		key: function(e) {
			if (!o.accepts(e)) return 0;
			var t = {},
				i = e[this.expando];
			if (!i) {
				i = o.uid++;
				try {
					t[this.expando] = {
						value: i
					}, Object.defineProperties(e, t)
				} catch (n) {
					t[this.expando] = i, J.extend(e, t)
				}
			}
			return this.cache[i] || (this.cache[i] = {}), i
		},
		set: function(e, t, i) {
			var n, r = this.key(e),
				s = this.cache[r];
			if ("string" == typeof t) s[t] = i;
			else if (J.isEmptyObject(s)) J.extend(this.cache[r], t);
			else
				for (n in t) s[n] = t[n];
			return s
		},
		get: function(e, t) {
			var i = this.cache[this.key(e)];
			return void 0 === t ? i : i[t]
		},
		access: function(e, t, i) {
			var n;
			return void 0 === t || t && "string" == typeof t && void 0 === i ? (n = this.get(e, t), void 0 !== n ? n : this.get(e, J.camelCase(t))) : (this.set(e, t, i), void 0 !== i ? i : t)
		},
		remove: function(e, t) {
			var i, n, r, s = this.key(e),
				a = this.cache[s];
			if (void 0 === t) this.cache[s] = {};
			else {
				J.isArray(t) ? n = t.concat(t.map(J.camelCase)) : (r = J.camelCase(t), t in a ? n = [t, r] : (n = r, n = n in a ? [n] : n.match(de) || [])), i = n.length;
				for (; i--;) delete a[n[i]]
			}
		},
		hasData: function(e) {
			return !J.isEmptyObject(this.cache[e[this.expando]] || {})
		},
		discard: function(e) {
			e[this.expando] && delete this.cache[e[this.expando]]
		}
	};
	var ve = new o,
		_e = new o,
		ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		we = /([A-Z])/g;
	J.extend({
		hasData: function(e) {
			return _e.hasData(e) || ve.hasData(e)
		},
		data: function(e, t, i) {
			return _e.access(e, t, i)
		},
		removeData: function(e, t) {
			_e.remove(e, t)
		},
		_data: function(e, t, i) {
			return ve.access(e, t, i)
		},
		_removeData: function(e, t) {
			ve.remove(e, t)
		}
	}), J.fn.extend({
		data: function(e, t) {
			var i, n, r, s = this[0],
				a = s && s.attributes;
			if (void 0 === e) {
				if (this.length && (r = _e.get(s), 1 === s.nodeType && !ve.get(s, "hasDataAttrs"))) {
					for (i = a.length; i--;) a[i] && (n = a[i].name, 0 === n.indexOf("data-") && (n = J.camelCase(n.slice(5)), l(s, n, r[n])));
					ve.set(s, "hasDataAttrs", !0)
				}
				return r
			}
			return "object" == typeof e ? this.each(function() {
				_e.set(this, e)
			}) : ge(this, function(t) {
				var i, n = J.camelCase(e);
				if (s && void 0 === t) {
					if (i = _e.get(s, e), void 0 !== i) return i;
					if (i = _e.get(s, n), void 0 !== i) return i;
					if (i = l(s, n, void 0), void 0 !== i) return i
				} else this.each(function() {
					var i = _e.get(this, n);
					_e.set(this, n, t), -1 !== e.indexOf("-") && void 0 !== i && _e.set(this, e, t)
				})
			}, null, t, arguments.length > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				_e.remove(this, e)
			})
		}
	}), J.extend({
		queue: function(e, t, i) {
			var n;
			return e ? (t = (t || "fx") + "queue", n = ve.get(e, t), i && (!n || J.isArray(i) ? n = ve.access(e, t, J.makeArray(i)) : n.push(i)), n || []) : void 0
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var i = J.queue(e, t),
				n = i.length,
				r = i.shift(),
				s = J._queueHooks(e, t),
				a = function() {
					J.dequeue(e, t)
				};
			"inprogress" === r && (r = i.shift(), n--), r && ("fx" === t && i.unshift("inprogress"), delete s.stop, r.call(e, a, s)), !n && s && s.empty.fire()
		},
		_queueHooks: function(e, t) {
			var i = t + "queueHooks";
			return ve.get(e, i) || ve.access(e, i, {
				empty: J.Callbacks("once memory").add(function() {
					ve.remove(e, [t + "queue", i])
				})
			})
		}
	}), J.fn.extend({
		queue: function(e, t) {
			var i = 2;
			return "string" != typeof e && (t = e, e = "fx", i--), arguments.length < i ? J.queue(this[0], e) : void 0 === t ? this : this.each(function() {
				var i = J.queue(this, e, t);
				J._queueHooks(this, e), "fx" === e && "inprogress" !== i[0] && J.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				J.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var i, n = 1,
				r = J.Deferred(),
				s = this,
				a = this.length,
				o = function() {
					--n || r.resolveWith(s, [s])
				};
			for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) i = ve.get(s[a], e + "queueHooks"), i && i.empty && (n++, i.empty.add(o));
			return o(), r.promise(t)
		}
	});
	var xe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		be = ["Top", "Right", "Bottom", "Left"],
		Te = function(e, t) {
			return e = t || e, "none" === J.css(e, "display") || !J.contains(e.ownerDocument, e)
		},
		Se = /^(?:checkbox|radio)$/i;
	! function() {
		var e = Z.createDocumentFragment(),
			t = e.appendChild(Z.createElement("div")),
			i = Z.createElement("input");
		i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), t.appendChild(i), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
	}();
	var Ce = "undefined";
	Q.focusinBubbles = "onfocusin" in e;
	var Pe = /^key/,
		ke = /^(?:mouse|pointer|contextmenu)|click/,
		De = /^(?:focusinfocus|focusoutblur)$/,
		Oe = /^([^.]*)(?:\.(.+)|)$/;
	J.event = {
		global: {},
		add: function(e, t, i, n, r) {
			var s, a, o, l, u, c, p, h, d, f, m, g = ve.get(e);
			if (g)
				for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = J.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
						return typeof J !== Ce && J.event.triggered !== t.type ? J.event.dispatch.apply(e, arguments) : void 0
					}), t = (t || "").match(de) || [""], u = t.length; u--;) o = Oe.exec(t[u]) || [], d = m = o[1], f = (o[2] || "").split(".").sort(), d && (p = J.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, p = J.event.special[d] || {}, c = J.extend({
					type: d,
					origType: m,
					data: n,
					handler: i,
					guid: i.guid,
					selector: r,
					needsContext: r && J.expr.match.needsContext.test(r),
					namespace: f.join(".")
				}, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, p.setup && p.setup.call(e, n, f, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = i.guid)), r ? h.splice(h.delegateCount++, 0, c) : h.push(c), J.event.global[d] = !0)
		},
		remove: function(e, t, i, n, r) {
			var s, a, o, l, u, c, p, h, d, f, m, g = ve.hasData(e) && ve.get(e);
			if (g && (l = g.events)) {
				for (t = (t || "").match(de) || [""], u = t.length; u--;)
					if (o = Oe.exec(t[u]) || [], d = m = o[1], f = (o[2] || "").split(".").sort(), d) {
						for (p = J.event.special[d] || {}, d = (n ? p.delegateType : p.bindType) || d, h = l[d] || [], o = o[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = h.length; s--;) c = h[s], !r && m !== c.origType || i && i.guid !== c.guid || o && !o.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (h.splice(s, 1), c.selector && h.delegateCount--, p.remove && p.remove.call(e, c));
						a && !h.length && (p.teardown && p.teardown.call(e, f, g.handle) !== !1 || J.removeEvent(e, d, g.handle), delete l[d])
					} else
						for (d in l) J.event.remove(e, d + t[u], i, n, !0);
				J.isEmptyObject(l) && (delete g.handle, ve.remove(e, "events"))
			}
		},
		trigger: function(t, i, n, r) {
			var s, a, o, l, u, c, p, h = [n || Z],
				d = U.call(t, "type") ? t.type : t,
				f = U.call(t, "namespace") ? t.namespace.split(".") : [];
			if (a = o = n = n || Z, 3 !== n.nodeType && 8 !== n.nodeType && !De.test(d + J.event.triggered) && (d.indexOf(".") >= 0 && (f = d.split("."), d = f.shift(), f.sort()), u = d.indexOf(":") < 0 && "on" + d, t = t[J.expando] ? t : new J.Event(d, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = n), i = null == i ? [t] : J.makeArray(i, [t]), p = J.event.special[d] || {}, r || !p.trigger || p.trigger.apply(n, i) !== !1)) {
				if (!r && !p.noBubble && !J.isWindow(n)) {
					for (l = p.delegateType || d, De.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), o = a;
					o === (n.ownerDocument || Z) && h.push(o.defaultView || o.parentWindow || e)
				}
				for (s = 0;
					(a = h[s++]) && !t.isPropagationStopped();) t.type = s > 1 ? l : p.bindType || d, c = (ve.get(a, "events") || {})[t.type] && ve.get(a, "handle"), c && c.apply(a, i), c = u && a[u], c && c.apply && J.acceptData(a) && (t.result = c.apply(a, i), t.result === !1 && t.preventDefault());
				return t.type = d, r || t.isDefaultPrevented() || p._default && p._default.apply(h.pop(), i) !== !1 || !J.acceptData(n) || u && J.isFunction(n[d]) && !J.isWindow(n) && (o = n[u], o && (n[u] = null), J.event.triggered = d, n[d](), J.event.triggered = void 0, o && (n[u] = o)), t.result
			}
		},
		dispatch: function(e) {
			e = J.event.fix(e);
			var t, i, n, r, s, a = [],
				o = H.call(arguments),
				l = (ve.get(this, "events") || {})[e.type] || [],
				u = J.event.special[e.type] || {};
			if (o[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
				for (a = J.event.handlers.call(this, e, l), t = 0;
					(r = a[t++]) && !e.isPropagationStopped();)
					for (e.currentTarget = r.elem, i = 0;
						(s = r.handlers[i++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(s.namespace)) && (e.handleObj = s, e.data = s.data, n = ((J.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, o), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, t) {
			var i, n, r, s, a = [],
				o = t.delegateCount,
				l = e.target;
			if (o && l.nodeType && (!e.button || "click" !== e.type))
				for (; l !== this; l = l.parentNode || this)
					if (l.disabled !== !0 || "click" !== e.type) {
						for (n = [], i = 0; o > i; i++) s = t[i], r = s.selector + " ", void 0 === n[r] && (n[r] = s.needsContext ? J(r, this).index(l) >= 0 : J.find(r, this, null, [l]).length), n[r] && n.push(s);
						n.length && a.push({
							elem: l,
							handlers: n
						})
					}
			return o < t.length && a.push({
				elem: this,
				handlers: t.slice(o)
			}), a
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var i, n, r, s = t.button;
				return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || Z, n = i.documentElement, r = i.body, e.pageX = t.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
			}
		},
		fix: function(e) {
			if (e[J.expando]) return e;
			var t, i, n, r = e.type,
				s = e,
				a = this.fixHooks[r];
			for (a || (this.fixHooks[r] = a = ke.test(r) ? this.mouseHooks : Pe.test(r) ? this.keyHooks : {}), n = a.props ? this.props.concat(a.props) : this.props, e = new J.Event(s), t = n.length; t--;) i = n[t], e[i] = s[i];
			return e.target || (e.target = Z), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					return this !== p() && this.focus ? (this.focus(), !1) : void 0
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === p() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
				},
				_default: function(e) {
					return J.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, i, n) {
			var r = J.extend(new J.Event, i, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			n ? J.event.trigger(r, null, t) : J.event.dispatch.call(t, r), r.isDefaultPrevented() && i.preventDefault()
		}
	}, J.removeEvent = function(e, t, i) {
		e.removeEventListener && e.removeEventListener(t, i, !1)
	}, J.Event = function(e, t) {
		return this instanceof J.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? u : c) : this.type = e, t && J.extend(this, t), this.timeStamp = e && e.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(e, t)
	}, J.Event.prototype = {
		isDefaultPrevented: c,
		isPropagationStopped: c,
		isImmediatePropagationStopped: c,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = u, e && e.preventDefault && e.preventDefault()
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = u, e && e.stopPropagation && e.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = u, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, J.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, t) {
		J.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var i, n = this,
					r = e.relatedTarget,
					s = e.handleObj;
				return (!r || r !== n && !J.contains(n, r)) && (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
			}
		}
	}), Q.focusinBubbles || J.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var i = function(e) {
			J.event.simulate(t, e.target, J.event.fix(e), !0)
		};
		J.event.special[t] = {
			setup: function() {
				var n = this.ownerDocument || this,
					r = ve.access(n, t);
				r || n.addEventListener(e, i, !0), ve.access(n, t, (r || 0) + 1)
			},
			teardown: function() {
				var n = this.ownerDocument || this,
					r = ve.access(n, t) - 1;
				r ? ve.access(n, t, r) : (n.removeEventListener(e, i, !0), ve.remove(n, t))
			}
		}
	}), J.fn.extend({
		on: function(e, t, i, n, r) {
			var s, a;
			if ("object" == typeof e) {
				"string" != typeof t && (i = i || t, t = void 0);
				for (a in e) this.on(a, t, i, e[a], r);
				return this
			}
			if (null == i && null == n ? (n = t, i = t = void 0) : null == n && ("string" == typeof t ? (n = i, i = void 0) : (n = i, i = t, t = void 0)), n === !1) n = c;
			else if (!n) return this;
			return 1 === r && (s = n, n = function(e) {
				return J().off(e), s.apply(this, arguments)
			}, n.guid = s.guid || (s.guid = J.guid++)), this.each(function() {
				J.event.add(this, e, n, i, t)
			})
		},
		one: function(e, t, i, n) {
			return this.on(e, t, i, n, 1)
		},
		off: function(e, t, i) {
			var n, r;
			if (e && e.preventDefault && e.handleObj) return n = e.handleObj, J(e.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
			if ("object" == typeof e) {
				for (r in e) this.off(r, t, e[r]);
				return this
			}
			return (t === !1 || "function" == typeof t) && (i = t, t = void 0), i === !1 && (i = c), this.each(function() {
				J.event.remove(this, e, i, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				J.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var i = this[0];
			return i ? J.event.trigger(e, t, i, !0) : void 0
		}
	});
	var Ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Me = /<([\w:]+)/,
		Ae = /<|&#?\w+;/,
		Re = /<(?:script|style|link)/i,
		Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
		Le = /^$|\/(?:java|ecma)script/i,
		Ie = /^true\/(.*)/,
		ze = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		Fe = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	Fe.optgroup = Fe.option, Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead, Fe.th = Fe.td, J.extend({
		clone: function(e, t, i) {
			var n, r, s, a, o = e.cloneNode(!0),
				l = J.contains(e.ownerDocument, e);
			if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || J.isXMLDoc(e)))
				for (a = v(o), s = v(e), n = 0, r = s.length; r > n; n++) _(s[n], a[n]);
			if (t)
				if (i)
					for (s = s || v(e), a = a || v(o), n = 0, r = s.length; r > n; n++) g(s[n], a[n]);
				else g(e, o);
			return a = v(o, "script"), a.length > 0 && m(a, !l && v(e, "script")), o
		},
		buildFragment: function(e, t, i, n) {
			for (var r, s, a, o, l, u, c = t.createDocumentFragment(), p = [], h = 0, d = e.length; d > h; h++)
				if (r = e[h], r || 0 === r)
					if ("object" === J.type(r)) J.merge(p, r.nodeType ? [r] : r);
					else if (Ae.test(r)) {
				for (s = s || c.appendChild(t.createElement("div")), a = (Me.exec(r) || ["", ""])[1].toLowerCase(), o = Fe[a] || Fe._default, s.innerHTML = o[1] + r.replace(Ee, "<$1></$2>") + o[2], u = o[0]; u--;) s = s.lastChild;
				J.merge(p, s.childNodes), s = c.firstChild, s.textContent = ""
			} else p.push(t.createTextNode(r));
			for (c.textContent = "", h = 0; r = p[h++];)
				if ((!n || -1 === J.inArray(r, n)) && (l = J.contains(r.ownerDocument, r), s = v(c.appendChild(r), "script"), l && m(s), i))
					for (u = 0; r = s[u++];) Le.test(r.type || "") && i.push(r);
			return c
		},
		cleanData: function(e) {
			for (var t, i, n, r, s = J.event.special, a = 0; void 0 !== (i = e[a]); a++) {
				if (J.acceptData(i) && (r = i[ve.expando], r && (t = ve.cache[r]))) {
					if (t.events)
						for (n in t.events) s[n] ? J.event.remove(i, n) : J.removeEvent(i, n, t.handle);
					ve.cache[r] && delete ve.cache[r]
				}
				delete _e.cache[i[_e.expando]]
			}
		}
	}), J.fn.extend({
		text: function(e) {
			return ge(this, function(e) {
				return void 0 === e ? J.text(this) : this.empty().each(function() {
					(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
				})
			}, null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var i, n = e ? J.filter(e, this) : this, r = 0; null != (i = n[r]); r++) t || 1 !== i.nodeType || J.cleanData(v(i)), i.parentNode && (t && J.contains(i.ownerDocument, i) && m(v(i, "script")), i.parentNode.removeChild(i));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (J.cleanData(v(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return J.clone(this, e, t)
			})
		},
		html: function(e) {
			return ge(this, function(e) {
				var t = this[0] || {},
					i = 0,
					n = this.length;
				if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
				if ("string" == typeof e && !Re.test(e) && !Fe[(Me.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(Ee, "<$1></$2>");
					try {
						for (; n > i; i++) t = this[i] || {}, 1 === t.nodeType && (J.cleanData(v(t, !1)), t.innerHTML = e);
						t = 0
					} catch (r) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = arguments[0];
			return this.domManip(arguments, function(t) {
				e = this.parentNode, J.cleanData(v(this)), e && e.replaceChild(t, this)
			}), e && (e.length || e.nodeType) ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t) {
			e = $.apply([], e);
			var i, n, r, s, a, o, l = 0,
				u = this.length,
				c = this,
				p = u - 1,
				h = e[0],
				m = J.isFunction(h);
			if (m || u > 1 && "string" == typeof h && !Q.checkClone && Ne.test(h)) return this.each(function(i) {
				var n = c.eq(i);
				m && (e[0] = h.call(this, i, n.html())), n.domManip(e, t)
			});
			if (u && (i = J.buildFragment(e, this[0].ownerDocument, !1, this), n = i.firstChild, 1 === i.childNodes.length && (i = n), n)) {
				for (r = J.map(v(i, "script"), d), s = r.length; u > l; l++) a = i, l !== p && (a = J.clone(a, !0, !0), s && J.merge(r, v(a, "script"))), t.call(this[l], a, l);
				if (s)
					for (o = r[r.length - 1].ownerDocument, J.map(r, f), l = 0; s > l; l++) a = r[l], Le.test(a.type || "") && !ve.access(a, "globalEval") && J.contains(o, a) && (a.src ? J._evalUrl && J._evalUrl(a.src) : J.globalEval(a.textContent.replace(ze, "")))
			}
			return this
		}
	}), J.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		J.fn[e] = function(e) {
			for (var i, n = [], r = J(e), s = r.length - 1, a = 0; s >= a; a++) i = a === s ? this : this.clone(!0), J(r[a])[t](i),
				W.apply(n, i.get());
			return this.pushStack(n)
		}
	});
	var je, Be = {},
		Xe = /^margin/,
		qe = new RegExp("^(" + xe + ")(?!px)[a-z%]+$", "i"),
		He = function(e) {
			return e.ownerDocument.defaultView.getComputedStyle(e, null)
		};
	! function() {
		function t() {
			a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", r.appendChild(s);
			var t = e.getComputedStyle(a, null);
			i = "1%" !== t.top, n = "4px" === t.width, r.removeChild(s)
		}
		var i, n, r = Z.documentElement,
			s = Z.createElement("div"),
			a = Z.createElement("div");
		a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", s.appendChild(a), e.getComputedStyle && J.extend(Q, {
			pixelPosition: function() {
				return t(), i
			},
			boxSizingReliable: function() {
				return null == n && t(), n
			},
			reliableMarginRight: function() {
				var t, i = a.appendChild(Z.createElement("div"));
				return i.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", a.style.width = "1px", r.appendChild(s), t = !parseFloat(e.getComputedStyle(i, null).marginRight), r.removeChild(s), t
			}
		}))
	}(), J.swap = function(e, t, i, n) {
		var r, s, a = {};
		for (s in t) a[s] = e.style[s], e.style[s] = t[s];
		r = i.apply(e, n || []);
		for (s in t) e.style[s] = a[s];
		return r
	};
	var $e = /^(none|table(?!-c[ea]).+)/,
		We = new RegExp("^(" + xe + ")(.*)$", "i"),
		Ve = new RegExp("^([+-])=(" + xe + ")", "i"),
		Ye = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Ge = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		Ue = ["Webkit", "O", "Moz", "ms"];
	J.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var i = x(e, "opacity");
						return "" === i ? "1" : i
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(e, t, i, n) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var r, s, a, o = J.camelCase(t),
					l = e.style;
				return t = J.cssProps[o] || (J.cssProps[o] = T(l, o)), a = J.cssHooks[t] || J.cssHooks[o], void 0 === i ? a && "get" in a && void 0 !== (r = a.get(e, !1, n)) ? r : l[t] : (s = typeof i, "string" === s && (r = Ve.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(J.css(e, t)), s = "number"), void(null != i && i === i && ("number" !== s || J.cssNumber[o] || (i += "px"), Q.clearCloneStyle || "" !== i || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (i = a.set(e, i, n)) || (l[t] = i))))
			}
		},
		css: function(e, t, i, n) {
			var r, s, a, o = J.camelCase(t);
			return t = J.cssProps[o] || (J.cssProps[o] = T(e.style, o)), a = J.cssHooks[t] || J.cssHooks[o], a && "get" in a && (r = a.get(e, !0, i)), void 0 === r && (r = x(e, t, n)), "normal" === r && t in Ge && (r = Ge[t]), "" === i || i ? (s = parseFloat(r), i === !0 || J.isNumeric(s) ? s || 0 : r) : r
		}
	}), J.each(["height", "width"], function(e, t) {
		J.cssHooks[t] = {
			get: function(e, i, n) {
				return i ? $e.test(J.css(e, "display")) && 0 === e.offsetWidth ? J.swap(e, Ye, function() {
					return P(e, t, n)
				}) : P(e, t, n) : void 0
			},
			set: function(e, i, n) {
				var r = n && He(e);
				return S(e, i, n ? C(e, t, n, "border-box" === J.css(e, "boxSizing", !1, r), r) : 0)
			}
		}
	}), J.cssHooks.marginRight = b(Q.reliableMarginRight, function(e, t) {
		return t ? J.swap(e, {
			display: "inline-block"
		}, x, [e, "marginRight"]) : void 0
	}), J.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		J.cssHooks[e + t] = {
			expand: function(i) {
				for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[e + be[n] + t] = s[n] || s[n - 2] || s[0];
				return r
			}
		}, Xe.test(e) || (J.cssHooks[e + t].set = S)
	}), J.fn.extend({
		css: function(e, t) {
			return ge(this, function(e, t, i) {
				var n, r, s = {},
					a = 0;
				if (J.isArray(t)) {
					for (n = He(e), r = t.length; r > a; a++) s[t[a]] = J.css(e, t[a], !1, n);
					return s
				}
				return void 0 !== i ? J.style(e, t, i) : J.css(e, t)
			}, e, t, arguments.length > 1)
		},
		show: function() {
			return k(this, !0)
		},
		hide: function() {
			return k(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				Te(this) ? J(this).show() : J(this).hide()
			})
		}
	}), J.Tween = D, D.prototype = {
		constructor: D,
		init: function(e, t, i, n, r, s) {
			this.elem = e, this.prop = i, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = s || (J.cssNumber[i] ? "" : "px")
		},
		cur: function() {
			var e = D.propHooks[this.prop];
			return e && e.get ? e.get(this) : D.propHooks._default.get(this)
		},
		run: function(e) {
			var t, i = D.propHooks[this.prop];
			return this.pos = t = this.options.duration ? J.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : D.propHooks._default.set(this), this
		}
	}, D.prototype.init.prototype = D.prototype, D.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = J.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				J.fx.step[e.prop] ? J.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[J.cssProps[e.prop]] || J.cssHooks[e.prop]) ? J.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, J.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, J.fx = D.prototype.init, J.fx.step = {};
	var Qe, Ze, Ke = /^(?:toggle|show|hide)$/,
		Je = new RegExp("^(?:([+-])=|)(" + xe + ")([a-z%]*)$", "i"),
		et = /queueHooks$/,
		tt = [A],
		it = {
			"*": [function(e, t) {
				var i = this.createTween(e, t),
					n = i.cur(),
					r = Je.exec(t),
					s = r && r[3] || (J.cssNumber[e] ? "" : "px"),
					a = (J.cssNumber[e] || "px" !== s && +n) && Je.exec(J.css(i.elem, e)),
					o = 1,
					l = 20;
				if (a && a[3] !== s) {
					s = s || a[3], r = r || [], a = +n || 1;
					do o = o || ".5", a /= o, J.style(i.elem, e, a + s); while (o !== (o = i.cur() / n) && 1 !== o && --l)
				}
				return r && (a = i.start = +a || +n || 0, i.unit = s, i.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), i
			}]
		};
	J.Animation = J.extend(N, {
			tweener: function(e, t) {
				J.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
				for (var i, n = 0, r = e.length; r > n; n++) i = e[n], it[i] = it[i] || [], it[i].unshift(t)
			},
			prefilter: function(e, t) {
				t ? tt.unshift(e) : tt.push(e)
			}
		}), J.speed = function(e, t, i) {
			var n = e && "object" == typeof e ? J.extend({}, e) : {
				complete: i || !i && t || J.isFunction(e) && e,
				duration: e,
				easing: i && t || t && !J.isFunction(t) && t
			};
			return n.duration = J.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in J.fx.speeds ? J.fx.speeds[n.duration] : J.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
				J.isFunction(n.old) && n.old.call(this), n.queue && J.dequeue(this, n.queue)
			}, n
		}, J.fn.extend({
			fadeTo: function(e, t, i, n) {
				return this.filter(Te).css("opacity", 0).show().end().animate({
					opacity: t
				}, e, i, n)
			},
			animate: function(e, t, i, n) {
				var r = J.isEmptyObject(e),
					s = J.speed(t, i, n),
					a = function() {
						var t = N(this, J.extend({}, e), s);
						(r || ve.get(this, "finish")) && t.stop(!0)
					};
				return a.finish = a, r || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
			},
			stop: function(e, t, i) {
				var n = function(e) {
					var t = e.stop;
					delete e.stop, t(i)
				};
				return "string" != typeof e && (i = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
					var t = !0,
						r = null != e && e + "queueHooks",
						s = J.timers,
						a = ve.get(this);
					if (r) a[r] && a[r].stop && n(a[r]);
					else
						for (r in a) a[r] && a[r].stop && et.test(r) && n(a[r]);
					for (r = s.length; r--;) s[r].elem !== this || null != e && s[r].queue !== e || (s[r].anim.stop(i), t = !1, s.splice(r, 1));
					(t || !i) && J.dequeue(this, e)
				})
			},
			finish: function(e) {
				return e !== !1 && (e = e || "fx"), this.each(function() {
					var t, i = ve.get(this),
						n = i[e + "queue"],
						r = i[e + "queueHooks"],
						s = J.timers,
						a = n ? n.length : 0;
					for (i.finish = !0, J.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
					for (t = 0; a > t; t++) n[t] && n[t].finish && n[t].finish.call(this);
					delete i.finish
				})
			}
		}), J.each(["toggle", "show", "hide"], function(e, t) {
			var i = J.fn[t];
			J.fn[t] = function(e, n, r) {
				return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(E(t, !0), e, n, r)
			}
		}), J.each({
			slideDown: E("show"),
			slideUp: E("hide"),
			slideToggle: E("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(e, t) {
			J.fn[e] = function(e, i, n) {
				return this.animate(t, e, i, n)
			}
		}), J.timers = [], J.fx.tick = function() {
			var e, t = 0,
				i = J.timers;
			for (Qe = J.now(); t < i.length; t++) e = i[t], e() || i[t] !== e || i.splice(t--, 1);
			i.length || J.fx.stop(), Qe = void 0
		}, J.fx.timer = function(e) {
			J.timers.push(e), e() ? J.fx.start() : J.timers.pop()
		}, J.fx.interval = 13, J.fx.start = function() {
			Ze || (Ze = setInterval(J.fx.tick, J.fx.interval))
		}, J.fx.stop = function() {
			clearInterval(Ze), Ze = null
		}, J.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, J.fn.delay = function(e, t) {
			return e = J.fx ? J.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, i) {
				var n = setTimeout(t, e);
				i.stop = function() {
					clearTimeout(n)
				}
			})
		},
		function() {
			var e = Z.createElement("input"),
				t = Z.createElement("select"),
				i = t.appendChild(Z.createElement("option"));
			e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = i.selected, t.disabled = !0, Q.optDisabled = !i.disabled, e = Z.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
		}();
	var nt, rt, st = J.expr.attrHandle;
	J.fn.extend({
		attr: function(e, t) {
			return ge(this, J.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				J.removeAttr(this, e)
			})
		}
	}), J.extend({
		attr: function(e, t, i) {
			var n, r, s = e.nodeType;
			return e && 3 !== s && 8 !== s && 2 !== s ? typeof e.getAttribute === Ce ? J.prop(e, t, i) : (1 === s && J.isXMLDoc(e) || (t = t.toLowerCase(), n = J.attrHooks[t] || (J.expr.match.bool.test(t) ? rt : nt)), void 0 === i ? n && "get" in n && null !== (r = n.get(e, t)) ? r : (r = J.find.attr(e, t), null == r ? void 0 : r) : null !== i ? n && "set" in n && void 0 !== (r = n.set(e, i, t)) ? r : (e.setAttribute(t, i + ""), i) : void J.removeAttr(e, t)) : void 0
		},
		removeAttr: function(e, t) {
			var i, n, r = 0,
				s = t && t.match(de);
			if (s && 1 === e.nodeType)
				for (; i = s[r++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (e[n] = !1), e.removeAttribute(i)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!Q.radioValue && "radio" === t && J.nodeName(e, "input")) {
						var i = e.value;
						return e.setAttribute("type", t), i && (e.value = i), t
					}
				}
			}
		}
	}), rt = {
		set: function(e, t, i) {
			return t === !1 ? J.removeAttr(e, i) : e.setAttribute(i, i), i
		}
	}, J.each(J.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var i = st[t] || J.find.attr;
		st[t] = function(e, t, n) {
			var r, s;
			return n || (s = st[t], st[t] = r, r = null != i(e, t, n) ? t.toLowerCase() : null, st[t] = s), r
		}
	});
	var at = /^(?:input|select|textarea|button)$/i;
	J.fn.extend({
		prop: function(e, t) {
			return ge(this, J.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[J.propFix[e] || e]
			})
		}
	}), J.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, t, i) {
			var n, r, s, a = e.nodeType;
			return e && 3 !== a && 8 !== a && 2 !== a ? (s = 1 !== a || !J.isXMLDoc(e), s && (t = J.propFix[t] || t, r = J.propHooks[t]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(e, i, t)) ? n : e[t] = i : r && "get" in r && null !== (n = r.get(e, t)) ? n : e[t]) : void 0
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex : -1
				}
			}
		}
	}), Q.optSelected || (J.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && t.parentNode && t.parentNode.selectedIndex, null
		}
	}), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		J.propFix[this.toLowerCase()] = this
	});
	var ot = /[\t\r\n\f]/g;
	J.fn.extend({
		addClass: function(e) {
			var t, i, n, r, s, a, o = "string" == typeof e && e,
				l = 0,
				u = this.length;
			if (J.isFunction(e)) return this.each(function(t) {
				J(this).addClass(e.call(this, t, this.className))
			});
			if (o)
				for (t = (e || "").match(de) || []; u > l; l++)
					if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ot, " ") : " ")) {
						for (s = 0; r = t[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
						a = J.trim(n), i.className !== a && (i.className = a)
					}
			return this
		},
		removeClass: function(e) {
			var t, i, n, r, s, a, o = 0 === arguments.length || "string" == typeof e && e,
				l = 0,
				u = this.length;
			if (J.isFunction(e)) return this.each(function(t) {
				J(this).removeClass(e.call(this, t, this.className))
			});
			if (o)
				for (t = (e || "").match(de) || []; u > l; l++)
					if (i = this[l], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ot, " ") : "")) {
						for (s = 0; r = t[s++];)
							for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
						a = e ? J.trim(n) : "", i.className !== a && (i.className = a)
					}
			return this
		},
		toggleClass: function(e, t) {
			var i = typeof e;
			return "boolean" == typeof t && "string" === i ? t ? this.addClass(e) : this.removeClass(e) : this.each(J.isFunction(e) ? function(i) {
				J(this).toggleClass(e.call(this, i, this.className, t), t)
			} : function() {
				if ("string" === i)
					for (var t, n = 0, r = J(this), s = e.match(de) || []; t = s[n++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
				else(i === Ce || "boolean" === i) && (this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", i = 0, n = this.length; n > i; i++)
				if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(ot, " ").indexOf(t) >= 0) return !0;
			return !1
		}
	});
	var lt = /\r/g;
	J.fn.extend({
		val: function(e) {
			var t, i, n, r = this[0];
			return arguments.length ? (n = J.isFunction(e), this.each(function(i) {
				var r;
				1 === this.nodeType && (r = n ? e.call(this, i, J(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : J.isArray(r) && (r = J.map(r, function(e) {
					return null == e ? "" : e + ""
				})), t = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
			})) : r ? (t = J.valHooks[r.type] || J.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (i = t.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(lt, "") : null == i ? "" : i)) : void 0
		}
	}), J.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = J.find.attr(e, "value");
					return null != t ? t : J.trim(J.text(e))
				}
			},
			select: {
				get: function(e) {
					for (var t, i, n = e.options, r = e.selectedIndex, s = "select-one" === e.type || 0 > r, a = s ? null : [], o = s ? r + 1 : n.length, l = 0 > r ? o : s ? r : 0; o > l; l++)
						if (i = n[l], !(!i.selected && l !== r || (Q.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && J.nodeName(i.parentNode, "optgroup"))) {
							if (t = J(i).val(), s) return t;
							a.push(t)
						}
					return a
				},
				set: function(e, t) {
					for (var i, n, r = e.options, s = J.makeArray(t), a = r.length; a--;) n = r[a], (n.selected = J.inArray(n.value, s) >= 0) && (i = !0);
					return i || (e.selectedIndex = -1), s
				}
			}
		}
	}), J.each(["radio", "checkbox"], function() {
		J.valHooks[this] = {
			set: function(e, t) {
				return J.isArray(t) ? e.checked = J.inArray(J(e).val(), t) >= 0 : void 0
			}
		}, Q.checkOn || (J.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	}), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		J.fn[t] = function(e, i) {
			return arguments.length > 0 ? this.on(t, null, e, i) : this.trigger(t)
		}
	}), J.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, i) {
			return this.on(e, null, t, i)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, i, n) {
			return this.on(t, e, i, n)
		},
		undelegate: function(e, t, i) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
		}
	});
	var ut = J.now(),
		ct = /\?/;
	J.parseJSON = function(e) {
		return JSON.parse(e + "")
	}, J.parseXML = function(e) {
		var t, i;
		if (!e || "string" != typeof e) return null;
		try {
			i = new DOMParser, t = i.parseFromString(e, "text/xml")
		} catch (n) {
			t = void 0
		}
		return (!t || t.getElementsByTagName("parsererror").length) && J.error("Invalid XML: " + e), t
	};
	var pt, ht, dt = /#.*$/,
		ft = /([?&])_=[^&]*/,
		mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		gt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		vt = /^(?:GET|HEAD)$/,
		_t = /^\/\//,
		yt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		wt = {},
		xt = {},
		bt = "*/".concat("*");
	try {
		ht = location.href
	} catch (Tt) {
		ht = Z.createElement("a"), ht.href = "", ht = ht.href
	}
	pt = yt.exec(ht.toLowerCase()) || [], J.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ht,
			type: "GET",
			isLocal: gt.test(pt[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": bt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": J.parseJSON,
				"text xml": J.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? z(z(e, J.ajaxSettings), t) : z(J.ajaxSettings, e)
		},
		ajaxPrefilter: L(wt),
		ajaxTransport: L(xt),
		ajax: function(e, t) {
			function i(e, t, i, a) {
				var l, c, v, _, w, b = t;
				2 !== y && (y = 2, o && clearTimeout(o), n = void 0, s = a || "", x.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, i && (_ = F(p, x, i)), _ = j(p, _, x, l), l ? (p.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (J.lastModified[r] = w), w = x.getResponseHeader("etag"), w && (J.etag[r] = w)), 204 === e || "HEAD" === p.type ? b = "nocontent" : 304 === e ? b = "notmodified" : (b = _.state, c = _.data, v = _.error, l = !v)) : (v = b, (e || !b) && (b = "error", 0 > e && (e = 0))), x.status = e, x.statusText = (t || b) + "", l ? f.resolveWith(h, [c, b, x]) : f.rejectWith(h, [x, b, v]), x.statusCode(g), g = void 0, u && d.trigger(l ? "ajaxSuccess" : "ajaxError", [x, p, l ? c : v]), m.fireWith(h, [x, b]), u && (d.trigger("ajaxComplete", [x, p]), --J.active || J.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (t = e, e = void 0), t = t || {};
			var n, r, s, a, o, l, u, c, p = J.ajaxSetup({}, t),
				h = p.context || p,
				d = p.context && (h.nodeType || h.jquery) ? J(h) : J.event,
				f = J.Deferred(),
				m = J.Callbacks("once memory"),
				g = p.statusCode || {},
				v = {},
				_ = {},
				y = 0,
				w = "canceled",
				x = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === y) {
							if (!a)
								for (a = {}; t = mt.exec(s);) a[t[1].toLowerCase()] = t[2];
							t = a[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === y ? s : null
					},
					setRequestHeader: function(e, t) {
						var i = e.toLowerCase();
						return y || (e = _[i] = _[i] || e, v[e] = t), this
					},
					overrideMimeType: function(e) {
						return y || (p.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e)
							if (2 > y)
								for (t in e) g[t] = [g[t], e[t]];
							else x.always(e[x.status]);
						return this
					},
					abort: function(e) {
						var t = e || w;
						return n && n.abort(t), i(0, t), this
					}
				};
			if (f.promise(x).complete = m.add, x.success = x.done, x.error = x.fail, p.url = ((e || p.url || ht) + "").replace(dt, "").replace(_t, pt[1] + "//"), p.type = t.method || t.type || p.method || p.type, p.dataTypes = J.trim(p.dataType || "*").toLowerCase().match(de) || [""], null == p.crossDomain && (l = yt.exec(p.url.toLowerCase()), p.crossDomain = !(!l || l[1] === pt[1] && l[2] === pt[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (pt[3] || ("http:" === pt[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = J.param(p.data, p.traditional)), I(wt, p, t, x), 2 === y) return x;
			u = p.global, u && 0 === J.active++ && J.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !vt.test(p.type), r = p.url, p.hasContent || (p.data && (r = p.url += (ct.test(r) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = ft.test(r) ? r.replace(ft, "$1_=" + ut++) : r + (ct.test(r) ? "&" : "?") + "_=" + ut++)), p.ifModified && (J.lastModified[r] && x.setRequestHeader("If-Modified-Since", J.lastModified[r]), J.etag[r] && x.setRequestHeader("If-None-Match", J.etag[r])), (p.data && p.hasContent && p.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", p.contentType), x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + bt + "; q=0.01" : "") : p.accepts["*"]);
			for (c in p.headers) x.setRequestHeader(c, p.headers[c]);
			if (p.beforeSend && (p.beforeSend.call(h, x, p) === !1 || 2 === y)) return x.abort();
			w = "abort";
			for (c in {
					success: 1,
					error: 1,
					complete: 1
				}) x[c](p[c]);
			if (n = I(xt, p, t, x)) {
				x.readyState = 1, u && d.trigger("ajaxSend", [x, p]), p.async && p.timeout > 0 && (o = setTimeout(function() {
					x.abort("timeout")
				}, p.timeout));
				try {
					y = 1, n.send(v, i)
				} catch (b) {
					if (!(2 > y)) throw b;
					i(-1, b)
				}
			} else i(-1, "No Transport");
			return x
		},
		getJSON: function(e, t, i) {
			return J.get(e, t, i, "json")
		},
		getScript: function(e, t) {
			return J.get(e, void 0, t, "script")
		}
	}), J.each(["get", "post"], function(e, t) {
		J[t] = function(e, i, n, r) {
			return J.isFunction(i) && (r = r || n, n = i, i = void 0), J.ajax({
				url: e,
				type: t,
				dataType: r,
				data: i,
				success: n
			})
		}
	}), J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		J.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), J._evalUrl = function(e) {
		return J.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	}, J.fn.extend({
		wrapAll: function(e) {
			var t;
			return J.isFunction(e) ? this.each(function(t) {
				J(this).wrapAll(e.call(this, t))
			}) : (this[0] && (t = J(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
				for (var e = this; e.firstElementChild;) e = e.firstElementChild;
				return e
			}).append(this)), this)
		},
		wrapInner: function(e) {
			return this.each(J.isFunction(e) ? function(t) {
				J(this).wrapInner(e.call(this, t))
			} : function() {
				var t = J(this),
					i = t.contents();
				i.length ? i.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = J.isFunction(e);
			return this.each(function(i) {
				J(this).wrapAll(t ? e.call(this, i) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
			}).end()
		}
	}), J.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0
	}, J.expr.filters.visible = function(e) {
		return !J.expr.filters.hidden(e)
	};
	var St = /%20/g,
		Ct = /\[\]$/,
		Pt = /\r?\n/g,
		kt = /^(?:submit|button|image|reset|file)$/i,
		Dt = /^(?:input|select|textarea|keygen)/i;
	J.param = function(e, t) {
		var i, n = [],
			r = function(e, t) {
				t = J.isFunction(t) ? t() : null == t ? "" : t, n[n.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (void 0 === t && (t = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(e) || e.jquery && !J.isPlainObject(e)) J.each(e, function() {
			r(this.name, this.value)
		});
		else
			for (i in e) B(i, e[i], t, r);
		return n.join("&").replace(St, "+")
	}, J.fn.extend({
		serialize: function() {
			return J.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = J.prop(this, "elements");
				return e ? J.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !J(this).is(":disabled") && Dt.test(this.nodeName) && !kt.test(e) && (this.checked || !Se.test(e))
			}).map(function(e, t) {
				var i = J(this).val();
				return null == i ? null : J.isArray(i) ? J.map(i, function(e) {
					return {
						name: t.name,
						value: e.replace(Pt, "\r\n")
					}
				}) : {
					name: t.name,
					value: i.replace(Pt, "\r\n")
				}
			}).get()
		}
	}), J.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest
		} catch (e) {}
	};
	var Ot = 0,
		Et = {},
		Mt = {
			0: 200,
			1223: 204
		},
		At = J.ajaxSettings.xhr();
	e.ActiveXObject && J(e).on("unload", function() {
		for (var e in Et) Et[e]()
	}), Q.cors = !!At && "withCredentials" in At, Q.ajax = At = !!At, J.ajaxTransport(function(e) {
		var t;
		return Q.cors || At && !e.crossDomain ? {
			send: function(i, n) {
				var r, s = e.xhr(),
					a = ++Ot;
				if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
					for (r in e.xhrFields) s[r] = e.xhrFields[r];
				e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
				for (r in i) s.setRequestHeader(r, i[r]);
				t = function(e) {
					return function() {
						t && (delete Et[a], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? n(s.status, s.statusText) : n(Mt[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
							text: s.responseText
						} : void 0, s.getAllResponseHeaders()))
					}
				}, s.onload = t(), s.onerror = t("error"), t = Et[a] = t("abort");
				try {
					s.send(e.hasContent && e.data || null)
				} catch (o) {
					if (t) throw o
				}
			},
			abort: function() {
				t && t()
			}
		} : void 0
	}), J.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return J.globalEval(e), e
			}
		}
	}), J.ajaxPrefilter("script", function(e) {
		void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), J.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var t, i;
			return {
				send: function(n, r) {
					t = J("<script>").prop({
						async: !0,
						charset: e.scriptCharset,
						src: e.url
					}).on("load error", i = function(e) {
						t.remove(), i = null, e && r("error" === e.type ? 404 : 200, e.type)
					}), Z.head.appendChild(t[0])
				},
				abort: function() {
					i && i()
				}
			}
		}
	});
	var Rt = [],
		Nt = /(=)\?(?=&|$)|\?\?/;
	J.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Rt.pop() || J.expando + "_" + ut++;
			return this[e] = !0, e
		}
	}), J.ajaxPrefilter("json jsonp", function(t, i, n) {
		var r, s, a, o = t.jsonp !== !1 && (Nt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Nt.test(t.data) && "data");
		return o || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = J.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, o ? t[o] = t[o].replace(Nt, "$1" + r) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
			return a || J.error(r + " was not called"), a[0]
		}, t.dataTypes[0] = "json", s = e[r], e[r] = function() {
			a = arguments
		}, n.always(function() {
			e[r] = s, t[r] && (t.jsonpCallback = i.jsonpCallback, Rt.push(r)), a && J.isFunction(s) && s(a[0]), a = s = void 0
		}), "script") : void 0
	}), J.parseHTML = function(e, t, i) {
		if (!e || "string" != typeof e) return null;
		"boolean" == typeof t && (i = t, t = !1), t = t || Z;
		var n = ae.exec(e),
			r = !i && [];
		return n ? [t.createElement(n[1])] : (n = J.buildFragment([e], t, r), r && r.length && J(r).remove(), J.merge([], n.childNodes))
	};
	var Lt = J.fn.load;
	J.fn.load = function(e, t, i) {
		if ("string" != typeof e && Lt) return Lt.apply(this, arguments);
		var n, r, s, a = this,
			o = e.indexOf(" ");
		return o >= 0 && (n = J.trim(e.slice(o)), e = e.slice(0, o)), J.isFunction(t) ? (i = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && J.ajax({
			url: e,
			type: r,
			dataType: "html",
			data: t
		}).done(function(e) {
			s = arguments, a.html(n ? J("<div>").append(J.parseHTML(e)).find(n) : e)
		}).complete(i && function(e, t) {
			a.each(i, s || [e.responseText, t, e])
		}), this
	}, J.expr.filters.animated = function(e) {
		return J.grep(J.timers, function(t) {
			return e === t.elem
		}).length
	};
	var It = e.document.documentElement;
	J.offset = {
		setOffset: function(e, t, i) {
			var n, r, s, a, o, l, u, c = J.css(e, "position"),
				p = J(e),
				h = {};
			"static" === c && (e.style.position = "relative"), o = p.offset(), s = J.css(e, "top"), l = J.css(e, "left"), u = ("absolute" === c || "fixed" === c) && (s + l).indexOf("auto") > -1, u ? (n = p.position(), a = n.top, r = n.left) : (a = parseFloat(s) || 0, r = parseFloat(l) || 0), J.isFunction(t) && (t = t.call(e, i, o)), null != t.top && (h.top = t.top - o.top + a), null != t.left && (h.left = t.left - o.left + r), "using" in t ? t.using.call(e, h) : p.css(h)
		}
	}, J.fn.extend({
		offset: function(e) {
			if (arguments.length) return void 0 === e ? this : this.each(function(t) {
				J.offset.setOffset(this, e, t)
			});
			var t, i, n = this[0],
				r = {
					top: 0,
					left: 0
				},
				s = n && n.ownerDocument;
			return s ? (t = s.documentElement, J.contains(t, n) ? (typeof n.getBoundingClientRect !== Ce && (r = n.getBoundingClientRect()), i = X(s), {
				top: r.top + i.pageYOffset - t.clientTop,
				left: r.left + i.pageXOffset - t.clientLeft
			}) : r) : void 0
		},
		position: function() {
			if (this[0]) {
				var e, t, i = this[0],
					n = {
						top: 0,
						left: 0
					};
				return "fixed" === J.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), J.nodeName(e[0], "html") || (n = e.offset()), n.top += J.css(e[0], "borderTopWidth", !0), n.left += J.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - J.css(i, "marginTop", !0),
					left: t.left - n.left - J.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || It; e && !J.nodeName(e, "html") && "static" === J.css(e, "position");) e = e.offsetParent;
				return e || It
			})
		}
	}), J.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(t, i) {
		var n = "pageYOffset" === i;
		J.fn[t] = function(r) {
			return ge(this, function(t, r, s) {
				var a = X(t);
				return void 0 === s ? a ? a[i] : t[r] : void(a ? a.scrollTo(n ? e.pageXOffset : s, n ? s : e.pageYOffset) : t[r] = s)
			}, t, r, arguments.length, null)
		}
	}), J.each(["top", "left"], function(e, t) {
		J.cssHooks[t] = b(Q.pixelPosition, function(e, i) {
			return i ? (i = x(e, t), qe.test(i) ? J(e).position()[t] + "px" : i) : void 0
		})
	}), J.each({
		Height: "height",
		Width: "width"
	}, function(e, t) {
		J.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function(i, n) {
			J.fn[n] = function(n, r) {
				var s = arguments.length && (i || "boolean" != typeof n),
					a = i || (n === !0 || r === !0 ? "margin" : "border");
				return ge(this, function(t, i, n) {
					var r;
					return J.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === n ? J.css(t, i, a) : J.style(t, i, n, a)
				}, t, s ? n : void 0, s, null)
			}
		})
	}), J.fn.size = function() {
		return this.length
	}, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
		return J
	});
	var zt = e.jQuery,
		Ft = e.$;
	return J.noConflict = function(t) {
		return e.$ === J && (e.$ = Ft), t && e.jQuery === J && (e.jQuery = zt), J
	}, typeof t === Ce && (e.jQuery = e.$ = J), J
}),
function(e) {
	"function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	function t(t) {
		return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = u), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function() {
			var n = e(this),
				r = n.data(k);
			r || (r = new i(this, t), n.data(k, r))
		})
	}

	function i(t, i) {
		function D(t) {
			if (!(ue() || e(t.target).closest(i.excludedElements, $e).length > 0)) {
				var n, r = t.originalEvent ? t.originalEvent : t,
					s = S ? r.touches[0] : r;
				return We = w, S ? Ve = r.touches.length : t.preventDefault(), Le = 0, Ie = null, qe = null, ze = 0, Fe = 0, je = 0, Be = 1, Xe = 0, Ye = fe(), He = ve(), oe(), !S || Ve === i.fingers || i.fingers === _ || H() ? (pe(0, s), Ge = Pe(), 2 == Ve && (pe(1, r.touches[1]), Fe = je = we(Ye[0].start, Ye[1].start)), (i.swipeStatus || i.pinchStatus) && (n = L(r, We))) : n = !1, n === !1 ? (We = T, L(r, We), n) : (i.hold && (et = setTimeout(e.proxy(function() {
					$e.trigger("hold", [r.target]), i.hold && (n = i.hold.call($e, r, r.target))
				}, this), i.longTapThreshold)), ce(!0), null)
			}
		}

		function O(e) {
			var t = e.originalEvent ? e.originalEvent : e;
			if (We !== b && We !== T && !le()) {
				var n, r = S ? t.touches[0] : t,
					s = he(r);
				if (Ue = Pe(), S && (Ve = t.touches.length), i.hold && clearTimeout(et), We = x, 2 == Ve && (0 == Fe ? (pe(1, t.touches[1]), Fe = je = we(Ye[0].start, Ye[1].start)) : (he(t.touches[1]), je = we(Ye[0].end, Ye[1].end), qe = be(Ye[0].end, Ye[1].end)), Be = xe(Fe, je), Xe = Math.abs(Fe - je)), Ve === i.fingers || i.fingers === _ || !S || H()) {
					if (Ie = Ce(s.start, s.end), X(e, Ie), Le = Te(s.start, s.end), ze = ye(), me(Ie, Le), (i.swipeStatus || i.pinchStatus) && (n = L(t, We)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
						var a = !0;
						if (i.triggerOnTouchLeave) {
							var o = ke(this);
							a = De(s.end, o)
						}!i.triggerOnTouchEnd && a ? We = N(x) : i.triggerOnTouchLeave && !a && (We = N(b)), (We == T || We == b) && L(t, We)
					}
				} else We = T, L(t, We);
				n === !1 && (We = T, L(t, We))
			}
		}

		function E(e) {
			var t = e.originalEvent;
			return S && t.touches.length > 0 ? (ae(), !0) : (le() && (Ve = Ze), Ue = Pe(), ze = ye(), F() || !z() ? (We = T, L(t, We)) : i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && We === x ? (e.preventDefault(), We = b, L(t, We)) : !i.triggerOnTouchEnd && Q() ? (We = b, I(t, We, d)) : We === x && (We = T, L(t, We)), ce(!1), null)
		}

		function M() {
			Ve = 0, Ue = 0, Ge = 0, Fe = 0, je = 0, Be = 1, oe(), ce(!1)
		}

		function A(e) {
			var t = e.originalEvent;
			i.triggerOnTouchLeave && (We = N(b), L(t, We))
		}

		function R() {
			$e.unbind(Ee, D), $e.unbind(Ne, M), $e.unbind(Me, O), $e.unbind(Ae, E), Re && $e.unbind(Re, A), ce(!1)
		}

		function N(e) {
			var t = e,
				n = B(),
				r = z(),
				s = F();
			return !n || s ? t = T : !r || e != x || i.triggerOnTouchEnd && !i.triggerOnTouchLeave ? !r && e == b && i.triggerOnTouchLeave && (t = T) : t = b, t
		}

		function L(e, t) {
			var i = void 0;
			return Y() || V() ? i = I(e, t, p) : ($() || H()) && i !== !1 && (i = I(e, t, h)), re() && i !== !1 ? i = I(e, t, f) : se() && i !== !1 ? i = I(e, t, m) : ne() && i !== !1 && (i = I(e, t, d)), t === T && M(e), t === b && (S ? 0 == e.touches.length && M(e) : M(e)), i
		}

		function I(t, u, c) {
			var g = void 0;
			if (c == p) {
				if ($e.trigger("swipeStatus", [u, Ie || null, Le || 0, ze || 0, Ve, Ye]), i.swipeStatus && (g = i.swipeStatus.call($e, t, u, Ie || null, Le || 0, ze || 0, Ve, Ye), g === !1)) return !1;
				if (u == b && W()) {
					if ($e.trigger("swipe", [Ie, Le, ze, Ve, Ye]), i.swipe && (g = i.swipe.call($e, t, Ie, Le, ze, Ve, Ye), g === !1)) return !1;
					switch (Ie) {
						case n:
							$e.trigger("swipeLeft", [Ie, Le, ze, Ve, Ye]), i.swipeLeft && (g = i.swipeLeft.call($e, t, Ie, Le, ze, Ve, Ye));
							break;
						case r:
							$e.trigger("swipeRight", [Ie, Le, ze, Ve, Ye]), i.swipeRight && (g = i.swipeRight.call($e, t, Ie, Le, ze, Ve, Ye));
							break;
						case s:
							$e.trigger("swipeUp", [Ie, Le, ze, Ve, Ye]), i.swipeUp && (g = i.swipeUp.call($e, t, Ie, Le, ze, Ve, Ye));
							break;
						case a:
							$e.trigger("swipeDown", [Ie, Le, ze, Ve, Ye]), i.swipeDown && (g = i.swipeDown.call($e, t, Ie, Le, ze, Ve, Ye))
					}
				}
			}
			if (c == h) {
				if ($e.trigger("pinchStatus", [u, qe || null, Xe || 0, ze || 0, Ve, Be, Ye]), i.pinchStatus && (g = i.pinchStatus.call($e, t, u, qe || null, Xe || 0, ze || 0, Ve, Be, Ye), g === !1)) return !1;
				if (u == b && q()) switch (qe) {
					case o:
						$e.trigger("pinchIn", [qe || null, Xe || 0, ze || 0, Ve, Be, Ye]), i.pinchIn && (g = i.pinchIn.call($e, t, qe || null, Xe || 0, ze || 0, Ve, Be, Ye));
						break;
					case l:
						$e.trigger("pinchOut", [qe || null, Xe || 0, ze || 0, Ve, Be, Ye]), i.pinchOut && (g = i.pinchOut.call($e, t, qe || null, Xe || 0, ze || 0, Ve, Be, Ye))
				}
			}
			return c == d ? (u === T || u === b) && (clearTimeout(Je), clearTimeout(et), Z() && !ee() ? (Ke = Pe(), Je = setTimeout(e.proxy(function() {
				Ke = null, $e.trigger("tap", [t.target]), i.tap && (g = i.tap.call($e, t, t.target))
			}, this), i.doubleTapThreshold)) : (Ke = null, $e.trigger("tap", [t.target]), i.tap && (g = i.tap.call($e, t, t.target)))) : c == f ? (u === T || u === b) && (clearTimeout(Je), Ke = null, $e.trigger("doubletap", [t.target]), i.doubleTap && (g = i.doubleTap.call($e, t, t.target))) : c == m && (u === T || u === b) && (clearTimeout(Je),
				Ke = null, $e.trigger("longtap", [t.target]), i.longTap && (g = i.longTap.call($e, t, t.target))), g
		}

		function z() {
			var e = !0;
			return null !== i.threshold && (e = Le >= i.threshold), e
		}

		function F() {
			var e = !1;
			return null !== i.cancelThreshold && null !== Ie && (e = ge(Ie) - Le >= i.cancelThreshold), e
		}

		function j() {
			return null !== i.pinchThreshold ? Xe >= i.pinchThreshold : !0
		}

		function B() {
			var e;
			return e = i.maxTimeThreshold && ze >= i.maxTimeThreshold ? !1 : !0
		}

		function X(e, t) {
			if (i.allowPageScroll === u || H()) e.preventDefault();
			else {
				var o = i.allowPageScroll === c;
				switch (t) {
					case n:
						(i.swipeLeft && o || !o && i.allowPageScroll != g) && e.preventDefault();
						break;
					case r:
						(i.swipeRight && o || !o && i.allowPageScroll != g) && e.preventDefault();
						break;
					case s:
						(i.swipeUp && o || !o && i.allowPageScroll != v) && e.preventDefault();
						break;
					case a:
						(i.swipeDown && o || !o && i.allowPageScroll != v) && e.preventDefault()
				}
			}
		}

		function q() {
			var e = G(),
				t = U(),
				i = j();
			return e && t && i
		}

		function H() {
			return !!(i.pinchStatus || i.pinchIn || i.pinchOut)
		}

		function $() {
			return !(!q() || !H())
		}

		function W() {
			var e = B(),
				t = z(),
				i = G(),
				n = U(),
				r = F(),
				s = !r && n && i && t && e;
			return s
		}

		function V() {
			return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown)
		}

		function Y() {
			return !(!W() || !V())
		}

		function G() {
			return Ve === i.fingers || i.fingers === _ || !S
		}

		function U() {
			return 0 !== Ye[0].end.x
		}

		function Q() {
			return !!i.tap
		}

		function Z() {
			return !!i.doubleTap
		}

		function K() {
			return !!i.longTap
		}

		function J() {
			if (null == Ke) return !1;
			var e = Pe();
			return Z() && e - Ke <= i.doubleTapThreshold
		}

		function ee() {
			return J()
		}

		function te() {
			return (1 === Ve || !S) && (isNaN(Le) || Le < i.threshold)
		}

		function ie() {
			return ze > i.longTapThreshold && y > Le
		}

		function ne() {
			return !(!te() || !Q())
		}

		function re() {
			return !(!J() || !Z())
		}

		function se() {
			return !(!ie() || !K())
		}

		function ae() {
			Qe = Pe(), Ze = event.touches.length + 1
		}

		function oe() {
			Qe = 0, Ze = 0
		}

		function le() {
			var e = !1;
			if (Qe) {
				var t = Pe() - Qe;
				t <= i.fingerReleaseThreshold && (e = !0)
			}
			return e
		}

		function ue() {
			return !($e.data(k + "_intouch") !== !0)
		}

		function ce(e) {
			e === !0 ? ($e.bind(Me, O), $e.bind(Ae, E), Re && $e.bind(Re, A)) : ($e.unbind(Me, O, !1), $e.unbind(Ae, E, !1), Re && $e.unbind(Re, A, !1)), $e.data(k + "_intouch", e === !0)
		}

		function pe(e, t) {
			var i = void 0 !== t.identifier ? t.identifier : 0;
			return Ye[e].identifier = i, Ye[e].start.x = Ye[e].end.x = t.pageX || t.clientX, Ye[e].start.y = Ye[e].end.y = t.pageY || t.clientY, Ye[e]
		}

		function he(e) {
			var t = void 0 !== e.identifier ? e.identifier : 0,
				i = de(t);
			return i.end.x = e.pageX || e.clientX, i.end.y = e.pageY || e.clientY, i
		}

		function de(e) {
			for (var t = 0; t < Ye.length; t++)
				if (Ye[t].identifier == e) return Ye[t]
		}

		function fe() {
			for (var e = [], t = 0; 5 >= t; t++) e.push({
				start: {
					x: 0,
					y: 0
				},
				end: {
					x: 0,
					y: 0
				},
				identifier: 0
			});
			return e
		}

		function me(e, t) {
			t = Math.max(t, ge(e)), He[e].distance = t
		}

		function ge(e) {
			return He[e] ? He[e].distance : void 0
		}

		function ve() {
			var e = {};
			return e[n] = _e(n), e[r] = _e(r), e[s] = _e(s), e[a] = _e(a), e
		}

		function _e(e) {
			return {
				direction: e,
				distance: 0
			}
		}

		function ye() {
			return Ue - Ge
		}

		function we(e, t) {
			var i = Math.abs(e.x - t.x),
				n = Math.abs(e.y - t.y);
			return Math.round(Math.sqrt(i * i + n * n))
		}

		function xe(e, t) {
			var i = t / e * 1;
			return i.toFixed(2)
		}

		function be() {
			return 1 > Be ? l : o
		}

		function Te(e, t) {
			return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
		}

		function Se(e, t) {
			var i = e.x - t.x,
				n = t.y - e.y,
				r = Math.atan2(n, i),
				s = Math.round(180 * r / Math.PI);
			return 0 > s && (s = 360 - Math.abs(s)), s
		}

		function Ce(e, t) {
			var i = Se(e, t);
			return 45 >= i && i >= 0 ? n : 360 >= i && i >= 315 ? n : i >= 135 && 225 >= i ? r : i > 45 && 135 > i ? a : s
		}

		function Pe() {
			var e = new Date;
			return e.getTime()
		}

		function ke(t) {
			t = e(t);
			var i = t.offset(),
				n = {
					left: i.left,
					right: i.left + t.outerWidth(),
					top: i.top,
					bottom: i.top + t.outerHeight()
				};
			return n
		}

		function De(e, t) {
			return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
		}
		var Oe = S || P || !i.fallbackToMouseEvents,
			Ee = Oe ? P ? C ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
			Me = Oe ? P ? C ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
			Ae = Oe ? P ? C ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
			Re = Oe ? null : "mouseleave",
			Ne = P ? C ? "MSPointerCancel" : "pointercancel" : "touchcancel",
			Le = 0,
			Ie = null,
			ze = 0,
			Fe = 0,
			je = 0,
			Be = 1,
			Xe = 0,
			qe = 0,
			He = null,
			$e = e(t),
			We = "start",
			Ve = 0,
			Ye = null,
			Ge = 0,
			Ue = 0,
			Qe = 0,
			Ze = 0,
			Ke = 0,
			Je = null,
			et = null;
		try {
			$e.bind(Ee, D), $e.bind(Ne, M)
		} catch (tt) {
			e.error("events not supported " + Ee + "," + Ne + " on jQuery.swipe")
		}
		this.enable = function() {
			return $e.bind(Ee, D), $e.bind(Ne, M), $e
		}, this.disable = function() {
			return R(), $e
		}, this.destroy = function() {
			return R(), $e.data(k, null), $e
		}, this.option = function(t, n) {
			if (void 0 !== i[t]) {
				if (void 0 === n) return i[t];
				i[t] = n
			} else e.error("Option " + t + " does not exist on jQuery.swipe.options");
			return null
		}
	}
	var n = "left",
		r = "right",
		s = "up",
		a = "down",
		o = "in",
		l = "out",
		u = "none",
		c = "auto",
		p = "swipe",
		h = "pinch",
		d = "tap",
		f = "doubletap",
		m = "longtap",
		g = "horizontal",
		v = "vertical",
		_ = "all",
		y = 10,
		w = "start",
		x = "move",
		b = "end",
		T = "cancel",
		S = "ontouchstart" in window,
		C = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
		P = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		k = "TouchSwipe",
		D = {
			fingers: 1,
			threshold: 75,
			cancelThreshold: null,
			pinchThreshold: 20,
			maxTimeThreshold: null,
			fingerReleaseThreshold: 250,
			longTapThreshold: 500,
			doubleTapThreshold: 200,
			swipe: null,
			swipeLeft: null,
			swipeRight: null,
			swipeUp: null,
			swipeDown: null,
			swipeStatus: null,
			pinchIn: null,
			pinchOut: null,
			pinchStatus: null,
			click: null,
			tap: null,
			doubleTap: null,
			longTap: null,
			hold: null,
			triggerOnTouchEnd: !0,
			triggerOnTouchLeave: !1,
			allowPageScroll: "auto",
			fallbackToMouseEvents: !0,
			excludedElements: "label, button, input, select, textarea, a, .noSwipe"
		};
	e.fn.swipe = function(i) {
		var n = e(this),
			r = n.data(k);
		if (r && "string" == typeof i) {
			if (r[i]) return r[i].apply(this, Array.prototype.slice.call(arguments, 1));
			e.error("Method " + i + " does not exist on jQuery.swipe")
		} else if (!(r || "object" != typeof i && i)) return t.apply(this, arguments);
		return n
	}, e.fn.swipe.defaults = D, e.fn.swipe.phases = {
		PHASE_START: w,
		PHASE_MOVE: x,
		PHASE_END: b,
		PHASE_CANCEL: T
	}, e.fn.swipe.directions = {
		LEFT: n,
		RIGHT: r,
		UP: s,
		DOWN: a,
		IN: o,
		OUT: l
	}, e.fn.swipe.pageScroll = {
		NONE: u,
		HORIZONTAL: g,
		VERTICAL: v,
		AUTO: c
	}, e.fn.swipe.fingers = {
		ONE: 1,
		TWO: 2,
		THREE: 3,
		ALL: _
	}
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		"use strict";
		_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
				var n = function(e) {
						var t, i = [],
							n = e.length;
						for (t = 0; t !== n; i.push(e[t++]));
						return i
					},
					r = function(e, t, n) {
						i.call(this, e, t, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = r.prototype.render
					},
					s = 1e-10,
					a = i._internals,
					o = a.isSelector,
					l = a.isArray,
					u = r.prototype = i.to({}, .1, {}),
					c = [];
				r.version = "1.16.1", u.constructor = r, u.kill()._gc = !1, r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf, r.getTweensOf = i.getTweensOf, r.lagSmoothing = i.lagSmoothing, r.ticker = i.ticker, r.render = i.render, u.invalidate = function() {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
				}, u.updateTo = function(e, t) {
					var n, r = this.ratio,
						s = this.vars.immediateRender || e.immediateRender;
					t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
					for (n in e) this.vars[n] = e[n];
					if (this._initted || s)
						if (t) this._initted = !1, s && this.render(0, !0, !0);
						else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
						var a = this._time;
						this.render(0, !0, !1), this._initted = !1, this.render(a, !0, !1)
					} else if (this._time > 0 || s) {
						this._initted = !1, this._init();
						for (var o, l = 1 / (1 - r), u = this._firstPT; u;) o = u.s + u.c, u.c *= l, u.s = o - u.c, u = u._next
					}
					return this
				}, u.render = function(e, t, i) {
					this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
					var n, r, o, l, u, p, h, d, f = this._dirty ? this.totalDuration() : this._totalDuration,
						m = this._time,
						g = this._totalTime,
						v = this._cycle,
						_ = this._duration,
						y = this._rawPrevTime;
					if (e >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === _ && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > y || y === s) && y !== e && (i = !0, y > s && (r = "onReverseComplete")), this._rawPrevTime = d = !t || e || y === e ? e : s)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === _ && y > 0) && (r = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === _ && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = d = !t || e || y === e ? e : s)), this._initted || (i = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (l = _ + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = _ - this._time), this._time > _ ? this._time = _ : 0 > this._time && (this._time = 0)), this._easeType ? (u = this._time / _, p = this._easeType, h = this._easePower, (1 === p || 3 === p && u >= .5) && (u = 1 - u), 3 === p && (u *= 2), 1 === h ? u *= u : 2 === h ? u *= u * u : 3 === h ? u *= u * u * u : 4 === h && (u *= u * u * u * u), this.ratio = 1 === p ? 1 - u : 2 === p ? u : .5 > this._time / _ ? u / 2 : 1 - u / 2) : this.ratio = this._ease.getRatio(this._time / _)), m === this._time && !i && v === this._cycle) return void(g !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c)));
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = m, this._totalTime = g, this._rawPrevTime = y, this._cycle = v, a.lazyTweens.push(this), void(this._lazy = [e, t]);
						this._time && !n ? this.ratio = this._ease.getRatio(this._time / _) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && e >= 0 && (this._active = !0), 0 === g && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === _) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || c))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
					this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, i), t || (this._totalTime !== g || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c)), this._cycle !== v && (t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || c)), r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || c), 0 === _ && this._rawPrevTime === s && d !== s && (this._rawPrevTime = 0))
				}, r.to = function(e, t, i) {
					return new r(e, t, i)
				}, r.from = function(e, t, i) {
					return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new r(e, t, i)
				}, r.fromTo = function(e, t, i, n) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new r(e, t, n)
				}, r.staggerTo = r.allTo = function(e, t, s, a, u, p, h) {
					a = a || 0;
					var d, f, m, g, v = s.delay || 0,
						_ = [],
						y = function() {
							s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), u.apply(h || this, p || c)
						};
					for (l(e) || ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = n(e))), e = e || [], 0 > a && (e = n(e), e.reverse(), a *= -1), d = e.length - 1, m = 0; d >= m; m++) {
						f = {};
						for (g in s) f[g] = s[g];
						f.delay = v, m === d && u && (f.onComplete = y), _[m] = new r(e[m], t, f), v += a
					}
					return _
				}, r.staggerFrom = r.allFrom = function(e, t, i, n, s, a, o) {
					return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, r.staggerTo(e, t, i, n, s, a, o)
				}, r.staggerFromTo = r.allFromTo = function(e, t, i, n, s, a, o, l) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, r.staggerTo(e, t, n, s, a, o, l)
				}, r.delayedCall = function(e, t, i, n, s) {
					return new r(t, 0, {
						delay: e,
						onComplete: t,
						onCompleteParams: i,
						onCompleteScope: n,
						onReverseComplete: t,
						onReverseCompleteParams: i,
						onReverseCompleteScope: n,
						immediateRender: !1,
						useFrames: s,
						overwrite: 0
					})
				}, r.set = function(e, t) {
					return new r(e, 0, t)
				}, r.isTweening = function(e) {
					return i.getTweensOf(e, !0).length > 0
				};
				var p = function(e, t) {
						for (var n = [], r = 0, s = e._first; s;) s instanceof i ? n[r++] = s : (t && (n[r++] = s), n = n.concat(p(s, t)), r = n.length), s = s._next;
						return n
					},
					h = r.getAllTweens = function(t) {
						return p(e._rootTimeline, t).concat(p(e._rootFramesTimeline, t))
					};
				r.killAll = function(e, i, n, r) {
					null == i && (i = !0), null == n && (n = !0);
					var s, a, o, l = h(0 != r),
						u = l.length,
						c = i && n && r;
					for (o = 0; u > o; o++) a = l[o], (c || a instanceof t || (s = a.target === a.vars.onComplete) && n || i && !s) && (e ? a.totalTime(a._reversed ? 0 : a.totalDuration()) : a._enabled(!1, !1))
				}, r.killChildTweensOf = function(e, t) {
					if (null != e) {
						var s, u, c, p, h, d = a.tweenLookup;
						if ("string" == typeof e && (e = i.selector(e) || e), o(e) && (e = n(e)), l(e))
							for (p = e.length; --p > -1;) r.killChildTweensOf(e[p], t);
						else {
							s = [];
							for (c in d)
								for (u = d[c].target.parentNode; u;) u === e && (s = s.concat(d[c].tweens)), u = u.parentNode;
							for (h = s.length, p = 0; h > p; p++) t && s[p].totalTime(s[p].totalDuration()), s[p]._enabled(!1, !1)
						}
					}
				};
				var d = function(e, i, n, r) {
					i = i !== !1, n = n !== !1, r = r !== !1;
					for (var s, a, o = h(r), l = i && n && r, u = o.length; --u > -1;) a = o[u], (l || a instanceof t || (s = a.target === a.vars.onComplete) && n || i && !s) && a.paused(e)
				};
				return r.pauseAll = function(e, t, i) {
					d(!0, e, t, i)
				}, r.resumeAll = function(e, t, i) {
					d(!1, e, t, i)
				}, r.globalTimeScale = function(t) {
					var n = e._rootTimeline,
						r = i.ticker.time;
					return arguments.length ? (t = t || s, n._startTime = r - (r - n._startTime) * n._timeScale / t, n = e._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / t, n._timeScale = e._rootTimeline._timeScale = t, t) : n._timeScale
				}, u.progress = function(e) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
				}, u.totalProgress = function(e) {
					return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
				}, u.time = function(e, t) {
					return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
				}, u.duration = function(t) {
					return arguments.length ? e.prototype.duration.call(this, t) : this._duration
				}, u.totalDuration = function(e) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
				}, u.repeat = function(e) {
					return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
				}, u.repeatDelay = function(e) {
					return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
				}, u.yoyo = function(e) {
					return arguments.length ? (this._yoyo = e, this) : this._yoyo
				}, r
			}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
				var n = function(e) {
						t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
						var i, n, r = this.vars;
						for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
						l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
					},
					r = 1e-10,
					s = i._internals,
					a = n._internals = {},
					o = s.isSelector,
					l = s.isArray,
					u = s.lazyTweens,
					c = s.lazyRender,
					p = [],
					h = _gsScope._gsDefine.globals,
					d = function(e) {
						var t, i = {};
						for (t in e) i[t] = e[t];
						return i
					},
					f = a.pauseCallback = function(e, t, i, n) {
						var s, a = e._timeline,
							o = a._totalTime,
							l = e._startTime,
							u = 0 > e._rawPrevTime || 0 === e._rawPrevTime && a._reversed,
							c = u ? 0 : r,
							h = u ? r : 0;
						if (t || !this._forcingPlayhead) {
							for (a.pause(l), s = e._prev; s && s._startTime === l;) s._rawPrevTime = h, s = s._prev;
							for (s = e._next; s && s._startTime === l;) s._rawPrevTime = c, s = s._next;
							t && t.apply(n || a, i || p), (this._forcingPlayhead || !a._paused) && a.seek(o)
						}
					},
					m = function(e) {
						var t, i = [],
							n = e.length;
						for (t = 0; t !== n; i.push(e[t++]));
						return i
					},
					g = n.prototype = new t;
				return n.version = "1.16.1", g.constructor = n, g.kill()._gc = g._forcingPlayhead = !1, g.to = function(e, t, n, r) {
					var s = n.repeat && h.TweenMax || i;
					return t ? this.add(new s(e, t, n), r) : this.set(e, n, r)
				}, g.from = function(e, t, n, r) {
					return this.add((n.repeat && h.TweenMax || i).from(e, t, n), r)
				}, g.fromTo = function(e, t, n, r, s) {
					var a = r.repeat && h.TweenMax || i;
					return t ? this.add(a.fromTo(e, t, n, r), s) : this.set(e, r, s)
				}, g.staggerTo = function(e, t, r, s, a, l, u, c) {
					var p, h = new n({
						onComplete: l,
						onCompleteParams: u,
						onCompleteScope: c,
						smoothChildTiming: this.smoothChildTiming
					});
					for ("string" == typeof e && (e = i.selector(e) || e), e = e || [], o(e) && (e = m(e)), s = s || 0, 0 > s && (e = m(e), e.reverse(), s *= -1), p = 0; e.length > p; p++) r.startAt && (r.startAt = d(r.startAt)), h.to(e[p], t, d(r), p * s);
					return this.add(h, a)
				}, g.staggerFrom = function(e, t, i, n, r, s, a, o) {
					return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, r, s, a, o)
				}, g.staggerFromTo = function(e, t, i, n, r, s, a, o, l) {
					return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, r, s, a, o, l)
				}, g.call = function(e, t, n, r) {
					return this.add(i.delayedCall(0, e, t, n), r)
				}, g.set = function(e, t, n) {
					return n = this._parseTimeOrLabel(n, 0, !0), null == t.immediateRender && (t.immediateRender = n === this._time && !this._paused), this.add(new i(e, 0, t), n)
				}, n.exportRoot = function(e, t) {
					e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
					var r, s, a = new n(e),
						o = a._timeline;
					for (null == t && (t = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) s = r._next, t && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = s;
					return o.add(a, 0), a
				}, g.add = function(r, s, a, o) {
					var u, c, p, h, d, f;
					if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof e)) {
						if (r instanceof Array || r && r.push && l(r)) {
							for (a = a || "normal", o = o || 0, u = s, c = r.length, p = 0; c > p; p++) l(h = r[p]) && (h = new n({
								tweens: h
							})), this.add(h, u), "string" != typeof h && "function" != typeof h && ("sequence" === a ? u = h._startTime + h.totalDuration() / h._timeScale : "start" === a && (h._startTime -= h.delay())), u += o;
							return this._uncache(!0)
						}
						if ("string" == typeof r) return this.addLabel(r, s);
						if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
						r = i.delayedCall(0, r)
					}
					if (t.prototype.add.call(this, r, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
						for (d = this, f = d.rawTime() > r._startTime; d._timeline;) f && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
					return this
				}, g.remove = function(t) {
					if (t instanceof e) return this._remove(t, !1);
					if (t instanceof Array || t && t.push && l(t)) {
						for (var i = t.length; --i > -1;) this.remove(t[i]);
						return this
					}
					return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
				}, g._remove = function(e, i) {
					t.prototype._remove.call(this, e, i);
					var n = this._last;
					return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
				}, g.append = function(e, t) {
					return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
				}, g.insert = g.insertMultiple = function(e, t, i, n) {
					return this.add(e, t || 0, i, n)
				}, g.appendMultiple = function(e, t, i, n) {
					return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
				}, g.addLabel = function(e, t) {
					return this._labels[e] = this._parseTimeOrLabel(t), this
				}, g.addPause = function(e, t, n, r) {
					var s = i.delayedCall(0, f, ["{self}", t, n, r], this);
					return s.data = "isPause", this.add(s, e)
				}, g.removeLabel = function(e) {
					return delete this._labels[e], this
				}, g.getLabelTime = function(e) {
					return null != this._labels[e] ? this._labels[e] : -1
				}, g._parseTimeOrLabel = function(t, i, n, r) {
					var s;
					if (r instanceof e && r.timeline === this) this.remove(r);
					else if (r && (r instanceof Array || r.push && l(r)))
						for (s = r.length; --s > -1;) r[s] instanceof e && r[s].timeline === this && this.remove(r[s]);
					if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof t && null == this._labels[i] ? t - this.duration() : 0, n);
					if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
					else {
						if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? n ? this._labels[t] = this.duration() + i : i : this._labels[t] + i;
						i = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, n) : this.duration()
					}
					return Number(t) + i
				}, g.seek = function(e, t) {
					return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
				}, g.stop = function() {
					return this.paused(!0)
				}, g.gotoAndPlay = function(e, t) {
					return this.play(e, t)
				}, g.gotoAndStop = function(e, t) {
					return this.pause(e, t)
				}, g.render = function(e, t, i) {
					this._gc && this._enabled(!0, !1);
					var n, s, a, o, l, h = this._dirty ? this.totalDuration() : this._totalDuration,
						d = this._time,
						f = this._startTime,
						m = this._timeScale,
						g = this._paused;
					if (e >= h) this._totalTime = this._time = h, this._reversed || this._hasPausedChild() || (s = !0, o = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, e = h + 1e-4;
					else if (1e-7 > e)
						if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (o = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = e;
						else {
							if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, 0 === e && s)
								for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
							e = 0, this._initted || (l = !0)
						} else this._totalTime = this._time = this._rawPrevTime = e;
					if (this._time !== d && this._first || i || l) {
						if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && e > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || p)), this._time >= d)
							for (n = this._first; n && (a = n._next, !this._paused || g);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = a;
						else
							for (n = this._last; n && (a = n._prev, !this._paused || g);)(n._active || d >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = a;
						this._onUpdate && (t || (u.length && c(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || p))), o && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (u.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || p)))
					}
				}, g._hasPausedChild = function() {
					for (var e = this._first; e;) {
						if (e._paused || e instanceof n && e._hasPausedChild()) return !0;
						e = e._next
					}
					return !1
				}, g.getChildren = function(e, t, n, r) {
					r = r || -9999999999;
					for (var s = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? t !== !1 && (s[o++] = a) : (n !== !1 && (s[o++] = a), e !== !1 && (s = s.concat(a.getChildren(!0, t, n)), o = s.length))), a = a._next;
					return s
				}, g.getTweensOf = function(e, t) {
					var n, r, s = this._gc,
						a = [],
						o = 0;
					for (s && this._enabled(!0, !0), n = i.getTweensOf(e), r = n.length; --r > -1;)(n[r].timeline === this || t && this._contains(n[r])) && (a[o++] = n[r]);
					return s && this._enabled(!1, !0), a
				}, g.recent = function() {
					return this._recent
				}, g._contains = function(e) {
					for (var t = e.timeline; t;) {
						if (t === this) return !0;
						t = t.timeline
					}
					return !1
				}, g.shiftChildren = function(e, t, i) {
					i = i || 0;
					for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += e), r = r._next;
					if (t)
						for (n in s) s[n] >= i && (s[n] += e);
					return this._uncache(!0)
				}, g._kill = function(e, t) {
					if (!e && !t) return this._enabled(!1, !1);
					for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(e, t) && (r = !0);
					return r
				}, g.clear = function(e) {
					var t = this.getChildren(!1, !0, !0),
						i = t.length;
					for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
					return e !== !1 && (this._labels = {}), this._uncache(!0)
				}, g.invalidate = function() {
					for (var t = this._first; t;) t.invalidate(), t = t._next;
					return e.prototype.invalidate.call(this)
				}, g._enabled = function(e, i) {
					if (e === this._gc)
						for (var n = this._first; n;) n._enabled(e, !0), n = n._next;
					return t.prototype._enabled.call(this, e, i)
				}, g.totalTime = function() {
					this._forcingPlayhead = !0;
					var t = e.prototype.totalTime.apply(this, arguments);
					return this._forcingPlayhead = !1, t
				}, g.duration = function(e) {
					return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
				}, g.totalDuration = function(e) {
					if (!arguments.length) {
						if (this._dirty) {
							for (var t, i, n = 0, r = this._last, s = 999999999999; r;) t = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, 0 > r._startTime && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = t;
							this._duration = this._totalDuration = n, this._dirty = !1
						}
						return this._totalDuration
					}
					return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
				}, g.paused = function(t) {
					if (!t)
						for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
					return e.prototype.paused.apply(this, arguments)
				}, g.usesFrames = function() {
					for (var t = this._timeline; t._timeline;) t = t._timeline;
					return t === e._rootFramesTimeline
				}, g.rawTime = function() {
					return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
				}, n
			}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
				var n = function(t) {
						e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
					},
					r = 1e-10,
					s = [],
					a = t._internals,
					o = a.lazyTweens,
					l = a.lazyRender,
					u = new i(null, null, 1, 0),
					c = n.prototype = new e;
				return c.constructor = n, c.kill()._gc = !1, n.version = "1.16.1", c.invalidate = function() {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
				}, c.addCallback = function(e, i, n, r) {
					return this.add(t.delayedCall(0, e, n, r), i)
				}, c.removeCallback = function(e, t) {
					if (e)
						if (null == t) this._kill(null, e);
						else
							for (var i = this.getTweensOf(e, !1), n = i.length, r = this._parseTimeOrLabel(t); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
					return this
				}, c.removePause = function(t) {
					return this.removeCallback(e._internals.pauseCallback, t)
				}, c.tweenTo = function(e, i) {
					i = i || {};
					var n, r, a, o = {
						ease: u,
						useFrames: this.usesFrames(),
						immediateRender: !1
					};
					for (r in i) o[r] = i[r];
					return o.time = this._parseTimeOrLabel(e), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, a = new t(this, n, o), o.onStart = function() {
						a.target.paused(!0), a.vars.time !== a.target.time() && n === a.duration() && a.duration(Math.abs(a.vars.time - a.target.time()) / a.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || a, i.onStartParams || s)
					}, a
				}, c.tweenFromTo = function(e, t, i) {
					i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
						onComplete: this.seek,
						onCompleteParams: [e],
						onCompleteScope: this
					}, i.immediateRender = i.immediateRender !== !1;
					var n = this.tweenTo(t, i);
					return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
				}, c.render = function(e, t, i) {
					this._gc && this._enabled(!0, !1);
					var n, a, u, c, p, h, d = this._dirty ? this.totalDuration() : this._totalDuration,
						f = this._duration,
						m = this._time,
						g = this._totalTime,
						v = this._startTime,
						_ = this._timeScale,
						y = this._rawPrevTime,
						w = this._paused,
						x = this._cycle;
					if (e >= d) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (a = !0, c = "onComplete", p = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > y || y === r) && y !== e && this._first && (p = !0, y > r && (c = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = f, e = f + 1e-4);
					else if (1e-7 > e)
						if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === f && y !== r && (y > 0 || 0 > e && y >= 0) && !this._locked) && (c = "onReverseComplete", a = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (p = a = !0, c = "onReverseComplete") : y >= 0 && this._first && (p = !0), this._rawPrevTime = e;
						else {
							if (this._rawPrevTime = f || !t || e || this._rawPrevTime === e ? e : r, 0 === e && a)
								for (n = this._first; n && 0 === n._startTime;) n._duration || (a = !1), n = n._next;
							e = 0, this._initted || (p = !0)
						} else 0 === f && 0 > y && (p = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (h = f + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, e = f + 1e-4) : 0 > this._time ? this._time = e = 0 : e = this._time));
					if (this._cycle !== x && !this._locked) {
						var b = this._yoyo && 0 !== (1 & x),
							T = b === (this._yoyo && 0 !== (1 & this._cycle)),
							S = this._totalTime,
							C = this._cycle,
							P = this._rawPrevTime,
							k = this._time;
						if (this._totalTime = x * f, x > this._cycle ? b = !b : this._totalTime += f, this._time = m, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = x, this._locked = !0, m = b ? 0 : f, this.render(m, t, 0 === f), t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s), T && (m = b ? f + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !w) return;
						this._time = k, this._totalTime = S, this._cycle = C, this._rawPrevTime = P
					}
					if (!(this._time !== m && this._first || i || p)) return void(g !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)));
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && e > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= m)
						for (n = this._first; n && (u = n._next, !this._paused || w);)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = u;
					else
						for (n = this._last; n && (u = n._prev, !this._paused || w);)(n._active || m >= n._startTime && !n._paused && !n._gc) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = u;
					this._onUpdate && (t || (o.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s))), c && (this._locked || this._gc || (v === this._startTime || _ !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (a && (o.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[c] && this.vars[c].apply(this.vars[c + "Scope"] || this, this.vars[c + "Params"] || s)))
				}, c.getActive = function(e, t, i) {
					null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
					var n, r, s = [],
						a = this.getChildren(e, t, i),
						o = 0,
						l = a.length;
					for (n = 0; l > n; n++) r = a[n], r.isActive() && (s[o++] = r);
					return s
				}, c.getLabelAfter = function(e) {
					e || 0 !== e && (e = this._time);
					var t, i = this.getLabelsArray(),
						n = i.length;
					for (t = 0; n > t; t++)
						if (i[t].time > e) return i[t].name;
					return null
				}, c.getLabelBefore = function(e) {
					null == e && (e = this._time);
					for (var t = this.getLabelsArray(), i = t.length; --i > -1;)
						if (e > t[i].time) return t[i].name;
					return null
				}, c.getLabelsArray = function() {
					var e, t = [],
						i = 0;
					for (e in this._labels) t[i++] = {
						time: this._labels[e],
						name: e
					};
					return t.sort(function(e, t) {
						return e.time - t.time
					}), t
				}, c.progress = function(e, t) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration();

				}, c.totalProgress = function(e, t) {
					return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
				}, c.totalDuration = function(t) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
				}, c.time = function(e, t) {
					return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
				}, c.repeat = function(e) {
					return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
				}, c.repeatDelay = function(e) {
					return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
				}, c.yoyo = function(e) {
					return arguments.length ? (this._yoyo = e, this) : this._yoyo
				}, c.currentLabel = function(e) {
					return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
				}, n
			}, !0),
			function() {
				var e = 180 / Math.PI,
					t = [],
					i = [],
					n = [],
					r = {},
					s = _gsScope._gsDefine.globals,
					a = function(e, t, i, n) {
						this.a = e, this.b = t, this.c = i, this.d = n, this.da = n - e, this.ca = i - e, this.ba = t - e
					},
					o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
					l = function(e, t, i, n) {
						var r = {
								a: e
							},
							s = {},
							a = {},
							o = {
								c: n
							},
							l = (e + t) / 2,
							u = (t + i) / 2,
							c = (i + n) / 2,
							p = (l + u) / 2,
							h = (u + c) / 2,
							d = (h - p) / 8;
						return r.b = l + (e - l) / 4, s.b = p + d, r.c = s.a = (r.b + s.b) / 2, s.c = a.a = (p + h) / 2, a.b = h - d, o.b = c + (n - c) / 4, a.c = o.a = (a.b + o.b) / 2, [r, s, a, o]
					},
					u = function(e, r, s, a, o) {
						var u, c, p, h, d, f, m, g, v, _, y, w, x, b = e.length - 1,
							T = 0,
							S = e[0].a;
						for (u = 0; b > u; u++) d = e[T], c = d.a, p = d.d, h = e[T + 1].d, o ? (y = t[u], w = i[u], x = .25 * (w + y) * r / (a ? .5 : n[u] || .5), f = p - (p - c) * (a ? .5 * r : 0 !== y ? x / y : 0), m = p + (h - p) * (a ? .5 * r : 0 !== w ? x / w : 0), g = p - (f + ((m - f) * (3 * y / (y + w) + .5) / 4 || 0))) : (f = p - .5 * (p - c) * r, m = p + .5 * (h - p) * r, g = p - (f + m) / 2), f += g, m += g, d.c = v = f, d.b = 0 !== u ? S : S = d.a + .6 * (d.c - d.a), d.da = p - c, d.ca = v - c, d.ba = S - c, s ? (_ = l(c, S, v, p), e.splice(T, 1, _[0], _[1], _[2], _[3]), T += 4) : T++, S = m;
						d = e[T], d.b = S, d.c = S + .4 * (d.d - S), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = S - d.a, s && (_ = l(d.a, S, d.c, d.d), e.splice(T, 1, _[0], _[1], _[2], _[3]))
					},
					c = function(e, n, r, s) {
						var o, l, u, c, p, h, d = [];
						if (s)
							for (e = [s].concat(e), l = e.length; --l > -1;) "string" == typeof(h = e[l][n]) && "=" === h.charAt(1) && (e[l][n] = s[n] + Number(h.charAt(0) + h.substr(2)));
						if (o = e.length - 2, 0 > o) return d[0] = new a(e[0][n], 0, 0, e[-1 > o ? 0 : 1][n]), d;
						for (l = 0; o > l; l++) u = e[l][n], c = e[l + 1][n], d[l] = new a(u, 0, 0, c), r && (p = e[l + 2][n], t[l] = (t[l] || 0) + (c - u) * (c - u), i[l] = (i[l] || 0) + (p - c) * (p - c));
						return d[l] = new a(e[l][n], 0, 0, e[l + 1][n]), d
					},
					p = function(e, s, a, l, p, h) {
						var d, f, m, g, v, _, y, w, x = {},
							b = [],
							T = h || e[0];
						p = "string" == typeof p ? "," + p + "," : o, null == s && (s = 1);
						for (f in e[0]) b.push(f);
						if (e.length > 1) {
							for (w = e[e.length - 1], y = !0, d = b.length; --d > -1;)
								if (f = b[d], Math.abs(T[f] - w[f]) > .05) {
									y = !1;
									break
								}
							y && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
						}
						for (t.length = i.length = n.length = 0, d = b.length; --d > -1;) f = b[d], r[f] = -1 !== p.indexOf("," + f + ","), x[f] = c(e, f, r[f], h);
						for (d = t.length; --d > -1;) t[d] = Math.sqrt(t[d]), i[d] = Math.sqrt(i[d]);
						if (!l) {
							for (d = b.length; --d > -1;)
								if (r[f])
									for (m = x[b[d]], _ = m.length - 1, g = 0; _ > g; g++) v = m[g + 1].da / i[g] + m[g].da / t[g], n[g] = (n[g] || 0) + v * v;
							for (d = n.length; --d > -1;) n[d] = Math.sqrt(n[d])
						}
						for (d = b.length, g = a ? 4 : 1; --d > -1;) f = b[d], m = x[f], u(m, s, a, l, r[f]), y && (m.splice(0, g), m.splice(m.length - g, g));
						return x
					},
					h = function(e, t, i) {
						t = t || "soft";
						var n, r, s, o, l, u, c, p, h, d, f, m = {},
							g = "cubic" === t ? 3 : 2,
							v = "soft" === t,
							_ = [];
						if (v && i && (e = [i].concat(e)), null == e || g + 1 > e.length) throw "invalid Bezier data";
						for (h in e[0]) _.push(h);
						for (u = _.length; --u > -1;) {
							for (h = _[u], m[h] = l = [], d = 0, p = e.length, c = 0; p > c; c++) n = null == i ? e[c][h] : "string" == typeof(f = e[c][h]) && "=" === f.charAt(1) ? i[h] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && c > 1 && p - 1 > c && (l[d++] = (n + l[d - 2]) / 2), l[d++] = n;
							for (p = d - g + 1, d = 0, c = 0; p > c; c += g) n = l[c], r = l[c + 1], s = l[c + 2], o = 2 === g ? 0 : l[c + 3], l[d++] = f = 3 === g ? new a(n, r, s, o) : new a(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
							l.length = d
						}
						return m
					},
					d = function(e, t, i) {
						for (var n, r, s, a, o, l, u, c, p, h, d, f = 1 / i, m = e.length; --m > -1;)
							for (h = e[m], s = h.a, a = h.d - s, o = h.c - s, l = h.b - s, n = r = 0, c = 1; i >= c; c++) u = f * c, p = 1 - u, n = r - (r = (u * u * a + 3 * p * (u * o + p * l)) * u), d = m * i + c - 1, t[d] = (t[d] || 0) + n * n
					},
					f = function(e, t) {
						t = t >> 0 || 6;
						var i, n, r, s, a = [],
							o = [],
							l = 0,
							u = 0,
							c = t - 1,
							p = [],
							h = [];
						for (i in e) d(e[i], a, t);
						for (r = a.length, n = 0; r > n; n++) l += Math.sqrt(a[n]), s = n % t, h[s] = l, s === c && (u += l, s = n / t >> 0, p[s] = h, o[s] = u, l = 0, h = []);
						return {
							length: u,
							lengths: o,
							segments: p
						}
					},
					m = _gsScope._gsDefine.plugin({
						propName: "bezier",
						priority: -1,
						version: "1.3.4",
						API: 2,
						global: !0,
						init: function(e, t, i) {
							this._target = e, t instanceof Array && (t = {
								values: t
							}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
							var n, r, s, a, o, l = t.values || [],
								u = {},
								c = l[0],
								d = t.autoRotate || i.vars.orientToBezier;
							this._autoRotate = d ? d instanceof Array ? d : [
								["x", "y", "rotation", d === !0 ? 0 : Number(d) || 0]
							] : null;
							for (n in c) this._props.push(n);
							for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof e[n], u[n] = r ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), o || u[n] !== l[0][n] && (o = u);
							if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? p(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, o) : h(l, t.type, u), this._segCount = this._beziers[n].length, this._timeRes) {
								var m = f(this._beziers, this._timeRes);
								this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
							}
							if (d = this._autoRotate)
								for (this._initialRotations = [], d[0] instanceof Array || (this._autoRotate = d = [d]), s = d.length; --s > -1;) {
									for (a = 0; 3 > a; a++) n = d[s][a], this._func[n] = "function" == typeof e[n] ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
									n = d[s][2], this._initialRotations[s] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
								}
							return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
						},
						set: function(t) {
							var i, n, r, s, a, o, l, u, c, p, h = this._segCount,
								d = this._func,
								f = this._target,
								m = t !== this._startRatio;
							if (this._timeRes) {
								if (c = this._lengths, p = this._curSeg, t *= this._length, r = this._li, t > this._l2 && h - 1 > r) {
									for (u = h - 1; u > r && t >= (this._l2 = c[++r]););
									this._l1 = c[r - 1], this._li = r, this._curSeg = p = this._segments[r], this._s2 = p[this._s1 = this._si = 0]
								} else if (this._l1 > t && r > 0) {
									for (; r > 0 && (this._l1 = c[--r]) >= t;);
									0 === r && this._l1 > t ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = p = this._segments[r], this._s1 = p[(this._si = p.length - 1) - 1] || 0, this._s2 = p[this._si]
								}
								if (i = r, t -= this._l1, r = this._si, t > this._s2 && p.length - 1 > r) {
									for (u = p.length - 1; u > r && t >= (this._s2 = p[++r]););
									this._s1 = p[r - 1], this._si = r
								} else if (this._s1 > t && r > 0) {
									for (; r > 0 && (this._s1 = p[--r]) >= t;);
									0 === r && this._s1 > t ? this._s1 = 0 : r++, this._s2 = p[r], this._si = r
								}
								o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec
							} else i = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, o = (t - i * (1 / h)) * h;
							for (n = 1 - o, r = this._props.length; --r > -1;) s = this._props[r], a = this._beziers[s][i], l = (o * o * a.da + 3 * n * (o * a.ca + n * a.ba)) * o + a.a, this._round[s] && (l = Math.round(l)), d[s] ? f[s](l) : f[s] = l;
							if (this._autoRotate) {
								var g, v, _, y, w, x, b, T = this._autoRotate;
								for (r = T.length; --r > -1;) s = T[r][2], x = T[r][3] || 0, b = T[r][4] === !0 ? 1 : e, a = this._beziers[T[r][0]], g = this._beziers[T[r][1]], a && g && (a = a[i], g = g[i], v = a.a + (a.b - a.a) * o, y = a.b + (a.c - a.b) * o, v += (y - v) * o, y += (a.c + (a.d - a.c) * o - y) * o, _ = g.a + (g.b - g.a) * o, w = g.b + (g.c - g.b) * o, _ += (w - _) * o, w += (g.c + (g.d - g.c) * o - w) * o, l = m ? Math.atan2(w - _, y - v) * b + x : this._initialRotations[r], d[s] ? f[s](l) : f[s] = l)
							}
						}
					}),
					g = m.prototype;
				m.bezierThrough = p, m.cubicToQuadratic = l, m._autoCSS = !0, m.quadraticToCubic = function(e, t, i) {
					return new a(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
				}, m._cssRegister = function() {
					var e = s.CSSPlugin;
					if (e) {
						var t = e._internals,
							i = t._parseToProxy,
							n = t._setPluginRatio,
							r = t.CSSPropTween;
						t._registerComplexSpecialProp("bezier", {
							parser: function(e, t, s, a, o, l) {
								t instanceof Array && (t = {
									values: t
								}), l = new m;
								var u, c, p, h = t.values,
									d = h.length - 1,
									f = [],
									g = {};
								if (0 > d) return o;
								for (u = 0; d >= u; u++) p = i(e, h[u], a, o, l, d !== u), f[u] = p.end;
								for (c in t) g[c] = t[c];
								return g.values = f, o = new r(e, "bezier", 0, 0, p.pt, 2), o.data = p, o.plugin = l, o.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (u = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != p.end.left ? [
									["left", "top", "rotation", u, !1]
								] : null != p.end.x ? [
									["x", "y", "rotation", u, !1]
								] : !1), g.autoRotate && (a._transform || a._enableTransforms(!1), p.autoRotate = a._target._gsTransform), l._onInitTween(p.proxy, g, a._tween), o
							}
						})
					}
				}, g._roundProps = function(e, t) {
					for (var i = this._overwriteProps, n = i.length; --n > -1;)(e[i[n]] || e.bezier || e.bezierThrough) && (this._round[i[n]] = t)
				}, g._kill = function(e) {
					var t, i, n = this._props;
					for (t in this._beziers)
						if (t in e)
							for (delete this._beziers[t], delete this._func[t], i = n.length; --i > -1;) n[i] === t && n.splice(i, 1);
					return this._super._kill.call(this, e)
				}
			}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
				var i, n, r, s, a = function() {
						e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
					},
					o = _gsScope._gsDefine.globals,
					l = {},
					u = a.prototype = new e("css");
				u.constructor = a, a.version = "1.16.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", u = "px", a.suffixMap = {
					top: u,
					right: u,
					bottom: u,
					left: u,
					width: u,
					height: u,
					fontSize: u,
					padding: u,
					margin: u,
					perspective: u,
					lineHeight: ""
				};
				var c, p, h, d, f, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
					v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					_ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
					w = /(?:\d|\-|\+|=|#|\.)*/g,
					x = /opacity *= *([^)]*)/i,
					b = /opacity:([^;]*)/i,
					T = /alpha\(opacity *=.+?\)/i,
					S = /^(rgb|hsl)/,
					C = /([A-Z])/g,
					P = /-([a-z])/gi,
					k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					D = function(e, t) {
						return t.toUpperCase()
					},
					O = /(?:Left|Right|Width)/i,
					E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					A = /,(?=[^\)]*(?:\(|$))/gi,
					R = Math.PI / 180,
					N = 180 / Math.PI,
					L = {},
					I = document,
					z = function(e) {
						return I.createElementNS ? I.createElementNS("http://www.w3.org/1999/xhtml", e) : I.createElement(e)
					},
					F = z("div"),
					j = z("img"),
					B = a._internals = {
						_specialProps: l
					},
					X = navigator.userAgent,
					q = function() {
						var e = X.indexOf("Android"),
							t = z("a");
						return h = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === e || Number(X.substr(e + 8, 1)) > 3), f = h && 6 > Number(X.substr(X.indexOf("Version/") + 8, 1)), d = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (m = parseFloat(RegExp.$1)), t ? (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity)) : !1
					}(),
					H = function(e) {
						return x.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
					},
					$ = function(e) {
						window.console && console.log(e)
					},
					W = "",
					V = "",
					Y = function(e, t) {
						t = t || F;
						var i, n, r = t.style;
						if (void 0 !== r[e]) return e;
						for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + e];);
						return n >= 0 ? (V = 3 === n ? "ms" : i[n], W = "-" + V.toLowerCase() + "-", V + e) : null
					},
					G = I.defaultView ? I.defaultView.getComputedStyle : function() {},
					U = a.getStyle = function(e, t, i, n, r) {
						var s;
						return q || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || G(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(C, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : H(e)
					},
					Q = B.convertToPixels = function(e, i, n, r, s) {
						if ("px" === r || !r) return n;
						if ("auto" === r || !n) return 0;
						var o, l, u, c = O.test(i),
							p = e,
							h = F.style,
							d = 0 > n;
						if (d && (n = -n), "%" === r && -1 !== i.indexOf("border")) o = n / 100 * (c ? e.clientWidth : e.clientHeight);
						else {
							if (h.cssText = "border:0 solid red;position:" + U(e, "position") + ";line-height:0;", "%" !== r && p.appendChild) h[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
							else {
								if (p = e.parentNode || I.body, l = p._gsCache, u = t.ticker.frame, l && c && l.time === u) return l.width * n / 100;
								h[c ? "width" : "height"] = n + r
							}
							p.appendChild(F), o = parseFloat(F[c ? "offsetWidth" : "offsetHeight"]), p.removeChild(F), c && "%" === r && a.cacheWidths !== !1 && (l = p._gsCache = p._gsCache || {}, l.time = u, l.width = 100 * (o / n)), 0 !== o || s || (o = Q(e, i, n, r, !0))
						}
						return d ? -o : o
					},
					Z = B.calculateOffset = function(e, t, i) {
						if ("absolute" !== U(e, "position", i)) return 0;
						var n = "left" === t ? "Left" : "Top",
							r = U(e, "margin" + n, i);
						return e["offset" + n] - (Q(e, t, parseFloat(r), r.replace(w, "")) || 0)
					},
					K = function(e, t) {
						var i, n, r, s = {};
						if (t = t || G(e, null))
							if (i = t.length)
								for (; --i > -1;) r = t[i], (-1 === r.indexOf("-transform") || Te === r) && (s[r.replace(P, D)] = t.getPropertyValue(r));
							else
								for (i in t)(-1 === i.indexOf("Transform") || be === i) && (s[i] = t[i]);
						else if (t = e.currentStyle || e.style)
							for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(P, D)] = t[i]);
						return q || (s.opacity = H(e)), n = Ae(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Ce && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
					},
					J = function(e, t, i, n, r) {
						var s, a, o, l = {},
							u = e.style;
						for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (t[a] !== (s = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[a] = "auto" !== s || "left" !== a && "top" !== a ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[a] || "" === t[a].replace(y, "") ? s : 0 : Z(e, a), void 0 !== u[a] && (o = new de(u, a, u[a], o)));
						if (n)
							for (a in n) "className" !== a && (l[a] = n[a]);
						return {
							difs: l,
							firstMPT: o
						}
					},
					ee = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"]
					},
					te = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
					ie = function(e, t, i) {
						var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
							r = ee[t],
							s = r.length;
						for (i = i || G(e, null); --s > -1;) n -= parseFloat(U(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(U(e, "border" + r[s] + "Width", i, !0)) || 0;
						return n
					},
					ne = function(e, t) {
						(null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
						var i = e.split(" "),
							n = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : i[0],
							r = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : i[1];
						return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), e = n + " " + r + (i.length > 2 ? " " + i[2] : ""), t && (t.oxp = -1 !== n.indexOf("%"), t.oyp = -1 !== r.indexOf("%"), t.oxr = "=" === n.charAt(1), t.oyr = "=" === r.charAt(1), t.ox = parseFloat(n.replace(y, "")), t.oy = parseFloat(r.replace(y, "")), t.v = e), t || e
					},
					re = function(e, t) {
						return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
					},
					se = function(e, t) {
						return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
					},
					ae = function(e, t, i, n) {
						var r, s, a, o, l, u = 1e-6;
						return null == e ? o = t : "number" == typeof e ? o = e : (r = 360, s = e.split("_"), l = "=" === e.charAt(1), a = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : N) - (l ? 0 : t), s.length && (n && (n[i] = t + a), -1 !== e.indexOf("short") && (a %= r, a !== a % (r / 2) && (a = 0 > a ? a + r : a - r)), -1 !== e.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * r) % r - (0 | a / r) * r : -1 !== e.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * r) % r - (0 | a / r) * r)), o = t + a), u > o && o > -u && (o = 0), o
					},
					oe = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0]
					},
					le = function(e, t, i) {
						return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (i - t) * e : .5 > e ? i : 2 > 3 * e ? t + 6 * (i - t) * (2 / 3 - e) : t) + .5
					},
					ue = a.parseColor = function(e) {
						var t, i, n, r, s, a;
						return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), oe[e] ? oe[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), i = e.charAt(2), n = e.charAt(3), e = "#" + t + t + i + i + n + n), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(g), r = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, a = Number(e[2]) / 100, i = .5 >= a ? a * (s + 1) : a + s - a * s, t = 2 * a - i, e.length > 3 && (e[3] = Number(e[3])), e[0] = le(r + 1 / 3, t, i), e[1] = le(r, t, i), e[2] = le(r - 1 / 3, t, i), e) : (e = e.match(g) || oe.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : oe.black
					},
					ce = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
				for (u in oe) ce += "|" + u + "\\b";
				ce = RegExp(ce + ")", "gi");
				var pe = function(e, t, i, n) {
						if (null == e) return function(e) {
							return e
						};
						var r, s = t ? (e.match(ce) || [""])[0] : "",
							a = e.split(s).join("").match(_) || [],
							o = e.substr(0, e.indexOf(a[0])),
							l = ")" === e.charAt(e.length - 1) ? ")" : "",
							u = -1 !== e.indexOf(" ") ? " " : ",",
							c = a.length,
							p = c > 0 ? a[0].replace(g, "") : "";
						return c ? r = t ? function(e) {
							var t, h, d, f;
							if ("number" == typeof e) e += p;
							else if (n && A.test(e)) {
								for (f = e.replace(A, "|").split("|"), d = 0; f.length > d; d++) f[d] = r(f[d]);
								return f.join(",")
							}
							if (t = (e.match(ce) || [s])[0], h = e.split(t).join("").match(_) || [], d = h.length, c > d--)
								for (; c > ++d;) h[d] = i ? h[0 | (d - 1) / 2] : a[d];
							return o + h.join(u) + u + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
						} : function(e) {
							var t, s, h;
							if ("number" == typeof e) e += p;
							else if (n && A.test(e)) {
								for (s = e.replace(A, "|").split("|"), h = 0; s.length > h; h++) s[h] = r(s[h]);
								return s.join(",")
							}
							if (t = e.match(_) || [], h = t.length, c > h--)
								for (; c > ++h;) t[h] = i ? t[0 | (h - 1) / 2] : a[h];
							return o + t.join(u) + l
						} : function(e) {
							return e
						}
					},
					he = function(e) {
						return e = e.split(","),
							function(t, i, n, r, s, a, o) {
								var l, u = (i + "").split(" ");
								for (o = {}, l = 0; 4 > l; l++) o[e[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
								return r.parse(t, o, s, a)
							}
					},
					de = (B._setPluginRatio = function(e) {
						this.plugin.setRatio(e);
						for (var t, i, n, r, s = this.data, a = s.proxy, o = s.firstMPT, l = 1e-6; o;) t = a[o.v], o.r ? t = Math.round(t) : l > t && t > -l && (t = 0), o.t[o.p] = t, o = o._next;
						if (s.autoRotate && (s.autoRotate.rotation = a.rotation), 1 === e)
							for (o = s.firstMPT; o;) {
								if (i = o.t, i.type) {
									if (1 === i.type) {
										for (r = i.xs0 + i.s + i.xs1, n = 1; i.l > n; n++) r += i["xn" + n] + i["xs" + (n + 1)];
										i.e = r
									}
								} else i.e = i.s + i.xs0;
								o = o._next
							}
					}, function(e, t, i, n, r) {
						this.t = e, this.p = t, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
					}),
					fe = (B._parseToProxy = function(e, t, i, n, r, s) {
						var a, o, l, u, c, p = n,
							h = {},
							d = {},
							f = i._transform,
							m = L;
						for (i._transform = null, L = t, n = c = i.parse(e, t, n, r), L = m, s && (i._transform = f, p && (p._prev = null, p._prev && (p._prev._next = null))); n && n !== p;) {
							if (1 >= n.type && (o = n.p, d[o] = n.s + n.c, h[o] = n.s, s || (u = new de(n, "s", o, u, n.r), n.c = 0), 1 === n.type))
								for (a = n.l; --a > 0;) l = "xn" + a, o = n.p + "_" + l, d[o] = n.data[l], h[o] = n[l], s || (u = new de(n, l, o, u, n.rxp[l]));
							n = n._next
						}
						return {
							proxy: h,
							end: d,
							firstMPT: u,
							pt: c
						}
					}, B.CSSPropTween = function(e, t, n, r, a, o, l, u, c, p, h) {
						this.t = e, this.p = t, this.s = n, this.c = r, this.n = l || t, e instanceof fe || s.push(this.n), this.r = u, this.type = o || 0, c && (this.pr = c, i = !0), this.b = void 0 === p ? n : p, this.e = void 0 === h ? n + r : h, a && (this._next = a, a._prev = this)
					}),
					me = a.parseComplex = function(e, t, i, n, r, s, a, o, l, u) {
						i = i || s || "", a = new fe(e, t, 0, 0, a, u ? 2 : 1, null, !1, o, i, n), n += "";
						var p, h, d, f, m, _, y, w, x, b, T, C, P = i.split(", ").join(",").split(" "),
							k = n.split(", ").join(",").split(" "),
							D = P.length,
							O = c !== !1;
						for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (P = P.join(" ").replace(A, ", ").split(" "), k = k.join(" ").replace(A, ", ").split(" "), D = P.length), D !== k.length && (P = (s || "").split(" "), D = P.length), a.plugin = l, a.setRatio = u, p = 0; D > p; p++)
							if (f = P[p], m = k[p], w = parseFloat(f), w || 0 === w) a.appendXtra("", w, re(m, w), m.replace(v, ""), O && -1 !== m.indexOf("px"), !0);
							else if (r && ("#" === f.charAt(0) || oe[f] || S.test(f))) C = "," === m.charAt(m.length - 1) ? ")," : ")", f = ue(f), m = ue(m), x = f.length + m.length > 6, x && !q && 0 === m[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[p]).join("transparent")) : (q || (x = !1), a.appendXtra(x ? "rgba(" : "rgb(", f[0], m[0] - f[0], ",", !0, !0).appendXtra("", f[1], m[1] - f[1], ",", !0).appendXtra("", f[2], m[2] - f[2], x ? "," : C, !0), x && (f = 4 > f.length ? 1 : f[3], a.appendXtra("", f, (4 > m.length ? 1 : m[3]) - f, C, !1)));
						else if (_ = f.match(g)) {
							if (y = m.match(v), !y || y.length !== _.length) return a;
							for (d = 0, h = 0; _.length > h; h++) T = _[h], b = f.indexOf(T, d), a.appendXtra(f.substr(d, b - d), Number(T), re(y[h], T), "", O && "px" === f.substr(b + T.length, 2), 0 === h), d = b + T.length;
							a["xs" + a.l] += f.substr(d)
						} else a["xs" + a.l] += a.l ? " " + f : f;
						if (-1 !== n.indexOf("=") && a.data) {
							for (C = a.xs0 + a.data.s, p = 1; a.l > p; p++) C += a["xs" + p] + a.data["xn" + p];
							a.e = C + a["xs" + p]
						}
						return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
					},
					ge = 9;
				for (u = fe.prototype, u.l = u.pr = 0; --ge > 0;) u["xn" + ge] = 0, u["xs" + ge] = "";
				u.xs0 = "", u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null, u.appendXtra = function(e, t, i, n, r, s) {
					var a = this,
						o = a.l;
					return a["xs" + o] += s && o ? " " + e : e || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = n || "", o > 0 ? (a.data["xn" + o] = t + i, a.rxp["xn" + o] = r, a["xn" + o] = t, a.plugin || (a.xfirst = new fe(a, "xn" + o, t, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
						s: t + i
					}, a.rxp = {}, a.s = t, a.c = i, a.r = r, a)) : (a["xs" + o] += t + (n || ""), a)
				};
				var ve = function(e, t) {
						t = t || {}, this.p = t.prefix ? Y(e) || e : e, l[e] = l[this.p] = this, this.format = t.formatter || pe(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
					},
					_e = B._registerComplexSpecialProp = function(e, t, i) {
						"object" != typeof t && (t = {
							parser: i
						});
						var n, r, s = e.split(","),
							a = t.defaultValue;
						for (i = i || [a], n = 0; s.length > n; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || a, r = new ve(s[n], t)
					},
					ye = function(e) {
						if (!l[e]) {
							var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
							_e(e, {
								parser: function(e, i, n, r, s, a, u) {
									var c = o.com.greensock.plugins[t];
									return c ? (c._cssRegister(), l[n].parse(e, i, n, r, s, a, u)) : ($("Error: " + t + " js file not loaded."), s)
								}
							})
						}
					};
				u = ve.prototype, u.parseComplex = function(e, t, i, n, r, s) {
					var a, o, l, u, c, p, h = this.keyword;
					if (this.multi && (A.test(i) || A.test(t) ? (o = t.replace(A, "|").split("|"), l = i.replace(A, "|").split("|")) : h && (o = [t], l = [i])), l) {
						for (u = l.length > o.length ? l.length : o.length, a = 0; u > a; a++) t = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, h && (c = t.indexOf(h), p = i.indexOf(h), c !== p && (-1 === p ? o[a] = o[a].split(h).join("") : -1 === c && (o[a] += " " + h)));
						t = o.join(", "), i = l.join(", ")
					}
					return me(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
				}, u.parse = function(e, t, i, n, s, a) {
					return this.parseComplex(e.style, this.format(U(e, this.p, r, !1, this.dflt)), this.format(t), s, a)
				}, a.registerSpecialProp = function(e, t, i) {
					_e(e, {
						parser: function(e, n, r, s, a, o) {
							var l = new fe(e, r, 0, 0, a, 2, r, !1, i);
							return l.plugin = o, l.setRatio = t(e, n, s._tween, r), l
						},
						priority: i
					})
				}, a.useSVGTransformAttr = h;
				var we, xe = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
					be = Y("transform"),
					Te = W + "transform",
					Se = Y("transformOrigin"),
					Ce = null !== Y("perspective"),
					Pe = B.Transform = function() {
						this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = a.defaultForce3D !== !1 && Ce ? a.defaultForce3D || "auto" : !1
					},
					ke = window.SVGElement,
					De = function(e, t, i) {
						var n, r = I.createElementNS("http://www.w3.org/2000/svg", e),
							s = /([a-z])([A-Z])/g;
						for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
						return t.appendChild(r), r
					},
					Oe = I.documentElement,
					Ee = function() {
						var e, t, i, n = m || /Android/i.test(X) && !window.chrome;
						return I.createElementNS && !n && (e = De("svg", Oe), t = De("rect", e, {
							width: 100,
							height: 50,
							x: 100
						}), i = t.getBoundingClientRect().width, t.style[Se] = "50% 50%", t.style[be] = "scaleX(0.5)", n = i === t.getBoundingClientRect().width && !(d && Ce), Oe.removeChild(e)), n
					}(),
					Me = function(e, t, i, n) {
						var r, s;
						n && (s = n.split(" ")).length || (r = e.getBBox(), t = ne(t).split(" "), s = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * r.width : parseFloat(t[0])) + r.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * r.height : parseFloat(t[1])) + r.y]), i.xOrigin = parseFloat(s[0]), i.yOrigin = parseFloat(s[1]), e.setAttribute("data-svg-origin", s.join(" "))
					},
					Ae = B.getTransform = function(e, t, i, n) {
						if (e._gsTransform && i && !n) return e._gsTransform;
						var s, o, l, u, c, p, h, d, f, m, g = i ? e._gsTransform || new Pe : new Pe,
							v = 0 > g.scaleX,
							_ = 2e-5,
							y = 1e5,
							w = Ce ? parseFloat(U(e, Se, t, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0,
							x = parseFloat(a.defaultTransformPerspective) || 0;
						if (be ? o = U(e, Te, t, !0) : e.currentStyle && (o = e.currentStyle.filter.match(E), o = o && 4 === o.length ? [o[0].substr(4), Number(o[2].substr(4)), Number(o[1].substr(4)), o[3].substr(4), g.x || 0, g.y || 0].join(",") : ""), s = !o || "none" === o || "matrix(1, 0, 0, 1, 0, 0)" === o, g.svg = !!(ke && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM)), g.svg && (s && -1 !== (e.style[be] + "").indexOf("matrix") && (o = e.style[be], s = !1), Me(e, U(e, Se, r, !1, "50% 50%") + "", g, e.getAttribute("data-svg-origin")), we = a.useSVGTransformAttr || Ee, l = e.getAttribute("transform"), s && l && -1 !== l.indexOf("matrix") && (o = l, s = 0)), !s) {
							for (l = (o || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], u = l.length; --u > -1;) c = Number(l[u]), l[u] = (p = c - (c |= 0)) ? (0 | p * y + (0 > p ? -.5 : .5)) / y + c : c;
							if (16 === l.length) {
								var b, T, S, C, P, k = l[0],
									D = l[1],
									O = l[2],
									M = l[3],
									A = l[4],
									R = l[5],
									L = l[6],
									I = l[7],
									z = l[8],
									F = l[9],
									j = l[10],
									B = l[12],
									X = l[13],
									q = l[14],
									H = l[11],
									$ = Math.atan2(L, j);
								g.zOrigin && (q = -g.zOrigin, B = z * q - l[12], X = F * q - l[13], q = j * q + g.zOrigin - l[14]), g.rotationX = $ * N, $ && (C = Math.cos(-$), P = Math.sin(-$), b = A * C + z * P, T = R * C + F * P, S = L * C + j * P, z = A * -P + z * C, F = R * -P + F * C, j = L * -P + j * C, H = I * -P + H * C, A = b, R = T, L = S), $ = Math.atan2(z, j), g.rotationY = $ * N, $ && (C = Math.cos(-$), P = Math.sin(-$), b = k * C - z * P, T = D * C - F * P, S = O * C - j * P, F = D * P + F * C, j = O * P + j * C, H = M * P + H * C, k = b, D = T, O = S), $ = Math.atan2(D, k), g.rotation = $ * N, $ && (C = Math.cos(-$), P = Math.sin(-$), k = k * C + A * P, T = D * C + R * P, R = D * -P + R * C, L = O * -P + L * C, D = T), g.rotationX && Math.abs(g.rotationX) + Math.abs(g.rotation) > 359.9 && (g.rotationX = g.rotation = 0, g.rotationY += 180), g.scaleX = (0 | Math.sqrt(k * k + D * D) * y + .5) / y, g.scaleY = (0 | Math.sqrt(R * R + F * F) * y + .5) / y, g.scaleZ = (0 | Math.sqrt(L * L + j * j) * y + .5) / y, g.skewX = 0, g.perspective = H ? 1 / (0 > H ? -H : H) : 0, g.x = B, g.y = X, g.z = q, g.svg && (g.x -= g.xOrigin - (g.xOrigin * k - g.yOrigin * A), g.y -= g.yOrigin - (g.yOrigin * D - g.xOrigin * R))
							} else if (!(Ce && !n && l.length && g.x === l[4] && g.y === l[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === U(e, "display", t))) {
								var W = l.length >= 6,
									V = W ? l[0] : 1,
									Y = l[1] || 0,
									G = l[2] || 0,
									Q = W ? l[3] : 1;
								g.x = l[4] || 0, g.y = l[5] || 0, h = Math.sqrt(V * V + Y * Y), d = Math.sqrt(Q * Q + G * G), f = V || Y ? Math.atan2(Y, V) * N : g.rotation || 0, m = G || Q ? Math.atan2(G, Q) * N + f : g.skewX || 0, Math.abs(m) > 90 && 270 > Math.abs(m) && (v ? (h *= -1, m += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (d *= -1, m += 0 >= m ? 180 : -180)), g.scaleX = h, g.scaleY = d, g.rotation = f, g.skewX = m, Ce && (g.rotationX = g.rotationY = g.z = 0, g.perspective = x, g.scaleZ = 1), g.svg && (g.x -= g.xOrigin - (g.xOrigin * V - g.yOrigin * Y), g.y -= g.yOrigin - (g.yOrigin * Q - g.xOrigin * G))
							}
							g.zOrigin = w;
							for (u in g) _ > g[u] && g[u] > -_ && (g[u] = 0)
						}
						return i && (e._gsTransform = g, g.svg && (we && e.style[be] ? Ie(e.style, be) : !we && e.getAttribute("transform") && e.removeAttribute("transform"))), g
					},
					Re = function(e) {
						var t, i, n = this.data,
							r = -n.rotation * R,
							s = r + n.skewX * R,
							a = 1e5,
							o = (0 | Math.cos(r) * n.scaleX * a) / a,
							l = (0 | Math.sin(r) * n.scaleX * a) / a,
							u = (0 | Math.sin(s) * -n.scaleY * a) / a,
							c = (0 | Math.cos(s) * n.scaleY * a) / a,
							p = this.t.style,
							h = this.t.currentStyle;
						if (h) {
							i = l, l = -u, u = -i, t = h.filter, p.filter = "";
							var d, f, g = this.t.offsetWidth,
								v = this.t.offsetHeight,
								_ = "absolute" !== h.position,
								y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + c,
								b = n.x + g * n.xPercent / 100,
								T = n.y + v * n.yPercent / 100;
							if (null != n.ox && (d = (n.oxp ? .01 * g * n.ox : n.ox) - g / 2, f = (n.oyp ? .01 * v * n.oy : n.oy) - v / 2, b += d - (d * o + f * l), T += f - (d * u + f * c)), _ ? (d = g / 2, f = v / 2, y += ", Dx=" + (d - (d * o + f * l) + b) + ", Dy=" + (f - (d * u + f * c) + T) + ")") : y += ", sizingMethod='auto expand')", p.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(M, y) : y + " " + t, (0 === e || 1 === e) && 1 === o && 0 === l && 0 === u && 1 === c && (_ && -1 === y.indexOf("Dx=0, Dy=0") || x.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf("gradient(" && t.indexOf("Alpha")) && p.removeAttribute("filter")), !_) {
								var S, C, P, k = 8 > m ? 1 : -1;
								for (d = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > o ? -o : o) * g + (0 > l ? -l : l) * v)) / 2 + b), n.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > u ? -u : u) * g)) / 2 + T), ge = 0; 4 > ge; ge++) C = te[ge], S = h[C], i = -1 !== S.indexOf("px") ? parseFloat(S) : Q(this.t, C, parseFloat(S), S.replace(w, "")) || 0, P = i !== n[C] ? 2 > ge ? -n.ieOffsetX : -n.ieOffsetY : 2 > ge ? d - n.ieOffsetX : f - n.ieOffsetY, p[C] = (n[C] = Math.round(i - P * (0 === ge || 2 === ge ? 1 : k))) + "px"
							}
						}
					},
					Ne = B.set3DTransformRatio = B.setTransformRatio = function(e) {
						var t, i, n, r, s, a, o, l, u, c, p, h, f, m, g, v, _, y, w, x, b, T, S, C = this.data,
							P = this.t.style,
							k = C.rotation,
							D = C.rotationX,
							O = C.rotationY,
							E = C.scaleX,
							M = C.scaleY,
							A = C.scaleZ,
							N = C.x,
							L = C.y,
							I = C.z,
							z = C.svg,
							F = C.perspective,
							j = C.force3D;
						if (!((1 !== e && 0 !== e || "auto" !== j || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && j || I || F || O || D) || we && z || !Ce) return void(k || C.skewX || z ? (k *= R, T = C.skewX * R, S = 1e5, t = Math.cos(k) * E, r = Math.sin(k) * E, i = Math.sin(k - T) * -M, s = Math.cos(k - T) * M, T && "simple" === C.skewType && (_ = Math.tan(T), _ = Math.sqrt(1 + _ * _), i *= _, s *= _, C.skewY && (t *= _, r *= _)), z && (N += C.xOrigin - (C.xOrigin * t + C.yOrigin * i), L += C.yOrigin - (C.xOrigin * r + C.yOrigin * s), m = 1e-6, m > N && N > -m && (N = 0), m > L && L > -m && (L = 0)), w = (0 | t * S) / S + "," + (0 | r * S) / S + "," + (0 | i * S) / S + "," + (0 | s * S) / S + "," + N + "," + L + ")", z && we ? this.t.setAttribute("transform", "matrix(" + w) : P[be] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + w) : P[be] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + M + "," + N + "," + L + ")");
						if (d && (m = 1e-4, m > E && E > -m && (E = A = 2e-5), m > M && M > -m && (M = A = 2e-5), !F || C.z || C.rotationX || C.rotationY || (F = 0)), k || C.skewX) k *= R, g = t = Math.cos(k), v = r = Math.sin(k), C.skewX && (k -= C.skewX * R, g = Math.cos(k), v = Math.sin(k), "simple" === C.skewType && (_ = Math.tan(C.skewX * R), _ = Math.sqrt(1 + _ * _), g *= _, v *= _, C.skewY && (t *= _, r *= _))), i = -v, s = g;
						else {
							if (!(O || D || 1 !== A || F || z)) return void(P[be] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + N + "px," + L + "px," + I + "px)" + (1 !== E || 1 !== M ? " scale(" + E + "," + M + ")" : ""));
							t = s = 1, i = r = 0
						}
						u = 1, n = a = o = l = c = p = 0, h = F ? -1 / F : 0, f = C.zOrigin, m = 1e-6, x = ",", b = "0", k = O * R, k && (g = Math.cos(k), v = Math.sin(k), o = -v, c = h * -v, n = t * v, a = r * v, u = g, h *= g, t *= g, r *= g), k = D * R, k && (g = Math.cos(k), v = Math.sin(k), _ = i * g + n * v, y = s * g + a * v, l = u * v, p = h * v, n = i * -v + n * g, a = s * -v + a * g, u *= g, h *= g, i = _, s = y), 1 !== A && (n *= A, a *= A, u *= A, h *= A), 1 !== M && (i *= M, s *= M, l *= M, p *= M), 1 !== E && (t *= E, r *= E, o *= E, c *= E), (f || z) && (f && (N += n * -f, L += a * -f, I += u * -f + f), z && (N += C.xOrigin - (C.xOrigin * t + C.yOrigin * i), L += C.yOrigin - (C.xOrigin * r + C.yOrigin * s)), m > N && N > -m && (N = b), m > L && L > -m && (L = b), m > I && I > -m && (I = 0)), w = C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(", w += (m > t && t > -m ? b : t) + x + (m > r && r > -m ? b : r) + x + (m > o && o > -m ? b : o), w += x + (m > c && c > -m ? b : c) + x + (m > i && i > -m ? b : i) + x + (m > s && s > -m ? b : s), D || O ? (w += x + (m > l && l > -m ? b : l) + x + (m > p && p > -m ? b : p) + x + (m > n && n > -m ? b : n), w += x + (m > a && a > -m ? b : a) + x + (m > u && u > -m ? b : u) + x + (m > h && h > -m ? b : h) + x) : w += ",0,0,0,0,1,0,", w += N + x + L + x + I + x + (F ? 1 + -I / F : 1) + ")", P[be] = w
					};
				u = Pe.prototype, u.x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = 0, u.scaleX = u.scaleY = u.scaleZ = 1, _e("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
					parser: function(e, t, i, n, s, o, l) {
						if (n._lastParsedTransform === l) return s;
						n._lastParsedTransform = l;
						var u, c, p, h, d, f, m, g = n._transform = Ae(e, r, !0, l.parseTransform),
							v = e.style,
							_ = 1e-6,
							y = xe.length,
							w = l,
							x = {};
						if ("string" == typeof w.transform && be) p = F.style, p[be] = w.transform, p.display = "block", p.position = "absolute", I.body.appendChild(F), u = Ae(F, null, !1), I.body.removeChild(F);
						else if ("object" == typeof w) {
							if (u = {
									scaleX: se(null != w.scaleX ? w.scaleX : w.scale, g.scaleX),
									scaleY: se(null != w.scaleY ? w.scaleY : w.scale, g.scaleY),
									scaleZ: se(w.scaleZ, g.scaleZ),
									x: se(w.x, g.x),
									y: se(w.y, g.y),
									z: se(w.z, g.z),
									xPercent: se(w.xPercent, g.xPercent),
									yPercent: se(w.yPercent, g.yPercent),
									perspective: se(w.transformPerspective, g.perspective)
								}, m = w.directionalRotation, null != m)
								if ("object" == typeof m)
									for (p in m) w[p] = m[p];
								else w.rotation = m;
								"string" == typeof w.x && -1 !== w.x.indexOf("%") && (u.x = 0, u.xPercent = se(w.x, g.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (u.y = 0, u.yPercent = se(w.y, g.yPercent)), u.rotation = ae("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : g.rotation, g.rotation, "rotation", x), Ce && (u.rotationX = ae("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", x), u.rotationY = ae("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", x)), u.skewX = null == w.skewX ? g.skewX : ae(w.skewX, g.skewX), u.skewY = null == w.skewY ? g.skewY : ae(w.skewY, g.skewY), (c = u.skewY - g.skewY) && (u.skewX += c, u.rotation += c)
						}
						for (Ce && null != w.force3D && (g.force3D = w.force3D,
								f = !0), g.skewType = w.skewType || g.skewType || a.defaultSkewType, d = g.force3D || g.z || g.rotationX || g.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, d || null == w.scale || (u.scaleZ = 1); --y > -1;) i = xe[y], h = u[i] - g[i], (h > _ || -_ > h || null != w[i] || null != L[i]) && (f = !0, s = new fe(g, i, g[i], h, s), i in x && (s.e = x[i]), s.xs0 = 0, s.plugin = o, n._overwriteProps.push(s.n));
						return h = w.transformOrigin, g.svg && (h || w.svgOrigin) && (Me(e, ne(h), u, w.svgOrigin), s = new fe(g, "xOrigin", g.xOrigin, u.xOrigin - g.xOrigin, s, -1, "transformOrigin"), s.b = g.xOrigin, s.e = s.xs0 = u.xOrigin, s = new fe(g, "yOrigin", g.yOrigin, u.yOrigin - g.yOrigin, s, -1, "transformOrigin"), s.b = g.yOrigin, s.e = s.xs0 = u.yOrigin, h = we ? null : "0px 0px"), (h || Ce && d && g.zOrigin) && (be ? (f = !0, i = Se, h = (h || U(e, i, r, !1, "50% 50%")) + "", s = new fe(v, i, 0, 0, s, -1, "transformOrigin"), s.b = v[i], s.plugin = o, Ce ? (p = g.zOrigin, h = h.split(" "), g.zOrigin = (h.length > 2 && (0 === p || "0px" !== h[2]) ? parseFloat(h[2]) : p) || 0, s.xs0 = s.e = h[0] + " " + (h[1] || "50%") + " 0px", s = new fe(g, "zOrigin", 0, 0, s, -1, s.n), s.b = p, s.xs0 = s.e = g.zOrigin) : s.xs0 = s.e = h) : ne(h + "", g)), f && (n._transformType = g.svg && we || !d && 3 !== this._transformType ? 2 : 3), s
					},
					prefix: !0
				}), _e("boxShadow", {
					defaultValue: "0px 0px 0px 0px #999",
					prefix: !0,
					color: !0,
					multi: !0,
					keyword: "inset"
				}), _e("borderRadius", {
					defaultValue: "0px",
					parser: function(e, t, i, s, a) {
						t = this.format(t);
						var o, l, u, c, p, h, d, f, m, g, v, _, y, w, x, b, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
							S = e.style;
						for (m = parseFloat(e.offsetWidth), g = parseFloat(e.offsetHeight), o = t.split(" "), l = 0; T.length > l; l++) this.p.indexOf("border") && (T[l] = Y(T[l])), p = c = U(e, T[l], r, !1, "0px"), -1 !== p.indexOf(" ") && (c = p.split(" "), p = c[0], c = c[1]), h = u = o[l], d = parseFloat(p), _ = p.substr((d + "").length), y = "=" === h.charAt(1), y ? (f = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), f *= parseFloat(h), v = h.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(h), v = h.substr((f + "").length)), "" === v && (v = n[i] || _), v !== _ && (w = Q(e, "borderLeft", d, _), x = Q(e, "borderTop", d, _), "%" === v ? (p = 100 * (w / m) + "%", c = 100 * (x / g) + "%") : "em" === v ? (b = Q(e, "borderLeft", 1, "em"), p = w / b + "em", c = x / b + "em") : (p = w + "px", c = x + "px"), y && (h = parseFloat(p) + f + v, u = parseFloat(c) + f + v)), a = me(S, T[l], p + " " + c, h + " " + u, !1, "0px", a);
						return a
					},
					prefix: !0,
					formatter: pe("0px 0px 0px 0px", !1, !0)
				}), _e("backgroundPosition", {
					defaultValue: "0 0",
					parser: function(e, t, i, n, s, a) {
						var o, l, u, c, p, h, d = "background-position",
							f = r || G(e, null),
							g = this.format((f ? m ? f.getPropertyValue(d + "-x") + " " + f.getPropertyValue(d + "-y") : f.getPropertyValue(d) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
							v = this.format(t);
						if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (h = U(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
							for (o = g.split(" "), l = v.split(" "), j.setAttribute("src", h), u = 2; --u > -1;) g = o[u], c = -1 !== g.indexOf("%"), c !== (-1 !== l[u].indexOf("%")) && (p = 0 === u ? e.offsetWidth - j.width : e.offsetHeight - j.height, o[u] = c ? parseFloat(g) / 100 * p + "px" : 100 * (parseFloat(g) / p) + "%");
							g = o.join(" ")
						}
						return this.parseComplex(e.style, g, v, s, a)
					},
					formatter: ne
				}), _e("backgroundSize", {
					defaultValue: "0 0",
					formatter: ne
				}), _e("perspective", {
					defaultValue: "0px",
					prefix: !0
				}), _e("perspectiveOrigin", {
					defaultValue: "50% 50%",
					prefix: !0
				}), _e("transformStyle", {
					prefix: !0
				}), _e("backfaceVisibility", {
					prefix: !0
				}), _e("userSelect", {
					prefix: !0
				}), _e("margin", {
					parser: he("marginTop,marginRight,marginBottom,marginLeft")
				}), _e("padding", {
					parser: he("paddingTop,paddingRight,paddingBottom,paddingLeft")
				}), _e("clip", {
					defaultValue: "rect(0px,0px,0px,0px)",
					parser: function(e, t, i, n, s, a) {
						var o, l, u;
						return 9 > m ? (l = e.currentStyle, u = 8 > m ? " " : ",", o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")", t = this.format(t).split(",").join(u)) : (o = this.format(U(e, this.p, r, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, o, t, s, a)
					}
				}), _e("textShadow", {
					defaultValue: "0px 0px 0px #999",
					color: !0,
					multi: !0
				}), _e("autoRound,strictUnits", {
					parser: function(e, t, i, n, r) {
						return r
					}
				}), _e("border", {
					defaultValue: "0px solid #000",
					parser: function(e, t, i, n, s, a) {
						return this.parseComplex(e.style, this.format(U(e, "borderTopWidth", r, !1, "0px") + " " + U(e, "borderTopStyle", r, !1, "solid") + " " + U(e, "borderTopColor", r, !1, "#000")), this.format(t), s, a)
					},
					color: !0,
					formatter: function(e) {
						var t = e.split(" ");
						return t[0] + " " + (t[1] || "solid") + " " + (e.match(ce) || ["#000"])[0]
					}
				}), _e("borderWidth", {
					parser: he("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
				}), _e("float,cssFloat,styleFloat", {
					parser: function(e, t, i, n, r) {
						var s = e.style,
							a = "cssFloat" in s ? "cssFloat" : "styleFloat";
						return new fe(s, a, 0, 0, r, -1, i, !1, 0, s[a], t)
					}
				});
				var Le = function(e) {
					var t, i = this.t,
						n = i.filter || U(this.data, "filter") || "",
						r = 0 | this.s + this.c * e;
					100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !U(this.data, "filter")) : (i.filter = n.replace(T, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
				};
				_e("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function(e, t, i, n, s, a) {
						var o = parseFloat(U(e, "opacity", r, !1, "1")),
							l = e.style,
							u = "autoAlpha" === i;
						return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o), u && 1 === o && "hidden" === U(e, "visibility", r) && 0 !== t && (o = 0), q ? s = new fe(l, "opacity", o, t - o, s) : (s = new fe(l, "opacity", 100 * o, 100 * (t - o), s), s.xn1 = u ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = a, s.setRatio = Le), u && (s = new fe(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
					}
				});
				var Ie = function(e, t) {
						t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(C, "-$1").toLowerCase())) : e.removeAttribute(t))
					},
					ze = function(e) {
						if (this.t._gsClassPT = this, 1 === e || 0 === e) {
							this.t.setAttribute("class", 0 === e ? this.b : this.e);
							for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ie(i, t.p), t = t._next;
							1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
						} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
					};
				_e("className", {
					parser: function(e, t, n, s, a, o, l) {
						var u, c, p, h, d, f = e.getAttribute("class") || "",
							m = e.style.cssText;
						if (a = s._classNamePT = new fe(e, n, 0, 0, a, 2), a.setRatio = ze, a.pr = -11, i = !0, a.b = f, c = K(e, r), p = e._gsClassPT) {
							for (h = {}, d = p.data; d;) h[d.p] = 1, d = d._next;
							p.setRatio(1)
						}
						return e._gsClassPT = a, a.e = "=" !== t.charAt(1) ? t : f.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", a.e), u = J(e, c, K(e), l, h), e.setAttribute("class", f), a.data = u.firstMPT, e.style.cssText = m, a = a.xfirst = s.parse(e, u.difs, a, o)
					}
				});
				var Fe = function(e) {
					if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
						var t, i, n, r, s, a = this.t.style,
							o = l.transform.parse;
						if ("all" === this.e) a.cssText = "", r = !0;
						else
							for (t = this.e.split(" ").join("").split(","), n = t.length; --n > -1;) i = t[n], l[i] && (l[i].parse === o ? r = !0 : i = "transformOrigin" === i ? Se : l[i].p), Ie(a, i);
						r && (Ie(a, be), s = this.t._gsTransform, s && (s.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
					}
				};
				for (_e("clearProps", {
						parser: function(e, t, n, r, s) {
							return s = new fe(e, n, 0, 0, s, 2), s.setRatio = Fe, s.e = t, s.pr = -10, s.data = r._tween, i = !0, s
						}
					}), u = "bezier,throwProps,physicsProps,physics2D".split(","), ge = u.length; ge--;) ye(u[ge]);
				u = a.prototype, u._firstPT = u._lastParsedTransform = u._transform = null, u._onInitTween = function(e, t, o) {
					if (!e.nodeType) return !1;
					this._target = e, this._tween = o, this._vars = t, c = t.autoRound, i = !1, n = t.suffixMap || a.suffixMap, r = G(e, ""), s = this._overwriteProps;
					var u, d, m, g, v, _, y, w, x, T = e.style;
					if (p && "" === T.zIndex && (u = U(e, "zIndex", r), ("auto" === u || "" === u) && this._addLazySet(T, "zIndex", 0)), "string" == typeof t && (g = T.cssText, u = K(e, r), T.cssText = g + ";" + t, u = J(e, u, K(e)).difs, !q && b.test(t) && (u.opacity = parseFloat(RegExp.$1)), t = u, T.cssText = g), this._firstPT = d = t.className ? l.className.parse(e, t.className, "className", this, null, null, t) : this.parse(e, t, null), this._transformType) {
						for (x = 3 === this._transformType, be ? h && (p = !0, "" === T.zIndex && (y = U(e, "zIndex", r), ("auto" === y || "" === y) && this._addLazySet(T, "zIndex", 0)), f && this._addLazySet(T, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : T.zoom = 1, m = d; m && m._next;) m = m._next;
						w = new fe(e, "transform", 0, 0, null, 2), this._linkCSSP(w, null, m), w.setRatio = be ? Ne : Re, w.data = this._transform || Ae(e, r, !0), w.tween = o, w.pr = -1, s.pop()
					}
					if (i) {
						for (; d;) {
							for (_ = d._next, m = g; m && m.pr > d.pr;) m = m._next;
							(d._prev = m ? m._prev : v) ? d._prev._next = d: g = d, (d._next = m) ? m._prev = d : v = d, d = _
						}
						this._firstPT = g
					}
					return !0
				}, u.parse = function(e, t, i, s) {
					var a, o, u, p, h, d, f, m, g, v, _ = e.style;
					for (a in t) d = t[a], o = l[a], o ? i = o.parse(e, d, a, this, i, s, t) : (h = U(e, a, r) + "", g = "string" == typeof d, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || g && S.test(d) ? (g || (d = ue(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = me(_, a, h, d, !0, "transparent", i, 0, s)) : !g || -1 === d.indexOf(" ") && -1 === d.indexOf(",") ? (u = parseFloat(h), f = u || 0 === u ? h.substr((u + "").length) : "", ("" === h || "auto" === h) && ("width" === a || "height" === a ? (u = ie(e, a, r), f = "px") : "left" === a || "top" === a ? (u = Z(e, a, r), f = "px") : (u = "opacity" !== a ? 0 : 1, f = "")), v = g && "=" === d.charAt(1), v ? (p = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), p *= parseFloat(d), m = d.replace(w, "")) : (p = parseFloat(d), m = g ? d.replace(w, "") : ""), "" === m && (m = a in n ? n[a] : f), d = p || 0 === p ? (v ? p + u : p) + m : t[a], f !== m && "" !== m && (p || 0 === p) && u && (u = Q(e, a, u, f), "%" === m ? (u /= Q(e, a, 100, "%") / 100, t.strictUnits !== !0 && (h = u + "%")) : "em" === m ? u /= Q(e, a, 1, "em") : "px" !== m && (p = Q(e, a, p, m), m = "px"), v && (p || 0 === p) && (d = p + u + m)), v && (p += u), !u && 0 !== u || !p && 0 !== p ? void 0 !== _[a] && (d || "NaN" != d + "" && null != d) ? (i = new fe(_, a, p || u || 0, 0, i, -1, a, !1, 0, h, d), i.xs0 = "none" !== d || "display" !== a && -1 === a.indexOf("Style") ? d : h) : $("invalid " + a + " tween value: " + t[a]) : (i = new fe(_, a, u, p - u, i, 0, a, c !== !1 && ("px" === m || "zIndex" === a), 0, h, d), i.xs0 = m)) : i = me(_, a, h, d, !0, null, i, 0, s)), s && i && !i.plugin && (i.plugin = s);
					return i
				}, u.setRatio = function(e) {
					var t, i, n, r = this._firstPT,
						s = 1e-6;
					if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
						if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
							for (; r;) {
								if (t = r.c * e + r.s, r.r ? t = Math.round(t) : s > t && t > -s && (t = 0), r.type)
									if (1 === r.type)
										if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
										else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
								else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
								else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
								else {
									for (i = r.xs0 + t + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
									r.t[r.p] = i
								} else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
								else r.t[r.p] = t + r.xs0;
								r = r._next
							} else
								for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
						else
							for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(e), r = r._next
				}, u._enableTransforms = function(e) {
					this._transform = this._transform || Ae(this._target, r, !0), this._transformType = this._transform.svg && we || !e && 3 !== this._transformType ? 2 : 3
				};
				var je = function() {
					this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
				};
				u._addLazySet = function(e, t, i) {
					var n = this._firstPT = new fe(e, t, 0, 0, this._firstPT, 2);
					n.e = i, n.setRatio = je, n.data = this
				}, u._linkCSSP = function(e, t, i, n) {
					return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
				}, u._kill = function(t) {
					var i, n, r, s = t;
					if (t.autoAlpha || t.alpha) {
						s = {};
						for (n in t) s[n] = t[n];
						s.opacity = 1, s.autoAlpha && (s.visibility = 1)
					}
					return t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
				};
				var Be = function(e, t, i) {
					var n, r, s, a;
					if (e.slice)
						for (r = e.length; --r > -1;) Be(e[r], t, i);
					else
						for (n = e.childNodes, r = n.length; --r > -1;) s = n[r], a = s.type, s.style && (t.push(K(s)), i && i.push(s)), 1 !== a && 9 !== a && 11 !== a || !s.childNodes.length || Be(s, t, i)
				};
				return a.cascadeTo = function(e, i, n) {
					var r, s, a, o, l = t.to(e, i, n),
						u = [l],
						c = [],
						p = [],
						h = [],
						d = t._internals.reservedProps;
					for (e = l._targets || l.target, Be(e, c, h), l.render(i, !0, !0), Be(e, p), l.render(0, !0, !0), l._enabled(!0), r = h.length; --r > -1;)
						if (s = J(h[r], c[r], p[r]), s.firstMPT) {
							s = s.difs;
							for (a in n) d[a] && (s[a] = n[a]);
							o = {};
							for (a in s) o[a] = c[r][a];
							u.push(t.fromTo(h[r], i, o, s))
						}
					return u
				}, e.activate([a]), a
			}, !0),
			function() {
				var e = _gsScope._gsDefine.plugin({
						propName: "roundProps",
						priority: -1,
						API: 2,
						init: function(e, t, i) {
							return this._tween = i, !0
						}
					}),
					t = e.prototype;
				t._onInitAllProps = function() {
					for (var e, t, i, n = this._tween, r = n.vars.roundProps instanceof Array ? n.vars.roundProps : n.vars.roundProps.split(","), s = r.length, a = {}, o = n._propLookup.roundProps; --s > -1;) a[r[s]] = 1;
					for (s = r.length; --s > -1;)
						for (e = r[s], t = n._firstPT; t;) i = t._next, t.pg ? t.t._roundProps(a, !0) : t.n === e && (this._add(t.t, e, t.s, t.c), i && (i._prev = t._prev), t._prev ? t._prev._next = i : n._firstPT === t && (n._firstPT = i), t._next = t._prev = null, n._propLookup[e] = o), t = i;
					return !1
				}, t._add = function(e, t, i, n) {
					this._addTween(e, t, i, i + n, t, !0), this._overwriteProps.push(t)
				}
			}(), _gsScope._gsDefine.plugin({
				propName: "attr",
				API: 2,
				version: "0.3.3",
				init: function(e, t) {
					var i, n, r;
					if ("function" != typeof e.setAttribute) return !1;
					this._target = e, this._proxy = {}, this._start = {}, this._end = {};
					for (i in t) this._start[i] = this._proxy[i] = n = e.getAttribute(i), r = this._addTween(this._proxy, i, parseFloat(n), t[i], i), this._end[i] = r ? r.s + r.c : t[i], this._overwriteProps.push(i);
					return !0
				},
				set: function(e) {
					this._super.setRatio.call(this, e);
					for (var t, i = this._overwriteProps, n = i.length, r = 1 === e ? this._end : e ? this._proxy : this._start; --n > -1;) t = i[n], this._target.setAttribute(t, r[t] + "")
				}
			}), _gsScope._gsDefine.plugin({
				propName: "directionalRotation",
				version: "0.2.1",
				API: 2,
				init: function(e, t) {
					"object" != typeof t && (t = {
						rotation: t
					}), this.finals = {};
					var i, n, r, s, a, o, l = t.useRadians === !0 ? 2 * Math.PI : 360,
						u = 1e-6;
					for (i in t) "useRadians" !== i && (o = (t[i] + "").split("_"), n = o[0], r = parseFloat("function" != typeof e[i] ? e[i] : e[i.indexOf("set") || "function" != typeof e["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), s = this.finals[i] = "string" == typeof n && "=" === n.charAt(1) ? r + parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2)) : Number(n) || 0, a = s - r, o.length && (n = o.join("_"), -1 !== n.indexOf("short") && (a %= l, a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)), -1 !== n.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * l) % l - (0 | a / l) * l : -1 !== n.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * l) % l - (0 | a / l) * l)), (a > u || -u > a) && (this._addTween(e, i, r, r + a, i), this._overwriteProps.push(i)));
					return !0
				},
				set: function(e) {
					var t;
					if (1 !== e) this._super.setRatio.call(this, e);
					else
						for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
				}
			})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
				var t, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
					s = r.com.greensock,
					a = 2 * Math.PI,
					o = Math.PI / 2,
					l = s._class,
					u = function(t, i) {
						var n = l("easing." + t, function() {}, !0),
							r = n.prototype = new e;
						return r.constructor = n, r.getRatio = i, n
					},
					c = e.register || function() {},
					p = function(e, t, i, n) {
						var r = l("easing." + e, {
							easeOut: new t,
							easeIn: new i,
							easeInOut: new n
						}, !0);
						return c(r, e), r
					},
					h = function(e, t, i) {
						this.t = e, this.v = t, i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
					},
					d = function(t, i) {
						var n = l("easing." + t, function(e) {
								this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
							}, !0),
							r = n.prototype = new e;
						return r.constructor = n, r.getRatio = i, r.config = function(e) {
							return new n(e)
						}, n
					},
					f = p("Back", d("BackOut", function(e) {
						return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
					}), d("BackIn", function(e) {
						return e * e * ((this._p1 + 1) * e - this._p1)
					}), d("BackInOut", function(e) {
						return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
					})),
					m = l("easing.SlowMo", function(e, t, i) {
						t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
					}, !0),
					g = m.prototype = new e;
				return g.constructor = m, g.getRatio = function(e) {
					var t = e + (.5 - e) * this._p;
					return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
				}, m.ease = new m(.7, .7), g.config = m.config = function(e, t, i) {
					return new m(e, t, i)
				}, t = l("easing.SteppedEase", function(e) {
					e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
				}, !0), g = t.prototype = new e, g.constructor = t, g.getRatio = function(e) {
					return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
				}, g.config = t.config = function(e) {
					return new t(e)
				}, i = l("easing.RoughEase", function(t) {
					t = t || {};
					for (var i, n, r, s, a, o, l = t.taper || "none", u = [], c = 0, p = 0 | (t.points || 20), d = p, f = t.randomize !== !1, m = t.clamp === !0, g = t.template instanceof e ? t.template : null, v = "number" == typeof t.strength ? .4 * t.strength : .4; --d > -1;) i = f ? Math.random() : 1 / p * d, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (s = 1 - i, r = s * s * v) : "in" === l ? r = i * i * v : .5 > i ? (s = 2 * i, r = .5 * s * s * v) : (s = 2 * (1 - i), r = .5 * s * s * v), f ? n += Math.random() * r - .5 * r : d % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), u[c++] = {
						x: i,
						y: n
					};
					for (u.sort(function(e, t) {
							return e.x - t.x
						}), o = new h(1, 1, null), d = p; --d > -1;) a = u[d], o = new h(a.x, a.y, o);
					this._prev = new h(0, 0, 0 !== o.t ? o : o.next)
				}, !0), g = i.prototype = new e, g.constructor = i, g.getRatio = function(e) {
					var t = this._prev;
					if (e > t.t) {
						for (; t.next && e >= t.t;) t = t.next;
						t = t.prev
					} else
						for (; t.prev && t.t >= e;) t = t.prev;
					return this._prev = t, t.v + (e - t.t) / t.gap * t.c
				}, g.config = function(e) {
					return new i(e)
				}, i.ease = new i, p("Bounce", u("BounceOut", function(e) {
					return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
				}), u("BounceIn", function(e) {
					return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
				}), u("BounceInOut", function(e) {
					var t = .5 > e;
					return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
				})), p("Circ", u("CircOut", function(e) {
					return Math.sqrt(1 - (e -= 1) * e)
				}), u("CircIn", function(e) {
					return -(Math.sqrt(1 - e * e) - 1)
				}), u("CircInOut", function(e) {
					return 1 > (e *= 2) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
				})), n = function(t, i, n) {
					var r = l("easing." + t, function(e, t) {
							this._p1 = e >= 1 ? e : 1, this._p2 = (t || n) / (1 > e ? e : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
						}, !0),
						s = r.prototype = new e;
					return s.constructor = r, s.getRatio = i, s.config = function(e, t) {
						return new r(e, t)
					}, r
				}, p("Elastic", n("ElasticOut", function(e) {
					return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
				}, .3), n("ElasticIn", function(e) {
					return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
				}, .3), n("ElasticInOut", function(e) {
					return 1 > (e *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) + 1
				}, .45)), p("Expo", u("ExpoOut", function(e) {
					return 1 - Math.pow(2, -10 * e)
				}), u("ExpoIn", function(e) {
					return Math.pow(2, 10 * (e - 1)) - .001
				}), u("ExpoInOut", function(e) {
					return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
				})), p("Sine", u("SineOut", function(e) {
					return Math.sin(e * o)
				}), u("SineIn", function(e) {
					return -Math.cos(e * o) + 1
				}), u("SineInOut", function(e) {
					return -.5 * (Math.cos(Math.PI * e) - 1)
				})), l("easing.EaseLookup", {
					find: function(t) {
						return e.map[t]
					}
				}, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(t, "SteppedEase", "ease,"), f
			}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(e, t) {
		"use strict";
		var i = e.GreenSockGlobals = e.GreenSockGlobals || e;
		if (!i.TweenLite) {
			var n, r, s, a, o, l = function(e) {
					var t, n = e.split("."),
						r = i;
					for (t = 0; n.length > t; t++) r[n[t]] = r = r[n[t]] || {};
					return r
				},
				u = l("com.greensock"),
				c = 1e-10,
				p = function(e) {
					var t, i = [],
						n = e.length;
					for (t = 0; t !== n; i.push(e[t++]));
					return i
				},
				h = function() {},
				d = function() {
					var e = Object.prototype.toString,
						t = e.call([]);
					return function(i) {
						return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
					}
				}(),
				f = {},
				m = function(n, r, s, a) {
					this.sc = f[n] ? f[n].sc : [], f[n] = this, this.gsClass = null, this.func = s;
					var o = [];
					this.check = function(u) {
						for (var c, p, h, d, g = r.length, v = g; --g > -1;)(c = f[r[g]] || new m(r[g], [])).gsClass ? (o[g] = c.gsClass, v--) : u && c.sc.push(this);
						if (0 === v && s)
							for (p = ("com.greensock." + n).split("."), h = p.pop(), d = l(p.join("."))[h] = this.gsClass = s.apply(s, o), a && (i[h] = d, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
									return d
								}) : n === t && "undefined" != typeof module && module.exports && (module.exports = d)), g = 0; this.sc.length > g; g++) this.sc[g].check()
					}, this.check(!0)
				},
				g = e._gsDefine = function(e, t, i, n) {
					return new m(e, t, i, n)
				},
				v = u._class = function(e, t, i) {
					return t = t || function() {}, g(e, [], function() {
						return t
					}, i), t
				};
			g.globals = i;
			var _ = [0, 0, 1, 1],
				y = [],
				w = v("easing.Ease", function(e, t, i, n) {
					this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? _.concat(t) : _
				}, !0),
				x = w.map = {},
				b = w.register = function(e, t, i, n) {
					for (var r, s, a, o, l = t.split(","), c = l.length, p = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
						for (s = l[c], r = n ? v("easing." + s, null, !0) : u.easing[s] || {}, a = p.length; --a > -1;) o = p[a], x[s + "." + o] = x[o + s] = r[o] = e.getRatio ? e : e[o] || new e
				};
			for (s = w.prototype, s._calcEnd = !1, s.getRatio = function(e) {
					if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
					var t = this._type,
						i = this._power,
						n = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
					return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : .5 > e ? n / 2 : 1 - n / 2
				}, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) s = n[r] + ",Power" + r, b(new w(null, null, 1, r), s, "easeOut", !0), b(new w(null, null, 2, r), s, "easeIn" + (0 === r ? ",easeNone" : "")), b(new w(null, null, 3, r), s, "easeInOut");
			x.linear = u.easing.Linear.easeIn, x.swing = u.easing.Quad.easeInOut;
			var T = v("events.EventDispatcher", function(e) {
				this._listeners = {}, this._eventTarget = e || this
			});
			s = T.prototype, s.addEventListener = function(e, t, i, n, r) {
				r = r || 0;
				var s, l, u = this._listeners[e],
					c = 0;
				for (null == u && (this._listeners[e] = u = []), l = u.length; --l > -1;) s = u[l], s.c === t && s.s === i ? u.splice(l, 1) : 0 === c && r > s.pr && (c = l + 1);
				u.splice(c, 0, {
					c: t,
					s: i,
					up: n,
					pr: r
				}), this !== a || o || a.wake()
			}, s.removeEventListener = function(e, t) {
				var i, n = this._listeners[e];
				if (n)
					for (i = n.length; --i > -1;)
						if (n[i].c === t) return void n.splice(i, 1)
			}, s.dispatchEvent = function(e) {
				var t, i, n, r = this._listeners[e];
				if (r)
					for (t = r.length, i = this._eventTarget; --t > -1;) n = r[t], n && (n.up ? n.c.call(n.s || i, {
						type: e,
						target: i
					}) : n.c.call(n.s || i))
			};
			var S = e.requestAnimationFrame,
				C = e.cancelAnimationFrame,
				P = Date.now || function() {
					return (new Date).getTime()
				},
				k = P();
			for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !S;) S = e[n[r] + "RequestAnimationFrame"], C = e[n[r] + "CancelAnimationFrame"] || e[n[r] + "CancelRequestAnimationFrame"];
			v("Ticker", function(e, t) {
				var i, n, r, s, l, u = this,
					p = P(),
					d = t !== !1 && S,
					f = 500,
					m = 33,
					g = "tick",
					v = function(e) {
						var t, a, o = P() - k;
						o > f && (p += o - m), k += o, u.time = (k - p) / 1e3, t = u.time - l, (!i || t > 0 || e === !0) && (u.frame++, l += t + (t >= s ? .004 : s - t), a = !0), e !== !0 && (r = n(v)), a && u.dispatchEvent(g)
					};
				T.call(u), u.time = u.frame = 0, u.tick = function() {
					v(!0)
				}, u.lagSmoothing = function(e, t) {
					f = e || 1 / c, m = Math.min(t, f, 0)
				}, u.sleep = function() {
					null != r && (d && C ? C(r) : clearTimeout(r), n = h, r = null, u === a && (o = !1))
				}, u.wake = function() {
					null !== r ? u.sleep() : u.frame > 10 && (k = P() - f + 5), n = 0 === i ? h : d && S ? S : function(e) {
						return setTimeout(e, 0 | 1e3 * (l - u.time) + 1)
					}, u === a && (o = !0), v(2)
				}, u.fps = function(e) {
					return arguments.length ? (i = e, s = 1 / (i || 60), l = this.time + s, void u.wake()) : i
				}, u.useRAF = function(e) {
					return arguments.length ? (u.sleep(), d = e, void u.fps(i)) : d
				}, u.fps(e), setTimeout(function() {
					d && 5 > u.frame && u.useRAF(!1)
				}, 1500)
			}), s = u.Ticker.prototype = new u.events.EventDispatcher, s.constructor = u.Ticker;
			var D = v("core.Animation", function(e, t) {
				if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, H) {
					o || a.wake();
					var i = this.vars.useFrames ? q : H;
					i.add(this, i._time), this.vars.paused && this.paused(!0)
				}
			});
			a = D.ticker = new u.Ticker, s = D.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
			var O = function() {
				o && P() - k > 2e3 && a.wake(), setTimeout(O, 2e3)
			};
			O(), s.play = function(e, t) {
				return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
			}, s.pause = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!0)
			}, s.resume = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!1)
			}, s.seek = function(e, t) {
				return this.totalTime(Number(e), t !== !1)
			}, s.restart = function(e, t) {
				return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
			}, s.reverse = function(e, t) {
				return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
			}, s.render = function() {}, s.invalidate = function() {
				return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
			}, s.isActive = function() {
				var e, t = this._timeline,
					i = this._startTime;
				return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= i && i + this.totalDuration() / this._timeScale > e
			}, s._enabled = function(e, t) {
				return o || a.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
			}, s._kill = function() {
				return this._enabled(!1, !1)
			}, s.kill = function(e, t) {
				return this._kill(e, t), this
			}, s._uncache = function(e) {
				for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
				return this
			}, s._swapSelfInParams = function(e) {
				for (var t = e.length, i = e.concat(); --t > -1;) "{self}" === e[t] && (i[t] = this);
				return i
			}, s.eventCallback = function(e, t, i, n) {
				if ("on" === (e || "").substr(0, 2)) {
					var r = this.vars;
					if (1 === arguments.length) return r[e];
					null == t ? delete r[e] : (r[e] = t, r[e + "Params"] = d(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
				}
				return this
			}, s.delay = function(e) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
			}, s.duration = function(e) {
				return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
			}, s.totalDuration = function(e) {
				return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
			}, s.time = function(e, t) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
			}, s.totalTime = function(e, t, i) {
				if (o || a.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (0 > e && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var n = this._totalDuration,
							r = this._timeline;
						if (e > n && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - e : e) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
							for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), N.length && W())
				}
				return this
			}, s.progress = s.totalProgress = function(e, t) {
				return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
			}, s.startTime = function(e) {
				return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
			}, s.endTime = function(e) {
				return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
			}, s.timeScale = function(e) {
				if (!arguments.length) return this._timeScale;
				if (e = e || c, this._timeline && this._timeline.smoothChildTiming) {
					var t = this._pauseTime,
						i = t || 0 === t ? t : this._timeline.totalTime();
					this._startTime = i - (i - this._startTime) * this._timeScale / e
				}
				return this._timeScale = e, this._uncache(!1)
			}, s.reversed = function(e) {
				return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
			}, s.paused = function(e) {
				if (!arguments.length) return this._paused;
				var t, i, n = this._timeline;
				return e != this._paused && n && (o || e || a.wake(), t = n.rawTime(), i = t - this._pauseTime, !e && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && this.render(n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, !0, !0)), this._gc && !e && this._enabled(!0, !1), this
			};
			var E = v("core.SimpleTimeline", function(e) {
				D.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			s = E.prototype = new D, s.constructor = E, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(e, t) {
				var i, n;
				if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), i = this._last, this._sortChildren)
					for (n = e._startTime; i && i._startTime > n;) i = i._prev;
				return i ? (e._next = i._next, i._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = i, this._recent = e, this._timeline && this._uncache(!0), this
			}, s._remove = function(e, t) {
				return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
			}, s.render = function(e, t, i) {
				var n, r = this._first;
				for (this._totalTime = this._time = this._rawPrevTime = e; r;) n = r._next, (r._active || e >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)), r = n
			}, s.rawTime = function() {
				return o || a.wake(), this._totalTime
			};
			var M = v("TweenLite", function(t, i, n) {
					if (D.call(this, i, n), this.render = M.prototype.render, null == t) throw "Cannot tween a null target.";
					this.target = t = "string" != typeof t ? t : M.selector(t) || t;
					var r, s, a, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
						l = this.vars.overwrite;
					if (this._overwrite = l = null == l ? X[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : X[l], (o || t instanceof Array || t.push && d(t)) && "number" != typeof t[0])
						for (this._targets = a = p(t), this._propLookup = [], this._siblings = [], r = 0; a.length > r; r++) s = a[r], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (a.splice(r--, 1), this._targets = a = a.concat(p(s))) : (this._siblings[r] = V(s, this, !1), 1 === l && this._siblings[r].length > 1 && G(s, this, null, 1, this._siblings[r])) : (s = a[r--] = M.selector(s), "string" == typeof s && a.splice(r + 1, 1)) : a.splice(r--, 1);
					else this._propLookup = {}, this._siblings = V(t, this, !1), 1 === l && this._siblings.length > 1 && G(t, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c, this.render(-this._delay))
				}, !0),
				A = function(t) {
					return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
				},
				R = function(e, t) {
					var i, n = {};
					for (i in e) B[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!z[i] || z[i] && z[i]._autoCSS) || (n[i] = e[i], delete e[i]);
					e.css = n
				};
			s = M.prototype = new D, s.constructor = M, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, M.version = "1.16.1", M.defaultEase = s._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = a, M.autoSleep = 120, M.lagSmoothing = function(e, t) {
				a.lagSmoothing(e, t)
			}, M.selector = e.$ || e.jQuery || function(t) {
				var i = e.$ || e.jQuery;
				return i ? (M.selector = i, i(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
			};
			var N = [],
				L = {},
				I = M._internals = {
					isArray: d,
					isSelector: A,
					lazyTweens: N
				},
				z = M._plugins = {},
				F = I.tweenLookup = {},
				j = 0,
				B = I.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1
				},
				X = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					"true": 1,
					"false": 0
				},
				q = D._rootFramesTimeline = new E,
				H = D._rootTimeline = new E,
				$ = 30,
				W = I.lazyRender = function() {
					var e, t = N.length;
					for (L = {}; --t > -1;) e = N[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
					N.length = 0
				};
			H._startTime = a.time, q._startTime = a.frame, H._active = q._active = !0, setTimeout(W, 1), D._updateRoot = M.render = function() {
				var e, t, i;
				if (N.length && W(), H.render((a.time - H._startTime) * H._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), N.length && W(), a.frame >= $) {
					$ = a.frame + (parseInt(M.autoSleep, 10) || 120);
					for (i in F) {
						for (t = F[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
						0 === t.length && delete F[i]
					}
					if (i = H._first, (!i || i._paused) && M.autoSleep && !q._first && 1 === a._listeners.tick.length) {
						for (; i && i._paused;) i = i._next;
						i || a.sleep()
					}
				}
			}, a.addEventListener("tick", D._updateRoot);
			var V = function(e, t, i) {
					var n, r, s = e._gsTweenID;
					if (F[s || (e._gsTweenID = s = "t" + j++)] || (F[s] = {
							target: e,
							tweens: []
						}), t && (n = F[s].tweens, n[r = n.length] = t, i))
						for (; --r > -1;) n[r] === t && n.splice(r, 1);
					return F[s].tweens
				},
				Y = function(e, t, i, n) {
					var r, s, a = e.vars.onOverwrite;
					return a && (r = a(e, t, i, n)), a = M.onOverwrite, a && (s = a(e, t, i, n)), r !== !1 && s !== !1
				},
				G = function(e, t, i, n, r) {
					var s, a, o, l;
					if (1 === n || n >= 4) {
						for (l = r.length, s = 0; l > s; s++)
							if ((o = r[s]) !== t) o._gc || Y(o, t) && o._enabled(!1, !1) && (a = !0);
							else if (5 === n) break;
						return a
					}
					var u, p = t._startTime + c,
						h = [],
						d = 0,
						f = 0 === t._duration;
					for (s = r.length; --s > -1;)(o = r[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (u = u || U(t, 0, f), 0 === U(o, u, f) && (h[d++] = o)) : p >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > p && ((f || !o._initted) && 2e-10 >= p - o._startTime || (h[d++] = o)));
					for (s = d; --s > -1;)
						if (o = h[s], 2 === n && o._kill(i, e, t) && (a = !0), 2 !== n || !o._firstPT && o._initted) {
							if (2 !== n && !Y(o, t)) continue;
							o._enabled(!1, !1) && (a = !0)
						}
					return a
				},
				U = function(e, t, i) {
					for (var n = e._timeline, r = n._timeScale, s = e._startTime; n._timeline;) {
						if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
						n = n._timeline
					}
					return s /= r, s > t ? s - t : i && s === t || !e._initted && 2 * c > s - t ? c : (s += e.totalDuration() / e._timeScale / r) > t + c ? 0 : s - t - c
				};
			s._init = function() {
				var e, t, i, n, r, s = this.vars,
					a = this._overwrittenProps,
					o = this._duration,
					l = !!s.immediateRender,
					u = s.ease;
				if (s.startAt) {
					this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
					for (n in s.startAt) r[n] = s.startAt[n];
					if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && s.lazy !== !1, r.startAt = r.delay = null, this._startAt = M.to(this.target, 0, r), l)
						if (this._time > 0) this._startAt = null;
						else if (0 !== o) return
				} else if (s.runBackwards && 0 !== o)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
					else {
						0 !== this._time && (l = !1), i = {};
						for (n in s) B[n] && "autoCSS" !== n || (i[n] = s[n]);
						if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && s.lazy !== !1, i.immediateRender = l, this._startAt = M.to(this.target, 0, i), l) {
							if (0 === this._time) return
						} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
					}
				if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, s.easeParams) : x[u] || M.defaultEase : M.defaultEase, s.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null) && (t = !0);
				else t = this._initProps(this.target, this._propLookup, this._siblings, a);
				if (t && M._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
					for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
				this._onUpdate = s.onUpdate, this._initted = !0
			}, s._initProps = function(t, i, n, r) {
				var s, a, o, l, u, c;
				if (null == t) return !1;
				L[t._gsTweenID] && W(), this.vars.css || t.style && t !== e && t.nodeType && z.css && this.vars.autoCSS !== !1 && R(this.vars, t);
				for (s in this.vars) {
					if (c = this.vars[s], B[s]) c && (c instanceof Array || c.push && d(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
					else if (z[s] && (l = new z[s])._onInitTween(t, this.vars[s], this)) {
						for (this._firstPT = u = {
								_next: this._firstPT,
								t: l,
								p: "setRatio",
								s: 0,
								c: 1,
								f: !0,
								n: s,
								pg: !0,
								pr: l._priority
							}, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
						(l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
					} else this._firstPT = i[s] = u = {
						_next: this._firstPT,
						t: t,
						p: s,
						f: "function" == typeof t[s],
						n: s,
						pg: !1,
						pr: 0
					}, u.s = u.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), u.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - u.s || 0;
					u && u._next && (u._next._prev = u)
				}
				return r && this._kill(r, t) ? this._initProps(t, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && G(t, this, i, this._overwrite, n) ? (this._kill(i, t), this._initProps(t, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[t._gsTweenID] = !0), o)
			}, s.render = function(e, t, i) {
				var n, r, s, a, o = this._time,
					l = this._duration,
					u = this._rawPrevTime;
				if (e >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > u || u === c && "isPause" !== this.data) && u !== e && (i = !0, u > c && (r = "onReverseComplete")), this._rawPrevTime = a = !t || e || u === e ? e : c);
				else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && u > 0) && (r = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (u >= 0 && (u !== c || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !t || e || u === e ? e : c)), this._initted || (i = !0);
				else if (this._totalTime = this._time = e, this._easeType) {
					var p = e / l,
						h = this._easeType,
						d = this._easePower;
					(1 === h || 3 === h && p >= .5) && (p = 1 - p), 3 === h && (p *= 2), 1 === d ? p *= p : 2 === d ? p *= p * p : 3 === d ? p *= p * p * p : 4 === d && (p *= p * p * p * p), this.ratio = 1 === h ? 1 - p : 2 === h ? p : .5 > e / l ? p / 2 : 1 - p / 2
				} else this.ratio = this._ease.getRatio(e / l);
				if (this._time !== o || i) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = u, N.push(this), void(this._lazy = [e, t]);
						this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0), 0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
					this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, i), t || (this._time !== o || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || y), 0 === l && this._rawPrevTime === c && a !== c && (this._rawPrevTime = 0))
				}
			}, s._kill = function(e, t, i) {
				if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
				t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
				var n, r, s, a, o, l, u, c, p;
				if ((d(t) || A(t)) && "number" != typeof t[0])
					for (n = t.length; --n > -1;) this._kill(e, t[n]) && (l = !0);
				else {
					if (this._targets) {
						for (n = this._targets.length; --n > -1;)
							if (t === this._targets[n]) {
								o = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
								break
							}
					} else {
						if (t !== this.target) return !1;
						o = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
					}
					if (o) {
						if (u = e || o, c = e !== r && "all" !== r && e !== o && ("object" != typeof e || !e._tempKill), i && (M.onOverwrite || this.vars.onOverwrite)) {
							for (s in u) o[s] && (p || (p = []), p.push(s));
							if (!Y(this, i, t, p)) return !1
						}
						for (s in u)(a = o[s]) && (a.pg && a.t._kill(u) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[s]), c && (r[s] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return l
			}, s.invalidate = function() {
				return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
			}, s._enabled = function(e, t) {
				if (o || a.wake(), e && this._gc) {
					var i, n = this._targets;
					if (n)
						for (i = n.length; --i > -1;) this._siblings[i] = V(n[i], this, !0);
					else this._siblings = V(this.target, this, !0)
				}
				return D.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
			}, M.to = function(e, t, i) {
				return new M(e, t, i)
			}, M.from = function(e, t, i) {
				return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new M(e, t, i)
			}, M.fromTo = function(e, t, i, n) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new M(e, t, n)
			}, M.delayedCall = function(e, t, i, n, r) {
				return new M(t, 0, {
					delay: e,
					onComplete: t,
					onCompleteParams: i,
					onCompleteScope: n,
					onReverseComplete: t,
					onReverseCompleteParams: i,
					onReverseCompleteScope: n,
					immediateRender: !1,
					lazy: !1,
					useFrames: r,
					overwrite: 0
				})
			}, M.set = function(e, t) {
				return new M(e, 0, t)
			}, M.getTweensOf = function(e, t) {
				if (null == e) return [];
				e = "string" != typeof e ? e : M.selector(e) || e;
				var i, n, r, s;
				if ((d(e) || A(e)) && "number" != typeof e[0]) {
					for (i = e.length, n = []; --i > -1;) n = n.concat(M.getTweensOf(e[i], t));
					for (i = n.length; --i > -1;)
						for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
				} else
					for (n = V(e).concat(), i = n.length; --i > -1;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
				return n
			}, M.killTweensOf = M.killDelayedCallsTo = function(e, t, i) {
				"object" == typeof t && (i = t, t = !1);
				for (var n = M.getTweensOf(e, t), r = n.length; --r > -1;) n[r]._kill(i, e)
			};
			var Q = v("plugins.TweenPlugin", function(e, t) {
				this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = Q.prototype
			}, !0);
			if (s = Q.prototype, Q.version = "1.10.1", Q.API = 2, s._firstPT = null, s._addTween = function(e, t, i, n, r, s) {
					var a, o;
					return null != n && (a = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = o = {
						_next: this._firstPT,
						t: e,
						p: t,
						s: i,
						c: a,
						f: "function" == typeof e[t],
						n: r || t,
						r: s
					}, o._next && (o._next._prev = o), o) : void 0
				}, s.setRatio = function(e) {
					for (var t, i = this._firstPT, n = 1e-6; i;) t = i.c * e + i.s, i.r ? t = Math.round(t) : n > t && t > -n && (t = 0), i.f ? i.t[i.p](t) : i.t[i.p] = t, i = i._next
				}, s._kill = function(e) {
					var t, i = this._overwriteProps,
						n = this._firstPT;
					if (null != e[this._propName]) this._overwriteProps = [];
					else
						for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
					for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
					return !1
				}, s._roundProps = function(e, t) {
					for (var i = this._firstPT; i;)(e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")]) && (i.r = t), i = i._next
				}, M._onPluginEvent = function(e, t) {
					var i, n, r, s, a, o = t._firstPT;
					if ("_onInitAllProps" === e) {
						for (; o;) {
							for (a = o._next, n = r; n && n.pr > o.pr;) n = n._next;
							(o._prev = n ? n._prev : s) ? o._prev._next = o: r = o, (o._next = n) ? n._prev = o : s = o, o = a
						}
						o = t._firstPT = r
					}
					for (; o;) o.pg && "function" == typeof o.t[e] && o.t[e]() && (i = !0), o = o._next;
					return i
				}, Q.activate = function(e) {
					for (var t = e.length; --t > -1;) e[t].API === Q.API && (z[(new e[t])._propName] = e[t]);
					return !0
				}, g.plugin = function(e) {
					if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
					var t, i = e.propName,
						n = e.priority || 0,
						r = e.overwriteProps,
						s = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_roundProps",
							initAll: "_onInitAllProps"
						},
						a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
							Q.call(this, i, n), this._overwriteProps = r || []
						}, e.global === !0),
						o = a.prototype = new Q(i);
					o.constructor = a, a.API = e.API;
					for (t in s) "function" == typeof e[t] && (o[s[t]] = e[t]);
					return a.version = e.version, Q.activate([a]), a
				}, n = e._gsQueue) {
				for (r = 0; n.length > r; r++) n[r]();
				for (s in f) f[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
			}
			o = !1
		}
	}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
	"use strict";
	var e = document.documentElement,
		t = window,
		i = function(i, n) {
			var r = "x" === n ? "Width" : "Height",
				s = "scroll" + r,
				a = "client" + r,
				o = document.body;
			return i === t || i === e || i === o ? Math.max(e[s], o[s]) - (t["inner" + r] || Math.max(e[a], o[a])) : i[s] - i["offset" + r]
		},
		n = _gsScope._gsDefine.plugin({
			propName: "scrollTo",
			API: 2,
			version: "1.7.4",
			init: function(e, n, r) {
				return this._wdw = e === t, this._target = e, this._tween = r, "object" != typeof n && (n = {
					y: n
				}), this.vars = n, this._autoKill = n.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != n.x ? (this._addTween(this, "x", this.x, "max" === n.x ? i(e, "x") : n.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != n.y ? (this._addTween(this, "y", this.y, "max" === n.y ? i(e, "y") : n.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
			},
			set: function(e) {
				this._super.setRatio.call(this, e);
				var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
					r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
					s = r - this.yPrev,
					a = n - this.xPrev;
				this._autoKill && (!this.skipX && (a > 7 || -7 > a) && i(this._target, "x") > n && (this.skipX = !0), !this.skipY && (s > 7 || -7 > s) && i(this._target, "y") > r && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? t.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
			}
		}),
		r = n.prototype;
	n.max = i, r.getX = function() {
		return this._wdw ? null != t.pageXOffset ? t.pageXOffset : null != e.scrollLeft ? e.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
	}, r.getY = function() {
		return this._wdw ? null != t.pageYOffset ? t.pageYOffset : null != e.scrollTop ? e.scrollTop : document.body.scrollTop : this._target.scrollTop
	}, r._kill = function(e) {
		return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e)
	}
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), ! function() {
	"use strict";

	function e(e) {
		e.fn.swiper = function(t) {
			var n;
			return e(this).each(function() {
				var e = new i(this, t);
				n || (n = e)
			}), n
		}
	}
	var t, i = function(e, r) {
		function s() {
			return "horizontal" === _.params.direction
		}

		function a(e) {
			return Math.floor(e)
		}

		function o() {
			_.autoplayTimeoutId = setTimeout(function() {
				_.params.loop ? (_.fixLoop(), _._slideNext()) : _.isEnd ? r.autoplayStopOnLast ? _.stopAutoplay() : _._slideTo(0) : _._slideNext()
			}, _.params.autoplay)
		}

		function l(e, i) {
			var n = t(e.target);
			if (!n.is(i))
				if ("string" == typeof i) n = n.parents(i);
				else if (i.nodeType) {
				var r;
				return n.parents().each(function(e, t) {
					t === i && (r = i)
				}), r ? i : void 0
			}
			return 0 === n.length ? void 0 : n[0]
		}

		function u(e, t) {
			t = t || {};
			var i = window.MutationObserver || window.WebkitMutationObserver,
				n = new i(function(e) {
					e.forEach(function(e) {
						_.onResize(!0), _.emit("onObserverUpdate", _, e)
					})
				});
			n.observe(e, {
				attributes: "undefined" == typeof t.attributes ? !0 : t.attributes,
				childList: "undefined" == typeof t.childList ? !0 : t.childList,
				characterData: "undefined" == typeof t.characterData ? !0 : t.characterData
			}), _.observers.push(n)
		}

		function c(e) {
			e.originalEvent && (e = e.originalEvent);
			var t = e.keyCode || e.charCode;
			if (!_.params.allowSwipeToNext && (s() && 39 === t || !s() && 40 === t)) return !1;
			if (!_.params.allowSwipeToPrev && (s() && 37 === t || !s() && 38 === t)) return !1;
			if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
				if (37 === t || 39 === t || 38 === t || 40 === t) {
					var i = !1;
					if (_.container.parents(".swiper-slide").length > 0 && 0 === _.container.parents(".swiper-slide-active").length) return;
					var n = {
							left: window.pageXOffset,
							top: window.pageYOffset
						},
						r = window.innerWidth,
						a = window.innerHeight,
						o = _.container.offset();
					_.rtl && (o.left = o.left - _.container[0].scrollLeft);
					for (var l = [
							[o.left, o.top],
							[o.left + _.width, o.top],
							[o.left, o.top + _.height],
							[o.left + _.width, o.top + _.height]
						], u = 0; u < l.length; u++) {
						var c = l[u];
						c[0] >= n.left && c[0] <= n.left + r && c[1] >= n.top && c[1] <= n.top + a && (i = !0)
					}
					if (!i) return
				}
				s() ? ((37 === t || 39 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !_.rtl || 37 === t && _.rtl) && _.slideNext(), (37 === t && !_.rtl || 39 === t && _.rtl) && _.slidePrev()) : ((38 === t || 40 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && _.slideNext(), 38 === t && _.slidePrev())
			}
		}

		function p(e) {
			e.originalEvent && (e = e.originalEvent);
			var t = _.mousewheel.event,
				i = 0;
			if (e.detail) i = -e.detail;
			else if ("mousewheel" === t)
				if (_.params.mousewheelForceToAxis)
					if (s()) {
						if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
						i = e.wheelDeltaX
					} else {
						if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
						i = e.wheelDeltaY
					} else i = e.wheelDelta;
			else if ("DOMMouseScroll" === t) i = -e.detail;
			else if ("wheel" === t)
				if (_.params.mousewheelForceToAxis)
					if (s()) {
						if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
						i = -e.deltaX
					} else {
						if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
						i = -e.deltaY
					} else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
			if (_.params.mousewheelInvert && (i = -i), _.params.freeMode) {
				var n = _.getWrapperTranslate() + i * _.params.mousewheelSensitivity;
				if (n > 0 && (n = 0), n < _.maxTranslate() && (n = _.maxTranslate()), _.setWrapperTransition(0), _.setWrapperTranslate(n), _.updateProgress(), _.updateActiveIndex(), _.params.freeModeSticky && (clearTimeout(_.mousewheel.timeout), _.mousewheel.timeout = setTimeout(function() {
						_.slideReset()
					}, 300)), 0 === n || n === _.maxTranslate()) return
			} else {
				if ((new window.Date).getTime() - _.mousewheel.lastScrollTime > 60)
					if (0 > i)
						if (_.isEnd && !_.params.loop || _.animating) {
							if (_.params.mousewheelReleaseOnEdges) return !0
						} else _.slideNext();
				else if (_.isBeginning && !_.params.loop || _.animating) {
					if (_.params.mousewheelReleaseOnEdges) return !0
				} else _.slidePrev();
				_.mousewheel.lastScrollTime = (new window.Date).getTime()
			}
			return _.params.autoplay && _.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
		}

		function h(e, i) {
			e = t(e);
			var n, r, a;
			n = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), a = e.attr("data-swiper-parallax-y"), r || a ? (r = r || "0", a = a || "0") : s() ? (r = n, a = "0") : (a = n, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i + "%" : r * i + "px", a = a.indexOf("%") >= 0 ? parseInt(a, 10) * i + "%" : a * i + "px", e.transform("translate3d(" + r + ", " + a + ",0px)")
		}

		function d(e) {
			return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
		}
		if (!(this instanceof i)) return new i(e, r);
		var f = {
				direction: "horizontal",
				touchEventsTarget: "container",
				initialSlide: 0,
				speed: 300,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				iOSEdgeSwipeDetection: !1,
				iOSEdgeSwipeThreshold: 20,
				freeMode: !1,
				freeModeMomentum: !0,
				freeModeMomentumRatio: 1,
				freeModeMomentumBounce: !0,
				freeModeMomentumBounceRatio: 1,
				freeModeSticky: !1,
				freeModeMinimumVelocity: .02,
				setWrapperSize: !1,
				virtualTranslate: !1,
				effect: "slide",
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: !0
				},
				cube: {
					slideShadows: !0,
					shadow: !0,
					shadowOffset: 20,
					shadowScale: .94
				},
				fade: {
					crossFade: !1
				},
				parallax: !1,
				scrollbar: null,
				scrollbarHide: !0,
				scrollbarDraggable: !1,
				scrollbarSnapOnRelease: !1,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelReleaseOnEdges: !1,
				mousewheelInvert: !1,
				mousewheelForceToAxis: !1,
				mousewheelSensitivity: 1,
				hashnav: !1,
				spaceBetween: 0,
				slidesPerView: 1,
				slidesPerColumn: 1,
				slidesPerColumnFill: "column",
				slidesPerGroup: 1,
				centeredSlides: !1,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				roundLengths: !1,
				touchRatio: 1,
				touchAngle: 45,
				simulateTouch: !0,
				shortSwipes: !0,
				longSwipes: !0,
				longSwipesRatio: .5,
				longSwipesMs: 300,
				followFinger: !0,
				onlyExternal: !1,
				threshold: 0,
				touchMoveStopPropagation: !0,
				pagination: null,
				paginationElement: "span",
				paginationClickable: !1,
				paginationHide: !1,
				paginationBulletRender: null,
				resistance: !0,
				resistanceRatio: .85,
				nextButton: null,
				prevButton: null,
				watchSlidesProgress: !1,
				watchSlidesVisibility: !1,
				grabCursor: !1,
				preventClicks: !0,
				preventClicksPropagation: !0,
				slideToClickedSlide: !1,
				lazyLoading: !1,
				lazyLoadingInPrevNext: !1,
				lazyLoadingOnTransitionStart: !1,
				preloadImages: !0,
				updateOnImagesReady: !0,
				loop: !1,
				loopAdditionalSlides: 0,
				loopedSlides: null,
				control: void 0,
				controlInverse: !1,
				controlBy: "slide",
				allowSwipeToPrev: !0,
				allowSwipeToNext: !0,
				swipeHandler: null,
				noSwiping: !0,
				noSwipingClass: "swiper-no-swiping",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				slideNextClass: "swiper-slide-next",
				slidePrevClass: "swiper-slide-prev",
				wrapperClass: "swiper-wrapper",
				bulletClass: "swiper-pagination-bullet",
				bulletActiveClass: "swiper-pagination-bullet-active",
				buttonDisabledClass: "swiper-button-disabled",
				paginationHiddenClass: "swiper-pagination-hidden",
				observer: !1,
				observeParents: !1,
				a11y: !1,
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
				firstSlideMessage: "This is the first slide",
				lastSlideMessage: "This is the last slide",
				paginationBulletMessage: "Go to slide {{index}}",
				runCallbacksOnInit: !0
			},
			m = r && r.virtualTranslate;
		r = r || {};
		for (var g in f)
			if ("undefined" == typeof r[g]) r[g] = f[g];
			else if ("object" == typeof r[g])
			for (var v in f[g]) "undefined" == typeof r[g][v] && (r[g][v] = f[g][v]);
		var _ = this;
		if (_.params = r, _.classNames = [], "undefined" != typeof t && "undefined" != typeof n && (t = n), ("undefined" != typeof t || (t = "undefined" == typeof n ? window.Dom7 || window.Zepto || window.jQuery : n)) && (_.$ = t, _.container = t(e), 0 !== _.container.length)) {
			if (_.container.length > 1) return void _.container.each(function() {
				new i(this, r)
			});
			_.container[0].swiper = _, _.container.data("swiper", _), _.classNames.push("swiper-container-" + _.params.direction), _.params.freeMode && _.classNames.push("swiper-container-free-mode"), _.support.flexbox || (_.classNames.push("swiper-container-no-flexbox"), _.params.slidesPerColumn = 1), (_.params.parallax || _.params.watchSlidesVisibility) && (_.params.watchSlidesProgress = !0), ["cube", "coverflow"].indexOf(_.params.effect) >= 0 && (_.support.transforms3d ? (_.params.watchSlidesProgress = !0, _.classNames.push("swiper-container-3d")) : _.params.effect = "slide"), "slide" !== _.params.effect && _.classNames.push("swiper-container-" + _.params.effect), "cube" === _.params.effect && (_.params.resistanceRatio = 0, _.params.slidesPerView = 1, _.params.slidesPerColumn = 1, _.params.slidesPerGroup = 1, _.params.centeredSlides = !1, _.params.spaceBetween = 0, _.params.virtualTranslate = !0, _.params.setWrapperSize = !1), "fade" === _.params.effect && (_.params.slidesPerView = 1, _.params.slidesPerColumn = 1, _.params.slidesPerGroup = 1, _.params.watchSlidesProgress = !0, _.params.spaceBetween = 0, "undefined" == typeof m && (_.params.virtualTranslate = !0)), _.params.grabCursor && _.support.touch && (_.params.grabCursor = !1), _.wrapper = _.container.children("." + _.params.wrapperClass), _.params.pagination && (_.paginationContainer = t(_.params.pagination), _.params.paginationClickable && _.paginationContainer.addClass("swiper-pagination-clickable")), _.rtl = s() && ("rtl" === _.container[0].dir.toLowerCase() || "rtl" === _.container.css("direction")), _.rtl && _.classNames.push("swiper-container-rtl"), _.rtl && (_.wrongRTL = "-webkit-box" === _.wrapper.css("display")), _.params.slidesPerColumn > 1 && _.classNames.push("swiper-container-multirow"), _.device.android && _.classNames.push("swiper-container-android"), _.container.addClass(_.classNames.join(" ")), _.translate = 0, _.progress = 0, _.velocity = 0, _.lockSwipeToNext = function() {
				_.params.allowSwipeToNext = !1
			}, _.lockSwipeToPrev = function() {
				_.params.allowSwipeToPrev = !1
			}, _.lockSwipes = function() {
				_.params.allowSwipeToNext = _.params.allowSwipeToPrev = !1
			}, _.unlockSwipeToNext = function() {
				_.params.allowSwipeToNext = !0
			}, _.unlockSwipeToPrev = function() {
				_.params.allowSwipeToPrev = !0
			}, _.unlockSwipes = function() {
				_.params.allowSwipeToNext = _.params.allowSwipeToPrev = !0
			}, _.params.grabCursor && (_.container[0].style.cursor = "move", _.container[0].style.cursor = "-webkit-grab", _.container[0].style.cursor = "-moz-grab", _.container[0].style.cursor = "grab"), _.imagesToLoad = [], _.imagesLoaded = 0, _.loadImage = function(e, t, i, n, r) {
				function s() {
					r && r()
				}
				var a;
				e.complete && n ? s() : t ? (a = new window.Image, a.onload = s, a.onerror = s, a.srcset = i, a.src = t) : s()
			}, _.preloadImages = function() {
				function e() {
					"undefined" != typeof _ && null !== _ && (void 0 !== _.imagesLoaded && _.imagesLoaded++, _.imagesLoaded === _.imagesToLoad.length && (_.params.updateOnImagesReady && _.update(), _.emit("onImagesReady", _)))
				}
				_.imagesToLoad = _.container.find("img");
				for (var t = 0; t < _.imagesToLoad.length; t++) _.loadImage(_.imagesToLoad[t], _.imagesToLoad[t].currentSrc || _.imagesToLoad[t].getAttribute("src"), _.imagesToLoad[t].srcset || _.imagesToLoad[t].getAttribute("srcset"), !0, e)
			}, _.autoplayTimeoutId = void 0, _.autoplaying = !1, _.autoplayPaused = !1, _.startAutoplay = function() {
				return "undefined" != typeof _.autoplayTimeoutId ? !1 : _.params.autoplay ? _.autoplaying ? !1 : (_.autoplaying = !0, _.emit("onAutoplayStart", _), void o()) : !1
			}, _.stopAutoplay = function(e) {
				_.autoplayTimeoutId && (_.autoplayTimeoutId && clearTimeout(_.autoplayTimeoutId), _.autoplaying = !1, _.autoplayTimeoutId = void 0, _.emit("onAutoplayStop", _))
			}, _.pauseAutoplay = function(e) {
				_.autoplayPaused || (_.autoplayTimeoutId && clearTimeout(_.autoplayTimeoutId), _.autoplayPaused = !0, 0 === e ? (_.autoplayPaused = !1, o()) : _.wrapper.transitionEnd(function() {
					_ && (_.autoplayPaused = !1, _.autoplaying ? o() : _.stopAutoplay())
				}))
			}, _.minTranslate = function() {
				return -_.snapGrid[0]
			}, _.maxTranslate = function() {
				return -_.snapGrid[_.snapGrid.length - 1]
			}, _.updateContainerSize = function() {
				var e, t;
				e = "undefined" != typeof _.params.width ? _.params.width : _.container[0].clientWidth, t = "undefined" != typeof _.params.height ? _.params.height : _.container[0].clientHeight, 0 === e && s() || 0 === t && !s() || (e = e - parseInt(_.container.css("padding-left"), 10) - parseInt(_.container.css("padding-right"), 10), t = t - parseInt(_.container.css("padding-top"), 10) - parseInt(_.container.css("padding-bottom"), 10), _.width = e, _.height = t, _.size = s() ? _.width : _.height)
			}, _.updateSlidesSize = function() {
				_.slides = _.wrapper.children("." + _.params.slideClass), _.snapGrid = [], _.slidesGrid = [], _.slidesSizesGrid = [];
				var e, t = _.params.spaceBetween,
					i = -_.params.slidesOffsetBefore,
					n = 0,
					r = 0;
				"string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * _.size), _.virtualSize = -t, _.slides.css(_.rtl ? {
					marginLeft: "",
					marginTop: ""
				} : {
					marginRight: "",
					marginBottom: ""
				});
				var o;
				_.params.slidesPerColumn > 1 && (o = Math.floor(_.slides.length / _.params.slidesPerColumn) === _.slides.length / _.params.slidesPerColumn ? _.slides.length : Math.ceil(_.slides.length / _.params.slidesPerColumn) * _.params.slidesPerColumn);
				var l, u = _.params.slidesPerColumn,
					c = o / u,
					p = c - (_.params.slidesPerColumn * c - _.slides.length);
				for (e = 0; e < _.slides.length; e++) {
					l = 0;
					var h = _.slides.eq(e);
					if (_.params.slidesPerColumn > 1) {
						var d, f, m;
						"column" === _.params.slidesPerColumnFill ? (f = Math.floor(e / u), m = e - f * u, (f > p || f === p && m === u - 1) && ++m >= u && (m = 0, f++), d = f + m * o / u, h.css({
							"-webkit-box-ordinal-group": d,
							"-moz-box-ordinal-group": d,
							"-ms-flex-order": d,
							"-webkit-order": d,
							order: d
						})) : (m = Math.floor(e / c), f = e - m * c), h.css({
							"margin-top": 0 !== m && _.params.spaceBetween && _.params.spaceBetween + "px"
						}).attr("data-swiper-column", f).attr("data-swiper-row", m)
					}
					"none" !== h.css("display") && ("auto" === _.params.slidesPerView ? (l = s() ? h.outerWidth(!0) : h.outerHeight(!0), _.params.roundLengths && (l = a(l))) : (l = (_.size - (_.params.slidesPerView - 1) * t) / _.params.slidesPerView, _.params.roundLengths && (l = a(l)), s() ? _.slides[e].style.width = l + "px" : _.slides[e].style.height = l + "px"), _.slides[e].swiperSlideSize = l, _.slidesSizesGrid.push(l), _.params.centeredSlides ? (i = i + l / 2 + n / 2 + t, 0 === e && (i = i - _.size / 2 - t), Math.abs(i) < .001 && (i = 0), r % _.params.slidesPerGroup === 0 && _.snapGrid.push(i), _.slidesGrid.push(i)) : (r % _.params.slidesPerGroup === 0 && _.snapGrid.push(i), _.slidesGrid.push(i), i = i + l + t), _.virtualSize += l + t, n = l, r++)
				}
				_.virtualSize = Math.max(_.virtualSize, _.size) + _.params.slidesOffsetAfter;
				var g;
				if (_.rtl && _.wrongRTL && ("slide" === _.params.effect || "coverflow" === _.params.effect) && _.wrapper.css({
						width: _.virtualSize + _.params.spaceBetween + "px"
					}), (!_.support.flexbox || _.params.setWrapperSize) && _.wrapper.css(s() ? {
						width: _.virtualSize + _.params.spaceBetween + "px"
					} : {
						height: _.virtualSize + _.params.spaceBetween + "px"
					}), _.params.slidesPerColumn > 1 && (_.virtualSize = (l + _.params.spaceBetween) * o, _.virtualSize = Math.ceil(_.virtualSize / _.params.slidesPerColumn) - _.params.spaceBetween, _.wrapper.css({
						width: _.virtualSize + _.params.spaceBetween + "px"
					}), _.params.centeredSlides)) {
					for (g = [], e = 0; e < _.snapGrid.length; e++) _.snapGrid[e] < _.virtualSize + _.snapGrid[0] && g.push(_.snapGrid[e]);
					_.snapGrid = g
				}
				if (!_.params.centeredSlides) {
					for (g = [], e = 0; e < _.snapGrid.length; e++) _.snapGrid[e] <= _.virtualSize - _.size && g.push(_.snapGrid[e]);
					_.snapGrid = g, Math.floor(_.virtualSize - _.size) > Math.floor(_.snapGrid[_.snapGrid.length - 1]) && _.snapGrid.push(_.virtualSize - _.size)
				}
				0 === _.snapGrid.length && (_.snapGrid = [0]), 0 !== _.params.spaceBetween && _.slides.css(s() ? _.rtl ? {
					marginLeft: t + "px"
				} : {
					marginRight: t + "px"
				} : {
					marginBottom: t + "px"
				}), _.params.watchSlidesProgress && _.updateSlidesOffset()
			}, _.updateSlidesOffset = function() {
				for (var e = 0; e < _.slides.length; e++) _.slides[e].swiperSlideOffset = s() ? _.slides[e].offsetLeft : _.slides[e].offsetTop
			}, _.updateSlidesProgress = function(e) {
				if ("undefined" == typeof e && (e = _.translate || 0), 0 !== _.slides.length) {
					"undefined" == typeof _.slides[0].swiperSlideOffset && _.updateSlidesOffset();
					var t = -e;
					_.rtl && (t = e), _.container[0].getBoundingClientRect(), s() ? "left" : "top", s() ? "right" : "bottom", _.slides.removeClass(_.params.slideVisibleClass);
					for (var i = 0; i < _.slides.length; i++) {
						var n = _.slides[i],
							r = (t - n.swiperSlideOffset) / (n.swiperSlideSize + _.params.spaceBetween);
						if (_.params.watchSlidesVisibility) {
							var a = -(t - n.swiperSlideOffset),
								o = a + _.slidesSizesGrid[i],
								l = a >= 0 && a < _.size || o > 0 && o <= _.size || 0 >= a && o >= _.size;
							l && _.slides.eq(i).addClass(_.params.slideVisibleClass)
						}
						n.progress = _.rtl ? -r : r
					}
				}
			}, _.updateProgress = function(e) {
				"undefined" == typeof e && (e = _.translate || 0);
				var t = _.maxTranslate() - _.minTranslate();
				0 === t ? (_.progress = 0, _.isBeginning = _.isEnd = !0) : (_.progress = (e - _.minTranslate()) / t, _.isBeginning = _.progress <= 0, _.isEnd = _.progress >= 1), _.isBeginning && _.emit("onReachBeginning", _), _.isEnd && _.emit("onReachEnd", _), _.params.watchSlidesProgress && _.updateSlidesProgress(e), _.emit("onProgress", _, _.progress)
			}, _.updateActiveIndex = function() {
				var e, t, i, n = _.rtl ? _.translate : -_.translate;
				for (t = 0; t < _.slidesGrid.length; t++) "undefined" != typeof _.slidesGrid[t + 1] ? n >= _.slidesGrid[t] && n < _.slidesGrid[t + 1] - (_.slidesGrid[t + 1] - _.slidesGrid[t]) / 2 ? e = t : n >= _.slidesGrid[t] && n < _.slidesGrid[t + 1] && (e = t + 1) : n >= _.slidesGrid[t] && (e = t);
				(0 > e || "undefined" == typeof e) && (e = 0), i = Math.floor(e / _.params.slidesPerGroup), i >= _.snapGrid.length && (i = _.snapGrid.length - 1), e !== _.activeIndex && (_.snapIndex = i, _.previousIndex = _.activeIndex, _.activeIndex = e, _.updateClasses())
			}, _.updateClasses = function() {
				_.slides.removeClass(_.params.slideActiveClass + " " + _.params.slideNextClass + " " + _.params.slidePrevClass);
				var e = _.slides.eq(_.activeIndex);
				if (e.addClass(_.params.slideActiveClass), e.next("." + _.params.slideClass).addClass(_.params.slideNextClass), e.prev("." + _.params.slideClass).addClass(_.params.slidePrevClass), _.bullets && _.bullets.length > 0) {
					_.bullets.removeClass(_.params.bulletActiveClass);
					var i;
					_.params.loop ? (i = Math.ceil(_.activeIndex - _.loopedSlides) / _.params.slidesPerGroup, i > _.slides.length - 1 - 2 * _.loopedSlides && (i -= _.slides.length - 2 * _.loopedSlides), i > _.bullets.length - 1 && (i -= _.bullets.length)) : i = "undefined" != typeof _.snapIndex ? _.snapIndex : _.activeIndex || 0,
						_.paginationContainer.length > 1 ? _.bullets.each(function() {
							t(this).index() === i && t(this).addClass(_.params.bulletActiveClass)
						}) : _.bullets.eq(i).addClass(_.params.bulletActiveClass)
				}
				_.params.loop || (_.params.prevButton && (_.isBeginning ? (t(_.params.prevButton).addClass(_.params.buttonDisabledClass), _.params.a11y && _.a11y && _.a11y.disable(t(_.params.prevButton))) : (t(_.params.prevButton).removeClass(_.params.buttonDisabledClass), _.params.a11y && _.a11y && _.a11y.enable(t(_.params.prevButton)))), _.params.nextButton && (_.isEnd ? (t(_.params.nextButton).addClass(_.params.buttonDisabledClass), _.params.a11y && _.a11y && _.a11y.disable(t(_.params.nextButton))) : (t(_.params.nextButton).removeClass(_.params.buttonDisabledClass), _.params.a11y && _.a11y && _.a11y.enable(t(_.params.nextButton)))))
			}, _.updatePagination = function() {
				if (_.params.pagination && _.paginationContainer && _.paginationContainer.length > 0) {
					for (var e = "", t = _.params.loop ? Math.ceil((_.slides.length - 2 * _.loopedSlides) / _.params.slidesPerGroup) : _.snapGrid.length, i = 0; t > i; i++) e += _.params.paginationBulletRender ? _.params.paginationBulletRender(i, _.params.bulletClass) : "<" + _.params.paginationElement + ' class="' + _.params.bulletClass + '"></' + _.params.paginationElement + ">";
					_.paginationContainer.html(e), _.bullets = _.paginationContainer.find("." + _.params.bulletClass), _.params.paginationClickable && _.params.a11y && _.a11y && _.a11y.initPagination()
				}
			}, _.update = function(e) {
				function t() {
					n = Math.min(Math.max(_.translate, _.maxTranslate()), _.minTranslate()), _.setWrapperTranslate(n), _.updateActiveIndex(), _.updateClasses()
				}
				if (_.updateContainerSize(), _.updateSlidesSize(), _.updateProgress(), _.updatePagination(), _.updateClasses(), _.params.scrollbar && _.scrollbar && _.scrollbar.set(), e) {
					var i, n;
					_.controller && _.controller.spline && (_.controller.spline = void 0), _.params.freeMode ? t() : (i = ("auto" === _.params.slidesPerView || _.params.slidesPerView > 1) && _.isEnd && !_.params.centeredSlides ? _.slideTo(_.slides.length - 1, 0, !1, !0) : _.slideTo(_.activeIndex, 0, !1, !0), i || t())
				}
			}, _.onResize = function(e) {
				var t = _.params.allowSwipeToPrev,
					i = _.params.allowSwipeToNext;
				if (_.params.allowSwipeToPrev = _.params.allowSwipeToNext = !0, _.updateContainerSize(), _.updateSlidesSize(), ("auto" === _.params.slidesPerView || _.params.freeMode || e) && _.updatePagination(), _.params.scrollbar && _.scrollbar && _.scrollbar.set(), _.controller && _.controller.spline && (_.controller.spline = void 0), _.params.freeMode) {
					var n = Math.min(Math.max(_.translate, _.maxTranslate()), _.minTranslate());
					_.setWrapperTranslate(n), _.updateActiveIndex(), _.updateClasses()
				} else _.updateClasses(), ("auto" === _.params.slidesPerView || _.params.slidesPerView > 1) && _.isEnd && !_.params.centeredSlides ? _.slideTo(_.slides.length - 1, 0, !1, !0) : _.slideTo(_.activeIndex, 0, !1, !0);
				_.params.allowSwipeToPrev = t, _.params.allowSwipeToNext = i
			};
			var y = ["mousedown", "mousemove", "mouseup"];
			window.navigator.pointerEnabled ? y = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (y = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), _.touchEvents = {
				start: _.support.touch || !_.params.simulateTouch ? "touchstart" : y[0],
				move: _.support.touch || !_.params.simulateTouch ? "touchmove" : y[1],
				end: _.support.touch || !_.params.simulateTouch ? "touchend" : y[2]
			}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === _.params.touchEventsTarget ? _.container : _.wrapper).addClass("swiper-wp8-" + _.params.direction), _.initEvents = function(e) {
				var i = e ? "off" : "on",
					n = e ? "removeEventListener" : "addEventListener",
					s = "container" === _.params.touchEventsTarget ? _.container[0] : _.wrapper[0],
					a = _.support.touch ? s : document,
					o = _.params.nested ? !0 : !1;
				_.browser.ie ? (s[n](_.touchEvents.start, _.onTouchStart, !1), a[n](_.touchEvents.move, _.onTouchMove, o), a[n](_.touchEvents.end, _.onTouchEnd, !1)) : (_.support.touch && (s[n](_.touchEvents.start, _.onTouchStart, !1), s[n](_.touchEvents.move, _.onTouchMove, o), s[n](_.touchEvents.end, _.onTouchEnd, !1)), !r.simulateTouch || _.device.ios || _.device.android || (s[n]("mousedown", _.onTouchStart, !1), document[n]("mousemove", _.onTouchMove, o), document[n]("mouseup", _.onTouchEnd, !1))), window[n]("resize", _.onResize), _.params.nextButton && (t(_.params.nextButton)[i]("click", _.onClickNext), _.params.a11y && _.a11y && t(_.params.nextButton)[i]("keydown", _.a11y.onEnterKey)), _.params.prevButton && (t(_.params.prevButton)[i]("click", _.onClickPrev), _.params.a11y && _.a11y && t(_.params.prevButton)[i]("keydown", _.a11y.onEnterKey)), _.params.pagination && _.params.paginationClickable && (t(_.paginationContainer)[i]("click", "." + _.params.bulletClass, _.onClickIndex), _.params.a11y && _.a11y && t(_.paginationContainer)[i]("keydown", "." + _.params.bulletClass, _.a11y.onEnterKey)), (_.params.preventClicks || _.params.preventClicksPropagation) && s[n]("click", _.preventClicks, !0)
			}, _.attachEvents = function(e) {
				_.initEvents()
			}, _.detachEvents = function() {
				_.initEvents(!0)
			}, _.allowClick = !0, _.preventClicks = function(e) {
				_.allowClick || (_.params.preventClicks && e.preventDefault(), _.params.preventClicksPropagation && _.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
			}, _.onClickNext = function(e) {
				e.preventDefault(), (!_.isEnd || _.params.loop) && _.slideNext()
			}, _.onClickPrev = function(e) {
				e.preventDefault(), (!_.isBeginning || _.params.loop) && _.slidePrev()
			}, _.onClickIndex = function(e) {
				e.preventDefault();
				var i = t(this).index() * _.params.slidesPerGroup;
				_.params.loop && (i += _.loopedSlides), _.slideTo(i)
			}, _.updateClickedSlide = function(e) {
				var i = l(e, "." + _.params.slideClass),
					n = !1;
				if (i)
					for (var r = 0; r < _.slides.length; r++) _.slides[r] === i && (n = !0);
				if (!i || !n) return _.clickedSlide = void 0, void(_.clickedIndex = void 0);
				if (_.clickedSlide = i, _.clickedIndex = t(i).index(), _.params.slideToClickedSlide && void 0 !== _.clickedIndex && _.clickedIndex !== _.activeIndex) {
					var s, a, o = _.clickedIndex;
					_.params.loop ? (s = t(_.clickedSlide).attr("data-swiper-slide-index"), _.params.centeredSlides ? o < _.loopedSlides - _.params.slidesPerView / 2 ? (_.fixLoop(), a = _.wrapper.children("." + _.params.slideClass + '[data-swiper-slide-index="' + s + '"]'), o = a.eq(a.length - 1).index(), setTimeout(function() {
						_.slideTo(o)
					}, 0)) : o > _.slides.length - _.loopedSlides + _.params.slidesPerView / 2 ? (_.fixLoop(), o = _.wrapper.children("." + _.params.slideClass + '[data-swiper-slide-index="' + s + '"]').eq(0).index(), setTimeout(function() {
						_.slideTo(o)
					}, 0)) : _.slideTo(o) : o > _.slides.length - _.params.slidesPerView ? (_.fixLoop(), o = _.wrapper.children("." + _.params.slideClass + '[data-swiper-slide-index="' + s + '"]').eq(0).index(), setTimeout(function() {
						_.slideTo(o)
					}, 0)) : o < _.params.slidesPerView - 1 ? (_.fixLoop(), a = _.wrapper.children("." + _.params.slideClass + '[data-swiper-slide-index="' + s + '"]'), o = a.eq(a.length - 1).index(), setTimeout(function() {
						_.slideTo(o)
					}, 0)) : _.slideTo(o)) : _.slideTo(o)
				}
			};
			var w, x, b, T, S, C, P, k, D, O = "input, select, textarea, button",
				E = Date.now(),
				M = [];
			_.animating = !1, _.touches = {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			};
			var A, R;
			if (_.onTouchStart = function(e) {
					if (e.originalEvent && (e = e.originalEvent), A = "touchstart" === e.type, A || !("which" in e) || 3 !== e.which) {
						if (_.params.noSwiping && l(e, "." + _.params.noSwipingClass)) return void(_.allowClick = !0);
						if (!_.params.swipeHandler || l(e, _.params.swipeHandler)) {
							var i = _.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
								n = _.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
							if (!(_.device.ios && _.params.iOSEdgeSwipeDetection && i <= _.params.iOSEdgeSwipeThreshold)) {
								if (w = !0, x = !1, T = void 0, R = void 0, _.touches.startX = i, _.touches.startY = n, b = Date.now(), _.allowClick = !0, _.updateContainerSize(), _.swipeDirection = void 0, _.params.threshold > 0 && (P = !1), "touchstart" !== e.type) {
									var r = !0;
									t(e.target).is(O) && (r = !1), document.activeElement && t(document.activeElement).is(O) && document.activeElement.blur(), r && e.preventDefault()
								}
								_.emit("onTouchStart", _, e)
							}
						}
					}
				}, _.onTouchMove = function(e) {
					if (e.originalEvent && (e = e.originalEvent), !(A && "mousemove" === e.type || e.preventedByNestedSwiper)) {
						if (_.params.onlyExternal) return _.allowClick = !1, void(w && (_.touches.startX = _.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, _.touches.startY = _.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, b = Date.now()));
						if (A && document.activeElement && e.target === document.activeElement && t(e.target).is(O)) return x = !0, void(_.allowClick = !1);
						if (_.emit("onTouchMove", _, e), !(e.targetTouches && e.targetTouches.length > 1)) {
							if (_.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, _.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, "undefined" == typeof T) {
								var i = 180 * Math.atan2(Math.abs(_.touches.currentY - _.touches.startY), Math.abs(_.touches.currentX - _.touches.startX)) / Math.PI;
								T = s() ? i > _.params.touchAngle : 90 - i > _.params.touchAngle
							}
							if (T && _.emit("onTouchMoveOpposite", _, e), "undefined" == typeof R && _.browser.ieTouch && (_.touches.currentX !== _.touches.startX || _.touches.currentY !== _.touches.startY) && (R = !0), w) {
								if (T) return void(w = !1);
								if (R || !_.browser.ieTouch) {
									_.allowClick = !1, _.emit("onSliderMove", _, e), e.preventDefault(), _.params.touchMoveStopPropagation && !_.params.nested && e.stopPropagation(), x || (r.loop && _.fixLoop(), C = _.getWrapperTranslate(), _.setWrapperTransition(0), _.animating && _.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), _.params.autoplay && _.autoplaying && (_.params.autoplayDisableOnInteraction ? _.stopAutoplay() : _.pauseAutoplay()), D = !1, _.params.grabCursor && (_.container[0].style.cursor = "move", _.container[0].style.cursor = "-webkit-grabbing", _.container[0].style.cursor = "-moz-grabbin", _.container[0].style.cursor = "grabbing")), x = !0;
									var n = _.touches.diff = s() ? _.touches.currentX - _.touches.startX : _.touches.currentY - _.touches.startY;
									n *= _.params.touchRatio, _.rtl && (n = -n), _.swipeDirection = n > 0 ? "prev" : "next", S = n + C;
									var a = !0;
									if (n > 0 && S > _.minTranslate() ? (a = !1, _.params.resistance && (S = _.minTranslate() - 1 + Math.pow(-_.minTranslate() + C + n, _.params.resistanceRatio))) : 0 > n && S < _.maxTranslate() && (a = !1, _.params.resistance && (S = _.maxTranslate() + 1 - Math.pow(_.maxTranslate() - C - n, _.params.resistanceRatio))), a && (e.preventedByNestedSwiper = !0), !_.params.allowSwipeToNext && "next" === _.swipeDirection && C > S && (S = C), !_.params.allowSwipeToPrev && "prev" === _.swipeDirection && S > C && (S = C), _.params.followFinger) {
										if (_.params.threshold > 0) {
											if (!(Math.abs(n) > _.params.threshold || P)) return void(S = C);
											if (!P) return P = !0, _.touches.startX = _.touches.currentX, _.touches.startY = _.touches.currentY, S = C, void(_.touches.diff = s() ? _.touches.currentX - _.touches.startX : _.touches.currentY - _.touches.startY)
										}(_.params.freeMode || _.params.watchSlidesProgress) && _.updateActiveIndex(), _.params.freeMode && (0 === M.length && M.push({
											position: _.touches[s() ? "startX" : "startY"],
											time: b
										}), M.push({
											position: _.touches[s() ? "currentX" : "currentY"],
											time: (new window.Date).getTime()
										})), _.updateProgress(S), _.setWrapperTranslate(S)
									}
								}
							}
						}
					}
				}, _.onTouchEnd = function(e) {
					if (e.originalEvent && (e = e.originalEvent), _.emit("onTouchEnd", _, e), w) {
						_.params.grabCursor && x && w && (_.container[0].style.cursor = "move", _.container[0].style.cursor = "-webkit-grab", _.container[0].style.cursor = "-moz-grab", _.container[0].style.cursor = "grab");
						var i = Date.now(),
							n = i - b;
						if (_.allowClick && (_.updateClickedSlide(e), _.emit("onTap", _, e), 300 > n && i - E > 300 && (k && clearTimeout(k), k = setTimeout(function() {
								_ && (_.params.paginationHide && _.paginationContainer.length > 0 && !t(e.target).hasClass(_.params.bulletClass) && _.paginationContainer.toggleClass(_.params.paginationHiddenClass), _.emit("onClick", _, e))
							}, 300)), 300 > n && 300 > i - E && (k && clearTimeout(k), _.emit("onDoubleTap", _, e))), E = Date.now(), setTimeout(function() {
								_ && (_.allowClick = !0)
							}, 0), !w || !x || !_.swipeDirection || 0 === _.touches.diff || S === C) return void(w = x = !1);
						w = x = !1;
						var r;
						if (r = _.params.followFinger ? _.rtl ? _.translate : -_.translate : -S, _.params.freeMode) {
							if (r < -_.minTranslate()) return void _.slideTo(_.activeIndex);
							if (r > -_.maxTranslate()) return void _.slideTo(_.slides.length < _.snapGrid.length ? _.snapGrid.length - 1 : _.slides.length - 1);
							if (_.params.freeModeMomentum) {
								if (M.length > 1) {
									var s = M.pop(),
										a = M.pop(),
										o = s.position - a.position,
										l = s.time - a.time;
									_.velocity = o / l, _.velocity = _.velocity / 2, Math.abs(_.velocity) < _.params.freeModeMinimumVelocity && (_.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (_.velocity = 0)
								} else _.velocity = 0;
								M.length = 0;
								var u = 1e3 * _.params.freeModeMomentumRatio,
									c = _.velocity * u,
									p = _.translate + c;
								_.rtl && (p = -p);
								var h, d = !1,
									f = 20 * Math.abs(_.velocity) * _.params.freeModeMomentumBounceRatio;
								if (p < _.maxTranslate()) _.params.freeModeMomentumBounce ? (p + _.maxTranslate() < -f && (p = _.maxTranslate() - f), h = _.maxTranslate(), d = !0, D = !0) : p = _.maxTranslate();
								else if (p > _.minTranslate()) _.params.freeModeMomentumBounce ? (p - _.minTranslate() > f && (p = _.minTranslate() + f), h = _.minTranslate(), d = !0, D = !0) : p = _.minTranslate();
								else if (_.params.freeModeSticky) {
									var m, g = 0;
									for (g = 0; g < _.snapGrid.length; g += 1)
										if (_.snapGrid[g] > -p) {
											m = g;
											break
										}
									p = Math.abs(_.snapGrid[m] - p) < Math.abs(_.snapGrid[m - 1] - p) || "next" === _.swipeDirection ? _.snapGrid[m] : _.snapGrid[m - 1], _.rtl || (p = -p)
								}
								if (0 !== _.velocity) u = Math.abs(_.rtl ? (-p - _.translate) / _.velocity : (p - _.translate) / _.velocity);
								else if (_.params.freeModeSticky) return void _.slideReset();
								_.params.freeModeMomentumBounce && d ? (_.updateProgress(h), _.setWrapperTransition(u), _.setWrapperTranslate(p), _.onTransitionStart(), _.animating = !0, _.wrapper.transitionEnd(function() {
									_ && D && (_.emit("onMomentumBounce", _), _.setWrapperTransition(_.params.speed), _.setWrapperTranslate(h), _.wrapper.transitionEnd(function() {
										_ && _.onTransitionEnd()
									}))
								})) : _.velocity ? (_.updateProgress(p), _.setWrapperTransition(u), _.setWrapperTranslate(p), _.onTransitionStart(), _.animating || (_.animating = !0, _.wrapper.transitionEnd(function() {
									_ && _.onTransitionEnd()
								}))) : _.updateProgress(p), _.updateActiveIndex()
							}
							return void((!_.params.freeModeMomentum || n >= _.params.longSwipesMs) && (_.updateProgress(), _.updateActiveIndex()))
						}
						var v, y = 0,
							T = _.slidesSizesGrid[0];
						for (v = 0; v < _.slidesGrid.length; v += _.params.slidesPerGroup) "undefined" != typeof _.slidesGrid[v + _.params.slidesPerGroup] ? r >= _.slidesGrid[v] && r < _.slidesGrid[v + _.params.slidesPerGroup] && (y = v, T = _.slidesGrid[v + _.params.slidesPerGroup] - _.slidesGrid[v]) : r >= _.slidesGrid[v] && (y = v, T = _.slidesGrid[_.slidesGrid.length - 1] - _.slidesGrid[_.slidesGrid.length - 2]);
						var P = (r - _.slidesGrid[y]) / T;
						if (n > _.params.longSwipesMs) {
							if (!_.params.longSwipes) return void _.slideTo(_.activeIndex);
							"next" === _.swipeDirection && _.slideTo(P >= _.params.longSwipesRatio ? y + _.params.slidesPerGroup : y), "prev" === _.swipeDirection && _.slideTo(P > 1 - _.params.longSwipesRatio ? y + _.params.slidesPerGroup : y)
						} else {
							if (!_.params.shortSwipes) return void _.slideTo(_.activeIndex);
							"next" === _.swipeDirection && _.slideTo(y + _.params.slidesPerGroup), "prev" === _.swipeDirection && _.slideTo(y)
						}
					}
				}, _._slideTo = function(e, t) {
					return _.slideTo(e, t, !0, !0)
				}, _.slideTo = function(e, t, i, n) {
					"undefined" == typeof i && (i = !0), "undefined" == typeof e && (e = 0), 0 > e && (e = 0), _.snapIndex = Math.floor(e / _.params.slidesPerGroup), _.snapIndex >= _.snapGrid.length && (_.snapIndex = _.snapGrid.length - 1);
					var r = -_.snapGrid[_.snapIndex];
					_.params.autoplay && _.autoplaying && (n || !_.params.autoplayDisableOnInteraction ? _.pauseAutoplay(t) : _.stopAutoplay()), _.updateProgress(r);
					for (var a = 0; a < _.slidesGrid.length; a++) - Math.floor(100 * r) >= Math.floor(100 * _.slidesGrid[a]) && (e = a);
					return !_.params.allowSwipeToNext && r < _.translate && r < _.minTranslate() ? !1 : !_.params.allowSwipeToPrev && r > _.translate && r > _.maxTranslate() && (_.activeIndex || 0) !== e ? !1 : ("undefined" == typeof t && (t = _.params.speed), _.previousIndex = _.activeIndex || 0, _.activeIndex = e, r === _.translate ? (_.updateClasses(), !1) : (_.updateClasses(), _.onTransitionStart(i), s() ? r : 0, s() ? 0 : r, 0 === t ? (_.setWrapperTransition(0), _.setWrapperTranslate(r), _.onTransitionEnd(i)) : (_.setWrapperTransition(t), _.setWrapperTranslate(r), _.animating || (_.animating = !0, _.wrapper.transitionEnd(function() {
						_ && _.onTransitionEnd(i)
					}))), !0))
				}, _.onTransitionStart = function(e) {
					"undefined" == typeof e && (e = !0), _.lazy && _.lazy.onTransitionStart(), e && (_.emit("onTransitionStart", _), _.activeIndex !== _.previousIndex && _.emit("onSlideChangeStart", _))
				}, _.onTransitionEnd = function(e) {
					_.animating = !1, _.setWrapperTransition(0), "undefined" == typeof e && (e = !0), _.lazy && _.lazy.onTransitionEnd(), e && (_.emit("onTransitionEnd", _), _.activeIndex !== _.previousIndex && _.emit("onSlideChangeEnd", _)), _.params.hashnav && _.hashnav && _.hashnav.setHash()
				}, _.slideNext = function(e, t, i) {
					return _.params.loop ? _.animating ? !1 : (_.fixLoop(), _.container[0].clientLeft, _.slideTo(_.activeIndex + _.params.slidesPerGroup, t, e, i)) : _.slideTo(_.activeIndex + _.params.slidesPerGroup, t, e, i)
				}, _._slideNext = function(e) {
					return _.slideNext(!0, e, !0)
				}, _.slidePrev = function(e, t, i) {
					return _.params.loop ? _.animating ? !1 : (_.fixLoop(), _.container[0].clientLeft, _.slideTo(_.activeIndex - 1, t, e, i)) : _.slideTo(_.activeIndex - 1, t, e, i)
				}, _._slidePrev = function(e) {
					return _.slidePrev(!0, e, !0)
				}, _.slideReset = function(e, t, i) {
					return _.slideTo(_.activeIndex, t, e)
				}, _.setWrapperTransition = function(e, t) {
					_.wrapper.transition(e), "slide" !== _.params.effect && _.effects[_.params.effect] && _.effects[_.params.effect].setTransition(e), _.params.parallax && _.parallax && _.parallax.setTransition(e), _.params.scrollbar && _.scrollbar && _.scrollbar.setTransition(e), _.params.control && _.controller && _.controller.setTransition(e, t), _.emit("onSetTransition", _, e)
				}, _.setWrapperTranslate = function(e, t, i) {
					var n = 0,
						r = 0,
						o = 0;
					s() ? n = _.rtl ? -e : e : r = e, _.params.roundLengths && (n = a(n), r = a(r)), _.params.virtualTranslate || _.wrapper.transform(_.support.transforms3d ? "translate3d(" + n + "px, " + r + "px, " + o + "px)" : "translate(" + n + "px, " + r + "px)"), _.translate = s() ? n : r, t && _.updateActiveIndex(), "slide" !== _.params.effect && _.effects[_.params.effect] && _.effects[_.params.effect].setTranslate(_.translate), _.params.parallax && _.parallax && _.parallax.setTranslate(_.translate), _.params.scrollbar && _.scrollbar && _.scrollbar.setTranslate(_.translate), _.params.control && _.controller && _.controller.setTranslate(_.translate, i), _.emit("onSetTranslate", _, _.translate)
				}, _.getTranslate = function(e, t) {
					var i, n, r, s;
					return "undefined" == typeof t && (t = "x"), _.params.virtualTranslate ? _.rtl ? -_.translate : _.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (n = r.transform || r.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(function(e) {
						return e.replace(",", ".")
					}).join(", ")), s = new window.WebKitCSSMatrix("none" === n ? "" : n)) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (n = window.WebKitCSSMatrix ? s.m41 : parseFloat(16 === i.length ? i[12] : i[4])), "y" === t && (n = window.WebKitCSSMatrix ? s.m42 : parseFloat(16 === i.length ? i[13] : i[5])), _.rtl && n && (n = -n), n || 0)
				}, _.getWrapperTranslate = function(e) {
					return "undefined" == typeof e && (e = s() ? "x" : "y"), _.getTranslate(_.wrapper[0], e)
				}, _.observers = [], _.initObservers = function() {
					if (_.params.observeParents)
						for (var e = _.container.parents(), t = 0; t < e.length; t++) u(e[t]);
					u(_.container[0], {
						childList: !1
					}), u(_.wrapper[0], {
						attributes: !1
					})
				}, _.disconnectObservers = function() {
					for (var e = 0; e < _.observers.length; e++) _.observers[e].disconnect();
					_.observers = []
				}, _.createLoop = function() {
					_.wrapper.children("." + _.params.slideClass + "." + _.params.slideDuplicateClass).remove();
					var e = _.wrapper.children("." + _.params.slideClass);
					"auto" !== _.params.slidesPerView || _.params.loopedSlides || (_.params.loopedSlides = e.length), _.loopedSlides = parseInt(_.params.loopedSlides || _.params.slidesPerView, 10), _.loopedSlides = _.loopedSlides + _.params.loopAdditionalSlides, _.loopedSlides > e.length && (_.loopedSlides = e.length);
					var i, n = [],
						r = [];
					for (e.each(function(i, s) {
							var a = t(this);
							i < _.loopedSlides && r.push(s), i < e.length && i >= e.length - _.loopedSlides && n.push(s), a.attr("data-swiper-slide-index", i)
						}), i = 0; i < r.length; i++) _.wrapper.append(t(r[i].cloneNode(!0)).addClass(_.params.slideDuplicateClass));
					for (i = n.length - 1; i >= 0; i--) _.wrapper.prepend(t(n[i].cloneNode(!0)).addClass(_.params.slideDuplicateClass))
				}, _.destroyLoop = function() {
					_.wrapper.children("." + _.params.slideClass + "." + _.params.slideDuplicateClass).remove(), _.slides.removeAttr("data-swiper-slide-index")
				}, _.fixLoop = function() {
					var e;
					_.activeIndex < _.loopedSlides ? (e = _.slides.length - 3 * _.loopedSlides + _.activeIndex, e += _.loopedSlides, _.slideTo(e, 0, !1, !0)) : ("auto" === _.params.slidesPerView && _.activeIndex >= 2 * _.loopedSlides || _.activeIndex > _.slides.length - 2 * _.params.slidesPerView) && (e = -_.slides.length + _.activeIndex + _.loopedSlides, e += _.loopedSlides, _.slideTo(e, 0, !1, !0))
				}, _.appendSlide = function(e) {
					if (_.params.loop && _.destroyLoop(), "object" == typeof e && e.length)
						for (var t = 0; t < e.length; t++) e[t] && _.wrapper.append(e[t]);
					else _.wrapper.append(e);
					_.params.loop && _.createLoop(), _.params.observer && _.support.observer || _.update(!0)
				}, _.prependSlide = function(e) {
					_.params.loop && _.destroyLoop();
					var t = _.activeIndex + 1;
					if ("object" == typeof e && e.length) {
						for (var i = 0; i < e.length; i++) e[i] && _.wrapper.prepend(e[i]);
						t = _.activeIndex + e.length
					} else _.wrapper.prepend(e);
					_.params.loop && _.createLoop(), _.params.observer && _.support.observer || _.update(!0), _.slideTo(t, 0, !1)
				}, _.removeSlide = function(e) {
					_.params.loop && (_.destroyLoop(), _.slides = _.wrapper.children("." + _.params.slideClass));
					var t, i = _.activeIndex;
					if ("object" == typeof e && e.length) {
						for (var n = 0; n < e.length; n++) t = e[n], _.slides[t] && _.slides.eq(t).remove(), i > t && i--;
						i = Math.max(i, 0)
					} else t = e, _.slides[t] && _.slides.eq(t).remove(), i > t && i--, i = Math.max(i, 0);
					_.params.loop && _.createLoop(), _.params.observer && _.support.observer || _.update(!0), _.params.loop ? _.slideTo(i + _.loopedSlides, 0, !1) : _.slideTo(i, 0, !1)
				}, _.removeAllSlides = function() {
					for (var e = [], t = 0; t < _.slides.length; t++) e.push(t);
					_.removeSlide(e)
				}, _.effects = {
					fade: {
						setTranslate: function() {
							for (var e = 0; e < _.slides.length; e++) {
								var t = _.slides.eq(e),
									i = t[0].swiperSlideOffset,
									n = -i;
								_.params.virtualTranslate || (n -= _.translate);
								var r = 0;
								s() || (r = n, n = 0);
								var a = _.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
								t.css({
									opacity: a
								}).transform("translate3d(" + n + "px, " + r + "px, 0px)")
							}
						},
						setTransition: function(e) {
							if (_.slides.transition(e), _.params.virtualTranslate && 0 !== e) {
								var t = !1;
								_.slides.transitionEnd(function() {
									if (!t && _) {
										t = !0, _.animating = !1;
										for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++) _.wrapper.trigger(e[i])
									}
								})
							}
						}
					},
					cube: {
						setTranslate: function() {
							var e, i = 0;
							_.params.cube.shadow && (s() ? (e = _.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), _.wrapper.append(e)), e.css({
								height: _.width + "px"
							})) : (e = _.container.find(".swiper-cube-shadow"), 0 === e.length && (e = t('<div class="swiper-cube-shadow"></div>'), _.container.append(e))));
							for (var n = 0; n < _.slides.length; n++) {
								var r = _.slides.eq(n),
									a = 90 * n,
									o = Math.floor(a / 360);
								_.rtl && (a = -a, o = Math.floor(-a / 360));
								var l = Math.max(Math.min(r[0].progress, 1), -1),
									u = 0,
									c = 0,
									p = 0;
								n % 4 === 0 ? (u = 4 * -o * _.size, p = 0) : (n - 1) % 4 === 0 ? (u = 0, p = 4 * -o * _.size) : (n - 2) % 4 === 0 ? (u = _.size + 4 * o * _.size, p = _.size) : (n - 3) % 4 === 0 && (u = -_.size, p = 3 * _.size + 4 * _.size * o), _.rtl && (u = -u), s() || (c = u, u = 0);
								var h = "rotateX(" + (s() ? 0 : -a) + "deg) rotateY(" + (s() ? a : 0) + "deg) translate3d(" + u + "px, " + c + "px, " + p + "px)";
								if (1 >= l && l > -1 && (i = 90 * n + 90 * l, _.rtl && (i = 90 * -n - 90 * l)), r.transform(h), _.params.cube.slideShadows) {
									var d = r.find(s() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
										f = r.find(s() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
									0 === d.length && (d = t('<div class="swiper-slide-shadow-' + (s() ? "left" : "top") + '"></div>'), r.append(d)), 0 === f.length && (f = t('<div class="swiper-slide-shadow-' + (s() ? "right" : "bottom") + '"></div>'), r.append(f)), r[0].progress, d.length && (d[0].style.opacity = -r[0].progress), f.length && (f[0].style.opacity = r[0].progress)
								}
							}
							if (_.wrapper.css({
									"-webkit-transform-origin": "50% 50% -" + _.size / 2 + "px",
									"-moz-transform-origin": "50% 50% -" + _.size / 2 + "px",
									"-ms-transform-origin": "50% 50% -" + _.size / 2 + "px",
									"transform-origin": "50% 50% -" + _.size / 2 + "px"
								}), _.params.cube.shadow)
								if (s()) e.transform("translate3d(0px, " + (_.width / 2 + _.params.cube.shadowOffset) + "px, " + -_.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + _.params.cube.shadowScale + ")");
								else {
									var m = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
										g = 1.5 - (Math.sin(2 * m * Math.PI / 360) / 2 + Math.cos(2 * m * Math.PI / 360) / 2),
										v = _.params.cube.shadowScale,
										y = _.params.cube.shadowScale / g,
										w = _.params.cube.shadowOffset;
									e.transform("scale3d(" + v + ", 1, " + y + ") translate3d(0px, " + (_.height / 2 + w) + "px, " + -_.height / 2 / y + "px) rotateX(-90deg)")
								}
							var x = _.isSafari || _.isUiWebView ? -_.size / 2 : 0;
							_.wrapper.transform("translate3d(0px,0," + x + "px) rotateX(" + (s() ? 0 : i) + "deg) rotateY(" + (s() ? -i : 0) + "deg)")
						},
						setTransition: function(e) {
							_.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), _.params.cube.shadow && !s() && _.container.find(".swiper-cube-shadow").transition(e)
						}
					},
					coverflow: {
						setTranslate: function() {
							for (var e = _.translate, i = s() ? -e + _.width / 2 : -e + _.height / 2, n = s() ? _.params.coverflow.rotate : -_.params.coverflow.rotate, r = _.params.coverflow.depth, a = 0, o = _.slides.length; o > a; a++) {
								var l = _.slides.eq(a),
									u = _.slidesSizesGrid[a],
									c = l[0].swiperSlideOffset,
									p = (i - c - u / 2) / u * _.params.coverflow.modifier,
									h = s() ? n * p : 0,
									d = s() ? 0 : n * p,
									f = -r * Math.abs(p),
									m = s() ? 0 : _.params.coverflow.stretch * p,
									g = s() ? _.params.coverflow.stretch * p : 0;
								Math.abs(g) < .001 && (g = 0), Math.abs(m) < .001 && (m = 0), Math.abs(f) < .001 && (f = 0), Math.abs(h) < .001 && (h = 0), Math.abs(d) < .001 && (d = 0);
								var v = "translate3d(" + g + "px," + m + "px," + f + "px)  rotateX(" + d + "deg) rotateY(" + h + "deg)";
								if (l.transform(v), l[0].style.zIndex = -Math.abs(Math.round(p)) + 1, _.params.coverflow.slideShadows) {
									var y = l.find(s() ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
										w = l.find(s() ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
									0 === y.length && (y = t('<div class="swiper-slide-shadow-' + (s() ? "left" : "top") + '"></div>'), l.append(y)), 0 === w.length && (w = t('<div class="swiper-slide-shadow-' + (s() ? "right" : "bottom") + '"></div>'), l.append(w)), y.length && (y[0].style.opacity = p > 0 ? p : 0), w.length && (w[0].style.opacity = -p > 0 ? -p : 0)
								}
							}
							if (_.browser.ie) {
								var x = _.wrapper[0].style;
								x.perspectiveOrigin = i + "px 50%"
							}
						},
						setTransition: function(e) {
							_.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
						}
					}
				}, _.lazy = {
					initialImageLoaded: !1,
					loadImageInSlide: function(e, i) {
						if ("undefined" != typeof e && ("undefined" == typeof i && (i = !0), 0 !== _.slides.length)) {
							var n = _.slides.eq(e),
								r = n.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
							!n.hasClass("swiper-lazy") || n.hasClass("swiper-lazy-loaded") || n.hasClass("swiper-lazy-loading") || r.add(n[0]), 0 !== r.length && r.each(function() {
								var e = t(this);
								e.addClass("swiper-lazy-loading");
								var r = e.attr("data-background"),
									s = e.attr("data-src"),
									a = e.attr("data-srcset");
								_.loadImage(e[0], s || r, a, !1, function() {
									if (r ? (e.css("background-image", "url(" + r + ")"), e.removeAttr("data-background")) : (a && (e.attr("srcset", a), e.removeAttr("data-srcset")), e.attr("src", s), e.removeAttr("data-src")), e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), n.find(".swiper-lazy-preloader, .preloader").remove(), _.params.loop && i) {
										var t = n.attr("data-swiper-slide-index");
										if (n.hasClass(_.params.slideDuplicateClass)) {
											var o = _.wrapper.children('[data-swiper-slide-index="' + t + '"]:not(.' + _.params.slideDuplicateClass + ")");
											_.lazy.loadImageInSlide(o.index(), !1)
										} else {
											var l = _.wrapper.children("." + _.params.slideDuplicateClass + '[data-swiper-slide-index="' + t + '"]');
											_.lazy.loadImageInSlide(l.index(), !1)
										}
									}
									_.emit("onLazyImageReady", _, n[0], e[0])
								}), _.emit("onLazyImageLoad", _, n[0], e[0])
							})
						}
					},
					load: function() {
						var e;
						if (_.params.watchSlidesVisibility) _.wrapper.children("." + _.params.slideVisibleClass).each(function() {
							_.lazy.loadImageInSlide(t(this).index())
						});
						else if (_.params.slidesPerView > 1)
							for (e = _.activeIndex; e < _.activeIndex + _.params.slidesPerView; e++) _.slides[e] && _.lazy.loadImageInSlide(e);
						else _.lazy.loadImageInSlide(_.activeIndex);
						if (_.params.lazyLoadingInPrevNext)
							if (_.params.slidesPerView > 1) {
								for (e = _.activeIndex + _.params.slidesPerView; e < _.activeIndex + _.params.slidesPerView + _.params.slidesPerView; e++) _.slides[e] && _.lazy.loadImageInSlide(e);
								for (e = _.activeIndex - _.params.slidesPerView; e < _.activeIndex; e++) _.slides[e] && _.lazy.loadImageInSlide(e)
							} else {
								var i = _.wrapper.children("." + _.params.slideNextClass);
								i.length > 0 && _.lazy.loadImageInSlide(i.index());
								var n = _.wrapper.children("." + _.params.slidePrevClass);
								n.length > 0 && _.lazy.loadImageInSlide(n.index())
							}
					},
					onTransitionStart: function() {
						_.params.lazyLoading && (_.params.lazyLoadingOnTransitionStart || !_.params.lazyLoadingOnTransitionStart && !_.lazy.initialImageLoaded) && _.lazy.load()
					},
					onTransitionEnd: function() {
						_.params.lazyLoading && !_.params.lazyLoadingOnTransitionStart && _.lazy.load()
					}
				}, _.scrollbar = {
					isTouched: !1,
					setDragPosition: function(e) {
						var t = _.scrollbar,
							i = s() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
							n = i - t.track.offset()[s() ? "left" : "top"] - t.dragSize / 2,
							r = -_.minTranslate() * t.moveDivider,
							a = -_.maxTranslate() * t.moveDivider;
						r > n ? n = r : n > a && (n = a), n = -n / t.moveDivider, _.updateProgress(n), _.setWrapperTranslate(n, !0)
					},
					dragStart: function(e) {
						var t = _.scrollbar;
						t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), _.params.scrollbarHide && t.track.css("opacity", 1), _.wrapper.transition(100), t.drag.transition(100), _.emit("onScrollbarDragStart", _)
					},
					dragMove: function(e) {
						var t = _.scrollbar;
						t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), _.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), _.emit("onScrollbarDragMove", _))
					},
					dragEnd: function(e) {
						var t = _.scrollbar;
						t.isTouched && (t.isTouched = !1, _.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function() {
							t.track.css("opacity", 0), t.track.transition(400)
						}, 1e3)), _.emit("onScrollbarDragEnd", _), _.params.scrollbarSnapOnRelease && _.slideReset())
					},
					enableDraggable: function() {
						var e = _.scrollbar,
							i = _.support.touch ? e.track : document;
						t(e.track).on(_.touchEvents.start, e.dragStart), t(i).on(_.touchEvents.move, e.dragMove), t(i).on(_.touchEvents.end, e.dragEnd)
					},
					disableDraggable: function() {
						var e = _.scrollbar,
							i = _.support.touch ? e.track : document;
						t(e.track).off(_.touchEvents.start, e.dragStart), t(i).off(_.touchEvents.move, e.dragMove), t(i).off(_.touchEvents.end, e.dragEnd)
					},
					set: function() {
						if (_.params.scrollbar) {
							var e = _.scrollbar;
							e.track = t(_.params.scrollbar), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = t('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = s() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = _.size / _.virtualSize, e.moveDivider = e.divider * (e.trackSize / _.size), e.dragSize = e.trackSize * e.divider, s() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.track[0].style.display = e.divider >= 1 ? "none" : "", _.params.scrollbarHide && (e.track[0].style.opacity = 0)
						}
					},
					setTranslate: function() {
						if (_.params.scrollbar) {
							var e, t = _.scrollbar,
								i = (_.translate || 0, t.dragSize);
							e = (t.trackSize - t.dragSize) * _.progress, _.rtl && s() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : 0 > e ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), s() ? (t.drag.transform(_.support.transforms3d ? "translate3d(" + e + "px, 0, 0)" : "translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (t.drag.transform(_.support.transforms3d ? "translate3d(0px, " + e + "px, 0)" : "translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), _.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
								t.track[0].style.opacity = 0, t.track.transition(400)
							}, 1e3))
						}
					},
					setTransition: function(e) {
						_.params.scrollbar && _.scrollbar.drag.transition(e)
					}
				}, _.controller = {
					LinearSpline: function(e, t) {
						this.x = e, this.y = t, this.lastIndex = e.length - 1;
						var i, n;
						this.x.length, this.interpolate = function(e) {
							return e ? (n = r(this.x, e), i = n - 1, (e - this.x[i]) * (this.y[n] - this.y[i]) / (this.x[n] - this.x[i]) + this.y[i]) : 0
						};
						var r = function() {
							var e, t, i;
							return function(n, r) {
								for (t = -1, e = n.length; e - t > 1;) n[i = e + t >> 1] <= r ? t = i : e = i;
								return e
							}
						}()
					},
					getInterpolateFunction: function(e) {
						_.controller.spline || (_.controller.spline = _.params.loop ? new _.controller.LinearSpline(_.slidesGrid, e.slidesGrid) : new _.controller.LinearSpline(_.snapGrid, e.snapGrid))
					},
					setTranslate: function(e, t) {
						function n(t) {
							e = t.rtl && "horizontal" === t.params.direction ? -_.translate : _.translate,
								"slide" === _.params.controlBy && (_.controller.getInterpolateFunction(t), s = -_.controller.spline.interpolate(-e)), s && "container" !== _.params.controlBy || (r = (t.maxTranslate() - t.minTranslate()) / (_.maxTranslate() - _.minTranslate()), s = (e - _.minTranslate()) * r + t.minTranslate()), _.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, _), t.updateActiveIndex()
						}
						var r, s, a = _.params.control;
						if (_.isArray(a))
							for (var o = 0; o < a.length; o++) a[o] !== t && a[o] instanceof i && n(a[o]);
						else a instanceof i && t !== a && n(a)
					},
					setTransition: function(e, t) {
						function n(t) {
							t.setWrapperTransition(e, _), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function() {
								s && (t.params.loop && "slide" === _.params.controlBy && t.fixLoop(), t.onTransitionEnd())
							}))
						}
						var r, s = _.params.control;
						if (_.isArray(s))
							for (r = 0; r < s.length; r++) s[r] !== t && s[r] instanceof i && n(s[r]);
						else s instanceof i && t !== s && n(s)
					}
				}, _.hashnav = {
					init: function() {
						if (_.params.hashnav) {
							_.hashnav.initialized = !0;
							var e = document.location.hash.replace("#", "");
							if (e)
								for (var t = 0, i = 0, n = _.slides.length; n > i; i++) {
									var r = _.slides.eq(i),
										s = r.attr("data-hash");
									if (s === e && !r.hasClass(_.params.slideDuplicateClass)) {
										var a = r.index();
										_.slideTo(a, t, _.params.runCallbacksOnInit, !0)
									}
								}
						}
					},
					setHash: function() {
						_.hashnav.initialized && _.params.hashnav && (document.location.hash = _.slides.eq(_.activeIndex).attr("data-hash") || "")
					}
				}, _.disableKeyboardControl = function() {
					t(document).off("keydown", c)
				}, _.enableKeyboardControl = function() {
					t(document).on("keydown", c)
				}, _.mousewheel = {
					event: !1,
					lastScrollTime: (new window.Date).getTime()
				}, _.params.mousewheelControl) {
				try {
					new window.WheelEvent("wheel"), _.mousewheel.event = "wheel"
				} catch (N) {}
				_.mousewheel.event || void 0 === document.onmousewheel || (_.mousewheel.event = "mousewheel"), _.mousewheel.event || (_.mousewheel.event = "DOMMouseScroll")
			}
			_.disableMousewheelControl = function() {
				return _.mousewheel.event ? (_.container.off(_.mousewheel.event, p), !0) : !1
			}, _.enableMousewheelControl = function() {
				return _.mousewheel.event ? (_.container.on(_.mousewheel.event, p), !0) : !1
			}, _.parallax = {
				setTranslate: function() {
					_.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						h(this, _.progress)
					}), _.slides.each(function() {
						var e = t(this);
						e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
							var t = Math.min(Math.max(e[0].progress, -1), 1);
							h(this, t)
						})
					})
				},
				setTransition: function(e) {
					"undefined" == typeof e && (e = _.params.speed), _.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
						var i = t(this),
							n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
						0 === e && (n = 0), i.transition(n)
					})
				}
			}, _._plugins = [];
			for (var L in _.plugins) {
				var I = _.plugins[L](_, _.params[L]);
				I && _._plugins.push(I)
			}
			return _.callPlugins = function(e) {
				for (var t = 0; t < _._plugins.length; t++) e in _._plugins[t] && _._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, _.emitterEventListeners = {}, _.emit = function(e) {
				_.params[e] && _.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				var t;
				if (_.emitterEventListeners[e])
					for (t = 0; t < _.emitterEventListeners[e].length; t++) _.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				_.callPlugins && _.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}, _.on = function(e, t) {
				return e = d(e), _.emitterEventListeners[e] || (_.emitterEventListeners[e] = []), _.emitterEventListeners[e].push(t), _
			}, _.off = function(e, t) {
				var i;
				if (e = d(e), "undefined" == typeof t) return _.emitterEventListeners[e] = [], _;
				if (_.emitterEventListeners[e] && 0 !== _.emitterEventListeners[e].length) {
					for (i = 0; i < _.emitterEventListeners[e].length; i++) _.emitterEventListeners[e][i] === t && _.emitterEventListeners[e].splice(i, 1);
					return _
				}
			}, _.once = function(e, t) {
				e = d(e);
				var i = function() {
					t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), _.off(e, i)
				};
				return _.on(e, i), _
			}, _.a11y = {
				makeFocusable: function(e) {
					return e.attr("tabIndex", "0"), e
				},
				addRole: function(e, t) {
					return e.attr("role", t), e
				},
				addLabel: function(e, t) {
					return e.attr("aria-label", t), e
				},
				disable: function(e) {
					return e.attr("aria-disabled", !0), e
				},
				enable: function(e) {
					return e.attr("aria-disabled", !1), e
				},
				onEnterKey: function(e) {
					13 === e.keyCode && (t(e.target).is(_.params.nextButton) ? (_.onClickNext(e), _.a11y.notify(_.isEnd ? _.params.lastSlideMessage : _.params.nextSlideMessage)) : t(e.target).is(_.params.prevButton) && (_.onClickPrev(e), _.a11y.notify(_.isBeginning ? _.params.firstSlideMessage : _.params.prevSlideMessage)), t(e.target).is("." + _.params.bulletClass) && t(e.target)[0].click())
				},
				liveRegion: t('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
				notify: function(e) {
					var t = _.a11y.liveRegion;
					0 !== t.length && (t.html(""), t.html(e))
				},
				init: function() {
					if (_.params.nextButton) {
						var e = t(_.params.nextButton);
						_.a11y.makeFocusable(e), _.a11y.addRole(e, "button"), _.a11y.addLabel(e, _.params.nextSlideMessage)
					}
					if (_.params.prevButton) {
						var i = t(_.params.prevButton);
						_.a11y.makeFocusable(i), _.a11y.addRole(i, "button"), _.a11y.addLabel(i, _.params.prevSlideMessage)
					}
					t(_.container).append(_.a11y.liveRegion)
				},
				initPagination: function() {
					_.params.pagination && _.params.paginationClickable && _.bullets && _.bullets.length && _.bullets.each(function() {
						var e = t(this);
						_.a11y.makeFocusable(e), _.a11y.addRole(e, "button"), _.a11y.addLabel(e, _.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
					})
				},
				destroy: function() {
					_.a11y.liveRegion && _.a11y.liveRegion.length > 0 && _.a11y.liveRegion.remove()
				}
			}, _.init = function() {
				_.params.loop && _.createLoop(), _.updateContainerSize(), _.updateSlidesSize(), _.updatePagination(), _.params.scrollbar && _.scrollbar && (_.scrollbar.set(), _.params.scrollbarDraggable && _.scrollbar.enableDraggable()), "slide" !== _.params.effect && _.effects[_.params.effect] && (_.params.loop || _.updateProgress(), _.effects[_.params.effect].setTranslate()), _.params.loop ? _.slideTo(_.params.initialSlide + _.loopedSlides, 0, _.params.runCallbacksOnInit) : (_.slideTo(_.params.initialSlide, 0, _.params.runCallbacksOnInit), 0 === _.params.initialSlide && (_.parallax && _.params.parallax && _.parallax.setTranslate(), _.lazy && _.params.lazyLoading && (_.lazy.load(), _.lazy.initialImageLoaded = !0))), _.attachEvents(), _.params.observer && _.support.observer && _.initObservers(), _.params.preloadImages && !_.params.lazyLoading && _.preloadImages(), _.params.autoplay && _.startAutoplay(), _.params.keyboardControl && _.enableKeyboardControl && _.enableKeyboardControl(), _.params.mousewheelControl && _.enableMousewheelControl && _.enableMousewheelControl(), _.params.hashnav && _.hashnav && _.hashnav.init(), _.params.a11y && _.a11y && _.a11y.init(), _.emit("onInit", _)
			}, _.cleanupStyles = function() {
				_.container.removeClass(_.classNames.join(" ")).removeAttr("style"), _.wrapper.removeAttr("style"), _.slides && _.slides.length && _.slides.removeClass([_.params.slideVisibleClass, _.params.slideActiveClass, _.params.slideNextClass, _.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), _.paginationContainer && _.paginationContainer.length && _.paginationContainer.removeClass(_.params.paginationHiddenClass), _.bullets && _.bullets.length && _.bullets.removeClass(_.params.bulletActiveClass), _.params.prevButton && t(_.params.prevButton).removeClass(_.params.buttonDisabledClass), _.params.nextButton && t(_.params.nextButton).removeClass(_.params.buttonDisabledClass), _.params.scrollbar && _.scrollbar && (_.scrollbar.track && _.scrollbar.track.length && _.scrollbar.track.removeAttr("style"), _.scrollbar.drag && _.scrollbar.drag.length && _.scrollbar.drag.removeAttr("style"))
			}, _.destroy = function(e, t) {
				_.detachEvents(), _.stopAutoplay(), _.params.scrollbar && _.scrollbar && _.params.scrollbarDraggable && _.scrollbar.disableDraggable(), _.params.loop && _.destroyLoop(), t && _.cleanupStyles(), _.disconnectObservers(), _.params.keyboardControl && _.disableKeyboardControl && _.disableKeyboardControl(), _.params.mousewheelControl && _.disableMousewheelControl && _.disableMousewheelControl(), _.params.a11y && _.a11y && _.a11y.destroy(), _.emit("onDestroy"), e !== !1 && (_ = null)
			}, _.init(), _
		}
	};
	i.prototype = {
		isSafari: function() {
			var e = navigator.userAgent.toLowerCase();
			return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
		}(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
		isArray: function(e) {
			return "[object Array]" === Object.prototype.toString.apply(e)
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
		},
		device: function() {
			var e = navigator.userAgent,
				t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
				i = e.match(/(iPad).*OS\s([\d_]+)/),
				n = e.match(/(iPod)(.*OS\s([\d_]+))?/),
				r = !i && e.match(/(iPhone\sOS)\s([\d_]+)/);
			return {
				ios: i || r || n,
				android: t
			}
		}(),
		support: {
			touch: window.Modernizr && Modernizr.touch === !0 || function() {
				return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
			}(),
			transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
				var e = document.createElement("div").style;
				return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
			}(),
			flexbox: function() {
				for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++)
					if (t[i] in e) return !0
			}(),
			observer: function() {
				return "MutationObserver" in window || "WebkitMutationObserver" in window
			}()
		},
		plugins: {}
	};
	for (var n = (function() {
			var e = function(e) {
					var t = this,
						i = 0;
					for (i = 0; i < e.length; i++) t[i] = e[i];
					return t.length = e.length, this
				},
				t = function(t, i) {
					var n = [],
						r = 0;
					if (t && !i && t instanceof e) return t;
					if (t)
						if ("string" == typeof t) {
							var s, a, o = t.trim();
							if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
								var l = "div";
								for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), a = document.createElement(l), a.innerHTML = t, r = 0; r < a.childNodes.length; r++) n.push(a.childNodes[r])
							} else
								for (s = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], r = 0; r < s.length; r++) s[r] && n.push(s[r])
						} else if (t.nodeType || t === window || t === document) n.push(t);
					else if (t.length > 0 && t[0].nodeType)
						for (r = 0; r < t.length; r++) n.push(t[r]);
					return new e(n)
				};
			return e.prototype = {
				addClass: function(e) {
					if ("undefined" == typeof e) return this;
					for (var t = e.split(" "), i = 0; i < t.length; i++)
						for (var n = 0; n < this.length; n++) this[n].classList.add(t[i]);
					return this
				},
				removeClass: function(e) {
					for (var t = e.split(" "), i = 0; i < t.length; i++)
						for (var n = 0; n < this.length; n++) this[n].classList.remove(t[i]);
					return this
				},
				hasClass: function(e) {
					return this[0] ? this[0].classList.contains(e) : !1
				},
				toggleClass: function(e) {
					for (var t = e.split(" "), i = 0; i < t.length; i++)
						for (var n = 0; n < this.length; n++) this[n].classList.toggle(t[i]);
					return this
				},
				attr: function(e, t) {
					if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
					for (var i = 0; i < this.length; i++)
						if (2 === arguments.length) this[i].setAttribute(e, t);
						else
							for (var n in e) this[i][n] = e[n], this[i].setAttribute(n, e[n]);
					return this
				},
				removeAttr: function(e) {
					for (var t = 0; t < this.length; t++) this[t].removeAttribute(e);
					return this
				},
				data: function(e, t) {
					if ("undefined" == typeof t) {
						if (this[0]) {
							var i = this[0].getAttribute("data-" + e);
							return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
						}
						return void 0
					}
					for (var n = 0; n < this.length; n++) {
						var r = this[n];
						r.dom7ElementDataStorage || (r.dom7ElementDataStorage = {}), r.dom7ElementDataStorage[e] = t
					}
					return this
				},
				transform: function(e) {
					for (var t = 0; t < this.length; t++) {
						var i = this[t].style;
						i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
					}
					return this
				},
				transition: function(e) {
					"string" != typeof e && (e += "ms");
					for (var t = 0; t < this.length; t++) {
						var i = this[t].style;
						i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
					}
					return this
				},
				on: function(e, i, n, r) {
					function s(e) {
						var r = e.target;
						if (t(r).is(i)) n.call(r, e);
						else
							for (var s = t(r).parents(), a = 0; a < s.length; a++) t(s[a]).is(i) && n.call(s[a], e)
					}
					var a, o, l = e.split(" ");
					for (a = 0; a < this.length; a++)
						if ("function" == typeof i || i === !1)
							for ("function" == typeof i && (n = arguments[1], r = arguments[2] || !1), o = 0; o < l.length; o++) this[a].addEventListener(l[o], n, r);
						else
							for (o = 0; o < l.length; o++) this[a].dom7LiveListeners || (this[a].dom7LiveListeners = []), this[a].dom7LiveListeners.push({
								listener: n,
								liveListener: s
							}), this[a].addEventListener(l[o], s, r);
					return this
				},
				off: function(e, t, i, n) {
					for (var r = e.split(" "), s = 0; s < r.length; s++)
						for (var a = 0; a < this.length; a++)
							if ("function" == typeof t || t === !1) "function" == typeof t && (i = arguments[1], n = arguments[2] || !1), this[a].removeEventListener(r[s], i, n);
							else if (this[a].dom7LiveListeners)
						for (var o = 0; o < this[a].dom7LiveListeners.length; o++) this[a].dom7LiveListeners[o].listener === i && this[a].removeEventListener(r[s], this[a].dom7LiveListeners[o].liveListener, n);
					return this
				},
				once: function(e, t, i, n) {
					function r(a) {
						i(a), s.off(e, t, r, n)
					}
					var s = this;
					"function" == typeof t && (t = !1, i = arguments[1], n = arguments[2]), s.on(e, t, r, n)
				},
				trigger: function(e, t) {
					for (var i = 0; i < this.length; i++) {
						var n;
						try {
							n = new window.CustomEvent(e, {
								detail: t,
								bubbles: !0,
								cancelable: !0
							})
						} catch (r) {
							n = document.createEvent("Event"), n.initEvent(e, !0, !0), n.detail = t
						}
						this[i].dispatchEvent(n)
					}
					return this
				},
				transitionEnd: function(e) {
					function t(s) {
						if (s.target === this)
							for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
					}
					var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
						r = this;
					if (e)
						for (i = 0; i < n.length; i++) r.on(n[i], t);
					return this
				},
				width: function() {
					return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
				},
				outerWidth: function(e) {
					return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
				},
				height: function() {
					return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
				},
				outerHeight: function(e) {
					return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
				},
				offset: function() {
					if (this.length > 0) {
						var e = this[0],
							t = e.getBoundingClientRect(),
							i = document.body,
							n = e.clientTop || i.clientTop || 0,
							r = e.clientLeft || i.clientLeft || 0,
							s = window.pageYOffset || e.scrollTop,
							a = window.pageXOffset || e.scrollLeft;
						return {
							top: t.top + s - n,
							left: t.left + a - r
						}
					}
					return null
				},
				css: function(e, t) {
					var i;
					if (1 === arguments.length) {
						if ("string" != typeof e) {
							for (i = 0; i < this.length; i++)
								for (var n in e) this[i].style[n] = e[n];
							return this
						}
						if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
					}
					if (2 === arguments.length && "string" == typeof e) {
						for (i = 0; i < this.length; i++) this[i].style[e] = t;
						return this
					}
					return this
				},
				each: function(e) {
					for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
					return this
				},
				html: function(e) {
					if ("undefined" == typeof e) return this[0] ? this[0].innerHTML : void 0;
					for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
					return this
				},
				is: function(i) {
					if (!this[0]) return !1;
					var n, r;
					if ("string" == typeof i) {
						var s = this[0];
						if (s === document) return i === document;
						if (s === window) return i === window;
						if (s.matches) return s.matches(i);
						if (s.webkitMatchesSelector) return s.webkitMatchesSelector(i);
						if (s.mozMatchesSelector) return s.mozMatchesSelector(i);
						if (s.msMatchesSelector) return s.msMatchesSelector(i);
						for (n = t(i), r = 0; r < n.length; r++)
							if (n[r] === this[0]) return !0;
						return !1
					}
					if (i === document) return this[0] === document;
					if (i === window) return this[0] === window;
					if (i.nodeType || i instanceof e) {
						for (n = i.nodeType ? [i] : i, r = 0; r < n.length; r++)
							if (n[r] === this[0]) return !0;
						return !1
					}
					return !1
				},
				index: function() {
					if (this[0]) {
						for (var e = this[0], t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && t++;
						return t
					}
					return void 0
				},
				eq: function(t) {
					if ("undefined" == typeof t) return this;
					var i, n = this.length;
					return t > n - 1 ? new e([]) : 0 > t ? (i = n + t, new e(0 > i ? [] : [this[i]])) : new e([this[t]])
				},
				append: function(t) {
					var i, n;
					for (i = 0; i < this.length; i++)
						if ("string" == typeof t) {
							var r = document.createElement("div");
							for (r.innerHTML = t; r.firstChild;) this[i].appendChild(r.firstChild)
						} else if (t instanceof e)
						for (n = 0; n < t.length; n++) this[i].appendChild(t[n]);
					else this[i].appendChild(t);
					return this
				},
				prepend: function(t) {
					var i, n;
					for (i = 0; i < this.length; i++)
						if ("string" == typeof t) {
							var r = document.createElement("div");
							for (r.innerHTML = t, n = r.childNodes.length - 1; n >= 0; n--) this[i].insertBefore(r.childNodes[n], this[i].childNodes[0])
						} else if (t instanceof e)
						for (n = 0; n < t.length; n++) this[i].insertBefore(t[n], this[i].childNodes[0]);
					else this[i].insertBefore(t, this[i].childNodes[0]);
					return this
				},
				insertBefore: function(e) {
					for (var i = t(e), n = 0; n < this.length; n++)
						if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0]);
						else if (i.length > 1)
						for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r])
				},
				insertAfter: function(e) {
					for (var i = t(e), n = 0; n < this.length; n++)
						if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0].nextSibling);
						else if (i.length > 1)
						for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r].nextSibling)
				},
				next: function(i) {
					return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
				},
				nextAll: function(i) {
					var n = [],
						r = this[0];
					if (!r) return new e([]);
					for (; r.nextElementSibling;) {
						var s = r.nextElementSibling;
						i ? t(s).is(i) && n.push(s) : n.push(s), r = s
					}
					return new e(n)
				},
				prev: function(i) {
					return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
				},
				prevAll: function(i) {
					var n = [],
						r = this[0];
					if (!r) return new e([]);
					for (; r.previousElementSibling;) {
						var s = r.previousElementSibling;
						i ? t(s).is(i) && n.push(s) : n.push(s), r = s
					}
					return new e(n)
				},
				parent: function(e) {
					for (var i = [], n = 0; n < this.length; n++) e ? t(this[n].parentNode).is(e) && i.push(this[n].parentNode) : i.push(this[n].parentNode);
					return t(t.unique(i))
				},
				parents: function(e) {
					for (var i = [], n = 0; n < this.length; n++)
						for (var r = this[n].parentNode; r;) e ? t(r).is(e) && i.push(r) : i.push(r), r = r.parentNode;
					return t(t.unique(i))
				},
				find: function(t) {
					for (var i = [], n = 0; n < this.length; n++)
						for (var r = this[n].querySelectorAll(t), s = 0; s < r.length; s++) i.push(r[s]);
					return new e(i)
				},
				children: function(i) {
					for (var n = [], r = 0; r < this.length; r++)
						for (var s = this[r].childNodes, a = 0; a < s.length; a++) i ? 1 === s[a].nodeType && t(s[a]).is(i) && n.push(s[a]) : 1 === s[a].nodeType && n.push(s[a]);
					return new e(t.unique(n))
				},
				remove: function() {
					for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
					return this
				},
				add: function() {
					var e, i, n = this;
					for (e = 0; e < arguments.length; e++) {
						var r = t(arguments[e]);
						for (i = 0; i < r.length; i++) n[n.length] = r[i], n.length++
					}
					return n
				}
			}, t.fn = e.prototype, t.unique = function(e) {
				for (var t = [], i = 0; i < e.length; i++) - 1 === t.indexOf(e[i]) && t.push(e[i]);
				return t
			}, t
		}()), r = ["jQuery", "Zepto", "Dom7"], s = 0; s < r.length; s++) window[r[s]] && e(window[r[s]]);
	var a;
	a = "undefined" == typeof n ? window.Dom7 || window.Zepto || window.jQuery : n, a && ("transitionEnd" in a.fn || (a.fn.transitionEnd = function(e) {
		function t(s) {
			if (s.target === this)
				for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
		}
		var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
			r = this;
		if (e)
			for (i = 0; i < n.length; i++) r.on(n[i], t);
		return this
	}), "transform" in a.fn || (a.fn.transform = function(e) {
		for (var t = 0; t < this.length; t++) {
			var i = this[t].style;
			i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
		}
		return this
	}), "transition" in a.fn || (a.fn.transition = function(e) {
		"string" != typeof e && (e += "ms");
		for (var t = 0; t < this.length; t++) {
			var i = this[t].style;
			i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
		}
		return this
	})), window.Swiper = i
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
	"use strict";
	return window.Swiper
});
var appLang = $("html").attr("lang"),
	$body = $("body"),
	wH, wW, pixelDensity = window.devicePixelRatio || 1,
	dragging = !1,
	scrolling = !1,
	transitioning = !1,
	transitionTimer, onResizeTimer, mobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : !1,
	isIE9 = $("html").hasClass("ie9") ? !0 : !1,
	isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
	isiOS8 = navigator.userAgent.match(/(iPad|iPhone|iPod).*OS 8_\d/i),
	isChrome = navigator.userAgent.indexOf("Chrome") > -1,
	isExplorer = navigator.userAgent.indexOf("MSIE") > -1,
	isFirefox = navigator.userAgent.indexOf("Firefox") > -1,
	isSafari = navigator.userAgent.indexOf("Safari") > -1,
	isOpera = navigator.userAgent.indexOf("Presto") > -1;
isChrome && isSafari && (isSafari = !1);
var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "wheel",
	sections = [],
	currentSection = 0,
	trValues = [],
	timelineCtn = $("#timeline-ctn"),
	listItems = $("section"),
	stripe = document.getElementById("stripe"),
	iPhone = $("#video-container"),
	iPhoneTransVal, slider, lastSwipeProgress, lastViableProgress, slidesNumber, touchmoveDisabled = !1,
	tabletScroll = new TabletScroll,
	submitBtn = $("#newsletter-form button");
$(document).bind(mousewheelevt, function(e) {
	if (wW > 740) {
		e.preventDefault();
		var t = window.event || e,
			t = t.originalEvent ? t.originalEvent : t,
			i = "wheel" === t.type ? t.wheelDelta : -40 * t.detail;
		if (!transitioning) {
			t.preventDefault();
			var n;
			i > 0 ? currentSection > 0 && (currentSection--, n = !1) : 0 > i && currentSection < sections.length - 1 && (currentSection++, n = !0), 0 !== i && (transitioning = !0, sections[currentSection].animate(n))
		}
	}
}), $(document).keydown(function(e) {
	var t = [37, 38, 39, 40];
	if (!transitioning && -1 !== t.indexOf(e.which)) {
		var i;
		transitioning = !0, 37 === e.which || 38 === e.which ? currentSection > 0 && (currentSection--, i = !1) : currentSection < sections.length - 1 && (currentSection++, i = !0), sections[currentSection].animate(i)
	}
}), $(document).on("click touchend", ".nav-btn", function(e) {
	if (e.preventDefault(), !transitioning && !$(this).is(":disabled")) {
		transitioning = !0, $(".nav-btn").prop("disabled", !1);
		var t = $(this).hasClass("down") ? !0 : !1;
		t ? currentSection < sections.length - 1 && currentSection++ : currentSection > 0 && currentSection--, sections[currentSection].animate(t)
	}
}), $(document).on("click touchend", ".newsletter-btn", function(e) {
	e.preventDefault();
	var t = $(this).attr("href");
	740 >= wW ? TweenMax.to(window, .8, {
		scrollTo: {
			y: $(t).offset().top,
			autoKill: !1
		},
		ease: Quad.easeInOut
	}) : currentSection === sections.length - 1 || transitioning || (transitioning = !0, currentSection = sections.length - 1, sections[currentSection].animate(!0, !0))
}), $(document).on("submit", "#newsletter-form", function(e) {
	e.preventDefault(), submitBtn.is(":disabled") || sendForm()
}), $(document).on("click touchend", "#newsletter-form button", function(e) {
	e.preventDefault(), submitBtn.is(":disabled") || sendForm()
}), $(document).on("keyup", "#email", function(e) {
	"" !== $(this).val() ? $("#newsletter-form").addClass("sendable") : $("#newsletter-form").removeClass("sendable")
}), $(document).on("keydown", "#email", function(e) {
	e.stopPropagation(), $("#error-tag").removeClass("visible")
}), $(document).ready(function() {
	layoutSettings(), initNavigation(), isiOS ? $("html").addClass("iOS") : $(video).attr("controls", !1)
}), $(window).load(function() {
	$body.removeClass("preload")
}), $(window).resize(function() {
	layoutSettings(), getTransitionValues(), wW > 740 && (clearTimeout(onResizeTimer), onResizeTimer = setTimeout(function() {
		sections[currentSection].animate()
	}, 100))
});