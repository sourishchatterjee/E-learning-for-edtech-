// import React from 'react';
// import './Feature.css';

// const features = [
//   {
//     icon: 'imgs/Frame (5).png',
//     title: 'Audio & Video',
//     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     icon: 'imgs/Frame (6).png',
//     title: 'Virtual Classroom',
//     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     icon: 'imgs/Group (2).png',
//     title: 'Group Learning',
//     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
// ];

// const FeatureSection = () => {
//   return (
//     <section className="section_padding">
//       <div className="container">
//         <div className="feature-row">
//           {features.map((item, i) => (
//             <div className="feature-box text-center" key={i}>
//               <div className="feature-icon mb-3">
//                 <img src={item.icon} alt={`${item.title} Icon`} className="img-fluid" />
//               </div>
//               <div className="box_text">
//                 <h3>{item.title}</h3>
//                 <p>{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;





import React, { useEffect } from 'react';
import './Feature.css';

const features = [
  {
    icon: 'imgs/Frame (5).png',
    title: 'Audio & Video',
    desc: 'Learn easily with high-quality video and audio.',
  },
  {
    icon: 'imgs/Frame (6).png',
    title: 'Virtual Classroom',
    desc: 'Join live virtual classes with expert instructors.',
  },
  {
    icon: 'imgs/Group (2).png',
    title: 'Group Learning',
    desc: 'Collaborate with peers through interactive group learning.',
  },
];

const FeatureSection = () => {



  return (
    <section className="section_padding">
      <div className="container">
        <div className="feature-row">
          {features.map((item, i) => (
            <div
              className="feature-box text-center"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100} // optional: stagger animations
              data-aos-duration="800"
            >
              <div className="feature-icon mb-3">
                <img src={item.icon} alt={`${item.title} Icon`} className="img-fluid" />
              </div>
              <div className="box_text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
