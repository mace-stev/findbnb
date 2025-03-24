import { useState, useEffect } from 'react';
import './NewSpot.css';
import { useDispatch} from 'react-redux';
import { addSpot, addSpotImage, fetchSpot } from '../../store/spotsStore';
function NewSpot() {
    const [country, setCountry] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("0");
    const [longitude, setLongitude] = useState("0");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [spot, setSpot] = useState()

    useEffect(()=>{
        if (spot!==undefined) {
            const imageArray = [image1, image2, image3, image4, image5];
            imageArray.forEach((element, index) => {
                const preview = (index === 0 && element.length > 0);
                if (element !== "" && element) {
                    dispatch(addSpotImage({
                        spotId: spot,
                        url: element,
                        preview: preview

                    }))
                }
            })
        }
    }, [spot])
    
    const dispatch = useDispatch();
    async function onSubmitHandler(e) {
        e.preventDefault()
        
        try {
           const response= await dispatch(
                addSpot({
                    country: country,
                    address: street,
                    city: city,
                    state: state,
                    lat: latitude,
                    lng: longitude,
                    description: description,
                    name: title,
                    price: price
                })
            );
           const id = await dispatch(fetchSpot(response.id))
           setSpot(id)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="new-edit-spot-container">
            
            <form onSubmit={(e) => { onSubmitHandler(e) }} className="new-edit-spot-form">
            <h1 className="form-title">Create a new Spot</h1>
            <h2>Where's your place located?</h2>
        <h3 className='new-edit-spot-h3'>Guests will only get your exact address once they booked a reservation.</h3>
                <label>
                    Country
                    <input type="text" name="country" placeholder="Country" value={country} required onChange={(e) => setCountry(e.target.value)} />
                </label>
                <label>
                    Street Address
                    <input type="text" name="street" placeholder="Street" value={street} required onChange={(e) => setStreet(e.target.value)} />
                </label>
                <div className="city-state-container">
            <label className='city-input-label'>
                City
                <input type="text" name="city" placeholder="City"  value={city} required onChange={(e) => setCity(e.target.value)} />
            </label>
            <label className="state-input-label">
                State
                <input type="text" name="state" placeholder='STATE'  value={state} required onChange={(e) => setState(e.target.value)} />
            </label>
            </div>
            <div className="latitude-longitude-div">
            <label className="latitude-input-label">
                Latitude
                <input type="text" name="latitude" placeholder='Latitude' value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            </label>
            <label className="longitude-input-label">
                Longitude
                <input type="text" name="longitude" placeholder='Longitude' value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </label>
            </div>
                <h2 >Describe your place to guests</h2>
                <label className="description-label">

                    Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                    <textarea name="description" placeholder='Please write at least 30 characters.' required minLength="30" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <h2 className="title-h2">Create a title for your spot</h2>
                <label className='name-label'>

                    Catch guests' attention with a spot title that highlights what makes
                    your place special.

                    <input type="text" name="title" placeholder='Name of your spot' required value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <h2>Set a base price for your spot</h2>
                <label className='price-label'>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                    <input type="number" name="price" placeholder='Price per night (USD)' required value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <h2>Submit a link to at least one photo to publish your spot</h2>
                <label>
                    <input type="text" name="image1" placeholder=' Preview Image URL' value={image1} onChange={(e) => setImage1(e.target.value)} />
                </label>
                <label>
                    <input type="text" name="image2" placeholder="Image URL" value={image2} onChange={(e) => setImage2(e.target.value)} />
                </label>
                <label>
                    <input type="text" name="image3" placeholder="Image URL" value={image3} onChange={(e) => setImage3(e.target.value)} />
                </label>
                <label>
                    <input type="text" name="image4" value={image4} placeholder="Image URL" onChange={(e) => setImage4(e.target.value)} />
                </label>
                <label className='image-5-label'>
                    <input type="text" name="image5" value={image5} placeholder="Image URL" onChange={(e) => setImage5(e.target.value)} />
                </label>
                <button className='form-spot-button' type="submit">Create Spot</button>
            </form>
        </section>
    );
}

export default NewSpot;

