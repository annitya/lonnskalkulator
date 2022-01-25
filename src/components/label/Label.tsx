import classNames from 'classnames';
import { FunctionComponent, HTMLAttributes } from 'react';

import './Label.css';

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    htmlFor: string;
}

const Label: FunctionComponent<LabelProps> = ({ children, htmlFor, className }) => {
    return (
        <label className={classNames('label', className)} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default Label;
