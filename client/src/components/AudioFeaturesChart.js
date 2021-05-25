import React, { useEffect } from "react";
var Chart = require("../../node_modules/chart.js/dist/chart");

const properties = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "speechiness",
  "valence",
];

export const AudioFeaturesChart = (props) => {
  console.log(props);
  return (
    <div id="canvas-container">
      <canvas id="myChart" height="400px" width="400px"></canvas>
    </div>
  );
};

//           <div></div>
//           {trackAudioFeatures && (
//             <div style={{ maxWidth: "800px" }}>
//               <div>{parseKey(trackAudioFeatures.key)}</div>
//               <div>{trackAudioFeatures.mode === 0 ? "Minor" : "Major"}</div>
//               <div>{Math.round(trackAudioFeatures.tempo)}</div>
//               <Bar
//                 data={{
//                   labels: [
//                     "Danceability",
//                     "Energy",
//                     "Speechiness",
//                     "Acousticness",
//                     "Instrumentalness",
//                     "Liveness",
//                     "Valence",
//                   ],
//                   datasets: [
//                     {
//                       label: "",
//                       data: [
//                         danceability,
//                         energy,
//                         speechiness,
//                         acousticness,
//                         instrumentalness,
//                         liveness,
//                         valence,
//                       ],
//                       backgroundColor: [
//                         "rgba(255, 99, 132, 0.2)",
//                         "rgba(54, 162, 235, 0.2)",
//                         "rgba(255, 206, 86, 0.2)",
//                         "rgba(75, 192, 192, 0.2)",
//                         "rgba(153, 102, 255, 0.2)",
//                         "rgba(255, 159, 64, 0.2)",
//                       ],
//                       borderColor: [
//                         "rgba(255, 99, 132, 1)",
//                         "rgba(54, 162, 235, 1)",
//                         "rgba(255, 206, 86, 1)",
//                         "rgba(75, 192, 192, 1)",
//                         "rgba(153, 102, 255, 1)",
//                         "rgba(255, 159, 64, 1)",
//                       ],
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//                 height={400}
//                 width={600}
//                 options={{
//                   plugins: {
//                     legend: {
//                       display: false,
//                     },
//                     title: {
//                       display: true,
//                       text: `Audio Features`,
//                       fontSize: 18,
//                       fontColor: "#ffffff",
//                       padding: 30,
//                     },
//                   },
//                 }}
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
