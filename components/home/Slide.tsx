import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CardHome from "../base/CardHome";
import { useRouter } from "next/router";

export default function Slide() {
  const router = useRouter()

  const redirectDetail = () => {
    router.push('/detail_post/1')
  }
  return (
    <div className="px-5 py-10">
      <Swiper
        slidesPerView={4}
        spaceBetween={40}
        autoplay
        loop
        speed={600}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((e) => {
          return (
            <SwiperSlide key={e} className="cursor-pointer" onClick={redirectDetail}>
              <CardHome />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
