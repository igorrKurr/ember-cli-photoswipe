import Ember from 'ember';
const computed = Ember.computed;
const $ = Ember.$;
const on = Ember.on;
const RSVP = Ember.RSVP;
const observer = Ember.observer;

export default Ember.Component.extend({
  // tempImg: computed('src', function() {
  //   let tmpImg = new Image();
  //   tmpImg.src = this.get('src');
  //   return new RSVP.Promise(function(resolve){
  //     $(tmpImg).one('load', function() {
  //       resolve({
  //         w: tmpImg.width,
  //         h: tmpImg.height
  //       });
  //     });
  //   });
  // }),
  // imgInfoObserver: Ember.on('init')
  setup: on('init', function() {
    let _this = this;
    let defaultInfo = {
      srс: this.get('src'),
      title: this.get('title'),
    };
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
    // this.get('tempImg').then(function(imgInfo) {
    //   let info = $.extend(defaultInfo, imgInfo);
    //   console.log("WWIIWIWIW", info, _this.get('gallery.items'))
    //   _this.get('gallery.items').push(info);
    // });
  }),
  click: function(e) {
    e.preventDefault();
    console.log('WJWWJXMXMX', this.get('number'), this.get('gallery.gallery'))
      this.get('gallery').send(this.get('action'), this.get('number'));
    // this.sendAction('action', this.get('number'));
  }
});
