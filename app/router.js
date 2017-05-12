import Backbone from 'backbone';
import ProfilesCollection from './profiles/profiles-collection';
import ProfilesView from './profiles/profiles-view';

export default Backbone.Router.extend({
  routes: {
    '': 'root',
    'profiles(/:id)': 'profiles',
    'profiles/:uid': 'editProfile',
  },
  root: function() {
    this.navigate('profiles', {trigger: true});
  },
  profiles: function(profileId) {
    new ProfilesView().render();
    let collection = new ProfilesCollection();
    collection.activeProfileId = profileId;
    collection.fetch();
    collection.on('add', function(m) { console.log(m); });
    console.log(profileId);
  },
  editProfile: function(profileId) {
    console.log(profileId);
  }
});
