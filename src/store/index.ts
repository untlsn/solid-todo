import { createStore } from 'solid-js/store';
import { ToDoPoint } from './types';

export const [store, setStore] = createStore({
  points: [] as ToDoPoint[],
})
