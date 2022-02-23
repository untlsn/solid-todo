import { useForm } from '~/UseForm';
import TextField from '~/components/atoms/TextField';
import { createEffect } from 'solid-js';
import Switch from '~/components/atoms/Switch';

interface AddPointFormFields {
  name: string
  countable: boolean
  count?: number
}

const AddPage = () => {
  const { register, handleSubmit, watch, clear, setValue } = useForm<AddPointFormFields>();

  const submit = handleSubmit((values) => {
    console.log({ ...values });
  });

  createEffect(() => {
    console.log(watch('countable'));
    if (!watch('countable')) clear('count');
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
              ...register('count'),
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
