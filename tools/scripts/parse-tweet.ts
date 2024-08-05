const input = {
  data: {
    id: '1820226083234689127',
    edit_history_tweet_ids: ['1820226083234689127'],
    entities: {
      urls: [
        {
          start: 66,
          end: 89,
          url: 'https://t.co/Ck08x9DsB9',
          expanded_url:
            'https://twitter.com/DirtyTesLa/status/1820226083234689127/video/1',
          display_url: 'pic.twitter.com/Ck08x9DsB9',
          media_key: '7_1820225867580125185',
        },
      ],
      annotations: [
        {
          start: 0,
          end: 2,
          probability: 0.4042,
          type: 'Organization',
          normalized_text: 'FSD',
        },
      ],
    },
    author_id: '1118594454515003393',
    possibly_sensitive: false,
    created_at: '2024-08-04T22:31:31.000Z',
    text: 'FSD 12.5.1.1 perfectly executes 2 multi lane roundabouts in a row https://t.co/Ck08x9DsB9',
    edit_controls: {
      edits_remaining: 5,
      is_edit_eligible: false,
      editable_until: '2024-08-04T23:31:31.000Z',
    },
    attachments: {
      media_keys: ['7_1820225867580125185'],
    },
    public_metrics: {
      retweet_count: 20,
      reply_count: 30,
      like_count: 351,
      quote_count: 2,
      bookmark_count: 7,
      impression_count: 35281,
    },
    conversation_id: '1820226083234689127',
    lang: 'en',
  },
  includes: {
    media: [
      {
        height: 1436,
        type: 'video',
        media_key: '7_1820225867580125185',
        width: 1080,
      },
    ],
    users: [
      {
        verified: true,
        name: 'Dirty Tesla',
        verified_type: 'blue',
        id: '1118594454515003393',
        username: 'DirtyTesLa',
        profile_image_url:
          'https://pbs.twimg.com/profile_images/1515173488008572931/VYTdzMib_normal.jpg',
      },
    ],
  },
};

const run = () => {
  const output = {
    __typename: 'Tweet',
    id_str: input.data.id,
    lang: input.data.lang,
    favorite_count: input.data.public_metrics.like_count,
    possibly_sensitive: input.data.possibly_sensitive,
    created_at: input.data.created_at,
    display_text_range: createDisplayTextRange(input),
    entities: createEntities(input),
    text: input.data.text,
    user: createUser(input),
    edit_control: createEditControl(input),
    mediaDetails: createMediaDetails(input),
    photos: createPhotos(input),
    conversation_count: input.data.public_metrics.reply_count,
    news_action_type: 'conversation',
    isEdited: input.data.edit_history_tweet_ids.length > 1,
    isStaleEdit: new Date(input.data.edit_controls.editable_until) < new Date(),
  };

  console.log(JSON.stringify(output, null, 2));
};

function createDisplayTextRange(input: any) {
  const text = input.data.text;
  const entities = input.data.entities;

  // Inicialmente el rango es todo el texto
  let start = 0;
  let end = text.length;

  // Encuentra todas las entidades que importan (URLs y menciones) y su rango en el texto
  const relevantEntities: { start: number; end: number }[] = [];

  if (entities.urls) {
    entities.urls.forEach((url: any) => {
      relevantEntities.push({ start: url.start, end: url.end });
    });
  }

  if (entities.mentions) {
    entities.mentions.forEach((mention: any) => {
      relevantEntities.push({ start: mention.start, end: mention.end });
    });
  }

  // Ordena las entidades por la posición de inicio
  relevantEntities.sort((a, b) => a.start - b.start);

  // Encuentra la primera entidad que afecta el rango final
  for (let entity of relevantEntities) {
    if (entity.start < end) {
      end = entity.start - 1;
      break; // Termina el loop después de encontrar la primera entidad
    }
  }

  return [start, end];
}

function createEntities(input: any) {
  const result: any = {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: [],
    media: [],
  };

  if (input.data.entities.cashtags) {
    result.symbols = input.data.entities.cashtags.map((cashtag: any) => ({
      text: cashtag.tag,
      indices: [cashtag.start, cashtag.end],
    }));
  }

  if (input.data.entities.urls) {
    result.media = input.data.entities.urls.map((url: any) => ({
      url: url.url,
      expanded_url: url.expanded_url,
      display_url: url.display_url,
      indices: [url.start, url.end],
    }));
  }

  return result;
}

