import {setupApiStore} from '../../utils/testUtils';
import {apiSlice} from '../api/employeeSlice';
import {applicationSlice, setLoading} from '../application/application';
import {employeeSlice} from '../employee';

describe('Application Action', () => {
  test('Set loading', () => {
    const {store} = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    const stateBeforeAction = store.getState();
    expect(stateBeforeAction.application.loading).toBe(false);
    store.dispatch(setLoading(true));
    const stateAfterAction = store.getState();
    expect(stateAfterAction.application.loading).toBe(true);
  });
});
