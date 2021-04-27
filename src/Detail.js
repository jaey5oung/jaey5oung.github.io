/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [input, input변경] = useState('');

  useEffect(() => {
    //2초 후에 저거 alert 창을 안보이게 해주셈
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    };
    // return function 어쩌구(){실행할코드}
    //리턴뒤에잇는것 사라질때 쓰는코드
  }, [alert]);
  //[]안에 조건을 적는것인데 이때 alert를 넣으면 alert스테잇이 변경될때만 실행된다 만약 []안에 아무것도 적지않으면 페이지가 로드될때만 실행된다 일종의 트릭

  let { id } = useParams();
  let 찾은상품 = props.shoes.find((상품) => {
    return 상품.id == id;
  });
  let history = useHistory();
  //find array안에서 원하는 자료를 찾고싶을때 사용한다
  return (
    <div className="container">
      <박스>
        <제목>상세페이지</제목>
      </박스>
      <input
        onChange={(e) => {
          input변경(e.target.value);
        }}
      />
      {alert === true ? (
        <div className="my-alert">
          <p>재고가 얼마 남지 않았습니다</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img src={찾은상품.picture} style={{ width: '100%' }} />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
