import { For } from 'solid-js';
import { setTodoStore, todoStore } from '~/store/todoStore';

function Index() {
  const [text, setText] = createSignal('');

  return (
    <div class="min-h-screen flex-(~ col) justify-center items-center">
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          setTodoStore('todos', [...todoStore.todos, { name: text(), done: false }]);
          setText('');
        }}
      >
        <input value={text()} onInput={(ev) => setText(ev.currentTarget.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        <For each={todoStore.todos}>
          {(todo) => (
            <li>
              {todo.name}
            </li>
          )}
        </For>
      </ul>
    </div>

  );
}

export default Index;
