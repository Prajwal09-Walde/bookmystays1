import { createContext, useEffect, useReducer } from "react"

const initialState = {
    city: undefined,
    date: JSON.parse(localStorage.getItem("date")) || [],
    options: JSON.parse(localStorage.getItem("options")) || {
        adult: undefined,
        children: undefined,
        room: undefined,
    }
};

export const SearchContext = createContext(initialState);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NewSearch":
            return action.payload;
        case "ResetSearch":
            return initialState;
        default:
            return state;
    }
};

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, initialState);

    useEffect(() => {
        localStorage.setItem("date", JSON.stringify(state.date));
    }, [state.date]);

    useEffect(() => {
        localStorage.setItem("options", JSON.stringify(state.options));
    }, [state.options]);

    return (
        <SearchContext.Provider
          value = {{
            city: state.city,
            date: state.date,
            options: state.options,
            dispatch,
          }}
        >
          {children}
        </SearchContext.Provider>
    )
}