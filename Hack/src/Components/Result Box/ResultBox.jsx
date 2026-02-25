import Styles from "./ResultBox.module.css";

export default function ResultBox() {
    return (
      
         <div className={Styles.resultBox}>
            <p className={Styles.resultBoxP}>test Text</p>
            <span className={Styles.resultBoxSpan}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</span>
         </div>
    
    )
}
