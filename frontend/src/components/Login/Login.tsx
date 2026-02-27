import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("Somethin");
  const [firstname, setFirstname] = useState("Matt");
  const [lastname, setLastname] = useState("Percy");

  const handleRegister = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/register/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Server said: ${JSON.stringify(data, null, 2)}`);
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/`)
      .then((res) => res.json())
      .then((data) => {
        alert(`server said ${JSON.stringify(data, null, 2)}`);
      })
      .catch((err) => console.error(err));
  };

  const handleGuestLogin = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/`)
      .then((res) => res.json())
      .then((data) => {
        alert(`server said ${JSON.stringify(data, null, 2)}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex gap-2 items-center justify-center flex-col">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
      />

      <input
        type="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.currentTarget.value)}
        placeholder="First Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
      />

      <input
        type="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.currentTarget.value)}
        placeholder="Last Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
      />

      <button
        onClick={() => handleRegister()}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
      >
        Register
      </button>
      <button
        onClick={() => handleLogin()}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
      >
        Login
      </button>
      <button
        onClick={handleGuestLogin}
        className="px-4 py-2 rounded-md text-white bg-blue-400 hover:bg-blue-600 transition hover:cursor-pointer"
      >
        Continue as guest
      </button>
    </div>
  );
};

export default Login;
