import { Grid, Form, Button, Input, Message } from "semantic-ui-react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Spinner, Navbar, Nav, Card, Container, Row, Col } from 'react-bootstrap'

const NewImage = (props) => {

  const NewImage = () => {
    console.log('newImage');
  };

  return (
    <>
    <h3>Create a newImage</h3>
        <Form>
          <Form.Field>
          <Grid>
            <Grid.Row>
                <Grid.Column width={5}>
                  <label>Minimum Contribution (wei)</label>
                  <Input
                    label="wei"
                    labelPosition="right"
                    value="2"
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <label>Tier 2 Minimum Contribution (wei)</label>
                  <Input
                    label="wei"
                    labelPosition="right"
                    value="1"
                  />
               </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button primary>
                Create
              </Button>
            </Grid.Row>
          </Grid>
          </Form.Field>
      </Form>
    </>
  );

};

export default NewImage;
