function By(n, o) {
  for (var s = 0; s < o.length; s++) {
    const l = o[s];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const a in l)
        if (a !== "default" && !(a in n)) {
          const c = Object.getOwnPropertyDescriptor(l, a);
          c &&
            Object.defineProperty(
              n,
              a,
              c.get ? c : { enumerable: !0, get: () => l[a] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) l(a);
  new MutationObserver((a) => {
    for (const c of a)
      if (c.type === "childList")
        for (const f of c.addedNodes)
          f.tagName === "LINK" && f.rel === "modulepreload" && l(f);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(a) {
    const c = {};
    return (
      a.integrity && (c.integrity = a.integrity),
      a.referrerPolicy && (c.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function l(a) {
    if (a.ep) return;
    a.ep = !0;
    const c = s(a);
    fetch(a.href, c);
  }
})();
function _u(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var _a = { exports: {} },
  Qo = {},
  La = { exports: {} },
  Se = {};
var Of;
function Uy() {
  if (Of) return Se;
  Of = 1;
  var n = Symbol.for("react.element"),
    o = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    l = Symbol.for("react.strict_mode"),
    a = Symbol.for("react.profiler"),
    c = Symbol.for("react.provider"),
    f = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    w = Symbol.iterator;
  function S(j) {
    return j === null || typeof j != "object"
      ? null
      : ((j = (w && j[w]) || j["@@iterator"]),
        typeof j == "function" ? j : null);
  }
  var x = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    P = Object.assign,
    C = {};
  function N(j, D, ne) {
    ((this.props = j),
      (this.context = D),
      (this.refs = C),
      (this.updater = ne || x));
  }
  ((N.prototype.isReactComponent = {}),
    (N.prototype.setState = function (j, D) {
      if (typeof j != "object" && typeof j != "function" && j != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, j, D, "setState");
    }),
    (N.prototype.forceUpdate = function (j) {
      this.updater.enqueueForceUpdate(this, j, "forceUpdate");
    }));
  function R() {}
  R.prototype = N.prototype;
  function M(j, D, ne) {
    ((this.props = j),
      (this.context = D),
      (this.refs = C),
      (this.updater = ne || x));
  }
  var A = (M.prototype = new R());
  ((A.constructor = M), P(A, N.prototype), (A.isPureReactComponent = !0));
  var O = Array.isArray,
    W = Object.prototype.hasOwnProperty,
    F = { current: null },
    B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Y(j, D, ne) {
    var oe,
      fe = {},
      xe = null,
      ie = null;
    if (D != null)
      for (oe in (D.ref !== void 0 && (ie = D.ref),
      D.key !== void 0 && (xe = "" + D.key),
      D))
        W.call(D, oe) && !B.hasOwnProperty(oe) && (fe[oe] = D[oe]);
    var ye = arguments.length - 2;
    if (ye === 1) fe.children = ne;
    else if (1 < ye) {
      for (var be = Array(ye), Ae = 0; Ae < ye; Ae++)
        be[Ae] = arguments[Ae + 2];
      fe.children = be;
    }
    if (j && j.defaultProps)
      for (oe in ((ye = j.defaultProps), ye))
        fe[oe] === void 0 && (fe[oe] = ye[oe]);
    return {
      $$typeof: n,
      type: j,
      key: xe,
      ref: ie,
      props: fe,
      _owner: F.current,
    };
  }
  function K(j, D) {
    return {
      $$typeof: n,
      type: j.type,
      key: D,
      ref: j.ref,
      props: j.props,
      _owner: j._owner,
    };
  }
  function X(j) {
    return typeof j == "object" && j !== null && j.$$typeof === n;
  }
  function Z(j) {
    var D = { "=": "=0", ":": "=2" };
    return (
      "$" +
      j.replace(/[=:]/g, function (ne) {
        return D[ne];
      })
    );
  }
  var V = /\/+/g;
  function J(j, D) {
    return typeof j == "object" && j !== null && j.key != null
      ? Z("" + j.key)
      : D.toString(36);
  }
  function U(j, D, ne, oe, fe) {
    var xe = typeof j;
    (xe === "undefined" || xe === "boolean") && (j = null);
    var ie = !1;
    if (j === null) ie = !0;
    else
      switch (xe) {
        case "string":
        case "number":
          ie = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case n:
            case o:
              ie = !0;
          }
      }
    if (ie)
      return (
        (ie = j),
        (fe = fe(ie)),
        (j = oe === "" ? "." + J(ie, 0) : oe),
        O(fe)
          ? ((ne = ""),
            j != null && (ne = j.replace(V, "$&/") + "/"),
            U(fe, D, ne, "", function (Ae) {
              return Ae;
            }))
          : fe != null &&
            (X(fe) &&
              (fe = K(
                fe,
                ne +
                  (!fe.key || (ie && ie.key === fe.key)
                    ? ""
                    : ("" + fe.key).replace(V, "$&/") + "/") +
                  j,
              )),
            D.push(fe)),
        1
      );
    if (((ie = 0), (oe = oe === "" ? "." : oe + ":"), O(j)))
      for (var ye = 0; ye < j.length; ye++) {
        xe = j[ye];
        var be = oe + J(xe, ye);
        ie += U(xe, D, ne, be, fe);
      }
    else if (((be = S(j)), typeof be == "function"))
      for (j = be.call(j), ye = 0; !(xe = j.next()).done; )
        ((xe = xe.value),
          (be = oe + J(xe, ye++)),
          (ie += U(xe, D, ne, be, fe)));
    else if (xe === "object")
      throw (
        (D = String(j)),
        Error(
          "Objects are not valid as a React child (found: " +
            (D === "[object Object]"
              ? "object with keys {" + Object.keys(j).join(", ") + "}"
              : D) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return ie;
  }
  function me(j, D, ne) {
    if (j == null) return j;
    var oe = [],
      fe = 0;
    return (
      U(j, oe, "", "", function (xe) {
        return D.call(ne, xe, fe++);
      }),
      oe
    );
  }
  function ue(j) {
    if (j._status === -1) {
      var D = j._result;
      ((D = D()),
        D.then(
          function (ne) {
            (j._status === 0 || j._status === -1) &&
              ((j._status = 1), (j._result = ne));
          },
          function (ne) {
            (j._status === 0 || j._status === -1) &&
              ((j._status = 2), (j._result = ne));
          },
        ),
        j._status === -1 && ((j._status = 0), (j._result = D)));
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ae = { current: null },
    z = { transition: null },
    H = {
      ReactCurrentDispatcher: ae,
      ReactCurrentBatchConfig: z,
      ReactCurrentOwner: F,
    };
  function q() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (Se.Children = {
      map: me,
      forEach: function (j, D, ne) {
        me(
          j,
          function () {
            D.apply(this, arguments);
          },
          ne,
        );
      },
      count: function (j) {
        var D = 0;
        return (
          me(j, function () {
            D++;
          }),
          D
        );
      },
      toArray: function (j) {
        return (
          me(j, function (D) {
            return D;
          }) || []
        );
      },
      only: function (j) {
        if (!X(j))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return j;
      },
    }),
    (Se.Component = N),
    (Se.Fragment = s),
    (Se.Profiler = a),
    (Se.PureComponent = M),
    (Se.StrictMode = l),
    (Se.Suspense = m),
    (Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H),
    (Se.act = q),
    (Se.cloneElement = function (j, D, ne) {
      if (j == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            j +
            ".",
        );
      var oe = P({}, j.props),
        fe = j.key,
        xe = j.ref,
        ie = j._owner;
      if (D != null) {
        if (
          (D.ref !== void 0 && ((xe = D.ref), (ie = F.current)),
          D.key !== void 0 && (fe = "" + D.key),
          j.type && j.type.defaultProps)
        )
          var ye = j.type.defaultProps;
        for (be in D)
          W.call(D, be) &&
            !B.hasOwnProperty(be) &&
            (oe[be] = D[be] === void 0 && ye !== void 0 ? ye[be] : D[be]);
      }
      var be = arguments.length - 2;
      if (be === 1) oe.children = ne;
      else if (1 < be) {
        ye = Array(be);
        for (var Ae = 0; Ae < be; Ae++) ye[Ae] = arguments[Ae + 2];
        oe.children = ye;
      }
      return {
        $$typeof: n,
        type: j.type,
        key: fe,
        ref: xe,
        props: oe,
        _owner: ie,
      };
    }),
    (Se.createContext = function (j) {
      return (
        (j = {
          $$typeof: f,
          _currentValue: j,
          _currentValue2: j,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (j.Provider = { $$typeof: c, _context: j }),
        (j.Consumer = j)
      );
    }),
    (Se.createElement = Y),
    (Se.createFactory = function (j) {
      var D = Y.bind(null, j);
      return ((D.type = j), D);
    }),
    (Se.createRef = function () {
      return { current: null };
    }),
    (Se.forwardRef = function (j) {
      return { $$typeof: p, render: j };
    }),
    (Se.isValidElement = X),
    (Se.lazy = function (j) {
      return { $$typeof: v, _payload: { _status: -1, _result: j }, _init: ue };
    }),
    (Se.memo = function (j, D) {
      return { $$typeof: g, type: j, compare: D === void 0 ? null : D };
    }),
    (Se.startTransition = function (j) {
      var D = z.transition;
      z.transition = {};
      try {
        j();
      } finally {
        z.transition = D;
      }
    }),
    (Se.unstable_act = q),
    (Se.useCallback = function (j, D) {
      return ae.current.useCallback(j, D);
    }),
    (Se.useContext = function (j) {
      return ae.current.useContext(j);
    }),
    (Se.useDebugValue = function () {}),
    (Se.useDeferredValue = function (j) {
      return ae.current.useDeferredValue(j);
    }),
    (Se.useEffect = function (j, D) {
      return ae.current.useEffect(j, D);
    }),
    (Se.useId = function () {
      return ae.current.useId();
    }),
    (Se.useImperativeHandle = function (j, D, ne) {
      return ae.current.useImperativeHandle(j, D, ne);
    }),
    (Se.useInsertionEffect = function (j, D) {
      return ae.current.useInsertionEffect(j, D);
    }),
    (Se.useLayoutEffect = function (j, D) {
      return ae.current.useLayoutEffect(j, D);
    }),
    (Se.useMemo = function (j, D) {
      return ae.current.useMemo(j, D);
    }),
    (Se.useReducer = function (j, D, ne) {
      return ae.current.useReducer(j, D, ne);
    }),
    (Se.useRef = function (j) {
      return ae.current.useRef(j);
    }),
    (Se.useState = function (j) {
      return ae.current.useState(j);
    }),
    (Se.useSyncExternalStore = function (j, D, ne) {
      return ae.current.useSyncExternalStore(j, D, ne);
    }),
    (Se.useTransition = function () {
      return ae.current.useTransition();
    }),
    (Se.version = "18.3.1"),
    Se
  );
}
var If;
function Lu() {
  return (If || ((If = 1), (La.exports = Uy())), La.exports);
}
var Df;
function Vy() {
  if (Df) return Qo;
  Df = 1;
  var n = Lu(),
    o = Symbol.for("react.element"),
    s = Symbol.for("react.fragment"),
    l = Object.prototype.hasOwnProperty,
    a = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    c = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(p, m, g) {
    var v,
      w = {},
      S = null,
      x = null;
    (g !== void 0 && (S = "" + g),
      m.key !== void 0 && (S = "" + m.key),
      m.ref !== void 0 && (x = m.ref));
    for (v in m) l.call(m, v) && !c.hasOwnProperty(v) && (w[v] = m[v]);
    if (p && p.defaultProps)
      for (v in ((m = p.defaultProps), m)) w[v] === void 0 && (w[v] = m[v]);
    return {
      $$typeof: o,
      type: p,
      key: S,
      ref: x,
      props: w,
      _owner: a.current,
    };
  }
  return ((Qo.Fragment = s), (Qo.jsx = f), (Qo.jsxs = f), Qo);
}
var Ff;
function Hy() {
  return (Ff || ((Ff = 1), (_a.exports = Vy())), _a.exports);
}
var h = Hy(),
  bi = {},
  Oa = { exports: {} },
  pt = {},
  Ia = { exports: {} },
  Da = {};
var zf;
function Wy() {
  return (
    zf ||
      ((zf = 1),
      (function (n) {
        function o(z, H) {
          var q = z.length;
          z.push(H);
          e: for (; 0 < q; ) {
            var j = (q - 1) >>> 1,
              D = z[j];
            if (0 < a(D, H)) ((z[j] = H), (z[q] = D), (q = j));
            else break e;
          }
        }
        function s(z) {
          return z.length === 0 ? null : z[0];
        }
        function l(z) {
          if (z.length === 0) return null;
          var H = z[0],
            q = z.pop();
          if (q !== H) {
            z[0] = q;
            e: for (var j = 0, D = z.length, ne = D >>> 1; j < ne; ) {
              var oe = 2 * (j + 1) - 1,
                fe = z[oe],
                xe = oe + 1,
                ie = z[xe];
              if (0 > a(fe, q))
                xe < D && 0 > a(ie, fe)
                  ? ((z[j] = ie), (z[xe] = q), (j = xe))
                  : ((z[j] = fe), (z[oe] = q), (j = oe));
              else if (xe < D && 0 > a(ie, q))
                ((z[j] = ie), (z[xe] = q), (j = xe));
              else break e;
            }
          }
          return H;
        }
        function a(z, H) {
          var q = z.sortIndex - H.sortIndex;
          return q !== 0 ? q : z.id - H.id;
        }
        if (
          typeof performance == "object" &&
          typeof performance.now == "function"
        ) {
          var c = performance;
          n.unstable_now = function () {
            return c.now();
          };
        } else {
          var f = Date,
            p = f.now();
          n.unstable_now = function () {
            return f.now() - p;
          };
        }
        var m = [],
          g = [],
          v = 1,
          w = null,
          S = 3,
          x = !1,
          P = !1,
          C = !1,
          N = typeof setTimeout == "function" ? setTimeout : null,
          R = typeof clearTimeout == "function" ? clearTimeout : null,
          M = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function A(z) {
          for (var H = s(g); H !== null; ) {
            if (H.callback === null) l(g);
            else if (H.startTime <= z)
              (l(g), (H.sortIndex = H.expirationTime), o(m, H));
            else break;
            H = s(g);
          }
        }
        function O(z) {
          if (((C = !1), A(z), !P))
            if (s(m) !== null) ((P = !0), ue(W));
            else {
              var H = s(g);
              H !== null && ae(O, H.startTime - z);
            }
        }
        function W(z, H) {
          ((P = !1), C && ((C = !1), R(Y), (Y = -1)), (x = !0));
          var q = S;
          try {
            for (
              A(H), w = s(m);
              w !== null && (!(w.expirationTime > H) || (z && !Z()));

            ) {
              var j = w.callback;
              if (typeof j == "function") {
                ((w.callback = null), (S = w.priorityLevel));
                var D = j(w.expirationTime <= H);
                ((H = n.unstable_now()),
                  typeof D == "function"
                    ? (w.callback = D)
                    : w === s(m) && l(m),
                  A(H));
              } else l(m);
              w = s(m);
            }
            if (w !== null) var ne = !0;
            else {
              var oe = s(g);
              (oe !== null && ae(O, oe.startTime - H), (ne = !1));
            }
            return ne;
          } finally {
            ((w = null), (S = q), (x = !1));
          }
        }
        var F = !1,
          B = null,
          Y = -1,
          K = 5,
          X = -1;
        function Z() {
          return !(n.unstable_now() - X < K);
        }
        function V() {
          if (B !== null) {
            var z = n.unstable_now();
            X = z;
            var H = !0;
            try {
              H = B(!0, z);
            } finally {
              H ? J() : ((F = !1), (B = null));
            }
          } else F = !1;
        }
        var J;
        if (typeof M == "function")
          J = function () {
            M(V);
          };
        else if (typeof MessageChannel < "u") {
          var U = new MessageChannel(),
            me = U.port2;
          ((U.port1.onmessage = V),
            (J = function () {
              me.postMessage(null);
            }));
        } else
          J = function () {
            N(V, 0);
          };
        function ue(z) {
          ((B = z), F || ((F = !0), J()));
        }
        function ae(z, H) {
          Y = N(function () {
            z(n.unstable_now());
          }, H);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (z) {
            z.callback = null;
          }),
          (n.unstable_continueExecution = function () {
            P || x || ((P = !0), ue(W));
          }),
          (n.unstable_forceFrameRate = function (z) {
            0 > z || 125 < z
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (K = 0 < z ? Math.floor(1e3 / z) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (n.unstable_getFirstCallbackNode = function () {
            return s(m);
          }),
          (n.unstable_next = function (z) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var H = 3;
                break;
              default:
                H = S;
            }
            var q = S;
            S = H;
            try {
              return z();
            } finally {
              S = q;
            }
          }),
          (n.unstable_pauseExecution = function () {}),
          (n.unstable_requestPaint = function () {}),
          (n.unstable_runWithPriority = function (z, H) {
            switch (z) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                z = 3;
            }
            var q = S;
            S = z;
            try {
              return H();
            } finally {
              S = q;
            }
          }),
          (n.unstable_scheduleCallback = function (z, H, q) {
            var j = n.unstable_now();
            switch (
              (typeof q == "object" && q !== null
                ? ((q = q.delay),
                  (q = typeof q == "number" && 0 < q ? j + q : j))
                : (q = j),
              z)
            ) {
              case 1:
                var D = -1;
                break;
              case 2:
                D = 250;
                break;
              case 5:
                D = 1073741823;
                break;
              case 4:
                D = 1e4;
                break;
              default:
                D = 5e3;
            }
            return (
              (D = q + D),
              (z = {
                id: v++,
                callback: H,
                priorityLevel: z,
                startTime: q,
                expirationTime: D,
                sortIndex: -1,
              }),
              q > j
                ? ((z.sortIndex = q),
                  o(g, z),
                  s(m) === null &&
                    z === s(g) &&
                    (C ? (R(Y), (Y = -1)) : (C = !0), ae(O, q - j)))
                : ((z.sortIndex = D), o(m, z), P || x || ((P = !0), ue(W))),
              z
            );
          }),
          (n.unstable_shouldYield = Z),
          (n.unstable_wrapCallback = function (z) {
            var H = S;
            return function () {
              var q = S;
              S = H;
              try {
                return z.apply(this, arguments);
              } finally {
                S = q;
              }
            };
          }));
      })(Da)),
    Da
  );
}
var Bf;
function $y() {
  return (Bf || ((Bf = 1), (Ia.exports = Wy())), Ia.exports);
}
var Uf;
function Qy() {
  if (Uf) return pt;
  Uf = 1;
  var n = Lu(),
    o = $y();
  function s(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        r = 1;
      r < arguments.length;
      r++
    )
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var l = new Set(),
    a = {};
  function c(e, t) {
    (f(e, t), f(e + "Capture", t));
  }
  function f(e, t) {
    for (a[e] = t, e = 0; e < t.length; e++) l.add(t[e]);
  }
  var p = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    m = Object.prototype.hasOwnProperty,
    g =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    v = {},
    w = {};
  function S(e) {
    return m.call(w, e)
      ? !0
      : m.call(v, e)
        ? !1
        : g.test(e)
          ? (w[e] = !0)
          : ((v[e] = !0), !1);
  }
  function x(e, t, r, i) {
    if (r !== null && r.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return i
          ? !1
          : r !== null
            ? !r.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function P(e, t, r, i) {
    if (t === null || typeof t > "u" || x(e, t, r, i)) return !0;
    if (i) return !1;
    if (r !== null)
      switch (r.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function C(e, t, r, i, u, d, y) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = i),
      (this.attributeNamespace = u),
      (this.mustUseProperty = r),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = d),
      (this.removeEmptyString = y));
  }
  var N = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      N[e] = new C(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      N[t] = new C(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        N[e] = new C(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      N[e] = new C(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        N[e] = new C(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      N[e] = new C(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      N[e] = new C(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      N[e] = new C(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      N[e] = new C(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var R = /[\-:]([a-z])/g;
  function M(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(R, M);
      N[t] = new C(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(R, M);
        N[t] = new C(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(R, M);
      N[t] = new C(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      N[e] = new C(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (N.xlinkHref = new C(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1,
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      N[e] = new C(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function A(e, t, r, i) {
    var u = N.hasOwnProperty(t) ? N[t] : null;
    (u !== null
      ? u.type !== 0
      : i ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (P(t, r, u, i) && (r = null),
      i || u === null
        ? S(t) &&
          (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
        : u.mustUseProperty
          ? (e[u.propertyName] = r === null ? (u.type === 3 ? !1 : "") : r)
          : ((t = u.attributeName),
            (i = u.attributeNamespace),
            r === null
              ? e.removeAttribute(t)
              : ((u = u.type),
                (r = u === 3 || (u === 4 && r === !0) ? "" : "" + r),
                i ? e.setAttributeNS(i, t, r) : e.setAttribute(t, r))));
  }
  var O = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    W = Symbol.for("react.element"),
    F = Symbol.for("react.portal"),
    B = Symbol.for("react.fragment"),
    Y = Symbol.for("react.strict_mode"),
    K = Symbol.for("react.profiler"),
    X = Symbol.for("react.provider"),
    Z = Symbol.for("react.context"),
    V = Symbol.for("react.forward_ref"),
    J = Symbol.for("react.suspense"),
    U = Symbol.for("react.suspense_list"),
    me = Symbol.for("react.memo"),
    ue = Symbol.for("react.lazy"),
    ae = Symbol.for("react.offscreen"),
    z = Symbol.iterator;
  function H(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (z && e[z]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var q = Object.assign,
    j;
  function D(e) {
    if (j === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        j = (t && t[1]) || "";
      }
    return (
      `
` +
      j +
      e
    );
  }
  var ne = !1;
  function oe(e, t) {
    if (!e || ne) return "";
    ne = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (I) {
            var i = I;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (I) {
            i = I;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (I) {
          i = I;
        }
        e();
      }
    } catch (I) {
      if (I && i && typeof I.stack == "string") {
        for (
          var u = I.stack.split(`
`),
            d = i.stack.split(`
`),
            y = u.length - 1,
            E = d.length - 1;
          1 <= y && 0 <= E && u[y] !== d[E];

        )
          E--;
        for (; 1 <= y && 0 <= E; y--, E--)
          if (u[y] !== d[E]) {
            if (y !== 1 || E !== 1)
              do
                if ((y--, E--, 0 > E || u[y] !== d[E])) {
                  var k =
                    `
` + u[y].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      k.includes("<anonymous>") &&
                      (k = k.replace("<anonymous>", e.displayName)),
                    k
                  );
                }
              while (1 <= y && 0 <= E);
            break;
          }
      }
    } finally {
      ((ne = !1), (Error.prepareStackTrace = r));
    }
    return (e = e ? e.displayName || e.name : "") ? D(e) : "";
  }
  function fe(e) {
    switch (e.tag) {
      case 5:
        return D(e.type);
      case 16:
        return D("Lazy");
      case 13:
        return D("Suspense");
      case 19:
        return D("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = oe(e.type, !1)), e);
      case 11:
        return ((e = oe(e.type.render, !1)), e);
      case 1:
        return ((e = oe(e.type, !0)), e);
      default:
        return "";
    }
  }
  function xe(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case B:
        return "Fragment";
      case F:
        return "Portal";
      case K:
        return "Profiler";
      case Y:
        return "StrictMode";
      case J:
        return "Suspense";
      case U:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Z:
          return (e.displayName || "Context") + ".Consumer";
        case X:
          return (e._context.displayName || "Context") + ".Provider";
        case V:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case me:
          return (
            (t = e.displayName || null),
            t !== null ? t : xe(e.type) || "Memo"
          );
        case ue:
          ((t = e._payload), (e = e._init));
          try {
            return xe(e(t));
          } catch {}
      }
    return null;
  }
  function ie(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return xe(t);
      case 8:
        return t === Y ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function ye(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function be(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Ae(e) {
    var t = be(e) ? "checked" : "value",
      r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      i = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof r < "u" &&
      typeof r.get == "function" &&
      typeof r.set == "function"
    ) {
      var u = r.get,
        d = r.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (y) {
            ((i = "" + y), d.call(this, y));
          },
        }),
        Object.defineProperty(e, t, { enumerable: r.enumerable }),
        {
          getValue: function () {
            return i;
          },
          setValue: function (y) {
            i = "" + y;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function St(e) {
    e._valueTracker || (e._valueTracker = Ae(e));
  }
  function Sn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(),
      i = "";
    return (
      e && (i = be(e) ? (e.checked ? "true" : "false") : e.value),
      (e = i),
      e !== r ? (t.setValue(e), !0) : !1
    );
  }
  function Ct(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function so(e, t) {
    var r = t.checked;
    return q({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: r ?? e._wrapperState.initialChecked,
    });
  }
  function ls(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue,
      i = t.checked != null ? t.checked : t.defaultChecked;
    ((r = ye(t.value != null ? t.value : r)),
      (e._wrapperState = {
        initialChecked: i,
        initialValue: r,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function io(e, t) {
    ((t = t.checked), t != null && A(e, "checked", t, !1));
  }
  function lo(e, t) {
    io(e, t);
    var r = ye(t.value),
      i = t.type;
    if (r != null)
      i === "number"
        ? ((r === 0 && e.value === "") || e.value != r) && (e.value = "" + r)
        : e.value !== "" + r && (e.value = "" + r);
    else if (i === "submit" || i === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? ao(e, t.type, r)
      : t.hasOwnProperty("defaultValue") && ao(e, t.type, ye(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function br(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var i = t.type;
      if (
        !(
          (i !== "submit" && i !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      ((t = "" + e._wrapperState.initialValue),
        r || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((r = e.name),
      r !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      r !== "" && (e.name = r));
  }
  function ao(e, t, r) {
    (t !== "number" || Ct(e.ownerDocument) !== e) &&
      (r == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Cn = Array.isArray;
  function Et(e, t, r, i) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < r.length; u++) t["$" + r[u]] = !0;
      for (r = 0; r < e.length; r++)
        ((u = t.hasOwnProperty("$" + e[r].value)),
          e[r].selected !== u && (e[r].selected = u),
          u && i && (e[r].defaultSelected = !0));
    } else {
      for (r = "" + ye(r), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === r) {
          ((e[u].selected = !0), i && (e[u].defaultSelected = !0));
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Sr(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(s(91));
    return q({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function $t(e, t) {
    var r = t.value;
    if (r == null) {
      if (((r = t.children), (t = t.defaultValue), r != null)) {
        if (t != null) throw Error(s(92));
        if (Cn(r)) {
          if (1 < r.length) throw Error(s(93));
          r = r[0];
        }
        t = r;
      }
      (t == null && (t = ""), (r = t));
    }
    e._wrapperState = { initialValue: ye(r) };
  }
  function as(e, t) {
    var r = ye(t.value),
      i = ye(t.defaultValue);
    (r != null &&
      ((r = "" + r),
      r !== e.value && (e.value = r),
      t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
      i != null && (e.defaultValue = "" + i));
  }
  function us(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function tt(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Qt(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? tt(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Cr,
    cs = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, r, i, u) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, r, i, u);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Cr = Cr || document.createElement("div"),
            Cr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Cr.firstChild;
          e.firstChild;

        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function qt(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var tr = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    ds = ["Webkit", "ms", "Moz", "O"];
  Object.keys(tr).forEach(function (e) {
    ds.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (tr[t] = tr[e]));
    });
  });
  function Er(e, t, r) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : r || typeof t != "number" || t === 0 || (tr.hasOwnProperty(e) && tr[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function un(e, t) {
    e = e.style;
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var i = r.indexOf("--") === 0,
          u = Er(r, t[r], i);
        (r === "float" && (r = "cssFloat"),
          i ? e.setProperty(r, u) : (e[r] = u));
      }
  }
  var fs = q(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function Kt(e, t) {
    if (t) {
      if (fs[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(s(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(s(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(s(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(s(62));
    }
  }
  function uo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var co = null;
  function Nr(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var kr = null,
    En = null,
    Yt = null;
  function Mt(e) {
    if ((e = Mo(e))) {
      if (typeof kr != "function") throw Error(s(280));
      var t = e.stateNode;
      t && ((t = Is(t)), kr(e.stateNode, e.type, t));
    }
  }
  function ps(e) {
    En ? (Yt ? Yt.push(e) : (Yt = [e])) : (En = e);
  }
  function ve() {
    if (En) {
      var e = En,
        t = Yt;
      if (((Yt = En = null), Mt(e), t)) for (e = 0; e < t.length; e++) Mt(t[e]);
    }
  }
  function Ne(e, t) {
    return e(t);
  }
  function Pe() {}
  var nt = !1;
  function it(e, t, r) {
    if (nt) return e(t, r);
    nt = !0;
    try {
      return Ne(e, t, r);
    } finally {
      ((nt = !1), (En !== null || Yt !== null) && (Pe(), ve()));
    }
  }
  function lt(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var i = Is(r);
    if (i === null) return null;
    r = i[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((i = !i.disabled) ||
          ((e = e.type),
          (i = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !i));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(s(231, t, typeof r));
    return r;
  }
  var At = !1;
  if (p)
    try {
      var Ke = {};
      (Object.defineProperty(Ke, "passive", {
        get: function () {
          At = !0;
        },
      }),
        window.addEventListener("test", Ke, Ke),
        window.removeEventListener("test", Ke, Ke));
    } catch {
      At = !1;
    }
  function Gt(e, t, r, i, u, d, y, E, k) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, I);
    } catch (Q) {
      this.onError(Q);
    }
  }
  var fo = !1,
    hs = null,
    ms = !1,
    Xi = null,
    qm = {
      onError: function (e) {
        ((fo = !0), (hs = e));
      },
    };
  function Km(e, t, r, i, u, d, y, E, k) {
    ((fo = !1), (hs = null), Gt.apply(qm, arguments));
  }
  function Ym(e, t, r, i, u, d, y, E, k) {
    if ((Km.apply(this, arguments), fo)) {
      if (fo) {
        var I = hs;
        ((fo = !1), (hs = null));
      } else throw Error(s(198));
      ms || ((ms = !0), (Xi = I));
    }
  }
  function nr(e) {
    var t = e,
      r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (r = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function rc(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function oc(e) {
    if (nr(e) !== e) throw Error(s(188));
  }
  function Gm(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = nr(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var r = e, i = t; ; ) {
      var u = r.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (((i = u.return), i !== null)) {
          r = i;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === r) return (oc(u), e);
          if (d === i) return (oc(u), t);
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (r.return !== i.return) ((r = u), (i = d));
      else {
        for (var y = !1, E = u.child; E; ) {
          if (E === r) {
            ((y = !0), (r = u), (i = d));
            break;
          }
          if (E === i) {
            ((y = !0), (i = u), (r = d));
            break;
          }
          E = E.sibling;
        }
        if (!y) {
          for (E = d.child; E; ) {
            if (E === r) {
              ((y = !0), (r = d), (i = u));
              break;
            }
            if (E === i) {
              ((y = !0), (i = d), (r = u));
              break;
            }
            E = E.sibling;
          }
          if (!y) throw Error(s(189));
        }
      }
      if (r.alternate !== i) throw Error(s(190));
    }
    if (r.tag !== 3) throw Error(s(188));
    return r.stateNode.current === r ? e : t;
  }
  function sc(e) {
    return ((e = Gm(e)), e !== null ? ic(e) : null);
  }
  function ic(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = ic(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var lc = o.unstable_scheduleCallback,
    ac = o.unstable_cancelCallback,
    Jm = o.unstable_shouldYield,
    Xm = o.unstable_requestPaint,
    Fe = o.unstable_now,
    Zm = o.unstable_getCurrentPriorityLevel,
    Zi = o.unstable_ImmediatePriority,
    uc = o.unstable_UserBlockingPriority,
    gs = o.unstable_NormalPriority,
    eg = o.unstable_LowPriority,
    cc = o.unstable_IdlePriority,
    ys = null,
    Jt = null;
  function tg(e) {
    if (Jt && typeof Jt.onCommitFiberRoot == "function")
      try {
        Jt.onCommitFiberRoot(ys, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var _t = Math.clz32 ? Math.clz32 : og,
    ng = Math.log,
    rg = Math.LN2;
  function og(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((ng(e) / rg) | 0)) | 0);
  }
  var vs = 64,
    xs = 4194304;
  function po(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function ws(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var i = 0,
      u = e.suspendedLanes,
      d = e.pingedLanes,
      y = r & 268435455;
    if (y !== 0) {
      var E = y & ~u;
      E !== 0 ? (i = po(E)) : ((d &= y), d !== 0 && (i = po(d)));
    } else ((y = r & ~u), y !== 0 ? (i = po(y)) : d !== 0 && (i = po(d)));
    if (i === 0) return 0;
    if (
      t !== 0 &&
      t !== i &&
      (t & u) === 0 &&
      ((u = i & -i), (d = t & -t), u >= d || (u === 16 && (d & 4194240) !== 0))
    )
      return t;
    if (((i & 4) !== 0 && (i |= r & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= i; 0 < t; )
        ((r = 31 - _t(t)), (u = 1 << r), (i |= e[r]), (t &= ~u));
    return i;
  }
  function sg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ig(e, t) {
    for (
      var r = e.suspendedLanes,
        i = e.pingedLanes,
        u = e.expirationTimes,
        d = e.pendingLanes;
      0 < d;

    ) {
      var y = 31 - _t(d),
        E = 1 << y,
        k = u[y];
      (k === -1
        ? ((E & r) === 0 || (E & i) !== 0) && (u[y] = sg(E, t))
        : k <= t && (e.expiredLanes |= E),
        (d &= ~E));
    }
  }
  function el(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function dc() {
    var e = vs;
    return ((vs <<= 1), (vs & 4194240) === 0 && (vs = 64), e);
  }
  function tl(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function ho(e, t, r) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - _t(t)),
      (e[t] = r));
  }
  function lg(e, t) {
    var r = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var i = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var u = 31 - _t(r),
        d = 1 << u;
      ((t[u] = 0), (i[u] = -1), (e[u] = -1), (r &= ~d));
    }
  }
  function nl(e, t) {
    var r = (e.entangledLanes |= t);
    for (e = e.entanglements; r; ) {
      var i = 31 - _t(r),
        u = 1 << i;
      ((u & t) | (e[i] & t) && (e[i] |= t), (r &= ~u));
    }
  }
  var ke = 0;
  function fc(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var pc,
    rl,
    hc,
    mc,
    gc,
    ol = !1,
    bs = [],
    Nn = null,
    kn = null,
    Pn = null,
    mo = new Map(),
    go = new Map(),
    jn = [],
    ag =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function yc(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Nn = null;
        break;
      case "dragenter":
      case "dragleave":
        kn = null;
        break;
      case "mouseover":
      case "mouseout":
        Pn = null;
        break;
      case "pointerover":
      case "pointerout":
        mo.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        go.delete(t.pointerId);
    }
  }
  function yo(e, t, r, i, u, d) {
    return e === null || e.nativeEvent !== d
      ? ((e = {
          blockedOn: t,
          domEventName: r,
          eventSystemFlags: i,
          nativeEvent: d,
          targetContainers: [u],
        }),
        t !== null && ((t = Mo(t)), t !== null && rl(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function ug(e, t, r, i, u) {
    switch (t) {
      case "focusin":
        return ((Nn = yo(Nn, e, t, r, i, u)), !0);
      case "dragenter":
        return ((kn = yo(kn, e, t, r, i, u)), !0);
      case "mouseover":
        return ((Pn = yo(Pn, e, t, r, i, u)), !0);
      case "pointerover":
        var d = u.pointerId;
        return (mo.set(d, yo(mo.get(d) || null, e, t, r, i, u)), !0);
      case "gotpointercapture":
        return (
          (d = u.pointerId),
          go.set(d, yo(go.get(d) || null, e, t, r, i, u)),
          !0
        );
    }
    return !1;
  }
  function vc(e) {
    var t = rr(e.target);
    if (t !== null) {
      var r = nr(t);
      if (r !== null) {
        if (((t = r.tag), t === 13)) {
          if (((t = rc(r)), t !== null)) {
            ((e.blockedOn = t),
              gc(e.priority, function () {
                hc(r);
              }));
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ss(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = il(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var i = new r.constructor(r.type, r);
        ((co = i), r.target.dispatchEvent(i), (co = null));
      } else return ((t = Mo(r)), t !== null && rl(t), (e.blockedOn = r), !1);
      t.shift();
    }
    return !0;
  }
  function xc(e, t, r) {
    Ss(e) && r.delete(t);
  }
  function cg() {
    ((ol = !1),
      Nn !== null && Ss(Nn) && (Nn = null),
      kn !== null && Ss(kn) && (kn = null),
      Pn !== null && Ss(Pn) && (Pn = null),
      mo.forEach(xc),
      go.forEach(xc));
  }
  function vo(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ol ||
        ((ol = !0),
        o.unstable_scheduleCallback(o.unstable_NormalPriority, cg)));
  }
  function xo(e) {
    function t(u) {
      return vo(u, e);
    }
    if (0 < bs.length) {
      vo(bs[0], e);
      for (var r = 1; r < bs.length; r++) {
        var i = bs[r];
        i.blockedOn === e && (i.blockedOn = null);
      }
    }
    for (
      Nn !== null && vo(Nn, e),
        kn !== null && vo(kn, e),
        Pn !== null && vo(Pn, e),
        mo.forEach(t),
        go.forEach(t),
        r = 0;
      r < jn.length;
      r++
    )
      ((i = jn[r]), i.blockedOn === e && (i.blockedOn = null));
    for (; 0 < jn.length && ((r = jn[0]), r.blockedOn === null); )
      (vc(r), r.blockedOn === null && jn.shift());
  }
  var Pr = O.ReactCurrentBatchConfig,
    Cs = !0;
  function dg(e, t, r, i) {
    var u = ke,
      d = Pr.transition;
    Pr.transition = null;
    try {
      ((ke = 1), sl(e, t, r, i));
    } finally {
      ((ke = u), (Pr.transition = d));
    }
  }
  function fg(e, t, r, i) {
    var u = ke,
      d = Pr.transition;
    Pr.transition = null;
    try {
      ((ke = 4), sl(e, t, r, i));
    } finally {
      ((ke = u), (Pr.transition = d));
    }
  }
  function sl(e, t, r, i) {
    if (Cs) {
      var u = il(e, t, r, i);
      if (u === null) (Cl(e, t, i, Es, r), yc(e, i));
      else if (ug(u, e, t, r, i)) i.stopPropagation();
      else if ((yc(e, i), t & 4 && -1 < ag.indexOf(e))) {
        for (; u !== null; ) {
          var d = Mo(u);
          if (
            (d !== null && pc(d),
            (d = il(e, t, r, i)),
            d === null && Cl(e, t, i, Es, r),
            d === u)
          )
            break;
          u = d;
        }
        u !== null && i.stopPropagation();
      } else Cl(e, t, i, null, r);
    }
  }
  var Es = null;
  function il(e, t, r, i) {
    if (((Es = null), (e = Nr(i)), (e = rr(e)), e !== null))
      if (((t = nr(e)), t === null)) e = null;
      else if (((r = t.tag), r === 13)) {
        if (((e = rc(t)), e !== null)) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Es = e), null);
  }
  function wc(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Zm()) {
          case Zi:
            return 1;
          case uc:
            return 4;
          case gs:
          case eg:
            return 16;
          case cc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Tn = null,
    ll = null,
    Ns = null;
  function bc() {
    if (Ns) return Ns;
    var e,
      t = ll,
      r = t.length,
      i,
      u = "value" in Tn ? Tn.value : Tn.textContent,
      d = u.length;
    for (e = 0; e < r && t[e] === u[e]; e++);
    var y = r - e;
    for (i = 1; i <= y && t[r - i] === u[d - i]; i++);
    return (Ns = u.slice(e, 1 < i ? 1 - i : void 0));
  }
  function ks(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ps() {
    return !0;
  }
  function Sc() {
    return !1;
  }
  function gt(e) {
    function t(r, i, u, d, y) {
      ((this._reactName = r),
        (this._targetInst = u),
        (this.type = i),
        (this.nativeEvent = d),
        (this.target = y),
        (this.currentTarget = null));
      for (var E in e)
        e.hasOwnProperty(E) && ((r = e[E]), (this[E] = r ? r(d) : d[E]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Ps
          : Sc),
        (this.isPropagationStopped = Sc),
        this
      );
    }
    return (
      q(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = Ps));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = Ps));
        },
        persist: function () {},
        isPersistent: Ps,
      }),
      t
    );
  }
  var jr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    al = gt(jr),
    wo = q({}, jr, { view: 0, detail: 0 }),
    pg = gt(wo),
    ul,
    cl,
    bo,
    js = q({}, wo, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: fl,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== bo &&
              (bo && e.type === "mousemove"
                ? ((ul = e.screenX - bo.screenX), (cl = e.screenY - bo.screenY))
                : (cl = ul = 0),
              (bo = e)),
            ul);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : cl;
      },
    }),
    Cc = gt(js),
    hg = q({}, js, { dataTransfer: 0 }),
    mg = gt(hg),
    gg = q({}, wo, { relatedTarget: 0 }),
    dl = gt(gg),
    yg = q({}, jr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    vg = gt(yg),
    xg = q({}, jr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    wg = gt(xg),
    bg = q({}, jr, { data: 0 }),
    Ec = gt(bg),
    Sg = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Cg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Eg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ng(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Eg[e])
        ? !!t[e]
        : !1;
  }
  function fl() {
    return Ng;
  }
  var kg = q({}, wo, {
      key: function (e) {
        if (e.key) {
          var t = Sg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = ks(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Cg[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: fl,
      charCode: function (e) {
        return e.type === "keypress" ? ks(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? ks(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Pg = gt(kg),
    jg = q({}, js, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Nc = gt(jg),
    Tg = q({}, wo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: fl,
    }),
    Rg = gt(Tg),
    Mg = q({}, jr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ag = gt(Mg),
    _g = q({}, js, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Lg = gt(_g),
    Og = [9, 13, 27, 32],
    pl = p && "CompositionEvent" in window,
    So = null;
  p && "documentMode" in document && (So = document.documentMode);
  var Ig = p && "TextEvent" in window && !So,
    kc = p && (!pl || (So && 8 < So && 11 >= So)),
    Pc = " ",
    jc = !1;
  function Tc(e, t) {
    switch (e) {
      case "keyup":
        return Og.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rc(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Tr = !1;
  function Dg(e, t) {
    switch (e) {
      case "compositionend":
        return Rc(t);
      case "keypress":
        return t.which !== 32 ? null : ((jc = !0), Pc);
      case "textInput":
        return ((e = t.data), e === Pc && jc ? null : e);
      default:
        return null;
    }
  }
  function Fg(e, t) {
    if (Tr)
      return e === "compositionend" || (!pl && Tc(e, t))
        ? ((e = bc()), (Ns = ll = Tn = null), (Tr = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return kc && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var zg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Mc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!zg[e.type] : t === "textarea";
  }
  function Ac(e, t, r, i) {
    (ps(i),
      (t = _s(t, "onChange")),
      0 < t.length &&
        ((r = new al("onChange", "change", null, r, i)),
        e.push({ event: r, listeners: t })));
  }
  var Co = null,
    Eo = null;
  function Bg(e) {
    Gc(e, 0);
  }
  function Ts(e) {
    var t = Lr(e);
    if (Sn(t)) return e;
  }
  function Ug(e, t) {
    if (e === "change") return t;
  }
  var _c = !1;
  if (p) {
    var hl;
    if (p) {
      var ml = "oninput" in document;
      if (!ml) {
        var Lc = document.createElement("div");
        (Lc.setAttribute("oninput", "return;"),
          (ml = typeof Lc.oninput == "function"));
      }
      hl = ml;
    } else hl = !1;
    _c = hl && (!document.documentMode || 9 < document.documentMode);
  }
  function Oc() {
    Co && (Co.detachEvent("onpropertychange", Ic), (Eo = Co = null));
  }
  function Ic(e) {
    if (e.propertyName === "value" && Ts(Eo)) {
      var t = [];
      (Ac(t, Eo, e, Nr(e)), it(Bg, t));
    }
  }
  function Vg(e, t, r) {
    e === "focusin"
      ? (Oc(), (Co = t), (Eo = r), Co.attachEvent("onpropertychange", Ic))
      : e === "focusout" && Oc();
  }
  function Hg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ts(Eo);
  }
  function Wg(e, t) {
    if (e === "click") return Ts(t);
  }
  function $g(e, t) {
    if (e === "input" || e === "change") return Ts(t);
  }
  function Qg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Lt = typeof Object.is == "function" ? Object.is : Qg;
  function No(e, t) {
    if (Lt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var r = Object.keys(e),
      i = Object.keys(t);
    if (r.length !== i.length) return !1;
    for (i = 0; i < r.length; i++) {
      var u = r[i];
      if (!m.call(t, u) || !Lt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Dc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Fc(e, t) {
    var r = Dc(e);
    e = 0;
    for (var i; r; ) {
      if (r.nodeType === 3) {
        if (((i = e + r.textContent.length), e <= t && i >= t))
          return { node: r, offset: t - e };
        e = i;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Dc(r);
    }
  }
  function zc(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? zc(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Bc() {
    for (var e = window, t = Ct(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = Ct(e.document);
    }
    return t;
  }
  function gl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function qg(e) {
    var t = Bc(),
      r = e.focusedElem,
      i = e.selectionRange;
    if (
      t !== r &&
      r &&
      r.ownerDocument &&
      zc(r.ownerDocument.documentElement, r)
    ) {
      if (i !== null && gl(r)) {
        if (
          ((t = i.start),
          (e = i.end),
          e === void 0 && (e = t),
          "selectionStart" in r)
        )
          ((r.selectionStart = t),
            (r.selectionEnd = Math.min(e, r.value.length)));
        else if (
          ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var u = r.textContent.length,
            d = Math.min(i.start, u);
          ((i = i.end === void 0 ? d : Math.min(i.end, u)),
            !e.extend && d > i && ((u = i), (i = d), (d = u)),
            (u = Fc(r, d)));
          var y = Fc(r, i);
          u &&
            y &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== u.node ||
              e.anchorOffset !== u.offset ||
              e.focusNode !== y.node ||
              e.focusOffset !== y.offset) &&
            ((t = t.createRange()),
            t.setStart(u.node, u.offset),
            e.removeAllRanges(),
            d > i
              ? (e.addRange(t), e.extend(y.node, y.offset))
              : (t.setEnd(y.node, y.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
        ((e = t[r]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var Kg = p && "documentMode" in document && 11 >= document.documentMode,
    Rr = null,
    yl = null,
    ko = null,
    vl = !1;
  function Uc(e, t, r) {
    var i =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    vl ||
      Rr == null ||
      Rr !== Ct(i) ||
      ((i = Rr),
      "selectionStart" in i && gl(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset,
          })),
      (ko && No(ko, i)) ||
        ((ko = i),
        (i = _s(yl, "onSelect")),
        0 < i.length &&
          ((t = new al("onSelect", "select", null, t, r)),
          e.push({ event: t, listeners: i }),
          (t.target = Rr))));
  }
  function Rs(e, t) {
    var r = {};
    return (
      (r[e.toLowerCase()] = t.toLowerCase()),
      (r["Webkit" + e] = "webkit" + t),
      (r["Moz" + e] = "moz" + t),
      r
    );
  }
  var Mr = {
      animationend: Rs("Animation", "AnimationEnd"),
      animationiteration: Rs("Animation", "AnimationIteration"),
      animationstart: Rs("Animation", "AnimationStart"),
      transitionend: Rs("Transition", "TransitionEnd"),
    },
    xl = {},
    Vc = {};
  p &&
    ((Vc = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Mr.animationend.animation,
      delete Mr.animationiteration.animation,
      delete Mr.animationstart.animation),
    "TransitionEvent" in window || delete Mr.transitionend.transition);
  function Ms(e) {
    if (xl[e]) return xl[e];
    if (!Mr[e]) return e;
    var t = Mr[e],
      r;
    for (r in t) if (t.hasOwnProperty(r) && r in Vc) return (xl[e] = t[r]);
    return e;
  }
  var Hc = Ms("animationend"),
    Wc = Ms("animationiteration"),
    $c = Ms("animationstart"),
    Qc = Ms("transitionend"),
    qc = new Map(),
    Kc =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Rn(e, t) {
    (qc.set(e, t), c(t, [e]));
  }
  for (var wl = 0; wl < Kc.length; wl++) {
    var bl = Kc[wl],
      Yg = bl.toLowerCase(),
      Gg = bl[0].toUpperCase() + bl.slice(1);
    Rn(Yg, "on" + Gg);
  }
  (Rn(Hc, "onAnimationEnd"),
    Rn(Wc, "onAnimationIteration"),
    Rn($c, "onAnimationStart"),
    Rn("dblclick", "onDoubleClick"),
    Rn("focusin", "onFocus"),
    Rn("focusout", "onBlur"),
    Rn(Qc, "onTransitionEnd"),
    f("onMouseEnter", ["mouseout", "mouseover"]),
    f("onMouseLeave", ["mouseout", "mouseover"]),
    f("onPointerEnter", ["pointerout", "pointerover"]),
    f("onPointerLeave", ["pointerout", "pointerover"]),
    c(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    c(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    c(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    c(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    c(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Po =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Jg = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Po),
    );
  function Yc(e, t, r) {
    var i = e.type || "unknown-event";
    ((e.currentTarget = r), Ym(i, t, void 0, e), (e.currentTarget = null));
  }
  function Gc(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var i = e[r],
        u = i.event;
      i = i.listeners;
      e: {
        var d = void 0;
        if (t)
          for (var y = i.length - 1; 0 <= y; y--) {
            var E = i[y],
              k = E.instance,
              I = E.currentTarget;
            if (((E = E.listener), k !== d && u.isPropagationStopped()))
              break e;
            (Yc(u, E, I), (d = k));
          }
        else
          for (y = 0; y < i.length; y++) {
            if (
              ((E = i[y]),
              (k = E.instance),
              (I = E.currentTarget),
              (E = E.listener),
              k !== d && u.isPropagationStopped())
            )
              break e;
            (Yc(u, E, I), (d = k));
          }
      }
    }
    if (ms) throw ((e = Xi), (ms = !1), (Xi = null), e);
  }
  function Te(e, t) {
    var r = t[Tl];
    r === void 0 && (r = t[Tl] = new Set());
    var i = e + "__bubble";
    r.has(i) || (Jc(t, e, 2, !1), r.add(i));
  }
  function Sl(e, t, r) {
    var i = 0;
    (t && (i |= 4), Jc(r, e, i, t));
  }
  var As = "_reactListening" + Math.random().toString(36).slice(2);
  function jo(e) {
    if (!e[As]) {
      ((e[As] = !0),
        l.forEach(function (r) {
          r !== "selectionchange" && (Jg.has(r) || Sl(r, !1, e), Sl(r, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[As] || ((t[As] = !0), Sl("selectionchange", !1, t));
    }
  }
  function Jc(e, t, r, i) {
    switch (wc(t)) {
      case 1:
        var u = dg;
        break;
      case 4:
        u = fg;
        break;
      default:
        u = sl;
    }
    ((r = u.bind(null, t, r, e)),
      (u = void 0),
      !At ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      i
        ? u !== void 0
          ? e.addEventListener(t, r, { capture: !0, passive: u })
          : e.addEventListener(t, r, !0)
        : u !== void 0
          ? e.addEventListener(t, r, { passive: u })
          : e.addEventListener(t, r, !1));
  }
  function Cl(e, t, r, i, u) {
    var d = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var y = i.tag;
        if (y === 3 || y === 4) {
          var E = i.stateNode.containerInfo;
          if (E === u || (E.nodeType === 8 && E.parentNode === u)) break;
          if (y === 4)
            for (y = i.return; y !== null; ) {
              var k = y.tag;
              if (
                (k === 3 || k === 4) &&
                ((k = y.stateNode.containerInfo),
                k === u || (k.nodeType === 8 && k.parentNode === u))
              )
                return;
              y = y.return;
            }
          for (; E !== null; ) {
            if (((y = rr(E)), y === null)) return;
            if (((k = y.tag), k === 5 || k === 6)) {
              i = d = y;
              continue e;
            }
            E = E.parentNode;
          }
        }
        i = i.return;
      }
    it(function () {
      var I = d,
        Q = Nr(r),
        G = [];
      e: {
        var $ = qc.get(e);
        if ($ !== void 0) {
          var re = al,
            le = e;
          switch (e) {
            case "keypress":
              if (ks(r) === 0) break e;
            case "keydown":
            case "keyup":
              re = Pg;
              break;
            case "focusin":
              ((le = "focus"), (re = dl));
              break;
            case "focusout":
              ((le = "blur"), (re = dl));
              break;
            case "beforeblur":
            case "afterblur":
              re = dl;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              re = Cc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              re = mg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              re = Rg;
              break;
            case Hc:
            case Wc:
            case $c:
              re = vg;
              break;
            case Qc:
              re = Ag;
              break;
            case "scroll":
              re = pg;
              break;
            case "wheel":
              re = Lg;
              break;
            case "copy":
            case "cut":
            case "paste":
              re = wg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              re = Nc;
          }
          var ce = (t & 4) !== 0,
            ze = !ce && e === "scroll",
            _ = ce ? ($ !== null ? $ + "Capture" : null) : $;
          ce = [];
          for (var T = I, L; T !== null; ) {
            L = T;
            var ee = L.stateNode;
            if (
              (L.tag === 5 &&
                ee !== null &&
                ((L = ee),
                _ !== null &&
                  ((ee = lt(T, _)), ee != null && ce.push(To(T, ee, L)))),
              ze)
            )
              break;
            T = T.return;
          }
          0 < ce.length &&
            (($ = new re($, le, null, r, Q)),
            G.push({ event: $, listeners: ce }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            (($ = e === "mouseover" || e === "pointerover"),
            (re = e === "mouseout" || e === "pointerout"),
            $ &&
              r !== co &&
              (le = r.relatedTarget || r.fromElement) &&
              (rr(le) || le[cn]))
          )
            break e;
          if (
            (re || $) &&
            (($ =
              Q.window === Q
                ? Q
                : ($ = Q.ownerDocument)
                  ? $.defaultView || $.parentWindow
                  : window),
            re
              ? ((le = r.relatedTarget || r.toElement),
                (re = I),
                (le = le ? rr(le) : null),
                le !== null &&
                  ((ze = nr(le)),
                  le !== ze || (le.tag !== 5 && le.tag !== 6)) &&
                  (le = null))
              : ((re = null), (le = I)),
            re !== le)
          ) {
            if (
              ((ce = Cc),
              (ee = "onMouseLeave"),
              (_ = "onMouseEnter"),
              (T = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ce = Nc),
                (ee = "onPointerLeave"),
                (_ = "onPointerEnter"),
                (T = "pointer")),
              (ze = re == null ? $ : Lr(re)),
              (L = le == null ? $ : Lr(le)),
              ($ = new ce(ee, T + "leave", re, r, Q)),
              ($.target = ze),
              ($.relatedTarget = L),
              (ee = null),
              rr(Q) === I &&
                ((ce = new ce(_, T + "enter", le, r, Q)),
                (ce.target = L),
                (ce.relatedTarget = ze),
                (ee = ce)),
              (ze = ee),
              re && le)
            )
              t: {
                for (ce = re, _ = le, T = 0, L = ce; L; L = Ar(L)) T++;
                for (L = 0, ee = _; ee; ee = Ar(ee)) L++;
                for (; 0 < T - L; ) ((ce = Ar(ce)), T--);
                for (; 0 < L - T; ) ((_ = Ar(_)), L--);
                for (; T--; ) {
                  if (ce === _ || (_ !== null && ce === _.alternate)) break t;
                  ((ce = Ar(ce)), (_ = Ar(_)));
                }
                ce = null;
              }
            else ce = null;
            (re !== null && Xc(G, $, re, ce, !1),
              le !== null && ze !== null && Xc(G, ze, le, ce, !0));
          }
        }
        e: {
          if (
            (($ = I ? Lr(I) : window),
            (re = $.nodeName && $.nodeName.toLowerCase()),
            re === "select" || (re === "input" && $.type === "file"))
          )
            var de = Ug;
          else if (Mc($))
            if (_c) de = $g;
            else {
              de = Hg;
              var pe = Vg;
            }
          else
            (re = $.nodeName) &&
              re.toLowerCase() === "input" &&
              ($.type === "checkbox" || $.type === "radio") &&
              (de = Wg);
          if (de && (de = de(e, I))) {
            Ac(G, de, r, Q);
            break e;
          }
          (pe && pe(e, $, I),
            e === "focusout" &&
              (pe = $._wrapperState) &&
              pe.controlled &&
              $.type === "number" &&
              ao($, "number", $.value));
        }
        switch (((pe = I ? Lr(I) : window), e)) {
          case "focusin":
            (Mc(pe) || pe.contentEditable === "true") &&
              ((Rr = pe), (yl = I), (ko = null));
            break;
          case "focusout":
            ko = yl = Rr = null;
            break;
          case "mousedown":
            vl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((vl = !1), Uc(G, r, Q));
            break;
          case "selectionchange":
            if (Kg) break;
          case "keydown":
          case "keyup":
            Uc(G, r, Q);
        }
        var he;
        if (pl)
          e: {
            switch (e) {
              case "compositionstart":
                var ge = "onCompositionStart";
                break e;
              case "compositionend":
                ge = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ge = "onCompositionUpdate";
                break e;
            }
            ge = void 0;
          }
        else
          Tr
            ? Tc(e, r) && (ge = "onCompositionEnd")
            : e === "keydown" &&
              r.keyCode === 229 &&
              (ge = "onCompositionStart");
        (ge &&
          (kc &&
            r.locale !== "ko" &&
            (Tr || ge !== "onCompositionStart"
              ? ge === "onCompositionEnd" && Tr && (he = bc())
              : ((Tn = Q),
                (ll = "value" in Tn ? Tn.value : Tn.textContent),
                (Tr = !0))),
          (pe = _s(I, ge)),
          0 < pe.length &&
            ((ge = new Ec(ge, e, null, r, Q)),
            G.push({ event: ge, listeners: pe }),
            he
              ? (ge.data = he)
              : ((he = Rc(r)), he !== null && (ge.data = he)))),
          (he = Ig ? Dg(e, r) : Fg(e, r)) &&
            ((I = _s(I, "onBeforeInput")),
            0 < I.length &&
              ((Q = new Ec("onBeforeInput", "beforeinput", null, r, Q)),
              G.push({ event: Q, listeners: I }),
              (Q.data = he))));
      }
      Gc(G, t);
    });
  }
  function To(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function _s(e, t) {
    for (var r = t + "Capture", i = []; e !== null; ) {
      var u = e,
        d = u.stateNode;
      (u.tag === 5 &&
        d !== null &&
        ((u = d),
        (d = lt(e, r)),
        d != null && i.unshift(To(e, d, u)),
        (d = lt(e, t)),
        d != null && i.push(To(e, d, u))),
        (e = e.return));
    }
    return i;
  }
  function Ar(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Xc(e, t, r, i, u) {
    for (var d = t._reactName, y = []; r !== null && r !== i; ) {
      var E = r,
        k = E.alternate,
        I = E.stateNode;
      if (k !== null && k === i) break;
      (E.tag === 5 &&
        I !== null &&
        ((E = I),
        u
          ? ((k = lt(r, d)), k != null && y.unshift(To(r, k, E)))
          : u || ((k = lt(r, d)), k != null && y.push(To(r, k, E)))),
        (r = r.return));
    }
    y.length !== 0 && e.push({ event: t, listeners: y });
  }
  var Xg = /\r\n?/g,
    Zg = /\u0000|\uFFFD/g;
  function Zc(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Xg,
        `
`,
      )
      .replace(Zg, "");
  }
  function Ls(e, t, r) {
    if (((t = Zc(t)), Zc(e) !== t && r)) throw Error(s(425));
  }
  function Os() {}
  var El = null,
    Nl = null;
  function kl(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Pl = typeof setTimeout == "function" ? setTimeout : void 0,
    ey = typeof clearTimeout == "function" ? clearTimeout : void 0,
    ed = typeof Promise == "function" ? Promise : void 0,
    ty =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof ed < "u"
          ? function (e) {
              return ed.resolve(null).then(e).catch(ny);
            }
          : Pl;
  function ny(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function jl(e, t) {
    var r = t,
      i = 0;
    do {
      var u = r.nextSibling;
      if ((e.removeChild(r), u && u.nodeType === 8))
        if (((r = u.data), r === "/$")) {
          if (i === 0) {
            (e.removeChild(u), xo(t));
            return;
          }
          i--;
        } else (r !== "$" && r !== "$?" && r !== "$!") || i++;
      r = u;
    } while (r);
    xo(t);
  }
  function Mn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function td(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0) return e;
          t--;
        } else r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var _r = Math.random().toString(36).slice(2),
    Xt = "__reactFiber$" + _r,
    Ro = "__reactProps$" + _r,
    cn = "__reactContainer$" + _r,
    Tl = "__reactEvents$" + _r,
    ry = "__reactListeners$" + _r,
    oy = "__reactHandles$" + _r;
  function rr(e) {
    var t = e[Xt];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if ((t = r[cn] || r[Xt])) {
        if (
          ((r = t.alternate),
          t.child !== null || (r !== null && r.child !== null))
        )
          for (e = td(e); e !== null; ) {
            if ((r = e[Xt])) return r;
            e = td(e);
          }
        return t;
      }
      ((e = r), (r = e.parentNode));
    }
    return null;
  }
  function Mo(e) {
    return (
      (e = e[Xt] || e[cn]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function Lr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Is(e) {
    return e[Ro] || null;
  }
  var Rl = [],
    Or = -1;
  function An(e) {
    return { current: e };
  }
  function Re(e) {
    0 > Or || ((e.current = Rl[Or]), (Rl[Or] = null), Or--);
  }
  function je(e, t) {
    (Or++, (Rl[Or] = e.current), (e.current = t));
  }
  var _n = {},
    Je = An(_n),
    at = An(!1),
    or = _n;
  function Ir(e, t) {
    var r = e.type.contextTypes;
    if (!r) return _n;
    var i = e.stateNode;
    if (i && i.__reactInternalMemoizedUnmaskedChildContext === t)
      return i.__reactInternalMemoizedMaskedChildContext;
    var u = {},
      d;
    for (d in r) u[d] = t[d];
    return (
      i &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = u)),
      u
    );
  }
  function ut(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function Ds() {
    (Re(at), Re(Je));
  }
  function nd(e, t, r) {
    if (Je.current !== _n) throw Error(s(168));
    (je(Je, t), je(at, r));
  }
  function rd(e, t, r) {
    var i = e.stateNode;
    if (((t = t.childContextTypes), typeof i.getChildContext != "function"))
      return r;
    i = i.getChildContext();
    for (var u in i) if (!(u in t)) throw Error(s(108, ie(e) || "Unknown", u));
    return q({}, r, i);
  }
  function Fs(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        _n),
      (or = Je.current),
      je(Je, e),
      je(at, at.current),
      !0
    );
  }
  function od(e, t, r) {
    var i = e.stateNode;
    if (!i) throw Error(s(169));
    (r
      ? ((e = rd(e, t, or)),
        (i.__reactInternalMemoizedMergedChildContext = e),
        Re(at),
        Re(Je),
        je(Je, e))
      : Re(at),
      je(at, r));
  }
  var dn = null,
    zs = !1,
    Ml = !1;
  function sd(e) {
    dn === null ? (dn = [e]) : dn.push(e);
  }
  function sy(e) {
    ((zs = !0), sd(e));
  }
  function Ln() {
    if (!Ml && dn !== null) {
      Ml = !0;
      var e = 0,
        t = ke;
      try {
        var r = dn;
        for (ke = 1; e < r.length; e++) {
          var i = r[e];
          do i = i(!0);
          while (i !== null);
        }
        ((dn = null), (zs = !1));
      } catch (u) {
        throw (dn !== null && (dn = dn.slice(e + 1)), lc(Zi, Ln), u);
      } finally {
        ((ke = t), (Ml = !1));
      }
    }
    return null;
  }
  var Dr = [],
    Fr = 0,
    Bs = null,
    Us = 0,
    Nt = [],
    kt = 0,
    sr = null,
    fn = 1,
    pn = "";
  function ir(e, t) {
    ((Dr[Fr++] = Us), (Dr[Fr++] = Bs), (Bs = e), (Us = t));
  }
  function id(e, t, r) {
    ((Nt[kt++] = fn), (Nt[kt++] = pn), (Nt[kt++] = sr), (sr = e));
    var i = fn;
    e = pn;
    var u = 32 - _t(i) - 1;
    ((i &= ~(1 << u)), (r += 1));
    var d = 32 - _t(t) + u;
    if (30 < d) {
      var y = u - (u % 5);
      ((d = (i & ((1 << y) - 1)).toString(32)),
        (i >>= y),
        (u -= y),
        (fn = (1 << (32 - _t(t) + u)) | (r << u) | i),
        (pn = d + e));
    } else ((fn = (1 << d) | (r << u) | i), (pn = e));
  }
  function Al(e) {
    e.return !== null && (ir(e, 1), id(e, 1, 0));
  }
  function _l(e) {
    for (; e === Bs; )
      ((Bs = Dr[--Fr]), (Dr[Fr] = null), (Us = Dr[--Fr]), (Dr[Fr] = null));
    for (; e === sr; )
      ((sr = Nt[--kt]),
        (Nt[kt] = null),
        (pn = Nt[--kt]),
        (Nt[kt] = null),
        (fn = Nt[--kt]),
        (Nt[kt] = null));
  }
  var yt = null,
    vt = null,
    _e = !1,
    Ot = null;
  function ld(e, t) {
    var r = Rt(5, null, null, 0);
    ((r.elementType = "DELETED"),
      (r.stateNode = t),
      (r.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
  }
  function ad(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return (
          (t =
            t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (yt = e), (vt = Mn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (yt = e), (vt = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((r = sr !== null ? { id: fn, overflow: pn } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: r,
                retryLane: 1073741824,
              }),
              (r = Rt(18, null, null, 0)),
              (r.stateNode = t),
              (r.return = e),
              (e.child = r),
              (yt = e),
              (vt = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ll(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Ol(e) {
    if (_e) {
      var t = vt;
      if (t) {
        var r = t;
        if (!ad(e, t)) {
          if (Ll(e)) throw Error(s(418));
          t = Mn(r.nextSibling);
          var i = yt;
          t && ad(e, t)
            ? ld(i, r)
            : ((e.flags = (e.flags & -4097) | 2), (_e = !1), (yt = e));
        }
      } else {
        if (Ll(e)) throw Error(s(418));
        ((e.flags = (e.flags & -4097) | 2), (_e = !1), (yt = e));
      }
    }
  }
  function ud(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
      e = e.return;
    yt = e;
  }
  function Vs(e) {
    if (e !== yt) return !1;
    if (!_e) return (ud(e), (_e = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !kl(e.type, e.memoizedProps))),
      t && (t = vt))
    ) {
      if (Ll(e)) throw (cd(), Error(s(418)));
      for (; t; ) (ld(e, t), (t = Mn(t.nextSibling)));
    }
    if ((ud(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                vt = Mn(e.nextSibling);
                break e;
              }
              t--;
            } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        vt = null;
      }
    } else vt = yt ? Mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function cd() {
    for (var e = vt; e; ) e = Mn(e.nextSibling);
  }
  function zr() {
    ((vt = yt = null), (_e = !1));
  }
  function Il(e) {
    Ot === null ? (Ot = [e]) : Ot.push(e);
  }
  var iy = O.ReactCurrentBatchConfig;
  function Ao(e, t, r) {
    if (
      ((e = r.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (r._owner) {
        if (((r = r._owner), r)) {
          if (r.tag !== 1) throw Error(s(309));
          var i = r.stateNode;
        }
        if (!i) throw Error(s(147, e));
        var u = i,
          d = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === d
          ? t.ref
          : ((t = function (y) {
              var E = u.refs;
              y === null ? delete E[d] : (E[d] = y);
            }),
            (t._stringRef = d),
            t);
      }
      if (typeof e != "string") throw Error(s(284));
      if (!r._owner) throw Error(s(290, e));
    }
    return e;
  }
  function Hs(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        s(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function dd(e) {
    var t = e._init;
    return t(e._payload);
  }
  function fd(e) {
    function t(_, T) {
      if (e) {
        var L = _.deletions;
        L === null ? ((_.deletions = [T]), (_.flags |= 16)) : L.push(T);
      }
    }
    function r(_, T) {
      if (!e) return null;
      for (; T !== null; ) (t(_, T), (T = T.sibling));
      return null;
    }
    function i(_, T) {
      for (_ = new Map(); T !== null; )
        (T.key !== null ? _.set(T.key, T) : _.set(T.index, T), (T = T.sibling));
      return _;
    }
    function u(_, T) {
      return ((_ = Vn(_, T)), (_.index = 0), (_.sibling = null), _);
    }
    function d(_, T, L) {
      return (
        (_.index = L),
        e
          ? ((L = _.alternate),
            L !== null
              ? ((L = L.index), L < T ? ((_.flags |= 2), T) : L)
              : ((_.flags |= 2), T))
          : ((_.flags |= 1048576), T)
      );
    }
    function y(_) {
      return (e && _.alternate === null && (_.flags |= 2), _);
    }
    function E(_, T, L, ee) {
      return T === null || T.tag !== 6
        ? ((T = Pa(L, _.mode, ee)), (T.return = _), T)
        : ((T = u(T, L)), (T.return = _), T);
    }
    function k(_, T, L, ee) {
      var de = L.type;
      return de === B
        ? Q(_, T, L.props.children, ee, L.key)
        : T !== null &&
            (T.elementType === de ||
              (typeof de == "object" &&
                de !== null &&
                de.$$typeof === ue &&
                dd(de) === T.type))
          ? ((ee = u(T, L.props)), (ee.ref = Ao(_, T, L)), (ee.return = _), ee)
          : ((ee = pi(L.type, L.key, L.props, null, _.mode, ee)),
            (ee.ref = Ao(_, T, L)),
            (ee.return = _),
            ee);
    }
    function I(_, T, L, ee) {
      return T === null ||
        T.tag !== 4 ||
        T.stateNode.containerInfo !== L.containerInfo ||
        T.stateNode.implementation !== L.implementation
        ? ((T = ja(L, _.mode, ee)), (T.return = _), T)
        : ((T = u(T, L.children || [])), (T.return = _), T);
    }
    function Q(_, T, L, ee, de) {
      return T === null || T.tag !== 7
        ? ((T = hr(L, _.mode, ee, de)), (T.return = _), T)
        : ((T = u(T, L)), (T.return = _), T);
    }
    function G(_, T, L) {
      if ((typeof T == "string" && T !== "") || typeof T == "number")
        return ((T = Pa("" + T, _.mode, L)), (T.return = _), T);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case W:
            return (
              (L = pi(T.type, T.key, T.props, null, _.mode, L)),
              (L.ref = Ao(_, null, T)),
              (L.return = _),
              L
            );
          case F:
            return ((T = ja(T, _.mode, L)), (T.return = _), T);
          case ue:
            var ee = T._init;
            return G(_, ee(T._payload), L);
        }
        if (Cn(T) || H(T))
          return ((T = hr(T, _.mode, L, null)), (T.return = _), T);
        Hs(_, T);
      }
      return null;
    }
    function $(_, T, L, ee) {
      var de = T !== null ? T.key : null;
      if ((typeof L == "string" && L !== "") || typeof L == "number")
        return de !== null ? null : E(_, T, "" + L, ee);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case W:
            return L.key === de ? k(_, T, L, ee) : null;
          case F:
            return L.key === de ? I(_, T, L, ee) : null;
          case ue:
            return ((de = L._init), $(_, T, de(L._payload), ee));
        }
        if (Cn(L) || H(L)) return de !== null ? null : Q(_, T, L, ee, null);
        Hs(_, L);
      }
      return null;
    }
    function re(_, T, L, ee, de) {
      if ((typeof ee == "string" && ee !== "") || typeof ee == "number")
        return ((_ = _.get(L) || null), E(T, _, "" + ee, de));
      if (typeof ee == "object" && ee !== null) {
        switch (ee.$$typeof) {
          case W:
            return (
              (_ = _.get(ee.key === null ? L : ee.key) || null),
              k(T, _, ee, de)
            );
          case F:
            return (
              (_ = _.get(ee.key === null ? L : ee.key) || null),
              I(T, _, ee, de)
            );
          case ue:
            var pe = ee._init;
            return re(_, T, L, pe(ee._payload), de);
        }
        if (Cn(ee) || H(ee))
          return ((_ = _.get(L) || null), Q(T, _, ee, de, null));
        Hs(T, ee);
      }
      return null;
    }
    function le(_, T, L, ee) {
      for (
        var de = null, pe = null, he = T, ge = (T = 0), qe = null;
        he !== null && ge < L.length;
        ge++
      ) {
        he.index > ge ? ((qe = he), (he = null)) : (qe = he.sibling);
        var Ee = $(_, he, L[ge], ee);
        if (Ee === null) {
          he === null && (he = qe);
          break;
        }
        (e && he && Ee.alternate === null && t(_, he),
          (T = d(Ee, T, ge)),
          pe === null ? (de = Ee) : (pe.sibling = Ee),
          (pe = Ee),
          (he = qe));
      }
      if (ge === L.length) return (r(_, he), _e && ir(_, ge), de);
      if (he === null) {
        for (; ge < L.length; ge++)
          ((he = G(_, L[ge], ee)),
            he !== null &&
              ((T = d(he, T, ge)),
              pe === null ? (de = he) : (pe.sibling = he),
              (pe = he)));
        return (_e && ir(_, ge), de);
      }
      for (he = i(_, he); ge < L.length; ge++)
        ((qe = re(he, _, ge, L[ge], ee)),
          qe !== null &&
            (e &&
              qe.alternate !== null &&
              he.delete(qe.key === null ? ge : qe.key),
            (T = d(qe, T, ge)),
            pe === null ? (de = qe) : (pe.sibling = qe),
            (pe = qe)));
      return (
        e &&
          he.forEach(function (Hn) {
            return t(_, Hn);
          }),
        _e && ir(_, ge),
        de
      );
    }
    function ce(_, T, L, ee) {
      var de = H(L);
      if (typeof de != "function") throw Error(s(150));
      if (((L = de.call(L)), L == null)) throw Error(s(151));
      for (
        var pe = (de = null), he = T, ge = (T = 0), qe = null, Ee = L.next();
        he !== null && !Ee.done;
        ge++, Ee = L.next()
      ) {
        he.index > ge ? ((qe = he), (he = null)) : (qe = he.sibling);
        var Hn = $(_, he, Ee.value, ee);
        if (Hn === null) {
          he === null && (he = qe);
          break;
        }
        (e && he && Hn.alternate === null && t(_, he),
          (T = d(Hn, T, ge)),
          pe === null ? (de = Hn) : (pe.sibling = Hn),
          (pe = Hn),
          (he = qe));
      }
      if (Ee.done) return (r(_, he), _e && ir(_, ge), de);
      if (he === null) {
        for (; !Ee.done; ge++, Ee = L.next())
          ((Ee = G(_, Ee.value, ee)),
            Ee !== null &&
              ((T = d(Ee, T, ge)),
              pe === null ? (de = Ee) : (pe.sibling = Ee),
              (pe = Ee)));
        return (_e && ir(_, ge), de);
      }
      for (he = i(_, he); !Ee.done; ge++, Ee = L.next())
        ((Ee = re(he, _, ge, Ee.value, ee)),
          Ee !== null &&
            (e &&
              Ee.alternate !== null &&
              he.delete(Ee.key === null ? ge : Ee.key),
            (T = d(Ee, T, ge)),
            pe === null ? (de = Ee) : (pe.sibling = Ee),
            (pe = Ee)));
      return (
        e &&
          he.forEach(function (zy) {
            return t(_, zy);
          }),
        _e && ir(_, ge),
        de
      );
    }
    function ze(_, T, L, ee) {
      if (
        (typeof L == "object" &&
          L !== null &&
          L.type === B &&
          L.key === null &&
          (L = L.props.children),
        typeof L == "object" && L !== null)
      ) {
        switch (L.$$typeof) {
          case W:
            e: {
              for (var de = L.key, pe = T; pe !== null; ) {
                if (pe.key === de) {
                  if (((de = L.type), de === B)) {
                    if (pe.tag === 7) {
                      (r(_, pe.sibling),
                        (T = u(pe, L.props.children)),
                        (T.return = _),
                        (_ = T));
                      break e;
                    }
                  } else if (
                    pe.elementType === de ||
                    (typeof de == "object" &&
                      de !== null &&
                      de.$$typeof === ue &&
                      dd(de) === pe.type)
                  ) {
                    (r(_, pe.sibling),
                      (T = u(pe, L.props)),
                      (T.ref = Ao(_, pe, L)),
                      (T.return = _),
                      (_ = T));
                    break e;
                  }
                  r(_, pe);
                  break;
                } else t(_, pe);
                pe = pe.sibling;
              }
              L.type === B
                ? ((T = hr(L.props.children, _.mode, ee, L.key)),
                  (T.return = _),
                  (_ = T))
                : ((ee = pi(L.type, L.key, L.props, null, _.mode, ee)),
                  (ee.ref = Ao(_, T, L)),
                  (ee.return = _),
                  (_ = ee));
            }
            return y(_);
          case F:
            e: {
              for (pe = L.key; T !== null; ) {
                if (T.key === pe)
                  if (
                    T.tag === 4 &&
                    T.stateNode.containerInfo === L.containerInfo &&
                    T.stateNode.implementation === L.implementation
                  ) {
                    (r(_, T.sibling),
                      (T = u(T, L.children || [])),
                      (T.return = _),
                      (_ = T));
                    break e;
                  } else {
                    r(_, T);
                    break;
                  }
                else t(_, T);
                T = T.sibling;
              }
              ((T = ja(L, _.mode, ee)), (T.return = _), (_ = T));
            }
            return y(_);
          case ue:
            return ((pe = L._init), ze(_, T, pe(L._payload), ee));
        }
        if (Cn(L)) return le(_, T, L, ee);
        if (H(L)) return ce(_, T, L, ee);
        Hs(_, L);
      }
      return (typeof L == "string" && L !== "") || typeof L == "number"
        ? ((L = "" + L),
          T !== null && T.tag === 6
            ? (r(_, T.sibling), (T = u(T, L)), (T.return = _), (_ = T))
            : (r(_, T), (T = Pa(L, _.mode, ee)), (T.return = _), (_ = T)),
          y(_))
        : r(_, T);
    }
    return ze;
  }
  var Br = fd(!0),
    pd = fd(!1),
    Ws = An(null),
    $s = null,
    Ur = null,
    Dl = null;
  function Fl() {
    Dl = Ur = $s = null;
  }
  function zl(e) {
    var t = Ws.current;
    (Re(Ws), (e._currentValue = t));
  }
  function Bl(e, t, r) {
    for (; e !== null; ) {
      var i = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
          : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
        e === r)
      )
        break;
      e = e.return;
    }
  }
  function Vr(e, t) {
    (($s = e),
      (Dl = Ur = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (ct = !0), (e.firstContext = null)));
  }
  function Pt(e) {
    var t = e._currentValue;
    if (Dl !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Ur === null)) {
        if ($s === null) throw Error(s(308));
        ((Ur = e), ($s.dependencies = { lanes: 0, firstContext: e }));
      } else Ur = Ur.next = e;
    return t;
  }
  var lr = null;
  function Ul(e) {
    lr === null ? (lr = [e]) : lr.push(e);
  }
  function hd(e, t, r, i) {
    var u = t.interleaved;
    return (
      u === null ? ((r.next = r), Ul(t)) : ((r.next = u.next), (u.next = r)),
      (t.interleaved = r),
      hn(e, i)
    );
  }
  function hn(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (r = e.alternate),
        r !== null && (r.childLanes |= t),
        (r = e),
        (e = e.return));
    return r.tag === 3 ? r.stateNode : null;
  }
  var On = !1;
  function Vl(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function md(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function mn(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function In(e, t, r) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (Ce & 2) !== 0)) {
      var u = i.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (i.pending = t),
        hn(e, r)
      );
    }
    return (
      (u = i.interleaved),
      u === null ? ((t.next = t), Ul(i)) : ((t.next = u.next), (u.next = t)),
      (i.interleaved = t),
      hn(e, r)
    );
  }
  function Qs(e, t, r) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
    ) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (r |= i), (t.lanes = r), nl(e, r));
    }
  }
  function gd(e, t) {
    var r = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), r === i)) {
      var u = null,
        d = null;
      if (((r = r.firstBaseUpdate), r !== null)) {
        do {
          var y = {
            eventTime: r.eventTime,
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null,
          };
          (d === null ? (u = d = y) : (d = d.next = y), (r = r.next));
        } while (r !== null);
        d === null ? (u = d = t) : (d = d.next = t);
      } else u = d = t;
      ((r = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: i.shared,
        effects: i.effects,
      }),
        (e.updateQueue = r));
      return;
    }
    ((e = r.lastBaseUpdate),
      e === null ? (r.firstBaseUpdate = t) : (e.next = t),
      (r.lastBaseUpdate = t));
  }
  function qs(e, t, r, i) {
    var u = e.updateQueue;
    On = !1;
    var d = u.firstBaseUpdate,
      y = u.lastBaseUpdate,
      E = u.shared.pending;
    if (E !== null) {
      u.shared.pending = null;
      var k = E,
        I = k.next;
      ((k.next = null), y === null ? (d = I) : (y.next = I), (y = k));
      var Q = e.alternate;
      Q !== null &&
        ((Q = Q.updateQueue),
        (E = Q.lastBaseUpdate),
        E !== y &&
          (E === null ? (Q.firstBaseUpdate = I) : (E.next = I),
          (Q.lastBaseUpdate = k)));
    }
    if (d !== null) {
      var G = u.baseState;
      ((y = 0), (Q = I = k = null), (E = d));
      do {
        var $ = E.lane,
          re = E.eventTime;
        if ((i & $) === $) {
          Q !== null &&
            (Q = Q.next =
              {
                eventTime: re,
                lane: 0,
                tag: E.tag,
                payload: E.payload,
                callback: E.callback,
                next: null,
              });
          e: {
            var le = e,
              ce = E;
            switch ((($ = t), (re = r), ce.tag)) {
              case 1:
                if (((le = ce.payload), typeof le == "function")) {
                  G = le.call(re, G, $);
                  break e;
                }
                G = le;
                break e;
              case 3:
                le.flags = (le.flags & -65537) | 128;
              case 0:
                if (
                  ((le = ce.payload),
                  ($ = typeof le == "function" ? le.call(re, G, $) : le),
                  $ == null)
                )
                  break e;
                G = q({}, G, $);
                break e;
              case 2:
                On = !0;
            }
          }
          E.callback !== null &&
            E.lane !== 0 &&
            ((e.flags |= 64),
            ($ = u.effects),
            $ === null ? (u.effects = [E]) : $.push(E));
        } else
          ((re = {
            eventTime: re,
            lane: $,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null,
          }),
            Q === null ? ((I = Q = re), (k = G)) : (Q = Q.next = re),
            (y |= $));
        if (((E = E.next), E === null)) {
          if (((E = u.shared.pending), E === null)) break;
          (($ = E),
            (E = $.next),
            ($.next = null),
            (u.lastBaseUpdate = $),
            (u.shared.pending = null));
        }
      } while (!0);
      if (
        (Q === null && (k = G),
        (u.baseState = k),
        (u.firstBaseUpdate = I),
        (u.lastBaseUpdate = Q),
        (t = u.shared.interleaved),
        t !== null)
      ) {
        u = t;
        do ((y |= u.lane), (u = u.next));
        while (u !== t);
      } else d === null && (u.shared.lanes = 0);
      ((cr |= y), (e.lanes = y), (e.memoizedState = G));
    }
  }
  function yd(e, t, r) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var i = e[t],
          u = i.callback;
        if (u !== null) {
          if (((i.callback = null), (i = r), typeof u != "function"))
            throw Error(s(191, u));
          u.call(i);
        }
      }
  }
  var _o = {},
    Zt = An(_o),
    Lo = An(_o),
    Oo = An(_o);
  function ar(e) {
    if (e === _o) throw Error(s(174));
    return e;
  }
  function Hl(e, t) {
    switch ((je(Oo, t), je(Lo, e), je(Zt, _o), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Qt(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Qt(t, e)));
    }
    (Re(Zt), je(Zt, t));
  }
  function Hr() {
    (Re(Zt), Re(Lo), Re(Oo));
  }
  function vd(e) {
    ar(Oo.current);
    var t = ar(Zt.current),
      r = Qt(t, e.type);
    t !== r && (je(Lo, e), je(Zt, r));
  }
  function Wl(e) {
    Lo.current === e && (Re(Zt), Re(Lo));
  }
  var Oe = An(0);
  function Ks(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (
          r !== null &&
          ((r = r.dehydrated), r === null || r.data === "$?" || r.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var $l = [];
  function Ql() {
    for (var e = 0; e < $l.length; e++)
      $l[e]._workInProgressVersionPrimary = null;
    $l.length = 0;
  }
  var Ys = O.ReactCurrentDispatcher,
    ql = O.ReactCurrentBatchConfig,
    ur = 0,
    Ie = null,
    Ve = null,
    $e = null,
    Gs = !1,
    Io = !1,
    Do = 0,
    ly = 0;
  function Xe() {
    throw Error(s(321));
  }
  function Kl(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!Lt(e[r], t[r])) return !1;
    return !0;
  }
  function Yl(e, t, r, i, u, d) {
    if (
      ((ur = d),
      (Ie = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Ys.current = e === null || e.memoizedState === null ? dy : fy),
      (e = r(i, u)),
      Io)
    ) {
      d = 0;
      do {
        if (((Io = !1), (Do = 0), 25 <= d)) throw Error(s(301));
        ((d += 1),
          ($e = Ve = null),
          (t.updateQueue = null),
          (Ys.current = py),
          (e = r(i, u)));
      } while (Io);
    }
    if (
      ((Ys.current = Zs),
      (t = Ve !== null && Ve.next !== null),
      (ur = 0),
      ($e = Ve = Ie = null),
      (Gs = !1),
      t)
    )
      throw Error(s(300));
    return e;
  }
  function Gl() {
    var e = Do !== 0;
    return ((Do = 0), e);
  }
  function en() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return ($e === null ? (Ie.memoizedState = $e = e) : ($e = $e.next = e), $e);
  }
  function jt() {
    if (Ve === null) {
      var e = Ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ve.next;
    var t = $e === null ? Ie.memoizedState : $e.next;
    if (t !== null) (($e = t), (Ve = e));
    else {
      if (e === null) throw Error(s(310));
      ((Ve = e),
        (e = {
          memoizedState: Ve.memoizedState,
          baseState: Ve.baseState,
          baseQueue: Ve.baseQueue,
          queue: Ve.queue,
          next: null,
        }),
        $e === null ? (Ie.memoizedState = $e = e) : ($e = $e.next = e));
    }
    return $e;
  }
  function Fo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Jl(e) {
    var t = jt(),
      r = t.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var i = Ve,
      u = i.baseQueue,
      d = r.pending;
    if (d !== null) {
      if (u !== null) {
        var y = u.next;
        ((u.next = d.next), (d.next = y));
      }
      ((i.baseQueue = u = d), (r.pending = null));
    }
    if (u !== null) {
      ((d = u.next), (i = i.baseState));
      var E = (y = null),
        k = null,
        I = d;
      do {
        var Q = I.lane;
        if ((ur & Q) === Q)
          (k !== null &&
            (k = k.next =
              {
                lane: 0,
                action: I.action,
                hasEagerState: I.hasEagerState,
                eagerState: I.eagerState,
                next: null,
              }),
            (i = I.hasEagerState ? I.eagerState : e(i, I.action)));
        else {
          var G = {
            lane: Q,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null,
          };
          (k === null ? ((E = k = G), (y = i)) : (k = k.next = G),
            (Ie.lanes |= Q),
            (cr |= Q));
        }
        I = I.next;
      } while (I !== null && I !== d);
      (k === null ? (y = i) : (k.next = E),
        Lt(i, t.memoizedState) || (ct = !0),
        (t.memoizedState = i),
        (t.baseState = y),
        (t.baseQueue = k),
        (r.lastRenderedState = i));
    }
    if (((e = r.interleaved), e !== null)) {
      u = e;
      do ((d = u.lane), (Ie.lanes |= d), (cr |= d), (u = u.next));
      while (u !== e);
    } else u === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function Xl(e) {
    var t = jt(),
      r = t.queue;
    if (r === null) throw Error(s(311));
    r.lastRenderedReducer = e;
    var i = r.dispatch,
      u = r.pending,
      d = t.memoizedState;
    if (u !== null) {
      r.pending = null;
      var y = (u = u.next);
      do ((d = e(d, y.action)), (y = y.next));
      while (y !== u);
      (Lt(d, t.memoizedState) || (ct = !0),
        (t.memoizedState = d),
        t.baseQueue === null && (t.baseState = d),
        (r.lastRenderedState = d));
    }
    return [d, i];
  }
  function xd() {}
  function wd(e, t) {
    var r = Ie,
      i = jt(),
      u = t(),
      d = !Lt(i.memoizedState, u);
    if (
      (d && ((i.memoizedState = u), (ct = !0)),
      (i = i.queue),
      Zl(Cd.bind(null, r, i, e), [e]),
      i.getSnapshot !== t || d || ($e !== null && $e.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        zo(9, Sd.bind(null, r, i, u, t), void 0, null),
        Qe === null)
      )
        throw Error(s(349));
      (ur & 30) !== 0 || bd(r, t, u);
    }
    return u;
  }
  function bd(e, t, r) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: r }),
      (t = Ie.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ie.updateQueue = t),
          (t.stores = [e]))
        : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
  }
  function Sd(e, t, r, i) {
    ((t.value = r), (t.getSnapshot = i), Ed(t) && Nd(e));
  }
  function Cd(e, t, r) {
    return r(function () {
      Ed(t) && Nd(e);
    });
  }
  function Ed(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !Lt(e, r);
    } catch {
      return !0;
    }
  }
  function Nd(e) {
    var t = hn(e, 1);
    t !== null && zt(t, e, 1, -1);
  }
  function kd(e) {
    var t = en();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fo,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = cy.bind(null, Ie, e)),
      [t.memoizedState, e]
    );
  }
  function zo(e, t, r, i) {
    return (
      (e = { tag: e, create: t, destroy: r, deps: i, next: null }),
      (t = Ie.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (Ie.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((r = t.lastEffect),
          r === null
            ? (t.lastEffect = e.next = e)
            : ((i = r.next), (r.next = e), (e.next = i), (t.lastEffect = e))),
      e
    );
  }
  function Pd() {
    return jt().memoizedState;
  }
  function Js(e, t, r, i) {
    var u = en();
    ((Ie.flags |= e),
      (u.memoizedState = zo(1 | t, r, void 0, i === void 0 ? null : i)));
  }
  function Xs(e, t, r, i) {
    var u = jt();
    i = i === void 0 ? null : i;
    var d = void 0;
    if (Ve !== null) {
      var y = Ve.memoizedState;
      if (((d = y.destroy), i !== null && Kl(i, y.deps))) {
        u.memoizedState = zo(t, r, d, i);
        return;
      }
    }
    ((Ie.flags |= e), (u.memoizedState = zo(1 | t, r, d, i)));
  }
  function jd(e, t) {
    return Js(8390656, 8, e, t);
  }
  function Zl(e, t) {
    return Xs(2048, 8, e, t);
  }
  function Td(e, t) {
    return Xs(4, 2, e, t);
  }
  function Rd(e, t) {
    return Xs(4, 4, e, t);
  }
  function Md(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Ad(e, t, r) {
    return (
      (r = r != null ? r.concat([e]) : null),
      Xs(4, 4, Md.bind(null, t, e), r)
    );
  }
  function ea() {}
  function _d(e, t) {
    var r = jt();
    t = t === void 0 ? null : t;
    var i = r.memoizedState;
    return i !== null && t !== null && Kl(t, i[1])
      ? i[0]
      : ((r.memoizedState = [e, t]), e);
  }
  function Ld(e, t) {
    var r = jt();
    t = t === void 0 ? null : t;
    var i = r.memoizedState;
    return i !== null && t !== null && Kl(t, i[1])
      ? i[0]
      : ((e = e()), (r.memoizedState = [e, t]), e);
  }
  function Od(e, t, r) {
    return (ur & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (ct = !0)), (e.memoizedState = r))
      : (Lt(r, t) ||
          ((r = dc()), (Ie.lanes |= r), (cr |= r), (e.baseState = !0)),
        t);
  }
  function ay(e, t) {
    var r = ke;
    ((ke = r !== 0 && 4 > r ? r : 4), e(!0));
    var i = ql.transition;
    ql.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((ke = r), (ql.transition = i));
    }
  }
  function Id() {
    return jt().memoizedState;
  }
  function uy(e, t, r) {
    var i = Bn(e);
    if (
      ((r = {
        lane: i,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Dd(e))
    )
      Fd(t, r);
    else if (((r = hd(e, t, r, i)), r !== null)) {
      var u = ot();
      (zt(r, e, i, u), zd(r, t, i));
    }
  }
  function cy(e, t, r) {
    var i = Bn(e),
      u = {
        lane: i,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Dd(e)) Fd(t, u);
    else {
      var d = e.alternate;
      if (
        e.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = t.lastRenderedReducer), d !== null)
      )
        try {
          var y = t.lastRenderedState,
            E = d(y, r);
          if (((u.hasEagerState = !0), (u.eagerState = E), Lt(E, y))) {
            var k = t.interleaved;
            (k === null
              ? ((u.next = u), Ul(t))
              : ((u.next = k.next), (k.next = u)),
              (t.interleaved = u));
            return;
          }
        } catch {
        } finally {
        }
      ((r = hd(e, t, u, i)),
        r !== null && ((u = ot()), zt(r, e, i, u), zd(r, t, i)));
    }
  }
  function Dd(e) {
    var t = e.alternate;
    return e === Ie || (t !== null && t === Ie);
  }
  function Fd(e, t) {
    Io = Gs = !0;
    var r = e.pending;
    (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
      (e.pending = t));
  }
  function zd(e, t, r) {
    if ((r & 4194240) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (r |= i), (t.lanes = r), nl(e, r));
    }
  }
  var Zs = {
      readContext: Pt,
      useCallback: Xe,
      useContext: Xe,
      useEffect: Xe,
      useImperativeHandle: Xe,
      useInsertionEffect: Xe,
      useLayoutEffect: Xe,
      useMemo: Xe,
      useReducer: Xe,
      useRef: Xe,
      useState: Xe,
      useDebugValue: Xe,
      useDeferredValue: Xe,
      useTransition: Xe,
      useMutableSource: Xe,
      useSyncExternalStore: Xe,
      useId: Xe,
      unstable_isNewReconciler: !1,
    },
    dy = {
      readContext: Pt,
      useCallback: function (e, t) {
        return ((en().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Pt,
      useEffect: jd,
      useImperativeHandle: function (e, t, r) {
        return (
          (r = r != null ? r.concat([e]) : null),
          Js(4194308, 4, Md.bind(null, t, e), r)
        );
      },
      useLayoutEffect: function (e, t) {
        return Js(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Js(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var r = en();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (r.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, r) {
        var i = en();
        return (
          (t = r !== void 0 ? r(t) : t),
          (i.memoizedState = i.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (i.queue = e),
          (e = e.dispatch = uy.bind(null, Ie, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = en();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: kd,
      useDebugValue: ea,
      useDeferredValue: function (e) {
        return (en().memoizedState = e);
      },
      useTransition: function () {
        var e = kd(!1),
          t = e[0];
        return ((e = ay.bind(null, e[1])), (en().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, r) {
        var i = Ie,
          u = en();
        if (_e) {
          if (r === void 0) throw Error(s(407));
          r = r();
        } else {
          if (((r = t()), Qe === null)) throw Error(s(349));
          (ur & 30) !== 0 || bd(i, t, r);
        }
        u.memoizedState = r;
        var d = { value: r, getSnapshot: t };
        return (
          (u.queue = d),
          jd(Cd.bind(null, i, d, e), [e]),
          (i.flags |= 2048),
          zo(9, Sd.bind(null, i, d, r, t), void 0, null),
          r
        );
      },
      useId: function () {
        var e = en(),
          t = Qe.identifierPrefix;
        if (_e) {
          var r = pn,
            i = fn;
          ((r = (i & ~(1 << (32 - _t(i) - 1))).toString(32) + r),
            (t = ":" + t + "R" + r),
            (r = Do++),
            0 < r && (t += "H" + r.toString(32)),
            (t += ":"));
        } else ((r = ly++), (t = ":" + t + "r" + r.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    fy = {
      readContext: Pt,
      useCallback: _d,
      useContext: Pt,
      useEffect: Zl,
      useImperativeHandle: Ad,
      useInsertionEffect: Td,
      useLayoutEffect: Rd,
      useMemo: Ld,
      useReducer: Jl,
      useRef: Pd,
      useState: function () {
        return Jl(Fo);
      },
      useDebugValue: ea,
      useDeferredValue: function (e) {
        var t = jt();
        return Od(t, Ve.memoizedState, e);
      },
      useTransition: function () {
        var e = Jl(Fo)[0],
          t = jt().memoizedState;
        return [e, t];
      },
      useMutableSource: xd,
      useSyncExternalStore: wd,
      useId: Id,
      unstable_isNewReconciler: !1,
    },
    py = {
      readContext: Pt,
      useCallback: _d,
      useContext: Pt,
      useEffect: Zl,
      useImperativeHandle: Ad,
      useInsertionEffect: Td,
      useLayoutEffect: Rd,
      useMemo: Ld,
      useReducer: Xl,
      useRef: Pd,
      useState: function () {
        return Xl(Fo);
      },
      useDebugValue: ea,
      useDeferredValue: function (e) {
        var t = jt();
        return Ve === null ? (t.memoizedState = e) : Od(t, Ve.memoizedState, e);
      },
      useTransition: function () {
        var e = Xl(Fo)[0],
          t = jt().memoizedState;
        return [e, t];
      },
      useMutableSource: xd,
      useSyncExternalStore: wd,
      useId: Id,
      unstable_isNewReconciler: !1,
    };
  function It(e, t) {
    if (e && e.defaultProps) {
      ((t = q({}, t)), (e = e.defaultProps));
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function ta(e, t, r, i) {
    ((t = e.memoizedState),
      (r = r(i, t)),
      (r = r == null ? t : q({}, t, r)),
      (e.memoizedState = r),
      e.lanes === 0 && (e.updateQueue.baseState = r));
  }
  var ei = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? nr(e) === e : !1;
    },
    enqueueSetState: function (e, t, r) {
      e = e._reactInternals;
      var i = ot(),
        u = Bn(e),
        d = mn(i, u);
      ((d.payload = t),
        r != null && (d.callback = r),
        (t = In(e, d, u)),
        t !== null && (zt(t, e, u, i), Qs(t, e, u)));
    },
    enqueueReplaceState: function (e, t, r) {
      e = e._reactInternals;
      var i = ot(),
        u = Bn(e),
        d = mn(i, u);
      ((d.tag = 1),
        (d.payload = t),
        r != null && (d.callback = r),
        (t = In(e, d, u)),
        t !== null && (zt(t, e, u, i), Qs(t, e, u)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var r = ot(),
        i = Bn(e),
        u = mn(r, i);
      ((u.tag = 2),
        t != null && (u.callback = t),
        (t = In(e, u, i)),
        t !== null && (zt(t, e, i, r), Qs(t, e, i)));
    },
  };
  function Bd(e, t, r, i, u, d, y) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, d, y)
        : t.prototype && t.prototype.isPureReactComponent
          ? !No(r, i) || !No(u, d)
          : !0
    );
  }
  function Ud(e, t, r) {
    var i = !1,
      u = _n,
      d = t.contextType;
    return (
      typeof d == "object" && d !== null
        ? (d = Pt(d))
        : ((u = ut(t) ? or : Je.current),
          (i = t.contextTypes),
          (d = (i = i != null) ? Ir(e, u) : _n)),
      (t = new t(r, d)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = ei),
      (e.stateNode = t),
      (t._reactInternals = e),
      i &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = u),
        (e.__reactInternalMemoizedMaskedChildContext = d)),
      t
    );
  }
  function Vd(e, t, r, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(r, i),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(r, i),
      t.state !== e && ei.enqueueReplaceState(t, t.state, null));
  }
  function na(e, t, r, i) {
    var u = e.stateNode;
    ((u.props = r), (u.state = e.memoizedState), (u.refs = {}), Vl(e));
    var d = t.contextType;
    (typeof d == "object" && d !== null
      ? (u.context = Pt(d))
      : ((d = ut(t) ? or : Je.current), (u.context = Ir(e, d))),
      (u.state = e.memoizedState),
      (d = t.getDerivedStateFromProps),
      typeof d == "function" && (ta(e, t, d, r), (u.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function" ||
        (typeof u.UNSAFE_componentWillMount != "function" &&
          typeof u.componentWillMount != "function") ||
        ((t = u.state),
        typeof u.componentWillMount == "function" && u.componentWillMount(),
        typeof u.UNSAFE_componentWillMount == "function" &&
          u.UNSAFE_componentWillMount(),
        t !== u.state && ei.enqueueReplaceState(u, u.state, null),
        qs(e, r, u, i),
        (u.state = e.memoizedState)),
      typeof u.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Wr(e, t) {
    try {
      var r = "",
        i = t;
      do ((r += fe(i)), (i = i.return));
      while (i);
      var u = r;
    } catch (d) {
      u =
        `
Error generating stack: ` +
        d.message +
        `
` +
        d.stack;
    }
    return { value: e, source: t, stack: u, digest: null };
  }
  function ra(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function oa(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  var hy = typeof WeakMap == "function" ? WeakMap : Map;
  function Hd(e, t, r) {
    ((r = mn(-1, r)), (r.tag = 3), (r.payload = { element: null }));
    var i = t.value;
    return (
      (r.callback = function () {
        (li || ((li = !0), (xa = i)), oa(e, t));
      }),
      r
    );
  }
  function Wd(e, t, r) {
    ((r = mn(-1, r)), (r.tag = 3));
    var i = e.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var u = t.value;
      ((r.payload = function () {
        return i(u);
      }),
        (r.callback = function () {
          oa(e, t);
        }));
    }
    var d = e.stateNode;
    return (
      d !== null &&
        typeof d.componentDidCatch == "function" &&
        (r.callback = function () {
          (oa(e, t),
            typeof i != "function" &&
              (Fn === null ? (Fn = new Set([this])) : Fn.add(this)));
          var y = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: y !== null ? y : "",
          });
        }),
      r
    );
  }
  function $d(e, t, r) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new hy();
      var u = new Set();
      i.set(t, u);
    } else ((u = i.get(t)), u === void 0 && ((u = new Set()), i.set(t, u)));
    u.has(r) || (u.add(r), (e = jy.bind(null, e, t, r)), t.then(e, e));
  }
  function Qd(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function qd(e, t, r, i, u) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (r.flags |= 131072),
            (r.flags &= -52805),
            r.tag === 1 &&
              (r.alternate === null
                ? (r.tag = 17)
                : ((t = mn(-1, 1)), (t.tag = 2), In(r, t, 1))),
            (r.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = u), e);
  }
  var my = O.ReactCurrentOwner,
    ct = !1;
  function rt(e, t, r, i) {
    t.child = e === null ? pd(t, null, r, i) : Br(t, e.child, r, i);
  }
  function Kd(e, t, r, i, u) {
    r = r.render;
    var d = t.ref;
    return (
      Vr(t, u),
      (i = Yl(e, t, r, i, d, u)),
      (r = Gl()),
      e !== null && !ct
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          gn(e, t, u))
        : (_e && r && Al(t), (t.flags |= 1), rt(e, t, i, u), t.child)
    );
  }
  function Yd(e, t, r, i, u) {
    if (e === null) {
      var d = r.type;
      return typeof d == "function" &&
        !ka(d) &&
        d.defaultProps === void 0 &&
        r.compare === null &&
        r.defaultProps === void 0
        ? ((t.tag = 15), (t.type = d), Gd(e, t, d, i, u))
        : ((e = pi(r.type, null, i, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((d = e.child), (e.lanes & u) === 0)) {
      var y = d.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : No), r(y, i) && e.ref === t.ref)
      )
        return gn(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = Vn(d, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Gd(e, t, r, i, u) {
    if (e !== null) {
      var d = e.memoizedProps;
      if (No(d, i) && e.ref === t.ref)
        if (((ct = !1), (t.pendingProps = i = d), (e.lanes & u) !== 0))
          (e.flags & 131072) !== 0 && (ct = !0);
        else return ((t.lanes = e.lanes), gn(e, t, u));
    }
    return sa(e, t, r, i, u);
  }
  function Jd(e, t, r) {
    var i = t.pendingProps,
      u = i.children,
      d = e !== null ? e.memoizedState : null;
    if (i.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          je(Qr, xt),
          (xt |= r));
      else {
        if ((r & 1073741824) === 0)
          return (
            (e = d !== null ? d.baseLanes | r : r),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            je(Qr, xt),
            (xt |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (i = d !== null ? d.baseLanes : r),
          je(Qr, xt),
          (xt |= i));
      }
    else
      (d !== null ? ((i = d.baseLanes | r), (t.memoizedState = null)) : (i = r),
        je(Qr, xt),
        (xt |= i));
    return (rt(e, t, u, r), t.child);
  }
  function Xd(e, t) {
    var r = t.ref;
    ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function sa(e, t, r, i, u) {
    var d = ut(r) ? or : Je.current;
    return (
      (d = Ir(t, d)),
      Vr(t, u),
      (r = Yl(e, t, r, i, d, u)),
      (i = Gl()),
      e !== null && !ct
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~u),
          gn(e, t, u))
        : (_e && i && Al(t), (t.flags |= 1), rt(e, t, r, u), t.child)
    );
  }
  function Zd(e, t, r, i, u) {
    if (ut(r)) {
      var d = !0;
      Fs(t);
    } else d = !1;
    if ((Vr(t, u), t.stateNode === null))
      (ni(e, t), Ud(t, r, i), na(t, r, i, u), (i = !0));
    else if (e === null) {
      var y = t.stateNode,
        E = t.memoizedProps;
      y.props = E;
      var k = y.context,
        I = r.contextType;
      typeof I == "object" && I !== null
        ? (I = Pt(I))
        : ((I = ut(r) ? or : Je.current), (I = Ir(t, I)));
      var Q = r.getDerivedStateFromProps,
        G =
          typeof Q == "function" ||
          typeof y.getSnapshotBeforeUpdate == "function";
      (G ||
        (typeof y.UNSAFE_componentWillReceiveProps != "function" &&
          typeof y.componentWillReceiveProps != "function") ||
        ((E !== i || k !== I) && Vd(t, y, i, I)),
        (On = !1));
      var $ = t.memoizedState;
      ((y.state = $),
        qs(t, i, y, u),
        (k = t.memoizedState),
        E !== i || $ !== k || at.current || On
          ? (typeof Q == "function" && (ta(t, r, Q, i), (k = t.memoizedState)),
            (E = On || Bd(t, r, E, i, $, k, I))
              ? (G ||
                  (typeof y.UNSAFE_componentWillMount != "function" &&
                    typeof y.componentWillMount != "function") ||
                  (typeof y.componentWillMount == "function" &&
                    y.componentWillMount(),
                  typeof y.UNSAFE_componentWillMount == "function" &&
                    y.UNSAFE_componentWillMount()),
                typeof y.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof y.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = i),
                (t.memoizedState = k)),
            (y.props = i),
            (y.state = k),
            (y.context = I),
            (i = E))
          : (typeof y.componentDidMount == "function" && (t.flags |= 4194308),
            (i = !1)));
    } else {
      ((y = t.stateNode),
        md(e, t),
        (E = t.memoizedProps),
        (I = t.type === t.elementType ? E : It(t.type, E)),
        (y.props = I),
        (G = t.pendingProps),
        ($ = y.context),
        (k = r.contextType),
        typeof k == "object" && k !== null
          ? (k = Pt(k))
          : ((k = ut(r) ? or : Je.current), (k = Ir(t, k))));
      var re = r.getDerivedStateFromProps;
      ((Q =
        typeof re == "function" ||
        typeof y.getSnapshotBeforeUpdate == "function") ||
        (typeof y.UNSAFE_componentWillReceiveProps != "function" &&
          typeof y.componentWillReceiveProps != "function") ||
        ((E !== G || $ !== k) && Vd(t, y, i, k)),
        (On = !1),
        ($ = t.memoizedState),
        (y.state = $),
        qs(t, i, y, u));
      var le = t.memoizedState;
      E !== G || $ !== le || at.current || On
        ? (typeof re == "function" && (ta(t, r, re, i), (le = t.memoizedState)),
          (I = On || Bd(t, r, I, i, $, le, k) || !1)
            ? (Q ||
                (typeof y.UNSAFE_componentWillUpdate != "function" &&
                  typeof y.componentWillUpdate != "function") ||
                (typeof y.componentWillUpdate == "function" &&
                  y.componentWillUpdate(i, le, k),
                typeof y.UNSAFE_componentWillUpdate == "function" &&
                  y.UNSAFE_componentWillUpdate(i, le, k)),
              typeof y.componentDidUpdate == "function" && (t.flags |= 4),
              typeof y.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof y.componentDidUpdate != "function" ||
                (E === e.memoizedProps && $ === e.memoizedState) ||
                (t.flags |= 4),
              typeof y.getSnapshotBeforeUpdate != "function" ||
                (E === e.memoizedProps && $ === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = le)),
          (y.props = i),
          (y.state = le),
          (y.context = k),
          (i = I))
        : (typeof y.componentDidUpdate != "function" ||
            (E === e.memoizedProps && $ === e.memoizedState) ||
            (t.flags |= 4),
          typeof y.getSnapshotBeforeUpdate != "function" ||
            (E === e.memoizedProps && $ === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return ia(e, t, r, i, d, u);
  }
  function ia(e, t, r, i, u, d) {
    Xd(e, t);
    var y = (t.flags & 128) !== 0;
    if (!i && !y) return (u && od(t, r, !1), gn(e, t, d));
    ((i = t.stateNode), (my.current = t));
    var E =
      y && typeof r.getDerivedStateFromError != "function" ? null : i.render();
    return (
      (t.flags |= 1),
      e !== null && y
        ? ((t.child = Br(t, e.child, null, d)), (t.child = Br(t, null, E, d)))
        : rt(e, t, E, d),
      (t.memoizedState = i.state),
      u && od(t, r, !0),
      t.child
    );
  }
  function ef(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? nd(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && nd(e, t.context, !1),
      Hl(e, t.containerInfo));
  }
  function tf(e, t, r, i, u) {
    return (zr(), Il(u), (t.flags |= 256), rt(e, t, r, i), t.child);
  }
  var la = { dehydrated: null, treeContext: null, retryLane: 0 };
  function aa(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function nf(e, t, r) {
    var i = t.pendingProps,
      u = Oe.current,
      d = !1,
      y = (t.flags & 128) !== 0,
      E;
    if (
      ((E = y) ||
        (E = e !== null && e.memoizedState === null ? !1 : (u & 2) !== 0),
      E
        ? ((d = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (u |= 1),
      je(Oe, u & 1),
      e === null)
    )
      return (
        Ol(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((y = i.children),
            (e = i.fallback),
            d
              ? ((i = t.mode),
                (d = t.child),
                (y = { mode: "hidden", children: y }),
                (i & 1) === 0 && d !== null
                  ? ((d.childLanes = 0), (d.pendingProps = y))
                  : (d = hi(y, i, 0, null)),
                (e = hr(e, i, r, null)),
                (d.return = t),
                (e.return = t),
                (d.sibling = e),
                (t.child = d),
                (t.child.memoizedState = aa(r)),
                (t.memoizedState = la),
                e)
              : ua(t, y))
      );
    if (((u = e.memoizedState), u !== null && ((E = u.dehydrated), E !== null)))
      return gy(e, t, y, i, E, u, r);
    if (d) {
      ((d = i.fallback), (y = t.mode), (u = e.child), (E = u.sibling));
      var k = { mode: "hidden", children: i.children };
      return (
        (y & 1) === 0 && t.child !== u
          ? ((i = t.child),
            (i.childLanes = 0),
            (i.pendingProps = k),
            (t.deletions = null))
          : ((i = Vn(u, k)), (i.subtreeFlags = u.subtreeFlags & 14680064)),
        E !== null ? (d = Vn(E, d)) : ((d = hr(d, y, r, null)), (d.flags |= 2)),
        (d.return = t),
        (i.return = t),
        (i.sibling = d),
        (t.child = i),
        (i = d),
        (d = t.child),
        (y = e.child.memoizedState),
        (y =
          y === null
            ? aa(r)
            : {
                baseLanes: y.baseLanes | r,
                cachePool: null,
                transitions: y.transitions,
              }),
        (d.memoizedState = y),
        (d.childLanes = e.childLanes & ~r),
        (t.memoizedState = la),
        i
      );
    }
    return (
      (d = e.child),
      (e = d.sibling),
      (i = Vn(d, { mode: "visible", children: i.children })),
      (t.mode & 1) === 0 && (i.lanes = r),
      (i.return = t),
      (i.sibling = null),
      e !== null &&
        ((r = t.deletions),
        r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
      (t.child = i),
      (t.memoizedState = null),
      i
    );
  }
  function ua(e, t) {
    return (
      (t = hi({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ti(e, t, r, i) {
    return (
      i !== null && Il(i),
      Br(t, e.child, null, r),
      (e = ua(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function gy(e, t, r, i, u, d, y) {
    if (r)
      return t.flags & 256
        ? ((t.flags &= -257), (i = ra(Error(s(422)))), ti(e, t, y, i))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((d = i.fallback),
            (u = t.mode),
            (i = hi({ mode: "visible", children: i.children }, u, 0, null)),
            (d = hr(d, u, y, null)),
            (d.flags |= 2),
            (i.return = t),
            (d.return = t),
            (i.sibling = d),
            (t.child = i),
            (t.mode & 1) !== 0 && Br(t, e.child, null, y),
            (t.child.memoizedState = aa(y)),
            (t.memoizedState = la),
            d);
    if ((t.mode & 1) === 0) return ti(e, t, y, null);
    if (u.data === "$!") {
      if (((i = u.nextSibling && u.nextSibling.dataset), i)) var E = i.dgst;
      return (
        (i = E),
        (d = Error(s(419))),
        (i = ra(d, i, void 0)),
        ti(e, t, y, i)
      );
    }
    if (((E = (y & e.childLanes) !== 0), ct || E)) {
      if (((i = Qe), i !== null)) {
        switch (y & -y) {
          case 4:
            u = 2;
            break;
          case 16:
            u = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            u = 32;
            break;
          case 536870912:
            u = 268435456;
            break;
          default:
            u = 0;
        }
        ((u = (u & (i.suspendedLanes | y)) !== 0 ? 0 : u),
          u !== 0 &&
            u !== d.retryLane &&
            ((d.retryLane = u), hn(e, u), zt(i, e, u, -1)));
      }
      return (Na(), (i = ra(Error(s(421)))), ti(e, t, y, i));
    }
    return u.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Ty.bind(null, e)),
        (u._reactRetry = t),
        null)
      : ((e = d.treeContext),
        (vt = Mn(u.nextSibling)),
        (yt = t),
        (_e = !0),
        (Ot = null),
        e !== null &&
          ((Nt[kt++] = fn),
          (Nt[kt++] = pn),
          (Nt[kt++] = sr),
          (fn = e.id),
          (pn = e.overflow),
          (sr = t)),
        (t = ua(t, i.children)),
        (t.flags |= 4096),
        t);
  }
  function rf(e, t, r) {
    e.lanes |= t;
    var i = e.alternate;
    (i !== null && (i.lanes |= t), Bl(e.return, t, r));
  }
  function ca(e, t, r, i, u) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: r,
          tailMode: u,
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = i),
        (d.tail = r),
        (d.tailMode = u));
  }
  function of(e, t, r) {
    var i = t.pendingProps,
      u = i.revealOrder,
      d = i.tail;
    if ((rt(e, t, i.children, r), (i = Oe.current), (i & 2) !== 0))
      ((i = (i & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && rf(e, r, t);
          else if (e.tag === 19) rf(e, r, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      i &= 1;
    }
    if ((je(Oe, i), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (u) {
        case "forwards":
          for (r = t.child, u = null; r !== null; )
            ((e = r.alternate),
              e !== null && Ks(e) === null && (u = r),
              (r = r.sibling));
          ((r = u),
            r === null
              ? ((u = t.child), (t.child = null))
              : ((u = r.sibling), (r.sibling = null)),
            ca(t, !1, u, r, d));
          break;
        case "backwards":
          for (r = null, u = t.child, t.child = null; u !== null; ) {
            if (((e = u.alternate), e !== null && Ks(e) === null)) {
              t.child = u;
              break;
            }
            ((e = u.sibling), (u.sibling = r), (r = u), (u = e));
          }
          ca(t, !0, r, null, d);
          break;
        case "together":
          ca(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function ni(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function gn(e, t, r) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (cr |= t.lanes),
      (r & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, r = Vn(e, e.pendingProps), t.child = r, r.return = t;
        e.sibling !== null;

      )
        ((e = e.sibling),
          (r = r.sibling = Vn(e, e.pendingProps)),
          (r.return = t));
      r.sibling = null;
    }
    return t.child;
  }
  function yy(e, t, r) {
    switch (t.tag) {
      case 3:
        (ef(t), zr());
        break;
      case 5:
        vd(t);
        break;
      case 1:
        ut(t.type) && Fs(t);
        break;
      case 4:
        Hl(t, t.stateNode.containerInfo);
        break;
      case 10:
        var i = t.type._context,
          u = t.memoizedProps.value;
        (je(Ws, i._currentValue), (i._currentValue = u));
        break;
      case 13:
        if (((i = t.memoizedState), i !== null))
          return i.dehydrated !== null
            ? (je(Oe, Oe.current & 1), (t.flags |= 128), null)
            : (r & t.child.childLanes) !== 0
              ? nf(e, t, r)
              : (je(Oe, Oe.current & 1),
                (e = gn(e, t, r)),
                e !== null ? e.sibling : null);
        je(Oe, Oe.current & 1);
        break;
      case 19:
        if (((i = (r & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (i) return of(e, t, r);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          je(Oe, Oe.current),
          i)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Jd(e, t, r));
    }
    return gn(e, t, r);
  }
  var sf, da, lf, af;
  ((sf = function (e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        ((r.child.return = r), (r = r.child));
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return;
        r = r.return;
      }
      ((r.sibling.return = r.return), (r = r.sibling));
    }
  }),
    (da = function () {}),
    (lf = function (e, t, r, i) {
      var u = e.memoizedProps;
      if (u !== i) {
        ((e = t.stateNode), ar(Zt.current));
        var d = null;
        switch (r) {
          case "input":
            ((u = so(e, u)), (i = so(e, i)), (d = []));
            break;
          case "select":
            ((u = q({}, u, { value: void 0 })),
              (i = q({}, i, { value: void 0 })),
              (d = []));
            break;
          case "textarea":
            ((u = Sr(e, u)), (i = Sr(e, i)), (d = []));
            break;
          default:
            typeof u.onClick != "function" &&
              typeof i.onClick == "function" &&
              (e.onclick = Os);
        }
        Kt(r, i);
        var y;
        r = null;
        for (I in u)
          if (!i.hasOwnProperty(I) && u.hasOwnProperty(I) && u[I] != null)
            if (I === "style") {
              var E = u[I];
              for (y in E) E.hasOwnProperty(y) && (r || (r = {}), (r[y] = ""));
            } else
              I !== "dangerouslySetInnerHTML" &&
                I !== "children" &&
                I !== "suppressContentEditableWarning" &&
                I !== "suppressHydrationWarning" &&
                I !== "autoFocus" &&
                (a.hasOwnProperty(I)
                  ? d || (d = [])
                  : (d = d || []).push(I, null));
        for (I in i) {
          var k = i[I];
          if (
            ((E = u?.[I]),
            i.hasOwnProperty(I) && k !== E && (k != null || E != null))
          )
            if (I === "style")
              if (E) {
                for (y in E)
                  !E.hasOwnProperty(y) ||
                    (k && k.hasOwnProperty(y)) ||
                    (r || (r = {}), (r[y] = ""));
                for (y in k)
                  k.hasOwnProperty(y) &&
                    E[y] !== k[y] &&
                    (r || (r = {}), (r[y] = k[y]));
              } else (r || (d || (d = []), d.push(I, r)), (r = k));
            else
              I === "dangerouslySetInnerHTML"
                ? ((k = k ? k.__html : void 0),
                  (E = E ? E.__html : void 0),
                  k != null && E !== k && (d = d || []).push(I, k))
                : I === "children"
                  ? (typeof k != "string" && typeof k != "number") ||
                    (d = d || []).push(I, "" + k)
                  : I !== "suppressContentEditableWarning" &&
                    I !== "suppressHydrationWarning" &&
                    (a.hasOwnProperty(I)
                      ? (k != null && I === "onScroll" && Te("scroll", e),
                        d || E === k || (d = []))
                      : (d = d || []).push(I, k));
        }
        r && (d = d || []).push("style", r);
        var I = d;
        (t.updateQueue = I) && (t.flags |= 4);
      }
    }),
    (af = function (e, t, r, i) {
      r !== i && (t.flags |= 4);
    }));
  function Bo(e, t) {
    if (!_e)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; )
            (t.alternate !== null && (r = t), (t = t.sibling));
          r === null ? (e.tail = null) : (r.sibling = null);
          break;
        case "collapsed":
          r = e.tail;
          for (var i = null; r !== null; )
            (r.alternate !== null && (i = r), (r = r.sibling));
          i === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function Ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      r = 0,
      i = 0;
    if (t)
      for (var u = e.child; u !== null; )
        ((r |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags & 14680064),
          (i |= u.flags & 14680064),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null; )
        ((r |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags),
          (i |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = r), t);
  }
  function vy(e, t, r) {
    var i = t.pendingProps;
    switch ((_l(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ze(t), null);
      case 1:
        return (ut(t.type) && Ds(), Ze(t), null);
      case 3:
        return (
          (i = t.stateNode),
          Hr(),
          Re(at),
          Re(Je),
          Ql(),
          i.pendingContext &&
            ((i.context = i.pendingContext), (i.pendingContext = null)),
          (e === null || e.child === null) &&
            (Vs(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Ot !== null && (Sa(Ot), (Ot = null)))),
          da(e, t),
          Ze(t),
          null
        );
      case 5:
        Wl(t);
        var u = ar(Oo.current);
        if (((r = t.type), e !== null && t.stateNode != null))
          (lf(e, t, r, i, u),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(s(166));
            return (Ze(t), null);
          }
          if (((e = ar(Zt.current)), Vs(t))) {
            ((i = t.stateNode), (r = t.type));
            var d = t.memoizedProps;
            switch (((i[Xt] = t), (i[Ro] = d), (e = (t.mode & 1) !== 0), r)) {
              case "dialog":
                (Te("cancel", i), Te("close", i));
                break;
              case "iframe":
              case "object":
              case "embed":
                Te("load", i);
                break;
              case "video":
              case "audio":
                for (u = 0; u < Po.length; u++) Te(Po[u], i);
                break;
              case "source":
                Te("error", i);
                break;
              case "img":
              case "image":
              case "link":
                (Te("error", i), Te("load", i));
                break;
              case "details":
                Te("toggle", i);
                break;
              case "input":
                (ls(i, d), Te("invalid", i));
                break;
              case "select":
                ((i._wrapperState = { wasMultiple: !!d.multiple }),
                  Te("invalid", i));
                break;
              case "textarea":
                ($t(i, d), Te("invalid", i));
            }
            (Kt(r, d), (u = null));
            for (var y in d)
              if (d.hasOwnProperty(y)) {
                var E = d[y];
                y === "children"
                  ? typeof E == "string"
                    ? i.textContent !== E &&
                      (d.suppressHydrationWarning !== !0 &&
                        Ls(i.textContent, E, e),
                      (u = ["children", E]))
                    : typeof E == "number" &&
                      i.textContent !== "" + E &&
                      (d.suppressHydrationWarning !== !0 &&
                        Ls(i.textContent, E, e),
                      (u = ["children", "" + E]))
                  : a.hasOwnProperty(y) &&
                    E != null &&
                    y === "onScroll" &&
                    Te("scroll", i);
              }
            switch (r) {
              case "input":
                (St(i), br(i, d, !0));
                break;
              case "textarea":
                (St(i), us(i));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (i.onclick = Os);
            }
            ((i = u), (t.updateQueue = i), i !== null && (t.flags |= 4));
          } else {
            ((y = u.nodeType === 9 ? u : u.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = tt(r)),
              e === "http://www.w3.org/1999/xhtml"
                ? r === "script"
                  ? ((e = y.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof i.is == "string"
                    ? (e = y.createElement(r, { is: i.is }))
                    : ((e = y.createElement(r)),
                      r === "select" &&
                        ((y = e),
                        i.multiple
                          ? (y.multiple = !0)
                          : i.size && (y.size = i.size)))
                : (e = y.createElementNS(e, r)),
              (e[Xt] = t),
              (e[Ro] = i),
              sf(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((y = uo(r, i)), r)) {
                case "dialog":
                  (Te("cancel", e), Te("close", e), (u = i));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (Te("load", e), (u = i));
                  break;
                case "video":
                case "audio":
                  for (u = 0; u < Po.length; u++) Te(Po[u], e);
                  u = i;
                  break;
                case "source":
                  (Te("error", e), (u = i));
                  break;
                case "img":
                case "image":
                case "link":
                  (Te("error", e), Te("load", e), (u = i));
                  break;
                case "details":
                  (Te("toggle", e), (u = i));
                  break;
                case "input":
                  (ls(e, i), (u = so(e, i)), Te("invalid", e));
                  break;
                case "option":
                  u = i;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!i.multiple }),
                    (u = q({}, i, { value: void 0 })),
                    Te("invalid", e));
                  break;
                case "textarea":
                  ($t(e, i), (u = Sr(e, i)), Te("invalid", e));
                  break;
                default:
                  u = i;
              }
              (Kt(r, u), (E = u));
              for (d in E)
                if (E.hasOwnProperty(d)) {
                  var k = E[d];
                  d === "style"
                    ? un(e, k)
                    : d === "dangerouslySetInnerHTML"
                      ? ((k = k ? k.__html : void 0), k != null && cs(e, k))
                      : d === "children"
                        ? typeof k == "string"
                          ? (r !== "textarea" || k !== "") && qt(e, k)
                          : typeof k == "number" && qt(e, "" + k)
                        : d !== "suppressContentEditableWarning" &&
                          d !== "suppressHydrationWarning" &&
                          d !== "autoFocus" &&
                          (a.hasOwnProperty(d)
                            ? k != null && d === "onScroll" && Te("scroll", e)
                            : k != null && A(e, d, k, y));
                }
              switch (r) {
                case "input":
                  (St(e), br(e, i, !1));
                  break;
                case "textarea":
                  (St(e), us(e));
                  break;
                case "option":
                  i.value != null && e.setAttribute("value", "" + ye(i.value));
                  break;
                case "select":
                  ((e.multiple = !!i.multiple),
                    (d = i.value),
                    d != null
                      ? Et(e, !!i.multiple, d, !1)
                      : i.defaultValue != null &&
                        Et(e, !!i.multiple, i.defaultValue, !0));
                  break;
                default:
                  typeof u.onClick == "function" && (e.onclick = Os);
              }
              switch (r) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  i = !!i.autoFocus;
                  break e;
                case "img":
                  i = !0;
                  break e;
                default:
                  i = !1;
              }
            }
            i && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Ze(t), null);
      case 6:
        if (e && t.stateNode != null) af(e, t, e.memoizedProps, i);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(s(166));
          if (((r = ar(Oo.current)), ar(Zt.current), Vs(t))) {
            if (
              ((i = t.stateNode),
              (r = t.memoizedProps),
              (i[Xt] = t),
              (d = i.nodeValue !== r) && ((e = yt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Ls(i.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Ls(i.nodeValue, r, (e.mode & 1) !== 0);
              }
            d && (t.flags |= 4);
          } else
            ((i = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(i)),
              (i[Xt] = t),
              (t.stateNode = i));
        }
        return (Ze(t), null);
      case 13:
        if (
          (Re(Oe),
          (i = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (_e && vt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (cd(), zr(), (t.flags |= 98560), (d = !1));
          else if (((d = Vs(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!d) throw Error(s(318));
              if (
                ((d = t.memoizedState),
                (d = d !== null ? d.dehydrated : null),
                !d)
              )
                throw Error(s(317));
              d[Xt] = t;
            } else
              (zr(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Ze(t), (d = !1));
          } else (Ot !== null && (Sa(Ot), (Ot = null)), (d = !0));
          if (!d) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = r), t)
          : ((i = i !== null),
            i !== (e !== null && e.memoizedState !== null) &&
              i &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (Oe.current & 1) !== 0
                  ? He === 0 && (He = 3)
                  : Na())),
            t.updateQueue !== null && (t.flags |= 4),
            Ze(t),
            null);
      case 4:
        return (
          Hr(),
          da(e, t),
          e === null && jo(t.stateNode.containerInfo),
          Ze(t),
          null
        );
      case 10:
        return (zl(t.type._context), Ze(t), null);
      case 17:
        return (ut(t.type) && Ds(), Ze(t), null);
      case 19:
        if ((Re(Oe), (d = t.memoizedState), d === null)) return (Ze(t), null);
        if (((i = (t.flags & 128) !== 0), (y = d.rendering), y === null))
          if (i) Bo(d, !1);
          else {
            if (He !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((y = Ks(e)), y !== null)) {
                  for (
                    t.flags |= 128,
                      Bo(d, !1),
                      i = y.updateQueue,
                      i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      i = r,
                      r = t.child;
                    r !== null;

                  )
                    ((d = r),
                      (e = i),
                      (d.flags &= 14680066),
                      (y = d.alternate),
                      y === null
                        ? ((d.childLanes = 0),
                          (d.lanes = e),
                          (d.child = null),
                          (d.subtreeFlags = 0),
                          (d.memoizedProps = null),
                          (d.memoizedState = null),
                          (d.updateQueue = null),
                          (d.dependencies = null),
                          (d.stateNode = null))
                        : ((d.childLanes = y.childLanes),
                          (d.lanes = y.lanes),
                          (d.child = y.child),
                          (d.subtreeFlags = 0),
                          (d.deletions = null),
                          (d.memoizedProps = y.memoizedProps),
                          (d.memoizedState = y.memoizedState),
                          (d.updateQueue = y.updateQueue),
                          (d.type = y.type),
                          (e = y.dependencies),
                          (d.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (r = r.sibling));
                  return (je(Oe, (Oe.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            d.tail !== null &&
              Fe() > qr &&
              ((t.flags |= 128), (i = !0), Bo(d, !1), (t.lanes = 4194304));
          }
        else {
          if (!i)
            if (((e = Ks(y)), e !== null)) {
              if (
                ((t.flags |= 128),
                (i = !0),
                (r = e.updateQueue),
                r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                Bo(d, !0),
                d.tail === null &&
                  d.tailMode === "hidden" &&
                  !y.alternate &&
                  !_e)
              )
                return (Ze(t), null);
            } else
              2 * Fe() - d.renderingStartTime > qr &&
                r !== 1073741824 &&
                ((t.flags |= 128), (i = !0), Bo(d, !1), (t.lanes = 4194304));
          d.isBackwards
            ? ((y.sibling = t.child), (t.child = y))
            : ((r = d.last),
              r !== null ? (r.sibling = y) : (t.child = y),
              (d.last = y));
        }
        return d.tail !== null
          ? ((t = d.tail),
            (d.rendering = t),
            (d.tail = t.sibling),
            (d.renderingStartTime = Fe()),
            (t.sibling = null),
            (r = Oe.current),
            je(Oe, i ? (r & 1) | 2 : r & 1),
            t)
          : (Ze(t), null);
      case 22:
      case 23:
        return (
          Ea(),
          (i = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== i && (t.flags |= 8192),
          i && (t.mode & 1) !== 0
            ? (xt & 1073741824) !== 0 &&
              (Ze(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ze(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function xy(e, t) {
    switch ((_l(t), t.tag)) {
      case 1:
        return (
          ut(t.type) && Ds(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Hr(),
          Re(at),
          Re(Je),
          Ql(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Wl(t), null);
      case 13:
        if (
          (Re(Oe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          zr();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (Re(Oe), null);
      case 4:
        return (Hr(), null);
      case 10:
        return (zl(t.type._context), null);
      case 22:
      case 23:
        return (Ea(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ri = !1,
    et = !1,
    wy = typeof WeakSet == "function" ? WeakSet : Set,
    se = null;
  function $r(e, t) {
    var r = e.ref;
    if (r !== null)
      if (typeof r == "function")
        try {
          r(null);
        } catch (i) {
          De(e, t, i);
        }
      else r.current = null;
  }
  function fa(e, t, r) {
    try {
      r();
    } catch (i) {
      De(e, t, i);
    }
  }
  var uf = !1;
  function by(e, t) {
    if (((El = Cs), (e = Bc()), gl(e))) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = ((r = e.ownerDocument) && r.defaultView) || window;
          var i = r.getSelection && r.getSelection();
          if (i && i.rangeCount !== 0) {
            r = i.anchorNode;
            var u = i.anchorOffset,
              d = i.focusNode;
            i = i.focusOffset;
            try {
              (r.nodeType, d.nodeType);
            } catch {
              r = null;
              break e;
            }
            var y = 0,
              E = -1,
              k = -1,
              I = 0,
              Q = 0,
              G = e,
              $ = null;
            t: for (;;) {
              for (
                var re;
                G !== r || (u !== 0 && G.nodeType !== 3) || (E = y + u),
                  G !== d || (i !== 0 && G.nodeType !== 3) || (k = y + i),
                  G.nodeType === 3 && (y += G.nodeValue.length),
                  (re = G.firstChild) !== null;

              )
                (($ = G), (G = re));
              for (;;) {
                if (G === e) break t;
                if (
                  ($ === r && ++I === u && (E = y),
                  $ === d && ++Q === i && (k = y),
                  (re = G.nextSibling) !== null)
                )
                  break;
                ((G = $), ($ = G.parentNode));
              }
              G = re;
            }
            r = E === -1 || k === -1 ? null : { start: E, end: k };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      Nl = { focusedElem: e, selectionRange: r }, Cs = !1, se = t;
      se !== null;

    )
      if (
        ((t = se), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (se = e));
      else
        for (; se !== null; ) {
          t = se;
          try {
            var le = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (le !== null) {
                    var ce = le.memoizedProps,
                      ze = le.memoizedState,
                      _ = t.stateNode,
                      T = _.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? ce : It(t.type, ce),
                        ze,
                      );
                    _.__reactInternalSnapshotBeforeUpdate = T;
                  }
                  break;
                case 3:
                  var L = t.stateNode.containerInfo;
                  L.nodeType === 1
                    ? (L.textContent = "")
                    : L.nodeType === 9 &&
                      L.documentElement &&
                      L.removeChild(L.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(s(163));
              }
          } catch (ee) {
            De(t, t.return, ee);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (se = e));
            break;
          }
          se = t.return;
        }
    return ((le = uf), (uf = !1), le);
  }
  function Uo(e, t, r) {
    var i = t.updateQueue;
    if (((i = i !== null ? i.lastEffect : null), i !== null)) {
      var u = (i = i.next);
      do {
        if ((u.tag & e) === e) {
          var d = u.destroy;
          ((u.destroy = void 0), d !== void 0 && fa(t, r, d));
        }
        u = u.next;
      } while (u !== i);
    }
  }
  function oi(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var r = (t = t.next);
      do {
        if ((r.tag & e) === e) {
          var i = r.create;
          r.destroy = i();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function pa(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      switch (e.tag) {
        case 5:
          e = r;
          break;
        default:
          e = r;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function cf(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), cf(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Xt],
          delete t[Ro],
          delete t[Tl],
          delete t[ry],
          delete t[oy])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function df(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ff(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || df(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ha(e, t, r) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode),
        t
          ? r.nodeType === 8
            ? r.parentNode.insertBefore(e, t)
            : r.insertBefore(e, t)
          : (r.nodeType === 8
              ? ((t = r.parentNode), t.insertBefore(e, r))
              : ((t = r), t.appendChild(e)),
            (r = r._reactRootContainer),
            r != null || t.onclick !== null || (t.onclick = Os)));
    else if (i !== 4 && ((e = e.child), e !== null))
      for (ha(e, t, r), e = e.sibling; e !== null; )
        (ha(e, t, r), (e = e.sibling));
  }
  function ma(e, t, r) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
    else if (i !== 4 && ((e = e.child), e !== null))
      for (ma(e, t, r), e = e.sibling; e !== null; )
        (ma(e, t, r), (e = e.sibling));
  }
  var Ye = null,
    Dt = !1;
  function Dn(e, t, r) {
    for (r = r.child; r !== null; ) (pf(e, t, r), (r = r.sibling));
  }
  function pf(e, t, r) {
    if (Jt && typeof Jt.onCommitFiberUnmount == "function")
      try {
        Jt.onCommitFiberUnmount(ys, r);
      } catch {}
    switch (r.tag) {
      case 5:
        et || $r(r, t);
      case 6:
        var i = Ye,
          u = Dt;
        ((Ye = null),
          Dn(e, t, r),
          (Ye = i),
          (Dt = u),
          Ye !== null &&
            (Dt
              ? ((e = Ye),
                (r = r.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(r)
                  : e.removeChild(r))
              : Ye.removeChild(r.stateNode)));
        break;
      case 18:
        Ye !== null &&
          (Dt
            ? ((e = Ye),
              (r = r.stateNode),
              e.nodeType === 8
                ? jl(e.parentNode, r)
                : e.nodeType === 1 && jl(e, r),
              xo(e))
            : jl(Ye, r.stateNode));
        break;
      case 4:
        ((i = Ye),
          (u = Dt),
          (Ye = r.stateNode.containerInfo),
          (Dt = !0),
          Dn(e, t, r),
          (Ye = i),
          (Dt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !et &&
          ((i = r.updateQueue), i !== null && ((i = i.lastEffect), i !== null))
        ) {
          u = i = i.next;
          do {
            var d = u,
              y = d.destroy;
            ((d = d.tag),
              y !== void 0 && ((d & 2) !== 0 || (d & 4) !== 0) && fa(r, t, y),
              (u = u.next));
          } while (u !== i);
        }
        Dn(e, t, r);
        break;
      case 1:
        if (
          !et &&
          ($r(r, t),
          (i = r.stateNode),
          typeof i.componentWillUnmount == "function")
        )
          try {
            ((i.props = r.memoizedProps),
              (i.state = r.memoizedState),
              i.componentWillUnmount());
          } catch (E) {
            De(r, t, E);
          }
        Dn(e, t, r);
        break;
      case 21:
        Dn(e, t, r);
        break;
      case 22:
        r.mode & 1
          ? ((et = (i = et) || r.memoizedState !== null), Dn(e, t, r), (et = i))
          : Dn(e, t, r);
        break;
      default:
        Dn(e, t, r);
    }
  }
  function hf(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      (r === null && (r = e.stateNode = new wy()),
        t.forEach(function (i) {
          var u = Ry.bind(null, e, i);
          r.has(i) || (r.add(i), i.then(u, u));
        }));
    }
  }
  function Ft(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var i = 0; i < r.length; i++) {
        var u = r[i];
        try {
          var d = e,
            y = t,
            E = y;
          e: for (; E !== null; ) {
            switch (E.tag) {
              case 5:
                ((Ye = E.stateNode), (Dt = !1));
                break e;
              case 3:
                ((Ye = E.stateNode.containerInfo), (Dt = !0));
                break e;
              case 4:
                ((Ye = E.stateNode.containerInfo), (Dt = !0));
                break e;
            }
            E = E.return;
          }
          if (Ye === null) throw Error(s(160));
          (pf(d, y, u), (Ye = null), (Dt = !1));
          var k = u.alternate;
          (k !== null && (k.return = null), (u.return = null));
        } catch (I) {
          De(u, t, I);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (mf(t, e), (t = t.sibling));
  }
  function mf(e, t) {
    var r = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Ft(t, e), tn(e), i & 4)) {
          try {
            (Uo(3, e, e.return), oi(3, e));
          } catch (ce) {
            De(e, e.return, ce);
          }
          try {
            Uo(5, e, e.return);
          } catch (ce) {
            De(e, e.return, ce);
          }
        }
        break;
      case 1:
        (Ft(t, e), tn(e), i & 512 && r !== null && $r(r, r.return));
        break;
      case 5:
        if (
          (Ft(t, e),
          tn(e),
          i & 512 && r !== null && $r(r, r.return),
          e.flags & 32)
        ) {
          var u = e.stateNode;
          try {
            qt(u, "");
          } catch (ce) {
            De(e, e.return, ce);
          }
        }
        if (i & 4 && ((u = e.stateNode), u != null)) {
          var d = e.memoizedProps,
            y = r !== null ? r.memoizedProps : d,
            E = e.type,
            k = e.updateQueue;
          if (((e.updateQueue = null), k !== null))
            try {
              (E === "input" &&
                d.type === "radio" &&
                d.name != null &&
                io(u, d),
                uo(E, y));
              var I = uo(E, d);
              for (y = 0; y < k.length; y += 2) {
                var Q = k[y],
                  G = k[y + 1];
                Q === "style"
                  ? un(u, G)
                  : Q === "dangerouslySetInnerHTML"
                    ? cs(u, G)
                    : Q === "children"
                      ? qt(u, G)
                      : A(u, Q, G, I);
              }
              switch (E) {
                case "input":
                  lo(u, d);
                  break;
                case "textarea":
                  as(u, d);
                  break;
                case "select":
                  var $ = u._wrapperState.wasMultiple;
                  u._wrapperState.wasMultiple = !!d.multiple;
                  var re = d.value;
                  re != null
                    ? Et(u, !!d.multiple, re, !1)
                    : $ !== !!d.multiple &&
                      (d.defaultValue != null
                        ? Et(u, !!d.multiple, d.defaultValue, !0)
                        : Et(u, !!d.multiple, d.multiple ? [] : "", !1));
              }
              u[Ro] = d;
            } catch (ce) {
              De(e, e.return, ce);
            }
        }
        break;
      case 6:
        if ((Ft(t, e), tn(e), i & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((u = e.stateNode), (d = e.memoizedProps));
          try {
            u.nodeValue = d;
          } catch (ce) {
            De(e, e.return, ce);
          }
        }
        break;
      case 3:
        if (
          (Ft(t, e), tn(e), i & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            xo(t.containerInfo);
          } catch (ce) {
            De(e, e.return, ce);
          }
        break;
      case 4:
        (Ft(t, e), tn(e));
        break;
      case 13:
        (Ft(t, e),
          tn(e),
          (u = e.child),
          u.flags & 8192 &&
            ((d = u.memoizedState !== null),
            (u.stateNode.isHidden = d),
            !d ||
              (u.alternate !== null && u.alternate.memoizedState !== null) ||
              (va = Fe())),
          i & 4 && hf(e));
        break;
      case 22:
        if (
          ((Q = r !== null && r.memoizedState !== null),
          e.mode & 1 ? ((et = (I = et) || Q), Ft(t, e), (et = I)) : Ft(t, e),
          tn(e),
          i & 8192)
        ) {
          if (
            ((I = e.memoizedState !== null),
            (e.stateNode.isHidden = I) && !Q && (e.mode & 1) !== 0)
          )
            for (se = e, Q = e.child; Q !== null; ) {
              for (G = se = Q; se !== null; ) {
                switch ((($ = se), (re = $.child), $.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Uo(4, $, $.return);
                    break;
                  case 1:
                    $r($, $.return);
                    var le = $.stateNode;
                    if (typeof le.componentWillUnmount == "function") {
                      ((i = $), (r = $.return));
                      try {
                        ((t = i),
                          (le.props = t.memoizedProps),
                          (le.state = t.memoizedState),
                          le.componentWillUnmount());
                      } catch (ce) {
                        De(i, r, ce);
                      }
                    }
                    break;
                  case 5:
                    $r($, $.return);
                    break;
                  case 22:
                    if ($.memoizedState !== null) {
                      vf(G);
                      continue;
                    }
                }
                re !== null ? ((re.return = $), (se = re)) : vf(G);
              }
              Q = Q.sibling;
            }
          e: for (Q = null, G = e; ; ) {
            if (G.tag === 5) {
              if (Q === null) {
                Q = G;
                try {
                  ((u = G.stateNode),
                    I
                      ? ((d = u.style),
                        typeof d.setProperty == "function"
                          ? d.setProperty("display", "none", "important")
                          : (d.display = "none"))
                      : ((E = G.stateNode),
                        (k = G.memoizedProps.style),
                        (y =
                          k != null && k.hasOwnProperty("display")
                            ? k.display
                            : null),
                        (E.style.display = Er("display", y))));
                } catch (ce) {
                  De(e, e.return, ce);
                }
              }
            } else if (G.tag === 6) {
              if (Q === null)
                try {
                  G.stateNode.nodeValue = I ? "" : G.memoizedProps;
                } catch (ce) {
                  De(e, e.return, ce);
                }
            } else if (
              ((G.tag !== 22 && G.tag !== 23) ||
                G.memoizedState === null ||
                G === e) &&
              G.child !== null
            ) {
              ((G.child.return = G), (G = G.child));
              continue;
            }
            if (G === e) break e;
            for (; G.sibling === null; ) {
              if (G.return === null || G.return === e) break e;
              (Q === G && (Q = null), (G = G.return));
            }
            (Q === G && (Q = null),
              (G.sibling.return = G.return),
              (G = G.sibling));
          }
        }
        break;
      case 19:
        (Ft(t, e), tn(e), i & 4 && hf(e));
        break;
      case 21:
        break;
      default:
        (Ft(t, e), tn(e));
    }
  }
  function tn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (df(r)) {
              var i = r;
              break e;
            }
            r = r.return;
          }
          throw Error(s(160));
        }
        switch (i.tag) {
          case 5:
            var u = i.stateNode;
            i.flags & 32 && (qt(u, ""), (i.flags &= -33));
            var d = ff(e);
            ma(e, d, u);
            break;
          case 3:
          case 4:
            var y = i.stateNode.containerInfo,
              E = ff(e);
            ha(e, E, y);
            break;
          default:
            throw Error(s(161));
        }
      } catch (k) {
        De(e, e.return, k);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Sy(e, t, r) {
    ((se = e), gf(e));
  }
  function gf(e, t, r) {
    for (var i = (e.mode & 1) !== 0; se !== null; ) {
      var u = se,
        d = u.child;
      if (u.tag === 22 && i) {
        var y = u.memoizedState !== null || ri;
        if (!y) {
          var E = u.alternate,
            k = (E !== null && E.memoizedState !== null) || et;
          E = ri;
          var I = et;
          if (((ri = y), (et = k) && !I))
            for (se = u; se !== null; )
              ((y = se),
                (k = y.child),
                y.tag === 22 && y.memoizedState !== null
                  ? xf(u)
                  : k !== null
                    ? ((k.return = y), (se = k))
                    : xf(u));
          for (; d !== null; ) ((se = d), gf(d), (d = d.sibling));
          ((se = u), (ri = E), (et = I));
        }
        yf(e);
      } else
        (u.subtreeFlags & 8772) !== 0 && d !== null
          ? ((d.return = u), (se = d))
          : yf(e);
    }
  }
  function yf(e) {
    for (; se !== null; ) {
      var t = se;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                et || oi(5, t);
                break;
              case 1:
                var i = t.stateNode;
                if (t.flags & 4 && !et)
                  if (r === null) i.componentDidMount();
                  else {
                    var u =
                      t.elementType === t.type
                        ? r.memoizedProps
                        : It(t.type, r.memoizedProps);
                    i.componentDidUpdate(
                      u,
                      r.memoizedState,
                      i.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var d = t.updateQueue;
                d !== null && yd(t, d, i);
                break;
              case 3:
                var y = t.updateQueue;
                if (y !== null) {
                  if (((r = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        r = t.child.stateNode;
                        break;
                      case 1:
                        r = t.child.stateNode;
                    }
                  yd(t, y, r);
                }
                break;
              case 5:
                var E = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = E;
                  var k = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      k.autoFocus && r.focus();
                      break;
                    case "img":
                      k.src && (r.src = k.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var I = t.alternate;
                  if (I !== null) {
                    var Q = I.memoizedState;
                    if (Q !== null) {
                      var G = Q.dehydrated;
                      G !== null && xo(G);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(s(163));
            }
          et || (t.flags & 512 && pa(t));
        } catch ($) {
          De(t, t.return, $);
        }
      }
      if (t === e) {
        se = null;
        break;
      }
      if (((r = t.sibling), r !== null)) {
        ((r.return = t.return), (se = r));
        break;
      }
      se = t.return;
    }
  }
  function vf(e) {
    for (; se !== null; ) {
      var t = se;
      if (t === e) {
        se = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        ((r.return = t.return), (se = r));
        break;
      }
      se = t.return;
    }
  }
  function xf(e) {
    for (; se !== null; ) {
      var t = se;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              oi(4, t);
            } catch (k) {
              De(t, r, k);
            }
            break;
          case 1:
            var i = t.stateNode;
            if (typeof i.componentDidMount == "function") {
              var u = t.return;
              try {
                i.componentDidMount();
              } catch (k) {
                De(t, u, k);
              }
            }
            var d = t.return;
            try {
              pa(t);
            } catch (k) {
              De(t, d, k);
            }
            break;
          case 5:
            var y = t.return;
            try {
              pa(t);
            } catch (k) {
              De(t, y, k);
            }
        }
      } catch (k) {
        De(t, t.return, k);
      }
      if (t === e) {
        se = null;
        break;
      }
      var E = t.sibling;
      if (E !== null) {
        ((E.return = t.return), (se = E));
        break;
      }
      se = t.return;
    }
  }
  var Cy = Math.ceil,
    si = O.ReactCurrentDispatcher,
    ga = O.ReactCurrentOwner,
    Tt = O.ReactCurrentBatchConfig,
    Ce = 0,
    Qe = null,
    Ue = null,
    Ge = 0,
    xt = 0,
    Qr = An(0),
    He = 0,
    Vo = null,
    cr = 0,
    ii = 0,
    ya = 0,
    Ho = null,
    dt = null,
    va = 0,
    qr = 1 / 0,
    yn = null,
    li = !1,
    xa = null,
    Fn = null,
    ai = !1,
    zn = null,
    ui = 0,
    Wo = 0,
    wa = null,
    ci = -1,
    di = 0;
  function ot() {
    return (Ce & 6) !== 0 ? Fe() : ci !== -1 ? ci : (ci = Fe());
  }
  function Bn(e) {
    return (e.mode & 1) === 0
      ? 1
      : (Ce & 2) !== 0 && Ge !== 0
        ? Ge & -Ge
        : iy.transition !== null
          ? (di === 0 && (di = dc()), di)
          : ((e = ke),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : wc(e.type))),
            e);
  }
  function zt(e, t, r, i) {
    if (50 < Wo) throw ((Wo = 0), (wa = null), Error(s(185)));
    (ho(e, r, i),
      ((Ce & 2) === 0 || e !== Qe) &&
        (e === Qe && ((Ce & 2) === 0 && (ii |= r), He === 4 && Un(e, Ge)),
        ft(e, i),
        r === 1 &&
          Ce === 0 &&
          (t.mode & 1) === 0 &&
          ((qr = Fe() + 500), zs && Ln())));
  }
  function ft(e, t) {
    var r = e.callbackNode;
    ig(e, t);
    var i = ws(e, e === Qe ? Ge : 0);
    if (i === 0)
      (r !== null && ac(r), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = i & -i), e.callbackPriority !== t)) {
      if ((r != null && ac(r), t === 1))
        (e.tag === 0 ? sy(bf.bind(null, e)) : sd(bf.bind(null, e)),
          ty(function () {
            (Ce & 6) === 0 && Ln();
          }),
          (r = null));
      else {
        switch (fc(i)) {
          case 1:
            r = Zi;
            break;
          case 4:
            r = uc;
            break;
          case 16:
            r = gs;
            break;
          case 536870912:
            r = cc;
            break;
          default:
            r = gs;
        }
        r = Tf(r, wf.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = r));
    }
  }
  function wf(e, t) {
    if (((ci = -1), (di = 0), (Ce & 6) !== 0)) throw Error(s(327));
    var r = e.callbackNode;
    if (Kr() && e.callbackNode !== r) return null;
    var i = ws(e, e === Qe ? Ge : 0);
    if (i === 0) return null;
    if ((i & 30) !== 0 || (i & e.expiredLanes) !== 0 || t) t = fi(e, i);
    else {
      t = i;
      var u = Ce;
      Ce |= 2;
      var d = Cf();
      (Qe !== e || Ge !== t) && ((yn = null), (qr = Fe() + 500), fr(e, t));
      do
        try {
          ky();
          break;
        } catch (E) {
          Sf(e, E);
        }
      while (!0);
      (Fl(),
        (si.current = d),
        (Ce = u),
        Ue !== null ? (t = 0) : ((Qe = null), (Ge = 0), (t = He)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((u = el(e)), u !== 0 && ((i = u), (t = ba(e, u)))),
        t === 1)
      )
        throw ((r = Vo), fr(e, 0), Un(e, i), ft(e, Fe()), r);
      if (t === 6) Un(e, i);
      else {
        if (
          ((u = e.current.alternate),
          (i & 30) === 0 &&
            !Ey(u) &&
            ((t = fi(e, i)),
            t === 2 && ((d = el(e)), d !== 0 && ((i = d), (t = ba(e, d)))),
            t === 1))
        )
          throw ((r = Vo), fr(e, 0), Un(e, i), ft(e, Fe()), r);
        switch (((e.finishedWork = u), (e.finishedLanes = i), t)) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            pr(e, dt, yn);
            break;
          case 3:
            if (
              (Un(e, i),
              (i & 130023424) === i && ((t = va + 500 - Fe()), 10 < t))
            ) {
              if (ws(e, 0) !== 0) break;
              if (((u = e.suspendedLanes), (u & i) !== i)) {
                (ot(), (e.pingedLanes |= e.suspendedLanes & u));
                break;
              }
              e.timeoutHandle = Pl(pr.bind(null, e, dt, yn), t);
              break;
            }
            pr(e, dt, yn);
            break;
          case 4:
            if ((Un(e, i), (i & 4194240) === i)) break;
            for (t = e.eventTimes, u = -1; 0 < i; ) {
              var y = 31 - _t(i);
              ((d = 1 << y), (y = t[y]), y > u && (u = y), (i &= ~d));
            }
            if (
              ((i = u),
              (i = Fe() - i),
              (i =
                (120 > i
                  ? 120
                  : 480 > i
                    ? 480
                    : 1080 > i
                      ? 1080
                      : 1920 > i
                        ? 1920
                        : 3e3 > i
                          ? 3e3
                          : 4320 > i
                            ? 4320
                            : 1960 * Cy(i / 1960)) - i),
              10 < i)
            ) {
              e.timeoutHandle = Pl(pr.bind(null, e, dt, yn), i);
              break;
            }
            pr(e, dt, yn);
            break;
          case 5:
            pr(e, dt, yn);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return (ft(e, Fe()), e.callbackNode === r ? wf.bind(null, e) : null);
  }
  function ba(e, t) {
    var r = Ho;
    return (
      e.current.memoizedState.isDehydrated && (fr(e, t).flags |= 256),
      (e = fi(e, t)),
      e !== 2 && ((t = dt), (dt = r), t !== null && Sa(t)),
      e
    );
  }
  function Sa(e) {
    dt === null ? (dt = e) : dt.push.apply(dt, e);
  }
  function Ey(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && ((r = r.stores), r !== null))
          for (var i = 0; i < r.length; i++) {
            var u = r[i],
              d = u.getSnapshot;
            u = u.value;
            try {
              if (!Lt(d(), u)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
        ((r.return = t), (t = r));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Un(e, t) {
    for (
      t &= ~ya,
        t &= ~ii,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;

    ) {
      var r = 31 - _t(t),
        i = 1 << r;
      ((e[r] = -1), (t &= ~i));
    }
  }
  function bf(e) {
    if ((Ce & 6) !== 0) throw Error(s(327));
    Kr();
    var t = ws(e, 0);
    if ((t & 1) === 0) return (ft(e, Fe()), null);
    var r = fi(e, t);
    if (e.tag !== 0 && r === 2) {
      var i = el(e);
      i !== 0 && ((t = i), (r = ba(e, i)));
    }
    if (r === 1) throw ((r = Vo), fr(e, 0), Un(e, t), ft(e, Fe()), r);
    if (r === 6) throw Error(s(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      pr(e, dt, yn),
      ft(e, Fe()),
      null
    );
  }
  function Ca(e, t) {
    var r = Ce;
    Ce |= 1;
    try {
      return e(t);
    } finally {
      ((Ce = r), Ce === 0 && ((qr = Fe() + 500), zs && Ln()));
    }
  }
  function dr(e) {
    zn !== null && zn.tag === 0 && (Ce & 6) === 0 && Kr();
    var t = Ce;
    Ce |= 1;
    var r = Tt.transition,
      i = ke;
    try {
      if (((Tt.transition = null), (ke = 1), e)) return e();
    } finally {
      ((ke = i), (Tt.transition = r), (Ce = t), (Ce & 6) === 0 && Ln());
    }
  }
  function Ea() {
    ((xt = Qr.current), Re(Qr));
  }
  function fr(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var r = e.timeoutHandle;
    if ((r !== -1 && ((e.timeoutHandle = -1), ey(r)), Ue !== null))
      for (r = Ue.return; r !== null; ) {
        var i = r;
        switch ((_l(i), i.tag)) {
          case 1:
            ((i = i.type.childContextTypes), i != null && Ds());
            break;
          case 3:
            (Hr(), Re(at), Re(Je), Ql());
            break;
          case 5:
            Wl(i);
            break;
          case 4:
            Hr();
            break;
          case 13:
            Re(Oe);
            break;
          case 19:
            Re(Oe);
            break;
          case 10:
            zl(i.type._context);
            break;
          case 22:
          case 23:
            Ea();
        }
        r = r.return;
      }
    if (
      ((Qe = e),
      (Ue = e = Vn(e.current, null)),
      (Ge = xt = t),
      (He = 0),
      (Vo = null),
      (ya = ii = cr = 0),
      (dt = Ho = null),
      lr !== null)
    ) {
      for (t = 0; t < lr.length; t++)
        if (((r = lr[t]), (i = r.interleaved), i !== null)) {
          r.interleaved = null;
          var u = i.next,
            d = r.pending;
          if (d !== null) {
            var y = d.next;
            ((d.next = u), (i.next = y));
          }
          r.pending = i;
        }
      lr = null;
    }
    return e;
  }
  function Sf(e, t) {
    do {
      var r = Ue;
      try {
        if ((Fl(), (Ys.current = Zs), Gs)) {
          for (var i = Ie.memoizedState; i !== null; ) {
            var u = i.queue;
            (u !== null && (u.pending = null), (i = i.next));
          }
          Gs = !1;
        }
        if (
          ((ur = 0),
          ($e = Ve = Ie = null),
          (Io = !1),
          (Do = 0),
          (ga.current = null),
          r === null || r.return === null)
        ) {
          ((He = 1), (Vo = t), (Ue = null));
          break;
        }
        e: {
          var d = e,
            y = r.return,
            E = r,
            k = t;
          if (
            ((t = Ge),
            (E.flags |= 32768),
            k !== null && typeof k == "object" && typeof k.then == "function")
          ) {
            var I = k,
              Q = E,
              G = Q.tag;
            if ((Q.mode & 1) === 0 && (G === 0 || G === 11 || G === 15)) {
              var $ = Q.alternate;
              $
                ? ((Q.updateQueue = $.updateQueue),
                  (Q.memoizedState = $.memoizedState),
                  (Q.lanes = $.lanes))
                : ((Q.updateQueue = null), (Q.memoizedState = null));
            }
            var re = Qd(y);
            if (re !== null) {
              ((re.flags &= -257),
                qd(re, y, E, d, t),
                re.mode & 1 && $d(d, I, t),
                (t = re),
                (k = I));
              var le = t.updateQueue;
              if (le === null) {
                var ce = new Set();
                (ce.add(k), (t.updateQueue = ce));
              } else le.add(k);
              break e;
            } else {
              if ((t & 1) === 0) {
                ($d(d, I, t), Na());
                break e;
              }
              k = Error(s(426));
            }
          } else if (_e && E.mode & 1) {
            var ze = Qd(y);
            if (ze !== null) {
              ((ze.flags & 65536) === 0 && (ze.flags |= 256),
                qd(ze, y, E, d, t),
                Il(Wr(k, E)));
              break e;
            }
          }
          ((d = k = Wr(k, E)),
            He !== 4 && (He = 2),
            Ho === null ? (Ho = [d]) : Ho.push(d),
            (d = y));
          do {
            switch (d.tag) {
              case 3:
                ((d.flags |= 65536), (t &= -t), (d.lanes |= t));
                var _ = Hd(d, k, t);
                gd(d, _);
                break e;
              case 1:
                E = k;
                var T = d.type,
                  L = d.stateNode;
                if (
                  (d.flags & 128) === 0 &&
                  (typeof T.getDerivedStateFromError == "function" ||
                    (L !== null &&
                      typeof L.componentDidCatch == "function" &&
                      (Fn === null || !Fn.has(L))))
                ) {
                  ((d.flags |= 65536), (t &= -t), (d.lanes |= t));
                  var ee = Wd(d, E, t);
                  gd(d, ee);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Nf(r);
      } catch (de) {
        ((t = de), Ue === r && r !== null && (Ue = r = r.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Cf() {
    var e = si.current;
    return ((si.current = Zs), e === null ? Zs : e);
  }
  function Na() {
    ((He === 0 || He === 3 || He === 2) && (He = 4),
      Qe === null ||
        ((cr & 268435455) === 0 && (ii & 268435455) === 0) ||
        Un(Qe, Ge));
  }
  function fi(e, t) {
    var r = Ce;
    Ce |= 2;
    var i = Cf();
    (Qe !== e || Ge !== t) && ((yn = null), fr(e, t));
    do
      try {
        Ny();
        break;
      } catch (u) {
        Sf(e, u);
      }
    while (!0);
    if ((Fl(), (Ce = r), (si.current = i), Ue !== null)) throw Error(s(261));
    return ((Qe = null), (Ge = 0), He);
  }
  function Ny() {
    for (; Ue !== null; ) Ef(Ue);
  }
  function ky() {
    for (; Ue !== null && !Jm(); ) Ef(Ue);
  }
  function Ef(e) {
    var t = jf(e.alternate, e, xt);
    ((e.memoizedProps = e.pendingProps),
      t === null ? Nf(e) : (Ue = t),
      (ga.current = null));
  }
  function Nf(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((r = vy(r, t, xt)), r !== null)) {
          Ue = r;
          return;
        }
      } else {
        if (((r = xy(r, t)), r !== null)) {
          ((r.flags &= 32767), (Ue = r));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((He = 6), (Ue = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Ue = t;
        return;
      }
      Ue = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function pr(e, t, r) {
    var i = ke,
      u = Tt.transition;
    try {
      ((Tt.transition = null), (ke = 1), Py(e, t, r, i));
    } finally {
      ((Tt.transition = u), (ke = i));
    }
    return null;
  }
  function Py(e, t, r, i) {
    do Kr();
    while (zn !== null);
    if ((Ce & 6) !== 0) throw Error(s(327));
    r = e.finishedWork;
    var u = e.finishedLanes;
    if (r === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
      throw Error(s(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var d = r.lanes | r.childLanes;
    if (
      (lg(e, d),
      e === Qe && ((Ue = Qe = null), (Ge = 0)),
      ((r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0) ||
        ai ||
        ((ai = !0),
        Tf(gs, function () {
          return (Kr(), null);
        })),
      (d = (r.flags & 15990) !== 0),
      (r.subtreeFlags & 15990) !== 0 || d)
    ) {
      ((d = Tt.transition), (Tt.transition = null));
      var y = ke;
      ke = 1;
      var E = Ce;
      ((Ce |= 4),
        (ga.current = null),
        by(e, r),
        mf(r, e),
        qg(Nl),
        (Cs = !!El),
        (Nl = El = null),
        (e.current = r),
        Sy(r),
        Xm(),
        (Ce = E),
        (ke = y),
        (Tt.transition = d));
    } else e.current = r;
    if (
      (ai && ((ai = !1), (zn = e), (ui = u)),
      (d = e.pendingLanes),
      d === 0 && (Fn = null),
      tg(r.stateNode),
      ft(e, Fe()),
      t !== null)
    )
      for (i = e.onRecoverableError, r = 0; r < t.length; r++)
        ((u = t[r]), i(u.value, { componentStack: u.stack, digest: u.digest }));
    if (li) throw ((li = !1), (e = xa), (xa = null), e);
    return (
      (ui & 1) !== 0 && e.tag !== 0 && Kr(),
      (d = e.pendingLanes),
      (d & 1) !== 0 ? (e === wa ? Wo++ : ((Wo = 0), (wa = e))) : (Wo = 0),
      Ln(),
      null
    );
  }
  function Kr() {
    if (zn !== null) {
      var e = fc(ui),
        t = Tt.transition,
        r = ke;
      try {
        if (((Tt.transition = null), (ke = 16 > e ? 16 : e), zn === null))
          var i = !1;
        else {
          if (((e = zn), (zn = null), (ui = 0), (Ce & 6) !== 0))
            throw Error(s(331));
          var u = Ce;
          for (Ce |= 4, se = e.current; se !== null; ) {
            var d = se,
              y = d.child;
            if ((se.flags & 16) !== 0) {
              var E = d.deletions;
              if (E !== null) {
                for (var k = 0; k < E.length; k++) {
                  var I = E[k];
                  for (se = I; se !== null; ) {
                    var Q = se;
                    switch (Q.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Uo(8, Q, d);
                    }
                    var G = Q.child;
                    if (G !== null) ((G.return = Q), (se = G));
                    else
                      for (; se !== null; ) {
                        Q = se;
                        var $ = Q.sibling,
                          re = Q.return;
                        if ((cf(Q), Q === I)) {
                          se = null;
                          break;
                        }
                        if ($ !== null) {
                          (($.return = re), (se = $));
                          break;
                        }
                        se = re;
                      }
                  }
                }
                var le = d.alternate;
                if (le !== null) {
                  var ce = le.child;
                  if (ce !== null) {
                    le.child = null;
                    do {
                      var ze = ce.sibling;
                      ((ce.sibling = null), (ce = ze));
                    } while (ce !== null);
                  }
                }
                se = d;
              }
            }
            if ((d.subtreeFlags & 2064) !== 0 && y !== null)
              ((y.return = d), (se = y));
            else
              e: for (; se !== null; ) {
                if (((d = se), (d.flags & 2048) !== 0))
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Uo(9, d, d.return);
                  }
                var _ = d.sibling;
                if (_ !== null) {
                  ((_.return = d.return), (se = _));
                  break e;
                }
                se = d.return;
              }
          }
          var T = e.current;
          for (se = T; se !== null; ) {
            y = se;
            var L = y.child;
            if ((y.subtreeFlags & 2064) !== 0 && L !== null)
              ((L.return = y), (se = L));
            else
              e: for (y = T; se !== null; ) {
                if (((E = se), (E.flags & 2048) !== 0))
                  try {
                    switch (E.tag) {
                      case 0:
                      case 11:
                      case 15:
                        oi(9, E);
                    }
                  } catch (de) {
                    De(E, E.return, de);
                  }
                if (E === y) {
                  se = null;
                  break e;
                }
                var ee = E.sibling;
                if (ee !== null) {
                  ((ee.return = E.return), (se = ee));
                  break e;
                }
                se = E.return;
              }
          }
          if (
            ((Ce = u),
            Ln(),
            Jt && typeof Jt.onPostCommitFiberRoot == "function")
          )
            try {
              Jt.onPostCommitFiberRoot(ys, e);
            } catch {}
          i = !0;
        }
        return i;
      } finally {
        ((ke = r), (Tt.transition = t));
      }
    }
    return !1;
  }
  function kf(e, t, r) {
    ((t = Wr(r, t)),
      (t = Hd(e, t, 1)),
      (e = In(e, t, 1)),
      (t = ot()),
      e !== null && (ho(e, 1, t), ft(e, t)));
  }
  function De(e, t, r) {
    if (e.tag === 3) kf(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          kf(t, e, r);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (Fn === null || !Fn.has(i)))
          ) {
            ((e = Wr(r, e)),
              (e = Wd(t, e, 1)),
              (t = In(t, e, 1)),
              (e = ot()),
              t !== null && (ho(t, 1, e), ft(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function jy(e, t, r) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (t = ot()),
      (e.pingedLanes |= e.suspendedLanes & r),
      Qe === e &&
        (Ge & r) === r &&
        (He === 4 || (He === 3 && (Ge & 130023424) === Ge && 500 > Fe() - va)
          ? fr(e, 0)
          : (ya |= r)),
      ft(e, t));
  }
  function Pf(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = xs), (xs <<= 1), (xs & 130023424) === 0 && (xs = 4194304)));
    var r = ot();
    ((e = hn(e, t)), e !== null && (ho(e, t, r), ft(e, r)));
  }
  function Ty(e) {
    var t = e.memoizedState,
      r = 0;
    (t !== null && (r = t.retryLane), Pf(e, r));
  }
  function Ry(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var i = e.stateNode,
          u = e.memoizedState;
        u !== null && (r = u.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      default:
        throw Error(s(314));
    }
    (i !== null && i.delete(t), Pf(e, r));
  }
  var jf;
  jf = function (e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || at.current) ct = !0;
      else {
        if ((e.lanes & r) === 0 && (t.flags & 128) === 0)
          return ((ct = !1), yy(e, t, r));
        ct = (e.flags & 131072) !== 0;
      }
    else ((ct = !1), _e && (t.flags & 1048576) !== 0 && id(t, Us, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var i = t.type;
        (ni(e, t), (e = t.pendingProps));
        var u = Ir(t, Je.current);
        (Vr(t, r), (u = Yl(null, t, i, e, u, r)));
        var d = Gl();
        return (
          (t.flags |= 1),
          typeof u == "object" &&
          u !== null &&
          typeof u.render == "function" &&
          u.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              ut(i) ? ((d = !0), Fs(t)) : (d = !1),
              (t.memoizedState =
                u.state !== null && u.state !== void 0 ? u.state : null),
              Vl(t),
              (u.updater = ei),
              (t.stateNode = u),
              (u._reactInternals = t),
              na(t, i, e, r),
              (t = ia(null, t, i, !0, d, r)))
            : ((t.tag = 0), _e && d && Al(t), rt(null, t, u, r), (t = t.child)),
          t
        );
      case 16:
        i = t.elementType;
        e: {
          switch (
            (ni(e, t),
            (e = t.pendingProps),
            (u = i._init),
            (i = u(i._payload)),
            (t.type = i),
            (u = t.tag = Ay(i)),
            (e = It(i, e)),
            u)
          ) {
            case 0:
              t = sa(null, t, i, e, r);
              break e;
            case 1:
              t = Zd(null, t, i, e, r);
              break e;
            case 11:
              t = Kd(null, t, i, e, r);
              break e;
            case 14:
              t = Yd(null, t, i, It(i.type, e), r);
              break e;
          }
          throw Error(s(306, i, ""));
        }
        return t;
      case 0:
        return (
          (i = t.type),
          (u = t.pendingProps),
          (u = t.elementType === i ? u : It(i, u)),
          sa(e, t, i, u, r)
        );
      case 1:
        return (
          (i = t.type),
          (u = t.pendingProps),
          (u = t.elementType === i ? u : It(i, u)),
          Zd(e, t, i, u, r)
        );
      case 3:
        e: {
          if ((ef(t), e === null)) throw Error(s(387));
          ((i = t.pendingProps),
            (d = t.memoizedState),
            (u = d.element),
            md(e, t),
            qs(t, i, null, r));
          var y = t.memoizedState;
          if (((i = y.element), d.isDehydrated))
            if (
              ((d = {
                element: i,
                isDehydrated: !1,
                cache: y.cache,
                pendingSuspenseBoundaries: y.pendingSuspenseBoundaries,
                transitions: y.transitions,
              }),
              (t.updateQueue.baseState = d),
              (t.memoizedState = d),
              t.flags & 256)
            ) {
              ((u = Wr(Error(s(423)), t)), (t = tf(e, t, i, r, u)));
              break e;
            } else if (i !== u) {
              ((u = Wr(Error(s(424)), t)), (t = tf(e, t, i, r, u)));
              break e;
            } else
              for (
                vt = Mn(t.stateNode.containerInfo.firstChild),
                  yt = t,
                  _e = !0,
                  Ot = null,
                  r = pd(t, null, i, r),
                  t.child = r;
                r;

              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
          else {
            if ((zr(), i === u)) {
              t = gn(e, t, r);
              break e;
            }
            rt(e, t, i, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          vd(t),
          e === null && Ol(t),
          (i = t.type),
          (u = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (y = u.children),
          kl(i, u) ? (y = null) : d !== null && kl(i, d) && (t.flags |= 32),
          Xd(e, t),
          rt(e, t, y, r),
          t.child
        );
      case 6:
        return (e === null && Ol(t), null);
      case 13:
        return nf(e, t, r);
      case 4:
        return (
          Hl(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = Br(t, null, i, r)) : rt(e, t, i, r),
          t.child
        );
      case 11:
        return (
          (i = t.type),
          (u = t.pendingProps),
          (u = t.elementType === i ? u : It(i, u)),
          Kd(e, t, i, u, r)
        );
      case 7:
        return (rt(e, t, t.pendingProps, r), t.child);
      case 8:
        return (rt(e, t, t.pendingProps.children, r), t.child);
      case 12:
        return (rt(e, t, t.pendingProps.children, r), t.child);
      case 10:
        e: {
          if (
            ((i = t.type._context),
            (u = t.pendingProps),
            (d = t.memoizedProps),
            (y = u.value),
            je(Ws, i._currentValue),
            (i._currentValue = y),
            d !== null)
          )
            if (Lt(d.value, y)) {
              if (d.children === u.children && !at.current) {
                t = gn(e, t, r);
                break e;
              }
            } else
              for (d = t.child, d !== null && (d.return = t); d !== null; ) {
                var E = d.dependencies;
                if (E !== null) {
                  y = d.child;
                  for (var k = E.firstContext; k !== null; ) {
                    if (k.context === i) {
                      if (d.tag === 1) {
                        ((k = mn(-1, r & -r)), (k.tag = 2));
                        var I = d.updateQueue;
                        if (I !== null) {
                          I = I.shared;
                          var Q = I.pending;
                          (Q === null
                            ? (k.next = k)
                            : ((k.next = Q.next), (Q.next = k)),
                            (I.pending = k));
                        }
                      }
                      ((d.lanes |= r),
                        (k = d.alternate),
                        k !== null && (k.lanes |= r),
                        Bl(d.return, r, t),
                        (E.lanes |= r));
                      break;
                    }
                    k = k.next;
                  }
                } else if (d.tag === 10) y = d.type === t.type ? null : d.child;
                else if (d.tag === 18) {
                  if (((y = d.return), y === null)) throw Error(s(341));
                  ((y.lanes |= r),
                    (E = y.alternate),
                    E !== null && (E.lanes |= r),
                    Bl(y, r, t),
                    (y = d.sibling));
                } else y = d.child;
                if (y !== null) y.return = d;
                else
                  for (y = d; y !== null; ) {
                    if (y === t) {
                      y = null;
                      break;
                    }
                    if (((d = y.sibling), d !== null)) {
                      ((d.return = y.return), (y = d));
                      break;
                    }
                    y = y.return;
                  }
                d = y;
              }
          (rt(e, t, u.children, r), (t = t.child));
        }
        return t;
      case 9:
        return (
          (u = t.type),
          (i = t.pendingProps.children),
          Vr(t, r),
          (u = Pt(u)),
          (i = i(u)),
          (t.flags |= 1),
          rt(e, t, i, r),
          t.child
        );
      case 14:
        return (
          (i = t.type),
          (u = It(i, t.pendingProps)),
          (u = It(i.type, u)),
          Yd(e, t, i, u, r)
        );
      case 15:
        return Gd(e, t, t.type, t.pendingProps, r);
      case 17:
        return (
          (i = t.type),
          (u = t.pendingProps),
          (u = t.elementType === i ? u : It(i, u)),
          ni(e, t),
          (t.tag = 1),
          ut(i) ? ((e = !0), Fs(t)) : (e = !1),
          Vr(t, r),
          Ud(t, i, u),
          na(t, i, u, r),
          ia(null, t, i, !0, e, r)
        );
      case 19:
        return of(e, t, r);
      case 22:
        return Jd(e, t, r);
    }
    throw Error(s(156, t.tag));
  };
  function Tf(e, t) {
    return lc(e, t);
  }
  function My(e, t, r, i) {
    ((this.tag = e),
      (this.key = r),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Rt(e, t, r, i) {
    return new My(e, t, r, i);
  }
  function ka(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Ay(e) {
    if (typeof e == "function") return ka(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === V)) return 11;
      if (e === me) return 14;
    }
    return 2;
  }
  function Vn(e, t) {
    var r = e.alternate;
    return (
      r === null
        ? ((r = Rt(e.tag, t, e.key, e.mode)),
          (r.elementType = e.elementType),
          (r.type = e.type),
          (r.stateNode = e.stateNode),
          (r.alternate = e),
          (e.alternate = r))
        : ((r.pendingProps = t),
          (r.type = e.type),
          (r.flags = 0),
          (r.subtreeFlags = 0),
          (r.deletions = null)),
      (r.flags = e.flags & 14680064),
      (r.childLanes = e.childLanes),
      (r.lanes = e.lanes),
      (r.child = e.child),
      (r.memoizedProps = e.memoizedProps),
      (r.memoizedState = e.memoizedState),
      (r.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (r.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (r.sibling = e.sibling),
      (r.index = e.index),
      (r.ref = e.ref),
      r
    );
  }
  function pi(e, t, r, i, u, d) {
    var y = 2;
    if (((i = e), typeof e == "function")) ka(e) && (y = 1);
    else if (typeof e == "string") y = 5;
    else
      e: switch (e) {
        case B:
          return hr(r.children, u, d, t);
        case Y:
          ((y = 8), (u |= 8));
          break;
        case K:
          return (
            (e = Rt(12, r, t, u | 2)),
            (e.elementType = K),
            (e.lanes = d),
            e
          );
        case J:
          return ((e = Rt(13, r, t, u)), (e.elementType = J), (e.lanes = d), e);
        case U:
          return ((e = Rt(19, r, t, u)), (e.elementType = U), (e.lanes = d), e);
        case ae:
          return hi(r, u, d, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case X:
                y = 10;
                break e;
              case Z:
                y = 9;
                break e;
              case V:
                y = 11;
                break e;
              case me:
                y = 14;
                break e;
              case ue:
                ((y = 16), (i = null));
                break e;
            }
          throw Error(s(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = Rt(y, r, t, u)),
      (t.elementType = e),
      (t.type = i),
      (t.lanes = d),
      t
    );
  }
  function hr(e, t, r, i) {
    return ((e = Rt(7, e, i, t)), (e.lanes = r), e);
  }
  function hi(e, t, r, i) {
    return (
      (e = Rt(22, e, i, t)),
      (e.elementType = ae),
      (e.lanes = r),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function Pa(e, t, r) {
    return ((e = Rt(6, e, null, t)), (e.lanes = r), e);
  }
  function ja(e, t, r) {
    return (
      (t = Rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = r),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function _y(e, t, r, i, u) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = tl(0)),
      (this.expirationTimes = tl(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = tl(0)),
      (this.identifierPrefix = i),
      (this.onRecoverableError = u),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Ta(e, t, r, i, u, d, y, E, k) {
    return (
      (e = new _y(e, t, r, E, k)),
      t === 1 ? ((t = 1), d === !0 && (t |= 8)) : (t = 0),
      (d = Rt(3, null, null, t)),
      (e.current = d),
      (d.stateNode = e),
      (d.memoizedState = {
        element: i,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Vl(d),
      e
    );
  }
  function Ly(e, t, r) {
    var i =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: F,
      key: i == null ? null : "" + i,
      children: e,
      containerInfo: t,
      implementation: r,
    };
  }
  function Rf(e) {
    if (!e) return _n;
    e = e._reactInternals;
    e: {
      if (nr(e) !== e || e.tag !== 1) throw Error(s(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (ut(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(s(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (ut(r)) return rd(e, r, t);
    }
    return t;
  }
  function Mf(e, t, r, i, u, d, y, E, k) {
    return (
      (e = Ta(r, i, !0, e, u, d, y, E, k)),
      (e.context = Rf(null)),
      (r = e.current),
      (i = ot()),
      (u = Bn(r)),
      (d = mn(i, u)),
      (d.callback = t ?? null),
      In(r, d, u),
      (e.current.lanes = u),
      ho(e, u, i),
      ft(e, i),
      e
    );
  }
  function mi(e, t, r, i) {
    var u = t.current,
      d = ot(),
      y = Bn(u);
    return (
      (r = Rf(r)),
      t.context === null ? (t.context = r) : (t.pendingContext = r),
      (t = mn(d, y)),
      (t.payload = { element: e }),
      (i = i === void 0 ? null : i),
      i !== null && (t.callback = i),
      (e = In(u, t, y)),
      e !== null && (zt(e, u, y, d), Qs(e, u, y)),
      y
    );
  }
  function gi(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function Af(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function Ra(e, t) {
    (Af(e, t), (e = e.alternate) && Af(e, t));
  }
  function Oy() {
    return null;
  }
  var _f =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Ma(e) {
    this._internalRoot = e;
  }
  ((yi.prototype.render = Ma.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      mi(e, t, null, null);
    }),
    (yi.prototype.unmount = Ma.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (dr(function () {
            mi(null, e, null, null);
          }),
            (t[cn] = null));
        }
      }));
  function yi(e) {
    this._internalRoot = e;
  }
  yi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = mc();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < jn.length && t !== 0 && t < jn[r].priority; r++);
      (jn.splice(r, 0, e), r === 0 && vc(e));
    }
  };
  function Aa(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function vi(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Lf() {}
  function Iy(e, t, r, i, u) {
    if (u) {
      if (typeof i == "function") {
        var d = i;
        i = function () {
          var I = gi(y);
          d.call(I);
        };
      }
      var y = Mf(t, i, e, 0, null, !1, !1, "", Lf);
      return (
        (e._reactRootContainer = y),
        (e[cn] = y.current),
        jo(e.nodeType === 8 ? e.parentNode : e),
        dr(),
        y
      );
    }
    for (; (u = e.lastChild); ) e.removeChild(u);
    if (typeof i == "function") {
      var E = i;
      i = function () {
        var I = gi(k);
        E.call(I);
      };
    }
    var k = Ta(e, 0, !1, null, null, !1, !1, "", Lf);
    return (
      (e._reactRootContainer = k),
      (e[cn] = k.current),
      jo(e.nodeType === 8 ? e.parentNode : e),
      dr(function () {
        mi(t, k, r, i);
      }),
      k
    );
  }
  function xi(e, t, r, i, u) {
    var d = r._reactRootContainer;
    if (d) {
      var y = d;
      if (typeof u == "function") {
        var E = u;
        u = function () {
          var k = gi(y);
          E.call(k);
        };
      }
      mi(t, y, e, u);
    } else y = Iy(r, t, e, u, i);
    return gi(y);
  }
  ((pc = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = po(t.pendingLanes);
          r !== 0 &&
            (nl(t, r | 1),
            ft(t, Fe()),
            (Ce & 6) === 0 && ((qr = Fe() + 500), Ln()));
        }
        break;
      case 13:
        (dr(function () {
          var i = hn(e, 1);
          if (i !== null) {
            var u = ot();
            zt(i, e, 1, u);
          }
        }),
          Ra(e, 1));
    }
  }),
    (rl = function (e) {
      if (e.tag === 13) {
        var t = hn(e, 134217728);
        if (t !== null) {
          var r = ot();
          zt(t, e, 134217728, r);
        }
        Ra(e, 134217728);
      }
    }),
    (hc = function (e) {
      if (e.tag === 13) {
        var t = Bn(e),
          r = hn(e, t);
        if (r !== null) {
          var i = ot();
          zt(r, e, t, i);
        }
        Ra(e, t);
      }
    }),
    (mc = function () {
      return ke;
    }),
    (gc = function (e, t) {
      var r = ke;
      try {
        return ((ke = e), t());
      } finally {
        ke = r;
      }
    }),
    (kr = function (e, t, r) {
      switch (t) {
        case "input":
          if ((lo(e, r), (t = r.name), r.type === "radio" && t != null)) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (
              r = r.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
              ),
                t = 0;
              t < r.length;
              t++
            ) {
              var i = r[t];
              if (i !== e && i.form === e.form) {
                var u = Is(i);
                if (!u) throw Error(s(90));
                (Sn(i), lo(i, u));
              }
            }
          }
          break;
        case "textarea":
          as(e, r);
          break;
        case "select":
          ((t = r.value), t != null && Et(e, !!r.multiple, t, !1));
      }
    }),
    (Ne = Ca),
    (Pe = dr));
  var Dy = { usingClientEntryPoint: !1, Events: [Mo, Lr, Is, ps, ve, Ca] },
    $o = {
      findFiberByHostInstance: rr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Fy = {
      bundleType: $o.bundleType,
      version: $o.version,
      rendererPackageName: $o.rendererPackageName,
      rendererConfig: $o.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: O.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = sc(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: $o.findFiberByHostInstance || Oy,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wi.isDisabled && wi.supportsFiber)
      try {
        ((ys = wi.inject(Fy)), (Jt = wi));
      } catch {}
  }
  return (
    (pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dy),
    (pt.createPortal = function (e, t) {
      var r =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Aa(t)) throw Error(s(200));
      return Ly(e, t, null, r);
    }),
    (pt.createRoot = function (e, t) {
      if (!Aa(e)) throw Error(s(299));
      var r = !1,
        i = "",
        u = _f;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (r = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (u = t.onRecoverableError)),
        (t = Ta(e, 1, !1, null, null, r, !1, i, u)),
        (e[cn] = t.current),
        jo(e.nodeType === 8 ? e.parentNode : e),
        new Ma(t)
      );
    }),
    (pt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(s(188))
          : ((e = Object.keys(e).join(",")), Error(s(268, e)));
      return ((e = sc(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (pt.flushSync = function (e) {
      return dr(e);
    }),
    (pt.hydrate = function (e, t, r) {
      if (!vi(t)) throw Error(s(200));
      return xi(null, e, t, !0, r);
    }),
    (pt.hydrateRoot = function (e, t, r) {
      if (!Aa(e)) throw Error(s(405));
      var i = (r != null && r.hydratedSources) || null,
        u = !1,
        d = "",
        y = _f;
      if (
        (r != null &&
          (r.unstable_strictMode === !0 && (u = !0),
          r.identifierPrefix !== void 0 && (d = r.identifierPrefix),
          r.onRecoverableError !== void 0 && (y = r.onRecoverableError)),
        (t = Mf(t, null, e, 1, r ?? null, u, !1, d, y)),
        (e[cn] = t.current),
        jo(e),
        i)
      )
        for (e = 0; e < i.length; e++)
          ((r = i[e]),
            (u = r._getVersion),
            (u = u(r._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [r, u])
              : t.mutableSourceEagerHydrationData.push(r, u));
      return new yi(t);
    }),
    (pt.render = function (e, t, r) {
      if (!vi(t)) throw Error(s(200));
      return xi(null, e, t, !1, r);
    }),
    (pt.unmountComponentAtNode = function (e) {
      if (!vi(e)) throw Error(s(40));
      return e._reactRootContainer
        ? (dr(function () {
            xi(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[cn] = null));
            });
          }),
          !0)
        : !1;
    }),
    (pt.unstable_batchedUpdates = Ca),
    (pt.unstable_renderSubtreeIntoContainer = function (e, t, r, i) {
      if (!vi(r)) throw Error(s(200));
      if (e == null || e._reactInternals === void 0) throw Error(s(38));
      return xi(e, t, r, !1, i);
    }),
    (pt.version = "18.3.1-next-f1338f8080-20240426"),
    pt
  );
}
var Vf;
function sh() {
  if (Vf) return Oa.exports;
  Vf = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return (n(), (Oa.exports = Qy()), Oa.exports);
}
var Hf;
function qy() {
  if (Hf) return bi;
  Hf = 1;
  var n = sh();
  return ((bi.createRoot = n.createRoot), (bi.hydrateRoot = n.hydrateRoot), bi);
}
var Ky = qy(),
  b = Lu();
const te = _u(b),
  ih = By({ __proto__: null, default: te }, [b]),
  Yy = 1,
  Gy = 1e6;
let Fa = 0;
function Jy() {
  return ((Fa = (Fa + 1) % Number.MAX_SAFE_INTEGER), Fa.toString());
}
const za = new Map(),
  Wf = (n) => {
    if (za.has(n)) return;
    const o = setTimeout(() => {
      (za.delete(n), Go({ type: "REMOVE_TOAST", toastId: n }));
    }, Gy);
    za.set(n, o);
  },
  Xy = (n, o) => {
    switch (o.type) {
      case "ADD_TOAST":
        return { ...n, toasts: [o.toast, ...n.toasts].slice(0, Yy) };
      case "UPDATE_TOAST":
        return {
          ...n,
          toasts: n.toasts.map((s) =>
            s.id === o.toast.id ? { ...s, ...o.toast } : s,
          ),
        };
      case "DISMISS_TOAST": {
        const { toastId: s } = o;
        return (
          s
            ? Wf(s)
            : n.toasts.forEach((l) => {
                Wf(l.id);
              }),
          {
            ...n,
            toasts: n.toasts.map((l) =>
              l.id === s || s === void 0 ? { ...l, open: !1 } : l,
            ),
          }
        );
      }
      case "REMOVE_TOAST":
        return o.toastId === void 0
          ? { ...n, toasts: [] }
          : { ...n, toasts: n.toasts.filter((s) => s.id !== o.toastId) };
    }
  },
  Ti = [];
let Ri = { toasts: [] };
function Go(n) {
  ((Ri = Xy(Ri, n)),
    Ti.forEach((o) => {
      o(Ri);
    }));
}
function Zy({ ...n }) {
  const o = Jy(),
    s = (a) => Go({ type: "UPDATE_TOAST", toast: { ...a, id: o } }),
    l = () => Go({ type: "DISMISS_TOAST", toastId: o });
  return (
    Go({
      type: "ADD_TOAST",
      toast: {
        ...n,
        id: o,
        open: !0,
        onOpenChange: (a) => {
          a || l();
        },
      },
    }),
    { id: o, dismiss: l, update: s }
  );
}
function ev() {
  const [n, o] = b.useState(Ri);
  return (
    b.useEffect(
      () => (
        Ti.push(o),
        () => {
          const s = Ti.indexOf(o);
          s > -1 && Ti.splice(s, 1);
        }
      ),
      [n],
    ),
    {
      ...n,
      toast: Zy,
      dismiss: (s) => Go({ type: "DISMISS_TOAST", toastId: s }),
    }
  );
}
var zi = sh();
const lh = _u(zi);
function We(n, o, { checkForDefaultPrevented: s = !0 } = {}) {
  return function (a) {
    if ((n?.(a), s === !1 || !a.defaultPrevented)) return o?.(a);
  };
}
function $f(n, o) {
  if (typeof n == "function") return n(o);
  n != null && (n.current = o);
}
function Ou(...n) {
  return (o) => {
    let s = !1;
    const l = n.map((a) => {
      const c = $f(a, o);
      return (!s && typeof c == "function" && (s = !0), c);
    });
    if (s)
      return () => {
        for (let a = 0; a < l.length; a++) {
          const c = l[a];
          typeof c == "function" ? c() : $f(n[a], null);
        }
      };
  };
}
function Vt(...n) {
  return b.useCallback(Ou(...n), n);
}
function Bi(n, o = []) {
  let s = [];
  function l(c, f) {
    const p = b.createContext(f),
      m = s.length;
    s = [...s, f];
    const g = (w) => {
      const { scope: S, children: x, ...P } = w,
        C = S?.[n]?.[m] || p,
        N = b.useMemo(() => P, Object.values(P));
      return h.jsx(C.Provider, { value: N, children: x });
    };
    g.displayName = c + "Provider";
    function v(w, S) {
      const x = S?.[n]?.[m] || p,
        P = b.useContext(x);
      if (P) return P;
      if (f !== void 0) return f;
      throw new Error(`\`${w}\` must be used within \`${c}\``);
    }
    return [g, v];
  }
  const a = () => {
    const c = s.map((f) => b.createContext(f));
    return function (p) {
      const m = p?.[n] || c;
      return b.useMemo(() => ({ [`__scope${n}`]: { ...p, [n]: m } }), [p, m]);
    };
  };
  return ((a.scopeName = n), [l, tv(a, ...o)]);
}
function tv(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const s = () => {
    const l = n.map((a) => ({ useScope: a(), scopeName: a.scopeName }));
    return function (c) {
      const f = l.reduce((p, { useScope: m, scopeName: g }) => {
        const w = m(c)[`__scope${g}`];
        return { ...p, ...w };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: f }), [f]);
    };
  };
  return ((s.scopeName = o.scopeName), s);
}
function Qf(n) {
  const o = nv(n),
    s = b.forwardRef((l, a) => {
      const { children: c, ...f } = l,
        p = b.Children.toArray(c),
        m = p.find(ov);
      if (m) {
        const g = m.props.children,
          v = p.map((w) =>
            w === m
              ? b.Children.count(g) > 1
                ? b.Children.only(null)
                : b.isValidElement(g)
                  ? g.props.children
                  : null
              : w,
          );
        return h.jsx(o, {
          ...f,
          ref: a,
          children: b.isValidElement(g) ? b.cloneElement(g, void 0, v) : null,
        });
      }
      return h.jsx(o, { ...f, ref: a, children: c });
    });
  return ((s.displayName = `${n}.Slot`), s);
}
function nv(n) {
  const o = b.forwardRef((s, l) => {
    const { children: a, ...c } = s;
    if (b.isValidElement(a)) {
      const f = iv(a),
        p = sv(c, a.props);
      return (
        a.type !== b.Fragment && (p.ref = l ? Ou(l, f) : f),
        b.cloneElement(a, p)
      );
    }
    return b.Children.count(a) > 1 ? b.Children.only(null) : null;
  });
  return ((o.displayName = `${n}.SlotClone`), o);
}
var rv = Symbol("radix.slottable");
function ov(n) {
  return (
    b.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === rv
  );
}
function sv(n, o) {
  const s = { ...o };
  for (const l in o) {
    const a = n[l],
      c = o[l];
    /^on[A-Z]/.test(l)
      ? a && c
        ? (s[l] = (...p) => {
            const m = c(...p);
            return (a(...p), m);
          })
        : a && (s[l] = a)
      : l === "style"
        ? (s[l] = { ...a, ...c })
        : l === "className" && (s[l] = [a, c].filter(Boolean).join(" "));
  }
  return { ...n, ...s };
}
function iv(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = o && "isReactWarning" in o && o.isReactWarning;
  return s
    ? n.ref
    : ((o = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = o && "isReactWarning" in o && o.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
function lv(n) {
  const o = n + "CollectionProvider",
    [s, l] = Bi(o),
    [a, c] = s(o, { collectionRef: { current: null }, itemMap: new Map() }),
    f = (C) => {
      const { scope: N, children: R } = C,
        M = te.useRef(null),
        A = te.useRef(new Map()).current;
      return h.jsx(a, { scope: N, itemMap: A, collectionRef: M, children: R });
    };
  f.displayName = o;
  const p = n + "CollectionSlot",
    m = Qf(p),
    g = te.forwardRef((C, N) => {
      const { scope: R, children: M } = C,
        A = c(p, R),
        O = Vt(N, A.collectionRef);
      return h.jsx(m, { ref: O, children: M });
    });
  g.displayName = p;
  const v = n + "CollectionItemSlot",
    w = "data-radix-collection-item",
    S = Qf(v),
    x = te.forwardRef((C, N) => {
      const { scope: R, children: M, ...A } = C,
        O = te.useRef(null),
        W = Vt(N, O),
        F = c(v, R);
      return (
        te.useEffect(
          () => (
            F.itemMap.set(O, { ref: O, ...A }),
            () => void F.itemMap.delete(O)
          ),
        ),
        h.jsx(S, { [w]: "", ref: W, children: M })
      );
    });
  x.displayName = v;
  function P(C) {
    const N = c(n + "CollectionConsumer", C);
    return te.useCallback(() => {
      const M = N.collectionRef.current;
      if (!M) return [];
      const A = Array.from(M.querySelectorAll(`[${w}]`));
      return Array.from(N.itemMap.values()).sort(
        (F, B) => A.indexOf(F.ref.current) - A.indexOf(B.ref.current),
      );
    }, [N.collectionRef, N.itemMap]);
  }
  return [{ Provider: f, Slot: g, ItemSlot: x }, P, l];
}
function av(n) {
  const o = uv(n),
    s = b.forwardRef((l, a) => {
      const { children: c, ...f } = l,
        p = b.Children.toArray(c),
        m = p.find(dv);
      if (m) {
        const g = m.props.children,
          v = p.map((w) =>
            w === m
              ? b.Children.count(g) > 1
                ? b.Children.only(null)
                : b.isValidElement(g)
                  ? g.props.children
                  : null
              : w,
          );
        return h.jsx(o, {
          ...f,
          ref: a,
          children: b.isValidElement(g) ? b.cloneElement(g, void 0, v) : null,
        });
      }
      return h.jsx(o, { ...f, ref: a, children: c });
    });
  return ((s.displayName = `${n}.Slot`), s);
}
function uv(n) {
  const o = b.forwardRef((s, l) => {
    const { children: a, ...c } = s;
    if (b.isValidElement(a)) {
      const f = pv(a),
        p = fv(c, a.props);
      return (
        a.type !== b.Fragment && (p.ref = l ? Ou(l, f) : f),
        b.cloneElement(a, p)
      );
    }
    return b.Children.count(a) > 1 ? b.Children.only(null) : null;
  });
  return ((o.displayName = `${n}.SlotClone`), o);
}
var cv = Symbol("radix.slottable");
function dv(n) {
  return (
    b.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === cv
  );
}
function fv(n, o) {
  const s = { ...o };
  for (const l in o) {
    const a = n[l],
      c = o[l];
    /^on[A-Z]/.test(l)
      ? a && c
        ? (s[l] = (...p) => {
            const m = c(...p);
            return (a(...p), m);
          })
        : a && (s[l] = a)
      : l === "style"
        ? (s[l] = { ...a, ...c })
        : l === "className" && (s[l] = [a, c].filter(Boolean).join(" "));
  }
  return { ...n, ...s };
}
function pv(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = o && "isReactWarning" in o && o.isReactWarning;
  return s
    ? n.ref
    : ((o = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = o && "isReactWarning" in o && o.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
var hv = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  mt = hv.reduce((n, o) => {
    const s = av(`Primitive.${o}`),
      l = b.forwardRef((a, c) => {
        const { asChild: f, ...p } = a,
          m = f ? s : o;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          h.jsx(m, { ...p, ref: c })
        );
      });
    return ((l.displayName = `Primitive.${o}`), { ...n, [o]: l });
  }, {});
function ah(n, o) {
  n && zi.flushSync(() => n.dispatchEvent(o));
}
function Gn(n) {
  const o = b.useRef(n);
  return (
    b.useEffect(() => {
      o.current = n;
    }),
    b.useMemo(
      () =>
        (...s) =>
          o.current?.(...s),
      [],
    )
  );
}
function mv(n, o = globalThis?.document) {
  const s = Gn(n);
  b.useEffect(() => {
    const l = (a) => {
      a.key === "Escape" && s(a);
    };
    return (
      o.addEventListener("keydown", l, { capture: !0 }),
      () => o.removeEventListener("keydown", l, { capture: !0 })
    );
  }, [s, o]);
}
var gv = "DismissableLayer",
  hu = "dismissableLayer.update",
  yv = "dismissableLayer.pointerDownOutside",
  vv = "dismissableLayer.focusOutside",
  qf,
  uh = b.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Iu = b.forwardRef((n, o) => {
    const {
        disableOutsidePointerEvents: s = !1,
        onEscapeKeyDown: l,
        onPointerDownOutside: a,
        onFocusOutside: c,
        onInteractOutside: f,
        onDismiss: p,
        ...m
      } = n,
      g = b.useContext(uh),
      [v, w] = b.useState(null),
      S = v?.ownerDocument ?? globalThis?.document,
      [, x] = b.useState({}),
      P = Vt(o, (B) => w(B)),
      C = Array.from(g.layers),
      [N] = [...g.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = C.indexOf(N),
      M = v ? C.indexOf(v) : -1,
      A = g.layersWithOutsidePointerEventsDisabled.size > 0,
      O = M >= R,
      W = wv((B) => {
        const Y = B.target,
          K = [...g.branches].some((X) => X.contains(Y));
        !O || K || (a?.(B), f?.(B), B.defaultPrevented || p?.());
      }, S),
      F = bv((B) => {
        const Y = B.target;
        [...g.branches].some((X) => X.contains(Y)) ||
          (c?.(B), f?.(B), B.defaultPrevented || p?.());
      }, S);
    return (
      mv((B) => {
        M === g.layers.size - 1 &&
          (l?.(B), !B.defaultPrevented && p && (B.preventDefault(), p()));
      }, S),
      b.useEffect(() => {
        if (v)
          return (
            s &&
              (g.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((qf = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = "none")),
              g.layersWithOutsidePointerEventsDisabled.add(v)),
            g.layers.add(v),
            Kf(),
            () => {
              s &&
                g.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = qf);
            }
          );
      }, [v, S, s, g]),
      b.useEffect(
        () => () => {
          v &&
            (g.layers.delete(v),
            g.layersWithOutsidePointerEventsDisabled.delete(v),
            Kf());
        },
        [v, g],
      ),
      b.useEffect(() => {
        const B = () => x({});
        return (
          document.addEventListener(hu, B),
          () => document.removeEventListener(hu, B)
        );
      }, []),
      h.jsx(mt.div, {
        ...m,
        ref: P,
        style: {
          pointerEvents: A ? (O ? "auto" : "none") : void 0,
          ...n.style,
        },
        onFocusCapture: We(n.onFocusCapture, F.onFocusCapture),
        onBlurCapture: We(n.onBlurCapture, F.onBlurCapture),
        onPointerDownCapture: We(
          n.onPointerDownCapture,
          W.onPointerDownCapture,
        ),
      })
    );
  });
Iu.displayName = gv;
var xv = "DismissableLayerBranch",
  ch = b.forwardRef((n, o) => {
    const s = b.useContext(uh),
      l = b.useRef(null),
      a = Vt(o, l);
    return (
      b.useEffect(() => {
        const c = l.current;
        if (c)
          return (
            s.branches.add(c),
            () => {
              s.branches.delete(c);
            }
          );
      }, [s.branches]),
      h.jsx(mt.div, { ...n, ref: a })
    );
  });
ch.displayName = xv;
function wv(n, o = globalThis?.document) {
  const s = Gn(n),
    l = b.useRef(!1),
    a = b.useRef(() => {});
  return (
    b.useEffect(() => {
      const c = (p) => {
          if (p.target && !l.current) {
            let m = function () {
              dh(yv, s, g, { discrete: !0 });
            };
            const g = { originalEvent: p };
            p.pointerType === "touch"
              ? (o.removeEventListener("click", a.current),
                (a.current = m),
                o.addEventListener("click", a.current, { once: !0 }))
              : m();
          } else o.removeEventListener("click", a.current);
          l.current = !1;
        },
        f = window.setTimeout(() => {
          o.addEventListener("pointerdown", c);
        }, 0);
      return () => {
        (window.clearTimeout(f),
          o.removeEventListener("pointerdown", c),
          o.removeEventListener("click", a.current));
      };
    }, [o, s]),
    { onPointerDownCapture: () => (l.current = !0) }
  );
}
function bv(n, o = globalThis?.document) {
  const s = Gn(n),
    l = b.useRef(!1);
  return (
    b.useEffect(() => {
      const a = (c) => {
        c.target &&
          !l.current &&
          dh(vv, s, { originalEvent: c }, { discrete: !1 });
      };
      return (
        o.addEventListener("focusin", a),
        () => o.removeEventListener("focusin", a)
      );
    }, [o, s]),
    {
      onFocusCapture: () => (l.current = !0),
      onBlurCapture: () => (l.current = !1),
    }
  );
}
function Kf() {
  const n = new CustomEvent(hu);
  document.dispatchEvent(n);
}
function dh(n, o, s, { discrete: l }) {
  const a = s.originalEvent.target,
    c = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: s });
  (o && a.addEventListener(n, o, { once: !0 }),
    l ? ah(a, c) : a.dispatchEvent(c));
}
var Sv = Iu,
  Cv = ch,
  Jn = globalThis?.document ? b.useLayoutEffect : () => {},
  Ev = "Portal",
  fh = b.forwardRef((n, o) => {
    const { container: s, ...l } = n,
      [a, c] = b.useState(!1);
    Jn(() => c(!0), []);
    const f = s || (a && globalThis?.document?.body);
    return f ? lh.createPortal(h.jsx(mt.div, { ...l, ref: o }), f) : null;
  });
fh.displayName = Ev;
function Nv(n, o) {
  return b.useReducer((s, l) => o[s][l] ?? s, n);
}
var Du = (n) => {
  const { present: o, children: s } = n,
    l = kv(o),
    a =
      typeof s == "function" ? s({ present: l.isPresent }) : b.Children.only(s),
    c = Vt(l.ref, Pv(a));
  return typeof s == "function" || l.isPresent
    ? b.cloneElement(a, { ref: c })
    : null;
};
Du.displayName = "Presence";
function kv(n) {
  const [o, s] = b.useState(),
    l = b.useRef(null),
    a = b.useRef(n),
    c = b.useRef("none"),
    f = n ? "mounted" : "unmounted",
    [p, m] = Nv(f, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    b.useEffect(() => {
      const g = Si(l.current);
      c.current = p === "mounted" ? g : "none";
    }, [p]),
    Jn(() => {
      const g = l.current,
        v = a.current;
      if (v !== n) {
        const S = c.current,
          x = Si(g);
        (n
          ? m("MOUNT")
          : x === "none" || g?.display === "none"
            ? m("UNMOUNT")
            : m(v && S !== x ? "ANIMATION_OUT" : "UNMOUNT"),
          (a.current = n));
      }
    }, [n, m]),
    Jn(() => {
      if (o) {
        let g;
        const v = o.ownerDocument.defaultView ?? window,
          w = (x) => {
            const C = Si(l.current).includes(CSS.escape(x.animationName));
            if (x.target === o && C && (m("ANIMATION_END"), !a.current)) {
              const N = o.style.animationFillMode;
              ((o.style.animationFillMode = "forwards"),
                (g = v.setTimeout(() => {
                  o.style.animationFillMode === "forwards" &&
                    (o.style.animationFillMode = N);
                })));
            }
          },
          S = (x) => {
            x.target === o && (c.current = Si(l.current));
          };
        return (
          o.addEventListener("animationstart", S),
          o.addEventListener("animationcancel", w),
          o.addEventListener("animationend", w),
          () => {
            (v.clearTimeout(g),
              o.removeEventListener("animationstart", S),
              o.removeEventListener("animationcancel", w),
              o.removeEventListener("animationend", w));
          }
        );
      } else m("ANIMATION_END");
    }, [o, m]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(p),
      ref: b.useCallback((g) => {
        ((l.current = g ? getComputedStyle(g) : null), s(g));
      }, []),
    }
  );
}
function Si(n) {
  return n?.animationName || "none";
}
function Pv(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    s = o && "isReactWarning" in o && o.isReactWarning;
  return s
    ? n.ref
    : ((o = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (s = o && "isReactWarning" in o && o.isReactWarning),
      s ? n.props.ref : n.props.ref || n.ref);
}
var jv = ih[" useInsertionEffect ".trim().toString()] || Jn;
function Tv({ prop: n, defaultProp: o, onChange: s = () => {}, caller: l }) {
  const [a, c, f] = Rv({ defaultProp: o, onChange: s }),
    p = n !== void 0,
    m = p ? n : a;
  {
    const v = b.useRef(n !== void 0);
    b.useEffect(() => {
      const w = v.current;
      (w !== p &&
        console.warn(
          `${l} is changing from ${w ? "controlled" : "uncontrolled"} to ${p ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (v.current = p));
    }, [p, l]);
  }
  const g = b.useCallback(
    (v) => {
      if (p) {
        const w = Mv(v) ? v(n) : v;
        w !== n && f.current?.(w);
      } else c(v);
    },
    [p, n, c, f],
  );
  return [m, g];
}
function Rv({ defaultProp: n, onChange: o }) {
  const [s, l] = b.useState(n),
    a = b.useRef(s),
    c = b.useRef(o);
  return (
    jv(() => {
      c.current = o;
    }, [o]),
    b.useEffect(() => {
      a.current !== s && (c.current?.(s), (a.current = s));
    }, [s, a]),
    [s, l, c]
  );
}
function Mv(n) {
  return typeof n == "function";
}
var Av = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  _v = "VisuallyHidden",
  Ui = b.forwardRef((n, o) =>
    h.jsx(mt.span, { ...n, ref: o, style: { ...Av, ...n.style } }),
  );
Ui.displayName = _v;
var Lv = Ui,
  Fu = "ToastProvider",
  [zu, Ov, Iv] = lv("Toast"),
  [ph] = Bi("Toast", [Iv]),
  [Dv, Vi] = ph(Fu),
  hh = (n) => {
    const {
        __scopeToast: o,
        label: s = "Notification",
        duration: l = 5e3,
        swipeDirection: a = "right",
        swipeThreshold: c = 50,
        children: f,
      } = n,
      [p, m] = b.useState(null),
      [g, v] = b.useState(0),
      w = b.useRef(!1),
      S = b.useRef(!1);
    return (
      s.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${Fu}\`. Expected non-empty \`string\`.`,
        ),
      h.jsx(zu.Provider, {
        scope: o,
        children: h.jsx(Dv, {
          scope: o,
          label: s,
          duration: l,
          swipeDirection: a,
          swipeThreshold: c,
          toastCount: g,
          viewport: p,
          onViewportChange: m,
          onToastAdd: b.useCallback(() => v((x) => x + 1), []),
          onToastRemove: b.useCallback(() => v((x) => x - 1), []),
          isFocusedToastEscapeKeyDownRef: w,
          isClosePausedRef: S,
          children: f,
        }),
      })
    );
  };
hh.displayName = Fu;
var mh = "ToastViewport",
  Fv = ["F8"],
  mu = "toast.viewportPause",
  gu = "toast.viewportResume",
  gh = b.forwardRef((n, o) => {
    const {
        __scopeToast: s,
        hotkey: l = Fv,
        label: a = "Notifications ({hotkey})",
        ...c
      } = n,
      f = Vi(mh, s),
      p = Ov(s),
      m = b.useRef(null),
      g = b.useRef(null),
      v = b.useRef(null),
      w = b.useRef(null),
      S = Vt(o, w, f.onViewportChange),
      x = l.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      P = f.toastCount > 0;
    (b.useEffect(() => {
      const N = (R) => {
        l.length !== 0 &&
          l.every((A) => R[A] || R.code === A) &&
          w.current?.focus();
      };
      return (
        document.addEventListener("keydown", N),
        () => document.removeEventListener("keydown", N)
      );
    }, [l]),
      b.useEffect(() => {
        const N = m.current,
          R = w.current;
        if (P && N && R) {
          const M = () => {
              if (!f.isClosePausedRef.current) {
                const F = new CustomEvent(mu);
                (R.dispatchEvent(F), (f.isClosePausedRef.current = !0));
              }
            },
            A = () => {
              if (f.isClosePausedRef.current) {
                const F = new CustomEvent(gu);
                (R.dispatchEvent(F), (f.isClosePausedRef.current = !1));
              }
            },
            O = (F) => {
              !N.contains(F.relatedTarget) && A();
            },
            W = () => {
              N.contains(document.activeElement) || A();
            };
          return (
            N.addEventListener("focusin", M),
            N.addEventListener("focusout", O),
            N.addEventListener("pointermove", M),
            N.addEventListener("pointerleave", W),
            window.addEventListener("blur", M),
            window.addEventListener("focus", A),
            () => {
              (N.removeEventListener("focusin", M),
                N.removeEventListener("focusout", O),
                N.removeEventListener("pointermove", M),
                N.removeEventListener("pointerleave", W),
                window.removeEventListener("blur", M),
                window.removeEventListener("focus", A));
            }
          );
        }
      }, [P, f.isClosePausedRef]));
    const C = b.useCallback(
      ({ tabbingDirection: N }) => {
        const M = p().map((A) => {
          const O = A.ref.current,
            W = [O, ...Jv(O)];
          return N === "forwards" ? W : W.reverse();
        });
        return (N === "forwards" ? M.reverse() : M).flat();
      },
      [p],
    );
    return (
      b.useEffect(() => {
        const N = w.current;
        if (N) {
          const R = (M) => {
            const A = M.altKey || M.ctrlKey || M.metaKey;
            if (M.key === "Tab" && !A) {
              const W = document.activeElement,
                F = M.shiftKey;
              if (M.target === N && F) {
                g.current?.focus();
                return;
              }
              const K = C({ tabbingDirection: F ? "backwards" : "forwards" }),
                X = K.findIndex((Z) => Z === W);
              Ba(K.slice(X + 1))
                ? M.preventDefault()
                : F
                  ? g.current?.focus()
                  : v.current?.focus();
            }
          };
          return (
            N.addEventListener("keydown", R),
            () => N.removeEventListener("keydown", R)
          );
        }
      }, [p, C]),
      h.jsxs(Cv, {
        ref: m,
        role: "region",
        "aria-label": a.replace("{hotkey}", x),
        tabIndex: -1,
        style: { pointerEvents: P ? void 0 : "none" },
        children: [
          P &&
            h.jsx(yu, {
              ref: g,
              onFocusFromOutsideViewport: () => {
                const N = C({ tabbingDirection: "forwards" });
                Ba(N);
              },
            }),
          h.jsx(zu.Slot, {
            scope: s,
            children: h.jsx(mt.ol, { tabIndex: -1, ...c, ref: S }),
          }),
          P &&
            h.jsx(yu, {
              ref: v,
              onFocusFromOutsideViewport: () => {
                const N = C({ tabbingDirection: "backwards" });
                Ba(N);
              },
            }),
        ],
      })
    );
  });
gh.displayName = mh;
var yh = "ToastFocusProxy",
  yu = b.forwardRef((n, o) => {
    const { __scopeToast: s, onFocusFromOutsideViewport: l, ...a } = n,
      c = Vi(yh, s);
    return h.jsx(Ui, {
      tabIndex: 0,
      ...a,
      ref: o,
      style: { position: "fixed" },
      onFocus: (f) => {
        const p = f.relatedTarget;
        !c.viewport?.contains(p) && l();
      },
    });
  });
yu.displayName = yh;
var ss = "Toast",
  zv = "toast.swipeStart",
  Bv = "toast.swipeMove",
  Uv = "toast.swipeCancel",
  Vv = "toast.swipeEnd",
  vh = b.forwardRef((n, o) => {
    const { forceMount: s, open: l, defaultOpen: a, onOpenChange: c, ...f } = n,
      [p, m] = Tv({ prop: l, defaultProp: a ?? !0, onChange: c, caller: ss });
    return h.jsx(Du, {
      present: s || p,
      children: h.jsx($v, {
        open: p,
        ...f,
        ref: o,
        onClose: () => m(!1),
        onPause: Gn(n.onPause),
        onResume: Gn(n.onResume),
        onSwipeStart: We(n.onSwipeStart, (g) => {
          g.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: We(n.onSwipeMove, (g) => {
          const { x: v, y: w } = g.detail.delta;
          (g.currentTarget.setAttribute("data-swipe", "move"),
            g.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${v}px`,
            ),
            g.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${w}px`,
            ));
        }),
        onSwipeCancel: We(n.onSwipeCancel, (g) => {
          (g.currentTarget.setAttribute("data-swipe", "cancel"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-end-y"));
        }),
        onSwipeEnd: We(n.onSwipeEnd, (g) => {
          const { x: v, y: w } = g.detail.delta;
          (g.currentTarget.setAttribute("data-swipe", "end"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            g.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            g.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${v}px`,
            ),
            g.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${w}px`,
            ),
            m(!1));
        }),
      }),
    });
  });
vh.displayName = ss;
var [Hv, Wv] = ph(ss, { onClose() {} }),
  $v = b.forwardRef((n, o) => {
    const {
        __scopeToast: s,
        type: l = "foreground",
        duration: a,
        open: c,
        onClose: f,
        onEscapeKeyDown: p,
        onPause: m,
        onResume: g,
        onSwipeStart: v,
        onSwipeMove: w,
        onSwipeCancel: S,
        onSwipeEnd: x,
        ...P
      } = n,
      C = Vi(ss, s),
      [N, R] = b.useState(null),
      M = Vt(o, (U) => R(U)),
      A = b.useRef(null),
      O = b.useRef(null),
      W = a || C.duration,
      F = b.useRef(0),
      B = b.useRef(W),
      Y = b.useRef(0),
      { onToastAdd: K, onToastRemove: X } = C,
      Z = Gn(() => {
        (N?.contains(document.activeElement) && C.viewport?.focus(), f());
      }),
      V = b.useCallback(
        (U) => {
          !U ||
            U === 1 / 0 ||
            (window.clearTimeout(Y.current),
            (F.current = new Date().getTime()),
            (Y.current = window.setTimeout(Z, U)));
        },
        [Z],
      );
    (b.useEffect(() => {
      const U = C.viewport;
      if (U) {
        const me = () => {
            (V(B.current), g?.());
          },
          ue = () => {
            const ae = new Date().getTime() - F.current;
            ((B.current = B.current - ae),
              window.clearTimeout(Y.current),
              m?.());
          };
        return (
          U.addEventListener(mu, ue),
          U.addEventListener(gu, me),
          () => {
            (U.removeEventListener(mu, ue), U.removeEventListener(gu, me));
          }
        );
      }
    }, [C.viewport, W, m, g, V]),
      b.useEffect(() => {
        c && !C.isClosePausedRef.current && V(W);
      }, [c, W, C.isClosePausedRef, V]),
      b.useEffect(() => (K(), () => X()), [K, X]));
    const J = b.useMemo(() => (N ? Nh(N) : null), [N]);
    return C.viewport
      ? h.jsxs(h.Fragment, {
          children: [
            J &&
              h.jsx(Qv, {
                __scopeToast: s,
                role: "status",
                "aria-live": l === "foreground" ? "assertive" : "polite",
                children: J,
              }),
            h.jsx(Hv, {
              scope: s,
              onClose: Z,
              children: zi.createPortal(
                h.jsx(zu.ItemSlot, {
                  scope: s,
                  children: h.jsx(Sv, {
                    asChild: !0,
                    onEscapeKeyDown: We(p, () => {
                      (C.isFocusedToastEscapeKeyDownRef.current || Z(),
                        (C.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: h.jsx(mt.li, {
                      tabIndex: 0,
                      "data-state": c ? "open" : "closed",
                      "data-swipe-direction": C.swipeDirection,
                      ...P,
                      ref: M,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...n.style,
                      },
                      onKeyDown: We(n.onKeyDown, (U) => {
                        U.key === "Escape" &&
                          (p?.(U.nativeEvent),
                          U.nativeEvent.defaultPrevented ||
                            ((C.isFocusedToastEscapeKeyDownRef.current = !0),
                            Z()));
                      }),
                      onPointerDown: We(n.onPointerDown, (U) => {
                        U.button === 0 &&
                          (A.current = { x: U.clientX, y: U.clientY });
                      }),
                      onPointerMove: We(n.onPointerMove, (U) => {
                        if (!A.current) return;
                        const me = U.clientX - A.current.x,
                          ue = U.clientY - A.current.y,
                          ae = !!O.current,
                          z = ["left", "right"].includes(C.swipeDirection),
                          H = ["left", "up"].includes(C.swipeDirection)
                            ? Math.min
                            : Math.max,
                          q = z ? H(0, me) : 0,
                          j = z ? 0 : H(0, ue),
                          D = U.pointerType === "touch" ? 10 : 2,
                          ne = { x: q, y: j },
                          oe = { originalEvent: U, delta: ne };
                        ae
                          ? ((O.current = ne), Ci(Bv, w, oe, { discrete: !1 }))
                          : Yf(ne, C.swipeDirection, D)
                            ? ((O.current = ne),
                              Ci(zv, v, oe, { discrete: !1 }),
                              U.target.setPointerCapture(U.pointerId))
                            : (Math.abs(me) > D || Math.abs(ue) > D) &&
                              (A.current = null);
                      }),
                      onPointerUp: We(n.onPointerUp, (U) => {
                        const me = O.current,
                          ue = U.target;
                        if (
                          (ue.hasPointerCapture(U.pointerId) &&
                            ue.releasePointerCapture(U.pointerId),
                          (O.current = null),
                          (A.current = null),
                          me)
                        ) {
                          const ae = U.currentTarget,
                            z = { originalEvent: U, delta: me };
                          (Yf(me, C.swipeDirection, C.swipeThreshold)
                            ? Ci(Vv, x, z, { discrete: !0 })
                            : Ci(Uv, S, z, { discrete: !0 }),
                            ae.addEventListener(
                              "click",
                              (H) => H.preventDefault(),
                              { once: !0 },
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                C.viewport,
              ),
            }),
          ],
        })
      : null;
  }),
  Qv = (n) => {
    const { __scopeToast: o, children: s, ...l } = n,
      a = Vi(ss, o),
      [c, f] = b.useState(!1),
      [p, m] = b.useState(!1);
    return (
      Yv(() => f(!0)),
      b.useEffect(() => {
        const g = window.setTimeout(() => m(!0), 1e3);
        return () => window.clearTimeout(g);
      }, []),
      p
        ? null
        : h.jsx(fh, {
            asChild: !0,
            children: h.jsx(Ui, {
              ...l,
              children:
                c && h.jsxs(h.Fragment, { children: [a.label, " ", s] }),
            }),
          })
    );
  },
  qv = "ToastTitle",
  xh = b.forwardRef((n, o) => {
    const { __scopeToast: s, ...l } = n;
    return h.jsx(mt.div, { ...l, ref: o });
  });
xh.displayName = qv;
var Kv = "ToastDescription",
  wh = b.forwardRef((n, o) => {
    const { __scopeToast: s, ...l } = n;
    return h.jsx(mt.div, { ...l, ref: o });
  });
wh.displayName = Kv;
var bh = "ToastAction",
  Sh = b.forwardRef((n, o) => {
    const { altText: s, ...l } = n;
    return s.trim()
      ? h.jsx(Eh, {
          altText: s,
          asChild: !0,
          children: h.jsx(Bu, { ...l, ref: o }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${bh}\`. Expected non-empty \`string\`.`,
        ),
        null);
  });
Sh.displayName = bh;
var Ch = "ToastClose",
  Bu = b.forwardRef((n, o) => {
    const { __scopeToast: s, ...l } = n,
      a = Wv(Ch, s);
    return h.jsx(Eh, {
      asChild: !0,
      children: h.jsx(mt.button, {
        type: "button",
        ...l,
        ref: o,
        onClick: We(n.onClick, a.onClose),
      }),
    });
  });
Bu.displayName = Ch;
var Eh = b.forwardRef((n, o) => {
  const { __scopeToast: s, altText: l, ...a } = n;
  return h.jsx(mt.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": l || void 0,
    ...a,
    ref: o,
  });
});
function Nh(n) {
  const o = [];
  return (
    Array.from(n.childNodes).forEach((l) => {
      if (
        (l.nodeType === l.TEXT_NODE && l.textContent && o.push(l.textContent),
        Gv(l))
      ) {
        const a = l.ariaHidden || l.hidden || l.style.display === "none",
          c = l.dataset.radixToastAnnounceExclude === "";
        if (!a)
          if (c) {
            const f = l.dataset.radixToastAnnounceAlt;
            f && o.push(f);
          } else o.push(...Nh(l));
      }
    }),
    o
  );
}
function Ci(n, o, s, { discrete: l }) {
  const a = s.originalEvent.currentTarget,
    c = new CustomEvent(n, { bubbles: !0, cancelable: !0, detail: s });
  (o && a.addEventListener(n, o, { once: !0 }),
    l ? ah(a, c) : a.dispatchEvent(c));
}
var Yf = (n, o, s = 0) => {
  const l = Math.abs(n.x),
    a = Math.abs(n.y),
    c = l > a;
  return o === "left" || o === "right" ? c && l > s : !c && a > s;
};
function Yv(n = () => {}) {
  const o = Gn(n);
  Jn(() => {
    let s = 0,
      l = 0;
    return (
      (s = window.requestAnimationFrame(
        () => (l = window.requestAnimationFrame(o)),
      )),
      () => {
        (window.cancelAnimationFrame(s), window.cancelAnimationFrame(l));
      }
    );
  }, [o]);
}
function Gv(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function Jv(n) {
  const o = [],
    s = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (l) => {
        const a = l.tagName === "INPUT" && l.type === "hidden";
        return l.disabled || l.hidden || a
          ? NodeFilter.FILTER_SKIP
          : l.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; s.nextNode(); ) o.push(s.currentNode);
  return o;
}
function Ba(n) {
  const o = document.activeElement;
  return n.some((s) =>
    s === o ? !0 : (s.focus(), document.activeElement !== o),
  );
}
var Xv = hh,
  kh = gh,
  Ph = vh,
  jh = xh,
  Th = wh,
  Rh = Sh,
  Mh = Bu;
function Ah(n) {
  var o,
    s,
    l = "";
  if (typeof n == "string" || typeof n == "number") l += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var a = n.length;
      for (o = 0; o < a; o++)
        n[o] && (s = Ah(n[o])) && (l && (l += " "), (l += s));
    } else for (s in n) n[s] && (l && (l += " "), (l += s));
  return l;
}
function _h() {
  for (var n, o, s = 0, l = "", a = arguments.length; s < a; s++)
    (n = arguments[s]) && (o = Ah(n)) && (l && (l += " "), (l += o));
  return l;
}
const Gf = (n) => (typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n),
  Jf = _h,
  Zv = (n, o) => (s) => {
    var l;
    if (o?.variants == null) return Jf(n, s?.class, s?.className);
    const { variants: a, defaultVariants: c } = o,
      f = Object.keys(a).map((g) => {
        const v = s?.[g],
          w = c?.[g];
        if (v === null) return null;
        const S = Gf(v) || Gf(w);
        return a[g][S];
      }),
      p =
        s &&
        Object.entries(s).reduce((g, v) => {
          let [w, S] = v;
          return (S === void 0 || (g[w] = S), g);
        }, {}),
      m =
        o == null || (l = o.compoundVariants) === null || l === void 0
          ? void 0
          : l.reduce((g, v) => {
              let { class: w, className: S, ...x } = v;
              return Object.entries(x).every((P) => {
                let [C, N] = P;
                return Array.isArray(N)
                  ? N.includes({ ...c, ...p }[C])
                  : { ...c, ...p }[C] === N;
              })
                ? [...g, w, S]
                : g;
            }, []);
    return Jf(n, f, m, s?.class, s?.className);
  };
const e0 = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  t0 = (n) =>
    n.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, s, l) =>
      l ? l.toUpperCase() : s.toLowerCase(),
    ),
  Xf = (n) => {
    const o = t0(n);
    return o.charAt(0).toUpperCase() + o.slice(1);
  },
  Lh = (...n) =>
    n
      .filter((o, s, l) => !!o && o.trim() !== "" && l.indexOf(o) === s)
      .join(" ")
      .trim(),
  n0 = (n) => {
    for (const o in n)
      if (o.startsWith("aria-") || o === "role" || o === "title") return !0;
  };
var r0 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const o0 = b.forwardRef(
  (
    {
      color: n = "currentColor",
      size: o = 24,
      strokeWidth: s = 2,
      absoluteStrokeWidth: l,
      className: a = "",
      children: c,
      iconNode: f,
      ...p
    },
    m,
  ) =>
    b.createElement(
      "svg",
      {
        ref: m,
        ...r0,
        width: o,
        height: o,
        stroke: n,
        strokeWidth: l ? (Number(s) * 24) / Number(o) : s,
        className: Lh("lucide", a),
        ...(!c && !n0(p) && { "aria-hidden": "true" }),
        ...p,
      },
      [
        ...f.map(([g, v]) => b.createElement(g, v)),
        ...(Array.isArray(c) ? c : [c]),
      ],
    ),
);
const Le = (n, o) => {
  const s = b.forwardRef(({ className: l, ...a }, c) =>
    b.createElement(o0, {
      ref: c,
      iconNode: o,
      className: Lh(`lucide-${e0(Xf(n))}`, `lucide-${n}`, l),
      ...a,
    }),
  );
  return ((s.displayName = Xf(n)), s);
};
const s0 = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ],
  Oh = Le("arrow-left", s0);
const i0 = [
    [
      "path",
      {
        d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
        key: "1tc9qg",
      },
    ],
    ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }],
  ],
  l0 = Le("camera", i0);
const a0 = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }],
  ],
  u0 = Le("chart-column", a0);
const c0 = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  d0 = Le("circle-check-big", c0);
const f0 = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  p0 = Le("clock", f0);
const h0 = [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }],
  ],
  Ih = Le("ellipsis-vertical", h0);
const m0 = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ],
  g0 = Le("lock", m0);
const y0 = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  v0 = Le("log-out", y0);
const x0 = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  Jo = Le("mail", x0);
const w0 = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ],
  b0 = Le("map-pin", w0);
const S0 = [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s",
      },
    ],
  ],
  rn = Le("message-circle", S0);
const C0 = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p",
      },
    ],
  ],
  vu = Le("message-square", C0);
const E0 = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu",
      },
    ],
  ],
  N0 = Le("paperclip", E0);
const k0 = [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v",
      },
    ],
  ],
  Xo = Le("phone", k0);
const P0 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ],
  Dh = Le("plus", P0);
const j0 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ],
  Ai = Le("search", j0);
const T0 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ],
  R0 = Le("send", T0);
const M0 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9", key: "yxxnd0" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9", key: "1p4y9e" }],
  ],
  A0 = Le("smile", M0);
const _0 = [
    [
      "path",
      {
        d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        key: "1m0v6g",
      },
    ],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        key: "ohrbg2",
      },
    ],
  ],
  L0 = Le("square-pen", _0);
const O0 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  I0 = Le("star", O0);
const D0 = [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0",
      },
    ],
    [
      "circle",
      { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" },
    ],
  ],
  Fh = Le("tag", D0);
const F0 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  z0 = Le("trash-2", F0);
const B0 = [
    [
      "path",
      {
        d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
        key: "ftymec",
      },
    ],
    [
      "rect",
      { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" },
    ],
  ],
  U0 = Le("video", B0);
const V0 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  H0 = Le("x", V0),
  Uu = "-",
  W0 = (n) => {
    const o = Q0(n),
      { conflictingClassGroups: s, conflictingClassGroupModifiers: l } = n;
    return {
      getClassGroupId: (f) => {
        const p = f.split(Uu);
        return (p[0] === "" && p.length !== 1 && p.shift(), zh(p, o) || $0(f));
      },
      getConflictingClassGroupIds: (f, p) => {
        const m = s[f] || [];
        return p && l[f] ? [...m, ...l[f]] : m;
      },
    };
  },
  zh = (n, o) => {
    if (n.length === 0) return o.classGroupId;
    const s = n[0],
      l = o.nextPart.get(s),
      a = l ? zh(n.slice(1), l) : void 0;
    if (a) return a;
    if (o.validators.length === 0) return;
    const c = n.join(Uu);
    return o.validators.find(({ validator: f }) => f(c))?.classGroupId;
  },
  Zf = /^\[(.+)\]$/,
  $0 = (n) => {
    if (Zf.test(n)) {
      const o = Zf.exec(n)[1],
        s = o?.substring(0, o.indexOf(":"));
      if (s) return "arbitrary.." + s;
    }
  },
  Q0 = (n) => {
    const { theme: o, prefix: s } = n,
      l = { nextPart: new Map(), validators: [] };
    return (
      K0(Object.entries(n.classGroups), s).forEach(([c, f]) => {
        xu(f, l, c, o);
      }),
      l
    );
  },
  xu = (n, o, s, l) => {
    n.forEach((a) => {
      if (typeof a == "string") {
        const c = a === "" ? o : ep(o, a);
        c.classGroupId = s;
        return;
      }
      if (typeof a == "function") {
        if (q0(a)) {
          xu(a(l), o, s, l);
          return;
        }
        o.validators.push({ validator: a, classGroupId: s });
        return;
      }
      Object.entries(a).forEach(([c, f]) => {
        xu(f, ep(o, c), s, l);
      });
    });
  },
  ep = (n, o) => {
    let s = n;
    return (
      o.split(Uu).forEach((l) => {
        (s.nextPart.has(l) ||
          s.nextPart.set(l, { nextPart: new Map(), validators: [] }),
          (s = s.nextPart.get(l)));
      }),
      s
    );
  },
  q0 = (n) => n.isThemeGetter,
  K0 = (n, o) =>
    o
      ? n.map(([s, l]) => {
          const a = l.map((c) =>
            typeof c == "string"
              ? o + c
              : typeof c == "object"
                ? Object.fromEntries(
                    Object.entries(c).map(([f, p]) => [o + f, p]),
                  )
                : c,
          );
          return [s, a];
        })
      : n,
  Y0 = (n) => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let o = 0,
      s = new Map(),
      l = new Map();
    const a = (c, f) => {
      (s.set(c, f), o++, o > n && ((o = 0), (l = s), (s = new Map())));
    };
    return {
      get(c) {
        let f = s.get(c);
        if (f !== void 0) return f;
        if ((f = l.get(c)) !== void 0) return (a(c, f), f);
      },
      set(c, f) {
        s.has(c) ? s.set(c, f) : a(c, f);
      },
    };
  },
  Bh = "!",
  G0 = (n) => {
    const { separator: o, experimentalParseClassName: s } = n,
      l = o.length === 1,
      a = o[0],
      c = o.length,
      f = (p) => {
        const m = [];
        let g = 0,
          v = 0,
          w;
        for (let N = 0; N < p.length; N++) {
          let R = p[N];
          if (g === 0) {
            if (R === a && (l || p.slice(N, N + c) === o)) {
              (m.push(p.slice(v, N)), (v = N + c));
              continue;
            }
            if (R === "/") {
              w = N;
              continue;
            }
          }
          R === "[" ? g++ : R === "]" && g--;
        }
        const S = m.length === 0 ? p : p.substring(v),
          x = S.startsWith(Bh),
          P = x ? S.substring(1) : S,
          C = w && w > v ? w - v : void 0;
        return {
          modifiers: m,
          hasImportantModifier: x,
          baseClassName: P,
          maybePostfixModifierPosition: C,
        };
      };
    return s ? (p) => s({ className: p, parseClassName: f }) : f;
  },
  J0 = (n) => {
    if (n.length <= 1) return n;
    const o = [];
    let s = [];
    return (
      n.forEach((l) => {
        l[0] === "[" ? (o.push(...s.sort(), l), (s = [])) : s.push(l);
      }),
      o.push(...s.sort()),
      o
    );
  },
  X0 = (n) => ({ cache: Y0(n.cacheSize), parseClassName: G0(n), ...W0(n) }),
  Z0 = /\s+/,
  ex = (n, o) => {
    const {
        parseClassName: s,
        getClassGroupId: l,
        getConflictingClassGroupIds: a,
      } = o,
      c = [],
      f = n.trim().split(Z0);
    let p = "";
    for (let m = f.length - 1; m >= 0; m -= 1) {
      const g = f[m],
        {
          modifiers: v,
          hasImportantModifier: w,
          baseClassName: S,
          maybePostfixModifierPosition: x,
        } = s(g);
      let P = !!x,
        C = l(P ? S.substring(0, x) : S);
      if (!C) {
        if (!P) {
          p = g + (p.length > 0 ? " " + p : p);
          continue;
        }
        if (((C = l(S)), !C)) {
          p = g + (p.length > 0 ? " " + p : p);
          continue;
        }
        P = !1;
      }
      const N = J0(v).join(":"),
        R = w ? N + Bh : N,
        M = R + C;
      if (c.includes(M)) continue;
      c.push(M);
      const A = a(C, P);
      for (let O = 0; O < A.length; ++O) {
        const W = A[O];
        c.push(R + W);
      }
      p = g + (p.length > 0 ? " " + p : p);
    }
    return p;
  };
function tx() {
  let n = 0,
    o,
    s,
    l = "";
  for (; n < arguments.length; )
    (o = arguments[n++]) && (s = Uh(o)) && (l && (l += " "), (l += s));
  return l;
}
const Uh = (n) => {
  if (typeof n == "string") return n;
  let o,
    s = "";
  for (let l = 0; l < n.length; l++)
    n[l] && (o = Uh(n[l])) && (s && (s += " "), (s += o));
  return s;
};
function nx(n, ...o) {
  let s,
    l,
    a,
    c = f;
  function f(m) {
    const g = o.reduce((v, w) => w(v), n());
    return ((s = X0(g)), (l = s.cache.get), (a = s.cache.set), (c = p), p(m));
  }
  function p(m) {
    const g = l(m);
    if (g) return g;
    const v = ex(m, s);
    return (a(m, v), v);
  }
  return function () {
    return c(tx.apply(null, arguments));
  };
}
const Me = (n) => {
    const o = (s) => s[n] || [];
    return ((o.isThemeGetter = !0), o);
  },
  Vh = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  rx = /^\d+\/\d+$/,
  ox = new Set(["px", "full", "screen"]),
  sx = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ix =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  lx = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  ax = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  ux =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  vn = (n) => Gr(n) || ox.has(n) || rx.test(n),
  Wn = (n) => eo(n, "length", yx),
  Gr = (n) => !!n && !Number.isNaN(Number(n)),
  Ua = (n) => eo(n, "number", Gr),
  qo = (n) => !!n && Number.isInteger(Number(n)),
  cx = (n) => n.endsWith("%") && Gr(n.slice(0, -1)),
  we = (n) => Vh.test(n),
  $n = (n) => sx.test(n),
  dx = new Set(["length", "size", "percentage"]),
  fx = (n) => eo(n, dx, Hh),
  px = (n) => eo(n, "position", Hh),
  hx = new Set(["image", "url"]),
  mx = (n) => eo(n, hx, xx),
  gx = (n) => eo(n, "", vx),
  Ko = () => !0,
  eo = (n, o, s) => {
    const l = Vh.exec(n);
    return l
      ? l[1]
        ? typeof o == "string"
          ? l[1] === o
          : o.has(l[1])
        : s(l[2])
      : !1;
  },
  yx = (n) => ix.test(n) && !lx.test(n),
  Hh = () => !1,
  vx = (n) => ax.test(n),
  xx = (n) => ux.test(n),
  wx = () => {
    const n = Me("colors"),
      o = Me("spacing"),
      s = Me("blur"),
      l = Me("brightness"),
      a = Me("borderColor"),
      c = Me("borderRadius"),
      f = Me("borderSpacing"),
      p = Me("borderWidth"),
      m = Me("contrast"),
      g = Me("grayscale"),
      v = Me("hueRotate"),
      w = Me("invert"),
      S = Me("gap"),
      x = Me("gradientColorStops"),
      P = Me("gradientColorStopPositions"),
      C = Me("inset"),
      N = Me("margin"),
      R = Me("opacity"),
      M = Me("padding"),
      A = Me("saturate"),
      O = Me("scale"),
      W = Me("sepia"),
      F = Me("skew"),
      B = Me("space"),
      Y = Me("translate"),
      K = () => ["auto", "contain", "none"],
      X = () => ["auto", "hidden", "clip", "visible", "scroll"],
      Z = () => ["auto", we, o],
      V = () => [we, o],
      J = () => ["", vn, Wn],
      U = () => ["auto", Gr, we],
      me = () => [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ],
      ue = () => ["solid", "dashed", "dotted", "double", "none"],
      ae = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      z = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ],
      H = () => ["", "0", we],
      q = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      j = () => [Gr, we];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [Ko],
        spacing: [vn, Wn],
        blur: ["none", "", $n, we],
        brightness: j(),
        borderColor: [n],
        borderRadius: ["none", "", "full", $n, we],
        borderSpacing: V(),
        borderWidth: J(),
        contrast: j(),
        grayscale: H(),
        hueRotate: j(),
        invert: H(),
        gap: V(),
        gradientColorStops: [n],
        gradientColorStopPositions: [cx, Wn],
        inset: Z(),
        margin: Z(),
        opacity: j(),
        padding: V(),
        saturate: j(),
        scale: j(),
        sepia: H(),
        skew: j(),
        space: V(),
        translate: V(),
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", "video", we] }],
        container: ["container"],
        columns: [{ columns: [$n] }],
        "break-after": [{ "break-after": q() }],
        "break-before": [{ "break-before": q() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: [...me(), we] }],
        overflow: [{ overflow: X() }],
        "overflow-x": [{ "overflow-x": X() }],
        "overflow-y": [{ "overflow-y": X() }],
        overscroll: [{ overscroll: K() }],
        "overscroll-x": [{ "overscroll-x": K() }],
        "overscroll-y": [{ "overscroll-y": K() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: [C] }],
        "inset-x": [{ "inset-x": [C] }],
        "inset-y": [{ "inset-y": [C] }],
        start: [{ start: [C] }],
        end: [{ end: [C] }],
        top: [{ top: [C] }],
        right: [{ right: [C] }],
        bottom: [{ bottom: [C] }],
        left: [{ left: [C] }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: ["auto", qo, we] }],
        basis: [{ basis: Z() }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
        flex: [{ flex: ["1", "auto", "initial", "none", we] }],
        grow: [{ grow: H() }],
        shrink: [{ shrink: H() }],
        order: [{ order: ["first", "last", "none", qo, we] }],
        "grid-cols": [{ "grid-cols": [Ko] }],
        "col-start-end": [{ col: ["auto", { span: ["full", qo, we] }, we] }],
        "col-start": [{ "col-start": U() }],
        "col-end": [{ "col-end": U() }],
        "grid-rows": [{ "grid-rows": [Ko] }],
        "row-start-end": [{ row: ["auto", { span: [qo, we] }, we] }],
        "row-start": [{ "row-start": U() }],
        "row-end": [{ "row-end": U() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", we] }],
        "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", we] }],
        gap: [{ gap: [S] }],
        "gap-x": [{ "gap-x": [S] }],
        "gap-y": [{ "gap-y": [S] }],
        "justify-content": [{ justify: ["normal", ...z()] }],
        "justify-items": [
          { "justify-items": ["start", "end", "center", "stretch"] },
        ],
        "justify-self": [
          { "justify-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        "align-content": [{ content: ["normal", ...z(), "baseline"] }],
        "align-items": [
          { items: ["start", "end", "center", "baseline", "stretch"] },
        ],
        "align-self": [
          { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
        ],
        "place-content": [{ "place-content": [...z(), "baseline"] }],
        "place-items": [
          { "place-items": ["start", "end", "center", "baseline", "stretch"] },
        ],
        "place-self": [
          { "place-self": ["auto", "start", "end", "center", "stretch"] },
        ],
        p: [{ p: [M] }],
        px: [{ px: [M] }],
        py: [{ py: [M] }],
        ps: [{ ps: [M] }],
        pe: [{ pe: [M] }],
        pt: [{ pt: [M] }],
        pr: [{ pr: [M] }],
        pb: [{ pb: [M] }],
        pl: [{ pl: [M] }],
        m: [{ m: [N] }],
        mx: [{ mx: [N] }],
        my: [{ my: [N] }],
        ms: [{ ms: [N] }],
        me: [{ me: [N] }],
        mt: [{ mt: [N] }],
        mr: [{ mr: [N] }],
        mb: [{ mb: [N] }],
        ml: [{ ml: [N] }],
        "space-x": [{ "space-x": [B] }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": [B] }],
        "space-y-reverse": ["space-y-reverse"],
        w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", we, o] }],
        "min-w": [{ "min-w": [we, o, "min", "max", "fit"] }],
        "max-w": [
          {
            "max-w": [
              we,
              o,
              "none",
              "full",
              "min",
              "max",
              "fit",
              "prose",
              { screen: [$n] },
              $n,
            ],
          },
        ],
        h: [{ h: [we, o, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
        "min-h": [
          { "min-h": [we, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        "max-h": [
          { "max-h": [we, o, "min", "max", "fit", "svh", "lvh", "dvh"] },
        ],
        size: [{ size: [we, o, "auto", "min", "max", "fit"] }],
        "font-size": [{ text: ["base", $n, Wn] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [
          {
            font: [
              "thin",
              "extralight",
              "light",
              "normal",
              "medium",
              "semibold",
              "bold",
              "extrabold",
              "black",
              Ua,
            ],
          },
        ],
        "font-family": [{ font: [Ko] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [
          {
            tracking: [
              "tighter",
              "tight",
              "normal",
              "wide",
              "wider",
              "widest",
              we,
            ],
          },
        ],
        "line-clamp": [{ "line-clamp": ["none", Gr, Ua] }],
        leading: [
          {
            leading: [
              "none",
              "tight",
              "snug",
              "normal",
              "relaxed",
              "loose",
              vn,
              we,
            ],
          },
        ],
        "list-image": [{ "list-image": ["none", we] }],
        "list-style-type": [{ list: ["none", "disc", "decimal", we] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "placeholder-color": [{ placeholder: [n] }],
        "placeholder-opacity": [{ "placeholder-opacity": [R] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "text-color": [{ text: [n] }],
        "text-opacity": [{ "text-opacity": [R] }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...ue(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: ["auto", "from-font", vn, Wn] },
        ],
        "underline-offset": [{ "underline-offset": ["auto", vn, we] }],
        "text-decoration-color": [{ decoration: [n] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: V() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              we,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", we] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-opacity": [{ "bg-opacity": [R] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: [...me(), px] }],
        "bg-repeat": [
          { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
        ],
        "bg-size": [{ bg: ["auto", "cover", "contain", fx] }],
        "bg-image": [
          {
            bg: [
              "none",
              { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
              mx,
            ],
          },
        ],
        "bg-color": [{ bg: [n] }],
        "gradient-from-pos": [{ from: [P] }],
        "gradient-via-pos": [{ via: [P] }],
        "gradient-to-pos": [{ to: [P] }],
        "gradient-from": [{ from: [x] }],
        "gradient-via": [{ via: [x] }],
        "gradient-to": [{ to: [x] }],
        rounded: [{ rounded: [c] }],
        "rounded-s": [{ "rounded-s": [c] }],
        "rounded-e": [{ "rounded-e": [c] }],
        "rounded-t": [{ "rounded-t": [c] }],
        "rounded-r": [{ "rounded-r": [c] }],
        "rounded-b": [{ "rounded-b": [c] }],
        "rounded-l": [{ "rounded-l": [c] }],
        "rounded-ss": [{ "rounded-ss": [c] }],
        "rounded-se": [{ "rounded-se": [c] }],
        "rounded-ee": [{ "rounded-ee": [c] }],
        "rounded-es": [{ "rounded-es": [c] }],
        "rounded-tl": [{ "rounded-tl": [c] }],
        "rounded-tr": [{ "rounded-tr": [c] }],
        "rounded-br": [{ "rounded-br": [c] }],
        "rounded-bl": [{ "rounded-bl": [c] }],
        "border-w": [{ border: [p] }],
        "border-w-x": [{ "border-x": [p] }],
        "border-w-y": [{ "border-y": [p] }],
        "border-w-s": [{ "border-s": [p] }],
        "border-w-e": [{ "border-e": [p] }],
        "border-w-t": [{ "border-t": [p] }],
        "border-w-r": [{ "border-r": [p] }],
        "border-w-b": [{ "border-b": [p] }],
        "border-w-l": [{ "border-l": [p] }],
        "border-opacity": [{ "border-opacity": [R] }],
        "border-style": [{ border: [...ue(), "hidden"] }],
        "divide-x": [{ "divide-x": [p] }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": [p] }],
        "divide-y-reverse": ["divide-y-reverse"],
        "divide-opacity": [{ "divide-opacity": [R] }],
        "divide-style": [{ divide: ue() }],
        "border-color": [{ border: [a] }],
        "border-color-x": [{ "border-x": [a] }],
        "border-color-y": [{ "border-y": [a] }],
        "border-color-s": [{ "border-s": [a] }],
        "border-color-e": [{ "border-e": [a] }],
        "border-color-t": [{ "border-t": [a] }],
        "border-color-r": [{ "border-r": [a] }],
        "border-color-b": [{ "border-b": [a] }],
        "border-color-l": [{ "border-l": [a] }],
        "divide-color": [{ divide: [a] }],
        "outline-style": [{ outline: ["", ...ue()] }],
        "outline-offset": [{ "outline-offset": [vn, we] }],
        "outline-w": [{ outline: [vn, Wn] }],
        "outline-color": [{ outline: [n] }],
        "ring-w": [{ ring: J() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: [n] }],
        "ring-opacity": [{ "ring-opacity": [R] }],
        "ring-offset-w": [{ "ring-offset": [vn, Wn] }],
        "ring-offset-color": [{ "ring-offset": [n] }],
        shadow: [{ shadow: ["", "inner", "none", $n, gx] }],
        "shadow-color": [{ shadow: [Ko] }],
        opacity: [{ opacity: [R] }],
        "mix-blend": [
          { "mix-blend": [...ae(), "plus-lighter", "plus-darker"] },
        ],
        "bg-blend": [{ "bg-blend": ae() }],
        filter: [{ filter: ["", "none"] }],
        blur: [{ blur: [s] }],
        brightness: [{ brightness: [l] }],
        contrast: [{ contrast: [m] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", $n, we] }],
        grayscale: [{ grayscale: [g] }],
        "hue-rotate": [{ "hue-rotate": [v] }],
        invert: [{ invert: [w] }],
        saturate: [{ saturate: [A] }],
        sepia: [{ sepia: [W] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
        "backdrop-blur": [{ "backdrop-blur": [s] }],
        "backdrop-brightness": [{ "backdrop-brightness": [l] }],
        "backdrop-contrast": [{ "backdrop-contrast": [m] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [g] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [v] }],
        "backdrop-invert": [{ "backdrop-invert": [w] }],
        "backdrop-opacity": [{ "backdrop-opacity": [R] }],
        "backdrop-saturate": [{ "backdrop-saturate": [A] }],
        "backdrop-sepia": [{ "backdrop-sepia": [W] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": [f] }],
        "border-spacing-x": [{ "border-spacing-x": [f] }],
        "border-spacing-y": [{ "border-spacing-y": [f] }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "none",
              "all",
              "",
              "colors",
              "opacity",
              "shadow",
              "transform",
              we,
            ],
          },
        ],
        duration: [{ duration: j() }],
        ease: [{ ease: ["linear", "in", "out", "in-out", we] }],
        delay: [{ delay: j() }],
        animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", we] }],
        transform: [{ transform: ["", "gpu", "none"] }],
        scale: [{ scale: [O] }],
        "scale-x": [{ "scale-x": [O] }],
        "scale-y": [{ "scale-y": [O] }],
        rotate: [{ rotate: [qo, we] }],
        "translate-x": [{ "translate-x": [Y] }],
        "translate-y": [{ "translate-y": [Y] }],
        "skew-x": [{ "skew-x": [F] }],
        "skew-y": [{ "skew-y": [F] }],
        "transform-origin": [
          {
            origin: [
              "center",
              "top",
              "top-right",
              "right",
              "bottom-right",
              "bottom",
              "bottom-left",
              "left",
              "top-left",
              we,
            ],
          },
        ],
        accent: [{ accent: ["auto", n] }],
        appearance: [{ appearance: ["none", "auto"] }],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              we,
            ],
          },
        ],
        "caret-color": [{ caret: [n] }],
        "pointer-events": [{ "pointer-events": ["none", "auto"] }],
        resize: [{ resize: ["none", "y", "x", ""] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": V() }],
        "scroll-mx": [{ "scroll-mx": V() }],
        "scroll-my": [{ "scroll-my": V() }],
        "scroll-ms": [{ "scroll-ms": V() }],
        "scroll-me": [{ "scroll-me": V() }],
        "scroll-mt": [{ "scroll-mt": V() }],
        "scroll-mr": [{ "scroll-mr": V() }],
        "scroll-mb": [{ "scroll-mb": V() }],
        "scroll-ml": [{ "scroll-ml": V() }],
        "scroll-p": [{ "scroll-p": V() }],
        "scroll-px": [{ "scroll-px": V() }],
        "scroll-py": [{ "scroll-py": V() }],
        "scroll-ps": [{ "scroll-ps": V() }],
        "scroll-pe": [{ "scroll-pe": V() }],
        "scroll-pt": [{ "scroll-pt": V() }],
        "scroll-pr": [{ "scroll-pr": V() }],
        "scroll-pb": [{ "scroll-pb": V() }],
        "scroll-pl": [{ "scroll-pl": V() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          { "will-change": ["auto", "scroll", "contents", "transform", we] },
        ],
        fill: [{ fill: [n, "none"] }],
        "stroke-w": [{ stroke: [vn, Wn, Ua] }],
        stroke: [{ stroke: [n, "none"] }],
        sr: ["sr-only", "not-sr-only"],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
  },
  bx = nx(wx);
function gr(...n) {
  return bx(_h(n));
}
const Sx = Xv,
  Wh = b.forwardRef(({ className: n, ...o }, s) =>
    h.jsx(kh, {
      ref: s,
      className: gr(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        n,
      ),
      ...o,
    }),
  );
Wh.displayName = kh.displayName;
const Cx = Zv(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  $h = b.forwardRef(({ className: n, variant: o, ...s }, l) =>
    h.jsx(Ph, { ref: l, className: gr(Cx({ variant: o }), n), ...s }),
  );
$h.displayName = Ph.displayName;
const Ex = b.forwardRef(({ className: n, ...o }, s) =>
  h.jsx(Rh, {
    ref: s,
    className: gr(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      n,
    ),
    ...o,
  }),
);
Ex.displayName = Rh.displayName;
const Qh = b.forwardRef(({ className: n, ...o }, s) =>
  h.jsx(Mh, {
    ref: s,
    className: gr(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      n,
    ),
    "toast-close": "",
    ...o,
    children: h.jsx(H0, { className: "h-4 w-4" }),
  }),
);
Qh.displayName = Mh.displayName;
const qh = b.forwardRef(({ className: n, ...o }, s) =>
  h.jsx(jh, { ref: s, className: gr("text-sm font-semibold", n), ...o }),
);
qh.displayName = jh.displayName;
const Kh = b.forwardRef(({ className: n, ...o }, s) =>
  h.jsx(Th, { ref: s, className: gr("text-sm opacity-90", n), ...o }),
);
Kh.displayName = Th.displayName;
function Nx() {
  const { toasts: n } = ev();
  return h.jsxs(Sx, {
    children: [
      n.map(function ({ id: o, title: s, description: l, action: a, ...c }) {
        return h.jsxs(
          $h,
          {
            ...c,
            children: [
              h.jsxs("div", {
                className: "grid gap-1",
                children: [
                  s && h.jsx(qh, { children: s }),
                  l && h.jsx(Kh, { children: l }),
                ],
              }),
              a,
              h.jsx(Qh, {}),
            ],
          },
          o,
        );
      }),
      h.jsx(Wh, {}),
    ],
  });
}
var kx = (n, o, s, l, a, c, f, p) => {
    let m = document.documentElement,
      g = ["light", "dark"];
    function v(x) {
      ((Array.isArray(n) ? n : [n]).forEach((P) => {
        let C = P === "class",
          N = C && c ? a.map((R) => c[R] || R) : a;
        C
          ? (m.classList.remove(...N), m.classList.add(c && c[x] ? c[x] : x))
          : m.setAttribute(P, x);
      }),
        w(x));
    }
    function w(x) {
      p && g.includes(x) && (m.style.colorScheme = x);
    }
    function S() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (l) v(l);
    else
      try {
        let x = localStorage.getItem(o) || s,
          P = f && x === "system" ? S() : x;
        v(P);
      } catch {}
  },
  Px = b.createContext(void 0),
  jx = { setTheme: (n) => {}, themes: [] },
  Tx = () => {
    var n;
    return (n = b.useContext(Px)) != null ? n : jx;
  };
b.memo(
  ({
    forcedTheme: n,
    storageKey: o,
    attribute: s,
    enableSystem: l,
    enableColorScheme: a,
    defaultTheme: c,
    value: f,
    themes: p,
    nonce: m,
    scriptProps: g,
  }) => {
    let v = JSON.stringify([s, o, c, n, p, f, l, a]).slice(1, -1);
    return b.createElement("script", {
      ...g,
      suppressHydrationWarning: !0,
      nonce: typeof window > "u" ? m : "",
      dangerouslySetInnerHTML: { __html: `(${kx.toString()})(${v})` },
    });
  },
);
var Rx = (n) => {
    switch (n) {
      case "success":
        return _x;
      case "info":
        return Ox;
      case "warning":
        return Lx;
      case "error":
        return Ix;
      default:
        return null;
    }
  },
  Mx = Array(12).fill(0),
  Ax = ({ visible: n, className: o }) =>
    te.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", o].filter(Boolean).join(" "),
        "data-visible": n,
      },
      te.createElement(
        "div",
        { className: "sonner-spinner" },
        Mx.map((s, l) =>
          te.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${l}`,
          }),
        ),
      ),
    ),
  _x = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  Lx = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  Ox = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  Ix = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    te.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  Dx = te.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    te.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    te.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  Fx = () => {
    let [n, o] = te.useState(document.hidden);
    return (
      te.useEffect(() => {
        let s = () => {
          o(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", s),
          () => window.removeEventListener("visibilitychange", s)
        );
      }, []),
      n
    );
  },
  wu = 1,
  zx = class {
    constructor() {
      ((this.subscribe = (n) => (
        this.subscribers.push(n),
        () => {
          let o = this.subscribers.indexOf(n);
          this.subscribers.splice(o, 1);
        }
      )),
        (this.publish = (n) => {
          this.subscribers.forEach((o) => o(n));
        }),
        (this.addToast = (n) => {
          (this.publish(n), (this.toasts = [...this.toasts, n]));
        }),
        (this.create = (n) => {
          var o;
          let { message: s, ...l } = n,
            a =
              typeof n?.id == "number" ||
              ((o = n.id) == null ? void 0 : o.length) > 0
                ? n.id
                : wu++,
            c = this.toasts.find((p) => p.id === a),
            f = n.dismissible === void 0 ? !0 : n.dismissible;
          return (
            this.dismissedToasts.has(a) && this.dismissedToasts.delete(a),
            c
              ? (this.toasts = this.toasts.map((p) =>
                  p.id === a
                    ? (this.publish({ ...p, ...n, id: a, title: s }),
                      { ...p, ...n, id: a, dismissible: f, title: s })
                    : p,
                ))
              : this.addToast({ title: s, ...l, dismissible: f, id: a }),
            a
          );
        }),
        (this.dismiss = (n) => (
          this.dismissedToasts.add(n),
          n ||
            this.toasts.forEach((o) => {
              this.subscribers.forEach((s) => s({ id: o.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((o) => o({ id: n, dismiss: !0 })),
          n
        )),
        (this.message = (n, o) => this.create({ ...o, message: n })),
        (this.error = (n, o) =>
          this.create({ ...o, message: n, type: "error" })),
        (this.success = (n, o) =>
          this.create({ ...o, type: "success", message: n })),
        (this.info = (n, o) => this.create({ ...o, type: "info", message: n })),
        (this.warning = (n, o) =>
          this.create({ ...o, type: "warning", message: n })),
        (this.loading = (n, o) =>
          this.create({ ...o, type: "loading", message: n })),
        (this.promise = (n, o) => {
          if (!o) return;
          let s;
          o.loading !== void 0 &&
            (s = this.create({
              ...o,
              promise: n,
              type: "loading",
              message: o.loading,
              description:
                typeof o.description != "function" ? o.description : void 0,
            }));
          let l = n instanceof Promise ? n : n(),
            a = s !== void 0,
            c,
            f = l
              .then(async (m) => {
                if (((c = ["resolve", m]), te.isValidElement(m)))
                  ((a = !1),
                    this.create({ id: s, type: "default", message: m }));
                else if (Ux(m) && !m.ok) {
                  a = !1;
                  let g =
                      typeof o.error == "function"
                        ? await o.error(`HTTP error! status: ${m.status}`)
                        : o.error,
                    v =
                      typeof o.description == "function"
                        ? await o.description(`HTTP error! status: ${m.status}`)
                        : o.description;
                  this.create({
                    id: s,
                    type: "error",
                    message: g,
                    description: v,
                  });
                } else if (o.success !== void 0) {
                  a = !1;
                  let g =
                      typeof o.success == "function"
                        ? await o.success(m)
                        : o.success,
                    v =
                      typeof o.description == "function"
                        ? await o.description(m)
                        : o.description;
                  this.create({
                    id: s,
                    type: "success",
                    message: g,
                    description: v,
                  });
                }
              })
              .catch(async (m) => {
                if (((c = ["reject", m]), o.error !== void 0)) {
                  a = !1;
                  let g =
                      typeof o.error == "function" ? await o.error(m) : o.error,
                    v =
                      typeof o.description == "function"
                        ? await o.description(m)
                        : o.description;
                  this.create({
                    id: s,
                    type: "error",
                    message: g,
                    description: v,
                  });
                }
              })
              .finally(() => {
                var m;
                (a && (this.dismiss(s), (s = void 0)),
                  (m = o.finally) == null || m.call(o));
              }),
            p = () =>
              new Promise((m, g) =>
                f.then(() => (c[0] === "reject" ? g(c[1]) : m(c[1]))).catch(g),
              );
          return typeof s != "string" && typeof s != "number"
            ? { unwrap: p }
            : Object.assign(s, { unwrap: p });
        }),
        (this.custom = (n, o) => {
          let s = o?.id || wu++;
          return (this.create({ jsx: n(s), id: s, ...o }), s);
        }),
        (this.getActiveToasts = () =>
          this.toasts.filter((n) => !this.dismissedToasts.has(n.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  },
  ht = new zx(),
  Bx = (n, o) => {
    let s = o?.id || wu++;
    return (ht.addToast({ title: n, ...o, id: s }), s);
  },
  Ux = (n) =>
    n &&
    typeof n == "object" &&
    "ok" in n &&
    typeof n.ok == "boolean" &&
    "status" in n &&
    typeof n.status == "number",
  Vx = Bx,
  Hx = () => ht.toasts,
  Wx = () => ht.getActiveToasts();
Object.assign(
  Vx,
  {
    success: ht.success,
    info: ht.info,
    warning: ht.warning,
    error: ht.error,
    custom: ht.custom,
    message: ht.message,
    promise: ht.promise,
    dismiss: ht.dismiss,
    loading: ht.loading,
  },
  { getHistory: Hx, getToasts: Wx },
);
function $x(n, { insertAt: o } = {}) {
  if (typeof document > "u") return;
  let s = document.head || document.getElementsByTagName("head")[0],
    l = document.createElement("style");
  ((l.type = "text/css"),
    o === "top" && s.firstChild
      ? s.insertBefore(l, s.firstChild)
      : s.appendChild(l),
    l.styleSheet
      ? (l.styleSheet.cssText = n)
      : l.appendChild(document.createTextNode(n)));
}
$x(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function Ei(n) {
  return n.label !== void 0;
}
var Qx = 3,
  qx = "32px",
  Kx = "16px",
  tp = 4e3,
  Yx = 356,
  Gx = 14,
  Jx = 20,
  Xx = 200;
function Bt(...n) {
  return n.filter(Boolean).join(" ");
}
function Zx(n) {
  let [o, s] = n.split("-"),
    l = [];
  return (o && l.push(o), s && l.push(s), l);
}
var ew = (n) => {
  var o, s, l, a, c, f, p, m, g, v, w;
  let {
      invert: S,
      toast: x,
      unstyled: P,
      interacting: C,
      setHeights: N,
      visibleToasts: R,
      heights: M,
      index: A,
      toasts: O,
      expanded: W,
      removeToast: F,
      defaultRichColors: B,
      closeButton: Y,
      style: K,
      cancelButtonStyle: X,
      actionButtonStyle: Z,
      className: V = "",
      descriptionClassName: J = "",
      duration: U,
      position: me,
      gap: ue,
      loadingIcon: ae,
      expandByDefault: z,
      classNames: H,
      icons: q,
      closeButtonAriaLabel: j = "Close toast",
      pauseWhenPageIsHidden: D,
    } = n,
    [ne, oe] = te.useState(null),
    [fe, xe] = te.useState(null),
    [ie, ye] = te.useState(!1),
    [be, Ae] = te.useState(!1),
    [St, Sn] = te.useState(!1),
    [Ct, so] = te.useState(!1),
    [ls, io] = te.useState(!1),
    [lo, br] = te.useState(0),
    [ao, Cn] = te.useState(0),
    Et = te.useRef(x.duration || U || tp),
    Sr = te.useRef(null),
    $t = te.useRef(null),
    as = A === 0,
    us = A + 1 <= R,
    tt = x.type,
    Qt = x.dismissible !== !1,
    Cr = x.className || "",
    cs = x.descriptionClassName || "",
    qt = te.useMemo(
      () => M.findIndex((ve) => ve.toastId === x.id) || 0,
      [M, x.id],
    ),
    tr = te.useMemo(() => {
      var ve;
      return (ve = x.closeButton) != null ? ve : Y;
    }, [x.closeButton, Y]),
    ds = te.useMemo(() => x.duration || U || tp, [x.duration, U]),
    Er = te.useRef(0),
    un = te.useRef(0),
    fs = te.useRef(0),
    Kt = te.useRef(null),
    [uo, co] = me.split("-"),
    Nr = te.useMemo(
      () => M.reduce((ve, Ne, Pe) => (Pe >= qt ? ve : ve + Ne.height), 0),
      [M, qt],
    ),
    kr = Fx(),
    En = x.invert || S,
    Yt = tt === "loading";
  ((un.current = te.useMemo(() => qt * ue + Nr, [qt, Nr])),
    te.useEffect(() => {
      Et.current = ds;
    }, [ds]),
    te.useEffect(() => {
      ye(!0);
    }, []),
    te.useEffect(() => {
      let ve = $t.current;
      if (ve) {
        let Ne = ve.getBoundingClientRect().height;
        return (
          Cn(Ne),
          N((Pe) => [
            { toastId: x.id, height: Ne, position: x.position },
            ...Pe,
          ]),
          () => N((Pe) => Pe.filter((nt) => nt.toastId !== x.id))
        );
      }
    }, [N, x.id]),
    te.useLayoutEffect(() => {
      if (!ie) return;
      let ve = $t.current,
        Ne = ve.style.height;
      ve.style.height = "auto";
      let Pe = ve.getBoundingClientRect().height;
      ((ve.style.height = Ne),
        Cn(Pe),
        N((nt) =>
          nt.find((it) => it.toastId === x.id)
            ? nt.map((it) => (it.toastId === x.id ? { ...it, height: Pe } : it))
            : [{ toastId: x.id, height: Pe, position: x.position }, ...nt],
        ));
    }, [ie, x.title, x.description, N, x.id]));
  let Mt = te.useCallback(() => {
    (Ae(!0),
      br(un.current),
      N((ve) => ve.filter((Ne) => Ne.toastId !== x.id)),
      setTimeout(() => {
        F(x);
      }, Xx));
  }, [x, F, N, un]);
  (te.useEffect(() => {
    if (
      (x.promise && tt === "loading") ||
      x.duration === 1 / 0 ||
      x.type === "loading"
    )
      return;
    let ve;
    return (
      W || C || (D && kr)
        ? (() => {
            if (fs.current < Er.current) {
              let Ne = new Date().getTime() - Er.current;
              Et.current = Et.current - Ne;
            }
            fs.current = new Date().getTime();
          })()
        : Et.current !== 1 / 0 &&
          ((Er.current = new Date().getTime()),
          (ve = setTimeout(() => {
            var Ne;
            ((Ne = x.onAutoClose) == null || Ne.call(x, x), Mt());
          }, Et.current))),
      () => clearTimeout(ve)
    );
  }, [W, C, x, tt, D, kr, Mt]),
    te.useEffect(() => {
      x.delete && Mt();
    }, [Mt, x.delete]));
  function ps() {
    var ve, Ne, Pe;
    return q != null && q.loading
      ? te.createElement(
          "div",
          {
            className: Bt(
              H?.loader,
              (ve = x?.classNames) == null ? void 0 : ve.loader,
              "sonner-loader",
            ),
            "data-visible": tt === "loading",
          },
          q.loading,
        )
      : ae
        ? te.createElement(
            "div",
            {
              className: Bt(
                H?.loader,
                (Ne = x?.classNames) == null ? void 0 : Ne.loader,
                "sonner-loader",
              ),
              "data-visible": tt === "loading",
            },
            ae,
          )
        : te.createElement(Ax, {
            className: Bt(
              H?.loader,
              (Pe = x?.classNames) == null ? void 0 : Pe.loader,
            ),
            visible: tt === "loading",
          });
  }
  return te.createElement(
    "li",
    {
      tabIndex: 0,
      ref: $t,
      className: Bt(
        V,
        Cr,
        H?.toast,
        (o = x?.classNames) == null ? void 0 : o.toast,
        H?.default,
        H?.[tt],
        (s = x?.classNames) == null ? void 0 : s[tt],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (l = x.richColors) != null ? l : B,
      "data-styled": !(x.jsx || x.unstyled || P),
      "data-mounted": ie,
      "data-promise": !!x.promise,
      "data-swiped": ls,
      "data-removed": be,
      "data-visible": us,
      "data-y-position": uo,
      "data-x-position": co,
      "data-index": A,
      "data-front": as,
      "data-swiping": St,
      "data-dismissible": Qt,
      "data-type": tt,
      "data-invert": En,
      "data-swipe-out": Ct,
      "data-swipe-direction": fe,
      "data-expanded": !!(W || (z && ie)),
      style: {
        "--index": A,
        "--toasts-before": A,
        "--z-index": O.length - A,
        "--offset": `${be ? lo : un.current}px`,
        "--initial-height": z ? "auto" : `${ao}px`,
        ...K,
        ...x.style,
      },
      onDragEnd: () => {
        (Sn(!1), oe(null), (Kt.current = null));
      },
      onPointerDown: (ve) => {
        Yt ||
          !Qt ||
          ((Sr.current = new Date()),
          br(un.current),
          ve.target.setPointerCapture(ve.pointerId),
          ve.target.tagName !== "BUTTON" &&
            (Sn(!0), (Kt.current = { x: ve.clientX, y: ve.clientY })));
      },
      onPointerUp: () => {
        var ve, Ne, Pe, nt;
        if (Ct || !Qt) return;
        Kt.current = null;
        let it = Number(
            ((ve = $t.current) == null
              ? void 0
              : ve.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0,
          ),
          lt = Number(
            ((Ne = $t.current) == null
              ? void 0
              : Ne.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0,
          ),
          At =
            new Date().getTime() -
            ((Pe = Sr.current) == null ? void 0 : Pe.getTime()),
          Ke = ne === "x" ? it : lt,
          Gt = Math.abs(Ke) / At;
        if (Math.abs(Ke) >= Jx || Gt > 0.11) {
          (br(un.current),
            (nt = x.onDismiss) == null || nt.call(x, x),
            xe(
              ne === "x" ? (it > 0 ? "right" : "left") : lt > 0 ? "down" : "up",
            ),
            Mt(),
            so(!0),
            io(!1));
          return;
        }
        (Sn(!1), oe(null));
      },
      onPointerMove: (ve) => {
        var Ne, Pe, nt, it;
        if (
          !Kt.current ||
          !Qt ||
          ((Ne = window.getSelection()) == null
            ? void 0
            : Ne.toString().length) > 0
        )
          return;
        let lt = ve.clientY - Kt.current.y,
          At = ve.clientX - Kt.current.x,
          Ke = (Pe = n.swipeDirections) != null ? Pe : Zx(me);
        !ne &&
          (Math.abs(At) > 1 || Math.abs(lt) > 1) &&
          oe(Math.abs(At) > Math.abs(lt) ? "x" : "y");
        let Gt = { x: 0, y: 0 };
        (ne === "y"
          ? (Ke.includes("top") || Ke.includes("bottom")) &&
            ((Ke.includes("top") && lt < 0) ||
              (Ke.includes("bottom") && lt > 0)) &&
            (Gt.y = lt)
          : ne === "x" &&
            (Ke.includes("left") || Ke.includes("right")) &&
            ((Ke.includes("left") && At < 0) ||
              (Ke.includes("right") && At > 0)) &&
            (Gt.x = At),
          (Math.abs(Gt.x) > 0 || Math.abs(Gt.y) > 0) && io(!0),
          (nt = $t.current) == null ||
            nt.style.setProperty("--swipe-amount-x", `${Gt.x}px`),
          (it = $t.current) == null ||
            it.style.setProperty("--swipe-amount-y", `${Gt.y}px`));
      },
    },
    tr && !x.jsx
      ? te.createElement(
          "button",
          {
            "aria-label": j,
            "data-disabled": Yt,
            "data-close-button": !0,
            onClick:
              Yt || !Qt
                ? () => {}
                : () => {
                    var ve;
                    (Mt(), (ve = x.onDismiss) == null || ve.call(x, x));
                  },
            className: Bt(
              H?.closeButton,
              (a = x?.classNames) == null ? void 0 : a.closeButton,
            ),
          },
          (c = q?.close) != null ? c : Dx,
        )
      : null,
    x.jsx || b.isValidElement(x.title)
      ? x.jsx
        ? x.jsx
        : typeof x.title == "function"
          ? x.title()
          : x.title
      : te.createElement(
          te.Fragment,
          null,
          tt || x.icon || x.promise
            ? te.createElement(
                "div",
                {
                  "data-icon": "",
                  className: Bt(
                    H?.icon,
                    (f = x?.classNames) == null ? void 0 : f.icon,
                  ),
                },
                x.promise || (x.type === "loading" && !x.icon)
                  ? x.icon || ps()
                  : null,
                x.type !== "loading" ? x.icon || q?.[tt] || Rx(tt) : null,
              )
            : null,
          te.createElement(
            "div",
            {
              "data-content": "",
              className: Bt(
                H?.content,
                (p = x?.classNames) == null ? void 0 : p.content,
              ),
            },
            te.createElement(
              "div",
              {
                "data-title": "",
                className: Bt(
                  H?.title,
                  (m = x?.classNames) == null ? void 0 : m.title,
                ),
              },
              typeof x.title == "function" ? x.title() : x.title,
            ),
            x.description
              ? te.createElement(
                  "div",
                  {
                    "data-description": "",
                    className: Bt(
                      J,
                      cs,
                      H?.description,
                      (g = x?.classNames) == null ? void 0 : g.description,
                    ),
                  },
                  typeof x.description == "function"
                    ? x.description()
                    : x.description,
                )
              : null,
          ),
          b.isValidElement(x.cancel)
            ? x.cancel
            : x.cancel && Ei(x.cancel)
              ? te.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-cancel": !0,
                    style: x.cancelButtonStyle || X,
                    onClick: (ve) => {
                      var Ne, Pe;
                      Ei(x.cancel) &&
                        Qt &&
                        ((Pe = (Ne = x.cancel).onClick) == null ||
                          Pe.call(Ne, ve),
                        Mt());
                    },
                    className: Bt(
                      H?.cancelButton,
                      (v = x?.classNames) == null ? void 0 : v.cancelButton,
                    ),
                  },
                  x.cancel.label,
                )
              : null,
          b.isValidElement(x.action)
            ? x.action
            : x.action && Ei(x.action)
              ? te.createElement(
                  "button",
                  {
                    "data-button": !0,
                    "data-action": !0,
                    style: x.actionButtonStyle || Z,
                    onClick: (ve) => {
                      var Ne, Pe;
                      Ei(x.action) &&
                        ((Pe = (Ne = x.action).onClick) == null ||
                          Pe.call(Ne, ve),
                        !ve.defaultPrevented && Mt());
                    },
                    className: Bt(
                      H?.actionButton,
                      (w = x?.classNames) == null ? void 0 : w.actionButton,
                    ),
                  },
                  x.action.label,
                )
              : null,
        ),
  );
};
function np() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  let n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n
    ? window.getComputedStyle(document.documentElement).direction
    : n;
}
function tw(n, o) {
  let s = {};
  return (
    [n, o].forEach((l, a) => {
      let c = a === 1,
        f = c ? "--mobile-offset" : "--offset",
        p = c ? Kx : qx;
      function m(g) {
        ["top", "right", "bottom", "left"].forEach((v) => {
          s[`${f}-${v}`] = typeof g == "number" ? `${g}px` : g;
        });
      }
      typeof l == "number" || typeof l == "string"
        ? m(l)
        : typeof l == "object"
          ? ["top", "right", "bottom", "left"].forEach((g) => {
              l[g] === void 0
                ? (s[`${f}-${g}`] = p)
                : (s[`${f}-${g}`] =
                    typeof l[g] == "number" ? `${l[g]}px` : l[g]);
            })
          : m(p);
    }),
    s
  );
}
var nw = b.forwardRef(function (n, o) {
  let {
      invert: s,
      position: l = "bottom-right",
      hotkey: a = ["altKey", "KeyT"],
      expand: c,
      closeButton: f,
      className: p,
      offset: m,
      mobileOffset: g,
      theme: v = "light",
      richColors: w,
      duration: S,
      style: x,
      visibleToasts: P = Qx,
      toastOptions: C,
      dir: N = np(),
      gap: R = Gx,
      loadingIcon: M,
      icons: A,
      containerAriaLabel: O = "Notifications",
      pauseWhenPageIsHidden: W,
    } = n,
    [F, B] = te.useState([]),
    Y = te.useMemo(
      () =>
        Array.from(
          new Set(
            [l].concat(F.filter((D) => D.position).map((D) => D.position)),
          ),
        ),
      [F, l],
    ),
    [K, X] = te.useState([]),
    [Z, V] = te.useState(!1),
    [J, U] = te.useState(!1),
    [me, ue] = te.useState(
      v !== "system"
        ? v
        : typeof window < "u" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    ),
    ae = te.useRef(null),
    z = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    H = te.useRef(null),
    q = te.useRef(!1),
    j = te.useCallback((D) => {
      B((ne) => {
        var oe;
        return (
          ((oe = ne.find((fe) => fe.id === D.id)) != null && oe.delete) ||
            ht.dismiss(D.id),
          ne.filter(({ id: fe }) => fe !== D.id)
        );
      });
    }, []);
  return (
    te.useEffect(
      () =>
        ht.subscribe((D) => {
          if (D.dismiss) {
            B((ne) =>
              ne.map((oe) => (oe.id === D.id ? { ...oe, delete: !0 } : oe)),
            );
            return;
          }
          setTimeout(() => {
            lh.flushSync(() => {
              B((ne) => {
                let oe = ne.findIndex((fe) => fe.id === D.id);
                return oe !== -1
                  ? [
                      ...ne.slice(0, oe),
                      { ...ne[oe], ...D },
                      ...ne.slice(oe + 1),
                    ]
                  : [D, ...ne];
              });
            });
          });
        }),
      [],
    ),
    te.useEffect(() => {
      if (v !== "system") {
        ue(v);
        return;
      }
      if (
        (v === "system" &&
          (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? ue("dark")
            : ue("light")),
        typeof window > "u")
      )
        return;
      let D = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        D.addEventListener("change", ({ matches: ne }) => {
          ue(ne ? "dark" : "light");
        });
      } catch {
        D.addListener(({ matches: oe }) => {
          try {
            ue(oe ? "dark" : "light");
          } catch (fe) {
            console.error(fe);
          }
        });
      }
    }, [v]),
    te.useEffect(() => {
      F.length <= 1 && V(!1);
    }, [F]),
    te.useEffect(() => {
      let D = (ne) => {
        var oe, fe;
        (a.every((xe) => ne[xe] || ne.code === xe) &&
          (V(!0), (oe = ae.current) == null || oe.focus()),
          ne.code === "Escape" &&
            (document.activeElement === ae.current ||
              ((fe = ae.current) != null &&
                fe.contains(document.activeElement))) &&
            V(!1));
      };
      return (
        document.addEventListener("keydown", D),
        () => document.removeEventListener("keydown", D)
      );
    }, [a]),
    te.useEffect(() => {
      if (ae.current)
        return () => {
          H.current &&
            (H.current.focus({ preventScroll: !0 }),
            (H.current = null),
            (q.current = !1));
        };
    }, [ae.current]),
    te.createElement(
      "section",
      {
        ref: o,
        "aria-label": `${O} ${z}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: !0,
      },
      Y.map((D, ne) => {
        var oe;
        let [fe, xe] = D.split("-");
        return F.length
          ? te.createElement(
              "ol",
              {
                key: D,
                dir: N === "auto" ? np() : N,
                tabIndex: -1,
                ref: ae,
                className: p,
                "data-sonner-toaster": !0,
                "data-theme": me,
                "data-y-position": fe,
                "data-lifted": Z && F.length > 1 && !c,
                "data-x-position": xe,
                style: {
                  "--front-toast-height": `${((oe = K[0]) == null ? void 0 : oe.height) || 0}px`,
                  "--width": `${Yx}px`,
                  "--gap": `${R}px`,
                  ...x,
                  ...tw(m, g),
                },
                onBlur: (ie) => {
                  q.current &&
                    !ie.currentTarget.contains(ie.relatedTarget) &&
                    ((q.current = !1),
                    H.current &&
                      (H.current.focus({ preventScroll: !0 }),
                      (H.current = null)));
                },
                onFocus: (ie) => {
                  (ie.target instanceof HTMLElement &&
                    ie.target.dataset.dismissible === "false") ||
                    q.current ||
                    ((q.current = !0), (H.current = ie.relatedTarget));
                },
                onMouseEnter: () => V(!0),
                onMouseMove: () => V(!0),
                onMouseLeave: () => {
                  J || V(!1);
                },
                onDragEnd: () => V(!1),
                onPointerDown: (ie) => {
                  (ie.target instanceof HTMLElement &&
                    ie.target.dataset.dismissible === "false") ||
                    U(!0);
                },
                onPointerUp: () => U(!1),
              },
              F.filter(
                (ie) => (!ie.position && ne === 0) || ie.position === D,
              ).map((ie, ye) => {
                var be, Ae;
                return te.createElement(ew, {
                  key: ie.id,
                  icons: A,
                  index: ye,
                  toast: ie,
                  defaultRichColors: w,
                  duration: (be = C?.duration) != null ? be : S,
                  className: C?.className,
                  descriptionClassName: C?.descriptionClassName,
                  invert: s,
                  visibleToasts: P,
                  closeButton: (Ae = C?.closeButton) != null ? Ae : f,
                  interacting: J,
                  position: D,
                  style: C?.style,
                  unstyled: C?.unstyled,
                  classNames: C?.classNames,
                  cancelButtonStyle: C?.cancelButtonStyle,
                  actionButtonStyle: C?.actionButtonStyle,
                  removeToast: j,
                  toasts: F.filter((St) => St.position == ie.position),
                  heights: K.filter((St) => St.position == ie.position),
                  setHeights: X,
                  expandByDefault: c,
                  gap: R,
                  loadingIcon: M,
                  expanded: Z,
                  pauseWhenPageIsHidden: W,
                  swipeDirections: n.swipeDirections,
                });
              }),
            )
          : null;
      }),
    )
  );
});
const rw = ({ ...n }) => {
    const { theme: o = "system" } = Tx();
    return h.jsx(nw, {
      theme: o,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      },
      ...n,
    });
  },
  ow = ["top", "right", "bottom", "left"],
  Xn = Math.min,
  wt = Math.max,
  _i = Math.round,
  Ni = Math.floor,
  sn = (n) => ({ x: n, y: n }),
  sw = { left: "right", right: "left", bottom: "top", top: "bottom" },
  iw = { start: "end", end: "start" };
function bu(n, o, s) {
  return wt(n, Xn(o, s));
}
function xn(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function wn(n) {
  return n.split("-")[0];
}
function to(n) {
  return n.split("-")[1];
}
function Vu(n) {
  return n === "x" ? "y" : "x";
}
function Hu(n) {
  return n === "y" ? "height" : "width";
}
const lw = new Set(["top", "bottom"]);
function on(n) {
  return lw.has(wn(n)) ? "y" : "x";
}
function Wu(n) {
  return Vu(on(n));
}
function aw(n, o, s) {
  s === void 0 && (s = !1);
  const l = to(n),
    a = Wu(n),
    c = Hu(a);
  let f =
    a === "x"
      ? l === (s ? "end" : "start")
        ? "right"
        : "left"
      : l === "start"
        ? "bottom"
        : "top";
  return (o.reference[c] > o.floating[c] && (f = Li(f)), [f, Li(f)]);
}
function uw(n) {
  const o = Li(n);
  return [Su(n), o, Su(o)];
}
function Su(n) {
  return n.replace(/start|end/g, (o) => iw[o]);
}
const rp = ["left", "right"],
  op = ["right", "left"],
  cw = ["top", "bottom"],
  dw = ["bottom", "top"];
function fw(n, o, s) {
  switch (n) {
    case "top":
    case "bottom":
      return s ? (o ? op : rp) : o ? rp : op;
    case "left":
    case "right":
      return o ? cw : dw;
    default:
      return [];
  }
}
function pw(n, o, s, l) {
  const a = to(n);
  let c = fw(wn(n), s === "start", l);
  return (
    a && ((c = c.map((f) => f + "-" + a)), o && (c = c.concat(c.map(Su)))),
    c
  );
}
function Li(n) {
  return n.replace(/left|right|bottom|top/g, (o) => sw[o]);
}
function hw(n) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...n };
}
function Yh(n) {
  return typeof n != "number"
    ? hw(n)
    : { top: n, right: n, bottom: n, left: n };
}
function Oi(n) {
  const { x: o, y: s, width: l, height: a } = n;
  return {
    width: l,
    height: a,
    top: s,
    left: o,
    right: o + l,
    bottom: s + a,
    x: o,
    y: s,
  };
}
function sp(n, o, s) {
  let { reference: l, floating: a } = n;
  const c = on(o),
    f = Wu(o),
    p = Hu(f),
    m = wn(o),
    g = c === "y",
    v = l.x + l.width / 2 - a.width / 2,
    w = l.y + l.height / 2 - a.height / 2,
    S = l[p] / 2 - a[p] / 2;
  let x;
  switch (m) {
    case "top":
      x = { x: v, y: l.y - a.height };
      break;
    case "bottom":
      x = { x: v, y: l.y + l.height };
      break;
    case "right":
      x = { x: l.x + l.width, y: w };
      break;
    case "left":
      x = { x: l.x - a.width, y: w };
      break;
    default:
      x = { x: l.x, y: l.y };
  }
  switch (to(o)) {
    case "start":
      x[f] -= S * (s && g ? -1 : 1);
      break;
    case "end":
      x[f] += S * (s && g ? -1 : 1);
      break;
  }
  return x;
}
const mw = async (n, o, s) => {
  const {
      placement: l = "bottom",
      strategy: a = "absolute",
      middleware: c = [],
      platform: f,
    } = s,
    p = c.filter(Boolean),
    m = await (f.isRTL == null ? void 0 : f.isRTL(o));
  let g = await f.getElementRects({ reference: n, floating: o, strategy: a }),
    { x: v, y: w } = sp(g, l, m),
    S = l,
    x = {},
    P = 0;
  for (let C = 0; C < p.length; C++) {
    const { name: N, fn: R } = p[C],
      {
        x: M,
        y: A,
        data: O,
        reset: W,
      } = await R({
        x: v,
        y: w,
        initialPlacement: l,
        placement: S,
        strategy: a,
        middlewareData: x,
        rects: g,
        platform: f,
        elements: { reference: n, floating: o },
      });
    ((v = M ?? v),
      (w = A ?? w),
      (x = { ...x, [N]: { ...x[N], ...O } }),
      W &&
        P <= 50 &&
        (P++,
        typeof W == "object" &&
          (W.placement && (S = W.placement),
          W.rects &&
            (g =
              W.rects === !0
                ? await f.getElementRects({
                    reference: n,
                    floating: o,
                    strategy: a,
                  })
                : W.rects),
          ({ x: v, y: w } = sp(g, S, m))),
        (C = -1)));
  }
  return { x: v, y: w, placement: S, strategy: a, middlewareData: x };
};
async function Zo(n, o) {
  var s;
  o === void 0 && (o = {});
  const { x: l, y: a, platform: c, rects: f, elements: p, strategy: m } = n,
    {
      boundary: g = "clippingAncestors",
      rootBoundary: v = "viewport",
      elementContext: w = "floating",
      altBoundary: S = !1,
      padding: x = 0,
    } = xn(o, n),
    P = Yh(x),
    N = p[S ? (w === "floating" ? "reference" : "floating") : w],
    R = Oi(
      await c.getClippingRect({
        element:
          (s = await (c.isElement == null ? void 0 : c.isElement(N))) == null ||
          s
            ? N
            : N.contextElement ||
              (await (c.getDocumentElement == null
                ? void 0
                : c.getDocumentElement(p.floating))),
        boundary: g,
        rootBoundary: v,
        strategy: m,
      }),
    ),
    M =
      w === "floating"
        ? { x: l, y: a, width: f.floating.width, height: f.floating.height }
        : f.reference,
    A = await (c.getOffsetParent == null
      ? void 0
      : c.getOffsetParent(p.floating)),
    O = (await (c.isElement == null ? void 0 : c.isElement(A)))
      ? (await (c.getScale == null ? void 0 : c.getScale(A))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    W = Oi(
      c.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: p,
            rect: M,
            offsetParent: A,
            strategy: m,
          })
        : M,
    );
  return {
    top: (R.top - W.top + P.top) / O.y,
    bottom: (W.bottom - R.bottom + P.bottom) / O.y,
    left: (R.left - W.left + P.left) / O.x,
    right: (W.right - R.right + P.right) / O.x,
  };
}
const gw = (n) => ({
    name: "arrow",
    options: n,
    async fn(o) {
      const {
          x: s,
          y: l,
          placement: a,
          rects: c,
          platform: f,
          elements: p,
          middlewareData: m,
        } = o,
        { element: g, padding: v = 0 } = xn(n, o) || {};
      if (g == null) return {};
      const w = Yh(v),
        S = { x: s, y: l },
        x = Wu(a),
        P = Hu(x),
        C = await f.getDimensions(g),
        N = x === "y",
        R = N ? "top" : "left",
        M = N ? "bottom" : "right",
        A = N ? "clientHeight" : "clientWidth",
        O = c.reference[P] + c.reference[x] - S[x] - c.floating[P],
        W = S[x] - c.reference[x],
        F = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(g));
      let B = F ? F[A] : 0;
      (!B || !(await (f.isElement == null ? void 0 : f.isElement(F)))) &&
        (B = p.floating[A] || c.floating[P]);
      const Y = O / 2 - W / 2,
        K = B / 2 - C[P] / 2 - 1,
        X = Xn(w[R], K),
        Z = Xn(w[M], K),
        V = X,
        J = B - C[P] - Z,
        U = B / 2 - C[P] / 2 + Y,
        me = bu(V, U, J),
        ue =
          !m.arrow &&
          to(a) != null &&
          U !== me &&
          c.reference[P] / 2 - (U < V ? X : Z) - C[P] / 2 < 0,
        ae = ue ? (U < V ? U - V : U - J) : 0;
      return {
        [x]: S[x] + ae,
        data: {
          [x]: me,
          centerOffset: U - me - ae,
          ...(ue && { alignmentOffset: ae }),
        },
        reset: ue,
      };
    },
  }),
  yw = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "flip",
        options: n,
        async fn(o) {
          var s, l;
          const {
              placement: a,
              middlewareData: c,
              rects: f,
              initialPlacement: p,
              platform: m,
              elements: g,
            } = o,
            {
              mainAxis: v = !0,
              crossAxis: w = !0,
              fallbackPlacements: S,
              fallbackStrategy: x = "bestFit",
              fallbackAxisSideDirection: P = "none",
              flipAlignment: C = !0,
              ...N
            } = xn(n, o);
          if ((s = c.arrow) != null && s.alignmentOffset) return {};
          const R = wn(a),
            M = on(p),
            A = wn(p) === p,
            O = await (m.isRTL == null ? void 0 : m.isRTL(g.floating)),
            W = S || (A || !C ? [Li(p)] : uw(p)),
            F = P !== "none";
          !S && F && W.push(...pw(p, C, P, O));
          const B = [p, ...W],
            Y = await Zo(o, N),
            K = [];
          let X = ((l = c.flip) == null ? void 0 : l.overflows) || [];
          if ((v && K.push(Y[R]), w)) {
            const U = aw(a, f, O);
            K.push(Y[U[0]], Y[U[1]]);
          }
          if (
            ((X = [...X, { placement: a, overflows: K }]),
            !K.every((U) => U <= 0))
          ) {
            var Z, V;
            const U = (((Z = c.flip) == null ? void 0 : Z.index) || 0) + 1,
              me = B[U];
            if (
              me &&
              (!(w === "alignment" ? M !== on(me) : !1) ||
                X.every((z) =>
                  on(z.placement) === M ? z.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: U, overflows: X },
                reset: { placement: me },
              };
            let ue =
              (V = X.filter((ae) => ae.overflows[0] <= 0).sort(
                (ae, z) => ae.overflows[1] - z.overflows[1],
              )[0]) == null
                ? void 0
                : V.placement;
            if (!ue)
              switch (x) {
                case "bestFit": {
                  var J;
                  const ae =
                    (J = X.filter((z) => {
                      if (F) {
                        const H = on(z.placement);
                        return H === M || H === "y";
                      }
                      return !0;
                    })
                      .map((z) => [
                        z.placement,
                        z.overflows
                          .filter((H) => H > 0)
                          .reduce((H, q) => H + q, 0),
                      ])
                      .sort((z, H) => z[1] - H[1])[0]) == null
                      ? void 0
                      : J[0];
                  ae && (ue = ae);
                  break;
                }
                case "initialPlacement":
                  ue = p;
                  break;
              }
            if (a !== ue) return { reset: { placement: ue } };
          }
          return {};
        },
      }
    );
  };
function ip(n, o) {
  return {
    top: n.top - o.height,
    right: n.right - o.width,
    bottom: n.bottom - o.height,
    left: n.left - o.width,
  };
}
function lp(n) {
  return ow.some((o) => n[o] >= 0);
}
const vw = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "hide",
        options: n,
        async fn(o) {
          const { rects: s } = o,
            { strategy: l = "referenceHidden", ...a } = xn(n, o);
          switch (l) {
            case "referenceHidden": {
              const c = await Zo(o, { ...a, elementContext: "reference" }),
                f = ip(c, s.reference);
              return {
                data: { referenceHiddenOffsets: f, referenceHidden: lp(f) },
              };
            }
            case "escaped": {
              const c = await Zo(o, { ...a, altBoundary: !0 }),
                f = ip(c, s.floating);
              return { data: { escapedOffsets: f, escaped: lp(f) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Gh = new Set(["left", "top"]);
async function xw(n, o) {
  const { placement: s, platform: l, elements: a } = n,
    c = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)),
    f = wn(s),
    p = to(s),
    m = on(s) === "y",
    g = Gh.has(f) ? -1 : 1,
    v = c && m ? -1 : 1,
    w = xn(o, n);
  let {
    mainAxis: S,
    crossAxis: x,
    alignmentAxis: P,
  } = typeof w == "number"
    ? { mainAxis: w, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: w.mainAxis || 0,
        crossAxis: w.crossAxis || 0,
        alignmentAxis: w.alignmentAxis,
      };
  return (
    p && typeof P == "number" && (x = p === "end" ? P * -1 : P),
    m ? { x: x * v, y: S * g } : { x: S * g, y: x * v }
  );
}
const ww = function (n) {
    return (
      n === void 0 && (n = 0),
      {
        name: "offset",
        options: n,
        async fn(o) {
          var s, l;
          const { x: a, y: c, placement: f, middlewareData: p } = o,
            m = await xw(o, n);
          return f === ((s = p.offset) == null ? void 0 : s.placement) &&
            (l = p.arrow) != null &&
            l.alignmentOffset
            ? {}
            : { x: a + m.x, y: c + m.y, data: { ...m, placement: f } };
        },
      }
    );
  },
  bw = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "shift",
        options: n,
        async fn(o) {
          const { x: s, y: l, placement: a } = o,
            {
              mainAxis: c = !0,
              crossAxis: f = !1,
              limiter: p = {
                fn: (N) => {
                  let { x: R, y: M } = N;
                  return { x: R, y: M };
                },
              },
              ...m
            } = xn(n, o),
            g = { x: s, y: l },
            v = await Zo(o, m),
            w = on(wn(a)),
            S = Vu(w);
          let x = g[S],
            P = g[w];
          if (c) {
            const N = S === "y" ? "top" : "left",
              R = S === "y" ? "bottom" : "right",
              M = x + v[N],
              A = x - v[R];
            x = bu(M, x, A);
          }
          if (f) {
            const N = w === "y" ? "top" : "left",
              R = w === "y" ? "bottom" : "right",
              M = P + v[N],
              A = P - v[R];
            P = bu(M, P, A);
          }
          const C = p.fn({ ...o, [S]: x, [w]: P });
          return {
            ...C,
            data: { x: C.x - s, y: C.y - l, enabled: { [S]: c, [w]: f } },
          };
        },
      }
    );
  },
  Sw = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        options: n,
        fn(o) {
          const { x: s, y: l, placement: a, rects: c, middlewareData: f } = o,
            { offset: p = 0, mainAxis: m = !0, crossAxis: g = !0 } = xn(n, o),
            v = { x: s, y: l },
            w = on(a),
            S = Vu(w);
          let x = v[S],
            P = v[w];
          const C = xn(p, o),
            N =
              typeof C == "number"
                ? { mainAxis: C, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...C };
          if (m) {
            const A = S === "y" ? "height" : "width",
              O = c.reference[S] - c.floating[A] + N.mainAxis,
              W = c.reference[S] + c.reference[A] - N.mainAxis;
            x < O ? (x = O) : x > W && (x = W);
          }
          if (g) {
            var R, M;
            const A = S === "y" ? "width" : "height",
              O = Gh.has(wn(a)),
              W =
                c.reference[w] -
                c.floating[A] +
                ((O && ((R = f.offset) == null ? void 0 : R[w])) || 0) +
                (O ? 0 : N.crossAxis),
              F =
                c.reference[w] +
                c.reference[A] +
                (O ? 0 : ((M = f.offset) == null ? void 0 : M[w]) || 0) -
                (O ? N.crossAxis : 0);
            P < W ? (P = W) : P > F && (P = F);
          }
          return { [S]: x, [w]: P };
        },
      }
    );
  },
  Cw = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "size",
        options: n,
        async fn(o) {
          var s, l;
          const { placement: a, rects: c, platform: f, elements: p } = o,
            { apply: m = () => {}, ...g } = xn(n, o),
            v = await Zo(o, g),
            w = wn(a),
            S = to(a),
            x = on(a) === "y",
            { width: P, height: C } = c.floating;
          let N, R;
          w === "top" || w === "bottom"
            ? ((N = w),
              (R =
                S ===
                ((await (f.isRTL == null ? void 0 : f.isRTL(p.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((R = w), (N = S === "end" ? "top" : "bottom"));
          const M = C - v.top - v.bottom,
            A = P - v.left - v.right,
            O = Xn(C - v[N], M),
            W = Xn(P - v[R], A),
            F = !o.middlewareData.shift;
          let B = O,
            Y = W;
          if (
            ((s = o.middlewareData.shift) != null && s.enabled.x && (Y = A),
            (l = o.middlewareData.shift) != null && l.enabled.y && (B = M),
            F && !S)
          ) {
            const X = wt(v.left, 0),
              Z = wt(v.right, 0),
              V = wt(v.top, 0),
              J = wt(v.bottom, 0);
            x
              ? (Y = P - 2 * (X !== 0 || Z !== 0 ? X + Z : wt(v.left, v.right)))
              : (B =
                  C - 2 * (V !== 0 || J !== 0 ? V + J : wt(v.top, v.bottom)));
          }
          await m({ ...o, availableWidth: Y, availableHeight: B });
          const K = await f.getDimensions(p.floating);
          return P !== K.width || C !== K.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Hi() {
  return typeof window < "u";
}
function no(n) {
  return Jh(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function bt(n) {
  var o;
  return (
    (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) ||
    window
  );
}
function an(n) {
  var o;
  return (o = (Jh(n) ? n.ownerDocument : n.document) || window.document) == null
    ? void 0
    : o.documentElement;
}
function Jh(n) {
  return Hi() ? n instanceof Node || n instanceof bt(n).Node : !1;
}
function Ht(n) {
  return Hi() ? n instanceof Element || n instanceof bt(n).Element : !1;
}
function ln(n) {
  return Hi() ? n instanceof HTMLElement || n instanceof bt(n).HTMLElement : !1;
}
function ap(n) {
  return !Hi() || typeof ShadowRoot > "u"
    ? !1
    : n instanceof ShadowRoot || n instanceof bt(n).ShadowRoot;
}
const Ew = new Set(["inline", "contents"]);
function is(n) {
  const { overflow: o, overflowX: s, overflowY: l, display: a } = Wt(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + l + s) && !Ew.has(a);
}
const Nw = new Set(["table", "td", "th"]);
function kw(n) {
  return Nw.has(no(n));
}
const Pw = [":popover-open", ":modal"];
function Wi(n) {
  return Pw.some((o) => {
    try {
      return n.matches(o);
    } catch {
      return !1;
    }
  });
}
const jw = ["transform", "translate", "scale", "rotate", "perspective"],
  Tw = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  Rw = ["paint", "layout", "strict", "content"];
function $u(n) {
  const o = Qu(),
    s = Ht(n) ? Wt(n) : n;
  return (
    jw.some((l) => (s[l] ? s[l] !== "none" : !1)) ||
    (s.containerType ? s.containerType !== "normal" : !1) ||
    (!o && (s.backdropFilter ? s.backdropFilter !== "none" : !1)) ||
    (!o && (s.filter ? s.filter !== "none" : !1)) ||
    Tw.some((l) => (s.willChange || "").includes(l)) ||
    Rw.some((l) => (s.contain || "").includes(l))
  );
}
function Mw(n) {
  let o = Zn(n);
  for (; ln(o) && !Xr(o); ) {
    if ($u(o)) return o;
    if (Wi(o)) return null;
    o = Zn(o);
  }
  return null;
}
function Qu() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const Aw = new Set(["html", "body", "#document"]);
function Xr(n) {
  return Aw.has(no(n));
}
function Wt(n) {
  return bt(n).getComputedStyle(n);
}
function $i(n) {
  return Ht(n)
    ? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop }
    : { scrollLeft: n.scrollX, scrollTop: n.scrollY };
}
function Zn(n) {
  if (no(n) === "html") return n;
  const o = n.assignedSlot || n.parentNode || (ap(n) && n.host) || an(n);
  return ap(o) ? o.host : o;
}
function Xh(n) {
  const o = Zn(n);
  return Xr(o)
    ? n.ownerDocument
      ? n.ownerDocument.body
      : n.body
    : ln(o) && is(o)
      ? o
      : Xh(o);
}
function es(n, o, s) {
  var l;
  (o === void 0 && (o = []), s === void 0 && (s = !0));
  const a = Xh(n),
    c = a === ((l = n.ownerDocument) == null ? void 0 : l.body),
    f = bt(a);
  if (c) {
    const p = Cu(f);
    return o.concat(
      f,
      f.visualViewport || [],
      is(a) ? a : [],
      p && s ? es(p) : [],
    );
  }
  return o.concat(a, es(a, [], s));
}
function Cu(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function Zh(n) {
  const o = Wt(n);
  let s = parseFloat(o.width) || 0,
    l = parseFloat(o.height) || 0;
  const a = ln(n),
    c = a ? n.offsetWidth : s,
    f = a ? n.offsetHeight : l,
    p = _i(s) !== c || _i(l) !== f;
  return (p && ((s = c), (l = f)), { width: s, height: l, $: p });
}
function qu(n) {
  return Ht(n) ? n : n.contextElement;
}
function Jr(n) {
  const o = qu(n);
  if (!ln(o)) return sn(1);
  const s = o.getBoundingClientRect(),
    { width: l, height: a, $: c } = Zh(o);
  let f = (c ? _i(s.width) : s.width) / l,
    p = (c ? _i(s.height) : s.height) / a;
  return (
    (!f || !Number.isFinite(f)) && (f = 1),
    (!p || !Number.isFinite(p)) && (p = 1),
    { x: f, y: p }
  );
}
const _w = sn(0);
function em(n) {
  const o = bt(n);
  return !Qu() || !o.visualViewport
    ? _w
    : { x: o.visualViewport.offsetLeft, y: o.visualViewport.offsetTop };
}
function Lw(n, o, s) {
  return (o === void 0 && (o = !1), !s || (o && s !== bt(n)) ? !1 : o);
}
function mr(n, o, s, l) {
  (o === void 0 && (o = !1), s === void 0 && (s = !1));
  const a = n.getBoundingClientRect(),
    c = qu(n);
  let f = sn(1);
  o && (l ? Ht(l) && (f = Jr(l)) : (f = Jr(n)));
  const p = Lw(c, s, l) ? em(c) : sn(0);
  let m = (a.left + p.x) / f.x,
    g = (a.top + p.y) / f.y,
    v = a.width / f.x,
    w = a.height / f.y;
  if (c) {
    const S = bt(c),
      x = l && Ht(l) ? bt(l) : l;
    let P = S,
      C = Cu(P);
    for (; C && l && x !== P; ) {
      const N = Jr(C),
        R = C.getBoundingClientRect(),
        M = Wt(C),
        A = R.left + (C.clientLeft + parseFloat(M.paddingLeft)) * N.x,
        O = R.top + (C.clientTop + parseFloat(M.paddingTop)) * N.y;
      ((m *= N.x),
        (g *= N.y),
        (v *= N.x),
        (w *= N.y),
        (m += A),
        (g += O),
        (P = bt(C)),
        (C = Cu(P)));
    }
  }
  return Oi({ width: v, height: w, x: m, y: g });
}
function Qi(n, o) {
  const s = $i(n).scrollLeft;
  return o ? o.left + s : mr(an(n)).left + s;
}
function tm(n, o) {
  const s = n.getBoundingClientRect(),
    l = s.left + o.scrollLeft - Qi(n, s),
    a = s.top + o.scrollTop;
  return { x: l, y: a };
}
function Ow(n) {
  let { elements: o, rect: s, offsetParent: l, strategy: a } = n;
  const c = a === "fixed",
    f = an(l),
    p = o ? Wi(o.floating) : !1;
  if (l === f || (p && c)) return s;
  let m = { scrollLeft: 0, scrollTop: 0 },
    g = sn(1);
  const v = sn(0),
    w = ln(l);
  if (
    (w || (!w && !c)) &&
    ((no(l) !== "body" || is(f)) && (m = $i(l)), ln(l))
  ) {
    const x = mr(l);
    ((g = Jr(l)), (v.x = x.x + l.clientLeft), (v.y = x.y + l.clientTop));
  }
  const S = f && !w && !c ? tm(f, m) : sn(0);
  return {
    width: s.width * g.x,
    height: s.height * g.y,
    x: s.x * g.x - m.scrollLeft * g.x + v.x + S.x,
    y: s.y * g.y - m.scrollTop * g.y + v.y + S.y,
  };
}
function Iw(n) {
  return Array.from(n.getClientRects());
}
function Dw(n) {
  const o = an(n),
    s = $i(n),
    l = n.ownerDocument.body,
    a = wt(o.scrollWidth, o.clientWidth, l.scrollWidth, l.clientWidth),
    c = wt(o.scrollHeight, o.clientHeight, l.scrollHeight, l.clientHeight);
  let f = -s.scrollLeft + Qi(n);
  const p = -s.scrollTop;
  return (
    Wt(l).direction === "rtl" && (f += wt(o.clientWidth, l.clientWidth) - a),
    { width: a, height: c, x: f, y: p }
  );
}
const up = 25;
function Fw(n, o) {
  const s = bt(n),
    l = an(n),
    a = s.visualViewport;
  let c = l.clientWidth,
    f = l.clientHeight,
    p = 0,
    m = 0;
  if (a) {
    ((c = a.width), (f = a.height));
    const v = Qu();
    (!v || (v && o === "fixed")) && ((p = a.offsetLeft), (m = a.offsetTop));
  }
  const g = Qi(l);
  if (g <= 0) {
    const v = l.ownerDocument,
      w = v.body,
      S = getComputedStyle(w),
      x =
        (v.compatMode === "CSS1Compat" &&
          parseFloat(S.marginLeft) + parseFloat(S.marginRight)) ||
        0,
      P = Math.abs(l.clientWidth - w.clientWidth - x);
    P <= up && (c -= P);
  } else g <= up && (c += g);
  return { width: c, height: f, x: p, y: m };
}
const zw = new Set(["absolute", "fixed"]);
function Bw(n, o) {
  const s = mr(n, !0, o === "fixed"),
    l = s.top + n.clientTop,
    a = s.left + n.clientLeft,
    c = ln(n) ? Jr(n) : sn(1),
    f = n.clientWidth * c.x,
    p = n.clientHeight * c.y,
    m = a * c.x,
    g = l * c.y;
  return { width: f, height: p, x: m, y: g };
}
function cp(n, o, s) {
  let l;
  if (o === "viewport") l = Fw(n, s);
  else if (o === "document") l = Dw(an(n));
  else if (Ht(o)) l = Bw(o, s);
  else {
    const a = em(n);
    l = { x: o.x - a.x, y: o.y - a.y, width: o.width, height: o.height };
  }
  return Oi(l);
}
function nm(n, o) {
  const s = Zn(n);
  return s === o || !Ht(s) || Xr(s)
    ? !1
    : Wt(s).position === "fixed" || nm(s, o);
}
function Uw(n, o) {
  const s = o.get(n);
  if (s) return s;
  let l = es(n, [], !1).filter((p) => Ht(p) && no(p) !== "body"),
    a = null;
  const c = Wt(n).position === "fixed";
  let f = c ? Zn(n) : n;
  for (; Ht(f) && !Xr(f); ) {
    const p = Wt(f),
      m = $u(f);
    (!m && p.position === "fixed" && (a = null),
      (
        c
          ? !m && !a
          : (!m && p.position === "static" && !!a && zw.has(a.position)) ||
            (is(f) && !m && nm(n, f))
      )
        ? (l = l.filter((v) => v !== f))
        : (a = p),
      (f = Zn(f)));
  }
  return (o.set(n, l), l);
}
function Vw(n) {
  let { element: o, boundary: s, rootBoundary: l, strategy: a } = n;
  const f = [
      ...(s === "clippingAncestors"
        ? Wi(o)
          ? []
          : Uw(o, this._c)
        : [].concat(s)),
      l,
    ],
    p = f[0],
    m = f.reduce(
      (g, v) => {
        const w = cp(o, v, a);
        return (
          (g.top = wt(w.top, g.top)),
          (g.right = Xn(w.right, g.right)),
          (g.bottom = Xn(w.bottom, g.bottom)),
          (g.left = wt(w.left, g.left)),
          g
        );
      },
      cp(o, p, a),
    );
  return {
    width: m.right - m.left,
    height: m.bottom - m.top,
    x: m.left,
    y: m.top,
  };
}
function Hw(n) {
  const { width: o, height: s } = Zh(n);
  return { width: o, height: s };
}
function Ww(n, o, s) {
  const l = ln(o),
    a = an(o),
    c = s === "fixed",
    f = mr(n, !0, c, o);
  let p = { scrollLeft: 0, scrollTop: 0 };
  const m = sn(0);
  function g() {
    m.x = Qi(a);
  }
  if (l || (!l && !c))
    if (((no(o) !== "body" || is(a)) && (p = $i(o)), l)) {
      const x = mr(o, !0, c, o);
      ((m.x = x.x + o.clientLeft), (m.y = x.y + o.clientTop));
    } else a && g();
  c && !l && a && g();
  const v = a && !l && !c ? tm(a, p) : sn(0),
    w = f.left + p.scrollLeft - m.x - v.x,
    S = f.top + p.scrollTop - m.y - v.y;
  return { x: w, y: S, width: f.width, height: f.height };
}
function Va(n) {
  return Wt(n).position === "static";
}
function dp(n, o) {
  if (!ln(n) || Wt(n).position === "fixed") return null;
  if (o) return o(n);
  let s = n.offsetParent;
  return (an(n) === s && (s = s.ownerDocument.body), s);
}
function rm(n, o) {
  const s = bt(n);
  if (Wi(n)) return s;
  if (!ln(n)) {
    let a = Zn(n);
    for (; a && !Xr(a); ) {
      if (Ht(a) && !Va(a)) return a;
      a = Zn(a);
    }
    return s;
  }
  let l = dp(n, o);
  for (; l && kw(l) && Va(l); ) l = dp(l, o);
  return l && Xr(l) && Va(l) && !$u(l) ? s : l || Mw(n) || s;
}
const $w = async function (n) {
  const o = this.getOffsetParent || rm,
    s = this.getDimensions,
    l = await s(n.floating);
  return {
    reference: Ww(n.reference, await o(n.floating), n.strategy),
    floating: { x: 0, y: 0, width: l.width, height: l.height },
  };
};
function Qw(n) {
  return Wt(n).direction === "rtl";
}
const qw = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ow,
  getDocumentElement: an,
  getClippingRect: Vw,
  getOffsetParent: rm,
  getElementRects: $w,
  getClientRects: Iw,
  getDimensions: Hw,
  getScale: Jr,
  isElement: Ht,
  isRTL: Qw,
};
function om(n, o) {
  return (
    n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height
  );
}
function Kw(n, o) {
  let s = null,
    l;
  const a = an(n);
  function c() {
    var p;
    (clearTimeout(l), (p = s) == null || p.disconnect(), (s = null));
  }
  function f(p, m) {
    (p === void 0 && (p = !1), m === void 0 && (m = 1), c());
    const g = n.getBoundingClientRect(),
      { left: v, top: w, width: S, height: x } = g;
    if ((p || o(), !S || !x)) return;
    const P = Ni(w),
      C = Ni(a.clientWidth - (v + S)),
      N = Ni(a.clientHeight - (w + x)),
      R = Ni(v),
      A = {
        rootMargin: -P + "px " + -C + "px " + -N + "px " + -R + "px",
        threshold: wt(0, Xn(1, m)) || 1,
      };
    let O = !0;
    function W(F) {
      const B = F[0].intersectionRatio;
      if (B !== m) {
        if (!O) return f();
        B
          ? f(!1, B)
          : (l = setTimeout(() => {
              f(!1, 1e-7);
            }, 1e3));
      }
      (B === 1 && !om(g, n.getBoundingClientRect()) && f(), (O = !1));
    }
    try {
      s = new IntersectionObserver(W, { ...A, root: a.ownerDocument });
    } catch {
      s = new IntersectionObserver(W, A);
    }
    s.observe(n);
  }
  return (f(!0), c);
}
function Yw(n, o, s, l) {
  l === void 0 && (l = {});
  const {
      ancestorScroll: a = !0,
      ancestorResize: c = !0,
      elementResize: f = typeof ResizeObserver == "function",
      layoutShift: p = typeof IntersectionObserver == "function",
      animationFrame: m = !1,
    } = l,
    g = qu(n),
    v = a || c ? [...(g ? es(g) : []), ...es(o)] : [];
  v.forEach((R) => {
    (a && R.addEventListener("scroll", s, { passive: !0 }),
      c && R.addEventListener("resize", s));
  });
  const w = g && p ? Kw(g, s) : null;
  let S = -1,
    x = null;
  f &&
    ((x = new ResizeObserver((R) => {
      let [M] = R;
      (M &&
        M.target === g &&
        x &&
        (x.unobserve(o),
        cancelAnimationFrame(S),
        (S = requestAnimationFrame(() => {
          var A;
          (A = x) == null || A.observe(o);
        }))),
        s());
    })),
    g && !m && x.observe(g),
    x.observe(o));
  let P,
    C = m ? mr(n) : null;
  m && N();
  function N() {
    const R = mr(n);
    (C && !om(C, R) && s(), (C = R), (P = requestAnimationFrame(N)));
  }
  return (
    s(),
    () => {
      var R;
      (v.forEach((M) => {
        (a && M.removeEventListener("scroll", s),
          c && M.removeEventListener("resize", s));
      }),
        w?.(),
        (R = x) == null || R.disconnect(),
        (x = null),
        m && cancelAnimationFrame(P));
    }
  );
}
const Gw = ww,
  Jw = bw,
  Xw = yw,
  Zw = Cw,
  e1 = vw,
  fp = gw,
  t1 = Sw,
  n1 = (n, o, s) => {
    const l = new Map(),
      a = { platform: qw, ...s },
      c = { ...a.platform, _c: l };
    return mw(n, o, { ...a, platform: c });
  };
var r1 = typeof document < "u",
  o1 = function () {},
  Mi = r1 ? b.useLayoutEffect : o1;
function Ii(n, o) {
  if (n === o) return !0;
  if (typeof n != typeof o) return !1;
  if (typeof n == "function" && n.toString() === o.toString()) return !0;
  let s, l, a;
  if (n && o && typeof n == "object") {
    if (Array.isArray(n)) {
      if (((s = n.length), s !== o.length)) return !1;
      for (l = s; l-- !== 0; ) if (!Ii(n[l], o[l])) return !1;
      return !0;
    }
    if (((a = Object.keys(n)), (s = a.length), s !== Object.keys(o).length))
      return !1;
    for (l = s; l-- !== 0; ) if (!{}.hasOwnProperty.call(o, a[l])) return !1;
    for (l = s; l-- !== 0; ) {
      const c = a[l];
      if (!(c === "_owner" && n.$$typeof) && !Ii(n[c], o[c])) return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function sm(n) {
  return typeof window > "u"
    ? 1
    : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function pp(n, o) {
  const s = sm(n);
  return Math.round(o * s) / s;
}
function Ha(n) {
  const o = b.useRef(n);
  return (
    Mi(() => {
      o.current = n;
    }),
    o
  );
}
function s1(n) {
  n === void 0 && (n = {});
  const {
      placement: o = "bottom",
      strategy: s = "absolute",
      middleware: l = [],
      platform: a,
      elements: { reference: c, floating: f } = {},
      transform: p = !0,
      whileElementsMounted: m,
      open: g,
    } = n,
    [v, w] = b.useState({
      x: 0,
      y: 0,
      strategy: s,
      placement: o,
      middlewareData: {},
      isPositioned: !1,
    }),
    [S, x] = b.useState(l);
  Ii(S, l) || x(l);
  const [P, C] = b.useState(null),
    [N, R] = b.useState(null),
    M = b.useCallback((z) => {
      z !== F.current && ((F.current = z), C(z));
    }, []),
    A = b.useCallback((z) => {
      z !== B.current && ((B.current = z), R(z));
    }, []),
    O = c || P,
    W = f || N,
    F = b.useRef(null),
    B = b.useRef(null),
    Y = b.useRef(v),
    K = m != null,
    X = Ha(m),
    Z = Ha(a),
    V = Ha(g),
    J = b.useCallback(() => {
      if (!F.current || !B.current) return;
      const z = { placement: o, strategy: s, middleware: S };
      (Z.current && (z.platform = Z.current),
        n1(F.current, B.current, z).then((H) => {
          const q = { ...H, isPositioned: V.current !== !1 };
          U.current &&
            !Ii(Y.current, q) &&
            ((Y.current = q),
            zi.flushSync(() => {
              w(q);
            }));
        }));
    }, [S, o, s, Z, V]);
  Mi(() => {
    g === !1 &&
      Y.current.isPositioned &&
      ((Y.current.isPositioned = !1), w((z) => ({ ...z, isPositioned: !1 })));
  }, [g]);
  const U = b.useRef(!1);
  (Mi(
    () => (
      (U.current = !0),
      () => {
        U.current = !1;
      }
    ),
    [],
  ),
    Mi(() => {
      if ((O && (F.current = O), W && (B.current = W), O && W)) {
        if (X.current) return X.current(O, W, J);
        J();
      }
    }, [O, W, J, X, K]));
  const me = b.useMemo(
      () => ({ reference: F, floating: B, setReference: M, setFloating: A }),
      [M, A],
    ),
    ue = b.useMemo(() => ({ reference: O, floating: W }), [O, W]),
    ae = b.useMemo(() => {
      const z = { position: s, left: 0, top: 0 };
      if (!ue.floating) return z;
      const H = pp(ue.floating, v.x),
        q = pp(ue.floating, v.y);
      return p
        ? {
            ...z,
            transform: "translate(" + H + "px, " + q + "px)",
            ...(sm(ue.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: s, left: H, top: q };
    }, [s, p, ue.floating, v.x, v.y]);
  return b.useMemo(
    () => ({ ...v, update: J, refs: me, elements: ue, floatingStyles: ae }),
    [v, J, me, ue, ae],
  );
}
const i1 = (n) => {
    function o(s) {
      return {}.hasOwnProperty.call(s, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(s) {
        const { element: l, padding: a } = typeof n == "function" ? n(s) : n;
        return l && o(l)
          ? l.current != null
            ? fp({ element: l.current, padding: a }).fn(s)
            : {}
          : l
            ? fp({ element: l, padding: a }).fn(s)
            : {};
      },
    };
  },
  l1 = (n, o) => ({ ...Gw(n), options: [n, o] }),
  a1 = (n, o) => ({ ...Jw(n), options: [n, o] }),
  u1 = (n, o) => ({ ...t1(n), options: [n, o] }),
  c1 = (n, o) => ({ ...Xw(n), options: [n, o] }),
  d1 = (n, o) => ({ ...Zw(n), options: [n, o] }),
  f1 = (n, o) => ({ ...e1(n), options: [n, o] }),
  p1 = (n, o) => ({ ...i1(n), options: [n, o] });
var h1 = "Arrow",
  im = b.forwardRef((n, o) => {
    const { children: s, width: l = 10, height: a = 5, ...c } = n;
    return h.jsx(mt.svg, {
      ...c,
      ref: o,
      width: l,
      height: a,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? s : h.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
im.displayName = h1;
var m1 = im;
function g1(n) {
  const [o, s] = b.useState(void 0);
  return (
    Jn(() => {
      if (n) {
        s({ width: n.offsetWidth, height: n.offsetHeight });
        const l = new ResizeObserver((a) => {
          if (!Array.isArray(a) || !a.length) return;
          const c = a[0];
          let f, p;
          if ("borderBoxSize" in c) {
            const m = c.borderBoxSize,
              g = Array.isArray(m) ? m[0] : m;
            ((f = g.inlineSize), (p = g.blockSize));
          } else ((f = n.offsetWidth), (p = n.offsetHeight));
          s({ width: f, height: p });
        });
        return (l.observe(n, { box: "border-box" }), () => l.unobserve(n));
      } else s(void 0);
    }, [n]),
    o
  );
}
var lm = "Popper",
  [am, um] = Bi(lm),
  [oS, cm] = am(lm),
  dm = "PopperAnchor",
  fm = b.forwardRef((n, o) => {
    const { __scopePopper: s, virtualRef: l, ...a } = n,
      c = cm(dm, s),
      f = b.useRef(null),
      p = Vt(o, f),
      m = b.useRef(null);
    return (
      b.useEffect(() => {
        const g = m.current;
        ((m.current = l?.current || f.current),
          g !== m.current && c.onAnchorChange(m.current));
      }),
      l ? null : h.jsx(mt.div, { ...a, ref: p })
    );
  });
fm.displayName = dm;
var Ku = "PopperContent",
  [y1, v1] = am(Ku),
  pm = b.forwardRef((n, o) => {
    const {
        __scopePopper: s,
        side: l = "bottom",
        sideOffset: a = 0,
        align: c = "center",
        alignOffset: f = 0,
        arrowPadding: p = 0,
        avoidCollisions: m = !0,
        collisionBoundary: g = [],
        collisionPadding: v = 0,
        sticky: w = "partial",
        hideWhenDetached: S = !1,
        updatePositionStrategy: x = "optimized",
        onPlaced: P,
        ...C
      } = n,
      N = cm(Ku, s),
      [R, M] = b.useState(null),
      A = Vt(o, (ie) => M(ie)),
      [O, W] = b.useState(null),
      F = g1(O),
      B = F?.width ?? 0,
      Y = F?.height ?? 0,
      K = l + (c !== "center" ? "-" + c : ""),
      X =
        typeof v == "number"
          ? v
          : { top: 0, right: 0, bottom: 0, left: 0, ...v },
      Z = Array.isArray(g) ? g : [g],
      V = Z.length > 0,
      J = { padding: X, boundary: Z.filter(w1), altBoundary: V },
      {
        refs: U,
        floatingStyles: me,
        placement: ue,
        isPositioned: ae,
        middlewareData: z,
      } = s1({
        strategy: "fixed",
        placement: K,
        whileElementsMounted: (...ie) =>
          Yw(...ie, { animationFrame: x === "always" }),
        elements: { reference: N.anchor },
        middleware: [
          l1({ mainAxis: a + Y, alignmentAxis: f }),
          m &&
            a1({
              mainAxis: !0,
              crossAxis: !1,
              limiter: w === "partial" ? u1() : void 0,
              ...J,
            }),
          m && c1({ ...J }),
          d1({
            ...J,
            apply: ({
              elements: ie,
              rects: ye,
              availableWidth: be,
              availableHeight: Ae,
            }) => {
              const { width: St, height: Sn } = ye.reference,
                Ct = ie.floating.style;
              (Ct.setProperty("--radix-popper-available-width", `${be}px`),
                Ct.setProperty("--radix-popper-available-height", `${Ae}px`),
                Ct.setProperty("--radix-popper-anchor-width", `${St}px`),
                Ct.setProperty("--radix-popper-anchor-height", `${Sn}px`));
            },
          }),
          O && p1({ element: O, padding: p }),
          b1({ arrowWidth: B, arrowHeight: Y }),
          S && f1({ strategy: "referenceHidden", ...J }),
        ],
      }),
      [H, q] = gm(ue),
      j = Gn(P);
    Jn(() => {
      ae && j?.();
    }, [ae, j]);
    const D = z.arrow?.x,
      ne = z.arrow?.y,
      oe = z.arrow?.centerOffset !== 0,
      [fe, xe] = b.useState();
    return (
      Jn(() => {
        R && xe(window.getComputedStyle(R).zIndex);
      }, [R]),
      h.jsx("div", {
        ref: U.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...me,
          transform: ae ? me.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: fe,
          "--radix-popper-transform-origin": [
            z.transformOrigin?.x,
            z.transformOrigin?.y,
          ].join(" "),
          ...(z.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: n.dir,
        children: h.jsx(y1, {
          scope: s,
          placedSide: H,
          onArrowChange: W,
          arrowX: D,
          arrowY: ne,
          shouldHideArrow: oe,
          children: h.jsx(mt.div, {
            "data-side": H,
            "data-align": q,
            ...C,
            ref: A,
            style: { ...C.style, animation: ae ? void 0 : "none" },
          }),
        }),
      })
    );
  });
pm.displayName = Ku;
var hm = "PopperArrow",
  x1 = { top: "bottom", right: "left", bottom: "top", left: "right" },
  mm = b.forwardRef(function (o, s) {
    const { __scopePopper: l, ...a } = o,
      c = v1(hm, l),
      f = x1[c.placedSide];
    return h.jsx("span", {
      ref: c.onArrowChange,
      style: {
        position: "absolute",
        left: c.arrowX,
        top: c.arrowY,
        [f]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[c.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[c.placedSide],
        visibility: c.shouldHideArrow ? "hidden" : void 0,
      },
      children: h.jsx(m1, {
        ...a,
        ref: s,
        style: { ...a.style, display: "block" },
      }),
    });
  });
mm.displayName = hm;
function w1(n) {
  return n !== null;
}
var b1 = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(o) {
    const { placement: s, rects: l, middlewareData: a } = o,
      f = a.arrow?.centerOffset !== 0,
      p = f ? 0 : n.arrowWidth,
      m = f ? 0 : n.arrowHeight,
      [g, v] = gm(s),
      w = { start: "0%", center: "50%", end: "100%" }[v],
      S = (a.arrow?.x ?? 0) + p / 2,
      x = (a.arrow?.y ?? 0) + m / 2;
    let P = "",
      C = "";
    return (
      g === "bottom"
        ? ((P = f ? w : `${S}px`), (C = `${-m}px`))
        : g === "top"
          ? ((P = f ? w : `${S}px`), (C = `${l.floating.height + m}px`))
          : g === "right"
            ? ((P = `${-m}px`), (C = f ? w : `${x}px`))
            : g === "left" &&
              ((P = `${l.floating.width + m}px`), (C = f ? w : `${x}px`)),
      { data: { x: P, y: C } }
    );
  },
});
function gm(n) {
  const [o, s = "center"] = n.split("-");
  return [o, s];
}
var S1 = fm,
  C1 = pm,
  E1 = mm,
  N1 = Symbol("radix.slottable");
function k1(n) {
  const o = ({ children: s }) => h.jsx(h.Fragment, { children: s });
  return ((o.displayName = `${n}.Slottable`), (o.__radixId = N1), o);
}
var [qi] = Bi("Tooltip", [um]),
  Yu = um(),
  ym = "TooltipProvider",
  P1 = 700,
  hp = "tooltip.open",
  [j1, vm] = qi(ym),
  xm = (n) => {
    const {
        __scopeTooltip: o,
        delayDuration: s = P1,
        skipDelayDuration: l = 300,
        disableHoverableContent: a = !1,
        children: c,
      } = n,
      f = b.useRef(!0),
      p = b.useRef(!1),
      m = b.useRef(0);
    return (
      b.useEffect(() => {
        const g = m.current;
        return () => window.clearTimeout(g);
      }, []),
      h.jsx(j1, {
        scope: o,
        isOpenDelayedRef: f,
        delayDuration: s,
        onOpen: b.useCallback(() => {
          (window.clearTimeout(m.current), (f.current = !1));
        }, []),
        onClose: b.useCallback(() => {
          (window.clearTimeout(m.current),
            (m.current = window.setTimeout(() => (f.current = !0), l)));
        }, [l]),
        isPointerInTransitRef: p,
        onPointerInTransitChange: b.useCallback((g) => {
          p.current = g;
        }, []),
        disableHoverableContent: a,
        children: c,
      })
    );
  };
xm.displayName = ym;
var wm = "Tooltip",
  [sS, Ki] = qi(wm),
  Eu = "TooltipTrigger",
  T1 = b.forwardRef((n, o) => {
    const { __scopeTooltip: s, ...l } = n,
      a = Ki(Eu, s),
      c = vm(Eu, s),
      f = Yu(s),
      p = b.useRef(null),
      m = Vt(o, p, a.onTriggerChange),
      g = b.useRef(!1),
      v = b.useRef(!1),
      w = b.useCallback(() => (g.current = !1), []);
    return (
      b.useEffect(
        () => () => document.removeEventListener("pointerup", w),
        [w],
      ),
      h.jsx(S1, {
        asChild: !0,
        ...f,
        children: h.jsx(mt.button, {
          "aria-describedby": a.open ? a.contentId : void 0,
          "data-state": a.stateAttribute,
          ...l,
          ref: m,
          onPointerMove: We(n.onPointerMove, (S) => {
            S.pointerType !== "touch" &&
              !v.current &&
              !c.isPointerInTransitRef.current &&
              (a.onTriggerEnter(), (v.current = !0));
          }),
          onPointerLeave: We(n.onPointerLeave, () => {
            (a.onTriggerLeave(), (v.current = !1));
          }),
          onPointerDown: We(n.onPointerDown, () => {
            (a.open && a.onClose(),
              (g.current = !0),
              document.addEventListener("pointerup", w, { once: !0 }));
          }),
          onFocus: We(n.onFocus, () => {
            g.current || a.onOpen();
          }),
          onBlur: We(n.onBlur, a.onClose),
          onClick: We(n.onClick, a.onClose),
        }),
      })
    );
  });
T1.displayName = Eu;
var R1 = "TooltipPortal",
  [iS, M1] = qi(R1, { forceMount: void 0 }),
  Zr = "TooltipContent",
  bm = b.forwardRef((n, o) => {
    const s = M1(Zr, n.__scopeTooltip),
      { forceMount: l = s.forceMount, side: a = "top", ...c } = n,
      f = Ki(Zr, n.__scopeTooltip);
    return h.jsx(Du, {
      present: l || f.open,
      children: f.disableHoverableContent
        ? h.jsx(Sm, { side: a, ...c, ref: o })
        : h.jsx(A1, { side: a, ...c, ref: o }),
    });
  }),
  A1 = b.forwardRef((n, o) => {
    const s = Ki(Zr, n.__scopeTooltip),
      l = vm(Zr, n.__scopeTooltip),
      a = b.useRef(null),
      c = Vt(o, a),
      [f, p] = b.useState(null),
      { trigger: m, onClose: g } = s,
      v = a.current,
      { onPointerInTransitChange: w } = l,
      S = b.useCallback(() => {
        (p(null), w(!1));
      }, [w]),
      x = b.useCallback(
        (P, C) => {
          const N = P.currentTarget,
            R = { x: P.clientX, y: P.clientY },
            M = D1(R, N.getBoundingClientRect()),
            A = F1(R, M),
            O = z1(C.getBoundingClientRect()),
            W = U1([...A, ...O]);
          (p(W), w(!0));
        },
        [w],
      );
    return (
      b.useEffect(() => () => S(), [S]),
      b.useEffect(() => {
        if (m && v) {
          const P = (N) => x(N, v),
            C = (N) => x(N, m);
          return (
            m.addEventListener("pointerleave", P),
            v.addEventListener("pointerleave", C),
            () => {
              (m.removeEventListener("pointerleave", P),
                v.removeEventListener("pointerleave", C));
            }
          );
        }
      }, [m, v, x, S]),
      b.useEffect(() => {
        if (f) {
          const P = (C) => {
            const N = C.target,
              R = { x: C.clientX, y: C.clientY },
              M = m?.contains(N) || v?.contains(N),
              A = !B1(R, f);
            M ? S() : A && (S(), g());
          };
          return (
            document.addEventListener("pointermove", P),
            () => document.removeEventListener("pointermove", P)
          );
        }
      }, [m, v, f, g, S]),
      h.jsx(Sm, { ...n, ref: c })
    );
  }),
  [_1, L1] = qi(wm, { isInside: !1 }),
  O1 = k1("TooltipContent"),
  Sm = b.forwardRef((n, o) => {
    const {
        __scopeTooltip: s,
        children: l,
        "aria-label": a,
        onEscapeKeyDown: c,
        onPointerDownOutside: f,
        ...p
      } = n,
      m = Ki(Zr, s),
      g = Yu(s),
      { onClose: v } = m;
    return (
      b.useEffect(
        () => (
          document.addEventListener(hp, v),
          () => document.removeEventListener(hp, v)
        ),
        [v],
      ),
      b.useEffect(() => {
        if (m.trigger) {
          const w = (S) => {
            S.target?.contains(m.trigger) && v();
          };
          return (
            window.addEventListener("scroll", w, { capture: !0 }),
            () => window.removeEventListener("scroll", w, { capture: !0 })
          );
        }
      }, [m.trigger, v]),
      h.jsx(Iu, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: c,
        onPointerDownOutside: f,
        onFocusOutside: (w) => w.preventDefault(),
        onDismiss: v,
        children: h.jsxs(C1, {
          "data-state": m.stateAttribute,
          ...g,
          ...p,
          ref: o,
          style: {
            ...p.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            h.jsx(O1, { children: l }),
            h.jsx(_1, {
              scope: s,
              isInside: !0,
              children: h.jsx(Lv, {
                id: m.contentId,
                role: "tooltip",
                children: a || l,
              }),
            }),
          ],
        }),
      })
    );
  });
bm.displayName = Zr;
var Cm = "TooltipArrow",
  I1 = b.forwardRef((n, o) => {
    const { __scopeTooltip: s, ...l } = n,
      a = Yu(s);
    return L1(Cm, s).isInside ? null : h.jsx(E1, { ...a, ...l, ref: o });
  });
I1.displayName = Cm;
function D1(n, o) {
  const s = Math.abs(o.top - n.y),
    l = Math.abs(o.bottom - n.y),
    a = Math.abs(o.right - n.x),
    c = Math.abs(o.left - n.x);
  switch (Math.min(s, l, a, c)) {
    case c:
      return "left";
    case a:
      return "right";
    case s:
      return "top";
    case l:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function F1(n, o, s = 5) {
  const l = [];
  switch (o) {
    case "top":
      l.push({ x: n.x - s, y: n.y + s }, { x: n.x + s, y: n.y + s });
      break;
    case "bottom":
      l.push({ x: n.x - s, y: n.y - s }, { x: n.x + s, y: n.y - s });
      break;
    case "left":
      l.push({ x: n.x + s, y: n.y - s }, { x: n.x + s, y: n.y + s });
      break;
    case "right":
      l.push({ x: n.x - s, y: n.y - s }, { x: n.x - s, y: n.y + s });
      break;
  }
  return l;
}
function z1(n) {
  const { top: o, right: s, bottom: l, left: a } = n;
  return [
    { x: a, y: o },
    { x: s, y: o },
    { x: s, y: l },
    { x: a, y: l },
  ];
}
function B1(n, o) {
  const { x: s, y: l } = n;
  let a = !1;
  for (let c = 0, f = o.length - 1; c < o.length; f = c++) {
    const p = o[c],
      m = o[f],
      g = p.x,
      v = p.y,
      w = m.x,
      S = m.y;
    v > l != S > l && s < ((w - g) * (l - v)) / (S - v) + g && (a = !a);
  }
  return a;
}
function U1(n) {
  const o = n.slice();
  return (
    o.sort((s, l) =>
      s.x < l.x ? -1 : s.x > l.x ? 1 : s.y < l.y ? -1 : s.y > l.y ? 1 : 0,
    ),
    V1(o)
  );
}
function V1(n) {
  if (n.length <= 1) return n.slice();
  const o = [];
  for (let l = 0; l < n.length; l++) {
    const a = n[l];
    for (; o.length >= 2; ) {
      const c = o[o.length - 1],
        f = o[o.length - 2];
      if ((c.x - f.x) * (a.y - f.y) >= (c.y - f.y) * (a.x - f.x)) o.pop();
      else break;
    }
    o.push(a);
  }
  o.pop();
  const s = [];
  for (let l = n.length - 1; l >= 0; l--) {
    const a = n[l];
    for (; s.length >= 2; ) {
      const c = s[s.length - 1],
        f = s[s.length - 2];
      if ((c.x - f.x) * (a.y - f.y) >= (c.y - f.y) * (a.x - f.x)) s.pop();
      else break;
    }
    s.push(a);
  }
  return (
    s.pop(),
    o.length === 1 && s.length === 1 && o[0].x === s[0].x && o[0].y === s[0].y
      ? o
      : o.concat(s)
  );
}
var H1 = xm,
  Em = bm;
const W1 = H1,
  $1 = b.forwardRef(({ className: n, sideOffset: o = 4, ...s }, l) =>
    h.jsx(Em, {
      ref: l,
      sideOffset: o,
      className: gr(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        n,
      ),
      ...s,
    }),
  );
$1.displayName = Em.displayName;
var Yi = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(n), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Q1 = {
    setTimeout: (n, o) => setTimeout(n, o),
    clearTimeout: (n) => clearTimeout(n),
    setInterval: (n, o) => setInterval(n, o),
    clearInterval: (n) => clearInterval(n),
  },
  q1 = class {
    #e = Q1;
    #t = !1;
    setTimeoutProvider(n) {
      this.#e = n;
    }
    setTimeout(n, o) {
      return this.#e.setTimeout(n, o);
    }
    clearTimeout(n) {
      this.#e.clearTimeout(n);
    }
    setInterval(n, o) {
      return this.#e.setInterval(n, o);
    }
    clearInterval(n) {
      this.#e.clearInterval(n);
    }
  },
  Nu = new q1();
function K1(n) {
  setTimeout(n, 0);
}
var Gi = typeof window > "u" || "Deno" in globalThis;
function Ut() {}
function Y1(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function G1(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function J1(n, o) {
  return Math.max(n + (o || 0) - Date.now(), 0);
}
function ku(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function X1(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function mp(n, o) {
  const {
    type: s = "all",
    exact: l,
    fetchStatus: a,
    predicate: c,
    queryKey: f,
    stale: p,
  } = n;
  if (f) {
    if (l) {
      if (o.queryHash !== Gu(f, o.options)) return !1;
    } else if (!ns(o.queryKey, f)) return !1;
  }
  if (s !== "all") {
    const m = o.isActive();
    if ((s === "active" && !m) || (s === "inactive" && m)) return !1;
  }
  return !(
    (typeof p == "boolean" && o.isStale() !== p) ||
    (a && a !== o.state.fetchStatus) ||
    (c && !c(o))
  );
}
function gp(n, o) {
  const { exact: s, status: l, predicate: a, mutationKey: c } = n;
  if (c) {
    if (!o.options.mutationKey) return !1;
    if (s) {
      if (ts(o.options.mutationKey) !== ts(c)) return !1;
    } else if (!ns(o.options.mutationKey, c)) return !1;
  }
  return !((l && o.state.status !== l) || (a && !a(o)));
}
function Gu(n, o) {
  return (o?.queryKeyHashFn || ts)(n);
}
function ts(n) {
  return JSON.stringify(n, (o, s) =>
    Pu(s)
      ? Object.keys(s)
          .sort()
          .reduce((l, a) => ((l[a] = s[a]), l), {})
      : s,
  );
}
function ns(n, o) {
  return n === o
    ? !0
    : typeof n != typeof o
      ? !1
      : n && o && typeof n == "object" && typeof o == "object"
        ? Object.keys(o).every((s) => ns(n[s], o[s]))
        : !1;
}
var Z1 = Object.prototype.hasOwnProperty;
function Nm(n, o) {
  if (n === o) return n;
  const s = yp(n) && yp(o);
  if (!s && !(Pu(n) && Pu(o))) return o;
  const a = (s ? n : Object.keys(n)).length,
    c = s ? o : Object.keys(o),
    f = c.length,
    p = s ? new Array(f) : {};
  let m = 0;
  for (let g = 0; g < f; g++) {
    const v = s ? g : c[g],
      w = n[v],
      S = o[v];
    if (w === S) {
      ((p[v] = w), (s ? g < a : Z1.call(n, v)) && m++);
      continue;
    }
    if (
      w === null ||
      S === null ||
      typeof w != "object" ||
      typeof S != "object"
    ) {
      p[v] = S;
      continue;
    }
    const x = Nm(w, S);
    ((p[v] = x), x === w && m++);
  }
  return a === f && m === a ? n : p;
}
function yp(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Pu(n) {
  if (!vp(n)) return !1;
  const o = n.constructor;
  if (o === void 0) return !0;
  const s = o.prototype;
  return !(
    !vp(s) ||
    !s.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function vp(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function e2(n) {
  return new Promise((o) => {
    Nu.setTimeout(o, n);
  });
}
function t2(n, o, s) {
  return typeof s.structuralSharing == "function"
    ? s.structuralSharing(n, o)
    : s.structuralSharing !== !1
      ? Nm(n, o)
      : o;
}
function n2(n, o, s = 0) {
  const l = [...n, o];
  return s && l.length > s ? l.slice(1) : l;
}
function r2(n, o, s = 0) {
  const l = [o, ...n];
  return s && l.length > s ? l.slice(0, -1) : l;
}
var Ju = Symbol();
function km(n, o) {
  return !n.queryFn && o?.initialPromise
    ? () => o.initialPromise
    : !n.queryFn || n.queryFn === Ju
      ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
      : n.queryFn;
}
var o2 = class extends Yi {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (n) => {
          if (!Gi && window.addEventListener) {
            const o = () => n();
            return (
              window.addEventListener("visibilitychange", o, !1),
              () => {
                window.removeEventListener("visibilitychange", o);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(n) {
      ((this.#n = n),
        this.#t?.(),
        (this.#t = n((o) => {
          typeof o == "boolean" ? this.setFocused(o) : this.onFocus();
        })));
    }
    setFocused(n) {
      this.#e !== n && ((this.#e = n), this.onFocus());
    }
    onFocus() {
      const n = this.isFocused();
      this.listeners.forEach((o) => {
        o(n);
      });
    }
    isFocused() {
      return typeof this.#e == "boolean"
        ? this.#e
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  Pm = new o2();
function s2() {
  let n, o;
  const s = new Promise((a, c) => {
    ((n = a), (o = c));
  });
  ((s.status = "pending"), s.catch(() => {}));
  function l(a) {
    (Object.assign(s, a), delete s.resolve, delete s.reject);
  }
  return (
    (s.resolve = (a) => {
      (l({ status: "fulfilled", value: a }), n(a));
    }),
    (s.reject = (a) => {
      (l({ status: "rejected", reason: a }), o(a));
    }),
    s
  );
}
var i2 = K1;
function l2() {
  let n = [],
    o = 0,
    s = (p) => {
      p();
    },
    l = (p) => {
      p();
    },
    a = i2;
  const c = (p) => {
      o
        ? n.push(p)
        : a(() => {
            s(p);
          });
    },
    f = () => {
      const p = n;
      ((n = []),
        p.length &&
          a(() => {
            l(() => {
              p.forEach((m) => {
                s(m);
              });
            });
          }));
    };
  return {
    batch: (p) => {
      let m;
      o++;
      try {
        m = p();
      } finally {
        (o--, o || f());
      }
      return m;
    },
    batchCalls:
      (p) =>
      (...m) => {
        c(() => {
          p(...m);
        });
      },
    schedule: c,
    setNotifyFunction: (p) => {
      s = p;
    },
    setBatchNotifyFunction: (p) => {
      l = p;
    },
    setScheduler: (p) => {
      a = p;
    },
  };
}
var st = l2(),
  a2 = class extends Yi {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (n) => {
          if (!Gi && window.addEventListener) {
            const o = () => n(!0),
              s = () => n(!1);
            return (
              window.addEventListener("online", o, !1),
              window.addEventListener("offline", s, !1),
              () => {
                (window.removeEventListener("online", o),
                  window.removeEventListener("offline", s));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(n) {
      ((this.#n = n), this.#t?.(), (this.#t = n(this.setOnline.bind(this))));
    }
    setOnline(n) {
      this.#e !== n &&
        ((this.#e = n),
        this.listeners.forEach((s) => {
          s(n);
        }));
    }
    isOnline() {
      return this.#e;
    }
  },
  Di = new a2();
function u2(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function jm(n) {
  return (n ?? "online") === "online" ? Di.isOnline() : !0;
}
var ju = class extends Error {
  constructor(n) {
    (super("CancelledError"),
      (this.revert = n?.revert),
      (this.silent = n?.silent));
  }
};
function Tm(n) {
  let o = !1,
    s = 0,
    l;
  const a = s2(),
    c = () => a.status !== "pending",
    f = (C) => {
      if (!c()) {
        const N = new ju(C);
        (S(N), n.onCancel?.(N));
      }
    },
    p = () => {
      o = !0;
    },
    m = () => {
      o = !1;
    },
    g = () =>
      Pm.isFocused() &&
      (n.networkMode === "always" || Di.isOnline()) &&
      n.canRun(),
    v = () => jm(n.networkMode) && n.canRun(),
    w = (C) => {
      c() || (l?.(), a.resolve(C));
    },
    S = (C) => {
      c() || (l?.(), a.reject(C));
    },
    x = () =>
      new Promise((C) => {
        ((l = (N) => {
          (c() || g()) && C(N);
        }),
          n.onPause?.());
      }).then(() => {
        ((l = void 0), c() || n.onContinue?.());
      }),
    P = () => {
      if (c()) return;
      let C;
      const N = s === 0 ? n.initialPromise : void 0;
      try {
        C = N ?? n.fn();
      } catch (R) {
        C = Promise.reject(R);
      }
      Promise.resolve(C)
        .then(w)
        .catch((R) => {
          if (c()) return;
          const M = n.retry ?? (Gi ? 0 : 3),
            A = n.retryDelay ?? u2,
            O = typeof A == "function" ? A(s, R) : A,
            W =
              M === !0 ||
              (typeof M == "number" && s < M) ||
              (typeof M == "function" && M(s, R));
          if (o || !W) {
            S(R);
            return;
          }
          (s++,
            n.onFail?.(s, R),
            e2(O)
              .then(() => (g() ? void 0 : x()))
              .then(() => {
                o ? S(R) : P();
              }));
        });
    };
  return {
    promise: a,
    status: () => a.status,
    cancel: f,
    continue: () => (l?.(), a),
    cancelRetry: p,
    continueRetry: m,
    canStart: v,
    start: () => (v() ? P() : x().then(P), a),
  };
}
var Rm = class {
    #e;
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      (this.clearGcTimeout(),
        G1(this.gcTime) &&
          (this.#e = Nu.setTimeout(() => {
            this.optionalRemove();
          }, this.gcTime)));
    }
    updateGcTime(n) {
      this.gcTime = Math.max(this.gcTime || 0, n ?? (Gi ? 1 / 0 : 300 * 1e3));
    }
    clearGcTimeout() {
      this.#e && (Nu.clearTimeout(this.#e), (this.#e = void 0));
    }
  },
  c2 = class extends Rm {
    #e;
    #t;
    #n;
    #o;
    #r;
    #i;
    #l;
    constructor(n) {
      (super(),
        (this.#l = !1),
        (this.#i = n.defaultOptions),
        this.setOptions(n.options),
        (this.observers = []),
        (this.#o = n.client),
        (this.#n = this.#o.getQueryCache()),
        (this.queryKey = n.queryKey),
        (this.queryHash = n.queryHash),
        (this.#e = wp(this.options)),
        (this.state = n.state ?? this.#e),
        this.scheduleGc());
    }
    get meta() {
      return this.options.meta;
    }
    get promise() {
      return this.#r?.promise;
    }
    setOptions(n) {
      if (
        ((this.options = { ...this.#i, ...n }),
        this.updateGcTime(this.options.gcTime),
        this.state && this.state.data === void 0)
      ) {
        const o = wp(this.options);
        o.data !== void 0 &&
          (this.setState(xp(o.data, o.dataUpdatedAt)), (this.#e = o));
      }
    }
    optionalRemove() {
      !this.observers.length &&
        this.state.fetchStatus === "idle" &&
        this.#n.remove(this);
    }
    setData(n, o) {
      const s = t2(this.state.data, n, this.options);
      return (
        this.#s({
          data: s,
          type: "success",
          dataUpdatedAt: o?.updatedAt,
          manual: o?.manual,
        }),
        s
      );
    }
    setState(n, o) {
      this.#s({ type: "setState", state: n, setStateOptions: o });
    }
    cancel(n) {
      const o = this.#r?.promise;
      return (this.#r?.cancel(n), o ? o.then(Ut).catch(Ut) : Promise.resolve());
    }
    destroy() {
      (super.destroy(), this.cancel({ silent: !0 }));
    }
    reset() {
      (this.destroy(), this.setState(this.#e));
    }
    isActive() {
      return this.observers.some((n) => X1(n.options.enabled, this) !== !1);
    }
    isDisabled() {
      return this.getObserversCount() > 0
        ? !this.isActive()
        : this.options.queryFn === Ju ||
            this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
    }
    isStatic() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => ku(n.options.staleTime, this) === "static")
        : !1;
    }
    isStale() {
      return this.getObserversCount() > 0
        ? this.observers.some((n) => n.getCurrentResult().isStale)
        : this.state.data === void 0 || this.state.isInvalidated;
    }
    isStaleByTime(n = 0) {
      return this.state.data === void 0
        ? !0
        : n === "static"
          ? !1
          : this.state.isInvalidated
            ? !0
            : !J1(this.state.dataUpdatedAt, n);
    }
    onFocus() {
      (this.observers
        .find((o) => o.shouldFetchOnWindowFocus())
        ?.refetch({ cancelRefetch: !1 }),
        this.#r?.continue());
    }
    onOnline() {
      (this.observers
        .find((o) => o.shouldFetchOnReconnect())
        ?.refetch({ cancelRefetch: !1 }),
        this.#r?.continue());
    }
    addObserver(n) {
      this.observers.includes(n) ||
        (this.observers.push(n),
        this.clearGcTimeout(),
        this.#n.notify({ type: "observerAdded", query: this, observer: n }));
    }
    removeObserver(n) {
      this.observers.includes(n) &&
        ((this.observers = this.observers.filter((o) => o !== n)),
        this.observers.length ||
          (this.#r &&
            (this.#l ? this.#r.cancel({ revert: !0 }) : this.#r.cancelRetry()),
          this.scheduleGc()),
        this.#n.notify({ type: "observerRemoved", query: this, observer: n }));
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      this.state.isInvalidated || this.#s({ type: "invalidate" });
    }
    async fetch(n, o) {
      if (
        this.state.fetchStatus !== "idle" &&
        this.#r?.status() !== "rejected"
      ) {
        if (this.state.data !== void 0 && o?.cancelRefetch)
          this.cancel({ silent: !0 });
        else if (this.#r) return (this.#r.continueRetry(), this.#r.promise);
      }
      if ((n && this.setOptions(n), !this.options.queryFn)) {
        const p = this.observers.find((m) => m.options.queryFn);
        p && this.setOptions(p.options);
      }
      const s = new AbortController(),
        l = (p) => {
          Object.defineProperty(p, "signal", {
            enumerable: !0,
            get: () => ((this.#l = !0), s.signal),
          });
        },
        a = () => {
          const p = km(this.options, o),
            g = (() => {
              const v = {
                client: this.#o,
                queryKey: this.queryKey,
                meta: this.meta,
              };
              return (l(v), v);
            })();
          return (
            (this.#l = !1),
            this.options.persister ? this.options.persister(p, g, this) : p(g)
          );
        },
        f = (() => {
          const p = {
            fetchOptions: o,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#o,
            state: this.state,
            fetchFn: a,
          };
          return (l(p), p);
        })();
      (this.options.behavior?.onFetch(f, this),
        (this.#t = this.state),
        (this.state.fetchStatus === "idle" ||
          this.state.fetchMeta !== f.fetchOptions?.meta) &&
          this.#s({ type: "fetch", meta: f.fetchOptions?.meta }),
        (this.#r = Tm({
          initialPromise: o?.initialPromise,
          fn: f.fetchFn,
          onCancel: (p) => {
            (p instanceof ju &&
              p.revert &&
              this.setState({ ...this.#t, fetchStatus: "idle" }),
              s.abort());
          },
          onFail: (p, m) => {
            this.#s({ type: "failed", failureCount: p, error: m });
          },
          onPause: () => {
            this.#s({ type: "pause" });
          },
          onContinue: () => {
            this.#s({ type: "continue" });
          },
          retry: f.options.retry,
          retryDelay: f.options.retryDelay,
          networkMode: f.options.networkMode,
          canRun: () => !0,
        })));
      try {
        const p = await this.#r.start();
        if (p === void 0)
          throw new Error(`${this.queryHash} data is undefined`);
        return (
          this.setData(p),
          this.#n.config.onSuccess?.(p, this),
          this.#n.config.onSettled?.(p, this.state.error, this),
          p
        );
      } catch (p) {
        if (p instanceof ju) {
          if (p.silent) return this.#r.promise;
          if (p.revert) {
            if (this.state.data === void 0) throw p;
            return this.state.data;
          }
        }
        throw (
          this.#s({ type: "error", error: p }),
          this.#n.config.onError?.(p, this),
          this.#n.config.onSettled?.(this.state.data, p, this),
          p
        );
      } finally {
        this.scheduleGc();
      }
    }
    #s(n) {
      const o = (s) => {
        switch (n.type) {
          case "failed":
            return {
              ...s,
              fetchFailureCount: n.failureCount,
              fetchFailureReason: n.error,
            };
          case "pause":
            return { ...s, fetchStatus: "paused" };
          case "continue":
            return { ...s, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...s,
              ...d2(s.data, this.options),
              fetchMeta: n.meta ?? null,
            };
          case "success":
            const l = {
              ...s,
              ...xp(n.data, n.dataUpdatedAt),
              dataUpdateCount: s.dataUpdateCount + 1,
              ...(!n.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return ((this.#t = n.manual ? l : void 0), l);
          case "error":
            const a = n.error;
            return {
              ...s,
              error: a,
              errorUpdateCount: s.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: s.fetchFailureCount + 1,
              fetchFailureReason: a,
              fetchStatus: "idle",
              status: "error",
            };
          case "invalidate":
            return { ...s, isInvalidated: !0 };
          case "setState":
            return { ...s, ...n.state };
        }
      };
      ((this.state = o(this.state)),
        st.batch(() => {
          (this.observers.forEach((s) => {
            s.onQueryUpdate();
          }),
            this.#n.notify({ query: this, type: "updated", action: n }));
        }));
    }
  };
function d2(n, o) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: jm(o.networkMode) ? "fetching" : "paused",
    ...(n === void 0 && { error: null, status: "pending" }),
  };
}
function xp(n, o) {
  return {
    data: n,
    dataUpdatedAt: o ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function wp(n) {
  const o =
      typeof n.initialData == "function" ? n.initialData() : n.initialData,
    s = o !== void 0,
    l = s
      ? typeof n.initialDataUpdatedAt == "function"
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: o,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? (l ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle",
  };
}
function bp(n) {
  return {
    onFetch: (o, s) => {
      const l = o.options,
        a = o.fetchOptions?.meta?.fetchMore?.direction,
        c = o.state.data?.pages || [],
        f = o.state.data?.pageParams || [];
      let p = { pages: [], pageParams: [] },
        m = 0;
      const g = async () => {
        let v = !1;
        const w = (P) => {
            Object.defineProperty(P, "signal", {
              enumerable: !0,
              get: () => (
                o.signal.aborted
                  ? (v = !0)
                  : o.signal.addEventListener("abort", () => {
                      v = !0;
                    }),
                o.signal
              ),
            });
          },
          S = km(o.options, o.fetchOptions),
          x = async (P, C, N) => {
            if (v) return Promise.reject();
            if (C == null && P.pages.length) return Promise.resolve(P);
            const M = (() => {
                const F = {
                  client: o.client,
                  queryKey: o.queryKey,
                  pageParam: C,
                  direction: N ? "backward" : "forward",
                  meta: o.options.meta,
                };
                return (w(F), F);
              })(),
              A = await S(M),
              { maxPages: O } = o.options,
              W = N ? r2 : n2;
            return {
              pages: W(P.pages, A, O),
              pageParams: W(P.pageParams, C, O),
            };
          };
        if (a && c.length) {
          const P = a === "backward",
            C = P ? f2 : Sp,
            N = { pages: c, pageParams: f },
            R = C(l, N);
          p = await x(N, R, P);
        } else {
          const P = n ?? c.length;
          do {
            const C = m === 0 ? (f[0] ?? l.initialPageParam) : Sp(l, p);
            if (m > 0 && C == null) break;
            ((p = await x(p, C)), m++);
          } while (m < P);
        }
        return p;
      };
      o.options.persister
        ? (o.fetchFn = () =>
            o.options.persister?.(
              g,
              {
                client: o.client,
                queryKey: o.queryKey,
                meta: o.options.meta,
                signal: o.signal,
              },
              s,
            ))
        : (o.fetchFn = g);
    },
  };
}
function Sp(n, { pages: o, pageParams: s }) {
  const l = o.length - 1;
  return o.length > 0 ? n.getNextPageParam(o[l], o, s[l], s) : void 0;
}
function f2(n, { pages: o, pageParams: s }) {
  return o.length > 0 ? n.getPreviousPageParam?.(o[0], o, s[0], s) : void 0;
}
var p2 = class extends Rm {
  #e;
  #t;
  #n;
  #o;
  constructor(n) {
    (super(),
      (this.#e = n.client),
      (this.mutationId = n.mutationId),
      (this.#n = n.mutationCache),
      (this.#t = []),
      (this.state = n.state || h2()),
      this.setOptions(n.options),
      this.scheduleGc());
  }
  setOptions(n) {
    ((this.options = n), this.updateGcTime(this.options.gcTime));
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(n) {
    this.#t.includes(n) ||
      (this.#t.push(n),
      this.clearGcTimeout(),
      this.#n.notify({ type: "observerAdded", mutation: this, observer: n }));
  }
  removeObserver(n) {
    ((this.#t = this.#t.filter((o) => o !== n)),
      this.scheduleGc(),
      this.#n.notify({ type: "observerRemoved", mutation: this, observer: n }));
  }
  optionalRemove() {
    this.#t.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#n.remove(this));
  }
  continue() {
    return this.#o?.continue() ?? this.execute(this.state.variables);
  }
  async execute(n) {
    const o = () => {
        this.#r({ type: "continue" });
      },
      s = {
        client: this.#e,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#o = Tm({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(n, s)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (c, f) => {
        this.#r({ type: "failed", failureCount: c, error: f });
      },
      onPause: () => {
        this.#r({ type: "pause" });
      },
      onContinue: o,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this),
    });
    const l = this.state.status === "pending",
      a = !this.#o.canStart();
    try {
      if (l) o();
      else {
        (this.#r({ type: "pending", variables: n, isPaused: a }),
          await this.#n.config.onMutate?.(n, this, s));
        const f = await this.options.onMutate?.(n, s);
        f !== this.state.context &&
          this.#r({ type: "pending", context: f, variables: n, isPaused: a });
      }
      const c = await this.#o.start();
      return (
        await this.#n.config.onSuccess?.(c, n, this.state.context, this, s),
        await this.options.onSuccess?.(c, n, this.state.context, s),
        await this.#n.config.onSettled?.(
          c,
          null,
          this.state.variables,
          this.state.context,
          this,
          s,
        ),
        await this.options.onSettled?.(c, null, n, this.state.context, s),
        this.#r({ type: "success", data: c }),
        c
      );
    } catch (c) {
      try {
        throw (
          await this.#n.config.onError?.(c, n, this.state.context, this, s),
          await this.options.onError?.(c, n, this.state.context, s),
          await this.#n.config.onSettled?.(
            void 0,
            c,
            this.state.variables,
            this.state.context,
            this,
            s,
          ),
          await this.options.onSettled?.(void 0, c, n, this.state.context, s),
          c
        );
      } finally {
        this.#r({ type: "error", error: c });
      }
    } finally {
      this.#n.runNext(this);
    }
  }
  #r(n) {
    const o = (s) => {
      switch (n.type) {
        case "failed":
          return { ...s, failureCount: n.failureCount, failureReason: n.error };
        case "pause":
          return { ...s, isPaused: !0 };
        case "continue":
          return { ...s, isPaused: !1 };
        case "pending":
          return {
            ...s,
            context: n.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: n.isPaused,
            status: "pending",
            variables: n.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...s,
            data: n.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...s,
            data: void 0,
            error: n.error,
            failureCount: s.failureCount + 1,
            failureReason: n.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    ((this.state = o(this.state)),
      st.batch(() => {
        (this.#t.forEach((s) => {
          s.onMutationUpdate(n);
        }),
          this.#n.notify({ mutation: this, type: "updated", action: n }));
      }));
  }
};
function h2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var m2 = class extends Yi {
  constructor(n = {}) {
    (super(),
      (this.config = n),
      (this.#e = new Set()),
      (this.#t = new Map()),
      (this.#n = 0));
  }
  #e;
  #t;
  #n;
  build(n, o, s) {
    const l = new p2({
      client: n,
      mutationCache: this,
      mutationId: ++this.#n,
      options: n.defaultMutationOptions(o),
      state: s,
    });
    return (this.add(l), l);
  }
  add(n) {
    this.#e.add(n);
    const o = ki(n);
    if (typeof o == "string") {
      const s = this.#t.get(o);
      s ? s.push(n) : this.#t.set(o, [n]);
    }
    this.notify({ type: "added", mutation: n });
  }
  remove(n) {
    if (this.#e.delete(n)) {
      const o = ki(n);
      if (typeof o == "string") {
        const s = this.#t.get(o);
        if (s)
          if (s.length > 1) {
            const l = s.indexOf(n);
            l !== -1 && s.splice(l, 1);
          } else s[0] === n && this.#t.delete(o);
      }
    }
    this.notify({ type: "removed", mutation: n });
  }
  canRun(n) {
    const o = ki(n);
    if (typeof o == "string") {
      const l = this.#t.get(o)?.find((a) => a.state.status === "pending");
      return !l || l === n;
    } else return !0;
  }
  runNext(n) {
    const o = ki(n);
    return typeof o == "string"
      ? (this.#t
          .get(o)
          ?.find((l) => l !== n && l.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    st.batch(() => {
      (this.#e.forEach((n) => {
        this.notify({ type: "removed", mutation: n });
      }),
        this.#e.clear(),
        this.#t.clear());
    });
  }
  getAll() {
    return Array.from(this.#e);
  }
  find(n) {
    const o = { exact: !0, ...n };
    return this.getAll().find((s) => gp(o, s));
  }
  findAll(n = {}) {
    return this.getAll().filter((o) => gp(n, o));
  }
  notify(n) {
    st.batch(() => {
      this.listeners.forEach((o) => {
        o(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((o) => o.state.isPaused);
    return st.batch(() => Promise.all(n.map((o) => o.continue().catch(Ut))));
  }
};
function ki(n) {
  return n.options.scope?.id;
}
var g2 = class extends Yi {
    constructor(n = {}) {
      (super(), (this.config = n), (this.#e = new Map()));
    }
    #e;
    build(n, o, s) {
      const l = o.queryKey,
        a = o.queryHash ?? Gu(l, o);
      let c = this.get(a);
      return (
        c ||
          ((c = new c2({
            client: n,
            queryKey: l,
            queryHash: a,
            options: n.defaultQueryOptions(o),
            state: s,
            defaultOptions: n.getQueryDefaults(l),
          })),
          this.add(c)),
        c
      );
    }
    add(n) {
      this.#e.has(n.queryHash) ||
        (this.#e.set(n.queryHash, n), this.notify({ type: "added", query: n }));
    }
    remove(n) {
      const o = this.#e.get(n.queryHash);
      o &&
        (n.destroy(),
        o === n && this.#e.delete(n.queryHash),
        this.notify({ type: "removed", query: n }));
    }
    clear() {
      st.batch(() => {
        this.getAll().forEach((n) => {
          this.remove(n);
        });
      });
    }
    get(n) {
      return this.#e.get(n);
    }
    getAll() {
      return [...this.#e.values()];
    }
    find(n) {
      const o = { exact: !0, ...n };
      return this.getAll().find((s) => mp(o, s));
    }
    findAll(n = {}) {
      const o = this.getAll();
      return Object.keys(n).length > 0 ? o.filter((s) => mp(n, s)) : o;
    }
    notify(n) {
      st.batch(() => {
        this.listeners.forEach((o) => {
          o(n);
        });
      });
    }
    onFocus() {
      st.batch(() => {
        this.getAll().forEach((n) => {
          n.onFocus();
        });
      });
    }
    onOnline() {
      st.batch(() => {
        this.getAll().forEach((n) => {
          n.onOnline();
        });
      });
    }
  },
  y2 = class {
    #e;
    #t;
    #n;
    #o;
    #r;
    #i;
    #l;
    #s;
    constructor(n = {}) {
      ((this.#e = n.queryCache || new g2()),
        (this.#t = n.mutationCache || new m2()),
        (this.#n = n.defaultOptions || {}),
        (this.#o = new Map()),
        (this.#r = new Map()),
        (this.#i = 0));
    }
    mount() {
      (this.#i++,
        this.#i === 1 &&
          ((this.#l = Pm.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#e.onFocus());
          })),
          (this.#s = Di.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#e.onOnline());
          }))));
    }
    unmount() {
      (this.#i--,
        this.#i === 0 &&
          (this.#l?.(), (this.#l = void 0), this.#s?.(), (this.#s = void 0)));
    }
    isFetching(n) {
      return this.#e.findAll({ ...n, fetchStatus: "fetching" }).length;
    }
    isMutating(n) {
      return this.#t.findAll({ ...n, status: "pending" }).length;
    }
    getQueryData(n) {
      const o = this.defaultQueryOptions({ queryKey: n });
      return this.#e.get(o.queryHash)?.state.data;
    }
    ensureQueryData(n) {
      const o = this.defaultQueryOptions(n),
        s = this.#e.build(this, o),
        l = s.state.data;
      return l === void 0
        ? this.fetchQuery(n)
        : (n.revalidateIfStale &&
            s.isStaleByTime(ku(o.staleTime, s)) &&
            this.prefetchQuery(o),
          Promise.resolve(l));
    }
    getQueriesData(n) {
      return this.#e.findAll(n).map(({ queryKey: o, state: s }) => {
        const l = s.data;
        return [o, l];
      });
    }
    setQueryData(n, o, s) {
      const l = this.defaultQueryOptions({ queryKey: n }),
        c = this.#e.get(l.queryHash)?.state.data,
        f = Y1(o, c);
      if (f !== void 0)
        return this.#e.build(this, l).setData(f, { ...s, manual: !0 });
    }
    setQueriesData(n, o, s) {
      return st.batch(() =>
        this.#e
          .findAll(n)
          .map(({ queryKey: l }) => [l, this.setQueryData(l, o, s)]),
      );
    }
    getQueryState(n) {
      const o = this.defaultQueryOptions({ queryKey: n });
      return this.#e.get(o.queryHash)?.state;
    }
    removeQueries(n) {
      const o = this.#e;
      st.batch(() => {
        o.findAll(n).forEach((s) => {
          o.remove(s);
        });
      });
    }
    resetQueries(n, o) {
      const s = this.#e;
      return st.batch(
        () => (
          s.findAll(n).forEach((l) => {
            l.reset();
          }),
          this.refetchQueries({ type: "active", ...n }, o)
        ),
      );
    }
    cancelQueries(n, o = {}) {
      const s = { revert: !0, ...o },
        l = st.batch(() => this.#e.findAll(n).map((a) => a.cancel(s)));
      return Promise.all(l).then(Ut).catch(Ut);
    }
    invalidateQueries(n, o = {}) {
      return st.batch(
        () => (
          this.#e.findAll(n).forEach((s) => {
            s.invalidate();
          }),
          n?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...n, type: n?.refetchType ?? n?.type ?? "active" },
                o,
              )
        ),
      );
    }
    refetchQueries(n, o = {}) {
      const s = { ...o, cancelRefetch: o.cancelRefetch ?? !0 },
        l = st.batch(() =>
          this.#e
            .findAll(n)
            .filter((a) => !a.isDisabled() && !a.isStatic())
            .map((a) => {
              let c = a.fetch(void 0, s);
              return (
                s.throwOnError || (c = c.catch(Ut)),
                a.state.fetchStatus === "paused" ? Promise.resolve() : c
              );
            }),
        );
      return Promise.all(l).then(Ut);
    }
    fetchQuery(n) {
      const o = this.defaultQueryOptions(n);
      o.retry === void 0 && (o.retry = !1);
      const s = this.#e.build(this, o);
      return s.isStaleByTime(ku(o.staleTime, s))
        ? s.fetch(o)
        : Promise.resolve(s.state.data);
    }
    prefetchQuery(n) {
      return this.fetchQuery(n).then(Ut).catch(Ut);
    }
    fetchInfiniteQuery(n) {
      return ((n.behavior = bp(n.pages)), this.fetchQuery(n));
    }
    prefetchInfiniteQuery(n) {
      return this.fetchInfiniteQuery(n).then(Ut).catch(Ut);
    }
    ensureInfiniteQueryData(n) {
      return ((n.behavior = bp(n.pages)), this.ensureQueryData(n));
    }
    resumePausedMutations() {
      return Di.isOnline()
        ? this.#t.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#e;
    }
    getMutationCache() {
      return this.#t;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(n) {
      this.#n = n;
    }
    setQueryDefaults(n, o) {
      this.#o.set(ts(n), { queryKey: n, defaultOptions: o });
    }
    getQueryDefaults(n) {
      const o = [...this.#o.values()],
        s = {};
      return (
        o.forEach((l) => {
          ns(n, l.queryKey) && Object.assign(s, l.defaultOptions);
        }),
        s
      );
    }
    setMutationDefaults(n, o) {
      this.#r.set(ts(n), { mutationKey: n, defaultOptions: o });
    }
    getMutationDefaults(n) {
      const o = [...this.#r.values()],
        s = {};
      return (
        o.forEach((l) => {
          ns(n, l.mutationKey) && Object.assign(s, l.defaultOptions);
        }),
        s
      );
    }
    defaultQueryOptions(n) {
      if (n._defaulted) return n;
      const o = {
        ...this.#n.queries,
        ...this.getQueryDefaults(n.queryKey),
        ...n,
        _defaulted: !0,
      };
      return (
        o.queryHash || (o.queryHash = Gu(o.queryKey, o)),
        o.refetchOnReconnect === void 0 &&
          (o.refetchOnReconnect = o.networkMode !== "always"),
        o.throwOnError === void 0 && (o.throwOnError = !!o.suspense),
        !o.networkMode && o.persister && (o.networkMode = "offlineFirst"),
        o.queryFn === Ju && (o.enabled = !1),
        o
      );
    }
    defaultMutationOptions(n) {
      return n?._defaulted
        ? n
        : {
            ...this.#n.mutations,
            ...(n?.mutationKey && this.getMutationDefaults(n.mutationKey)),
            ...n,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#e.clear(), this.#t.clear());
    }
  },
  v2 = b.createContext(void 0),
  x2 = ({ client: n, children: o }) => (
    b.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n],
    ),
    h.jsx(v2.Provider, { value: n, children: o })
  );
function rs() {
  return (
    (rs = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var o = 1; o < arguments.length; o++) {
            var s = arguments[o];
            for (var l in s)
              Object.prototype.hasOwnProperty.call(s, l) && (n[l] = s[l]);
          }
          return n;
        }),
    rs.apply(this, arguments)
  );
}
var Kn;
(function (n) {
  ((n.Pop = "POP"), (n.Push = "PUSH"), (n.Replace = "REPLACE"));
})(Kn || (Kn = {}));
const Cp = "popstate";
function w2(n) {
  n === void 0 && (n = {});
  function o(l, a) {
    let { pathname: c, search: f, hash: p } = l.location;
    return Tu(
      "",
      { pathname: c, search: f, hash: p },
      (a.state && a.state.usr) || null,
      (a.state && a.state.key) || "default",
    );
  }
  function s(l, a) {
    return typeof a == "string" ? a : Fi(a);
  }
  return S2(o, s, null, n);
}
function Be(n, o) {
  if (n === !1 || n === null || typeof n > "u") throw new Error(o);
}
function Mm(n, o) {
  if (!n) {
    typeof console < "u" && console.warn(o);
    try {
      throw new Error(o);
    } catch {}
  }
}
function b2() {
  return Math.random().toString(36).substr(2, 8);
}
function Ep(n, o) {
  return { usr: n.state, key: n.key, idx: o };
}
function Tu(n, o, s, l) {
  return (
    s === void 0 && (s = null),
    rs(
      { pathname: typeof n == "string" ? n : n.pathname, search: "", hash: "" },
      typeof o == "string" ? ro(o) : o,
      { state: s, key: (o && o.key) || l || b2() },
    )
  );
}
function Fi(n) {
  let { pathname: o = "/", search: s = "", hash: l = "" } = n;
  return (
    s && s !== "?" && (o += s.charAt(0) === "?" ? s : "?" + s),
    l && l !== "#" && (o += l.charAt(0) === "#" ? l : "#" + l),
    o
  );
}
function ro(n) {
  let o = {};
  if (n) {
    let s = n.indexOf("#");
    s >= 0 && ((o.hash = n.substr(s)), (n = n.substr(0, s)));
    let l = n.indexOf("?");
    (l >= 0 && ((o.search = n.substr(l)), (n = n.substr(0, l))),
      n && (o.pathname = n));
  }
  return o;
}
function S2(n, o, s, l) {
  l === void 0 && (l = {});
  let { window: a = document.defaultView, v5Compat: c = !1 } = l,
    f = a.history,
    p = Kn.Pop,
    m = null,
    g = v();
  g == null && ((g = 0), f.replaceState(rs({}, f.state, { idx: g }), ""));
  function v() {
    return (f.state || { idx: null }).idx;
  }
  function w() {
    p = Kn.Pop;
    let N = v(),
      R = N == null ? null : N - g;
    ((g = N), m && m({ action: p, location: C.location, delta: R }));
  }
  function S(N, R) {
    p = Kn.Push;
    let M = Tu(C.location, N, R);
    g = v() + 1;
    let A = Ep(M, g),
      O = C.createHref(M);
    try {
      f.pushState(A, "", O);
    } catch (W) {
      if (W instanceof DOMException && W.name === "DataCloneError") throw W;
      a.location.assign(O);
    }
    c && m && m({ action: p, location: C.location, delta: 1 });
  }
  function x(N, R) {
    p = Kn.Replace;
    let M = Tu(C.location, N, R);
    g = v();
    let A = Ep(M, g),
      O = C.createHref(M);
    (f.replaceState(A, "", O),
      c && m && m({ action: p, location: C.location, delta: 0 }));
  }
  function P(N) {
    let R = a.location.origin !== "null" ? a.location.origin : a.location.href,
      M = typeof N == "string" ? N : Fi(N);
    return (
      (M = M.replace(/ $/, "%20")),
      Be(
        R,
        "No window.location.(origin|href) available to create URL for href: " +
          M,
      ),
      new URL(M, R)
    );
  }
  let C = {
    get action() {
      return p;
    },
    get location() {
      return n(a, f);
    },
    listen(N) {
      if (m) throw new Error("A history only accepts one active listener");
      return (
        a.addEventListener(Cp, w),
        (m = N),
        () => {
          (a.removeEventListener(Cp, w), (m = null));
        }
      );
    },
    createHref(N) {
      return o(a, N);
    },
    createURL: P,
    encodeLocation(N) {
      let R = P(N);
      return { pathname: R.pathname, search: R.search, hash: R.hash };
    },
    push: S,
    replace: x,
    go(N) {
      return f.go(N);
    },
  };
  return C;
}
var Np;
(function (n) {
  ((n.data = "data"),
    (n.deferred = "deferred"),
    (n.redirect = "redirect"),
    (n.error = "error"));
})(Np || (Np = {}));
function C2(n, o, s) {
  return (s === void 0 && (s = "/"), E2(n, o, s));
}
function E2(n, o, s, l) {
  let a = typeof o == "string" ? ro(o) : o,
    c = Xu(a.pathname || "/", s);
  if (c == null) return null;
  let f = Am(n);
  N2(f);
  let p = null;
  for (let m = 0; p == null && m < f.length; ++m) {
    let g = D2(c);
    p = L2(f[m], g);
  }
  return p;
}
function Am(n, o, s, l) {
  (o === void 0 && (o = []),
    s === void 0 && (s = []),
    l === void 0 && (l = ""));
  let a = (c, f, p) => {
    let m = {
      relativePath: p === void 0 ? c.path || "" : p,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: f,
      route: c,
    };
    m.relativePath.startsWith("/") &&
      (Be(
        m.relativePath.startsWith(l),
        'Absolute route path "' +
          m.relativePath +
          '" nested under path ' +
          ('"' + l + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (m.relativePath = m.relativePath.slice(l.length)));
    let g = Yn([l, m.relativePath]),
      v = s.concat(m);
    (c.children &&
      c.children.length > 0 &&
      (Be(
        c.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + g + '".'),
      ),
      Am(c.children, o, v, g)),
      !(c.path == null && !c.index) &&
        o.push({ path: g, score: A2(g, c.index), routesMeta: v }));
  };
  return (
    n.forEach((c, f) => {
      var p;
      if (c.path === "" || !((p = c.path) != null && p.includes("?"))) a(c, f);
      else for (let m of _m(c.path)) a(c, f, m);
    }),
    o
  );
}
function _m(n) {
  let o = n.split("/");
  if (o.length === 0) return [];
  let [s, ...l] = o,
    a = s.endsWith("?"),
    c = s.replace(/\?$/, "");
  if (l.length === 0) return a ? [c, ""] : [c];
  let f = _m(l.join("/")),
    p = [];
  return (
    p.push(...f.map((m) => (m === "" ? c : [c, m].join("/")))),
    a && p.push(...f),
    p.map((m) => (n.startsWith("/") && m === "" ? "/" : m))
  );
}
function N2(n) {
  n.sort((o, s) =>
    o.score !== s.score
      ? s.score - o.score
      : _2(
          o.routesMeta.map((l) => l.childrenIndex),
          s.routesMeta.map((l) => l.childrenIndex),
        ),
  );
}
const k2 = /^:[\w-]+$/,
  P2 = 3,
  j2 = 2,
  T2 = 1,
  R2 = 10,
  M2 = -2,
  kp = (n) => n === "*";
function A2(n, o) {
  let s = n.split("/"),
    l = s.length;
  return (
    s.some(kp) && (l += M2),
    o && (l += j2),
    s
      .filter((a) => !kp(a))
      .reduce((a, c) => a + (k2.test(c) ? P2 : c === "" ? T2 : R2), l)
  );
}
function _2(n, o) {
  return n.length === o.length && n.slice(0, -1).every((l, a) => l === o[a])
    ? n[n.length - 1] - o[o.length - 1]
    : 0;
}
function L2(n, o, s) {
  let { routesMeta: l } = n,
    a = {},
    c = "/",
    f = [];
  for (let p = 0; p < l.length; ++p) {
    let m = l[p],
      g = p === l.length - 1,
      v = c === "/" ? o : o.slice(c.length) || "/",
      w = O2(
        { path: m.relativePath, caseSensitive: m.caseSensitive, end: g },
        v,
      ),
      S = m.route;
    if (!w) return null;
    (Object.assign(a, w.params),
      f.push({
        params: a,
        pathname: Yn([c, w.pathname]),
        pathnameBase: U2(Yn([c, w.pathnameBase])),
        route: S,
      }),
      w.pathnameBase !== "/" && (c = Yn([c, w.pathnameBase])));
  }
  return f;
}
function O2(n, o) {
  typeof n == "string" && (n = { path: n, caseSensitive: !1, end: !0 });
  let [s, l] = I2(n.path, n.caseSensitive, n.end),
    a = o.match(s);
  if (!a) return null;
  let c = a[0],
    f = c.replace(/(.)\/+$/, "$1"),
    p = a.slice(1);
  return {
    params: l.reduce((g, v, w) => {
      let { paramName: S, isOptional: x } = v;
      if (S === "*") {
        let C = p[w] || "";
        f = c.slice(0, c.length - C.length).replace(/(.)\/+$/, "$1");
      }
      const P = p[w];
      return (
        x && !P ? (g[S] = void 0) : (g[S] = (P || "").replace(/%2F/g, "/")),
        g
      );
    }, {}),
    pathname: c,
    pathnameBase: f,
    pattern: n,
  };
}
function I2(n, o, s) {
  (o === void 0 && (o = !1),
    s === void 0 && (s = !0),
    Mm(
      n === "*" || !n.endsWith("*") || n.endsWith("/*"),
      'Route path "' +
        n +
        '" will be treated as if it were ' +
        ('"' + n.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + n.replace(/\*$/, "/*") + '".'),
    ));
  let l = [],
    a =
      "^" +
      n
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (f, p, m) => (
            l.push({ paramName: p, isOptional: m != null }),
            m ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    n.endsWith("*")
      ? (l.push({ paramName: "*" }),
        (a += n === "*" || n === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
        ? (a += "\\/*$")
        : n !== "" && n !== "/" && (a += "(?:(?=\\/|$))"),
    [new RegExp(a, o ? void 0 : "i"), l]
  );
}
function D2(n) {
  try {
    return n
      .split("/")
      .map((o) => decodeURIComponent(o).replace(/\//g, "%2F"))
      .join("/");
  } catch (o) {
    return (
      Mm(
        !1,
        'The URL path "' +
          n +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + o + ")."),
      ),
      n
    );
  }
}
function Xu(n, o) {
  if (o === "/") return n;
  if (!n.toLowerCase().startsWith(o.toLowerCase())) return null;
  let s = o.endsWith("/") ? o.length - 1 : o.length,
    l = n.charAt(s);
  return l && l !== "/" ? null : n.slice(s) || "/";
}
function F2(n, o) {
  o === void 0 && (o = "/");
  let {
    pathname: s,
    search: l = "",
    hash: a = "",
  } = typeof n == "string" ? ro(n) : n;
  return {
    pathname: s ? (s.startsWith("/") ? s : z2(s, o)) : o,
    search: V2(l),
    hash: H2(a),
  };
}
function z2(n, o) {
  let s = o.replace(/\/+$/, "").split("/");
  return (
    n.split("/").forEach((a) => {
      a === ".." ? s.length > 1 && s.pop() : a !== "." && s.push(a);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function Wa(n, o, s, l) {
  return (
    "Cannot include a '" +
    n +
    "' character in a manually specified " +
    ("`to." +
      o +
      "` field [" +
      JSON.stringify(l) +
      "].  Please separate it out to the ") +
    ("`to." + s + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function B2(n) {
  return n.filter(
    (o, s) => s === 0 || (o.route.path && o.route.path.length > 0),
  );
}
function Zu(n, o) {
  let s = B2(n);
  return o
    ? s.map((l, a) => (a === s.length - 1 ? l.pathname : l.pathnameBase))
    : s.map((l) => l.pathnameBase);
}
function ec(n, o, s, l) {
  l === void 0 && (l = !1);
  let a;
  typeof n == "string"
    ? (a = ro(n))
    : ((a = rs({}, n)),
      Be(
        !a.pathname || !a.pathname.includes("?"),
        Wa("?", "pathname", "search", a),
      ),
      Be(
        !a.pathname || !a.pathname.includes("#"),
        Wa("#", "pathname", "hash", a),
      ),
      Be(!a.search || !a.search.includes("#"), Wa("#", "search", "hash", a)));
  let c = n === "" || a.pathname === "",
    f = c ? "/" : a.pathname,
    p;
  if (f == null) p = s;
  else {
    let w = o.length - 1;
    if (!l && f.startsWith("..")) {
      let S = f.split("/");
      for (; S[0] === ".."; ) (S.shift(), (w -= 1));
      a.pathname = S.join("/");
    }
    p = w >= 0 ? o[w] : "/";
  }
  let m = F2(a, p),
    g = f && f !== "/" && f.endsWith("/"),
    v = (c || f === ".") && s.endsWith("/");
  return (!m.pathname.endsWith("/") && (g || v) && (m.pathname += "/"), m);
}
const Yn = (n) => n.join("/").replace(/\/\/+/g, "/"),
  U2 = (n) => n.replace(/\/+$/, "").replace(/^\/*/, "/"),
  V2 = (n) => (!n || n === "?" ? "" : n.startsWith("?") ? n : "?" + n),
  H2 = (n) => (!n || n === "#" ? "" : n.startsWith("#") ? n : "#" + n);
function W2(n) {
  return (
    n != null &&
    typeof n.status == "number" &&
    typeof n.statusText == "string" &&
    typeof n.internal == "boolean" &&
    "data" in n
  );
}
const Lm = ["post", "put", "patch", "delete"];
new Set(Lm);
const $2 = ["get", ...Lm];
new Set($2);
function os() {
  return (
    (os = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var o = 1; o < arguments.length; o++) {
            var s = arguments[o];
            for (var l in s)
              Object.prototype.hasOwnProperty.call(s, l) && (n[l] = s[l]);
          }
          return n;
        }),
    os.apply(this, arguments)
  );
}
const tc = b.createContext(null),
  Q2 = b.createContext(null),
  er = b.createContext(null),
  Ji = b.createContext(null),
  bn = b.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Om = b.createContext(null);
function q2(n, o) {
  let { relative: s } = o === void 0 ? {} : o;
  oo() || Be(!1);
  let { basename: l, navigator: a } = b.useContext(er),
    { hash: c, pathname: f, search: p } = Fm(n, { relative: s }),
    m = f;
  return (
    l !== "/" && (m = f === "/" ? l : Yn([l, f])),
    a.createHref({ pathname: m, search: p, hash: c })
  );
}
function oo() {
  return b.useContext(Ji) != null;
}
function yr() {
  return (oo() || Be(!1), b.useContext(Ji).location);
}
function Im(n) {
  b.useContext(er).static || b.useLayoutEffect(n);
}
function vr() {
  let { isDataRoute: n } = b.useContext(bn);
  return n ? ib() : K2();
}
function K2() {
  oo() || Be(!1);
  let n = b.useContext(tc),
    { basename: o, future: s, navigator: l } = b.useContext(er),
    { matches: a } = b.useContext(bn),
    { pathname: c } = yr(),
    f = JSON.stringify(Zu(a, s.v7_relativeSplatPath)),
    p = b.useRef(!1);
  return (
    Im(() => {
      p.current = !0;
    }),
    b.useCallback(
      function (g, v) {
        if ((v === void 0 && (v = {}), !p.current)) return;
        if (typeof g == "number") {
          l.go(g);
          return;
        }
        let w = ec(g, JSON.parse(f), c, v.relative === "path");
        (n == null &&
          o !== "/" &&
          (w.pathname = w.pathname === "/" ? o : Yn([o, w.pathname])),
          (v.replace ? l.replace : l.push)(w, v.state, v));
      },
      [o, l, f, c, n],
    )
  );
}
function Dm() {
  let { matches: n } = b.useContext(bn),
    o = n[n.length - 1];
  return o ? o.params : {};
}
function Fm(n, o) {
  let { relative: s } = o === void 0 ? {} : o,
    { future: l } = b.useContext(er),
    { matches: a } = b.useContext(bn),
    { pathname: c } = yr(),
    f = JSON.stringify(Zu(a, l.v7_relativeSplatPath));
  return b.useMemo(() => ec(n, JSON.parse(f), c, s === "path"), [n, f, c, s]);
}
function Y2(n, o) {
  return G2(n, o);
}
function G2(n, o, s, l) {
  oo() || Be(!1);
  let { navigator: a } = b.useContext(er),
    { matches: c } = b.useContext(bn),
    f = c[c.length - 1],
    p = f ? f.params : {};
  f && f.pathname;
  let m = f ? f.pathnameBase : "/";
  f && f.route;
  let g = yr(),
    v;
  if (o) {
    var w;
    let N = typeof o == "string" ? ro(o) : o;
    (m === "/" || ((w = N.pathname) != null && w.startsWith(m)) || Be(!1),
      (v = N));
  } else v = g;
  let S = v.pathname || "/",
    x = S;
  if (m !== "/") {
    let N = m.replace(/^\//, "").split("/");
    x = "/" + S.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let P = C2(n, { pathname: x }),
    C = tb(
      P &&
        P.map((N) =>
          Object.assign({}, N, {
            params: Object.assign({}, p, N.params),
            pathname: Yn([
              m,
              a.encodeLocation
                ? a.encodeLocation(N.pathname).pathname
                : N.pathname,
            ]),
            pathnameBase:
              N.pathnameBase === "/"
                ? m
                : Yn([
                    m,
                    a.encodeLocation
                      ? a.encodeLocation(N.pathnameBase).pathname
                      : N.pathnameBase,
                  ]),
          }),
        ),
      c,
      s,
      l,
    );
  return o && C
    ? b.createElement(
        Ji.Provider,
        {
          value: {
            location: os(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              v,
            ),
            navigationType: Kn.Pop,
          },
        },
        C,
      )
    : C;
}
function J2() {
  let n = sb(),
    o = W2(n)
      ? n.status + " " + n.statusText
      : n instanceof Error
        ? n.message
        : JSON.stringify(n),
    s = n instanceof Error ? n.stack : null,
    a = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return b.createElement(
    b.Fragment,
    null,
    b.createElement("h2", null, "Unexpected Application Error!"),
    b.createElement("h3", { style: { fontStyle: "italic" } }, o),
    s ? b.createElement("pre", { style: a }, s) : null,
    null,
  );
}
const X2 = b.createElement(J2, null);
class Z2 extends b.Component {
  constructor(o) {
    (super(o),
      (this.state = {
        location: o.location,
        revalidation: o.revalidation,
        error: o.error,
      }));
  }
  static getDerivedStateFromError(o) {
    return { error: o };
  }
  static getDerivedStateFromProps(o, s) {
    return s.location !== o.location ||
      (s.revalidation !== "idle" && o.revalidation === "idle")
      ? { error: o.error, location: o.location, revalidation: o.revalidation }
      : {
          error: o.error !== void 0 ? o.error : s.error,
          location: s.location,
          revalidation: o.revalidation || s.revalidation,
        };
  }
  componentDidCatch(o, s) {
    console.error(
      "React Router caught the following error during render",
      o,
      s,
    );
  }
  render() {
    return this.state.error !== void 0
      ? b.createElement(
          bn.Provider,
          { value: this.props.routeContext },
          b.createElement(Om.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function eb(n) {
  let { routeContext: o, match: s, children: l } = n,
    a = b.useContext(tc);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (s.route.errorElement || s.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = s.route.id),
    b.createElement(bn.Provider, { value: o }, l)
  );
}
function tb(n, o, s, l) {
  var a;
  if (
    (o === void 0 && (o = []),
    s === void 0 && (s = null),
    l === void 0 && (l = null),
    n == null)
  ) {
    var c;
    if (!s) return null;
    if (s.errors) n = s.matches;
    else if (
      (c = l) != null &&
      c.v7_partialHydration &&
      o.length === 0 &&
      !s.initialized &&
      s.matches.length > 0
    )
      n = s.matches;
    else return null;
  }
  let f = n,
    p = (a = s) == null ? void 0 : a.errors;
  if (p != null) {
    let v = f.findIndex((w) => w.route.id && p?.[w.route.id] !== void 0);
    (v >= 0 || Be(!1), (f = f.slice(0, Math.min(f.length, v + 1))));
  }
  let m = !1,
    g = -1;
  if (s && l && l.v7_partialHydration)
    for (let v = 0; v < f.length; v++) {
      let w = f[v];
      if (
        ((w.route.HydrateFallback || w.route.hydrateFallbackElement) && (g = v),
        w.route.id)
      ) {
        let { loaderData: S, errors: x } = s,
          P =
            w.route.loader &&
            S[w.route.id] === void 0 &&
            (!x || x[w.route.id] === void 0);
        if (w.route.lazy || P) {
          ((m = !0), g >= 0 ? (f = f.slice(0, g + 1)) : (f = [f[0]]));
          break;
        }
      }
    }
  return f.reduceRight((v, w, S) => {
    let x,
      P = !1,
      C = null,
      N = null;
    s &&
      ((x = p && w.route.id ? p[w.route.id] : void 0),
      (C = w.route.errorElement || X2),
      m &&
        (g < 0 && S === 0
          ? (lb("route-fallback"), (P = !0), (N = null))
          : g === S &&
            ((P = !0), (N = w.route.hydrateFallbackElement || null))));
    let R = o.concat(f.slice(0, S + 1)),
      M = () => {
        let A;
        return (
          x
            ? (A = C)
            : P
              ? (A = N)
              : w.route.Component
                ? (A = b.createElement(w.route.Component, null))
                : w.route.element
                  ? (A = w.route.element)
                  : (A = v),
          b.createElement(eb, {
            match: w,
            routeContext: { outlet: v, matches: R, isDataRoute: s != null },
            children: A,
          })
        );
      };
    return s && (w.route.ErrorBoundary || w.route.errorElement || S === 0)
      ? b.createElement(Z2, {
          location: s.location,
          revalidation: s.revalidation,
          component: C,
          error: x,
          children: M(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
        })
      : M();
  }, null);
}
var zm = (function (n) {
    return (
      (n.UseBlocker = "useBlocker"),
      (n.UseRevalidator = "useRevalidator"),
      (n.UseNavigateStable = "useNavigate"),
      n
    );
  })(zm || {}),
  Bm = (function (n) {
    return (
      (n.UseBlocker = "useBlocker"),
      (n.UseLoaderData = "useLoaderData"),
      (n.UseActionData = "useActionData"),
      (n.UseRouteError = "useRouteError"),
      (n.UseNavigation = "useNavigation"),
      (n.UseRouteLoaderData = "useRouteLoaderData"),
      (n.UseMatches = "useMatches"),
      (n.UseRevalidator = "useRevalidator"),
      (n.UseNavigateStable = "useNavigate"),
      (n.UseRouteId = "useRouteId"),
      n
    );
  })(Bm || {});
function nb(n) {
  let o = b.useContext(tc);
  return (o || Be(!1), o);
}
function rb(n) {
  let o = b.useContext(Q2);
  return (o || Be(!1), o);
}
function ob(n) {
  let o = b.useContext(bn);
  return (o || Be(!1), o);
}
function Um(n) {
  let o = ob(),
    s = o.matches[o.matches.length - 1];
  return (s.route.id || Be(!1), s.route.id);
}
function sb() {
  var n;
  let o = b.useContext(Om),
    s = rb(),
    l = Um();
  return o !== void 0 ? o : (n = s.errors) == null ? void 0 : n[l];
}
function ib() {
  let { router: n } = nb(zm.UseNavigateStable),
    o = Um(Bm.UseNavigateStable),
    s = b.useRef(!1);
  return (
    Im(() => {
      s.current = !0;
    }),
    b.useCallback(
      function (a, c) {
        (c === void 0 && (c = {}),
          s.current &&
            (typeof a == "number"
              ? n.navigate(a)
              : n.navigate(a, os({ fromRouteId: o }, c))));
      },
      [n, o],
    )
  );
}
const Pp = {};
function lb(n, o, s) {
  Pp[n] || (Pp[n] = !0);
}
function ab(n, o) {
  (n?.v7_startTransition, n?.v7_relativeSplatPath);
}
function Ru(n) {
  let { to: o, replace: s, state: l, relative: a } = n;
  oo() || Be(!1);
  let { future: c, static: f } = b.useContext(er),
    { matches: p } = b.useContext(bn),
    { pathname: m } = yr(),
    g = vr(),
    v = ec(o, Zu(p, c.v7_relativeSplatPath), m, a === "path"),
    w = JSON.stringify(v);
  return (
    b.useEffect(
      () => g(JSON.parse(w), { replace: s, state: l, relative: a }),
      [g, w, a, s, l],
    ),
    null
  );
}
function qn(n) {
  Be(!1);
}
function ub(n) {
  let {
    basename: o = "/",
    children: s = null,
    location: l,
    navigationType: a = Kn.Pop,
    navigator: c,
    static: f = !1,
    future: p,
  } = n;
  oo() && Be(!1);
  let m = o.replace(/^\/*/, "/"),
    g = b.useMemo(
      () => ({
        basename: m,
        navigator: c,
        static: f,
        future: os({ v7_relativeSplatPath: !1 }, p),
      }),
      [m, p, c, f],
    );
  typeof l == "string" && (l = ro(l));
  let {
      pathname: v = "/",
      search: w = "",
      hash: S = "",
      state: x = null,
      key: P = "default",
    } = l,
    C = b.useMemo(() => {
      let N = Xu(v, m);
      return N == null
        ? null
        : {
            location: { pathname: N, search: w, hash: S, state: x, key: P },
            navigationType: a,
          };
    }, [m, v, w, S, x, P, a]);
  return C == null
    ? null
    : b.createElement(
        er.Provider,
        { value: g },
        b.createElement(Ji.Provider, { children: s, value: C }),
      );
}
function cb(n) {
  let { children: o, location: s } = n;
  return Y2(Mu(o), s);
}
new Promise(() => {});
function Mu(n, o) {
  o === void 0 && (o = []);
  let s = [];
  return (
    b.Children.forEach(n, (l, a) => {
      if (!b.isValidElement(l)) return;
      let c = [...o, a];
      if (l.type === b.Fragment) {
        s.push.apply(s, Mu(l.props.children, c));
        return;
      }
      (l.type !== qn && Be(!1), !l.props.index || !l.props.children || Be(!1));
      let f = {
        id: l.props.id || c.join("-"),
        caseSensitive: l.props.caseSensitive,
        element: l.props.element,
        Component: l.props.Component,
        index: l.props.index,
        path: l.props.path,
        loader: l.props.loader,
        action: l.props.action,
        errorElement: l.props.errorElement,
        ErrorBoundary: l.props.ErrorBoundary,
        hasErrorBoundary:
          l.props.ErrorBoundary != null || l.props.errorElement != null,
        shouldRevalidate: l.props.shouldRevalidate,
        handle: l.props.handle,
        lazy: l.props.lazy,
      };
      (l.props.children && (f.children = Mu(l.props.children, c)), s.push(f));
    }),
    s
  );
}
function Au() {
  return (
    (Au = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var o = 1; o < arguments.length; o++) {
            var s = arguments[o];
            for (var l in s)
              Object.prototype.hasOwnProperty.call(s, l) && (n[l] = s[l]);
          }
          return n;
        }),
    Au.apply(this, arguments)
  );
}
function db(n, o) {
  if (n == null) return {};
  var s = {},
    l = Object.keys(n),
    a,
    c;
  for (c = 0; c < l.length; c++)
    ((a = l[c]), !(o.indexOf(a) >= 0) && (s[a] = n[a]));
  return s;
}
function fb(n) {
  return !!(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey);
}
function pb(n, o) {
  return n.button === 0 && (!o || o === "_self") && !fb(n);
}
const hb = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  mb = "6";
try {
  window.__reactRouterVersion = mb;
} catch {}
const gb = "startTransition",
  jp = ih[gb];
function yb(n) {
  let { basename: o, children: s, future: l, window: a } = n,
    c = b.useRef();
  c.current == null && (c.current = w2({ window: a, v5Compat: !0 }));
  let f = c.current,
    [p, m] = b.useState({ action: f.action, location: f.location }),
    { v7_startTransition: g } = l || {},
    v = b.useCallback(
      (w) => {
        g && jp ? jp(() => m(w)) : m(w);
      },
      [m, g],
    );
  return (
    b.useLayoutEffect(() => f.listen(v), [f, v]),
    b.useEffect(() => ab(l), [l]),
    b.createElement(ub, {
      basename: o,
      children: s,
      location: p.location,
      navigationType: p.action,
      navigator: f,
      future: l,
    })
  );
}
const vb =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  xb = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Vm = b.forwardRef(function (o, s) {
    let {
        onClick: l,
        relative: a,
        reloadDocument: c,
        replace: f,
        state: p,
        target: m,
        to: g,
        preventScrollReset: v,
        viewTransition: w,
      } = o,
      S = db(o, hb),
      { basename: x } = b.useContext(er),
      P,
      C = !1;
    if (typeof g == "string" && xb.test(g) && ((P = g), vb))
      try {
        let A = new URL(window.location.href),
          O = g.startsWith("//") ? new URL(A.protocol + g) : new URL(g),
          W = Xu(O.pathname, x);
        O.origin === A.origin && W != null
          ? (g = W + O.search + O.hash)
          : (C = !0);
      } catch {}
    let N = q2(g, { relative: a }),
      R = wb(g, {
        replace: f,
        state: p,
        target: m,
        preventScrollReset: v,
        relative: a,
        viewTransition: w,
      });
    function M(A) {
      (l && l(A), A.defaultPrevented || R(A));
    }
    return b.createElement(
      "a",
      Au({}, S, { href: P || N, onClick: C || c ? l : M, ref: s, target: m }),
    );
  });
var Tp;
(function (n) {
  ((n.UseScrollRestoration = "useScrollRestoration"),
    (n.UseSubmit = "useSubmit"),
    (n.UseSubmitFetcher = "useSubmitFetcher"),
    (n.UseFetcher = "useFetcher"),
    (n.useViewTransitionState = "useViewTransitionState"));
})(Tp || (Tp = {}));
var Rp;
(function (n) {
  ((n.UseFetcher = "useFetcher"),
    (n.UseFetchers = "useFetchers"),
    (n.UseScrollRestoration = "useScrollRestoration"));
})(Rp || (Rp = {}));
function wb(n, o) {
  let {
      target: s,
      replace: l,
      state: a,
      preventScrollReset: c,
      relative: f,
      viewTransition: p,
    } = o === void 0 ? {} : o,
    m = vr(),
    g = yr(),
    v = Fm(n, { relative: f });
  return b.useCallback(
    (w) => {
      if (pb(w, s)) {
        w.preventDefault();
        let S = l !== void 0 ? l : Fi(g) === Fi(v);
        m(n, {
          replace: S,
          state: a,
          preventScrollReset: c,
          relative: f,
          viewTransition: p,
        });
      }
    },
    [g, m, v, l, a, s, n, c, f, p],
  );
}
function bb() {
  const n = vr(),
    o = yr(),
    [s, l] = b.useState(!1),
    a = () => {
      (localStorage.removeItem("isLoggedIn"),
        localStorage.removeItem("qrConnected"),
        n("/"));
    },
    c = o.pathname.startsWith("/chat") || o.pathname === "/chats",
    f = o.pathname.startsWith("/crm");
  return h.jsx("header", {
    className: "border-b border-border bg-background",
    children: h.jsxs("div", {
      className: "px-4 py-3",
      children: [
        h.jsxs("div", {
          className: "flex items-center justify-between gap-2 mb-3",
          children: [
            h.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                h.jsx("div", {
                  className:
                    "flex h-10 w-10 items-center justify-center rounded-full bg-primary",
                  children: h.jsx(rn, {
                    className: "h-5 w-5 text-primary-foreground",
                  }),
                }),
                h.jsx("h1", {
                  className: "text-2xl font-bold text-foreground",
                  children: "WhatsApp",
                }),
              ],
            }),
            h.jsxs("div", {
              className: "flex items-center gap-2 relative",
              children: [
                h.jsx("button", {
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(l0, { className: "h-5 w-5 text-foreground" }),
                }),
                h.jsx("button", {
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(Ai, { className: "h-5 w-5 text-foreground" }),
                }),
                h.jsx("button", {
                  onClick: () => l(!s),
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(Ih, { className: "h-5 w-5 text-foreground" }),
                }),
                s &&
                  h.jsx("div", {
                    className:
                      "absolute right-0 top-12 w-40 rounded-lg border border-border bg-card shadow-lg z-50",
                    children: h.jsxs("button", {
                      onClick: a,
                      className:
                        "w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors",
                      children: [h.jsx(v0, { className: "h-4 w-4" }), "Logout"],
                    }),
                  }),
              ],
            }),
          ],
        }),
        h.jsxs("div", {
          className: "flex gap-4 border-t border-border pt-3",
          children: [
            h.jsxs("button", {
              onClick: () => n("/chats"),
              className: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${c ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`,
              children: [h.jsx(rn, { className: "h-4 w-4" }), "Messages"],
            }),
            h.jsxs("button", {
              onClick: () => n("/crm"),
              className: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${f ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`,
              children: [h.jsx(u0, { className: "h-4 w-4" }), "CRM"],
            }),
          ],
        }),
      ],
    }),
  });
}
function Sb({ children: n }) {
  return h.jsxs("div", {
    className: "flex h-screen flex-col bg-background",
    children: [
      h.jsx(bb, {}),
      h.jsx("div", { className: "flex flex-1 overflow-hidden", children: n }),
    ],
  });
}
function Cb() {
  const n = vr(),
    [o, s] = b.useState(""),
    [l, a] = b.useState(""),
    [c, f] = b.useState(!1),
    p = () => {
      (f(!0),
        setTimeout(() => {
          (localStorage.setItem("isLoggedIn", "true"), n("/qr"));
        }, 1e3));
    },
    m = (g) => {
      (g.preventDefault(),
        o &&
          l &&
          (f(!0),
          setTimeout(() => {
            (localStorage.setItem("isLoggedIn", "true"), n("/qr"));
          }, 1e3)));
    };
  return h.jsxs("div", {
    className:
      "flex h-screen w-full bg-gradient-to-br from-background via-background to-primary/10",
    children: [
      h.jsxs("div", {
        className:
          "hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background/50 p-12",
        children: [
          h.jsx("div", {
            className:
              "mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30",
            children: h.jsx("div", {
              className:
                "flex h-20 w-20 items-center justify-center rounded-full bg-primary",
              children: h.jsx(rn, {
                className: "h-10 w-10 text-primary-foreground",
              }),
            }),
          }),
          h.jsx("h1", {
            className: "mb-4 text-5xl font-bold text-foreground",
            children: "WhatsApp",
          }),
          h.jsx("p", {
            className: "text-center text-lg text-muted-foreground",
            children: "Simple. Reliable. Messaging",
          }),
          h.jsxs("div", {
            className: "mt-12 space-y-4",
            children: [
              h.jsxs("div", {
                className: "flex items-start gap-3",
                children: [
                  h.jsx("div", {
                    className:
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20",
                    children: h.jsx(rn, { className: "h-4 w-4 text-primary" }),
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("p", {
                        className: "font-semibold text-foreground",
                        children: "Instant Messaging",
                      }),
                      h.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Send messages instantly",
                      }),
                    ],
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "flex items-start gap-3",
                children: [
                  h.jsx("div", {
                    className:
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20",
                    children: h.jsx(rn, { className: "h-4 w-4 text-primary" }),
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("p", {
                        className: "font-semibold text-foreground",
                        children: "End-to-End Encrypted",
                      }),
                      h.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Your messages are private",
                      }),
                    ],
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "flex items-start gap-3",
                children: [
                  h.jsx("div", {
                    className:
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20",
                    children: h.jsx(rn, { className: "h-4 w-4 text-primary" }),
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("p", {
                        className: "font-semibold text-foreground",
                        children: "Free and Available",
                      }),
                      h.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "No charges for messaging",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      h.jsx("div", {
        className:
          "flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12",
        children: h.jsxs("div", {
          className: "w-full max-w-md",
          children: [
            h.jsxs("div", {
              className: "mb-8 flex lg:hidden flex-col items-center",
              children: [
                h.jsx("div", {
                  className:
                    "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary",
                  children: h.jsx(rn, {
                    className: "h-8 w-8 text-primary-foreground",
                  }),
                }),
                h.jsx("h1", {
                  className: "text-3xl font-bold text-foreground",
                  children: "WhatsApp",
                }),
              ],
            }),
            h.jsxs("div", {
              className: "mb-8 text-center",
              children: [
                h.jsx("h2", {
                  className: "mb-2 text-2xl font-bold text-foreground",
                  children: "Welcome Back",
                }),
                h.jsx("p", {
                  className: "text-muted-foreground",
                  children: "Sign in to your account to continue",
                }),
              ],
            }),
            h.jsxs("button", {
              onClick: p,
              disabled: c,
              className:
                "mb-6 w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50",
              children: [
                h.jsxs("svg", {
                  className: "h-5 w-5",
                  viewBox: "0 0 24 24",
                  children: [
                    h.jsx("path", {
                      fill: "currentColor",
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    }),
                    h.jsx("path", {
                      fill: "currentColor",
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    }),
                    h.jsx("path", {
                      fill: "currentColor",
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    }),
                    h.jsx("path", {
                      fill: "currentColor",
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    }),
                  ],
                }),
                c ? "Signing in..." : "Sign in with Google",
              ],
            }),
            h.jsxs("div", {
              className: "mb-6 flex items-center gap-4",
              children: [
                h.jsx("div", { className: "flex-1 border-t border-border" }),
                h.jsx("span", {
                  className: "text-xs text-muted-foreground",
                  children: "OR",
                }),
                h.jsx("div", { className: "flex-1 border-t border-border" }),
              ],
            }),
            h.jsxs("form", {
              onSubmit: m,
              className: "space-y-4",
              children: [
                h.jsxs("div", {
                  children: [
                    h.jsx("label", {
                      htmlFor: "email",
                      className:
                        "block text-sm font-medium text-foreground mb-2",
                      children: "Email Address",
                    }),
                    h.jsxs("div", {
                      className: "relative",
                      children: [
                        h.jsx(Jo, {
                          className:
                            "absolute left-3 top-3 h-5 w-5 text-muted-foreground",
                        }),
                        h.jsx("input", {
                          id: "email",
                          type: "email",
                          placeholder: "you@example.com",
                          value: o,
                          onChange: (g) => s(g.target.value),
                          className:
                            "w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsxs("div", {
                  children: [
                    h.jsx("label", {
                      htmlFor: "password",
                      className:
                        "block text-sm font-medium text-foreground mb-2",
                      children: "Password",
                    }),
                    h.jsxs("div", {
                      className: "relative",
                      children: [
                        h.jsx(g0, {
                          className:
                            "absolute left-3 top-3 h-5 w-5 text-muted-foreground",
                        }),
                        h.jsx("input", {
                          id: "password",
                          type: "password",
                          placeholder: "••••••••",
                          value: l,
                          onChange: (g) => a(g.target.value),
                          className:
                            "w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsx("button", {
                  type: "submit",
                  disabled: !o || !l || c,
                  className:
                    "w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50",
                  children: c ? "Signing in..." : "Sign in",
                }),
              ],
            }),
            h.jsxs("p", {
              className: "mt-6 text-center text-sm text-muted-foreground",
              children: [
                "Don't have an account?",
                " ",
                h.jsx("button", {
                  onClick: () => {
                    (localStorage.setItem("isLoggedIn", "true"), n("/qr"));
                  },
                  className: "font-medium text-primary hover:underline",
                  children: "Create one",
                }),
              ],
            }),
            h.jsx("div", {
              className:
                "mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground",
              children: h.jsx("p", {
                children: "By signing in, you agree to our Terms of Service",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
var Yr = {},
  $a,
  Mp;
function Eb() {
  return (
    Mp ||
      ((Mp = 1),
      ($a = function () {
        return (
          typeof Promise == "function" &&
          Promise.prototype &&
          Promise.prototype.then
        );
      })),
    $a
  );
}
var Qa = {},
  Qn = {},
  Ap;
function xr() {
  if (Ap) return Qn;
  Ap = 1;
  let n;
  const o = [
    0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
    733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
    2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
  ];
  return (
    (Qn.getSymbolSize = function (l) {
      if (!l) throw new Error('"version" cannot be null or undefined');
      if (l < 1 || l > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return l * 4 + 17;
    }),
    (Qn.getSymbolTotalCodewords = function (l) {
      return o[l];
    }),
    (Qn.getBCHDigit = function (s) {
      let l = 0;
      for (; s !== 0; ) (l++, (s >>>= 1));
      return l;
    }),
    (Qn.setToSJISFunction = function (l) {
      if (typeof l != "function")
        throw new Error('"toSJISFunc" is not a valid function.');
      n = l;
    }),
    (Qn.isKanjiModeEnabled = function () {
      return typeof n < "u";
    }),
    (Qn.toSJIS = function (l) {
      return n(l);
    }),
    Qn
  );
}
var qa = {},
  _p;
function nc() {
  return (
    _p ||
      ((_p = 1),
      (function (n) {
        ((n.L = { bit: 1 }),
          (n.M = { bit: 0 }),
          (n.Q = { bit: 3 }),
          (n.H = { bit: 2 }));
        function o(s) {
          if (typeof s != "string") throw new Error("Param is not a string");
          switch (s.toLowerCase()) {
            case "l":
            case "low":
              return n.L;
            case "m":
            case "medium":
              return n.M;
            case "q":
            case "quartile":
              return n.Q;
            case "h":
            case "high":
              return n.H;
            default:
              throw new Error("Unknown EC Level: " + s);
          }
        }
        ((n.isValid = function (l) {
          return l && typeof l.bit < "u" && l.bit >= 0 && l.bit < 4;
        }),
          (n.from = function (l, a) {
            if (n.isValid(l)) return l;
            try {
              return o(l);
            } catch {
              return a;
            }
          }));
      })(qa)),
    qa
  );
}
var Ka, Lp;
function Nb() {
  if (Lp) return Ka;
  Lp = 1;
  function n() {
    ((this.buffer = []), (this.length = 0));
  }
  return (
    (n.prototype = {
      get: function (o) {
        const s = Math.floor(o / 8);
        return ((this.buffer[s] >>> (7 - (o % 8))) & 1) === 1;
      },
      put: function (o, s) {
        for (let l = 0; l < s; l++)
          this.putBit(((o >>> (s - l - 1)) & 1) === 1);
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (o) {
        const s = Math.floor(this.length / 8);
        (this.buffer.length <= s && this.buffer.push(0),
          o && (this.buffer[s] |= 128 >>> this.length % 8),
          this.length++);
      },
    }),
    (Ka = n),
    Ka
  );
}
var Ya, Op;
function kb() {
  if (Op) return Ya;
  Op = 1;
  function n(o) {
    if (!o || o < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    ((this.size = o),
      (this.data = new Uint8Array(o * o)),
      (this.reservedBit = new Uint8Array(o * o)));
  }
  return (
    (n.prototype.set = function (o, s, l, a) {
      const c = o * this.size + s;
      ((this.data[c] = l), a && (this.reservedBit[c] = !0));
    }),
    (n.prototype.get = function (o, s) {
      return this.data[o * this.size + s];
    }),
    (n.prototype.xor = function (o, s, l) {
      this.data[o * this.size + s] ^= l;
    }),
    (n.prototype.isReserved = function (o, s) {
      return this.reservedBit[o * this.size + s];
    }),
    (Ya = n),
    Ya
  );
}
var Ga = {},
  Ip;
function Pb() {
  return (
    Ip ||
      ((Ip = 1),
      (function (n) {
        const o = xr().getSymbolSize;
        ((n.getRowColCoords = function (l) {
          if (l === 1) return [];
          const a = Math.floor(l / 7) + 2,
            c = o(l),
            f = c === 145 ? 26 : Math.ceil((c - 13) / (2 * a - 2)) * 2,
            p = [c - 7];
          for (let m = 1; m < a - 1; m++) p[m] = p[m - 1] - f;
          return (p.push(6), p.reverse());
        }),
          (n.getPositions = function (l) {
            const a = [],
              c = n.getRowColCoords(l),
              f = c.length;
            for (let p = 0; p < f; p++)
              for (let m = 0; m < f; m++)
                (p === 0 && m === 0) ||
                  (p === 0 && m === f - 1) ||
                  (p === f - 1 && m === 0) ||
                  a.push([c[p], c[m]]);
            return a;
          }));
      })(Ga)),
    Ga
  );
}
var Ja = {},
  Dp;
function jb() {
  if (Dp) return Ja;
  Dp = 1;
  const n = xr().getSymbolSize,
    o = 7;
  return (
    (Ja.getPositions = function (l) {
      const a = n(l);
      return [
        [0, 0],
        [a - o, 0],
        [0, a - o],
      ];
    }),
    Ja
  );
}
var Xa = {},
  Fp;
function Tb() {
  return (
    Fp ||
      ((Fp = 1),
      (function (n) {
        n.Patterns = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7,
        };
        const o = { N1: 3, N2: 3, N3: 40, N4: 10 };
        ((n.isValid = function (a) {
          return a != null && a !== "" && !isNaN(a) && a >= 0 && a <= 7;
        }),
          (n.from = function (a) {
            return n.isValid(a) ? parseInt(a, 10) : void 0;
          }),
          (n.getPenaltyN1 = function (a) {
            const c = a.size;
            let f = 0,
              p = 0,
              m = 0,
              g = null,
              v = null;
            for (let w = 0; w < c; w++) {
              ((p = m = 0), (g = v = null));
              for (let S = 0; S < c; S++) {
                let x = a.get(w, S);
                (x === g
                  ? p++
                  : (p >= 5 && (f += o.N1 + (p - 5)), (g = x), (p = 1)),
                  (x = a.get(S, w)),
                  x === v
                    ? m++
                    : (m >= 5 && (f += o.N1 + (m - 5)), (v = x), (m = 1)));
              }
              (p >= 5 && (f += o.N1 + (p - 5)),
                m >= 5 && (f += o.N1 + (m - 5)));
            }
            return f;
          }),
          (n.getPenaltyN2 = function (a) {
            const c = a.size;
            let f = 0;
            for (let p = 0; p < c - 1; p++)
              for (let m = 0; m < c - 1; m++) {
                const g =
                  a.get(p, m) +
                  a.get(p, m + 1) +
                  a.get(p + 1, m) +
                  a.get(p + 1, m + 1);
                (g === 4 || g === 0) && f++;
              }
            return f * o.N2;
          }),
          (n.getPenaltyN3 = function (a) {
            const c = a.size;
            let f = 0,
              p = 0,
              m = 0;
            for (let g = 0; g < c; g++) {
              p = m = 0;
              for (let v = 0; v < c; v++)
                ((p = ((p << 1) & 2047) | a.get(g, v)),
                  v >= 10 && (p === 1488 || p === 93) && f++,
                  (m = ((m << 1) & 2047) | a.get(v, g)),
                  v >= 10 && (m === 1488 || m === 93) && f++);
            }
            return f * o.N3;
          }),
          (n.getPenaltyN4 = function (a) {
            let c = 0;
            const f = a.data.length;
            for (let m = 0; m < f; m++) c += a.data[m];
            return Math.abs(Math.ceil((c * 100) / f / 5) - 10) * o.N4;
          }));
        function s(l, a, c) {
          switch (l) {
            case n.Patterns.PATTERN000:
              return (a + c) % 2 === 0;
            case n.Patterns.PATTERN001:
              return a % 2 === 0;
            case n.Patterns.PATTERN010:
              return c % 3 === 0;
            case n.Patterns.PATTERN011:
              return (a + c) % 3 === 0;
            case n.Patterns.PATTERN100:
              return (Math.floor(a / 2) + Math.floor(c / 3)) % 2 === 0;
            case n.Patterns.PATTERN101:
              return ((a * c) % 2) + ((a * c) % 3) === 0;
            case n.Patterns.PATTERN110:
              return (((a * c) % 2) + ((a * c) % 3)) % 2 === 0;
            case n.Patterns.PATTERN111:
              return (((a * c) % 3) + ((a + c) % 2)) % 2 === 0;
            default:
              throw new Error("bad maskPattern:" + l);
          }
        }
        ((n.applyMask = function (a, c) {
          const f = c.size;
          for (let p = 0; p < f; p++)
            for (let m = 0; m < f; m++)
              c.isReserved(m, p) || c.xor(m, p, s(a, m, p));
        }),
          (n.getBestMask = function (a, c) {
            const f = Object.keys(n.Patterns).length;
            let p = 0,
              m = 1 / 0;
            for (let g = 0; g < f; g++) {
              (c(g), n.applyMask(g, a));
              const v =
                n.getPenaltyN1(a) +
                n.getPenaltyN2(a) +
                n.getPenaltyN3(a) +
                n.getPenaltyN4(a);
              (n.applyMask(g, a), v < m && ((m = v), (p = g)));
            }
            return p;
          }));
      })(Xa)),
    Xa
  );
}
var Pi = {},
  zp;
function Hm() {
  if (zp) return Pi;
  zp = 1;
  const n = nc(),
    o = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
    ],
    s = [
      7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
      88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160,
      192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
      288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168,
      308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700,
      224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810,
      960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390,
      728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868,
      1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
      1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100,
      660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
    ];
  return (
    (Pi.getBlocksCount = function (a, c) {
      switch (c) {
        case n.L:
          return o[(a - 1) * 4 + 0];
        case n.M:
          return o[(a - 1) * 4 + 1];
        case n.Q:
          return o[(a - 1) * 4 + 2];
        case n.H:
          return o[(a - 1) * 4 + 3];
        default:
          return;
      }
    }),
    (Pi.getTotalCodewordsCount = function (a, c) {
      switch (c) {
        case n.L:
          return s[(a - 1) * 4 + 0];
        case n.M:
          return s[(a - 1) * 4 + 1];
        case n.Q:
          return s[(a - 1) * 4 + 2];
        case n.H:
          return s[(a - 1) * 4 + 3];
        default:
          return;
      }
    }),
    Pi
  );
}
var Za = {},
  Yo = {},
  Bp;
function Rb() {
  if (Bp) return Yo;
  Bp = 1;
  const n = new Uint8Array(512),
    o = new Uint8Array(256);
  return (
    (function () {
      let l = 1;
      for (let a = 0; a < 255; a++)
        ((n[a] = l), (o[l] = a), (l <<= 1), l & 256 && (l ^= 285));
      for (let a = 255; a < 512; a++) n[a] = n[a - 255];
    })(),
    (Yo.log = function (l) {
      if (l < 1) throw new Error("log(" + l + ")");
      return o[l];
    }),
    (Yo.exp = function (l) {
      return n[l];
    }),
    (Yo.mul = function (l, a) {
      return l === 0 || a === 0 ? 0 : n[o[l] + o[a]];
    }),
    Yo
  );
}
var Up;
function Mb() {
  return (
    Up ||
      ((Up = 1),
      (function (n) {
        const o = Rb();
        ((n.mul = function (l, a) {
          const c = new Uint8Array(l.length + a.length - 1);
          for (let f = 0; f < l.length; f++)
            for (let p = 0; p < a.length; p++) c[f + p] ^= o.mul(l[f], a[p]);
          return c;
        }),
          (n.mod = function (l, a) {
            let c = new Uint8Array(l);
            for (; c.length - a.length >= 0; ) {
              const f = c[0];
              for (let m = 0; m < a.length; m++) c[m] ^= o.mul(a[m], f);
              let p = 0;
              for (; p < c.length && c[p] === 0; ) p++;
              c = c.slice(p);
            }
            return c;
          }),
          (n.generateECPolynomial = function (l) {
            let a = new Uint8Array([1]);
            for (let c = 0; c < l; c++)
              a = n.mul(a, new Uint8Array([1, o.exp(c)]));
            return a;
          }));
      })(Za)),
    Za
  );
}
var eu, Vp;
function Ab() {
  if (Vp) return eu;
  Vp = 1;
  const n = Mb();
  function o(s) {
    ((this.genPoly = void 0),
      (this.degree = s),
      this.degree && this.initialize(this.degree));
  }
  return (
    (o.prototype.initialize = function (l) {
      ((this.degree = l), (this.genPoly = n.generateECPolynomial(this.degree)));
    }),
    (o.prototype.encode = function (l) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      const a = new Uint8Array(l.length + this.degree);
      a.set(l);
      const c = n.mod(a, this.genPoly),
        f = this.degree - c.length;
      if (f > 0) {
        const p = new Uint8Array(this.degree);
        return (p.set(c, f), p);
      }
      return c;
    }),
    (eu = o),
    eu
  );
}
var tu = {},
  nu = {},
  ru = {},
  Hp;
function Wm() {
  return (
    Hp ||
      ((Hp = 1),
      (ru.isValid = function (o) {
        return !isNaN(o) && o >= 1 && o <= 40;
      })),
    ru
  );
}
var nn = {},
  Wp;
function $m() {
  if (Wp) return nn;
  Wp = 1;
  const n = "[0-9]+",
    o = "[A-Z $%*+\\-./:]+";
  let s =
    "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  s = s.replace(/u/g, "\\u");
  const l =
    "(?:(?![A-Z0-9 $%*+\\-./:]|" +
    s +
    `)(?:.|[\r
]))+`;
  ((nn.KANJI = new RegExp(s, "g")),
    (nn.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
    (nn.BYTE = new RegExp(l, "g")),
    (nn.NUMERIC = new RegExp(n, "g")),
    (nn.ALPHANUMERIC = new RegExp(o, "g")));
  const a = new RegExp("^" + s + "$"),
    c = new RegExp("^" + n + "$"),
    f = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return (
    (nn.testKanji = function (m) {
      return a.test(m);
    }),
    (nn.testNumeric = function (m) {
      return c.test(m);
    }),
    (nn.testAlphanumeric = function (m) {
      return f.test(m);
    }),
    nn
  );
}
var $p;
function wr() {
  return (
    $p ||
      (($p = 1),
      (function (n) {
        const o = Wm(),
          s = $m();
        ((n.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
          (n.ALPHANUMERIC = {
            id: "Alphanumeric",
            bit: 2,
            ccBits: [9, 11, 13],
          }),
          (n.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
          (n.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
          (n.MIXED = { bit: -1 }),
          (n.getCharCountIndicator = function (c, f) {
            if (!c.ccBits) throw new Error("Invalid mode: " + c);
            if (!o.isValid(f)) throw new Error("Invalid version: " + f);
            return f >= 1 && f < 10
              ? c.ccBits[0]
              : f < 27
                ? c.ccBits[1]
                : c.ccBits[2];
          }),
          (n.getBestModeForData = function (c) {
            return s.testNumeric(c)
              ? n.NUMERIC
              : s.testAlphanumeric(c)
                ? n.ALPHANUMERIC
                : s.testKanji(c)
                  ? n.KANJI
                  : n.BYTE;
          }),
          (n.toString = function (c) {
            if (c && c.id) return c.id;
            throw new Error("Invalid mode");
          }),
          (n.isValid = function (c) {
            return c && c.bit && c.ccBits;
          }));
        function l(a) {
          if (typeof a != "string") throw new Error("Param is not a string");
          switch (a.toLowerCase()) {
            case "numeric":
              return n.NUMERIC;
            case "alphanumeric":
              return n.ALPHANUMERIC;
            case "kanji":
              return n.KANJI;
            case "byte":
              return n.BYTE;
            default:
              throw new Error("Unknown mode: " + a);
          }
        }
        n.from = function (c, f) {
          if (n.isValid(c)) return c;
          try {
            return l(c);
          } catch {
            return f;
          }
        };
      })(nu)),
    nu
  );
}
var Qp;
function _b() {
  return (
    Qp ||
      ((Qp = 1),
      (function (n) {
        const o = xr(),
          s = Hm(),
          l = nc(),
          a = wr(),
          c = Wm(),
          f = 7973,
          p = o.getBCHDigit(f);
        function m(S, x, P) {
          for (let C = 1; C <= 40; C++)
            if (x <= n.getCapacity(C, P, S)) return C;
        }
        function g(S, x) {
          return a.getCharCountIndicator(S, x) + 4;
        }
        function v(S, x) {
          let P = 0;
          return (
            S.forEach(function (C) {
              const N = g(C.mode, x);
              P += N + C.getBitsLength();
            }),
            P
          );
        }
        function w(S, x) {
          for (let P = 1; P <= 40; P++)
            if (v(S, P) <= n.getCapacity(P, x, a.MIXED)) return P;
        }
        ((n.from = function (x, P) {
          return c.isValid(x) ? parseInt(x, 10) : P;
        }),
          (n.getCapacity = function (x, P, C) {
            if (!c.isValid(x)) throw new Error("Invalid QR Code version");
            typeof C > "u" && (C = a.BYTE);
            const N = o.getSymbolTotalCodewords(x),
              R = s.getTotalCodewordsCount(x, P),
              M = (N - R) * 8;
            if (C === a.MIXED) return M;
            const A = M - g(C, x);
            switch (C) {
              case a.NUMERIC:
                return Math.floor((A / 10) * 3);
              case a.ALPHANUMERIC:
                return Math.floor((A / 11) * 2);
              case a.KANJI:
                return Math.floor(A / 13);
              case a.BYTE:
              default:
                return Math.floor(A / 8);
            }
          }),
          (n.getBestVersionForData = function (x, P) {
            let C;
            const N = l.from(P, l.M);
            if (Array.isArray(x)) {
              if (x.length > 1) return w(x, N);
              if (x.length === 0) return 1;
              C = x[0];
            } else C = x;
            return m(C.mode, C.getLength(), N);
          }),
          (n.getEncodedBits = function (x) {
            if (!c.isValid(x) || x < 7)
              throw new Error("Invalid QR Code version");
            let P = x << 12;
            for (; o.getBCHDigit(P) - p >= 0; )
              P ^= f << (o.getBCHDigit(P) - p);
            return (x << 12) | P;
          }));
      })(tu)),
    tu
  );
}
var ou = {},
  qp;
function Lb() {
  if (qp) return ou;
  qp = 1;
  const n = xr(),
    o = 1335,
    s = 21522,
    l = n.getBCHDigit(o);
  return (
    (ou.getEncodedBits = function (c, f) {
      const p = (c.bit << 3) | f;
      let m = p << 10;
      for (; n.getBCHDigit(m) - l >= 0; ) m ^= o << (n.getBCHDigit(m) - l);
      return ((p << 10) | m) ^ s;
    }),
    ou
  );
}
var su = {},
  iu,
  Kp;
function Ob() {
  if (Kp) return iu;
  Kp = 1;
  const n = wr();
  function o(s) {
    ((this.mode = n.NUMERIC), (this.data = s.toString()));
  }
  return (
    (o.getBitsLength = function (l) {
      return 10 * Math.floor(l / 3) + (l % 3 ? (l % 3) * 3 + 1 : 0);
    }),
    (o.prototype.getLength = function () {
      return this.data.length;
    }),
    (o.prototype.getBitsLength = function () {
      return o.getBitsLength(this.data.length);
    }),
    (o.prototype.write = function (l) {
      let a, c, f;
      for (a = 0; a + 3 <= this.data.length; a += 3)
        ((c = this.data.substr(a, 3)), (f = parseInt(c, 10)), l.put(f, 10));
      const p = this.data.length - a;
      p > 0 &&
        ((c = this.data.substr(a)), (f = parseInt(c, 10)), l.put(f, p * 3 + 1));
    }),
    (iu = o),
    iu
  );
}
var lu, Yp;
function Ib() {
  if (Yp) return lu;
  Yp = 1;
  const n = wr(),
    o = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":",
    ];
  function s(l) {
    ((this.mode = n.ALPHANUMERIC), (this.data = l));
  }
  return (
    (s.getBitsLength = function (a) {
      return 11 * Math.floor(a / 2) + 6 * (a % 2);
    }),
    (s.prototype.getLength = function () {
      return this.data.length;
    }),
    (s.prototype.getBitsLength = function () {
      return s.getBitsLength(this.data.length);
    }),
    (s.prototype.write = function (a) {
      let c;
      for (c = 0; c + 2 <= this.data.length; c += 2) {
        let f = o.indexOf(this.data[c]) * 45;
        ((f += o.indexOf(this.data[c + 1])), a.put(f, 11));
      }
      this.data.length % 2 && a.put(o.indexOf(this.data[c]), 6);
    }),
    (lu = s),
    lu
  );
}
var au, Gp;
function Db() {
  if (Gp) return au;
  Gp = 1;
  const n = wr();
  function o(s) {
    ((this.mode = n.BYTE),
      typeof s == "string"
        ? (this.data = new TextEncoder().encode(s))
        : (this.data = new Uint8Array(s)));
  }
  return (
    (o.getBitsLength = function (l) {
      return l * 8;
    }),
    (o.prototype.getLength = function () {
      return this.data.length;
    }),
    (o.prototype.getBitsLength = function () {
      return o.getBitsLength(this.data.length);
    }),
    (o.prototype.write = function (s) {
      for (let l = 0, a = this.data.length; l < a; l++) s.put(this.data[l], 8);
    }),
    (au = o),
    au
  );
}
var uu, Jp;
function Fb() {
  if (Jp) return uu;
  Jp = 1;
  const n = wr(),
    o = xr();
  function s(l) {
    ((this.mode = n.KANJI), (this.data = l));
  }
  return (
    (s.getBitsLength = function (a) {
      return a * 13;
    }),
    (s.prototype.getLength = function () {
      return this.data.length;
    }),
    (s.prototype.getBitsLength = function () {
      return s.getBitsLength(this.data.length);
    }),
    (s.prototype.write = function (l) {
      let a;
      for (a = 0; a < this.data.length; a++) {
        let c = o.toSJIS(this.data[a]);
        if (c >= 33088 && c <= 40956) c -= 33088;
        else if (c >= 57408 && c <= 60351) c -= 49472;
        else
          throw new Error(
            "Invalid SJIS character: " +
              this.data[a] +
              `
Make sure your charset is UTF-8`,
          );
        ((c = ((c >>> 8) & 255) * 192 + (c & 255)), l.put(c, 13));
      }
    }),
    (uu = s),
    uu
  );
}
var cu = { exports: {} },
  Xp;
function zb() {
  return (
    Xp ||
      ((Xp = 1),
      (function (n) {
        var o = {
          single_source_shortest_paths: function (s, l, a) {
            var c = {},
              f = {};
            f[l] = 0;
            var p = o.PriorityQueue.make();
            p.push(l, 0);
            for (var m, g, v, w, S, x, P, C, N; !p.empty(); ) {
              ((m = p.pop()), (g = m.value), (w = m.cost), (S = s[g] || {}));
              for (v in S)
                S.hasOwnProperty(v) &&
                  ((x = S[v]),
                  (P = w + x),
                  (C = f[v]),
                  (N = typeof f[v] > "u"),
                  (N || C > P) && ((f[v] = P), p.push(v, P), (c[v] = g)));
            }
            if (typeof a < "u" && typeof f[a] > "u") {
              var R = ["Could not find a path from ", l, " to ", a, "."].join(
                "",
              );
              throw new Error(R);
            }
            return c;
          },
          extract_shortest_path_from_predecessor_list: function (s, l) {
            for (var a = [], c = l; c; ) (a.push(c), s[c], (c = s[c]));
            return (a.reverse(), a);
          },
          find_path: function (s, l, a) {
            var c = o.single_source_shortest_paths(s, l, a);
            return o.extract_shortest_path_from_predecessor_list(c, a);
          },
          PriorityQueue: {
            make: function (s) {
              var l = o.PriorityQueue,
                a = {},
                c;
              s = s || {};
              for (c in l) l.hasOwnProperty(c) && (a[c] = l[c]);
              return (
                (a.queue = []),
                (a.sorter = s.sorter || l.default_sorter),
                a
              );
            },
            default_sorter: function (s, l) {
              return s.cost - l.cost;
            },
            push: function (s, l) {
              var a = { value: s, cost: l };
              (this.queue.push(a), this.queue.sort(this.sorter));
            },
            pop: function () {
              return this.queue.shift();
            },
            empty: function () {
              return this.queue.length === 0;
            },
          },
        };
        n.exports = o;
      })(cu)),
    cu.exports
  );
}
var Zp;
function Bb() {
  return (
    Zp ||
      ((Zp = 1),
      (function (n) {
        const o = wr(),
          s = Ob(),
          l = Ib(),
          a = Db(),
          c = Fb(),
          f = $m(),
          p = xr(),
          m = zb();
        function g(R) {
          return unescape(encodeURIComponent(R)).length;
        }
        function v(R, M, A) {
          const O = [];
          let W;
          for (; (W = R.exec(A)) !== null; )
            O.push({
              data: W[0],
              index: W.index,
              mode: M,
              length: W[0].length,
            });
          return O;
        }
        function w(R) {
          const M = v(f.NUMERIC, o.NUMERIC, R),
            A = v(f.ALPHANUMERIC, o.ALPHANUMERIC, R);
          let O, W;
          return (
            p.isKanjiModeEnabled()
              ? ((O = v(f.BYTE, o.BYTE, R)), (W = v(f.KANJI, o.KANJI, R)))
              : ((O = v(f.BYTE_KANJI, o.BYTE, R)), (W = [])),
            M.concat(A, O, W)
              .sort(function (B, Y) {
                return B.index - Y.index;
              })
              .map(function (B) {
                return { data: B.data, mode: B.mode, length: B.length };
              })
          );
        }
        function S(R, M) {
          switch (M) {
            case o.NUMERIC:
              return s.getBitsLength(R);
            case o.ALPHANUMERIC:
              return l.getBitsLength(R);
            case o.KANJI:
              return c.getBitsLength(R);
            case o.BYTE:
              return a.getBitsLength(R);
          }
        }
        function x(R) {
          return R.reduce(function (M, A) {
            const O = M.length - 1 >= 0 ? M[M.length - 1] : null;
            return O && O.mode === A.mode
              ? ((M[M.length - 1].data += A.data), M)
              : (M.push(A), M);
          }, []);
        }
        function P(R) {
          const M = [];
          for (let A = 0; A < R.length; A++) {
            const O = R[A];
            switch (O.mode) {
              case o.NUMERIC:
                M.push([
                  O,
                  { data: O.data, mode: o.ALPHANUMERIC, length: O.length },
                  { data: O.data, mode: o.BYTE, length: O.length },
                ]);
                break;
              case o.ALPHANUMERIC:
                M.push([O, { data: O.data, mode: o.BYTE, length: O.length }]);
                break;
              case o.KANJI:
                M.push([O, { data: O.data, mode: o.BYTE, length: g(O.data) }]);
                break;
              case o.BYTE:
                M.push([{ data: O.data, mode: o.BYTE, length: g(O.data) }]);
            }
          }
          return M;
        }
        function C(R, M) {
          const A = {},
            O = { start: {} };
          let W = ["start"];
          for (let F = 0; F < R.length; F++) {
            const B = R[F],
              Y = [];
            for (let K = 0; K < B.length; K++) {
              const X = B[K],
                Z = "" + F + K;
              (Y.push(Z), (A[Z] = { node: X, lastCount: 0 }), (O[Z] = {}));
              for (let V = 0; V < W.length; V++) {
                const J = W[V];
                A[J] && A[J].node.mode === X.mode
                  ? ((O[J][Z] =
                      S(A[J].lastCount + X.length, X.mode) -
                      S(A[J].lastCount, X.mode)),
                    (A[J].lastCount += X.length))
                  : (A[J] && (A[J].lastCount = X.length),
                    (O[J][Z] =
                      S(X.length, X.mode) +
                      4 +
                      o.getCharCountIndicator(X.mode, M)));
              }
            }
            W = Y;
          }
          for (let F = 0; F < W.length; F++) O[W[F]].end = 0;
          return { map: O, table: A };
        }
        function N(R, M) {
          let A;
          const O = o.getBestModeForData(R);
          if (((A = o.from(M, O)), A !== o.BYTE && A.bit < O.bit))
            throw new Error(
              '"' +
                R +
                '" cannot be encoded with mode ' +
                o.toString(A) +
                `.
 Suggested mode is: ` +
                o.toString(O),
            );
          switch (
            (A === o.KANJI && !p.isKanjiModeEnabled() && (A = o.BYTE), A)
          ) {
            case o.NUMERIC:
              return new s(R);
            case o.ALPHANUMERIC:
              return new l(R);
            case o.KANJI:
              return new c(R);
            case o.BYTE:
              return new a(R);
          }
        }
        ((n.fromArray = function (M) {
          return M.reduce(function (A, O) {
            return (
              typeof O == "string"
                ? A.push(N(O, null))
                : O.data && A.push(N(O.data, O.mode)),
              A
            );
          }, []);
        }),
          (n.fromString = function (M, A) {
            const O = w(M, p.isKanjiModeEnabled()),
              W = P(O),
              F = C(W, A),
              B = m.find_path(F.map, "start", "end"),
              Y = [];
            for (let K = 1; K < B.length - 1; K++) Y.push(F.table[B[K]].node);
            return n.fromArray(x(Y));
          }),
          (n.rawSplit = function (M) {
            return n.fromArray(w(M, p.isKanjiModeEnabled()));
          }));
      })(su)),
    su
  );
}
var eh;
function Ub() {
  if (eh) return Qa;
  eh = 1;
  const n = xr(),
    o = nc(),
    s = Nb(),
    l = kb(),
    a = Pb(),
    c = jb(),
    f = Tb(),
    p = Hm(),
    m = Ab(),
    g = _b(),
    v = Lb(),
    w = wr(),
    S = Bb();
  function x(F, B) {
    const Y = F.size,
      K = c.getPositions(B);
    for (let X = 0; X < K.length; X++) {
      const Z = K[X][0],
        V = K[X][1];
      for (let J = -1; J <= 7; J++)
        if (!(Z + J <= -1 || Y <= Z + J))
          for (let U = -1; U <= 7; U++)
            V + U <= -1 ||
              Y <= V + U ||
              ((J >= 0 && J <= 6 && (U === 0 || U === 6)) ||
              (U >= 0 && U <= 6 && (J === 0 || J === 6)) ||
              (J >= 2 && J <= 4 && U >= 2 && U <= 4)
                ? F.set(Z + J, V + U, !0, !0)
                : F.set(Z + J, V + U, !1, !0));
    }
  }
  function P(F) {
    const B = F.size;
    for (let Y = 8; Y < B - 8; Y++) {
      const K = Y % 2 === 0;
      (F.set(Y, 6, K, !0), F.set(6, Y, K, !0));
    }
  }
  function C(F, B) {
    const Y = a.getPositions(B);
    for (let K = 0; K < Y.length; K++) {
      const X = Y[K][0],
        Z = Y[K][1];
      for (let V = -2; V <= 2; V++)
        for (let J = -2; J <= 2; J++)
          V === -2 || V === 2 || J === -2 || J === 2 || (V === 0 && J === 0)
            ? F.set(X + V, Z + J, !0, !0)
            : F.set(X + V, Z + J, !1, !0);
    }
  }
  function N(F, B) {
    const Y = F.size,
      K = g.getEncodedBits(B);
    let X, Z, V;
    for (let J = 0; J < 18; J++)
      ((X = Math.floor(J / 3)),
        (Z = (J % 3) + Y - 8 - 3),
        (V = ((K >> J) & 1) === 1),
        F.set(X, Z, V, !0),
        F.set(Z, X, V, !0));
  }
  function R(F, B, Y) {
    const K = F.size,
      X = v.getEncodedBits(B, Y);
    let Z, V;
    for (Z = 0; Z < 15; Z++)
      ((V = ((X >> Z) & 1) === 1),
        Z < 6
          ? F.set(Z, 8, V, !0)
          : Z < 8
            ? F.set(Z + 1, 8, V, !0)
            : F.set(K - 15 + Z, 8, V, !0),
        Z < 8
          ? F.set(8, K - Z - 1, V, !0)
          : Z < 9
            ? F.set(8, 15 - Z - 1 + 1, V, !0)
            : F.set(8, 15 - Z - 1, V, !0));
    F.set(K - 8, 8, 1, !0);
  }
  function M(F, B) {
    const Y = F.size;
    let K = -1,
      X = Y - 1,
      Z = 7,
      V = 0;
    for (let J = Y - 1; J > 0; J -= 2)
      for (J === 6 && J--; ; ) {
        for (let U = 0; U < 2; U++)
          if (!F.isReserved(X, J - U)) {
            let me = !1;
            (V < B.length && (me = ((B[V] >>> Z) & 1) === 1),
              F.set(X, J - U, me),
              Z--,
              Z === -1 && (V++, (Z = 7)));
          }
        if (((X += K), X < 0 || Y <= X)) {
          ((X -= K), (K = -K));
          break;
        }
      }
  }
  function A(F, B, Y) {
    const K = new s();
    Y.forEach(function (U) {
      (K.put(U.mode.bit, 4),
        K.put(U.getLength(), w.getCharCountIndicator(U.mode, F)),
        U.write(K));
    });
    const X = n.getSymbolTotalCodewords(F),
      Z = p.getTotalCodewordsCount(F, B),
      V = (X - Z) * 8;
    for (
      K.getLengthInBits() + 4 <= V && K.put(0, 4);
      K.getLengthInBits() % 8 !== 0;

    )
      K.putBit(0);
    const J = (V - K.getLengthInBits()) / 8;
    for (let U = 0; U < J; U++) K.put(U % 2 ? 17 : 236, 8);
    return O(K, F, B);
  }
  function O(F, B, Y) {
    const K = n.getSymbolTotalCodewords(B),
      X = p.getTotalCodewordsCount(B, Y),
      Z = K - X,
      V = p.getBlocksCount(B, Y),
      J = K % V,
      U = V - J,
      me = Math.floor(K / V),
      ue = Math.floor(Z / V),
      ae = ue + 1,
      z = me - ue,
      H = new m(z);
    let q = 0;
    const j = new Array(V),
      D = new Array(V);
    let ne = 0;
    const oe = new Uint8Array(F.buffer);
    for (let be = 0; be < V; be++) {
      const Ae = be < U ? ue : ae;
      ((j[be] = oe.slice(q, q + Ae)),
        (D[be] = H.encode(j[be])),
        (q += Ae),
        (ne = Math.max(ne, Ae)));
    }
    const fe = new Uint8Array(K);
    let xe = 0,
      ie,
      ye;
    for (ie = 0; ie < ne; ie++)
      for (ye = 0; ye < V; ye++) ie < j[ye].length && (fe[xe++] = j[ye][ie]);
    for (ie = 0; ie < z; ie++) for (ye = 0; ye < V; ye++) fe[xe++] = D[ye][ie];
    return fe;
  }
  function W(F, B, Y, K) {
    let X;
    if (Array.isArray(F)) X = S.fromArray(F);
    else if (typeof F == "string") {
      let me = B;
      if (!me) {
        const ue = S.rawSplit(F);
        me = g.getBestVersionForData(ue, Y);
      }
      X = S.fromString(F, me || 40);
    } else throw new Error("Invalid data");
    const Z = g.getBestVersionForData(X, Y);
    if (!Z)
      throw new Error(
        "The amount of data is too big to be stored in a QR Code",
      );
    if (!B) B = Z;
    else if (B < Z)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
          Z +
          `.
`,
      );
    const V = A(B, Y, X),
      J = n.getSymbolSize(B),
      U = new l(J);
    return (
      x(U, B),
      P(U),
      C(U, B),
      R(U, Y, 0),
      B >= 7 && N(U, B),
      M(U, V),
      isNaN(K) && (K = f.getBestMask(U, R.bind(null, U, Y))),
      f.applyMask(K, U),
      R(U, Y, K),
      {
        modules: U,
        version: B,
        errorCorrectionLevel: Y,
        maskPattern: K,
        segments: X,
      }
    );
  }
  return (
    (Qa.create = function (B, Y) {
      if (typeof B > "u" || B === "") throw new Error("No input text");
      let K = o.M,
        X,
        Z;
      return (
        typeof Y < "u" &&
          ((K = o.from(Y.errorCorrectionLevel, o.M)),
          (X = g.from(Y.version)),
          (Z = f.from(Y.maskPattern)),
          Y.toSJISFunc && n.setToSJISFunction(Y.toSJISFunc)),
        W(B, X, K, Z)
      );
    }),
    Qa
  );
}
var du = {},
  fu = {},
  th;
function Qm() {
  return (
    th ||
      ((th = 1),
      (function (n) {
        function o(s) {
          if (
            (typeof s == "number" && (s = s.toString()), typeof s != "string")
          )
            throw new Error("Color should be defined as hex string");
          let l = s.slice().replace("#", "").split("");
          if (l.length < 3 || l.length === 5 || l.length > 8)
            throw new Error("Invalid hex color: " + s);
          ((l.length === 3 || l.length === 4) &&
            (l = Array.prototype.concat.apply(
              [],
              l.map(function (c) {
                return [c, c];
              }),
            )),
            l.length === 6 && l.push("F", "F"));
          const a = parseInt(l.join(""), 16);
          return {
            r: (a >> 24) & 255,
            g: (a >> 16) & 255,
            b: (a >> 8) & 255,
            a: a & 255,
            hex: "#" + l.slice(0, 6).join(""),
          };
        }
        ((n.getOptions = function (l) {
          (l || (l = {}), l.color || (l.color = {}));
          const a =
              typeof l.margin > "u" || l.margin === null || l.margin < 0
                ? 4
                : l.margin,
            c = l.width && l.width >= 21 ? l.width : void 0,
            f = l.scale || 4;
          return {
            width: c,
            scale: c ? 4 : f,
            margin: a,
            color: {
              dark: o(l.color.dark || "#000000ff"),
              light: o(l.color.light || "#ffffffff"),
            },
            type: l.type,
            rendererOpts: l.rendererOpts || {},
          };
        }),
          (n.getScale = function (l, a) {
            return a.width && a.width >= l + a.margin * 2
              ? a.width / (l + a.margin * 2)
              : a.scale;
          }),
          (n.getImageWidth = function (l, a) {
            const c = n.getScale(l, a);
            return Math.floor((l + a.margin * 2) * c);
          }),
          (n.qrToImageData = function (l, a, c) {
            const f = a.modules.size,
              p = a.modules.data,
              m = n.getScale(f, c),
              g = Math.floor((f + c.margin * 2) * m),
              v = c.margin * m,
              w = [c.color.light, c.color.dark];
            for (let S = 0; S < g; S++)
              for (let x = 0; x < g; x++) {
                let P = (S * g + x) * 4,
                  C = c.color.light;
                if (S >= v && x >= v && S < g - v && x < g - v) {
                  const N = Math.floor((S - v) / m),
                    R = Math.floor((x - v) / m);
                  C = w[p[N * f + R] ? 1 : 0];
                }
                ((l[P++] = C.r), (l[P++] = C.g), (l[P++] = C.b), (l[P] = C.a));
              }
          }));
      })(fu)),
    fu
  );
}
var nh;
function Vb() {
  return (
    nh ||
      ((nh = 1),
      (function (n) {
        const o = Qm();
        function s(a, c, f) {
          (a.clearRect(0, 0, c.width, c.height),
            c.style || (c.style = {}),
            (c.height = f),
            (c.width = f),
            (c.style.height = f + "px"),
            (c.style.width = f + "px"));
        }
        function l() {
          try {
            return document.createElement("canvas");
          } catch {
            throw new Error("You need to specify a canvas element");
          }
        }
        ((n.render = function (c, f, p) {
          let m = p,
            g = f;
          (typeof m > "u" && (!f || !f.getContext) && ((m = f), (f = void 0)),
            f || (g = l()),
            (m = o.getOptions(m)));
          const v = o.getImageWidth(c.modules.size, m),
            w = g.getContext("2d"),
            S = w.createImageData(v, v);
          return (
            o.qrToImageData(S.data, c, m),
            s(w, g, v),
            w.putImageData(S, 0, 0),
            g
          );
        }),
          (n.renderToDataURL = function (c, f, p) {
            let m = p;
            (typeof m > "u" && (!f || !f.getContext) && ((m = f), (f = void 0)),
              m || (m = {}));
            const g = n.render(c, f, m),
              v = m.type || "image/png",
              w = m.rendererOpts || {};
            return g.toDataURL(v, w.quality);
          }));
      })(du)),
    du
  );
}
var pu = {},
  rh;
function Hb() {
  if (rh) return pu;
  rh = 1;
  const n = Qm();
  function o(a, c) {
    const f = a.a / 255,
      p = c + '="' + a.hex + '"';
    return f < 1 ? p + " " + c + '-opacity="' + f.toFixed(2).slice(1) + '"' : p;
  }
  function s(a, c, f) {
    let p = a + c;
    return (typeof f < "u" && (p += " " + f), p);
  }
  function l(a, c, f) {
    let p = "",
      m = 0,
      g = !1,
      v = 0;
    for (let w = 0; w < a.length; w++) {
      const S = Math.floor(w % c),
        x = Math.floor(w / c);
      (!S && !g && (g = !0),
        a[w]
          ? (v++,
            (w > 0 && S > 0 && a[w - 1]) ||
              ((p += g ? s("M", S + f, 0.5 + x + f) : s("m", m, 0)),
              (m = 0),
              (g = !1)),
            (S + 1 < c && a[w + 1]) || ((p += s("h", v)), (v = 0)))
          : m++);
    }
    return p;
  }
  return (
    (pu.render = function (c, f, p) {
      const m = n.getOptions(f),
        g = c.modules.size,
        v = c.modules.data,
        w = g + m.margin * 2,
        S = m.color.light.a
          ? "<path " +
            o(m.color.light, "fill") +
            ' d="M0 0h' +
            w +
            "v" +
            w +
            'H0z"/>'
          : "",
        x =
          "<path " +
          o(m.color.dark, "stroke") +
          ' d="' +
          l(v, g, m.margin) +
          '"/>',
        P = 'viewBox="0 0 ' + w + " " + w + '"',
        N =
          '<svg xmlns="http://www.w3.org/2000/svg" ' +
          (m.width ? 'width="' + m.width + '" height="' + m.width + '" ' : "") +
          P +
          ' shape-rendering="crispEdges">' +
          S +
          x +
          `</svg>
`;
      return (typeof p == "function" && p(null, N), N);
    }),
    pu
  );
}
var oh;
function Wb() {
  if (oh) return Yr;
  oh = 1;
  const n = Eb(),
    o = Ub(),
    s = Vb(),
    l = Hb();
  function a(c, f, p, m, g) {
    const v = [].slice.call(arguments, 1),
      w = v.length,
      S = typeof v[w - 1] == "function";
    if (!S && !n()) throw new Error("Callback required as last argument");
    if (S) {
      if (w < 2) throw new Error("Too few arguments provided");
      w === 2
        ? ((g = p), (p = f), (f = m = void 0))
        : w === 3 &&
          (f.getContext && typeof g > "u"
            ? ((g = m), (m = void 0))
            : ((g = m), (m = p), (p = f), (f = void 0)));
    } else {
      if (w < 1) throw new Error("Too few arguments provided");
      return (
        w === 1
          ? ((p = f), (f = m = void 0))
          : w === 2 && !f.getContext && ((m = p), (p = f), (f = void 0)),
        new Promise(function (x, P) {
          try {
            const C = o.create(p, m);
            x(c(C, f, m));
          } catch (C) {
            P(C);
          }
        })
      );
    }
    try {
      const x = o.create(p, m);
      g(null, c(x, f, m));
    } catch (x) {
      g(x);
    }
  }
  return (
    (Yr.create = o.create),
    (Yr.toCanvas = a.bind(null, s.render)),
    (Yr.toDataURL = a.bind(null, s.renderToDataURL)),
    (Yr.toString = a.bind(null, function (c, f, p) {
      return l.render(c, p);
    })),
    Yr
  );
}
var $b = Wb();
const Qb = _u($b);
function qb() {
  const n = vr(),
    [o, s] = b.useState(null),
    [l, a] = b.useState(!1),
    c = b.useRef(null);
  return (
    b.useEffect(() => {
      const f = async () => {
          try {
            const g = await (await fetch("/api/whatsapp/qr")).json();
            (g.qr && s(g.qr), a(g.connected));
          } catch (m) {
            console.error("Error fetching QR code:", m);
          }
        },
        p = setInterval(() => {
          f();
        }, 2e3);
      return () => clearInterval(p);
    }, []),
    b.useEffect(() => {
      o && c.current && Qb.toCanvas(c.current, o, { width: 220, margin: 1 });
    }, [o]),
    b.useEffect(() => {
      l &&
        setTimeout(() => {
          n("/chats");
        }, 1500);
    }, [l, n]),
    h.jsxs("div", {
      className:
        "flex h-screen w-full bg-gradient-to-br from-background via-background to-primary/10",
      children: [
        h.jsxs("div", {
          className:
            "hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background/50 p-12",
          children: [
            h.jsx("div", {
              className:
                "mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30",
              children: h.jsx("div", {
                className:
                  "flex h-20 w-20 items-center justify-center rounded-full bg-primary",
                children: h.jsx(rn, {
                  className: "h-10 w-10 text-primary-foreground",
                }),
              }),
            }),
            h.jsx("h1", {
              className: "mb-4 text-5xl font-bold text-foreground",
              children: "WhatsApp",
            }),
            h.jsx("p", {
              className: "text-center text-lg text-muted-foreground mb-12",
              children: "Connect Your Device",
            }),
            h.jsxs("div", {
              className: "space-y-6 max-w-sm",
              children: [
                h.jsxs("div", {
                  className: "flex items-start gap-4",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0",
                      children: h.jsx("span", {
                        className: "text-lg font-semibold text-primary",
                        children: "1",
                      }),
                    }),
                    h.jsxs("div", {
                      children: [
                        h.jsx("p", {
                          className: "font-semibold text-foreground mb-1",
                          children: "Open WhatsApp on Your Phone",
                        }),
                        h.jsx("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Make sure your phone is nearby and connected to the internet",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "flex items-start gap-4",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0",
                      children: h.jsx("span", {
                        className: "text-lg font-semibold text-primary",
                        children: "2",
                      }),
                    }),
                    h.jsxs("div", {
                      children: [
                        h.jsx("p", {
                          className: "font-semibold text-foreground mb-1",
                          children: "Scan the QR Code",
                        }),
                        h.jsx("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Go to Settings → Linked Devices → Link a Device and scan the QR code",
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "flex items-start gap-4",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0",
                      children: h.jsx("span", {
                        className: "text-lg font-semibold text-primary",
                        children: "3",
                      }),
                    }),
                    h.jsxs("div", {
                      children: [
                        h.jsx("p", {
                          className: "font-semibold text-foreground mb-1",
                          children: "You're All Set",
                        }),
                        h.jsx("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Once scanned, you'll be connected and ready to message",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            h.jsx("div", {
              className:
                "mt-12 p-4 rounded-lg bg-primary/10 border border-primary/20 max-w-sm",
              children: h.jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: [
                  h.jsx("span", {
                    className: "font-semibold text-foreground block mb-1",
                    children: "🔒 Keep Your QR Code Private",
                  }),
                  "Never share your QR code with anyone. Anyone with your QR code can access your WhatsApp account.",
                ],
              }),
            }),
          ],
        }),
        h.jsx("div", {
          className:
            "flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12",
          children: h.jsxs("div", {
            className: "w-full max-w-md",
            children: [
              h.jsxs("div", {
                className: "mb-8 flex lg:hidden flex-col items-center",
                children: [
                  h.jsx("div", {
                    className:
                      "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary",
                    children: h.jsx(rn, {
                      className: "h-8 w-8 text-primary-foreground",
                    }),
                  }),
                  h.jsx("h1", {
                    className: "text-3xl font-bold text-foreground",
                    children: "WhatsApp",
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "mb-8 text-center",
                children: [
                  h.jsx("h2", {
                    className: "mb-2 text-2xl font-bold text-foreground",
                    children: "Scan QR Code",
                  }),
                  h.jsx("p", {
                    className: "text-muted-foreground",
                    children: "Use your phone to scan this code to connect",
                  }),
                ],
              }),
              h.jsx("div", {
                className: "mb-8 flex flex-col items-center",
                children: l
                  ? h.jsx("div", {
                      className:
                        "w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-2xl flex items-center justify-center border border-primary/30",
                      children: h.jsxs("div", {
                        className: "text-center",
                        children: [
                          h.jsx(d0, {
                            className:
                              "h-20 w-20 text-primary mx-auto mb-4 animate-bounce",
                          }),
                          h.jsx("p", {
                            className: "text-lg font-bold text-primary",
                            children: "Connected!",
                          }),
                          h.jsx("p", {
                            className: "text-sm text-muted-foreground mt-2",
                            children: "Redirecting...",
                          }),
                        ],
                      }),
                    })
                  : h.jsx("div", {
                      className: "relative",
                      children: h.jsx("div", {
                        className:
                          "w-64 h-64 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center",
                        children: o
                          ? h.jsx("canvas", { ref: c })
                          : h.jsxs("div", {
                              className: "flex flex-col items-center",
                              children: [
                                h.jsx("div", {
                                  className:
                                    "h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2",
                                }),
                                h.jsx("p", {
                                  className:
                                    "text-sm text-foreground font-medium",
                                  children: "Generating QR Code...",
                                }),
                              ],
                            }),
                      }),
                    }),
              }),
            ],
          }),
        }),
      ],
    })
  );
}
function Kb() {
  const [n] = b.useState([
      {
        id: "1",
        name: "Sarah Johnson",
        avatar: "SJ",
        lastMessage: "Sounds great! See you tomorrow",
        timestamp: "2:45 PM",
        unread: 0,
        online: !0,
      },
      {
        id: "2",
        name: "Family Group",
        avatar: "FG",
        lastMessage: "Mom: Did you see the photos from vacation?",
        timestamp: "1:30 PM",
        unread: 3,
        online: !1,
      },
      {
        id: "3",
        name: "John Smith",
        avatar: "JS",
        lastMessage: "Thanks for the recommendation!",
        timestamp: "Yesterday",
        unread: 0,
        online: !0,
      },
      {
        id: "4",
        name: "Work Team",
        avatar: "WT",
        lastMessage: "Alex: Project deadline moved to Friday",
        timestamp: "Yesterday",
        unread: 5,
        online: !1,
      },
      {
        id: "5",
        name: "Emma Davis",
        avatar: "ED",
        lastMessage: "That sounds perfect!",
        timestamp: "Monday",
        unread: 0,
        online: !1,
      },
      {
        id: "6",
        name: "Design Team",
        avatar: "DT",
        lastMessage: "Design files are ready for review",
        timestamp: "Monday",
        unread: 0,
        online: !1,
      },
      {
        id: "7",
        name: "Michael Brown",
        avatar: "MB",
        lastMessage: "Let's catch up soon!",
        timestamp: "Sunday",
        unread: 0,
        online: !0,
      },
      {
        id: "8",
        name: "Project Group",
        avatar: "PG",
        lastMessage: "All tasks completed on schedule",
        timestamp: "Sunday",
        unread: 0,
        online: !1,
      },
    ]),
    [o, s] = b.useState(""),
    l = n.filter((a) => a.name.toLowerCase().includes(o.toLowerCase()));
  return h.jsxs("div", {
    className: "flex w-full h-full bg-background",
    children: [
      h.jsxs("div", {
        className:
          "w-full sm:w-96 flex flex-col border-r border-border bg-background",
        children: [
          h.jsx("div", {
            className: "border-b border-border p-4",
            children: h.jsxs("div", {
              className: "relative",
              children: [
                h.jsx("input", {
                  type: "text",
                  placeholder: "Search or start new chat",
                  value: o,
                  onChange: (a) => s(a.target.value),
                  className:
                    "w-full rounded-full bg-secondary px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                }),
                h.jsx(Ai, {
                  className:
                    "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground",
                }),
              ],
            }),
          }),
          h.jsx("div", {
            className: "flex-1 overflow-y-auto",
            children: l.map((a) =>
              h.jsxs(
                Vm,
                {
                  to: `/chat/${a.id}`,
                  className:
                    "flex items-start gap-3 border-b border-border px-4 py-3 hover:bg-secondary transition-colors cursor-pointer",
                  children: [
                    h.jsxs("div", {
                      className: "relative mt-1 flex-shrink-0",
                      children: [
                        h.jsx("div", {
                          className:
                            "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold",
                          children: a.avatar,
                        }),
                        a.online &&
                          h.jsx("div", {
                            className:
                              "absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background",
                          }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "flex-1 min-w-0",
                      children: [
                        h.jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [
                            h.jsx("h3", {
                              className:
                                "font-semibold text-foreground truncate",
                              children: a.name,
                            }),
                            h.jsx("span", {
                              className:
                                "ml-2 flex-shrink-0 text-xs text-muted-foreground",
                              children: a.timestamp,
                            }),
                          ],
                        }),
                        h.jsx("p", {
                          className:
                            "mt-1 text-sm text-muted-foreground truncate",
                          children: a.lastMessage,
                        }),
                      ],
                    }),
                    a.unread > 0 &&
                      h.jsx("div", {
                        className: "ml-2 flex-shrink-0",
                        children: h.jsx("div", {
                          className:
                            "flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
                          children: a.unread > 9 ? "9+" : a.unread,
                        }),
                      }),
                  ],
                },
                a.id,
              ),
            ),
          }),
        ],
      }),
      h.jsx("div", {
        className:
          "hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-background to-secondary",
        children: h.jsxs("div", {
          className: "text-center",
          children: [
            h.jsx("div", {
              className: "flex justify-center mb-4",
              children: h.jsx("div", {
                className:
                  "flex h-20 w-20 items-center justify-center rounded-full bg-primary/10",
                children: h.jsx(rn, { className: "h-10 w-10 text-primary" }),
              }),
            }),
            h.jsx("h2", {
              className: "text-2xl font-bold text-foreground mb-2",
              children: "Select a chat to start messaging",
            }),
            h.jsx("p", {
              className: "text-muted-foreground",
              children:
                "Choose from your existing conversations or start a new chat",
            }),
          ],
        }),
      }),
    ],
  });
}
function Yb() {
  return h.jsx(Kb, {});
}
function Gb() {
  const { id: n } = Dm(),
    o = vr(),
    s = b.useRef(null),
    [l, a] = b.useState(""),
    [c] = b.useState({
      id: n || "1",
      name: "Sarah Johnson",
      avatar: "SJ",
      online: !0,
      lastSeen: "Active now",
    }),
    [f, p] = b.useState([
      {
        id: "1",
        text: "Hey! How are you doing?",
        sender: "contact",
        timestamp: "10:30 AM",
        status: "read",
      },
      {
        id: "2",
        text: "I'm doing great! Just finished that project we discussed",
        sender: "user",
        timestamp: "10:32 AM",
        status: "read",
      },
      {
        id: "3",
        text: "That's awesome! I'd love to see what you've done",
        sender: "contact",
        timestamp: "10:33 AM",
        status: "read",
      },
      {
        id: "4",
        text: "I'll send you the files later today",
        sender: "user",
        timestamp: "10:34 AM",
        status: "delivered",
      },
      {
        id: "5",
        text: "Perfect! 😊",
        sender: "contact",
        timestamp: "10:35 AM",
        status: "read",
      },
      {
        id: "6",
        text: "By the way, are we still on for tomorrow?",
        sender: "contact",
        timestamp: "10:36 AM",
        status: "read",
      },
      {
        id: "7",
        text: "Yes, definitely! Looking forward to it",
        sender: "user",
        timestamp: "10:37 AM",
        status: "read",
      },
      {
        id: "8",
        text: "Sounds great! See you tomorrow",
        sender: "contact",
        timestamp: "2:45 PM",
        status: "read",
      },
    ]),
    m = () => {
      s.current?.scrollIntoView({ behavior: "smooth" });
    };
  b.useEffect(() => {
    m();
  }, [f]);
  const g = (v) => {
    if ((v.preventDefault(), !l.trim())) return;
    const w = {
      id: String(f.length + 1),
      text: l,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: !0,
      }),
      status: "sent",
    };
    (p([...f, w]),
      a(""),
      setTimeout(() => {
        const S = [
            "That sounds good!",
            "I agree! 👍",
            "Let's do it!",
            "Sounds perfect!",
            "I'll let you know!",
          ],
          x = S[Math.floor(Math.random() * S.length)];
        p((P) => [
          ...P,
          {
            id: String(P.length + 1),
            text: x,
            sender: "contact",
            timestamp: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: !0,
            }),
            status: "delivered",
          },
        ]);
      }, 1e3));
  };
  return h.jsxs("div", {
    className:
      "flex h-full w-full flex-col bg-gradient-to-b from-background to-secondary/30",
    children: [
      h.jsx("div", {
        className: "border-b border-border bg-background px-4 py-3",
        children: h.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            h.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                h.jsx("button", {
                  onClick: () => o("/chats"),
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors sm:hidden",
                  children: h.jsx(Oh, { className: "h-5 w-5 text-foreground" }),
                }),
                h.jsxs("div", {
                  className: "relative flex-shrink-0",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm",
                      children: c.avatar,
                    }),
                    c.online &&
                      h.jsx("div", {
                        className:
                          "absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background",
                      }),
                  ],
                }),
                h.jsxs("div", {
                  className: "min-w-0",
                  children: [
                    h.jsx("h2", {
                      className: "font-semibold text-foreground",
                      children: c.name,
                    }),
                    h.jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: c.online ? "Active now" : c.lastSeen,
                    }),
                  ],
                }),
              ],
            }),
            h.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                h.jsx("button", {
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(Xo, { className: "h-5 w-5 text-foreground" }),
                }),
                h.jsx("button", {
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(U0, { className: "h-5 w-5 text-foreground" }),
                }),
                h.jsx("button", {
                  className:
                    "p-2 hover:bg-secondary rounded-full transition-colors",
                  children: h.jsx(Ih, { className: "h-5 w-5 text-foreground" }),
                }),
              ],
            }),
          ],
        }),
      }),
      h.jsxs("div", {
        className: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
        children: [
          f.map((v) =>
            h.jsx(
              "div",
              {
                className: `flex ${v.sender === "user" ? "justify-end" : "justify-start"}`,
                children: h.jsxs("div", {
                  className: `max-w-xs lg:max-w-md xl:max-w-lg rounded-2xl px-4 py-2 ${v.sender === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground border border-border rounded-bl-none"}`,
                  children: [
                    h.jsx("p", {
                      className: "break-words text-sm",
                      children: v.text,
                    }),
                    h.jsxs("div", {
                      className: `mt-1 flex items-center justify-end gap-1 text-xs ${v.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`,
                      children: [
                        h.jsx("span", { children: v.timestamp }),
                        v.sender === "user" &&
                          h.jsx("span", {
                            children:
                              v.status === "read" || v.status === "delivered"
                                ? "✓✓"
                                : "✓",
                          }),
                      ],
                    }),
                  ],
                }),
              },
              v.id,
            ),
          ),
          h.jsx("div", { ref: s }),
        ],
      }),
      h.jsx("div", {
        className: "border-t border-border bg-background px-4 py-3",
        children: h.jsxs("form", {
          onSubmit: g,
          className: "flex items-end gap-2",
          children: [
            h.jsx("button", {
              type: "button",
              className:
                "p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0",
              children: h.jsx(A0, { className: "h-5 w-5 text-foreground" }),
            }),
            h.jsx("button", {
              type: "button",
              className:
                "p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0",
              children: h.jsx(N0, { className: "h-5 w-5 text-foreground" }),
            }),
            h.jsx("input", {
              type: "text",
              value: l,
              onChange: (v) => a(v.target.value),
              placeholder: "Type a message...",
              className:
                "flex-1 rounded-full bg-secondary px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
            }),
            h.jsx("button", {
              type: "submit",
              disabled: !l.trim(),
              className:
                "p-2 hover:bg-primary/10 rounded-full transition-colors flex-shrink-0 disabled:opacity-50",
              children: h.jsx(R0, { className: "h-5 w-5 text-primary" }),
            }),
          ],
        }),
      }),
    ],
  });
}
function Jb() {
  const [n, o] = b.useState([
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        phone: "+1 (555) 123-4567",
        avatar: "SJ",
        status: "active",
        tags: ["Sales", "VIP"],
        lastContact: "2 hours ago",
        interactions: 28,
        notes: "Interested in premium plan upgrade",
        company: "Tech Corp",
        isFavorite: !0,
      },
      {
        id: "2",
        name: "John Smith",
        email: "john.smith@startup.com",
        phone: "+1 (555) 234-5678",
        avatar: "JS",
        status: "active",
        tags: ["Support", "Enterprise"],
        lastContact: "1 day ago",
        interactions: 15,
        notes: "Account manager: Michael Brown",
        company: "Startup Inc",
        isFavorite: !1,
      },
      {
        id: "3",
        name: "Emma Davis",
        email: "emma.davis@corp.com",
        phone: "+1 (555) 345-6789",
        avatar: "ED",
        status: "lead",
        tags: ["Prospect", "Marketing"],
        lastContact: "3 days ago",
        interactions: 8,
        notes: "Sent proposal on Monday",
        company: "Corporate Solutions",
        isFavorite: !1,
      },
      {
        id: "4",
        name: "Michael Brown",
        email: "michael.brown@agency.com",
        phone: "+1 (555) 456-7890",
        avatar: "MB",
        status: "active",
        tags: ["Partner", "Agency"],
        lastContact: "5 days ago",
        interactions: 42,
        notes: "Regular account review scheduled monthly",
        company: "Digital Agency",
        isFavorite: !0,
      },
      {
        id: "5",
        name: "Lisa Chen",
        email: "lisa.chen@retail.com",
        phone: "+1 (555) 567-8901",
        avatar: "LC",
        status: "active",
        tags: ["Retail", "Support"],
        lastContact: "1 week ago",
        interactions: 19,
        notes: "Bulk order inquiry in progress",
        company: "Retail Solutions",
        isFavorite: !1,
      },
      {
        id: "6",
        name: "James Wilson",
        email: "james.wilson@finance.com",
        phone: "+1 (555) 678-9012",
        avatar: "JW",
        status: "inactive",
        tags: ["Finance", "Inactive"],
        lastContact: "3 weeks ago",
        interactions: 5,
        notes: "No activity since Q3",
        company: "Financial Group",
        isFavorite: !1,
      },
    ]),
    [s, l] = b.useState(""),
    [a, c] = b.useState("all"),
    [f, p] = b.useState(!1),
    m = n.filter((w) => {
      const S =
          w.name.toLowerCase().includes(s.toLowerCase()) ||
          w.email.toLowerCase().includes(s.toLowerCase()) ||
          w.company?.toLowerCase().includes(s.toLowerCase()),
        x = a === "all" || w.status === a;
      return S && x;
    }),
    g = (w) => {
      switch (w) {
        case "active":
          return "bg-primary/20 text-primary";
        case "lead":
          return "bg-yellow-500/20 text-yellow-500";
        case "inactive":
          return "bg-muted/50 text-muted-foreground";
        default:
          return "bg-muted/20 text-muted-foreground";
      }
    },
    v = (w) => {
      o(n.map((S) => (S.id === w ? { ...S, isFavorite: !S.isFavorite } : S)));
    };
  return h.jsxs("div", {
    className: "flex h-full w-full flex-col bg-background",
    children: [
      h.jsxs("div", {
        className: "border-b border-border px-6 py-4",
        children: [
          h.jsxs("div", {
            className: "mb-4 flex items-center justify-between",
            children: [
              h.jsx("h1", {
                className: "text-3xl font-bold text-foreground",
                children: "Contacts & CRM",
              }),
              h.jsxs("button", {
                onClick: () => p(!0),
                className:
                  "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
                children: [h.jsx(Dh, { className: "h-4 w-4" }), "New Contact"],
              }),
            ],
          }),
          h.jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Manage your customer relationships and interactions",
          }),
        ],
      }),
      h.jsxs("div", {
        className: "border-b border-border px-6 py-4 space-y-4",
        children: [
          h.jsxs("div", {
            className: "flex flex-col gap-4 sm:flex-row sm:items-end",
            children: [
              h.jsxs("div", {
                className: "flex-1",
                children: [
                  h.jsx("label", {
                    className: "block text-sm font-medium text-foreground mb-2",
                    children: "Search Contacts",
                  }),
                  h.jsxs("div", {
                    className: "relative",
                    children: [
                      h.jsx("input", {
                        type: "text",
                        placeholder: "Search by name, email, or company...",
                        value: s,
                        onChange: (w) => l(w.target.value),
                        className:
                          "w-full rounded-lg border border-border bg-secondary px-4 py-2 pl-10 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                      }),
                      h.jsx(Ai, {
                        className:
                          "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground",
                      }),
                    ],
                  }),
                ],
              }),
              h.jsxs("div", {
                children: [
                  h.jsx("label", {
                    className: "block text-sm font-medium text-foreground mb-2",
                    children: "Status",
                  }),
                  h.jsxs("select", {
                    value: a,
                    onChange: (w) => c(w.target.value),
                    className:
                      "rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
                    children: [
                      h.jsx("option", { value: "all", children: "All Status" }),
                      h.jsx("option", { value: "active", children: "Active" }),
                      h.jsx("option", { value: "lead", children: "Lead" }),
                      h.jsx("option", {
                        value: "inactive",
                        children: "Inactive",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          h.jsxs("div", {
            className: "grid grid-cols-4 gap-4",
            children: [
              h.jsxs("div", {
                className: "rounded-lg bg-secondary p-3",
                children: [
                  h.jsx("p", {
                    className: "text-xs text-muted-foreground mb-1",
                    children: "Total Contacts",
                  }),
                  h.jsx("p", {
                    className: "text-xl font-bold text-foreground",
                    children: n.length,
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "rounded-lg bg-secondary p-3",
                children: [
                  h.jsx("p", {
                    className: "text-xs text-muted-foreground mb-1",
                    children: "Active",
                  }),
                  h.jsx("p", {
                    className: "text-xl font-bold text-primary",
                    children: n.filter((w) => w.status === "active").length,
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "rounded-lg bg-secondary p-3",
                children: [
                  h.jsx("p", {
                    className: "text-xs text-muted-foreground mb-1",
                    children: "Leads",
                  }),
                  h.jsx("p", {
                    className: "text-xl font-bold text-yellow-500",
                    children: n.filter((w) => w.status === "lead").length,
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "rounded-lg bg-secondary p-3",
                children: [
                  h.jsx("p", {
                    className: "text-xs text-muted-foreground mb-1",
                    children: "Favorites",
                  }),
                  h.jsx("p", {
                    className: "text-xl font-bold text-foreground",
                    children: n.filter((w) => w.isFavorite).length,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      h.jsx("div", {
        className: "flex-1 overflow-y-auto",
        children:
          m.length === 0
            ? h.jsx("div", {
                className: "flex h-full items-center justify-center",
                children: h.jsxs("div", {
                  className: "text-center",
                  children: [
                    h.jsx(Ai, {
                      className: "mx-auto mb-4 h-12 w-12 text-muted-foreground",
                    }),
                    h.jsx("p", {
                      className: "text-lg font-semibold text-foreground",
                      children: "No contacts found",
                    }),
                    h.jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children: "Try adjusting your search filters",
                    }),
                  ],
                }),
              })
            : h.jsx("div", {
                className: "space-y-2 p-6",
                children: m.map((w) =>
                  h.jsx(
                    Vm,
                    {
                      to: `/crm/${w.id}`,
                      className:
                        "block rounded-lg border border-border bg-card p-4 hover:bg-secondary transition-colors group",
                      children: h.jsxs("div", {
                        className: "flex items-start gap-4",
                        children: [
                          h.jsx("div", {
                            className:
                              "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold",
                            children: w.avatar,
                          }),
                          h.jsxs("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              h.jsxs("div", {
                                className:
                                  "flex items-start justify-between mb-2",
                                children: [
                                  h.jsx("h3", {
                                    className:
                                      "font-semibold text-foreground group-hover:text-primary",
                                    children: w.name,
                                  }),
                                  h.jsx("button", {
                                    onClick: (S) => {
                                      (S.preventDefault(), v(w.id));
                                    },
                                    className:
                                      "flex-shrink-0 p-1 hover:bg-secondary rounded transition-colors",
                                    children: h.jsx(I0, {
                                      className: `h-4 w-4 ${w.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`,
                                    }),
                                  }),
                                ],
                              }),
                              h.jsxs("div", {
                                className:
                                  "flex flex-wrap items-center gap-3 mb-2 text-xs text-muted-foreground",
                                children: [
                                  h.jsxs("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      h.jsx(Jo, { className: "h-3 w-3" }),
                                      h.jsx("span", {
                                        className: "truncate",
                                        children: w.email,
                                      }),
                                    ],
                                  }),
                                  h.jsxs("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      h.jsx(Xo, { className: "h-3 w-3" }),
                                      h.jsx("span", { children: w.phone }),
                                    ],
                                  }),
                                ],
                              }),
                              h.jsxs("div", {
                                className:
                                  "flex flex-wrap items-center gap-2 mb-2",
                                children: [
                                  h.jsx("span", {
                                    className: `inline-block rounded-full px-2 py-1 text-xs font-medium ${g(w.status)}`,
                                    children:
                                      w.status.charAt(0).toUpperCase() +
                                      w.status.slice(1),
                                  }),
                                  w.tags.map((S) =>
                                    h.jsxs(
                                      "span",
                                      {
                                        className:
                                          "inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground",
                                        children: [
                                          h.jsx(Fh, { className: "h-3 w-3" }),
                                          S,
                                        ],
                                      },
                                      S,
                                    ),
                                  ),
                                ],
                              }),
                              h.jsxs("div", {
                                className:
                                  "flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
                                children: [
                                  h.jsxs("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      h.jsx(vu, { className: "h-3 w-3" }),
                                      h.jsxs("span", {
                                        children: [
                                          w.interactions,
                                          " interactions",
                                        ],
                                      }),
                                    ],
                                  }),
                                  h.jsxs("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                      h.jsx(p0, { className: "h-3 w-3" }),
                                      h.jsxs("span", {
                                        children: ["Last: ", w.lastContact],
                                      }),
                                    ],
                                  }),
                                  w.company &&
                                    h.jsx("span", {
                                      className:
                                        "rounded bg-secondary px-2 py-1",
                                      children: w.company,
                                    }),
                                ],
                              }),
                              w.notes &&
                                h.jsxs("p", {
                                  className:
                                    "mt-2 text-xs text-muted-foreground italic",
                                  children: ['"', w.notes, '"'],
                                }),
                            ],
                          }),
                        ],
                      }),
                    },
                    w.id,
                  ),
                ),
              }),
      }),
      f &&
        h.jsx("div", {
          className:
            "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
          children: h.jsxs("div", {
            className:
              "w-full max-w-md rounded-lg border border-border bg-card p-6",
            children: [
              h.jsx("h2", {
                className: "mb-4 text-xl font-bold text-foreground",
                children: "Add New Contact",
              }),
              h.jsxs("div", {
                className: "space-y-4",
                children: [
                  h.jsx("input", {
                    type: "text",
                    placeholder: "Full Name",
                    className:
                      "w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  }),
                  h.jsx("input", {
                    type: "email",
                    placeholder: "Email Address",
                    className:
                      "w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  }),
                  h.jsx("input", {
                    type: "tel",
                    placeholder: "Phone Number",
                    className:
                      "w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  }),
                  h.jsx("input", {
                    type: "text",
                    placeholder: "Company",
                    className:
                      "w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                  }),
                  h.jsxs("div", {
                    className: "flex gap-3 pt-4",
                    children: [
                      h.jsx("button", {
                        onClick: () => p(!1),
                        className:
                          "flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors",
                        children: "Cancel",
                      }),
                      h.jsx("button", {
                        onClick: () => p(!1),
                        className:
                          "flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
                        children: "Add Contact",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
const Xb = {
  1: {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    avatar: "SJ",
    company: "Tech Corp",
    position: "Sales Director",
    status: "active",
    tags: ["Sales", "VIP", "Premium"],
    address: "123 Tech Avenue, San Francisco, CA 94105",
    joinDate: "2021-03-15",
    totalValue: "$125,000",
    notes: "Interested in premium plan upgrade. Very responsive client.",
    isFavorite: !0,
    interactions: [
      {
        id: "1",
        type: "message",
        content: "Sounds great! See you tomorrow",
        timestamp: "2 hours ago",
        details: "WhatsApp message received",
      },
      {
        id: "2",
        type: "call",
        content: "Product demo call",
        timestamp: "1 day ago",
        details: "45 minutes duration",
      },
      {
        id: "3",
        type: "email",
        content: "Sent proposal documents",
        timestamp: "2 days ago",
        details: "3 attachments included",
      },
      {
        id: "4",
        type: "note",
        content: "Client interested in enterprise plan",
        timestamp: "3 days ago",
        details: "Added by: Michael Brown",
      },
      {
        id: "5",
        type: "message",
        content: "Can we schedule a meeting?",
        timestamp: "1 week ago",
        details: "WhatsApp message sent",
      },
    ],
  },
  2: {
    id: "2",
    name: "John Smith",
    email: "john.smith@startup.com",
    phone: "+1 (555) 234-5678",
    avatar: "JS",
    company: "Startup Inc",
    position: "CTO",
    status: "active",
    tags: ["Support", "Enterprise", "Technical"],
    address: "456 Innovation Blvd, Austin, TX 78704",
    joinDate: "2022-07-20",
    totalValue: "$75,000",
    notes: "Technical contact. Prefers detailed documentation.",
    isFavorite: !1,
    interactions: [
      {
        id: "1",
        type: "message",
        content: "Thanks for the recommendation!",
        timestamp: "1 day ago",
        details: "WhatsApp message received",
      },
      {
        id: "2",
        type: "email",
        content: "Technical specification request",
        timestamp: "3 days ago",
        details: "Sent API documentation",
      },
    ],
  },
};
function Zb() {
  const { id: n } = Dm(),
    o = vr(),
    s = n ? Xb[n] : null,
    [l, a] = b.useState(!1),
    [c, f] = b.useState(s?.notes || "");
  return s
    ? h.jsxs("div", {
        className: "flex h-full w-full flex-col bg-background",
        children: [
          h.jsxs("div", {
            className: "border-b border-border px-6 py-4",
            children: [
              h.jsxs("button", {
                onClick: () => o("/crm"),
                className:
                  "mb-4 flex items-center gap-2 text-primary hover:underline transition-colors",
                children: [
                  h.jsx(Oh, { className: "h-4 w-4" }),
                  "Back to Contacts",
                ],
              }),
              h.jsx("div", {
                className: "flex items-start justify-between",
                children: h.jsxs("div", {
                  className: "flex items-start gap-4",
                  children: [
                    h.jsx("div", {
                      className:
                        "flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl",
                      children: s.avatar,
                    }),
                    h.jsxs("div", {
                      children: [
                        h.jsx("h1", {
                          className: "text-2xl font-bold text-foreground",
                          children: s.name,
                        }),
                        h.jsxs("p", {
                          className: "text-sm text-muted-foreground",
                          children: [s.position, " at ", s.company],
                        }),
                        h.jsx("div", {
                          className: "mt-2 flex flex-wrap gap-2",
                          children: s.tags.map((p) =>
                            h.jsxs(
                              "span",
                              {
                                className:
                                  "inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs text-primary",
                                children: [
                                  h.jsx(Fh, { className: "h-3 w-3" }),
                                  p,
                                ],
                              },
                              p,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          h.jsx("div", {
            className: "flex-1 overflow-y-auto",
            children: h.jsxs("div", {
              className: "grid grid-cols-1 gap-6 p-6 lg:grid-cols-3",
              children: [
                h.jsxs("div", {
                  className: "lg:col-span-2 space-y-6",
                  children: [
                    h.jsxs("div", {
                      className: "rounded-lg border border-border bg-card p-6",
                      children: [
                        h.jsx("h2", {
                          className:
                            "mb-4 text-lg font-semibold text-foreground",
                          children: "Contact Details",
                        }),
                        h.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            h.jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                h.jsx(Jo, {
                                  className: "h-5 w-5 text-muted-foreground",
                                }),
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: "Email",
                                    }),
                                    h.jsx("p", {
                                      className: "text-foreground",
                                      children: s.email,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                h.jsx(Xo, {
                                  className: "h-5 w-5 text-muted-foreground",
                                }),
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: "Phone",
                                    }),
                                    h.jsx("p", {
                                      className: "text-foreground",
                                      children: s.phone,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                h.jsx(b0, {
                                  className:
                                    "mt-1 h-5 w-5 text-muted-foreground flex-shrink-0",
                                }),
                                h.jsxs("div", {
                                  children: [
                                    h.jsx("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children: "Address",
                                    }),
                                    h.jsx("p", {
                                      className: "text-foreground",
                                      children: s.address,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "rounded-lg border border-border bg-card p-6",
                      children: [
                        h.jsx("h2", {
                          className:
                            "mb-4 text-lg font-semibold text-foreground",
                          children: "Business Information",
                        }),
                        h.jsxs("div", {
                          className: "grid grid-cols-2 gap-4",
                          children: [
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Company",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.company,
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Position",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.position,
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Status",
                                }),
                                h.jsx("p", {
                                  className:
                                    "font-semibold text-foreground capitalize",
                                  children: s.status,
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Total Value",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.totalValue,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "rounded-lg border border-border bg-card p-6",
                      children: [
                        h.jsxs("div", {
                          className: "mb-4 flex items-center justify-between",
                          children: [
                            h.jsx("h2", {
                              className:
                                "text-lg font-semibold text-foreground",
                              children: "Notes",
                            }),
                            h.jsxs("button", {
                              onClick: () => a(!l),
                              className:
                                "flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors",
                              children: [
                                h.jsx(L0, { className: "h-4 w-4" }),
                                "Edit",
                              ],
                            }),
                          ],
                        }),
                        l
                          ? h.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                h.jsx("textarea", {
                                  value: c,
                                  onChange: (p) => f(p.target.value),
                                  className:
                                    "w-full h-24 rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                                }),
                                h.jsxs("div", {
                                  className: "flex gap-2",
                                  children: [
                                    h.jsx("button", {
                                      onClick: () => a(!1),
                                      className:
                                        "flex-1 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors",
                                      children: "Cancel",
                                    }),
                                    h.jsx("button", {
                                      onClick: () => a(!1),
                                      className:
                                        "flex-1 rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground hover:bg-primary/90 transition-colors",
                                      children: "Save",
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : h.jsx("p", {
                              className: "text-muted-foreground",
                              children: s.notes,
                            }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "rounded-lg border border-border bg-card p-6",
                      children: [
                        h.jsxs("div", {
                          className: "mb-4 flex items-center justify-between",
                          children: [
                            h.jsx("h2", {
                              className:
                                "text-lg font-semibold text-foreground",
                              children: "Interaction History",
                            }),
                            h.jsxs("button", {
                              className:
                                "flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-sm text-foreground hover:bg-secondary transition-colors",
                              children: [
                                h.jsx(Dh, { className: "h-4 w-4" }),
                                "Add",
                              ],
                            }),
                          ],
                        }),
                        h.jsx("div", {
                          className: "space-y-4",
                          children: s.interactions.map((p) =>
                            h.jsxs(
                              "div",
                              {
                                className:
                                  "flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0",
                                children: [
                                  h.jsxs("div", {
                                    className:
                                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary",
                                    children: [
                                      p.type === "message" &&
                                        h.jsx(vu, {
                                          className:
                                            "h-5 w-5 text-muted-foreground",
                                        }),
                                      p.type === "call" &&
                                        h.jsx(Xo, {
                                          className:
                                            "h-5 w-5 text-muted-foreground",
                                        }),
                                      p.type === "email" &&
                                        h.jsx(Jo, {
                                          className:
                                            "h-5 w-5 text-muted-foreground",
                                        }),
                                      p.type === "note" &&
                                        h.jsx(vu, {
                                          className:
                                            "h-5 w-5 text-muted-foreground",
                                        }),
                                    ],
                                  }),
                                  h.jsxs("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                      h.jsxs("div", {
                                        className:
                                          "flex items-start justify-between mb-1",
                                        children: [
                                          h.jsx("p", {
                                            className:
                                              "font-semibold text-foreground capitalize",
                                            children: p.type,
                                          }),
                                          h.jsx("p", {
                                            className:
                                              "text-xs text-muted-foreground",
                                            children: p.timestamp,
                                          }),
                                        ],
                                      }),
                                      h.jsx("p", {
                                        className:
                                          "text-sm text-foreground mb-1",
                                        children: p.content,
                                      }),
                                      p.details &&
                                        h.jsx("p", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: p.details,
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              p.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                h.jsxs("div", {
                  className: "space-y-6",
                  children: [
                    h.jsxs("div", {
                      className: "rounded-lg border border-border bg-card p-6",
                      children: [
                        h.jsx("h3", {
                          className: "mb-4 font-semibold text-foreground",
                          children: "Quick Stats",
                        }),
                        h.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Member Since",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.joinDate,
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Total Interactions",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.interactions.length,
                                }),
                              ],
                            }),
                            h.jsxs("div", {
                              children: [
                                h.jsx("p", {
                                  className:
                                    "text-xs text-muted-foreground mb-1",
                                  children: "Account Value",
                                }),
                                h.jsx("p", {
                                  className: "font-semibold text-foreground",
                                  children: s.totalValue,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    h.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        h.jsx("button", {
                          className:
                            "w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
                          children: "Send Message",
                        }),
                        h.jsxs("button", {
                          className:
                            "w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2",
                          children: [
                            h.jsx(Xo, { className: "h-4 w-4" }),
                            "Call",
                          ],
                        }),
                        h.jsxs("button", {
                          className:
                            "w-full rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2",
                          children: [
                            h.jsx(Jo, { className: "h-4 w-4" }),
                            "Email",
                          ],
                        }),
                      ],
                    }),
                    h.jsx("div", {
                      className:
                        "rounded-lg border border-red-500/20 bg-red-500/10 p-4",
                      children: h.jsxs("button", {
                        className:
                          "w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium text-red-500 hover:bg-red-500/20 transition-colors",
                        children: [
                          h.jsx(z0, { className: "h-4 w-4" }),
                          "Delete Contact",
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : h.jsx("div", {
        className:
          "flex h-full w-full items-center justify-center bg-background",
        children: h.jsxs("div", {
          className: "text-center",
          children: [
            h.jsx("h2", {
              className: "text-xl font-bold text-foreground",
              children: "Contact not found",
            }),
            h.jsx("button", {
              onClick: () => o("/crm"),
              className: "mt-4 text-primary hover:underline",
              children: "Back to CRM",
            }),
          ],
        }),
      });
}
const eS = () => {
    const n = yr();
    return (
      b.useEffect(() => {
        console.error(
          "404 Error: User attempted to access non-existent route:",
          n.pathname,
        );
      }, [n.pathname]),
      h.jsx("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100",
        children: h.jsxs("div", {
          className: "text-center",
          children: [
            h.jsx("h1", {
              className: "text-4xl font-bold mb-4",
              children: "404",
            }),
            h.jsx("p", {
              className: "text-xl text-gray-600 mb-4",
              children: "Oops! Page not found",
            }),
            h.jsx("a", {
              href: "/",
              className: "text-blue-500 hover:text-blue-700 underline",
              children: "Return to Home",
            }),
          ],
        }),
      })
    );
  },
  tS = new y2(),
  nS = ({ children: n }) =>
    localStorage.getItem("isLoggedIn") ? n : h.jsx(Ru, { to: "/" }),
  ji = ({ children: n }) => {
    const o = localStorage.getItem("isLoggedIn"),
      s = localStorage.getItem("qrConnected");
    return o && s
      ? h.jsx(Sb, { children: n })
      : o
        ? h.jsx(Ru, { to: "/qr" })
        : h.jsx(Ru, { to: "/" });
  },
  rS = () => {
    const [n, o] = b.useState(!1);
    return (
      b.useEffect(() => {
        o(!0);
      }, []),
      n
        ? h.jsx(x2, {
            client: tS,
            children: h.jsxs(W1, {
              children: [
                h.jsx(Nx, {}),
                h.jsx(rw, {}),
                h.jsx(yb, {
                  children: h.jsxs(cb, {
                    children: [
                      h.jsx(qn, { path: "/", element: h.jsx(Cb, {}) }),
                      h.jsx(qn, {
                        path: "/qr",
                        element: h.jsx(nS, { children: h.jsx(qb, {}) }),
                      }),
                      h.jsx(qn, {
                        path: "/chats",
                        element: h.jsx(ji, { children: h.jsx(Yb, {}) }),
                      }),
                      h.jsx(qn, {
                        path: "/chat/:id",
                        element: h.jsx(ji, { children: h.jsx(Gb, {}) }),
                      }),
                      h.jsx(qn, {
                        path: "/crm",
                        element: h.jsx(ji, { children: h.jsx(Jb, {}) }),
                      }),
                      h.jsx(qn, {
                        path: "/crm/:id",
                        element: h.jsx(ji, { children: h.jsx(Zb, {}) }),
                      }),
                      h.jsx(qn, { path: "*", element: h.jsx(eS, {}) }),
                    ],
                  }),
                }),
              ],
            }),
          })
        : null
    );
  };
Ky.createRoot(document.getElementById("root")).render(h.jsx(rS, {}));
