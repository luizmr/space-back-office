import React, { useContext, useReducer } from 'react';

export const StateContext = React.createContext({} as any);

type Props = {
	reducer: any;
	initialState: any;
	children: any;
};

export const StateProvider = ({ reducer, initialState, children }: Props) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
