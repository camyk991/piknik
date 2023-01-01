import "./Room.css";

function MembersContainer(props) {
  const { users, tracks, userName, memberContainer } = props;

  return (
    <div className="Room">
      <section
        id="members__container"
        className={memberContainer ? "members__container__hidden" : null}
      >
        <div id="members__header">
          <p>Participants</p>
          <strong id="members__count">{users.length + 1}</strong>
        </div>

        <div id="member__list">
          {/* our name */}
          {tracks ? (
            <div className="member__wrapper" id="member__1__wrapper">
              <span className="green__icon"></span>
              <p className="member_name">{userName}</p>
            </div>
          ) : null}

          {/* other members names */}
          {users.length > 0 &&
            users.map((user) => {
              if (user.uid) {
                return (
                  <div
                    className="member__wrapper"
                    id={"member__" + user.uid + "__wrapper"}
                  >
                    <span className="green__icon"></span>
                    <p className="member_name">{user.uid}</p>
                  </div>
                );
              }
            })}
        </div>
      </section>
    </div>
  );
}

export default MembersContainer;
