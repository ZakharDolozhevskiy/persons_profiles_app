import Backbone from 'backbone';
import AppView from './layout/header_view';
import PersonsView from './persons/persons_view';
import PersonsCollection from './persons/persons_collection';
import PersonDetailsView from './person_details/person_details_view';
import PersonDetailsModel from './person_details/person_details_model';

export default Backbone.Router.extend({
  routes: {
    '': 'root',
    'persons(/:id)': 'persons',
    '*notFound': 'defaultRoute'
  },
  root: function() {
    this.navigate('persons', { trigger: true });
  },
  persons(personId) {
    const personsCollection = new PersonsCollection(personId);
    const personDetailsModel = new PersonDetailsModel(personId);

    new AppView().render();
    new PersonsView({ collection: personsCollection }).render();
    new PersonDetailsView({ model: personDetailsModel }).render();

    this.listenTo(personsCollection, 'person:selected', function(personId) {
      personDetailsModel.set({ personId });
    })
  },
  defaultRoute() {
    this.navigate('', { trigger: true });
  }
});
