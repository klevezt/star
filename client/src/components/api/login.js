export const authenticateUserWithToken = (username, password) => {
  return fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};
