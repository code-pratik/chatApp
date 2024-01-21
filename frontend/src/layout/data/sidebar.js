import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
import DarkMode from '../../components/sidebar/darkMode';


const mode = true



export const sideInfo = [
   {
    icon: <LocalPhoneOutlinedIcon/>,
    titleName:"Phone",
    info:"9265273444"
   },
   {
    icon: <AccountCircleOutlinedIcon/>,
    titleName:"Username",
    info:"Pratik"
   },
   {
    icon: <WorkOutlineOutlinedIcon/>,
    titleName:"Status",
    info:"Mern Devloper"
   }
]

export const sideNavigationBtnData = [
    {
     icon: <SettingsOutlinedIcon />,
     titleName:"General settings",
    },
    {
        icon: <NotificationsOutlinedIcon/>,
        titleName:"Notifications",
    },
    {
        icon: <LockOutlinedIcon/>,
        titleName:"Privacy and security",
    },
    {
        icon: <TranslateOutlinedIcon/>,
        titleName:"Language",
    },
    {
        icon:mode ? <Brightness6OutlinedIcon/> : <DarkModeOutlinedIcon/> ,
        switchs: <DarkMode/>
    }
]


