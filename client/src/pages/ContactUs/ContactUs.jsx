

// import React, { useEffect } from 'react';
// import './ContactUs.css';
// import Layout from '../../layout/Layout';

// const ContactUs = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: 'ease-in-out',
//       once: true,
//       mirror: false,
//     });
//   }, []);

//   return (
//     <>
//       <Layout>
//         {/* Contact Us Top Section */}
//         <section className="contact-us" data-aos="fade-up">
//           <div className="container">
//             <div className="row g-0 position-relative first-ct">
//               <div className="left-contact col-md-6 mb-md-0 p-md-4" data-aos="fade-right" data-aos-delay="100">
//                 <h5 className="mt-0 contact-msg">Do you have a question ?</h5>
//                 <p>Feel free to reach us we'd love to talk.</p>
//               </div>
//               <div className="col-md-6 p-4 ps-md-0" data-aos="fade-left" data-aos-delay="200">
//                 <img
//                   src="/Contact/vintage-pink-telephone-composition 1.png"
//                   className="phone"
//                   alt="telephone"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Contact Through */}
//         <section className="contact-through" data-aos="fade-up" data-aos-delay="300">
//           <div className="container">
//             <div className="row through-part">
//               <div className="col" data-aos="zoom-in" data-aos-delay="400">
//                 <a href="#"><i className="fa-solid fa-location-dot"></i></a>
//                 <p>Address</p>
//                 <span>Edwards Rd, Cincinnati, 45209</span>
//               </div>
//               <div className="col" data-aos="zoom-in" data-aos-delay="500">
//                 <a href="#"><i className="fa-solid fa-phone-volume"></i></a>
//                 <p>Phone Number</p>
//                 <span>+1 (513) 352-3209</span>
//               </div>
//               <div className="col" data-aos="zoom-in" data-aos-delay="600">
//                 <a href="#"><i className="fa-solid fa-envelope"></i></a>
//                 <p>Email</p>
//                 <span>customers@foxeresto.net</span>
//               </div>
//             </div>

//             <div className="touchpart mb-3" data-aos="fade-up" data-aos-delay="700">
//               <h2>Get in touch</h2>
//               <p className="consider">
//                 We consider all the drivers of change gives you the components you
//                 need to change to create a truly happens.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Contact Form and Map */}
//         <section className="map-f my-5" data-aos="fade-up" data-aos-delay="800">
//           <div className="container">
//             <div className="fm-main d-flex flex-column flex-lg-row">
//               <div className="form flex-grow-1" data-aos="fade-right" data-aos-delay="900">
//                 <form>
//                   <label htmlFor="Name">Name:</label>
//                   <input
//                     type="text"
//                     placeholder="Enter Your name"
//                     name="Name"
//                     id="Name"
//                     className="mb-3"
//                   />

//                   <label htmlFor="Email">Email:</label>
//                   <input
//                     type="email"
//                     placeholder="Enter Email Address"
//                     name="Email"
//                     id="Email"
//                     className="mb-3"
//                   />

//                   <label htmlFor="Subject">Subject:</label>
//                   <input
//                     type="text"
//                     placeholder="Write a Subject"
//                     name="Subject"
//                     id="Subject"
//                     className="mb-3"
//                   />

//                   <textarea
//                     placeholder="Write Your Message"
//                     name="msg"
//                     id="msg"
//                     cols="50"
//                     rows="5"
//                     className="form-control msg-part mt-5"
//                   ></textarea>

//                   <input
//                     type="submit"
//                     value="Send"
//                     id="submit"
//                     className="send mt-5"
//                   />
//                 </form>
//               </div>

//               <div className="maps ms-lg-4 mt-4 mt-lg-0 flex-grow-1" data-aos="fade-left" data-aos-delay="1000">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.103998754969!2d88.42485421099138!3d22.57521333278884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275927b0061ad%3A0x496c2fab98874c86!2sWebskitters%20Technology%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1746939491820!5m2!1sen!2sin"
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   allowFullScreen
//                   title="Company Location"
//                   style={{ border: 0, width: '100%', height: '100%', minHeight: '350px' }}
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

