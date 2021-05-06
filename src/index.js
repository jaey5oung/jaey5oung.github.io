import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
//1 프로바이더 임포트해오기

import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === 'alert닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 기본state = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '멋진신발1', quan: 3 },
];
function reducer(state = 기본state, 액션) {
  if (액션.type === '항목추가') {
    // state안에 id: 액션.payload 인게 있냐

    let found = state.findIndex((a) => {
      return a.id === 액션.payload.id;
    });

    if (found >= 0) {
      let copy = [...state];
      copy[found].quan++;
      return copy;
    } else {
      let copy = [...state];
      copy.push(액션.payload);
      return copy;
    }
  } else if (액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.payload].quan++;
    return copy;
  } else if (액션.type === '수량감소') {
    let copy = [...state];
    copy[액션.payload].quan--;
    return copy;
  } else {
    return state;
  }
}
let store = createStore(combineReducers({ reducer, reducer2 }));
//리듀서가 2개이상일때 콤바인리듀서로 감싸준다

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
// reportWebVitals();
