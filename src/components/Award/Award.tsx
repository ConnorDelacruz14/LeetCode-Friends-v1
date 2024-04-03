import "./Award.css"

type Props = {
    desc: string;
    src: string;
    alt: string;
    active: string;
}

const Award: React.FC<Props> = ({desc, src, alt, active}) => {
    return (
        <div className="award">
            <img className={active} src={src} alt={alt} />
            <div className="award-desc">{desc}</div>
        </div>
    );
}

export default Award