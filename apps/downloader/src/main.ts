import { CreateTweet, DataSource, Tweet } from '@watson/models';
import { dataSourceClient, tweetClient, xClient } from './clients';

/**
 * Descarga los tweets de un datasource
 * Si antes hubo un proceso que quedó a medias
 * se continuará desde donde se quedó
 * @param dataSource
 */
const downloadTweets = async (dataSource: DataSource) => {
  console.log('Descargando tweets de:', dataSource.name);
  if (dataSource.x_query.next_token) {
    console.log(
      'Resumiendo descarga pendiente, usando token: ',
      dataSource.x_query.next_token
    );
  }

  // Primero busco el último tweet descargado
  // para saber cuando detenerme
  const tweets = await tweetClient.getAll({
    from: 0,
    size: 1,
    filter: {
      data_source_id: dataSource._id,
    },
    sort: {
      created_at: -1,
    },
  });

  // El limite a descargar es de 48 horas
  // en caso de ser un datasource nuevo
  // solo se descargan los tweets de las últimas 48 horas
  let limitDate = new Date(
    new Date().getTime() - 48 * 60 * 60 * 1000
  ).toISOString();

  // Si ya se descargaron tweets entonces se actualiza el límite
  if (tweets.data.length > 0) {
    limitDate = tweets.data[0].created_at;
  }

  // Descargo los tweets
  // si ya existe un next_token continuo donde me había quedado
  let count = 0;
  let maxResults = 10;
  let nextToken = dataSource.x_query.next_token;
  while (true) {
    const response = await xClient.get(
      `/lists/${dataSource.x_query.list_id}/tweets`,
      {
        params: {
          'tweet.fields': 'id,author_id,text,public_metrics,created_at',
          pagination_token: nextToken,
          max_results: maxResults,
        },
      }
    );

    // Filtro para no salvar un tweet ya descargado
    // e identifico si ya llegué al límite
    let limitArrived = false;
    let toCreate: CreateTweet[] = [];
    for (const tweet of response.data.data || []) {
      if (new Date(tweet.created_at) <= new Date(limitDate)) {
        limitArrived = true;
        break;
      }

      toCreate.push({
        id: tweet.id,
        author_id: tweet.author_id,
        data_source_id: dataSource._id,
        text: tweet.text,
        public_metrics: tweet.public_metrics,
        created_at: tweet.created_at,
      });
    }

    // Actulizar el contador
    count += toCreate.length;
    // Actualizo el max_results a 100 para evitar
    // perder mucha plata cuando no hay información nueva reciente.
    maxResults = 100;

    // Actualizo el next_token
    nextToken = response.data.meta.next_token;
    if (limitArrived) {
      nextToken = undefined;
    }

    // Guardo los tweets de forma masiva en la base de datos
    // y actualizo el next_token en el datasource
    await Promise.all([
      dataSourceClient.update(dataSource._id, {
        x_query: {
          ...dataSource.x_query,
          next_token: nextToken,
        },
      }),
      (() => {
        if (toCreate.length === 0) {
          return Promise.resolve();
        }

        return tweetClient.createMany(toCreate);
      })(),
    ]);

    // Si no hay next token entonces termino
    if (!nextToken) {
      break;
    }
  }

  console.log(`> ${count} tweets descargados`);
};

const run = async () => {
  // Busco todos los datasources activos
  const datasources = await dataSourceClient.getAll({
    from: 0,
    size: 100,
    filter: {
      enabled: true,
    },
  });

  // Recorro cada uno de los datasources
  // y me pongo al día con los tweets de cada uno
  for (const datasource of datasources.data) {
    await downloadTweets(datasource);
  }
};

run();
