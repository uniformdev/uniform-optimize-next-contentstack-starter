import { GetServerSideProps } from 'next';
import { Home, PageProps } from '../components/Home';
import { getEntriesByContentType, getPageBySlug } from '../lib/api';
import { TalkFields } from '../lib/contentstack';

export default Home;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  let slug = context.params?.slug ? `/${(context.params.slug as string[]).join('/')}` : '/';

  if (slug === '/index') {
    slug = '/';
  }

  const page = getPageBySlug(context.preview, slug);

  const talks = getEntriesByContentType<TalkFields>(context.preview, 'talk');
  console.log('talks', talks);

  return {
    props: {
      slug,
      page: await page,
      talks: (await talks) ?? [],
    },
  };
};
