import { Tweet } from '@watson/models';
import { dataSourceClient, filterClient, tweetClient } from './clients';
import { Filterer } from './lib/Filterer';

const run = async () => {
  console.log('Filtering tweets...');

  // Obtener todos los data sources habilitados
  const dataSources = await dataSourceClient.getAll({
    from: 0,
    size: 10,
    filter: {
      enabled: true,
    },
  });

  for (const dataSource of dataSources.data) {
    console.log('[Data source]:', dataSource.name);
    // Obtener todos los filtros habilitados de un data source
    const filters = await filterClient.getAll({
      from: 0,
      size: 20,
      filter: {
        enabled: true,
        data_source_id: dataSource._id,
      },
    });

    for (const filter of filters.data) {
      console.log('[Filter]:', filter.name);
      const filterer = new Filterer(filter.ai_instruction);

      // Busco los tweets que no aún no had sido filtrados
      // y los filtro. Por cada fitrado hay que actualizar el tweet si es necesario
      // y el last_filter_date del filtro
      const size = 20;
      let from = 0;
      while (true) {
        const tweets = await tweetClient.getAll({
          from,
          size,
          filter: {
            data_source_id: dataSource._id,
            created_at: {
              $gt: filter.last_filter_date,
            },
          },
          sort: {
            created_at: 1,
          },
        });

        // Filtrar tweets en paralelo
        const compliedList = await Promise.all(
          tweets.data.map((tweet: Tweet) => {
            return filterer.comply(tweet.text);
          })
        );

        // Marco los tweets que cumplen con el filtro
        const updateRequests: Promise<void>[] = [];
        for (const [index, complied] of compliedList.entries()) {
          let filterIds = tweets.data[index].filter_ids || [];
          if (complied) {
            // Lo agrega
            filterIds.push(filter._id);
          } else {
            // lo elimina
            filterIds = filterIds.filter((id) => id !== filter._id);
          }
          updateRequests.push(
            tweetClient.update(tweets.data[index]._id, {
              // Elimino los duplicados
              filter_ids: Array.from(new Set(filterIds)),
            })
          );
        }

        // Actualizo el last_filter_date del filtro
        if (tweets.data.length > 0) {
          updateRequests.push(
            filterClient.update(filter._id, {
              last_filter_date: tweets.data[tweets.data.length - 1].created_at,
            })
          );
        }

        // Espero a que los updates terminen
        await Promise.all(updateRequests);

        console.log(`> Filtered: ${tweets.data.length} / ${tweets.total}`);

        // Condición de salida
        if (tweets.data.length < size) {
          break;
        }

        // Incrementar el from
        from += size;
      }
    }
  }
};

run();
