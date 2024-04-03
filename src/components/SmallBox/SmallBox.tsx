import './SmallBox.css'

type Props = {
    title: string;
    height?: string;
}

export const SmallBox: React.FC<Props> = ({title, height}) => {
    const className = 'small-card ' + height;
    return <div className={className}>{title}</div>;
}

export default SmallBox;