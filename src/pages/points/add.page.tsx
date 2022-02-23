import { useForm } from '~/UseForm';
import TextField from '~/components/atoms/TextField';
import { createEffect } from 'solid-js';
import Switch from '~/components/atoms/Switch';
import { setStore, store } from '~/store';
import { ToDoPoint } from '~/store/types';
import { nanoid } from 'nanoid';

interface AddPointFormFields {
  name: string
  countable: boolean
  maxCount?: number
}

const AddPage = () => {
  const { register, handleSubmit, watch, clear, setValue } = useForm<AddPointFormFields>({ clearOnSubmit: true });

  const submit = handleSubmit((values) => {
    setStore('points', store.points.length, {
      id: nanoid(),
      name: values.name,
      maxCount: values.countable ? values.maxCount : 1,
      curCount: 0,
    } as ToDoPoint);
  });

  createEffect(() => {
    if (!watch('countable')) clear('maxCount');
  });

  return (
    <div class="bg-gray-200 min-h-page py-8">
      <form onSubmit={submit} class="bg-white w-180 m-auto p-4 rounded-xl shadow space-y-4">
        <TextField placeholder="Point name" spread={register('name')} />
        <Switch
          onCheck={(checked) => setValue('countable', checked)}
          checked={!!watch('countable')}
        >
          countable
        </Switch>
        <div class={watch('countable') ? '' : 'opacity-50'}>
          <TextField
            placeholder="Count"
            spread={{
              ...register('maxCount', { valueAsNumber: true }),
              disabled: !watch('countable'),
            }}
          />
        </div>
        <div class="text-right">
          <button class="bg-main-orange text-white px-2 py-1 rounded-full font-semibold hover:opacity-70">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPage;
