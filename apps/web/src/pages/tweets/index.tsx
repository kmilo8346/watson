import {
  Checkbox,
  Divider,
  Flex,
  Layout,
  message,
  Pagination,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { Tweet as TweetComponent } from 'react-tweet';
import { filterClient, tweetClient } from '../../clients';
import { Filter, ICollection, Tweet } from '@watson/models';

const { Sider, Content } = Layout;

type View = 'BOOT' | 'ROOT';

interface TweetsPageProps {
  dataSourceId: string;
}

export function TweetsPage(props: TweetsPageProps) {
  const [view, setView] = useState<View>('BOOT');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<ICollection<Filter>>();
  const [tweets, setTweets] = useState<ICollection<Tweet>>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleBoot = async () => {
    try {
      const filters = await filterClient.getAll({
        from: 0,
        size: 10,
        filter: {
          data_source_id: props.dataSourceId,
        },
      });

      setFilters(filters);
      setView('ROOT');

      setTimeout(() => {
        handleSearch({
          from: 0,
          filterIds: [],
        });
      }, 100);
    } catch (error) {
      console.error('Failed to boot:', error);

      message.error(
        'No se pudo cargar la página. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const handleSearch = async (searchParams: {
    from: number;
    filterIds: string[];
  }) => {
    try {
      setLoading(true);
      const tweets = await tweetClient.getAll({
        from: searchParams.from,
        size: 10,
        filter: {
          data_source_id: props.dataSourceId,
          filter_ids: {
            $in: searchParams.filterIds,
          },
        },
        sort: {
          created_at: -1,
        },
      });
      setTweets(tweets);
      setLoading(false);
    } catch (error) {
      console.error('Failed to search:', error);

      message.error(
        'No se pudo cargar los tweets. Por favor, inténtalo de nuevo.'
      );
    }
  };

  useEffect(() => {
    handleBoot();
  }, []);

  useEffect(() => {
    // Hago una busqueda cuando se seleccionan los filtros
    // El from siempre se reinicia a 0
    handleSearch({
      from: 0,
      filterIds: selectedFilters,
    });
  }, [selectedFilters]);

  const renderBOOT = () => (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Spin />
    </Flex>
  );

  const renderROOT = () => {
    const renderContent = () => {
      if (!tweets) {
        return <Spin />;
      }

      // Infiero la pagina actual
      const page = tweets.from / tweets.size + 1;

      return (
        <div className="light">
          <Flex vertical align="center">
            {tweets.data.map((tweet) => (
              <TweetComponent key={tweet._id} id={tweet.id} />
            ))}
            <Pagination
              align="start"
              defaultCurrent={page}
              total={tweets.total}
              onChange={(page) => {
                // Cuando cambia la pagina, se hace una busqueda
                // El from se calcula en base a la pagina
                // Uso los filtros actualmentet seleccionados
                handleSearch({
                  // Infiero el from en base a la pagina
                  from: (page - 1) * tweets.size,
                  filterIds: selectedFilters,
                });
              }}
            />
          </Flex>
        </div>
      );
    };
    return (
      <Layout>
        <Sider
          width="30%"
          style={{
            backgroundColor: 'white',
          }}
        >
          <Typography.Title level={5}>Filtros</Typography.Title>
          <Checkbox.Group
            options={filters?.data.map((filter) => ({
              label: filter.name,
              value: filter._id,
            }))}
            onChange={setSelectedFilters}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
        </Sider>

        <Divider type="vertical" style={{ height: '100vh', margin: 0 }} />

        <Layout>
          <Content
            style={{
              backgroundColor: 'white',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    );
  };

  const renders: Record<View, () => JSX.Element> = {
    BOOT: renderBOOT,
    ROOT: renderROOT,
  };

  return renders[view]();
}

export default TweetsPage;
