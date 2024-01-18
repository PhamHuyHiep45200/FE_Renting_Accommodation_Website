import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Card, CardHeader, Skeleton } from "@mui/material";

export default function Slide() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoplay
        loop
        speed={600}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {[1, 2, 3, 4].map((e) => {
          return (
            <SwiperSlide key={e} className="cursor-pointer">
              <Card sx={{ maxWidth: 345, m: 2, marginBottom: 4 }}>
                <CardHeader
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />
                <Skeleton
                  sx={{ height: 190 }}
                  animation="wave"
                  variant="rectangular"
                />
                <div className="p-5">
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </div>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
