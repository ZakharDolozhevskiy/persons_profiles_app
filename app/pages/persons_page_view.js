import Backbone from 'backbone';
import HeaderView from '../layout/header_view';
import PersonsView from '../persons_list/persons_view';
import PersonDetailsView from '../person_details/person_details_view';
import template from './persons_page_template.pug';
import './persons_page.css'

export default Backbone.View.extend({
  el: '#app',

  template: template,

  initialize() {
    this.listenTo(this.model, 'init:done', this.render)
  },

  render() {
    this.$el.html(this.template());

    new HeaderView().render();
    new PersonsView({ collection: this.model.persons }).render();
    new PersonDetailsView({ model: this.model.personDetails });
  }
});
