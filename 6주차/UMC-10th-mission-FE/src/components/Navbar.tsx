// import { NavLink } from "react-router-dom"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

// const LINKS = [
//     { to: '/', label: '홈'},
//     { to: '/signup', label: '회원 가입'},
//     { to: '/login', label: '로그인'},
//     { to: '/my', label: '마이페이지'},
// ]

// export const Navbar = () => {
//     return (
//         <div className="flex gap-3 p-4">
//             {LINKS.map(({to, label}) => (
//                 <NavLink
//                     key={to}
//                     to={to}
//                     className={({isActive}) => {
//                         return isActive ? 'text-blue-600 font-bold' : 'text-gray-500';
//                     }}
//                 >
//                     {label}
//                 </NavLink>
//             ))
//             }
//         </div>
//     )
    
// }

export const Navbar = () => {
    const {accessToken} = useAuth();
    return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
        <div className="flex items-center justify-between p-4">
            <Link 
            to = "/"
            className="text-xl font-bold text-gray-900 dark:text-white"
            >
                SpinningSpinning Dolimpan            
            </Link>
            <div className="space-x-6">
                {!accessToken && (
                    <>
                    <Link 
                    to={"/login"} 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                    로그인
                    </Link>
                    <Link 
                    to={"/signup"} 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                    >
                    회원가입
                    </Link>
                    </>
                )}
                {accessToken && (
                <>
                <Link 
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    마이페이지
                </Link>
                <Link 
                to={"/search"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    검색
                </Link>
                </>
            )}
            </div>
        </div>
    </nav>
    )
}