import { Select } from 'antd';
import React from 'react';
import { Raw } from 'type';

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined;
    onChange: (balue?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}

/**
 * value可以传入多种类型的值
 * onchange只会回调number｜ undefined 类型
 * 当isNaN（Number（value））为true的时候，代表选择默认类型
 * 当选择默认类型的时候onchange会回调unfedined
 * @param props
 */

export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={(value) => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
            {options?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    );
};
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
