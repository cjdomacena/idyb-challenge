/* eslint-disable jsx-a11y/alt-text */
import {  useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { SteamData } from '../../interface';
import { getSteamGames } from '../../supabase';
import Slide from './Slide';

type Props = {};

type ImageType = {
  image_url: string;
  id: number;
};


const Slideshow = (props: Props) => {

  const [slideEndIndex, setSlideEndIndex] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [images, setImages] = useState<SteamData[] | null | undefined>(null)
  const [currentSlides, setCurrentSlides] = useState<ImageType[] | undefined>();

  const {data, isFetching} = useQuery('slides', async () => await getSteamGames(5, 'Price'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60,
    staleTime: 1000 * 120
  })

  const middleRef = useRef(null);

  const displaySlides = () => {
    return currentSlides?.map((image, index) => (
        <Slide position={getSlidePosition(index)} image_url={image.image_url}  key={image.id}/>
    ));
  };

  const getSlidePosition = (index: number) => {
    if (index === 0) {
      return 'left';
    } else if (index === 1) {
      return 'center';
    } else {
      return 'right';
    }
  };

  useEffect(() => {
      if(data && !isFetching) {
        setImages(data);
        setCurrentSlides([
          { image_url: data[data.length - 1].image, id: data[data.length - 1].id },
          { image_url: data[0].image, id: data[0].id },
          { image_url: data[2].image, id: data[2].id },
        ]);
      }

  }, [data, isFetching])
  

  // const handleClickNextSlide = () => {
  //   let tempIndex = slideEndIndex;
  //   let newSlides = [...currentSlides];

  //   tempIndex += 1;
  //   newSlides.shift();
  //   if (slideEndIndex >= images.length - 1) {
  //     newSlides.push(images[images.length - 1]);
  //     tempIndex = 0;
  //     newSlides[2] = images[0];
  //   } else {
  //     newSlides.push(images[tempIndex]);
  //   }
  //   setActiveIndex(tempIndex - 1)
  //   setSlideEndIndex(tempIndex);
  //   setCurrentSlides(newSlides);
  // };

  const handleMoveSlide = (activeIndex: number) => {
    if(images) {
      let start =0;
      let end = slideEndIndex;

      if (activeIndex - 1 < 0) {
        start = images.length - 1;
        end = activeIndex + 1;
      } else if (activeIndex + 1 > images.length - 1) {
        end = 0;
        start = activeIndex - 1;
      } else {
        start = activeIndex - 1;
        end = activeIndex + 1;
      }
      const newSlides: ImageType[] = [];
      newSlides[0] = { image_url: images[start].image , id: images[start].id};
      newSlides[1] = {image_url: images[activeIndex].image, id:images[activeIndex].id};
      newSlides[2] = { image_url: images[end].image, id: images[end].id };
      setCurrentSlides(newSlides);
      setSlideEndIndex(end);
      setActiveIndex(activeIndex);
    }
  
  };

  return (
    <div className="text-white relative w-full mt-[23px]">
      <div className="w-1/2 absolute h-full bg-[#4D6E95]/30 rounded-full blur-3xl mx-auto -top-2 right-0 left-0 z-0 "></div>
      <div
        className="flex justify-evenly w-screen relative items-center mx-auto overflow-hidden z-20 gap-x-36"
        ref={middleRef}>
        {currentSlides ? displaySlides() : null}
      </div>

      <div className="space-x-4 w-fit mx-auto mt-8 z-50 absolute left-0 right-0 h-fit">
        {[0, 1, 2, 3,4].map((value) => (
          <button
            key={value}
            className={`w-3 h-3 shadow border rounded-full ${
              value === activeIndex ? 'bg-white' : null
            }`}
            onClick={() => handleMoveSlide(value)}></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
