import './App.css';
import React, {useState, useEffect} from 'react';
import Button from './Button'
import Sidebar from './Sidebar'
import Menu from './Menu'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import {Home, NotFound, Movie } from './pages'

function App() {
  const [homeMenu, setHomeMenu] = useState([
    { url: '/', name: 'HOME'},
    { url: '/about', name: 'ABOUT'},
    { url: '/movies', name: 'Movie'}
  ])

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])


  const showSidebar = () => {
    setOpen(!open)
  }

  useEffect( () => {
    axios('https://yts.mx/api/v2/list_movies.json?limit=12')
    .then(res => {
      return res.data.movies
    })
    .then( (res) => {
      setMovies(res)
    })
  },[])

  return(
    <div className="App">
      <Button handleClick={showSidebar}>Menu</Button>
      <Sidebar open={open}>
        <Menu menus={homeMenu}/>
      </Sidebar>
      <Routes>
          <Route path="/" element={<Home/>}/>
          {movies.map(movie => {
            <Route exact path="/" element={<Home
              key = {movie.id}
              title = {movie.title}
              genre = {movie.genre}
              cover = {movie.cover}
              summary = {movie.summary}
            />}/>
          })}
          
          {movies.map(movie => {
            <Route path="/movies" element={<Movie
              key = {movie.id}
              title = {movie.title}
              genre = {movie.genre}
              cover = {movie.cover}
              summary = {movie.summary}
            />}>
              <Route path=":movieId" element={<Movie
                key = {movie.id}
                title = {movie.title}
                genre = {movie.genre}
                cover = {movie.cover}
                summary = {movie.summary}
              />}/>
            </Route>
          })}
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

// class App extends React.Component {
//   homeMenu = [
//     { url: '/', name: 'HOME'},
//     { url: '/about', name: 'ABOUT'},
//     { url: '/movies', name: 'Movie'}
//   ]
//   state={
//     open:false,
//     loading: true,
//     movies: [],
//   }

//   showSidebar = () => {
//     this.setState({open: !this.state.open})
//   }

//   componentDidMount(){ 
//     fetch('https://yts.mx/api/v2/list_movies.json?limit=12') 
//     .then( res => res.json()) 
//     .then( result => { 
//       const {data: {movies}} = result 

//       console.log(movies)
//       this.setState({loading: false, movies}) 
//     }) 
//   }

//   render() {
//     const { open } = this.state
//     const { homeMenu } = this
//     const { loading, movies} = this.state
//     console.log(movies)

//     return (
//       <div className="App">
//         <Button handleClick={this.showSidebar}>Menu</Button>
//         <Sidebar open={open}>
//           <Menu menus={homeMenu}/>
//         </Sidebar>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           {movies.map(movie => {
//             <Route exact path="/" element={<Home
//               key = {movie.id}
//               title = {movie.title}
//               genre = {movie.genre}
//               cover = {movie.cover}
//               summary = {movie.summary}
//             />}/>
//           })}
          
//           {movies.map(movie => {
//             <Route path="/movies" element={<Movie
//               key = {movie.id}
//               title = {movie.title}
//               genre = {movie.genre}
//               cover = {movie.cover}
//               summary = {movie.summary}
//             />}>
//               <Route path=":movieId" element={<Movie
//                 key = {movie.id}
//                 title = {movie.title}
//                 genre = {movie.genre}
//                 cover = {movie.cover}
//                 summary = {movie.summary}
//               />}/>
//             </Route>
//           })}
          
//           <Route path="*" element={<NotFound/>}/>
//         </Routes>
//       </div>
//     )
//   }
// }

export default App;
