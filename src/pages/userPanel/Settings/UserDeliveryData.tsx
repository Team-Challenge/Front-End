import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  getNovaPostInfo,
  getUkrPostInfo,
} from '@/store/deliveryOptions/deliveryThunks';
import { CityDeliveryInfo } from '@/types';
import { SelectInput } from '@/components/UI/SelectInput';
import { Icon } from '@iconify/react';
import s from './Settings.module.scss';

export const UserDeliveryData = () => {
  const dispatch = useAppDispatch();
  const infoNovaPost = useAppSelector(
    (state) => state.delivery.novaPost,
  ) as CityDeliveryInfo[];
  const infoUkrPost = useAppSelector(
    (state) => state.delivery.ukrPost,
  ) as CityDeliveryInfo[];

  const { control, watch, setValue, reset } = useFormContext();
  const selectedCity = watch('city');
  const selectedPost = watch('post');

  const cityNovaPost = infoNovaPost.map((city) => city.city_name);
  const cityUkrPost = infoUkrPost.map((city) => city.city_name);

  const finishCities = [...new Set([...cityNovaPost, ...cityUkrPost])].map(
    (item) => ({ value: item, label: item }),
  );

  const [postOptions, setPostOptions] =
    useState<{ value: string; label: string }[]>();
  const [branchesOptions, setBranchesOptions] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    dispatch(getNovaPostInfo());
    dispatch(getUkrPostInfo());
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const isCityInNova = cityNovaPost.includes(selectedCity);
      const isCityInUkr = cityUkrPost.includes(selectedCity);

      let deliveryOptions = [];

      if (isCityInNova) {
        deliveryOptions.push({
          value: 'nova_post',
          label: 'Нова пошта',
        });
      }

      if (isCityInUkr) {
        deliveryOptions.push({
          value: 'ukr_post',
          label: 'Укрпошта',
        });
      }

      setPostOptions(deliveryOptions);

      setValue('post', null);
      setValue('branches', null);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedPost) {
      let branchesData: string[] = [];

      if (selectedPost === 'nova_post') {
        branchesData = infoNovaPost
          .filter((city) => city.city_name === selectedCity)
          .map((city) =>
            city.branches.map(
              (branch) => `${branch.branch_name}, ${branch.address}`,
            ),
          )
          .flat();
      }

      if (selectedPost === 'ukr_post') {
        branchesData = infoUkrPost
          .filter((city) => city.city_name === selectedCity)
          .map((city) =>
            city.branches.map(
              (branch) => `${branch.branch_number}, ${branch.address}`,
            ),
          )
          .flat();
      }

      const formattedBranches = branchesData.map((item) => ({
        value: item,
        label: item,
      }));

      setBranchesOptions(formattedBranches);

      setValue('branches', null);
    }
  }, [selectedPost]);

  const handleDeleteData = () => {
    reset({ city: null, post: null, branches: null });
  };

  return (
    <div className={s.form_block}>
      <p className={s.form_hints}>Дані про доставку</p>

      <Controller
        name='city'
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <SelectInput
            field={field}
            options={finishCities}
            placeholder='-Оберіть місто-'
            isSearchable={true}
          />
        )}
      />

      <Controller
        name='post'
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <SelectInput
            field={field}
            options={postOptions}
            placeholder='-Оберіть спосіб доставки-'
            isSearchable={true}
            isDisabled={!selectedCity}
          />
        )}
      />

      <Controller
        name='branches'
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <SelectInput
            field={field}
            options={branchesOptions}
            placeholder='-Оберіть спосіб доставки-'
            isSearchable={true}
            isDisabled={!selectedCity || !selectedPost}
          />
        )}
      />

      <button className={s.button_delivery} onClick={handleDeleteData}>
        <Icon icon='solar:trash-bin-minimalistic-outline' />
        Видалити
      </button>
    </div>
  );
};
