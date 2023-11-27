import React, { useState } from 'react';

function ImageUploadForm() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission

    if (selectedImage) {
      const formData = new FormData();
      formData.append('avatar', selectedImage);  

      try {
        const response = await fetch('/api/uploadprofilepic', {
          method: 'POST',
          body: formData,
        });

        // Handle the response here
      } catch (error) {
        // Handle any errors that occurred during the request
      }
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUploadForm;