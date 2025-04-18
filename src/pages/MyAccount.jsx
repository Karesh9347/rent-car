import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import { FaBookmark, FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import Footer from '../components/Footer'

const url =
  'https://images.pexels.com/photos/8134647/pexels-photo-8134647.jpeg?cs=srgb&dl=pexels-supreet-8134647.jpg&fm=jpg'

const MyAccount = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userDetails'))
    if (!user) {
      navigate('/sign-in')
    }
  }, [navigate])

  return (
    <>
      <Hero img={url} pageName="My Account" />
      <h1 className="text-center text-3xl font-thin mt-10">Welcome</h1>
      <div className="flex flex-col items-center md:items-start md:flex-row md:ml-[20%] gap-5 my-10">
        <ul className="menu menu-horizontal md:menu-vertical md:w-56 md bg-base-100 p-2 rounded-box gap-5">
          <li>
            <Link to="profile">
              <FaUserAlt />
              <p className="hidden sm:block">Profile</p>
            </Link>
          </li>
          <li>
            <Link to="reservations">
              <FaBookmark />
              <p className="hidden sm:block">Reservation</p>
            </Link>
          </li>
          <li>
            <span>
              <FaSignInAlt />
              <p className="hidden sm:block">Sign Out</p>
            </span>
          </li>
        </ul>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default MyAccount
