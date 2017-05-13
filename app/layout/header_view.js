import Backbone from 'backbone';
import UserWidgetView from '../widgets/user_widget_view';
import template from './header_template.pug';
import './header.css';

export default Backbone.View.extend({
  template: template,

  render() {
    this.$el.html(this.template());
    this.renderWidgets();
    this.trigger('render:done');
  },

  renderWidgets() {
    const userWidgetView = new UserWidgetView();

    userWidgetView.render();
    this.el.appendChild(userWidgetView.el);
  }
});
