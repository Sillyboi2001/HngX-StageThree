import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import NavBar from "./Navbar";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [images, setImages] = useState([]);
  const [searchImages, setSearchImages] = useState('')
  const [loading, setLoading] = useState(true)
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const getPhotos = async () => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/curated?page=2&per_page=40`, {
        headers: {
          Authorization: import.meta.env.VITE_API_KEY
        }
      })
      console.log(response.data)
      setImages(response.data.photos)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(images)

  useEffect(() => {
    getPhotos()
  }, []);

  const sortDraggedImage = () => {
    let _images = [ ...images ]
    //remove and save the dragged image
    const draggedImage = _images.splice(dragItem.current, 1)[0]
    //switch image position
    _images.splice(dragOverItem.current, 0, draggedImage)
    //reset the image position
    dragItem.current = null;
    dragOverItem.current = null;
    //Update the images based on whether it's search results or default images
    setImages(_images)
  }



  return (
    <>
    <NavBar
      setSearchImages={setSearchImages}
    />
    {loading ? 
      <div className='loaded-center'> 
      <ClipLoader
        color={'steelblue'}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div> :
        <div className="container" >
        {images
        .filter(image => 
          image.photographer.toLowerCase().indexOf(searchImages.toLowerCase()) !== -1)
        .map((image, index) => (
          <div
            className="card"
            key={index}
            draggable="true"
            onDragStart={() => dragItem.current = index}
            onDragEnter={() => dragOverItem.current = index}
            onDragEnd={sortDraggedImage}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="img-container">
              <img src={image.src.medium}
                className="img"
                alt={image.alt} />
                <div className="topleft">{image.photographer}</div>
            </div>
          </div>
        ))}
      </div>
    }
    </>
  )
}

export default Home;