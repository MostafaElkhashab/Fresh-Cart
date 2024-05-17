import React from 'react'
import { Helmet } from 'react-helmet'
import categories from "./categories.module.css"
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
export default function Categories() {
  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    } catch (error) {
      console.log("error : ", error.response.data.message);
    }
  }

  const { data, isLoading } = useQuery('categories', getCategories);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <ThreeCircles
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <section className={'mt-5 pt-5 '+categories.background}>
      <Helmet>
        <title>
          Categories
        </title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="container mt-5">
        <div className="row">
          {data.map((category, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <Link to={`/categoriesDetails/${category._id}`} className="text-decoration-none">
                <div className="card border-0 shadow-sm">
                  <img
                    src={category.image}
                    className="card-img-top rounded-3"
                    alt={category.name}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center bg-body-secondary main-color">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">{category.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
