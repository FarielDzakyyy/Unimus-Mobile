
import academic from "@/assets/icons/academic.png";
import creditCard from "@/assets/icons/credit-card.png";
import exams from "@/assets/icons/exam.png";
import planCard from "@/assets/icons/plan-card.png";
import resultCard from "@/assets/icons/result-card.png";
import transcript from "@/assets/icons/transcript.png";

import loginGraphic from "@/assets/images/login-graphic.png";
import logoWhite from "@/assets/images/logo-unimus-white.png";
import logo from "@/assets/images/logo-unimus.png";
import personCircleOutline from "@/assets/images/personCircleOutline.jpg";
import success from "@/assets/images/success.png";

import sks from "@/assets/icons/numsks.png";
import studytime from "@/assets/icons/study-time.png";


export const menuItems = [
    {
        id: 1,
        name: "	Kartu Rencana Studi",
        icon: planCard,
        path: "/screens/KRS"
    },
    {
        id: 2,
        name: "	Kartu Hasil Studi",
        icon: resultCard,
        path: "/screens/Result"    
    },
    {
        id: 3,
        name: "Transkrip Akademik",
        icon: transcript,
        path: "/screens/AcademicTranscript"
    },
    {
        id: 4,
        name: "Kalender Akademik",
        icon: academic,
        path: "/screens/KalenderAkademik"
    },
    // {
    //     id: 5,
    //     name: "Jadwal Kuliah",
    //     icon: timetable,
    //     path: "/(tabs)/Jadwal"
    // },
    {
        id: 5,
        name: "Ujian",
        icon: exams,
        path: "/screens/Ujian"
    },
    {
        id: 6,
        name: "Kewajiban Pembayaran",
        icon: creditCard,
        path: "/screens/Kewajiban-Pembayaran"
    },
    // {
    //     id: 8,
    //     name: "Kuesioner Kepuasan",
    //     icon: quiz,
    //     path: "/screens/Kuesioner-Kepuasan"
    // }
];


export const images = {
    loginGraphic,
    logo,
    logoWhite,
    success,
    personCircleOutline,
    sks,
    studytime,
    academic
}