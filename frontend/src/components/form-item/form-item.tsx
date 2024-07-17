import { ReactNode } from 'react';

interface FormItemProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    label: ReactNode;
}

const FormItem = ({ children, label, ...labelProps }: FormItemProps) => {
    return (
        <div>
            <label {...labelProps} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">{children}</div>
        </div>
    );
};

export default FormItem;
