import Backbone from 'backbone';
import UserWidgetView from '../widgets/user_widget_view';
import ActivitiesWidgetView from '../widgets/activities_widget_view';
import template from './header_template.pug';
import './header.css';

export default Backbone.View.extend({
  template: template,

  el: '#header',

  render() {
    this.$el.html(this.template());
    this.renderWidgets();
    this.trigger('render:done');
  },

  renderWidgets() {
    const userWidgetView = new UserWidgetView();
    const activitiesWidgetView = new ActivitiesWidgetView();

    userWidgetView.render();
    activitiesWidgetView.render();

    this.$el.find('.deals-widget').before(activitiesWidgetView.el);
    this.$el.append(userWidgetView.el);
  }
});
