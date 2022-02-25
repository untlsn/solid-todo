import { createStore } from 'solid-js/store';
import { ToDoPoint } from './types';

export const [store, setStore] = createStore({
  points: {} as Record<string, ToDoPoint>,
  get pointsArr(): ToDoPoint[] {
    return Object.values(store.points);
  },
});
