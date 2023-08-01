import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createVideogame } from '../actions';
import { validateForm } from "./utils";


const FormPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    releaseDate: "",
    rating: "",
    genres: [],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // enviar formulario
      // llama a una función para enviar los datos al servidor
      dispatch(createVideogame(formData));
      // reinicia el estado del formulario para que esté vacío:
      setFormData({
        name: "",
        image: "",
        description: "",
        platforms: [],
        releaseDate: "",
        rating: "",
        genres: [],
      });
    }
  };

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setFormData({
      ...formData,
      description: event.target.value,
    });
  };

  const handlePlatformsChange = (event) => {
    const selectedPlatforms = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      platforms: selectedPlatforms,
    });
  };

  const handleReleaseDateChange = (event) => {
    setFormData({
      ...formData,
      releaseDate: event.target.value,
    });
  };

  const handleRatingChange = (event) => {
    setFormData({
      ...formData,
      rating: event.target.value,
    });
  };

  const handleGenresChange = (event) => {
    const selectedGenres = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      genres: selectedGenres,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleImageChange}
        />
        {errors.image && <p>{errors.image}</p>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleDescriptionChange}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="platforms">Platforms:</label>
        <select
          id="platforms"
          name="platforms"
          multiple
          value={formData.platforms}
          onChange={handlePlatformsChange}
        >
          <option value="ps4">PlayStation 4</option>
          <option value="xboxone">Xbox One</option>
          <option value="switch">Nintendo Switch</option>
          <option value="pc">PC</option>
        </select>
        {errors.platforms && <p>{errors.platforms}</p>}
      </div>
      <div>
        <label htmlFor="releaseDate">Realse Date:</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleReleaseDateChange}
        />
        {errors.releaseDate && <p>{errors.releaseDate}</p>}
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="10"
          step="0.1"
          value={formData.rating}
          onChange={handleRatingChange}
        />
        {errors.rating && <p>{errors.rating}</p>}
      </div>
      <div>
        <label htmlFor="genres">Genres:</label>
        <select
          id="genres"
          name="genres"
          multiple
          value={formData.genres}
          onChange={handleGenresChange}
        >
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG</option>
          <option value="strategy">Strategy</option>
        </select>
        {errors.genres && <p>{errors.genres}</p>}
      </div>
      <button type="submit">SEND</button>
    </form>
  );
};

export default FormPage;
