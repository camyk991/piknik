import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 100%;

  p {
    display: flex;
  }
`


export const Input = styled.input`
  width: 100%;
  font-family: Lexend;
  border: none;
  font-size: 14px;
  line-height: 16px;
  color: #999;
  font-weight: 500;
  padding: 13px 20px;
  border-radius: 60px;
  background: var(--blue);
  outline: none;

  ::placeholder {
    color: #999
  }
`

export const Submit = styled.button`
  border-radius: 60px;
  font-size: 14px;
  font-weight: 700;
  background: var(--yellow);    
  border: none; 
  display: inline-block;
  padding: 13px 20px;
  width: auto;
  margin: 0 auto;
`

export const FormInfo = styled.div`
  text-align: center;
  margin-top: 15px;
`

export const Loader = styled.div`
  @keyframes spin {
    0%{ -webkit-transform: rotate(0deg); tranform: rotate(0deg);}
    100%{ -webkit-transform: rotate(360deg); tranform: rotate(360deg);}
  }

  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 50px;
	border: 6px solid rgba(255,255,255,0.4);
  margin: 10px auto 0;

  ::after {
    content: '';
    position: absolute;
    top: -6px; 
    left: -6px;
    bottom: -6px;
    right: -6px;
    border-radius: 50px;
    border: 6px solid transparent;
    border-top-color: #fff;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px 10px;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 50px;
  align-items: center;
`

export const Heading = styled.h1`
  text-align: center;
`