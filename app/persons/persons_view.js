import $ from 'jquery';
import Backbone from 'backbone';
import template from './template.pug';

export default Backbone.View.extend({
  template: template,

  tagName: 'div',

  el: '',

  className: '',

  events: {},

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template({ name: 'Zakhar' }));
  }
});
