import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    fetch("http://localhost:5000/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div className="w-50 mx-auto">
      <h1 className="text-center my-4">Please Add A Service</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-2"
          placeholder="Name"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <textarea
          className="mb-2"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <input
          className="mb-2"
          placeholder="price"
          type="number"
          {...register("price", { required: true })}
        />
        <input
          className="mb-2"
          type="text"
          placeholder="Photo Url"
          {...register("img", { required: true })}
        />
        <input className="mb-2" type="submit" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
