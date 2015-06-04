import Ember from 'ember';

const computed = Ember.computed;
const $ = Ember.$;
const on = Ember.on;
const RSVP = Ember.RSVP;

export default Ember.Component.extend({
  attributeBindings: ['style'],

  isDisplay: true,

  _style: computed('isDisplay', function() {
    if (!this.get('isDisplay')) {
      return "display: none";
    }
    return "";
  }),
  style: computed('_style', function() {
    return this.get('_style').htmlSafe();
  }),

  setup: on('init', function() {
    let _this = this;
    let tmpImg = new Image();
    tmpImg.src = this.get('src');
    var promise =  new RSVP.Promise(function(resolve){
      $(tmpImg).one('load', function() {
        resolve({
          w: tmpImg.width,
          h: tmpImg.height,
          src: _this.get('src'),
          title: _this.get('title'),
        });
      });
    });
    this.get('gallery.items').push(promise);
  }),

  click: function(e) {
    e.preventDefault();
    this.get('gallery').send(this.get('action'), this.get('number'));
  }
});
