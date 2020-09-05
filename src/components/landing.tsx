import React from 'react';

import { Button, Jumbotron } from 'reactstrap';
import MockMap from './maps/mockmap';
import { Chart } from './graphs/chart';

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      backgroundColor: '#343a40',
      borderColor: '#01070D',
      borderWidth: 2,
      data: [50, 62, 102, 40, 80, 90, 80],
    },
  ],
};

const ratingBarData = {
  labels: [2015, 2016, 2017, 2018, 2019],
  datasets: [
    {
      borderColor: '#01070D',
      borderWidth: 2,
      data: [3.5, 3.2, 3.8, 4.1, 4.6],
    },
  ],
};

const Landing: React.FC = () => {
  return (
    <>
      <Jumbotron className="bg-dark text-white">
        <h1 className="display-3">Meadstats</h1>
        <p className="lead">Discover deeper insights about your beers</p>
      </Jumbotron>

      <div className="card-deck">
        <div className="card">
          <div className="card-img-top p-3">
            <Chart
              data={barData}
              options={{
                animation: { duration: 0 },
                legend: { display: false },
                scales: {
                  yAxes: [
                    {
                      ticks: { display: false, beginAtZero: true },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  ],
                },
                title: { display: true, text: 'Count by day of week' },
              }}
              type="bar"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Patterns</h5>
            <p className="card-text">
              When and on which day do you consume the most beer? Which year did you consume the most?
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-img-top p-3">
            <MockMap username="boren" />
          </div>
          <div className="card-body">
            <h5 className="card-title">Interactive map</h5>
            <p className="card-text">See where you have been and discover your favorite countries.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-img-top p-3">
            <Chart
              data={ratingBarData}
              options={{
                animation: { duration: 0 },
                legend: { display: false },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        display: false,
                      },
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        drawBorder: false,
                      },
                    },
                  ],
                },
                title: { display: true, text: 'Average rating by year' },
              }}
              type="line"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">Trends</h5>
            <p className="card-text">
              Are you getting more skeptical or are you choosing better bers? Watch how your rating changes over time.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 mb-4">
        <Button
          size="lg"
          href="https://untappd.com/oauth/authenticate/?client_id=AD153FB3121F3B72DF627FE5AB27140E32C12BDA&response_type=code&redirect_url=https://api.meadstats.com/auth_callback"
        >
          Sign in with Untappd
        </Button>
      </div>
    </>
  );
};

export default Landing;
