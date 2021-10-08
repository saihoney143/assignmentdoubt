import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'
import Passwords from './Passwords'

class App extends Component {
  state = {
    contactList: [],
    website: '',
    username: '',
    password: '',
    count: 0,
    isChecked: false,
  }

  onChecked = () => {
    const {isChecked} = this.state
    this.setState({isChecked: !isChecked})
  }

  onAddcontact = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newcontact = {
      id: v4(),
      website,
      username,
      password,
      isPasswordShown: false,
    }
    this.setState(prevstate => ({
      contactList: [...prevstate.contactList, newcontact],
      website: '',
      username: '',
      password: '',
      searchinput: '',
    }))
    this.setState(prev => ({count: prev.count + 1}))
  }

  onAddwebsite = event => {
    this.setState({website: event.target.value})
  }

  onAddusername = event => {
    this.setState({username: event.target.value})
  }

  onAddpassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchinput = event => {
    this.setState({searchinput: event.target.value})
  }

  onDelete = id => {
    const {contactList} = this.state
    const filteredData = contactList.filter(x => x.id !== id)
    this.setState({contactList: filteredData})
    this.setState(prevstate => ({count: prevstate.count - 1}))
  }

  getFilteredelemntsList = () => {
    const {contactList, isChecked} = this.state
    if (isChecked) {
      return contactList.filter(x => x.isPasswordShown === true)
    }
    return contactList
  }

  render() {
    const {
      website,
      username,
      password,
      searchinput,
      count,
      isChecked,
    } = this.state

    const filteredList = this.getFilteredelemntsList()

    const searchResults = filteredList.filter(x =>
      x.website.includes(searchinput),
    )

    return (
      <div className="back">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logo"
          alt="app logo"
        />
        <div className="container">
          <form className="p-container" onSubmit={this.onAddcontact}>
            <h1 className="head">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo2"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onAddwebsite}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logo2"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onAddusername}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo2"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onAddpassword}
                value={password}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="image"
            alt="password manager"
          />
        </div>
        <div className="container2">
          <div className="container3">
            <h1 className="para">Your Passwords : {count}</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="logo2"
              />
              <input
                type="search"
                className="input"
                placeholder="Search"
                value={searchinput}
                onChange={this.onSearchinput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="showpassword">
            <input
              type="checkbox"
              id="check"
              className="logo3"
              defaultChecked={isChecked}
              onChange={this.onChecked}
            />
            <label htmlFor="check" className="para">
              Show Passwords
            </label>
          </div>
          <ul className="u-container">
            {searchResults.map(x => (
              <Passwords Details={x} key={x.id} onDelete={this.onDelete} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
