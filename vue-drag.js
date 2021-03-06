/*
*Vue-drag.js v1.0.3
*By BosenY
*/
(function () {
  var vueDrag = {};
  var edge = {};
  vueDrag.install = function (Vue) {
    Vue.directive('drag', {
      bind: function (el, binding, vnode) {
        var isChildDom;
        edge = binding.value;
        if (binding.arg !== undefined) {
          // console.log(el.firstChild)
          isChildDom = true
        } else {
          isChildDom = false
        }
        var offsetX = 0;
        var offsetY = 0;
        function down(e) {
          offsetX = (e.pageX - el.offsetLeft);
          offsetY = (e.pageY - el.offsetTop);
          if (isChildDom) {
            var barStyle = el.firstChild.currentStyle
              ? el.firstChild.currentStyle
              : window.getComputedStyle(el.firstChild, null);
            var boxStyle = el.currentStyle
              ? el.currentStyle
              : window.getComputedStyle(el, null);
            var left = Number(barStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("left").replace("px", "")) + Number(boxStyle.getPropertyValue("border-left-width").replace("px", ""))
            var right = left + Number(barStyle.getPropertyValue("width").replace("px", ""))
            var top = Number(barStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("top").replace("px", "")) + Number(boxStyle.getPropertyValue("border-top-width").replace("px", ""))
            var bottom = top + Number(barStyle.getPropertyValue("height").replace("px", ""))
            if (e.clientX <= right && e.clientX >= left && e.clientY >= top && e.clientY <= bottom) {
              addEventListener('mousemove', move);
              addEventListener('mouseup', up);
            }
          } else {
            addEventListener('mousemove', move);
            addEventListener('mouseup', up);
          }
        }
        function move(e) {
          if (e.pageX < edge.p1.left || e.pageY < edge.p1.top
          || e.pageX > edge.p2.left || e.pageY > edge.p2.top) return;
          el.style.left = (e.pageX - offsetX) + 'px';
          el.style.top = (e.pageY - offsetY) + 'px';
        }
        function up() {
          removeEventListener('mousemove', move);
          removeEventListener('mouseup', up);
        }
        el.addEventListener('mousedown', down)
      },
      update:function(el, binding) {
        edge = binding.value;
      }
    })
  }
  if (typeof exports == "object") {
    module.exports = vueDrag;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vueDrag
    })
  } else if (window.Vue) {
    window.vueDrag = vueDrag;
    Vue.use(vueDrag);
  }
})();
