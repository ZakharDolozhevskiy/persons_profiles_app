import Backbone from 'backbone';
import Router from './router';
import './styles/main.css';

new Router();
Backbone.history.start({ pushState: true, root: '/' });
