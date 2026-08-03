import styles from "./Session.module.css";

const Session = ({ session, index, updateSession }) => {

    return (

        <div className={styles.Session}>

            <input
                className={styles.Title}
                placeholder="Session Title"
                value={session.title}
                onChange={(e) =>
                    updateSession(index, "title", e.target.value)
                }
            />

            <input className={styles.Time}
                title="Expected start time of the event"
                type="time"
                value={
                    session.starttime
                        ? session.starttime
                        : ""
                }
                onChange={(e) =>
                    updateSession(index, "starttime", e.target.value)
                }
            />

        </div>

    );

};

export default Session;