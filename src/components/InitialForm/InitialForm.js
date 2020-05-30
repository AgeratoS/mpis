import React from 'react';
import './InitialForm.css';
import {reduxForm} from 'redux-form';
// Импорт кастомных компонентов
import TextInput from '../TextInput/TextInput.js';

const validate = values => {
  const errors = {}


  // Проверки на min > max:
  if (parseInt(values.minTimeRequest) > parseInt(values.maxTimeRequest))
  {
    errors.minTimeRequest = "Минимальное значение не должно превосходить максимальное";
    errors.maxTimeRequest = "Максимальное значение не должно быть меньше минимального";
  }
  if (parseInt(values.minTimeDoneRequest) > parseInt(values.maxTimeDoneRequest))
  {
    errors.minTimeDoneRequest = "Минимальное значение не должно превосходить максимальное";
    errors.maxTimeDoneRequest = "Максимальное значение не должно быть меньше минимального";
  }


      // Проверка на принадлежность вероятности 0 <= p <= 1
  if ((parseInt(values.probably) < 0))
    errors.probably = "Вероятность не может быть меньше нуля";
  if ((parseInt(values.probably) > 1))
    errors.probably = "Вероятность не может быть больше единицы";


  // Проверка на то, что числа положительны
  if (values.minTimeRequest <= 0)
    errors.minTimeRequest = "Время не может быть неположительным";
  if (values.maxTimeRequest <= 0)
    errors.minTimeRequest = "Время не может быть неположительным";
  if (values.volume < 0)
    errors.volume = "Размер накопителя не может быть неположительным";
  if (values.timeConnect < 0)
    errors.minTimeRequest = "Время не может быть неположительным";
  if (values.minTimeDoneRequest < 0)
    errors.minTimeDoneRequest = "Время не может быть неположительным";
  if (values.maxTimeDoneRequest < 0)
    errors.maxTimeDoneRequest = "Время не может быть неположительным";

  // Проверка на то, что передаются числа
  if (!/^\d*\d*\d+$/.test(values.minTimeRequest))
    errors.minTimeRequest = "Должно быть целое число";
  if (!/^\d*\d*\d+$/.test(values.maxTimeRequest))
    errors.maxTimeRequest = "Должно быть целое число";
  if (!/^\d*\d*\d+$/.test(values.volume))
    errors.volume = "Должно быть целое число";
  if (!/^0[.,]\d*\d+$/.test(values.probably))
    errors.probably = "Должно быть дробное число, лежащее от 0 до 1";
  if (!/^\d*\d*\d+$/.test(values.timeConnect))
    errors.timeConnect = "Должно быть целое число";
  if (!/^\d*\d*\d+$/.test(values.minTimeDoneRequest))
    errors.minTimeDoneRequest = "Должно быть целое число";
  if (!/^\d*\d*\d+$/.test(values.maxTimeDoneRequest))
    errors.maxTimeDoneRequest = "Должно быть целое число";


  // Проверки на пустоту:

  if (!values.minTimeRequest)
    errors.minTimeRequest = "Required-значение";
  if (!values.maxTimeRequest)
    errors.maxTimeRequest = "Required-значение";
  if (!values.volume)
    errors.volume = "Required-значение";
  if (!values.probably)
    errors.probably = "Required-значение";
  if (!values.timeConnect)
    errors.timeConnect = "Required-значение";
  if (!values.minTimeDoneRequest)
    errors.minTimeDoneRequest = "Required-значение";
  if (!values.maxTimeDoneRequest)
    errors.maxTimeDoneRequest = "Required-значение";

  return errors;
}


let InitialForm = (props) =>
{
  const {error, handleSubmit, className, pristine, submitting, touched} = props;


  return (
    <form className={(className || "") + " InitialForm"} onSubmit={handleSubmit}>
      <div className="InitialForm__grid">
        <TextInput className="InitialForm__TextInput" label="Мин. время прибытия заявки" component="input" type="text" name="minTimeRequest"/>
        <TextInput className="InitialForm__TextInput" label="Макс. время прибытия заявки" component="input" type="text" name="maxTimeRequest"/>
        <TextInput className="InitialForm__TextInput InitialForm__TextInput_long" label="Объем накопителя" component="input" type="text" name="volume"/>
        <TextInput className="InitialForm__TextInput InitialForm__TextInput_long" label="Вероятность отдачи заявки первому грузовику" component="input" type="text" name="probably"/>
        <TextInput className="InitialForm__TextInput InitialForm__TextInput_long" label="Время связи" component="input" type="text" name="timeConnect"/>
        <TextInput className="InitialForm__TextInput" label="Мин. время выполнения заявки" component="input" type="text" name="minTimeDoneRequest"/>
        <TextInput className="InitialForm__TextInput" label="Макс. время выполнения заявки" component="input" type="text" name="maxTimeDoneRequest"/>
        <button type="submit" className="InitialForm__send" disabled={pristine || submitting}>Моделировать</button>
      </div>
      {error && <div class="InitialForm__errorArea">
        {error}
      </div>}
    </form>
  )
}

InitialForm = reduxForm({
  form: "initial",
  validate
})(InitialForm);

export default InitialForm;
