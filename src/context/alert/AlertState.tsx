import { PropsWithChildren, useReducer } from 'react';
import uuid from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from '../types';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = (props: PropsWithChildren<any>) => {
  const initialState: any = [];
  
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg: string, type: string, timeout: number = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;