import {
  DatabaseOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Layout, Menu, Select, Spin, theme } from 'antd';
import { useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import TweetsPage from '../tweets';
import FiltersPage from '../filters';
import { DataSource, ICollection } from '@watson/models';

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;

type View = 'BOOT' | 'ROOT';

export function RootPage() {
  const [view, setView] = useState<View>('BOOT');
  const [collapsed, setCollapsed] = useState(false);
  const [datasources, setDatasources] = useState<ICollection<DataSource>>();
  const [selectedDataSource, setSelectedDataSource] = useState<string>();

  const handleBoot = async () => {
    setTimeout(() => {
      setSelectedDataSource('1');
      setDatasources({
        from: 0,
        size: 10,
        total: 1,
        data: [
          {
            _id: '1',
            name: 'Tesla',
            description: 'Información de Tesla',
            enabled: true,
            x_query: {
              list_id: '1',
            },
            _created_at: new Date().toISOString(),
            _updated_at: new Date().toISOString(),
          },
        ],
      });
      setView('ROOT');
    }, 1000);
  };

  const handleDatasourceChange = (value: any) => {
    console.log(`Selected datasource: ${value}`);
  };

  useEffect(() => {
    handleBoot();
  }, []);

  const renderBOOT = () => (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Spin />
    </Flex>
  );

  const renderROOT = () => {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                height: '32px',
                margin: '16px',
                background: 'rgba(255, 255, 255, .2)',
                borderRadius: '6px',
              }}
            />

            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              items={[
                {
                  key: '1',
                  icon: <DatabaseOutlined />,
                  label: <Link to="/tweets">Tweets</Link>,
                },
                {
                  key: '2',
                  icon: <FilterOutlined />,
                  label: <Link to="/filters">Filters</Link>,
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                background: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div />
              <Select
                defaultValue="Tesla"
                onChange={handleDatasourceChange}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Flex justify="flex-end">
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        disabled
                        onClick={() => {}}
                      >
                        Crear
                      </Button>
                    </Flex>
                  </>
                )}
                style={{ width: 100 }}
              >
                {datasources?.data.map((datasource) => {
                  return (
                    <Option key={datasource._id} value={datasource.name}>
                      {datasource.name}
                    </Option>
                  );
                })}
              </Select>
            </Header>
            <Content style={{ margin: '16px 16px' }}>
              <div
                style={{
                  padding: 24,
                  background: 'white',
                  borderRadius: '8px',
                }}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/tweets" />} />
                  <Route
                    path="/tweets"
                    element={<TweetsPage dataSourceId={selectedDataSource!} />}
                  />
                  <Route
                    path="/filters"
                    element={<FiltersPage dataSourceId={selectedDataSource!} />}
                  />
                </Routes>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Created with ❤️ by Firedevs
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  };

  const renders: Record<View, () => JSX.Element> = {
    BOOT: renderBOOT,
    ROOT: renderROOT,
  };

  return renders[view]();
}

export default RootPage;
