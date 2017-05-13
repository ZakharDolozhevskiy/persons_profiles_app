import Backbone from 'backbone';
import Router from './router';
import './app.css';

new Router();
Backbone.history.start({ pushState: true, root: '/' });
