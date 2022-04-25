import React from "react";
import useServices from "../../hooks/useServices";

const ManageServices = () => {
  const [services, setServices] = useServices();

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `http://localhost:5000/services/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const remaining = services.filter((service) => service._id !== id);
          setServices(remaining);
        });
    }
  };

  return (
    <div className="w-50 mx-auto text-center">
      <h1>Manage Services</h1>
      {services.map((service) => (
        <div key={service._id}>
          <h5 className="mb-3">
            {service.name}{" "}
            <button onClick={() => handleDelete(service._id)}>X</button>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
