import fetchMock from 'jest-fetch-mock';

import {CONFIG} from '../../configs';
import {employeeDetail, employeeList} from '../../utils/testData';
import {setupApiStore} from '../../utils/testUtils';
import {apiSlice} from '../api/employeeSlice';
import {applicationSlice} from '../application/application';
import {employeeSlice} from '../employee';

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Get employee list', () => {
  const storeRef = setupApiStore(apiSlice, {
    application: applicationSlice.reducer,
    employee: employeeSlice.reducer,
  });
  fetchMock.mockResponse(JSON.stringify({}));

  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify(employeeList));

    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.getEmployee.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const {method, url} = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${CONFIG.API.EMPLOYEE}/users`);
      });
  });

  test('successful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(JSON.stringify([employeeList]));
    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.getEmployee.initiate(undefined))
      .then((action: any) => {
        const {status, data, isSuccess} = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toEqual([employeeList]);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.getEmployee.initiate(undefined))
      .then((action: any) => {
        const {
          status,
          error: {error},
          isError,
        } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Create Employee', () => {
  const newEmployee = {
    firstName: 'Truyen',
    lastName: 'Nguyen',
    age: 24,
  };

  test('request is correct', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(JSON.stringify(employeeList));

    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.createEmployee.initiate(newEmployee))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const {method, url} = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('POST');
        expect(url).toBe(`${CONFIG.API.EMPLOYEE}/users/add`);
      });
  });

  test('successful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(
      JSON.stringify({
        ...employeeList,
        users: [...employeeList.users, newEmployee],
      }),
    );
    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.createEmployee.initiate(newEmployee))
      .then((action: any) => {
        const {data} = action;
        expect(data).toEqual({
          ...employeeList,
          users: [...employeeList.users, newEmployee],
        });
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.createEmployee.initiate(newEmployee))
      .then((action: any) => {
        const {
          error: {error},
        } = action;
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Get employee detail', () => {
  const storeRef = setupApiStore(apiSlice, {
    application: applicationSlice.reducer,
    employee: employeeSlice.reducer,
  });
  fetchMock.mockResponse(JSON.stringify({}));
  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify(employeeDetail));

    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.getEmployeeDetail.initiate(employeeDetail.id),
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const {method, url} = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${CONFIG.API.EMPLOYEE}/users/1`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(JSON.stringify(employeeDetail));
    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.getEmployeeDetail.initiate(employeeDetail.id),
      )
      .then((action: any) => {
        const {data, isSuccess, status} = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toEqual(employeeDetail);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.getEmployeeDetail.initiate(employeeDetail.id),
      )
      .then((action: any) => {
        const {
          status,
          error: {error},
          isError,
        } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Delete employee', () => {
  const storeRef = setupApiStore(apiSlice, {
    application: applicationSlice.reducer,
    employee: employeeSlice.reducer,
  });
  fetchMock.mockResponse(JSON.stringify({}));
  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify(employeeDetail));

    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.deleteEmployee.initiate(employeeDetail.id),
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const {method, url} = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('DELETE');
        expect(url).toBe(`${CONFIG.API.EMPLOYEE}/users/1`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(JSON.stringify({isSuccess: true}));
    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.deleteEmployee.initiate(employeeDetail.id),
      )
      .then((action: any) => {
        const {data} = action;
        expect(data).toEqual({isSuccess: true});
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(
        apiSlice.endpoints.deleteEmployee.initiate(employeeDetail.id),
      )
      .then((action: any) => {
        const {
          error: {error},
        } = action;
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Update employee', () => {
  const storeRef = setupApiStore(apiSlice, {
    application: applicationSlice.reducer,
    employee: employeeSlice.reducer,
  });
  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.updateEmployee.initiate(employeeDetail))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const {method, url} = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('PUT');
        expect(url).toBe(`${CONFIG.API.EMPLOYEE}/users/1`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockResponse(JSON.stringify({isSuccess: true}));
    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.updateEmployee.initiate(employeeDetail))
      .then((action: any) => {
        const {data} = action;
        expect(data).toEqual({isSuccess: true});
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(apiSlice, {
      application: applicationSlice.reducer,
      employee: employeeSlice.reducer,
    });
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(apiSlice.endpoints.updateEmployee.initiate(employeeDetail))
      .then((action: any) => {
        const {
          error: {error},
        } = action;
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});
