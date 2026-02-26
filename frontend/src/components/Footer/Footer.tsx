import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer fixed bottom-0 h-12 bg-blue-400 w-full  flex items-center justify-center">
      <div className="flex w-[80%] justify-end p-2">
        <button className="flex items-center justify-center p-2 rounded-md hover:bg-blue-600 transition cursor-pointer">
          <FaGithub size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
