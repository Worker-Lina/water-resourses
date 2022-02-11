import React, {createContext,  Suspense  } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ItemStore from './store/ItemStore';
import UserStore from './store/UserStore';
import './i18n';
import Loading from './components/loading/Loading';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      item: new ItemStore(),
  }}>
      <Suspense fallback={<Loading></Loading>}>
        <App />
    </Suspense>
  </Context.Provider>,
  document.getElementById('root')
);

