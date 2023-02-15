import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode'

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => {

  return (
    <div className="w-full flex flex-row items-center justify-between hover:bg-[#665A48] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <div className="flex flex-row items-center">
        <h3 className="font-bold text-white mr-5">{i + 1}.</h3>
        <div className="flex felx-row items-center h-[100px]">
          <img className="h-full rounded-lg mr-5" src={song?.images?.coverart} />
          <div className="flex flex-col">
            <Link to={`/songs/${song?.key}`}>
              <p className="font-bold text-white text-xl">{song?.title}</p>
            </Link>
            <Link to={`/artists/${song?.artists[0].adamid}`}>
              <p className="text-white text-sm">{song?.subtitle}</p>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="cursor-pointer">
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song} 
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
    </div>
  )
  
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth'});
  })

  const topPlays = data?.slice(0,5);

  const handlePauseClick = () => {
    dispatch(playPause(false))
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true))
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-[#EDE4E0] text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artist</h2>
          <Link to="/top-artists">
            <p className="text-[#EDE4E0] text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{width:'25%', height:'auto'}}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      

    </div>
  );
};

export default TopPlay;
