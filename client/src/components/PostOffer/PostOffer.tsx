import React, { useState } from "react";
import { Form, Input, FormWrapper, Heading } from "../Login/Login.styles";

import "./PostOffer.css";

import API from "../../API";
import { useNavigate } from "react-router-dom";

function PostOffer(props: any) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [info, setInfo] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const [btnState, setBtnState] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !price || !duration) {
      console.log("Uzupełnij dane");
      return;
    }

    const data = await API.postOfferFetch(
      title,
      subject,
      info,
      price,
      duration
    );

    if (data.ok) {
      setBtnState("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } else {
      setBtnState("error");
    }
  };
  return (
    <div className="PostOffer">
      <FormWrapper>
        <Heading>Oferta</Heading>

        <Form method="POST" onSubmit={handleSubmit}>
          <p>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Tytuł"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              name="subject"
              placeholder="Przedmiot"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setInfo(e.target.value)}
              type="text"
              name="info"
              placeholder="Opis"
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="0"
              name="price"
              placeholder="Cena"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setDuration(e.target.value)}
              type="text"
              name="duration"
              placeholder="Czas"
              required
              autoComplete="off"
            />
          </p>
          <p>
            <button
              className={
                btnState == "success"
                  ? "button success animate"
                  : btnState == "error"
                  ? "button error animate"
                  : "button"
              }
              type="submit"
            >
              Oferta
            </button>
          </p>
        </Form>
      </FormWrapper>

      <div className="return-btn-container">
        <button id="return-btn">
          <a href="/dashboard">Powrót</a>
        </button>
      </div>
    </div>
  );
}

export default PostOffer;
