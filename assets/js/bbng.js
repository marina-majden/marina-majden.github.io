var BBNG = function(param) {
    var BBNG = {
        group: function() {
            return Group;
        },
        render: function() {

            var images = document.getElementsByClassName('bbng-parallax-image'),
                self = this;

            for (var i = 0, max = images.length; i < max; i++) {
                Group.add(new Individual({node: images[i], parent: 1}));
            }

            var callback = function() {
                Group.render();
                self.id = window.requestAnimationFrame(callback);
            }

            this.id = window.requestAnimationFrame(callback);

        },
        stop: function() {

            window.cancelAnimationFrame(this.id);
        }
    };

    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    var Setting = {
        size: document.getElementsByClassName(param.className).length,
        offset: param.offset
    }

    var Util = {
        parent: function(el, nth) {

            var parent = el.parentNode;

            for (var i = 0; i < nth - 1; i++) {

                if (parent.parentNode !== undefined) {

                    parent = parent.parentNode;

                } else {

                    return parent;

                }

            }

            return parent;
        },

        css: function(el, style) {
            for (var key in style) {

                el.style[key] = style[key];

            }

            return el;
        }

    };

    /**
	 * Individual node to have parallax effect.
	 *
	 * @param {HTMLElement} param.node A DOM element to have parallax
	 * @param {int} param.parent Nth parent of node that can be a reference to the offset.
	 * @param {callback} param.callback A callback function that needs to be executed.
	 */
    var Individual = function(param) {

        var Individual = {},
            _node,
            _parent,
            _callback;

        Individual.init = function() {

            this.node(param.node);
            this.parent(param.parent);

            return Individual;
        }

        Individual.node = function(a) {
            if (a === undefined) {

                return _node;

            }

            _node = a;
        }

        Individual.parent = function(a) {
            if (a === undefined) {

                return _parent;

            }

            _parent = Util.parent(_node, a);
        }

        Individual.callback = function(a) {
            if (a === undefined) {

                _callback();
                return;

            }

            _callback = a;
        }

        Individual.render = function() {
            _node.style.top = ((window.pageYOffset - _parent.offsetTop) * (1 - Setting.offset)) + 'px';
        }

        return Individual.init();
    }

    var Group = function() {

        var Group = {},
            _nodes = [];

        Group.add = function(a, b) {
            if (b === undefined) {

                _nodes.push(a);
                return;

            }

            _nodes[a] = b;
        }

        Group.get = function(a) {

            if (a === undefined) {

                return _nodes;

            }

            return _nodes[a];
        }

        Group.nodes = function() {
            return _nodes;
        }

        Group.size = function() {
            return _nodes.length;
        }

        Group.render = function() {
            for (var i = 0, max = _nodes.length; i < max; i++) {
                _nodes[i].render();
            }
        }

        return Group;
    }();

    var ImageLoader = function() {
        var ImageLoader = {},
            _queue = [];

        ImageLoader.queueImage = function(param) {
            var index = _queue.length,
                img = param.img,
                src = param.src,
                parent = param.parent,
                callback = param.callback;

            _queue[index] = function() {

                img.onload = function() {

                    callback(parent, img);

                }

            };

            _queue[index]();

            img.src = src;
        }

        ImageLoader.populate = function(className) {
            var images = document.getElementsByClassName(className);

            for (var i = 0, max = images.length; i < max; i++) {
                var url = images[i].style.backgroundImage,
                    src = url.substring(5, url.length - 2);

                /* Delete Background */
                Util.css(images[i], {

                    backgroundImage: "",
                    display: 'block',
                    overflow: 'hidden'

                });

                var parent = images[i].parentNode;
                images[i].style.position = 'relative';

                var img = new Image();
                img.setAttribute('class', 'bbng-parallax-image');

                Util.css(img, {
                    position: 'absolute',
                    minWidth: '100%',
                    minHeight: '50%',
                    right: 0,
					top: 0,
                    transform: 'translate(0,-10%)'
                });

                this.queueImage({
                    img: img,
                    src: src,
                    parent: images[i],
                    callback: function(a, b) {
                        if (a.childNodes.length === 0) {
                            a.appendChild(b);
                        } else {
                            a.insertBefore(b, a.childNodes[0]);
                        }
                    }
                });
            }

            return ImageLoader;
        }

        return ImageLoader.populate(param.className);

    }();

    return BBNG;
}
