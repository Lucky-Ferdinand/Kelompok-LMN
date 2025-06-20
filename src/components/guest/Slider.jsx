import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
    alt: "Airbnb",
  },
  {
    src: "https://tse2.mm.bing.net/th?id=OIP.yq9-JFqGo-04f8HRsIOX6QHaEK&pid=Api&P=0&h=220",
    alt: "Dropbox",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2017/07/FedEx-logo.jpg",
    alt: "FedEx",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    alt: "Walmart",
  },
  {
    src: "https://tse1.mm.bing.net/th?id=OIP.crNF03UuBkCLzgbphs7RSwHaCK&pid=Api&P=0&h=220",
    alt: "HubSpot",
  },
];

export default function CompanyLogoSlider() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="z-10"
      >
        {logos.map((logo, idx) => (
          <SwiperSlide key={idx}>
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-transform hover:scale-105 p-4">
              <figure className="h-20 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full max-h-16 object-contain"
                />
              </figure>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
