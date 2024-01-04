import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useAppSelector } from '@/hooks/reduxHook';
import { PostDeliveryInfo } from '@/types';
import { SelectInput } from '@/components/UI/SelectInput';
import s from './UserSettingsForm.module.scss';

export const UserDeliveryData = () => {
  const novaPostDeliveryInfo = useAppSelector(
    (state) => state.delivery.novaPost,
  ) as PostDeliveryInfo[];
  const ukrPostDeliveryInfo = useAppSelector(
    (state) => state.delivery.ukrPost,
  ) as PostDeliveryInfo[];

  const cityName = useAppSelector((state) => state.userProfile.city);
  const post = useAppSelector((state) => state.userProfile.post);
  const address = useAppSelector((state) => state.userProfile.address);
  const branchName = useAppSelector((state) => state.userProfile.branch_name);

  const { control, watch, setValue } = useFormContext();
  const selectedCity = watch('city');
  const selectedPost = watch('post');

  const novaPostCities = novaPostDeliveryInfo.map((city) => city.city_name);
  const ukrPostCities = ukrPostDeliveryInfo.map((city) => city.city_name);

  const availableDeliveryCities = [
    ...new Set([...novaPostCities, ...ukrPostCities]),
  ].map((item) => ({ value: item, label: item }));

  const [postOptions, setPostOptions] =
    useState<{ value: string; label: string }[]>();
  const [branchesOptions, setBranchesOptions] =
    useState<{ value: string; label: string }[]>();

  useEffect(() => {
    if ((selectedCity && cityName) || selectedCity) {
      const isNovaPostAvailable = novaPostCities.includes(selectedCity);
      const isUkrPostAvailable = ukrPostCities.includes(selectedCity);

      let deliveryCompanies = [];

      if (isNovaPostAvailable) {
        deliveryCompanies.push({
          value: 'nova_post',
          label: 'Нова пошта',
        });
      }

      if (isUkrPostAvailable) {
        deliveryCompanies.push({
          value: 'ukr_post',
          label: 'Укрпошта',
        });
      }

      setPostOptions(deliveryCompanies);

      if (selectedCity === cityName) {
        setValue('post', post ? post : null);
        setValue(
          'branches',
          address && branchName ? `${branchName}, ${address}` : null,
        );
      } else {
        setValue('post', null);
        setValue('branches', null);
      }
    }
  }, [selectedCity, cityName]);

  useEffect(() => {
    if (selectedPost) {
      let branchesData: string[] = [];

      if (selectedPost === 'nova_post') {
        branchesData = novaPostDeliveryInfo
          .filter((city) => city.city_name === selectedCity)
          .map((city) =>
            city.branches.map(
              (branch) => `${branch.branch_name}, ${branch.address}`,
            ),
          )
          .flat();
      }

      if (selectedPost === 'ukr_post') {
        branchesData = ukrPostDeliveryInfo
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

      if (selectedPost === post && selectedCity === cityName) {
        setValue(
          'branches',
          address && branchName ? `${branchName}, ${address}` : null,
        );
      } else {
        setValue('branches', null);
      }
    }
  }, [selectedPost]);

  return (
    <div className={s.block}>
      <p className={s.hints}>Дані про доставку</p>

      <Controller
        name='city'
        control={control}
        defaultValue={cityName ? cityName : null}
        render={({ field }) => (
          <SelectInput
            field={field}
            options={availableDeliveryCities}
            placeholder='-Оберіть місто-'
            isSearchable={true}
          />
        )}
      />

      <Controller
        name='post'
        control={control}
        rules={{ required: selectedCity }}
        defaultValue={
          post
            ? post === 'nova_post'
              ? { value: 'nova_post', label: 'Нова Пошта' }
              : post === 'ukr_post'
              ? { value: 'ukr_post', label: 'Укрпошта' }
              : null
            : null
        }
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
        rules={{ required: selectedCity && selectedPost }}
        defaultValue={
          address && branchName ? `${branchName}, ${address}` : null
        }
        render={({ field }) => (
          <SelectInput
            field={field}
            options={branchesOptions}
            placeholder='-Оберіть відділення-'
            isSearchable={true}
            isDisabled={!selectedCity || !selectedPost}
          />
        )}
      />
    </div>
  );
};
