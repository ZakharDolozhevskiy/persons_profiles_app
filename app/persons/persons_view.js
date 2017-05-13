import Backbone from 'backbone';
import template from './template.pug';
import PersonView from '../person/person_view';

export default Backbone.View.extend({
  template: template,

  initialize() {
    this.listenTo(this.collection, 'add', this.addPerson);
  },

  render() {
    this.$el.html(this.template());
  },

  addPerson(personModel) {
    let view = new PersonView({ model: personModel });
    this.el.firstElementChild.appendChild(view.el);
    view.render();
  }
});
