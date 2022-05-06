import axios from 'axios'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import auth from '../../../firebase.init'
import useServicesDetails from '../../../hooks/useServicesDetails'

const Checkout = () => {
  const { serviceId } = useParams()
  const [service] = useServicesDetails(serviceId)
  const [user] = useAuthState(auth)

  //   for from submit hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //   handle CheackOut Submit
  const handleCheackOut = (data) => {
    axios
      .post(`https://infinite-tundra-43461.herokuapp.com/order`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Order SuccessFul')
        }
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }

  return (
    <div className="w-50 mx-auto">
      <h2 className="text-center my-3">Please Checkout For {service.name}</h2>

      <form onSubmit={handleSubmit(handleCheackOut)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            readOnly
            defaultValue={user.displayName}
            {...register('name', {
              required: 'This is required file',
              maxLength: { value: 20, message: 'Max Length Will be 20' },
            })}
            placeholder="Name"
          />
          {errors.name?.message && (
            <p className="text-danger">{errors.name?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            readOnly
            id="email"
            defaultValue={user.email}
            {...register('email', {
              required: 'This is required file',
            })}
            placeholder="Email"
          />
          {errors.email?.message && (
            <p className="text-danger">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="service" className="form-label">
            Service
          </label>
          <input
            type="text"
            className="form-control"
            readOnly
            id="service"
            defaultValue={service.name}
            {...register('service', {
              required: 'This is required file',
            })}
            placeholder="Service"
          />
          {errors.service?.message && (
            <p className="text-danger">{errors.service?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            {...register('address', {
              required: 'This is required file',
            })}
            placeholder="Address"
          />
          {errors.address?.message && (
            <p className="text-danger">{errors.address?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            {...register('phone', {
              required: 'This is required file',
              maxLength: { value: 20, message: 'Max Length Will be 20' },
            })}
            placeholder="Phone"
          />
          {errors.phone?.message && (
            <p className="text-danger">{errors.phone?.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Please Check Out"
          className="btn btn-success d-block mx-auto"
        />
      </form>
    </div>
  )
}

export default Checkout
