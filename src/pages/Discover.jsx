//Sayfada kullanılacak bileşenler çağırıldı.
import { Error, Loader, SongCard } from "../components";
//Müzik türlerini atadığımız sabit değişken çağırılır.
import { genres } from "../assets/constants";
//Discover alanına türe göre en çok dinlenen şarkıları getirir(api).
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import { useDispatch, useSelector } from "react-redux";



const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop"

  if(isFetching) return <Loader title="Loading songs..." />

  if(error) return <Error />

  return (
    <div className="flex flex-col">
      {/* başlık ve dropdown bulunan alan */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
        <select
          onChange={() => {}}
          value = ""
          className="bg-[#665A48] text-white p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>

      {/* şarkıların listelendiği alan */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}

      </div>
    </div>
  )
}

export default Discover;
