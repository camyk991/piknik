export type UserInfoType = {
  name: string;
  mail: string;
  token: string;
  isAdmin: boolean;
};

export default {
  signUpFetch: async (name: string, mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },

  signInFetch: async (mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },

  postOfferFetch: async (
    title: string,
    subject: string,
    info: string,
    price: string,
    duration: string
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/postoffer`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        subject: subject,
        info: info || "none",
        price: price,
        duration: duration,
      }),
    });

    return await res.json();
  },
};
