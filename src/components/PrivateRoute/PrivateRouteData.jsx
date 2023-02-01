import DashBoard from "../../pages/Home";
import Invoices from "../../pages/Invoices";
import MainDashboard from "../../pages/MainDashboard";
import PlayerReports from "../../pages/PlayerReports";
// import CasinoSetting from "../../pages/Casino";

export const PrivateRouteData = [
    {
        menu_num: "01",
        components: <DashBoard />,
        path: "/",
    },
    {
        menu_num: "02",
        components: <Invoices />,
        path: "/invoices",
    },
    {
        menu_num: "03",
        components: <MainDashboard />,
        path: "/casino",
    },
    {
        menu_num: "04",
        components: <PlayerReports />,
        path: "/Player-reports",
    }
    // {
    //     menu_num: "04",
    //     components: <CasinoSetting />,
    //     path: "/casino-settings",
    // }
];
