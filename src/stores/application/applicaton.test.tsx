import {createAsyncThunk} from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';

import {employeeDetail} from '../../utils/testData';
import {setupApiStore} from '../../utils/testUtils';
import {apiSlice} from '../api/employeeSlice';
import {applicationSlice, setLoading} from '../application/application';
import {employeeSlice} from '../employee';

beforeEach((): void => {
  fetchMock.resetMocks();
});

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
  const action = createAsyncThunk('employee/getEmployee', async () => {
    return 'data';
  });
  test('pending action', async () => {
    const {store} = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    const stateBeforeAction = store.getState();
    expect(stateBeforeAction.application.loading).toBe(false);
    await store.dispatch(action.pending());
    const stateAfterAction = store.getState();
    expect(stateAfterAction.application.loading).toBe(true);
  });
  test('fulfilled action', async () => {
    const {store} = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    const stateBeforeAction = store.getState();
    expect(stateBeforeAction.application.loading).toBe(false);
    await store.dispatch(action.fulfilled());
    const stateAfterAction = store.getState();
    expect(stateAfterAction.application.loading).toBe(false);
  });
  test('rejected action', async () => {
    const {store} = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    const stateBeforeAction = store.getState();
    expect(stateBeforeAction.application.loading).toBe(false);
    await store.dispatch(action.rejected());
    const stateAfterAction = store.getState();
    expect(stateAfterAction.application.loading).toBe(false);
  });
});
