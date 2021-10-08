import './index.css'

const Passwords = props => {
  const {Details, onDelete} = props
  const {website, username, password, isPasswordShown, id} = Details
  const deleteContact = () => {
    onDelete(id)
  }
  const initial = website[0]

  const showPass = isPasswordShown ? (
    {password}
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt={`stars ${id}`}
      className="star"
    />
  )

  return (
    <li className="list-container">
      <p className="initial-para">{initial}</p>
      <div className="pass-container">
        <p className="head2">{website}</p>
        <p className="para2">{username}</p>
        <p className="para2">{showPass}</p>
      </div>
      <button
        className="delete-button"
        type="button"
        testid="delete"
        onClick={deleteContact}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="d-image"
        />
      </button>
    </li>
  )
}

export default Passwords
