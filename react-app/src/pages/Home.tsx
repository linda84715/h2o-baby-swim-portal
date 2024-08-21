import boykid from '../images/boykid.jpeg';
import threekids from '../images/threekids.png';
import awards from '../images/babyphoto.jpg';
import couchs from '../images/awards.jpeg';
import girlkid from '../images/girlkid.jpeg';
import fourgirls from '../images/fourgirls.png';
import Logo from "../images/logo.png"
import babyhead from '../images/babyhead.png';
import star from '../images/icons8-star.png';
import medal from '../images/icons8medal.png';
import facebookLike from '../images/icons8-facebook-like.png';
import { Link } from 'react-router-dom';

const images: string[] = [
  boykid,
  threekids,
  awards,
  couchs,
  girlkid,
  fourgirls
];

const services = [
  {
    imgSrc: babyhead,
    imgAlt: 'babyicon',
    title: 'Baby-Friendly Workshops',
    description: 'Specialized workshops focused on baby and make their overall swimming experience fun.',
  },
  {
    imgSrc: star,
    imgAlt: 'groupIcon',
    title: 'Group Swimming Lessons',
    description: 'Fun and interactive group lessons for all ages and skill levels, creating a supportive learning environment.',
  },
  {
    imgSrc: medal,
    imgAlt: 'personalizedIcon',
    title: 'Personalized Coaching Programs',
    description: 'Tailored swimming programs designed to meet your specific needs and goals, led by experienced coaches.',
  },
  {
    imgSrc: facebookLike,
    imgAlt: 'competitiveIcon',
    title: 'Baby-Dedicated Pools',
    description: 'Specially designed pools for infants, ensuring a safe and enjoyable swimming environment tailored just for them.',
  },
];

const Home = () => {
  return (
    <div className='home'>

      <div className="news">
            <h2>SWIM & HAVE FUN</h2>
            <p>Super Fun Baby and Toddler Swimming Lessons | Fostering Early Swimming Skills with Care</p>
            <p><Link to="/login">Join Now</Link></p>
      </div>

      

      <div className='sixphotos'>
        {images.map((src, index) => (
          <div key={index} className="photo-container">
            <img src={src} alt="Swim For Fun" className="photo" />
          </div>
        ))}
      </div>

      <div className="shop"> 
            
            
            <div className="info"> 
            <h2>Get your child swimming like a pro with H2O Baby Swim</h2>
            <p>Located in London, H2O Baby Swim offers expert swim coaching for children. Our experienced instructors will help your little one develop essential water skills in a safe and fun environment. Dive into a world of aquatic success with H2O Baby Swim.</p>
            </div>

            
            <img src={Logo} alt="logo"/>
      </div>

      <div className='product'>
        <h2>Swim Coach Services</h2>
        {services.map((service, index) => (
          <div key={index}>
            <img src={service.imgSrc} alt={service.imgAlt} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Home
