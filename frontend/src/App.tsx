import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import WelcomeContent from "./components/WelcomeContent/WelcomeContent";
import "./App.css";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <Header />
      <WelcomeContent />
      <Footer />
    </div>
  );
};

export default App;
