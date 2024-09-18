import { Carousel } from "./components/Carousel";
import { HighlightSection } from "./components/HighLightSection";
import { ProductCategories } from "./components/ProductCategories";

export default function Home() {
  return (
    <div>
      <section>
        <Carousel />
      </section>
      <ProductCategories />
      <HighlightSection />
      {/* Agrega más contenido o secciones aquí */}
    </div>
  );
}
