/* eslint-disable no-unused-vars */
import Transfer from '../components/transfer'
import Deposit from '../components/deposit'

function Home() {
  return (
    <div className="app">
      <div>Welcome to Matic.js!</div>
      <div className="parent">
        <Transfer />
        <Deposit />
      </div>
      <style jsx>{`
        .app {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 15px;
          margin: 0;
          text-align: center;
        }
        .parent {
          transition: 100ms ease-in background;
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
      <style global jsx>{`
        button {
          padding: 15px 24px;
          font-size: 16px;
          line-height: 19px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          background-color: #2b6def;
          color: #fff;
        }
        button:hover {
          background-color: #2460da;
        }
        .col {
          flex: 1;
          padding: 16px;
        }
      `}</style>
    </div>
  )
}

export default Home
