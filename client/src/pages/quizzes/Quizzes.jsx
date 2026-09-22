


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Layout from '../../layout/Layout';
// import { useForm } from 'react-hook-form';
// import './Quizzes.css';
// import { getQuizzes, submitQuizzes } from '../../api/userApiFunctions/quizzesApi/QuizzesApi';
// import { useAuth } from '../../context/AuthProvider';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const Quizzes = () => {
//   const { id } = useParams();
//   const [auth] = useAuth();
//   const token = auth?.token;
//   const navigate = useNavigate();
//   const MySwal = withReactContent(Swal);

//   const [quiz, setQuiz] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submittedAnswers, setSubmittedAnswers] = useState(null);
//   const [showRetry, setShowRetry] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm();

//   // Fetch quiz only when token and id are available
//   useEffect(() => {
//     if (!token || !id) return;

//     const fetchQuiz = async () => {
//       const res = await getQuizzes(token, id);
//       if (res?.status === 200) {
//         setQuiz(res.data.data);
//       } else {
//         MySwal.fire('Error', res?.data?.message || 'Failed to load quiz', 'error');
//       }
//     };
//     fetchQuiz();
//   }, [token, id]);

//   const onSubmit = async (data) => {
//     const allAnswers = quiz.questions.map((q, index) => ({
//       userAnswer: data[`q${index}`],
//     }));

//     const payload = {
//       quizId: quiz._id,
//       answers: allAnswers,
//     };

//     setSubmitting(true);
//     const res = await submitQuizzes(token, payload);
//     setSubmitting(false);

//     if (res?.status === 200) {
//       const result = res.data.data.result;
//       setSubmittedAnswers(result.answers);

//       if (result.achieved === 'Pass') {
//         MySwal.fire({
//           title: '🎉 You Passed!',
//           text: 'Congratulations! You can download your certificate now.',
//           icon: 'success',
//           confirmButtonText: 'Go to Dashboard',
//         }).then(() => {
//           navigate('/user-dashboard/certificates');
//         });
//       } else {
//         setShowRetry(true);
//         MySwal.fire('Oops!', 'You failed. Please try again to achieve 50% marks.', 'warning');
//       }
//     } else {
//       MySwal.fire('Info', res?.data?.message || 'Submission failed', 'info');
//     }
//   };

//   const handleRetry = () => {
//     setSubmittedAnswers(null);
//     reset(); // clear form selections
//     setShowRetry(false);
//   };

//   const formValues = watch();
//   const allAnswered = quiz?.questions?.every((_, idx) => formValues[`q${idx}`]);

//   return (
//     <Layout>
//       <section className="quiz-section py-5">
//         <div className="container">
//           {quiz ? (
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <h3 className="mb-4 text-center text-body-secondary">{quiz.title}</h3>

//               {quiz.questions.map((question, index) => {
//                 const name = `q${index}`;
//                 return (
//                   <div key={index} className="quiz-question card p-4 mb-4 shadow-sm">
//                     <p className="fw-semibold mb-3">
//                       {index + 1}. {question.text}
//                     </p>
//                     <div>
//                       {question.options.map((option, optIndex) => {
//                         const isSubmitted = submittedAnswers !== null;
//                         const userAnswer = submittedAnswers?.[index]?.userAnswer;
//                         const correctAnswer = submittedAnswers?.[index]?.correctAnswer;
//                         const isCorrect = submittedAnswers?.[index]?.isCorrect;

//                         let optionClass = 'form-check-label ms-2 option-label';
//                         if (isSubmitted) {
//                           if (option === correctAnswer) optionClass += ' text-success fw-bold';
//                           if (option === userAnswer && !isCorrect) optionClass += ' text-danger fw-bold';
//                         }

//                         return (
//                           <div key={optIndex} className="form-check d-flex align-items-center mb-2">
//                             <input
//                               className="form-check-input"
//                               type="radio"
//                               id={`${name}_${optIndex}`}
//                               value={option}
//                               disabled={!!submittedAnswers}
//                               {...register(name, { required: true })}
//                               name={name}
//                             />
//                             <label htmlFor={`${name}_${optIndex}`} className={optionClass}>
//                               {option}
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     {errors[name] && <p className="text-danger small mt-2">Please select an answer.</p>}
//                   </div>
//                 );
//               })}

//               {!submittedAnswers && (
//                 <div className="text-center mt-4">
//                   <button
//                     type="submit"
//                     className="btn btn-primary px-5 py-2 w-auto"
//                     disabled={!allAnswered || submitting}
//                   >
//                     {submitting ? 'Submitting...' : 'Submit Quiz'}
//                   </button>
//                 </div>
//               )}

//               {showRetry && submittedAnswers && (
//                 <div className="text-center mt-4">
//                   <button type="button" className="btn btn-warning px-5 py-2 w-auto" onClick={handleRetry}>
//                     Retry Quiz
//                   </button>
//                 </div>
//               )}
//             </form>
//           ) : (
//             <div className="text-center">Loading quiz...</div>
//           )}
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Quizzes;

















// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Layout from '../../layout/Layout';
// import { useForm } from 'react-hook-form';
// import './Quizzes.css';
// import { getQuizzes, submitQuizzes } from '../../api/userApiFunctions/quizzesApi/QuizzesApi';
// import { useAuth } from '../../context/AuthProvider';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const Quizzes = () => {
//   const { id } = useParams();
//   const [auth] = useAuth();
//   const token = auth?.token;
//   const navigate = useNavigate();
//   const MySwal = withReactContent(Swal);

//   const [quiz, setQuiz] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [submittedAnswers, setSubmittedAnswers] = useState(null);
//   const [showRetry, setShowRetry] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm();

//   // Fetch quiz only when token and id are available
//   useEffect(() => {
//     if (!token || !id) return;

//     const fetchQuiz = async () => {
//       const res = await getQuizzes(token, id);
//       if (res?.status === 200) {
//         setQuiz(res.data.data);
//       } else {
//         MySwal.fire('Error', res?.data?.message || 'Failed to load quiz', 'error');
//       }
//     };
//     fetchQuiz();
//   }, [token, id]);

//   const onSubmit = async (data) => {
//     const allAnswers = quiz.questions.map((q, index) => ({
//       userAnswer: data[`q${index}`],
//     }));

//     const payload = {
//       quizId: quiz._id,
//       answers: allAnswers,
//     };

//     setSubmitting(true);
//     const res = await submitQuizzes(token, payload);
//     setSubmitting(false);

//     if (res?.status === 200) {
//       const result = res.data.data.result;
//       setSubmittedAnswers(result.answers);

//       if (result.achieved === 'Pass') {
//         MySwal.fire({
//           title: '🎉 You Passed!',
//           text: 'Congratulations! You can download your certificate now.',
//           icon: 'success',
//           confirmButtonText: 'Go to Dashboard',
//         }).then(() => {
//           navigate('/user-dashboard/certificates');
//         });
//       } else {
//         setShowRetry(true);
//         MySwal.fire('Oops!', 'You failed. Please try again to achieve 50% marks.', 'warning');
//       }
//     } else {
//       MySwal.fire('Info', res?.data?.message || 'Submission failed', 'info');
//     }
//   };

//   const handleRetry = () => {
//     setSubmittedAnswers(null);
//     reset(); // clear form selections
//     setShowRetry(false);
//   };

//   const formValues = watch();
//   const allAnswered = quiz?.questions?.every((_, idx) => formValues[`q${idx}`]);

//   return (
//     <Layout>
//       <section className="quiz-section py-5">
//         <div className="container">
//           {quiz ? (
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <h3 className="mb-4 text-center text-body-secondary">{quiz.title}</h3>

//               {quiz.questions.map((question, index) => {
//                 const name = `q${index}`;
//                 return (
//                   <div key={index} className="quiz-question card p-4 mb-4 shadow-sm">
//                     <p className="fw-semibold mb-3">
//                       {index + 1}. {question.text}
//                     </p>
//                     <div>
//                       {question.options.map((option, optIndex) => {
//                         const isSubmitted = submittedAnswers !== null;
//                         const userAnswer = submittedAnswers?.[index]?.userAnswer;
//                         const correctAnswer = submittedAnswers?.[index]?.correctAnswer;
//                         const isCorrect = submittedAnswers?.[index]?.isCorrect;

//                         let optionClass = ' ms-2 option-label';
//                         if (isSubmitted) {
//                           if (option === correctAnswer) optionClass += ' text-success fw-bold';
//                           if (option === userAnswer && !isCorrect) optionClass += ' text-danger fw-bold';
//                         }

//                         return (
//                           <div key={optIndex} className="d-flex align-items-center mb-2">
//                             <input
//                               type="radio"
//                               id={`${name}_${optIndex}`}
//                               value={option}
//                               disabled={!!submittedAnswers}
//                               {...register(name, { required: true })}
//                               name={name} />
//                             <label htmlFor={`${name}_${optIndex}`} className={optionClass}>
//                               {option}
//                             </label>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     {errors[name] && <p className="text-danger small mt-2">Please select an answer.</p>}
//                   </div>
//                 );
//               })}

//               {!submittedAnswers && (
//                 <div className="text-center mt-4">
//                   <button
//                     type="submit"
//                     className="btn btn-primary px-5 py-2 w-auto"
//                     disabled={!allAnswered || submitting}
//                   >
//                     {submitting ? 'Submitting...' : 'Submit Quiz'}
//                   </button>
//                 </div>
//               )}

//               {showRetry && submittedAnswers && (
//                 <div className="text-center mt-4">
//                   <button type="button" className="btn btn-warning px-5 py-2 w-auto" onClick={handleRetry}>
//                     Retry Quiz
//                   </button>
//                 </div>
//               )}
//             </form>
//           ) : (
//             <div className="text-center">Loading quiz...</div>
//           )}
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Quizzes;













