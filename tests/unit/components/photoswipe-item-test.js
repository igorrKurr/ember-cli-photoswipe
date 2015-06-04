import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var galleryMock;
var srcUrl = 'http://placekitten.com/g/600/400';

moduleForComponent('photoswipe-item', {
  beforeEach: function() {
    galleryMock = Ember.Object.create({
      items: [],
    });
  },
  afterEach: function() {
    galleryMock = null;
  }
});

test('it renders', function(assert) {
  assert.expect(3);

  var component = this.subject();
  assert.equal(galleryMock.get('items.length'), 0);

  Ember.run(function(){
    component.set('gallery', galleryMock);
    component.set('src', srcUrl);
  });

  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(galleryMock.get('items.length'), 1);
});
