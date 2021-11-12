import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import en from 'translations/en/common.json';
import pt from 'translations/pt/common.json';

interface IContextProps {
	locale: any;
	selectLang: ({ type }: any) => void;
}

export const Context = React.createContext({} as IContextProps);

const local = navigator.language;

let lang: any;

if (local === 'pt-BR') {
	lang = pt;
} else {
	lang = en;
}

const Wrapper = (props: any) => {
	const [locale, setLocale] = useState<any>(local);
	const [messages, setMessages] = useState<any>(lang);

	function selectLang(e: any) {
		const newLocale = e;

		setLocale(newLocale);

		if (newLocale === 'en-US') {
			setMessages(en);
		} else {
			setMessages(pt);
		}
	}

	return (
		<Context.Provider value={{ locale, selectLang }}>
			<IntlProvider messages={messages} locale={locale}>
				{props.children}
			</IntlProvider>
		</Context.Provider>
	);
};

export default Wrapper;
