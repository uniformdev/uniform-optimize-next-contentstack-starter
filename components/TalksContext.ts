import React from 'react';
import { TalkFields, Entry } from '../lib/contentstack';

export const TalksContext = React.createContext<Entry<TalkFields>[] | undefined>(undefined);
