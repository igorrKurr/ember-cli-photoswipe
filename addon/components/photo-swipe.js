/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';

const run = Ember.run;
const computed = Ember.computed;
const on = Ember.on;
const RSVP = Ember.RSVP;
const merge = Ember.merge;

export default Ember.Component.extend(Ember.Evented, {
  items: null,
  withoutThumbs: false,
  isDisplayThumbs: computed.not('withoutThumbs'),

  initRunner: on('init', function() {
    this.set('items', []);
  }),

  observerComponentInDom: Ember.on('insertInDOM', function() {
    this._initItemGallery();
  }),

  onInsert: on('didInsertElement', function() {
    this.trigger('insertInDOM');
  }),

  _buildOptions: function() {
    var reqOpts = {
      history: false
    };

    var options = merge(reqOpts, this.get('options') || {});
    return options;
  },

  _initItemGallery: function() {
    let pswpEl = this.$('.pswp')[0];
    let pswpTheme = PhotoSwipeUI_Default;
    var _this = this;
    RSVP.all(this.get('items')).then(function(items) {
      _this.set('gallery', new PhotoSwipe(
        pswpEl,
        pswpTheme,
        items,
        _this._buildOptions()
      ));
      _this._reInitOnClose();
    });
  },

  _reInitOnClose: function() {
    var component = this;
    this.get('gallery').listen('close', function() {
      run.next(function() {
        component._initItemGallery();
      });
    });
  },

  click: function() {
    if (this.get('withoutThumbs')) {
      this.send('open');
    }
  },

  actions: {
    toggleImage: function(number) {
      this.get('gallery').init();
      this.get('gallery').goTo(number);
      return false;
    },
    open: function() {
      this.get('gallery').init();
    },
  },
});
