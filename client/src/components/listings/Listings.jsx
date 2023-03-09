import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './Listings.module.css';
// import imageUrl from './image.svg';
import Filter from './Filter.svg'
import ServiceIcon from './ServiceIcon';

const Listings = (props) => {
const Listings = (props) => {
  const [listings, setListings] = useState([]);
  const { user } = useAuthContext();
  const [filter, setFilter] = useState({});
  const { setCurrentProjectId } = props;

  const handleProjectClick = (projectId) => {
    setCurrentProjectId(projectId);
  };

  useEffect(() => {
    let url = '/api/contractor/listings';
    if (user.userType === 'Homeowner') {
      url = `/api/homeowner/listings/`;
    }

    fetch(url, {
      method : 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filter)
    })
    .then(response => response.json())
    .then(data => setListings(data.reverse()))
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
            city={listing.city}
            state={listing.state}
            id={listing._id}
            onClick={handleProjectClick} // Pass the handleProjectClick function as a prop
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

    // console.log(filter);

    setFilter(filter);
  };

  return (
      <form className= {`${styles.filter}` } onSubmit={handleSubmit}>
        <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
        <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
        <input type="text" placeholder="Zip Code" value={zip} onChange={e => setZip(e.target.value)} />
        <input type="text" placeholder="Services" value={services} onChange={e => setServices(e.target.value)} />
        <button type="submit" className={styles.filterButton}><img src={ Filter } /></button>
      </form>
  );
};

const ListingCard = ({ id , title, description, services, city , state, onClick }) => {
  return (
    <a className={`${styles.container}`} onClick = { () => {onClick(id)} }>
        <div className={`${styles.listingCard}`}>
            <div className={`${styles.listingImageWrapper}`}>
                <img src={imageUrl} alt={title} className={styles.listingImage} />
            </div>
            <div className={`${styles.listingDetails}`}>
                <div className={`${styles.location}`}>
                  {city}, {state}
                </div>
                <h1>{title}</h1>
                <ul>
                    {services.map(service => 
                      //const serviceString = service.replace("_", " ");
                      //const decoratedServiceString = serviceString.charAt(0).toUpperCase() + serviceString.slice(1);
                      (
                        <li key={service}>
                          <ServiceIcon service={service} />
                          {service.replace("_", " ").charAt(0).toUpperCase() + service.replace("_", " ").slice(1)}
                        </li>
                      )
                    )}
                </ul>
                <p>{description} <span>... more</span></p>
            </div>
        </div>
    </a>
  );
};

export default Listings;