import { For, Show } from 'solid-js';
import { setStore, store } from '~/store';
import PointTile from '~/components/organisms/PointTile';
import Button from '~/components/atoms/Button';
import { produce } from 'solid-js/store';
import { isServer } from 'solid-js/web';

const Page = () => {
  return (
    <div class='flex gap-4 flex-col items-center justify-center min-h-screen bg-gray-200'>
      <Show when={!isServer} fallback={<>Loading...</>}>
        <For each={store.pointsArr}>{PointTile}</For>
      </Show>
      <Button onClick={() => {
        setStore(produce(store => store.points = {}));
      }}>Clear</Button>
    </div>
  );
};

export default Page;
