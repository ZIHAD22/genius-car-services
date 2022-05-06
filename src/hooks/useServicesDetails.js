import axios from 'axios'
import { useEffect, useState } from 'react'

const useServicesDetails = (serviceId) => {
  const [service, setService] = useState({})

  useEffect(() => {
    axios
      .get(`https://infinite-tundra-43461.herokuapp.com/services/${serviceId}`)
      .then((res) => setService(res.data))
  }, [serviceId])

  return [service]
}

export default useServicesDetails
