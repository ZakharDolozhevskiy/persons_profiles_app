import $ from 'jquery';
import Backbone from 'backbone';
import template from './main_template.pug';

export default Backbone.View.extend({
  el: '#main',

  template: template,

  className: '',

  initialize: function () {
    this.listenTo(this.model, 'change:info', this.render);
    this.listenTo(this.model, 'change:deals', this.renderDealsSection);
  },

  render: function () {
    if (this.model.attributes.info) {
      this.$el.html(this.template({ person: this.model.attributes.info }));
    }
  },

  renderDealsSection() {}
});
