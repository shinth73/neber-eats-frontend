/** @format */

import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | User Eats</title>
      </Helmet>
      <div className="w-full h-96 bg-yellow-200  grid md:grid-cols-3">
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/c7e1c939303e270185f0e891858e04ee.svg)",
          }}
        ></div>
        <div className="flex flex-col justify-center">
          <div className="text-center text-3xl font-bold text mb-8">
            Your favorite food, delivered with Uber
          </div>
          <form onSubmit={handleSubmit(onSearchSubmit)} className="w-full p-auto">
            <input
              ref={register({ required: true, min: 3 })}
              name="searchTerm"
              type="Search"
              className="input rounded-md border-0 w-full"
              placeholder="Search restaurants..."
            />
          </form>
        </div>
        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/27ec7839cfd96d0aae01e6c442741e2c.svg)",
          }}
        ></div>
      </div>
      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="text-3xl font-bold mb-7">Top Categories</div>
          <div className="md:flex md:justify-around grid grid-cols-3 mx-auto border-b pb-7 2xl:border-gray-400">
            {data?.allCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`}>
                <div key={category.id} className="flex flex-col group items-center cursor-pointer">
                  <div
                    className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-medium">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-16 lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button onClick={onPrevPageClick} className="focus:outline-none font-medium text-2xl">
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button onClick={onNextPageClick} className="focus:outline-none font-medium text-2xl">
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
