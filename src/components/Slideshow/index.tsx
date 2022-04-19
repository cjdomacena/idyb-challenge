/* eslint-disable jsx-a11y/alt-text */
import { Transition } from '@headlessui/react';
import {  useRef, useState } from 'react';
import Slide from './Slide';

type Props = {};

type ImageType = {
  image_url: string;
  id: number;
};

type SlideshowIndex = {
  start: number;
  end: number;
};

const Slideshow = (props: Props) => {
  const images: ImageType[] = [
    {
      image_url:
        'https://cdn.akamai.steamstatic.com/steam/apps/915810/capsule_616x353.jpg?t=1649315580',
      id: 20,
    },
    {
      image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1569040/capsule_616x353.jpg',
      id: 21,
    },
    {
      image_url: 'https://cdn.akamai.steamstatic.com/steam/apps/570/capsule_616x353.jpg',
      id: 22,
    },
    {
      image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_616x353.jpg',
      id: 23,
    },
    {
      image_url:
        'https://cdn.akamai.steamstatic.com/steam/apps/915810/capsule_616x353.jpg?t=1649315580',
      id: 24,
    },
    {
      image_url: 'https://cdn.akamai.steamstatic.com/steam/apps/570/capsule_616x353.jpg',
      id: 25,
    },
  ];
  const [slideEndIndex, setSlideEndIndex] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [currentSlides, setCurrentSlides] = useState<ImageType[]>([
    images[images.length - 1],
    images[0],
    images[1],
  ]);
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
  

  const handleClickNextSlide = () => {
    let tempIndex = slideEndIndex;
    let newSlides = [...currentSlides];

    tempIndex += 1;
    newSlides.shift();
    if (slideEndIndex >= images.length - 1) {
      newSlides.push(images[images.length - 1]);
      tempIndex = 0;
      newSlides[2] = images[0];
    } else {
      newSlides.push(images[tempIndex]);
    }
    setActiveIndex(tempIndex - 1)
    setSlideEndIndex(tempIndex);
    setCurrentSlides(newSlides);
  };

  const handleMoveSlide = (activeIndex: number) => {
    let start = 0;
    let end = 0;

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
    newSlides[0] = images[start];
    newSlides[1] = images[activeIndex];
    newSlides[2] = images[end];
    setCurrentSlides(newSlides);
    setSlideEndIndex(end);
    setActiveIndex(activeIndex);
  };

  return (
    <div className="text-white relative w-full mt-[23px]">
      <div className="w-1/2 absolute h-full bg-[#4D6E95]/30 rounded-full blur-3xl mx-auto -top-2 right-0 left-0 z-0 "></div>
      <div
        className="flex justify-evenly container relative items-center mx-auto overflow-hidden z-20 gap-x-24"
        ref={middleRef}>
        {currentSlides ? displaySlides() : null}
      </div>

      <div className="space-x-4 w-fit mx-auto mt-12 z-50 absolute left-0 right-0 h-fit">
        {[0, 1, 2, 3,4,5].map((value) => (
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
