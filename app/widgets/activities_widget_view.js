import Backbone from 'backbone';
import template from './activities_widget_template.pug';
import ActivitiesWidgetModel from './activities_widget_model';
import './activities_widget.css';

export default Backbone.View.extend({
  tagName: 'a',

  template: template,

  initialize() {
    this.model = new ActivitiesWidgetModel();
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    this.$el.html(this.template({ model: this.model.attributes }));
  }
});
