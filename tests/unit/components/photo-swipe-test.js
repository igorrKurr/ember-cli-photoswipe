import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('photo-swipe');

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // render the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it renders the photoswipe template', function(assert) {
  assert.expect(1);
  this.render();
  var component = this.subject();
  var photoswipe = component.$('.pswp');

  assert.equal(photoswipe[0], component.get('pswpEl'));
});

test('the gallery attribute should be empty on insert.', function(assert) {
  assert.expect(1);
  this.render();
  var component = this.subject();

  assert.equal(component.get('gallery'), undefined, 'should not be set yet.');
});

test('the gallery attribute should be set when you pass items', function(assert) {
  assert.expect(2);
  var component = this.subject();
  component.set('items', [
    {
      src: 'http://placekitten.com/g/600/400',
      w: 600,
      h: 400,
      title: 'whooa'
    },
    {
      src: 'http://placekitten.com/g/1200/900',
      w: 1200,
      h: 900
    }
  ]);
  this.render();
  assert.ok(component.get('gallery'));
  assert.equal(typeof component.get('gallery'), 'object');
});
