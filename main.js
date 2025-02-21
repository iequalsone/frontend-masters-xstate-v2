import './style.css';
import { createMachine, interpret } from 'xstate';

import { raise } from 'xstate/lib/actions';

const machine = createMachine({
  initial: 'loading',
  states: {
    loading: {
      entry: ['loadData'],
      always: {
        cond: (ctx) => ctx.count > 100,
        target: 'success',
      },
      on: {
        SKIP: [
          {
            cond: 'greaterThan100',
            target: 'loaded',
          },
          {
            target: 'error',
          },
        ],
        SUCCESS: {
          actions: [
            assign({
              count: (content, event) => context.count + event.value,
            }),
          ],
          target: 'loaded',
        },
      },
    },
    loaded: {},
    error: {},
    success: {},
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
