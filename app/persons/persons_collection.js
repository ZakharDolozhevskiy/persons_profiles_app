import Backbone from 'backbone';
import PersonModel from '../person/person_model';
import { api } from '../config';

export default Backbone.Collection.extend({
  url: `${api.endpoint}/persons?start=0&api_token=${api.token}`,
  model: PersonModel,
  parse: response => response.data
});
