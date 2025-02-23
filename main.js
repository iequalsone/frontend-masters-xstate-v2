import './style.css';
import { createMachine, interpret } from 'xstate';

import { raise } from 'xstate/lib/actions';

const machine = createMachine({
  initial: 'loading',
  states: {
    loading: {
      initial: 'gettingData',
      states: {
        gettingData: {
          after: {
            1000: 'gettingMoreData',
          },
        },
        gettingMoreData: {
          after: {
            500: 'finished',
          },
        },
        finished: {
          type: 'final',
        },
      },
      onDone: {
        target: 'loaded',
        actions: () => console.log('Done!'),
      },
    },
    loaded: {
      type: 'final',
    },
  },
}).withConfig({
  actions: {
    loadData: () => console.log('configured loading data!'),
  },
  guards: {
    greaterThan100: (context) => context.count > 100,
  },
});

const service = interpret(machine).start();

service.subscribe((state) => {
  console.log(state.value, state.actions);
});

window.service = service;
