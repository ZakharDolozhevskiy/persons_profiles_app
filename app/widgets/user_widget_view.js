import Backbone from 'backbone';
import template from './user_widget_template.pug';
import UserWidgetModel from './user_widget_model';

export default Backbone.View.extend({
  className: 'user_widget',
  template: template,
  tagName: 'div',

  initialize() {
    this.model = new UserWidgetModel();
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    this.$el.html(this.template({ user: this.model.attributes }));
  }
});
