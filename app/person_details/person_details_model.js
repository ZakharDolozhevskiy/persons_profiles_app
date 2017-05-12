import Backbone from 'backbone';
import fetch from 'isomorphic-fetch';
import { api } from '../config';

export default Backbone.Model.extend({
  attributes: {
    personId: null,
  },

  initialize(personId) {
    this.listenTo(this, 'change:personId', this.fetchPersonDetails);

    if (personId) {
      this.set({ personId });
    }
  },

  fetchPersonDetails() {
    let id = this.attributes.personId;

    fetch(`${api.endpoint}/persons/${id}?api_token=${api.token}`)
      .then(this.toJSON)
      .then(payload => this.set({ info: payload.data }))
      .catch(this.onFetchError);

    fetch(`${api.endpoint}/persons/${id}/flow/?api_token=${api.token}`)
      .then(this.toJSON)
      .then(payload => this.set({ deals: payload.data }))
      .catch(this.onFetchError);
  },

  onFetchError(err) {
    return console.warn(err);
  },

  toJSON(response) {
    return response.json();
  }

});
