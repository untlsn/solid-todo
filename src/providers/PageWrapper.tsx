import Header from '~/components/organisms/Header';
import { PageContext } from '~/renderer/types';

const PageWrapper = (Props: PageContext) => {
  return (
    <div class="min-h-screen">
      <Header />
      <Props.Page {...Props.pageProps} />
    </div>
  );
};

export default PageWrapper;
