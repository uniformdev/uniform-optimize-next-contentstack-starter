import Head from 'next/head';
import { PageFields, TalkFields, Entry } from '../lib/contentstack';
import { createElement } from 'react';
import { TalksContext } from '../components/TalksContext';
import MainHero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import { PersonalizedHero } from '../components/PersonalizedHero';
import { ComponentMapping } from '../lib/ComponentMapping';
import TalkList from '../components/TalkList';
import { RegisterForm } from '../components/RegisterForm';
import { WhyAttend } from '../components/WhyAttend';

const componentMapping: ComponentMapping = {
  hero: MainHero,
  call_to_action: CallToAction,
  personalized_hero: PersonalizedHero,
  talks_list: TalkList,
  registration_form: RegisterForm,
  why_attend: WhyAttend,
};

export interface PageProps {
  slug: string;
  page: PageFields;
  talks: Entry<TalkFields>[];
}

export function Home({ page, talks }: PageProps) {
  return (
    <TalksContext.Provider value={talks}>
      <Head>
        <title>{page?.title} | UniformConf</title>
      </Head>
      {page?.components &&
        page.components.map((component, index) =>
          createElement(componentMapping[component._content_type_uid] ?? (() => null), {
            key: index,
            ...component,
          })
        )}
    </TalksContext.Provider>
  );
}
