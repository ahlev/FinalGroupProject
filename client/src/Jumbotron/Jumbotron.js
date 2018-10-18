// Import React
import React from 'react';

// Import the Jumbotron UI component from the reactstrap framework.
import { Jumbotron, Button } from 'reactstrap';
import TextLoop from 'react-text-loop';

// Import Jumbotron style sheet.
import './Jumbotron.css';






// Jumbotron component
const MainJumbotron = (props) => {

    return (
        <div className="header">
            <Jumbotron className="text-center jumbotron">
                <h1 className="display-3">Let the music flow</h1>
                <p className="intro-title">
                    Your playlist. Your people. 
                    Your  <TextLoop
                    springConfig={{ stiffness: 300, damping: 10, speed: 300 }}
                    // speed= 1000ms;
                    children={[
                        "party",
                        "hangout",
                        "restaurant",
                        // "pub",
                        // "network",
                        // "bedtime bonding",
                        // "virtual connection",
                        // "morning ritual",
                        // "event",
                        // "lunch break",
                        // "conference",
                        "business",
                        "event"
                        ]}
                    />.
                </p>
                
                {/* could be cool to find an animation package that scrolled through stuff like party / group / carpool / roadtrip / restaurant / bar  */}
            
            </Jumbotron>
    
        </div>
    );
  
};

// Export Jumbotron component.
export default MainJumbotron;

