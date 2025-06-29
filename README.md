# Simple Pomodoro Timer Web Application

## Project Title
Pomodoro Timer

## Description
Pomodoro Timer is a minimalist web application designed to help users apply the Pomodoro Technique to improve focus and productivity. The app provides 25-minute focus sessions followed by 5-minute breaks, repeating as needed.

Built with vanilla HTML, CSS, and JavaScript, this app runs entirely in the browser and requires no installation or external dependencies.

## Technologies Used
- **HTML**: Structure and layout 
- **CSS**: For styling the layout
- **JavaScript (ES6+)**: Timer logic, DOM control 
- **Netlify**: For deploying the app online
- Reason: They are lightweight, accessible, and ideal for a browser-based single-page app. Using vanilla JavaScript and HTML/CSS supports easy learning and clean logic implementation without the complexity of frameworks.

## Features
- **Custom Focus and Break Session**  
  Users can enter any duration for focus time and break time in minutes and seconds before starting the timer.

- **Automatic Switch**  
  After a focus session ends, the timer automatically transitions to the break session.

- **Pause / Resume**  
  The Start button toggles to Pause to stop and resume the countdown.

- **Reset**  
  The Reset button clears the countdown and restores the initial custom settings.

## Setup Instructions

```bash
    git clone https://github.com/username/pomodoro-timer.git
    cd pomodoro-timer
```

## AI Support Explanation

AI (IBM Granite model) was used through Google Colab to assist in code generation and structure. The model contributed to:
- **Prompting techniques**:
  - Generating the base HTML, CSS, and JavaScript layout 
  - Designing the countdown logic with focus-to-break session switching 
  - Structuring clean, modern ES6+ code using chain-of-thought prompting
- **Impact**:
  - Reduced development time by ~50%
  - Enabled fast prototyping and refinement
