import { Modal } from '@/components/Modal';
import { RegistrationBenefits } from '@/components/auth/RegistrationBenefits';
import { useState } from 'react';
import { RegistrationSuccessMessage } from './RegistrationSuccessMessage';
import s from './SignUp.module.scss';
import { SignUpOptions } from './SignUpOptions';
import { SignUpWithEmail } from './SignUpWithEmail';

export const SignUp = () => {
  const [signUpEmail, setSignUpEmail] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCongratulations, setIsCongratulations] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSignUpEmail(false);
    setIsCongratulations(true);
  };

  const handleSignUpEmail = () => {
    setSignUpEmail(true);
  };

  return (
    <section className={s.section}>
      <RegistrationBenefits />
      {!signUpEmail && !isCongratulations && (
        <SignUpOptions handleSignUpEmail={handleSignUpEmail} />
      )}
      {signUpEmail && <SignUpWithEmail openModal={openModal} />}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          buttonText='start work'
        >
          <h2 className={s.modal_title}>Дякуємо за реєстрацію!</h2>
          <p className={s.modal_text}>
            Ми відправили вам на пошту лист, для підтвердження вашого облікового
            запису, перейдіть за посиланням в листі.
          </p>
        </Modal>
      )}
      {isCongratulations && <RegistrationSuccessMessage />}
    </section>
  );
};
