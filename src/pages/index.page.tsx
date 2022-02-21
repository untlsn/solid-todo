import { For } from 'solid-js';
import { setStore, store } from '~/store';
import { useSimpleForm } from '~/UseForm';
import { produce } from 'solid-js/store';
import { nanoid } from 'nanoid';

export const Page = () => {
  const { register, handleSubmit } = useSimpleForm({ defaultValue: '', clearOnSubmit: true });

  const submit = handleSubmit((name) => {
    setStore(produce(store => {
      store.points.push({
        id: nanoid(6),
        name,
        count: 1,
      });
    }))
  })

  return (
    <div class='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={submit} class="border-2 rounded">
        <input class="px-2 py-1" {...register()} />
        <button class="border-l-2 px-2">add</button>
      </form>
      <ul class="list-decimal">
        <For each={store.points}>{
          (point) => <li>{point.name}</li>
        }</For>
      </ul>
    </div>
  );
};
