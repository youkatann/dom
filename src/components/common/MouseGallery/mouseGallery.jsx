'use client'
import { useRef } from 'react';

export default function MouseGallery() {

  let steps = 0;
  let currentIndex = 0;
  let nbOfImages = 0;
  let maxNumberOfImages = 8;
  let refs = [];

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    steps+= Math.abs(movementX) + Math.abs(movementY);

    if(steps >= currentIndex * 150){
      moveImage(clientX, clientY);

      if(nbOfImages == maxNumberOfImages){
        removeImage();
      }
    }
    
    if(currentIndex == refs.length){
      currentIndex = 0;
      steps = -150;
    }
  }

  const moveImage = (x, y) => {
    const currentImage = refs[currentIndex].current;
    currentImage.style.left = x + "px";
    currentImage.style.top = y-300 + "px";
    currentImage.style.display = "block";
    currentIndex++;
    nbOfImages++;
    setZIndex()
  }

  const setZIndex = () => {
    const images = getCurrentImages();
    for(let i = 0 ; i < images.length ; i++){
      images[i].style.zIndex = i;
    }
  }

  const removeImage = () => {
    const images = getCurrentImages();
    images[0].style.display = "none";
    nbOfImages--;
  }

  const getCurrentImages = () => {
    let images = []
    let indexOfFirst = currentIndex - nbOfImages;
    for(let i = indexOfFirst ; i < currentIndex ; i++){
      let targetIndex = i;
      if(targetIndex < 0) targetIndex += refs.length
      images.push(refs[targetIndex].current);
    }
    return images;
  }

  return (
    <div onMouseMove={(e) => {manageMouseMove(e)}} className="relative overflow-hidden h-full flex">
      {
        [...Array(19).keys()].map( (_, index) => {
          const ref = useRef(null);
          refs.push(ref)
          return <img key={index} className='rounded-[16px] w-[10vw] absolute hidden transform translate-x-[-50%] translate-y-[-50%]' onClick={() => {console.log(refs)}} ref={ref} src={`/images/${index}.jpg`}></img>
        })
      }
    </div>
  )
}