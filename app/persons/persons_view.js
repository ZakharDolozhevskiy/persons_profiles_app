import Backbone from 'backbone';
import PersonView from '../person/person_view';

export default Backbone.View.extend({
  el: '#right_nav',

  initialize() {
    this.listenTo(this.collection, 'add', this.addPerson);
  },

  render() {
    this.$el.html('<ul></ul>');
  },

  addPerson(personModel) {
    let view = new PersonView({ model: personModel });
    this.el.firstElementChild.appendChild(view.el);
    view.render();
  }
});
