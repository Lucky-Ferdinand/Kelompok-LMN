import About from "../components/guest/Category";
import Hero from "../components/guest/Hero";
import ProductChecker from "../components/guest/ProductsChecker";
import Produk from "../components/guest/Jobs";
import Blog from "../components/guest/Blog";
import Slider from "../components/guest/Slider"

export default function Guest() {
  return (
    <div>
        <Hero />
        <Slider />
        <About />
        <Produk />
        <Blog/>
        <ProductChecker />
    </div>
  );
}
