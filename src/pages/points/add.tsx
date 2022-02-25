import { useForm } from '~/UseForm';
import TextField from '~/components/atoms/TextField';
import { createEffect } from 'solid-js';
import Switch from '~/components/atoms/Switch';
import { setStore } from '~/store';
import { ToDoPoint } from '~/store/types';
import uuid from '~/helpers/uuid';
import checkType from '~/helpers/checkType';
import Button from '~/components/atoms/Button';
import { useNavigate } from 'solid-app-router';

interface AddPointFormFields {
  name: string
  countable: boolean
  maxCount?: number
  color: string
}

const Add = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, clear, setValue } = useForm<AddPointFormFields>({ clearOnSubmit: true });

  const submit = handleSubmit(({ countable, ...spread }) => {
    const id = uuid();
    setStore('points', id, checkType<ToDoPoint>({
      id,
      ...spread,
      maxCount: countable ? spread.maxCount! : 1,
      curCount: 0,
    }));
    navigate('/');
  });

  createEffect(() => {
    if (!watch('countable')) clear('maxCount');
  });

  return (
    <div class="bg-gray-200 min-h-page py-8">
      <div class="bg-white w-180 m-auto p-4 rounded-xl shadow space-y-4">
        <TextField placeholder="Point name" spread={{ ...register('name'), tabIndex: 1 }} />
        <Switch
          onCheck={(checked) => setValue('countable', checked)}
          checked={!!watch('countable')}
          tabIndex={2}
        >
          countable
        </Switch>
        <div class={watch('countable') ? '' : 'opacity-50'}>
          <TextField
            placeholder="Count"
            spread={{
              ...register('maxCount', { valueAsNumber: true }),
              disabled: !watch('countable'),
              tabIndex: 3,
            }}
          />
        </div>
        <label class="flex items-center">
          <button>Pick color</button>
          <input
            type="color"
            value="#ffffff"
            onChange={(ev) => setValue('color', ev.currentTarget.value)}
          />
        </label>
        <div class="text-right">
          <Button onClick={submit} tabIndex={4}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Add;
