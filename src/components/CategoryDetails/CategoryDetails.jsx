import axios from 'axios';
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import {  useParams } from 'react-router-dom';
import categoryDetails from './categoryDetails.module.css'
export default function CategoryDetails() {
    const { id } = useParams();
    console.log("from category details", id);
    async function getCatgeoryDetails() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
            console.log(data);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading, error } = useQuery('categoryDetails', getCatgeoryDetails);

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

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <section className={'mt-5 pt-5 ' + categoryDetails.background}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3 text-center mx-auto">

                        <div className="card shadow pointer main-bg-color text-light mb-3">
                            <img src={data.image} className="card-img-top w-100" alt={data.name} />
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <p className="card-text">{data.createdAt}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
