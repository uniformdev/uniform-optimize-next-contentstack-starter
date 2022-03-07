export type Entry<T extends StandardEntryFields> = {
  uid: string;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  _version: number;
  _in_progress: boolean;
  tags: string[];
  locale: string;
  url: string;
} & T;

export interface StandardEntryFields {
  /** Title */
  title: string;
}

export interface StandardPageEntryFields {
  /** Url */
  url: string;
}

export interface PersonalizedHeroFields extends StandardEntryFields {
  /** Hero Options */
  unfrm_opt_p13n_list?: Hero[] | undefined;
}

export type PersonalizedHero = Entry<PersonalizedHeroFields>;

export interface CallToActionFields extends StandardEntryFields {
  /** Subheading */
  subheading?: string | undefined;

  /** Button Link */
  button_link?: string | undefined;

  /** Button Text */
  button_text?: string | undefined;

  /** Button Image */
  button_image?: Asset | undefined;
}

export type CallToAction = Entry<CallToActionFields>;

export interface HeroFields extends StandardEntryFields {
  /** Description */
  description: string;

  /** Button Text */
  button_text?: string | undefined;

  /** image */
  image?: Asset | undefined;

  /** Intent Tags */
  unfrm_opt_intent_tag?: Record<string, any> | undefined;

  /** Button Link Slug */
  button_link_slug?: string | undefined;
}

export type Hero = Entry<HeroFields>;

export interface PageFields extends StandardEntryFields, StandardPageEntryFields {
  /** Components */
  components?:
    | ((CallToAction | Hero | PersonalizedHero | RegistrationForm | TalksList | WhyAttend) &
        { _content_type_uid: string }[])
    | undefined;
}

export type Page = Entry<PageFields>;

export interface RegistrationFormFields extends StandardEntryFields {
  /** ButtonText */
  button_text?: string | undefined;

  /** Registered Text */
  registered_text?: string | undefined;
}

export type RegistrationForm = Entry<RegistrationFormFields>;

export interface TalkFields extends StandardEntryFields {
  /** Description */
  description?: string | undefined;

  /** Intent Tags */
  unfrm_opt_intent_tag?: Record<string, any> | undefined;
}

export type Talk = Entry<TalkFields>;

export interface TalksListFields extends StandardEntryFields {
  /** Title When Personalized */
  title_when_personalized?: string | undefined;

  /** NumberToShow */
  number_to_show?: number | undefined;

  /** Register Button Text */
  register_button_text?: string | undefined;
}

export type TalksList = Entry<TalksListFields>;

export interface WhyAttendFields extends StandardEntryFields {
  /** Description */
  description?: string | undefined;

  /** Image */
  image?: Asset | undefined;
}

export type WhyAttend = Entry<WhyAttendFields>;

export interface Asset {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  /** mime-type */
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  _version: number;
  title: string;
  dimension: Record<string, any>;
}
