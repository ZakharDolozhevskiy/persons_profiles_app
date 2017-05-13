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
    let promises = [];

    promises.push(fetch(`${api.endpoint}/persons/${id}?api_token=${api.token}`)
      .then(this.toJSON)
      .then(payload => this.set({ info: payload.data })));

    promises.push(fetch(`${api.endpoint}/persons/${id}/deals/?api_token=${api.token}`)
      .then(this.toJSON)
      .then(payload => this.set({ deals: payload.data })));

    promises.push(fetch(`${api.endpoint}/persons/${id}/activities/?api_token=${api.token}`)
      .then(this.toJSON)
      .then(payload => this.set({ activities: payload.data })));

    Promise.all(promises)
      .then(() => this.trigger('fetch:done'))
      .catch(this.onFetchError);
  },

  onFetchError(err) {
    return console.warn(err);
  },

  toJSON(response) {
    return response.json();
  },

  findActivityById(id) {
    let activities = this.attributes.activities;
    return activities.find(activity => activity.id === id);
  }
});
