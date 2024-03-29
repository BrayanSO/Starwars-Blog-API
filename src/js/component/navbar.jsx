import React, { useState, useContext  } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import "../../styles/home.css";

export const Navbar = () => {
  const [links, setLinks]=useState([
    { text:"Characters", link:"/characters"},
    { text:"Films", link:"/films"},
    { text:"Species", link:"/species"},
    { text:"Starships", link:"/starships"},
    { text:"Vehicles", link:"/Vehicles"},
    { text:"Planets", link:"/planets"}
]); 

  const {store, actions} = useContext(Context);
  return (
    <nav id="navbar" className="navbar navbar-light navbar-expand-md navbar-dark shadow-5-strong   ">
      <div className="container  ">
        <Link to="/" className="navbar-brand" >
        <img id="logo" src="https://media3.giphy.com/media/qMUgKxlzfUpwno5Ywr/giphy.gif?cid=ecf05e47en43q6b1yeshyb6k439klg1yn05c4ut6sc0i60by&ep=v1_gifs_related&rid=giphy.gif&ct=s"/>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <div className="collapse navbar-collapse" >
          <ul  className="navbar-nav">
           { links.map((link, index) => (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={link.link}>{link.text}</Link>
              </li>
            ))}
            <li id="navstyle" className="nav-item dropdown ml-auto">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites <span>{store.favorites.length}</span>
              </a>
              <ul className="dropdown-menu">
                { store.favorites.map((item, index) => (
              <li key={index} className="dropdown-item">
                <Link to={item.link}>{item.name}</Link>
                <button onClick={()=>actions.removeFavorites(index)}>
                  <div>
                   <i id="iconbas" className="icon bi bi-trash3-fill"></i>
                   </div>
                   </button>
              </li>
            ))}
            {store.favorites<=0? <li className="dropdown-item"> Sin favoritos </li> : null}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
