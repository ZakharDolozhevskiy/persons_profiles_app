import Backbone from 'backbone';

import template from './template.pug';
import PersonView from '../person/person_view';

export default Backbone.View.extend({
  el: '#right_nav',

  events: {},

  template: template,

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPerson);
  },

  render: function () {
    this.$el.html(this.template());
  },

  addPerson(personModel) {
    let view = new PersonView({ model: personModel });
    this.el.firstElementChild.appendChild(view.el);
    view.render();
  }
});
