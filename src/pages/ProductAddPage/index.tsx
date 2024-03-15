import { Link } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  addNewProduct,
  uploadStorePhoto,
} from '@/store/productPage/productPageThunks';
import { closeModal, openModal } from '@/store/modalSlice';
import { ProductAddForm } from '@/types';
import { ButtonUI, Modal, OrnamentalTitle } from '@/components/UI';
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
} from './components';
import s from './ProductAddPage.module.scss';

export const ProductAddPage = () => {
  const dispatch = useAppDispatch();
  const isSuccessModal = useAppSelector(
    (state) => state.modal.successAddProduct,
  );
  const isFormErrorModal = useAppSelector(
    (state) => state.modal.errorFormAddProduct,
  );
  const isServerErrorModal = useAppSelector(
    (state) => state.modal.serverErrorAddProduct,
  );

  const methods = useForm<ProductAddForm>({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<ProductAddForm> = async (data) => {
    try {
      const formattedData = {
        category_id: data.category,
        sub_category_name: data.subcategory,
        product_name: data.productName,
        price: data.price,
        product_description:
          data.description !== '' ? data.description : undefined,
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
        delivery_post: {
          novaPost: data.deliveryMethods.novaPost,
          ukrPost: data.deliveryMethods.ukrPost,
        },
        method_of_payment: {
          cardPayment: data.paymentMethods.cardPayment,
          cashPayment: data.paymentMethods.cashPayment,
          securePayment: data.paymentMethods.securePayment,
        },
        is_unique: data.uniqueItem,
      };

      const productResponse = await dispatch(addNewProduct(formattedData));

      if (productResponse.payload !== 'Помилка додавання товару') {
        const productId = productResponse.payload[1].product_id;

        const allPhotos = [
          { file: data.productPhotoFirst, isMain: 'true' },
          { file: data.productPhotoSecond, isMain: 'false' },
          { file: data.productPhotoThird, isMain: 'false' },
          { file: data.productPhotoFourth, isMain: 'false' },
        ];

        const existingPhotos = allPhotos.filter((photo) => photo.file);
        existingPhotos.map(async (photo) => {
          const formData = new FormData();
          formData.append('image', photo.file);
          formData.append('main', photo.isMain);

          await dispatch(
            uploadStorePhoto({
              product_id: productId,
              form_data: formData,
            }),
          );
        });

        dispatch(openModal('successAddProduct'));
      }

      if (productResponse.payload === 'Помилка додавання товару') {
        dispatch(openModal('serverErrorAddProduct'));
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleFormSubmit = () => {
    methods.handleSubmit(onSubmit)();

    if (!isValid) {
      dispatch(openModal('errorFormAddProduct'));
    }
  };

  const closeModalWindow = (id: string) => {
    dispatch(closeModal(id));
  };

  return (
    <section className={s.product}>
      <div className={`container ${s.product_container}`}>
        <Link to='/account/store/products' className={s.product_button}>
          <Icon icon='solar:alt-arrow-left-outline' /> Назад
        </Link>
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
              type='submit'
              label='Опублікувати товар'
              className={s.form_button}
              onClick={handleFormSubmit}
            />
          </form>
        </FormProvider>
      </div>

      {isSuccessModal && (
        <Modal modalId='successAddProduct' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Товар успішно додано!' />
          <p className={s.modal_text}>
            Товар успішно додано до вашого списку. Ви можете переглянути його у
            своєму особистому кабінеті або на сторінці магазину.
          </p>
          <ButtonUI
            isLink
            path='/account/store/products'
            label='Готово!'
            onClick={() => closeModalWindow('successAddProduct')}
            className={s.modal_button}
          />
        </Modal>
      )}

      {isFormErrorModal && (
        <Modal modalId='errorFormAddProduct' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Виникла помилка!' />
          <p className={s.modal_text}>
            Ой. Здається, ви пропустили заповнення одного з полів. Будь ласка,
            поверніться та перегляньте форму.
          </p>
          <ButtonUI
            label='Повернутися'
            onClick={() => closeModalWindow('errorFormAddProduct')}
            className={s.modal_button}
          />
        </Modal>
      )}

      {isServerErrorModal && (
        <Modal modalId='serverErrorAddProduct' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Виникла помилка!' />
          <p className={s.modal_text}>
            Виникла непередбачувана помилка. Будь ласка, спробуйте ще раз.
          </p>
          <ButtonUI
            isLink
            path='/account/store/products'
            label='Закрити'
            onClick={() => closeModalWindow('serverErrorAddProduct')}
            className={s.modal_button}
          />
        </Modal>
      )}
    </section>
  );
};
