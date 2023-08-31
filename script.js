class StopWatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timePassedInMilliSeconds: 0
      }
      // need an immediate update, therefore we can't use the component state. component state is asynchronous
      this.timer = null;
      // must bind in Constructor, otherwise the this variable will refer to the Window "this". remember Counter
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
    }
  
    start() {
        // checks to see if there is already a timer running
      if (!this.timer) {
        let startTime = Date.now();
        this.timer = setInterval(() => {
          const stopTime = Date.now();
          const timePassedInMilliSeconds = stopTime - startTime + this.state.timePassedInMilliSeconds;
  
          this.setState({
            timePassedInMilliSeconds,
          });
          
          startTime = stopTime;
        }, 250);
      }
    }
  
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  
    reset() {
      this.stop();
      this.setState({
        timePassedInMilliSeconds: 0
      })
    }
  
    render() {
      return (
        <div>
          <h2 className="border px-3 py-4 rounded my-3 mx-auto text-center" style={{maxWidth: "300px"}}>
            {Math.floor(this.state.timePassedInMilliSeconds / 1000)} second(s)
          </h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary mr-2" onClick={this.start}>
              Let's Get Going!
            </button>
            <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
              Pause
            </button>
            <button className="btn btn-outline-warning" onClick={this.reset}>
              Run it Again!
            </button>
          </div>
        </div>
      )
    }
  }
  
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<StopWatch />);