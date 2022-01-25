import classNames from 'classnames';
import { FunctionComponent } from 'react';
import Label from '../label/Label';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputId: string;
    label: string;
    placeholder: string;
    type?: 'number' | 'text';
    className?: string;
    name?: string;
}

const Input: FunctionComponent<InputProps> = ({
    inputId,
    label,
    placeholder,
    name,
    type = 'text',
    className,
    ...rest
}) => {
    return (
        <div className="inputContainer">
            <Label htmlFor={inputId}>{label}</Label>
            <input
                className={classNames('input', className)}
                type={type}
                id={inputId}
                name={name}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};

export default Input;
