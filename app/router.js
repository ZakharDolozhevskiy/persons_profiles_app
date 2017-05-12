import Backbone from 'backbone';

import AppView from './layout/header_view';
import PersonsView from './persons/persons_view';
import PersonDetailsView from './person_details/person_details_view';

import PersonsCollection from './persons/persons_collection';
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
  persons(profileId) {
    new AppView().render();

    new PersonsView({
      collection: new PersonsCollection(profileId)
    }).render();



    //const personDetails = new PersonDetailsModel({ activeProfile: profileId });


    //new PersonDetailsView({ model: personDetails });
  },
  defaultRoute() {
    this.navigate('', { trigger: true });
  }
});
