import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false))
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true))
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-[#EDE4E0]/30 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full group">
        <div className={`absolute inset-0 justify-center items-center bg-[#665A48] bg-opacity-30 group-hover:flex ${activeSong?.title === song?.title ? 'flex bg-[#665A48] bg-opacity-40' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song} 
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song?.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="text-lg font-bold text-white truncate">
          <Link to={`/song/${song?.key}`}>
            {song?.title}
          </Link>
        </p>
      </div>

      <p className="text-sm text-white mt-1 truncate">
        <Link to={song?.artists ? `/artists/${song.artists[0]?.adamid}` : `/top-artists`}>
          {song.subtitle}
        </Link>
      </p>
    </div>
  )
};

export default SongCard;