// export default ContactUs;






















import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import Layout from '../../layout/Layout';
import { useForm } from 'react-hook-form';
import { submitContact } from '../../api/userApiFunctions/contactApi/ContactApi'
import { toast } from 'react-toastify';


const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // useEffect(() => {
  //   AOS.init({
  //     duration: 800,
  //     easing: 'ease-in-out',
  //     once: true,
  //     mirror: false,
  //   });
  // }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await submitContact({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response?.status === 200) {
        toast.success(response.data.message);
        reset(); // Clear the form
      } else {
        toast.error(response?.data?.message || 'Something went wrong.');
      }
    } catch (err) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Contact Us Top Section */}
      <section className="contact-us" data-aos="fade-up">
        <div className="container">
          <div className="row g-0 position-relative first-ct">
            <div className="left-contact col-md-6 mb-md-0 p-md-4" data-aos="fade-right" data-aos-delay="100">
              <h5 className="mt-0 contact-msg">Do you have a question ?</h5>
              <p>Feel free to reach us we'd love to talk.</p>
            </div>
            <div className="col-md-6 p-4 ps-md-0" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/Contact/vintage-pink-telephone-composition 1.png"
                className="phone"
                alt="telephone"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Through */}
      <section className="contact-through" data-aos="fade-up" data-aos-delay="300">
        <div className="container">
          <div className="row through-part">
            <div className="col" data-aos="zoom-in" data-aos-delay="400">
              <a href="#"><i className="fa-solid fa-location-dot"></i></a>
              <p>Address</p>
              <span>Edwards Rd, Cincinnati, 45209</span>
            </div>
            <div className="col" data-aos="zoom-in" data-aos-delay="500">
              <a href="#"><i className="fa-solid fa-phone-volume"></i></a>
              <p>Phone Number</p>
              <span>+1 (513) 352-3209</span>
            </div>
            <div className="col" data-aos="zoom-in" data-aos-delay="600">
              <a href="#"><i className="fa-solid fa-envelope"></i></a>
              <p>Email</p>
              <span>customers@foxeresto.net</span>
            </div>
          </div>

          <div className="touchpart mb-3" data-aos="fade-up" data-aos-delay="700">
            <h2>Get in touch</h2>
            <p className="consider">
              We consider all the drivers of change gives you the components you
              need to change to create a truly happens.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="map-f my-5" data-aos="fade-up" data-aos-delay="800">
        <div className="container">
          <div className="fm-main d-flex flex-column flex-lg-row">
            <div className="form flex-grow-1" data-aos="fade-right" data-aos-delay="900">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Your name"
                  id="name"
                  className="mb-2"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  id="email"
                  className="mb-2"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  placeholder="Write a Subject"
                  id="subject"
                  className="mb-2"
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && <p className="text-danger">{errors.subject.message}</p>}

                <label htmlFor="message">Message:</label>
                <textarea
                  placeholder="Write Your Message"
                  id="message"
                  rows="5"
                  className="form-control msg-part mt-2"
                  {...register("message", { required: "Message is required" })}
                ></textarea>
                {errors.message && <p className="text-danger">{errors.message.message}</p>}

                <input
                  type="submit"
                  value={loading ? "Sending..." : "Send"}
                  disabled={loading}
                  className="send mt-4"
                />
              </form>
            </div>

            <div className="maps ms-lg-4 mt-4 mt-lg-0 flex-grow-1" data-aos="fade-left" data-aos-delay="1000">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.103998754969!2d88.42485421099138!3d22.57521333278884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275927b0061ad%3A0x496c2fab98874c86!2sWebskitters%20Technology%20Solutions%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1746939491820!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                title="Company Location"
                style={{ border: 0, width: '100%', height: '100%', minHeight: '350px' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
