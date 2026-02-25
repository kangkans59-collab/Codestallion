import HealthScore from "../Components/HealthScore/HealthScore.jsx";
import Footer from "../Components/Navbar/Footer.jsx";
import Navbar from "../Components/Navbar/Navbar.jsx";
import ResultBox from "../Components/Result Box/ResultBox.jsx";
export default function TempAnaly() {

    return (
        <div className="TempAnaly" 
            style={{
                minHeight:"100vh",
                display: "grid",
                gridTemplateRows: "auto 1fr auto",
            }}
        >
            <Navbar />

            <main>
            <ResultBox />
            {/* <HealthScore /> */}
            </main>

            <Footer />
        </div>
    )

}