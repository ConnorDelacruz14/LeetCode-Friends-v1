import './ItemBox.css'

type Props = {
    title: string;
}

export const ItemBox: React.FC<Props> = ({title}) => {
    return <div className="card">{title}</div>;
}

export default ItemBox;