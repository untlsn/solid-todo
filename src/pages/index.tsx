import { createSignal, For } from 'solid-js';
import { setStore, store } from '~/store';
import PointTile from '~/components/organisms/PointTile';
import Button from '~/components/atoms/Button';
import { produce } from 'solid-js/store';
import { closestLayoutCenter, DragDropProvider, DragDropSensors, SortableProvider } from '@thisbeyond/solid-dnd';

const Page = () => {
  const [ids, setIds] = createSignal(Object.keys(store.points));

  const onDragEnd = ({ draggable, droppable }: any) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setIds(updatedItems);
      }
    }
  };

  return (
    <div class='flex gap-4 flex-col items-center justify-center min-h-screen bg-gray-200'>
      <DragDropProvider
        onDragEnd={onDragEnd}
        collisionDetectionAlgorithm={closestLayoutCenter}
      >
        <DragDropSensors />
        <SortableProvider ids={ids()}>
          <For each={ids().map(id => store.points[id])}>{PointTile}</For>
        </SortableProvider>
      </DragDropProvider>
      <Button onClick={() => {
        setStore(produce(store => store.points = {}));
      }}>Clear</Button>
    </div>
  );
};

export default Page;