function createUser(input: any) {
  const user = input.includes.users.find(
    (user: any) => user.id === input.data.author_id
  );
  return {
    id_str: user.id,
    name: user.name,
    screen_name: user.username,
    profile_image_url_https: user.profile_image_url,
    verified: user.verified,
    is_blue_verified: user.verified_type === 'blue',
    profile_image_shape: 'Circle',
  };
}

function createEditControl(input: any) {
  return {
    edit_tweet_ids: input.data.edit_history_tweet_ids,
    editable_until_msecs:
      new Date(input.data.edit_controls.editable_until).getTime() + '',
    is_edit_eligible: input.data.edit_controls.is_edit_eligible,
    edits_remaining: input.data.edit_controls.edits_remaining + '',
  };
}

const createMediaDetails = (input: any) => {
  const mediaDetails: any = [];
  const mediaByKey: any = {};

  // Map media items by their media_key
  (input.includes.media || []).forEach((media: any) => {
    mediaByKey[media.media_key] = media;
  });

  // Function to infer focus rects
  const inferFocusRects = (width: number, height: number) => {
    return [
      { x: 0, y: 0, w: width, h: Math.floor(height * 0.4) },
      { x: 0, y: 0, w: width, h: Math.floor(width) },
      { x: 0, y: 0, w: width, h: Math.floor(height * 0.8) },
      {
        x: Math.floor(width * 0.3),
        y: 0,
        w: Math.floor(width * 0.7),
        h: height,
      },
      { x: 0, y: 0, w: width, h: height },
    ];
  };

  // Iterate through the URLs to find media details
  input.data.entities.urls.forEach((url: any) => {
    const media = mediaByKey[url.media_key];
    if (media) {
      mediaDetails.push({
        media_key: media.media_key,
        type: media.type,
        url: media.url,
        alt_text: media.alt_text || null,
        width: media.width || null,
        height: media.height || null,
        focus_rects: inferFocusRects(media.width, media.height),
        display_url: url.display_url,
        expanded_url: url.expanded_url,
        ext_media_availability: {
          status: 'Available',
        },
        indices: [url.start, url.end],
        media_url_https: media.url,
        original_info: {
          height: media.height || 0,
          width: media.width || 0,
          focus_rects: inferFocusRects(media.width, media.height),
        },
        sizes: {
          large: {
            h: media.height || 0,
            resize: 'fit',
            w: media.width || 0,
          },
          medium: {
            h: Math.floor(media.height * 0.66) || 0,
            resize: 'fit',
            w: Math.floor(media.width * 0.66) || 0,
          },
          small: {
            h: Math.floor(media.height * 0.33) || 0,
            resize: 'fit',
            w: Math.floor(media.width * 0.33) || 0,
          },
          thumb: {
            h: 150,
            resize: 'crop',
            w: 150,
          },
        },
      });
    }
  });

  return mediaDetails;
};

function createPhotos(input: any) {
  const photos: any = [];

  // Function to infer crop candidates based on width and height
  const inferCropCandidates = (width: number, height: number) => {
    return [
      { x: 0, y: 0, w: width, h: Math.floor(height * 0.4) },
      { x: 0, y: 0, w: width, h: width },
      { x: 0, y: 0, w: width, h: Math.floor(height * 0.8) },
      {
        x: Math.floor(width * 0.3),
        y: 0,
        w: Math.floor(width * 0.7),
        h: height,
      },
      { x: 0, y: 0, w: width, h: height },
    ];
  };

  (input.includes.media || []).forEach((media: any) => {
    const urlEntity = input.data.entities.urls.find(
      (url: any) => url.media_key === media.media_key
    );
    if (urlEntity) {
      photos.push({
        backgroundColor: {
          red: 204,
          green: 214,
          blue: 221,
        },
        cropCandidates: inferCropCandidates(media.width, media.height),
        expandedUrl: urlEntity.expanded_url,
        url: media.url,
        width: media.width,
        height: media.height,
      });
    }
  });

  return photos;
}

run();
