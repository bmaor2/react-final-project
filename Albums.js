import React, { useContext, useEffect, useState, } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';




export const Albums = () => {
    const { currentUser } = useContext(UserContext);
    const [albumsTitle, setAlbumsTitle] = useState([])
    const [photos, setPhotos] = useState([])
    const [photosArray, setPhotosArray] = useState([])
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
        // let photosData = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${id}`)
        // for (let i = 1; i <= 10; i++) {
            let photosData = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${id}&&id=${(id*50)-50+1}`)
            let photos = await photosData.json();
            photosArray.push(photos)
        // }
        await setPhotos(photosArray)
        return photos;
    }
    const showPhotosOfAlbum = async (id) => {
        let photosById = await getPhotosOfSpecifiAlbums(id)

        // let tempArr = [];
        // for (let i = 0; i < 10 ; i++) {
        //     tempArr.push(photosById[i]);
        // }
        let photosArray = photosById.map((photo, index) => <img src={photo.thumbnailUrl} key={index} />)
        setPhotos(photosArray);

    }

    const next10PhotosBtn = async (event) => {

    }
    useEffect(() => {
        getAllAlbums()
    }, [])
    let albumsTitleMap = albumsTitle.map((title, index) =>
        <>

            <p key={index} onClick={() => showPhotosOfAlbum(index + 1)} > {title} </p>

        </>
    )
    return (
        <div className='albumsContainer'>
            {albumsTitleMap}
            {photos}
        </div>
    )
}