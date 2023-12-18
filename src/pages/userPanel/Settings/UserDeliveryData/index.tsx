import s from '../Settings.module.scss';
import { useAppSelector } from '@/hooks/reduxHook';
import { DeliveryInfo as TDelivery } from '@/types';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { getPostData } from './api';

export const UserDeliveryData = () => {
  const [deliveryOptions, setDeliveryOptions] = useState();
  const userDelivery: TDelivery | undefined = useAppSelector(
    (state) => state.userProfile.delivery_info,
  );
  const [selectedPost, setSelectedPost] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<number | undefined>();
  const [selectedBranch, setSelectedBranch] = useState<number | undefined>();

  useEffect(() => {
    if (selectedPost) {
      getPostData(selectedPost).then((res) => {
        setDeliveryOptions(res.data);
        console.log(res.data);
      });
    }
  }, [selectedPost]);

  useEffect(() => {
    console.log(selectedCity, selectedBranch)
  })

  const handleChangePost = (value: string) => {
    setSelectedPost(value);
    setSelectedCity(undefined);
    setSelectedBranch(undefined);
  };

  const handleChangeCity = (value: number) => {
    console.log('city: ', value)
    setSelectedCity(value);
    setSelectedBranch(undefined);
  };

  const handleChangeBranch = (value: number) => {
    console.log('selected branch: ', value)
    setSelectedBranch(value);
  }

  return (
    <div className={s.form_wrap}>
      <p className={s.form_hints}>Дані про доставку</p>
      {/* todo Change inputs below into dropdown selects */}
      <Select
        options={[
          { value: 'nova_post', label: 'Нова пошта' },
          { value: 'ukr_post', label: 'УкрПошта' },
        ]}
        placeholder='-Оберіть спосіб доставки-'
        onChange={handleChangePost}
        value={selectedPost}
      />
      <Select
        options={!deliveryOptions ? [] : deliveryOptions.map((city, index) => ({
          label: city.city_name,
          value: index
        }))}
        placeholder='-Оберіть місто-'
        onChange={handleChangeCity}
        value={selectedCity}
        disabled={!deliveryOptions}
      />
      <Select
        options={selectedCity == undefined || !deliveryOptions ? [] : deliveryOptions[selectedCity].branches.map((branch, index) => ({
          label: branch.address,
          value: index
        }))}
        placeholder='-Оберіть відділення-'
        onChange={handleChangeBranch}
        value={selectedBranch}
        disabled={selectedCity == undefined}
      />
    </div>
  );
};
