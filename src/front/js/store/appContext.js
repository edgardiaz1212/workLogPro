import React, { useState, useEffect } from "react";
import getState from "./flux.js";


// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
			//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			const checkTokenExpiration = async () => {
               
				const expiration = localStorage.getItem("tokenExpiration");
				console.log(expiration)
                if (expiration) {
                    const currentTime = Math.floor(Date.now() / 1000);
					console.log(currentTime)
                    if (currentTime > expiration) {
                        // Token expirado, eliminar el token y cualquier otra lógica que necesites
                        state.actions.logout()
						  // Puedes definir una acción "logout" para limpiar el estado
                    }
                }
            };

            checkTokenExpiration();
        }, [state.store.tokenExpiration, state.actions])

		// The initial value for the context is not null anymore, but the current state of this component,
		// the context will now have a getStore, getActions and setStore functions available, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
