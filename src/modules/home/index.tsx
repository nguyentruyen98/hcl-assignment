import {Avatar, Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {ITableColumnValue} from 'modules/home/index.d';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
import {useDispatch, useSelector} from 'stores';
import {useGetEmployeeQuery} from 'stores/api/employeeSlice';
import {deleteEmployee} from 'stores/employee';
const Home = () => {
  const navigate = useNavigate();
  const {isLoading} = useGetEmployeeQuery();
  const dispatch = useDispatch();

  const {employees} = useSelector(state => state.employee);

  const handleRowClick = (id: number) => {
    navigate(ROUTES.DETAIL.replace(':id', `${id}`));
  };
  const handleDeleteEmployee = async (id: number) => {
    dispatch(deleteEmployee(id));
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
      dataSource={employees}
      rowKey="id"
    />
  );
};

export default Home;
