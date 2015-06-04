/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Ember from 'ember';

const run = Ember.run;
const computed = Ember.computed;
const on = Ember.on;
const RSVP = Ember.RSVP;
const isEmpty = Ember.isEmpty;
const isPresent = Ember.isEmpty;
const merge = Ember.merge;

export default Ember.Component.extend(Ember.Evented, {
  items: [],
  withoutThumbs: false,
  isDisplayThumbs: computed.not('withoutThumbs'),

  observerComponentInDom: Ember.on('insertInDOM', function() { 
    var _this = this; 
    if (this.get('content') && !isEmpty(this.get('content'))) {
       return this._initItemGallery(this.get('content'));
    }
    else {
      RSVP.all(this.get('items')).then(function(items){
        _this._initItemGallery(items); 
      });
    }
  }),

  onInsert: on('didInsertElement', function() {
    this.trigger('insertInDOM');
  }),

  _buildOptions: function(getThumbBoundsFn) {
     var reqOpts = {
      history: false
    };

    if (isPresent(getThumbBoundsFn)) {
      reqOpts.getThumbBoundsFn = getThumbBoundsFn;
    }

    var options = merge(reqOpts, this.get('options') || {});
    return options;
  },

  _initItemGallery: function(items) {
    let pswpEl = this.$('.pswp')[0];
    let pswpTheme = PhotoSwipeUI_Default;
    this.set('gallery', new PhotoSwipe(
      pswpEl,
      pswpTheme,
      items,
      this._buildOptions()
    ));
    this._reInitOnClose(items);
  },

  _reInitOnClose: function(items) {
    var component = this;
    this.get('gallery').listen('close', function() {
      run.next(function() {
        component._initItemGallery(items);
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

  _getBounds: function(i) {
    var img      = this.$('img').get(i),
        position = this.$(img).position(),
        width    = this.$(img).width();
    return {x: position.left, y: position.top, w: width};
  },
});
