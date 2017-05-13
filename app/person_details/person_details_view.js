import Backbone from 'backbone';
import moment from 'moment';
import template from './template.pug';
import './person_details.css';

export default Backbone.View.extend({
  template: template,

  initialize() {
    this.listenTo(this.model, 'fetch:start', this.render);
    this.listenTo(this.model, 'fetch:done', this.render);
    this.listenTo(this.model, 'fetch:error', this.render);
    this.listenTo(this.model, 'change:personId', this.render);
  },

  render() {
    let attr = this.model.attributes;
    let payload = {
      person: attr.info,
      deals: attr.deals,
      formatDate: this.formatDate,
      getLastActivity: this.getLastActivity.bind(this),
      getNextActivity: this.getNextActivity.bind(this),
      isLoading:  attr.isLoading,
      isFetchError: attr.fetchError
    };
    console.log(attr.fetchError);
    this.$el.html(this.template(payload));
  },

  formatDate(date) {
    return moment(date).format('MMMM DD, YYYY');
  },

  getLastActivity(activityId) {
    let activity = this.model.findActivityById(activityId);

    return `${activity.subject} ${moment(activity.due_date).fromNow()}`;
  },

  getNextActivity(activityId) {
    let activity = this.model.findActivityById(activityId);

    return `${activity.subject} ${moment(activity.due_date).fromNow()}`;
  },
});
