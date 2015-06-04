/* global PhotoSwipe */
/* global PhotoSwipeUI_Default */

import Em from 'ember';

const run = Em.run;
const computed = Ember.computed;
const $ = Ember.$;
const on = Ember.on;
const RSVP = Ember.RSVP;
const observer = Ember.observer;

export default Em.Component.extend({
  items: [],
  withoutThumbs: false,
  isDisplayThumbs: computed.not('withoutThumbs'),

  onInsert: Em.on('didInsertElement', function() {
    var _this = this; 
    if (this.get('content') && !Ember.isEmpty(this.get('content'))) {
       return this._initItemGallery(this.get('content'));
    }
    else {
      Em.RSVP.all(this.get('items')).then(function(items){
        _this._initItemGallery(items); 
      });
    }
  }),

  _buildOptions: function(getThumbBoundsFn) {
     var reqOpts = {
      history: false
    };

    if (Em.isPresent(getThumbBoundsFn)) {
      reqOpts.getThumbBoundsFn = getThumbBoundsFn;
    }

    var options = Em.merge(reqOpts, this.get('options') || {});
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
