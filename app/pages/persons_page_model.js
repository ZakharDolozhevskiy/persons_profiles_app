import Backbone from 'backbone';
import PersonsCollection from '../persons/persons_collection';
import PersonDetailsModel from '../person_details/person_details_model';

export default Backbone.Model.extend({
  initialize() {
    this.persons = new PersonsCollection();
    this.personDetails = new PersonDetailsModel();

    this.listenTo(this, 'router:change:id', this.onSelectFromRouter);
    this.listenTo(this.persons, 'person:selected', this.onSelect);
    this.trigger('init:done');
  },

  onSelectFromRouter(id) {
    if (id) {
      this.persons.selectPersonById(+id);
      this.personDetails.set({ personId: +id });
    } else {
      this.persons.resetPrevSelection();
      this.personDetails.reset();
    }
  },

  onSelect(id) {
    Backbone.history.navigate(`persons/${id}`);
    this.personDetails.set({ personId: id });
  }
});
