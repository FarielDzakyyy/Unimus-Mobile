
import academic from "@/assets/icons/academic.png";
import creditCard from "@/assets/icons/credit-card.png";
import exams from "@/assets/icons/exam.png";
import planCard from "@/assets/icons/plan-card.png";
import quiz from "@/assets/icons/quiz.png";
import resultCard from "@/assets/icons/result-card.png";
import timetable from "@/assets/icons/timetable.png";
import transcript from "@/assets/icons/transcript.png";

import loginGraphic from "@/assets/images/login-graphic.png";
import logoWhite from "@/assets/images/logo-unimus-white.png";
import logo from "@/assets/images/logo-unimus.png";
import personCircleOutline from "@/assets/images/personCircleOutline.jpg";
import success from "@/assets/images/success.png";


export const menuItems = [
    {
        id: 1,
        name: "Study Plan Card",
        icon: planCard,
        path: "/screens/Study-Plan"
    },
    {
        id: 2,
        name: "Study Result Card",
        icon: resultCard,
        path: "/screens/Result"    
    },
    {
        id: 3,
        name: "Academic Transcript",
        icon: transcript,
        path: "/screens/Academic-Transcript"
    },
    {
        id: 4,
        name: "Academic Calendar",
        icon: academic,
        path: "/screens/Academic-Calendar"
    },
    {
        id: 5,
        name: "Class Schedule",
        icon: timetable,
        path: "/(tabs)/Jadwal"
    },
    {
        id: 6,
        name: "Exams",
        icon: exams,
        path: "/screens/Ujian"
    },
    {
        id: 7,
        name: "Kewajiban Pembayaran",
        icon: creditCard,
        path: "/screens/Kewajiban-Pembayaran"
    },
    {
        id: 8,
        name: "Kuesioner Kepuasan",
        icon: quiz,
        path: "/screens/Kuesioner-Kepuasan"
    }
];


export const images = {
    loginGraphic,
    logo,
    logoWhite,
    success,
    personCircleOutline
}