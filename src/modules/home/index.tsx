import {Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants/index';
import useApi, {Api} from 'hooks/useApi';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
interface ITableColumnValue {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
}
const Home = () => {
  const navigate = useNavigate();

  const {data, apiLoading, setCurrentParams} = useApi({
    url: `${CONFIG.API.EMPLOYEE}/employees`,
    method: API_METHODS.GET,
    loadInitialState: true,
  });

  const handleEditEmployee = () => {
    navigate(ROUTES.EDIT);
  };
  const handleDeleteEmployee = async (id: number) => {
    try {
      await Api({
        url: `${CONFIG.API.EMPLOYEE}/delete/${id}`,
        method: API_METHODS.GET,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setCurrentParams({});
    }
  };

  const columns: ColumnsType<ITableColumnValue> = [
    {title: 'ID', dataIndex: 'id', key: 'id'},
    {title: 'Employee Name', dataIndex: 'employee_name', key: 'employee_name'},
    {
      title: 'Employee Salary',
      dataIndex: 'employee_salary',
      key: 'employee_salary',
    },
    {
      title: 'Employee Age',
      dataIndex: 'employee_age',
      key: 'employee_age',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',

      render: (id: number) => (
        <>
          <Button onClick={handleEditEmployee} type="primary">
            Edit
          </Button>{' '}
          <Button onClick={() => handleDeleteEmployee(id)} danger>
            Remove
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={apiLoading}
        columns={columns}
        dataSource={data?.data}
        rowKey="id"
      />
    </>
  );
};

export default Home;
