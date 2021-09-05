import React, { Component, createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Filter from '../Filter/Filter';

import myPhonebook from './MyPhonebook.module.css';
import style from './Phonebook.module.css';

const findField = (people, findName) => {
  return people.filter(i =>
    i.name.toLowerCase().includes(findName.toLowerCase()),
  );
};

class Phonebook extends Component {
  titleRef = createRef();

  state = {
    people: [],
    isOn: false,
    name: '',
    number: '',
    findName: '',
  };

  componentDidMount() {
    window.addEventListener('load', this.onProp);
  }

  onProp = () => {
    this.setState({ isOn: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const add = {
      name,
      number,
    };
    this.setState(state => ({
      people: [...state.people, add],
    }));
    this.setState({ name: '', number: '' });
  };

  handleName = e => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  handleNumber = e => {
    const { value } = e.target;
    this.setState({ number: value });
  };

  handleFind = e => {
    const { value } = e.target;
    const { people, findName } = this.state;
    this.setState({ findName: value });
    people.filter(i => i.name.toLowerCase().includes(findName.toLowerCase()));
  };

  handleDelete = id => {
    this.setState(state => ({
      people: state.people.filter(i => i.name !== id),
    }));
  };

  render() {
    const { isOn, name, number, people, findName } = this.state;
    const filtered = findField(people, findName);

    return (
      <div>
        <CSSTransition in={isOn} timeout={500} classNames={myPhonebook}>
          <h1 ref={this.titleRef}>Phonebook</h1>
        </CSSTransition>
        <form onSubmit={this.handleSubmit} className={style.form}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={this.handleName}
              className={style.input}
            />
          </label>
          <label htmlFor="number">
            Number
            <input
              type="number"
              name="number"
              id="number"
              value={number}
              onChange={this.handleNumber}
              className={style.input}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>

        <Filter
          filtered={filtered}
          findName={findName}
          handleFind={this.handleFind}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Phonebook;
