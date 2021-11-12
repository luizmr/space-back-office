import { SetAuthToken } from 'services/commons/authHttp';
import { SetCommonToken } from 'services/commons/commonHttp';

export const initialState = {
	token: null,
	expires_in: 0,
};

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_TOKEN':
			const tokenReceived = `${action.token.token_type} ${action.token.token}`;
			const expiresDate = new Date(action.token.expires_in);

			SetAuthToken(tokenReceived);
			SetCommonToken(tokenReceived);

			return {
				token: tokenReceived,
				expires_in: expiresDate.getTime(),
			};
		case 'REMOVE_TOKEN':
			SetAuthToken(null);
			SetCommonToken(null);

			return {
				expires_in: 0,
				token: null,
			};

		default:
			return state;
	}
};

export default reducer;
