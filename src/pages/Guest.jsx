import Category from "../components/guest/Category";
import Hero from "../components/guest/Hero";
import Jobs from "../components/guest/Jobs";
import Blog from "../components/guest/Blog";
import Slider from "../components/guest/Slider"
import Board from "../components/guest/Board";

export default function Guest() {
  return (
    <div>
        <Hero />
        <Slider />
        <Category />
        <Jobs />
        <Board />
        <Blog/>
    </div>
  );
}
