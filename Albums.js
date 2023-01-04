import React, { useContext, useEffect, useState, } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const Albums = () => {
    const { currentUser } = useContext(UserContext);
    const [albumsTitle, setAlbumsTitle] = useState([])
    const [photos, setPhotos] = useState([])
    const [photosArray, setPhotosArray] = useState([])
    const [drawPhotosArray, setDrawPhotosArray] = useState([])
    const [photosExists, setPhotosExists] = useState(false)
    const [photoNumber, setPhotoNumber] = useState(1)


    const getAllAlbums = async () => {
        let albumData = await fetch(`https://jsonplaceholder.typicode.com/albums/?userId=${currentUser.id}`)
        let albumsID = await albumData.json();

        let alubmsTitleArray = [];

        for (let key of albumsID) {
            alubmsTitleArray.push(key.title)
        }

        setAlbumsTitle(alubmsTitleArray);

    }
    const getPhotosOfSpecifiAlbums = async (id) => {
        for (let i = photoNumber; i < photoNumber + 10; i++) {
            let photosData = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${id}&&id=${(id * 50) - 50 + i}`)
            let photos = await photosData.json();
            setPhotosArray([])
            photosArray.push(photos[0])
        }
        setPhotos(photosArray)
        console.log(photosArray);
        return photos;
    }
    const showPhotosOfAlbum = async (id) => {
        let tempArray = [];
        let photosById = await getPhotosOfSpecifiAlbums(id)
        tempArray = photosById.map((photo, index) => <img key={index} src={photo.thumbnailUrl} />)
        setPhotosExists(true);
        await setDrawPhotosArray(tempArray)

    }

    const next10PhotosBtn = async (event) => {
        setPhotoNumber(photoNumber + 10);
        console.log(photoNumber);
    }
    useEffect(() => {
        getAllAlbums()
    }, [])
    useEffect(() => {
        
    }, [photoNumber])
    let albumsTitleMap = albumsTitle.map((title, index) => <p key={index} onClick={() => showPhotosOfAlbum(index + 1)} > {title} </p>
    )
    return (
        <div className='albumsContainer'>
            {albumsTitleMap}
            <div>
                {drawPhotosArray}
                {photosExists ? <button onClick={next10PhotosBtn}>more photos</button>: null}
            </div>
        </div>
    )
}