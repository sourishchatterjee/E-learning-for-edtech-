


// import React from 'react';
// import { PacmanLoader } from 'react-spinners';
// import './QuizPerformance.css';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip as ReTooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { useQuery } from '@tanstack/react-query';
// import { getQuizPerformance } from '../../../../api/userApiFunctions/dashboardApis/quizPerformance';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const COLORS = ['#00C49F', '#FF8042'];

// const QuizPerformance = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['quizPerformance'],
//     queryFn: getQuizPerformance,
//   });

//   const performanceData = data?.performance || [];

//   const averagePercentage =
//     performanceData.length > 0
//       ? Math.round(
//           performanceData.reduce((acc, curr) => acc + curr.percentage, 0) /
//             performanceData.length
//         )
//       : 0;

//   const pieData = [
//     { name: 'Scored', value: averagePercentage },
//     { name: 'Remaining', value: 100 - averagePercentage },
//   ];

//   // Bar chart data for Chart.js
//   const barChartData = {
//     labels: performanceData.map((_, index) => `Course ${index + 1}`),
//     datasets: [
//       {
//         label: 'Percentage',
//         data: performanceData.map((item) => item.percentage),
//         backgroundColor: '#36A2EB',
//         borderRadius: 5,
//       },
//     ],
//   };

//   const barChartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//         },
//         title: {
//           display: true,
//           text: 'Percentage',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Courses',
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   if (isLoading) 
//      return <div className='content-wrapper col-8 col-lg-10' style={{
//           display: 'flex',
//           justifyContent: 'center',
//           paddingTop: '25vh',
//           backgroundColor: '#fefefe',
//         }}>
//           <PacmanLoader color="#36d7b7" size={40} />
//         </div>;

//   if (isError) return <p className="text-danger text-center mt-4">Failed to load data</p>;

//   return (
//     <div className="content-wrapper col-8 col-lg-10">
//       <div className="container-fluid py-4">
//         <div className="row row-two g-4">
//           <h6 className="mb-3">Quiz Performance</h6>

//           <div className="col-lg-6 col-12">
//             <div className="quiz-card quiz-pie-chart">
//               <div className="quiz-title">Overall Score</div>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     paddingAngle={5}
//                     dataKey="value"
//                     animationDuration={800}
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <ReTooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="number">{averagePercentage}%</div>
//             </div>
//           </div>

//           <div className="col-lg-6 col-12 quiz-bar-chart">
//             <div className="quiz-card">
//               <div className="quiz-title">Quiz Percentage by Course</div>
//               <Bar data={barChartData} options={barChartOptions} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="table-responsive px-3">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Course No.</th>
//               <th>Course Name</th>
//               <th>Correct</th>
//               <th>Wrong</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {performanceData.map((item, index) => (
//               <tr key={item.courseId}>
//                 <th>{index + 1}</th>
//                 <td>{item.title}</td>
//                 <td>{item.correct}</td>
//                 <td>{item.wrong}</td>
//                 <td>{item.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default QuizPerformance;












import React from 'react';
import { PacmanLoader } from 'react-spinners';
import './QuizPerformance.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getQuizPerformance } from '../../../../api/userApiFunctions/dashboardApis/quizPerformance';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = ['#00C49F', '#FF8042'];

const QuizPerformance = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quizPerformance'],
    queryFn: getQuizPerformance,
  });

  const performanceData = data?.performance || [];

  const averagePercentage =
    performanceData.length > 0
      ? Math.round(
          performanceData.reduce((acc, curr) => acc + curr.percentage, 0) /
            performanceData.length
        )
      : 0;

  const pieData = [
    { name: 'Scored', value: averagePercentage },
    { name: 'Remaining', value: 100 - averagePercentage },
  ];

  const barChartData = {
    labels: performanceData.map((_, index) => `Course ${index + 1}`),
    datasets: [
      {
        label: 'Percentage',
        data: performanceData.map((item) => item.percentage),
        backgroundColor: '#36A2EB',
        borderRadius: 5,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        title: {
          display: true,
          text: 'Percentage',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Courses',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (isLoading)
    return (
      <div
        className="content-wrapper col-8 col-lg-10"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '25vh',
          backgroundColor: '#fefefe',
        }}
      >
        <PacmanLoader color="#36d7b7" size={40} />
      </div>
    );

  if (isError)
    return <p className="text-danger text-center mt-4">Failed to load data</p>;

  return (
    <div className="content-wrapper col-8 col-lg-10">
      <div className="container-fluid py-4">
        <div className="row row-two g-4">
          <h6 className="mb-3">Quiz Performance</h6>

          <div className="col-lg-6 col-12">
            <div className="quiz-card quiz-pie-chart">
              <div className="quiz-title">Overall Score</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={800}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="number">{averagePercentage}%</div>

              {/* Custom Legend */}
              <div className="legend-container mt-2 d-flex justify-content-center gap-4">
                <div className="legend-item d-flex align-items-center gap-2">
                  <div
                    className="legend-color-box"
                    style={{
                      backgroundColor: COLORS[0],
                      width: 15,
                      height: 15,
                    }}
                  ></div>
                  <span>Scored</span>
                </div>
                <div className="legend-item d-flex align-items-center gap-2">
                  <div
                    className="legend-color-box"
                    style={{
                      backgroundColor: COLORS[1],
                      width: 15,
                      height: 15,
                    }}
                  ></div>
                  <span>Remaining</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 quiz-bar-chart">
            <div className="quiz-card">
              <div className="quiz-title">Quiz Percentage by Course</div>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive px-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course No.</th>
              <th>Course Name</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={item.courseId}>
                <th>{index + 1}</th>
                <td>{item.title}</td>
                <td>{item.correct}</td>
                <td>{item.wrong}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizPerformance;






