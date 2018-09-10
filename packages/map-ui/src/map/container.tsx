import * as React from 'react';

export default class extends React.Component<{id:string, name:string, city:string, mapDisplay: any }> {
    static getInitialProps (  { query: { id , name ,city }, mapDisplay: { config } }) {
        console.log('sree' + id + name +city + config);
      return { id , name ,city}
    }
    
  
    render () {
      return <div>
        <h1>My {this.props.id} blog post by  {this.props.name} living in {this.props.city}   </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    }
  }