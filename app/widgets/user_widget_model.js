import Backbone from 'backbone';
import { api } from '../config';

export default Backbone.Model.extend({
  url: `${api.endpoint}/users?api_token=${api.token}`,

  initialize() { this.fetch(); },

  parse(response) { return response.data[0]; },
});
