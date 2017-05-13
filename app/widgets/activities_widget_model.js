import Backbone from 'backbone';
import moment from 'moment';
import { api } from '../config';

export default Backbone.Model.extend({
  url: `${api.endpoint}/activities?api_token=${api.token}`,

  defaults: { currentDay: moment().date() },

  initialize() { this.fetch(); },

  parse(response) {
    return { activities: response.data.length }
  },
});
