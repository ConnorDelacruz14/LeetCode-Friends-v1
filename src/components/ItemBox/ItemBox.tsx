import './ItemBox.css'

type Props = {
    title: string;
    iterable: Array<any>;
}

type Friend = {
    username: string;
    avatar: string;
    streak: string;
}

type Question = {
    name: string;
    number: number;
}

type Statistic = {
    name: string;
    value: number;
    img: string;
}

export const ItemBox: React.FC<Props> = ({title, iterable}) => {
    return (
        <div className="card">
            <div className="card-title">{title}</div>
            <div className="box-items">
                {title === "Friends" ? iterable.map((friend: Friend) => <div className="friend">
                    <img className="avatar" src={friend.avatar ? friend.avatar : "https://assets.leetcode.com/users/default_avatar.jpg"} alt={friend.username} />
                    <div>{friend.username}</div>
                    <div className="streak-container">
                        {friend.streak !== "0" ? <img className="streak not-shown" src="img/streak.png" alt="streak"></img> : <svg className="streak zero" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="25" height="25" fill="currentColor"><path fill-rule="evenodd"d="M7.19 1.564a.75.75 0 01.729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 011.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 01.44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 01-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"clip-rule="evenodd"></path></svg>}
                        <span>{friend.streak}</span>
                    </div>
                </div>) : ""}
                {title === "Current Session" ? iterable.map((question: Question) => <div className="question">
                    <h3>{question.number}.</h3>
                    <div>{question.name}</div>
                </div>) : ""}
                {title === "Statistics" ? iterable.map((statistic: Statistic) => <div className="statistic">
                    <img src={statistic.img}></img>
                    <div>{statistic.name}</div>
                    <div>{statistic.value}</div>
                </div>) : ""}
            </div>
        </div>

    );
}

export default ItemBox;