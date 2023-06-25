import createStore from "./main";

const initialState = { count: 50 };
type Actions = { type: 'increment' } | { type: 'decrement' } | { type: 'set', payload: number } | { type: 'incrementBy', payload: number } | { type: 'decrementBy', payload: number }
const reducer = (state: typeof initialState, action: Actions) => {
    switch(action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
                case "incrementBy":
            return { count: state.count + action.payload };
        case "decrementBy":
            return { count: state.count - action.payload };
        case "set":
            return { count: action.payload };
        default:
            return state;
    }
}
const store = createStore({initialState, reducer});

store.subscribe(newState => console.log("State changed: ", newState));
store.subscribe(newState => {
    const demo = document.querySelector("#demo");
    const rangeInput = document.querySelector("#rangeInput") as HTMLInputElement;
    if (demo && rangeInput) {
        demo.textContent = newState.count.toString();
        rangeInput.value = newState.count.toString();
    }
});

const rangeInput = document.querySelector("#rangeInput");
rangeInput?.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
        const value = parseInt(event.target.value);
        store.dispatch({ type: "set", payload: value});
    }
})

