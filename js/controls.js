// Generated by CoffeeScript 1.6.3
(function() {
  this.Controls = (function() {
    function Controls(_opts) {
      this.options = _opts;
      this.initGUI();
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
      return;
      event.preventDefault();
      event.stopPropagation();
      console.log("Mousedown - creating random disturbance");
      this.app().disturbances.push(new DisturbancePicker({
        grid: this.app().grid
      }).createDisturbance());
      return this.app().createDisturbance();
    };

    Controls.prototype.keydown = function(event) {
      console.log("Keydown (event.which = " + event.which + ")");
      if (event.which >= 48 && event.which <= 57) {
        this.app().disturbances.push(new DisturbancePicker({
          grid: this.app().grid
        }).indexDisturbance(event.which - 48));
      }
      if (event.which === 27) {
        console.log('[ESC] clearing disturbances array');
        this.app().disturbances = [];
        this.app().grid.reset();
      }
      if (event.which === 32) {
        this.app().togglePause();
      }
      if (event.which === 13) {
        this.app().renderer.preserveDrawingBuffer = true;
        return window.open(this.app().renderer.domElement.toDataURL('image/png'), 'screenshot');
      }
    };

    Controls.prototype.initGUI = function() {
      var UiObject, folder, uiobj,
        _this = this;
      UiObject = function() {
        _this.reset = function() {
          _this.app().disturbances = [];
          return _this.app().grid.reset();
        };
        _this.vSpin = function() {
          return _this.app().disturbances.push(new DisturbancePicker({
            grid: _this.app().grid
          }).indexDisturbance(0));
        };
        _this.hSpin = function() {
          return _this.app().disturbances.push(new DisturbancePicker({
            grid: _this.app().grid
          }).indexDisturbance(1));
        };
        return _this;
      };
      uiobj = new UiObject();
      this.gui = new dat.GUI();
      folder = this.gui.addFolder('Actions');
      folder.add(uiobj, 'vSpin');
      folder.add(uiobj, 'hSpin');
      folder.add(uiobj, 'reset');
      return folder.open();
    };

    return Controls;

  })();

}).call(this);
