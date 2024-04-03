import { ReactElement } from 'react';
import './SmallBox.css'

type Props = {
    title: string;
    height?: string;
    icons?: Array<ReactElement>;
    value?: String;
    appearance?: boolean;
    input?: String;
    callback?: Function;
}

export const SmallBox: React.FC<Props> = ({title, height, icons, value, appearance, input, callback}) => {
    const className = 'small-card ' + height;
    return (
        <div className={className}>
            {icons ? <div className={input ? input + " align-center" : "align-center username"}>{icons[0]}{icons[1]}{title}</div> : <div className="align-center username">{title}</div>}
            {icons && icons.length === 4 && value ? <div className="align-center">{icons[2]}{icons[3]}{value}</div> : ""}
            {appearance ? 
                <div className="appearance-options">
                    <div className="option light">
                        Light
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                            fill="currentColor" className="not-shown mode">
                            <path fill-rule="evenodd"
                                d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="option dark">
                        Dark
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                            fill="currentColor" className="not-shown mode">
                            <path fill-rule="evenodd"
                                d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div> : ""}
            {input === "add-friend" ? <input type="text" id="add-friend-input" placeholder="Add friend by username"></input>: ""}
            {input === "join-session" ? <input type="text" id="join-session-input" placeholder="ex. H3A87G" maxLength={6}></input> : ""}
        </div>);
}

export default SmallBox;