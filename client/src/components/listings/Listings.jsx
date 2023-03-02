import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const { user } = useAuthContext();
    console.log('Refresh: ', )

    useEffect(() => {
        fetch('http://localhost:3001/api/contractor/listings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then(response => response.json())
          .then(data => setListings(data))
          .catch(error => console.error(error));
      }, []);

  return (
    <div>
      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          title={listing.title}
          description={listing.description}
          services={listing.services}
        />
      ))}
    </div>
  );
};

const ListingCard = ({ title, description, services }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {services.map(service => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default Listings;