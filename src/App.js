import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import JsonViewer from "./Component/JsonViewer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentMicroserviceData: {
        address: {
          House_Number: 505,
          Street_Direction: "",
          Street_Name: "Claremont",
          Street_Type: "Street",
          Apt: "15L",
          Burough: "Brooklyn",
          State: "NY",
          Zip: "10451",
          Phone: "718-777-7777",
        },
        casehead: 0,
        adults: [
          {
            Last_Name: "Foo",
            First_Name: "A",
            Sex: "M",
            Date_Of_Birth: "01011980",
          },
        ],
        children: [],
      },
      currentWidgetSchema: {
        address: {
          House_Number: "4545222",
          Street_Direction: "I dont know ",
          Street_Name: "pstrrer",
          Street_Type: "park",
          Something: "",
          notin: "",
        },
        casehead: 555,
        extra: "",
      },
      widgetUrl: "",
      microserviceUrl: "",
      allwidgets: [],
      allMicroservices:[]
    };
  }

  getMicroServicesUrl = async () => {
    try {
      const data = await axios.get(this.state.microserviceUrl, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const microservices = data.data;
      if (!microservices) {
        alert('cannot retreive microservices data')
        return;
      }
     
      this.setState({
        allMicroservices: microservices,
      });
    } catch (err) {
      console.log(err);
    }


  };

  getWidgetsUrl = async () => {
    try {
      const data = await axios.get(this.state.widgetUrl, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const widgets = data.data;
      if (!widgets) {
        alert('cannot retreive widgets data')
        return;
      }
     
      this.setState({
        allwidgets: widgets,
      });
    } catch (err) {
      console.log(err);
    }
  };

  widgetUrlChanged = (e) => {
    this.setState({
      widgetUrl: e.target.value,
    });
  };

  microserviceUrlChanged = (e) => {
    this.setState({
      microserviceUrl: e.target.value,
    });
  };

  onwidgetSelect = (e) => {
    let widgetschema = this.state.allwidgets.find((widget) => widget._id);
    this.setState({
      currentWidgetSchema: widgetschema,
    });
    console.log("selel", e.target.value);
  };
  onmicroserviceSelect = (e) => {
    let data = this.state.allMicroservices.find((microservice) => microservice._id);
    this.setState({
      currentMicroserviceData: data,
    });
   
    
  }

  render() {
    return (
      <div className="App">
        <div className="container-mapper">
          <Container fluid>
            <Row>
              <Col>
                <div className="column-wrapper">
                  <h4 style={{ marginBottom: "10px" }}>
                    Microservices Explorer
                  </h4>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="microservice-url">
                        Url
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Enter url of microservices"
                      aria-label="Enter url of microservices"
                      aria-describedby="microservice-url"
                      value={this.state.microserviceUrl}
                      onChange={this.microserviceUrlChanged}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={this.getMicroServicesUrl}
                      >
                        Go
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="microservice-dropdown">
                        Dropdown
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="select" onChange={this.onmicroserviceSelect}>
                      {this.state.allMicroservices.map((microservice) => {
                        return (
                          <option key={microservice._id} value={microservice._id}>
                            {microservice.name}
                          </option>
                        );
                      })}
                    </FormControl>
                  </InputGroup>
                  <JsonViewer
                    src={this.state.currentMicroserviceData}
                    theme="monokai"
                  />
                </div>
              </Col>
              <Col>
                <div className="column-wrapper">
                  <h4>Widgets Explorer</h4>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="widgets-url">Url</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Enter url of widgets"
                      aria-label="Enter url of widgets"
                      aria-describedby="microservice-url"
                      value={this.state.widgetUrl}
                      onChange={this.widgetUrlChanged}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={this.getWidgetsUrl}
                      >
                        Go
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="widget-dropdown">
                        Dropdown
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="select" onChange={this.onwidgetSelect}>
                      {this.state.allwidgets.map((widget) => {
                        return (
                          <option key={widget._id} value={widget._id}>
                            {widget.widgetName}
                          </option>
                        );
                      })}
                    </FormControl>
                  </InputGroup>
                  <JsonViewer
                    src={this.state.currentWidgetSchema}
                    theme="monokai"
                  />
                </div>
              </Col>
              <Col>
                <div className="column-wrapper">
                  <h4>Mapping</h4>

                  <JsonViewer
                    src={this.state.currentWidgetSchema}
                    theme="monokai"
                    onAdd={true}
                    onEdit={true}
                    onDelete={true}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
