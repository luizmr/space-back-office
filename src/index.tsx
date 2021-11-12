import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/_all.scss';
import App from './App';
import { I18nextProvider } from 'react-i18next';
// import Wrapper from 'context/intl';
import i18next from 'i18next';
import common_en from 'translations/en/common.json';
import common_pt from 'translations/pt/common.json';
import { StateProvider } from 'store/TokenProvider';
import reducer, { initialState } from 'store/Reducer';

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'pt',
	resources: {
		en: {
			common: common_en,
		},
		pt: {
			common: common_pt,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		{/* <Wrapper> */}
		<I18nextProvider i18n={i18next}>
			<StateProvider initialState={initialState} reducer={reducer}>
				<App />
			</StateProvider>
		</I18nextProvider>
		{/* </Wrapper> */}
	</React.StrictMode>,
	document.getElementById('root'),
);
