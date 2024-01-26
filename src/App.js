import React, { Component } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, Container, Paper, Typography } from '@mui/material';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      choices: [],
      submittedFeedback: null, // New state to store submitted feedback
    };
  }

  componentDidMount() {
    // Fetch data from the API
    fetch('https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1')
      .then((response) => response.json())
      .then((data) => {
        // Extract questions from the API response and update state
        const questions = data.feedbackQuestions.map((question) => question);
        const choices = Array.from({ length: questions.length }, () => ''); // Initialize choices with empty strings

        this.setState({ questions, choices });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  handleChoiceChange = (index, value) => {
    // Update the choices in the state when a radio button is selected
    const newChoices = [...this.state.choices];
    newChoices[index] = value;
    this.setState({ choices: newChoices });
  };

  handleSubmit = () => {
    // Display the result in the console or in the browser
    console.log('Feedback:', {
      questions: this.state.questions,
      choices: this.state.choices,
    });

    // Update the state to show submitted feedback
    this.setState({
      submittedFeedback: { questions: this.state.questions, choices: this.state.choices },
    });
  };

  render() {
    return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography component="h1" variant="h5" align="center">
            Feedback Form
          </Typography>

          <form>
            <RadioGroup>
              {this.state.questions.map((question, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <Typography variant="subtitle1">{question}</Typography>
                  <FormControlLabel
                    control={
                      <Radio
                        value="Excellent"
                        checked={this.state.choices[index] === 'Excellent'}
                        onChange={() => this.handleChoiceChange(index, 'Excellent')}
                      />
                    }
                    label="Excellent"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        value="Good"
                        checked={this.state.choices[index] === 'Good'}
                        onChange={() => this.handleChoiceChange(index, 'Good')}
                      />
                    }
                    label="Good"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        value="Average"
                        checked={this.state.choices[index] === 'Average'}
                        onChange={() => this.handleChoiceChange(index, 'Average')}
                      />
                    }
                    label="Average"
                  />
                </div>
              ))}
            </RadioGroup>
          </form>

          <Button variant="contained" color="primary" onClick={this.handleSubmit} fullWidth>
            Submit Feedback
          </Button>

          {/* Display submitted feedback */}
          {this.state.submittedFeedback && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h6" align="center">
                Submitted Feedback:
              </Typography>
              <pre>{JSON.stringify(this.state.submittedFeedback, null, 2)}</pre>
            </div>
          )}
        </Paper>
      </Container>
    );
  }
}

export default App;