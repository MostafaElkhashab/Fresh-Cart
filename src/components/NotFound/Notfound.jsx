import React from 'react'
import ErrorImg from '../../images/error.svg'
import { Link } from 'react-router-dom'
export default function Notfound() {
  return <section className='mt-5 pt-5'>

    <div className="container py-5 d-flex justify-content-center align-items-center">
      <div>
        <img src={ErrorImg} alt="" className='w-100' />

      </div>
    </div>
    <div className='text-center'>
      <Link className='btn btn-success main-bg-color'to={`/products`} >Back To Home </Link>
    </div>

  </section>
}
