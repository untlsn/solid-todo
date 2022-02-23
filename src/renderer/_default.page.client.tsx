import { hydrate, render } from 'solid-js/web';
import { useClientRouter } from 'vite-plugin-ssr/client/router';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import PageWrapper from '~/providers/PageWrapper';
import '~/assets/style/global.css';


let dispose: () => void;

const { hydrationPromise } = useClientRouter({
  render(pageContext) {
    const content = document.getElementById('page-view');
    dispose?.();

    if (pageContext.isHydration) {
      dispose = hydrate(
        () => <PageWrapper {...pageContext} />,
        content!,
      );
    } else {
      render(
        () => <PageWrapper {...pageContext} />,
        content!,
      );
    }
  },
  onTransitionStart,
  onTransitionEnd,
});

hydrationPromise.then(() => {
  console.log('Hydration finished; page is now interactive.');
});

function onTransitionStart() {
  console.log('Page transition start');
}
function onTransitionEnd() {
  console.log('Page transition end');
}
