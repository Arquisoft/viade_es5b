import React, { Component } from 'react';

type Props = {
  history: Object
};

type State = {
  timeLeft: number
};
class RegistrationSuccess extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 15
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.countDown, 1000);
  }

  async componentWillUnmount() {
    await clearInterval(this.interval);
  }

  redirect = async () => {
    const { history } = this.props;
    await clearInterval(this.interval);
    history.push('/login');
  };

  countDown = () => {
    const { timeLeft } = this.state;
    if (timeLeft === 0) this.redirect();
    this.setState(prevState => ({ timeLeft: prevState.timeLeft - 1 }));
  };

  render() {
    const { timeLeft } = this.state;
    return (
          <h1>Success! Welcome to the decentralized web.</h1>
          <img src="/img/rocket.svg" alt="rocket" className="rocket" />
          <span>We have emailed you more information about your new Solid Identity</span>
          <span>We will redirect you to your POD in {timeLeft} seconds...</span>
    );
  }
}

export default RegistrationSuccess;
