import { NavLink } from "react-router-dom"

const LINK = [
  {to: '/', label:'홈'},
  {to: '/movies/popular', label:'인기영화'},
  {to: '/movies/now_playing', label:'상영 중'},
  {to: '/movies/top_rated', label:'평점높은'}
]

export const Navbar= () =>{
  return(
    <div className="flex gap-3 p-4">
      {LINK.map(({to, label})=>(
        <NavLink
        key={to}
        to={to}
        className={({isActive}) =>
          isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'
        }
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}
