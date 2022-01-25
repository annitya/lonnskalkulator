import { FunctionComponent } from 'react';
import './Header.css';

interface HeaderProps {
    title: string;
}

const Header: FunctionComponent<HeaderProps> = ({ title }) => {
    return <h1 className="header">{title}</h1>;
};

export default Header;
