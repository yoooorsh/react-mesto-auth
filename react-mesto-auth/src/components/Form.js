import React from 'react';

function Form(props) {
  return (
    <div className={`form form_content_${props.name}`}>
      <h2 className="form__header">{props.title}</h2>
      <form className="form__container" name={`${props.name}`} onSubmit={props.onSubmit}>
        <fieldset className="form__fieldset">
          {props.children}
          <button className="form__save-button" type="submit">{props.buttonText}</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;

