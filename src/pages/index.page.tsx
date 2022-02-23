import { For, Show } from 'solid-js';
import { setStore, store } from '~/store';

const increment = (num: number) => num+1;
const decrement = (num: number) => num-1;

const setCurCount = (index: number, callback: (num: number) => number) => {
  setStore('points', index, 'curCount', callback);
};

export const Page = () => {
  return (
    <div class='flex flex-col items-center justify-center h-screen bg-gray-200'>
      <For each={store.points}>{
        (point, i) => {
          return (
            <article>
              <button
                class="p-2 border-1"
                onClick={() => {
                  if (point.maxCount > 1) {
                    if (point.curCount < point.maxCount) setCurCount(i(), increment);
                  } else {
                    setCurCount(i(), it => Number(!it));
                  }
                }}
              >
                +
              </button>
              <Show when={point.maxCount > 1}>
                <button
                  class="p-2 border-1"
                  onClick={() => {
                    if (point.curCount > 0) setCurCount(i(), decrement);
                  }}
                >
                  -
                </button>
              </Show>
              {point.name}
              <Show
                when={point.maxCount > 1}
                children={`${point.curCount} / ${point.maxCount}`}
                fallback={point.curCount ? '+' : '-'}
              />
            </article>
          );
        }
      }</For>
    </div>
  );
};
