import Backbone from 'backbone';
import moment from 'moment';
import template from './template.pug';
import './person_details.css';

export default Backbone.View.extend({
  el: '#main',

  template: template,

  dataToRender: {},

  initialize() {
    this.listenTo(this.model, 'fetch:start', this.render);
    this.listenTo(this.model, 'fetch:done', this.render);
    this.listenTo(this.model, 'fetch:error', this.render);
    this.listenTo(this.model, 'change:personId', this.render);
    this.listenTo(this.model, 'reset', this.reset);

    this.dataToRender.getActivityDate = this.getActivityDate.bind(this);
    this.dataToRender.formatDate = this.formatDate;
  },

  render() {
    let attrs = this.model.attributes;
    this.dataToRender.deals = attrs.deals;
    this.dataToRender.person = attrs.info;
    this.dataToRender.isLoading = attrs.isLoading;
    this.dataToRender.isFetchError = attrs.fetchError;

    this.$el.html(this.template(this.dataToRender));
  },

  reset() {
    this.$el.text('Select person for more details');
  },

  formatDate(date) {
    return moment(date).format('MMMM DD, YYYY');
  },

  getActivityDate(activityId) {
    let activity = this.model.findActivityById(activityId);
    return `${activity.subject} ${moment(activity.due_date).fromNow()}`;
  }
});
