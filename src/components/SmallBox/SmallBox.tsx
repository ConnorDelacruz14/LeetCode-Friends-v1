import './SmallBox.css'

type Props = {
    title: string;
}

export const SmallBox: React.FC<Props> = ({title}) => {
    return <div className="small-card">{title}</div>;
}

export default SmallBox;