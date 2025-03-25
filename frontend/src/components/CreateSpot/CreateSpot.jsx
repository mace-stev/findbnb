import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';
import './CreateSpot.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        country: "",
        streetAddress: "",
        city: "",
        state: "",
        description: "",
        spotTitle: "",
        price: "",
        imageUrls: ["", "", "", "", ""], 
        lat: "", 
        lng: "", 
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target;
        setForm((prevForm) => {
            const updatedForm = { ...prevForm, [fieldName]: value };
            return updatedForm;
        });
    };

    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...form.imageUrls];
        newImageUrls[index] = value;
        setForm((prevForm) => ({ ...prevForm, imageUrls: newImageUrls }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.country) newErrors.country = "Country is required";
        if (!form.streetAddress) newErrors.streetAddress = "Street Address is required";
        if (!form.city) newErrors.city = "City is required";
        if (!form.state) newErrors.state = "State is required";
        if (form.description.length < 30) newErrors.description = "Description needs 30 or more characters";
        if (!form.spotTitle) newErrors.spotTitle = "Name of your spot is required";
        if (!form.price) newErrors.price = "Price per night is required";
       if (!form.imageUrls[0]) newErrors.previewImage = "Preview Image URL is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            address: form.streetAddress,
            city: form.city,
            state: form.state,
            country: form.country,
            lat: parseFloat(form.lat),
            lng: parseFloat(form.lng),
            name: form.spotTitle,
            description: form.description,
            price: parseFloat(form.price),
            imageUrls: form.imageUrls,

        };

        console.log("Submitting spot with data:", payload);

        const createdSpot = await dispatch(createSpotThunk(payload));
        if (createdSpot) navigate(`/spots/${createdSpot.id}`);
    };

    return (
        <div className="create-spot">
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Country" value={form.country} 
                onChange={(e) => handleInputChange(e, 'country')} />
                {errors.country && <p className="error">{errors.country}</p>}
                
                <input 
                type="text" placeholder="Street Address" 
                value={form.streetAddress} 
                onChange={(e) => handleInputChange(e, 'streetAddress')} />
                {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
                
                <input type="text" 
                placeholder="City" 
                value={form.city} 
                onChange={(e) => handleInputChange(e, 'city')} />
                {errors.city && <p className="error">{errors.city}</p>}
                
                <input 
                type="text" 
                placeholder="State" 
                value={form.state} 
                onChange={(e) => handleInputChange(e, 'state')} />
                {errors.state && <p className="error">{errors.state}</p>}
                
                <input 
                type="number"
                 placeholder="Latitude" 
                 value={form.lat} 
                 onChange={(e) => handleInputChange(e, 'lat')} />
                {errors.lat && <p className="error">{errors.lat}</p>}
                
                <input type="number" 
                placeholder="Longitude" 
                value={form.lng} 
                onChange={(e) => handleInputChange(e, 'lng')} />
                {errors.lng && <p className="error">{errors.lng}</p>}
                
                <textarea placeholder="Please write at least 30 characters" 
                value={form.description} onChange={(e) => handleInputChange(e, 'description')} />
                {errors.description && <p className="error">{errors.description}</p>}
                
                <input type="text" 
                placeholder="Name of your spot" 
                value={form.spotTitle} 
                onChange={(e) => handleInputChange(e, 'spotTitle')} />
                {errors.spotTitle && <p className="error">{errors.spotTitle}</p>}
                
                <input type="number"
                 placeholder="Price per night (USD)" 
                 value={form.price} onChange={(e) => handleInputChange(e, 'price')} />
                {errors.price && <p className="error">{errors.price}</p>}
                
                {form.imageUrls.map((url, index) => (
                    <input key={index} type="text" 
                    placeholder={index === 0 ? "Preview Image URL" : "Image URL"} 
                    value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
                ))}
                {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateSpot;