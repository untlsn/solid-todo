interface Todo {
  name: string,
  done: boolean
}

export const [todoStore, setTodoStore] = createStore({
  todos: [] as Todo[],
});
