import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// createStore : redux 스토어를 생성하는 함수, 스토언느 애플리케이션의 상태를 저장하고 관리하는 역할
// rootReducer  :여러개의 리듀서를 하나로 합치기 위한 최상단 부모 리듀서, 리듀서는 액션을 디스패치하면 이 루트 리듀서를 통해 각 리듀서에 전달
// compose : redux에서 여러 미들웨어를 조합하는데 사용되는 함수
// applyMiddleware : redux 미들웨어를 적용하는 함수
// thunk : redux에서 비동기 작업을 처리하는 미들웨어. 액션 생성자 함수가 일반 객체뿐만 아니라 함수도 반활하 ㄹ수 있다.

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;