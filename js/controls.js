// Generated by CoffeeScript 1.6.3
(function() {
  this.Controls = (function() {
    function Controls(_opts) {
      this.options = _opts;
      this.setupEventListeners();
    }

    Controls.prototype.app = function() {
      return this.options.app;
    };

    Controls.prototype.bind = function(scope, fn) {
      return function() {
        return fn.apply(scope, arguments);
      };
    };

    Controls.prototype.setupEventListeners = function() {
      document.addEventListener('mousedown', this.bind(this, this.mousedown), false);
      return document.addEventListener('keydown', this.bind(this, this.keydown), false);
    };

    Controls.prototype.mousedown = function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("Mousedown");
      return this.app().createDisturbance();
    };

    Controls.prototype.keydown = function(event) {
      var disturbance_keys;
      console.log("Keydown (event.which = " + event.which + ")");
      disturbance_keys = {
        49: GridDisturbance,
        50: VerticalDisturbance,
        51: BumpDisturbance,
        52: CircularDisturbance,
        53: EqualizerDisturbance
      };
      if (disturbance_keys[event.which]) {
        this.app().createDisturbance(disturbance_keys[event.which]);
      }
      if (event.which === 27) {
        console.log('[ESC] clearing disturbances array');
        this.app().disturbances = [];
        return this.app().grid.reset();
      }
    };

    return Controls;

  })();

}).call(this);
