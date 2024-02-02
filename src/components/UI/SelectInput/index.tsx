import { ConfigProvider, Select } from 'antd';
import { SelectInputProps } from '@/types';
import { Icon } from '@iconify/react';
import './SelectInput.scss';

export const SelectInput = ({
  field,
  options,
  placeholder,
  isSearchable = false,
  className,
  isDisabled = false,
  mode,
  maxCount,
}: SelectInputProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionFontSize: 14,
            optionPadding: '14px 16px',
            colorPrimary: '#e3e2e1',
          },
        },
        token: {
          colorBorder: '#e3e2e1',
          colorPrimaryHover: '#e3e2e1',
          borderRadius: 4,
          fontFamily: 'Montserrat',
          fontSize: 14,
          colorTextPlaceholder: '#afb0af',
        },
      }}
    >
      <Select
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        ref={field.ref}
        options={options}
        placeholder={placeholder}
        showSearch={isSearchable}
        className={className}
        suffixIcon={<Icon icon='solar:alt-arrow-down-outline' />}
        removeIcon={<Icon icon='iconamoon:close-light' />}
        disabled={isDisabled}
        mode={mode}
        maxCount={maxCount}
      />
    </ConfigProvider>
  );
};
