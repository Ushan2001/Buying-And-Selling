import React from 'react'

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
  <div className="container-fluid">
    <a className="navbar-brand" href="/home"><i className='fas fa-home'></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/customer">Customer</a>
        </li> 

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/history">History</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/create">Add Recordes</a>
        </li>
      </ul>

       <a href='/admin'>
        <button className="btn btn-outline-info" style={{marginRight:"20px"}}>
        <i className='fas fa-sign-out-alt'></i>&nbsp;Logout
          </button>

        </a>
   
    </div>

    
  </div>
</nav>
    </div>
  )
}
