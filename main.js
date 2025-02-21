import './style.css';
import { createMachine, interpret } from 'xstate';

import { raise } from 'xstate/lib/actions';

const machine = createMachine({
  initial: 'loading',
  states: {
    loading: {
      entry: ['loadData'],
      on: {
        BLAH: {
          actions: [raise({ type: 'SUCCESS ' })],
        },
        SUCCESS: {
          actions: [() => console.log('Assigning data!')],
          target: 'loaded',
        },
      },
    },
    loaded: {},
  },
}).withConfig({
  actions: {
    loadData: () => console.log('configured loading data!'),
  },
});

const service = interpret(machine).start();

service.subscribe((state) => {
  console.log(state.value, state.actions);
});

window.service = service;
