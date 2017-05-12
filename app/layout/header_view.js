import Backbone from 'backbone';
import UserWidgetView from '../widgets/user_widget_view';
import template from './header_template.pug';


export default Backbone.View.extend({
  template: template,

  el: '#header',

  render: function () {
    this.$el.html(this.template());
    this.renderWidgets();
  },

  renderWidgets() {
    const userWidgetView = new UserWidgetView();

    userWidgetView.render();
    this.el.appendChild(userWidgetView.el);
  }
});
