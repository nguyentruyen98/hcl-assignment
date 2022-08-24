import {Avatar, Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {CONFIG} from 'configs/index';
import {ALERT_TYPE, API_METHODS} from 'contants/index';
import {useToasts} from 'contexts/Toast';
import {Api} from 'hooks/useApi';
import {ITableColumnValue} from 'modules/home/index.d';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
import {useGetEmployeeQuery} from 'stores/api/employeeSlice';
const Home = () => {
  const navigate = useNavigate();
  const message = useToasts();

  const {data: employeeData, isLoading} = useGetEmployeeQuery();
  console.log(employeeData, isLoading);

  const handleRowClick = (id: number) => {
    navigate(ROUTES.DETAIL.replace(':id', `${id}`));
  };
  const handleDeleteEmployee = async (id: number) => {
    try {
      await Api({
        url: `${CONFIG.API.EMPLOYEE}/users/${id}`,
        method: API_METHODS.DELETE,
      });
      message('Success', ALERT_TYPE.SUCCESS);
    } catch (err) {
      console.log(err);
      message('Fail', ALERT_TYPE.FAIL);
    } finally {
      // setCurrentParams({});
    }
  };

  const columns: ColumnsType<ITableColumnValue> = [
    {title: 'ID', dataIndex: 'id', key: 'id'},
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render(value) {
        return <Avatar size={64} src={value} />;
      },
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      render(_, record) {
        return (
          <a
            onClick={() => handleRowClick(record.id)}
          >{`${record.firstName} ${record.lastName}`}</a>
        );
      },
    },
    {
      title: 'Employee Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'University',
      dataIndex: 'university',
      key: 'university',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',

      render: (id: number) => (
        <Button onClick={() => handleDeleteEmployee(id)} danger>
          Remove
        </Button>
      ),
    },
  ];
  return (
    <Table
      loading={isLoading}
      columns={columns}
      pagination={{pageSize: 5}}
      dataSource={employeeData?.users}
      rowKey="id"
    />
  );
};

export default Home;
