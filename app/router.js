import Backbone from 'backbone';
import PersonsPageView from './pages/persons_page_view';
import PersonsPageModel from './pages/persons_page_model';

export default Backbone.Router.extend({
  activeRoute: '',
  activePageModel: null,
  routes: {
    '': 'root',
    'persons(/:id)': 'persons',
    '*notFound': 'defaultRoute'
  },
  root() {
    this.navigate('persons', { trigger: true });
  },
  persons(personId) {
    if (this.activeRoute !== 'persons') {
      this.activeRoute = 'persons';
      this.activePageModel = new PersonsPageModel();
      new PersonsPageView({ model: this.activePageModel }).render();
    }

    this.activePageModel.trigger('router:change:id', personId);
  },
  defaultRoute() {
    this.navigate('', { trigger: true });
  }
});
