import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//1 프로바이더 임포트해오기

import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

let 기본state = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '멋진신발1', quan: 3 },
];
function reducer(state = 기본state, 액션) {
  if (액션.type === '수량증가') {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  } else if (액션.type === '수량감소') {
    let copy = [...state];
    copy[0].quan--;
    return copy;
  } else {
    return state;
  }
}
let store = createStore(reducer);

//3 createStore에 state저장하기

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
//2 프로바이더 임포트해온걸 앱 컴포넌트를 감싸기
reportWebVitals();
