// FILE: src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MediaPreviewView from '../views/MediaPreviewView.vue';
import LoadingView from '../views/LoadingView.vue';
import ResultView from '../views/ResultView.vue';
import ExplanationView from '../views/ExplanationView.vue';
import JourneyView from '../views/JourneyView.vue';
import FlagDetailView from '../views/FlagDetailView.vue';
import HelpView from '../views/HelpView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/preview',
    name: 'preview',
    component: MediaPreviewView
  },
  {
    path: '/loading',
    name: 'loading',
    component: LoadingView
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
  },
  {
    path: '/explanation',
    name: 'explanation',
    component: ExplanationView
  },
  {
    path: '/journey',
    name: 'journey',
    component: JourneyView
  },
  {
    path: '/flags/:flagId',
    name: 'flagDetail',
    component: FlagDetailView
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

