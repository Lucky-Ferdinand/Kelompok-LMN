import About from "../components/guest/Category";
import Hero from "../components/guest/Hero";
import ProductChecker from "../components/guest/ProductsChecker";
import Produk from "../components/guest/Jobs";
import Testimoni from "../components/guest/Blog";

export default function Guest() {
  return (
    <div>
        <Hero />
        <About />
        <Produk />
        <Testimoni />
        <ProductChecker />
    </div>
  );
}
