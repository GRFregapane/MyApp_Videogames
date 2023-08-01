export const validateForm = (data) => {
    const errors = {};
  
    if (!data.name) {
      errors.name = "Por favor, ingrese el nombre del juego.";
    }
  
    if (!data.image) {
      errors.image = "Por favor, ingrese la URL de la imagen del juego.";
    }
  
    if (!data.description) {
      errors.description = "Por favor, ingrese la descripción del juego.";
    }
  
    if (!data.platforms || data.platforms.length === 0) {
      errors.platforms = "Por favor, seleccione al menos una plataforma.";
    }
  
    if (!data.releaseDate) {
      errors.releaseDate = "Por favor, ingrese la fecha de lanzamiento del juego.";
    }
  
    if (!data.rating) {
      errors.rating = "Por favor, ingrese la calificación del juego.";
    } else if (isNaN(data.rating) || data.rating < 0 || data.rating > 10) {
      errors.rating = "La calificación debe estar entre 0 y 10.";
    }
  
    if (!data.genres || data.genres.length === 0) {
      errors.genres = "Por favor, seleccione al menos un género.";
    }
    return errors;
  };
  
  
  export const validateSearchTerm = (searchTerm) => {
    if (!searchTerm) {
      return "Por favor, ingrese un término de búsqueda.";
    }
    return null;
  };