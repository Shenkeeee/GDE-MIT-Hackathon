import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSendHello = () => {
    fetch(`${import.meta.env.VITE_API_URL}/items/hello`)
      .then((res) => res.json())
      .then((data) => {
        alert(`server said ${data.message}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main flex flex-col justify-center gap-4 w-[75%]">
      <h1>Welcome</h1>

      <div className="w-28">
        <button
          className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
          onClick={() => handleSendHello()}
        >
          Send hello
        </button>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iste
        quos nostrum, atque cupiditate reiciendis temporibus sed autem
        dignissimos accusamus iure suscipit harum cumque provident aspernatur ea
        numquam. Mollitia aspernatur, sit possimus aut necessitatibus odio!
        Repellendus, labore nisi debitis vel assumenda fugit, alias voluptatem
        ad aperiam asperiores enim similique blanditiis!
      </p>

      <div className="flex gap-2 items-center justify-center flex-col">
        <button
          className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Lets go!
        </button>
      </div>
    </div>
  );
};

export default Home;
