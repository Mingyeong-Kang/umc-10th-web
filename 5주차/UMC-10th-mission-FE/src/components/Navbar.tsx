import { NavLink } from "react-router-dom"

const LINKS = [
    { to: '/', label: '홈'},
    { to: '/signup', label: '회원 가입'},
    { to: '/login', label: '로그인'},
    { to: '/my', label: '마이페이지'},
]

export const Navbar = () => {
    return (
        <div className="flex gap-3 p-4">
            {LINKS.map(({to, label}) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({isActive}) => {
                        return isActive ? 'text-blue-600 font-bold' : 'text-gray-500';
                    }}
                >
                    {label}
                </NavLink>
            ))
            }
        </div>
    )
    
}