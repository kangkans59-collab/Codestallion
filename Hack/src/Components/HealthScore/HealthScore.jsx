// import { useEffect, useState } from "react";
// import Styles from "./HealthScore.module.css";

// export default function HealthScore({ score = 78 }) {   
//   const radius = 55;
//   const circumference = 2 * Math.PI * radius;

//   const [offset, setOffset] = useState(circumference);
//   const [color, setColor] = useState("#2ecc71");

//   useEffect(() => {
//     setOffset(circumference - (score / 100) * circumference);

//     if (score < 40) setColor("#e74c3c");
//     else if (score < 70) setColor("#f39c12");
//     else setColor("#2ecc71");
//   }, [score, circumference]);

//   const getHealthText = () => {
//     if (score < 40) {
//       return {
//         title: "Needs Attention",
//         message:
//           "Some of your health values are outside the usual range. This doesn’t mean something serious, but it may be helpful to review them with a healthcare professional."
//       };
//     } else if (score < 70) {
//       return {
//         title: "Fair",
//         message:
//           "Your health indicators are generally acceptable, with a few areas that could benefit from monitoring or small lifestyle adjustments."
//       };
//     } else {
//       return {
//         title: "Good",
//         color: "#2ecc71",
//         message:
//           "Your health indicators are within a healthy range. Keep up your current habits and continue regular checkups."
//       };
//     }
//   };

//   const healthText = getHealthText();

//   return (

//       <div className={Styles.healthScore}>
//         {/* Donut lives INSIDE your existing div */}
//         <div className={Styles.donutWrapper}>
//           <svg className={Styles.svg} width="140" height="140">
//             <circle
//               cx="70"
//               cy="70"
//               r={radius}
//               className={Styles.bg}
//             />
//             <circle
//               cx="70"
//               cy="70"
//               r={radius}
//               className={Styles.progress}
//               stroke={color}
//               strokeDasharray={circumference}
//               strokeDashoffset={offset}
//             />
//           </svg>

//           <div className={Styles.text}>
//             <h2>{score}</h2>
//             <span>Health</span>
//           </div>
//         </div>
//         <div className={Styles.healthExplanation}>
//           <h4>{healthText.title}</h4>
//           <p>{healthText.message}</p>
          
//         </div>
//         <button className={Styles.analyseBtn}>
//             Analyse further
//         </button>
//       </div>
    
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./HealthScore.module.css";

export default function HealthScore() {

  const { fileId } = useParams();

  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [color, setColor] = useState("#2ecc71");

  const [score, setScore] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [parsedData, setParsedData] = useState([]);


  // 🔹 Fetch analysis from backend
  useEffect(() => {

    const fetchAnalysis = async () => {

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/analyze/${fileId}`
        );

        const data = await res.json();

        if (res.ok) {

          setExplanation(data.explanation);
          setParsedData(data.parsed_data);

          // 🔥 Calculate health score
          const calculatedScore = calculateScore(data.parsed_data);

          setScore(calculatedScore);

        } else {
          console.error(data);
        }

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    if (fileId) {
      fetchAnalysis();
    }

  }, [fileId]);


  // 🔹 Update donut when score changes
  useEffect(() => {

    setOffset(circumference - (score / 100) * circumference);

    if (score < 40) setColor("#e74c3c");
    else if (score < 70) setColor("#f39c12");
    else setColor("#2ecc71");

  }, [score, circumference]);


  // 🔹 Score calculator
  const calculateScore = (data) => {

    if (!data || data.length === 0) return 0;

    let total = 0;

    data.forEach((item) => {

      if (item.status === "normal") total += 100;
      else if (item.status === "low") total += 60;
      else if (item.status === "high") total += 60;
      else total += 50;

    });

    return Math.round(total / data.length);
  };


  const getHealthText = () => {

    if (score < 40) {
      return {
        title: "Needs Attention",
        message:
          "Some of your health values are outside the usual range. This does not mean something serious, but you should discuss them with a healthcare professional."
      };

    } else if (score < 70) {
      return {
        title: "Fair",
        message:
          "Your health indicators are generally acceptable, with a few areas that may need monitoring."
      };

    } else {
      return {
        title: "Good",
        message:
          "Your health indicators are within a healthy range. Keep maintaining your current habits."
      };
    }
  };


  if (loading) {
    return <p style={{ padding: "40px" }}>Analyzing report...</p>;
  }


  const healthText = getHealthText();


  return (

    <div className={Styles.healthScore}>

      {/* Donut */}
      <div className={Styles.donutWrapper}>

        <svg className={Styles.svg} width="140" height="140">

          <circle
            cx="70"
            cy="70"
            r={radius}
            className={Styles.bg}
          />

          <circle
            cx="70"
            cy="70"
            r={radius}
            className={Styles.progress}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        <div className={Styles.text}>
          <h2>{score}</h2>
          <span>Health</span>
        </div>

      </div>


      {/* Explanation */}
      <div className={Styles.healthExplanation}>

        <h4>{healthText.title}</h4>

        <p>{healthText.message}</p>

        <p style={{ marginTop: "10px", color: "#555" }}>
          {explanation}
        </p>

      </div>


      <button className={Styles.analyseBtn}>
        Analyse further
      </button>

    </div>

  );
}