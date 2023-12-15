import { useEffect, useState } from "react";
import { getNovaPostData } from "./api";

export const DeliverySelect = () => {
  const [novaPostDelivery, setNovaPostDelivery] = useState([]);

  useEffect(() => {
    getNovaPostData().then((res) => {
      setNovaPostDelivery(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <select>{novaPostDelivery?.map((post, index) => (
        <option key={index} value={index}>{post.city_name}</option>
      ))}</select>
    </div>
  );
}
 