import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Submit,
  Loader,
  FormWrapper,
  Heading,
  FormInfo,
} from "./Register.styles";

import bluearrow from "../../assets/blue-arrow-right.svg";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API";

type Props = {
  isLoggedIn: boolean;
};

type DataRes = {
  ok: boolean;
  errors: [];
}

const Register: React.FC<Props> = ({ isLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<JSX.Element[]>();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!mail || !password) {
      setInfo([<>Uzupełnij dane</>]);
      setLoading(false);
      return;
    }

    setInfo([<></>]);

    const data = await API.signUpFetch(name, mail, password);

    console.log(data);

    if (data.ok) {
      setLoading(false);
      setInfo([<>Zarejestrowano</>]);
      // navigate('/sign-in');
    } else {
      console.log(data.errors);
      if (data.errors.length) {
        console.log('test');
        let messages: JSX.Element[] = [];
        data.errors.forEach((el: any) => {
          messages.push(el.msg);
        });
        
        console.log(messages);
        setInfo(messages);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, []);

  return (
    <div className="container">
      <FormWrapper>
        <Heading>Zarejestruj się!</Heading>

        <Form method="POST" onSubmit={handleSubmit}>
          <p>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              type="email"
              name="mail"
              placeholder="E-mail"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="subject"
              placeholder="Hasło"
              required
              autoComplete="new-password"
            />
          </p>
          <p>
            Masz już konto?&nbsp;<b><Link to="/sign-in">Zaloguj się!</Link></b>
          </p>
          <p>
            <Submit type="submit">Zarejestruj się</Submit>
          </p>
        </Form>
        {loading ? <Loader /> : null}
        <FormInfo>
          {info &&
            info.map((e, i) => {
              return <div key={i}>{e}</div>;
            })}
        </FormInfo>
      </FormWrapper>
    </div>
  );
};

export default Register;
function signUpFetch(name: string, mail: string, password: string) {
  throw new Error("Function not implemented.");
}

