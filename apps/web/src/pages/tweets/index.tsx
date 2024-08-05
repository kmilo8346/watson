import { Checkbox, Flex, Layout, message, Spin, Typography } from 'antd';
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
        handleSearch([]);
      }, 100);
    } catch (error) {
      console.error('Failed to boot:', error);

      message.error(
        'No se pudo cargar la página. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const handleSearch = async (checkedValues: string[]) => {
    try {
      setLoading(true);
      const tweets = await tweetClient.getAll({
        from: 0,
        size: 10,
        filter: {
          data_source_id: props.dataSourceId,
          filter_ids: {
            $in: checkedValues,
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

  const renderBOOT = () => (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Spin />
    </Flex>
  );

  const renderROOT = () => {
    const renderContent = () => {
      if (!filters) {
        return <Spin />;
      }

      return (
        <div className="light">
          {tweets?.data.map((tweet) => (
            <TweetComponent key={tweet._id} id={tweet.id} />
          ))}
        </div>
      );
    };
    return (
      <Layout>
        <Sider
          width="35%"
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
            onChange={handleSearch}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
        </Sider>
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
