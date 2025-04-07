import React, { useState } from 'react'
import axios from 'axios'
import { FaEnvelope, FaLocationArrow, FaPhone } from 'react-icons/fa'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('/reviews', formData)
      if (response.status === 200) {
        setResponseMessage('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' }) // Reset form
      } else {
        setResponseMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row py-10 md:gap-2">
      <form
        className="form-control md:w-1/2 max-w-full mx-2 md:pl-20"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          className="input input-bordered w-full mb-6"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="input input-bordered w-full mb-6"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered"
          placeholder="Enter Message"
          required
        ></textarea>
        <button className="btn mt-6" type="submit">
          Send
        </button>
        {responseMessage && <p className="mt-4">{responseMessage}</p>}
      </form>
      <div className="flex flex-col items-center md:w-1/2 gap-y-14 md:pl-10 pt-10">
        <div className="flex items-center gap-2 justify-start">
          <FaLocationArrow /> <p>jagannati kanchana</p>
        </div>
        <div className="flex items-center gap-2 justify-start">
          <FaPhone /> <p>9133437102</p>
        </div>
        <div className="flex items-center gap-2 justify-start">
          <FaEnvelope />
          <a href="jkanchana20@gmail.com" className="link">
            email@example.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
