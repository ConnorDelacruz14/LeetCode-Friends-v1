import { ReactElement } from 'react';
import './SmallBox.css'

type Props = {
    title: string;
    height?: string;
    icons?: Array<ReactElement>;
}

export const SmallBox: React.FC<Props> = ({title, height, icons}) => {
    const className = 'small-card ' + height;
    return (
        <div className={className}>
            {icons ? <div className="align-center username">{icons}{title}</div> : <div className="align-center username">{title}</div>}
            {icons && icons.length === 3 ? icons[2] : ""}
        </div>);
}

export default SmallBox;