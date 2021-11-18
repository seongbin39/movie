import React from "react";
import { useParams, NavLink, useSearchParams, useLocation } from 'react-router-dom'
import './Movie.css'

function Movie({...rest}){
    console.log(rest)
    const params = useParams() // URL 파라미터 정보를 반환함
    
    const [searchParams, setSearchParams] = useSearchParams()
    const applyActiveColor = ({ isActive }) => (isActive? {color: 'orangered'} : {})
    const {title, genre, cover, summary} = rest

     // URL 쿼리스트링 값을 사용자가 입력한 키워드로 설정(변경)함
     const changeQueryString = (e) => {
        const filter = e.target.value // 사용자가 입력한 키워드
        if(filter){
            setSearchParams({ filter })
        }else{
            setSearchParams({})
        }
    }
    // props = {key, style, className}
    const QueryNavLink = ({ to, children, ...props}) => {
        const location = useLocation()
        // console.log(location)
        return <NavLink to={to+location.search} {...props}>{children}</NavLink>
    }

    const moviesFilterd = rest
    .filter( movie => {
        const filter = searchParams.get('filter')
        if(!filter) return true
        const title = movie.title.toLowerCase()
        return title.includes(filter.toLowerCase()) // 키워드에서 대소문자 구분없이 검색이 됨
    })

    const movie = moviesFilterd[params.movieId]
    return(
        <>
            {/* 쿼리스트링을 이용한 검색 */}
            <br/>
            <input className="filter-movie" value={searchParams.get('filter')||""} onChange={changeQueryString} placeholder="Search Movie..."></input>

            {/* 특정 블로그 포스트  */}
            {movie ? 
                <div className="movie-container">
                    <h1>{movie.title}</h1>
                    <p>{movie.content}</p>
                    <span>{movie.created}</span>
                </div>
            :
                <h1>Movie PAGE</h1>
            }
            {/* 블로그 전체목록 보여주거나 사용자가 입력한 키워드로 필터링 된 */}
            {moviesFilterd
            .map( (movie, id) => {
                return (
                    <QueryNavLink key={id} to={`/movies/${id}`} className="movie-item" style={applyActiveColor}>{movie.title}</QueryNavLink>
                )
            })}
        </>
    )
}

export default Movie