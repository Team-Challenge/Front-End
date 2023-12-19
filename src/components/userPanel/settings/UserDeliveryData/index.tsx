import { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  getNovaPostInfo,
  getUkrPostInfo,
} from '@/store/deliveryOptions/deliveryThunks';
import { closeModal, openModal } from '@/store/modalSlice';
import { PostDeliveryInfo  } from '@/types';
import { SelectInput } from '@/components/UI/SelectInput';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './UserDeliveryData.module.scss';

export const UserDeliveryData = () => {
  const dispatch = useAppDispatch();
  const novaPostDeliveryInfo = useAppSelector(
    (state) => state.delivery.novaPost,
  ) as PostDeliveryInfo [];
  const ukrPostDeliveryInfo = useAppSelector(
    (state) => state.delivery.ukrPost,
  ) as PostDeliveryInfo [];
  const isDeleteDataModal = useAppSelector(
    (state) => state.modal.deleteDeliveryData,
  );

  const { control, watch, setValue, reset } = useFormContext();
  const selectedCity = watch('city');
  const selectedPost = watch('post');
  const selectedBranch = watch('branches');

  const isAllFieldsFilled = selectedCity && selectedPost && selectedBranch;

  const novaPostCities = novaPostDeliveryInfo.map((city) => city.city_name);
  const ukrPostCities = ukrPostDeliveryInfo.map((city) => city.city_name);

  const availableDeliveryCities = [...new Set([...novaPostCities, ...ukrPostCities])].map(
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

      setValue('post', null);
      setValue('branches', null);
    }
  }, [selectedCity]);

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

      setValue('branches', null);
    }
  }, [selectedPost]);

  const openDeleteDeliveryDataModal = () => {
    dispatch(openModal('deleteDeliveryData'));
  };

  const cancelDeleteDeliveryData = () => {
    dispatch(closeModal('deleteDeliveryData'));
  };

  const deleteDeliveryData = () => {
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
            options={availableDeliveryCities}
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

      {isAllFieldsFilled && (
        <button
          className={s.button_delivery}
          onClick={openDeleteDeliveryDataModal}
        >
          <Icon icon='solar:trash-bin-minimalistic-outline' />
          Видалити
        </button>
      )}

      {isDeleteDataModal && (
        <Modal modalId='deleteDeliveryData' className={s.modal}>
          <OrnamentalTitle
            tag='h4'
            text='Ви впевнені, що хочете видалити цю адресу?'
          />
          <div className={s.modal_info}>
            <p>
              Місто
            </p>
            <p>
              Відділення
            </p>
          </div>
          <div className={s.modal_button}>
            <ButtonUI
              label='Скасувати'
              onClick={cancelDeleteDeliveryData}
              className={s.modal_button_cancel}
            />
            <ButtonUI
              label='Видалити'
              onClick={deleteDeliveryData}
              className={s.modal_button_delete}
              variant='secondary'
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
