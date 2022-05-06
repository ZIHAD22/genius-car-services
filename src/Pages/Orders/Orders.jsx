import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const url = `https://infinite-tundra-43461.herokuapp.com/order?email=${user?.email}`;
    axios
      .get(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setOrders(data);
      });
  }, [user]);
  return (
    <div>
      <h1>this is order details for {orders.length}</h1>
    </div>
  );
};

export default Orders;
