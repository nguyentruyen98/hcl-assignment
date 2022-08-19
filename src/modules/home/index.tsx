import {Avatar, Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import Spin from 'components/spin/Spin';
import {CONFIG} from 'configs/index';
import {API_METHODS} from 'contants/index';
import useApi, {Api} from 'hooks/useApi';
import {ITableColumnValue} from 'modules/home/index.d';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {ROUTES} from 'routes/routes';
import {error, success} from 'utils/message';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {data, apiLoading, setCurrentParams} = useApi({
    url: `${CONFIG.API.EMPLOYEE}/users`,
    method: API_METHODS.GET,
    loadInitialState: true,
  });

  const handleEditEmployee = (record: ITableColumnValue) => {
    navigate(ROUTES.EDIT.replace(':id', `${record.id}`), {state: record});
  };
  const handleRowClick = (id: number) => {
    navigate(ROUTES.DETAIL.replace(':id', `${id}`));
  };
  const handleDeleteEmployee = async (id: number) => {
    try {
      setLoading(true);
      await Api({
        url: `${CONFIG.API.EMPLOYEE}/users/${id}`,
        method: API_METHODS.DELETE,
      });
      success();
    } catch (err) {
      console.log(err);
      error();
    } finally {
      setCurrentParams({});
      setLoading(false);
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

      render: (id: number, record) => (
        <>
          <Button onClick={() => handleEditEmployee(record)} type="primary">
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
      {loading && <Spin />}
      <Table
        loading={apiLoading}
        columns={columns}
        pagination={{pageSize: 5}}
        dataSource={data?.users}
        rowKey="id"
      />
    </>
  );
};

export default Home;
