import { BiHomeAlt } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";
import { MdOutlineCasino } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { TbSettings } from "react-icons/tb";

export const SideBarData = [
    {
        title: "home",
        header_title: "Home - Dashboard",
        path: "/",
        icon: <BiHomeAlt size={22} />,
    },
    {
        title: "invoices",
        header_title: "invoices",
        path: "/invoices",
        icon: <TbFileInvoice size={22} />,
    },
    {
        title: "Main Dashboard",
        header_title: "casino",
        path: "/casino",
        icon: <MdOutlineCasino size={22} />,
    },
    {
        title: " Player Reports",
        header_title: "Player Reports",
        path: "/player-reports",
        icon: <HiOutlineDocumentReport size={22} />,
    },
    {
        title: "Casino Settings",
        header_title: "Casino Settings",
        path: "/casino-settings",
        icon: <TbSettings size={22} />,
    },
];
