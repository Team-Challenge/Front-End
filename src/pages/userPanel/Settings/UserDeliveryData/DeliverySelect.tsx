import { useEffect, useState } from "react";
import { getDeliveryData } from "./api";

export const DeliverySelect = () => {
  const [novaPostDelivery, setNovaPostDelivery] = useState([]);

  useEffect(() => {
    getDeliveryData().then((res) => {
      setNovaPostDelivery(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <select>{novaPostDelivery?.map((post, index) => (
        <option value={index}>{post.city_name}</option>
      ))}</select>
    </div>
  );
}
 