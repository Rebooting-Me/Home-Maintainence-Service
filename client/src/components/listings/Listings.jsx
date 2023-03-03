import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './Listings.module.css';
import imageUrl from './image.svg';
import Filter from './Filter.svg'
import ServiceIcon from './ServiceIcon';
// import plumbing from '../../assets/plumbing.svg';
// import electrical from '../../assets/electrical.svg';
// import landscaping from '../../assets/landscaping.svg';
// import roofing from '../../assets/roofing.svg';
// import pest from '../../assets/pest.svg';
// import remodeling from '../../assets/remodeling.svg';

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
    <form className= { styles.filter } onSubmit={handleSubmit}>
      <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
      <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <input type="text" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} />
      <input type="text" placeholder="Services" value={services} onChange={e => setServices(e.target.value)} />
      <button type="submit" className={styles.filterButton}><img src={ Filter } /></button>
    </form>
  );
};

const ListingCard = ({ title, description, services }) => {
  return (
    <a className={styles.container}>
        <div className={styles.listingCard}>
            <div className={styles.listingImageWrapper}>
                <img src={imageUrl} alt={title} className={styles.listingImage} />
            </div>
            <div className={styles.listingDetails }>
                <h1>{title}</h1>
                <ul>
                    {services.map(service => (
                        <li key={service}><ServiceIcon service={service} />{service}</li>
                    ))}
                </ul>
                <p>{description} <span>... more</span></p>
            </div>
        </div>
    </a>
  );
};

export default Listings;