// ****************end of first try********************


















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useForm } from 'react-hook-form';
import './Quizzes.css';
import { getQuizzes, submitQuizzes } from '../../api/userApiFunctions/quizzesApi/QuizzesApi';
import { useAuth } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Quizzes = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [quiz, setQuiz] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState(null);
  const [showRetry, setShowRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    if (!token || !id) return;

    const fetchQuiz = async () => {
      setLoading(true);
      const res = await getQuizzes(token, id);
      setLoading(false);
      if (res?.status === 200 && res?.data?.data?.questions?.length > 0) {
        setQuiz(res.data.data);
      } else if (res?.status === 200 && res?.data?.data?.questions?.length === 0) {
        setQuiz(null);
      } else {
        MySwal.fire('Error', res?.data?.message || 'Failed to load quiz', 'error');
      }
    };
    fetchQuiz();
  }, [token, id]);

  const onSubmit = async (data) => {
    const allAnswers = quiz.questions.map((q, index) => ({
      userAnswer: data[`q${index}`],
    }));

    const payload = {
      quizId: quiz._id,
      answers: allAnswers,
    };

    setSubmitting(true);
    const res = await submitQuizzes(token, payload);
    setSubmitting(false);

    if (res?.status === 200) {
      const result = res.data.data.result;
      setSubmittedAnswers(result.answers);
      setPercentage(parseFloat(result.percentage.toFixed(2)));

      if (result.achieved === 'Pass') {
        MySwal.fire({
          title: '🎉 You Passed!',
          html: `Score: <strong>${parseFloat(result.percentage.toFixed(2))}%</strong><br/>You can now download your certificate.`,
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          navigate('/user-dashboard/certificates');
        });
      } else {
        setShowRetry(true);
        MySwal.fire('Oops!', 'You failed. Please try again to achieve 50% marks.', 'warning');
      }
    } else {
      MySwal.fire('Info', res?.data?.message || 'Submission failed', 'info');
    }
  };

  const handleRetry = () => {
    setSubmittedAnswers(null);
    reset();
    setShowRetry(false);
    setPercentage(0);
  };

  const formValues = watch();
  const allAnswered = quiz?.questions?.every((_, idx) => formValues[`q${idx}`]);

  return (
    <Layout>
      <section className="quiz-section py-5">
        <div className="container">
          {loading ? (
            <div className="pacman-loader">
              <div className="pacman"></div>
            </div>
          ) : quiz ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="mb-4 text-center text-body-secondary">{quiz.title}</h3>

              {submittedAnswers && (
                <div className="text-center mb-4">
                  <h5>Your Score: {percentage}%</h5>
                  <div className="progress mx-auto" style={{ height: '20px', maxWidth: '400px' }}>
                    <div
                      className={`progress-bar ${percentage >= 50 ? 'bg-success' : 'bg-danger'}`}
                      role="progressbar"
                      style={{
                        width: `${percentage}%`,
                        transition: 'width 1s ease-in-out',
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              )}

              {quiz.questions.map((question, index) => {
                const name = `q${index}`;
                return (
                  <div key={index} className="quiz-question card p-4 mb-4 shadow-sm">
                    <p className="fw-semibold mb-3">
                      {index + 1}. {question.text}
                    </p>
                    <div>
                      {question.options.map((option, optIndex) => {
                        const isSubmitted = submittedAnswers !== null;
                        const userAnswer = submittedAnswers?.[index]?.userAnswer;
                        const correctAnswer = submittedAnswers?.[index]?.correctAnswer;
                        const isCorrect = submittedAnswers?.[index]?.isCorrect;
                        const achieved = percentage >= 50;

                        let optionClass = 'ms-2 option-label';
                        if (isSubmitted && achieved) {
                          if (option === correctAnswer) optionClass += ' text-success fw-bold';
                          if (option === userAnswer && !isCorrect) optionClass += ' text-danger fw-bold';
                        }

                        return (
                          <div key={optIndex} className="d-flex align-items-center mb-2">
                            <input
                              type="radio"
                              id={`${name}_${optIndex}`}
                              value={option}
                              disabled={!!submittedAnswers}
                              {...register(name, { required: true })}
                              name={name}
                            />
                            <label htmlFor={`${name}_${optIndex}`} className={optionClass}>
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {errors[name] && <p className="text-danger small mt-2">Please select an answer.</p>}
                  </div>
                );
              })}

              {!submittedAnswers && (
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 w-auto"
                    disabled={!allAnswered || submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                  </button>
                </div>
              )}

              {showRetry && submittedAnswers && (
                <div className="text-center mt-4">
                  <button type="button" className="btn btn-warning px-5 py-2 w-auto" onClick={handleRetry}>
                    Retry Quiz
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center text-danger fs-5">No quiz found for this course.</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Quizzes;


























