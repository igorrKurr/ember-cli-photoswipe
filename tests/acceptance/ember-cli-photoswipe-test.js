import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: EmberCliPhotoswipe', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('button.btn').length, 1, 'Page containts button');
    click(find('button.btn'));
  });

  andThen(function() {
    assert.equal(find('.pswp__button--arrow--right').length, 2, 'Page contains arrow button');
    click(find('.pswp__button--arrow--right').first());
  });

  andThen(function() {
    assert.expect(find('.pswp__button--close').length, 1, 'Page contains close button');
    click('.pswp__button--close');
  });

});
