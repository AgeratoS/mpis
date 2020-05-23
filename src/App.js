import React from 'react';
import './App.css';
//Импорт необходимых библиотек
import {Provider} from 'react-redux';
import Zoom from 'react-reveal/Zoom';
// Импорт кастомных компонентов
import InitialForm from './components/InitialForm/InitialForm.js';

// Импорт redux-компонентов
import {store} from './stores/ModelStore/ModelStore.js';

function App() {
  function handleSubmit(values)
  {
    console.log(values);
  }


  return (
    <div className="App">
      <div class="App__inner">
        <div class="App__InitialFormOuter">
          <Provider store={store}>
            <Zoom>
              <InitialForm className="App__InitialForm" onSubmit={handleSubmit}/>
            </Zoom>
          </Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
