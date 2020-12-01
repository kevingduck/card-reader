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
                <p>{this.state.output}</p>
                <button onClick={this.runOCR}>Read Image</button>
                
            </div>
        );
    }
}

export default App