import createStore from "./main";
import { describe, it, expect, vi } from "vitest";

describe("redux", () => {
    it("should update state predictably", () => {
        const initialState = { count: 0 };
        type Actions = { type: 'increment' } | { type: 'decrement' } | { type: 'incrementBy', payload: number } | { type: 'decrementBy', payload: number }
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
                default:
                    return state;
            }
        }
        const store = createStore({initialState, reducer});
        const mockFn = {sub: () => {}};
        vi.spyOn(mockFn, "sub");
        store.subscribe(mockFn.sub);
        expect(store.getState()).toEqual({ count: 0 });
        store.dispatch({ type: "increment" });
        expect(mockFn.sub).toHaveBeenCalledTimes(1);
        expect(store.getState()).toEqual({ count: 1 });
        store.dispatch({ type: "decrement" });
        expect(store.getState()).toEqual({ count: 0 });
        store.dispatch({ type: "incrementBy", payload: 5 });
        expect(store.getState()).toEqual({ count: 5 });
        store.dispatch({ type: "decrementBy", payload: 3 });
        expect(store.getState()).toEqual({ count: 2 });
        expect(mockFn.sub).toHaveBeenCalledTimes(4);
    })
})
