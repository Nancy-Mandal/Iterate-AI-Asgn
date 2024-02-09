import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductIdeaForm = () => {
  const [productIdea, setProductIdea] = useState('');
  const [iconURL, setIconURL] = useState('');

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    try {
      const clientId = 'bd595d3b947648268df47a4b18b2f7b3';
      const clientSecret = '8a843cbb122a4a799b3336afb6bc5f66';

      // Request an access token from the API's token endpoint
      const response = await axios.post(
        'https://api.thenounproject.com/v2/icon/1',
        {
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret
        }
      );

      // Extract the access token from the response
      const accessToken = response.data.access_token;

      // Include the access token in the headers of subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log('Authentication successful');
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setProductIdea(value);
    fetchIcon(value);
  };

  const fetchIcon = async (text) => {
    try {
      // Make a request to the API to fetch icon based on text input
      const response = await axios.get(
        `https://api.thenounproject.com/icon/${text}`
      );
      // Assuming the API returns the icon data with a URL
      const icon = response.data.icon;
      setIconURL(icon.url);
    } catch (error) {
      console.error('Error fetching icon:', error);
    }
  };

  return (
    <div>
      <h2>Product Idea Form</h2>
      <input
        type="text"
        placeholder="Enter your product idea/request"
        value={productIdea}
        onChange={handleChange}
      />
      {iconURL && <img src={iconURL} alt="Icon representing product category" />}
    </div>
  );
};

export default ProductIdeaForm;
