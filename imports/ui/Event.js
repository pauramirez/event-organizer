import React, {Component} from 'react';
import { Link } from "react-router-dom";

// Event component - represents a single event
export default class Event extends Component {

    render() {
        return (
            <div className="col-md-4">
                <Link to={{pathname: `/events/${this.props.event._id}`, event:this.props.event }}>
                    <div className="card card-blog">
                        <div className="card-body">
                            <h6 className="redT"><strong>{this.props.event.category}</strong></h6>
                            <h5 className="card-title">
                                {this.props.event.name}
                            </h5>
                            <p className="card-description">
                                {this.props.event.description.substring(0,100)+"..."} <br/>
                            </p>
                            <hr/>
                            <div className="card-footer text-center">
                                <div className="author">
                                    <i className="fa fa-calendar redT"/>
                                    <span> {this.props.event.date}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>
                <br/>
            </div>
        );
    }
}

