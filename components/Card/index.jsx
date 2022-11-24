/* eslint-disable @next/next/no-img-element */

"use client";

import styles from './card.scss';
import ISO6391 from 'iso-639-1';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { BsStarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';


export default function Card(prop) {

    const [isBookmarked, setIsBookmarked] = useState(null);
    
    useEffect(() => {
        if (localStorage.getItem(prop.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [prop.id]);

    return (
        <div className={`card ${prop.className}`}>
            <p className='rating'>
                <BsStarFill /> {prop.vote_average}
            </p>
            <p
                className="bookmark"
                onClick={() => {
                    setIsBookmarked(!isBookmarked);
                    if (isBookmarked) {
                        localStorage.removeItem(prop.id);
                    } else{
                        localStorage.setItem(prop.id, JSON.stringify(prop));
                    }
                }} >
                {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            </p>

            <Link href={`/movies/${prop.id}`}>
            <Image className="image"
                src={`https://image.tmdb.org/t/p/w300${prop.poster_path}`}
                alt={prop.title}
                width={250}
                height={350}
            />
            <div className="info">
                <h2 className="title">{prop.title}</h2>
                <p className="others">
                    {moment(prop.release_date).format('MMMM YYYY')} • {ISO6391.getName(prop.original_language)} {prop.adult ? ' • 18+' : ''}
                </p>
                <p className="description">{prop.overview}</p>
            </div>
            </Link>
        </div>
    )
}