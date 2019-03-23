function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}
// readucers *************************************************************************************************************

function todo(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  } else if (action.type == "ADD_AMIT") {
    return state.concat([action.payload]);
  } else if (action.type == "REMOVE_TODO") {
    return state.filter(todo => todo.id !== action.id);
  } else if (action.type == "TOGGLE_TODO") {
    return state.map(
      todo => todo.id !== action,
      id ? todo : Object.assign({}, todo, { complet: !todo.complet })
    );
  } else {
    return state;
  }
}

function goals(state = {}, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todo(state.todos, action),
    goals: goals(state.goal, action)
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is ", store.getState());
});

// Actions ***********************************************************************************************************

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux"
  }
});

store.dispatch({
  type: "ADD_AMIT",
  payload: {
    id: 2,
    name: "Amit rai ",
    rollno: 45,
    division: "TE-IT"
  }
});

console.log(store);

console.log("==================================");

console.log(store.getState());
