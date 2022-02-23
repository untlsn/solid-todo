import Header from '~/components/organisms/Header';
import { PageContext } from '~/renderer/types';
import { setStore, store } from '~/store';
import { isServer } from 'solid-js/web';
import { createEffect } from 'solid-js';

const PageWrapper = (Props: PageContext) => {
  if (!isServer) {
    setStore('points', JSON.parse(localStorage.getItem('points') || '{}'));
    createEffect(() => {
      localStorage.setItem('points', JSON.stringify(store.points));
    });
  }

  return (
    <div class="min-h-screen">
      <Header />
      <Props.Page {...Props.pageProps} />
    </div>
  );
};

export default PageWrapper;
