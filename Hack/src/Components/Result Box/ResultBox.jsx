import Styles from "./ResultBox.module.css";

//copied
import { useEffect, useState } from "react";

export default function HealthScore({ score = 78 }) {   
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [color, setColor] = useState("#2ecc71");

  useEffect(() => {
    setOffset(circumference - (score / 100) * circumference);

    if (score < 40) setColor("#e74c3c");
    else if (score < 70) setColor("#f39c12");
    else setColor("#2ecc71");
  }, [score, circumference]);

  const getHealthText = () => {
    if (score < 40) {
      return {
        title: "Needs Attention",
        message:
          "Some of your health values are outside the usual range. This doesn’t mean something serious, but it may be helpful to review them with a healthcare professional."
      };
    } else if (score < 70) {
      return {
        title: "Fair",
        message:
          "Your health indicators are generally acceptable, with a few areas that could benefit from monitoring or small lifestyle adjustments."
      };
    } else {
      return {
        title: "Good",
        color: "#2ecc71",
        message:
          "Your health indicators are within a healthy range. Keep up your current habits and continue regular checkups."
      };
    }
  };

  const healthText = getHealthText();
//

    return (
      <>
         <div className={Styles.resultBox}>
            <p className={Styles.resultBoxP}>test Text</p>
            <span className={Styles.resultBoxSpan}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</span>
         </div>
         <div className={Styles.healthScore}>
                 {/* Donut lives INSIDE your existing div */}
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
                 <div className={Styles.healthExplanation}>
                   <h4>{healthText.title}</h4>
                   <p>{healthText.message}</p>
                   
                 </div>
                 <button className={Styles.analyseBtn}>
                     Analyse further
                 </button>
               </div>
    </>
    )
}

