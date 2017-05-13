import Backbone from 'backbone';
import HeaderView from '../layout/header_view';
import template from './presons_page_template.pug';
import './presons_page.css'

export default Backbone.View.extend({
  template: template,

  render() {
    this.$el.html(this.template());
    new HeaderView({ el: '#header '}).render();
  }
});
