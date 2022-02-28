import { setStore, store } from '~/store';
import { createEffect, lazy } from 'solid-js';
import Header from '~/components/organisms/Header';
import { render } from 'solid-js/web';
import { Router, useRoutes } from 'solid-app-router';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import '~/assets/style/global.css';
import { DragDropProvider, DragDropSensors } from '@thisbeyond/solid-dnd';

const pages = Object.entries(import.meta.glob('./pages/**/*') as Record<string, () => Promise<any>>)
  .map(([path, component]) => ({
    path: path
      .replace(/(\.\/pages)|(\.[tj]sx?)|(\/index)|]/g, '')
      .replace(/\[/g, ':'),
    component: lazy(component),
  }));

const Main = () => {
  const Routes = useRoutes(pages);
  setStore('points', JSON.parse(localStorage.getItem('points') || '{}'));
  createEffect(() => {
    localStorage.setItem('points', JSON.stringify(store.points));
  });

  return (
    <DragDropProvider>
      <DragDropSensors>
        <div class="min-h-screen">
          <Header />
          <Routes />
        </div>
      </DragDropSensors>
    </DragDropProvider>
  );
};

render(() => <Router><Main /></Router>, document.getElementById('page-view')!);
