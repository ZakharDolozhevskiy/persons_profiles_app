import Backbone from 'backbone';

import { api } from '../config';

export default Backbone.Model.extend({
  url: `${api.endpoint}/users?api_token=${api.token}`,

  initialize: function() {
    this.fetch();
  },

  parse: response => response.data[0],
});
