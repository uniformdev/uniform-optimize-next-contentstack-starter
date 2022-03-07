import contentstack from 'contentstack';
import { Entry, PageFields, StandardEntryFields } from './contentstack';

if (!process.env.CONTENTSTACK_STACK_API_KEY) {
  throw new Error('CONTENTSTACK_STACK_API_KEY env not set.');
}

if (!process.env.CONTENTSTACK_DELIVERY_TOKEN) {
  throw new Error('CONTENTSTACK_DELIVERY_TOKEN env not set.');
}

if (!process.env.CONTENTSTACK_ENVIRONMENT) {
  throw new Error('CONTENTSTACK_ENVIRONMENT env not set');
}

const region =
  process.env.CONTENTSTACK_REGION?.toUpperCase() === 'EU' ? contentstack.Region.EU : contentstack.Region.US;

const config = {
  api_key: process.env.CONTENTSTACK_STACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region,
};

const client = contentstack.Stack(config);

const previewClient = client;

const getClient = (preview) => (preview ? previewClient : client);

export const getPageBySlug = async (preview: boolean, slug: string): Promise<PageFields | undefined> => {
  const query = getClient(preview)
    .ContentType('page')
    .Query()
    .includeCount()
    .includeContentType()
    .includeReference(['components', 'components.unfrm_opt_p13n_list'])
    .addParam('include_dimension', 'true')
    .toJSON();
  const result = await query.where('url', slug).find();

  // result is array where -
  // result[0] == entry objects
  // result[result.length-1] == entry objects count included only when .includeCount() is queried.
  // result[1] == schema of the content type is included when .includeContentType() is queried.

  const [first] = result[0];
  return { ...first, _content_type_uid: 'page' };
};

export const getEntriesByContentType = async <T extends StandardEntryFields>(
  preview: boolean,
  type: string
): Promise<Entry<T>[]> => {
  const query = getClient(preview).ContentType(type).Query().includeCount().includeContentType().toJSON();
  const result = await query.find();

  // result is array where -
  // result[0] == entry objects
  // result[result.length-1] == entry objects count included only when .includeCount() is queried.
  // result[1] == schema of the content type is included when .includeContentType() is queried.
  const entries = result[0].map((entry) => {
    entry._content_type_uid = type;
    return entry;
  });

  return entries as Entry<T>[];
};
