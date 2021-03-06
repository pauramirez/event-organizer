import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Events} from "../api/events";
import ReactDOM from "react-dom";
import Item from "./Item";

// Add event component
export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goSearchEv: false,
            items: []
        }
        ;
    }

    goSearch() {
        this.setState({goSearchEv: true});
    }

    addEvent(e) {
        e.preventDefault();
        Events.insert({
            name: this.refs.name.value,
            date: this.refs.date.value,
            location: this.refs.location.value,
            category: this.refs.category.value,
            description: this.refs.description.value,
            createdAt: new Date(),
        });
        res = Events.find({}, {limit: 1, sort: {createdAt: -1}}).fetch();

        this.insertItems(res[0]._id);
        this.setState({goSearchEv: true});
    }

    insertItems(res) {
        let restItem = (this.state.items.map((item) => (
            newItem = {
                text: item.text,
                idEvent: res
            }
        )));
        restItem.map((item) => {
            Meteor.call('items.insert', item.text, item.idEvent);
        })

    }

    handleSubmit(event) {
        event.preventDefault();
        let listIt = this.state.items;

        const textInsert = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        let ItemObje = {
            text: textInsert,
            idEvent: 0
        };
        listIt.push(ItemObje);
        this.setState({items: listIt});
        ReactDOM.findDOMNode(this.refs.textInput).value = "";

    }

    renderItems() {
        return this.state.items.map((item) => (
            <Item key={item.text} item={item} add={true}/>
        ));
    }

    render() {
        if (this.state.goSearchEv) {
            return (
                <Redirect to={"/events"}/>
            );
        }
        return (
            <div className="blog-2 section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 ml-auto mr-auto">
                            <h2 className="title">Create an Event</h2>
                            <form>
                                <div className="row">
                                    <div className="col-md-8 col-sm-8">
                                        <div className="form-group">
                                            <h6>Name <span className="icon-danger">*</span></h6>
                                            <input ref="name" className="form-control border-input" required
                                                   placeholder="Enter the event name here..."
                                                   name="name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <h6>Location <span className="icon-danger">*</span></h6>
                                            <input ref="location" className="form-control border-input" required
                                                   placeholder="Enter the location of the event here..."
                                                   type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <h6>Category <span className="icon-danger">*</span></h6>
                                            <select ref="category" className="form-control">
                                                <option value="Art & Music">Art & Music</option>
                                                <option value="Social">Social</option>
                                                <option value="Education">Education</option>
                                                <option value="Networking">Networking</option>
                                                <option value="Dining">Dining</option>
                                                <option value="Nightlife & Parties">Nightlife & Parties</option>
                                                <option value="Athletic">Athletic</option>
                                                <option value="Fairs & Festivals">Fairs & Festivals</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <h6>Date <span className="icon-danger">*</span></h6>
                                            <input ref="date" className="form-control border-input" required id="date"
                                                   type="date"/>
                                        </div>
                                        <div>
                                            <h6>Items</h6>
                                            <div className="row buttons-row">
                                                <div className="col-md-9 col-sm-9">
                                                    <form onSubmit={this.handleSubmit.bind(this)} className="new-task">
                                                        <input className="form-control border-input" type="text"
                                                               ref="textInput"
                                                               placeholder="Type to add new item and hit enter"/>
                                                    </form>
                                                </div>
                                                <div className="col-md-3 col-sm-3">
                                                    <button onClick={this.handleSubmit.bind(this)}
                                                            className="btn btn-outline-danger btn-block btn-round">Add
                                                    </button>
                                                </div>
                                            </div>
                                            <br/>
                                            {this.renderItems()}
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <h6>Description</h6>
                                            <textarea ref="description" className="form-control text-area" required
                                                      placeholder="Describe your event..."
                                                      rows="6" maxLength="400"/>
                                        </div>

                                    </div>
                                </div>


                                <div className="row buttons-row">
                                    <div className="col-md-6 col-sm-6">
                                        <button onClick={this.goSearch.bind(this)}
                                                className="btn btn-outline-danger btn-block btn-round">Cancel
                                        </button>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <button onClick={this.addEvent.bind(this)}
                                                className="btn btn-primary btn-block btn-round">Save &amp; Publish
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

