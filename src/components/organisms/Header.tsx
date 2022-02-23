import * as Icons from '~icons';

const Header = () => {
  return (
    <div class="h-16">
      <header class="fixed top-0 left-0 w-screen bg-main-fuchsia h-16 flex items-center px-8 text-white justify-between">
        <h1 class="text-4xl font-semibold">
          <a href="/">
            ToCount
          </a>
        </h1>
        <nav>
          <a href="/points/add">
            <Icons.Plus class="text-4xl" />
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
