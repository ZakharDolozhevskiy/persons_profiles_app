import Backbone from 'backbone';
import PersonModel from '../person/person_model';
import { api } from '../config';

export default Backbone.Collection.extend({
  url: `${api.endpoint}/persons?start=0&api_token=${api.token}`,
  model: PersonModel,
  defaultSelectedPerson: null,

  initialize() {
    this.listenTo(this, 'change:isSelected', this.onSelect);
    this.fetch();
  },

  parse(response) {
    if (this.defaultSelectedId) {
      let person = response.data.find(
        person => person.id === this.defaultSelectedId);

      if (person) {
        person.isSelected = true;
      }
    }
    return response.data;
  },

  onSelect(personModel) {
    if (personModel.attributes.isSelected) {
      this.resetPrevSelection(personModel.id);
      this.trigger('person:selected', personModel.id);
    }
  },

  selectPersonById(id) {
    if (this.length === 0) {
      this.defaultSelectedId = id;
    } else {
      let person = this.get(id);
      person && person.set({ isSelected: true });
    }
  },

  resetPrevSelection(selectedPersonId) {
    this.forEach(function(model) {
      if (selectedPersonId !== model.id && model.attributes.isSelected) {
        model.set({ isSelected: false });
      }
    })
  }
});
