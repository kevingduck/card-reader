import React from 'react';
import Tesseract from 'tesseract.js';
import ImageUploader from 'react-images-upload';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            pictures: [], 
            output: "" 
        };
        this.onChange = this.onChange.bind(this);
        this.runOCR = this.runOCR.bind(this);
        this.detectMemberId = this.detectMemberId.bind(this);
    }

    onChange(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log("Added picture. Click button to read image.")
    }

    runOCR() {
        Tesseract.recognize(
            this.state.pictures[0],
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            this.setState({ 
                output: text
            });
            console.log(text);
          })
    }

    detectMemberId(text) {
        if (this.state.output.includes("Member")) {
            console.log("Member info detected, scanning for ID ...");
            var index = this.state.output.indexOf("Member");
            var member_id = this.state.output.split("Member ID: ")[1];
            member_id = member_id.split(" ")[0];
            console.log("Member ID: " + member_id);
            this.setState({output:member_id});
          } else {
              console.log("No member ID found, uploading image for ISR review ...");
          }
    }

    render() {
        return (
            <div>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Choose image'
                    onChange={this.onChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={52428800}
                />
                <p>Found on card: {this.state.output}</p>
                <button onClick={this.runOCR}>Read Image</button>
                <button onClick={this.detectMemberId}>Find Member ID</button>
                <p>{this.state.member_id}</p>

            </div>
        );
    }
}

export default App