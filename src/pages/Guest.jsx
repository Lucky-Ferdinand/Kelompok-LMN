import About from "../components/guest/About";
import Hero from "../components/guest/Hero";
import ProductChecker from "../components/guest/ProductsChecker";
import Produk from "../components/guest/Produk";
import Testimoni from "../components/guest/Testimoni";

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
