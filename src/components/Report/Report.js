import React, {Component} from 'react';
import './Report.css'

class Report extends Component {

  render()
  {
    return(
      <div className="Report">
        <header className="Report__header">
          <button className="Report__close" onClick={this.props.onHide}>Х</button>
        </header>
        <div className="Report__content">
          <div className="Report__inner">
            <h4 className="Report__title">Результаты моделирования</h4>
            <ul className="Report__data">
              <li className="Report__value">
                Время прибытия следующей заявки: {this.props.model.nextGeneration}
              </li>
              <li className="Report__value">
                Количество заявок в очереди: {this.props.model.queue}
              </li>
              <li className="Report__value">
                Количество отклоненных заявок: {this.props.model.cancelled}
              </li>
              <li className="Report__value">
                Количество принятых заявок: {this.props.model.accepted}
              </li>
              <li className="Report__value">
                Время, когда освободится 1 грузовик: {this.props.model.freeTimeTruck1}
              </li>
              <li className="Report__value">
                Время, когда освободится 2 грузовик: {this.props.model.freeTimeTruck2}
              </li>
              <li className="Report__value">
                Время следующей установки связи: {this.props.model.nextTimeChannel}
              </li>
              <li className="Report__value">
                Общее время занятости диспетчера: {this.props.model.busyTimeDispatcher}
              </li>
              <li className="Report__value">
                Общее время занятости первого грузовика: {this.props.model.busyTimeTruck1}
              </li>
              <li className="Report__value">
                Общее время занятости второго грузовика: {this.props.model.busyTimeTruck2}
              </li>
              <li className="Report__value">
                Коэффициент занятости диспетчера: {parseInt(this.props.model.busyTimeDispatcher)/600.0}
              </li>
              <li className="Report__value">
                Коэффициент занятости первого грузовика: {parseInt(this.props.model.busyTimeTruck1)/600.0}
              </li>
              <li className="Report__value">
                Коэффициент занятости второго грузовика: {parseInt(this.props.model.busyTimeTruck2)/600.0}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Report;
