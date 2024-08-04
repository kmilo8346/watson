import { Checkbox, Flex, Layout, Spin, Typography } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { EmbeddedTweet, Tweet, TweetNotFound } from 'react-tweet';
import { fetchTweet, type Tweet as TTweet } from 'react-tweet/api';

const { Sider, Content } = Layout;

const TweetPage = async ({ id }: { id: string }) => {
  try {
    const { data, tombstone, notFound } = await fetchTweet(id);
    // DEBUG CODE
    console.log({ data, tombstone, notFound });
    return <EmbeddedTweet tweet={data!} />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};

interface TweetsPageProps {
  dataSourceId: string;
}

export function TweetsPage(props: TweetsPageProps) {
  const [tweet, setTweet] = useState<TTweet>({
    lang: 'en',
    favorite_count: 7,
    possibly_sensitive: false,
    created_at: '2024-08-04T14:45:54.000Z',
    display_text_range: [0, 200],
    entities: {
      hashtags: [],
      urls: [],
      user_mentions: [],
      symbols: [],
      media: [
        {
          display_url: 'pic.x.com/kefcrbhp3m',
          expanded_url:
            'https://twitter.com/TaiigerBlue/status/1820108907811103177/photo/1',
          indices: [22, 45],
          url: 'https://t.co/KEfcRBhp3M',
        },
      ],
    },
    id_str: '1820108907811103177',
    text: 'Q bola Incoming FSD 12.5.1.1 https://t.co/KEfcRBhp3M',
    user: {
      id_str: '2357240257',
      name: 'TaiigerBlue 🇨🇦',
      profile_image_url_https:
        'https://pbs.twimg.com/profile_images/1505311043777708032/SjPaRvMv_normal.jpg',
      screen_name: 'TaiigerBlue',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle',
    },
    edit_control: {
      edit_tweet_ids: ['1820108907811103177'],
      editable_until_msecs: '1722786354000',
      is_edit_eligible: true,
      edits_remaining: '5',
    },
    mediaDetails: [
      {
        display_url: 'pic.twitter.com/KEfcRBhp3M',
        expanded_url:
          'https://twitter.com/TaiigerBlue/status/1820108907811103177/photo/1',
        ext_media_availability: {
          status: 'Available',
        },
        indices: [22, 45],
        media_url_https: 'https://pbs.twimg.com/media/GUJTZ_rW8AAV_KL.jpg',
        original_info: {
          height: 867,
          width: 1439,
          focus_rects: [
            {
              x: 0,
              y: 61,
              w: 1439,
              h: 806,
            },
            {
              x: 0,
              y: 0,
              w: 867,
              h: 867,
            },
            {
              x: 0,
              y: 0,
              w: 761,
              h: 867,
            },
            {
              x: 34,
              y: 0,
              w: 434,
              h: 867,
            },
            {
              x: 0,
              y: 0,
              w: 1439,
              h: 867,
            },
          ],
        },
        sizes: {
          large: {
            h: 867,
            resize: 'fit',
            w: 1439,
          },
          medium: {
            h: 723,
            resize: 'fit',
            w: 1200,
          },
          small: {
            h: 410,
            resize: 'fit',
            w: 680,
          },
          thumb: {
            h: 150,
            resize: 'crop',
            w: 150,
          },
        },
        type: 'photo',
        url: 'https://t.co/KEfcRBhp3M',
      },
    ],
    photos: [
      {
        backgroundColor: {
          red: 204,
          green: 214,
          blue: 221,
        },
        cropCandidates: [
          {
            x: 0,
            y: 61,
            w: 1439,
            h: 806,
          },
          {
            x: 0,
            y: 0,
            w: 867,
            h: 867,
          },
          {
            x: 0,
            y: 0,
            w: 761,
            h: 867,
          },
          {
            x: 34,
            y: 0,
            w: 434,
            h: 867,
          },
          {
            x: 0,
            y: 0,
            w: 1439,
            h: 867,
          },
        ],
        expandedUrl:
          'https://twitter.com/TaiigerBlue/status/1820108907811103177/photo/1',
        url: 'https://pbs.twimg.com/media/GUJTZ_rW8AAV_KL.jpg',
        width: 1439,
        height: 867,
      },
    ],
    conversation_count: 1,
    news_action_type: 'conversation',
    isEdited: false,
    isStaleEdit: false,
  });

  const test = async () => {
    // const id = '1820108907811103177';
    // const { data, tombstone, notFound } = await fetchTweet(id);
    // console.log({ data, tombstone, notFound });
    // setTweet(data!);
  };

  useEffect(() => {
    test();
  }, []);

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
          options={[
            { label: 'Experiencias positivas FSD', value: '1' },
            { label: 'Experiencias negativas FSD', value: '2' },
            { label: 'Consejos de inversión', value: '3' },
            { label: 'Noticias financieras', value: '4' },
            { label: 'Feedback Cybertruck', value: '5' },
            { label: 'Contratos Megapack', value: '6' },
          ]}
          style={{ display: 'flex', flexDirection: 'column' }}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            backgroundColor: 'white',
          }}
        >
          <div className="light">
            {/* <Tweet id="1820108907811103177" /> */}
            {/* <Tweet id="1820094071102488642" />
            <Tweet id="1819952887201505355" />
            <Tweet id="1819904174630343143" /> */}

            {tweet && <EmbeddedTweet tweet={tweet} />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default TweetsPage;
