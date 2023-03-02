import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const { user } = useAuthContext();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    fetch('/api/contractor/listings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
    })
    .then(response => response.json())
    .then(data => setListings(data))
    .catch(error => console.error(error));
  }, [filter]);

  return (
    <div>
      <ListingFilters setFilter={setFilter} />
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

const ListingFilters = ({ setFilter }) => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [services, setServices] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const filter = {};

    if (state) {
      filter.state = state;
    }

    if (city) {
      filter.city = city;
    }

    if (zip) {
      filter.zip_code = zip;
    }

    if (services) {
      filter.services = services.split(',').map(service => service.trim());
    }

    setFilter(filter);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
      <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <input type="text" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} />
      <input type="text" placeholder="Services" value={services} onChange={e => setServices(e.target.value)} />
      <button type="submit">Filter</button>
    </form>
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
