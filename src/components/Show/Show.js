import React, { Component } from 'react';
import { getShowInfo } from '../../api';
import './Show.css';

export default class Show extends Component {
  state = {
    data: null,
    showId: ''
  };

  async componentDidUpdate(prevProps) {    
    const { props } = this;
    
    if (props.showId !== prevProps.showId) {
      const data = await getShowInfo(props.showId);

      this.setState({
        data,
        showId: props.showId
      });
    }
  }

  createMarkup = text => {
    return { __html: text };
  };

  render() {
    const { data, showId } = this.state;
    if (!showId || !data)
      return <p className="show-inforation t-show-info">Шоу не выбрано</p>;
    return (
      <div className="show">
        <img alt={data.name} className="show-image" src={data.image.medium} />
        <h2 className="show-label t-show-name">{data.name}</h2>
        <p className="show-text t-show-genre">
          <b>Жанр:</b>
          {data.genres.map(item => item)}
        </p>
        <p
          className="show-text t-show-summary"
          dangerouslySetInnerHTML={this.createMarkup(data.summary)}
        />
      </div>
    );
  }
}
