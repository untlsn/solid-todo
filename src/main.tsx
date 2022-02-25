import { setStore, store } from '~/store';
import { createEffect, lazy } from 'solid-js';
import Header from '~/components/organisms/Header';
import { render } from 'solid-js/web';
import { Router, useRoutes } from 'solid-app-router';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '~/assets/style/global.css';

const pages = Object.entries(import.meta.glob('./pages/**/*')).map(([key, it]) => {
  return {
    path: key.replace(/(\.\/pages)|(index)|(\.[tj]sx?)/g, ''),
    component: lazy(it as any),
  };
});


const Main = () => {
  const Routes = useRoutes(pages);
  setStore('points', JSON.parse(localStorage.getItem('points') || '{}'));
  createEffect(() => {
    localStorage.setItem('points', JSON.stringify(store.points));
  });

  return (
    <div class="min-h-screen">
      <Header />
      <Routes />
    </div>
  );
};

render(() => <Router><Main /></Router>, document.getElementById('page-view')!);
