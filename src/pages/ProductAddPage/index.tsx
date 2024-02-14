import { FormProvider, useForm } from 'react-hook-form';
import {
  ProductName,
  ProductDescription,
  ProductPhotos,
  Categories,
  ProductAvailabilityAndPrice,
  Colors,
  ProductParameters,
  Materials,
  CareInstructions,
  ProductShippingPaymentOptions,
  ProductRefundRules,
} from '@/components/productAdd';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { closeModal, openModal } from '@/store/modalSlice';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { Modal } from '@/components/Modal';
import { ButtonUI } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductAddPage.module.scss';

export const ProductAddPage = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.productAdd);

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
    reset,
  } = methods;

  const onSubmit = (data) => {
    const formattedData = {
      category_id: data.category,
      sub_category_name: data.subcategory,
      product_name: data.productName,
      price: data.price,
      product_description: data.description,
      is_active: true,
      product_status: data.status,
      product_characteristic: {
        careInstructions: data.careInstructions,
        coating: data.coating,
        colors: data.colors,
        deadline: data.deadline,
        decorativeElements: data.decorativeElements,
        metals: data.metals,
        other: data.other,
        parameters: data.parameters,
        stones: data.stones,
        textiles: data.textiles,
      },
      is_return: data.refunds,
      delivery_post: data.deliveryMethods,
      method_of_payment: data.paymentMethods,
      is_unique: data.uniqueItem,
    };

    // console.log(data);
    // console.log(formattedData);
  };

  const handleFormSubmit = () => {
    dispatch(openModal('productAdd'));
    methods.handleSubmit(onSubmit)();
  };

  const closeModalWindow = () => {
    dispatch(closeModal('productAdd'));
    reset();
  };

  return (
    <section className={s.product}>
      <div className={`container ${s.product_container}`}>
        <button className={s.product_button}>
          <Icon icon='solar:alt-arrow-left-outline' /> Назад
        </button>
        <FormProvider {...methods}>
          <form
            id='addNewProduct'
            className={s.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={s.form_wrap}>
              <h4>Загальна інформація</h4>
              <ProductName />
              <ProductDescription />
              <ProductPhotos />
              <Categories />
              <ProductAvailabilityAndPrice />
              <div className={s.decorative_element} />
            </div>

            <div className={s.form_wrap}>
              <h4>Деталі</h4>
              <Colors />
              <ProductParameters />
              <Materials />
              <CareInstructions />
              <div className={s.decorative_element} />
            </div>

            <div className={s.form_wrap}>
              <h4>Логістика</h4>
              <ProductShippingPaymentOptions />
              <ProductRefundRules />
              <div className={s.decorative_element} />
            </div>

            <ButtonUI
              label='Опублікувати товар'
              className={s.form_button}
              onClick={handleFormSubmit}
            />
          </form>
        </FormProvider>
      </div>

      {isModalOpen && (
        <Modal modalId='productAdd' className={s.modal}>
          {isValid ? (
            <>
              <OrnamentalTitle tag='h4' text='Товар успішно додано!' />
              <p className={s.modal_text}>
                Товар успішно додано до вашого списку. Ви можете переглянути
                його у своєму особистому кабінеті або на сторінці магазину.
              </p>
              <ButtonUI
                isLink
                path='/account/store/products'
                label='Готово!'
                onClick={closeModalWindow}
                className={s.modal_button}
              />
            </>
          ) : (
            <>
              <OrnamentalTitle tag='h4' text='Виникла помилка!' />
              <p className={s.modal_text}>
                Ой. Здається, ви пропустили заповнення одного з полів. Будь
                ласка, поверніться та перегляньте форму.
              </p>
              <ButtonUI
                label='Повернутися'
                onClick={() => {
                  dispatch(closeModal('productAdd'));
                }}
                className={s.modal_button}
              />
            </>
          )}
        </Modal>
      )}
    </section>
  );
};
