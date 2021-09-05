import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import group from './Group.module.css';
import style from './Filter.module.css';

function Filter({ filtered, handleFind, findName, handleDelete }) {
  return (
    <div>
      <input
        type="text"
        name="findName"
        value={findName}
        onChange={handleFind}
      />

      {filtered && (
        <TransitionGroup component="ul" className={style.contact}>
          {filtered.map(i => (
            <CSSTransition key={i.number} timeout={500} classNames={group}>
              <li key={i.number}>
                <span>
                  {i.name}: {i.number}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(i.name)}
                  className={style.button}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
}

export default Filter;
