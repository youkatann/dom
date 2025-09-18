'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { shape1,shape2,shape3,shape1_morphed,shape2_morphed,shape3_morhed } from './paths';
import { slideUp, curve } from './anim';

export default function Preloader () {

    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
        console.log(dimension.width);
        console.log(dimension.height);
    }, [])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className="min-h-screen min-w-screen fixed z-[99] bg-white flex justify-center items-center">
             {dimension.width > 0 && 
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width="244" height="69" viewBox="0 0 244 69" fill="none">
                <path d={shape1} fill="black"/>
                <path d={shape2} fill="black"/>
                <path d={shape3} fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d={shape1_morphed} fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d={shape2_morphed} fill="black"/>
                <path fillRule="evenodd" clipRule="evenodd" d={shape3_morhed} fill="black"/>
            </svg>
            </>
            }
        </motion.div>
    )
}