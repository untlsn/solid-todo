import { useForm } from '~/UseForm';
import TextField from '~/components/atoms/TextField';

interface AddPointFormFields {
  name: string
}

const AddPage = () => {
  const { register, handleSubmit } = useForm<AddPointFormFields>();

  const submit = handleSubmit((values) => {
    console.log({ ...values });
  });

  return (
    <div class="bg-gray-200 min-h-page py-8">
      <form onSubmit={submit} class="bg-white w-180 m-auto p-4 rounded-xl shadow space-y-4">
        <TextField placeholder="Point name" inputSpread={register('name')} />
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
