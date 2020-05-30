import React, {Component} from 'react';
import './App.css';
//Импорт необходимых библиотек
import {Provider} from 'react-redux';
import Zoom from 'react-reveal/Zoom';
// Импорт кастомных компонентов
import InitialForm from './components/InitialForm/InitialForm.js';
import Report from './components/Report/Report.js';
// Импорт redux-компонентов
import {store} from './stores/ModelStore/ModelStore.js';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      model: {
        nextGeneration: 0,
        queue: 0,
        cancelled: 0,
        isBusyDispatcher: false,
        isBusyTruck1: false,
        freeTimeTruck1: 0,
        isBusyTruck2: false,
        freeTimeTruck2: 0,
        startedAt: 0,
        nextTimeChannel: 0,
        accepted: 0,
        called: false,
        busyTimeDispatcher: 0,
        busyTimeTruck1: 0,
        busyTimeTruck2: 0,
      },
      isShowReport: false,
    }
  }

  handleSubmit(values)
  {
    // console.log(values);
    // store.dispatch(computingAsync());
    let data = this.modeling(values);
    this.setState({
      model: data,
      isShowReport: true,
    })
  }

  modeling(values)
  {
    //1. Преобразование к числам
    let {minTimeRequest, maxTimeRequest, volume, probably, timeConnect, minTimeDoneRequest, maxTimeDoneRequest} = values;
    minTimeRequest = parseInt(minTimeRequest);
    maxTimeRequest = parseInt(maxTimeRequest);
    volume = parseInt(volume);
    probably = parseFloat(probably.replace(",", "."));
    timeConnect = parseInt(timeConnect);
    minTimeDoneRequest = parseInt(minTimeDoneRequest);
    maxTimeDoneRequest = parseInt(maxTimeDoneRequest);
    let dt = 0.0005;

    let t = 0;

    let state = {
      nextGeneration: ((maxTimeRequest - minTimeRequest) * Math.random()) + minTimeRequest,
      queue: 0,
      cancelled: 0,
      isBusyDispatcher: false,
      isBusyTruck1: false,
      freeTimeTruck1: 0,
      isBusyTruck2: false,
      freeTimeTruck2: 0,
      startedAt: (Math.random() < probably) ? 1 : 2,
      nextTimeChannel: 0,
      accepted: 0,
      called: false,
      busyTimeDispatcher: 0,
      busyTimeTruck1: 0,
      busyTimeTruck2: 0,
    };

    for (;t < 600;t += dt)
      {
        if (t >= state.nextGeneration)
          {
            state.nextGeneration = t + (minTimeRequest + (maxTimeRequest - minTimeRequest) * Math.random());
            if (state.queue === volume)
              state.cancelled += 1
            else
              state.queue += 1
          }
        if (state.queue > 0)
          {
            if (!state.isBusyDispatcher)
              {
                state.isBusyDispatcher = true;
                state.queue -= 1;
              }
          }
        if(state.isBusyDispatcher)
          {
            state.busyTimeDispatcher += dt;
            if (!state.called)
              {
                state.called = true;
                state.nextTimeChannel = t + timeConnect;
              }
            // Диспетчер пытается запросить первый грузовик
            if(state.startedAt === 1)
              {
                if (t >= state.nextTimeChannel)
                  {
                    // Связь установлена
                    if (!state.isBusyTruck1)
                      {
                        state.isBusyTruck1 = true;
                        state.isBusyDispatcher = false;
                        state.freeTimeTruck1 = t + minTimeDoneRequest + (maxTimeDoneRequest - minTimeDoneRequest) * Math.random();
                      }
                    else
                      {
                        state.startedAt = 2;
                      }
                    state.called = false;
                  }
              }
            // Диспетчер пытается запросить второй грузовик
            else if (state.startedAt === 2)
              {
                if (t >= state.nextTimeChannel)
                  {
                    // Связь установлена
                    if (!state.isBusyTruck2)
                      {
                        state.isBusyTruck2 = true;
                        state.isBusyDispatcher = false;
                        state.freeTimeTruck2 = t + minTimeDoneRequest + (maxTimeDoneRequest - minTimeDoneRequest) * Math.random();
                      }
                    else
                      {
                        state.startedAt = 1;
                      }
                    state.called = false;
                  }
              }
          }
        if (state.isBusyTruck1)
          {
            state.busyTimeTruck1 += dt;
          }
        if (state.isBusyTruck2)
          {
            state.busyTimeTruck2 += dt;
          }
        if (t >= state.freeTimeTruck1 && state.isBusyTruck1)
          {
            state.isBusyTruck1 = false;
            state.accepted += 1;
          }
        if (t >= state.freeTimeTruck2 && state.isBusyTruck2)
          {
            state.isBusyTruck2 = false;
            state.accepted += 1;
          }
      }

      return state;
  }

  handleHide()
  {
    this.setState(
      {
        isShowReport: false,
      }
    )
  }
  render() {
  return (
    <div className="App">
      <div class="App__inner">
        <div class="App__InitialFormOuter">
          <Provider store={store}>
            <Zoom>
              <InitialForm className="App__InitialForm" onSubmit={(values) => this.handleSubmit(values)}/>
            </Zoom>
          </Provider>
        </div>
        <div className={"App__Report" + (this.state.isShowReport ? " App__Report_show" : "")}>
          <Report model={this.state.model} onHide={() => this.handleHide()}/>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
