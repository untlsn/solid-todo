import * as Icons from '~icons';
import { NavLink } from 'solid-app-router';

const Header = () => {
  return (
    <div class="h-16">
      <header class="fixed top-0 left-0 w-screen bg-main-fuchsia h-16 flex items-center px-8 text-white justify-between">
        <h1 class="text-4xl font-semibold">
          <NavLink class="text-inherit no-underline" href="/">
            ToCount
          </NavLink>
        </h1>
        <nav>
          <NavLink class="text-inherit no-underline" href="/points/add">
            <Icons.Plus class="text-4xl" />
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
