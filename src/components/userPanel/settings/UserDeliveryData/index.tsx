import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  getNovaPostInfo,
  getUkrPostInfo,
} from '@/store/deliveryOptions/deliveryThunks';
import { closeModal, openModal } from '@/store/modalSlice';
import { CityDeliveryInfo } from '@/types';
import { SelectInput } from '@/components/UI/SelectInput';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './UserDeliveryData.module.scss';

export const UserDeliveryData = () => {
  const dispatch = useAppDispatch();
  const infoNovaPost = useAppSelector(
    (state) => state.delivery.novaPost,
  ) as CityDeliveryInfo[];
  const infoUkrPost = useAppSelector(
    (state) => state.delivery.ukrPost,
  ) as CityDeliveryInfo[];
  const isDeleteDataModal = useAppSelector(
    (state) => state.modal.deleteDeliveryData,
  );

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

  const handleOpenDeleteDataModal = () => {
    dispatch(openModal('deleteDeliveryData'));
  };

  const handleCancelDeleteData = () => {
    dispatch(closeModal('deleteDeliveryData'));
  };

  const handleDeleteData = () => {
    reset({ city: null, post: null, branches: null });
    dispatch(closeModal('deleteDeliveryData'));
  };

  return (
    <div className={s.block}>
      <p className={s.hints}>Дані про доставку</p>

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

      <button className={s.button_delivery} onClick={handleOpenDeleteDataModal}>
        <Icon icon='solar:trash-bin-minimalistic-outline' />
        Видалити
      </button>

      {isDeleteDataModal && (
        <Modal modalId='deleteDeliveryData' className={s.modal}>
          <OrnamentalTitle
            tag='h4'
            text='Ви впевнені, що хочете видалити цю адресу?'
          />
          <div className={s.modal_button}>
            <ButtonUI
              label='Скасувати'
              onClick={handleCancelDeleteData}
              className={s.modal_button_cancel}
            />
            <ButtonUI
              label='Видалити'
              onClick={handleDeleteData}
              className={s.modal_button_delete}
              variant='secondary'
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
