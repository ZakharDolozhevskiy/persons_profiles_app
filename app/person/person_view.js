import Backbone from 'backbone';
import template from './template.pug';
import './person.css';

export default Backbone.View.extend({
  template: template,

  tagName: 'li',

  className: 'person-item',

  events: {
    'click': 'onClick'
  },

  initialize() {
    this.listenTo(this.model, 'change:isSelected', this.onSelect)
  },

  render() {
    let payload = { person: this.model.attributes };
    this.$el.html(this.template(payload));

    if (this.model.attributes.isSelected) {
      this.$el.addClass('active');
    }
  },

  onClick() { this.model.set({ isSelected: true }); },

  onSelect(personModel) {
    personModel.attributes.isSelected
      ? this.$el.addClass('active')
      : this.$el.removeClass('active');
  }
});
