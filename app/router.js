import Backbone from 'backbone';
import PersonsView from './persons/persons_view';
import PersonsPageView from './pages/presons_page_view';
import PersonsCollection from './persons/persons_collection';
import PersonDetailsView from './person_details/person_details_view';
import PersonDetailsModel from './person_details/person_details_model';

export default Backbone.Router.extend({
  routes: {
    '': 'root',
    'persons(/:id)': 'persons',
    '*notFound': 'defaultRoute'
  },
  root() {
    this.navigate('persons', { trigger: true });
  },
  persons(personId) {
    const persons = new PersonsCollection(personId);
    const personDetails = new PersonDetailsModel(personId);

    new PersonsPageView({ el: '#app' }).render();
    new PersonDetailsView({ model: personDetails, el: '#main' });
    new PersonsView({ collection: persons, el: '#right_nav' }).render();

    this.listenTo(persons, 'person:selected', function(personId) {
      personDetails.set({ personId });
      this.navigate(`persons/${personId}`);
    })
  },
  defaultRoute() {
    this.navigate('', { trigger: true });
  }
});
