import Ember from 'ember';

export default Ember.Component.extend({
  tempImg: Ember.computed('src', function() {
    let tmpImg = new Image();
    tmpImg.src = this.get('src');
    return new Ember.RSVP.Promise((resolve) => {
      Ember.$(tmpImg).one('load', function(){
        resolve({
          w: tempImg.width,
          h: tempImg.height
        });
      });
    });
  }),
  // imgInfoObserver: Ember.on('init')
  setup: Ember.on('init', Ember.observer('tmpImg', function() {
    let defaultInfo = {
      srс: this.get('src'),
      title: this.get('title'),
    };

    this.get('tempImg').then(imgInfo => {
      let info = Ember.$.extend(defaultInfo, imgInfo);
      this.get('gallery.items').push(info);
    });
  })),
});

