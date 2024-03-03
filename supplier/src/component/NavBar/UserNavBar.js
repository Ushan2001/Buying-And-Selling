import React from 'react'

export default function UserNavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" >
  <div className="container-fluid">
    <a className="navbar-brand" href="/userHome"><i className='fas fa-home'></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/userproduct">Product</a>
        </li> 

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/userdiscount">Discount</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/feedback">Feedback</a>
        </li>

        <a href='/user/add/product'>
                            <button className="btn btn-outline-warning">
                            Post Your AD
                            </button >
                            </a>
      </ul>

       <a href='/'>
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
