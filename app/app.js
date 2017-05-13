import Backbone from 'backbone';
import Router from './router';
import './styles/app.css';

new Router();
Backbone.history.start({ pushState: true, root: '/' });
