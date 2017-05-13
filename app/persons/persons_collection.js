import Backbone from 'backbone';
import PersonModel from '../person/person_model';
import { api } from '../config';

export default Backbone.Collection.extend({
  url: `${api.endpoint}/persons?start=0&api_token=${api.token}`,
  model: PersonModel,
  defaultSelectedPerson: null,

  initialize(personId) {
    this.defaultSelectedPerson = +personId;
    this.listenTo(this, 'change:isSelected', this.onSelect);

    this.fetch();
  },

  parse(response) {
    if (this.defaultSelectedPerson) {
      let person = response.data.find(
        person => person.id === this.defaultSelectedPerson);

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

  resetPrevSelection(selectedPersonId) {
    this.forEach(function(model) {
      if (selectedPersonId !== model.id && model.attributes.isSelected) {
        model.set({ isSelected: false });
      }
    })
  }
});
